#!/usr/bin/env bash
#
# publicar.sh — poe o site das series no ar a partir de um COMMIT, nao da pasta de
# trabalho (D5 do plano do SEIRES, subetapa 4.1).
#
# POR QUE EXISTE
#   Ate 15/09/2026 o site subia pelo sobe-arquivos.sh, arquivo por arquivo, direto da
#   pasta de trabalho da maquina de casa. Dois problemas: o que estava no ar nao era um
#   commit conhecido, entao "voltar atras" nao tinha para onde voltar; e outras sessoes
#   mexem neste mesmo repo ao mesmo tempo, entao subir "tudo que difere" ja quase levou
#   trabalho alheio junto (13/09/2026, quatro arquivos de modelos 3D de outra sessao).
#   Publicando a partir da main, so sobe o que foi commitado, e voltar atras e voltar um
#   commit. Padrao completo na skill publicar-no-servidor.
#
# UMA LISTA SO, USADA TRES VEZES
#   O repo tem muita coisa que NAO e site: o plano de cada serie, o material de origem
#   (roteiros, prompts, imagens de referencia), os scripts de teste e o codigo do painel.
#   O nginx serve a pasta ~/serie inteira, entao copiar o repo todo publicaria tudo isso.
#   Por isso quem manda e a funcao arquivos_publicados: ela lista, a partir do commit, os
#   arquivos que de fato sao site. A MESMA lista guarda o backup, copia e confere no fim,
#   pra nao existir uma regra do que sobe e outra do que e conferido.
#
# COPIA POR CIMA, SEM APAGAR
#   Os mp3 e mp4 (fora do git pelo .gitignore) e o index.html da raiz so existem no
#   servidor. Um deploy que apagasse o que nao esta no commit levaria a midia junto.
#   O preco: arquivo que sair do repo continua no ar ate alguem apagar a mao.
#
# COMO CONFERE SEM NODE NA VM
#   A VM nao tem node instalado nem sudo nao-interativo. O gera-cards.js --confere (a
#   trava da D4: pagina no ar tem que bater com o que a MENU e o cards.js geram) roda num
#   container node descartavel, com o clone montado so-leitura.
#
# USO      bash ~/serie-deploy/publicar.sh
# ROLLBACK bash ~/serie-deploy/publicar.sh --rollback

set -euo pipefail

SRC=${SERIE_SRC_DIR:-/home/flaviovmix/serie-src}     # o clone da main
AR=${SERIE_AR_DIR:-/home/flaviovmix/serie}           # a pasta que o nginx serve
BRANCH_ESPERADA=${SERIE_BRANCH:-main}
URL=${SERIE_URL:-https://series.afx.art.br}
IMAGEM_NODE=${SERIE_NODE:-node:24-alpine}
DONO=1001:1001                 # flaviovmix; sem isso o container deixa arquivo de root
BACKUPS_MANTIDOS=3

# As pastas do repo que contem site. Mexer aqui e a unica forma de publicar uma pasta nova.
PASTAS_DO_SITE=("site" "Como Reinventar o Computador do Zero" "HARDWARE" "JAVA WEB" "FINANCAS" "UNIVERSO")

# Dentro delas, o que e material de origem e nao vai pro ar. A regra em uma frase: de
# _arquivos so sai modelos-3d; plano e PDF nunca saem. (Confere com o que ja estava
# publicado em 16/09/2026: ~/serie nao tinha plano, nem scripts, nem IMG.)
ehDoSite() {
  case "$1" in
    plano/*|*/plano/*) return 1 ;;
    */PDF/*) return 1 ;;
    */_arquivos/modelos-3d/*) return 0 ;;
    */_arquivos/*) return 1 ;;
  esac
  return 0
}

# Os arquivos do commit que sao site, um por linha. Fonte unica: backup, copia e
# conferencia leem daqui.
arquivos_publicados() {
  local arquivo
  git -C "$SRC" ls-files -z -- "${PASTAS_DO_SITE[@]}" | while IFS= read -r -d '' arquivo; do
    ehDoSite "$arquivo" && printf '%s\n' "$arquivo"
  done
}

# O clone publica o que estiver na branch em que ele esta, e faz isso calado: commit que
# ficou noutra branch nao sobe e nao da erro nenhum.
conferir_branch() {
  local atual
  atual=$(git -C "$SRC" branch --show-current)
  if [ "$atual" != "$BRANCH_ESPERADA" ]; then
    echo "!!! o clone esta na branch '$atual', esperado '$BRANCH_ESPERADA'"
    echo "!!! git -C $SRC checkout $BRANCH_ESPERADA"
    exit 1
  fi
}

# A trava da D4: card nao se escreve a mao. Se a pagina commitada nao bate com o que a
# MENU e o cards.js geram, o deploy para aqui, antes de encostar no que esta no ar.
conferir_cards() {
  echo "==> gera-cards.js --confere (D4)"
  docker run --rm --user "$DONO" -v "$SRC":/src:ro -w /src "$IMAGEM_NODE" \
    node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js" --confere
}

# Guarda so os arquivos que ESTE deploy pode sobrescrever (uns 7 MB), nao a pasta inteira
# (1,2 GB, quase toda mp3 e mp4, que o deploy nem toca): da pra manter tres backups sem
# encher o disco.
guardar_backup() {
  local carimbo existentes
  carimbo=$(date +%Y%m%d-%H%M%S)
  existentes=$(mktemp)
  # so o que ja existe no ar: o tar reclamaria dos arquivos novos deste commit
  ( cd "$AR" && arquivos_publicados | while IFS= read -r arquivo; do
      [ -f "$arquivo" ] && printf '%s\n' "$arquivo"
    done ) > "$existentes"
  if [ ! -s "$existentes" ]; then
    echo "==> nada pra guardar: e o primeiro deploy destas pastas"
    rm -f "$existentes"
    return
  fi
  tar czf "$AR-backup-$carimbo.tgz" -C "$AR" -T "$existentes"
  echo "==> backup guardado: $(basename "$AR-backup-$carimbo.tgz") ($(wc -l < "$existentes") arquivos)"
  rm -f "$existentes"
  ls -1t "$AR"-backup-*.tgz 2>/dev/null | tail -n +$((BACKUPS_MANTIDOS + 1)) | xargs -r rm -f
}

publicar() {
  local lista
  lista=$(mktemp)
  arquivos_publicados > "$lista"
  echo "==> publicando $(wc -l < "$lista") arquivos"
  rsync -a --files-from="$lista" "$SRC/" "$AR/"
  rm -f "$lista"
}

# O QUE O PAINEL DECIDE E DO SERVIDOR, NAO DO COMMIT
#   Desde 16/09/2026 o painel das series roda aqui e escreve o site/dados/series.json
#   desta pasta. Se o deploy copiasse o series.json do commit por cima, toda publicacao
#   religaria o que o dono tinha desligado. Entao o estado do servidor e guardado antes da
#   copia, devolvido depois, e o gerador roda de novo pra o menu e a home combinarem com
#   ele. O commit continua sendo a fonte das PAGINAS; quem manda em ligado ou desligado e
#   o painel.
ESTADO_DAS_SERIES="site/dados/series.json"
estado_guardado=""

guardar_estado_das_series() {
  if [ -f "$AR/$ESTADO_DAS_SERIES" ]; then
    estado_guardado=$(mktemp)
    cp "$AR/$ESTADO_DAS_SERIES" "$estado_guardado"
  fi
}

devolver_estado_das_series() {
  [ -n "$estado_guardado" ] || return 0
  if cmp -s "$estado_guardado" "$AR/$ESTADO_DAS_SERIES"; then
    echo "==> o painel e o commit concordam sobre as series ligadas"
    rm -f "$estado_guardado"
    estado_guardado=""
    return 0
  fi
  echo "==> devolvendo as series que o painel tinha ligado/desligado"
  cp "$estado_guardado" "$AR/$ESTADO_DAS_SERIES"
  rm -f "$estado_guardado"
  estado_guardado=""
  gerar_paginas
}

# O gerador mora no repo, nao na pasta publicada (os scripts nao vao pro ar). Aqui ele e
# emprestado pro lugar onde o proprio gerador espera se encontrar: montado DENTRO de
# ~/serie, ele resolve a raiz sozinho e escreve as paginas certas, sem precisar saber que
# esta num container.
gerar_paginas() {
  local scripts="Como Reinventar o Computador do Zero/_arquivos/scripts"
  echo "==> gerando o menu e a home com o estado do painel"
  docker run --rm --user "$DONO" \
    -v "$AR":/raiz \
    -v "$SRC/$scripts":"/raiz/$scripts":ro \
    -w /raiz "$IMAGEM_NODE" \
    node "$scripts/gera-cards/gera-cards.js"
}

# Prova que o que esta no ar e o que acabou de ser publicado, arquivo por arquivo.
conferir_arquivos() {
  echo "==> o que esta no ar x o commit"
  local diferentes=0 arquivo
  while IFS= read -r arquivo; do
    if ! cmp -s "$SRC/$arquivo" "$AR/$arquivo"; then
      echo "    DIFERENTE  $arquivo"
      diferentes=$((diferentes + 1))
    fi
  done < <(arquivos_publicados)
  if [ "$diferentes" != 0 ]; then
    echo "!!! $diferentes arquivo(s) no ar diferentes do commit"
    return 1
  fi
  echo "    todos iguais ao commit"
}

conferir_no_ar() {
  echo "==> conferindo pelo endereco publico"
  local falha=0 caminho codigo
  for caminho in / /site/ /site/index.html /site/js/menu.js /site/css/capitulo.css; do
    codigo=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$URL$caminho")
    printf '    %s  %s\n' "$codigo" "$caminho"
    [ "$codigo" = "200" ] || falha=1
  done
  if [ "$falha" != 0 ]; then
    echo "!!! tem caminho fora do 200 — avaliar o rollback"
    return 1
  fi
}

# Volta o backup mais novo por cima. Desfaz todo arquivo que o deploy MUDOU, que e o caso
# perigoso; nao apaga arquivo que o deploy criou do zero (esse nao estava no backup).
rollback() {
  local backup
  backup=$(ls -1t "$AR"-backup-*.tgz 2>/dev/null | head -1)
  if [ -z "$backup" ]; then
    echo "!!! nao ha backup pra voltar"
    exit 1
  fi
  echo "==> voltando de $(basename "$backup")"
  tar xzf "$backup" -C "$AR"
  conferir_no_ar
  echo "==> VOLTOU"
}

main() {
  if [ "${1:-}" = "--rollback" ]; then
    rollback
    return
  fi
  conferir_branch
  echo "==> publicando $(git -C "$SRC" rev-parse --short HEAD) — $(git -C "$SRC" log -1 --format=%s)"
  conferir_cards
  guardar_backup
  guardar_estado_das_series
  publicar
  conferir_arquivos            # o commit chegou inteiro: confere ANTES de o painel opinar
  devolver_estado_das_series
  conferir_no_ar
  echo "==> PUBLICADO"
}

main "$@"

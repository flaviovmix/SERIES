#!/usr/bin/env bash
#
# painel-no-servidor.sh — cria (ou recria) o container do painel das series na VM.
#
# POR QUE O PAINEL MUDOU DE CASA (16/09/2026)
#   Ate a Etapa 6 o painel rodava so na maquina do dono: ele ligava ou desligava uma
#   serie, o gerador reescrevia o menu e a home, e depois era preciso subir os arquivos.
#   O dono decidiu que o painel mora no servidor, porque tudo o que ele faz e mostrar ou
#   esconder uma serie. Agora ligar e desligar vale na hora, sem deploy.
#
# A MONTAGEM, E POR QUE ELA E ASSIM
#   O gerador (gera-cards.js) descobre a raiz do projeto contando pastas a partir de onde
#   ele mesmo esta. Se ele rodasse de dentro do clone, escreveria as paginas no clone, e
#   nao na pasta que o nginx serve. Entao ele e EMPRESTADO pra dentro de ~/serie: o
#   container ve uma raiz so, /raiz, feita de tres pedacos.
#
#     /raiz                      = ~/serie        (o site publicado, com escrita)
#     /raiz/painel               = o painel do clone      (so leitura)
#     /raiz/.../_arquivos/scripts = os scripts do clone   (so leitura)
#
#   Assim o painel e o gerador acham tudo onde esperam, sem uma linha de codigo sabendo
#   que esta num container. Codigo so-leitura, dado com escrita: o painel nao consegue
#   alterar o proprio programa.
#
# QUEM PROTEGE
#   Dentro do container o painel escuta 0.0.0.0, senao o Caddy nao alcanca. Ele NAO fica
#   exposto: nao ha -p nenhum, so a rede interna do docker. Na frente, o Caddy pede senha
#   (basic_auth) em series.afx.art.br/painel/. Sem a senha, qualquer um que achasse o
#   endereco ligaria e desligaria serie.
#
# USO  bash ~/serie-src/deploy/painel-no-servidor.sh
#      (rodar de novo depois de mudar o codigo do painel, pra pegar o clone atualizado)

set -euo pipefail

CONTAINER=${PAINEL_CONTAINER:-serie-painel}
SRC=${SERIE_SRC_DIR:-/home/flaviovmix/serie-src}
AR=${SERIE_AR_DIR:-/home/flaviovmix/serie}
REDE=${PAINEL_REDE:-web}
PORTA=${PAINEL_PORTA:-8790}
ENDERECO=${PAINEL_ENDERECO:-series.afx.art.br}
IMAGEM_NODE=${SERIE_NODE:-node:24-alpine}
DONO=1001:1001                 # flaviovmix, o dono dos arquivos de ~/serie
SCRIPTS="Como Reinventar o Computador do Zero/_arquivos/scripts"

conferir_pedacos() {
  local faltando=0 caminho
  for caminho in "$AR/site" "$SRC/painel/servidor.js" "$SRC/$SCRIPTS/gera-cards/gera-cards.js"; do
    if [ ! -e "$caminho" ]; then
      echo "!!! nao existe: $caminho"
      faltando=1
    fi
  done
  [ "$faltando" = 0 ] || exit 1
}

subir() {
  docker rm -f "$CONTAINER" >/dev/null 2>&1 || true
  docker run -d --name "$CONTAINER" \
    --network "$REDE" \
    --restart unless-stopped \
    --user "$DONO" \
    -e PAINEL_ESCUTA=0.0.0.0 \
    -e PAINEL_PORTA="$PORTA" \
    -e PAINEL_ENDERECO="$ENDERECO" \
    -e TZ=America/Sao_Paulo \
    -v "$AR":/raiz \
    -v "$SRC/painel":/raiz/painel:ro \
    -v "$SRC/$SCRIPTS":"/raiz/$SCRIPTS":ro \
    -w /raiz \
    "$IMAGEM_NODE" node painel/servidor.js >/dev/null
}

# O painel responde de dentro da rede do docker? Um container descartavel na mesma rede
# pergunta por ele com o Host de fora, que e o unico que o painel aceita ali.
# ⚠️ Aqui e wget, nao o fetch do node: o fetch se recusa a mandar o cabecalho Host (a
# especificacao chama isso de cabecalho proibido), entao a pergunta chegava com
# "serie-painel:8790" e o painel recusava — 403 do teste, com o painel sadio.
perguntar_ao_painel() {
  docker run --rm --network "$REDE" "$IMAGEM_NODE" \
    wget -q -O /dev/null --header="Host: $ENDERECO" "http://$CONTAINER:$PORTA/api/series"
}

conferir() {
  echo "==> esperando o painel responder"
  local tentativa=0
  until perguntar_ao_painel; do
    tentativa=$((tentativa + 1))
    if [ "$tentativa" -ge 10 ]; then
      echo "!!! o painel nao respondeu"
      echo "!!! ver o log:  docker logs --tail 40 $CONTAINER"
      exit 1
    fi
    sleep 2
  done
  echo "    respondeu em http://$CONTAINER:$PORTA/api/series"
  docker ps --filter "name=$CONTAINER" --format "    {{.Names}}  {{.Image}}  {{.Status}}"
}

conferir_pedacos
subir
conferir
echo "==> PAINEL NO AR (falta a senha e a rota no Caddy: ver deploy/LEIA-ME.md)"

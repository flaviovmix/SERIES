#!/usr/bin/env bash
#
# senha-do-painel.sh — poe o painel das series em series.afx.art.br/painel/, atras de uma
# senha, e deixa o resto do site como estava.
#
# POR QUE SENHA, E NAO SO UM ENDERECO DIFICIL
#   O painel liga e desliga serie do site publico. Quem achasse o endereco mexeria no site
#   sem pedir nada. Endereco escondido nao e protecao: basta um link vazado, um historico
#   de navegador ou um robo. A senha e do proprio Caddy (basic_auth, com a senha guardada
#   como hash bcrypt), entao nao ha login escrito por nos pra manter nem sessao pra vazar,
#   e o projeto continua sem banco e sem cadastro de usuario (D6).
#
# A SENHA NAO MORA NESTE ARQUIVO
#   Este script esta num repositorio publico. O hash chega por variavel de ambiente e fica
#   so no servidor, dentro do Caddyfile. Pra gerar um hash novo:
#
#     docker exec caddy caddy hash-password --plaintext 'a-senha-escolhida'
#
# USO (no servidor)
#   PAINEL_USUARIO=flavio PAINEL_SENHA_HASH='$2a$14$...' bash ~/serie-src/deploy/senha-do-painel.sh
#   (aspas SIMPLES no hash: ele tem cifroes, e aspas duplas deixariam o shell come-los)

set -euo pipefail

CADDYFILE=${CADDYFILE:-/home/flaviovmix/caddy/Caddyfile}
DOMINIO=${PAINEL_DOMINIO:-series.afx.art.br}
CONTAINER_PAINEL=${PAINEL_CONTAINER:-serie-painel}
CONTAINER_SITE=${SITE_CONTAINER:-serie}
PORTA=${PAINEL_PORTA:-8790}
USUARIO=${PAINEL_USUARIO:-flavio}

if [ -z "${PAINEL_SENHA_HASH:-}" ]; then
  echo "!!! falta PAINEL_SENHA_HASH (o hash bcrypt, entre aspas simples)"
  echo "!!! gerar com: docker exec caddy caddy hash-password --plaintext 'a-senha'"
  exit 1
fi
case "$PAINEL_SENHA_HASH" in
  '$2'*) ;;
  *) echo "!!! PAINEL_SENHA_HASH nao parece um hash bcrypt (comeca com \$2). Passou a senha crua?"; exit 1 ;;
esac

carimbo=$(date +%Y%m%d-%H%M)
backup="$CADDYFILE.bak-$carimbo-painel"

conferir_o_painel() {
  if ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER_PAINEL"; then
    echo "!!! o container $CONTAINER_PAINEL nao esta de pe"
    echo "!!! subir antes com: bash ~/serie-src/deploy/painel-no-servidor.sh"
    exit 1
  fi
}

# O bloco novo do dominio. O painel vem ANTES do site, senao o /painel/ cairia no nginx do
# site e daria 404. O handle_path tira o /painel da frente, entao o painel se ve na raiz —
# e por isso a pagina dele usa endereco relativo.
escrever_bloco() {
  awk -v dominio="$DOMINIO" -v usuario="$USUARIO" -v hash="$PAINEL_SENHA_HASH" \
      -v painel="$CONTAINER_PAINEL" -v site="$CONTAINER_SITE" -v porta="$PORTA" '
    $0 == dominio " {" {
      print dominio " {"
      print "    # O painel das series (D6, 16/09/2026): liga e desliga serie, e a mudanca"
      print "    # vale na hora. Vem ANTES do site, senao cairia no nginx e daria 404."
      print "    # A senha e daqui: sem ela, quem achasse o endereco mexeria no site."
      print "    redir /painel /painel/ 301"
      print "    handle_path /painel/* {"
      print "        basic_auth {"
      print "            " usuario " " hash
      print "        }"
      print "        header Cache-Control \"no-store\""
      print "        reverse_proxy " painel ":" porta
      print "    }"
      print "    handle {"
      print "        # O HTML das paginas muda a cada publicacao e o navegador guardava a"
      print "        # versao velha por conta propria (o nginx nao manda Cache-Control, e o"
      print "        # Chrome inventa um). Aqui ele e obrigado a perguntar antes de reusar."
      print "        # Imagem, CSS, JS e audio seguem com o cache normal."
      print "        @revalida path *.html / *.css *.js"
      print "        header @revalida Cache-Control \"no-cache\""
      print "        reverse_proxy " site ":80"
      print "    }"
      print "}"
      dentro = 1
      next
    }
    dentro && $0 == "}" { dentro = 0; next }
    dentro { next }
    { print }
  ' "$backup" > "$CADDYFILE.novo"

  if ! grep -q "handle_path /painel/\*" "$CADDYFILE.novo"; then
    echo "!!! nao achei o bloco $DOMINIO no Caddyfile; nada foi trocado"
    rm -f "$CADDYFILE.novo"
    exit 1
  fi
  # ⚠️ o Caddyfile e bind-mount de ARQUIVO: mv trocaria o inode e o container continuaria
  # lendo o arquivo velho, com o reload dizendo "config is unchanged". O ">" escreve no
  # MESMO inode, que e o que faz o container enxergar a mudanca.
  cat "$CADDYFILE.novo" > "$CADDYFILE"
  rm -f "$CADDYFILE.novo"
}

voltar() {
  cat "$backup" > "$CADDYFILE"
  docker exec caddy caddy reload --config /etc/caddy/Caddyfile >/dev/null 2>&1 || true
  echo "!!! o Caddyfile voltou ao que era"
}

conferir_o_painel
cp "$CADDYFILE" "$backup"
echo "==> backup do Caddyfile: $(basename "$backup")"
escrever_bloco

echo "==> validando"
if ! docker exec caddy caddy validate --config /etc/caddy/Caddyfile; then
  voltar
  exit 1
fi

echo "==> recarregando"
if ! docker exec caddy caddy reload --config /etc/caddy/Caddyfile; then
  voltar
  exit 1
fi

echo "==> conferindo"
sem_senha=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://$DOMINIO/painel/")
com_senha=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 -u "$USUARIO:${PAINEL_SENHA:-}" "https://$DOMINIO/painel/")
o_site=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://$DOMINIO/site/index.html")
printf '    %s  /painel/ sem senha (tem que ser 401)\n' "$sem_senha"
printf '    %s  /painel/ com senha (tem que ser 200; sem PAINEL_SENHA nao da pra testar)\n' "$com_senha"
printf '    %s  o site de sempre (tem que ser 200)\n' "$o_site"

if [ "$sem_senha" != "401" ] || [ "$o_site" != "200" ]; then
  echo "!!! nao ficou como devia"
  voltar
  exit 1
fi
echo "==> PAINEL NO AR em https://$DOMINIO/painel/"

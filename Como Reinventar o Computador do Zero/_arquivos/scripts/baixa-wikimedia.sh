#!/bin/bash
# Baixa uma imagem do Wikimedia Commons (thumb 640px) consultando a API,
# e imprime a licenca/artista pra por na legenda (credito e obrigatorio no CC BY-SA).
#
# Uso: bash baixa-wikimedia.sh "<Titulo_do_arquivo_no_Commons>" "<saida.jpg>" ["<pasta destino>"]
# Ex.: bash baixa-wikimedia.sh "Blaise_Pascal_Versailles.JPG" "pascal.jpg" ".../05 - Equipamentos 04 - Pascalina/img"
#
# Como achar o titulo: buscar em commons.wikimedia.org, abrir o arquivo,
# o titulo e o que vem depois de "File:" na URL (com _ no lugar de espaco).
set -e

TITULO="$1"
SAIDA="$2"
DEST="${3:-.}"
[ -z "$TITULO" ] || [ -z "$SAIDA" ] && { echo "Uso: baixa-wikimedia.sh <File:Titulo> <saida.jpg> [pasta]"; exit 1; }
mkdir -p "$DEST"
UA="FlavioSeriePodcast/1.0 (uso educacional)"
API="https://commons.wikimedia.org/w/api.php"

# --get + --data-urlencode: titulo pode ter espaco, apostrofo etc.
json=$(curl -s -A "$UA" --get "$API" \
  --data-urlencode "action=query" \
  --data-urlencode "titles=File:$TITULO" \
  --data-urlencode "prop=imageinfo" \
  --data-urlencode "iiprop=url|extmetadata" \
  --data-urlencode "iiurlwidth=640" \
  --data-urlencode "format=json")
thumb=$(echo "$json" | node -e "
  const d=JSON.parse(require('fs').readFileSync(0,'utf8'));
  const p=Object.values(d.query.pages)[0];
  if(!p.imageinfo){console.error('NAO ACHOU o arquivo no Commons');process.exit(1)}
  const ii=p.imageinfo[0];
  const md=ii.extmetadata||{};
  console.log(ii.thumburl);
  console.error('licenca: '+(md.LicenseShortName?md.LicenseShortName.value:'?')+' | artista: '+(md.Artist?md.Artist.value.replace(/<[^>]*>/g,''):'?').slice(0,80));
")
# GIF: usar o original (thumb de gif pode perder a animacao)
case "$SAIDA" in *.gif) thumb=$(echo "$json" | node -e "
  const d=JSON.parse(require('fs').readFileSync(0,'utf8'));
  console.log(Object.values(d.query.pages)[0].imageinfo[0].url);
");; esac

# baixa com validacao: o Wikimedia devolve pagina de erro HTML quando rate-limita
for tentativa in 1 2 3; do
  curl -s -A "$UA" -o "$DEST/$SAIDA" "$thumb"
  if head -c 15 "$DEST/$SAIDA" | grep -q "<!DOCTYPE\|<html"; then
    echo "tentativa $tentativa: veio pagina de erro (rate limit?), esperando 5s..."
    sleep 5
  else
    break
  fi
done
if head -c 15 "$DEST/$SAIDA" | grep -q "<!DOCTYPE\|<html"; then
  echo "FALHOU: $SAIDA continua vindo como HTML de erro"; rm "$DEST/$SAIDA"; exit 1
fi
ls -la "$DEST/$SAIDA"

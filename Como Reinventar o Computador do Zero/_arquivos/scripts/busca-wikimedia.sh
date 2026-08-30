#!/bin/bash
# Busca imagens no Wikimedia Commons e imprime titulo + licenca + tamanho,
# pra escolher qual baixar depois com baixa-wikimedia.sh.
#
# Uso: bash busca-wikimedia.sh "<termo de busca>" [quantidade]
# Ex.: bash busca-wikimedia.sh "Leyden jar" 8
set -e

TERMO="$1"
QTD="${2:-8}"
[ -z "$TERMO" ] && { echo "Uso: busca-wikimedia.sh \"<termo>\" [qtd]"; exit 1; }
UA="FlavioSeriePodcast/1.0 (uso educacional)"
API="https://commons.wikimedia.org/w/api.php"

echo "== $TERMO =="
curl -s -A "$UA" --get "$API" \
  --data-urlencode "action=query" \
  --data-urlencode "generator=search" \
  --data-urlencode "gsrsearch=$TERMO" \
  --data-urlencode "gsrnamespace=6" \
  --data-urlencode "gsrlimit=$QTD" \
  --data-urlencode "prop=imageinfo" \
  --data-urlencode "iiprop=url|size|extmetadata" \
  --data-urlencode "format=json" | node -e "
const d=JSON.parse(require('fs').readFileSync(0,'utf8'));
const pages=(d.query&&d.query.pages)?Object.values(d.query.pages):[];
if(!pages.length){console.log('  (nada)');process.exit(0)}
for(const p of pages){
  const ii=(p.imageinfo||[])[0]; if(!ii) continue;
  const md=ii.extmetadata||{};
  const lic=md.LicenseShortName?md.LicenseShortName.value:'?';
  const art=md.Artist?md.Artist.value.replace(/<[^>]*>/g,'').trim().slice(0,45):'?';
  const nome=p.title.replace(/^File:/,'');
  console.log('  ' + nome);
  console.log('      ' + ii.width + 'x' + ii.height + ' | ' + lic + ' | ' + art);
}
"

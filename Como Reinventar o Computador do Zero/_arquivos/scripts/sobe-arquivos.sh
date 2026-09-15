#!/bin/bash
# Sobe arquivos da serie pro series.afx.art.br (pasta ~/serie no servidor), com backup
# carimbado do que ja esta no ar e conferencia de md5 local x no ar. Os caminhos sao
# relativos a raiz do repo SEIRES, entao serve pro site e pras animacoes:
#
#   bash sobe-arquivos.sh site/js/menu.js site/css/animacao/tocador.css
#   bash sobe-arquivos.sh "Como Reinventar o Computador do Zero/_REFAZER/11 - A máquina que conversa/01 - A escala/animacao.html"
#
# Ordem: sobe na ordem em que os caminhos vierem. Css e js ANTES de html, senao a
# pagina no ar aponta por um instante pra script que ainda nao chegou.
# Arquivo novo (sem copia no servidor) sobe sem backup. O backup dos que existem vai
# num tgz so: ~/serie-backup-<carimbo>.tgz.
# Antes de subir arquivo compartilhado (site/js, site/css), rodar inventario-site.sh:
# ele lista o que difere entre o local e o ar, pra nao levar junto trabalho de outra
# sessao (ver revisa-diferencas.sh). ⚠️ site/index.html e site/js/menu.js carregam
# series ainda nao publicadas? Conferir no diff antes de subir inteiros.
set -e
SERVIDOR="flaviovmix@200.139.74.173"
LOCAL="/c/src/PROJETOS/SEIRES"
REMOTO="/home/flaviovmix/serie"
URL="https://series.afx.art.br"
CARIMBO=$(date +%Y%m%d-%H%M)
LISTA=$(mktemp)

[ $# -gt 0 ] || { echo "uso: $0 <caminho relativo a raiz do SEIRES> ..."; exit 1; }
for arq in "$@"; do
  [ -f "$LOCAL/$arq" ] || { echo "nao existe local: $arq"; exit 1; }
  printf '%s\n' "$arq" >> "$LISTA"
done

echo "--- backup do que ja esta no ar (tgz em ~/serie-backup-$CARIMBO.tgz) ---"
# so os que existem la: o tar reclamaria dos novos
ssh "$SERVIDOR" "cd '$REMOTO' && while IFS= read -r f; do [ -f \"\$f\" ] && printf '%s\n' \"\$f\"; done > /tmp/sobe-existentes.txt; if [ -s /tmp/sobe-existentes.txt ]; then tar czf ~/serie-backup-$CARIMBO.tgz -T /tmp/sobe-existentes.txt && echo \"backup: \$(wc -l < /tmp/sobe-existentes.txt) arquivo(s)\"; else echo 'nada pra guardar: tudo e novo'; fi" < "$LISTA"

echo "--- sobe ---"
# tar por cima do ssh: aguenta espaco, acento e apostrofo nos nomes (d'agua, maquina)
(cd "$LOCAL" && tar cf - -T "$LISTA") | ssh "$SERVIDOR" "cd '$REMOTO' && tar xf -"
echo "subiu: $(wc -l < "$LISTA") arquivo(s)"

echo "--- md5 local x no ar ---"
while IFS= read -r arq; do
  l=$(md5sum "$LOCAL/$arq" | cut -c1-32)
  caminho=$(printf '%s' "$arq" | sed "s/ /%20/g; s/'/%27/g")
  r=$(curl -s --max-time 30 "$URL/$caminho" | md5sum | cut -c1-32)
  if [ "$l" = "$r" ]; then echo "IGUAL  $arq"; else echo "DIFERENTE  $arq"; fi
done < "$LISTA"
rm -f "$LISTA"

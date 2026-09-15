#!/bin/bash
# Inventario do deploy da serie: md5 de todo html/css/js do servidor (~/serie) contra a
# copia local em PROJETOS/SEIRES. Nao sobe nada: so lista o que difere.
set -e
SERVIDOR="flaviovmix@200.139.74.173"
RAIZ="/c/src/PROJETOS/SEIRES"
SAIDA="${QA_OUT:-/tmp}/inventario-serie"
mkdir -p "$SAIDA"

echo "--- md5 do servidor ---"
ssh "$SERVIDOR" "cd ~/serie && find . -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' \) -exec md5sum {} +" \
  | sed 's|  \./|  |' | sort -k2 > "$SAIDA/servidor.txt"
echo "arquivos no servidor: $(wc -l < "$SAIDA/servidor.txt")"

: > "$SAIDA/diferentes.txt"
: > "$SAIDA/sem-copia-local.txt"
iguais=0
while IFS= read -r linha; do
  hash_servidor="${linha:0:32}"
  caminho="${linha:34}"
  if [ ! -f "$RAIZ/$caminho" ]; then
    echo "$caminho" >> "$SAIDA/sem-copia-local.txt"
    continue
  fi
  hash_local=$(md5sum "$RAIZ/$caminho" | cut -c1-32)
  if [ "$hash_local" = "$hash_servidor" ]; then
    iguais=$((iguais + 1))
  else
    echo "$caminho" >> "$SAIDA/diferentes.txt"
  fi
done < "$SAIDA/servidor.txt"

echo "iguais: $iguais"
echo "diferentes: $(wc -l < "$SAIDA/diferentes.txt")"
echo "no servidor sem copia local: $(wc -l < "$SAIDA/sem-copia-local.txt")"
echo "--- diferentes ---"
cat "$SAIDA/diferentes.txt"
echo "--- sem copia local ---"
cat "$SAIDA/sem-copia-local.txt"

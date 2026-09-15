#!/bin/bash
# Baixa do servidor (numa chamada so) as copias dos arquivos que diferem e mostra o
# que muda em cada um. HTML e JS com a diferenca inteira; CSS so com a contagem.
set -e
SERVIDOR="flaviovmix@200.139.74.173"
RAIZ="/c/src/PROJETOS/SEIRES"
PASTA="${QA_OUT:-/tmp}/inventario-serie"
DOAR="$PASTA/do-ar"
rm -rf "$DOAR" && mkdir -p "$DOAR"

ssh "$SERVIDOR" "cd ~/serie && tar cf - -T -" < "$PASTA/diferentes.txt" | tar xf - -C "$DOAR"

while IFS= read -r caminho; do
  linhas=$(diff <(tr -d '\r' < "$DOAR/$caminho") <(tr -d '\r' < "$RAIZ/$caminho") | grep -c '^[<>]' || true)
  echo "=== $caminho ($linhas linhas de diferenca)"
  case "$caminho" in
    *.css) ;;
    *) diff <(tr -d '\r' < "$DOAR/$caminho") <(tr -d '\r' < "$RAIZ/$caminho") | grep -v 'fonts.googleapis.com/css2' | grep '^[<>]' | cut -c1-220 || true ;;
  esac
done < "$PASTA/diferentes.txt"

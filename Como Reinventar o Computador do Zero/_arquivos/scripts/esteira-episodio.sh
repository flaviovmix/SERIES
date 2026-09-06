#!/usr/bin/env bash
# Esteira de um episodio, do trio pronto ate a conferencia. Nasceu de repetir isso a
# mao no 6.02, 6.01, 6.03, 6.04 e 7.01 (03 e 04/09/2026).
#
#   bash esteira-episodio.sh "<pasta do episodio>"            # gera, espera, baixa, confere
#   bash esteira-episodio.sh "<pasta do episodio>" "<url>"    # pula a geracao (audio ja disparado)
#
# Por que os dois browsers: o Edge cria o notebook e vigia sem brigar com o Chrome
# (que costuma estar com o WhatsApp), mas ele CAI no download. O Chrome baixa.
set -e

LAB="/c/Users/ASUS/AppData/Local/notebooklm-lab"
SCRIPTS="/c/src/PROJETOS/SEIRES/Como Reinventar o Computador do Zero/_arquivos/scripts"
PASTA="$1"
URL="$2"

[ -z "$PASTA" ] && { echo 'uso: bash esteira-episodio.sh "<pasta do episodio>" ["<url do notebook>"]'; exit 1; }

limpa_chrome () {
  powershell -NoProfile -Command "\$ids = Get-CimInstance Win32_Process -Filter \"Name='chrome.exe'\" | Where-Object { \$_.CommandLine -like '*notebooklm-lab*' } | Select-Object -ExpandProperty ProcessId; if (\$ids) { Stop-Process -Id \$ids -Force -ErrorAction SilentlyContinue }" 2>/dev/null || true
  rm -f "$LAB/profile/Singleton"* 2>/dev/null || true
}

cd "$LAB"

if [ -z "$URL" ]; then
  echo "== gerando (Edge) =="
  rm -f profile-edge/Singleton* 2>/dev/null || true
  SAIDA=$(LAB_CANAL=msedge LAB_PERFIL=profile-edge node cria-episodio.js "$PASTA" 2>&1 | tee /dev/stderr)
  URL=$(echo "$SAIDA" | grep -oE 'https://notebook[^ ]*' | head -1)
  [ -z "$URL" ] && { echo "nao consegui a URL do notebook"; exit 1; }
fi
echo "notebook: $URL"

echo "== esperando o audio (Edge) =="
pronto=0
for t in 1 2 3 4 5 6; do
  if LAB_CANAL=msedge LAB_PERFIL=profile-edge node espera-audio.js "$URL"; then pronto=1; break; fi
  echo "(a janela caiu; tentando de novo)"
  sleep 30
done
[ $pronto -eq 1 ] || { echo "nao ficou pronto no tempo"; exit 1; }

echo "== baixando (Chrome) =="
for t in 1 2 3; do
  limpa_chrome
  if node baixa-episodio.js "$URL" "$PASTA" ; then break; fi
  echo "(download falhou; tentando de novo)"
done

echo "== conferindo contra o roteiro =="
cd "$SCRIPTS"
python mapa-de-telas.py "$PASTA"
echo "-- pedidos de Proximo no audio (tem que ser telas - 1) --"
grep -oic "aperte o pr" "$PASTA/_transcricao.txt" 2>/dev/null || true

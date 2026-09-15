Capa da série "Do LED ao ESP32" (card do hub, site/img/serie-hardware.webp).

Gerada no Google Flow, modo imagem (não gasta crédito; o modo padrão da barra é vídeo, o
flow-capa.js troca pra Imagem sozinho), no projeto da série do computador:
  https://labs.google/fx/pt/tools/flow/project/7543972f-546b-4127-879e-83882fdd48dd

O prompt exato está em capa-serie.txt, nesta pasta.

Regerar (scripts em %LOCALAPPDATA%\notebooklm-lab, com a janela do lab aberta no projeto):
  node flow-capa.js "<conteúdo de capa-serie.txt>" "C:/src/PROJETOS/SEIRES/HARDWARE/_arquivos/capa-serie" "16:9" "capa-serie"

Saem capa-serie-01.png, -02.png... na pasta de cima. A escolhida vira
site/img/serie-hardware.webp em 1200x670, igual às outras capas do hub.

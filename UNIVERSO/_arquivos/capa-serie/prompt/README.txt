Capa da série Universo (card da home, site/img/serie-universo.webp), criada em 17/09/2026.

A cena vem da linha de apoio da série (D7, "do quintal ao limite do que dá pra ver"): um quintal à
noite, um telescópio pequeno apontado pra cima e a Via Láctea ocupando quase o quadro inteiro.
Sem pessoa, sem casa acesa, sem avião, sem texto.

Gerada no Google Flow, modo imagem (não gasta crédito; o modo padrão da barra é vídeo, o
flow-capa.js troca pra Imagem sozinho), no projeto da série do computador:
  https://labs.google/fx/pt/tools/flow/project/7543972f-546b-4127-879e-83882fdd48dd

O prompt exato está em capa-serie.txt, nesta pasta.

Regerar (scripts em %LOCALAPPDATA%\notebooklm-lab, com a janela do lab aberta no projeto):
  node flow-capa.js "<conteúdo de capa-serie.txt>" "C:/src/PROJETOS/SEIRES/UNIVERSO/_arquivos/capa-serie" "16:9" "capa-serie"

Saem capa-serie-01.png, -02.png... na pasta de cima. A escolhida vira
site/img/serie-universo.webp em 1200x670, igual às outras capas do hub.

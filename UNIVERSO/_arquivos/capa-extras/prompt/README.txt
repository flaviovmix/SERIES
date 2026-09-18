Artes dos extras da série Universo, criadas em 17/09/2026: o card que leva aos extras no hub
(site/universo.html) e os cinco cards da página dos extras (site/extras/universo.html).

Mesmo mundo visual das artes de etapa (../../capa-etapas/prompt/): fundo escuro, luz âmbar
quente e sombra azul fria, com cara de foto. Como os extras descem do céu pra bancada, aqui
as cenas são de objeto e de lugar:
  ex-capa  o card do hub: a mesa dos aprofundamentos (pedra, lupa, luneta, fóssil, caderno)
  ex-01    Quem foi Carl Sagan: uma TV de 1980 com uma galáxia na tela. SEM rosto e sem pessoa:
           não se gera imagem de gente real
  ex-02    A tensão de Hubble: um domo de telescópio e uma antena apontados pro mesmo céu
  ex-03    Como se data uma pedra: um grão de zircão na ponta da pinça
  ex-04    A carta do tempo: as camadas de um cânion (a carta de verdade é feita de texto, e
           o Flow não escreve texto que preste)
  ex-05    Chicxulub: testemunhos de perfuração, com a fronteira entre o calcário claro e a
           rocha escura e estilhaçada

Os cinco extras são os CANDIDATOS da seção _EXTRAS do plano da série, ainda sem pasta e sem
ordem fechada: a lista é aberta (DE3 do processo editorial) e pode mudar.

Geradas no Google Flow, modo imagem (não gasta crédito; o flow-capa.js troca de vídeo pra Imagem
sozinho), no projeto da série do computador:
  https://labs.google/fx/pt/tools/flow/project/7543972f-546b-4127-879e-83882fdd48dd

Regerar (scripts em %LOCALAPPDATA%\notebooklm-lab, janela do lab aberta no projeto):
  node flow-capa.js "<conteúdo de ex-NN.txt>" "C:/src/PROJETOS/SEIRES/UNIVERSO/_arquivos/capa-extras" "16:9" "ex-NN"

Saem ex-NN-01.png, -02.png... na pasta de cima. A escolhida vira site/img/universo-extra-NN.webp
(e a ex-capa vira site/img/universo-extras.webp), em 1200x670.

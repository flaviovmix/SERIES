Artes dos cards dos 5 episódios da etapa 01, Janeiro (site/etapas/universo-01.html), criadas em 17/09/2026.

Mesmo mundo visual das artes de etapa (../../../capa-etapas/prompt/): fundo escuro, luz âmbar
quente e sombra azul fria, reconstituição com cara de foto. Uma cena por episódio:
  ep-01  O primeiro instante e o que ninguém sabe: o começo quente enchendo o quadro inteiro, sem centro e sem borda
  ep-02  A primeira luz: a névoa que clareia e solta a luz pela primeira vez
  ep-03  As primeiras estrelas: uma estrela gigante sozinha, abrindo uma bolha no gás escuro
  ep-04  A galáxia mais distante: um campo profundo cheio de galáxias (o prompt pede um borrão vermelho
         mínimo no meio, mas na variante -01 ele não se acha; por isso a legenda do card fala do campo)
  ep-05  A Via Láctea começa: o disco espesso e turbulento de uma galáxia jovem, quase de perfil

Cuidados que vêm dos alertas do _pesquisa-inicial.md e que os prompts já carregam:
  - o ep-01 NÃO mostra explosão num ponto: a luz enche o quadro por igual, sem fonte.
  - o ep-03 é reconstituição declarada: nenhuma estrela de população III foi observada.
  - o ep-04 parece foto de telescópio e NÃO é: o crédito "ilustração" no card é obrigatório,
    e o prompt proíbe círculo, seta e rótulo em volta do borrão.
  - nenhuma delas é foto.

Geradas no Google Flow, modo imagem (não gasta crédito; o flow-capa.js troca de vídeo pra Imagem
sozinho), no projeto da série do computador:
  https://labs.google/fx/pt/tools/flow/project/7543972f-546b-4127-879e-83882fdd48dd

Regerar (scripts em %LOCALAPPDATA%\notebooklm-lab, janela do lab aberta no projeto):
  node flow-capa.js "<conteúdo de ep-NN.txt>" "C:/src/PROJETOS/SEIRES/UNIVERSO/_arquivos/capa-episodios/etapa-01" "16:9" "ep-NN"

Saem ep-NN-01.png, -02.png... na pasta de cima. A escolhida vira site/img/universo-01-ep-NN.webp
em 1200x670. Quando o episódio nascer, o card pode trocar esta arte por uma tela da própria animação.

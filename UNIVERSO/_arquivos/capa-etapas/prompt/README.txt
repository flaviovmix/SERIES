Artes dos cards das 6 etapas da série Universo (site/universo.html), criadas em 17/09/2026.

Mesmo mundo visual da capa da série (../../capa-serie/prompt/capa-serie.txt): fundo escuro,
luz âmbar quente e sombra azul fria, reconstituição com cara de foto. Uma cena por etapa:
  etapa-01  Janeiro: as primeiras estrelas acendendo dentro do gás escuro, uma galáxia jovem ao fundo
  etapa-02  De fevereiro a agosto: a galáxia grande desfiando uma anã em correntes de estrelas, e o vazio em volta
  etapa-03  Setembro e outubro: a Terra recém-formada, ainda em brasa, com a Lua nova e grande bem perto
  etapa-04  Novembro e a primeira quinzena de dezembro: a célula grande envolvendo uma bactéria, vista de microscópio
  etapa-05  De 17 a 30 de dezembro: dinossauros bebendo no rio ao amanhecer, com o risco do asteroide ainda longe no céu
  etapa-06  31 de dezembro: o grupo em volta da fogueira, as mãos em ocre na pedra e a Via Láctea por cima

Cuidados que vêm dos alertas do _pesquisa-inicial.md e que os prompts já carregam:
  - a etapa 01 NÃO mostra explosão num ponto (o Big Bang não foi isso); a luz nasce espalhada.
  - a etapa 05 tem dinossauro com pena em primeiro plano (as aves são dinossauros vivos) e o asteroide
    ainda não caiu: a arte não afirma causa única da extinção.
  - a etapa 06 não tem fila de macaco virando homem, nem escrita na pedra (o prompt pede "no writing").
  - nenhuma delas é foto: o crédito no card é "ilustração", como manda a regra de produção da série.

Geradas no Google Flow, modo imagem (não gasta crédito; o flow-capa.js troca de vídeo pra Imagem
sozinho), no projeto da série do computador:
  https://labs.google/fx/pt/tools/flow/project/7543972f-546b-4127-879e-83882fdd48dd

Regerar (scripts em %LOCALAPPDATA%\notebooklm-lab, janela do lab aberta no projeto):
  node flow-capa.js "<conteúdo de etapa-NN.txt>" "C:/src/PROJETOS/SEIRES/UNIVERSO/_arquivos/capa-etapas" "16:9" "etapa-NN"

Saem etapa-NN-01.png, -02.png... na pasta de cima. A escolhida vira site/img/universo-etapa-NN.webp
em 1200x670, igual à capa da série e às artes de etapa das outras séries.

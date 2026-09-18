Capa da série De onde veio a Bíblia (card da home, site/img/serie-biblia-livro.webp), feita em 18/09/2026.

A CAPA QUE ENTROU É FOTO REAL, NÃO FLOW.
O Flow bateu no limite de uso em 18/09/2026 ("Você chegou ao limite de uso. Tente de novo mais
tarde", sem cobrança), e o Gemini (cria-imagem.js) devolveu um recorte de tela de 708x395 com os
botões do site por cima. Então a capa seguiu a regra de produção da série, "objeto real, foto
real": um trecho do Grande Rolo de Isaías (1QIsa-a), o rolo quase completo achado em 1947 em
Qumran, datado por volta de 125 a.C. pelo Israel Museum (paleografia; o radiocarbono de Jull et al.
1995 concorda). É o objeto do episódio 4.01 e o melhor exemplo das duas marcas da prateleira.

Fonte da imagem:
  Wikimedia Commons, "File:The Great Isaiah Scroll MS A (1QIsa) - Google Art Project-x1-y0.jpg"
  (29696x5013, scan do Google Cultural Institute, asset NAEMzlf5AD5yOQ), licença na página do
  arquivo: Public domain (consultada pela API do Commons em 18/09/2026).
  https://commons.wikimedia.org/wiki/File:The_Great_Isaiah_Scroll_MS_A_(1QIsa)_-_Google_Art_Project-x1-y0.jpg
  O objeto está no Santuário do Livro, Israel Museum, Jerusalém.

Recorte: a altura inteira do rolo (0 a 5013) e a largura na proporção 1200:670, centrada em x=15442
do arquivo original (recorte 10953..19932), reduzida pra 1200x670. O PNG do recorte está em
capa-serie-isaias-1200x670.png, na pasta de cima; o webp do site saiu dele com qualidade 82.
Crédito no cards.js: "Grande Rolo de Isaías, c. 125 a.C., foto de domínio público".

A ALTERNATIVA QUE NÃO ENTROU (P3 do plano, pra quando o Flow voltar, se ele preferir):
capa-serie.txt, nesta pasta, é o prompt da prateleira quase vazia (um rolo e um códice numa ponta,
um livro moderno na outra, sem letra legível, sem símbolo religioso, sem pessoa). Regerar com a
janela do lab aberta no projeto (%LOCALAPPDATA%\notebooklm-lab):
  node flow-capa.js "<conteúdo de capa-serie.txt>" "C:/src/PROJETOS/SEIRES/BIBLIA-LIVRO/_arquivos/capa-serie" "16:9" "capa-serie"
Projeto do Flow: https://labs.google/fx/pt/tools/flow/project/7543972f-546b-4127-879e-83882fdd48dd

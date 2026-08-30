Um prompt por cena, exatamente o que gerou o par flow-<nome>-01/-02.png
(recuperado do historico da sessao que gerou essas imagens; nao existia
arquivo antes disso, o texto so tinha sido digitado ao vivo no Flow).

Pra gerar de novo (com ou sem alteracao no texto), com a janela do Flow
ja aberta no projeto da serie:

  node abre.js "https://labs.google/fx/pt/tools/flow/project/7543972f-546b-4127-879e-83882fdd48dd"
  node flow-capa.js "<cole o prompt aqui>" "<pasta do episodio>/img/flow" "16:9" "flow-<nome>"

Os dois scripts (abre.js e flow-capa.js) moram em
C:\Users\ASUS\AppData\Local\notebooklm-lab. A numeracao continua sozinha
(sai -03/-04 sem apagar o que ja existe), entao dá pra comparar as
tentativas antigas com as novas antes de trocar qual entra na pagina.

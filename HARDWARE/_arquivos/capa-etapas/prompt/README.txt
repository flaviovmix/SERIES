Artes dos cards das 5 etapas da série Hardware (site/hardware.html), criadas em 14/09/2026.

Mesmo estilo da capa da série (../../capa-serie/prompt/capa-serie.txt): oficina escura à noite,
bancada de madeira, luz âmbar da direita, a caixa d'água em miniatura em todas. Uma cena por etapa:
  etapa-01  O cérebro e os sentidos: placa, LED, botão, trimpot, relé e bomba
  etapa-02  O controlador fica esperto: ultrassom sobre a caixa, visor, motor de passo no registro
  etapa-03  O painel da portaria: notebook com um painel feito só de formas, ligado por USB
  etapa-04  A caixa d'água no WiFi: placa WiFi e celular mostrando a caixa
  etapa-05  A placa própria: placa verde pronta sobre o desenho da placa, ferro de solda

Gerada no Google Flow, modo imagem (não gasta crédito; o flow-capa.js troca de vídeo pra Imagem
sozinho), no projeto da série do computador:
  https://labs.google/fx/pt/tools/flow/project/7543972f-546b-4127-879e-83882fdd48dd

Regerar (scripts em %LOCALAPPDATA%\notebooklm-lab, janela do lab aberta no projeto, pelo PowerShell):
  node flow-capa.js "<conteúdo de etapa-NN.txt>" "C:/src/PROJETOS/SEIRES/HARDWARE/_arquivos/capa-etapas" "16:9" "etapa-NN"

Em 14/09 a etapa-05-01.png saiu com a marca "Weller" legível no suporte do ferro de solda; o
etapa-05.txt ganhou "plain unbranded soldering iron ... no brand names" e a 05 foi regerada.

Saem etapa-NN-01.png, -02.png... na pasta de cima. A escolhida vira site/img/hardware-etapa-NN.webp
em 1200x670, igual à capa da série e às artes de etapa de Do Ábaco à IA.

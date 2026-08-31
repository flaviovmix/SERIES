# Planta de telas — EX-06 O Sistema de 60

**Extra, fora da linha do tempo:** autocontido, sem pessoa, sem data, sem citar série ou
episódio vizinho (REGRAS DURAS nº 1 e 2 dos extras). **Analogia única: o relógio** — o
contador de base sessenta que todo mundo lê sem saber; a divisão sem sobra como razão de
o grupo ter sobrevivido. "Há quem conte assim até hoje" (falanges) fica sem povo nomeado
de propósito, pela REGRA DURA nº 1.

**Estado (31/08/2026): áudio pronto e conferido.** Trio escrito em cima das telas, áudio
**"Por que a hora tem sessenta minutos"** (23:51, notebook em `_notebook-url.txt`),
transcrito pelo `mapa-de-telas.py`: 10 telas no áudio pras 10 da página, 9 pedidos de
Próximo na ordem, conteúdo batendo tela a tela (feira, dois-pontos como parede, botão
"quase no estouro" com a cascata 59:59→1:00:00, falanges, pedras com sobra, 360°,
2:35 = 155 s, prática com pausa), REGRAS DURAS respeitadas. Tocador no cabeçalho (capa =
relógio de estação), marcadores do `episodio.js` pelo `marcadores-do-mapa.py`. Falta a
régua 7: o Flávio ouvir com a página aberta (card do hub está "pra conferir").

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | você já conta em base 60 todo dia + a arte do relógio de estação (mostrador só com traços) |
| 2 | cena | por que 60: divide por 2,3,4,5,6,10,12,15,20,30 sem resto; o cem tropeça no três |
| 3 | cena | a escrita: cada casa conta 0-59 com algarismos de dez; o dois-pontos é a parede entre casas |
| 4 | demonstração | relógio acelerado (0,12s por segundo): vai-um a cada 60; botão "quase no estouro" leva a 59:45 e a cascata 59:59→1:00:00 acontece na frente |
| 5 | cena | sessenta numa mão: 12 falanges numa, 5 dedos na outra — 5×12=60 |
| 6 | demonstração | repartir pedras: ÷2 a ÷6, alternando 60/100 — a SOBRA aparece em moldura de alerta |
| 7 | cena | o irmão: 360° = 6×60; o círculo que corta bonito em metade/terço/quarto/quinto/sexto |
| 8 | demonstração | ler 2:35 no clique: 2×60=120, +35, 155 segundos — casa multiplica, algarismo conta |
| 9 | prática | montar 65, 125 e 600 segundos com +1 min / +1 s (65≠105; 600 deixa os segundos vazios) com trilha |
| 10 | fecho/ficha | onde o 60 vive (tempo/ângulo), o preço (sistema dentro do outro) e onde a analogia quebra |

**Peças:** `sessenta.js` tem o **relógio** (formata segundos em m:ss ou h:mm:ss; na
leitura, as partes destacáveis), as **pedras da divisão** (grupos + sobra em
`--flag`) e a prática por botões — tudo peça própria deste extra, sem clone. A trilha
vem da base (`site/js/animacao/trilha.js`), com `rotulo` formatando o alvo ("65 s").
`animacao.html` nasceu do `_molde-animacao.html` da base, sem tocador e sem modelo 3D.

**Artes (Flow, Nano Banana 2, 16:9, prompts em `img/flow/prompt/`):**
`relogio-de-estacao` (capa), `feira-da-divisao` (tela 2), `relogio-de-bolso` (tela 3),
`mao-das-falanges` (tela 5), `compasso-no-papel` (tela 7). Todas com selo `ilustração` e
legenda de reconstituição; os mostradores foram pedidos **só com traços, sem numerais**.

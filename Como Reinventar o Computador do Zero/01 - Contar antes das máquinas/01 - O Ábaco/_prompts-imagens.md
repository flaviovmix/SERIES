# O Ábaco — prompts das imagens geradas

Cinco cenas para a abertura em linha do tempo (telas 2 a 5). **Registro fotográfico
realista, não ilustração**: o episódio virou página pública, e a intenção é que
pareçam reconstituição arqueológica fotografada, não desenho.

Todas 16:9. Geradas no Google Flow. Cada uma entra no card com o selo `ilustração` e o
aviso de que **não é fotografia de época** — reconstituição realista continua sendo
reconstituição, e apresentá-la como achado seria mentira.

**Regra que vale para todas:** nada de texto legível na cena. Números e letras
modernos aparecendo no canto já estragaram gerações em outros episódios. A única
exceção é a cena 4, onde as marcas em cunha são o assunto — e ainda assim elas são
impressões, não escrita legível.

---

## 1. `pastor-fichas.png` — tela 2, esquerda · ~8000 a.C.

Uma ovelha sai, uma ficha na mão. A ideia funcionando.

> Documentary photograph, Neolithic Fertile Crescent, around 8000 BC. A shepherd in
> his forties crouches at the low stone wall of a sheep pen, weathered hands cupped
> open at chest height. In his palm rest seven small sun-baked clay counting tokens in
> simple geometric shapes — cones, spheres, flat discs — each barely the size of a
> thumbnail, ochre and grey. He is looking past his hand at the sheep filing out of
> the pen behind him, counting. Coarse undyed wool tunic, dust on his forearms. Late
> afternoon side light, long shadows, warm dry air with fine dust suspended.
> Shot on 50mm, f/2.8, shallow depth of field with the tokens in sharp focus and the
> sheep soft behind. Natural colour, no stylisation.
> Negative: no text, no numbers, no letters, no modern objects, no metal tools,
> no illustration or painterly look.

## 2. `pastor-maos-cheias.png` — tela 2, direita · o limite

O mesmo homem, o mesmo dia, o rebanho maior. A ideia quebrando.

> Documentary photograph, same Neolithic shepherd, same location and light as the
> previous frame, later in the season. Both hands cupped together and overflowing with
> more than fifty small clay counting tokens; several are spilling between his fingers
> and falling toward the ground, caught mid-air. His expression is strained, not
> comic — a man losing count. Behind him a much larger flock crowds the pen.
> Shot on 50mm, f/2.8, focus on the spilling tokens, motion blur only on the falling
> ones. Natural colour, no stylisation.
> Negative: no text, no numbers, no letters, no modern objects, no illustration look.

## 3. `bulla.png` — tela 3 · ~3500 a.C.

As fichas viram registro selado: a conta que ninguém pode adulterar.

> Documentary photograph, Uruk period Mesopotamia, around 3500 BC. On a low wooden
> table, a hollow clay envelope the size of an orange, its surface still damp,
> impressed all over with the shapes of the tokens sealed inside. Beside it: a small
> heap of loose clay tokens waiting to be enclosed, and a carved stone cylinder seal
> lying on its side. A merchant's hands enter frame from the right, pressing the seal
> into the clay. Mud-brick wall behind, oil lamp warmth mixing with daylight from a
> doorway.
> Shot on 85mm macro, f/4, the envelope in sharp focus, the hands slightly soft.
> Natural colour, museum-object clarity, no stylisation.
> Negative: no text, no numbers, no readable writing, no modern objects.

## 4. `nasce-a-escrita.png` — tela 4 · ~3100 a.C.

A marca substitui a ficha. A escrita nasce da contabilidade, não da poesia.

> Documentary photograph, Mesopotamia around 3100 BC, overhead three-quarter view of a
> scribe's work surface. A flat damp clay tablet fills most of the frame; a cut reed
> stylus is pressed into it, leaving small wedge-shaped impressions arranged in rows.
> To the left of the tablet, a handful of clay tokens lies discarded and dusty, clearly
> set aside. The wedge marks are impressions in clay, not drawn characters, and must
> not resemble any modern alphabet.
> Shot on 85mm, f/5.6, raking side light so every impression casts a shadow and reads
> as depth. Natural colour, no stylisation.
> Negative: no modern letters, no numbers, no alphabet, no legible words, no paper,
> no ink, no illustration look.

## 5. `tabua-colunas.png` — tela 5 · ~2700 a.C.

A tábua com colunas: a pedra ganha lugar, e o lugar ganha valor.

> Documentary photograph, Sumer around 2700 BC. A large flat clay-and-stone counting
> board on a low table, its surface scored with straight parallel grooves dividing it
> into four vertical columns. Small smooth pebbles sit in the grooves, a different
> number in each column. A scribe's hand is caught mid-motion sliding a single pebble
> from one column into the next. Courtyard daylight, mud-brick wall, a clay jar in the
> soft background.
> Shot on 50mm, f/4, focus on the hand and the moving pebble, the far columns falling
> gently out of focus. Natural colour, no stylisation.
> Negative: no text, no numbers, no letters, no beads on rods, no wooden frame abacus,
> no modern objects.

---

## Depois de gerar

1. Reduzir para ~1100px e salvar em `img\web\` (o construído carrega base64: original
   em png fica só no arquivo).
2. Escrever `img\CREDITOS.md`, que **ainda não existe nesta pasta** — inclusive para as
   quatro imagens antigas, hoje sem licença registrada.
3. Cada card recebe o selo `ilustração` e o `data-cred` dizendo que é reconstituição.
   As de acervo (Salamina, ábaco romano, cuneiforme real, campeonato de soroban)
   recebem `imagem real`.

---

## Geradas em 29/08/2026

As cinco saíram no **Gemini**, não no Flow, com os prompts acima em uma linha só e o
pedido "Generate a 16:9 photorealistic documentary photograph" na frente. Saem em PNG
1024x572 e viram `.jpg` na pasta `img\`.

O script está em `C:\Users\ASUS\AppData\Local\notebooklm-lab\cria-imagem.js`, ao lado dos
outros do lab, e usa o mesmo perfil logado do NotebookLM:

```
node cria-imagem.js <lista.json> <pasta-de-saida>
```

A lista é um array de `{ "nome": "arquivo.png", "prompt": "..." }`. Ele pula o que já
existe na pasta de saída, então dá pra rodar de novo pra completar o que faltou. Uma
conversa nova por imagem, senão a anterior contamina o pedido seguinte.

**Rendimento:** quatro das cinco vieram de primeira e ficaram fiéis ao pedido, inclusive
nos negativos (nada de texto, nada de objeto moderno). A quinta precisou de segunda
tentativa, e não por causa da imagem: o download não achou o elemento na primeira versão
do script.

---

## 6. `abaco-modelo.png` — arte do card do episódio no site · 29/08

Não é cena histórica: é capa. Por isso é **ilustração declarada**, sem selo e sem aviso de
reconstituição, e desenha o **modelo simples** (quatro hastes horizontais, sem a divisão de
dois) — o mesmo aparelho do 3D e das práticas, não o suanpan das fotos. Vive em
`site/img/abaco-modelo.png`.

> Editorial illustration, 16:9 landscape, flat vector style with clean line work, no
> photorealism. Subject: a simple wooden counting frame (abacus) seen straight on at a
> slight three-quarter angle, standing on two feet. It has exactly FOUR horizontal rods
> stacked one above the other, and exactly NINE round beads threaded on each rod. Very
> important: there is NO divider bar and NO upper deck - each rod is one single open row of
> nine beads, nothing separating them, this is not a Chinese suanpan and not a Japanese
> soroban. On each rod a few beads are pushed to the left end and the rest rest at the right
> end, leaving a clear gap in the middle. Background: deep teal-navy gradient from #16455a
> to #0b2a38, with a faint regular grid of small dots. The frame is drawn in pale cyan-white
> (#dceef4) line work with dark wood fill; the beads are warm amber and copper. Calm, quiet,
> museum-plate feeling, the abacus placed slightly left of centre with generous empty
> background on the right.
> Negative: no text, no numbers, no letters, no labels, no watermark, no hands, no people,
> no divider bar, no upper deck, no beads separated into pairs, no photograph.

⚠️ **O que o gerador não entregou:** a contagem. Pedi nove contas por haste, insisti numa
segunda variante ("COUNT CAREFULLY... nine beads per rod, four rods, thirty-six beads") e
as duas saíram com ~12. A divisão de dois, que era o pedido do Flávio, saiu certa nas duas.
Se a contagem incomodar, o caminho barato não é o Gemini: é fotografar o modelo 3D, que
tem as nove exatas.

## risco-no-osso.jpg (30/08, tela 2, Google Flow)

Gerada no Flow (Nano Banana 2, 16:9) pelo `flow-capa.js` do lab, no projeto da série.
Prompt exato em `img/flow/prompt/risco-no-osso.txt`; a primeira variante serviu
(`flow/flow-risco-no-osso-01.png`, 777 KB), convertida pra JPG de 1600px (142 KB).

## entregador-bulla.jpg (30/08, tela 4, Google Flow)

Pedido do Flávio: ilustrar o entregador que levava a bola de argila como documento.
Gerada no Flow (Nano Banana 2, 16:9) pelo `flow-capa.js` do lab, no projeto da série.
Prompt exato em `img/flow/prompt/entregador-bulla.txt`; a primeira variante serviu
(`flow/flow-entregador-bulla-01.png`, 858 KB), convertida pra JPG de 1600px. Entrou como
segunda figura da tela 4, ao lado da bulla parada: uma mostra o objeto, a outra o uso.

## piramide-em-obra.jpg, escriba-papiro.jpg, barcos-calcario.jpg (30/08, telas 7 e 8, Google Flow)

As três artes das telas do Egito, geradas no Flow (Nano Banana 2, 16:9) pelo `flow-capa.js`
do lab, no projeto da série. Prompts exatos em `img/flow/prompt/`, um por arquivo; a primeira
variante de cada serviu, convertida pra JPG de 1600px. A tela 7 (a pergunta) mostra Gizé em
obra com o escriba contando os blocos; a tela 8 (a resposta) mostra o papiro com os riscos
em grupos e os barcos de calcário do Diário de Merer. O gerador não desenha numeral egípcio
de verdade: os traços do papiro são ilustração da ideia (risco agrupado), não reprodução.

## entregador-ovelhas.jpg (30/08, tela 4, Google Flow)

O Flávio olhou a tela 4 e faltava o que ele tinha pedido de fato: o mensageiro **levando as
ovelhas** com o registro na argila, não só entregando a bola. Gerada no Flow (Nano Banana 2,
16:9), prompt em `img/flow/prompt/entregador-ovelhas.txt`, primeira variante servindo. Entrou
como terceira imagem da tela 4, ao lado da bola parada e da entrega: objeto, uso e viagem.

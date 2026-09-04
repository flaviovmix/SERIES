# Série: Como Reinventar o Computador do Zero — do Ábaco ao Transformer

**Fonte principal:** `_arquivos\transcricao.txt` (vídeo do canal Infinitamente, 1h16min; o `video.mp4` e o `audio.mp3` também estão em `_arquivos\`) — cobre até os compiladores (~anos 1950).
**Extensão da série:** depois do vídeo, a história continua por conta própria até **2017**, quando o paper *Attention is All You Need* apresentou o **Transformer** — a arquitetura que tornou possível as IAs atuais.
**Formato:** episódios NotebookLM via `/criar-podcast` (trio Overview.txt + _NotebookLM_ + prompt por episódio), cada um com sua `animacao.html`.

## Arco da série

Uma pergunta única atravessa tudo: **como pedras que a gente move viraram máquinas que conversam?**
Cada episódio adiciona uma peça: contar → instrumento → engrenagem → eletricidade → lógica → memória → universalidade → miniaturização → conexão → aprendizado → atenção.

A série é dividida em **10 etapas** (reorganização de 22/08). A etapa é a unidade de planejamento e de leitura da página: cada uma tem um tema, um período e um punhado de episódios. Antes disso o plano vivia em duas listas paralelas (os 16 episódios da transcrição e os 11 de Equipamentos) que se sobrepunham — as etapas são a espinha única que substituiu as duas.

## As 10 etapas

| # | Etapa | Complemento | Período | Eps | Status |
|---|---|---|---|---|---|
| 1 | **Contar antes das máquinas** | o número, o dedo e o céu | Antiguidade → séc. XV | 2 | 🟢 |
| 2 | **Séculos sem máquina** | os instrumentos que seguraram a conta | 100 a.C. – 1623 | 2 | 🟠 |
| 3 | **As engrenagens assumem** | a mecânica calcula sozinha | 1642–1837 | 6 | 🟢 |
| 4 | **Domesticando o raio** | de fenômeno do céu a corrente no fio | 1600–1880 | 7 | 🟠 |
| 5 | **A eletricidade aprende a pensar** | quando o interruptor virou lógica | 1854–1937 | 3 | 🟠 |
| 6 | **O computador no papel** | de porta lógica a máquina universal | 1936–1948 | 5 | 🔴 |
| 7 | **O primeiro computador moderno** | válvula, cartão e a primeira máquina que ligou | 1936–1959 | 3 | 🟢 |
| 8 | **A era dos transistores** | a máquina encolhe até caber num chip | 1947–1971 | 2 | 🔴 |
| 9 | **Da sala pro mundo** | entra em casa e depois vira rede | 1975–1995 | 2 | 🔴 |
| 10 | **A máquina que aprende** | o fecho do arco | 1950–2017 | 3 | 🔴 |

Status: 🔴 não iniciado · 🟠 parcial (alguns episódios publicados) · 🟢 tudo publicado
**Placar (27/08):** 15 episódios publicados + piloto (a etapa 7 inteira entrou em 27/08) · **20 pela frente** (fora os candidatos) · 6 áudios prontos aguardando conferência (eps `01`-`04` da etapa 4 + 2 extras). Fora das etapas existe também a pasta **`_EXTRAS\`** (episódios avulsos autocontidos — ver seção própria).

---

## Etapa 1 — Contar antes das máquinas

*Antiguidade → séc. XV.* Antes de qualquer máquina, duas invenções: um jeito de **mover** quantidade (o ábaco) e um jeito de **escrever** quantidade (o zero e o posicional).

| Pasta | Episódio | Ano | O que cobre | Status |
|---|---|---|---|---|
| `01` | **O Ábaco** | ~2700 a.C. | 8 telas: ficha, valor posicional, vai-um, práticas 7/23/105 e 2×24 | 🟢 |
| `02` | **O Zero e os Números** | séc. VII–XIII | romanos → posicional → zero → al-Khwarizmi/algoritmo → Fibonacci → abacistas vs algoristas | 🟢 |

A **Anticítera** (~100 a.C.) é antiguidade e caberia aqui, mas mora na 1ª metade do ep `01` da etapa 2 — ver a nota do corte abaixo. A etapa 1 a cita como ponte.

## Etapa 2 — Séculos sem máquina

*100 a.C. – 1623.* Entre a Anticítera e a Pascalina passam mil e setecentos anos sem máquina de calcular. O que aparece no lugar são **instrumentos**: objetos que não calculam sozinhos, mas encurtam a conta de quem calcula.

| Pasta | Episódio | Ano | O que cobre | Status |
|---|---|---|---|---|
| `01` | **As Máquinas do Hiato** | 100 a.C. – 1622 | Anticítera, astrolábio, ossos de Napier, régua de cálculo | 🟢 |
| `02` | **O Relógio Calculador de Schickard** | 1623 | a primeira máquina de engrenagem que somava, perdida num incêndio — hoje só mencionada no ep `06` da etapa 3 (Babbage) | 🔴 |

**Nota do corte (decisão de 22/08):** este episódio ficou atravessado entre as etapas 1 e 2 — a Anticítera é antiguidade, Napier e a régua são o hiato. Como ele já está publicado como episódio único, **conta inteiro pela etapa 2** (é o nome dela) e a etapa 1 cita a Anticítera como ponte, sem reeditar nada publicado.

## Etapa 3 — As engrenagens assumem

*1642–1837.* A conta sai da mão de quem calcula e entra no metal. Duas linhagens crescem em paralelo e só se encontram no fim: a das **engrenagens que somam** (Pascal, Leibniz) e a dos **furos que mandam** (autômatos, caixa de música, tear) — as duas se juntam na Máquina Analítica.

Ordem dos cards na página = ordem das pastas = **ordem histórica** (Pascalina → Leibniz → autômatos → caixa → tear → Babbage). A ordem de **produção** foi outra (o tear saiu antes dos autômatos e da caixa) e deixou de aparecer no nome das pastas na reorganização de 22/08.

| Pasta | Episódio | Ano | O que cobre | Status |
|---|---|---|---|---|
| `01` | **Pascalina** | 1642 | 8 telas: ficha, limite do ábaco, somar é girar, sautoir 9+1/99+1, complemento 35−12, prática 28+35 | 🟢 |
| `02` | **A Roda de Leibniz** | 1673 | 8 telas: ficha, limite da Pascalina, tambor escalonado interativo, 35×4 em voltas, carro 35×24, prática 23×13 | 🟢 |
| `03` | **Os Autômatos** | 1738–74 | 8 telas: ficha, estrelas do séc. 18, came interativo, Escritor SIM/NAO, precursores dos furos, prática fila de cames ADA | 🟢 |
| `04` | **A Caixa de Música** | 1796 | 8 telas COM SOM: ficha, linhagem carrilhão, pente clicável, cilindro Frei Martinho, troca Ode à Alegria, prática Brilha Brilha | 🟢 |
| `05` | **O Tear de Jacquard** | 1804 | 8 telas: ficha, o desenho vira cartão, furo=fio sobe interativo, corrente losango, troca losango/xadrez, prática letra T | 🟢 |
| `06` | **A Máquina Analítica de Babbage** | 1822–37 | 8 telas: ficha, diferenças passo a passo, obra inacabada, anatomia clicável, programa de 3 cartões, prática (A+B)×C; Ada + Schickard | 🟢 |

*Candidatos, se a fila pedir:* aritmômetro de Thomas (1820) + Comptometer (1887) — a calculadora de balcão; preditor de marés de Kelvin (1876) — o computador analógico.

## Etapa 4 — Domesticando o raio

*1600–1880.* A etapa que a série inteira depende e que quase todo mundo pula. Aqui a eletricidade é o assunto, **explicada em detalhe**: o que é, como se prende num fio, como vira força, como vira sinal e como um circuito passa a comandar outro. Sem essa peça, nada da etapa 5 em diante faz sentido.

| Pasta | Episódio | Ano | O que cobre | Status |
|---|---|---|---|---|
| `01` | **A faísca** | 1600–1752 | âmbar e Gilbert (a palavra "elétrico"), Gray e a descoberta de condutor vs isolante, garrafa de Leiden, a pipa de Franklin: existe, dá choque, e ainda não serve pra nada | 🟠 |

**Estado do ep `01` (22/08):** trio escrito e aprovado pelo verificador, **áudio pronto** (27,4 min, título que o NotebookLM deu: "Do âmbar ao raio de Benjamin Franklin"), mapa das 8 telas em `_telas.md`, 11 ilustrações em `img\` e **`animacao.html` montada e testada** (Playwright: 8 telas, as 3 interativas, lightbox, console limpo, 360px sem estouro). Falta só a publicação. A página tokenizada fica em `_animacao-fonte.html`: é nela que se edita, porque a `animacao.html` já tem os base64 dentro. Há também um `_imagens.html` na pasta, que é só o catálogo das ilustrações, não faz parte do episódio.

⚠️ **Dois bugs corrigidos no `embute-imagens.js` (22/08):** ele trocava só a **primeira** ocorrência de cada token (as outras ficavam com o token cru e a imagem quebrava) e embutia tudo como `image/jpeg`, inclusive PNG. Agora usa `replaceAll` e deduz o mime pela extensão. Como cada ocorrência carrega uma cópia do base64, imagem que aparece em mais de uma tela é declarada **uma vez** com `id` e reusada por JS via `data-reusa="<id>"` (padrão que o ep do Ábaco já usava na mão). Uma decisão aberta: aos **20:28 o áudio fala "George Richmond"**, e o certo é **Georg Richmann** (o roteiro estava certo, o NotebookLM anglicizou) — regravar ou deixar passar. Também diz "De Magnet" em vez de "De Magnete" aos 06:36, que passa despercebido.
| `02` | **A pilha de Volta** | 1800 | a primeira eletricidade que *dura*; circuito fechado e lei de Ohm (tensão, corrente, resistência) | 🟠 |
| `03` | **A agulha que se mexeu** | 1820–25 | Ørsted, Ampère e o eletroímã de Sturgeon: corrente vira força mecânica | 🟠 |
| `04` | **Faraday e o gerador** | 1831 | indução — movimento vira eletricidade; de onde vem a energia de tudo que veio depois | 🟠 |
| `05` | **O relé** | 1835 | um circuito comandando outro: amplificação, distância, e a peça que na etapa 5 vira porta lógica | 🔴 |
| `06` | **O Telégrafo** | 1837 | 8 telas COM SOM: ficha, torres de Chappe, tecla segurar/soltar, Morse S O S, o relé, prática transmitir ADA | 🟢 |
| `07` | **A lâmpada e a rede** | 1880 | Edison, Tesla e a corrente alternada: o mundo eletrificado que torna tudo o que vem depois possível | 🔴 |

**Estado dos eps `02`, `03` e `04` (23/08):** os três trios escritos, conferidos no checklist do verificador e com **áudio pronto e baixado** na pasta de cada um. Títulos que o NotebookLM deu: `02` = "Como a rã criou a pilha", `03` = "Como a eletricidade ganhou músculos", `04` = "Como Faraday criou o gerador elétrico". Notebooks: `a8a9026d…`, `fa12cffa…`, `54c13ef1…`. Falta a conferência do Flávio; mapa de telas, animação e publicação ficam pra depois da aprovação. Os ganchos encadeiam 02→03→04→relé.

Fonte: os quatro primeiros e a lâmpada precisam de **pesquisa própria** (o vídeo só toca em Faraday e no relé, min 17.5–29). O ep do relé pode reaproveitar a tela do relé que já existe no `06 - O Telégrafo`, aprofundando.

## Etapa 5 — A eletricidade aprende a pensar

*1854–1937.* A corrente já está domada; agora ela ganha **significado**. Boole mostra que raciocínio é conta; Hollerith mostra que dado é furo que fecha circuito; Shannon junta as duas pontas e prova que um interruptor é uma proposição lógica.

| Pasta | Episódio | Ano | Fonte / o que cobre | Status |
|---|---|---|---|---|
| `01` | **As leis do pensamento** | 1854 | 8 telas: capa, ficha, Aristóteles e a forma, E/OU/NÃO com a vaga do lobo-guará, o candidato Ná, Boole autodidata, prática da conta 1/0, ponte pro interruptor | 🟠 |
| `02` | **As Máquinas de Hollerith** | 1890 | 8 telas: ficha, foto furada, prensa interativa, lote de 20, o placar 6 semanas, prática você vs a máquina | 🟢 |
| `03` | **Enganando a eletricidade a pensar** | 1937 | transcrição min 17.5–29 (parte final): Shannon e Nakashima — interruptores representando lógica | 🔴 |

**Estado do ep `01` (26/08):** feito do zero nesta data. Trio escrito e aprovado pelo verificador na segunda passada, **áudio publicado** (faixa 53, título que o NotebookLM deu: "Como a lógica humana virou álgebra") e **nota criada em produção** dentro da page 349: `nexus.afx.art.br/notes/190`, com capa, bloco de podcast da faixa 53 e 5 imagens legendadas. Notebook: `f048f5f8…`. Falta só o mapa de telas e a `animacao.html`.

As imagens deste episódio estreiam o **padrão dos dois selos**: 3 reais do Commons em domínio público (busto de Aristóteles, retrato de Boole, página de rosto de 1854) e 2 geradas no Flow (a entrevista do lobo-guará e as sete chaves de latão), registradas em `img\CREDITOS.md`. É o inverso da faísca, que é quase toda gerada. ⚠️ Duas gerações das chaves saíram com um algarismo aleatório brilhando no canto ("3" e "5"): pedir **no numbers, no digits, no letters** no prompt quando a cena não deve ter texto.

**Correção factual que o verificador pegou e vale pros próximos:** a regra `1 + 1 = 1` do OU **não é do Boole de 1854** (no sistema dele somar coisas que se sobrepõem nem era permitido). O OU inclusivo é conserto de William Jevons, dez anos depois. O roteiro credita certo.

**Por que Hollerith está aqui e não na etapa 3:** a tabuladora do censo é elétrica de verdade (eletroímã e copinho de mercúrio fechando circuito), não puramente mecânica — e com ela nesta etapa a linha do tempo fica limpa, sem o card de 1890 voltando pra trás depois do telégrafo de 1837.

## Etapa 6 — O computador no papel

*1936–1948.* A série para de contar máquinas e passa a **montar uma** — no papel, peça por peça, sem ligar nada. É a etapa mais conceitual e a mais densa: cinco episódios que se empilham na ordem.

| Pasta | Episódio | Fonte | O que cobre | Status |
|---|---|---|---|---|
| `01` | **Portas lógicas e o mundo binário** | transcrição min 29–35.2 | AND, OR, NOT, NAND, XOR; binário, bit e byte; rato Teseu de Shannon | 🔴 |
| `02` | **Circuitos que calculam** | min 35.3–43.3 | meio somador, somador completo, unidade de aritmética; complemento de dois e overflow | 🔴 |
| `03` | **Como a máquina lembra** | min 43.5–48.9 | flip-flop, célula de memória, seletor e endereço, RAM, ASCII — tudo vira 0 e 1 | 🔴 |
| `04` | **Turing e a máquina universal** | min 49–57.3 | algoritmo, decidibilidade (Hilbert), máquina de Turing, máquina universal, tese de Church-Turing | 🔴 |
| `05` | **Montando o computador completo** | min 57.4–66.9 | acumulador, contador, códigos de instrução (ADD, SUB, SAVE, LIMP, MPR), LOAD/GOTO/loop, hardware vs software | 🔴 |

## Etapa 7 — O primeiro computador moderno

*1941–1952.* O que a etapa 6 montou no papel agora **liga na tomada**: relé, cartão e válvula viram máquinas de verdade, e no fim delas nasce a ideia que define o computador moderno — o programa morando na mesma memória que os dados.

| Pasta | Episódio | Fonte | O que cobre | Status |
|---|---|---|---|---|
| `01` | **As primeiras máquinas que ligaram** | transcrição min 66.9–72 (parte) + pesquisa | 7 telas, 1936–1946: Z3 de Zuse (1941), Mark I de Aiken (1944), corrida relé x válvula, ENIAC (1945) e as seis programadoras, prática de recabear | 🟢 |
| `02` | **O programa que mora na memória** | pesquisa nova | 8 telas, 1945–1949: o First Draft de von Neumann e a briga de crédito com Eckert e Mauchly, a mesma célula lida como ordem ou número, Manchester Baby (1948), EDSAC (1949) e a sub-rotina | 🟢 |
| `03` | **Grace Hopper e o compilador** | min 66.9–72 (parte) + pesquisa | 8 telas, 1944–1959: programar o Mark I na mão, a mariposa de 1947, a tradução palavra↔binário, o A-0 (1952), FLOW-MATIC e COBOL (1959) | 🟢 |

**Etapa 7 fechada e publicada (27/08):** os três trios foram escritos numa noite só, passaram no checklist mecânico (incluindo os itens novos 16 e 17), viraram áudio no NotebookLM e estão **publicados na page 354 de produção** (notas 193, 191 e 192; faixas 56, 54 e 55), cada uma com o player e a `animacao.html` embutida como anexo. As animações foram testadas com Playwright (telas, interativas, card 3D e 360px sem estouro).

⚠️ **A conferência contra o roteiro pagou o próprio custo na estreia.** Nos três episódios o NotebookLM pediu "aperte o Proximo" menos vezes que o roteiro mandava, e as animações, montadas antes do áudio existir, ficariam fora de sincronia. No ep `01` a v1 juntou Z3, Mark I, a corrida e o ENIAC num bloco de 10min44: foi **regravada** com um bloco novo no roteiro, a **REGRA DURA DAS TELAS** (diz quantas telas são e quantas vezes o áudio TEM que pedir Proximo, sem juntar duas telas num bloco), e a v2 saiu com 7 blocos em vez de 5 (a v1 está em `_v1\`). Nos eps `02` e `03` a diferença era de uma tela e as animações foram refeitas pro corte real. Números finais: **7, 8 e 8 telas**, iguais ao que o áudio realmente pede. Lição pros próximos: a REGRA DURA vale a pena no roteiro, e montar animação antes do áudio custa retrabalho. ⚠️ **O modelo 3D das três é o ábaco, de propósito**, com selo laranja de provisório, até existir o modelo certo de cada máquina (backlog em `_arquivos\modelos-3d\_a-fazer.md`, itens 33 a 36). São os primeiros episódios escritos já sob as regras de 26/08: janela temporal declarada e ficha humana dos protagonistas, todas conferidas na fonte antes de escrever. A planta de telas mandou no número e deu **8, 9 e 9**, não 8 nos três. Detalhe e o que conferir: `_HANDOFF-2026-08-27.md` na pasta da etapa.

## Etapa 8 — A era dos transistores

*1947–1971.* A mesma máquina da etapa 7, encolhendo: válvula → transistor → circuito integrado. Termina com o computador inteiro dentro de uma pastilha.

| Pasta | Episódio | Fonte | O que cobre | Status |
|---|---|---|---|---|
| `01` | **O transistor** | transcrição min 66.9–72 (parte) | Bell Labs (1947), o fim da válvula, Lei de Moore (1965) | 🔴 |
| `02` | **O chip e o microprocessador** | pesquisa nova | circuito integrado (Kilby/Noyce, 1958), corrida da miniaturização, Intel 4004 (1971) | 🔴 |

## Etapa 9 — Da sala pro mundo

*1975–1995.* O computador deixa de ser equipamento de instituição e vira objeto de casa — e depois deixa de ser objeto sozinho e vira rede.

| Pasta | Episódio | Fonte | O que cobre | Status |
|---|---|---|---|---|
| `01` | **O computador chega em casa** | pesquisa nova | Altair, Apple, IBM PC, interface gráfica (Xerox PARC → Mac/Windows) | 🔴 |
| `02` | **Conectando tudo: a internet** | pesquisa nova | ARPANET (1969), TCP/IP, e-mail, a web de Tim Berners-Lee (1991) | 🔴 |

## Etapa 10 — A máquina que aprende

*1950–2017.* A última peça: em vez de instruir a máquina passo a passo, deixar ela **ajustar os próprios números** até acertar. Fecha o arco aberto no piloto.

| Pasta | Episódio | Fonte | O que cobre | Status |
|---|---|---|---|---|
| `01` | **IA: a promessa e os invernos** | pesquisa nova | teste de Turing, Dartmouth 1956, perceptron, invernos da IA, backpropagation | 🔴 |
| `02` | **Deep learning: a virada** | pesquisa nova | ImageNet/AlexNet (2012), GPUs treinando redes, word embeddings, seq2seq e o gargalo das RNNs | 🔴 |
| `03` | **2017: Attention is All You Need** | pesquisa nova | o Transformer: atenção no lugar de recorrência, por que destravou GPT/BERT. Fechamento: da pedra do ábaco ao peso da rede neural | 🔴 |

---

## _EXTRAS — episódios avulsos (23/08)

Pasta `_EXTRAS\` na raiz da série. São episódios **fora da linha do tempo e autocontidos**: zero cientista, zero data, zero referência a série/etapa/episódio anterior ou próximo — dá pra mandar o mp3 solto pra qualquer pessoa ouvir isoladamente, em qualquer ordem. Cada um vive dentro de **uma única analogia** declarada no roteiro (com uma tela final "onde a analogia quebra"). O prompt segue naming próprio: `EX-NN-<Nome>.txt`. Nasceram de dúvidas do dia a dia que os episódios históricos não param pra resolver.

**No site (30/08):** hub em `site/extras/` + página por extra; o índice ganhou o card "Extras".

| Pasta | Extra | Analogia única | Título do áudio | Status |
|---|---|---|---|---|
| `01` | **Volt Ampere e Watt** | prédio com caixa d'água (altura=volt, vazão=ampère, cano=ohm, mangueira do lodo=watt, litros do mês=kWh, tamanho da caixa=mAh) | Eletricidade explicada como água num prédio | 🟠 |
| `02` | **Por que o Ima Gruda** | ferro = milhões de agulhinhas de bússola (bagunçadas=ferro comum, alinhadas=ímã); eletroímã fica de fora (é o ep `03` da etapa 4) | Como os ímãs funcionam por dentro | 🟠 |
| `03` | **O Sistema Decimal** | os dez dedos e o "encheu a mão, sobe um" (pedrinha na tigela = grupo fechado; saquinho/caixa = grupo de grupos; prateleira com vão = o zero) | Por que contamos de dez em dez | 🟠 áudio gravado e conferido em 31/08 (12:52, 10 telas = 10 blocos, 9 Próximos certos, tocador + marcadores ligados); falta o Flávio ouvir com a página aberta |
| `04` | **O Sistema Binário** | a lâmpada e o interruptor (aceso/apagado sem meio-termo; fileira de lâmpadas com casas que dobram 16/8/4/2/1) | Como contar qualquer número apenas com lâmpadas | 🟠 áudio gravado e conferido em 31/08 (29:25, 10 telas = 10 blocos, 9 Próximos certos, tocador + marcadores ligados); ressalva: fecho de 5:51 meio empolado — ele decide de ouvido |
| `05` | **O Sistema Hexadecimal** | o armário de dezesseis gavetas (letras A-F = carimbos emprestados; um algarismo = apelido de quatro sim-ou-nãos) | Por que o hexadecimal usa letras | 🟠 áudio gravado e conferido em 31/08 (10:35, 10 telas na ordem, tocador + marcadores; a virada 5→6 saiu "aperte próximo" sem o "o" — linha corrigida no _telas.md); ressalva: 1º cartão do fecho rápido — ele confere de ouvido |
| `06` | **O Sistema de 60** | o relógio (vai-um dos sessenta e a cascata do 59:59; divisão sem sobra; 360°; falanges 12×5) | Por que a hora tem sessenta minutos | 🟠 áudio gravado e conferido em 31/08 (23:51, 10 telas = 10 blocos, 9 Próximos certos, tocador + marcadores ligados); falta o Flávio ouvir com a página aberta |
| `07` | **O Hertz** | o balanço do parque (1 Hz = um vai-e-vem por segundo; corda curta = rápido, logo o giga mora no minúsculo; tela 7 TOCA som de verdade, 110→1.760 Hz em oitavas) | O que o Hertz realmente mede | 🟠 áudio gravado e conferido em 31/08 (15:08, 10 telas = 10 blocos, 9 Próximos certos, tocador + marcadores ligados); falta o Flávio ouvir com a página aberta |

O `01` teve uma v1 gerada ainda com amarras de série ("primeiro episodio desta etapa", "o resto da serie") — regravado em 23/08 já autocontido; a v1 está em `_v1\` dentro da pasta. Desde então os roteiros de extra carregam uma **REGRA DURA nº 2** proibindo explicitamente citar série/etapa/episódio vizinho, além da nº 1 (sem pessoa/data) — usar esses dois blocos como modelo pros próximos extras.

**A fila de extras vai crescer (30/08):** decisão do dono — "vamos fazer vários extras", com muitos outros depois; a ordem (30/08, mais tarde) é **decimal primeiro, binário na sequência**: entender a base que a pessoa já usa antes de trocar de base. Antes de produzir em série, **pensar e decidir o que a esteira de extras precisa** (nada disso existe hoje):

1. ✅ **Onde o extra mora no site** — decidido e feito em 30/08: seção "Fora da linha do tempo" no índice (um card Extras) + hub `site/extras/index.html` com um card por extra (01-04) + **uma página por extra** (`extra-01.html` com o áudio e o modelo do Prédio da Água, `extra-02.html` com o áudio; 03 e 04 aparecem no hub como "em produção", sem página ainda). Tudo no padrão visual das etapas, sem CSS novo.
2. **Extra tem animação?** O `01` já tem telas + modelo do Prédio da Água; o `02` é só áudio. Regra proposta: animação quando houver o que mexer (o binário pede — contar, somar e o vai-um em base 2 são interativos por natureza, e o ábaco da base já faz quase isso); só áudio quando for conversa.
3. ✅ **O que a dupla decimal/binário reusa da base** — resolvido em 30/08: o decimal copiou `abaco.css/js` do ep 01-01 (2ª cópia) e o binário NÃO usa ábaco — ganhou widget próprio (`lampadas.js` + `binario.css`: fileira de cinco lâmpadas, casas 16/8/4/2/1), porque a analogia dele é o interruptor. A **trilha da prática chegou à 3ª cópia** (episodio.js → decimal.js → binario.js) e foi **extraída pra base** em 30/08 com o OK do Flávio: `site/js/animacao/trilha.js` (`Animacao.criaTrilha`), consumida pelo ep 01-01, EX-03, EX-04 e pelos extras seguintes (retestados os três antigos). Próximo na fila da regra: `lampadas.js`/CSS das lâmpadas, que ganhou a 2ª cópia no EX-05.
4. **Numeração e naming continuam** `EX-NN` com prompt `EX-NN-<Nome>.txt`, REGRAS DURAS nº 1 (sem pessoa/data) e nº 2 (sem citar série/etapa/vizinho) copiadas do `01`.
5. **Publicar extra = mesmo deploy** (pasta em `~/serie` no servidor, tar+scp), mas o card de onde ele é achado depende do item 1.
6. **Gancho a manter**: os extras de base NÃO substituem o ep `01-02` (O Zero e os Números) nem os eps de lógica/circuito da etapa 6 — ele é o "como funciona a base 2" sem história, e os episódios continuam donos da linha do tempo.

**Encomenda do dono (02/09): dois extras de peça, com modelo 3D.** Ele quer um extra **só sobre o relé** e outro **só sobre a válvula**, cada um com um **modelo tridimensional pra mexer**, no mesmo espírito do ábaco 3D da etapa 01: girar a peça, ver por dentro, entender o que se move (ou o que não se move, na válvula) e por que isso muda a velocidade. O escopo pedido é o da peça inteira: como funciona, quem inventou, de onde veio.

Três consequências registradas junto:

- ⚠️ **Eles quebram a REGRA DURA nº 1 dos extras** (sem pessoa, sem data), porque "quem inventou" é parte do pedido. É o mesmo caso do extra `08 - O Zero e os Números`, que veio da linha do tempo com nome e data. A trilha de extras passou a ter **duas famílias**: *conceito* (sem nome nem data, a regra atual) e *peça e figura* (com nome e data). O lede do hub ainda promete só a primeira e precisa ser reescrito.
- **A trilha principal continua dona do elo.** O episódio `06-01` explica relé e válvula no que a próxima peça precisa (uma tem contato que se mexe, a outra não, e é por isso que ela é mais rápida) e aponta o gancho. O extra é o aprofundamento, nunca o pré-requisito.
- **Os dois modelos 3D entram no backlog** de `_arquivos/modelos-3d/_a-fazer.md`, na seção `_EXTRAS`.

**Candidatos a extra (03/09), pra deixar o gancho já no áudio da trilha principal — aguardando aprovação do dono.** Agrupados pela etapa da espinha nova (7 etapas) onde o gancho é dito. Tipo: *conceito* (sem nome nem data), *peça* (o objeto por dentro, com modelo 3D) ou *figura* (a pessoa). Situação: 🟢 já no ar · 🟠 modelo 3D pronto, falta o episódio · 🔴 do zero.

| # | Extra | Tipo | Gancho na etapa | Situação |
|---|---|---|---|---|
| 1 | O Zero e os Números | figura | 1 Contar | 🟢 EX-08 |
| 2 | O Sistema Decimal | conceito | 1 Contar | 🟢 EX-03 |
| 3 | O Sistema Binário | conceito | 1 Contar / 5 Papel | 🟢 EX-04 |
| 4 | O Sistema Hexadecimal | conceito | 5 Papel | 🟢 EX-05 |
| 5 | O Sistema de 60 | conceito | 1 Contar | 🟢 EX-06 |
| 6 | A Anticítera | peça | 1 Contar | 🟠 `anticitera.html` |
| 7 | A Pascalina por dentro | peça | 2 Mecânica | 🟠 `pascalina.html` |
| 8 | A Roda de Leibniz | peça | 2 Mecânica | 🟠 `roda-de-leibniz.html` |
| 9 | Os autômatos (o Escritor) | peça | 2 Mecânica | 🔴 |
| 10 | A caixa de música | peça | 2 Mecânica | 🔴 |
| 11 | O tear de Jacquard | peça | 2 Mecânica | 🔴 |
| 12 | Babbage e Ada | figura | 2 Mecânica | 🔴 |
| 13 | Volt, Ampère e Watt | conceito | 3 Raio | 🟢 EX-01 |
| 14 | Por que o ímã gruda | conceito | 3 Raio | 🟢 EX-02 |
| 15 | A garrafa de Leiden | peça | 3 Raio | 🟠 `garrafa-de-leiden.html` |
| 16 | Volta e a pilha | figura | 3 Raio | 🔴 |
| 17 | Faraday | figura | 3 Raio | 🔴 |
| 18 | O relé | peça | 3 Raio / 6 Liga | 🟠 `rele.html` |
| 19 | O telégrafo e o Morse | peça | 3 Raio | 🔴 (ep 04-06 publicado pode virar extra) |
| 20 | Edison, Tesla e a corrente alternada | figura | 3 Raio | 🔴 |
| 21 | Boole | figura | 4 Lógica | 🔴 |
| 22 | Hollerith e o cartão furado | figura | 4 Lógica | 🔴 (ep 05-02 publicado pode virar extra) |
| 23 | Shannon | figura | 4 Lógica | 🔴 |
| 24 | O Hertz | conceito | 4 Lógica / 6 Liga | 🟢 EX-07 |
| 25 | Turing | figura | 5 Papel | 🔴 |
| 26 | Como a letra vira número (ASCII) | conceito | 5 Papel | 🔴 |
| 27 | Número negativo na máquina (complemento de dois) | conceito | 5 Papel | 🔴 |
| 28 | A válvula | peça | 6 Liga | 🟠 `valvula.html` |
| 29 | O Z3 e Konrad Zuse | peça + figura | 6 Liga | 🔴 |
| 30 | As seis programadoras do ENIAC | figura | 6 Liga | 🔴 |
| 31 | Von Neumann e a briga do rascunho | figura | 6 Liga | 🔴 |
| 32 | Grace Hopper e o compilador | figura | 6 Liga | 🔴 (ep 07-03 publicado vira extra) |
| 33 | O transistor | peça | 7 Encolher | 🟠 `transistor.html` |
| 34 | Kilby, Noyce e o circuito integrado | figura | 7 Encolher | 🔴 |
| 35 | A lei de Moore | conceito | 7 Encolher | 🔴 |
| 36 | Como um pacote atravessa a internet | conceito | 7 Encolher | 🔴 |
| 37 | O Perceptron | peça | 7 Encolher | 🔴 |
| 38 | O que é treinar uma rede | conceito | 7 Encolher | 🔴 |
| 39 | Portas lógicas na mão | conceito | 6 Liga (A planta) | 🔴 |
| 40 | O somador e o número negativo | conceito | 6 Liga (A planta) | 🔴 |
| 41 | Como a máquina lembra (flip-flop e endereço) | conceito | 6 Liga (A planta) | 🔴 |
| 42 | Turing e a máquina universal | figura | 6 Liga (A planta) | 🔴 (era o #25, gancho mudou de etapa) |
| 43 | O conjunto de instruções | conceito | 6 Liga (A planta) | 🔴 |
| 44 | A IBM e o Mark I, a máquina que contava em decimal | peça + figura | 6 Liga | 🔴 |
| 45 | O ENIAC | peça | 6 Liga | 🔴 |

**Aprovados pelo dono (03/09): os seis extras com gancho no episódio `06-02`.** São 18 O relé · 28 A válvula · 29 O Z3 e Konrad Zuse · 44 A IBM e o Mark I · 45 O ENIAC · 30 As seis programadoras do ENIAC. O trio do `06-02` já foi atualizado com os ganchos: relé e válvula saem juntos numa frase só, e os outros quatro têm uma frase cada, somando **seis momentos de gancho** no episódio (contando o Hertz e o decimal, que já estavam lá e continuam). ⚠️ **O filme que ele lembrou, *Estrelas Além do Tempo* (2016), não é dessa história:** ele conta as calculistas da NASA nos anos 1960 (Katherine Johnson e as outras), que são material da série da Lua, não do ENIAC. As seis do ENIAC são outro grupo, outro lugar e vinte anos antes; o registro em vídeo delas é *Top Secret Rosies* (2010) e o livro de referência é o *Proving Ground*, da Kathy Kleiman, que foi quem achou as seis nas fotos.

**Ideia do dono (03/09): o botão foto real ↔ ilustração.** Ouvindo o teste do `06-02` ele decidiu que a etapa merece **telas**, e mais: nas telas em que a máquina tem fotografia de época, um **botão que troca entre a foto real e a ilustração**. A ilustração não é enfeite, é o que a foto não mostra (a peça em corte, o que se mexe, a cena que ninguém fotografou). Isso resolve um incômodo antigo: até o ábaco o áudio tinha que avisar "estas cenas são reconstituições, não são fotos" (tela 3 do `01-01`); daqui pra frente a página mostra as duas e quem escolhe é quem assiste. ⚠️ **O componente ainda NÃO foi implementado, por decisão dele:** primeiro ele aprova ouvindo o áudio escrito com as telas. A planta de telas do `06-02` (12 telas, 11 pedidos de Próximo, com a foto real e a ilustração anotadas uma a uma) está em `_REFAZER/06 - A máquina que liga/02 - As primeiras máquinas que ligaram/_telas.md`. As versões anteriores do áudio ficaram em `_v1` (episódio antigo) e `_v2` (versão áudio puro, de 18:27).

Regra que vale pra todos: o áudio da trilha principal só diz "tem um extra sobre isso" pro que estiver aprovado nesta lista; genérico, sem nome. Os de *figura* e *peça* seguem a família nova (com nome e data); os de *conceito* seguem as REGRAS DURAS nº 1 e 2 de sempre.

**Decisão do dono (03/09): a etapa "O computador no papel" sai da espinha.** Motivo: as etapas 5 e 6 do desenho de 7 acontecem ao mesmo tempo (1936–1949), e "primeiro o papel, depois a máquina" confundia até quem escreveu. O conteúdo não some: vira **um episódio só, "A planta"**, que passa a abrir a etapa **A máquina que liga** (agora com três episódios: 01 A planta · 02 As primeiras máquinas que ligaram · 03 O programa que mora na memória), e os cinco assuntos de hoje viram **cinco extras** com gancho nesse episódio: 39 Portas lógicas na mão · 40 O somador · 41 Como a máquina lembra (flip-flop e endereço) · 42 Turing e a máquina universal · 43 O conjunto de instruções. A espinha nova fica com **6 etapas**. O trio de "A planta" está em `_REFAZER/06 - A máquina que liga/01 - A planta/` (áudio de teste, como os outros dois).

## Etapa 6 refeita com telas (03/09) — a primeira no método novo

**O que ficou pronto e está no ar:** os três episódios da etapa *A máquina que liga*, cada
um com áudio novo, planta de telas e página de animação, em
`https://series.afx.art.br/site/etapas/etapa-06.html`.

| # | Episódio | Título do áudio | Duração | Telas | Página |
|---|---|---|---|---|---|
| 6.01 | A planta | Como a lógica matemática criou o computador | 12:53 | 12 | ✅ |
| 6.02 | As primeiras máquinas que ligaram | A construção do Z3 ao ENIAC | 14:19 | 12 | ✅ |
| 6.03 | O programa que mora na memória | Quando o programa entrou na memória | 14:37 | 11 | ✅ |

Os três passaram na conferência obrigatória (`mapa-de-telas.py`): os pedidos de "aperte o
Próximo" batem com o roteiro (11, 11 e 10), e os marcadores do tocador saíram da
transcrição pelo `marcadores-do-mapa.py`, nunca digitados.

**O componente novo: `troca-imagem`.** Nasceu do pedido do dono de ver a mesma coisa nas
duas versões. A figura guarda a foto de época e a ilustração, e uma barra embaixo troca
entre elas; o selo do canto e a legenda acompanham, e a legenda da ilustração já avisa
que é reconstituição. Mora na base (`site/css/animacao/troca-imagem.css` e
`site/js/animacao/troca-imagem.js`), estreou no 6.02 (6 pares) e o 6.03 usa em 2. ⚠️ Dois
defeitos achados e corrigidos na estreia: clicar no botão abria o lightbox junto
(faltava `stopPropagation`), e o lightbox ampliava sempre a foto real — agora ele segue a
imagem marcada com `data-em-cena`. O 6.01 não usa: é o episódio do papel, tudo ilustração.

**Outro componente pra base: `ordens.css`.** A lista de ordens numeradas com o dedo na da
vez, que o 6.01 monta na tela 11 e o 6.03 reusa em três telas (salto, laço e sub-rotina).
Foi direto pra base em vez de virar clone, pela regra do terceiro clone.

**As imagens.** Fotos de época do Wikimedia Commons com crédito na legenda (relés do Z3,
válvula triodo, réplica do Z3, Mark I, ENIAC, o painel sendo recabeado, as programadoras,
o First Draft, von Neumann, o Baby, o EDSAC). Ilustrações geradas no Flow, 16:9, uma por
tela que precisava mostrar o que a foto não mostra. ⚠️ A página do artigo de 1936 **não
existe no Commons**: a tela 9 do 6.01 ficou só com ilustração.

**Pendências que sobraram desta rodada:**

- ⚠️ **A espinha ainda está numerada como o desenho antigo.** O card 06 de `computador.html`
  já aponta pra etapa nova, mas os cards 07 a 10 continuam na numeração de 10 etapas e
  agora se sobrepõem a esta. Renumerar depende da palavra do dono.
- Os seis extras aprovados pro 6.02 (relé, válvula, Z3/Zuse, IBM/Mark I, ENIAC, as seis
  programadoras) têm gancho no áudio mas ainda não existem.
- Nada desta rodada foi commitado.

## 04/09: a etapa 6 fecha com quatro e a etapa 7 abre

**A espinha foi renumerada e tem 9 etapas.** A antiga etapa 7 (*O primeiro computador
moderno*) foi absorvida pela 6; o encolhimento, que era a 8, virou a **etapa 7 (O
computador encolhe)**, e as duas ultimas passaram a 8 (*Da sala pro mundo*) e 9 (*A
maquina que aprende*). A pagina `computador.html` ja esta assim.

**Dois episodios novos, no ar:**

| # | Episódio | Título do áudio | Duração | Telas |
|---|---|---|---|---|
| 6.04 | O compilador | A máquina que aprendeu a traduzir código | 12:34 | 11 |
| 7.01 | O transistor | Como o transistor encolheu o computador | 13:34 | 11 |

O 6.04 responde a pergunta que o 6.03 deixou no ar (por que a propria maquina nao
traduz?) e fecha a etapa. O 7.01 abre a etapa nova e **estreia o modelo 3D dentro da
animacao**: a capa carrega o `transistor.html` do backlog de modelos, com o HUD de
ligar a base e bater 8, 100 e um milhao de vezes por segundo.

⚠️ **O 6.04 foi regravado.** A primeira versao juntou o FORTRAN no bloco da
resistencia (o apresentador disse "vamos para o proximo" em vez de "aperte o
proximo", e o cortador nao separa) e o ano do COBOL saiu ininteligivel: dois modelos
de transcricao ouviram 1859 e 1559. O trio ganhou duas regras novas que valem pra
todos os proximos:

- **A frase do pedido e sempre "aperte o Proximo"**, sem variacao. Qualquer outra
  forma faz duas telas virarem uma.
- **Os anos sao ditos por extenso e devagar** (mil novecentos e cinquenta e nove),
  senao saem embolados e viram outro numero.

Na v2 os dois defeitos sumiram: 11 telas, 10 pedidos, FORTRAN em 1957 e COBOL em
1959, ditos certo.

**O modelo 3D no celular (04/09).** Na tela estreita o painel deixa a lateral e vira
barra no rodape, POR CIMA da maquina: no telefone ela sumia atras dele. O conserto
foi no `_base-modelo-3d.js`, entao vale pros quatro modelos de uma vez: em vez de
empurrar a maquina, o **palco encolhe** (`#cena` termina onde a barra comeca) e a
maquina se recentra sozinha no que sobra, com a conta saindo da altura real da barra,
que muda de modelo pra modelo. O abaco entrou junto, entao a animacao da etapa 01 que
ja estava publicada melhorou tambem. No desktop nada muda.

**Pegadinha do Flow que voltou:** a primeira geracao do lote baixou **nove** imagens
em vez de uma, puxando ilustracoes velhas do feed como se fossem novas. Conferir a
imagem baixada continua sendo obrigatorio.

## Publicados no acervo

A pasta guarda o nome do episódio; o card no Nexus guarda o **título do podcast** (o que o NotebookLM deu ao áudio). Esta tabela é o que amarra os dois — os números de faixa vêm do `_publicado.json` de cada pasta.

| Etapa / pasta | Episódio | Faixa | Título do podcast (card) |
|---|---|---|---|
| — | Piloto v2 | 35 | Como pedras viraram máquinas que conversam |
| 01 / `01` | O Ábaco | 36 | O ábaco e a primeira memória física |
| 01 / `02` | O Zero e os Números | 38 | Como o zero criou o algoritmo |
| 02 / `01` | As Máquinas do Hiato | 37 | Máquinas que calculavam estrelas e impostos |
| 03 / `01` | Pascalina | 39 | A Pascalina e a primeira calculadora mecânica |
| 03 / `02` | A Roda de Leibniz | 40 | A Roda de Leibniz e a multiplicação |
| 03 / `03` | Os Autômatos | 42 | Como os autômatos criaram o software |
| 03 / `04` | A Caixa de Música | 43 | Como a caixa de música virou software |
| 03 / `05` | O Tear de Jacquard | 41 | O tear que programava com cartões furados |
| 03 / `06` | A Máquina Analítica | 44 | A Máquina Analítica de Babbage e Ada |
| 04 / `06` | O Telégrafo | 45 | O telégrafo e a internet vitoriana |
| 05 / `01` | As Leis do Pensamento | 53 | Como a lógica humana virou álgebra |
| 05 / `02` | As Máquinas de Hollerith | 46 | A Máquina de Hollerith e a IBM |
| 07 / `01` | As primeiras máquinas que ligaram | 56 | As primeiras máquinas programáveis na vida real |
| 07 / `02` | O programa que mora na memória | 54 | Quando o programa entrou na memória |
| 07 / `03` | Grace Hopper e o compilador | 55 | Grace Hopper e o primeiro compilador |

Fase antiga, fora das etapas: piloto v1 (faixa 33, em `00 - Piloto\_v1\`, decisão de apagar pendente) e "Antes da Eletricidade" (faixa 34, em `_arquivos\`, nota já apagada pelo Flávio).

## O piloto (fora das etapas)

`00 - Piloto - Do Ábaco ao Transformer` — é a vitrine: apresenta o arco inteiro e vende o resto da série. Publicado na v2.

⚠️ **Pendência: refazer (v3).** O piloto atual anuncia os episódios soltos e não conhece o hiato nem as etapas. O piloto novo apresenta **as 10 etapas** como mapa da série. Pedido de 20/08, reforçado pela reorganização de 22/08.

## Regras da série

- **O piloto primeiro** e, quando refeito, ele passa a ser o mapa das 10 etapas.
- Quem tem minutagem na coluna Fonte usa a transcrição (perfil `podcast-fonte-externa`); o resto precisa de **pesquisa própria** antes do trio. A etapa 4 é quase toda pesquisa nova.
- Um episódio por vez, com aprovação do Flávio antes de gerar áudio.
- Cada episódio tem **nome, data, motivação, como funciona e prática interativa** na `animacao.html`.
- Formato com animação (piloto v2, 19/08/2026): telas com botão Próximo + práticas interativas; o roteiro é dividido POR TELA, com a fala "aperte o Proximo" no fim de cada uma e convite a pausar nas práticas. Áudios v1 ficam em `_v1\` dentro da pasta do episódio.
- ⚠️ **Quantidade de telas NÃO é fixa em 8 (23/08).** Todo episódio até aqui saiu com 8 por hábito de copiar o molde do episódio anterior, não porque o sistema exige — não existe regra em nenhum comando/skill travando esse número. A partir de agora o número é **resultado do `_planta.md`** (26/08): antes do roteiro, listar uma linha por tela com o que ela carrega; quantas linhas sobrarem, esse é o N. O cabeçalho do roteiro ("E uma pagina com N telas") se preenche a partir dessa contagem, e o `podcast-verificador` reprova se planta, cabeçalho e blocos `TELA n` não baterem.
- ⚠️ **O áudio vem antes da animação** (invertido em 22/08 — ver a ordem de produção abaixo).
- Testar a animação com Playwright antes de publicar, **inclusive na viewport 360px**.
- ⚠️ **Janela temporal declarada (26/08).** A abertura de todo episódio diz o intervalo que ele cobre — "este episódio vai de 1745 a 1800" — e o fechamento devolve em que ano parou, pro próximo pegar dali. Vale nos três lugares: primeira linha do bloco do Overview, abertura do roteiro e ficha da primeira tela da animação.
- ⚠️ **Ficha humana dos protagonistas (26/08).** Todo personagem que carrega o episódio ganha uma ficha curta na primeira vez que é citado: onde nasceu (**nome do lugar na época + o que é aquilo hoje**), de que família veio (ofício do pai, condição), onde estudou, e **quando morreu e de quê** (a causa entra sempre que for conhecida, em poucas palavras e sem drama; quando a fonte não disser, o roteiro diz que não se sabe, nunca inventa). Critério de quem entra: os protagonistas, mais quem o roteiro julgar importante — coadjuvante citado de passagem numa frase só fica sem ficha. Motivo: nome solto com data de invenção do lado não gruda; ouvinte lembra de pessoa, não de sobrenome.
- Os 12 episódios publicados até 23/08 são anteriores às duas regras acima e não as seguem — entram nelas quando forem refeitos, sem reeditar nada por enquanto.

## Produção

### Ordem de produção de um episódio (invertida em 22/08)

Até aqui a animação vinha antes do áudio. O problema: o NotebookLM é a única peça que a gente não controla, e quando ele desvia do roteiro (inventa instrução, muda a ordem, antecipa uma cena), a animação já estava pronta e errada, e só se consertava regravando. Agora a peça imprevisível vem primeiro e a peça controlada se adapta.

1. **Planta de telas** (`_planta.md` na pasta do episódio, molde em `_arquivos\_molde-planta.md`) e só depois o **trio de texto** (Overview + roteiro por tela + prompt). O roteiro se copia de `_arquivos\_molde-roteiro.txt`, **nunca** do episódio anterior. Verificação pelo agente `podcast-verificador` (itens 16 e 17: planta x cabeçalho x blocos `TELA n`, janela temporal e ficha humana).
2. **Áudio no NotebookLM** — `node cria-episodio.js "<pasta>"`, depois `espera-audio.js` e `baixa-episodio.js` (lab em `AppData\Local\notebooklm-lab`).
3. ⚠️ **Mapa das telas, OBRIGATÓRIO (27/08)** — `python _arquivos\scripts\mapa-de-telas.py "<pasta do episódio>"`. Era opcional ("perguntar se ele quer") até 26/08; virou obrigatório porque sem ele ninguém compara o que o NotebookLM falou com o que o roteiro pediu, e foi assim que passou o "George Richmond" no ep `04-01`. Transcreve o mp3, salva `_transcricao.txt` com timestamps, corta nas falas "aperte o proximo" e escreve `_telas.md`: quanto tempo cada tela fica no ar, quais têm instrução de interagir, e o texto do que foi falado em cada uma. Também lista os nomes próprios e datas pra conferência e, na seção **Conferência contra o roteiro**, confronta o áudio com o `_NotebookLM_`: número de telas pedido x entregue, janela temporal declarada na capa e ano no fecho, anos do roteiro que o áudio não falou (e anos que ele inventou), e protagonistas do roteiro que sumiram do áudio.
4. ⚠️ **Segunda passada, obrigatória antes de acusar erro:** `python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>` reouve os trechos suspeitos com um modelo maior. O modelo pequeno inventa nome próprio (escreveu "Bebed" pra Babbage e "filme etálico" pra fio metálico), então erro achado na transcrição só é erro de verdade depois de reouvir.
5. **Animação** montada em cima do `_telas.md` (que agora sempre existe), nunca do roteiro. Onde o áudio mandar apertar um botão, esse botão tem que existir.
6. **Publicação** (nota, capa, faixa, deck) — só depois.

O que o mapa pega e o roteiro não pega: o áudio inventa instrução de tela na hora ("aperte o botão do fio de metal", "observe como o carregamento exige tempo"), muda a ordem da abertura e antecipa cena de uma tela pra outra. Sem o mapa, isso só aparece quando o Flávio ouvir o episódio já com a animação pronta — por isso o passo deixou de ser opcional.

**Organização das pastas (22/08 — substitui o esquema achatado de 20/08):** uma pasta por etapa na raiz da série, e os episódios dentro dela:

```
Como Reinventar o Computador do Zero\
  00 - Piloto - Do Ábaco ao Transformer\   ← fora das etapas
  01 - Contar antes das máquinas\
      01 - O Ábaco\
      02 - O Zero e os Números\
  04 - Domesticando o raio\
      01 - A faísca\
      02 - A pilha de Volta\
      03 - A agulha que se mexeu\
      04 - Faraday e o gerador\
      06 - O Telégrafo\                    ← 05 e 07 estão reservados
  ...
  _EXTRAS\                                 ← episódios avulsos autocontidos (ver seção _EXTRAS)
      01 - Volt Ampere e Watt\
      02 - Por que o Ima Gruda\
  _arquivos\                               ← vídeo, áudio, transcrição, IMG, modelos-3d, scripts
  OLD\                                     ← tudo que já foi publicado (mesma estrutura de etapas)
  plano\                                   ← este plano e a visão HTML gerada dele (plano-visao.html)
      plano-da-serie.md
```

⚠️ **A árvore viva é um esqueleto vazio (27/08).** As pastas dos 12 episódios publicados foram movidas pro `OLD\`, que espelha a mesma estrutura, e a árvore viva foi recriada com **as 45 pastas de episódio deste plano, todas vazias** — o Flávio vai **refazer boa parte** dos publicados, porque o formato foi ficando mais claro com o tempo, e prefere partir da pasta vazia com o material antigo ao lado pra consultar. Ou seja: pasta vazia aqui NÃO quer dizer episódio inexistente; quer dizer "a fazer ou a refazer". Quem sabe o estado real é a coluna Status das tabelas de etapa lá em cima. Três nomes do plano tinham dois-pontos, que o Windows não aceita em pasta, e viraram hífen: `02 - Conectando tudo - a internet`, `01 - IA - a promessa e os invernos`, `02 - Deep learning - a virada` e `03 - 2017 - Attention is All You Need`.

Regras do naming: a pasta da etapa é **`NN - <Nome da etapa>`**, sem a palavra "Etapa" na frente — o número já diz o que é, igualzinho à tabela das 10 etapas lá em cima. O piloto é o `00` porque não pertence a etapa nenhuma e assim não disputa o `01` com a primeira. As 10 pastas de etapa existem desde já, mesmo vazias: a pasta vazia é o mapa do que falta. O número do episódio é a **posição dele dentro da etapa na ordem histórica**, reservada no plano antes de existir a pasta — quem for gravar "A pilha de Volta" cria `04 - Domesticando o raio\02 - A pilha de Volta`. Isso deixa buracos visíveis na numeração (na etapa 4 faltam o `05` e o `07`), e é de propósito. O rótulo "Equipamentos NN" saiu dos nomes: era da época em que a série tinha duas trilhas paralelas, e agora confundiria (episódio como "A faísca" não é equipamento).

O arquivo de prompt dentro de cada pasta seguia a convenção **caminho-com-hífens**: `01 - SÉRIE-Como Reinventar o Computador do Zero-01 - Contar antes das máquinas-01 - O Ábaco.txt`. **Em teste desde 22/08:** nome curto `NN-NN-<Nome>.txt` (etapa-episódio-nome), estreando no `04-01-A faísca.txt`. Se o teste pegar, os antigos migram; até lá convivem os dois.

**Título das notas (20/08):** o card no Nexus leva o **nome do podcast** (o título que o NotebookLM dá ao áudio, ex: "Como o zero criou o algoritmo"), não o nome da pasta. Quem amarra os dois é este plano.

**Capa dos cards (20/08):** as capas vêm da coleção do Flávio em `_arquivos\IMG\` (uma imagem diferente por card, definida via `coverAttachmentId` da nota). Depois de usar uma imagem, **apagar da IMG** pra não duplicar. Capas geradas por mim (estilo das animações) foram testadas e rejeitadas: ele prefere as da coleção.

**Capa gerada no Google Flow (22/08):** ⚠️ **PERGUNTA ABERTA pro Flávio: essa etapa substitui a coleção da IMG como padrão de capa, ou é só uma alternativa?** Capa 9:16 gerada no **Google Flow** (labs.google/fx/pt/tools/flow) com o modelo **Nano Banana 2** — na conta dele custou **0 créditos**. Processo pelo browser do lab (login Google já persistido):
1. `node abre.js "https://labs.google/fx/pt/tools/flow/project/7543972f-546b-4127-879e-83882fdd48dd"` (em `AppData\Local\notebooklm-lab`; projeto "Serie - Reinventar o Computador")
2. `node flow-capa.js "<prompt>" ["<pasta destino>"]` — seleciona 9:16, digita o prompt, espera e baixa as imagens novas como `capa-9x16-NN.png` (destino default: a `_arquivos` da série)
3. `node fecha.js` — fecha o browser e libera o profile (regra do publicador serial)

Prompt que funcionou (adaptar por episódio): pôster vertical de baixo pra cima — ábaco na mesa com vela → engrenagens da calculadora mecânica → válvulas âmbar → chip na placa verde → cérebro de rede neural azul entre estrelas; luz quente embaixo → fria no topo; **sem texto na imagem**. Primeiras capas: `_arquivos\flow-capa-9x16-01.png` e `-02.png` (e os pôsteres 16:9 `flow-poster-01/02.png`).

**Ilustração dos cards: primeiro o real, depois o gerado (22/08).** A regra para as imagens de qualquer tela: procurar material histórico real no Wikimedia Commons e só **gerar no Flow o que não existe**. Buscar com `_arquivos\scripts\busca-wikimedia.sh "<termo>" [qtd]` (imprime título, tamanho, licença e autor), baixar com `baixa-wikimedia.sh`, e registrar tudo num `img\CREDITOS.md` na pasta do episódio, marcando quais exigem crédito na legenda (CC BY e CC BY-SA exigem; domínio público e CC0 não) e quais são geradas. **Imagem gerada nunca é apresentada como gravura de época.**

**Os dois selos (26/08).** Toda prancha carrega **um dos dois** selos na legenda, nunca fica sem: `<span class="selo ilustra">ilustração</span>` (âmbar, `var(--flag)`) pro que foi gerado no Flow, e `<span class="selo real">imagem real</span>` (verde, `var(--ok)`) pra foto, gravura ou documento de acervo. A `.fonte` embaixo segue com a origem e a licença ("gerada no Google Flow · Nano Banana 2" / "domínio público"), e o `data-cred` do lightbox começa com o mesmo rótulo. Nas miniaturas 2x2 o selo fica escondido junto com a legenda — aparece ao ampliar. Implementado no `01 - A faísca` (13 ilustrações, 5 reais); vale pros próximos episódios ilustrados. O Commons rate-limita a API: baixar em lote pede pausa entre os itens.

Pra gerar, o `flow-capa.js` do lab agora aceita proporção e nome: `node flow-capa.js "<prompt>" "<pasta>" ["9:16"|"16:9"|"1:1"] ["<prefixo>"]`. Sem proporção continua fazendo 9:16, que é a capa da nota; **16:9 é o formato das ilustrações dentro da animação**. Pra casar com o material do Commons, o prompt pede o estilo da época (no ep `04-01`: "gravura do século XVIII, traços de buril e hachura, papel envelhecido, sem texto na imagem").

**Fotos históricas reais nas telas (22/08):** a tela de **ficha** de cada episódio ganha imagens reais da pessoa e do equipamento, vindas do **Wikimedia Commons** (retratos/gravuras em domínio público ou CC — o crédito/licença vai na legendinha, obrigatório no CC BY-SA). Processo (scripts em `_arquivos\scripts\`):
1. Achar os arquivos no Commons e baixar: `bash baixa-wikimedia.sh "<File:Titulo>" "<saida.jpg>" "<pasta do ep>\img"` (thumb 640px; imprime licença/artista pra legenda)
2. No `animacao.html`, adicionar o bloco `.retratos` na tela de ficha (CSS + 2 `<figure class="retrato retrato-p|retrato-l reveal">` com `src="__TOKEN__"`; `retrato-p` = imagem em pé, `retrato-l` = paisagem) — modelo pronto na Pascalina (etapa 3 / `01`)
3. Embutir como data URI (página segue autocontida pro embed): `node embute-imagens.js animacao.html __TOKEN__=img/foto.jpg ...`
4. Testar desktop + 360px (screenshot da tela de ficha)

Piloto feito na **Pascalina** (`03 - As engrenagens assumem\01 - Pascalina`, retrato do Pascal + Pascalina do Musée des arts et métiers). **Replicar nos outros 10 episódios quando o Flávio aprovar o piloto.**
As fotos valem também pras **outras telas** quando couber: no **Ábaco** (`01 - Contar antes das máquinas\01 - O Ábaco`) a tela final ("o ábaco pelo mundo") trocou os desenhos SVG por fotos reais clicáveis (suanpan reusa a foto da ficha via JS — `imgSuanpanFicha` → `imgSuanpanMundo` — pra não duplicar o base64; soroban CC BY-SA com crédito). Na `img\` dele ficou de reserva a `soroban-2.jpg` (calculadora Sharp anos 80 com soroban acoplado).

**Material pro ep da Pascalina (mecanismo, 22/08):** já baixado em `03 - As engrenagens assumem\01 - Pascalina\img\`, tudo domínio público, pra quando formos montar a explicação por dentro: `mecanismo-vista.jpg` (máquina aberta, gravura séc. XVIII), `engrenagens.jpg` (trem de engrenagens colorido), `sautoir-diagrama.png` (sautoir colorido limpo), `sautoir-detalhe.jpg` (prancha com 4 figuras) e `sautoir-animacao.gif` (GIF animado do sautoir). Encaixe sugerido: diagrama+GIF na tela 5 (sautoir), vista aberta na tela 4, com o esquema de lightbox do Ábaco.

**Cards clicáveis + card 3D (22/08):** os cards de imagem podem ser clicáveis — abrem um **lightbox**: foto amplia com a legenda; e episódio que tem modelo em `_arquivos\modelos-3d\` ganha um segundo card ("🧊 3d · girar", thumb = screenshot do modelo) que abre o **modelo 3D interativo** num iframe (o HTML inteiro do modelo vai embutido em base64 — página segue autocontida; o three.js do modelo continua vindo de CDN, pendência conhecida). Modelo pronto no **Ábaco** (`01 - Contar antes das máquinas\01 - O Ábaco`, suanpan do Commons + ábaco 3D). Esc/clique fora fecha; fechar remove o src do iframe (para o WebGL).

**Modelos 3D (22/08):** o Flávio quer evoluir as animações pra 3D real. Protótipos em `_arquivos\modelos-3d\` (three.js via CDN, paleta da série, um arquivo por máquina): `abaco.html` (contas clicáveis, monta 1.234), `roda-de-leibniz.html` (tambor escalonado, seletor de dígito, manivela, desafio 3×4), `pascalina.html` (rodas de pinos, visores-odômetro, sautoir no vai-um, demos 9+1/99+1, desafio 28+35) e `anticitera.html` (trem sideral real de 2006 — 64→38, 48→24, 127→32 + roda de retorno; mostrador de zodíaco, ponteiros sol/lua, fase da lua, ciclo de Metón 19 anos = 254 luas). A ideia é cada máquina virar asset reutilizável que as `animacao.html` dos episódios importam. ⚠️ **Backlog completo em `_arquivos\modelos-3d\_a-fazer.md` (27/08):** levantamento episódio por episódio, 45 objetos, 6 prontos e 39 a fazer (30 essenciais, 9 opcionais que se resolvem com foto do Commons), mais os pendentes de infra. Pra etapa 4, os candidatos naturais de modelo 3D são o **relé** (armadura fechando o contato) e o **gerador de Faraday** (disco girando entre os polos).

**Garrafa de Leiden + índice (23/08):** `garrafa-de-leiden.html` é o 5º modelo e o primeiro da etapa 4 — corte que se gira na mão (metal, vidro, metal), carga em degraus com os sinais **+** juntando na folha de dentro e **−** na de fora, e descarga no prego com faísca. Duas decisões que valem pros próximos: o corte é **plano de clipping** em vez de trocar geometria — e desde 23/08 o plano **segue a câmera** enquanto está ligado (a órbita gira e o interior fica sempre de frente; sem isso o autoRotate virava o corte de costas) — e **só o vidro, as folhas e os sinais de carga entram no corte** — haste, bola, corrente e rolha ficam inteiras, senão some justo o caminho da carga. Em 23/08 o modelo passou por verificação adversarial (3 auditores: física, geometria, runtime) e ganhou as correções: corrente com elos de verdade, condutor da máquina de atrito ao lado (a faísca do carregar salta dele), arco da descarga contornando a rolha por fora (a reta furava o isolante), legendas de física consertadas (a **atração** atravessa o vidro, a carga não; mão na **folha** de fora, não no vidro) e faísca visível com núcleo branco + brilho azul. A pasta ganhou `index.html`, a vitrine das máquinas (thumb tirada do próprio palco, prontas com link e as que faltam como card apagado): servir com `npx live-server --port=5500` na pasta e abrir `http://127.0.0.1:5500/`.

**O Prédio da Água — 6º modelo, e o primeiro que não é máquina histórica (23/08):** `predio-da-agua.html`, feito pro extra `_EXTRAS\01 - Volt Ampere e Watt`. Aqui o modelo **é a analogia**: altura da caixa d'água = tensão (22 V por andar, 1 a 10 = 22 a 220 V), cano fino/médio/grosso = resistência (60/20/8 Ω), registro = interruptor, e a vazão sai da lei de Ohm de verdade (I = V/R, P = V·I). Com cano grosso no 10º andar dá 27,5 A e 6 kW, que é um chuveiro. Dois bicos separam o que o áudio separa: o **fino** risca o lodo da calçada, o **aberto** enche o balde — mesma potência, trabalho diferente. Tem o botão "só pressão" (registro fechado: 220 V com 0 A, a tomada sem nada plugado) e o desafio "limpe a calçada", cronometrado.

Três coisas que este modelo ensinou e valem pros próximos:

- ⚠️ **O QA passou 27/27 com metade da máquina invisível.** Registro, bico e balde caíam exatamente atrás do HUD (que ocupa 340–940 px na horizontal e 466–784 na vertical numa tela de 1280×800) e nenhum teste de estado reclamou — só o screenshot mostrou. Virou asserção: o gancho expõe `pixels()`, que projeta cada peça pra pixels de tela, e o teste **falha** se alguma cair atrás do HUD ou fora da borda (rótulo, por ser sprite largo, tem folga de 85 px). Fazer isso em todo modelo novo.
- **Cena alta espreme a mecânica.** Com 0,9 por andar o prédio ficava 9 unidades e tudo que interessa vivia numa faixa de 1 unidade no rodapé. Baixar o andar pra 0,55 e **jogar o alvo da câmera pra esquerda do prédio** (a calçada inteira sai do vão do HUD) resolveu sem zoom.
- **Bug na base, achado aqui:** `criaRotulo` desenhava num canvas de 512 px sem medir o texto, então qualquer rótulo com mais de ~19 caracteres saía cortado no meio da palavra ("aixa d'água = pressã") — em **todas** as máquinas. Agora ele mede e encolhe a fonte até caber. Rótulo longo que parecia proibido passou a ser possível.

**Painel na lateral esquerda + slider em pé (23/08, vale pros 6 modelos):** o HUD saiu do rodapé central e virou um painel de 330px na lateral esquerda ocupando 80% da altura do palco, com as seções espalhadas de cima a baixo, e o slider (Leibniz e Prédio da Água) ficou vertical. Motivo: a barra de rodapé cobria justamente a faixa onde a mecânica das máquinas costuma viver. Pra máquina não ficar atrás do painel, a base desloca a **projeção** (`camera.setViewOffset`) em vez de torcer o alvo de cada modelo — a órbita segue girando em volta da máquina e o clique nas peças continua certo. Abaixo de 700px de largura o painel volta pro rodapé (na tela estreita ele cobriria tudo). Os 6 modelos foram medidos antes e depois: nenhum passou a cortar por causa disso.

O slider ficou numa **faixa própria encostada na direita do painel**, fora do fluxo: no fluxo normal a altura dele mandava na altura do painel e abria um vão no meio. E os botões viraram **grade de 2 colunas** (mesma largura e altura; ímpar no fim ocupa a linha inteira), porque no painel estreito o wrap antigo deixava linha com dois, linha com um e um sobrando sozinho. A leitura de cada máquina (`.linha-total`) virou um **card emoldurado** com o número em 38px, mesma linguagem das três medidas do Prédio da Água: os 6 menus ficaram iguais — legenda no topo, card de leitura no meio, botões no rodapé do painel.

⚠️ **Não devolver o painel pro rodapé.** Ele mora na lateral por decisão, e a barra de rodapé é só o modo de tela estreita (abaixo de 700px). Tudo isso vive no `_base-modelo-3d.css`, então **máquina nova herda de graça** — não precisa (nem deve) reposicionar o `.hud` no `<style>` local. O porquê está comentado no próprio CSS, na skill `modelo-3d` (§2 e §4) e na memória da série, pra ninguém reabrir isso por engano.

⚠️ **Anticítera corta em cima e embaixo** — e cortava antes da mudança do painel também (medido nos dois modos). O `meiaLargura`/`distMin` dela fecha a largura e estoura a altura. Pendência conhecida, não é regressão.

**A garrafa 3D entrou na apresentação como TELA 0 (23/08):** o episódio `04 - Domesticando o raio\01 - A faísca` (`animacao-flow.html`) ganhou uma tela **antes** das 8 do áudio, só com o modelo interativo ocupando o palco inteiro — o ouvinte pega a máquina na mão, e quando quiser aperta Próximo e liga o áudio na tela 1. **A primeira tentativa foi um 5º card na fileira da tela 5** (thumb com selo `🧊 3d · girar`, abrindo o modelo no lightbox); ficou escondido no meio das fotos e o Flávio pediu em destaque. Fica o registro: **modelo 3D pede tela própria, não card**.

Como a tela 0 é extra, o **contador conta só as 8 do áudio** — ela aparece como `0 / 8` e a tela 1 continua sendo `1 / 8`, então a marcação de tempo do `_telas.md` não mexe. O que ficou aprendido:

- **Costurar antes de embutir.** Os modelos dependem de `_base-modelo-3d.css` + `_base-modelo-3d.js`, e dentro de um `iframe data:` não existe pasta vizinha. O script novo `_arquivos\scripts\embute-modelo-3d.js` junta os três num HTML só (tira o `export` da base) e aí converte pra base64. Rodar de novo **troca** o base64 que já está lá, então mexer no modelo e republicar é um comando: `node ..\..\_arquivos\scripts\embute-modelo-3d.js animacao-flow.html __MODELO3D_B64__ ..\..\_arquivos\modelos-3d\garrafa-de-leiden.html`. Tem também `--so-monta <modelo.html> <saida.html>` pra abrir o costurado direto no navegador.
- **O teclado não atravessa iframe.** Assim que o ponteiro entra no modelo, as setas ← → param nele e a apresentação parece travada na tela 0. A base passou a reenviar `ArrowLeft`/`ArrowRight`/`Escape` pro pai por `postMessage` (`modelo-3d:anterior` / `:proximo` / `:fechar`) quando está embutida. Vale pra todo modelo daqui pra frente, de graça.
- **O WebGL só liga na tela 0.** O iframe ganha `src` ao entrar na tela e perde ao sair — deixar o render girando por trás das outras sete telas não mostra nada e come GPU (e bateria no celular).
- **Embutida, a faixa de título do modelo some** (a base esconde o `<header>` quando `window.parent !== window`): ela repete o topo da própria apresentação e só roubava altura do palco.
- **No celular a máquina vem primeiro** (`.tela-0 .pranchas{order:-1}`): na ordem do HTML o texto empurrava o modelo todo pra baixo da dobra.
- **Quem manda na esquerda é o painel do modelo.** Em 23/08 o HUD dos modelos virou coluna à esquerda (antes era faixa embaixo). Com a tela 0 no formato texto-na-esquerda + palco-na-direita, viraram dois painéis grudados — então o texto da tela 0 passou a ser uma **faixa larga em cima** e o palco ficou com a largura toda. Regra pros próximos: **a apresentação não disputa a esquerda com o modelo**.
- **Embutido, a máquina fica no meio da tela.** A base empurra a máquina pra direita do painel (`desvioDoPainel`) pra ela não ficar escondida atrás dele — certo na página solta, errado na apresentação, onde o palco é bem mais largo e a máquina centrada já passa longe do painel: lá o desvio só abria um vão à esquerda. `desvioDoPainel` devolve 0 quando `EMBUTIDO`. A página solta continua igualzinha.

⚠️ **Os `_animacao-fonte*.html` de `01 - A faísca` estão velhos.** Os dois são byte a byte iguais e ainda trazem os créditos do Commons e os nomes de arquivo antigos; quem recebeu as imagens do Flow, o bloco de CSS de celular e agora a tela 0 foi o **`animacao-flow.html` construído**. Ou seja: **a fonte de verdade é o arquivo construído** — editar ele direto e usar os scripts de embutir só pros pedaços binários. Reconstruir a partir da fonte velha perde trabalho.

⚠️ **QA dos modelos: Playwright, não patchright.** O patchright roda `page.evaluate` em mundo isolado e o gancho `window.__<maquina>` aparece como `undefined` — parece bug do modelo e não é. Usar o Playwright do cache npx com `channel: 'msedge'`.

# Planta de telas — EX-03 O Sistema Decimal

**Extra, fora da linha do tempo:** autocontido, sem pessoa, sem data, sem citar série ou
episódio vizinho (REGRAS DURAS nº 1 e 2 dos extras). **Analogia única: os dez dedos e o
"encheu a mão, sobe um"** — a pedrinha na tigela que vale um grupo, o saquinho que vale
dez pedrinhas, o compartimento vazio da prateleira. O ábaco entra como a analogia
mecanizada, não como equipamento histórico (a história dele é assunto de episódio, não
deste extra).

**Estado (31/08/2026): áudio pronto e conferido.** Trio escrito em cima das telas, áudio
**"Por que contamos de dez em dez"** (12:52, notebook em `_notebook-url.txt`), transcrito
pelo `mapa-de-telas.py`: 10 telas no áudio pras 10 da página, 9 pedidos de Próximo na
ordem, conteúdo batendo tela a tela, REGRAS DURAS respeitadas. Tocador no cabeçalho
(capa = maos-contando), marcadores do `episodio.js` escritos pelo
`marcadores-do-mapa.py` (não editar à mão). Falta a régua 7: o Flávio ouvir com a página
aberta (card do hub está "pra conferir").

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | a pergunta do extra (por que dez? o que o vai-um faz?) + a arte das mãos contando |
| 2 | cena | por que logo dez: é quantos dedos vêm de fábrica; outros jeitos existiram, a mão ganhou |
| 3 | cena | a regra inteira numa troca: encheu as duas mãos → UMA pedrinha na tigela (vale um grupo de dez) |
| 4 | demonstração | a posição manda: as mesmas 3 contas valendo 3, 30, 300, 3000; fecha no 347 (`tocaRoteiro`) |
| 5 | cena | grupo de grupos: dez pedrinhas → saquinho, dez saquinhos → caixa (unidade, dezena, centena, milhar) |
| 6 | demonstração | contar sem parar (0,9s por passo, até 9999): a legenda avisa a cada casa que enche — o vai-um trabalhando |
| 7 | cena | o zero: o compartimento vazio da prateleira é informação, não falta |
| 8 | demonstração | 305 sem virar 35: a dezena vazia no ábaco, em 3 passos |
| 9 | prática | montar 47, 90 e 305 (o 90 força a unidade vazia; o 305, a dezena) com trilha |
| 10 | fecho/ficha | dez é costume, não lei: o relógio (60), a dúzia (12) e o interruptor (2) — o gancho do "grupo de dois" sem citar o próximo extra |

**Peças:** `abaco.css` e `abaco.js` **copiados** do ep 01-01 (segunda cópia; na terceira,
a regra do terceiro clone manda propor a fábrica na base). `decimal.js` tem o
`tocaRoteiro` (mesmo desenho do ep), a contagem contínua com legenda por casa cheia, a
demo do 305 e a prática com trilha. `animacao.html` nasceu do `_molde-animacao.html` da
base, sem o bloco do tocador e sem modelo 3D.

**Artes (Flow, Nano Banana 2, 16:9, prompts em `img/flow/prompt/`):** `maos-contando`
(capa e tela 2), `encheu-a-mao` (tela 3), `sacos-e-caixas` (tela 5),
`prateleira-do-zero` (tela 7). Todas com selo `ilustração` e legenda de reconstituição.

**Dívida assumida de saída:** a tela 2 reusa a arte da capa (mesmo arquivo, close
diferente sairia melhor); se o Flávio quiser, gera-se uma segunda variante no Flow.

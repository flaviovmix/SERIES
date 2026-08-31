# Planta de telas — EX-05 O Sistema Hexadecimal

**Extra, fora da linha do tempo:** autocontido, sem pessoa, sem data, sem citar série ou
episódio vizinho (REGRAS DURAS nº 1 e 2 dos extras). **Analogia única: o armário de
dezesseis gavetas** — os algarismos como carimbos (dez no estojo, seis emprestados do
alfabeto), a gaveta que guarda dezesseis. O dia a dia moderno pode entrar (código de
cor), como no EX-01; o que não entra é computador/bit/série — o fecho fica no "apelido
de grupo de quatro sim-ou-nãos" e no gancho "rende outra conversa".

**Estado (31/08/2026): áudio pronto e conferido.** Trio escrito em cima das telas, áudio
**"Por que o hexadecimal usa letras"** (10:35, notebook em `_notebook-url.txt`),
transcrito pelo `mapa-de-telas.py`: as 10 telas na ordem, conteúdo batendo tela a tela,
REGRAS DURAS respeitadas (sem bit/byte; cor de tela só como coisa vista). **Um reparo de
esteira:** o pedido da virada 5→6 saiu "Aperte próximo" sem o "o" e o corte automático
não separou — a linha da tela 6 (06:19) foi inserida na tabela do `_telas.md` conferindo
a `_transcricao.txt`. **Ressalva pra ouvir:** o 1º cartão do fecho (o tamanho certo)
ficou rápido e a transcrição dele saiu embolada — conferir de ouvido se está inteiro.
Tocador no cabeçalho (capa = armário), marcadores pelo `marcadores-do-mapa.py`. Card do
hub: "pra conferir".

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | a pergunta (contar depois do 9 sem subir casa?) + a arte do armário de 16 gavetas |
| 2 | cena | o problema: contar em grupos de dezesseis pede 16 desenhos; nossos carimbos são 10 |
| 3 | cena | a solução: seis letras emprestadas — A=10 … F=15; letra é algarismo de outra roupa |
| 4 | demonstração | contador 0→255 (0,8s por passo): o 9→A não sobe nada; o vai-um só chega no F |
| 5 | cena | a escada: a casa vale dezesseis; duas casas = 256 números (00 a FF) |
| 6 | demonstração | o coração: 4 lâmpadas clicáveis → 1 rótulo (16 combinações, 16 algarismos, encaixe exato) |
| 7 | cena | onde esbarra nele: o código de cor (três pares 00-FF nomeiam 16 milhões de cores) |
| 8 | demonstração | ler o 2A no clique: 2×16=32, A=10, 42 — casa multiplica, algarismo conta |
| 9 | prática | montar 26, 42 e 240 clicando nos algarismos (26/42 obrigam o A; 240, o F) com trilha |
| 10 | fecho/ficha | por que 16 (2×2×2×2, encaixe exato), o preço (letra assusta) e onde a analogia quebra |

**Peças:** `hexa.js` tem o **mostrador** (algarismos grandes de dezesseis, com rótulo da
casa e quanto valem; clicável na prática — o clique avança o algarismo e do F volta pro
0), o contador, a leitura no clique e a prática. `lampadas.js` é a **2ª cópia** da
fábrica do EX-04 (ganhou a opção `casas`, aqui [8,4,2,1]); o CSS das lâmpadas idem,
dentro de `hexa.css` — **na 3ª cópia, a regra do terceiro clone manda extrair pra
base**, como já foi feito com a trilha (`site/js/animacao/trilha.js`, que este extra
consome). `animacao.html` nasceu do `_molde-animacao.html` da base, sem tocador e sem
modelo 3D.

**Artes (Flow, Nano Banana 2, 16:9, prompts em `img/flow/prompt/`):**
`armario-de-boticario` (capa), `estojo-de-carimbos` (tela 2), `carimbos-novos` (tela 3),
`gaveta-de-dezesseis` (tela 5), `leque-de-cores` (tela 7). Todas com selo `ilustração`;
as de época com legenda de reconstituição.

**Dívida assumida de saída:** a arte da gaveta é a **v2** (a v1 saiu com 20 caixinhas —
contável e errado — e foi descartada; o `flow-...-01.png` na pasta é dela). Na v2 o
corte 16:9 esconde uma fileira, então alt e legenda não prometem "quatro por quatro";
se o Flávio quiser a grade inteira contável, regerar pedindo a grade com margem dentro
do quadro.

# Planta de telas — EX-04 O Sistema Binário

**Extra, fora da linha do tempo:** autocontido, sem pessoa, sem data, sem citar série ou
episódio vizinho (REGRAS DURAS nº 1 e 2 dos extras). **Analogia única: a lâmpada e o
interruptor** — aceso ou apagado, sem meio-termo; a fileira de lâmpadas onde cada casa
vale o dobro. Computador, circuito e bit não aparecem: o fecho fica no "sim e não
combinados" e no gancho "rende outra conversa".

**Estado (31/08/2026): áudio pronto e conferido.** Trio escrito em cima das telas, áudio
**"Como contar qualquer número apenas com lâmpadas"** (29:25, notebook em
`_notebook-url.txt`), transcrito pelo `mapa-de-telas.py`: 10 telas no áudio pras 10 da
página, 9 pedidos de Próximo na ordem, conteúdo batendo tela a tela (contador, escada,
13 = 01101, cascata do 7+1, prática com pausa), REGRAS DURAS respeitadas — inclusive a
nº 3 (sem bit/computador). **Ressalva anotada:** o fecho (tela 10, 5:51) saiu comprido e
com linguagem empolada; o Flávio decide de ouvido se incomoda (regravar = ajustar o trio
e rodar a esteira de novo). Tocador no cabeçalho (capa = galpao-de-lampadas), marcadores
do `episodio.js` pelo `marcadores-do-mapa.py`. Card do hub: "pra conferir".

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | a pergunta do extra (contar só com aceso/apagado?) + a arte do galpão de lâmpadas |
| 2 | cena | a peça: o interruptor não tem meio-termo — leitura à prova de erro |
| 3 | cena | a regra inteira numa troca: uma lâmpada conta até 1; veio mais um, apaga e acende a vizinha |
| 4 | demonstração | deixa contar (1,3s por passo, até 31): a legenda narra cada vai-um — a cascata do 7→8 aparece sozinha |
| 5 | cena | a escada: cada casa vale o DOBRO (1, 2, 4, 8, 16) — cinco lâmpadas contam até 31 |
| 6 | demonstração | a mesma lâmpada mudando de casa (1→2→4→8→16), no clique; fecha no 13 = 8+4+1 |
| 7 | cena | a apagada no meio guarda a casa dela — o serviço do algarismo 0 |
| 8 | demonstração | somar é empurrar: começa no 5, botão soma 1; o 7+1 derruba a fileira (cascata) |
| 9 | prática | montar 5, 10 e 21 (o 10 força a casa do 1 apagada; o 21, casa sim casa não) com trilha |
| 10 | fecho/ficha | por que logo dois: o meio-termo (robustez), o preço (comprimento) e onde a analogia quebra |

**Peças:** `lampadas.js` + `binario.css` são o widget PRÓPRIO do extra (fileira de cinco
lâmpadas, casas 16/8/4/2/1) — o ábaco não entra: peça nova, sem clone. As demonstrações
das telas 6 e 8 andam **no clique** (o visitante dá o passo), de propósito: não usam o
`tocaRoteiro` cronometrado dos episódios. A **trilha da prática (tela 9) vem da base**
(`site/js/animacao/trilha.js`): chegou à 3ª cópia (episodio.js → decimal.js →
binario.js) e foi extraída em 30/08/2026 com o OK do Flávio, pela regra do terceiro
clone — os três consumidores foram retestados. `animacao.html` nasceu do
`_molde-animacao.html` da base, sem o bloco do tocador e sem modelo 3D.

**Artes (Flow, Nano Banana 2, 16:9, prompts em `img/flow/prompt/`):**
`galpao-de-lampadas` (capa), `interruptor-de-alavanca` (tela 2), `duas-lampadas`
(tela 3), `escada-que-dobra` (tela 5), `apagada-no-meio` (tela 7). Todas com selo
`ilustração` e legenda de reconstituição.

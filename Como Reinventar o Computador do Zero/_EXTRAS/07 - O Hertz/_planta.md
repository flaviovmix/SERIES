# Planta de telas — EX-07 O Hertz

**Extra, fora da linha do tempo:** autocontido, sem pessoa, sem data, sem citar série ou
episódio vizinho (REGRAS DURAS nº 1 e 2 dos extras — e aqui a nº 1 inclui **não contar
de quem veio o nome da unidade**, como no EX-01). **Analogia única: o balanço do
parque** — 1 Hz = um vai-e-vem por segundo; cada balanço tem o ritmo próprio (corda
curta = rápido), o que prepara o fecho "por que o giga mora no minúsculo". O dia a dia
moderno entra como coisa vista (rádio, wi-fi, processador), sem abrir por dentro.

**Estado (31/08/2026): áudio pronto e conferido.** Trio escrito em cima das telas, áudio
**"O que o Hertz realmente mede"** (15:08, notebook em `_notebook-url.txt`), transcrito
pelo `mapa-de-telas.py`: 10 telas no áudio pras 10 da página, 9 pedidos de Próximo na
ordem, conteúdo batendo tela a tela (hz não mede força, 2 Hz × 10 s = 20, escada com a
tomada de 60 Hz, oitavas nos botões de som com o aviso de apertar por cima da fala,
sintonia 89,1, prática com pausa), REGRAS DURAS respeitadas. Tocador no cabeçalho
(capa = balanços), marcadores do `episodio.js` pelo `marcadores-do-mapa.py`. Duas notas
de arte: a capa é a **v2** (o downloader do Flow pegou a imagem errada do feed na v1 —
veio o estojo do EX-05, registrado no README dos prompts) e o visor do rádio da tela 8
veio com borrões meio numéricos (o alt não promete "só traços"). Falta a régua 7: o
Flávio ouvir com a página aberta (card do hub está "pra conferir").

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | 89,1 na rádio, 2,4 no roteador, 3 no processador: o mesmo sobrenome + a arte dos balanços |
| 2 | cena | o que 1 Hz conta: UMA repetição por segundo — repetição, não tamanho nem força |
| 3 | demonstração | o balanço na tela: botões 1/2/4 Hz, contador de vai-e-véns e relógio de segundos |
| 4 | cena | o ritmo é do tamanho: corda comprida devagar, corda curta depressa (prepara o fecho) |
| 5 | demonstração | a escada dos prefixos no clique: Hz → kHz → MHz → GHz, com exemplo do dia a dia por degrau |
| 6 | cena | som é balanço de ar: sino grande grave, sininho agudo; ouvido de 20 Hz a 20 kHz |
| 7 | demonstração | OUVIR: botões 110/220/440/880/1.760 Hz tocam 1 s de senoide (WebAudio); o dobro = oitava |
| 8 | cena | a sintonia: cada estação no ritmo próprio; girar o botão = escolher qual balanço acompanhar |
| 9 | prática | montar 3 kHz, 2 MHz e 5 GHz (algarismo que avança + prefixo) com trilha da base |
| 10 | fecho/ficha | o minúsculo (por que giga = coisas pequenas), o apelido (prefixo é tamanho) e onde a analogia quebra |

**Peças:** `hertz.js` tem o **balanço** (pêndulo em CSS `@keyframes`, contador via
`animationiteration`), a **escada** de prefixos, o **toca-frequência** (WebAudio no
clique, com try/catch avisando se o navegador segurar) e a montagem mantissa × prefixo
da prática — tudo peça própria, sem clone. A trilha vem da base
(`site/js/animacao/trilha.js`), com `rotulo` formatando o alvo ("3 kHz").
`animacao.html` nasceu do `_molde-animacao.html` da base, sem tocador e sem modelo 3D.

**Artes (Flow, Nano Banana 2, 16:9, prompts em `img/flow/prompt/`):**
`balancos-do-parque` (capa), `crianca-no-balanco` (tela 2), `dois-balancos` (tela 4),
`sino-grande-e-sininho` (tela 6), `radio-antigo` (tela 8, dial só com traços). Todas com
selo `ilustração` e legenda de reconstituição.

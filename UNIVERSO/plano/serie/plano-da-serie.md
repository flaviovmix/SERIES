# Série: Universo

**Estado (18/09/2026, 07h):** **NO AR e LIGADA** desde o commit `25155a1` (+ `02f4d86`, um conserto do deploy): home, hub com o piloto, Janeiro, extras e o 1.01 em `series.afx.art.br`. Ele mandou "pode publicar e até ativar logo a série". A 08 foi ligada direto no `series.json` do servidor (o que o painel escreve), antes do deploy, porque o gerador recusa série da MENU sem estado.
- **Etapa 0 fechada:** as oito perguntas de abertura respondidas por ele, com duas decisões trocadas no meio da conversa (o objeto e a divisão).
- **Etapa 1 fechada:** `_pesquisa-inicial.md` com quatro eixos levantados em fonte primária, o que não fechou e a lista do que a série não pode dizer.
- **Etapa 2 (este arquivo) fechada hoje**, com a régua e a divisão decididas **por delegação dele** ("eu não vou bater o olho"), marcadas como tal nas D11 e D12.
- **No site, só local e sem commit (17/09/2026, à tarde):** o hub `site/universo.html` com os 6 cards de etapa e as artes, a série 08 na `MENU` do `menu.js`, no `cards.js` e no `series.json` (desligada, D7), o ícone `planeta` na home e a linha no `PASTAS_DO_SITE` do `deploy/publicar.sh`. A página da etapa 01, `site/etapas/universo-01.html`, com os 5 cards de episódio e a arte de cada um (originais e prompts em `UNIVERSO/_arquivos/capa-episodios/etapa-01/`). O card dos Extras fecha a grade do hub, logo depois da etapa 06, e leva pra `site/extras/universo.html`, com os 5 candidatos da seção `_EXTRAS` em cards (artes em `UNIVERSO/_arquivos/capa-extras/`). O hub e a página de Janeiro têm o player do `00` marcado PROVISORIO no HTML: o áudio não existe, e o bloco não sobe mudo. Ainda sem pasta de episódio, e as etapas 02 a 06 sem página.
- **O piloto existe (18/09/2026):** `00 - A serie inteira/` com pesquisa, trio aprovado pelo verificador (duas rodadas) e o áudio "A história do universo em um ano" (14:10), ligado no player do hub. Falta ele ouvir. ⚠️ Duas ressalvas confirmadas na reescuta (`_telas.md` do piloto): "Sawala em 2020" (é 2025) aos 05:52 e a faixa da Lua "até 4,11 bilhões" (é 4,51) aos 07:10. Regravar ou deixar é decisão dele.
- **O 1.01 está pronto, só local (18/09/2026):** `01 - Janeiro/01 - O primeiro instante e o que ninguem sabe/` com `_pesquisa.md`, `_filmes-e-documentarios.md`, `_planta.md` (7 telas), trio aprovado pelo verificador (duas rodadas), o áudio **"O Big Bang não foi uma explosão" (12:31)**, `_telas.md` com os cortes, `animacao.html` com o widget da régua (`regua.css`/`regua.js`), 3 fotos reais do Commons, `episodio.js` com os 6 marcadores, o episódio com `href` e `filmes` na `MENU` e os cards regerados. QA da página (7 telas, imagens, estouro, telefone) e do player limpos. ⚠️ O áudio disse o marcador 6 vezes em vez de 7 (emendou a ficha com o "não foi explosão"): o corte da tela 3 foi feito à mão em 05:04, pelo instante em que o assunto vira (registrado no `_telas.md`). ⚠️ Uma ressalva confirmada na reescuta: aos 07:57 o áudio diz "13 bilhões, 697 milhões" (é 797; o próprio áudio diz certo na abertura e no fecho). Regravar ou deixar é decisão dele. ⚠️ O Flow bateu no limite de uso e 3 ilustrações planejadas (telas 3, 6 e 7) ficaram no `ilustracoes.md`; entraram no lugar o campo profundo do Hubble (real) e duas artes já existentes da série. Falta ele ouvir com a página aberta.
- **O 1.02 está pronto (18/09/2026, de manhã):** `01 - Janeiro/02 - A primeira luz/` com pesquisa, planta de 8 telas, trio aprovado pelo verificador (duas rodadas), o áudio **"A luz mais antiga do universo" (12:33)**, `_telas.md` e a animação com dois widgets: o esticão da luz (`esticao.js`, a luz saindo a 2973 K e chegando a 2,725 K, 1091 vezes mais esticada) e a régua com lupa (`regua.js`, agora movida só por dados: as marcas e os trechos vêm de um bloco JSON na página, e o arquivo é o mesmo em todo episódio). Todas as imagens são reais (Commons), menos a capa; o Flow nem entrou. QA da página limpo. ⚠️ Cinco ressalvas confirmadas na reescuta (`_telas.md`): "2,75 graus" aos 06:42 (é 2,725); "o comitê nunca chamou o Big Bang de explosão" aos 04:40 (o comunicado de 1978 chama); "neblina" aos 05:15 (analogia proibida); "1091 vezes, que é o z" aos 07:05 (é 1 + z); e um fecho inventado. Regravar ou deixar é decisão dele.
- **O 1.03 está pronto (18/09/2026):** `01 - Janeiro/03 - As primeiras estrelas/`, 8 telas, trio aprovado na segunda rodada, o áudio **"As estrelas que acabaram com o escuro" (9:52)**. A régua ganhou a **primeira faixa** (3 a 8 de janeiro, D14) e o ponto da LAP1-B em 22 de janeiro. Sem ficha humana, de propósito. Todas as imagens são reais ou concepção artística declarada; o Flow nem entrou. ⚠️ Ressalvas no `_telas.md`: a "impressão digital" (analogia proibida) aos 09:25, a estrela PicII-503 sem o nome no fecho, e um "só" que o verificador tinha tirado. Regravar ou deixar é decisão dele.
- **A régua virou peça movida por dados (18/09/2026):** o `regua.js` e o `regua.css` são os mesmos arquivos no 1.02, no 1.03 e no 1.04; as marcas, as faixas, a lupa (ano, janeiro, um dia, uma hora) e o degrau de cada rótulo vêm do bloco JSON da página. P10 abaixo: juntar num lugar só.
- **Conversor de desvio pra anos:** `_arquivos/scripts/idade-no-desvio.py` faz a conta do ΛCDM com os parâmetros do Planck 2018 (dá 13,79 bilhões pra hoje e 372 mil anos pro z\* da primeira luz). É tradução pelo modelo, e a pesquisa de cada episódio diz isso quando usa.
- Os outros 25 episódios não têm pesquisa própria, planta, trio nem áudio.

**Formato:** episódios NotebookLM via `/criar-podcast` (trio por episódio), cada um com a sua `animacao.html` no molde das outras séries e pelo menos uma tela que se mexe com dado que não muda sozinho. Cada etapa tem o episódio `00` só de áudio, e o `00` da série inteira é o piloto: o ano cósmico de ponta a ponta.
**Fonte:** pesquisa pública com fonte primária, consolidada em [`_pesquisa-inicial.md`](_pesquisa-inicial.md). Cada episódio ainda faz o seu `_pesquisa.md`.
**Capa:** `site/img/serie-universo.webp` (o quintal, o telescópio e a Via Láctea); original e prompt em `UNIVERSO/_arquivos/capa-serie/`. Falta ele conferir (P3).
**Artes das 6 etapas:** `site/img/universo-etapa-01.webp` a `-06.webp`, 1200x670; originais e prompts em `UNIVERSO/_arquivos/capa-etapas/`. Falta ele conferir (P4).
**Como fazer cada coisa** (episódio público, página com áudio, subir o site): por enquanto a receita da Hardware, `HARDWARE/plano/_COMO-FAZER.md`.

---

## A tese

Quase tudo que sabemos do universo chegou aqui como luz, e a série ensina a ler o que ela traz: distância, temperatura, do que a coisa é feita e de quando ela é.

O formato é o **Calendário Cósmico**: os 13,797 bilhões de anos comprimidos num ano só. O piloto conta o ano inteiro, e cada etapa pega um pedaço dele.

A costura entre as duas coisas (D13): **toda marca do calendário vem com como é que alguém sabe aquela data.** A resposta é quase sempre luz, e quando não é, é fóssil ou isótopo, que é a mesma ideia com outro mensageiro. Sem essa frase, a série teria dois eixos e nenhum.

## Quem está na bancada

- **Professor:** o Claude. Mostra o problema antes da peça, e mostra como se sabe antes de dizer o número.
- **Aluno:** o Flávio.
- **O objeto (D2):** **a régua do ano cósmico**. Uma linha de 12 meses que começa vazia no piloto e ganha marca em cada episódio. No fim da série ela está inteira, e o ouvinte sabe de onde saiu cada marca.

## Arco da série

A pergunta única: **se todo o tempo do universo coubesse num ano, o que aconteceu em cada dia, e como é que alguém sabe disso?**

**Regras que seguram tudo:**

1. **A mesma régua do começo ao fim** (D2). Toda etapa põe marca nova. Episódio que não marcou nada está errado.
2. **Toda marca vem com o como se sabe** (D13). É onde a luz entra, e é o que liga a tese ao formato.
3. **A tela se mexe**, com dado que não muda sozinho: semente fixa, e o estado inicial é o que o áudio descreve.
4. **Todo episódio diz onde aquilo aparece fora da tela.**
5. **Número com data e fonte** (D8). Idade, distância e data saem com a fonte e a data da consulta.
6. **O que está em disputa sai como disputa** (D8), com os dois lados e o nome de quem publica cada um. Na régua, **data disputada é faixa, não ponto** (D14).
7. **A tradução de escala é de marca coletiva, nunca de vida individual** (D10).
8. **O áudio chama os extras pelo nome** (herdada, D9 da Hardware), sem abrir o assunto ali.
9. **Extra diz quem descobriu** (herdada, D10 da Hardware), com fonte primária antes de gravar.

---

## As 6 etapas

| # | Etapa | O que a régua ganha | Eps | Status |
|---|---|---|---|---|
| 1 | **Janeiro** | do primeiro instante à Via Láctea, tudo na primeira quinzena | 5 | 🟠 |
| 2 | **De fevereiro a agosto** | os sete meses em que nada acontece por aqui | 3 | 🔴 |
| 3 | **Setembro e outubro** | o Sol, a Terra, a Lua, a vida e o oxigênio | 4 | 🔴 |
| 4 | **Novembro e a primeira quinzena de dezembro** | a célula complexa, o sexo e os seres que não se encaixam | 4 | 🔴 |
| 5 | **De 17 a 30 de dezembro** | os bichos, a saída da água, as extinções e os dinossauros | 6 | 🔴 |
| 6 | **31 de dezembro** | o último dia, e a história escrita nos últimos 12 segundos | 5 | 🔴 |

Status: 🔴 não iniciado · 🟠 parcial · 🟢 tudo publicado
**Placar:** 3 publicados · 24 pela frente (fora os 7 episódios `00` e os extras; o `00` da série está no ar).

---

## Etapa 1 - Janeiro

*O universo inteiro de janeiro: o primeiro instante, a primeira luz, as primeiras estrelas e o começo da nossa galáxia. A parte mais cheia do calendário fora de dezembro, e a que menos se enxerga.*

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **O primeiro instante e o que ninguém sabe** | 1º de janeiro, 00:00. O que o Planck data de verdade ("o início do big bang quente") e o que ele não data. Por que não foi uma explosão num ponto. A inflação, e a frase da NASA de que ninguém sabe o que veio antes dela | 🟢 |
| `02` | **A primeira luz** | 1º de janeiro, 00:14. A recombinação e o fundo cósmico de micro-ondas: a luz mais velha que dá pra ver. O que o Planck mede (z\* = 1089,92 ± 0,25) e por que "380 mil anos" já é tradução | 🟢 |
| `03` | **As primeiras estrelas** | 3 a 8 de janeiro (faixa). A idade das trevas, a população III, e o incômodo bonito: **nenhuma delas foi observada**. O melhor candidato está em z = 6,6, ou seja 800 milhões de anos tarde demais | 🟢 |
| `04` | **A galáxia mais distante** | 8 de janeiro. MoM-z14, o recorde que já caiu duas vezes em dois anos, e o que o telescópio mede de verdade (desvio para o vermelho, não idade) | 🔴 |
| `05` | **A Via Láctea começa** | 22 de janeiro. O disco espesso começando 800 milhões de anos depois do Big Bang, medido em 250 mil estrelas. Como se lê a idade de uma estrela | 🔴 |

**Fecha quando:** a régua tem as cinco marcas de janeiro e cada uma diz de onde veio.
**Aparece em:** o chiado da TV antiga, que é o fundo cósmico de micro-ondas chegando na antena.

## Etapa 2 - De fevereiro a agosto

*Sete meses do calendário, mais de seis bilhões de anos, e quase nada para marcar por aqui. A etapa que explica por que o vazio também é assunto.*

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **A galáxia que come as vizinhas** | 11 de abril. A fusão com a Gaia-Enceladus, a fusão ainda anterior descoberta em 2026, e as três datas diferentes publicadas para a mesma fusão. Boa porta para a regra da faixa | 🔴 |
| `02` | **De onde vieram os átomos** | as estrelas fabricando o que não existia no começo, e por que o cálcio do osso e o ferro do sangue têm data de fabricação. **Pede pesquisa própria: este assunto não está no `_pesquisa-inicial.md`** | 🔴 |
| `03` | **O que vai acontecer com Andrômeda** | o futuro dentro da mesma régua: 50 e 50 de fusão em 10 bilhões de anos, e só 2% de chance de colisão frontal. Por que a previsão antiga mudou, e o papel da Grande Nuvem de Magalhães | 🔴 |

**Fecha quando:** dá pra explicar por que sete meses do ano cósmico cabem em três episódios.
**Aparece em:** as correntes de estrelas que ainda dá pra ver no céu, restos de galáxias engolidas.

## Etapa 3 - Setembro e outubro

*O Sol, a Terra, a Lua e a primeira vida. A etapa em que a datação sai da luz e passa para a pedra.*

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **O mesmo dia** | 2 de setembro: o Sol de madrugada e a Terra à noite, 17 horas depois. Ninguém datou o Sol: datou-se grão de meteorito. A diferença entre 4,567 e 4,54 bilhões **é** o tempo de formação da Terra | 🔴 |
| `02` | **A Lua** | ainda 2 de setembro. O grande impacto, e uma faixa publicada que vai de 4,35 a 4,51 bilhões. Por que o pico em 4,35 pode ser refusão por maré e não nascimento | 🔴 |
| `03` | **A coisa mais antiga que está viva** | 2 de outubro. O piso aceito (Strelley Pool, 3,43 bilhões) e a fila de candidatos mais antigos, todos disputados. O que faz uma evidência ser aceita e outra não | 🔴 |
| `04` | **O ar que quase matou tudo** | 31 de outubro. A fotossíntese que já existia centenas de milhões de anos antes, e o Grande Evento de Oxidação com três datas publicadas. O oxigênio como veneno | 🔴 |

**Fecha quando:** a régua liga a pedra ao relógio: dá pra dizer como se datam meteorito, zircão e rocha.
**Aparece em:** a ferrugem, que é o mesmo oxigênio fazendo o que fez com o ferro dos oceanos.

## Etapa 4 - Novembro e a primeira quinzena de dezembro

*Um bilhão e meio de anos de vida microscópica que inventa quase tudo o que veio depois, sem deixar quase nenhum fóssil.*

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **A célula que engoliu outra** | a célula complexa e as suas peças que um dia foram bactérias. **Pede pesquisa própria** | 🔴 |
| `02` | **Juntos** | 18 de novembro. O multicelular mais antigo aceito, com os próprios autores dizendo que a afinidade é incerta, e o caso do Gabão, 2,1 bilhões, cuja condição de fóssil é questionada | 🔴 |
| `03` | **O sexo** | 4 de dezembro. A alga que já fazia esporo e gameta diferentes, e a data que encolheu 150 milhões de anos quando refizeram a medição em 2018 | 🔴 |
| `04` | **Os que não se encaixam** | 16 de dezembro. Ediacara: fósseis de corpo mole que a ciência não consegue pôr em nenhum filo atual. Só um grupo tem confirmação química de que era animal | 🔴 |

**Fecha quando:** a régua mostra que a vida passou a maior parte do ano sendo invisível a olho nu.
**Aparece em:** a mitocôndria de cada célula sua, que ainda tem o próprio DNA.

## Etapa 5 - De 17 a 30 de dezembro

*Duas semanas do calendário e quase todo o registro fóssil que as pessoas conhecem pelo nome.*

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **A explosão que durou 20 milhões de anos** | 17 de dezembro, 18h. O que "explosão cambriana" quer dizer de fato, e a disputa entre quem lê o fóssil e quem lê o relógio molecular | 🔴 |
| `02` | **O primeiro peixe não tinha queixo** | os primeiros vertebrados de Chengjiang, e a mandíbula chegando 80 milhões de anos depois | 🔴 |
| `03` | **Sair da água** | 19 a 21 de dezembro. As plantas primeiro, os bichos depois, e as pegadas de tetrápode que são 18 milhões de anos mais velhas que o esqueleto mais antigo | 🔴 |
| `04` | **O pior dia** | 25 de dezembro, de manhã. O fim do Permiano em 60 mil anos, os Trapps Siberianos, e a briga sobre o tamanho: mais de 90% ou cerca de 81% | 🔴 |
| `05` | **Os dinossauros** | 25 de dezembro, à noite. Aparecem no mesmo dia da maior extinção. 165 milhões de anos, e a demora de milhões de anos até dominarem de fato | 🔴 |
| `06` | **30 de dezembro, seis da manhã** | Chicxulub, a sincronia de 32 mil anos entre impacto e extinção, a briga com o Deccan, e por que as aves passaram: o filtro foi o chão, não o voo | 🔴 |

**Fecha quando:** a régua dessas duas semanas está completa e cada extinção tem causa e disputa declaradas.
**Aparece em:** o pombo da praça, que é um dinossauro terópode vivo.

## Etapa 6 - 31 de dezembro

*O último dia do ano cósmico. Tudo que costuma ser chamado de história cabe nos últimos segundos.*

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Sete e meia da noite** | a separação da linhagem dos chimpanzés, e por que não descendemos deles. O que a genética mede quando fala em tempo de geração | 🔴 |
| `02` | **Dez e quatorze** | o gênero *Homo* numa mandíbula da Etiópia de 2,8 milhões de anos | 🔴 |
| `03` | **Onze e quarenta e oito** | *Homo sapiens*: Jebel Irhoud, os 315 mil anos que quase dobraram a estimativa anterior, e a disputa sobre onde se traça a linha do "moderno" | 🔴 |
| `04` | **Os últimos trinta segundos** | o fim do Younger Dryas, a base do Holoceno definida numa mudança de três anos no gelo da Groenlândia, e a agricultura que começou mil anos antes do que a morfologia mostra. O pão veio antes da agricultura | 🔴 |
| `05` | **Doze segundos** | a escrita, inventada quatro vezes em lugares diferentes. Como fica a régua quando a história inteira ocupa doze segundos, e por que isso não é motivo para achar a humanidade pequena | 🔴 |

**Fecha quando:** a régua está inteira, do primeiro instante ao último segundo.
**Aparece em:** qualquer texto escrito, que é a tecnologia que fez os 12 segundos caberem numa biblioteca.

---

## _EXTRAS

Candidatos levantados na pesquisa. Cada um desce num assunto que travaria o episódio, e todos dizem **quem descobriu** (D10 herdada). Ainda sem pasta e sem ordem fechada.

| Pasta | Extra | Aprofunda | Ouvir depois de | Status |
|---|---|---|---|---|
| `01` | **Quem foi Carl Sagan** | de onde veio o Calendário Cósmico (livro de 1977, *Cosmos* de 1980), por que ele calibrou em 15 bilhões e o que muda com a régua de hoje | o piloto | 🔴 |
| `02` | **A tensão de Hubble** | dois jeitos de medir a expansão dão números diferentes há mais de dez anos, com três times publicando. O que isso faria com a idade do universo | etapa 1, ep 01 | 🔴 |
| `03` | **Como se data uma pedra** | decaimento radioativo, meia-vida, e por que um zircão de 4,4 bilhões de anos é confiável | etapa 3, ep 01 | 🔴 |
| `04` | **A carta do tempo** | a carta da IUGS/ICS: quem decide o nome e a data de cada período, e por que a base do Cambriano mudou de 541 para 538,8 | etapa 5, ep 01 | 🔴 |
| `05` | **Chicxulub** | a cratera: como foi achada, o que ela tem dentro, e o que os testemunhos de perfuração mostraram | etapa 5, ep 06 | 🔴 |
| `06` | **O que é uma singularidade** | pedido dele em 18/09/2026, depois do 1.01: o que a palavra quer dizer na física, por que o Planck data o início da fase quente e para ali, e por que "instante zero" não é o que a teoria descreve. Candidato 102 da lista geral | etapa 1, ep 01 | 🔴 |

## Ouvir antes, das outras séries

A conferir quando as etapas virarem roteiro. *Do Ábaco à IA* tem extras de binário, hertz e eletroímã que não servem aqui; o candidato provável é algum de medida e de escala.

---

## Regras de produção

- Mesmo caminho das outras séries: `_pesquisa.md`, depois `_planta.md` (do `_molde-planta.md`), depois o trio (do `_molde-roteiro.txt`), verificador, áudio, `mapa-de-telas.py`, e só então a animação, nascida do `_molde-animacao.html`.
- Toda tela tem imagem, e toda imagem de cena é 16:9. Flow no modo Imagem.
- ⚠️ **Ilustração de assunto sem foto é ilustração, e se declara como tal.** Não existe foto do Big Bang nem do cambriano: o que der, é reconstituição marcada.
- ⚠️ **O Calendário Cósmico é recurso didático de Carl Sagan, não escala científica.** Dito em voz alta pelo menos uma vez na série, com o crédito, e o extra 01 conta a história.
- ⚠️ **Nada do calendário original se reaproveita.** Sagan calibrou em 15 bilhões de anos: na régua de hoje a Terra sai do 12 de setembro dele e vai pro 2 de setembro.
- **A lista do que não se pode dizer** mora no `_pesquisa-inicial.md`, seção Alertas, e o verificador roda contra ela.
- Pastas e páginas: `UNIVERSO/NN - Nome da etapa/NN - Nome do episódio/`. No site: `site/universo.html`, `site/etapas/universo-NN.html` e a entrada no `site/js/menu.js`.

---

## Decisões da série

- **D1.** (17/09/2026) **A tese é a luz.** Quase tudo que sabemos chegou aqui como luz, e a série ensina a ler o que ela traz.
- **D2.** (17/09/2026) **O objeto é a régua do ano cósmico**, que ganha marca por episódio. *Trocada no mesmo dia: a proposta anterior era a foto do céu da janela, que não sustenta uma série contada por período de tempo.*
- **D3.** (17/09/2026) **Fonte pública com fonte primária.**
- **D4.** (17/09/2026) **Nada a esconder, mas com régua.** O que está em disputa entra dito como disputa, e astrologia fica explicitamente separada de astronomia.
- **D5.** (17/09/2026) **Episódios por período, não por mês fixo**, e a contagem sai do conteúdo. *Trocada no mesmo dia: antes eram 6 etapas subindo por escala.*
- **D6.** (17/09/2026) **Formato igual ao das outras séries:** animação com telas que viram sozinhas, uma tela que se mexe por episódio, e o `00` por etapa e da série inteira.
- **D7.** (17/09/2026) **A série se chama Universo**, apoio "do quintal ao limite do que dá pra ver", posição 08 da home, nascendo desligada no painel.
- **D8.** (17/09/2026) **Número com data e fonte**, e disputa dita como disputa com os dois lados nomeados.
- **D9.** (17/09/2026) **O piloto conta o ano inteiro**, e é o episódio `00` da série.
- **D10.** (17/09/2026) **Tradução de escala só de marca coletiva.** Pedido dele: a era dos dinossauros sim, o surgimento da humanidade, a agricultura e a escrita sim; "a sua vida dura dois décimos de segundo" não.
- **D11.** (17/09/2026, **decisão minha por delegação dele**) **A régua é 13,797 bilhões de anos** (Planck 2018). Com ela a conta fecha redonda: 1 dia = 37.800.000 anos, 1 hora = 1.575.000, 1 minuto = 26.250, 1 segundo = 437,5. Nunca misturar com 13,8 arredondado.
- **D12.** (17/09/2026, **decisão minha por delegação dele**) **A série tem 6 etapas, cortadas onde o calendário aperta**, e 27 episódios numerados. Ele disse "eu não vou bater o olho": a divisão saiu das datas da pesquisa, não de gosto.
- **D13.** (17/09/2026, **decisão minha por delegação dele**) **Toda marca vem com o como se sabe.** É a costura entre a tese (luz) e o formato (tempo). Sem ela a série teria dois eixos e nenhum.
- **D14.** (17/09/2026, **decisão minha por delegação dele**) **Data disputada é faixa, não ponto.** Na régua, 160 milhões de anos são 4 dias e 5 horas: se a marca virar ponto, a disputa some e o ouvinte recebe como certo o que a ciência não fechou.

## Pendências

- ~~**P1.** **Qual régua a série adota.**~~ Resolvida em 17/09/2026 pela D11: 13,797 bilhões.
- ~~**P2.** **A divisão em etapas.**~~ Resolvida em 17/09/2026 pela D12: 6 etapas, 27 episódios.
- **P3.** **Capa da série.** 1200x670, Flow em modo Imagem, original e prompt em `UNIVERSO/_arquivos/capa-serie/`. *Gerada em 17/09/2026; fecha quando ele conferir.*
- **P4.** **Arte das 6 etapas.** *Geradas em 17/09/2026, uma cena por etapa, com os cuidados dos alertas da pesquisa escritos no `README.txt` da pasta `capa-etapas/prompt/`. A 03 foi regerada (na primeira a Lua saiu maior que a Terra no quadro). Fecha quando ele conferir.*
- ~~**P5.** **A costura entre a tese e o formato.**~~ Resolvida em 17/09/2026 pela D13.
- ~~**P6.** **Data disputada na régua.**~~ Resolvida em 17/09/2026 pela D14.
- **P7.** **O `_COMO-FAZER.md` desta série.** Enquanto não existe, vale o da Hardware.
- **P8.** **Os dois episódios sem pesquisa.** O 2.02 (de onde vieram os átomos) e o 4.01 (a célula que engoliu outra) não têm nada no `_pesquisa-inicial.md`. Pedem levantamento próprio antes de virar planta.
- **P10.** **A régua num lugar só.** Hoje o `regua.js` e o `regua.css` são cópias idênticas em cada pasta de episódio (o 1.01 ainda tem a versão antiga, sem lupa). Recomendação: mover pra uma pasta da série (`UNIVERSO/_regua/`) e cada `animacao.html` carregar de lá; é a regra do terceiro clone. Espera o OK dele; mexe só em caminho, não em comportamento.
- **P9.** **Qual extra das outras séries entra como "ouvir antes".** Os de binário, hertz e eletroímã não servem aqui.

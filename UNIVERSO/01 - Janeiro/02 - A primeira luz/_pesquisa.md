# Pesquisa: A primeira luz (1.02)

Levantada em 18/09/2026. Base: [`_pesquisa-inicial.md`](../../plano/serie/_pesquisa-inicial.md) da série (seções 1 e 2 e os Alertas), mais o que este episódio precisou abrir por conta própria (marcado **[novo]**). **Nada entra no roteiro sem estar aqui.**

## A data e a régua

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| O que o Planck mede | **[OBS]** O desvio para o vermelho do último espalhamento: **z\* = 1089,92 ± 0,25** (Planck 2018, TT,TE,EE+lowE+lensing) | https://arxiv.org/pdf/1807.06209v4 e a tabela oficial https://wiki.cosmos.esa.int/planck-legacy-archive/images/4/43/Baseline_params_table_2018_68pc_v2.pdf | sim |
| O que o z quer dizer | "With the expansion of the Universe, the wavelength of the light emitted (CMB) has increased. The ratio by which the wavelength has increased tells us about the factor by which the Universe has expanded" (ESA, sem data na página). Com z\* = 1089,92, o fator é 1 + z = **1090,92** | https://www.esa.int/Science_Exploration/Space_Science/Planck/Why_the_microwave | sim; o fator é conta |
| Os anos | **[OBS+MODELO]** "Recombination was complete about 380 000 after the Big Bang, when the Universe cooled to 3000K" (ESA, mesma página; a palavra "years" falta no original). A legenda da ESA para o mapa do Planck diz "when the universe was **370,000** years old". Nenhuma das duas traz incerteza: **os anos são tradução do z pelo modelo**, e nenhuma fonte primária publica incerteza nesse número (`_pesquisa-inicial.md`) | ESA "Why the microwave"; legenda de "Cosmic Microwave Background (CMB)", ESA and the Planck Collaboration, CC BY 4.0, https://commons.wikimedia.org/wiki/File:Cosmic_Microwave_Background_(CMB).jpeg | sim |
| No calendário | 380 mil anos depois do início = **1º de janeiro, 00:14** (e 370 mil também cai em 00:14). A régua de 13,797 bilhões: 1 minuto = 26.250 anos | `../../_arquivos/scripts/calendario-cosmico.py depois 380000` | cálculo |
| A mais velha que dá pra ver | NASA: o brilho que sobrou "is called the cosmic microwave background. It is the oldest light we can observe in the universe." | https://science.nasa.gov/universe/overview/ (12/08/2026) | sim |

## O que é essa luz **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Antes, opaco | "Slowly, as the universe expanded and cooled to below 10 000K, the ions began to recombine" e, com a recombinação completa, "light was able to travel freely" | ESA "Why the microwave" | sim |
| A temperatura naquela hora | **3000 K** (ESA). Conferência: 2,72548 × 1090,92 = **2973 K**, que arredonda pros três mil | ESA; conta com os números de Fixsen e do Planck | sim; conta |
| A temperatura hoje | **2,72548 ± 0,00057 K** (D. J. Fixsen, "The Temperature of the Cosmic Microwave Background", ApJ 707, 916, 2009). A ESA escreve "from its original 3000K to 2.7K as is observed today" | https://arxiv.org/abs/0911.1955 ; ESA | sim |
| Por que micro-ondas | O comprimento de onda esticou junto com o universo (ESA, acima). A lei de Wien: o pico de um corpo negro fica em b/T, com **b = 2,897 771 955 × 10⁻³ m·K** (CODATA, NIST). Com os números acima: o pico era de **0,00097 mm** (0,97 micrômetro) aos 2973 K e é de **1,06 mm** hoje. O comunicado do Nobel de 1978 diz "a maximum intensity of about 0.1 centimeters" | https://physics.nist.gov/cgi-bin/cuu/Value?bwien ; Nobel 1978 | sim; conta |
| A frase da NASA | "It is the oldest light we can observe in the universe" | NASA, acima | sim |

## A descoberta, 1964 e 1965 **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Quando | "In 1964, Bell Labs scientists Arno Penzias and Robert A. Wilson were conducting experiments with the Holmdel Horn Antenna" (o "A." é erro da página; o nome é Robert W. Wilson, como no Nobel) | Bell Labs (Nokia), "Confirming the Big Bang" | sim |
| Sinal fraco | "These radio waves were so weak, that it became critical to eliminate all possible interference in order to detect them" | Bell Labs (Nokia), "Confirming the Big Bang" | sim |
| A previsão esquecida | "It was because of these difficulties that the early predictions were forgotten: it was assumed that it would be impossible to detect such weak radiation in the cosmic noise". E: "A theory developed by the American physicist Gamow and his associates" | Nobel 1978 | sim |
| Onde | Bell Telephone Laboratories, Holmdel, Nova Jersey. A antena de corneta (horn) de Holmdel foi feita pra detectar ondas de rádio refletidas nos satélites-balão Echo e, depois, no Telstar | Bell Labs (Nokia), "Confirming the Big Bang", https://www.nokia.com/bell-labs/about/history/innovation-stories/confirming-big-bang/ ; Nobel 1978, comunicado de 17/10/1978 | sim |
| O que acharam | Um ruído que não sumia, "coming from all parts of the sky at all times of day and night" (Bell Labs). O Nobel: comprimento de onda de **7 centímetros**, intensidade alta demais, "its intensity was the same in all directions", e por testes cuidadosos mostraram que vinha de fora | Bell Labs; https://www.nobelprize.org/prizes/physics/1978/press-release/ | sim |
| Os pombos | "even removed some pigeons that were nesting in the antenna and their associate detritus. Still, the sound persisted" | Bell Labs | sim |
| Sem explicar a origem | Nobel: "These two researchers made no suggestions about the origin of this mysterious radiation" | Nobel 1978 | sim |
| A previsão | Nobel: especulações dos anos 1940, a partir da teoria de **Gamow e colegas** sobre a formação dos elementos. Bell Labs: **Robert Dicke, Jim Peebles e David Wilkinson**, em Princeton, ali perto, procuravam essa radiação, e o que Penzias e Wilson acharam batia com o que eles tinham previsto | Nobel 1978; Bell Labs | sim |
| O artigo | "A Measurement of Excess Antenna Temperature at 4080 Mc/s", The Astrophysical Journal 142, 419 a 421, julho de 1965, com o de Dicke, Peebles, Roll e Wilkinson no mesmo número. O excesso de "cerca de 3,5 K" | busca (scixplorer/ADS não abriram sem JavaScript) | **só trecho de buscador: o 3,5 K não entra no áudio** |
| O prêmio | Nobel de Física de 1978, metade dividida entre Penzias e Wilson, "for their discovery of cosmic microwave background radiation" (a outra metade foi pra Piotr Kapitsa, por física de baixas temperaturas) | Nobel 1978 | sim |
| Cuidado | O comunicado de 1978 fala em "15 billion years" e em "cosmic explosion": é o texto da época. **Não usar nenhuma das duas coisas** (alertas da série) | Nobel 1978 | sim |

## As fichas humanas **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Arno Penzias | Nasceu em **26/04/1933, em Munique**, Alemanha (Munique tem o mesmo nome hoje). Na época do prêmio, Bell Laboratories, Holmdel. Morreu em **22/01/2024**, em San Francisco. **Só o ano no áudio, sem causa.** Família e escola: não levantadas em fonte lida, **ficam fora** | https://www.nobelprize.org/prizes/physics/1978/penzias/facts/ | sim |
| Robert Woodrow Wilson | Nasceu em **10/01/1936, em Houston**, Texas. Na época do prêmio, Bell Laboratories, Holmdel. A página do Nobel não registra morte. Família e escola: **ficam fora**. Sem "hoje" nem "atualmente" | https://www.nobelprize.org/prizes/physics/1978/wilson/facts/ | sim |

## O satélite COBE e o Nobel de 2006 **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Lançamento | Satélite da NASA: "COBE was launched using its own rocket on 18 November 1989" | comunicado do Nobel de 03/10/2006, https://www.nobelprize.org/prizes/physics/2006/press-release/ | sim |
| O primeiro resultado | "The first results were received after nine minutes of observations: COBE had registered a perfect blackbody spectrum. When the curve was later shown at an astronomy conference the results received a standing ovation" | Nobel 2006 | sim |
| O corpo negro | "radiation in which the distribution across different wavelengths depends solely on its temperature. The shape of the spectrum of this kind of radiation has a special form known as blackbody radiation" | Nobel 2006 | sim |
| As manchas | Diferenças de temperatura "in the range of a hundred-thousandth of a degree", que mostram como a matéria começou a se juntar, necessárias pra existirem galáxias e estrelas | Nobel 2006 | sim |
| Quem | John Mather (NASA Goddard) coordenou o projeto e respondeu pelo experimento do corpo negro; George Smoot (Berkeley) "had main responsibility for measuring the small variations in the temperature". Mais de mil pessoas. Nobel de Física de 2006, "for their discovery of the blackbody form and anisotropy of the cosmic microwave background radiation" | Nobel 2006 | sim |
| Quando as manchas saíram | Publicadas em **1992** | Nobel 2006, informação popular, https://www.nobelprize.org/prizes/physics/2006/popular-information/ | sim |

## Onde aparece fora da tela **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| O chiado da TV | "It blankets the entire Universe and is even responsible for **a tiny fraction of static on analogue television sets**" (ESA, 18/03/2013). O "1%" que circula não foi achado em fonte primária: **dizer "uma pequena fração"** | https://www.esa.int/Science_Exploration/Space_Science/Coming_soon_Planck_unveils_the_cosmic_microwave_background | sim |

## O gancho pro 1.03 (da pesquisa inicial)

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Depois da luz, o escuro | **[MODELO]** NASA: "For the next 200 million years the universe remained dark". **No áudio, sem o número**: só que o universo fica escuro por um bom tempo (o 1.03 desce nisso) | `_pesquisa-inicial.md`, seção 2 | sim |
| As primeiras estrelas | **Nenhuma estrela de população III foi observada** | `_pesquisa-inicial.md`, seção 2 | sim |
| Quem eram | O comunicado do Nobel de 1978 chama Penzias e Wilson de "the two radio astronomers" | Nobel 1978 | sim |

## Filmes

Nenhum confirmado nesta rodada (ver `_filmes-e-documentarios.md`).

## Alertas que valem neste episódio (da pesquisa inicial e desta)

- NÃO dizer que o Planck mediu "380 mil anos": ele mediu z\* = 1089,92 ± 0,25. Os anos são tradução pelo modelo, sem incerteza publicada.
- NÃO dizer que o Big Bang foi uma explosão num ponto. O comunicado do Nobel de 1978 usa "cosmic explosion" e "15 billion years": é texto da época, e nada dele entra.
- NÃO dizer que a descoberta "provou" o Big Bang (a página da Bell Labs diz "proving"): o comunicado do Nobel de 1978 diz que era razoável suspeitar que fosse a radiação fóssil e que "other interpretations are possible". Dizer "apoio forte".
- NÃO dizer "1% do chiado da TV": a fonte primária diz "uma pequena fração".
- NÃO dar o 3,5 K do artigo de 1965 (só trecho de buscador).
- Sobre a morte do Penzias: o ano e só isso. Sobre o Wilson: sem "hoje" nem "atualmente".
- Tradução de escala só de marca coletiva (D10). Extra não é chamado pelo nome (DE3).

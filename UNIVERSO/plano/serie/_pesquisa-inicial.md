# Pesquisa inicial da série Universo

Levantada em **17/09/2026** por quatro agentes com busca na web, antes da planta de qualquer episódio. Cada episódio ainda faz o próprio `_pesquisa.md`; esta é a base do plano.

**Como ler:** a coluna Primária diz se a fonte foi aberta e lida de verdade. Onde está escrito "só trecho de buscador", a página não abriu e o fato **não** pode ir ao ar assim. Dentro dos fatos de cosmologia, **[OBS]** é medida observacional, **[MODELO]** é valor que só existe dentro do ΛCDM ou de simulação, e **[OBS+MODELO]** é medida traduzida por modelo.

---

## 1. A régua: idade do universo e a conversão

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Idade, valor de referência | **[OBS+MODELO]** 13,797 ± 0,023 bilhões de anos (TT,TE,EE+lowE+lensing) e 13,787 ± 0,020 (com BAO). Tabela 2 do Planck 2018 VI, lida no PDF (v4, agosto de 2021). A tabela oficial do Planck Legacy Archive é datada de 14/05/2019 | https://arxiv.org/pdf/1807.06209v4 | sim |
| Idade, como se mede | Ela **não é medida, é derivada**. A legenda da Tabela 1 diz que só seis parâmetros são amostrados e "the remaining parameters are derived from the first six". Ajusta-se o ΛCDM plano de 6 parâmetros ao fundo cósmico de micro-ondas, e idade, H0 e Ωm saem como consequência | https://arxiv.org/pdf/1807.06209v4 | sim |
| Idade, versão das agências | ESA e NASA arredondam para "13,8 bilhões" e não publicam a incerteza. A página da NASA foi atualizada em 12/08/2026 | https://science.nasa.gov/universe/overview/ | sim |
| Idade, números superados ainda no ar | A ESA tem página de 21/03/2013 com 13,82 bilhões, e a NASA tem página atualizada em 15/09/2021 com 13,7 bilhões (era WMAP). As duas contradizem o valor atual | https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_reveals_an_almost_perfect_Universe | sim, porém desatualizadas |
| Tensão de Hubble, lado CMB | H0 = 67,4 ± 0,5 km/s/Mpc (Planck 2018) | https://arxiv.org/abs/1807.06209 | sim |
| Tensão de Hubble, lado local | SH0ES (Riess et al., 2021/2022): H0 = 73,04 ± 1,04, com diferença de 5σ. Breuval et al. (11/04/2024, ApJ 973, 30): H0 = 73,17 ± 0,86, tensão de 5,8σ | https://arxiv.org/abs/2112.04510 e https://arxiv.org/abs/2404.08038 | sim |
| Tensão de Hubble, terceiro lado | Freedman et al. (Chicago-Carnegie, v3 de 17/03/2025): H0 = 70,39 ± 1,22 ± 1,33, e o abstract diz que o resultado é compatível com o ΛCDM padrão, "without the need for the inclusion of additional new physics" | https://arxiv.org/abs/2408.06153 | sim |
| O que a tensão muda na idade | "the age of the Universe at any redshift is inversely proportional to H0" (Vagnozzi, Pacucci e Loeb, JHEAp 36, 2022). Nenhum time publicou uma idade nova por causa da tensão | https://arxiv.org/abs/2105.10421 | sim |
| Idade sem depender do CMB | Aglomerados globulares (Valcin et al., JCAP, 10/08/2021): 13,5 (+0,16/-0,14) ± 0,23 bilhões de anos, e o próprio artigo diz que concorda bem com o valor do Planck | https://iopscience.iop.org/article/10.1088/1475-7516/2021/08/017 | sim |
| Origem do Calendário Cósmico | Carl Sagan, *The Dragons of Eden*, Random House, 1977, capítulo 1, e *Cosmos: A Personal Voyage*, episódio 1 ("The Shores of the Cosmic Ocean"), ao ar em 28/09/1980 | https://www.cse.iitk.ac.in/users/amit/books/sagan-1977-dragons-of-eden.html | **não** (só páginas de terceiros) |
| A régua que Sagan usou | **Quinze bilhões de anos.** Frase citada: "imagine the fifteen-billion-year lifetime of the universe (...) compressed into the span of a single year". As conversões dele batem com isso: 24 dias por bilhão de anos, 475 anos por segundo | https://teacherjimenez.blogspot.com/2008/10/dragons-of-eden-by-carl-sagan.html | **não** (só páginas de terceiros) |

### A conta da régua

Um ano de 365 dias tem 31.536.000 segundos. Com **13,797 bilhões de anos** (a proposta, P1 do plano), a cadeia fecha em números limpos:

| Unidade | Vale | Com 13,8 arredondado |
|---|---|---|
| 1 mês | 1,14975 bilhão de anos | 1,150 bilhão |
| 1 dia | **37.800.000 anos** | 37.808.219 |
| 1 hora | **1.575.000 anos** | 1.575.342 |
| 1 minuto | **26.250 anos** | 26.256 |
| 1 segundo | **437,5 anos** | 437,6 |

Fórmula, com **T** = anos antes do presente: `dias corridos desde 1º de janeiro = (13.797.000.000 - T) / 37.800.000`. A volta: `T = 13.797.000.000 × (1 - D / 365)`.

### A régua aplicada (aritmética minha sobre as datas com fonte abaixo)

| Marco | Anos atrás | No calendário |
|---|---|---|
| Big Bang | 13,797 bi | 1º de janeiro, 00:00 |
| Fundo cósmico de micro-ondas (380 mil anos depois) | - | 1º de janeiro, 00:14 |
| Primeiras estrelas (z ~ 30, modelo) | ~13,70 bi | 3 de janeiro |
| Galáxia mais distante já confirmada (MoM-z14) | ~13,52 bi | 8 de janeiro |
| Disco espesso da Via Láctea começa | ~13 bi | 22 de janeiro |
| Fusão com a Gaia-Enceladus | ~10 bi | 11 de abril |
| Sol (inclusões de meteorito) | 4,567 bi | 2 de setembro, 04h |
| Terra | 4,54 bi | 2 de setembro, 21h |
| Vida aceita sem disputa (Strelley Pool) | 3,43 bi | 2 de outubro |
| Grande Evento de Oxidação | ~2,33 bi | 31 de outubro |
| Eucarioto multicelular mais antigo aceito | 1,635 bi | 18 de novembro |
| Reprodução sexuada no registro fóssil | 1,047 bi | 4 de dezembro |
| Ediacara (Mistaken Point) | 574 Ma | 16 de dezembro |
| Base do Cambriano | 538,8 Ma | 17 de dezembro, 18h |
| Plantas em terra (evidência mais antiga) | 473 Ma | 19 de dezembro |
| Animal terrestre mais antigo datado (Kerrera) | 425 Ma | 20 de dezembro |
| Pegadas de tetrápode | ~390 Ma | 21 de dezembro |
| Fim do Permiano | 251,9 Ma | 25 de dezembro, 08h |
| Primeiros dinossauros | 231,4 Ma | 25 de dezembro, 21h |
| K-Pg | 66,0 Ma | 30 de dezembro, 06h |
| Separação humano-chimpanzé | 7 a 8 Ma | 31 de dezembro, ~19h30 |
| Gênero *Homo* | 2,8 Ma | 31 de dezembro, 22h14 |
| *Homo sapiens* (Jebel Irhoud) | 315 mil | 31 de dezembro, 23h48 |
| Base do Holoceno | 11.700 | 31 de dezembro, 23:59:32 |
| Escrita | ~5.300 | 31 de dezembro, 23:59:48 |

**Toda a história escrita ocupa cerca de 12 segundos. O *Homo sapiens* inteiro, cerca de 12 minutos. A era dos dinossauros, 4 dias e 9 horas.**

---

## 2. Do Big Bang à Via Láctea

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| O "instante zero" | **[MODELO]** A tabela do Planck define o parâmetro como "Time since the start of the hot big bang". A colaboração **não data uma singularidade**, data o início da fase quente | https://wiki.cosmos.esa.int/planck-legacy-archive/images/4/43/Baseline_params_table_2018_68pc_v2.pdf | sim |
| O que não se sabe | NASA, 12/08/2026: "Scientists aren't sure what came before inflation or what powered it" | https://science.nasa.gov/universe/overview/ | sim |
| Recombinação | **[OBS+MODELO]** O Planck publica o desvio para o vermelho do último espalhamento, z\* = 1089,92 ± 0,25. ⚠️ Conferido em 18/09/2026 na tabela oficial: o z\* está na lista de parâmetros derivados do ajuste, como a idade (a série tinha escrito [OBS] e "mede"). Os "380 mil anos" são a conversão disso para anos dentro do ΛCDM, e nenhuma fonte primária publica incerteza nesse número | tabela do Planck e https://www.esa.int/Science_Exploration/Space_Science/Planck/Why_the_microwave | sim |
| Idade das trevas | **[MODELO]** NASA: "For the next 200 million years the universe remained dark" | https://science.nasa.gov/universe/overview/ | sim |
| Primeiras estrelas | **[MODELO]** Glover e Klessen (revisão de 18/09/2025): a população III começa a se formar em z ~ 30. A NASA (16/07/2026) escreve que não se sabe exatamente quando elas acenderam. **Nenhuma estrela de população III foi observada** | https://arxiv.org/abs/2509.14799 e https://science.nasa.gov/mission/webb/early-universe/ | sim |
| Melhor candidato a população III | **[OBS+MODELO]** LAP1-B, em z = 6,6 (cerca de 830 milhões de anos depois do Big Bang), publicado em 27/10/2025: primeiro objeto compatível com três previsões teóricas, com ressalvas dos autores | https://iopscience.iop.org/article/10.3847/2041-8213/ae122f | sim |
| Galáxia mais distante | **[OBS]** **MoM-z14**, z = 14,44 ± 0,02, cerca de 280 milhões de anos depois do Big Bang. Naidu, Oesch, Brammer et al., The Open Journal of Astrophysics 9, revisado por pares em 30/01/2026 | https://astro.theoj.org/article/156033 | sim |
| Recorde anterior | **[OBS]** JADES-GS-z14-0, z = 14,32 (+0,08/-0,20), anunciada pela NASA em 30/05/2024. O recorde caiu duas vezes em dois anos | https://science.nasa.gov/blogs/webb/2024/05/30/nasas-james-webb-space-telescope-finds-most-distant-known-galaxy/ | sim |
| Via Láctea, disco espesso | **[OBS+MODELO]** Xiang e Rix, Nature 603, 599 (2022): "the formation of the Galactic old (thick) disk started 13 Gyr ago, only 0.8 Gyr after the Big Bang", sobre ~250 mil estrelas subgigantes. O abstract não publica barra de erro | https://arxiv.org/abs/2203.12110 | sim |
| Fusão com a Gaia-Enceladus | **[OBS+MODELO]** Helmi et al., Nature 563, 85 (2018): "cerca de 10 bilhões de anos", razão de massa 4:1. Belokurov et al. (2018): "entre 8 e 11 bilhões". ChronoGal (21/03/2025): "cerca de 11 bilhões". **Três números diferentes** | https://arxiv.org/abs/1806.06038 , https://arxiv.org/abs/1802.03414 , https://arxiv.org/abs/2503.17304 | sim |
| Fusão ainda anterior | **[OBS+MODELO]** Massari et al., Nature Astronomy (preprint revisado em 17/08/2026): a Low-energy-Kraken-Heracles, cerca de 1,8 bilhão de anos **antes** da Gaia-Enceladus | https://arxiv.org/abs/2601.18896 | sim |
| Colisão com Andrômeda | **[MODELO]** Sawala et al., Nature Astronomy, 02/06/2025: "a probability of close to 50% that there is no Milky Way - Andromeda merger during the next 10 billion years". O comunicado ESA/Hubble do mesmo dia dá **cerca de 2%** de chance de colisão frontal nos próximos 4 a 5 bilhões de anos, sobre 100.000 simulações e 22 variáveis. M33 aumenta a chance, a Grande Nuvem de Magalhães diminui | https://arxiv.org/abs/2408.00064 e https://esahubble.org/news/heic2508/ | sim |

---

## 3. O Sol, a Terra e a vida microscópica

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Sol e sistema solar | Inclusões refratárias (CAIs) de meteoritos, Pb-Pb corrigido por U: **4567,30 ± 0,16 Ma** (Connelly, Bizzarro, Krot et al., Science, 02/11/2012). **Ninguém datou o Sol**: datou-se grão de meteorito | https://researchprofiles.ku.dk/en/publications/8127b243-273f-4cc4-a1e4-2cb619d90468/export/ | sim |
| Terra | USGS: 4,54 bilhões de anos, "with an uncertainty of less than 1 percent", ou seja cerca de ± 50 milhões de anos | https://pubs.usgs.gov/gip/geotime/age.html | sim |
| Zircão mais antigo | Jack Hills, Austrália: 4404 ± 8 Ma, com δ18O compatível com interação com hidrosfera líquida (Wilde, Valley, Peck e Graham, Nature 409, 11/01/2001). **É grão mineral, não rocha** | https://doi.org/10.1038/35051550 | sim |
| Rocha mais antiga | Acasta, Canadá: 4031 ± 3 Ma (valor que a carta da ICS usa como base do Eoarqueano). Nuvvuagittuq, Quebec, é disputada: o próprio abstract de Sole e O'Neil (Science, 2025) diz que a idade "is debated, ranging from ≥3.75 to 4.3 billion years old" | https://doi.org/10.1126/science.ads8461 | sim |
| Lua | **Faixa publicada de 4,35 a 4,51 bilhões de anos.** Barboni et al. (2017) dão até 4,51; Maurice et al. (2020) dão 4,425 ± 0,025; Nimmo, Kleine e Morbidelli (Nature 636, 18/12/2024) abrem o abstract com a faixa inteira e propõem que o pico em 4,35 é refusão por maré, não formação | https://pmc.ncbi.nlm.nih.gov/articles/PMC11655352/ | sim |
| Vida, o caso aceito | Estromatólitos do Strelley Pool Chert, Pilbara, **3430 Ma** (Allwood et al., Nature 441, 2006). Com a Formação Dresser (3480 Ma), é a evidência multidisciplinar amplamente aceita | https://doi.org/10.1038/nature04764 | sim |
| Vida, o caso contestado | Isua, Groenlândia, 3700 Ma (Nutman et al., Nature, 22/09/2016) **contra** Allwood et al. (Nature 563, 17/10/2018), que analisaram as mesmas estruturas em 3D e concluíram que são deformação em metassedimento, não estromatólito. **A disputa não foi resolvida** | https://doi.org/10.1038/nature19355 e https://www.osti.gov/biblio/1491993 | sim |
| Microfósseis do Apex chert | Schopf (1993) descreve 11 táxons a 3465 Ma; Brasier et al. (Nature, 2002) reinterpretam como grafita amorfa em veio hidrotermal: "There is no support for primary biological morphology"; Schopf et al. (PNAS, 2018) respondem com δ13C por táxon. **Aberta** | https://doi.org/10.1038/416076a e https://doi.org/10.1073/pnas.1718063115 | sim |
| Microfósseis, caso mais sólido | Strelley Pool, 3,4 Ga: células com parede carbonácea nitrogenada, δ13C de -33 a -46, pirita com assinatura de metabolismo de enxofre (Wacey et al., Nature Geoscience 4, 2011). Um dos autores é Brasier, o mesmo que derrubou o Apex | https://ora.ox.ac.uk/objects/uuid:b43021b5-5325-4320-ae2f-806d2d2b3b43 | sim |
| Zircão de 4,1 bilhões | Bell et al., PNAS, 18/10/2015: grafita com δ13C de -24 ± 5 dentro de zircão de 4,10 ± 0,01 Ga, "consistent with a biogenic origin and **may be** evidence". Há o precedente de 2008 em que achado parecido virou contaminação de laboratório | https://www.osti.gov/pages/biblio/1313070 | sim |
| Grande Evento de Oxidação | **Três datas publicadas.** Luo et al. (Science Advances, 2016): "precisely constrain the GOE to 2.33 billion years ago". Gumsley et al. (PNAS, 21/02/2017): entre 2460 e 2426 Ma, com oscilações por até 200 Ma. Philippot et al. (Nature Communications, 08/06/2018): o sinal é assíncrono entre continentes e o paradigma precisa ser reavaliado | https://dspace.mit.edu/handle/1721.1/103006 , https://doi.org/10.1073/pnas.1608824114 , https://pmc.ncbi.nlm.nih.gov/articles/PMC5993798/ | sim |
| Fotossíntese oxigênica | Patry et al., Nature 642 (2025), geocronologia La-Ce em três plataformas de 2,87, 2,85 e 2,78 Ga: origem "in the Mesoarchaean or earlier", muito antes do acúmulo atmosférico | https://doi.org/10.1038/s41586-025-09009-8 | sim |
| Biomarcadores derrubados | French et al., PNAS 112(19), 2015: os hopanos e esteranes de 2,7 Ga eram contaminação. "existing lipid biomarker evidence cannot be invoked to support the emergence of oxygenic photosynthesis and eukaryotes by ~2.7 billion years ago" | https://pmc.ncbi.nlm.nih.gov/articles/PMC4434754/ | sim |
| Multicelular mais antigo aceito | *Qingshania magnifica*, 1634,8 ± 6,9 Ma (Miao et al., Science Advances, 24/01/2024). Os autores ressalvam que a afinidade filogenética "remains uncertain" | https://pmc.ncbi.nlm.nih.gov/articles/PMC10807817/ | sim |
| Multicelular, o caso disputado | Gabão, Formação Francevillian B, 2,1 Ga, estruturas de até 12 cm (El Albani et al., Nature 466, 2010; datação U-Pb 2083 ± 6 Ma em 2014). **A própria condição de fóssil é questionada** | https://doi.org/10.1038/nature09166 | sim |
| Reprodução sexuada | *Bangiomorpha pubescens*, alga vermelha com esporos e gametas diferenciados. A idade tradicional de 1,2 Ga foi **corrigida por Re-Os para 1,047 (+0,013/-0,017) Ga** (Gibson et al., Geology 46, fev/2018) | https://web.gps.caltech.edu/~wfischer/pubs/Gibsonetal2018.pdf | sim |
| Ediacara | Base do período em ~635 Ma. Os macrofósseis complexos mais antigos datados: Mistaken Point, 574,17 ± 0,66 Ma (Matthews et al., GSA Bulletin, 2021). Droser e Gehling (PNAS, 2015): são fósseis de corpo mole "typically difficult to reconcile with modern phyla". Só *Dickinsonia* e parentes têm confirmação química de animal, por colesteroides (Bobrovskiy et al., Science, 21/09/2018) | https://nora.nerc.ac.uk/id/eprint/530000/ e https://doi.org/10.1126/science.aat7228 | sim |

---

## 4. Do cambriano a nós

**Carta usada: IUGS/ICS v2026/06** (junho de 2026), baixada e lida em PDF. Citação oficial: Cohen, Harper, Gibbard e Car (2025, updated), *Episodes* 48: 105-115.

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Bases dos períodos | Cambriano 538,8 ± 0,6 Ma · Ordoviciano 486,85 ± 1,5 · Siluriano 443,1 ± 0,9 · Devoniano 419,62 ± 1,36 · Carbonífero 358,86 ± 0,19 · Permiano 298,9 ± 0,15 · Triássico 251,902 ± 0,024 · Jurássico 201,4 ± 0,2 · Cretáceo 143,1 ± 0,6 · Paleogeno 66,00 · Quaternário 2,58 · Holoceno 0,0117 | https://stratigraphy.org/ICSchart/ChronostratChart2026-06.pdf | sim |
| O que "explosão" quer dizer | Daley et al. (PNAS, 21/05/2018): os primeiros traços de euartrópodes aparecem por volta de **537 Ma**, as trilobitas a 521 Ma, e os Lagerstätten a partir de 518 Ma. Biotas ediacaranas terminais (Miaohe, 550 Ma) são cheias de algas e **não têm animal nenhum** | https://www.pnas.org/doi/full/10.1073/pnas.1719962115 | sim |
| Duração | Paterson, Edgecombe e Lee (PNAS, 19/02/2019): a biosfera marinha de tipo moderno emergiu em **cerca de 20 milhões de anos**, e quando o registro típico começa (521 Ma) a explosão **já tinha em grande parte terminado** | https://www.pnas.org/doi/pdf/10.1073/pnas.1819366116 | sim |
| O outro lado | Erwin et al. (Science, 01/11/2011): os grandes clados divergiram dezenas de milhões de anos **antes** do primeiro fóssil. É a posição do relógio molecular, contestada pelas duas acima | https://doi.org/10.1126/science.1206375 | sim |
| Primeiros vertebrados | *Myllokunmingia* e *Haikouichthys*, ágnatos (sem mandíbula), biota de Chengjiang, **cerca de 518 Ma**. O artigo original (Shu et al., Nature 402, 1999) não abriu; a idade vem da página da IUGS Geoheritage | https://iugs-geoheritage.org/geoheritage_sites/cambrian-chengjiang-fossil-site-chengjiang-lagerstatte/ | sim (para os 518 Ma) |
| Primeiros peixes com mandíbula | Fósseis completos mais antigos: Siluriano inferior da China, **cerca de 436 Ma** (Zhu et al., Nature, 28/09/2022). Os moleculares põem a origem no Ordoviciano Superior, cerca de 450 Ma | https://doi.org/10.1038/s41586-022-05136-8 | sim |
| Plantas em terra | Criptósporos do Ordoviciano Médio inicial, **473 a 471 Ma**, na Argentina (Rubinstein et al., New Phytologist, 20/08/2010). O relógio molecular (Morris et al., PNAS, 20/02/2018) recupera origem **cambriana** com a maior probabilidade | https://doi.org/10.1111/j.1469-8137.2010.03433.x e https://doi.org/10.1073/pnas.1719588115 | sim |
| Animais em terra | Datação U/Pb dos sítios (Brookfield et al., Historical Biology, maio/2020): Kerrera **425 Ma** (miriápode mais antigo), Ludlow 420 Ma, Cowie **414 Ma** (*Pneumodesmus*), Rhynie 407 Ma. Florestas em 385 Ma. O relógio molecular dá 500 Ma, 75 milhões antes do fóssil | https://doi.org/10.1080/08912963.2020.1762593 | sim |
| Tetrápodes | Pegadas do Devoniano Médio inicial na Polônia (Niedźwiedzki et al., Nature, 01/2010), **18 milhões de anos antes** dos fósseis corporais. *Tiktaalik* (Daeschler et al., Nature, 04/2006) é do Devoniano Superior | https://doi.org/10.1038/nature08623 | sim |
| Fim do Permiano, duração | Burgess, Bowring e Shen (PNAS, 10/02/2014): a extinção durou **60 ± 48 mil anos**, entre 251,941 e 251,880 Ma | https://doi.org/10.1073/pnas.1317692111 | sim |
| Fim do Permiano, causa | Trapps Siberianos: dois terços do volume saíram em ~300 mil anos, antes e durante a extinção (Burgess e Bowring, Science Advances, 28/08/2015) | https://doi.org/10.1126/sciadv.1500470 | sim |
| Fim do Permiano, magnitude | **Disputa.** Mais de 90% das espécies marinhas (Burgess e Bowring, 2015) **contra cerca de 81%** (Stanley, PNAS, 03/10/2016), que diz que os números altos misturavam as extinções do Permiano Médio e Superior: "a vida não quase desapareceu no fim do Permiano" | https://doi.org/10.1073/pnas.1613094113 | sim |
| K-Pg, sincronia | Renne et al. (Science, 01/02/2013): impacto e extinção sincrônicos **dentro de 32 mil anos**; a perturbação do ciclo do carbono durou **menos de 5 mil anos**. Impacto em 66.038.000 anos, precisão de 11 mil anos (release da UC Berkeley, 07/02/2013) | https://doi.org/10.1126/science.1230492 e https://news.berkeley.edu/2013/02/07/ | sim |
| K-Pg, causa | Schulte et al. (41 autores, Science, 03/2010): um único depósito de ejecta ligado a Chicxulub, global, no limite. **76% das espécies** extintas (Lyons et al., PNAS, 28/09/2020) | https://doi.org/10.1126/science.1177265 e https://doi.org/10.1073/pnas.2004596117 | sim |
| K-Pg, o que se discute | **Disputa publicada no mesmo número da Science, fev/2019.** Schoene et al.: quatro pulsos do Deccan, um deles começando dezenas de milhares de anos **antes** do impacto. Sprain et al.: não há três pulsos discretos, e **75% do volume saiu depois** do limite. Hull et al. (Science, 01/2020) arbitram a favor do impacto como o único coincidente com a extinção | https://doi.org/10.1126/science.aau2422 , https://doi.org/10.1126/science.aav1446 , https://doi.org/10.1126/science.aay5055 | sim |
| Fim do Ordoviciano | Glaciação com volume de gelo igual ou maior que o do último máximo do Pleistoceno, resfriamento de ~5 °C no Hirnantiano (Finnegan et al., Science, 27/01/2011) | https://doi.org/10.1126/science.1200803 | sim |
| Devoniano Superior | **Causa em aberto**, com três linhas concorrentes: euxinia (Sahoo et al., Nature, 08/03/2023), incêndios como consequência e não gatilho (Lu et al., Science Advances, 04/2026), plantas mais vulcanismo (preprint) | https://doi.org/10.1038/s41586-023-05716-2 | sim |
| As "Cinco Grandes" | Raup e Sepkoski (Science, 03/1982), o artigo que criou a expressão, já dizia que a do Devoniano **não era estatisticamente significativa** nos dados deles | https://doi.org/10.1126/science.215.4539.1501 | sim |
| Primeiros dinossauros | Carniano: Ischigualasto, Argentina, cinzas datadas em **231,4 Ma** (Alcober e Martinez, ZooKeys, 19/10/2010; o artigo não declara incerteza). Zimbábue, cerca de 235 Ma (Griffin et al., Nature, 31/08/2022) | https://pmc.ncbi.nlm.nih.gov/articles/PMC3088398 | sim |
| Dinossauro mais antigo? | *Nyasasaurus parringtoni* (Nesbitt et al., Biology Letters, 05/12/2012) é "**ou** o membro mais antigo de Dinosauria, **ou** o táxon-irmão". A interrogação está no título do artigo | https://doi.org/10.1098/rsbl.2012.0949 | sim |
| Ritmo da origem | Marsicano et al. (PNAS, 07/12/2015): a origem cabe num intervalo de **menos de 5 milhões de anos**, e o domínio dos ecossistemas só veio milhões de anos depois, perto do limite Triássico-Jurássico | https://doi.org/10.1073/pnas.1512541112 | sim |
| Duração dos dinossauros | **Cerca de 165 milhões de anos** (231,4 Ma a 66,0 Ma). Subtração feita a partir das datas com fonte, não número citado por uma fonte única | derivado | cálculo |
| Aves | Xu et al. (Science, 12/2014): as aves descendem de terópodes maniraptores, e penas, endotermia e o sistema pulmonar surgiram **dentro** dos dinossauros mesozoicos, de forma gradual e em mosaico | https://doi.org/10.1126/science.1253293 | sim |
| Por que as aves passaram | Field et al. (Current Biology, 24/05/2018): o filtro foi **ecológico, não aéreo**. As arborícolas (enantiornitinos) morreram com as florestas; sobreviveram as de hábito não arborícola | https://doi.org/10.1016/j.cub.2018.04.062 | sim |
| Primeiros mamíferos | *Brasilodon*, com substituição dentária difiodonte, **225,42 ± 0,37 Ma**, contemporâneo dos dinossauros mais antigos (Cabreira et al., Journal of Anatomy, 05/09/2022). **Disputa formal**: comentário crítico de Abdala et al. na mesma revista (30/01/2023), e o Natural History Museum registra que há quem o chame de "réptil mamaliforme" | https://doi.org/10.1111/joa.13756 e https://doi.org/10.1111/joa.13803 | sim |
| Primeiros primatas | *Purgatorius* aparece **105 a 139 mil anos depois** do K-Pg (Wilson Mantilla et al., Royal Society Open Science, 24/02/2021), mas os autores concluem que a linhagem se originou no Cretáceo Superior. O relógio molecular põe o ancestral comum dos primatas viventes entre **71 e 63 Ma** | https://doi.org/10.1098/rsos.210050 e https://doi.org/10.1371/journal.pone.0049521 | sim |
| Humano e chimpanzé | Langergraber et al. (PNAS, 13/08/2012): separação em **pelo menos 7 a 8 milhões de anos**. O Smithsonian diz 6 a 7 milhões, e lista como pergunta **em aberto** se *Sahelanthropus* é o ancestral comum | https://doi.org/10.1073/pnas.1211740109 e https://humanorigins.si.edu/evidence/human-fossils/species/sahelanthropus-tchadensis | sim |
| Gênero *Homo* | Mandíbula de Ledi-Geraru, Etiópia: **2,80 a 2,75 Ma** (Villmoare et al., Science, 04/03/2015) | https://doi.org/10.1126/science.aaa1343 | sim |
| *Homo sapiens* | Jebel Irhoud, Marrocos: **315 ± 34 mil anos** por termoluminescência (Richter et al., Nature, 06/2017), quase o dobro da estimativa anterior. Omo I foi redatado para **idade mínima de 233 ± 22 mil anos** (Vidal et al., Nature, 12/01/2022), e a mesma redatação derruba a âncora de 160 a 155 mil anos para Herto | https://doi.org/10.1038/nature22335 e https://doi.org/10.1038/s41586-021-04275-8 | sim |
| Última era do gelo | Mantos nas posições máximas de 26,5 a 19-20 ka (Clark et al., Science, 08/2009). Younger Dryas: início em 12.870 ± 30 BP, término entre 11.700 ± 40 e 11.610 ± 40 BP no Atlântico Norte, e **antes na Antártida** (Cheng et al., PNAS, 08/09/2020). Base do Holoceno definida no testemunho NGRIP2, Groenlândia, por uma mudança de excesso de deutério **ao longo de cerca de 3 anos** | https://doi.org/10.1126/science.1172873 , https://doi.org/10.1073/pnas.2007869117 , https://stratigraphy.org/gssps/holocene | sim |
| Agricultura | Passos iniciais no **12º milênio cal BP**, e manejo e cultivo aparecem **pelo menos 1.000 anos antes** das mudanças morfológicas usadas para datar domesticação; espécies diferentes domesticadas em partes diferentes do Crescente Fértil (Zeder, PNAS, 12/08/2008) | https://doi.org/10.1073/pnas.0801317105 | sim |
| Pão antes da agricultura | Shubayqa 1, Jordânia: pão **14.400 anos atrás**, pelo menos 4.000 anos antes da agricultura (Arranz-Otaegui et al., PNAS, 16/07/2018) | https://doi.org/10.1073/pnas.1801071115 | sim |
| Escrita | ISAC/Universidade de Chicago: cuneiforme mesopotâmico **cerca de 3200 a.C.**, escrita egípcia cerca de 3320 a.C., ossos oraculares chineses cerca de 1200 a.C., maia no século VII d.C. A tese da exposição é de **quatro invenções independentes** | https://news.uchicago.edu/story/origins-writing-make-engaging-new-exhibition-oriental-institute-museum | sim |

---

## Não confirmado

Nada abaixo entra no áudio.

**Da régua.** O texto original de *The Dragons of Eden* (a frase dos 15 bilhões veio de duas páginas de terceiros, não do livro). A transcrição oficial do episódio 1 do *Cosmos*. As datas do calendário original do Sagan (o "14 de setembro" e o "24 de dezembro" que circulam). Um número de agência com a incerteza cheia: NASA e ESA só arredondam. Um σ oficial da tensão de Hubble: cada time publica o seu (3,6σ, 5σ, 5,8σ).

**Da cosmologia.** A data de formação do Grupo Local: não existe fonte primária com essa data. A idade em anos da recombinação medida pelo Planck (ele publica z\*, não anos). O redshift refinado de JADES-GS-z14-0 (z = 14,1796), que só apareceu na Wikipédia. Galáxia confirmada em z = 15 ou 16: não existe até 17/09/2026. EDGES (2018) e SARAS 3 (2022), os dois sobre o sinal de 21 cm: só trecho de buscador, porque a Nature exigiu login.

**Da Terra e da vida.** A redatação da Negaunee para ~1,87 Ga. Bowring e Williams (1999), as três idades do Acasta. Lepland et al. (2005), a revisão de Akilia. Butterfield (2000), a alegação sobre reprodução sexuada em *Bangiomorpha* (a **data** está confirmada por Gibson 2018; a alegação, não). Crowe (2013) e Anbar (2007), sobre oxigênio antes do GOE. Uma data absoluta para "o primeiro ser multicelular": não existe número fechado.

**Do cambriano a nós.** A idade numérica do K-Pg em Renne 2013 (66,043 ± 0,043 Ma): só trecho de buscador, mas os 66.038.000 anos do impacto estão confirmados por release institucional. Langer, Ramezani e Da Rosa (2018), os 233,23 ± 0,73 Ma do Rio Grande do Sul: **se a série quiser dizer que o Brasil empata com Ischigualasto, precisa abrir esse artigo antes**. *Huayracursor jaguensis* (Nature, 15/10/2025). Shu et al. (1999), o artigo dos primeiros vertebrados. A datação de Chengjiang com incerteza (518,03 ± 0,69 Ma). O erro de contagem da base do Holoceno: a página do GSSP diz 69 anos e o abstract de Walker 2009 diz 99. *Morganucodon* com ~205 Ma e a formulação das duas definições de "mamífero". A frase de John Hawks criticando a atribuição de Jebel Irhoud (o **debate** está confirmado por outras vias). Traços de artrópodes subaéreos de 500 a 480 Ma. A idade do Burgess Shale. A magnitude percentual das extinções do Ordoviciano, do Devoniano e do Triássico. A data exata da invenção da escrita: **usar a faixa 3400 a 3200 a.C. e dizer que é faixa**.

---

## Alertas: o que a série não pode dizer

**A régua e o calendário**

- NÃO dizer que a idade do universo foi medida direto. Ela é **derivada** de um ajuste do ΛCDM de seis parâmetros ao fundo cósmico de micro-ondas.
- NÃO dizer que a idade sai de 1 dividido por H0: isso daria 14,52 bilhões de anos.
- NÃO dizer 13,82 (Planck 2013) nem 13,7 (era WMAP). As duas páginas ainda estão no ar, na ESA e na NASA.
- NÃO dizer que Sagan usou 13,8 bilhões. Ele usou **quinze bilhões**, e por isso nenhuma data do calendário original serve: a Terra sai do 12 de setembro dele e vai pro 2 de setembro.
- NÃO apresentar o Calendário Cósmico como escala científica. É recurso didático de Sagan, e isso precisa ser dito em voz alta pelo menos uma vez na série, com o crédito.
- NÃO converter data disputada num ponto do calendário. **160 milhões de anos são 4 dias e 5 horas na régua**: parece detalhe e é exatamente onde os pesquisadores brigam.
- NÃO dizer que "toda a história humana cabe no último segundo". Um segundo vale 437,5 anos; a história escrita ocupa **cerca de 12 segundos** e o *Homo sapiens* inteiro, cerca de 12 minutos.

**Cosmologia**

- NÃO dizer que a ciência sabe o que houve no instante zero. O Planck data o início do big bang **quente**, e a NASA escreve que não se sabe o que veio antes da inflação.
- NÃO dizer que o Big Bang foi uma explosão num ponto do espaço.
- NÃO dizer que o Planck mediu "380 mil anos". Ele publica z\* = 1089,92 ± 0,25, também derivado do ajuste (18/09/2026: dizer "publica", não "mediu"), e os anos são mais uma conversão por cima dele.
- NÃO dizer que o James Webb viu as primeiras estrelas: nenhuma estrela de população III foi observada.
- NÃO dizer que a galáxia mais distante é a JADES-GS-z14-0: desde junho de 2025 é a MoM-z14 (a NASA diz junho, na página do Webb atualizada em 16/07/2026; o artigo apareceu em maio). E NÃO dizer que esse recorde é definitivo, porque caiu duas vezes em dois anos.
- NÃO dar uma data única para a fusão com a Gaia-Enceladus: há 10, há 8 a 11 e há 11 bilhões, em três artigos diferentes. E NÃO dizer que foi a primeira fusão grande: há evidência de uma 1,8 bilhão de anos anterior.
- NÃO dizer que a Via Láctea vai colidir com Andrômeda em 4,5 bilhões de anos. Desde 02/06/2025 são **50 e 50 em 10 bilhões de anos**, com cerca de 2% de chance de colisão frontal em 4 a 5 bilhões. E NÃO dizer que "está provado que não vai colidir": 50 e 50 não é negativa.

**Terra e vida**

- NÃO dizer "o Sol tem 4,6 bilhões de anos" como medida do Sol: datou-se grão de meteorito. E NÃO usar 4,567 e 4,54 como se fossem o mesmo número: a diferença entre eles é o tempo de formação da Terra.
- NÃO chamar o zircão de Jack Hills de "a rocha mais antiga": é grão mineral dentro de rocha muito mais nova.
- NÃO dar uma idade fechada para a Lua: a faixa publicada vai de 4,35 a 4,51 bilhões.
- NÃO dizer que os estromatólitos de Isua (3,7 bilhões) são a vida mais antiga conhecida: em 2018 a mesma Nature publicou que são estruturas de deformação.
- NÃO dizer que os microfósseis do Apex chert são cianobactérias, nem que o zircão de 4,1 bilhões prova vida no Hadeano ("**may be** evidence", diz o artigo).
- NÃO apresentar uma data única para a origem da vida: há um piso aceito (3430 e 3480 Ma) e vários candidatos mais antigos em disputa.
- NÃO usar "os cientistas descobriram" em nenhum caso contestado: há cientistas dos dois lados, com nome e artigo.
- NÃO dar uma data única para o Grande Evento de Oxidação, nem dizer que a subida do oxigênio foi um degrau único.
- NÃO dizer que havia eucariotos há 2,7 bilhões de anos por biomarcadores: era contaminação.
- NÃO dizer que *Bangiomorpha* tem 1,2 bilhão de anos (corrigido para 1,047), nem que é "o primeiro ser que fez sexo": é o registro fóssil mais antigo que mostra a diferenciação.
- NÃO dizer que a biota de Ediacara "são os primeiros animais": só *Dickinsonia* e parentes têm confirmação química.

**Do cambriano a nós**

- NÃO dizer que o Cambriano começou há 541 milhões de anos: a carta vigente diz **538,8 ± 0,6**. E NÃO citar idade geológica sem a incerteza quando a carta dá.
- NÃO dizer que a explosão cambriana foi instantânea: foram cerca de 20 milhões de anos, e ela já tinha terminado quando o registro típico começa.
- NÃO chamar *Haikouichthys* de "o primeiro peixe" sem dizer que era **sem mandíbula**.
- NÃO dizer que as plantas saíram da água no Siluriano: a evidência mais antiga é do Ordoviciano Médio.
- NÃO dizer que *Pneumodesmus* tem 428 milhões de anos: a datação de 2020 dá 414, e o animal terrestre mais antigo datado é o de Kerrera, 425 Ma.
- NÃO dizer "96% das espécies morreram no fim do Permiano" como número fechado: Stanley 2016 estima cerca de 81%. E NÃO dizer que a extinção durou milhões de anos: foram 60 ± 48 mil.
- NÃO dizer que o asteroide foi a causa única e indiscutível do K-Pg, nem que o Deccan não teve nada a ver, nem que o Deccan saiu em três pulsos discretos. Os dois lados publicaram no mesmo número da Science em 2019.
- NÃO dizer que o K-Pg matou tudo num dia: a perturbação do carbono durou menos de 5 mil anos.
- NÃO dizer que "as Cinco Grandes" é um fato estatístico limpo: o artigo que criou a expressão já ressalvava a do Devoniano.
- NÃO dizer que os dinossauros foram extintos: os **não-avianos** foram, e as aves são dinossauros vivos.
- NÃO dizer que *Nyasasaurus* é o dinossauro mais antigo (o título do artigo tem interrogação), nem que os dinossauros dominaram assim que surgiram.
- NÃO dizer que as aves sobreviveram ao K-Pg "porque voavam": o filtro foi ecológico, e as arborícolas morreram com as florestas.
- NÃO dizer que os mamíferos surgiram depois dos dinossauros: *Brasilodon* é contemporâneo dos mais antigos. E NÃO apresentá-lo como "o primeiro mamífero" sem a disputa publicada.
- NÃO dizer que descendemos dos chimpanzés, nem dar 6 milhões como data fechada da separação, nem dizer que *Sahelanthropus* é o ancestral comum.
- NÃO dizer que *Homo sapiens* tem 200 mil anos (consenso até 2017), nem usar 195 mil para Omo I (redatado para 233 ± 22 mil) ou 160 a 155 mil para Herto (a âncora caiu).
- NÃO dizer que "a era do gelo acabou": estamos num interglacial do Quaternário. O que acabou há 11.700 anos foi o Younger Dryas, e ele não terminou numa data única global.
- NÃO dizer que a agricultura foi inventada num lugar só e numa data só, nem que antes dela não havia pão.
- NÃO dizer que a escrita foi inventada uma vez só: são quatro invenções independentes.
- NÃO tratar phys.org, Live Science, Space.com, Scientific American, Sci.News ou Wikipédia como fonte.

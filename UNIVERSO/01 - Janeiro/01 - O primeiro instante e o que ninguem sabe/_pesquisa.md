# Pesquisa: O primeiro instante e o que ninguém sabe (1.01)

Levantada em 17/09/2026. Base: [`_pesquisa-inicial.md`](../../plano/serie/_pesquisa-inicial.md) da série (seções 1 e 2 e os Alertas), mais o que este episódio precisou abrir por conta própria (marcado **[novo]**). **Nada entra no roteiro sem estar aqui.**

## A data e a régua

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| A idade, valor | **[OBS+MODELO]** 13,797 ± 0,023 bilhões de anos (Planck 2018 VI, Tabela 2, TT,TE,EE+lowE+lensing) | https://arxiv.org/pdf/1807.06209v4 | sim |
| A idade, o que ela é | **Derivada, não medida.** Seis parâmetros são ajustados ao fundo cósmico de micro-ondas e "the remaining parameters are derived from the first six" (legenda da Tabela 1). A idade é um deles | https://arxiv.org/pdf/1807.06209v4 | sim |
| O que o Planck data | O parâmetro da tabela oficial se chama "Time since the start of the hot big bang". A colaboração **não data uma singularidade**: data o início da fase quente | https://wiki.cosmos.esa.int/planck-legacy-archive/images/4/43/Baseline_params_table_2018_68pc_v2.pdf | sim |
| As agências | NASA e ESA arredondam pra "13,8 bilhões" e não publicam a incerteza. Páginas antigas ainda no ar dizem 13,82 (ESA, 2013) e 13,7 (NASA/WMAP, 2021) | https://science.nasa.gov/universe/overview/ (12/08/2026) | sim |
| Outro jeito, sem o fundo cósmico | Aglomerados globulares: 13,5 (+0,16/-0,14) ± 0,23 bilhões (Valcin et al., JCAP, 10/08/2021); o artigo diz que concorda bem com o Planck | https://iopscience.iop.org/article/10.1088/1475-7516/2021/08/017 | sim |
| A expansão hoje, dois números | Planck: H0 = 67,4 ± 0,5 km/s/Mpc. Medido perto, por estrelas: 73,04 ± 1,04 (SH0ES, 2022) e 73,17 ± 0,86 (Breuval et al., 2024). Um terceiro time (Freedman et al., 2025) dá 70,39. **É assunto de extra**: no áudio, só que existe outro jeito de medir que dá número diferente, sem número | ver `_pesquisa-inicial.md`, seção 1 | sim |
| A luz mais velha, no calendário | 380 mil anos depois do início = **1º de janeiro, 00:14** (tradução do z* pelo modelo; o 1.02 desce nisso) | `_pesquisa-inicial.md`, "A régua aplicada"; `calendario-cosmico.py depois 380000` | cálculo |
| O Calendário Cósmico | Recurso didático de Carl Sagan: *The Dragons of Eden* (1977) e *Cosmos*, episódio 1 (1980). Ele calibrou em **quinze bilhões**. ⚠️ Fonte primária não aberta (só páginas de terceiros): o áudio dá o crédito, que o alerta manda dar, e não cita data do calendário dele | `_pesquisa-inicial.md`, seção 1 | não |
| A régua (D11) | 1 dia = 37.800.000 anos · 1 hora = 1.575.000 · 1 minuto = 26.250 · 1 segundo = 437,5. Conta no `../../_arquivos/scripts/calendario-cosmico.py` | `_pesquisa-inicial.md`, "A conta da régua" | cálculo |

## Não foi uma explosão num ponto **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| O nome | John Mather (Nobel de Física de 2006 pela medida da radiação do Big Bang, cientista sênior do projeto do telescópio Webb): "The Big Bang is a really misleading name for the expanding universe that we see." | https://science.nasa.gov/mission/webb/big-bang-q-and-a/ (atualizada em 20/02/2026) | sim |
| Em todo lugar | Mather: "The Big Bang happened everywhere at once and was a process happening in time, not a point in time." E: "The universe doesn't have a center." | mesma página | sim |
| Como se sabe | Mather: "We know this because 1) we see galaxies rushing away from each other, not from a central point and 2) we see the heat that was left over from early times, and that heat uniformly fills the universe." | mesma página | sim |
| Não foi explosão | Página do WMAP (FAQ): "The Big Bang was not an explosion" no sentido comum, sem detritos voando pra um espaço em volta; o espaço em si se estica e leva a matéria junto | https://map.gsfc.nasa.gov/site/faq.html | só trecho de buscador: **usar a frase do Mather, que foi lida** |

## A inflação e o que ninguém sabe

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Inflação | NASA: "Around 13.8 billion years ago, the universe expanded faster than the speed of light for a fraction of a second, a period called cosmic inflation." | https://science.nasa.gov/universe/overview/ (12/08/2026) | sim |
| O que veio antes | NASA: "Scientists aren't sure what came before inflation or what powered it." | mesma página | sim |
| O que a NASA chama de big bang | NASA: "When cosmic inflation stopped, the energy driving it transferred to matter and light – the big bang." | mesma página | sim |
| A luz mais velha | NASA: aos "380,000 years after the big bang" o universo esfriou o bastante pra núcleos capturarem elétrons (recombinação); o brilho que sobrou "is called the cosmic microwave background. It is the oldest light we can observe in the universe." ⚠️ Os 380 mil anos são tradução pelo modelo: o Planck publica z* = 1089,92 ± 0,25, também derivado do ajuste (P11 do plano). **Este episódio só aponta; o 1.02 desce nisso** | mesma página; tabela do Planck | sim |

## O satélite Planck (ficha do equipamento) **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Lançamento | "Planck was launched from the Centre Spatial Guyanais in Kourou (French Guyana) on 14 May 2009 at its nominal lift-off time of 13:12 UT, on an Ariane 5 ECA rocket" (junto com o Herschel) | https://wiki.cosmos.esa.int/planckpla/index.php/The_Planck_mission | sim |
| Fim | "The final command to the Planck satellite was sent on 23 October 2013, marking the end of operations." O instrumento de alta frequência acabou o combustível de resfriamento em 14/01/2012; o de baixa frequência seguiu até 03/10/2013 | mesma página | sim |
| Onde e o quê | No ponto L2, a cerca de 1,5 milhão de km da Terra; mediu o fundo cósmico de micro-ondas (2,7 K) e as pequenas variações dele, em várias faixas de frequência | mesma página | sim |

## Georges Lemaître (ficha humana) **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| Nascimento | Charleroi, Bélgica, 17 de julho de 1894 (Charleroi continua com o mesmo nome) | https://uclouvain.be/en/research-institutes/irmp/georges-lemaitre | sim |
| Formação | Tese em 1920 (aproximação de funções, com Charles de la Vallée Poussin), em Louvain; Cambridge em 1923 com Arthur Eddington; Harvard College Observatory e MIT; doutorado no MIT em 1927 | mesma página | sim |
| Padre | Ordenado em 1923, depois de servir como oficial de artilharia na Primeira Guerra | Britannica, https://www.britannica.com/biography/Georges-Lemaitre | secundária: dizer só "padre", que a página da UCLouvain confirma pelo título (abbé) |
| Cargo | Professor ("lecturer" em 1925, depois professor) na Université catholique de Louvain | UCLouvain | sim |
| 1927 | "A homogeneous universe of constant mass and increasing radius accounting for the radial velocity of extragalactic nebulae", Annales de la Société Scientifique de Bruxelles: a expansão física do universo | UCLouvain | sim |
| 1931 | Propõe "a singular beginning of the expanding universe" e lança a ideia do "átomo primitivo", em artigo na Monthly Notices of the Royal Astronomical Society | UCLouvain | sim |
| Destino do trabalho | "At the end of his life, he devotes himself more and more to numerical computation": em 1958 introduziu o Burroughs E 101, "the first electronic calculator of the University", e se interessou por programação | UCLouvain | sim |
| Morte | Louvain, 20 de junho de 1966. **Só o ano no áudio, sem causa** | UCLouvain | sim |
| Família, ofício do pai | não levantado em fonte lida: **fica fora** | | |

## Onde aparece fora da tela **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| A luz do Sol é do passado | O Sol está a cerca de 150 milhões de km da Terra (NASA, 17/09/2026). A 299.792 km/s, a luz leva cerca de 500 segundos, uns 8 minutos. **Derivado**: distância da NASA dividida pela velocidade da luz | https://science.nasa.gov/sun/facts/ | sim (distância); cálculo (tempo) |

## Alertas que valem neste episódio (da pesquisa inicial)

- NÃO dizer que a idade foi medida direto. NÃO dizer que sai de 1 dividido por H0. NÃO dizer 13,82 nem 13,7.
- NÃO dizer que a ciência sabe o que houve no instante zero. NÃO dizer que o Big Bang foi uma explosão num ponto do espaço.
- NÃO dizer que o Planck mediu "380 mil anos".
- NÃO dizer que Sagan usou 13,8 bilhões (ele usou quinze). NÃO apresentar o calendário como escala científica.
- Tradução de escala só de marca coletiva (D10). Data disputada é faixa (D14). Extra não é chamado pelo nome (DE3).
- Sobre a morte do Lemaître: o ano e só isso.

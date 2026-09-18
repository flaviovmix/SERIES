# Pesquisa: A galáxia mais distante (1.04)

Levantada em 18/09/2026. Base: [`_pesquisa-inicial.md`](../../plano/serie/_pesquisa-inicial.md) da série (seção 2 e os Alertas), mais o que este episódio precisou abrir por conta própria (marcado **[novo]**). **Nada entra no roteiro sem estar aqui.**

## Herdado dos episódios anteriores e da série

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| As marcas de antes | 1º de janeiro, 00:00 (1.01) e 00:14 (1.02); a faixa das primeiras estrelas, de 3 a 8 de janeiro (1.03) | `_pesquisa.md` do 1.02 e do 1.03 | cálculo |
| A régua | 13,797 bilhões de anos (Planck 2018): 1 dia = 37,8 milhões de anos | `_pesquisa-inicial.md`, seção 1 | sim |
| O Calendário Cósmico | Recurso didático de Carl Sagan (1977). ⚠️ Fonte primária não aberta | `_pesquisa-inicial.md`, seção 1 | não |
| O Webb | NASA, ESA e CSA; lançado em 25/12/2021; enxerga infravermelho | `_pesquisa.md` do 1.03 | sim |

## A galáxia MoM-z14 **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| O que se mede | **[OBS]** z (espectro) = **14,44 ± 0,02** | Naidu, Oesch, Brammer e colegas, "A Cosmic Miracle: A Remarkably Luminous Galaxy at zspec = 14.44 Confirmed with JWST", The Open Journal of Astrophysics, revisado em 30/01/2026, https://astro.theoj.org/article/156033 | sim (resumo) |
| Como se confirmou | "The redshift is confirmed with NIRSpec/prism spectroscopy through a sharp Lyman-α break and ≈3σ detections of five rest-UV emission lines" | mesmo artigo | sim |
| A data traduzida | **[OBS+MODELO]** "a mere 280 million years after the Big Bang" (o artigo). A ESA/Webb (28/01/2026): a luz viajou "for about 13.5 of the Universe's estimated 13.8 billion years", e "discussion of physical distances and 'years ago' becomes tricky when looking this far" | artigo; https://esawebb.org/news/weic2603/ | sim |
| Na régua | Pela conta da série (`idade-no-desvio.py`, ΛCDM com Planck 2018): z = 14,44 → 283 milhões de anos → **8 de janeiro, por volta das 11h40**. Os 280 do artigo dão 8 de janeiro também | script da série | cálculo |
| Onde fica | No campo COSMOS (o levantamento "Mirage or Miracle", ~350 minutos de arco quadrados) | artigo | sim |
| A surpresa | O número de galáxias brilhantes com z ≈ 14 a 15 é "> 100× larger" do que os modelos antes do Webb previam (o artigo); a ESA: "100 times more than theoretical studies predicted before the launch of Webb" | artigo; ESA/Webb | sim |
| O nitrogênio | Muito nitrogênio, parecido com o de aglomerados globulares antigos; uma hipótese é de estrelas supermassivas em aglomerados densos (ESA/Webb) | ESA/Webb | sim |
| Quem | "Rohan Naidu of the Massachusetts Institute of Technology's (MIT) Kavli Institute", autor principal. Pascal Oesch (Universidade de Genebra), co-investigador principal do levantamento: "We can estimate the distance of galaxies from images, but it's really important to follow up and confirm with more detailed spectroscopy so that we know exactly what we are seeing, and when" | ESA/Webb | sim |

## O que o telescópio mede **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| O desvio | NASA: o z é "a measure of how much a galaxy's light is stretched by the expansion of the universe" | https://science.nasa.gov/blogs/webb/2024/05/30/nasas-james-webb-space-telescope-finds-most-distant-known-galaxy/ | sim |
| A linha do hidrogênio | NASA: "Hydrogen atoms readily absorb and quickly re-emit far-ultraviolet light known as Lyman alpha emission, which has a wavelength of **121.6 nanometers**" | https://www.nasa.gov/universe/astronomers-spot-distant-galaxy-group-driving-ancient-cosmic-makeover/ | sim |
| Onde ela cai | Comprimento observado = 121,6 × (1 + z). Com z = 14,44: 121,6 × 15,44 = **1877 nm**, cerca de 1,9 micrômetro, no infravermelho | conta | cálculo |
| O olho | NASA: "Typically, the human eye can detect wavelengths from **380 to 700 nanometers**" | https://science.nasa.gov/ems/09_visiblelight/ | sim |
| O instrumento | NASA: o NIRSpec "operates in the **0.6 to 5.3 μm** wavelength range" e "is capable of observing more than 100 objects simultaneously"; a grade de microportinhas tem **248.000** portinhas que abrem e fecham | https://science.nasa.gov/mission/webb/nirspec/ | sim |
| Quem fez | NIRSpec: fornecido pela ESA (busca: "provided entirely by ESA"; consórcio liderado pela Airbus, com os detectores e as microportinhas do Goddard, da NASA) | busca (esawebb.org e esa.int) | **só trecho de buscador: dizer só "da Agência Espacial Europeia"** |

## Candidato e confirmado **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| A estimativa pela imagem | A figura 1 do artigo da MoM-z14 (Naidu e colegas): imagens do NIRCam de 0,9 a 5 micrômetros, "a compact source detected at ≳ 2µm", que não aparece nos filtros mais curtos (F090W, F115W e F150W). É assim que uma candidata aparece antes do espectro | https://commons.wikimedia.org/wiki/File:MoM-z14-filter-dropouts.png (figura do artigo, CC BY 4.0) | sim |
| Por que o Webb vê infravermelho | NASA: a luz das primeiras galáxias chega esticada até o infravermelho, "which is exactly why Webb was built as it was" | `_pesquisa.md` do 1.03 | sim |
| O falso z 16 | Arrabal Haro e colegas (Nature, 2023): o espectro confirmou duas galáxias com z > 11, "but also demonstrates that another candidate with suggested z≈16 instead has **z = 4.9**", com uma combinação de linhas de emissão e poeira "that mimics the colors expected for much more distant objects". As estimativas por imagem "can suffer from degeneracies and occasionally catastrophic errors" | https://arxiv.org/abs/2303.15431 | sim |
| Na régua | z = 4,9 → cerca de 1,2 bilhão de anos depois do início (conta da série) → 1º de fevereiro. O z 16 seria 7 de janeiro | script da série | cálculo |
| O cuidado da equipe JADES | NASA (blog de 30/05/2024): a equipe achou em 2023 uma candidata acima de z 14, mas "there were some properties of the source that made us wary": brilhante demais, e perto de outra galáxia | blog da NASA | sim |

## O recorde que caiu **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| JADES-GS-z13-0 | z = 13,2, uma das quatro galáxias confirmadas por espectro em 10,3 < z < 13,2 (Curtis-Lake e colegas, arXiv de 08/12/2022). Antes disso, "none of these candidates has yet been confirmed spectroscopically" | https://arxiv.org/abs/2212.04568 | sim |
| JADES-GS-z14-0 | z = **14,32** (+0,08/−0,20); o NIRSpec olhou "for almost ten hours" em janeiro de 2024; "shattering the previous most-distant galaxy record (z = 13.2 of JADES-GS-z13-0)"; a NASA publicou em 30/05/2024, antes da revisão por pares; menos de 300 milhões de anos | blog da NASA | sim |
| MoM-z14 passa na frente | NASA: JADES-GS-z14-0 "was the record holder at a redshift of 14.32 until June of 2025, when MoM-z14 was confirmed to have a redshift of z = 14.44" | https://science.nasa.gov/mission/webb/early-universe/ (16/07/2026) | sim |
| Ainda é o recorde | Em 18/09/2026 nenhuma fonte primária lida traz galáxia confirmada acima de z = 14,44 | busca de 18/09/2026 | busca |
| Na régua | JADES-GS-z13-0: 321 milhões de anos → 9 de janeiro, por volta das 11h45. JADES-GS-z14-0: 286 milhões → 8 de janeiro, por volta das 13h45. MoM-z14: 283 milhões → 8 de janeiro, por volta das 11h40. **O recorde andou cerca de um dia no calendário, e o último passo foi de umas duas horas**: 286 − 283 = **3 milhões de anos**, e 3 / 1,575 = 1,9 hora | script da série | cálculo |
| O próximo episódio | 22 de janeiro: o começo da formação do disco espesso da Via Láctea, 13 bilhões de anos atrás, 0,8 bilhão depois do início (Xiang e Rix, Nature, 2022) | `_pesquisa-inicial.md`, seção 2 e "A régua aplicada" | sim |
| Antes do Webb | ESA/Webb: o Hubble achou a galáxia GN-z11 a 400 milhões de anos depois do início, e o Webb confirmou a distância | ESA/Webb | sim |

## Onde aparece fora da tela **[novo]**

| Assunto | Fato | Fonte | Primária |
|---|---|---|---|
| O controle remoto | NASA: "A remote control uses light waves just beyond the visible spectrum of light—infrared light waves—to change channels on your TV"; "around **940 nanometers**"; "While you cannot 'see' the light emitting from a remote, some digital and cell phone cameras are sensitive to that wavelength" | https://science.nasa.gov/ems/07_infraredwaves/ | sim |
| A comparação | A linha do hidrogênio da MoM-z14 sai a 121,6 nm (ultravioleta) e chega a uns 1877 nm: o dobro do comprimento de onda do controle remoto | conta | cálculo |

## Filmes

Nenhum confirmado nesta rodada (ver `_filmes-e-documentarios.md`).

## Alertas que valem neste episódio (da pesquisa inicial e desta)

- NÃO dizer que a galáxia mais distante é a JADES-GS-z14-0: desde junho de 2025 é a MoM-z14.
- NÃO dizer que o recorde é definitivo: caiu duas vezes em dois anos (de z 13,2 pra 14,32 em maio de 2024, e pra 14,44 em junho de 2025).
- NÃO dizer que o telescópio mede a idade ou a distância: mede o z; os anos são tradução pelo modelo, e a própria ESA diz que "anos atrás" fica complicado tão longe.
- NÃO dizer que a MoM-z14 foi vista em luz visível: ela saiu ultravioleta e chegou infravermelha.
- NÃO chamar candidato de confirmado: confirmação é espectro.
- NÃO dizer que a MoM-z14 tem estrelas de população III: o artigo não diz isso.
- NÃO usar a frase dos pesquisadores sobre arqueologia e fósseis: é analogia, e a série não declarou.
- Tradução de escala só de marca coletiva (D10). Extra não é chamado pelo nome (DE3).

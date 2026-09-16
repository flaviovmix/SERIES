# Pesquisa: 1.01 Para onde vai o salário

Conferência em fonte primária dos números e dos conceitos do episódio. Feita em 16/09/2026.
Legenda: **Confirmado** (bate com a fonte), **Corrigido** (o que se costuma dizer está errado ou impreciso), **Não confirmei** (não achei fonte que sustente).
Regra: lei, decreto, publicação do IBGE, série e publicação do Banco Central, artigo científico original, press release do prêmio e página oficial de órgão público = primária. Imprensa, entidade de classe (CNC, Febraban, CNDL, Planejar), editora e agregador = secundária, e está marcado quando foi o que sobrou.

**Observação de método.** As fontes foram baixadas com `curl` e os PDFs convertidos com `pdftotext`. Os dois volumes da POF foram lidos nos PDFs oficiais da biblioteca do IBGE. O release da POF no site do IBGE não abriu no leitor automático, então foi lido na cópia do Internet Archive. O PDF da portaria do INSS publicado no Diário Oficial é **imagem** (sem nenhuma fonte embutida, produzido por "Print To PDF"), então nada pôde ser extraído dele: a tabela veio da página oficial do INSS no gov.br, que cita a portaria. Algumas páginas do gov.br e do ibge.gov.br devolveram 403 ao leitor automático. O endereço histórico da ENEF, `vidaedinheiro.gov.br`, **não resolve mais** (sem resposta de DNS em 16/09/2026). Os trechos entre aspas são cópia literal do arquivo lido; onde a fonte usava travessão longo, troquei por "(...)".

---

## Parte 1: os fatos

### 1. IBGE, POF: para onde vai o dinheiro da família

**Confirmado, com um alerta grande de data e uma inconsistência interna da própria publicação.**

**Qual é a POF mais nova divulgada: a POF 2017-2018.** A POF 2024-2025 foi a campo em 05/11/2024, com mais de 100 mil domicílios visitados ao longo de 12 meses, e até 16/09/2026 **não localizei divulgação de resultados**. A previsão que aparece nas notícias é segundo semestre de 2026. Ou seja: em setembro de 2026, o retrato público do orçamento das famílias brasileiras ainda é o de 2017-2018.
- Deck oficial da coletiva de lançamento, IBGE, 04/04/2025 ("Coletiva Casa Brasil IBGE"), com "+ 100 mil domicílios" e a coleta em 12 meses. A data de divulgação dos resultados não está escrita no deck.
  https://agenciadenoticias.ibge.gov.br/media/com_mediaibge/arquivos/bf5570f54f3fdad069b3a5e67f333abf.pdf
- Site da pesquisa: https://www.ibge.gov.br/pof2024/

**A despesa média mensal familiar.** POF 2017-2018, Brasil:
- **Despesa total média mensal familiar: R$ 4.649,03.** Urbana R$ 4.985,39 (7,2% acima da média); rural R$ 2.543,15 (45,3% abaixo).
- Por região: Centro-Oeste R$ 5.762,12; Sudeste R$ 5.415,49; Sul R$ 5.102,73; Norte R$ 3.178,63; Nordeste R$ 3.166,07.
- **Despesa de consumo média mensal: R$ 3.764,51**, ou 81,0% da despesa total. Urbana R$ 4.020,98; rural R$ 2.158,83.
- Composição da despesa total: despesas correntes 92,7% (sendo 81,0% de consumo e 11,7% de outras despesas correntes), aumento do ativo 4,1%, diminuição do passivo 3,2%. "Neste grande grupo (diminuição do passivo) encontram-se as despesas com pagamento de empréstimos e prestações de imóvel."
- Rendimento: o release fala em "média mensal de R$ 5.426,70" de rendimento total e variação patrimonial por família.
  IBGE, *Pesquisa de Orçamentos Familiares 2017-2018: primeiros resultados*, Rio de Janeiro, 2019, 69 p., ISBN 978-85-240-4505-9.
  https://biblioteca.ibge.gov.br/visualizacao/livros/liv101670.pdf
  Release "POF 2017-2018: Famílias com até R$ 1,9 mil destinam 61,2% de seus gastos à alimentação e habitação", 04/10/2019 (atualizado em 10/10/2019), lido no Internet Archive.
  https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/25598-pof-2017-2018-familias-com-ate-r-1-9-mil-destinam-61-2-de-seus-gastos-a-alimentacao-e-habitacao

**A participação de cada grupo na despesa DE CONSUMO (Tabela 5, Brasil):**

| Grupo | % do consumo |
|---|---|
| Habitação | **36,6%** |
| Transporte | **18,1%** |
| Alimentação | **17,5%** |
| Assistência à saúde | 8,0% |
| Educação | 4,7% |
| Vestuário | 4,3% |
| Higiene e cuidados pessoais | 3,6% |
| Despesas diversas | 3,0% |
| Recreação e cultura | 2,6% |
| Serviços pessoais | 1,3% |
| Fumo | 0,5% |

- "as despesas com alimentação, habitação e transporte corresponderam a **72,2% da despesa de consumo** média mensal das famílias brasileiras, o que representava **58,4% da despesa total**."
- "as despesas com habitação responderam pela maior participação nas despesas monetária e não monetária de consumo das famílias, tanto em nível nacional (36,6%) como regional."
- Urbano x rural: alimentação 16,9% urbana contra 23,8% rural; habitação 37,1% urbana contra 30,9% rural; transporte 17,9% urbana contra 20,0% rural; educação 4,9% urbana contra 2,3% rural.

**Os mesmos grupos como % da despesa TOTAL (Tabela 6, coluna Brasil):** alimentação 14,2%; habitação 29,6%; transporte 14,6%; assistência à saúde 6,5%; educação 3,8%; outras despesas de consumo 12,2%.

**As classes extremas de rendimento (Tabela 6).** As duas classes são "até R$ 1.908,00" (dois salários mínimos da época, inclusive sem rendimento) e "mais de R$ 23.850,00" (25 salários mínimos). Os percentuais abaixo são **da despesa total**, não do consumo:

| Tipo de despesa | Total | Até R$ 1.908 | Mais de R$ 23.850 |
|---|---|---|---|
| Despesas de consumo | 81,0 | **92,6** | **66,3** |
| Alimentação | 14,2 | **22,0** | **7,6** |
| Habitação | 29,6 | **39,2** | **22,6** |
| (aluguel) | 15,1 | 20,6 | 10,7 |
| (serviços e taxas) | 7,4 | 11,2 | 3,5 |
| Transporte | 14,6 | **9,4** | **15,3** |
| (aquisição de veículos) | 5,6 | 2,3 | 7,5 |
| Assistência à saúde | 6,5 | 5,9 | 5,6 |
| (remédios) | 2,9 | **4,2** | 1,4 |
| (plano/seguro-saúde) | 2,1 | 0,4 | **2,9** |
| Educação | 3,8 | **1,9** | **5,1** |
| Outras despesas correntes | 11,7 | 4,0 | 20,7 |
| Aumento do ativo | 4,1 | **1,4** | **9,6** |
| Diminuição do passivo | 3,2 | 2,0 | 3,5 |

- Release: "Somados, os dois grupos representavam 61,2% das despesas das famílias com menores rendimentos, sendo 22,0% destinados à alimentação e 39,2% voltados à habitação. Entre aquelas com os rendimentos mais altos, a soma atingia 30,2%, sendo 7,6% com alimentação e 22,6% com habitação."
- A saúde é o achado contraintuitivo: a **participação** é quase igual nas duas pontas (5,9% e 5,6%), mas a composição inverte. Na classe baixa, remédio é 4,2% da despesa total e responde por "71,2% do dispêndio com saúde"; na classe alta, plano de saúde é 2,9% e remédio, 1,4%.
- O gancho mais forte pro episódio: o que a família rica faz e a pobre não é **aumento do ativo** (1,4% contra 9,6%) e **outras despesas correntes** (4,0% contra 20,7%). A família de baixa renda gasta 92,6% de tudo em consumo; a de alta renda, 66,3%. A "sobra" está na tabela.

**Inconsistência interna (Corrigido).** O texto corrido de *Primeiros resultados* diz que a alimentação "alcançou 22,6%" na classe até R$ 1.908, mas a Tabela 6 do mesmo documento e o release do IBGE dizem **22,0%** (22,6% é o número da habitação na classe alta, repetido por engano no parágrafo). **Usar 22,0%.** No mesmo parágrafo, os números de educação (1,9% e 5,1%) aparecem atribuídos à POF 2008-2009, mas são os da Tabela 6 da POF 2017-2018.

**Detalhamento por tema** (acesso a serviços de saúde, educação, habitação): IBGE, *POF 2017-2018: perfil das despesas no Brasil: indicadores selecionados*, Rio de Janeiro, 2020, 115 p., ISBN 978-65-87201-27-6.
https://biblioteca.ibge.gov.br/visualizacao/livros/liv101761.pdf

---

### 2. Banco Central, Caderno de Educação Financeira

**Confirmado. Primária, e é a espinha conceitual do episódio inteiro.**

Documento: *Caderno de Educação Financeira: conteúdo básico*, Departamento de Promoção da Cidadania Financeira (DEPEF), Banco Central do Brasil, **versão 2026, 2ª edição revisada**, 98 p. (a 1ª edição é de 2013). Módulo 2 é o do orçamento.

Citações literais, curtas, prontas pro roteiro:

- **O que é o orçamento:** "o orçamento é uma importante ferramenta para você conhecer, administrar e equilibrar suas receitas e despesas e, com isso, poder planejar e alcançar seus sonhos."
- **A conta:** "RECEITAS - DESPESAS = POUPANÇA"
- **O princípio:** "Um importante princípio a ser seguido na elaboração do orçamento é que as despesas não devem ser superiores às receitas."
- **Como se faz:** "um método em quatro etapas: planejamento, registro, agrupamento e avaliação."
- **Receitas fixas:** "Como o próprio nome diz, são receitas que não variam ou variam muito pouco, como o valor do salário, da aposentadoria ou de rendimentos de aluguel."
- **Receitas variáveis:** "São aquelas cujos valores variam de um mês para o outro, como os ganhos de comissões por vendas ou os ganhos com aulas particulares."
- **Despesas fixas:** "São despesas que não variam ou variam muito pouco, como o aluguel, a prestação de um financiamento etc."
- **Despesas variáveis:** "São aquelas cujos valores variam de um mês para o outro, como a conta de luz ou de água, que variam conforme o consumo."
- **O eventual (o que o episódio chama de gasto que não é todo mês):** "Lembre-se dos compromissos sazonais: impostos, seguros, matrículas escolares etc." e "Lembre-se dos compromissos já assumidos: prestações a vencer, faturas de cartões de crédito (...)".
- **Poupar antes de gastar, literal:** "ao se tornar uma pessoa superavitária, a primeira coisa a fazer ao receber uma renda deve ser separar parte dela para poupar, **antes mesmo de pagar qualquer despesa**."
- **Por que antes:** "O dinheiro vai sendo usado durante o mês, para pagar despesas não planejadas, e sobra pouco, ou quase nada, para poupar ao fim do período." E: "Esperar para poupar apenas no final do mês é pouco efetivo para investir e formar patrimônio."
- **O nome disso:** "Pague-se primeiro: separe o dinheiro da reserva assim que receber seu salário. Para te ajudar nessa tarefa, autorize seu banco a fazer uma transferência automática mensal para a sua reserva."
- **A regra de ouro, literal:** "Lembre-se da regra de ouro: o objetivo principal é ter orçamento superavitário. Ou seja, gaste menos do que você recebe."
- **Reserva de emergência:** "manter uma reserva financeira (a reserva de emergência) para cobrir eventualidades é um importante cuidado para você não cair no endividamento." E: "aplique sua reserva de emergência em um investimento de alta liquidez e baixo risco."

Página do caderno no BCB: https://www.bcb.gov.br/cidadaniafinanceira/cadernocidadaniafinanceira

**Cuidado de arquivo (Corrigido).** Entre as fontes baixadas há um `caderno-bcb-ufjf.pdf` que **não é do Banco Central**: é o *Caderno de Educação Financeira* do projeto de extensão da UFJF, Campus Governador Valadares, 2016, 20 p., organizado por John Leno Castro dos Santos e Amanda Ferrari Uceli. Tem definições parecidas ("Orçamento é o registro de receitas e despesas durante um determinado período"), mas **não pode ser citado como Banco Central**.

---

### 3. ENEF, Decreto 10.393/2020

**Confirmado no decreto. O site oficial histórico saiu do ar.**

- **Decreto nº 10.393, de 9 de junho de 2020.** "Institui a nova Estratégia Nacional de Educação Financeira - ENEF e o Fórum Brasileiro de Educação Financeira - FBEF." Publicado no DOU de 10/06/2020.
  - Finalidade, literal: "a nova Estratégia Nacional de Educação Financeira - ENEF, com a finalidade de **promover a educação financeira, securitária, previdenciária e fiscal no País**".
  - **Quem coordena:** "Art. 2º O FBEF é colegiado de articulação, ao qual compete: I - implementar e estabelecer os princípios da ENEF". Ou seja, quem toca a ENEF é o FBEF, um colegiado, não um órgão único.
  - **Composição (art. 3º), nesta ordem:** Banco Central do Brasil; Comissão de Valores Mobiliários; Superintendência de Seguros Privados; Secretaria do Tesouro Nacional; Secretaria de Previdência; Superintendência Nacional de Previdência Complementar; Secretaria Nacional do Consumidor; Ministério da Educação.
  - **Presidência:** "A presidência do FBEF será exercida, a cada período de vinte e quatro meses, por um de seus membros, em regime de rodízio, de acordo com a ordem dos incisos do caput."
  - "Art. 9º A participação no FBEF será considerada prestação de serviço público relevante, não remunerada."
  - "Art. 10. Fica revogado o Decreto nº 7.397, de 22 de dezembro de 2010" (a ENEF original, de 2010).
  https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10393.htm
- **Hoje (2026):** a presidência do FBEF está com a Susep, e o FBEF é descrito como quem "coordena a Estratégia Nacional de Educação Financeira". Fonte oficial: página do Tesouro Nacional sobre a Semana ENEF, 23/01/2026, e o site da Semana ENEF.
  https://www.gov.br/tesouronacional/pt-br/noticias/semana-nacional-de-educacao-financeira-de-2026-acontecera-em-maio · https://www.gov.br/semanaenef/pt-br
- **Semana ENEF 2026:** 13ª edição, de 18 a 24 de maio de 2026, tema "Educação Financeira: construindo um futuro com longevidade e prosperidade".
- **Site oficial da ENEF: Não confirmei um endereço vivo.** O endereço histórico `www.vidaedinheiro.gov.br` **não resolve** (sem resposta de DNS em 16/09/2026), embora ainda seja citado em páginas de órgãos públicos. O endereço oficial que abre hoje é o da Semana ENEF: https://www.gov.br/semanaenef/pt-br

---

### 4. Endividamento: o dado do BCB e o dado da CNC

**Confirmado, com um aviso: são três medidas diferentes, e o episódio não pode misturar.**

**a) Banco Central (primária, série oficial, API de dados abertos).** Último dado disponível: **junho de 2026**.

| Série SGS | O que mede | Jun/2026 |
|---|---|---|
| **29034** | Comprometimento de renda das famílias com o serviço da dívida com o SFN, **com ajuste sazonal** | **28,85%** |
| 29035 | Idem, exceto crédito habitacional | 26,60% |
| 29036 | Comprometimento com **amortização** da dívida | 17,99% |
| **29037** | **Endividamento** das famílias com o SFN em relação à renda acumulada dos últimos doze meses | **49,75%** |

- Conceito, literal dos metadados do BCB: "**Comprometimento de renda** - Relação entre o valor correspondente aos pagamentos esperados para o serviço da dívida com o Sistema Financeiro Nacional e a renda mensal das famílias (...) ajustado sazonalmente." E: "**Endividamento** - Relação entre o valor atual das dívidas das famílias com o Sistema Financeiro Nacional e a renda das famílias acumulada nos últimos doze meses."
- Série mensal, em percentual, fonte "Banco Central do Brasil - Departamento de Estatísticas", divulgada "até oito semanas após o mês de referência".
- Meses anteriores (série 29034): abril/2026 28,38%; maio/2026 28,49%; junho/2026 28,85%.
- API usada: `https://api.bcb.gov.br/dados/serie/bcdata.sgs.29034/dados/ultimos/3?formato=json`
  https://dadosabertos.bcb.gov.br/dataset/29034-comprometimento-de-renda-das-familias-com-o-servico-da-divida-com-o-sistema-financeiro-nacion
- **Cuidado (Corrigido):** a série antiga **19881**, que muita reportagem ainda cita, **está morta desde agosto de 2021** (último valor: 30,15% em 08/2021). Quem fala em "mais de 30% de comprometimento" citando o BCB provavelmente está usando série descontinuada.

**b) PEIC, da CNC (fonte de ENTIDADE, não de governo).** Pesquisa de Endividamento e Inadimplência do Consumidor, Confederação Nacional do Comércio de Bens, Serviços e Turismo. **Mês de referência: agosto de 2026**, divulgada em 10/09/2026.
- **82% das famílias com dívidas a vencer**, estável e "no patamar recorde", sétimo mês consecutivo de recorde, contra 78,8% em agosto de 2025.
- **Inadimplência: 29,9% das famílias** (avanço de 0,1 ponto no mês).
- **12,5% declararam não ter condições de pagar** as contas em atraso, "o maior nível desde fevereiro".
- Comprometimento médio da renda com dívidas: 29,5% (estável). **19,2% das famílias comprometeram mais da metade da renda**, maior nível desde março de 2026.
- Tempo médio de atraso: 65 dias. Dívidas com prazo superior a um ano: 33,4%. "Muito endividado": 17,4%; "pouco endividados": 34,9%.
- Por faixa de renda: até 3 salários mínimos, 85,1% endividadas e 38,8% com dívidas em atraso (era 38,5% em julho); de 3 a 5 SM, 83,7% e 28%; de 5 a 10 SM, 77,2% e 20,3%; acima de 10 SM, 72,3% e 14,9%.
  https://portaldocomercio.org.br/acoes-institucionais/cnc-mais-endividadas-do-que-a-media-familias-de-menor-renda-lideram-avanco-na-inadimplencia-em-agosto/

**As três medidas não são a mesma coisa:** 82% (PEIC) é **quantas famílias** têm alguma dívida a vencer, inclusive cartão e carnê, por pesquisa amostral de uma entidade do comércio; 49,75% (BCB) é **o tamanho da dívida** com bancos sobre a renda de um ano; 28,85% (BCB) é **quanto da renda do mês** vai pagar parcela. Trocar um pelo outro no áudio seria erro.

---

### 5. O que sai do salário antes de chegar

**Confirmado nas duas pontas, com um detalhe importante sobre a isenção do IR.**

**a) INSS 2026.** Tabela progressiva de contribuição do segurado empregado, empregado doméstico e trabalhador avulso, vigente a partir da competência **janeiro/2026**, fixada pela **Portaria Interministerial MPS/MF nº 13, de 09/01/2026** (publicada no DOU de 12/01/2026):

| Salário de contribuição | Alíquota progressiva |
|---|---|
| até R$ 1.621,00 | **7,5%** |
| de R$ 1.621,01 a R$ 2.902,84 | **9%** |
| de R$ 2.902,85 a R$ 4.354,27 | **12%** |
| de R$ 4.354,28 a R$ 8.475,55 | **14%** |

- **Teto do salário de contribuição: R$ 8.475,55.**
- A alíquota é **progressiva por faixa**: cada pedaço do salário paga a alíquota da sua faixa, não é a alíquota do topo sobre tudo. É exatamente a mesma mecânica do IR, e vale a pena o episódio dizer isso.
- Fonte usada: página oficial do INSS, que cita a portaria como origem dos valores.
  https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal
- **Não confirmei no texto do DOU:** o PDF da portaria publicado pelo governo é imagem digitalizada, sem texto extraível, então o Anexo II não pôde ser lido diretamente.
  https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf

**b) IRPF 2026.** Tabela progressiva mensal vigente (Receita Federal):

| Base de cálculo mensal | Alíquota | Parcela a deduzir |
|---|---|---|
| até R$ 2.428,80 | isento | - |
| de R$ 2.428,81 a R$ 2.826,65 | 7,5% | R$ 182,16 |
| de R$ 2.826,66 a R$ 3.751,05 | 15,0% | R$ 394,16 |
| de R$ 3.751,06 a R$ 4.664,68 | 22,5% | R$ 675,49 |
| acima de R$ 4.664,68 | 27,5% | R$ 908,73 |

https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026

**c) A isenção até R$ 5.000 (Lei 15.270/2025), e o detalhe que quase todo mundo erra.**
- **Lei nº 15.270, de 26 de novembro de 2025**, publicada no DOU de 27/11/2025. "Art. 8º Esta Lei entra em vigor na data de sua publicação e **produzirá efeitos a partir de 1º de janeiro de 2026**."
- Texto literal do novo art. 3º-A da Lei 9.250/1995: "**A partir do mês de janeiro do ano-calendário de 2026**, será concedida **redução do imposto** sobre os rendimentos tributáveis sujeitos à incidência mensal do Imposto sobre a Renda das Pessoas Físicas, de acordo com a seguinte tabela":
  - rendimentos **até R$ 5.000,00**: redução de "até R$ 312,89 **(de modo que o imposto devido seja zero)**";
  - de R$ 5.000,01 até R$ 7.350,00: "R$ 978,62 - (0,133145 x rendimentos tributáveis sujeitos à incidência mensal)", com a redução caindo linearmente "até zerar para rendimentos a partir de R$ 7.350,00";
  - acima de R$ 7.350,00: "não terão redução no imposto devido".
- A redução "também será aplicada no cálculo do imposto cobrado exclusivamente na fonte no pagamento do décimo terceiro salário".
  https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15270.htm
- **Corrigido, e é um alerta:** a lei **não mudou a faixa de isenção da tabela**. A primeira faixa continua sendo R$ 2.428,80. O que existe é um **desconto no imposto** que zera a conta para quem ganha até R$ 5.000,00 por mês. O efeito prático pro trabalhador é "não paga IR até R$ 5 mil", e o episódio pode dizer isso; o que não pode é dizer "a tabela agora é isenta até R$ 5 mil".

---

### 6. A regra 50/30/20

**Confirmado quem escreveu e qual é o livro. Não confirmei os percentuais na fonte original.**

- Livro: **All Your Worth: The Ultimate Lifetime Money Plan**, de **Elizabeth Warren e Amelia Warren Tyagi** (mãe e filha), publicado em **2005** pela Free Press (selo da Simon & Schuster), 304 páginas. A edição de bolso é de 17/01/2006, ISBN 9780743269889.
  https://www.simonandschuster.com/books/All-Your-Worth/Elizabeth-Warren/9780743269889
- **As três partes, literal da página da editora:** "Warren and Tyagi show you how to balance your money into three essential parts: **the Must-Haves** (the bills you have to pay every month), **the Wants** (some fun money for right now), and **your Savings** (to build a better tomorrow). No complicated budgets, no keeping track of every penny."
- A editora descreve o método como "get your money in balance", resultado de "more than twenty years of intensive research".
- **Não confirmei em primária os números 50, 30 e 20.** Nenhuma fonte oficial ou da editora que li traz os percentuais; o nome "Balanced Money Formula" e a divisão 50% necessidades / 30% desejos / 20% poupança, sobre a renda **depois dos impostos**, aparecem só em fontes secundárias (resenhas e sites de finanças pessoais). Para citar com segurança no áudio: dizer que a divisão em três partes é do livro (com fonte na editora) e tratar os percentuais como "a versão que ficou conhecida", sem atribuir número exato a citação literal.
  Secundárias consultadas: https://www.getrichslowly.org/book-review-all-your-worth/ · https://www.accrediteddebtrelief.com/blog/50-30-20-budgeting-what-it-is-and-how-it-works/

---

### 7. Contabilidade mental: Thaler e o prêmio de 2017

**Confirmado, com fonte primária dos dois lados. Serve redondo pro extra "por que o dinheiro some".**

**a) O artigo.** Richard H. Thaler, "**Mental accounting matters**", *Journal of Behavioral Decision Making*, **vol. 12, n. 3, p. 183-206, setembro de 1999**. DOI 10.1002/(SICI)1099-0771(199909)12:3<183::AID-BDM318>3.0.CO;2-F. Afiliação no artigo: "Graduate School of Business, University of Chicago, USA". Metadados conferidos no Crossref; o texto integral foi lido numa cópia PDF do artigo.
https://doi.org/10.1002/(SICI)1099-0771(199909)12:3%3C183::AID-BDM318%3E3.0.CO;2-F

- **A definição, literal do resumo:** "Mental accounting is the set of cognitive operations used by individuals and households to organize, evaluate, and keep track of financial activities."
- **O pedaço que é o episódio inteiro, literal do resumo:** "Both the sources and uses of funds are labeled in real as well as in mental accounting systems. **Expenditures are grouped into categories (housing, food, etc.) and spending is sometimes constrained by implicit or explicit budgets.**"
- **Da seção "Budgeting", literal:** "Money is commonly labeled at three levels: expenditures are grouped into budgets (e.g. food, housing, etc.); wealth is allocated into accounts (e.g. checking, pension, 'rainy day'); and income is divided into categories (e.g. regular or windfall). Such accounts would be inconsequential if they were perfectly fungible (i.e. substitutable) as assumed in economics. **But, they are not fungible, and so they 'matter'.**"
- **Por que gente com menos dinheiro controla mais, literal:** "As a rule, the tighter the budget, the more explicit are the budgeting rules, both in households and organizations. **Families living near the poverty level use strict, explicit budgets; in wealthy families budgets are both less binding and less well defined.** Poorer families also tend to have budgets defined over shorter periods (a week or month), whereas wealthier families may use annual budgets."
- Nota de época, literal e ótima pro roteiro: "At one time many households used a very explicit system with **envelopes of cash labeled with various spending categories**. To some extent, programs such as Quicken serve as a modern replacement for this method."

**b) O prêmio.** Comunicado oficial da Real Academia Sueca de Ciências, **9 de outubro de 2017**: "The Royal Swedish Academy of Sciences has decided to award the **Sveriges Riksbank Prize in Economic Sciences in Memory of Alfred Nobel 2017** to Richard H. Thaler, University of Chicago, IL, USA, 'for his contributions to behavioural economics'."
- Literal sobre a contabilidade mental: "Thaler developed the **theory of mental accounting**, explaining how people simplify financial decision-making by **creating separate accounts in their minds**, focusing on the narrow impact of each individual decision rather than its overall effect."
- Valor do prêmio: 9 milhões de coroas suecas.
  https://www.nobelprize.org/prizes/economic-sciences/2017/press-release/
- Ficha: "Richard H. Thaler, born 1945 in East Orange, NJ, USA", data de nascimento 12/09/1945, doutorado na University of Rochester em 1974.
  https://www.nobelprize.org/prizes/economic-sciences/2017/thaler/facts/
- **Cuidado de nome:** o prêmio de economia **não é um Nobel original**. O nome correto é "Prêmio de Ciências Econômicas em Memória de Alfred Nobel", instituído pelo Sveriges Riksbank (banco central sueco). Dizer "Nobel de Economia" no áudio é aceitável coloquialmente, mas o nome certo é esse.

---

### 8. Quantos brasileiros fazem orçamento (tudo SECUNDÁRIO, de entidade privada)

**Não existe estatística oficial de governo sobre isso.** Nenhum órgão público mede "quantos brasileiros fazem orçamento". Tudo abaixo é pesquisa de entidade, com amostra própria, e está marcado como secundária.

**a) A mais recente e a mais completa: Índice Planejar, 1ª edição, lançada em 10/09/2026.** Encomendada pela Planejar (Associação Brasileira de Planejamento Financeiro), campo feito pelo **Datafolha**, **2.000 pessoas**, adultos das classes A, B e C com acesso à internet, campo de **16 a 29 de julho de 2025**. Índice geral **52,7 pontos** numa escala de 0 a 100, em cinco dimensões:
- gestão orçamentária **70,1**
- proteção e seguros **63,0**
- endividamento **47,8**
- planejamento de longo prazo **43,3**
- reservas e resiliência **39,3**
- Faixa de 25 a 44 anos é a pior: 51,3 pontos.
- A leitura da pesquisa é exatamente a tese do episódio: o brasileiro **consegue organizar a conta do mês, mas não transforma isso em segurança pro futuro**. Como é a primeira edição, não dá pra dizer se melhorou ou piorou.
  Forbes, 11/09/2026: https://forbes.com.br/forbes-money/2026/09/brasileiros-25-44-anos-pressionados-financeiramente/ · Jornal do Comércio, 10/09/2026: https://www.jornaldocomercio.com/economia/2026/09/1262910-estudo-aponta-que-brasileiros-controlam-o-orcamento-mas-seguem-vulneraveis-a-imprevistos.html

**b) Serasa e Opinion Box, campo de dezembro de 2025 a janeiro de 2026, 6.063 pessoas:** gasto médio declarado de **R$ 3.520 por mês**; "apenas 2 em cada 10 brasileiros consideram fácil gerenciar os pagamentos"; 7 em cada 10 dizem que o custo de vida subiu nos últimos 12 meses.
https://www.serasa.com.br/imprensa/pesquisa-custo-de-vida-brasil/

**c) Febraban e IPESPE, 17º Observatório Febraban, campo de 12 a 26/06/2025, 3.000 pessoas, divulgado em 21/07/2025:** "A maioria dos brasileiros (55%) admite que entende pouco (40%) ou nada (15%) de educação financeira"; 47% associam educação financeira à "gestão cotidiana do orçamento doméstico, ou seja, ao planejamento e controle de receitas e gastos".
https://portal.febraban.org.br/noticia/4324/pt-br/

**d) O número clássico, mas VELHO: CNDL/SPC Brasil, publicado em 28/01/2020.** "48% dos brasileiros não controlam o próprio orçamento": 25% só guardam de cabeça, 20% não fazem registro nenhum, 2% delegam a terceiros. Entre quem controla, caderno de anotações é o método mais usado, seguido de planilha e aplicativo. Amostra de **813 consumidores nas 27 capitais**, margem de erro de 3,5 pontos percentuais para 95% de confiança.
https://site.cndl.org.br/48-dos-brasileiros-nao-controlam-o-proprio-orcamento-revela-pesquisa-cndlspc-brasil/
(edição anterior, 29/01/2018, com 45% e 805 consumidores: https://site.cndl.org.br/45-dos-brasileiros-nao-controlam-as-proprias-financas-mostra-pesquisa-sobre-educacao-financeira-do-spc-brasil-e-cndl/)

**e) Índice de Saúde Financeira do Brasileiro (I-SFB)**, da Febraban em cooperação técnica com o Banco Central: 56,7 pontos em 2024. **Lido só no resumo da busca**, a página não foi aberta. https://indice.febraban.org.br/

**Recomendação pro roteiro:** se o episódio quiser um número, o mais defensável hoje é o **Índice Planejar** (2026, Datafolha, com as cinco dimensões), dizendo o nome de quem fez. O "48% não controlam o orçamento" é de **2020** e virou jargão de reportagem; se usar, tem que dar a data.

---

### 9. Calibragem dos exemplos: salário mínimo e rendimento médio

**Confirmado, ambos em primária.**

- **Salário mínimo de 2026: R$ 1.621,00.** Decreto nº 12.797, de 23 de dezembro de 2025, publicado no DOU de 24/12/2025: "A partir de 1º de janeiro de 2026, o valor do salário mínimo será de R$ 1.621,00 (mil seiscentos e vinte e um reais)." O decreto fixa também o valor diário em **R$ 54,04** e o horário em **R$ 7,37**, e cita como base a Lei 14.663/2023 e a Lei 15.077/2024.
  https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12797.htm
- **Rendimento médio real habitual, PNAD Contínua, 2º trimestre de 2026 (divulgado em 14/08/2026): R$ 3.738.** Literal: "o rendimento médio real de todos os trabalhos, habitualmente recebido por mês, pelas pessoas de 14 anos ou mais de idade, ocupadas na semana de referência, com rendimento de trabalho, foi estimado em R$ 3.738". Estável frente ao 1º trimestre de 2026 (R$ 3.795) e acima do 2º trimestre de 2025 (R$ 3.635).
  - Por região: Nordeste R$ 2.645; Sul R$ 4.238; Centro-Oeste R$ 4.362.
  - Massa de rendimento: R$ 380,3 bilhões.
  - Contexto do mesmo release, útil pro alerta 7: taxa de informalidade de **37,4%** da população ocupada, 25,3% trabalhando por conta própria, 74,4% dos empregados do setor privado com carteira assinada.
  https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/47774-pnad-continua-trimestral-desocupacao-cai-em-13-das-27-ufs-no-2-trimestre-de-2026
- **Calibragem sugerida:** o rendimento médio do trabalho (R$ 3.738) é de **uma pessoa ocupada**; a despesa média da POF (R$ 4.649,03) é de **uma família inteira**. São unidades diferentes e não se comparam direto. Um salário redondo e honesto pro exemplo do episódio, em 2026, é algo entre R$ 2.000 e R$ 4.000 por pessoa, ou R$ 5.000 por família.

---

## Alertas: o que o episódio NÃO pode dizer

1. **50/30/20 não é norma oficial de nada.** Não é do Banco Central, não é da ENEF, não é lei, não é recomendação de órgão público. É a proposta de um livro americano de 2005. Dizer "a regra é" transforma sugestão de autor em norma.
2. **Nenhuma fonte oficial fixa quantos meses de reserva.** O Caderno do BCB fala em "reserva de emergência" e em aplicá-la "em um investimento de alta liquidez e baixo risco", mas **não diz 3, 6 nem 12 meses** em lugar nenhum. Se o episódio citar meses, tem que ser como exemplo próprio, jamais como regra oficial.
3. **Não dizer que os números da POF são de agora.** São da POF **2017-2018**, com preços e salário mínimo da época (as classes da pesquisa são "até R$ 1.908" e "acima de R$ 23.850", que eram 2 e 25 salários mínimos **de então**). A POF 2024-2025 ainda não tinha resultados divulgados em 16/09/2026.
4. **Não confundir % da despesa de consumo com % da despesa total.** Habitação é 36,6% do **consumo** e 29,6% da **despesa total**. Alimentação é 17,5% e 14,2%. Trocar os dois muda a história.
5. **A POF mede família, não pessoa.** "O brasileiro gasta R$ 4.649 por mês" está errado: é a despesa média **por família** (unidade de consumo).
6. **A isenção do IR até R$ 5.000 é redução do imposto, não mudança de faixa.** A tabela progressiva de 2026 continua isentando só até R$ 2.428,80.
7. **Nem todo mundo tem desconto na folha.** A tabela do INSS e a do IR na fonte valem para empregado com carteira; autônomo, MEI e informal (37,4% da população ocupada) têm outra conta. O episódio não pode falar de "o que sai antes de cair na conta" como se valesse pra todos.
8. **PEIC é da CNC, entidade do comércio, não é dado de governo.** E mede coisa diferente das séries do BCB. Dizer "segundo dados oficiais, 82% das famílias estão endividadas" seria erro duplo.
9. **É educação, nunca recomendação.** Nada de dizer onde investir, que produto contratar, quanto render, nem prometer resultado. "Poupar antes de gastar" é princípio de educação financeira publicado pelo BCB; "compre tal coisa" não é.
10. **"Poupar antes de gastar" pode ser atribuído ao Banco Central** (está literal no Caderno). **"50/30/20" não pode.** Não misturar as duas atribuições na mesma frase.
11. **Não citar a série 19881 do BCB** para comprometimento de renda: está descontinuada desde agosto de 2021.
12. **Não dizer "Nobel de Economia"** como se fosse prêmio testamentário de Alfred Nobel; o nome é Prêmio de Ciências Econômicas em Memória de Alfred Nobel, do banco central sueco.

---

## Não confirmado

1. **Os percentuais 50, 30 e 20 na fonte original** (o livro *All Your Worth*). Só em fontes secundárias. As três categorias (Must-Haves, Wants, Savings) estão confirmadas na página da editora.
2. **Endereço oficial vivo da ENEF.** `vidaedinheiro.gov.br` não responde a DNS em 16/09/2026.
3. **Texto do Anexo II da Portaria Interministerial MPS/MF nº 13/2026** em documento legível: o PDF oficial do DOU é imagem digitalizada. A tabela usada veio da página oficial do INSS.
4. **Data de divulgação dos resultados da POF 2024-2025.** O deck oficial do IBGE não traz data; as notícias falam em segundo semestre de 2026.
5. **Uma pesquisa recente (2024 a 2026) com o percentual de brasileiros que faz orçamento** nos mesmos moldes da CNDL/SPC de 2020. O que existe de novo é o Índice Planejar, que mede pontuação por dimensão, não percentual de pessoas.
6. **Quantos meses de reserva de emergência**, em qualquer fonte oficial brasileira.
7. **I-SFB de 2025 ou 2026.** O dado que achei (56,7 pontos) é de 2024 e foi lido só no resumo da busca.

---

## Ajustes (o que se costuma dizer contra o que a fonte diz)

1. **"A POF mostra que hoje o brasileiro gasta..."** A POF pública é de **2017-2018**. A de 2024-2025 ainda não saiu.
2. **"O maior gasto da família é comida."** Não. **Habitação é 36,6%** do consumo, transporte 18,1% e alimentação 17,5%. Comida só passa na frente do transporte na área rural (23,8%) e nas classes de menor renda.
3. **"Alimentação é 22,6% na classe mais pobre."** O texto corrido da publicação do IBGE traz 22,6%, mas a Tabela 6 e o release do próprio IBGE dizem **22,0%**. Usar 22,0%.
4. **"A diferença entre rico e pobre é o que sobra pra comida."** A diferença que salta na Tabela 6 é outra: **aumento do ativo** (1,4% contra 9,6%) e **outras despesas correntes** (4,0% contra 20,7%). O pobre gasta 92,6% de tudo em consumo; o rico, 66,3%.
5. **"A sobra é o que fica no fim do mês."** O Caderno do BCB diz o contrário, literal: a parte de poupar deve ser separada "antes mesmo de pagar qualquer despesa", e "esperar para poupar apenas no final do mês é pouco efetivo". No vocabulário do BCB, a sobra planejada chama-se **superávit**.
6. **"Agora a tabela do IR é isenta até R$ 5 mil."** É **redução do imposto** (até R$ 312,89) que zera a conta até R$ 5.000,00; a faixa de isenção da tabela continua em R$ 2.428,80.
7. **"O comprometimento de renda das famílias passa de 30%."** Pela série viva do BCB (29034), é **28,85%** em junho de 2026. Os 30%+ vêm de série descontinuada em 2021.
8. **"82% das famílias estão endividadas, segundo o Banco Central."** Os 82% são da **PEIC/CNC**. O BCB mede endividamento como dívida sobre renda de 12 meses: **49,75%**.
9. **"O brasileiro ganha R$ 3.738 e gasta R$ 4.649."** Comparação inválida: o primeiro é rendimento **por pessoa ocupada** (PNAD, 2º trimestre de 2026), o segundo é despesa **por família** (POF 2017-2018), com oito anos de diferença.
10. **Caderno de Educação Financeira.** Existe um caderno homônimo da UFJF (2016) circulando em PDF. O do Banco Central é o do DEPEF, versão 2026, 2ª edição revisada, 98 páginas.

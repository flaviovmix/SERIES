# Pesquisa: 1.02 Juros sobre juros

Conferência em fonte primária dos números e dos conceitos do episódio. Feita em 18/09/2026.
Legenda: **Confirmado** (bate com a fonte), **Corrigido** (o que se costuma dizer está errado ou impreciso), **Não confirmei** (não achei fonte que sustente; fica fora do áudio).
Regra: lei, decreto, medida provisória, emenda constitucional, resolução do CMN, resolução e circular do BCB, página ou série oficial do Banco Central, súmula e acórdão do STF e do STJ, obra original digitalizada e artigo original = primária. Imprensa, entidade de classe, agregador, blog e site de tradução = secundária, e está marcado quando foi o que sobrou.

**Resumo.**
- **Confirmado:** o Caderno de Educação Financeira do BCB (versão 2026) define juros simples e compostos com exemplo numérico (R$ 1.000 a 5% ao mês por 6 meses: R$ 1.300,00 contra R$ 1.340,10) e chama os compostos, literalmente, de "juros sobre juros".
- **Rotativo do cartão, julho de 2026: 436,15% ao ano (SGS 22022), ou 15,02% ao mês (SGS 25477).** Nos últimos 13 meses oscilou pouco, entre 429,42% e 453,64% ao ano. Parcelado 189,28% ao ano (9,26% ao mês), cheque especial 137,30% ao ano (7,47% ao mês), não consignado 110,95% ao ano (6,42% ao mês).
- **Teto do cartão:** Lei 14.690/2023, art. 28, § 1º (juros e encargos não podem passar do valor original da dívida), detalhado pela Res. CMN 5.112/2023. O BCB diz que começou a valer em 3 de janeiro de 2024.
- **Rotativo só até a fatura seguinte:** Res. 4.549/2017, art. 1º, **ainda vigente** (a 4.655/2018 não consolidou nada: tratava de encargos de atraso e foi revogada em 2022). **Pagamento mínimo: não existe piso regulatório desde 1º/06/2018**; hoje o mínimo é o que o contrato fixar.
- **Cheque especial:** teto de 8% ao mês vigente (Res. 4.765/2019, art. 3º), desde 06/01/2020. O artigo da tarifa caiu no STF.
- **Duas surpresas na lei:** o RE 592.377 (STF, 2015) julgou só se a MP de 2001 tinha relevância e urgência; o mérito da capitalização mensal foi julgado na **ADI 2.316, em junho de 2024** (constitucional). E a **Lei 14.905/2024** tirou as instituições financeiras da Lei de Usura e apagou do Código Civil a frase "permitida a capitalização anual".
- **Fatura:** a regra de hoje é a Res. BCB 96/2021, art. 9º (taxas efetivas mensal e anual e CET das opções de financiamento), e o CET agora é a Res. CMN 4.881/2020 (a 3.517/2007 foi revogada).
- **Não confirmei:** se o IOF fica fora do teto de 100% (só a imprensa diz), a data de 3/01/2024 numa página do próprio bcb.gov.br (li a nota do BCB reproduzida), série pública separada de rotativo "regular" e "não regular", e o "1683" de Bernoulli em fonte primária.

**Observação de método.** As fontes foram baixadas com `curl`; PDFs convertidos com `pdftotext`. Os normativos do BCB foram lidos na API pública de normativos do próprio BCB (`https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=<tipo>&p2=<número>`), que devolve o texto, a situação (revogado ou não) e o histórico de alterações; as versões consolidadas em PDF vieram de `normativos.bcb.gov.br`. As séries de juros vieram da API do SGS e conferem com a Tabela 16 da planilha oficial da nota de crédito. A página de metadados do SGS respondeu "System unavailable" em 18/09/2026, então o conceito da série veio do Portal de Dados Abertos do BCB. O portal do STF recusou o leitor automático (erro de certificado) e abriu por `curl`. O SCON do STJ devolveu 403; as súmulas do STJ foram lidas no Arquivo Cidadão do próprio STJ. A Agência Gov (EBC) está com páginas desativadas por causa da legislação eleitoral. A lista de notícias do bcb.gov.br só alcança maio de 2025 em diante, então a nota do BCB de janeiro de 2024 foi lida em reprodução. Os trechos entre aspas são cópia literal do que foi lido; onde a fonte usava travessão, troquei por "(...)" ou parênteses. Os números marcados "conta própria" foram calculados em Python e não são fonte.

---

## Parte 1: os fatos

### 1. Juros simples, juros compostos e capitalização: o vocabulário do Banco Central

**Confirmado. Primária, com definição e exemplo numérico literal.**

Documento: *Caderno de Educação Financeira: conteúdo básico*, Departamento de Promoção da Cidadania Financeira (DEPEF), Banco Central do Brasil, **versão 2026, 2ª edição revisada**, 98 p. É o mesmo arquivo usado no 1.01 (metadado do PDF: criado em 03/07/2026). Módulo 3, "Uso do crédito e administração das dívidas", seção 3.3 "Atenção aos juros", p. 32 a 35.
https://www.bcb.gov.br/content/cidadaniafinanceira/documentos_cidadania/Cuidando_do_seu_dinheiro_Gestao_de_Financas_Pessoais/caderno_cidadania_financeira.pdf

- **O que é juro (p. 32):** "vamos tratar os juros como sendo o valor do aluguel do dinheiro no tempo. Na visão de quem paga, os juros correspondem ao pagamento do 'aluguel' pela utilização de recursos de terceiros, no caso, o dinheiro."
- **Juros simples (p. 32):** "Juros simples são aqueles pagos somente sobre o capital principal, ou seja, o valor inicial. São o mesmo que juros não capitalizados."
- **Exemplo simples (p. 32):** "ao tomarmos emprestados R$1 mil, por 6 meses, com juros simples de 5% a.m. (ao mês), ao final do período, a nossa dívida será de R$1.300, ou seja, R$1.000 do capital + R$50 (5% de R$1.000) por mês x 6 meses = R$1.000 + R$300."
- **Juros compostos e capitalização (p. 32):** "Juros compostos são aqueles que, após cada período de capitalização (normalmente um mês), são incorporados ao capital principal e passam, por sua vez, a também render juros. **Os juros compostos são os chamados 'juros sobre juros' ou 'juros capitalizados'.**"
- **Exemplo composto (p. 33):** "No mesmo exemplo anterior, caso fossem utilizados os juros compostos, a dívida ao final do período seria de R$1.340,10". A tabela do caderno, mês a mês: R$ 1.050,00; R$ 1.102,50; R$ 1.157,63; R$ 1.215,51; R$ 1.276,28; R$ 1.340,10 (cada linha é a anterior mais 5%, por exemplo "R$1.050 (capital principal + juros) + R$52,50 (5% de R$1.050)").
- **O alerta (p. 34):** "Alerta: os juros compostos fazem com que o dinheiro cresça exponencialmente ao longo do tempo. Lembre-se de que isso vale para aplicações, mas também para dívidas."
- **Onde se usa cada um (p. 34):** "Os juros simples praticamente não existem na prática, em transações comerciais ou financeiras. O mais frequente é o uso dos juros compostos."
- **O exemplo de longo prazo do caderno (p. 34), Helena e Marta:** Helena poupa R$ 150 por mês dos 20 aos 30 anos, a 0,5% ao mês, e deixa render até os 60: "Aos sessenta anos de idade, Helena terá acumulado R$148.786,58. Note que ela só tirou do bolso R$18 mil". Marta poupa os mesmos R$ 150 dos 30 aos 60: "terá acumulado R$150.677,26. Veja que Marta precisou tirar do bolso R$54 mil". Conclusão do caderno: "A chave do mistério é o poder dos juros compostos ao longo do tempo." (Ver o alerta 11: as duas contas usam convenções diferentes.)
- **CET no caderno (p. 37):** "O Custo Efetivo Total (CET) diz quanto efetivamente custa um empréstimo, ou financiamento, incluindo não só os juros, mas também tarifas, impostos e outros encargos cobrados do cliente." Exemplo: financiamento de R$ 1 mil a 12% ao ano em 5 meses, com R$ 60 de tarifa e IOF descontados, "a taxa efetivamente paga pelo consumidor, ou CET, é de 43,93% ao ano".
- O caderno diz que as contas foram feitas na Calculadora do Cidadão (p. 35): "https://www.bcb.gov.br/meubc/calculadoradocidadao".
- Exercício 3 do Módulo 3 (p. 84), com gabarito "V, V, F": repete a definição ("Trata-se do chamado 'juros sobre juros' ou 'juros capitalizados'") e marca como falsa a frase "Nos juros simples, a capitalização dos juros é contínua."

**Calculadora do Cidadão (BCB).** A página inicial lista **quatro cálculos**: "Aplicação com depósitos regulares", "Financiamento com prestações fixas", "Valor futuro de um capital" e "Correção de valores" (por Taxa Legal, índices de preços, TR, poupança, Selic e CDI). Literal: "A Calculadora do cidadão permite a simulação de aplicações com depósitos regulares e de financiamentos com prestações fixas, a correção de valores com base em diversos indicadores econômicos e o cálculo de valores futuros de um capital."
- **Não tem modo "juros simples" pra dívida ou aplicação.** A metodologia do "Valor futuro de um capital" é a fórmula composta: "S n = (1 + j ) n q 0", "Onde: n = Nº de Meses j = Taxa de Juros Mensal q 0 = Capital Atual S n = Valor Obtido ao Final" (ou seja, Sₙ = q₀ × (1 + j)ⁿ).
- Depósitos regulares, literal da metodologia: "Sn corresponde à soma de uma progressão geométrica formada por n pagamentos iguais a p, realizados **no início de cada período** e corrigidos até o final dos n períodos."
- Único lugar com juros simples: a correção pela **Taxa Legal**, literal: "A atualização pela Taxa Legal utiliza a metodologia de juros simples, com acumulação das taxas mensais e a apuração de juros proporcionais (fração pro rata) com 6 (seis) casas decimais. Para um maior detalhamento, veja a Resolução CMN nº 5.171, de 29 de agosto de 2024."
  https://www3.bcb.gov.br/CALCIDADAO/jsp/index.jsp · https://www3.bcb.gov.br/CALCIDADAO/publico/exibirMetodologiaValorFuturoCapital.do?method=exibirMetodologiaValorFuturoCapital · https://www3.bcb.gov.br/CALCIDADAO/publico/exibirMetodologiaAplicacaoDepositosRegulares.do?method=exibirMetodologiaAplicacaoDepositosRegulares

---

### 2. Quanto custa o crédito caro pra pessoa física: rotativo, parcelado, cheque especial, não consignado

**Confirmado. Primária (API do SGS e planilha oficial da nota de crédito). Mês mais recente publicado: julho de 2026.**

Conceito, literal do Portal de Dados Abertos do BCB para a série 22022: "Taxa média de juros das **novas operações** de crédito livre contratadas no período de referência. Taxa ponderada pelo valor das concessões." Fonte: "Banco Central do Brasil (...) Departamento de Estatísticas". São taxas médias do mercado, não a taxa de um banco.

**Rotativo do cartão, últimos 13 meses** (consulta à API em 18/09/2026):

| Mês | SGS 22022 (% ao ano) | SGS 25477 (% ao mês) |
|---|---|---|
| jul/2025 | 452,67 | 15,31 |
| ago/2025 | 453,64 | 15,33 |
| set/2025 | 448,06 | 15,23 |
| out/2025 | 447,09 | 15,21 |
| nov/2025 | 448,37 | 15,24 |
| dez/2025 | 442,41 | 15,13 |
| jan/2026 | 429,42 | 14,90 |
| fev/2026 | 442,26 | 15,13 |
| mar/2026 | 433,06 | 14,96 |
| abr/2026 | 431,97 | 14,95 |
| mai/2026 | 440,38 | 15,10 |
| jun/2026 | 442,44 | 15,13 |
| **jul/2026** | **436,15** | **15,02** |

- Oscila pouco: entre 429,42% e 453,64% ao ano (14,90% a 15,33% ao mês). Em 12 meses caiu 16,5 pontos percentuais.
- **Qual rotativo é esse: o total.** A série 22022 é a coluna "Cartão de crédito - Rotativo" da Tabela 16, com a nota literal: "Inclui operações de crédito rotativo e saques à vista na função crédito." Nas taxas por instituição, o BCB chama a modalidade de "Cartão de crédito - rotativo total - Prefixado" (API `https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosDiariaPorInicioPeriodo`, período de 28/08 a 03/09/2026). **Não localizei, no catálogo de dados abertos do BCB, série pública separada de rotativo "regular" e "não regular"** (busca por "regular" sem resultado em 18/09/2026).
- O que é regular e não regular, literal do voto do CMN de 2023: "rotativo regular, quando a fatura não é integralmente quitada, mas o pagamento é igual ou superior ao mínimo exigido" e "rotativo não regular, quando a fatura não é paga ou paga abaixo do mínimo". Em 2017, segundo o mesmo voto, o regular "caíram de cerca de 15% ao mês para pouco mais de 10% ao mês" e o não regular "de cerca de 17% ao mês para próximo de 14% ao mês".
- Pico histórico da série: **497,73% ao ano em dezembro de 2016** (16,07% ao mês). Com a regra de 2017 em vigor (abril), a taxa caiu de 490,33% (mar/2017) para 424,36% (abr) e 358,76% (mai).
  API: `https://api.bcb.gov.br/dados/serie/bcdata.sgs.22022/dados/ultimos/13?formato=json` e `https://api.bcb.gov.br/dados/serie/bcdata.sgs.25477/dados/ultimos/13?formato=json`
  https://dadosabertos.bcb.gov.br/dataset/22022-taxa-media-de-juros-das-operacoes-de-credito-com-recursos-livres---pessoas-fisicas---cartao-d

**As outras linhas caras, julho de 2026:**

| Linha (recursos livres, pessoa física) | % ao ano (SGS) | % ao mês (SGS) | Faixa nos 13 meses (% ao ano) |
|---|---|---|---|
| Cartão rotativo | **436,15** (22022) | **15,02** (25477) | 429,42 a 453,64 |
| Cartão parcelado | **189,28** (22023) | **9,26** (25478) | 182,93 a 196,50 |
| Cheque especial | **137,30** (20741) | **7,47** (25463) | 137,25 a 146,30 |
| Crédito pessoal não consignado | **110,95** (20742) | **6,42** (25464) | 101,10 a 127,12 |
| Cartão de crédito total | 91,60 (22024) | 5,57 (25479) | |
| Total do crédito livre à pessoa física | 60,04 (20740) | 4,00 (25462) | |
| Total do crédito à pessoa física (livre + direcionado) | 37,41 (20716) | 2,68 (25435) | |

- Notas literais da Tabela 16: parcelado "Inclui compras parceladas com juros, parcelamento de fatura de cartão de crédito, parcelamento migrado do rotativo, saques parcelados e pagamento de contas parceladas."; cheque especial "Inclui operações de adiantamento a depositantes."
- Os dados de julho estão marcados com asterisco na planilha: "Dados preliminares." Podem ser revistos (exemplo real: o crédito livre à pessoa física de junho saiu 64,0% ao ano na nota de julho e 63,9% na de agosto).
- **Nota "Estatísticas monetárias e de crédito", divulgada em 28/08/2026 (dados de julho), literal:** "No crédito livre às pessoas físicas, a taxa média de juros situou-se em 60,0% a.a., com redução de 3,9 p.p. no mês e aumento de 1,6 p.p. em doze meses (...). Destacaram-se os recuos das taxas médias de crédito pessoal não consignado total (-16,1 p.p.) e de cartão de crédito total (-5,7 p.p.)." A próxima nota (dados de agosto) ainda não tinha saído em 18/09/2026.
  https://www.bcb.gov.br/content/estatisticas/hist_estatisticasmonetariascredito/202608_Texto_de_estatisticas_monetarias_e_de_credito.pdf
  https://www.bcb.gov.br/content/estatisticas/hist_estatisticasmonetariascredito/202608_Tabelas_de_estatisticas_monetarias_e_de_credito.xlsx (Tabela 16)

---

### 3. O teto de 100% no rotativo e no parcelamento da fatura

**Confirmado na lei e na resolução. A data de início (3/01/2024) está confirmada numa nota do BCB lida em reprodução.**

**a) A lei.** **Lei nº 14.690, de 3 de outubro de 2023** (a lei do Desenrola Brasil), publicada no DOU de 3/10/2023, edição extra. Art. 28, literal:
- Caput: "Os emissores de cartão de crédito e de outros instrumentos de pagamento pós-pagos utilizados em arranjos abertos ou fechados, como medida de autorregulação, devem submeter à aprovação do Conselho Monetário Nacional, por intermédio do Banco Central do Brasil, de forma fundamentada e com periodicidade anual, limites para as taxas de juros e encargos financeiros cobrados no crédito rotativo e no parcelamento de saldo devedor das faturas de cartões de crédito e de outros instrumentos de pagamento pós-pagos."
- **§ 1º (o teto):** "Se os limites referidos no caput deste artigo não forem aprovados no prazo máximo de 90 (noventa) dias, contado da data da publicação desta Lei, **o total cobrado em cada caso a título de juros e encargos financeiros não poderá exceder o valor original da dívida.**"
- § 2º: "O limite previsto no § 1º deste artigo também será aplicável aos emissores (...) que deixarem de aderir à autorregulação de que trata o caput deste artigo."
- Art. 27, § 1º (junto, no mesmo capítulo): "Os consumidores têm direito à portabilidade do saldo devedor da fatura de cartão de crédito (...) para qualquer instituição financeira ou instituição autorizada a funcionar pelo Banco Central do Brasil."
- Vigência (art. 37): na data da publicação, exceto o art. 30 (180 dias).
  https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14690.htm

**b) A regulamentação.** **Resolução CMN nº 5.112, de 21 de dezembro de 2023**, publicada no DOU de 26/12/2023. Ela **não é uma norma nova solta**: acrescenta os arts. 2º-A a 2º-D à Res. 4.549/2017 (a do rotativo), e esse art. 1º vale desde a publicação. Literal do novo art. 2º-A:
- "I - operação de crédito para financiamento do saldo devedor da fatura (...): as operações de crédito rotativo e de parcelamento de fatura vinculadas à respectiva conta de pagamento pós-paga (...);"
- "II - juros: os juros remuneratórios cobrados na concessão das operações de crédito referidas no inciso I;"
- "III - encargos financeiros: os encargos de multa e juros de mora cobrados em decorrência de atraso no pagamento ou na liquidação de obrigações relativas a operações de crédito referidas no inciso I, **assim como quaisquer tarifas e comissões incidentes à operação de crédito**; e"
- "IV - valor original da dívida: o saldo das operações de crédito rotativo ou de parcelamento de fatura concedidas para o financiamento do saldo devedor da fatura (...), devendo ser apurado toda vez que for concedida nova operação de crédito para financiamento do saldo devedor da fatura."
- Parágrafo único, quando o rotativo vira parcelamento: "será considerado valor original da dívida o montante inicial da operação de crédito rotativo que foi migrada" e o total de juros e encargos "será apurado a partir da data de início da operação de crédito rotativo".
- Art. 2º-C: renegociação a qualquer momento, "desde que o valor total cobrado a título de juros e encargos financeiros aplicáveis a cada renegociação não exceda o valor original da dívida da operação inicial que foi renegociada, descontando-se os juros e encargos que já foram pagos."
- Art. 2º-D: "se aplica somente às operações realizadas após o prazo de 90 (noventa) dias de que trata o § 1º do art. 28 da Lei nº 14.690, de 2023, independentemente da data de assinatura do contrato".
  https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Resolu%C3%A7%C3%A3o%20CMN&p2=5112
  Texto consolidado da 4.549 com os arts. 2º-A a 2º-D: https://normativos.bcb.gov.br/Lists/Normativos/Attachments/50330/Res_4549_v2_L.pdf
  Voto 67/2023-CMN (a justificativa): "na definição dos encargos financeiros, foram incluídas quaisquer tarifas e comissões incidentes à operação de crédito, de modo a garantir maior transparência ao cliente." https://normativos.bcb.gov.br/Votos/CMN/202367/Voto_do_CMN_67_2023.pdf

**c) O que entra e o que fica de fora, pelo texto:**
- **Entra:** juros remuneratórios do rotativo e do parcelamento de fatura; multa; juros de mora; "quaisquer tarifas e comissões incidentes à operação de crédito". O limite **continua valendo quando o rotativo migra para o parcelamento** (conta desde o início do rotativo).
- **Fica de fora:** operações feitas antes do fim do prazo de 90 dias (art. 2º-D). E a Res. 4.549, onde o CMN pôs as regras, diz no art. 4º: "O disposto nesta Resolução não se aplica aos cartões de crédito e aos demais instrumentos de pagamento pós-pagos cujos contratos prevejam pagamento das faturas mediante consignação em folha de pagamento." A lei, no art. 28, não traz essa exceção com todas as letras.
- A definição fala só em "rotativo" e "parcelamento de fatura". Compra à vista não aparece na definição.
- **IOF: Não confirmei.** Nem a lei nem a resolução falam em IOF ou tributo. Quem diz que o IOF fica fora é a imprensa (Exame, 21/12/2023: "Apenas o Imposto sobre Operação Financeira (IOF) não será considerado nessa regra.", sem citar fonte).

**d) A data de início.** A lei e a resolução não escrevem a data: falam em "90 (noventa) dias, contado da data da publicação". Nota do Banco Central "Limite dos juros do cartão entra em vigor", lida na reprodução do COAD (15/01/2024, "Fonte: Banco Central do Brasil") e no perfil oficial do BCB no LinkedIn (12/01/2024), literal: "Começou a valer, **no último dia 3**, após regulamentação do Conselho Monetário Nacional (CMN), o limite dos juros e encargos financeiros no crédito rotativo e no parcelamento do saldo devedor da fatura dos cartões de crédito." E: "a dívida de quem não paga o total da fatura do cartão de crédito e entra no chamado rotativo do cartão, não pode ultrapassar o dobro do valor devido. Esse limite continua valendo mesmo se a dívida do rotativo for migrada para a modalidade de crédito parcelado. Isso significa que a cobrança de juros e de encargos financeiros sobre uma dívida com um valor original de R$100 pode elevar o valor devido a, no máximo, R$200."
  https://www.coad.com.br/home/noticias-detalhe/123777/limite-dos-juros-do-cartao-entra-em-vigor · https://pt.linkedin.com/pulse/limite-dos-juros-do-cart%C3%A3o-entra-em-vigor-banco-central-do-brasil-qsulf
- **Corrigido (divergência na imprensa):** a Exame (21/12/2023) escreveu "A nova regra valerá a partir de 2 de janeiro de 2024"; a InfoMoney, "a partir de janeiro de 2024". **Usar 3 de janeiro de 2024**, que é a data do BCB.
- Desde 1º/07/2025, bancos, financeiras e as demais instituições listadas mandam todo mês ao BCB os juros e encargos acumulados no rotativo e no parcelamento (Res. BCB nº 468, de 30/04/2025, e Instrução Normativa BCB nº 621, de 13/05/2025). É fiscalização do teto, não muda a regra.

---

### 4. O rotativo só até a fatura seguinte, e o pagamento mínimo

**Confirmado. A regra de 2017 continua vigente, na mesma resolução.**

**a) A regra.** **Resolução nº 4.549, de 26 de janeiro de 2017** (CMN), publicada no DOU de 30/01/2017, **em vigor desde 3 de abril de 2017** (art. 7º). Situação na base do BCB em 18/09/2026: não revogada; única alteração, a Res. CMN 5.112/2023 (arts. 2º-A a 2º-D).
- **Art. 1º:** "O saldo devedor da fatura de cartão de crédito e de demais instrumentos de pagamento pós-pagos, quando não liquidado integralmente no vencimento, **somente pode ser objeto de financiamento na modalidade de crédito rotativo até o vencimento da fatura subsequente.**"
- **Art. 2º:** "Após decorrido o prazo previsto no caput do art. 1º, o saldo remanescente do crédito rotativo pode ser financiado mediante linha de crédito para pagamento parcelado, desde que em condições mais vantajosas para o cliente em relação àquelas praticadas na modalidade de crédito rotativo, inclusive no que diz respeito à cobrança de encargos financeiros."
- Art. 2º, § 2º: "É vedado o financiamento do saldo devedor (...) na modalidade de crédito rotativo de valores já parcelados".
  https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Resolu%C3%A7%C3%A3o&p2=4549
- **Corrigido:** a Res. 4.655/2018 **não consolidou** a 4.549. Ela tratava de outra coisa, literal da ementa: "Dispõe sobre a cobrança de encargos em decorrência de atraso no pagamento ou na liquidação de obrigações relacionadas com faturas de cartão de crédito". Foi **revogada por inteiro pela Res. BCB nº 96/2021, a partir de 1º/03/2022**. A regra do rotativo continua morando na 4.549.

**b) O pagamento mínimo: hoje não existe piso regulado.**
- **Histórico:** a Circular BCB nº 3.512, de 25/11/2010, art. 1º, literal: "O valor mínimo da fatura de cartão de crédito a ser pago mensalmente não pode ser inferior ao correspondente à aplicação, sobre o saldo total da fatura, dos seguintes percentuais: I - 15%, a partir de 1º de junho de 2011; e II - 20%, a partir de 1º de dezembro de 2011."
- **Os 20% nunca valeram:** o inciso II foi revogado pela Circular nº 3.563, de 11/11/2011, antes de entrar em vigor.
- **O piso de 15% acabou em 1º/06/2018:** a Circular nº 3.892, de 26/04/2018, literal: "Ficam revogados: I - o art. 1º da Circular nº 3.512, de 2010" e "Esta Circular entra em vigor em 1º de junho de 2018."
- **A regra de hoje:** Res. BCB nº 96, de 19/05/2021, art. 11, literal: "O montante a ser pago obrigatoriamente pelo titular da conta de pagamento até o vencimento da fatura deve ser composto pelo somatório dos seguintes valores, quando houver: I - saldo do crédito rotativo acrescido dos respectivos encargos incidentes no período; II - prestações referentes a parcelamentos do saldo devedor de períodos anteriores, realizados na forma do art. 2º da Resolução nº 4.549 (...); e III - **valor mínimo a ser pago previsto no contrato** da conta de pagamento pós-paga referente aos lançamentos realizados na fatura no período." Parágrafo único: "A definição ou a alteração do valor mínimo de que trata o inciso III deve ser comunicada ao titular da conta de pagamento com, no mínimo, trinta dias de antecedência."
- Ou seja: o **percentual mínimo é do contrato**; o que a norma obriga é que o rotativo do mês anterior, com encargos, entre inteiro no valor obrigatório (senão ele vira parcelamento, pela 4.549).
  https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Circular&p2=3512 · https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Circular&p2=3892 · https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Resolu%C3%A7%C3%A3o%20BCB&p2=96

---

### 5. Cheque especial: teto de 8% ao mês

**Confirmado e vigente. Com um detalhe: o artigo da tarifa foi derrubado pelo STF.**

- **Resolução nº 4.765, de 27 de novembro de 2019** (CMN), publicada no DOU de 28/11/2019. Situação na base do BCB em 18/09/2026: não revogada.
- **Art. 3º:** "As taxas de juros remuneratórios cobradas sobre o valor utilizado do cheque especial estão limitadas a, no máximo, **8% (oito por cento) ao mês**."
- Alcance (art. 1º): "cheque especial concedido por instituições financeiras em conta de depósitos à vista titulada por pessoas naturais e por microempreendedores individuais (MEI)". Definição: "a concessão de limite de crédito rotativo vinculado a conta de depósitos à vista".
- **Início, art. 6º:** "Esta Resolução entra em vigor em **6 de janeiro de 2020**".
- **O art. 2º (tarifa de até 0,25% sobre o limite acima de R$ 500) caiu:** o STF, na ADI 6.407, "por unanimidade, julgou procedente o pedido formulado na ação direta para declarar a inconstitucionalidade do art. 2º da Resolução CMN/Bacen 4.765/2019" (Plenário, sessão virtual de 23/04/2021 a 30/04/2021). O CMN revogou formalmente o art. 2º pela Res. CMN 4.962/2021, a partir de 1º/11/2021. **O teto de 8% do art. 3º segue de pé** (texto consolidado conferido).
  https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Resolu%C3%A7%C3%A3o&p2=4765 · https://normativos.bcb.gov.br/Lists/Normativos/Attachments/50875/Res_4765_v2_L.pdf · https://portal.stf.jus.br/processos/detalhe.asp?incidente=5901434
- Na prática, julho de 2026: média de **7,47% ao mês** (SGS 25463), perto do teto. **8% ao mês capitalizado dá 151,82% ao ano** (conta própria, conferida em Python), não 96%.

---

### 6. "Juros sobre juros" na lei brasileira

**Confirmado, com duas surpresas que mudam o que um roteiro diria (itens e e g).**

**a) Lei de Usura.** **Decreto nº 22.626, de 7 de abril de 1933**, DOU de 8/04/1933. Ementa: "Dispõe sobre os juros nos contratos e dá outras providencias." **Art. 4º, literal:** "É proíbido contar juros dos juros: esta proíbição não compreende a acumulação de juros vencidos aos saldos liquidos em conta corrente de ano a ano." (O Planalto registra que o decreto foi revogado por um decreto de 25/04/1991 e revigorado por outro de 29/11/1991.)
https://www.planalto.gov.br/ccivil_03/decreto/d22626.htm

**b) Súmula 121 do STF**, de 13/12/1963 (data no LexML): "**É vedada a capitalização de juros, ainda que expressamente convencionada.**" A própria página do STF manda ver a Súmula 596.
https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2000 · https://www.lexml.gov.br/urn/urn:lex:br:supremo.tribunal.federal:sumula:1963-12-13;121

**c) Súmula 596 do STF** (a chave pra entender por que banco é diferente), sessão de 15/12/1976, DJ de 3/01/1977: "As disposições do Decreto 22.626/1933 não se aplicam às taxas de juros e aos outros encargos cobrados nas operações realizadas por instituições públicas ou privadas, que integram o Sistema Financeiro Nacional." (A página do STF traz "Data de publicação do enunciado: DJ de 5-1-1977"; o LexML registra DJ de 03/01/1977 e de 04/01/1977.)
https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2017

**d) A medida provisória.** **MP nº 2.170-36, de 23 de agosto de 2001**, DOU de 24/08/2001. **Art. 5º, literal:** "Nas operações realizadas pelas instituições integrantes do Sistema Financeiro Nacional, é admissível a capitalização de juros com periodicidade inferior a um ano." Parágrafo único: o credor deve, quando pedido, apresentar "planilha de cálculo que evidencie de modo claro, preciso e de fácil entendimento e compreensão, o valor principal da dívida, seus encargos e despesas contratuais, a parcela de juros e os critérios de sua incidência".
- A mesma regra estava na **MP nº 1.963-17, de 30 de março de 2000**, publicada no DOU de **31/03/2000**, art. 5º com o mesmo texto. **Corrigido:** a MP é de 30/03; o 31/03 é a publicação, e é a data que o STJ usa.
- Por que uma MP de 2001 ainda vale: Emenda Constitucional nº 32, de 11/09/2001, art. 2º: "As medidas provisórias editadas em data anterior à da publicação desta emenda continuam em vigor até que medida provisória ulterior as revogue explicitamente ou até deliberação definitiva do Congresso Nacional."
  https://www.planalto.gov.br/ccivil_03/mpv/2170-36.htm · https://www.planalto.gov.br/ccivil_03/mpv/antigas/1963-17.htm · https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc32.htm

**e) O STF, em dois tempos (surpresa 1).**
- **RE 592.377** (Tema 33 da repercussão geral), julgado em **4/02/2015**, DJE 55 de 20/03/2015, relator Marco Aurélio, redator do acórdão Teori Zavascki. Por maioria, deu provimento ao recurso do banco, "vencido o Ministro Marco Aurélio (Relator), que lhe negava provimento e declarava inconstitucional o art. 5º". **A tese é sobre forma, não sobre mérito**, literal: "Os requisitos de relevância e urgência previstos no art. 62 da Constituição Federal estão presentes na Medida Provisória 2.170-36/2001, que autoriza a capitalização de juros com periodicidade inferior a um ano nas operações realizadas pelas instituições integrantes do Sistema Financeiro Nacional." E, do próprio acórdão, citado na página da Súmula 121: "Por ora, não está em debate a questão de mérito da medida provisória".
- **ADI 2.316** (proposta pelo Partido Liberal em 20/09/2000; o Banco Central entrou como amicus curiae), o julgamento **de mérito**: Plenário, sessão virtual de **21/06/2024 a 28/06/2024**, literal: "O Tribunal, por maioria, conheceu da ação e julgou improcedente o pedido nela formulado, para **declarar a constitucionalidade do art. 5º da Medida Provisória n. 2.170-36**, de 23 de agosto de 2001 (...), vencido o Ministro Edson Fachin." Transitou em julgado em 30/08/2024.
  https://portal.stf.jus.br/processos/detalhe.asp?incidente=2636792 (RE 592.377) · https://portal.stf.jus.br/processos/detalhe.asp?incidente=1857067 (ADI 2.316)

**f) STJ.**
- **Súmula 539** (Segunda Seção, 10/06/2015, DJe de 15/06/2015): "É permitida a capitalização de juros com periodicidade inferior à anual em contratos celebrados com instituições integrantes do Sistema Financeiro Nacional a partir de 31/3/2000 (MP n. 1.963-17/2000, reeditada como MP n. 2.170-36/2001), **desde que expressamente pactuada**." Entre os precedentes, o REsp 973.827/RS.
- **Súmula 541** (mesma data, DJe de 15/06/2015): "A previsão no contrato bancário de taxa de juros anual superior ao duodécuplo da mensal é suficiente para permitir a cobrança da taxa efetiva anual contratada." Em linguagem de gente: se o contrato mostra uma taxa anual maior que 12 vezes a mensal, isso já conta como aviso de que há juros compostos.
  https://arquivocidadao.stj.jus.br/index.php/sumula-539-2;isad?sf_culture=pt · https://arquivocidadao.stj.jus.br/index.php/sumula-541-2;isad?sf_culture=pt

**g) O Código Civil e a Lei 14.905/2024 (surpresa 2).**
- Texto original do art. 591 do Código Civil (Lei 10.406/2002): "Destinando-se o mútuo a fins econômicos, presumem-se devidos juros, os quais, sob pena de redução, não poderão exceder a taxa a que se refere o art. 406, **permitida a capitalização anual**."
- Texto atual, dado pela **Lei nº 14.905, de 28 de junho de 2024** (DOU de 1º/07/2024): "Destinando-se o mútuo a fins econômicos, presumem-se devidos juros. Parágrafo único. Se a taxa de juros não for pactuada, aplica-se a taxa legal prevista no art. 406 deste Código." **A frase da capitalização anual saiu.**
- **Art. 3º da Lei 14.905/2024, literal:** "Não se aplica o disposto no Decreto nº 22.626, de 7 de abril de 1933, às obrigações: I - contratadas entre pessoas jurídicas; II - representadas por títulos de crédito ou valores mobiliários; III - contraídas perante: a) instituições financeiras e demais instituições autorizadas a funcionar pelo Banco Central do Brasil; b) fundos ou clubes de investimento; c) sociedades de arrendamento mercantil e empresas simples de crédito; d) organizações da sociedade civil de interesse público (...) que se dedicam à concessão de crédito; ou IV - realizadas nos mercados financeiro, de capitais ou de valores mobiliários." Efeitos: "60 (sessenta) dias após a data de sua publicação" (art. 5º, II).
  https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14905.htm · https://www.planalto.gov.br/ccivil_03/leis/2002/l10406.htm

**A linha do tempo, em uma frase por data:** 1933 a Lei de Usura proíbe "contar juros dos juros"; 1963 o STF sumula que é vedado mesmo se combinado; 1976 o STF diz que a Lei de Usura não vale pra banco; 31/03/2000 a MP libera a capitalização mensal pra banco; 2015 o STJ sumula (se estiver no contrato) e o STF valida a MP pela forma; 2024 o STF valida o mérito e uma lei tira de vez os bancos da Lei de Usura.

---

### 7. Onde o juro aparece escrito pro cliente: fatura e CET

**Confirmado. As normas mudaram desde 2007 e 2010: citar as de hoje.**

**a) A fatura do cartão.** **Resolução BCB nº 96, de 19 de maio de 2021**, art. 9º, com a redação da **Res. BCB nº 365/2023, em vigor desde 1º/07/2024**. A fatura tem três grupos, nesta ordem: "I - área de destaque; II - alternativas de pagamento; e III - informações complementares."
- **Área de destaque (§ 3º), "exclusivamente":** "I - valor total da fatura; II - data de vencimento da fatura do período vigente; e III - limite de crédito total."
- **Alternativas de pagamento (§ 4º), "exclusivamente":** "I - valor do pagamento obrigatório de que trata o art. 11 (...); II - **valor dos encargos a ser cobrado no período seguinte, no caso de realização somente do pagamento obrigatório** (...); III - opções de financiamento do saldo devedor da fatura; e IV - **taxas efetivas de juros mensal e anual e o Custo Efetivo Total (CET)** relativos às operações de crédito passíveis de contratação de que trata o inciso III."
- § 7º: "As opções de financiamento de que trata o inciso III do § 4º devem informar os custos totais arcados pelo titular da conta e ser apresentadas **na ordem do menor para o maior valor total a pagar** pelo titular."
- Informações complementares (§ 5º), entre outras: "IV - valores relativos aos juros e encargos financeiros cobrados no período vigente, segregados de acordo com os tipos de operações de crédito contratadas; V - valor total de juros e encargos financeiros cobrados referentes às operações de crédito contratadas".
- Art. 11-A: "o valor total da fatura deve aparecer inicialmente como opção de pagamento padrão".
- Art. 11-C, I: aviso gratuito do vencimento "com pelo menos dois dias de antecedência da data de vencimento, incluindo esclarecimentos de que o não pagamento do valor total da fatura resulta na cobrança de juros e encargos".
- E, pela Res. 4.549, art. 2º-B (desde 12/2023): "O valor original da dívida, bem como o valor total cobrado a título de juros e encargos financeiros (...) deverão ser detalhados nos respectivos demonstrativos e faturas".
  https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Resolu%C3%A7%C3%A3o%20BCB&p2=96
- Histórico: antes, a regra estava na Res. CMN 3.919/2010, art. 13, que pedia na fatura "VI - Custo Efetivo Total (CET), para o próximo período, das operações de crédito passíveis de contratação" e "V - valor dos encargos a ser cobrado no mês seguinte no caso de o cliente optar pelo pagamento mínimo da fatura". Esse artigo foi revogado pela Res. BCB 96 a partir de 1º/03/2022.

**b) O CET.** **Corrigido:** a Res. CMN 3.517/2007 foi **revogada** ("Resolução CMN nº 4.881/2020 - Revogação total, a partir de 1º/2/2021"). A norma de hoje é a **Resolução CMN nº 4.881, de 23 de dezembro de 2020**, DOU de 24/12/2020, em vigor desde 1º/02/2021. Literal:
- Art. 2º: "O CET é uma taxa que representa, na data de seu cálculo, de forma consolidada, os encargos e as despesas das operações de que trata o art. 1º."
- Art. 3º: o cálculo abrange "amortizações, juros, tarifas, tributos, seguros e outras despesas vinculadas à operação".
- Art. 4º, parágrafo único: "O CET deve ser: I - expresso na forma de taxa percentual anual".
- Art. 6º: "O CET relativo a operações de adiantamento a depositantes, de desconto, de cheque especial e com características de crédito rotativo deve considerar no cálculo os seguintes parâmetros: I - o prazo de trinta dias; e II - o valor do limite de crédito pactuado."
- Art. 7º: informar o CET antes da contratação e apresentar o demonstrativo; art. 8º: informar o CET na publicidade que mostrar taxa de juros.
- Vale para "pessoas naturais, inclusive empresários individuais, ou com pessoas jurídicas classificadas como microempresas e empresas de pequeno porte" (art. 1º). A fórmula do art. 4º é imagem no texto e não foi extraída.
  https://www.bcb.gov.br/api/conteudo/app/normativos/exibenormativo?p1=Resolu%C3%A7%C3%A3o%20CMN&p2=4881

---

### 8. A conta (conta própria, conferida em Python)

**Não é fonte. São contas feitas para o roteiro, com as fórmulas abaixo, rodadas em Python em 18/09/2026.**

```
juros simples:   M = C × (1 + i × n)
juros compostos: M = C × (1 + i)^n
tempo pra dobrar (compostos): n = ln 2 / ln(1 + i)
regra do 72: n ≈ 72 / (taxa em %)
```

**(a) R$ 1.000,00 a 10% ao mês por 12 meses.**

| Mês | Juros simples | Juros compostos | Diferença |
|---|---|---|---|
| 1 | R$ 1.100,00 | R$ 1.100,00 | R$ 0,00 |
| 2 | R$ 1.200,00 | R$ 1.210,00 | R$ 10,00 |
| 3 | R$ 1.300,00 | R$ 1.331,00 | R$ 31,00 |
| 6 | R$ 1.600,00 | R$ 1.771,56 | R$ 171,56 |
| 12 | **R$ 2.200,00** | **R$ 3.138,43** | **R$ 938,43** |

No primeiro mês os dois são iguais; a diferença nasce no segundo mês (os R$ 10 são o juro sobre o juro do primeiro mês). Fator composto em 12 meses: 3,138428.

**(b) R$ 1.000,00 a 1% ao mês.**

| Prazo | Juros simples | Juros compostos | Compostos ÷ simples |
|---|---|---|---|
| 10 anos (120 meses) | R$ 2.200,00 | R$ 3.300,39 | 1,50 |
| 20 anos (240 meses) | R$ 3.400,00 | R$ 10.892,55 | 3,20 |
| 30 anos (360 meses) | R$ 4.600,00 | **R$ 35.949,64** | 7,82 |

1% ao mês capitalizado dá 12,6825% ao ano, não 12%.

**(c) Em quantos meses uma dívida dobra, em juros compostos.**

| Taxa | Exato (ln 2 / ln(1+i)) | Regra do 72 | Erro da regra |
|---|---|---|---|
| 10% ao mês | 7,27 meses | 7,20 | 0,07 mês a menos (1,0%) |
| 5% ao mês | 14,21 meses | 14,40 | 0,19 mês a mais (1,4%) |
| 2% ao mês | 35,00 meses | 36,00 | 1,00 mês a mais (2,8%) |

Em meses inteiros: a 10%, no 7º mês a dívida está em 1,95 vez e no 8º em 2,14 vezes; a 5%, 1,98 no 14º e 2,08 no 15º; a 2%, 1,9999 no 35º. A regra do 72 é boa o bastante pra falar em voz alta ("mais ou menos sete meses"), e erra mais nas taxas baixas.

**Conferências extras:**
- Exemplo do Caderno do BCB: R$ 1.000 a 5% ao mês por 6 meses dá R$ 1.300,00 (simples) e R$ 1.340,10 (compostos). **Bate.**
- Helena e Marta, do Caderno: Helena com depósito no início do mês dá R$ 148.786,59 (o caderno diz R$ 148.786,58: um centavo de arredondamento); Marta com depósito no fim do mês dá R$ 150.677,26 (bate). Com a mesma convenção pras duas, Marta teria R$ 151.430,64 (início do mês, que é o padrão da Calculadora do Cidadão) ou Helena R$ 148.046,35 (fim do mês). A conclusão do caderno não muda.
- Taxas do BCB de julho de 2026, mensal elevada a 12: rotativo 15,02% ao mês dá 436,14% ao ano (BCB: 436,15%); cheque especial 7,47% dá 137,38% (BCB: 137,30%). As séries anual e mensal do BCB são a mesma taxa em unidades diferentes, com diferença de arredondamento.
- A 15,02% ao mês, os juros compostos igualam o valor da dívida em 4,95 meses. Ou seja, **sem o teto de 100%, uma dívida que ficasse só rendendo à taxa média do rotativo dobraria em menos de cinco meses.**
- (1 + 1/n)ⁿ: n = 1 dá 2; n = 2 dá 2,25; n = 12 dá 2,613035; n = 365 dá 2,714567; n = 1.000.000 dá 2,718280; e = 2,718282. (Serve pro extra do item 9.)

---

### 9. Extra: Richard Witt (1613), Jacob Bernoulli e Euler

**Parcial. Witt confirmado na obra original; Bernoulli e Euler só em MacTutor e numa tradução acadêmica. Vai para um extra, não para o episódio.**

**a) Richard Witt, *Arithmeticall Questions*, Londres, 1613.** Lido no exemplar digitalizado do Internet Archive (coleção Early English Books, microfilme, 190 imagens). A dedicatória termina com "London: May 18. 1613." Trechos do OCR, com o "ſ" longo trocado por "s" e erros evidentes de leitura corrigidos:
- Ao leitor: "Here thou hast (Gentle Reader) a Table, and certaine Breviats, which may availe thee briefly to resolve divers needfull Questions of Arithmeticke; concerning such Reckonings, wherein there is allowance for forbearance of money".
- A definição de juros compostos, 1613: "This kinde of increase is equall to the gaine which men make, when they put out money at Interest, after 10. per 100. per Annum, Interest, and Interest upon Interest. Which is, when the Principall doth encrease one tenth part of it selfe, by the end of the first yeare: and at the end of the first yeare, the first Principall, together with the increase obtained the first yeare, is accounted as a new Principall, put out in like sort for the second yeare."
- A tabela do livro é sempre a 10 por cento: "the Interest, in every conclusion wrought by this Table, is alwayes reckoned to be 10. per 100. per Annum, Interest, and Interest upon Interest".
  https://archive.org/details/bim_early-english-books-1475-1640_arithmeticall-questions-_witt-richard_1613
- Secundária (artigo de história atuarial, só metadados lidos no Crossref): C. G. Lewin, "An Early Book on Compound Interest: Richard Witt's *Arithmeticall Questions*", *Journal of the Institute of Actuaries*, v. 96, n. 1, p. 121-132, jun. 1970. DOI 10.1017/s002026810001636x.

**b) Jacob Bernoulli.** MacTutor, "The number e" (J J O'Connor e E F Robertson, atualizado em setembro de 2001), literal: "In 1683 Jacob Bernoulli looked at the problem of compound interest and, in examining continuous compound interest, he tried to find the limit of (1 + 1/n)^n as n tends to infinity. He used the binomial theorem to show that the limit had to lie between 2 and 3 so we could consider this to be the first approximation found to e."
- **Não confirmei o 1683 em fonte primária.** O texto publicado que achei é de **1690**: "Quaestiones nonnullae de usuris, cum solutione Problematis de Sorte Alearum", *Acta Eruditorum*, maio de 1690, p. 219-223 (título e dados conferidos na página e na tradução parcial de Richard J. Pulskamp, Xavier University, 2009, secundária; o trecho traduzido é o dos dados, não o dos juros).
  https://mathshistory.st-andrews.ac.uk/HistTopics/e/ · https://probabilityandfinance.com/pulskamp/JakobBernoulli/JakobB.html

**c) Euler e a letra e.** MacTutor, mesmo artigo, literal: "the notation e made its first appearance in a letter Euler wrote to Goldbach in 1731" e "it was not until 1748 when Euler published *Introductio in Analysin infinitorum* that he gave a full treatment of the ideas surrounding e". Sobre o nome: "The claim which has sometimes been made, however, that Euler used the letter e because it was the first letter of his name is ridiculous." A carta e o *Introductio* não foram lidos.
- MacTutor também registra que o número apareceu antes, "in 1618 when, in an appendix to Napier's work on logarithms, a table appeared giving the natural logarithms of various numbers", sem que ninguém reconhecesse a base.

---

## Ajustes (o que se costuma dizer contra o que a fonte diz)

1. **"Juros sobre juros é proibido no Brasil."** Para banco, não é, desde 31/03/2000, se estiver no contrato (MP 2.170-36, art. 5º; Súmula 539 do STJ). A proibição da Lei de Usura (art. 4º) e a Súmula 121 do STF não valem para instituições financeiras (Súmula 596 do STF e, desde 2024, art. 3º da Lei 14.905).
2. **"O STF decidiu em 2015 que a capitalização é constitucional."** Em 2015 (RE 592.377) o STF decidiu que a MP tinha relevância e urgência. O mérito foi julgado na **ADI 2.316, em junho de 2024**.
3. **"A MP 1.963-17 é de 31/03/2000."** É de **30/03/2000**, publicada em 31/03/2000.
4. **"O Código Civil só permite capitalização anual."** Era o texto original do art. 591; a Lei 14.905/2024 tirou essa frase.
5. **"O juro do rotativo está limitado a 100% ao ano."** Não existe teto de taxa: a média de julho de 2026 é 436,15% ao ano. O limite é sobre o **total acumulado** de juros e encargos, que não pode passar do valor original da dívida.
6. **"O teto vale desde 1º (ou 2) de janeiro de 2024."** O BCB diz **3 de janeiro de 2024**.
7. **"A Res. 4.655/2018 consolidou as regras do rotativo."** A 4.655 tratava de encargos de atraso e foi revogada em 2022. A regra do rotativo continua na **Res. 4.549/2017**.
8. **"O banco é obrigado a cobrar pelo menos 15% de pagamento mínimo."** Esse piso acabou em **1º/06/2018**; hoje o mínimo é o do contrato, avisado com 30 dias de antecedência.
9. **"A norma do CET é a Res. 3.517/2007."** Revogada desde 1º/02/2021; a de hoje é a **Res. CMN 4.881/2020**.
10. **"Cheque especial tem teto de 8% ao ano."** É **8% ao mês**, o que capitalizado dá cerca de 151,8% ao ano.
11. **"15% ao mês é 180% ao ano."** Isso é multiplicar, que é conta de juros simples. Em compostos, 15,02% ao mês é 436% ao ano: a diferença é o próprio assunto do episódio.

---

## Não confirmado

1. **Se o IOF fica fora do teto de 100%.** A lei e a Res. CMN 5.112 não falam em IOF; só a imprensa (Exame, 21/12/2023) diz que fica de fora, sem citar fonte.
2. **A data de 3/01/2024 numa página do próprio bcb.gov.br.** Li a nota do BCB reproduzida pelo COAD e no perfil oficial do BCB no LinkedIn; a lista de notícias do site do BCB não alcança 2024.
3. **Série pública separada de rotativo "regular" e "não regular"** no SGS ou no portal de dados abertos. O que está publicado é o rotativo total (22022 e 25477).
4. **Como fica o teto no cartão consignado.** A Res. 4.549 exclui os cartões com fatura descontada em folha; a lei não traz a exceção expressa.
5. **O "1683" de Jacob Bernoulli** em fonte primária. A publicação que achei é de 1690 (*Acta Eruditorum*); o trecho sobre juros não foi lido no original.
6. **A carta de Euler a Goldbach (1731) e o *Introductio* (1748)** não foram lidos; as datas vêm só do MacTutor.
7. **A fórmula do CET** (art. 4º da Res. CMN 4.881/2020): está em imagem no texto e não foi extraída.

---

## Alertas pro roteiro

1. **É educação, nunca recomendação.** Nada de dizer onde pegar crédito, que banco cobra menos, nem que produto usar. As taxas do episódio são médias do mercado publicadas pelo BCB, sem nome de instituição.
2. **Sempre dizer a unidade: ao mês ou ao ano.** 15,02% ao mês e 436,15% ao ano são a mesma taxa do rotativo (julho de 2026). Trocar uma pela outra, ou multiplicar a mensal por 12, é o erro que o episódio existe para desmontar.
3. **Dizer que é taxa média e de qual mês.** "Em julho de 2026, a taxa média do rotativo foi de 436% ao ano, segundo o Banco Central." O dado de julho é preliminar e pode ser revisto; números antigos também mudam (o voto do CMN de 2023 cita 482,05% ao ano em novembro de 2016; a série de hoje mostra 494,82% para o mesmo mês).
4. **O teto de 100% não é teto de taxa.** Ele limita o total acumulado de juros e encargos ao valor original da dívida: quem devia R$ 100 pode chegar a dever no máximo R$ 200. Não dizer "os juros agora são de no máximo 100%".
5. **O teto tem limites:** só para rotativo e parcelamento de fatura, só para operações a partir de 3/01/2024, e a resolução exclui o cartão consignado. Não dizer que "nenhuma dívida de cartão passa do dobro".
6. **Não citar piso de pagamento mínimo.** Não existe desde 2018. O que a norma garante é que o rotativo não fica mais de uma fatura no rotativo (Res. 4.549/2017).
7. **Não dizer "juros sobre juros é ilegal".** Pode dizer que a Lei de Usura de 1933 proibia "contar juros dos juros" e que, para bancos, a capitalização mensal é permitida desde 2000, se estiver no contrato. Evitar qualquer frase que soe como orientação jurídica ("dá pra processar o banco").
8. **Se citar o STF, citar certo.** "Em 2024 o Supremo confirmou que a regra é constitucional" (ADI 2.316). Não atribuir ao julgamento de 2015 o que ele não decidiu.
9. **O vocabulário do BCB é "juros capitalizados" e "período de capitalização".** O Caderno usa literalmente "juros sobre juros" como apelido dos compostos: dá para atribuir ao Banco Central.
10. **"Juros simples praticamente não existem na prática"** é frase do Caderno do BCB, mas a própria Calculadora do Cidadão usa juros simples na correção pela Taxa Legal. Se usar a frase, dizer que é sobre empréstimo e aplicação.
11. **Helena e Marta, do Caderno, usam convenções diferentes** (uma deposita no início do mês, a outra no fim). Se o roteiro usar o exemplo, usar os números do Caderno como estão e não refazer a conta no ar; ou montar um exemplo próprio com uma convenção só.
12. **A regra do 72 é aproximação.** Dizer "mais ou menos", e preferir o número exato quando ele for o gancho (a 10% ao mês, a dívida dobra em pouco mais de 7 meses).
13. **Cheque especial: 8% ao mês é teto, e a média está perto dele** (7,47% em julho de 2026). Não dizer que o cheque especial "ficou barato".
14. **O CET é anual e é o número para comparar** (Res. CMN 4.881/2020). Na fatura, desde 1º/07/2024, as opções de financiamento aparecem com taxa mensal, anual e CET, da mais barata para a mais cara. Não prometer que "toda fatura mostra X" além do que está no art. 9º da Res. BCB 96.
15. **Extra histórico: não dizer que Euler batizou o e com a inicial do nome** (o MacTutor chama isso de "ridiculous") e não cravar 1683 para Bernoulli sem a ressalva de que a publicação é de 1690.

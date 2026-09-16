# Série: Finanças

**Estado (16/09/2026):** o `1.01` está gravado e o plano inteiro foi commitado na `main` (`67fa3eb`). No site, só o card da home (15/09, a pedido dele: "adiciona pra testar", série 07 `Finanças`, "Em preparação", com capa), que subiu **desligado** no deploy de 16/09.
- A pasta `SEIRES/FINANCAS/` tem `plano/serie/` (este plano e o `_pesquisa-inicial.md`), `_arquivos/capa-serie/` e a primeira pasta de etapa, `01 - O dinheiro do mes/`, criada sem acento (P18 continua aberta pro resto).
- O `1.01` tem pesquisa, planta, trio e áudio; os outros 24 episódios não têm nada, e nenhuma página existe. O card e a entrada no `menu.js` entraram antes da P1 e da P2 (15/09, pra ele ver na home): nome `Finanças`, última posição (07), ícone emprestado do ábaco. O nome fechou na D3; a P2 continua aberta.
- Das decisões deste plano, só D1 e D2 são dele. O resto é proposta e está em Pendências, cada uma com a recomendação.
- Revisado em 15/09/2026 com duas leituras críticas (fatos, compliance e indícios): nome da empresa inventada trocado, regras de imposto e de CVM corrigidas, casos históricos com a fonte certa.

**Formato:** episódios NotebookLM via `/criar-podcast` (trio por episódio), cada um com a sua `animacao.html` no molde das outras séries e pelo menos uma tela que se mexe com dado que não muda sozinho (semente fixa). A série e cada etapa têm também um episódio só de áudio, o `00`, como na D8 da Hardware.
**Fonte:** pesquisa pública com fonte primária (seção Fatos conferidos). O estudo privado do Flávio mora fora deste repositório (P9, P20).
**Capa:** `site/img/serie-financas.webp` (15/09/2026, Flow em modo imagem, escolha dele: o porquinho e a tela da corretora na mesa, na luz clara da capa do Java Web; original e prompt em `FINANCAS/_arquivos/capa-serie/`). Da P17 fica só a arte das etapas.
**Artes das 6 etapas:** a fazer (P17), `site/img/financas-etapa-01.webp` a `-06.webp` (1200x670).
**Como fazer cada coisa** (episódio público, página com áudio, subir o site): por enquanto a receita da Hardware, `HARDWARE/plano/_COMO-FAZER.md`, até esta série ter o seu `FINANCAS/plano/_COMO-FAZER.md` (P21).

---

## A tese

Dinheiro não é sorte nem segredo de quem entende. É **conta, tempo e risco**, e os três aparecem em tudo: na fatura do cartão, no rendimento da reserva, na nota de corretagem e em trocar uma ação por outra da mesma empresa.

A série sobe do dinheiro do mês até a bolsa. Trocar entre papéis parecidos (o pairs trading) é **um dos assuntos, e chega no fim**: só depois de quem ouve saber medir o normal de um número, pagar a tarifa das duas pontas, calcular o imposto do mês em que vendeu e reconhecer um par que não volta.

**Educação, nunca recomendação.** Nenhum episódio diz o que comprar ou vender. Todo ganho é medido em reais, depois de custo e imposto, ao lado do que teria acontecido sem fazer nada. Todo episódio fecha dizendo **onde aquilo aparece** fora da tela: no extrato, na fatura, na nota de corretagem, no informe de rendimentos.

## Quem está na bancada

- **Professor:** o Claude. Mostra a conta antes da regra e o jeito de dar errado no mesmo episódio.
- **Aluno:** o Flávio. Estuda o assunto no acervo privado, fora deste repositório. O que vira episódio é o raciocínio, com fonte pública (P9, P10).
- **O objeto (proposta, P4):** **o cofrinho**. É um objeto, sem pessoa e sem voz, com números redondos e inventados. Ele muda de etapa em etapa:
  1. é a sobra do mês, que vira reserva;
  2. passa a render, e aprende a separar rendimento bruto de real;
  3. uma parte vira ações da **Companhia Exemplo S.A.** (nome provisório, P4), empresa inventada com classes ON e PN, sem código de negociação;
  4. ganha um livro-caixa com preço médio, total vendido no mês e imposto;
  5. o livro-caixa ganha a régua da média e do desvio;
  6. simula trocar entre a ON e a PN da Companhia Exemplo e voltar semanas depois, com placar em ações, em reais, com custo, imposto e o caso do par que não volta.

## Arco da série

Uma pergunta única atravessa tudo: **como a sobra do mês vira reserva, rendimento, ações de uma empresa e, no fim, uma troca entre duas classes da mesma empresa, sabendo quanto cada passo custa, quanto paga de imposto e onde pode dar errado?**

**Regras que seguram tudo:**

*Herdadas das outras séries: 2, 9 e 10. As outras são proposta até ele aprovar, cada uma apontando a pendência.*

1. **Educação, nunca recomendação** (proposta, P11). Nenhum episódio diz compre, venda ou troque. Nenhum mostra razão, z ou banda de papel negociado hoje, nem em recorte congelado. A linguagem é serena: sem promessa de rentabilidade, sem ganho garantido e sem garantia de que a distância da média se desfaz. O aviso em voz alta não protege sozinho. O que protege é o conteúdo não recomendar.
2. **A série é nossa, sem indício de estudo privado** (herdada, D1 e D7 da Hardware). O assunto é público e entra: razão entre preços, média, desvio padrão, bandas, pairs trading, sempre com fonte pública e exemplo próprio. A lista do que não se diz mora fora deste repositório (P9).
3. **O mesmo objeto do começo ao fim** (proposta: o cofrinho, P4). Toda etapa deixa o cofrinho mais bem cuidado. Etapa que não deixou está errada.
4. **Ganho se mede em reais** (proposta). Toda simulação mostra o patrimônio em reais, depois de custo e imposto, ao lado de "só segurar" e do dinheiro parado rendendo. Mais ações não é mais dinheiro.
5. **Toda troca é uma venda e entra na conta do imposto** (proposta, sobre a regra da Receita). A venda soma no total vendido em ações no mês. Se esse total passar de R$ 20.000,00, o ganho líquido do mês inteiro paga 15% (Receita, consultada em 15/09/2026). Trocar não adia imposto.
6. **Todo método vem com o jeito de dar errado** (proposta), no mesmo episódio: juros com a dívida, renda fixa com a inflação, o risco de crédito do emissor e a marcação a mercado, ação com a queda, a troca com o par que não volta. **O par que não volta tem episódio próprio (6.05).**
7. **A tela se mexe, com dado que não muda sozinho** (a tela que se mexe vem da D4; o resto é proposta). Série sintética com semente fixa escrita no código (a mesma curva a cada carga), e o estado inicial é o que o áudio descreve. Sorteio só por botão, com "voltar ao exemplo" ao lado. Recorte histórico real só de casos acadêmicos encerrados (Royal Dutch e Shell, Unilever, LTCM), com data e fonte. Nenhum papel negociado hoje na B3, nem congelado. Nunca dado ao vivo.
8. **Regra tem data e fonte** (proposta, P12). Número de imposto, tarifa ou norma sai com "consultado em DD/MM/AAAA" e a fonte primária no `_pesquisa.md`. "Vigente" só quando a fonte mostra a vigência. Fato só em fonte secundária entra apenas com a fonte dita ("segundo a reportagem de 1989", "segundo historiadores da matemática"), nunca como fato seco. O que não fechou em fonte nenhuma fica fora do áudio.
9. **Todo episódio diz onde aquilo aparece fora da tela** (herdada da tese das outras séries).
10. **O áudio chama os extras pelo nome, e extra diz quem descobriu** (herdada, D9 e D10 da Hardware).

---

## As 6 etapas

| # | Etapa | O que o cofrinho ganha | Eps | Status |
|---|---|---|---|---|
| 1 | **O dinheiro do mês** | nasce como sobra e vira reserva de emergência | 4 | 🟠 |
| 2 | **Emprestar o dinheiro** | a reserva passa a render, medida em reais de hoje | 3 | 🔴 |
| 3 | **Virar sócio** | vira ações da Companhia Exemplo, e descobre quem está do outro lado da ordem | 5 | 🔴 |
| 4 | **O leão e o pedágio** | ganha um livro-caixa: preço médio, vendas do mês e imposto | 3 | 🔴 |
| 5 | **A régua da média** | o livro-caixa ganha média, desvio, z e bandas | 4 | 🔴 |
| 6 | **Trocar entre parecidos** | simula a ida e volta entre a ON e a PN da Companhia Exemplo, com o placar honesto e o par que não volta | 6 | 🔴 |

Status: 🔴 não iniciado · 🟠 parcial · 🟢 tudo publicado
**Placar:** 0 publicados · 25 pela frente (fora os 7 episódios `00` e os extras).

---

## Etapa 1 - O dinheiro do mês

*Antes de investir, sobrar. O cofrinho nasce da conta do mês e aprende que juros sobre juros trabalham contra na dívida e a favor na aplicação.* Depende de pesquisa nova (P13).

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Para onde vai o salário** | entrada, gasto fixo, gasto variável e sobra. Por que a sobra vem antes de qualquer investimento. Tela: a barra do mês com fatias arrastáveis (aluguel, mercado, lazer), e a sobra cresce ou some conforme o arrasto | 🟠 **16/09: pesquisa, planta de 12 telas, trio e áudio v1 prontos.** Pesquisa em fonte primária (8 dos 9 itens); filmes da etapa levantados por busca com a ressalva de cada um; trio **reprovado pelo verificador na primeira volta** e corrigido em 16 pontos (a conta do INSS pulava a faixa de 12%, os 92,6% estavam sobre a base errada, 28,85% virou 28,8 e a chamada de extra abria o assunto). Áudio **"Para onde vai seu salário de verdade", 15:23**, no notebook `81cda56f`. **Mapa de telas conferido: 12 telas e 11 pedidos, batendo com a planta**, e a frase de precisão do imposto saiu inteira ("a tabela em si não mudou a isenção"). Ressalvas confirmadas no áudio com o modelo maior, pra ele ouvir: o Datafolha saiu como **"julho de 2020"** quando o campo foi em julho de 2025 (12:58); **"PTU"** em vez de IPTU (04:39); "é uma temática fria" onde seria matemática fria (04:50); e um **"genial"**, palavra proibida, na tela 8, com autocorreção na frase seguinte. Falsos alarmes do modelo pequeno, já descartados: "R$ 2.026", "39,13" (o áudio diz 39,3), "Super Individamento" e "Contrachec". **Falta:** ele ouvir e a página |
| `02` | **Juros sobre juros** | juros simples e compostos. O mesmo motor na dívida do cartão e no dinheiro aplicado, com taxas inventadas. O tempo é a variável que mais pesa. Chama o extra *Juros sobre juros tem história*. Tela: controles de taxa e de anos desenhando a curva da dívida e a da aplicação, e um botão que troca simples por composto | 🔴 |
| `03` | **O preço que anda sozinho** | inflação e poder de compra. O IPCA como índice oficial (IBGE, divulgado desde 01/1980) e o sistema de metas (Decreto 3.088/1999, substituído pela meta contínua do Decreto 12.079/2024 a partir de 01/01/2025, com o texto a conferir no Planalto). Chama o extra *Quem mede a inflação*. Tela: um carrinho de compras que encolhe conforme o controle de anos avança | 🔴 |
| `04` | **A reserva antes de tudo** | reserva de emergência e liquidez (a palavra volta na etapa 6). Por que dinheiro que pode fazer falta amanhã não vai pra bolsa. Tela: meses de gasto guardados contra os imprevistos de um exemplo fixo (botão de sortear outros, com "voltar ao exemplo"), e um botão mostrando a reserva aplicada em ações num mês de queda | 🔴 |

*A etapa tem também o episódio `00 - A etapa inteira` (só áudio).*

**Fecha quando:** o cofrinho tem sobra todo mês, a diferença entre juro simples e composto está na tela, e existe uma reserva que dá pra sacar.
**Aparece em:** fatura do cartão, prestação do crediário, preço do mercado de um ano pro outro.

## Etapa 2 - Emprestar o dinheiro

*O cofrinho parado perde pra inflação. Emprestar pro governo ou pro banco faz a reserva render, e aí começa a pergunta que a série não larga: quanto rendeu de verdade?* Depende de pesquisa nova (P13).

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **A taxa que puxa as outras** | a taxa Selic (meta definida pelo Copom, instituído em 20/06/1996) separada do sistema Selic, de 1979. CDI e Taxa DI, e o que quer dizer "100% do CDI". Chama o extra *As duas Selic*. Tela: uma alavanca da Selic que arrasta a Taxa DI, o rendimento da reserva e a taxa de um crediário novo; a prestação de um crediário já contratado, prefixado, fica parada | 🔴 |
| `02` | **Emprestar pro governo e pro banco** | título público prefixado, atrelado à inflação e atrelado à Selic, e por que o prefixado cai de preço quando os juros sobem (marcação a mercado). CDB, rendimento em porcentagem do CDI, risco de crédito do emissor e o limite da garantia do FGC. Nada disso está na pesquisa: fonte primária antes da planta. Tela: a gangorra dos juros contra o preço do prefixado | 🔴 |
| `03` | **Quanto rendeu de verdade** | rendimento nominal e real: tirar imposto, custo e inflação. É a primeira vez que a série compara tudo em reais de hoje, e a etapa 6 repete a regra. Tela: três barras que encolhem uma depois da outra (rendeu, depois do imposto, depois da inflação) | 🔴 |

*A etapa tem também o episódio `00 - A etapa inteira` (só áudio).*

**Fecha quando:** a tela diz quanto a reserva inventada rendeu em reais de hoje, depois do imposto e da inflação.
**Aparece em:** o rendimento no app do banco, a notícia "o Copom mexeu na Selic", a taxa oferecida num financiamento novo.

## Etapa 3 - Virar sócio

*Uma parte do cofrinho vira ações da Companhia Exemplo. A ação é um pedaço da empresa, o preço nasce num livro de ofertas, e sempre tem alguém do outro lado.*

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Um pedaço da empresa** | ON e PN pela Lei 6.404/1976. A ordinária vota. A preferencial tem prioridade em dividendo ou reembolso (art. 17), e o dividendo 10% maior é **uma** das vantagens possíveis, não regra fixa. PN sem voto ou com voto restrito é no máximo 50% do total emitido (art. 15, §2º) nas companhias novas; as abertas que já existiam em 2001 podem manter até 2/3 (Lei 10.303/2001, art. 8º, §1º, texto a conferir). A PN sem voto passa a votar se a companhia deixar de pagar o dividendo fixo ou mínimo pelo prazo do estatuto, que não pode passar de 3 exercícios seguidos, e vota até o pagamento (art. 111, §1º). Holding e controlada: controladora é quem tem, de modo permanente, preponderância nas deliberações e o poder de eleger a maioria dos administradores (art. 243, §2º). Tela: a pizza do capital da Companhia Exemplo em ON e PN, com a trava dos 50% (empresa nova) e uma nota sobre a exceção de 2/3. Um segundo anel mostra só as ON, que votam, e a Exemplo Participações vira controladora quando os votos dela garantem a maioria na assembleia (a fatia ON, não a pizza inteira), com a nota "dá pra controlar com menos, quando o resto está espalhado" | 🔴 |
| `02` | **O livro de ofertas** | ordem limitada e a mercado, spread, escorregamento, validade da ordem. Lote padrão, em geral de 100 ações, e mercado fracionário (1 a 99, letra F no código), com menos negócios e preço que pode ser diferente do lote padrão. Chama o extra *O pregão que virou tela*. Tela: livro de ofertas animado de um papel inventado, com uma ordem a mercado de tamanho arrastável comendo os níveis e a chave lote/fracionário alargando o spread | 🔴 |
| `03` | **Quem está do outro lado** | corretora e B3. A tarifa da B3 em cada ponta: 0,0300% sobre o valor pra quem negocia em média até R$ 3 milhões por dia no mês, fora do day trade, conforme a tabela da B3 consultada em 15/09/2026 (a página não mostra vigência). Corretagem é livre, e corretagem zero não zera a tarifa. A câmara da B3 no meio da liquidação (sem pesquisa ainda, P13). RLP: com autorização prévia e expressa do cliente, a corretora ou uma empresa do grupo pode ser a contraparte. Em ações vale só pra uma lista de papéis e, pela decisão da CVM de 13/08/2024, segue em fase experimental por 18 meses contados da implantação (a B3 implantou as regras novas em 03/11/2025): conferir antes de gravar. Tela: a nota de corretagem inventada se monta linha por linha (valor, tarifa da B3, corretagem, IRRF). Ao lado, um livro de ofertas em que a chave RLP mostra a ordem de varejo sendo atendida pela oferta do intermediário, com a frase fixa: a nota não diz quem estava do outro lado | 🔴 |
| `04` | **O preço que dá um degrau** | proventos e data ex (explicada na primeira vez), desdobramento e grupamento, e por que o gráfico precisa de preço ajustado. ON e PN podem pagar valores diferentes, e a razão entre as duas dá salto falso sem ajuste. Dividendo não é sempre isento: desde 01/2026, se uma mesma empresa paga mais de R$ 50.000,00 no mês à mesma pessoa física, a empresa retém 10% sobre o valor total do mês (Lei 15.270/2025, texto a conferir no Planalto). O JCP sempre teve imposto na fonte, que teria passado a 17,5% em 2026 (LC 224/2025, visto só em fonte secundária: conferir antes da planta). Tela: linha de preço com um dividendo e um desdobramento, e a chave bruto/ajustado apagando os degraus e o salto da razão desenhada embaixo | 🔴 |
| `05` | **Sobe e desce** | volatilidade, risco da empresa e risco do mercado, diversificação e concentração (ter as duas classes da mesma empresa não diversifica nada). Bolha. Day trade só como dado de risco, e só depois de ler a fonte (P13). Perfil do investidor em uma frase, também depois da pesquisa (Res. CVM 30/2021, P13). Chama o extra *O que é uma bolha*. Tela: carteira com 1 empresa inventada contra carteira com 10, com um exemplo fixo de quedas e um botão de sortear outras, ao lado de "voltar ao exemplo" | 🔴 |

*A etapa tem também o episódio `00 - A etapa inteira` (só áudio). Aviso de risco em voz alta daqui em diante (P11).*

**Fecha quando:** a Companhia Exemplo existe na tela com ON e PN, uma ordem entra no livro de ofertas e a nota de corretagem mostra a tarifa das duas pontas.
**Aparece em:** a nota de corretagem, o aviso de dividendo no extrato, a manchete "a bolsa caiu 2%".

## Etapa 4 - O leão e o pedágio

*O cofrinho ganha um livro-caixa. Cada venda tem custo, soma no mês e pode pagar imposto, e quem apura e paga é o investidor.* Todo número desta etapa sai com "consultado em 15/09/2026" e passa por revisão de contador antes de publicar (P12).

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **O preço médio** | custo de compra. As despesas da compra somam ao custo e as da venda saem do valor vendido. Ganho líquido é venda menos custo. Vender tudo de um papel realiza o ganho e fecha o preço médio dele; o papel comprado começa com preço médio próprio, e ON e PN têm preço médio separado. Chama o extra *A partida dobrada*. Tela: um livro-caixa que recalcula o preço médio a cada compra arrastada pra dentro | 🔴 |
| `02` | **Os R$ 20 mil são de venda** | 15% sobre o ganho líquido do mês nas operações comuns. Isenção quando o **total vendido** em ações no mês fica até R$ 20.000,00: o limite é sobre a venda, não sobre o lucro. Passou do limite, o ganho líquido do mês inteiro é tributado, não só o que passou. ETF de ações e bônus de subscrição ficam fora da isenção. Day trade: compra e venda do mesmo ativo no mesmo pregão, pela mesma corretora (Receita; conferir na IN RFB 1.585/2015, art. 65, antes da planta), paga 20% e não tem isenção. A MP 1.303/2025, que criava alíquota única, perdeu a eficácia em 08/10/2025. Units e isenção **não entram no áudio**. Tela: um termômetro das vendas do mês passando dos R$ 20 mil, e uma régua de horário de dois pregões em que a ida e a volta no mesmo dia viram day trade | 🔴 |
| `03` | **O DARF é seu** | o investidor apura e paga pelo DARF 6015 até o último dia útil do mês seguinte. DARF abaixo de R$ 10 soma nos meses seguintes. O dedo-duro (explicado na primeira vez: retenção de 0,005% da venda e de 1% do resultado do day trade) é só antecipação, e a corretora não paga o imposto por ninguém. Prejuízo compensa no mesmo mês ou nos seguintes, nunca em meses anteriores, e o de day trade só com day trade. A Receita tem ferramenta própria de apuração, o ReVar. Tela: 12 meses inventados, todos com vendas acima de R$ 20.000,00 e sem day trade, em que um prejuízo é compensado no mesmo mês e nos seguintes, com o DARF de cada mês mudando | 🔴 |

*A etapa tem também o episódio `00 - A etapa inteira` (só áudio).*

**Fecha quando:** pra um mês inventado, a tela diz se tem imposto, quanto, até quando e com qual DARF.
**Aparece em:** a declaração anual, o informe de rendimentos, a nota de corretagem do mês.

## Etapa 5 - A régua da média

*O livro-caixa ganha régua: dá pra dizer se um número está perto ou longe do normal dele, e quanto. A régua serve primeiro pra um preço e, só no fim, pra razão entre dois.*

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **O normal de um número** | média, média móvel (janela curta treme, janela longa atrasa) e desvio padrão, com as duas contas: dividir por n (populacional) ou por n-1 (amostral). Cerca de 68% dos pontos dentro de 1 desvio e 95% dentro de 2 na distribuição normal, e por que preço de mercado tem cauda gorda (explicada na primeira vez). Chama o extra *Karl Pearson e o desvio padrão*. Tela: nuvem de pontos de semente fixa com as faixas de 1 e 2 desvios, as duas contas do desvio lado a lado, slider de janela, e um botão de cauda gorda que injeta dias extremos e mostra a faixa mentindo | 🔴 |
| `02` | **A distância da média** | z = (valor menos média) dividido pelo desvio. Regressão à média como tendência estatística, nunca promessa, e a média que pode mudar de lugar. Chama o extra *Galton e a regressão à média*. Tela: arrastar um ponto e ver o z andar numa régua de -3 a +3, com um botão que muda a média de lugar | 🔴 |
| `03` | **As bandas** | banda é média mais ou menos k desvios: o z desenhado. O padrão publicado por John Bollinger (20 períodos, 2 desvios, desvio populacional). N barras não é N dias: 20 barras diárias são perto de um mês de pregões, e 20 barras de uma hora cobrem só alguns pregões (a conta exata depende do horário do pregão, conferir na B3). Faixa estreita dá mais toques, faixa larga dá toques raros. Chama o extra *John Bollinger e as bandas*. Tela: série sintética de semente fixa, controle de janela de 5 a 100 começando em 20, k contínuo de 0,5 a 3 começando em 2, contador de toques e seletor de barra (diária ou de uma hora) dizendo quantos pregões a janela cobre | 🔴 |
| `04` | **Andar junto não é voltar junto** | correlação e cointegração. Regressão espúria (Granger e Newbold, 1974). Combinação estacionária (Engle e Granger, *Econometrica*, 1987). Em 2003, Granger ganhou o prêmio de Ciências Econômicas em memória de Alfred Nobel pela cointegração, dividido com Engle, premiado pelo ARCH. No fim, a razão entre duas classes da mesma empresa estreia como "a combinação que talvez fique parada". Chama o extra *Granger, a regressão espúria e a cointegração*. Tela: duas séries sintéticas de semente fixa com tendência e um botão que alterna "parecem juntas sem elo" e "cointegradas", com a combinação embaixo ficando parada ou fugindo | 🔴 |

*A etapa tem também o episódio `00 - A etapa inteira` (só áudio).*

**Fecha quando:** numa série sintética, a tela diz quantos desvios um ponto está longe da média e mostra que correlação alta não garante volta.
**Aparece em:** a faixa de referência do exame de sangue, "temperatura acima da média pra setembro", o controle de qualidade de uma fábrica.

## Etapa 6 - Trocar entre parecidos

*O cofrinho, já em ações da Companhia Exemplo, simula trocar entre as duas classes, começando pela ON (ou deixando quem ouve escolher o lado), com ida e volta separadas por semanas. A conta é curta, o placar é honesto e o episódio que mais importa é o do par que não volta.* A etapa 6 não sobe no site sozinha (P5).

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Dois papéis quase iguais** | por que ON e PN da mesma empresa, units, e holding e controlada andam perto e não juntas: primos, não gêmeos. Units são pacotes de classes da mesma empresa (por exemplo ON e PN) e costumam usar o final 11, que também aparece em ETFs e fundos imobiliários: o final sozinho não diz o que o papel é. O voto, o dividendo e o desconto de holding (caixa, dívida, custos, outros ativos, liquidez). Razão contra diferença em reais. A/B não é o espelho de B/A, e o logaritmo da razão resolve. Chama o extra *Tartaglia e a sala dos pares*. Tela: Exemplo ON e Exemplo PN (semente fixa) com a razão embaixo, botão diferença/razão, botão de inverter com o log equilibrando, e a Exemplo Participações com slider do desconto tirando a razão do lugar | 🔴 |
| `02` | **A conta da ida e volta** | N ações de A com razão r1 viram N·r1 de B. Na volta, com r2, viram N·r1/r2 de A. A quantidade só cresce se a volta for mais favorável que a ida. A venda realiza o ganho do papel vendido, e o papel comprado começa com preço médio próprio. O long & short clássico (vendido num, comprado no outro) contra a variante de só trocar a ação que já se tem, com uma frase: ficar vendido tem aluguel, margem e perda sem teto. Quantidade não é dinheiro. Tela: dois pontos arrastáveis na linha da razão, com placares de ações, reais, "só segurar" e dinheiro parado. O cenário padrão tem uma troca que ganha em ações e perde em reais, uma que perde e um mês sem troca | 🔴 |
| `03` | **Onde o ganho some** | toda troca tem duas pontas e paga a tarifa da B3 nas duas (0,0300% em cada ponta pra quem negocia em média até R$ 3 milhões por dia no mês, fora do day trade, conforme a tabela consultada em 15/09/2026); ida e volta são 4 pontas. Spread, escorregamento, lote padrão e sobra no fracionário. O risco de executar uma perna e não a outra, e o preço de completar a mercado. Cada troca é uma venda: soma no total vendido em ações no mês. Se o total passar de R$ 20.000,00, o ganho líquido do mês inteiro (todas as vendas, menos prejuízos a compensar) paga 15%, não só o que passou do limite (Receita, consultada em 15/09/2026). Ida e volta no mesmo pregão, pela mesma corretora, vira day trade nas duas classes: 20%, sem isenção, retenção de 1%, e a tabela de tarifa da B3 é outra. Trocar não adia imposto. Tela: a mesma troca com interruptores (tarifa, spread, sobra de lote, perna que não executou, imposto) comendo o ganho até virar perda | 🔴 |
| `04` | **O passado sempre parece fácil** | faixa larga ou estreita, e sair na média, na outra banda ou no cruzamento: frequência contra tamanho, e os dias parados. Regra fixa escolhida antes. Dentro e fora da amostra, e o parâmetro escolhido olhando o gráfico. Na versão de trabalho de 1999 (dados de 1962 a 1997), Gatev, Goetzmann e Rouwenhorst abriram a posição a 2 desvios, escolheram os parâmetros de propósito sem otimizar e avisaram que 2 desvios nem sempre cobrem o custo. Na versão publicada em 2006 (1962 a 2002), o retorno ficou em geral acima de estimativas conservadoras de custo. E a queda do retorno nas décadas seguintes: Do e Faff (2010) mediram a queda de 1962 a 2009 e, segundo o resumo do artigo, a atribuíram mais ao aumento do risco de o par não convergir do que à concorrência entre fundos. Resultado de amostra passada, nunca promessa. Chama o extra *O teste dos 40 anos*. Tela: escolher o melhor k olhando o primeiro ano da série sintética de semente fixa, e o botão "aplicar no ano seguinte" derrubando o placar | 🔴 |
| `05` | **O par que não volta** | mudança de patamar: unificação de classes, conversão de PN em ON, oferta pública, migração de segmento, holding vendendo a participação. A banda móvel corre atrás atrasada, e o dinheiro fica preso com custo de oportunidade. Certo cedo demais: alavancagem, chamada de margem e venda forçada. Um caso só, em uma frase: Royal Dutch e Shell dividiam o caixa em 60:40 e mesmo assim se afastaram da paridade por anos (Froot e Dabora, 1999). O resto dos casos fica nos extras. Chama os extras *As gêmeas siamesas* e *O fundo dos Nobel que quase quebrou*. Tela: série sintética de semente fixa com botão "evento" que muda o nível de vez, contador de meses parado, e slider de alavancagem em que o capital zera antes da volta | 🔴 |
| `06` | **Quando todo mundo faz a mesma troca** | a origem, segundo Gatev, Goetzmann e Rouwenhorst: nos anos 1980, o grupo de Nunzio Tartaglia na Morgan Stanley trocou o faro por regra fixa. Agosto de 2007: a explicação de Khandani e Lo é que uma ou mais carteiras grandes desmontaram rápido e arrastaram fundos com posições parecidas. Quando muitos fundos carregam a mesma posição, a saída de um derruba os outros. Aversão à perda e a crença de que toda distância da média se desfaz sozinha. Long & short de verdade (ficar vendido, aluguel, margem) só nomeado. Por que a série não dá sinal, em uma frase: analisar ou recomendar papel específico pra terceiros, de forma profissional, é atividade de analista credenciado (Res. CVM 20/2021) ou de consultor autorizado, se for personalizada (Res. CVM 19/2021), e dizer "não é recomendação" não resolve (CVM, 11/11/2020). Chama os extras *Tartaglia e a sala dos pares* e *A semana em que os fundos de fórmula caíram juntos*. Tela: vários simuladores com a mesma posição, um vende e os outros vão atrás em cascata; e o fecho com camadas ligáveis (custo, imposto, quebra, fora da amostra) terminando numa lista de perguntas, não num sinal | 🔴 |

*A etapa tem também o episódio `00 - A etapa inteira` (só áudio).*

**Fecha quando:** a tela faz a ida e volta na Companhia Exemplo com placar em ações, em reais, contra "só segurar", com tarifa, imposto do mês e o botão do evento que muda a média.
**Aparece em:** trocar dólar antes da viagem esperando o câmbio "voltar", o mesmo produto com preço diferente em duas lojas, o anúncio de renda garantida.

---

## _EXTRAS - os aprofundamentos

Cada extra desce a fundo num assunto que travaria o episódio se fosse explicado no meio dele. São autocontidos: não citam série nem etapa vizinha. Cada um diz quem descobriu, com ficha e fonte primária antes de gravar (D10 da Hardware); o que só tiver fonte secundária entra com a fonte dita (regra 8). A coluna **Ouvir depois de** é recomendação de ordem, não dependência. **Todos são candidatos** até ele aprovar (P14), e entram no fim de `SEIRES/plano/candidatos-a-extra.md`.

| Pasta | Extra | Aprofunda | Ouvir depois de | Status |
|---|---|---|---|---|
| `01` | **Juros sobre juros tem história** | juros compostos e o número e. Quem: Richard Witt, *Arithmeticall Questions* (1613), primeiro livro inteiro sobre juros compostos; Jacob Bernoulli (1683) mostrou que juros capitalizados cada vez mais vezes chegam a um limite; Euler usou a letra e a partir de 1727-1731 (carta a Goldbach, 25/11/1731), a publicou na *Mechanica* (1736) e mostrou o valor 2,718... na *Introductio* (1748). ⚠️ Só fonte secundária: no áudio, "segundo historiadores da matemática", até abrir as obras | 1.02 | 🔴 |
| `02` | **Quem mede a inflação** | como nasce o IPCA e o sistema de metas. Quem: IBGE (IPCA desde 01/1980, com dados de 12/1979) e CMN (Decreto 3.088 de 21/06/1999; Decreto 12.079/2024). ⚠️ Instituição, não pessoa: a P13 decide se ganha ficha | 1.03 | 🔴 |
| `03` | **As duas Selic** | o sistema de custódia e a taxa básica, que dividem o nome. Quem: Banco Central com o mercado representado pela Andima (sistema, 1979) e o Copom (20/06/1996). Datas exatas de 1979 a conferir. ⚠️ Instituição, não pessoa: a P13 decide se ganha ficha | 2.01 | 🔴 |
| `04` | **O pregão que virou tela** | da bolsa de viva-voz ao pregão eletrônico e à B3. Fim do viva-voz de ações da Bovespa em 30/09/2005 (B3); o de derivativos da antiga BM&F seguiu até 30/06/2009 (conferir em fonte da B3). BM&FBOVESPA em 2008; B3 em março de 2017. Quem: a pesquisar em fonte primária. A Bolsa Livre de 23/08/1890 e Emílio Rangel Pestana só aparecem em fonte secundária e ficam fora do áudio até achar documento da Bovespa ou da B3; até lá, o áudio diz que a própria B3 conta a história a partir de 1895 | 3.02 | 🔴 |
| `05` | **O que é uma bolha** | preço que se afasta do valor e estoura. É o candidato 59, que o áudio do 10.01 de *Do Ábaco à IA* já promete (P15). Quem: a pesquisar (P13) | 3.05 | 🔴 |
| `06` | **Karl Pearson e o desvio padrão** | de onde vem a medida que a série usa em toda tela das etapas 5 e 6. Quem: Karl Pearson (1857 a 1936) criou o termo em 1893; primeiro uso impresso em *Philosophical Transactions A*, v. 185, p. 80 (1894). O conceito equivale ao erro médio de Gauss. ⚠️ Lido na MacTutor: no áudio, "segundo historiadores da matemática", até abrir o artigo | 5.01 | 🔴 |
| `07` | **Galton e a regressão à média** | regressão à média e por que ela não é promessa. Quem: Francis Galton, "Regression towards mediocrity in hereditary stature", *Journal of the Anthropological Institute*, v. 15, p. 246-263 (1886) | 5.02 | 🔴 |
| `08` | **John Bollinger e as bandas** | por que 20 períodos e 2 desvios, e o desvio populacional. Quem: John Bollinger (site oficial; *Bollinger on Bollinger Bands*, McGraw Hill, 2001). O nome surgiu numa transmissão da FNN. Ano exato a conferir. "Bollinger Bands" é marca registrada dele | 5.03 | 🔴 |
| `09` | **Granger, a regressão espúria e a cointegração** | cointegração e regressão espúria. Quem: Granger e Newbold (1974); Engle e Granger, *Econometrica*, v. 55, n. 2 (1987). Prêmio de Ciências Econômicas em memória de Alfred Nobel anunciado em 08/10/2003: Granger pela cointegração, dividido com Engle, premiado pelo ARCH | 5.04 | 🔴 |
| `10` | **Tartaglia e a sala dos pares** | como nasceu o pairs trading. Quem: Nunzio Tartaglia, Morgan Stanley, meados dos anos 1980 (segundo Gatev, Goetzmann e Rouwenhorst, citando reportagem de 1989). Os US$ 50 milhões de 1987 são "teria lucrado, segundo a reportagem". Gerry Bamberger fica fora do áudio até achar fonte primária | 6.01 | 🔴 |
| `11` | **O teste dos 40 anos** | como se testa uma regra de pares sem trapacear com o passado. Quem: Evan Gatev, William Goetzmann e K. Geert Rouwenhorst (NBER WP 7032, 1999, dados de 1962 a 1997; *Review of Financial Studies*, v. 19, n. 3, 2006, dados até 2002); Do e Faff (*Financial Analysts Journal*, 2010). Cada achado com a versão de onde veio. O estudo não usou cointegração | 6.04 | 🔴 |
| `12` | **As gêmeas siamesas** | Royal Dutch e Shell, a razão fixa que o mercado não respeitou, e o caso Unilever. Uma regra simulada pelos autores (entra com 10% de desvio, sai com 5%) teria aberto Unilever NV contra Unilever PLC em 07/01/1980. O desvio piorou até -39,1% em 18/08/1981, e a posição só fechou em 09/05/1983, com retorno de 0,27% ao mês. Voltou, mas mais de três anos depois, e quem estava alavancado teria sido chamado pra margem antes (de Jong, Rosenthal e van Dijk, 2004, p. 19). Quem: Rosenthal e Young (1990); Froot e Dabora (*Journal of Financial Economics*, v. 53, 1999); de Jong, Rosenthal e van Dijk (2004) | 6.05 | 🔴 |
| `13` | **O fundo dos Nobel que quase quebrou** | a LTCM: alavancagem acima de 25 pra 1, agosto de 1998 e a recapitalização privada de 23/09/1998: 14 bancos e corretoras puseram US$ 3,625 bilhões por 90% do fundo, numa reunião organizada pelo Fed de Nova York, sem dinheiro do Fed. Segundo o livro de Roger Lowenstein (2000), citado por de Jong, Rosenthal e van Dijk, a LTCM montou US$ 2,3 bilhões na troca Royal Dutch/Shell no verão de 1997 e teve de desmontar em 1998, com o prêmio perto de 22%. Quem: John Meriwether fundou em 02/1994; relatório do President's Working Group (04/1999) e GAO GGD-00-3 (29/10/1999) | 6.05 | 🔴 |
| `14` | **A semana em que os fundos de fórmula caíram juntos** | agosto de 2007, quando fundos quantitativos parecidos perderam juntos. Quem: Amir Khandani e Andrew Lo, "What Happened to the Quants in August 2007?" (NBER WP 14465), contando o desmonte rápido de carteiras grandes como a explicação que eles propõem | 6.06 | 🔴 |
| `15` | **A partida dobrada** | o livro-caixa com débito e crédito, avô do preço médio. Quem: Luca Pacioli, *Summa de arithmetica* (1494). ⚠️ Fonte primária a buscar | 4.01 | 🔴 |

*Chamados no áudio (D9, proposta de 15/09/2026, esperando a P14):* 1.02 chama *Juros sobre juros tem história* ("vai ter") e *A Lei de Moore* ("tem", de *Do Ábaco à IA*, conferir se o selo "pra conferir" saiu); 1.03 chama *Quem mede a inflação*; 2.01, *As duas Selic*; 3.02, *O pregão que virou tela*; 3.05, *O que é uma bolha* (o mesmo que o 10.01 de *Do Ábaco à IA* promete); 4.01, *A partida dobrada*; 5.01 a 5.04, os extras 06 a 09; 6.01, *Tartaglia e a sala dos pares*; 6.04, *O teste dos 40 anos*; 6.05, *As gêmeas siamesas* e *O fundo dos Nobel que quase quebrou*; 6.06, *Tartaglia e a sala dos pares* e *A semana em que os fundos de fórmula caíram juntos*. Todos os desta série são "vai ter".

*Candidatos que ainda pedem pesquisa antes de entrar na tabela:* aversão à perda (Kahneman e Tversky, 1979), a meia-vida da volta (Ornstein e Uhlenbeck, 1930), o vendido e o aluguel de ações, o tag along e o Novo Mercado (art. 254-A da Lei 6.404, incluído pela Lei 10.303/2001), e o RLP por dentro.

## Ouvir antes, das outras séries

Episódios já no ar em series.afx.art.br (conferidos no `menu.js` em 15/09/2026). São links, não cópias.

- **A Lei de Moore** (extra 10 de *Do Ábaco à IA*): crescer multiplicando a cada período, a mesma matemática dos juros compostos. Antes do ep 1.02 (conferir se o selo "pra conferir" saiu antes de citar no áudio).
- **O Sistema Decimal** (extra 03 de *Do Ábaco à IA*): casa depois da vírgula e porcentagem. Opcional, antes do ep 1.02. Ligação fraca.
- **A bolha** (10.01 de *Do Ábaco à IA*): preço longe do valor e o estouro de março de 2000. Antes do ep 3.05.
- **O algoritmo de recomendação** (10.04 de *Do Ábaco à IA*): o modelo que decide sozinho a partir de rastros. Antes do ep 6.06. Ligação lateral.

## Filmes e documentários

Candidatos levantados na pesquisa de 15/09/2026. Nenhum entra no `menu.js` sem tipo, o que distorce e onde ver conferidos (P19). Títulos em português e onde ver: a conferir.

- **Margin Call** (2011, ficção, J.C. Chandor): 36 horas num banco de investimento no começo da crise de 2007-2008. Distorce: banco inventado e a crise espremida em pouco mais de um dia. Pro 6.06.
- **The Big Short** (2015, Adam McKay): a crise de 2007-2008 pelo livro de Michael Lewis. Distorce: entre os investidores protagonistas, só Michael Burry mantém o nome real, e o filme foi criticado por culpar demais a corrupção e olhar pouco pras outras causas da bolha. Pro 3.05.
- **Inside Job** (2010, documentário, Charles Ferguson): a crise de 2008. Distorce: tem tese acusatória (conflito de interesse entre bancos, reguladores e academia), não é panorama neutro. Pro 3.05.
- **Too Big to Fail** (2011, telefilme da HBO, Curtis Hanson): a crise de 2008 pelo olhar do Secretário do Tesouro. Distorce: conta a crise pelas decisões de poucas pessoas poderosas. Pro 3.05.
- **Rogue Trader** (1999, James Dearden): o operador cujas perdas quebraram o Barings em 1995. Distorce: parte da versão do próprio operador. Pro 6.03 ou 6.05.
- **Wall Street** (1987, Oliver Stone): distorce porque o especulador ficou carismático a ponto de virar modelo, o contrário do que o filme queria, e o risco de mercado vira história de crime. Lateral, pro 3.03.
- **The Wolf of Wall Street** (2013, Martin Scorsese): distorce porque glamouriza o estilo de vida do protagonista e quase não mostra as vítimas do esquema. Lateral, pro 3.03.
- **Trading Places** (1983, comédia): distorce porque resume o mercado de futuros a um pregão só. O uso de relatório do governo antes da divulgação não era proibido em futuros de commodities na época; a seção 746 da Dodd-Frank (2010) fechou a brecha e ganhou o apelido de regra Eddie Murphy (fonte secundária). Lateral.
- **Dumb Money** (2023, Craig Gillespie): o short squeeze da GameStop. Distorce porque dramatiza como pequeno investidor contra fundo grande, e o diretor quer o público indignado. Lateral, pro 6.06.

## Regras de produção

- **Mesmo caminho das outras séries:** planta a partir do `_molde-planta.md`, trio com a REGRA DURA DAS TELAS, podcast-verificador, áudio no NotebookLM antes da página, `mapa-de-telas.py` com a segunda passada `--confere`, marcadores, e a animação nascendo do `_molde-animacao.html`. Toda tela tem imagem 16:9 com selo "ilustração" ou "imagem real" e crédito em `img/CREDITOS.md` (plano de imagens na P22). No Flow, conferir o modo Imagem antes de gerar.
- **Semente e estado inicial na planta:** toda tela sintética leva na `_planta.md` a semente fixa e o estado inicial, pra que o áudio, gravado antes, descreva exatamente o que a página desenha.
- **O verificador confere também os indícios.** Todo trio passa pela lista do que não se diz, que mora fora do SEIRES e fora do git (P9).
- **Aviso de risco padrão:** uma frase em voz alta por episódio, da etapa 3 em diante, e um rodapé fixo na página com a declaração de ausência de patrocínio e de parceria (texto na P11). A proteção vem do conteúdo não recomendar, não do aviso.
- **Nada de dinheiro perto:** nenhum anúncio, patrocínio, link de afiliado, cobrança ou parceria com corretora perto dos episódios das etapas 3 a 6, porque a nota da CVM de 11/11/2020 conta remuneração indireta (proposta).
- **Ativo real na tela:** nenhum papel negociado hoje na B3, nem em recorte congelado. Nas telas, a Companhia Exemplo e a Exemplo Participações (nomes provisórios, P4), inventadas e sem código de negociação. Casos reais só históricos, acadêmicos e encerrados, com data e fonte (Royal Dutch e Shell, Unilever, LTCM). Sem logo de empresa, sem marca de corretora, plataforma ou robô. Detalhes na P6.
- **Nome inventado conferido:** antes da planta que estreia um nome de empresa inventada, conferir em busca web, na lista de emissores da B3, na consulta de CNPJ e no INPI, e registrar a data na P4.
- **Dado da tela:** série sintética gerada na página com semente fixa, com botões de cauda gorda e de quebra desde o primeiro uso, e sorteio só por botão com "voltar ao exemplo". Recorte histórico só dos casos acadêmicos encerrados, em `FINANCAS/_arquivos/dados-historicos/`, com a data dita e escrita. Nunca o `dados.js` do painel nem o Yahoo ao vivo.
- **Parâmetros da tela:** o padrão é o publicado (20 períodos, 2 desvios e desvio populacional, de Bollinger; 2 desvios, da versão de 1999 de Gatev, Goetzmann e Rouwenhorst). Outros valores só como posição de um controle contínuo, explicados pela conta. Nenhum tempo gráfico recomendado.
- **Imposto e custo em toda conta que mostra ganho:** placar em ações e em reais, com tarifa das duas pontas, spread e imposto do mês, ao lado de "só segurar" e do dinheiro parado. O cenário padrão tem perda e mês sem troca.
- **Vocabulário próprio:** "razão", "banda" ou "faixa", "troca" como verbo ou substantivo comum, nunca como nome de método.
- **Glossário único (proposta):** todo termo de mercado é explicado numa frase na primeira vez em que aparece na série (razão, desvio, z, banda, spread, escorregamento, data ex, preço médio, day trade, dedo-duro, cauda gorda), e a mesma palavra vale nos 25 episódios, nos 7 `00` e nos extras. Mora em `FINANCAS/plano/glossario.md`.
- **Duração perto de 18 min.** O que estourar vira extra.
- **Gráfico da razão com bandas:** aparece em quase toda tela das etapas 5 e 6. No terceiro uso vira peça da base em `site/js/animacao/` (P16).
- **Pastas e páginas (proposta, sem acento, P18):**
  - raiz `SEIRES/FINANCAS/`, com `00 - A serie inteira/`, `NN - Nome da etapa/00 - A etapa inteira/`, `NN - Nome da etapa/NN - Nome do episodio/`, `_EXTRAS/NN - Nome/`, `_arquivos/` (capa-serie, capa-etapas, scripts, dados-historicos) e `plano/serie/plano-da-serie.md`;
  - "Inicie dizendo: Financas - A Serie Inteira", e os prompts `00-...`, `NN-NN-...` e `EX-NN-...`;
  - no site: `site/financas.html`, `site/etapas/financas-NN.html`, `site/img/serie-financas.webp` e `site/img/financas-etapa-NN.webp` (1200x670), mais a entrada no `site/js/menu.js` e o card no `index.html`, que andam juntos e sobem só depois de ver o diff;
  - o HTML do plano sai de `python C:\src\PROJETOS\_plano-html\gerar-plano-serie.py "<pasta plano/serie>"`.
- **Deploy só com ordem dele**, pelos scripts de `Como Reinventar o Computador do Zero/_arquivos/scripts/`, e QA com `qa-pagina-com-audio.js` e `qa-player-site.js`.

---

## Decisões da série

- **D1.** (15/09/2026) **Existe uma série sobre finanças.** Pedido dele: uma série nova no site, sobre finanças.
- **D2.** (15/09/2026) **A troca de ações é um dos assuntos, não a série inteira.** Trocar entre dois papéis parecidos quando a razão de preço se afasta da média entra como parte da série, ao lado de outros assuntos.
- **D3.** (15/09/2026) **O nome é Finanças, e a linha de apoio é "Do cofrinho à bolsa".** Finanças no card, no `menu.js` e no `series.json`; a linha de apoio abre o resumo do card e a página da série, como a Hardware fez com o nome antigo. O card de 15/09 já está assim.

*Valem aqui, herdadas das outras séries (datas de lá):* a série é nossa, sem indício de estudo privado (D1 e D7 da Hardware, 10 e 11/09/2026); o áudio chama os extras pelo nome (D9 da Hardware, 14/09/2026); extra diz quem descobriu, com fonte primária (D10 da Hardware, 14/09/2026). O resto deste plano é proposta e está em Pendências.

## Pendências

- ~~**P1.** **Nome e linha de apoio.** Recomendação: **Finanças** no card e no menu, com a linha de apoio "Do cofrinho à bolsa", como a Hardware fez com o nome antigo. Alternativa: "Do Cofrinho à Bolsa" como nome. Trava: card no `index.html`, `menu.js` e capa.~~ **Resolvida em 15/09/2026 (D3):** Finanças, com a linha de apoio "Do cofrinho à bolsa".
- **P2.** **Posição do card no hub.** Recomendação: 04, com Lua, Corpo e Evolução descendo pra 05, 06 e 07 (precedente da P2 da Hardware). Trava: a primeira subida, com os dois arquivos compartilhados vistos no diff.
- **P3.** **Escopo, público e tamanho.** Recomendação: adulto leigo, 6 etapas do dinheiro do mês até a troca, 25 episódios mais 7 episódios `00`. Se pesar, dá pra cortar a etapa 2 pra extras ou começar a série na etapa 3 (18 episódios). Fora do escopo: opções e qualquer derivativo, cripto, fundos imobiliários, previdência e aluguel de ações; o 6.06 só nomeia o vendido, não ensina. Trava: este plano e o `00` da série.
- **P4.** **O objeto que atravessa a série e a empresa inventada.** Recomendação: o cofrinho como objeto, sem pessoa e sem voz, e uma empresa inventada com ON e PN, mais a holding dela, sem código de negociação. Nome provisório: Companhia Exemplo S.A. (setor neutro, parafusos) e Exemplo Participações. O nome anterior, Moinho Trigal, caiu em 15/09/2026: Trigal já é marca real de farinha de trigo no Brasil, do mesmo ramo, e a série vai mostrar a empresa caindo e com desconto de holding. Antes da planta do 3.01, conferir o nome escolhido em busca web, na lista de emissores da B3, na consulta de CNPJ da Receita e no INPI, e escrever aqui: "Nome conferido na B3, no CNPJ e no INPI em DD/MM/AAAA; sem coincidência com marca ou empresa real". Alternativa ao cofrinho: uma pessoa inventada que não fala. Trava: a planta do primeiro episódio e a do 3.01.
- **P5.** **Ordem de produção.** Recomendação: começar pelo `00` da etapa 3 e pelo 3.01, e seguir as etapas 3, 4, 5 e 6 em ordem, porque a pesquisa delas está pronta. O `00` da série só depois da P13 fechada e da lista de extras aprovada (P14), pra não prometer conteúdo sem fonte nem extra que pode cair. As etapas 1 e 2 vêm depois da pesquisa nova. A etapa 6 só sobe com o 3.03, o 4.02 e o 4.03 no ar, e o 6.02 só sobe junto com o 6.03 e o 6.05 (ou depois deles). Trava: o primeiro trio; o `00` da série espera a P13 e a P14.
- **P6.** **A série usa ativos reais?** Recomendação: não no presente, nem em recorte congelado. Só a empresa inventada nas telas e casos históricos acadêmicos encerrados, com data e fonte. Nem os pares do painel dele. Os números de participação de holding (tipo Itaúsa no Itaú) ficam fora. Trava: a planta do 3.01 e a do 6.01.
- **P7.** **Relação com o painel afx.art.br/acoes e o FINANCEIRO.** Recomendação: o painel não é linkado nem mostrado na série. A série reaproveita só a conta, que é código dele (`estatistica.js`), numa peça da base com dado sintético. Conferir a origem dos 8 pares do `pares.json` (a anotação fica no acervo privado). Trava: a peça da base do gráfico (P16) e qualquer menção ao painel.
- **P8.** **Compliance do painel público.** É outro projeto e só ele decide. Recomendação: se o painel continuar público, tirar o selo "sinal", os níveis "atenção/sinal/extremo", o "caro/barato" e o "Montagem clássica: vende A e compra B", deixando só números e a data dos dados. A outra saída é deixar o painel só pra uso pessoal dele (login só dele, sem terceiros). Login aberto a outras pessoas não resolve: a Res. CVM 20 conta análise "ainda que restrita a clientes". Nunca cobrar e nunca pôr junto de serviço pago. A nota da CVM de 11/11/2020 diz que "não é recomendação" não basta, e o art. 27-E da Lei 6.385 fala em atividade exercida "ainda que a título gratuito" (conferir no Planalto). Trava: a subida da etapa 6, porque série e painel moram no mesmo domínio afx.art.br.
- **P9.** **Onde mora o estudo privado.** Recomendação: o estudo privado e a lista do que não se diz moram no acervo do Nexus, fora do SEIRES e fora do git. O caminho vai só na instrução do agente podcast-verificador, que passa a ler essa lista em todo trio da série. Trava: o primeiro trio da série.
- **P10.** **Estudo primeiro, episódio depois?** Recomendação: só a etapa 6 espera uma sessão de estudo dele fechada no Nexus, e as dúvidas dele entram no roteiro. As etapas 1 a 5 correm sobre a pesquisa pública. Trava: a planta do 6.01.
- **P11.** **Texto do aviso de risco e declaração na página.** Recomendação: "Isto é educação financeira, não recomendação de investimento: a série não diz o que comprar ou vender." Uma vez por episódio da etapa 3 em diante, mais o rodapé fixo na página, que também declara: sem patrocínio, sem parceria com corretora, sem cobrança, com linguagem na régua do art. 14 da Res. CVM 20. Se o painel continuar público (P8), decidir se o rodapé diz que o autor mantém um painel próprio em outro endereço. Trava: o primeiro episódio da etapa 3.
- **P12.** **Revisão das regras vigentes.** Recomendação: conferir imposto, tarifa, RLP e dividendos na fonte primária antes de cada gravação e de cada subida. A página mostra "consultado em DD/MM/AAAA" com a data da última conferência. Revisão uma vez por ano, disparada por um lembrete no Nexus; se a regra mudar depois do áudio gravado, a página ganha nota de correção na hora e o áudio entra na fila de regravação. Revisão por contador ou profissional certificado antes de publicar o 4.02, o 4.03, o 6.03 e qualquer tela com imposto, como regra. Acompanhar também o item "Influenciadores e modernização da norma de analistas" da agenda regulatória de 2026 da CVM (decisão de 03/12/2025) antes de cada subida das etapas 3 a 6. Trava: a etapa 4.
- **P13.** **Pesquisa nova antes das etapas 1 e 2, do 3.03 e do 3.05.** Faltam fonte primária pra: orçamento e reserva de emergência (sem número mágico de meses), Tesouro Direto, FGC, tabela regressiva e IOF da renda fixa, perfil do investidor (Res. CVM 30/2021), o estudo de day trade de Chague, De-Losso e Giovannetti, tag along e Novo Mercado, a câmara da B3 como contraparte central, taxa de custódia, JCP (LC 224/2025) e o texto da Lei 11.033/2004. E quem descobriu: a bolha (extra 05), a partida dobrada (extra 15), e uma pessoa por trás do IPCA e da Selic (extras 02 e 03), ou esses dois viram só assunto de episódio, sem ficha. Trava: a planta do 1.01, do 2.02, do 3.03 e do 3.05, e o `00` da série.
- **P14.** **Extras: quais e onde.** Recomendação: aprovar a lista de 15 por etapa, junto com o roteiro, e a lista dos chamados no áudio. Os extras ganham bloco próprio da série no `menu.js`, porque o hub comum `extras/index.html` ainda promete "sem nome, sem data", o que contradiz a D10. Trava: o primeiro extra e o `00` da série.
- **P15.** **Candidato 59 (a bolha).** Recomendação: produzir uma vez, autocontido, e servir às duas séries, já que o 10.01 promete. Precisa da pesquisa de quem descobriu. Trava: o 3.05.
- **P16.** **Peça da base do gráfico da razão com bandas.** Pela regra do terceiro clone, o gráfico aparece no 5.01, no 5.02 e no 5.03. Recomendação: propor a peça em `site/js/animacao/`, feita a partir da conta e do desenho SVG do painel dele, antes do 5.03. A peça recebe o tipo de desvio (populacional, como Bollinger, ou amostral n-1, como o `estatistica.js`) e a semente da série sintética. A tela do 5.03 usa o populacional e o 5.01 mostra os dois. Trava: o 5.03.
- **P17.** **Capa e artes das etapas.** Recomendação: Flow em modo Imagem, 1200x670, com o cofrinho e duas linhas que andam perto sem se tocar. Sem logo, sem código de ação, sem foto de pregão com gente identificável. Original e prompt em `FINANCAS/_arquivos/capa-serie/` e `FINANCAS/_arquivos/capa-etapas/`. Trava: o card no ar.
- **P18.** **Acento nas subpastas.** Recomendação: raiz `FINANCAS` sem acento e subpastas sem acento também, por causa do ffprobe e do Glob. Vira decisão quando ele escolher. Trava: criar a primeira pasta.
- **P19.** **Filmes.** Recomendação: aprovar a lista da seção de filmes e conferir título em português e onde ver de todos. *Trillion Dollar Bet* (2000, documentário da série NOVA, sobre Black-Scholes e a LTCM, bom pro 6.05) e *Enron: The Smartest Guys in the Room* (2005, documentário, Alex Gibney) só entram na lista depois de levantar o que distorcem. Trava: o `menu.js` do primeiro episódio.
- **P20.** **O plano no git público.** O repositório do SEIRES é público, e o plano da Hardware já está nele. Recomendação: este plano pode entrar, porque não cita estudo privado; a lista do que não se diz, a anotação sobre a origem dos pares do painel e qualquer material de estudo ficam fora do SEIRES. Conferir com `git ls-files` e com o diff antes do primeiro commit da pasta. Trava: o primeiro commit de `FINANCAS/`.
- **P21.** **`_COMO-FAZER.md` próprio.** A receita da Hardware não cobre semente fixa, dados históricos, conferência de regra vigente, revisão de conteúdo regulado nem conferência do nome da empresa inventada. Recomendação: nascer copiando a da Hardware e ganhar essas receitas. Trava: a primeira planta.
- **P22.** **Plano de imagens das telas.** Toda tela pede imagem 16:9, mas as etapas 5 e 6 são gráfico abstrato de empresa inventada. Recomendação: separar na planta o que é imagem real do Commons (Pearson, Galton, pregão de viva-voz) do que é ilustração, e decidir como o selo aparece numa tela que é só gráfico. Trava: a planta do 3.01.

---

## Fatos conferidos

- IR comum: 15% sobre o ganho líquido do mês. Isenção se o **total vendido** em ações no mês for até R$ 20.000,00, sem valer pra day trade, ETF de ações nem bônus. Passou do limite, o ganho líquido do mês inteiro é tributado. Day trade (mesmo ativo, mesmo pregão, mesma corretora) paga 20%. [Receita: cálculo](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/pagamento/renda-variavel/bolsa-de-valores-1/calculo-e-pagamento-do-imposto) · [isenções](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/pagamento/renda-variavel/bolsa-de-valores-1/isencoes) · [SC Cosit 145/2021](https://normas.receita.fazenda.gov.br/sijut2consulta/anexoOutros.action?idArquivoBinario=62757) · [day trade](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/pagamento/renda-variavel/bolsa-de-valores-1/bolsa-de-valores)
- DARF 6015 até o último dia útil do mês seguinte, e abaixo de R$ 10 acumula. Retenção de 0,005% e de 1% como antecipação. Prejuízo compensa no mesmo mês ou nos seguintes, nunca em meses anteriores, e o de day trade só com day trade. [retenções](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/pagamento/renda-variavel/bolsa-de-valores-1/retencoes) · [compensações](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/pagamento/renda-variavel/bolsa-de-valores-1/compensacoes) · [manual do ReVar](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/pagamento/renda-variavel/manual)
- MP 1.303/2025 sem eficácia desde 08/10/2025. [Congresso](https://www.congressonacional.leg.br/materias/medidas-provisorias/-/mpv/169059)
- Lei 15.270/2025: retenção de 10% quando uma mesma empresa paga mais de R$ 50 mil no mês à mesma pessoa física, desde 01/2026 (a incidência sobre o total do mês está no A conferir). [Receita, 06/08/2026](https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/agosto/receita-federal-orienta-sobre-os-procedimentos-para-o-recolhimento-do-imposto-de-renda-retido-na-fonte-sobre-lucros-e-dividendos)
- Tarifa da B3 no à vista, fora do day trade, até R$ 3 milhões de média diária: 0,0300% por investidor em cada ponta, conforme a tabela consultada em 15/09/2026 (a página não mostra vigência). No day trade, de 0,0230% a 0,0115%. [B3](https://www.b3.com.br/pt_br/produtos-e-servicos/tarifas/listados-a-vista-e-derivativos/renda-variavel/tarifas-de-acoes-e-fundos-de-investimento/a-vista/)
- Lote padrão costuma ser de 100 e o fracionário leva F, com preço que pode ser diferente. [B3 Bora Investir](https://borainvestir.b3.com.br/tipos-de-investimentos/renda-variavel/acoes/o-que-e-o-mercado-fracionario-como-investir-nele/) · Units costumam usar o final 11, que também aparece em ETFs e fundos imobiliários. [B3](https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-variavel/certificado-de-deposito-de-acoes-units.htm)
- RLP: a contraparte pode ser a corretora ou empresa do grupo, com autorização prévia e expressa. Em ações, só uma lista de papéis e fase experimental por 18 meses contados da implantação. [CVM, 13/08/2024](https://conteudo.cvm.gov.br/decisoes/2024/20240813_R1/20240813_D1410.html) · [Ofício Circular B3 038/2025](https://www.b3.com.br/data/files/17/B4/88/14/AEA99910F5D34899AC094EA8/OC%20038-2025-VNC%20NOVAS%20REGRAS%20DE%20FUNCIONAMENTO%20DE%20OFERTA%20RLP%20NO%20MERCADO%20DE%20ACOES%20E%20PARA%20OS%20MINICONTRATOS%20FUTUROS%20WIN%20E%20WDO_PT.pdf)
- Lei 6.404/1976, arts. 15, 17, 111 e 243 (o §2º do 243 fala em preponderância nas deliberações e poder de eleger a maioria dos administradores; o §1º do 111 fala em prazo do estatuto não superior a 3 exercícios consecutivos). [Câmara](https://www2.camara.leg.br/legin/fed/lei/1970-1979/lei-6404-15-dezembro-1976-368447-normaatualizada-pl.html)
- Res. CVM 20/2021 (arts. 1º, 13 e 14), Res. CVM 19/2021 e nota da CVM de 11/11/2020 sobre influenciadores. [Res. 20](https://conteudo.cvm.gov.br/export/sites/cvm/legislacao/resolucoes/anexos/001/resol020consolid.pdf) · [Res. 19](https://conteudo.cvm.gov.br/legislacao/resolucoes/resol019.html) · [nota](https://www.gov.br/cvm/pt-br/assuntos/noticias/2020/area-tecnica-da-cvm-esclarece-duvidas-sobre-atuacao-de-influenciadores-que-recomendam-investimentos-dddc1973876d4cc78c734b8ceeaaa740)
- Copom em 20/06/1996 e a definição da taxa Selic. [BCB](https://www.bcb.gov.br/htms/copom_normas/a-hist.asp?frame=1) · CDI e Taxa DI. [B3](https://borainvestir.b3.com.br/glossario/certificado-de-deposito-interbancario-cdi/) · Fim do viva-voz de ações da Bovespa em 30/09/2005. [B3](https://borainvestir.b3.com.br/noticias/fim-do-pregao-viva-voz-faz-20-anos-e-b3-celebra-historia-com-exposicao/) · B3 em 2017. [RI B3](https://ri.b3.com.br/en/b3/history/)
- Origem do pairs trading e versão de trabalho com dados de 1962 a 1997 (entrada a 2 desvios, parâmetros sem otimização, aviso sobre custo). [NBER WP 7032](https://www.nber.org/system/files/working_papers/w7032/w7032.pdf) · Versão de 2006, de 1962 a 2002, com retorno em geral acima de custos conservadores. [RePEc](https://ideas.repec.org/a/oup/rfinst/v19y2006i3p797-827.html) · Queda posterior, amostra de 07/1962 a 06/2009, atribuída sobretudo ao aumento dos riscos de arbitragem (resumo). [Do e Faff, 2010](https://rpc.cfainstitute.org/research/financial-analysts-journal/2010/does-simple-pairs-trading-still-work)
- Cointegração e o prêmio de 2003, dividido: Engle pelo ARCH e Granger pela cointegração. [Engle e Granger, 1987](https://econpapers.repec.org/RePEc:ecm:emetrp:v:55:y:1987:i:2:p:251-76) · [Granger e Newbold, 1974](https://ideas.repec.org/a/eee/econom/v2y1974i2p111-120.html) · [KVA](https://www.kva.se/en/news/the-prize-in-economic-sciences-2003/)
- Bandas: 20 períodos e 2 desvios, desvio populacional. [Bollinger](https://www.bollingerbands.com/bollinger-bands) · Galton, 1886. [galton.org](https://galton.org/bib/JournalItem.aspx_action=view_id=157)
- Royal Dutch e Shell. [Froot e Dabora, 1999](https://www.sciencedirect.com/science/article/abs/pii/S0304405X99000203) · Limites da arbitragem e a regra simulada em Unilever (p. 19). [de Jong, Rosenthal e van Dijk, 2004](https://dl.icdst.org/pdfs/files/8419da3e4d95c0dfe4f233e2a6bf1b3a.pdf)
- LTCM e a recapitalização privada organizada pelo Fed de Nova York, sem dinheiro do Fed. [President's Working Group](https://www.cftc.gov/sites/default/files/tm/tmhedgefundreport.htm) · [GAO GGD-00-3](https://www.gao.gov/products/ggd-00-3) · [Federal Reserve History](https://www.federalreservehistory.org/essays/ltcm-near-failure) · Agosto de 2007 e a hipótese do desmonte. [Khandani e Lo](https://www.nber.org/papers/w14465)

## A conferir

- Texto da Lei 11.033/2004 (arts. 2º e 3º, I): as regras vieram das páginas da Receita.
- Units e a isenção de R$ 20 mil: não afirmar nada no áudio.
- Se perda de operação comum compensa ganho de day trade, e se prejuízo de mês isento pode ser compensado depois.
- Definição de day trade na IN RFB 1.585/2015, art. 65 (mesma instituição intermediadora).
- Lei 15.270/2025 no Planalto: os 10% sobre o total do mês, e se ganho em bolsa entra na tributação mínima acima de R$ 600 mil por ano.
- JCP: alíquota de 17,5% desde 01/01/2026 pela LC 224/2025 (visto só em fonte secundária).
- Lei 10.303/2001, art. 8º, §1º: a exceção de 2/3 de preferenciais pras companhias abertas que já existiam.
- Art. 27-E da Lei 6.385/1976 no Planalto ("ainda que a título gratuito").
- Dispensa da retenção de 0,005% até R$ 1,00. Vigência da tabela de tarifas da B3 e o Comunicado B3 026/2025. Taxa de custódia pra pessoa física.
- Fim da fase experimental do RLP em ações (a conta dá perto de 05/2027, mas é conta própria) e o estudo da CVM de 11/02/2026.
- A câmara da B3 como contraparte central na liquidação (3.03).
- Perfil do investidor (Res. CVM 30/2021).
- Agenda regulatória de 2026 da CVM sobre influenciadores: audiência pública ainda não publicada até 15/09/2026.
- Decreto 12.079/2024 (meta contínua) e Resolução CMN 2.615/1999 no texto oficial. Datas exatas do sistema Selic em 1979.
- Tesouro Direto, FGC, imposto e IOF da renda fixa, estudo de day trade (Chague, De-Losso e Giovannetti), tag along e Novo Mercado: sem pesquisa ainda.
- Horário do pregão da B3, pra conta de quantos pregões cobrem 20 barras de uma hora (5.03).
- Witt, Bernoulli e Euler (cartas de 1727 a 1731, *Mechanica* de 1736) só em fonte secundária. Bolsa paulista: 1890 ou 1895. Fim do viva-voz de derivativos da BM&F em 30/06/2009 em fonte da B3. Home broker em 1999. Ano das bandas de Bollinger e os anos dele na FNN.
- Luca Pacioli e a *Summa de arithmetica* (1494) em fonte primária.
- Bamberger contra Tartaglia (fora do áudio até fonte primária). Nome do grupo de Tartaglia. Período de formação de 12 meses no estudo de 2006.
- Do e Faff (2010): os números por subperíodo e a atribuição da queda no texto completo, não só no resumo.
- Pearson: palestra de 1893 e o PDF original de 1894. Número de famílias do estudo de Galton.
- Nomes dos sócios Nobel da LTCM. Ficha de Shleifer e Vishny (1997). Fusão das ações de Royal Dutch e Shell em 2005.
- Títulos em português e onde ver dos filmes. O que distorce em *Trillion Dollar Bet* e em *Enron* (P19).
- Origem dos 8 pares do painel afx.art.br/acoes (P7, anotação no acervo privado).
- Nome da empresa inventada em busca web, na B3, no CNPJ e no INPI (P4).

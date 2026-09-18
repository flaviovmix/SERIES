# Planta de telas: Juros sobre juros (1.02)

**De quando são os números (esta série não tem janela temporal; tem data de fonte):** as taxas médias de crédito são de **julho de 2026** (Banco Central, séries do SGS e nota de 28/08/2026, dados preliminares); o vocabulário e o exemplo de Helena e Marta são do **Caderno de Educação Financeira do Banco Central, versão 2026**; as regras do cartão são de **2017** (o rotativo só até a fatura seguinte) e de **3 de janeiro de 2024** (o teto de juros e encargos); o do cheque especial, de **6 de janeiro de 2020**. A tela 1 diz que todo número vem com data, e toda tela que mostra número repete de quando ele é.

**Pessoas citadas:** nenhuma com ficha. Helena e Marta são personagens do exemplo do Caderno do Banco Central, ditas como tal. Quem descobriu os juros compostos (Witt, Bernoulli, Euler) é assunto de extra (D10), e o áudio não chama extra pelo nome (DE3).

**Objeto que atravessa a série:** o cofrinho (P4, proposta). Nasceu no episódio anterior como a sobra do mês separada na frente. Aqui ele descobre que, parado, não cresce, e que o mesmo motor que faria ele crescer é o que faz a dívida crescer. Ele não vira produto nem aplicação: isso é a etapa 2.

**Extra chamado no áudio:** nenhum (DE3). O lembrete da abertura só diz que as guias de extras e de filmes existem.

**Filmes que o áudio cita:** *Futurama*, "A Minha Fortuna São os Meus Amigos" (tela 4), *A Ascensão do Dinheiro*, episódio 1 (tela 5) e o curta *Filhos da Mama*, do Banco Central (tela 7). O "Pra ver" não é escrito à mão: a tela de fim da base monta a lista a partir do campo `filmes` do episódio no `menu.js`, com as três do áudio mais *Explicando... Dinheiro*, episódio "Cartões de crédito". *A Ascensão do Dinheiro* entra lá com "não confirmei onde ver no Brasil". *Como Ser Warren Buffett* ficou de fora de propósito: é retrato de investidor em bolsa, e esta etapa não fala de investimento. Detalhe em `../_filmes-e-documentarios.md`.

**Fonte de cada número:** `_pesquisa.md`, nesta pasta. Nada entra no roteiro sem estar lá. As contas marcadas "conta própria" estão na seção 8 dele e foram refeitas em Python em 18/09/2026.

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | retoma o episódio anterior em uma frase (a sobra do mês ganhou um lugar próprio, o cofrinho, separada na frente) e abre este: a sobra parada não cresce, e existe um motor que faz a dívida do cartão crescer sozinha e o dinheiro guardado crescer com o tempo. O que o episódio faz: mostrar esse motor, as duas contas (simples e composta), por que taxa ao mês não é taxa ao ano, o motor trabalhando contra (o cartão e o cheque especial, com as travas das regras: duas do Conselho Monetário Nacional e uma de lei) e a favor (o tempo). Diz que todo número vem com data e fonte. O lembrete curto padronizado da página (DE5) e a frase da pausa, porque o episódio tem tela que se mexe (DE7) |
| 2 | conteudo | **o aluguel do dinheiro.** A definição do Caderno do Banco Central, dita como ele escreve: juro é o aluguel do dinheiro no tempo. Quem usa dinheiro dos outros paga o aluguel; quem deixa o dinheiro com alguém recebe. Os três ingredientes de toda conta de juro: o valor de partida, a taxa e o tempo. E a frase que o episódio inteiro vai provar: o mesmo motor serve pros dois lados, e o Banco Central escreve isso com todas as letras |
| 3 | conteudo | **as duas contas.** Juros simples: só sobre o valor de partida. Juros compostos: a cada mês o juro entra no saldo e passa a render juro também, e o próprio Caderno do Banco Central dá o apelido: "juros sobre juros". O exemplo do caderno, mês a mês: R$ 1.000,00 a 5% ao mês por seis meses dá R$ 1.300,00 nos simples e R$ 1.340,10 nos compostos; no primeiro mês os dois são iguais, e a diferença nasce no segundo. O caderno diz que o simples praticamente não existe em empréstimo e aplicação. Uma frase de lei, sem virar aula de direito: uma lei de 1933 proibia "contar juros dos juros"; pra banco, a capitalização mensal é permitida desde 2000, por medida provisória, se estiver no contrato, e o Supremo confirmou em 2024 que essa regra é constitucional |
| 4 | interativa | **as duas curvas.** Uma linha reta (simples) e uma curva (composto) saindo do mesmo R$ 1.000,00, com controle de taxa ao mês e de prazo, e o valor final das duas com a diferença entre elas, que é o juro sobre juro. Embaixo, a taxa escolhida convertida pra ao ano. Três botões de partida: **o exemplo do Banco Central** (5% ao mês, 6 meses, R$ 1.300,00 contra R$ 1.340,10), **a taxa média do rotativo** (15,02% ao mês, os mesmos 6 meses, R$ 1.901,20 contra R$ 2.315,48, com a linha do teto no dobro) e **o tempo longo** (1% ao mês, taxa inventada, 30 anos, R$ 4.600,00 contra R$ 35.949,64). **Estado inicial, que o áudio descreve: o exemplo do Banco Central**, com as duas linhas quase juntas. Nenhum dado muda sozinho; o botão do exemplo do Banco Central faz as vezes de "voltar ao exemplo". Filme: *Futurama* (1999), os 93 centavos a 2,25% ao ano por mil anos que viram 4,3 bilhões de dólares no composto e 21 dólares e 86 centavos no simples, com a ressalva (mil anos, banco eterno, e a conta ignora que os preços também sobem) |
| 5 | conteudo | **ao mês não é ao ano.** Multiplicar a taxa do mês por doze é conta de juros simples. 1% ao mês capitalizado dá 12,68% ao ano, não 12%. A taxa média do rotativo em julho de 2026 foi de 15,02% ao mês, que o Banco Central publica também como 436,15% ao ano, e não 180%. Filme: *A Ascensão do Dinheiro* (2008), episódio 1, com o agiota de Glasgow cobrando 25% por semana, que o episódio anualiza em 11 milhões por cento (seriam 1.300% se fosse simples), com a ressalva de que ninguém rola a mesma dívida 52 semanas seguidas e de que é agiota, não banco. Por isso a unidade vem sempre dita: ao mês ou ao ano |
| 6 | conteudo | **o motor contra: a dívida.** As taxas médias de julho de 2026 (Banco Central, médias do mercado, sem nome de banco): rotativo do cartão 436,15% ao ano; parcelado do cartão 189,28%; cheque especial 137,30%; crédito pessoal não consignado 110,95%. As travas que existem, cada uma com a data: desde abril de 2017 o saldo só fica no rotativo até a fatura seguinte, e depois tem que virar parcelamento em condição melhor; desde 3 de janeiro de 2024 juros e encargos do rotativo e do parcelamento da fatura não podem passar do valor original da dívida (quem devia R$ 100 chega no máximo a R$ 200); o cheque especial tem teto de 8% ao mês desde 6 de janeiro de 2020, e a média de julho de 2026 estava em 7,47%, perto dele. Conta própria, dita como conta: sem o teto, uma dívida que só crescesse à taxa média do rotativo dobraria em menos de cinco meses. O teto é do total acumulado, não da taxa |
| 7 | conteudo | **o motor a favor: o tempo pesa mais.** O exemplo do próprio Caderno do Banco Central, com os números dele, sem refazer a conta no ar: Helena guarda R$ 150 por mês dos 20 aos 30 anos e deixa render até os 60, tirando do bolso R$ 18 mil; Marta guarda os mesmos R$ 150 dos 30 aos 60, tirando R$ 54 mil. As duas chegam perto do mesmo lugar (R$ 148.786,58 contra R$ 150.677,26), a 0,5% ao mês. A frase do caderno: a chave é o poder dos juros compostos ao longo do tempo. O cofrinho: a sobra separada na frente, parada, fica do mesmo tamanho; o que faz ela crescer é tempo com juro, e onde deixar esse dinheiro é a etapa seguinte da série. Filme: *Filhos da Mama*, curta de cinco minutos do Banco Central (2015), com a ressalva de que é fábula com moral pronta e esconde que o irmão que guarda fica cinco anos sem carro |
| 8 | fecho | recapitula: juro é aluguel do dinheiro, o composto é juro sobre juro, o mês não é o ano, e o mesmo motor puxa a dívida e o dinheiro guardado, com o tempo pesando mais que tudo. **Onde isso aparece fora da tela:** na fatura do cartão, que desde julho de 2024 mostra a taxa ao mês, a taxa ao ano e o Custo Efetivo Total de cada opção de financiamento, da mais barata pra mais cara, e quanto de encargo vem se pagar só o obrigatório; no contrato de empréstimo, pelo Custo Efetivo Total, que é anual e junta juro, tarifa e imposto; e na Calculadora do Cidadão, do Banco Central, que faz a conta composta. Os filmes ficam na tela de fim, que a base monta. Gancho pro 1.03: o dinheiro pode crescer em número e mesmo assim comprar menos, porque o preço também anda sozinho |

**Total: 8 telas narradas** (7 marcadores "Próxima página"). Justificativa: a parte da conta tem três assuntos que não cabem juntos (o que é o juro, as duas contas e a diferença entre taxa ao mês e ao ano); o motor tem dois lados que pedem tela cada um (a dívida, com as taxas e as travas das regras, e o tempo, com o exemplo do caderno); uma tela se mexe, porque a diferença entre a reta e a curva só aparece quando o prazo anda; mais a capa e o fecho.

## Imagens (regra: toda tela tem imagem 16:9)

Quase tudo é ilustração do Flow, no mundo visual da capa da série: mesa clara, luz de dia, moeda no lugar de cédula, sem pessoa, sem marca, sem logo de banco nem de cartão. Prompts em `ilustracoes.md`, quando a página for montada.

| Tela | Imagem | Origem |
|---|---|---|
| 1 | o cofrinho da mesa, parado, e ao lado uma engrenagem de latão, a do fecho do episódio anterior | ilustração |
| 2 | uma chave de casa presa a uma moeda sobre um recibo em branco: o aluguel do dinheiro | ilustração |
| 3 | duas pilhas de moedas lado a lado, uma crescendo em degraus iguais e a outra em degraus que aumentam | ilustração |
| 4 | o desenho da própria página (`data-imagem="desenho"`) | widget |
| 5 | as doze folhas em branco de um calendário abertas em leque, cada uma um pouco maior que a anterior, ao lado de uma folha só, bem menor | ilustração |
| 6 | um cartão em branco na frente e, atrás, uma coluna de moedas subindo rápido, travada por um aparador de livros de latão: a dívida e o teto | ilustração |
| 7 | dois cofrinhos iguais na mesa, lado a lado: o da esquerda com uma pilha alta de moedas à frente, o da direita com uma pilha baixa e várias moedas ainda por pôr (sem árvore nem semente, que o roteiro proíbe como imagem de juros) | ilustração |
| 8 | os objetos do episódio na mesa, e uma etiqueta de preço mais adiante, pro gancho | ilustração |

## O que esta planta decide e o que não decide

- **Decide:** a ordem das telas, o que cada uma carrega, o widget das duas curvas com os três pontos de partida e o estado inicial, e onde entram os três filmes do áudio.
- **Não decide:** o texto do roteiro (vem no trio), os prompts das ilustrações e o desenho exato do widget (vêm com a página, depois do áudio).

## Candidatos a extra levantados por este episódio

Levantados em 18/09/2026, esperando ele. Continuam a lista única de `SEIRES/plano/candidatos-a-extra.md`, que ia até o 102. **Ainda não foram escritos lá.** O extra 01 do plano (*Juros sobre juros tem história*: Witt em 1613, Bernoulli e o número e, Euler) já existe como proposta; a pesquisa dele está na seção 9 do `_pesquisa.md`.

| # | Extra | Tipo | Aprofunda | Quem descobriu |
|---|---|---|---|---|
| 103 | **Quando juros sobre juros era proibido** | peça | a linha do tempo da lei brasileira: a Lei de Usura (1933), a Súmula 121 do STF (1963), a Súmula 596 (1976), a medida provisória de 2000, as súmulas do STJ de 2015, a ADI 2.316 (2024) e a Lei 14.905/2024. Fonte primária já levantada, seção 6 | não é descoberta; é história da regra |
| 104 | **A regra do 72** | conceito | a conta de cabeça pra saber em quanto tempo algo dobra, por que ela funciona e onde erra mais | Luca Pacioli, *Summa de arithmetica* (1494), a conferir em fonte primária |
| 105 | **O que cabe dentro do CET** | peça | juro, tarifa, imposto e seguro somados numa taxa anual, e por que ele é o número pra comparar (Res. CMN 4.881/2020) | não é descoberta; é regra do Banco Central |

## Alertas herdados da pesquisa (valem pro trio)

1. Sempre a unidade: ao mês ou ao ano. 15,02% ao mês e 436,15% ao ano são a mesma taxa.
2. Taxa média do mercado, de julho de 2026, dado preliminar do Banco Central. Nenhum nome de banco.
3. O teto de 100% não é teto de taxa: limita o total acumulado de juros e encargos ao valor original da dívida, só no rotativo e no parcelamento da fatura, e só pra operações desde 3 de janeiro de 2024.
4. Não citar piso de pagamento mínimo: não existe desde 2018.
5. Não dizer que juros sobre juros é ilegal, e não dar orientação jurídica.
6. O Supremo validou o mérito em 2024 (ADI 2.316), não em 2015.
7. Helena e Marta com os números do caderno, sem refazer a conta.
8. A regra do 72 fica fora do áudio; se precisar dizer tempo pra dobrar, é o número exato, dito como conta.
9. Nada de Einstein e a "força mais poderosa do universo": a frase é provavelmente inventada.
10. Educação, nunca recomendação: nada de onde guardar, que produto contratar ou que banco usar.

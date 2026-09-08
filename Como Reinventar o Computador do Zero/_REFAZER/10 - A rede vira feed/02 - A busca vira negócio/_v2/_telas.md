# Mapa das telas (gerado do audio, 18.7 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 02:05 | - |
| 2 | 02:05 | 01:46 | - |
| 3 | 03:52 | 02:15 | - |
| 4 | 06:07 | 01:57 | - |
| 5 | 08:04 | 00:58 | **Sim** |
| 6 | 09:03 | 01:49 | **Sim** |
| 7 | 10:52 | 01:36 | - |
| 8 | 12:29 | 01:39 | **Sim** |
| 9 | 14:09 | 01:06 | - |
| 10 | 15:15 | 01:00 | - |
| 11 | 16:15 | 00:53 | - |
| 12 | 17:09 | 01:35 | - |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 02:05, 02:05)

a busca ver a negócio, a rede estava cheia de cano largo e de páginas, né. E o episódio anterior terminou com uma pergunta bem prática sobre isso. Sim, é aquela questão de que se milhões de páginas falam da mesma coisa, quem decide qual delas aparece primeiro ali na tela? Exatamente. E acima de tudo, como quem toma essa decisão consegue ganhar dinheiro? Nosso foco hoje são as duas peças de software que mudaram isso. Uma que ordena a web e outra que cobra por essa ordem. E para entender o tamanho desse buraco, a gente precisa lembrar que, lá em 1998, os buscadores que existiam, tipo o Alta Vista, que se pronuncia Alta Vista, ordenavam as páginas de um jeito muito frágil. Como assim frágil? Ah, eles simplesmente contavam quantas vezes uma palavra se repetia dentro do texto da própria página. Nossa, mas isso era muito fácil de enganar, né. Demais. A pessoa que iria aparecer no topo, ela colocava a mesma palavra mil vezes repetida no final do site, sabe. Com a letra na mesma cor do fundo. Ah, claro, ficava invisível para a pessoa que estava lendo. Mas a máquina lia o código, via mil repetições e jogava o site lá para o topo. E vale avisar logo de cara que o nosso intervalo de tempo hoje vai de 1998 a 2004. Isso. E tem uma ressalva crucial aí. Esses anos acontecem exatamente ao mesmo tempo que aquela bolha das empresas.com, que a gente cobriu no encontro passado. Então as duas histórias correm em paralelo. Sim, a gente conta uma linha de cada vez, mas tudo isso estava acontecendo junto. Bom aviso. E outro aviso importante sobre o formato é que a nossa explicação de hoje acompanha uma página com 12 telas de fotos. Quem está apenas ouvindo acompanha normalmente sem perder nada. Quem está com a página aberta deve virar a tela no momento em que ouvir o pedido. Isso mesmo. Bom, a dinâmica central era essa. Como uma máquina poderia separar conteúdo real de páginas que só queriam enganar o sistema repetindo palavras. Para ver como dois estudantes olharam para esse problema de outro jeito, aperte o próximo.

### Tela 2 (02:05 a 03:52, 01:46)

Para ver como dois estudantes olharam para esse problema de outro jeito, aperte o próximo. Essa mudança de perspectiva começou em Stanford, que se pronuncia Stanford, com alunos de doutorado. Um deles queria estudar a estrutura de links da web. Ele queria ver quem apontava para quem. Era o Larry Page, que se pronuncia Larry Page. Larry Page, nascido em 1973, tinha 25 anos, vivo em 2026. Exato. E o colega de projeto dele era o Sergey Brin, que se pronuncia Sergey Brin. Sergey Brin, nascido em 1973, tinha 25 anos, vivo em 2026. Eles não fizeram isso sozinhos, claro. Tinha orientação acadêmica pesada ali. Com certeza, o orientador deles era o Terry Winograd, que se pronuncia Terry Winograd. Terry Winograd, nascido em 1946, tinha 52 anos, vivo em 2026. E a matemática quem ajudou a organizar foi o Rajiv Motwani, que se pronuncia Rajiv Motwani. Rajiv Motwani, nascido em 1962, tinha 36 anos, morreu em 2009. Os professores também assinam um relatório. É, o documento oficial e a virada de chave deles foi mudar a pergunta principal. Em vez do software perguntar se a página fala sobre o assunto, eles começaram a perguntar se a página é importante. Que tira o poder da mão de quem criou a página, né? Totalmente, porque a resposta para a importância estava fora da página. E o mais curioso nessa leção toda de hardware e software é que o dado que resolviu o problema, que eram os links, já estava lá na web, ninguém precisou inventar uma peça nova. É, a estrutura já existia e era pública. O pessoal só estava ignorando. Faltava só um olhar diferente. Pra ver como se mede importância sem entender o assunto da página. Aperte o próximo.

### Tela 3 (03:52 a 06:07, 02:15)

Pra ver como se mede importância sem entender o assunto da página. Aperte o próximo. A melhor analogia aqui, tipo pra facilitar o entendimento, é pensar numa carta de recomendação. Boa. Como num currículo. Isso. Pra saber quem é bom, não adianta ler o que a pessoa escreve sobre si mesma. O sistema precisa olhar quem está recomendando essa pessoa. Se alguém muito respeitado recomenda, tem mais peso. Muito mais peso. Uma recomendação de um especialista super respeitado vale muito mais do que 10 recomendações de completos desconhecidos. Mas, peraí, tem um detalhe aí. Quem escreve muitas cartas de recomendação acaba dividindo a própria reputação entre elas, não é? Tem esse fator. Cada link funciona como um voto. Mas a gente esbarra num problema matemático que é circular. Hum, tipo um beco sem saída. É, porque pra saber o peso do voto do site A, a máquina precisa saber o valor do site A. Só que o valor do site A depende de quem votou nele. E o valor de quem votou nele depende de outros votos. Nossa, como que resolve um cálculo que depende do próprio resultado pra existir? Através de uma coisa chamada interação, a máquina dá um chute inicial. Tipo, assume que todas as páginas da rede valem a mesma coisa e faz a conta. E aí dá um resultado errado, claro. Dá, mas aí a máquina pega esse resultado errado e calcula de novo. E de novo. Ela repete isso dezenas de vezes até que os números, hum, parem de mudar. Ah, eles estabilizam. O nome desse método é PageRank, que se pronuncia PageRank. Brinca com a palavra página, em inglês e com o sobrenome do Larry Page. Isso foi publicado no relatório de 1998. A patente ficou com a universidade, com o Stanford, que acabou licenciando a tecnologia pra eles em troca de ações. Ações que, aliás, a universidade vendeu depois por 336 milhões de dólares. É muito dinheiro. E tem uma lição física forte aí, né? Fazer essa conta maluca de ter ação exige guardar a web inteira na memória da máquina e recalcular tudo sem parar. É um peso absurdo. Isso só foi possível de acontecer ali, porque o hardware, o computador em si, tinha barateado muito. Pra ver isso sair do ambiente da universidade, aperte o próximo.

### Tela 4 (06:07 a 08:04, 01:57)

Pra ver isso sair do ambiente da universidade, aperte o próximo. Em agosto de 1998, eles decidem mostrar essa busca rodando na prática pro Andy Bactiosheim, que se pronuncia Andy Bactiosheim. Ele era da Sun Microsystems, que se pronuncia Sun Microsystems. Andy Bactiosheim, nascido em 1955, tinha 42 anos, vivo em 2026. Ele viu a ferramenta funcionando e, assim, logo de cara, passou um cheque de 100 mil dólares. E detalhe, passou o cheque pra uma empresa que nem existia ainda no papel. Eles só foram registrar formalmente no dia 4 de setembro. E minutos depois daquele primeiro cheque, outro professor de Stanford resolveu passar um segundo cheque, também de 100 mil dólares. Já começaram com um caixa bem confortável, com dinheiro e o registro na mão, eles alugaram uma garagem Manlow Park. A dona da garagem era Susan Wojcicki, que se pronuncia Susan Wojcicki. Susan Wojcicki, nascida em 1968, tinha 30 anos, morreu em 2024. Sim, ela alugou o espaço pra eles. Mas tem um mito aí que precisa ser quebrado. É, a empresa não nancêu mais de caminhete do zero na garagem, né? Não mesmo. Nancêu na estrutura caríssima da universidade. Pra garagem, eles só foram depois de ter 200 mil dólares na conta. E um detalhe é que eles atravessaram aquela bolha inteira da internet de portas fechadas. Foram seis anos de capital fechado. Mas aí, a gente entra num problema grave de hardware e software. O produto era de graça. Só que busca de graça custa extremamente caro em servidor e energia elétrica. Exatamente. Olha paradoxo. Quanto mais as pessoas amavam e usavam software, mais perto a empresa chegava de quebrar. O sucesso literalmente acelerava a falência se eles não achassem um jeito de cobrar. Pra ver como se cobra por uma coisa que é de graça, aperte o próximo.

### Tela 5 (08:04 a 09:03, 00:58)

Pra ver como se cobra por uma coisa que é de graça, aperte o próximo. Naquela época, o modelo antigo da internet era baseado em portais que vendiam banners, que eram tipo aqueles autodores digitais, né? Eles cobravam pela quantidade de exibição. Era igual na TV. Igual na TV. Mas pra um buscador isso é muito ruim. Porque ninguém que entra num buscador quer ficar olhando o banner. A pessoa não clica. E o banner muitas vezes não tem relação nenhuma com o que ela tá procurando ali. Aí que entra a singularidade do negócio da busca. Diferente de um portal de notícias, na busca a pessoa digita com as próprias palavras exatamente o que ela quer no exato momento. Isso é muito raro. A informação não é extraída à força, nem espionada. A pessoa entrega de graça pra poder usar o produto. É tipo assim, pensa na cena. É como se alguém entrasse correndo num shopping center gritando pra todo mundo ouvir exatamente o que quer comprar naquele segundo. Seria loucura não usar essa informação comercialmente, né? Pra ver quem percebeu isso primeiro. E spoiler não foi o Google aperte o próximo.

### Tela 6 (09:03 a 10:52, 01:49)

E spoiler não foi o Google aperte o próximo. Pois é, em fevereiro de 1998 quem teve a ideia pioneira foi um cara chamado Bill Gross. Que se pronuncia Bill Gross. Bill Gross, nascido em 1958, tinha 39 ou 40 anos, vivo em 2026. E ele lançou uma ferramenta chamada GoTo.com. Que se pronuncia GoTo.com. E isso, a grande ideia dele foi permitir que os anunciantes dessem lances, tipo num leilão, por palavras específicas. E o detalhe é que eles pagavam por clique. Mas a plateia não curtiu muito a ideia não, né? Nossa, quando ele apresentou isso num evento foi super vaiado. O pessoal achava que misturar a busca orgânica com anúncio pago era quase uma traição aos princípios da rede. Gerou um desconforto imenso, mas a empresa vingou. Verou a Overture, que se pronuncia Overture. E a Yahoo, que se pronuncia Yahoo, comprou a operação em 2003. E pagaram mais de um bilhão e meio de dólares por ela. A analogia aqui, autorizada pelo mercado, é a vitrine de uma loja. Vem deposição não era novidade nenhuma, né? Jornal e supermercado já faziam isso. A novidade foi leiloar esse espaço em tempo real, cada vez que alguém chegava na vitrine. Mas a gente viu que a peça de software tinha um defeito grave. Qual era o erro? O erro é que eles ordenavam os anúncios só pelo dinheiro. Quem pagava mais aparecia primeiro, independentemente de ser bom ou ruim. Exato. E se o anúncio é ruim e relevante para a pessoa, ela não clica. E o acordo era pagar por clique. Ou seja, se não há clique, ninguém ganha nada, mesmo com lances altas. A ideia central estava certa, mas o desenho do software estava capenga, estava incompleto. Faltou refinar. Para ver a primeira tentativa do Google, que, curiosamente, também não foi essa, aperte o próximo.

### Tela 7 (10:52 a 12:29, 01:36)

que, curiosamente, também não foi essa, aperte o próximo. Aí a gente chega em outubro do ano de 2000. O Google, que se pronuncia Google, resolve lançar o seu próprio sistema. E nasce o Edwards, que se pronuncia Edwards. E o nome quer dizer literalmente isso. Palavras de anúncio. Eles eram blocos de textos separados do resultado principal. Só que, e aqui, tal problema, eles eram cobrados por exibição num valor mensal combinado com o anunciante. Tinha prós e contras. O lado bom é que era em formato de texto, ficava discreto na tela. Não era um banner gigante piscando. Mas o lado ruim, né? O lado ruim é que todo o risco ficava na mão do anunciante. A empresa pagava mensalidade. E o buscador não tinha nenhum incentivo para melhorar a qualidade daquele anúncio, porque já ia receber de qualquer jeito. Mesmo com esses problemas, eles faturaram bastante. Foram 19 milhões de dólares no ano de 2000. Um dinheiro bom, mais pouco para o tamanho do tráfico. Tanto que para liderar e escalar isso, entra o Eric Schmidt, que se pronuncia Eric Schmidt. Ele entrou no Conselho em março de 2001. Eric Schmidt, nascido em 1955, tinha 45 anos, vivo em 2026. Ele virou executivo-chefe logo depois, em agosto. O produto que eles tinham em mãos era muito bom, só que o modelo de cobrança simplesmente estava errado para a escala da internet. Sim, e mudar a cobrança não era uma questão de treinar e equipe para vender melhor. Era necessário mudar o software por baixo. Tinha que reescrever a base de tudo. Para ver a troca que mudou as regras do jogo, aperte o próximo.

### Tela 8 (12:29 a 14:09, 01:39)

Para ver a troca que mudou as regras do jogo, aperte o próximo. Essa virada aconteceu em fevereiro de 2002, com o lançamento do Edward Select. Aí sim, o pagamento passou a ser exclusivamente por clique, com um leilão automático, sem depender de um vendedor humano no meio. Pera aí, detalha para mim essa engenharia do leilão, porque tem duas partes aí. Tem. A primeira peça resolve a questão do preço. E o nome técnico disso é leilão de segundo preço generalizado. É um nome complexo. Como funciona na prática? Imagina que você ganhou o leilão. Você não paga o valor inteiro do seu próprio lance. O sistema cobra só o mínimo necessário para você bater o anunciante que ficou embaixo de você, na segunda posição. Ah, então impede aquela fluturação maluca de lances de ficar ajustando centavos toda hora? Exato. É o valor mínimo justo. Essa é a primeira peça. E a segunda, que é o pulo do gato total, resolve a posição na tela. A posição não é mais definida só pelo dinheiro. Depende do que, então? É o lance financeiro multiplicado pela chance de clique. Entendi. Um anúncio que paga menos, mas é muito bom. E as pessoas clicam. Vence de um anúncio caro, mas ruim. Exatamente isso. Gente, mas para a máquina multiplicar o lance pela chance de clique, o software precisa prever se a pessoa vai clicar ou não, baseada no histórico de dados passados. Sim, é a primeira vez que uma máquina, nessa escala toda, precisa adivinhar comportamento humano para poder funcionar direito. Adivinhar precisa de dado histórico. E guardar dado histórico em massa precisa de máquina. O software vira um adivinhador para ver o tamanho que isso tomou nos cofres. Aperte o próximo.

### Tela 9 (14:09 a 15:15, 01:06)

Aperte o próximo. A escala financeira foi agressiva. Eles faturaram 19 milhões de dólares no ano de 2000. Aí subiu para 439 milhões de dólares em 2002. E chegou em 3 bilhões e 200 milhões de dólares no ano de 2004. E um detalhe que choca. 99% desse dinheiro todo vinha de anúncio. E a realidade, que é a empresa mais usada do mundo, não vendia nada para quem usava ela. Quem pagava a conta inteira era quem queria ser achado. E eles não pararam na página de busca. A Susamo Chique virou gerente em 2003 e ela comandou o movimento de levar esses anúncios para fora, para sites de terceiros com programa AdSense. O ciclo é quase assustador quando a gente olha de cima. O anúncio gera dinheiro que paga compra de novas máquinas, as máquinas novas guardam mais dados e com mais dados a capacidade de prever cliques melhora, deixando o anúncio ainda mais rentável. É um ciclo sem fim de hardware financiando software e vice-versa. Para ver quem estava do outro lado dessa briga e tentou parar isso, aperte o próximo.

### Tela 10 (15:15 a 16:15, 01:00)

e tentou parar isso, aperte o próximo. É claro que o Virtua, aquela empresa lá do Bill Glowes, não ia ficar assistindo a isso em silêncio. Em abril de 2002, eles processam o Google. Dizendo que a patente do Leilão era deles. Isso mesmo. Essa briga correu até agosto de 2004 quando eles fecharam um acordo judicial. O Google entregou 2 milhões e 700 mil ações deles para Yahoo, que agora era a dona da Alverture, e em troca ficou com a licença da patente para sempre. Uma licença vitalícia. É importante pontuar a verdade aqui. A ideia original do Leilão, aquele conceito bruto, não foi do Google. O que eles fizeram foi criar o Leilão ordenado por qualidade. E claro, escalaram a máquina ou hardware para rodar isso o tempo todo sem travar. Essa é a grande diferença técnica. A distância entre ter uma ideia brilhante no papel e fazer uma peça funcionar para bilhões de pessoas é uma distância enorme. E ela é feita inteiramente de hardware. Para ver essa empresa, abriu a capital, aperte o próximo.

### Tela 11 (16:15 a 17:09, 00:53)

Para ver essa empresa, abriu a capital, aperte o próximo. Tudo isso comina no dia 19 de agosto de 2004. Acontece a abertura de capital na bolsa. O preço saiu a US$ 85 por ação, o que deu para a empresa um valor de quase US$ 23 bilhões logo na largada. E o formato dessa venda de ações foi inovador também. Foi um leilão aberto. Qualquer pessoa interessada podia dar lance para comprar. E não só aqueles grandes bancos escolhidos a dedo pelo mercado. E o volume de operação que sustentava isso tudo. Eles já estavam lidando com mais de 200 milhões de buscas por dia. Se a gente refletir sobre a evolução da rede em um espaço curtíssimo de 9 anos, a internet saiu daquela dúvida angustiante de quem é que vai pagar o cano para a informação passar para um sistema extremamente afiado. Onde quem paga sabe exatamente o que a pessoa do outro lado quer naquele milisegundo. Para dizer onde isso para, aperte o próximo.

### Tela 12 (17:09 a 18:44, 01:35)

Para dizer onde isso para, aperte o próximo. A nossa história para aqui, no ano de 2004, com a busca ordenada pela importância dos links e paga efetivamente por clique. É bom a gente fazer um balanço rápido e dar nome aos bois na ordem certa, porque ninguém planejou a obra inteira desde o começo, né? Ninguém sentou e desenhou tudo sozinho. O Pedro Breen foram os que trocaram a pergunta lá no início, mudando-o de a página fala disso para a página importante. O InnoGuard e o Antoine são os acadêmicos que assinaram e ajudaram a embasar o método matemático. O Backstoolsheim foi quem passou aquele primeiro cheque crucial. O Groose teve a ideia primária do leilão e apanhou do mercado por isso. O Schmidt entrou depois para organizar a bagunça do negócio e o modelo de cobrança. E a Wozinski foi quem pegou tudo isso e levou o anúncio para fora da busca. A lição final que a gente tira de toda essa estrutura é que, no mar de páginas caóticas, ordenar informação virou de longe o negócio mais valioso da rede. E para conseguir cobrar por essa ordem de um jeito eficiente, a máquina teve que começar a prever o comportamento humano. É, o software virou uma máquina de antecipar a intenção. Mas pensa no seguinte, a busca só funciona e a máquina só responde quando alguém tem uma dúvida e faz uma pergunta ativamente. Mas e se a pessoa não estiver procurando absolutamente nada? E mesmo assim quiser continuar conectada ali, olhando para a tela do celular ou do computador? O que a rede vai mostrar? Para quem chega sem pergunta nenhuma na cabeça.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `00:35` 1998
- `00:35` Alta
- `00:35` Vista
- `02:10` Stanford
- `02:22` Larry
- `02:22` Page
- `02:26` 1973
- `02:33` Sergey
- `02:33` Brin
- `02:49` Terry
- `02:49` Winograd
- `02:54` 1946
- `03:00` Rajiv
- `03:00` Motwani
- `03:07` 1962
- `03:52` Aperte
- `04:32` Cada
- `05:26` PageRank
- `06:10` Andy
- `06:10` Bactiosheim
- `06:22` Microsystems
- `06:27` 1955
- `06:55` Manlow
- `06:55` Park
- `07:02` Susan
- `07:02` Wojcicki
- `07:09` 1968
- `07:23` Nancêu
- `07:50` Quanto
- `09:03` Google
- `09:07` Bill
- `09:07` Gross
- `09:16` 1958
- `09:23` GoTo.com
- `09:55` Overture
- `09:58` Yahoo
- `11:03` Edwards
- `11:54` Eric
- `11:54` Schmidt
- `11:59` Conselho
- `12:33` Edward
- `12:33` Select
- `13:38` Vence
- `14:43` Susamo
- `14:43` Chique
- `14:49` AdSense
- `15:17` Virtua
- `15:17` Glowes
- `15:25` Leilão
- `15:38` Alverture
- `17:30` Pedro
- `17:30` Breen
- `17:38` InnoGuard
- `17:38` Antoine
- `17:44` Backstoolsheim
- `17:48` Groose
- `17:57` Wozinski

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_A Busca Vira Negocio.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 12, audio entregou 12. OK
- **Janela temporal (1998 a 2004):** declarada na capa. Fecho cita ano.
- **Anos que o audio falou e nao estao no roteiro:** 1946, 1955, 1958, 1962, 1968, 1973, 2000, 2001, 2002, 2003, 2009, 2024, 2026 (conferir com `--confere`)
- **Protagonistas citados no audio:** Andy, Bill, Brin, Duas, Eric, Fechar, Google, Gross, Larry, Motwani, Overture, Page, PageRank, Quem, Schmidt, Sergey, Stanford, Susan, Terry, Winograd, Wojcicki, Yahoo
- **Protagonistas do roteiro AUSENTES no audio:** AdWords, Bechtolsheim, Contar, Rajeev (ou o audio pulou, ou o modelo pequeno escreveu errado)

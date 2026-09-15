# Mapa das telas (gerado do audio, 18.8 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 03:26 | - |
| 2 | 03:26 | 01:42 | - |
| 3 | 05:08 | 01:11 | - |
| 4 | 06:20 | 02:30 | - |
| 5 | 08:50 | 01:30 | - |
| 6 | 10:20 | 01:23 | - |
| 7 | 11:43 | 01:36 | - |
| 8 | 13:19 | 01:32 | **Sim** |
| 9 | 14:51 | 02:12 | - |
| 10 | 17:03 | 01:45 | - |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 03:26, 03:26)

o algoritmo de recomendação. É, esse é o ponto central. Então, para a gente contextualizar o material que a gente está analisando hoje, no fim da etapa anterior, a gente viu que quem escolhia o que aparecia na tela de uma rede social era uma regra de três fatores. Exato, uma regra escrita à mão por pessoas, né? Pois é, pessoas de carne e osso. Mas a grande questão de hoje é a seguinte, e se simplesmente ninguém escrever a regra? E se a máquina descobrir sozinha, olhando só o que as pessoas fizeram antes? Essa é a virada fundamental dessa décima etapa da série como reinventar o computador do zero. Quando a rede vira fide. Aham, porque a tese central aqui é muito clara. Presta bem atenção. Esta foi a primeira máquina que aprendeu e que mexeu com todo mundo. Não foi a que conversa. E o que ela aprendeu não veio de nota que alguém deu de propósito. Veio do rastro que as pessoas deixaram sem perceber. Nossa, isso é muito forte. E para a gente entender como isso aconteceu, o intervalo que a gente vai analisar hoje cobre de 2006 a 2016, em ordem. E é super importante pontuar, só em uma frase mesmo, que esses anos se sobrepõem com a etapa das placas de vídeo e com as redes sociais que a gente discutiu antes, sabe? São linhas que correm em paralelo. Exatamente. E, ah, vamos lembrar com o nosso foco aqui. O assunto é construir uma peça de software que aprende e o dado que alimenta ela. É, não é para ficar contando historinhas de empresas de sucesso, né? Nem fazer sermão sobrevista em tela. A gente vai olhar para a engenharia. E só um aviso de navegação rápido, a nossa explicação acompanha uma página de animação com 12 telas. Para quem está só ouvindo a gente no áudio, acompanha normalmente, sem problemas. Sim. E quem está com a página aberta, vira a tela quando ouviu meu pedido. Então, a partir o próximo. Bom, a gente começa no dia 2 de outubro de 2006. O Read Hastings anunciou um concurso público com um prêmio de, olha só, 1 milhão de dólares. Caramba, 1 milhão de dólares na época era um absurdo de dinheiro para um prêmio de software. Demais. E o Read Hastings, nascido em 1960, tinha 45 anos, vivo em 2020 e 6 quando saiu do Conselho da Netflix. Eu acho legal a gente lembrar do contexto dessa época. A Netflix não era streaming ainda, tá? Verdade, a gente esquece disso. Pois é. O negócio deles era mandar DVD pelo correio naqueles envelopes vermelhos. O streaming mesmo só começaria uns três meses depois, lá em janeiro de 2007. Então, essa aposta era um risco gigante. Soltar os dados internos no mundo podia não dar em absolutamente nada. Mas qual era o desafio exato que ele propôs? O desafio era o seguinte. O sistema deles, que chamava cinemate, errava em média quase uma estrela nas previsões de notas. A meta era errar 10% menos. E a base de dados que eles soltaram impressiona muito, né? Demais. Foram 100 milhões de notas, dadas por 480 mil pessoas, sobre 17.770 filmes. Nossa, é um volume assustador para 2006. Isso traz uma lição incrível de hardware e de software. Como assim? É que pela primeira vez, o gargalo não era o acesso ao dado ou a falta de máquina. O gargalo era um método matemático mesmo. A solução de software ia ter que vir de fora da empresa. Com certeza. Aperte o próximo.

### Tela 2 (03:26 a 05:08, 01:42)

Aperte o próximo. Aí logo em seguida, em 11 de dezembro de 2006, acontece um negócio muito curioso. O que foi? Alguém usando o apelido Simon Funk simplesmente publicou o método dele de graça na internet, no meio da disputa por aquele milhão de dólares. E o mais louco é que não tem nem data de nascimento pública para esse Simon Funk. A gente não sabe muito sobre ele. Mas o que ele publicou foi revolucionário para a época. Foi sim. Para entender, a gente pode usar a analogia de uma planilha quase toda vazia. Imagina 480 mil linhas, que são as pessoas, e 17 mil colunas, que são os filmes. Tá, uma tabela gigante. Gigante. Mas só uma célula em cada 100 tem algo preenchido. O resto é buraco, porque ninguém assiste tudo. O método desse funk troca essa tabela gigante cheia de buracos por duas tabelas magras. Aí a máquina multiplica uma linha da primeira por uma coluna da segunda para prever a nota no espaço vazio. Entendi. E fazendo isso, ela meio que inventa sozinho o significado de cada coluna, né? Exato. Os famosos fatores latentes. Ela faz isso sem saber se o filme é de ação ou se é um drama. Eu acho muito legal esclarecer que o funk não inventou essa técnica do zero. Ele só publicou uma receita simples que funcionava muito bem ali. Pois é, e o nome no mercado acabou ficando errado para sempre. Chamou de uma técnica clássica que normalmente exige uma tabela completa sem buracos. E eles são de hardware e software que fica bem clara, né? Sim, porque ajustar todos esses números milhares de vezes só existiu porque as máquinas de mesas computadores das pessoas na época já aguentavam o tranco sozinhas. O hardware na casa das pessoas já dava conta. Aperte o próximo.

### Tela 3 (05:08 a 06:20, 01:11)

Aperte o próximo. Aí a gente chega em 2007. E aparece uma nova peça nessa história que conecta com uma outra parte da série que a gente está analisando. Qual peça? A segunda peça do concurso não era estatística clássica. Era rede neural. Um grupo lá de Toronto publicou como usar isso para adivinhar as notas da Netflix. Ah, o grupo do Hinton, né? Isso, o Jeffrey Hinton, nascido em 1947, tinha 59 anos, vivo em 2026 dando aula em Toronto. E o que eu acho mais bizarro é que naquela época, apostar em rede neural era uma coisa muito esquisita. Era super fora de moda. Ninguém queria mexer com isso. Exatamente. Ninguém ali imaginava que 5 anos depois ela viraria a chave de toda a indústria de imagem do mundo. Ninguém mesmo. Mas a equipe do Hinton levou o prêmio de progresso naquele ano. Eles melhoraram a precisão em 8% e pouco. Misturando aquele método de fatoração do funk com a rede neural deles. Sim, guardem bem essa combinação. A lição de hardware e software aqui quebra um grande mito. Aquela ideia de que a rede neural nasceu em 2012, né? Exato. Não nasceu em 2012. Já rodava em coisas super úteis e pequenas em 2007 ganhando o prêmio. Aperte o próximo.

### Tela 4 (06:20 a 08:50, 02:30)

Aperte o próximo. Bom, e aí veio um problema gravíssimo com aquele dado anônimo que não era bem anônimo. Ah, essa história pensa. Dois pesquisadores lá do Texas provaram que a base da Netflix era super vulnerável. E olha que esses dois também não tem nem ficha pública de nascimento. Mas o que eles fizeram foi assustador. A Netflix tinha tirado os nomes das pessoas, mas deixou os filmes, as notas e as datas aproximadas. E os pesquisadores simplesmente cruzaram isso com as avaliações públicas de outro site de cinema, o IMDB. Os números desse estudo me deixaram arrepiada, sabe por quê? Por causa da facilidade, né? Sim, com apenas 8 notas e presta atenção mesmo se duas dessas notas estivessem erradas e como a margem de erro de duas semanas dava para identificar 99% dos registros. 99%. O resumo é que tirar o nome da coluna não é anonimizar de verdade. Não mesmo, o padrão de comportamento de uma pessoa é uma impressão digital. E a consequência disso foi pesada. Tiveram processos judiciais na cola da Netflix em 2009 e eles tiveram que cancelar o segundo concurso que ia rolar em 2010. A lição de hardware e software aqui é dura. A mesma finura de dados que faz a recomendação funcionar é a mesmíssima que denuncia quem é a pessoa na vida real. Não dá para separar as duas coisas. E a perde o próximo. Mas e o prêmio? O concurso original continuou e em 26 de julho de 2009, aquela meta mágica dos 10% foi finalmente batida. Foi batida por uma equipe com um nome enorme, Belchors Pragmatic Chaos, formada por três grupos que se juntaram na reta final. E de novo, o pessoal ali sem datas de nascimento públicas disponíveis. Mas o detalhe que pouca gente conhece é como aconteceu o desimpate, né? Ah, isso é cinema puro. Porque no placar público, lá do site, era outra equipe que liderava. Mas do teste oculto da Netflix, que era o que valia, elas empataram exatamente no milésimo. Nossa, e como desimpatam o negócio desses? Pela ordem de chegada. A outra equipe enviou os arquivos 20 minutos depois da equipe campeã. 20 minutos. 1 milhão de dólares decidido por um atraso de 20 minutos num relógio. Não dá para se desacreditar. E a solução campeã, que bateu os 10%, era um Frankenstein. Era uma mistura de 107 algoritmos diferentes rodando juntos. 107 algoritmos. De uma vez, aperte o próximo.

### Tela 5 (08:50 a 10:20, 01:30)

De uma vez, aperte o próximo. Só que aí, em 2012, a empresa solta uma bomba. E conta o que fez com aquilo tudo. É a maior reviravolta dessa história toda. A Netflix simplesmente foi a público revelar que aquela mistura enorme de 107 algoritmos nunca foi usada em produção no sistema deles. Nunca foi. E a gente precisa esclarecer isso de imediato, para quebrar o mito. Ah, com certeza. O que eles usaram, na verdade, foram as peças do primeiro ano. Aquela fatoração de matrizes e a rede neural foram reescritas e usadas por muitos anos. Sim, só a mistura super complexa da equipe campeã é que ficou lá na prateleira juntando poeira. E a Netflix deu três motivos muito claros do por que fizeram isso. Primeiro, o ganho de precisão não pagava o esforço massivo de engenharia que ia precisar. E a escala deles tinha mudado de uma forma bizarra, né? Passou de 100 milhões de notas no concurso para 5 bilhões de notas na vida real. E o motivo mais crucial de todos, o produto deles virou streaming. Isso muda tudo, porque o problema deixou de ser prever a nota que alguém ia dar para o DVD e passou a ser prever o que a pessoa vai assistir ali na hora, dando play. E prever consumo não exige que o usuário dê nota de propósito. É só analisar o resto da rede. O que nos traz para uma vitalição de hardware e software. Um algoritmo que é excelente no papel pode ser completamente inútil na máquina real. Aperte o próximo.

### Tela 6 (10:20 a 11:43, 01:23)

Aperte o próximo. Agora a gente faz uma transição de cenário saindo da Netflix e indo lá para o Facebook, mais ou menos em 2011. O feed para de seguir uma regra fixa. Lembra daquela regra de três fatores que a gente viu antes que foi escrita à mão em 2010? Sim, ela foi substituída por um sistema que aprende sozinho. E o Mark Zuckerberg, nascido em 1984, tinha 27 anos nessa época. Vivo em 2026, ainda no comando da mesma empresa. A mudança técnica ali foi estrutural. Em vez de um humano sentar e decidir que um comentário vale mais do que uma curtida, a máquina começa a ajustar os pesos sozinho. Ela vai observando as interações da base de usuários toda. E foi tão rápido que em 2013 o modelo deles já tinha até 100 mil pesos regulando as coisas. 100 mil pesos! A consequência direta disso é que a explicabilidade foi para o espaço. Totalmente. Nem os criadores do sistema conseguiam explicar em uma frase simples o motivo de um post aparecer para alguém, porque a resposta na prática era um 100 mil números matemáticos. É, é insano. E a lição de hardware e software é que guardar e ajustar 100 mil pesos para um bilhão de pessoas só é possível graças aos imensos galpões de máquinas. Servidores de movem, né? Isso. A infraestrutura física é o que permitiu essa escala. Aperte o próximo.

### Tela 7 (11:43 a 13:19, 01:36)

Aperte o próximo. Em março de 2011 surge um conceito que deu o que falar. O Elipareser deu um nome para aquele incômodo crescente que a gente estava sentindo, a bolha de filtro. O Elipareser, nascido em 1980, tinha 30 anos. Vivo em 2026 tocando uma organização que constrói praças digitais de bairro. A tese dele era que, se cada um vê uma seleção feita sob medida pelo sistema, a gente passa a viver em recortes isolados, bolhas. Mas aqui a gente tem que fazer um alerta crucial. Naquela época, isso era pulamente um debate público. Não era pesquisa isolada de laboratório. É, isso é muito importante. Estudos gigantescos feitos de 2021 em diante mostraram exatamente o contrário. Mostraram que o consumo de conteúdo extremo, na verdade, vem mais de busca direta do usuário e de links externos do que puramente da recomendação empurrando. Mas, óbvio, tem um detalhe no meio disso, né? Claro. Esses estudos científicos mediram um sistema tecnológico totalmente diferente. Dez anos depois da fala do Pariser. Não dá pra afirmar categoricamente qual era o efeito exato daquela primeira máquina em 2011. A gente até lembra do docodrama ou dilema das redes sociais de 2020 que explora isso. Sim, mas com cuidado de lembrar que aquilo é um docodrama. Tem cenas de ficção, tipo aquela sala de controle com os carinhas puxando a alavanca. Não é um documentário puro. Exatamente. A lição de hardware e software dessa parte é que a engenharia sempre chega antes da medida. A máquina decidiu que bilhões de pessoas veriam muito antes de existir um jeito acadêmico de medir esse impacto. Perfeito. Aperte o próximo.

### Tela 8 (13:19 a 14:51, 01:32)

Perfeito. Aperte o próximo. Aí a gente chega em 2012, quando o YouTube decide trocar o que se mede dentro da plataforma. E não foi pouca coisa, viu? Entre agosto e outubro daquele ano, o YouTube e o sistema de busca de vídeos pararam de otimizar pra clique e passaram a otimizar pra tempo assistido. O Salar Camangar, nascido em 1977, tinha 34 ou 35 anos na época. Deixou o YouTube em 2014 e vive em 2026. E pra entender o tamanho dessa mudança, tem uma analogia super autorizada que é perfeita. Imagina um caixa de mercado. Tá, um operador de caixa. Isso. Se você paga o bônus do caixa, por quantas pessoas possam a fila, ele vai empurrar a fila o mais rápido possível. Ele não tá nem aí pro resto. Mas se você muda a regra e paga ele pelo volume financeiro das compras, a atitude dele muda na hora. Ele passa a olhar pro tamanho do carrinho. Nossa, faz todo sentido. Porque o impacto técnico lá no YouTube foi exatamente esse. Premiar o click puramente acabava premiando aquela capa chamativa, o click bait mentiroso. E não o conteúdo do vídeo em si. E o tempo assistido é uma métrica contínua, que acontece depois do click. O sistema precisa medir retenção. E trocar esse rótulo obrigou a equipe deles a reescrever o treino do modelo inteiro. E olha a lição de hardware e software que fascinante. Nenhum único hardware mudou nesse dia nos servidores. O hardware era o mesmo. Mas o software é o que você manda ele perseguir. Mudar a métrica mudou todo o comportamento do sistema. Aperte o próximo.

### Tela 9 (14:51 a 17:03, 02:12)

Aperte o próximo. E a gente aterrisse em setembro de 2016 quando um artigo marca a indústria. A rede neural finalmente assume a recomendação principal do YouTube. Foram três engenheiros do Google. O Paul Covington, o Jay Adams e o Emere Sargin, que também não tem fichas públicas de nascimento. Mas eles publicaram em detalhes o uso de rede neural profunda nesse sistema. E quem estava liderando as coisas nessa época? A Susan Watik, nascida em 1968, que tinha 45 anos quando assumiu YouTube em 2014. Ela morreu em 2024, quando já tinha saído do YouTube havia um ano e meio. E na parte de infraestrutura o Jeff Dean, nascido em 1968, tinha 48 anos. Vivo em 2026, quando saiu do Google depois de 27 anos e abriu uma empresa de pesquisa própria. A arquitetura que eles descreveram é como se fosse um funil. A primeira rede neural pega uma piscina com milhões de vídeos e separa algumas centenas. Para dar uma limpada inicial. Isso. Aí uma segunda rede pega seis centenas e ordena quais dezenas realmente vão aparecer ali na tela inicial do usuário. E aqui a tese central se materializa, sabe? O treino não vinha de notinhas manuais, vinha do que a pessoa assistiu até o fim. O dado primário era puramente o rastro. E a escala disso, mais de um bilhão de pessoas cadastradas, cerca de um bilhão de números ajustáveis na matemática e centenas de bilhões de exemplos sendo digeridos. Só que a gente tem que ter cuidado para separar a realidade do exagero mercado lógico. É, não foi a primeira rede neural usada em produção no mundo, a Netflix já usava em 2008 e não foi a primeira a operar na escala de bilhões de acessos porque o Google usava em buscas faz tempo. O que teve de tão especial, então, foi que os engenheiros abriram a caixa preta e contaram segredos de como tudo funcionava. E para quem quiser ver como as coisas estavam acontecendo na época, o documentário AlphaGo de 2017, que está no YouTube, é um belo retrato visual. E lá mostra como a engenharia dessa época focava em economizar processador a todo cuspo, porque ainda não tinha chips especiais só para iar. Aperte o próximo.

### Tela 10 (17:03 a 18:49, 01:45)

Aperte o próximo. Então, essa parte da nossa história sobre as máquinas em 2016. É onde a rede neural reina lendo o rasto de mais de um bilhão de pessoas todos os dias. E se a gente fizer um balanço rapidinho das pessoas, olha que maluquice. Vê se eu não esqueço de nada. O Hasting soltou o dado. O Funk publicou o método. O Hinton trouxe a rede neural. Os dois pesquisadores do Texas expuseram a falha anônima. Três grupos ganharam o prêmio por uma diferença de 20 minutos. Engenheiros da Netflix não usaram a mistura campeã. O Zuckerberg trocou a regra do feed. O Pariseiro nomeou a bolha. O camangá mudou a métrica para tempo. A OX que estava no comando. E o Jeff Jean fez a base monumental de software. Uau, é isso? E sabe o que eu noto olhando para isso tudo? Ninguém, absolutamente ninguém, planejou esse conjunto de eventos do começo ao fim. É muito importante pontuar aqui boa parte dos criadores técnicos, dos que puseram a mão no ródigo. Não tem nem data de nascimento pública. É o oposto dos donos das empresas. Pois é. E a grande síntese da etapa inteira, a lição que fica é essa aqui. A rede abriu para o comércio, que deixou cano enterrado. Aí veio um jeito de ordenar a web, que obrigou a máquina a adivinhar as pessoas. O excesso de conteúdo no ar matou a velha ordem cronológica. E no fim das contas, a regra foi totalmente substituída por um modelo que aprendeu tendo o rastro invisível de todos nós. Essa máquina aprendeu a adivinhar o que você quer sem você pedir nada. Ela leu seu rastro. Mas em nenhum momento você conversa com ela. E se desce para simplesmente pedir com as suas palavras. E a máquina é responder.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `01:53` Read
- `01:53` Hastings
- `02:07` 1960
- `02:11` Conselho
- `02:11` Netflix
- `03:34` Simon
- `03:34` Funk
- `05:21` Toronto
- `05:25` Hinton
- `05:27` 1947
- `05:27` Jeffrey
- `06:28` Texas
- `06:46` IMDB
- `07:55` Belchors
- `07:55` Pragmatic
- `07:55` Chaos
- `08:43` Frankenstein
- `10:25` Facebook
- `10:41` 1984
- `10:41` Mark
- `10:41` Zuckerberg
- `11:48` Elipareser
- `11:54` 1980
- `12:42` Pariser
- `13:19` Aperte
- `13:23` YouTube
- `13:37` 1977
- `13:37` Salar
- `13:37` Camangar
- `15:00` Google
- `15:02` Paul
- `15:02` Covington
- `15:02` Adams
- `15:04` Emere
- `15:04` Sargin
- `15:16` Susan
- `15:16` Watik
- `15:18` 1968
- `15:31` Jeff
- `15:31` Dean
- `16:47` AlphaGo
- `17:19` Hasting
- `17:37` Pariseiro
- `17:44` Jean

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_O Algoritmo de Recomendacao.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 12, audio entregou 10. DIVERGE
- **Janela temporal (2006 a 2016):** declarada na capa. Fecho cita ano.
- **Anos que o audio falou e nao estao no roteiro:** 1947, 1960, 1968, 1977, 1980, 1984, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2017, 2020, 2021, 2024, 2026 (conferir com `--confere`)
- **Protagonistas citados no audio:** Contar, Dean, Eles, Facebook, Funk, Google, Hastings, Hinton, Jeff, Netflix, Ninguem, Pariser, Quem, Simon, Susan, YouTube, Zuckerberg
- **Protagonistas do roteiro AUSENTES no audio:** Fechar, Kamangar, Reed, Wojcicki (ou o audio pulou, ou o modelo pequeno escreveu errado)

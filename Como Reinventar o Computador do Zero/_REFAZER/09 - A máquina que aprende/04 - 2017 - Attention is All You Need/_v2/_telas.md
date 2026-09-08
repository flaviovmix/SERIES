# Mapa das telas (gerado do audio, 16.9 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 02:02 | - |
| 2 | 02:02 | 01:19 | - |
| 3 | 03:21 | 01:08 | - |
| 4 | 04:30 | 01:21 | - |
| 5 | 05:52 | 03:11 | **Sim** |
| 6 | 09:03 | 02:24 | **Sim** |
| 7 | 11:28 | 01:24 | **Sim** |
| 8 | 12:52 | 01:10 | - |
| 9 | 14:02 | 01:34 | **Sim** |
| 10 | 15:37 | 01:15 | **Sim** |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 02:02, 02:02)

2017, attention is all you need. É, chegamos lá. Bom, retomando de onde paramos, a gente viu que, lá em 2012, a máquina, no caso a Alex Net, aprendeu a olhar para uma imagem inteira de uma única vez. E ali, o programa passou a ser achado pela máquina, não mais escrito linha por linha, né? Exatamente. Só que texto é bem diferente de imagem. Pois é, texto não é imagem. Uma frase é, essencialmente, uma fila indiana de palavras. Então, fica o problema, como é que uma máquina, que, por natureza, adora processar tudo ao mesmo tempo, consegue ler uma fila? E a verdade é que, por 20 anos, ela leu um fila mesmo, e a área pagou preço por isso. A grande virada, que é o foco de hoje, aconteceu em 2017, quando eles simplesmente tiraram a fila do processo. Tem uma analogia ótima para isso, a da mesa de reunião. Na leitura em fila clássica, as palavras estão sentadas numa fileira comprida, passando um bilhete umas para as outras. Esse bilhete vai se apagando, sabe? Sim, a informação vai sumindo. Exato. Já na nova solução que venceu a chamada Atenção ou Transformer, é como se todas as palavras sentassem numa mesa redonda, ao mesmo tempo, olhando umas para as outras para decidir quem elas devem escutar. E o fio condutor desse nosso mergulho, que, aliás, é o último da nossa série, vai cobrir de 1997 até 2018. Lembrando que a fila do texto correu paralelamente a fila da imagem. Não é uma viagem no tempo. Ah, sim, importante pontuar. É. E a tese central aqui é que o modelo que venceu de vez em 2017 foi um software desenhado literalmente com a forma do hardware. E antes da gente entrar nos detalhes, um aviso operacional rápido. Este áudio acompanha 12 telas animadas. Para quem está só ouvindo, não se preocupe, dá para entender tudo perfeitamente. Mas para quem está com a página aberta, é só virar a tela quando ouvir o pedido. Então, para virar a rede que lê em fila ganhar memória, aperte o próximo.

### Tela 2 (02:02 a 03:21, 01:19)

Então, para virar a rede que lê em fila ganhar memória, aperte o próximo. Bom, o maior desafio técnico dessa leitura em fila lá no começo era justamente a memória. A rede lia uma palavra por passo, guardando um resumo que é sendo reescrito o tempo todo. O bilhete apagando. Isso. Depois de passar por umas 20 palavras, o começo da frase simplesmente sumia. E o erro matemático, que volta durante o treino para corrigir a rede, também se apagava no caminho. Aí entram aqueles dois pesquisadores em Munique, né? Cep Rock Heiter, nascido em 1967, tinha 30 anos, vivo em 2026. Jürgen Smith-Huber, nascido em 1963, tinha 34 anos, vivo em 2026. Eles desenharam uma célula nova com portões lógicos e específicos. Um portão para guardar informação, outro para esquecer e um para mostrar. A famosa LSTM, a memória de curto e longo prazo. Isso mesmo. Com ela, aquele resumo para de se apagar tão rápido. Resolveu o problema do esquecimento, então? Resolveu a memória. Mas e o limite entre o hardware e o software? A leitura continuava acontecendo em fila, um passo depois do outro. E um algoritmo que roda em fila não consegue aproveitar o poder da placa de vídeo, que é um hardware que quer calcular tudo de uma vez. Fica subutilizada, né? Para ver duas dessas redes traduzindo uma frase, aperte o próximo, aí, avançando

### Tela 3 (03:21 a 04:30, 01:08)

Para ver duas dessas redes traduzindo uma frase, aperte o próximo, aí, avançando Outra Setembro de 2014, surge no Google um tradutor novo, construído com duas dessas LSTMs emendadas. E ele é sua discover, nascido em 1986, tinha 27 anos, vivo em 2026. Oriol Vinhos, nascido em 1983, tinha 31 anos, vivo em 2026. Coaclé, nascido em 1982, tinha 32 anos, vivo em 2026. O desenho deles era bem interessante. A primeira rede só lê a frase em inglês e guarda um resumo final, uma lista fixa de números. A segunda rede pega só esse resumo e começa a escrever em francês, palavra por palavra. Só que aí a gente bate num gargalo, óbvio, né? Imagina tentar expremer uma frase inteira, seja ela curtinha ou um parágrafo enorme, dentro de um único vetor fixo. As frases mais longas perdem qualidade muito rápido. Com certeza, o software deles encontrou um limite de memória imposto pelo próprio desenho, não pelo hardware em si. Eles teriam que mudar essa arquitetura. Entendi. Pra ver a rede parar de expremer tudo num resumo só, aperte o próximo.

### Tela 4 (04:30 a 05:52, 01:21)

Pra ver a rede parar de expremer tudo num resumo só, aperte o próximo. A grande mudança estrutural vem de um grupo imontreal. Eles apresentaram a ideia em setembro de 2014 e publicaram numa conferência em maio de 2015. E o Cho Ben Ju, nascido em 1964, tinha 50 anos, vivo em 2026. Kim Hyun Choo, nascido em 1985, tinha 29 anos, vivo em 2026. Teve também um doutorando focado no desenvolvimento com eles. A ideia que eles trouxeram foi a atenção. A segunda rede, a que escreve, não recebe mais apenas um resumo só lá no final. Ah, ela passa a receber todos os resumos parciais gerados ao longo da frase, né? Exato. Ao escrever cada palavra nova, ela olha para todas as palavras da entrada e dá um peso para cada uma. Por exemplo, ao traduzir o gato preto para inglês, na hora exata de escrever black, a rede olha muito mais para a palavra preto. Faz todo sentido. E o resultado é que as frases longas pararam de perder sentido e a rede ainda mostrava matematicamente em quais palavras ela se apoiou para tomar decisão. Foi um passo gigantesco. Eles contornaram o gargalo, colocando muito mais conta para rodar em paralelo, o que a placa de vídeo adora. Só que a leitura da entrada e a escrita da saída ainda aconteciam na bendita fila. É, para ver isso traduzindo para milhões de pessoas, aperte o próximo.

### Tela 5 (05:52 a 09:03, 03:11)

É, para ver isso traduzindo para milhões de pessoas, aperte o próximo. Mesmo com a fila segurando o potencial, o Google colocou esse modelo em produção. Em setembro de 2016, para a chinesa inglês e em novembro para oito línguas, o português incluído. Dentro, o sistema era pesado, né? Eram oito camadas de LST só lendo, mas oito camadas escrevendo, e essa tensão operando ali no meio. O custo disso era astronômico. Para treinar, levavam seis dias inteiros rodando em 96 placas de vídeo poderosas. E na hora de entregar a tradução, a fila persistia, uma palavra calculada por passo. Então, para rodar isso de um jeito mais barato e rápido, o Google precisou criar um hardware próprio, a TPU, a Unidade de Processamento de Tensores. Eles a usavam ela desde 2015. Sim, projetada por um engenheiro-líder que era da Antica Deck. E a TPU não é um processador comum. Ela é uma grade maciça de 256x256 multiplicadores. Ela basicamente só multiplica grandes tabelas de números, mas tudo ao mesmo tempo. Ou seja, assim como lá no perceptron de 1960, o software de novo exigiu um hardware sob medida. Mas o problema de incompatibilidade volta. Esse hardware que é tudo ao mesmo tempo. E a fila da LSTM se torna um obstáculo. O gargalo virou a fila. Exato. Para ver oito pessoas tirarem a fila de uma vez por todas, aperte próximo. A data crucial aqui é 12 de junho de 2017. O lançamento do artigo Attention Is All You Need. Traduzindo, atenção é tudo de que você precisa. E os nomes são Ashish Vazhwani, Noam Shazer, Nicky Palmer, Jacob Ushkoreit, Leon Jones, Aidan Gomes, Lucas Heiser, Ilha Polosukhin. Um fato interessante é que todos estão vivos em 2026. O mais novo deles era um estagiário de 20 anos na época. E até 2023, todos esses oito autores já tinham saído do Google. O que eles propuseram foi radical. Eles simplesmente tiraram a fila. Adeus para LSTM. Nesse novo modelo que eles chamaram de Transformer, todas as palavras entram juntas na máquina. Elas olham umas para as outras através de camadas puras de atenção. Isso confirma aquela tese que a gente falou na abertura. Sem a fila, o trabalho vira exclusivamente multiplicar enormes tabelas de números. Que a única coisa que a placa de vídeo e a TPU sabem fazer de melhor. É lindo de ver. O software finalmente tomou a forma exata do hardware. E os resultados foram imediatos. O modelo base tinha 65 milhões de botões. E treinou em 12 horas, usando só 8 placas percenda em vídeo. O modelo grande deles levou 3 dias e meio. E entregou uma tradução superior em uma fração do tempo antigo. Para resumir esse arco. De 1997 a 2016, o esforço foi tentar lembrar melhor das coisas dentro de uma fila. Em 2017, eles desistiram da fila inteira para o software caber direito na peça física. Para ver como uma palavra vira número, aperte o próximo.

### Tela 6 (09:03 a 11:28, 02:24)

Para ver como uma palavra vira número, aperte o próximo. Bom, a primeira coisa que o Transformer faz é pegar cada palavra e transformar numa lista de centenas de números. Esses números são botões que giram no treino. O resultado é que palavras com sentidos parecidos ganham números parecidos. Gato e cachorro ficam perto. Mas gato e imposto ficam longe. Mas peraí, tem um problema lógico agora. Se todas as palavras entram na máquina juntas sem fila nenhuma, como é que o modelo sabe a ordem? A frase o cachorro mordeu o homem, entraria com os mesmos números que o homem mordeu o cachorro? A sintasse iria para o espaço. Sim. A sacada deles foi criar um carimbo de posição. Eles criaram listas de números baseadas puramente na posição espacial da palavra na frase. E aí somam esses números na lista original da palavra. Ah, entendi. Usando a nossa analogia, seria como dar um crachá com o número da cadeira para a palavra antes de ela sentar na mesa redonda. Isso mesmo. A ordem do texto volta a existir, mas a fila do processamento não. Caramba, ou seja, para poder usar os multiplicadores paralelos do hardware, o software abriu um mão de uma vantagem sequencial óbvia, que é a ordem natural de ler, e trocou isso por uma conta matemática de soma, para ver a tensão virar a multiplicação a perte próximo. E a conta de como uma palavra escuta outra é enginhosa. De cada palavra original, o modelo gera três novas listas. A pergunta, a etiqueta e o conteúdo. Aham. E para saber o quanto a palavra A precisa escutar a palavra B, a máquina simplesmente compara a pergunta da palavra A com a etiqueta da palavra B. E o resultado dessa comparação vira um peso, certo? Exato. Baseado nesse peso, a palavra recebe a soma dos conteúdos das outras. E o pulo do gato é que isso tudo é só conta de tabela. Comparar as perguntas com as etiquetas é só multiplicar duas tabelas. Somar esses conteúdos depois é multiplicar outra tabela. E o transformer original não faz isso uma vez só. Ele faz oito operações de atenção dessas ao mesmo tempo. As oito cabeças paralelas. Assim, enquanto uma cabeça foca no sujeito, a outra foca no pronome. E tudo isso, multiplicar essas tabelas, é exatamente a matemática nativa da antiga placa GeForce 256 e também da TPU. Nada no transformer precisa esperar o passo anterior acabar. Tudo roda solto. Para ver o que se fez com isso no ano seguinte, aperte o próximo.

### Tela 7 (11:28 a 12:52, 01:24)

Para ver o que se fez com isso no ano seguinte, aperte o próximo. Então, modelo GPT. Ele foi escrito por Alec Radford e Ilha Sutzkever. Alec Radford, nascido em 1993, tinha 25 anos, vivo em 2026. E o detalhe é que o GPT usa só a metade do transformer que se encarrega de escrever. A tarefa principal era só prever a próxima palavra. Treinado com 117 milhões de botões e um banco de 7 mil livros. E poucos meses depois, em 11 de outubro de 2018, o Google lança o Baird. O autor principal desse artigo não tem nome público. O Baird fez o caminho oposto e usa só a metade do transformer focada em ler. A tarefa dele era adivinhar palavras que o sistema escondia de propósito nas frases. Ele começou com 340 milhões de botões e rapidamente virou o padrão por trás dos sistemas de busca. A gente consegue ver um padrão claro surgindo aí. É a mesmíssima peça de 2017, cortada ao meio, sendo treinada em texto cru, sem ninguém para rotular nada. O programa passa a ser achado uma vez e ajustado para resolver qualquer coisa. O software virou uma receita pronta, né? O único ingrediente que passou a limitar o avanço a partir daí foi o hardware. Quantas placas você tem e por quanto tempo você pode rodar a máquina? Pois é. Para ver a receita crescer, aperte o próximo.

### Tela 8 (12:52 a 14:02, 01:10)

Para ver a receita crescer, aperte o próximo. A escalada dos números a partir de 2018 é de tirar o fôlego. Só olhando para os tamanhos. Começou lá com 65 milhões em 2017. Foi para 117 milhões em 2018. Já em fevereiro de 2019 bateu 1,5 bilhão e em maio de 2020 pulou para 175 bilhões. E o mais impressionante, aquela peça à base de 2017 é a mesma. O modelo é o mesmo. A única coisa que muda é a quantidade colossal de texto injetada e o número de placas rodando. É a corrida lá do nosso primeiro episódio começando em outra escala. As empresas passam a comprar milhares de placas. NVIDIA vira a empresa mais valiosa da indústria inteira. Tanto que, até 2023, os oito autores daquele primeiro artigo tinham saído do Google para fundar as próprias empresas apostando nessa mesma ideia à base. Foi um momento histórico porque pela primeira vez o software passou a editar o tamanho físico do hardware. A peça, o galpão, a energia, tudo desenhado para o programa caber dentro, não o contrário. Para olhar a série inteira de uma vez, aperte o próximo.

### Tela 9 (14:02 a 15:37, 01:34)

Para olhar a série inteira de uma vez, aperte o próximo. Bom, depois de tanto tempo, vale a pena olhar para tudo o que construímos. Com certeza, a gente começou da pedra digitalizando na canaleta, lá no hábaco. Depois fomos para as engrenagens que automatizavam o movimento do vaivém mecânico, entrou a eletricidade que tirou a peça mecânica, vimos a lógica de bully provando que decisões de sim e não podiam morar em relés e válvulas. Aí veio von Neumann colocando tanto programa quanto os dados dividindo a mesma memória. O transistor e o microprocessador encolheram isso tudo até a máquina bater de frente com a parede do calor. Foi quando a placa feita para jogo virou uma máquina de conta paralela até que finalmente a rede passou a achar o próprio programa. E o resumo técnico da máquina de 2018 ainda é bully mais von Neumann executando o programa. Fato. A placa de vídeo mais avançada do mundo ainda é um mar de portas lógicas rodando instruções escritas por alguém. No nível do chip sim. Mas a ruptura está em outro lugar. O programa de inteligência que essa lista de instruções ajuda a executar hoje é achado. São bilhões de botões que são girados pelo erro matemático. Um programa que nenhum humano sentou para escrever e que ninguém, nem os próprios criadores, sabe ler direito. Porque ninguém planejou esse conjunto de anti-mão. A peça nova de hardware abriu caminho para um modelo novo de programa e o modelo novo exigiu uma peça muito maior. E é esse conjunto operando junto que é o computador hoje. Para fechar a série aperte o próximo.

### Tela 10 (15:37 a 16:52, 01:15)

Para fechar a série aperte o próximo. É o ciclo se completou. A nossa jornada histórica para por aqui no ano de 2018 com a receita dessa tecnologia crescendo a partir do consumo de texto cru. E se a gente fizer um balanço nominal de quem participou dessa última etapa, a lista impressiona. Roche Hater e Smith-Huber deram a memória fundamental para a leitura em fila. Suttskever, Vinyouse e Leia conseguiram traduzir usando duas filas, mas deram de cara com o gargalo. Bem-juichou abriram esse gargalo ensinando a rede a olhar para todas as palavras de uma vez. Os oito do Google finalmente tiraram a fila da jogada e casaram perfeitamente o software com a peça física. E o Headford cortou a peça e simplesmente mandou ela adivinhar a próxima palavra. E o mais marcante é que ninguém planejou essa sucessão. As peças correram até a parede do calor. A peça de jogo virou máquina paralela de conta. Uma ideia de 1958 achou a peça barata e o programa passou a ser achado. O software tomou a forma do hardware, recomeçando a corrida em outra escala. A série reconstruiu o computador do zero, da pedra do hábaco ao botão da rede e a máquina no fim ainda é a mesma máquina. O que mudou de vez foi quem escreve o programa.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `00:04` Alex
- `01:07` Atenção
- `01:07` Transformer
- `01:24` 1997
- `02:30` Munique
- `02:34` 1967
- `02:34` Rock
- `02:34` Heiter
- `02:41` 1963
- `02:41` Smith-Huber
- `02:55` LSTM
- `03:26` Setembro
- `03:26` Google
- `03:26` LSTMs
- `03:34` 1986
- `03:40` 1983
- `03:40` Vinhos
- `03:47` 1982
- `04:44` 1964
- `04:50` 1985
- `04:50` Hyun
- `04:50` Choo
- `06:35` Unidade
- `06:35` Processamento
- `06:35` Tensores
- `06:43` Antica
- `06:43` Deck
- `07:00` 1960
- `07:26` Attention
- `07:26` Need
- `07:32` Ashish
- `07:32` Vazhwani
- `07:32` Noam
- `07:32` Shazer
- `07:32` Nicky
- `07:32` Palmer
- `07:32` Jacob
- `07:32` Ushkoreit
- `07:32` Leon
- `07:32` Jones
- `07:39` Gomes
- `07:39` Lucas
- `07:39` Heiser
- `07:39` Ilha
- `07:39` Polosukhin
- `11:19` GeForce
- `11:33` Alec
- `11:33` Radford
- `11:33` Sutzkever
- `11:37` 1993
- `11:58` Baird
- `14:30` Neumann
- `15:55` Hater
- `16:00` Vinyouse
- `16:00` Leia
- `16:19` Headford
- `16:32` 1958

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_Attention is All You Need.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 12, audio entregou 10. DIVERGE
- **Janela temporal (1997 a 2018):** declarada na capa. Fecho cita ano.
- **Anos que o audio falou e nao estao no roteiro:** 1958, 1960, 1963, 1964, 1967, 1982, 1983, 1985, 1986, 1993, 2012, 2014, 2015, 2016, 2019, 2020, 2023, 2026 (conferir com `--confere`)
- **Protagonistas citados no audio:** Alec, Attention, Cada, Como, Duas, Fazer, Fechar, Google, Jurgen, Need, Neumann, Oriol, Radford, Transformer
- **Protagonistas do roteiro AUSENTES no audio:** AlexNet, Bengio, Boole, Contar, Hochreiter, Ilya, Kyunghyun, Quoc, Schmidhuber, Sepp, Shazeer, Sutskever, Vaswani, Vinyals, Yoshua (ou o audio pulou, ou o modelo pequeno escreveu errado)

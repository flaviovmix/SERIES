# Mapa das telas (gerado do audio, 10.8 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 01:17 | - |
| 2 | 01:17 | 01:02 | - |
| 3 | 02:19 | 01:02 | - |
| 4 | 03:21 | 00:50 | - |
| 5 | 04:12 | 00:53 | - |
| 6 | 05:06 | 00:43 | - |
| 7 | 05:50 | 00:45 | - |
| 8 | 06:36 | 00:53 | - |
| 9 | 07:29 | 00:46 | - |
| 10 | 08:16 | 01:08 | - |
| 11 | 09:25 | 01:22 | **Sim** |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 01:17, 01:17)

2017. Attention is all you need. É, o título inglês, Attention is all you need, que traduzindo significa Atenção é tudo que você precisa. Bom, neste nosso mergulho profundo de hoje, a gente vai cobrir os eventos da tecnologia de 1997 até 2018. Tudo em ordem cronológica. Isso aí. E há um aviso super importante para quem está ouvindo. A nossa página aqui de acompanhamento tem 12 telas no total. Mas quem está só no áudio acompanha normalmente, viu? Está tudo certo. Pode ficar super tranquilo. Então, para a gente contextualizar, o nosso papo anterior terminou no ano de 2012. Isso, com a famosa rede AlexNet. Exato. A AlexNet chocou o mundo porque ela conseguia ler imagens inteiras de uma só vez. As placas de vídeo adoram esse processamento paralelo. Mas aí ficou aquele obstáculo gigantesco. Como é que uma máquina que gosta de fazer tudo ao mesmo tempo vai conseguir ler um texto? Pois é. Porque texto, diferente da imagem, é uma fila de palavras, né? E a resposta que a gente vai ver a fundo hoje veio em 2017. Basicamente, os pesquisadores tiraram a fila da jogada. E criaram o software desenhado exatamente com a forma do hardware. Aperte o próximo.

### Tela 2 (01:17 a 02:19, 01:02)

Aperte o próximo. Para entender o drama dessa fila, a gente tem que ir para 1997, lá em Munique. Tá. Temos o SEP Roheiter, que a gente diz Roheiter, nascido em 1967, com 30 anos naquela cena e que tá vivo. Certo. Quatro anos, também vivo. Eles tentaram consertar a leitura em fila criando a LSTM. LSTM, que significa memória de curto e longo prazo. Perfeito. A rede usava uns portões para decidir matematicamente o que guardar e o que esquecer. Para não perder logo o sentido da primeira palavra da frase. Para quem tá acompanhando a gente, imagina uma mesa de reunião gigantesca com todo mundo sentado em fila. A rede tenta resumir a frase, passando um bilhete de mão em mão por essa mesa. Isso. A cada pessoa que é a palavra, o bilhete é apagado e reescrito. E ninguém fala antes do colega terminar. E o problema da LSTM é que, mesmo ajudando muito, depois de umas 20 palavras, o começo daquele bilhete já tá quase apagado. Nossa, o contexto se perde todo. Aperte o próximo.

### Tela 3 (02:19 a 03:21, 01:02)

Nossa, o contexto se perde todo. Aperte o próximo. E aí, a gente avança para 2014 no Google. Onde a coisa complicou. Muito. A equipe tinha o William Suthskever, nascido em 1986, com 27 anos naquela cena. Vivo. Byte-equipe. Sim. E o Oriol Vinyales, nascido em 1983, com 31 anos. Vivo. E o Cochle, nascido em 1982, com 32 anos e que também está vivo. E o que eles fizeram? Eles pegaram duas redes LSTM e juntaram as duas para traduzir textos. Uma rede lia o inglês e comprimia tudo num resumo, um vetor fixo de números. A outra rede pegava só esse resumo e diz impacotava, escrevendo em francês. Mas peraí, tem um problema muito óbvio nessa arquitetura, não tem? Com certeza. É o tal do gargalo do vetor único. Se for uma frase longa, o significado vai ser totalmente exprimido num resumo fixo. Exatamente. É tipo tentar enfiar um guarda-op inteiro dentro de uma mala de mão, uma mala rasga. O software bateu num limite arquitetônico. Aperte o próximo.

### Tela 4 (03:21 a 04:12, 00:50)

O software bateu num limite arquitetônico. Aperte o próximo. E a solução para esse gargalo surgiu entre 2014 e 2015. Lá em Montreal. Montreal. Nacia a atenção. Isso. O grupo do Yoshua Benjiu, nascido em 1964, com 50 anos naquela cena. Vivo. Junto com o Qiong Yun Chou, nascido em 1985, com 29 anos vivo, e um doutorando deles. Eles introduziram a ideia da atenção. Que mudou tudo. Em vez de um único resumo espremido, a rede que escrevia passou a receber vários resumos parciais. Então, quando a rede escrevia a palavra black em inglês, ela podia focar e dar um peso bem maior para a palavra preto lá na frase original. Isso. Sem perder o contexto longo. O gargalo sumiu. Brilhante. Aperte o próximo.

### Tela 5 (04:12 a 05:06, 00:53)

Brilhante. Aperte o próximo. Só que aí tem o choque de realidade de 2016. O tradutor do Google vai para a produção usando essas redes LSTM com atenção no meio. E o custo foi absurdo. Treinar o modelo desses levavam seis dias usando 96 placas de vídeo. E na hora de usar, a leitura ainda era feita em fila. O hardware odiava isso. E foi aí que o Google detalhou a criação da TPU. A TPU. Unidade de processamento de tensores. Um chip gigante com uma grade de 256 por 256 pequenos multiplicadores. Feito só para multiplicar tabelas de números de forma simultânea. Ou seja, o hardware implorava por paralelismo. Mas o bem dito software, a LSTM, forçava todo mundo a trabalhar na fila. Um desencontro total. Aperte o próximo.

### Tela 6 (05:06 a 05:50, 00:43)

Aperte o próximo. E então a gente chega no ponto de virada. 12 de junho de 2017. O artigo histórico é publicado. Atenção, é tudo que você precisa. Inscrito por oito pesquisadores do Google. Vasvani, Vasuani, Shazir, Shazir, Parmar, Parmar, Uscorate, Uscorate, Leon Jones, Leon Jones, Gomes, Gomes, Kaiser, Kaiser e o Polossukim, Polossukim. E a decisão deles foi radical. Eles simplesmente pegaram a LSTM e jogaram no lixo. Adeus, fila. Eles criaram o Transformer. Transformer. No Transformer, todas as palavras entram ao exato mesmo tempo. Aperte o próximo.

### Tela 7 (05:50 a 06:36, 00:45)

Aperte o próximo. Mas olha, isso levanta a pergunta de um milhão de dólares. Pode fazer. Se a rede ler todas as palavras ao mesmo tempo, como é que ela sabe a ordem? Porque a frase, o cachorro mordeu o homem. E o homem mordeu o cachorro, virariam a mesma bagunça de palavras, né? É, mas a gente tem que lembrar que palavra vira número. Palavras com significados próximos, tipo cachorro e gato, ficam agrupadas juntas da matemática. Tá, a semântica tá ali. Mas e a ordem? Eles criaram o Carimbo de Posição. Voltando pra nossa mesa de reunião, é como se todo mundo sentasse numa mesa redonda. Todos ao mesmo tempo. Mas cada um ganhou um crachá, um carimbo com o número exato da cadeia que ocupava na fila. Que sacada genial! Aperte o próximo.

### Tela 8 (06:36 a 07:29, 00:53)

Aperte o próximo. E a matemática por trás disso é genial. Cada palavra gera três listas de números. Em português a gente chama de pergunta, etiqueta e conteúdo. Pergunta, etiqueta e conteúdo. Isso. A máquina pega e compara as perguntas de uma palavra com as etiquetas de todas as outras, tudo de uma vez. E o que isso significa na prática pra máquina? Pure e simples multiplicação de matrizes gigantescas. É exata a conta que as GPUs e a TPUs amam fazer. O Transformer foi desenhado à imagem do hardware. Caramba! E os números desses saltos são malucos. O modelo original tinha 65 milhões de parâmetros. Sabe quanto tempo levava o treinamento? Bem menos de seis dias, aposto. Apenas 12 horas. E usando só oito placas PC na Nvidia. Em Nvidia. O resultado foi a melhor tradução da época numa fração ínfima do tempo. Aperte o próximo.

### Tela 9 (07:29 a 08:16, 00:46)

Aperte o próximo. E o mais legal é que em 2018 os pesquisadores perceberam que podiam separar o Transformer. Verdade. Na OpenAI, OpenAI, a gente tem o Alec Redford. Redford. Nascido em 1993 com 25 anos na cena, vivo. Ele e o Vílias Tsutsukever pegaram só a parte do Transformer que escreve. E aí, na sua GPT? GPT, com 117 milhões de pesos. Treinado com 7 mil livros só com o objetivo de prever a próxima palavra. E do outro lado, o Google pegou a parte que lê e criou o BIRT. O BIRT, com 340 milhões de parâmetros, focado totalmente em adivinhar palavras escondidas em textos da internet. Sem humano rotulando nada. Aperte o próximo.

### Tela 10 (08:16 a 09:25, 01:08)

Aperte o próximo. E com essa facilidade, a receita cresceu de forma assustadora. Foi uma explosão de escala, né? De mais, saindo daqueles 65 milhões de parâmetros em 2017, o mercado foi para 1,5 bilhão em 2019. Melo Deus. E bateu 175 bilhões em maio de 2020. Não é surpresa nenhuma que a NVIDIA tenha virado a empresa mais valiosa do setor. Porque a partir daí, o tamanho do software começou a editar o tamanho do hardware a ser construído, e não o oposto. Exato, os supercomputadores passaram a ser moldados para rodar esse software gigantesco. Aperte próximo. E poxa, isso liga aos pontos de toda a evolução da computação que a gente abordou. É um arco histórico fascinante. Totalmente. A gente começou lá atrás, movendo uma simples pedra no hábaco, passou por toda aquela genialidade da lógica de bully, bully. Sim, o raciocínio matemático de zeros e uns. Chegamos na arquitetura clássica, de von Neumann, von Neumann. E nessas portas lógicas, baseadas em silício. O que nos leva à epifania de 2018. Aperte o próximo.

### Tela 11 (09:25 a 10:47, 01:22)

Aperte o próximo. A grande mudança de paradigma. Porque no fundo, as GPUs e as redes neurais continuam sendo baseadas em bully e von Neumann. Zeros, uns, uma lista de instruções no silício. É verdade. A máquina, na sua essência física, continua sendo exatamente a mesma. O que mudou de forma drástica foi o programa Como assim? Ele deixou de ser aquela lista imensa de regras escritas à mão por engenheiros e virou algo orgânico. Hoje, são bilhões de botões que a máquina ajusta sozinha, baseada nos próprios erros, usando as placas de vídeo. E a gente não consegue nem ler esses bilhões de parâmetros ajustados pelo Transformer. Pois é. O que nos deixa com um pensamento bem provocativo para fechar. E a gente encerra nossa linha do tempo aqui no ano de 2018. Se nós não escrevemos mais o código vital e mal compreendemos o que essas nuvens de dados formam lá dentro. O que vem pela frente. Exato. O que vai acontecer quando os hardware do futuro começarem a ser inteiramente projetados não mais por engenheiros humanos, mas por esses mesmos programas achados nessas nuvens que a gente não domina completamente. Fica aí essa pergunta para o pessoal Matotá. Até o próximo mergulho.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `00:00` Attention
- `00:11` 1997
- `00:29` Está
- `00:39` AlexNet
- `01:18` Munique
- `01:24` 1967
- `01:24` Roheiter
- `01:32` Quatro
- `01:35` LSTM
- `02:19` Aperte
- `02:23` Google
- `02:27` 1986
- `02:27` William
- `02:27` Suthskever
- `02:27` Vivo
- `02:35` 1983
- `02:35` Oriol
- `02:35` Vinyales
- `02:41` 1982
- `02:41` Cochle
- `03:25` Montreal
- `03:34` 1964
- `03:34` Yoshua
- `03:34` Benjiu
- `03:43` 1985
- `03:43` Qiong
- `03:43` Chou
- `05:19` Vasuani
- `05:19` Shazir
- `05:19` Parmar
- `05:26` Uscorate
- `05:26` Leon
- `05:26` Jones
- `05:26` Gomes
- `05:33` Kaiser
- `05:33` Polossukim
- `05:44` Transformer
- `06:18` Carimbo
- `06:18` Posição
- `07:01` GPUs
- `07:01` TPUs
- `07:21` Nvidia
- `07:37` OpenAI
- `07:37` Alec
- `07:37` Redford
- `07:43` 1993
- `07:47` Vílias
- `07:47` Tsutsukever
- `08:02` BIRT
- `08:33` Deus
- `08:38` NVIDIA
- `09:14` Neumann
- `10:43` Matotá

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_Attention is All You Need.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 12, audio entregou 11. DIVERGE
- **Janela temporal (1997 a 2018):** declarada na capa. Fecho cita ano.
- **Anos que o audio falou e nao estao no roteiro:** 1964, 1967, 1982, 1983, 1985, 1986, 1993, 2012, 2014, 2015, 2016, 2019, 2020 (conferir com `--confere`)
- **Protagonistas citados no audio:** Alec, AlexNet, Attention, Como, Duas, Fazer, Fechar, Google, Need, Neumann, Oriol, Transformer, Yoshua
- **Protagonistas do roteiro AUSENTES no audio:** Bengio, Boole, Contar, Hochreiter, Ilya, Jurgen, Kyunghyun, Quoc, Radford, Schmidhuber, Sepp, Sutskever, Vinyals (ou o audio pulou, ou o modelo pequeno escreveu errado)

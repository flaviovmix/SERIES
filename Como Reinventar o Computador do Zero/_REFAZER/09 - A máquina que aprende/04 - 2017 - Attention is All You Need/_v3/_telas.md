# Mapa das telas (gerado do audio, 14.5 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 01:53 | - |
| 2 | 01:53 | 01:18 | **Sim** |
| 3 | 03:12 | 01:26 | - |
| 4 | 04:39 | 01:15 | - |
| 5 | 05:54 | 01:26 | - |
| 6 | 07:20 | 00:45 | - |
| 7 | 08:05 | 00:49 | - |
| 8 | 08:54 | 02:00 | - |
| 9 | 10:54 | 00:53 | - |
| 10 | 11:47 | 01:05 | - |
| 11 | 12:52 | 00:48 | - |
| 12 | 13:40 | 00:51 | **Sim** |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 01:53, 01:53)

2017. Atenção is all you need. Esse é o quarto e último episódio da etapa A Máquina Que Aprende, a Nona e o último etapa da nossa série Como Reinventar o Computador do Zero e o último episódio de toda a série. É, chegamos no grande final. Pois é. E o nosso mergulho profundo anterior terminou em 2012, na arquitetura AlexNet. Foi aquele momento, sabem que as máquinas aprenderam a olhar para imagens inteiras de uma só vez. Aham. Aproveitando ao máximo o processamento paralelo. Isso. E aí a gente deixou uma pergunta no ar. Como uma máquina que adora fazer cálculos simultâneos ler um texto, que é, por natureza, uma fila de palavras? Uma palavra rigorosamente atrás da outra, né? Exato. E a resposta que revolucionou tudo que surgiu em 2017 foi simplesmente tirando a fila. Parece simples falando assim, mas foi uma mudança estrutural massiva. O nosso foco hoje é traçar exatamente essa jornada, de 1997 até 2018, em ordem. E olha, vale um esclarecimento de cara. A gente não está fazendo uma viagem de volta no tempo, tá? Boa. É importante ponto a isso. É, porque a pesquisa para processar fila do texto correu, tipo, de forma totalmente simultânea, a fila da imagem. A gente vai ver como o software, depois de anos tentando forçar essa leitura em fila, finalmente desistiu e assumiu a exata forma do hardware. É fascinante. É como se a gente tentasse entender a planta de uma casa inteira olhando só pelo buraco da fechadura, sabe? Um cômodo de cada vez. Nossa, perfeita analogia. E a solução que eles encontraram não foi, tipo, alargar o buraco da fechadura. Foi derrubar a porta inteira. Adorei. E pré-estruturar tudo isso à nossa página de animação, que acompanha um episódio, que tem 12 telas, tá? Quem está só ouvindo acompanha toda a ideia normalmente, sem problemas. A gente só vai dar o comando para avançar as imagens dos momentos exatos. Então, bora lá, aperte o próximo.

### Tela 2 (01:53 a 03:12, 01:18)

A gente só vai dar o comando para avançar as imagens dos momentos exatos. Então, bora lá, aperte o próximo. Bom, o nosso primeiro grande marco nos leva a Munique, no ano de 1997. É aqui que entram em cena o SEP-Hoschwriter, nascido em 1967, tinha 30 anos naquela cena, vivo em 2026. Foram eles que criaram a famosa arquitetura LSTM. Exato, a LSTM, que significa memória de curto e longo prazo. O grande problema das redes anteriores que eles queriam resolver é que ao ler as palavras em fila, o resumo ia sendo reescrito por consecutivamente. A máquina basicamente esquecia o início da frase, né? O sinal matemático e o sinal e o sinal. A máquina basicamente esquecia o início da frase, né? O sinal matemático e, tipo, desbotando. Aham. O sinal diluía. Imagina-lhe um parágrafo longo e, no final, a identidade do sujeito lá da primeira linha já tinha assumido no mar de novas multiplicações. E como a LSTM resolveu isso na época? Eles usaram portões. Eram pequenos portões lógicos dentro da rede que decidiu o que guardar no longo prazo e o que esquecer imediatamente. Isso prolongou a memória da máquina. Mas, assim, a fila continuava lá. Ah, sim. A geometria continuava saindo de uma fila. Aperte o próximo.

### Tela 3 (03:12 a 04:39, 01:26)

Ah, sim. A geometria continuava saindo de uma fila. Aperte o próximo. E aí, a gente dá um salto para 2014 lá no Google. Isso, no laboratório do Google. A equipe tinha o William Sudskever, nascido em 1987, tinha 27 anos naquela cena, vivo em 2026. O Oriel Vinyls, nascido em 1983, tinha 31 anos naquela cena, vivo em 2026. E o Coquelé, nascido em 1982, tinha 32 anos naquela cena, vivo em 2026. Um time de peso. Com certeza. E eles propuseram usar duas redes LSTM trabalhando juntas para a tradução. A primeira rede lia o texto inteiro em português, por exemplo. Acumulava o contexto e criava um vetor fixo, que era tipo um resumo matemático e mutável. Tá. E a segunda? A segunda pegava só esse vetor e começava a escrever a tradução em inglês. Espera, mas isso só acumuleu um livro inteiro do Dostoevsky e se é obrigado a resumir tudo num único pochete antes de começar a traduzir. Frases longas não perdiam muita informação nesse funil? Exatamente. É o que ficou conhecido como o gargalo do vetor único. A compressão extrema causava uma perda irreparável. A segunda rede começava a traduzir o final de uma frase superlonga e a matemática já não dava mais sustentação para a gramática. O software bateu num limite estrutural da própria memória. Aperte o próximo.

### Tela 4 (04:39 a 05:54, 01:15)

O software bateu num limite estrutural da própria memória. Aperte o próximo. E para sair desse gargalo, o foco da pesquisa mudou para Montreal entre 2014 e 2015, né? Exatamente. Lá, a gente tem o Yoshua Bendio, nascido em 1964, tinha 50 anos naquela cena, vivo em 2026, o que um riuncho, nascido em 1985, tinha 29 anos naquela cena, vivo em 2026 e um aluno de doutorado do Bendio. Foram eles que trouxeram o conceito de atenção. É isso. A grande sacada da atenção foi abolir aquele poste único, em vez de um único resumo, a rede que escreve a tradução passou a receber absolutamente todos os resumos parciais gerados a cada palavra que a primeira rede leu. Ah, então ela ganha acesso direto a tudo e dá um peso para cada palavra, certo? Perfeito. Quer ver um exemplo? Pensa em traduzir o gato preto para o inglês. Na fração de milisegundo em que a máquina vai escrever a palavra black, ela foca fortemente a atenção dela nos números que representam a palavra preto no texto original e deixa o gato em segundo plano. O foco muda dinamicamente. Aperte o próximo.

### Tela 5 (05:54 a 07:20, 01:26)

Aperte o próximo. Na teoria, isso é lindo, mas na prática, quando o Google colocou isso nos servidores para valer, em 2016, o negócio pesou, pesou demais. Para colocar em produção, eles empilharam oito camadas de leitura e oito camadas de escrita de LSTM, tudo amarrado com esse mecanismo de atenção. O custo computacional disso devia ser absurdo. Treinar essa rede levavam seis dias ininterruptos usando 96 placas de vídeo rodando juntas. Era caríssimo. E foi para baratear e viabilizar isso que o Google revelou a TPU, a unidade de processamento de tensores. A famosa TPU. E quem liderou o projeto foi um engenheiro que veio da Antiga Deck, né? Isso, um engenheiro veterano que não tem o nome público no artigo, mas que desenhou uma peça genial. A TPU era essencialmente uma grade plana de 256 por 256 pequenos multiplicadores físicos. O foco dela era só fazer multiplicação massiva em paralelo. Mas aí, olha que ironia. A gente tem um hardware gigante forjado numa grade, implorando para fazer tudo ao mesmo tempo. Mas o software da LSTM ainda está empurrando as palavras uma a uma em fila indiana. Exato! Esse era o choque geomédico. A fila era o que sobrava de fora do encaixe. O hardware estava lá, pronto, hiperveloz, mas o software não acompanhava a forma dele. O chip ficava lá, ocioso, esperando a palavra anterior terminar para receber a próxima. Aperte o próximo.

### Tela 6 (07:20 a 08:05, 00:45)

Aperte o próximo. Aí chegamos no grande clímax cronológico, o dia 12 de junho de 2017. O dia em que oito pesquisadores do Google publicaram o artigo que mudou tudo. Attention is all you need. O que traduzindo para quem está ouvindo seria. Atenção é tudo que você precisa. Isso. E os oito autores dessa ruptura assinando o artigo foram Vasvani, Shazer, Parmar, Leon Jones, Gomez, Kaiser e Polo Sukin. Eles apresentaram a arquitetura que batizaram de transformer. E o transformer fez o que parecia impossível. Tirar a fila completamente. Amputou a rede recorrente LSTM sem dó. Nenhuma palavra precisa esperar a outra. O texto inteiro entra no sistema ao mesmo tempo. Aperte o próximo.

### Tela 7 (08:05 a 08:54, 00:49)

O texto inteiro entra no sistema ao mesmo tempo. Aperte o próximo. Mas peraí, se a máquina engole as palavras todas de uma vez sem ordem sequencial, a linguagem não desmorona? Como é que o sistema não vira uma sopa de letras aleatória? Parece contraintuitivo, mas a solução está na forma como as palavras viram matemática. O vocabulário inteiro é projetado num espaço numérico de centenas de dimensões. Então gato e cachorro, por exemplo, viram listas longas de números que ficam matematicamente próximas nesse espaço. Quase vizinhas, enquanto a palavra imposto vai ficar num quadrante totalmente distante. O sentido deixa de ser um verbete e vira uma coordenada, uma localização nesse mapa tridimensional enorme. Aperte o próximo.

### Tela 8 (08:54 a 10:54, 02:00)

Aperte o próximo. Certo, o sentido está garantido por essa localização. Mas e a gramática? Como a máquina diferencia o cachorro mordeu o homem de o homem mordeu o cachorro, se todas as palavras entram juntas. Para não reconstruir a fila, eles adicionaram um carimbo de posição em cada palavra, usando ondas matemáticas baseadas em funções de seno e cosseno. É tipo uma identidade fixa. Isso. É fisicamente somado aos números da palavra antes dela entrar na rede. Assim, a máquina processa um bloco simultâneo, onde as coordenadas já dizem, de forma indelevel, onde aquela palavra deveria estar na frase original. Lembra aquela nossa metáfora do buraco da fechadura? Claro. No Transformer, é como se a gente moldasse para uma mesa de reunião redonda. As palavras não estão mais numa fila passando um bilhete que vai apagando. Todas sentam na mesa ao mesmo tempo e esse carimbo de posição é só um número pintado no encosto da cadeira de cada uma. Nossa, perfeito. Elas olham umas para as outras e decidem quem escutar mais. E no coração dessa mesa redonda, o cálculo da atenção foi decomposto em três matrizes. Pergunta, etiqueta e conteúdo. Ah, eu amo pensar nisso como um evento de Network Incorporativo. A etiqueta é o crachado à pessoa. A pergunta é o que você está procurando no evento e o conteúdo é o que a pessoa de fato tem a dizer quando vocês não mete. É muito isso. A pergunta matemática, de uma palavra, procura a etiqueta matemática das outras e quando encaixa, transfere o conteúdo. E no fundo físico do negócio, isso é só tabela gigante de número multiplicando por tabela gigante de número nas chamadas 8 cabeças de atenção operando em paralelo. Tudo o que a grade da TPO queria fazer desde o início. Exatamente. O software moldou a matemática para encaixar na multiplicação paralela das placas. O resultado, o primeiro modelo tinha 65 milhões de parâmetros e foi treinado em apenas 12 horas usando 8 placas da NVIDIA. Nada perou, o passo anterior aperte o próximo.

### Tela 9 (10:54 a 11:47, 00:53)

Nada perou, o passo anterior aperte o próximo. Incrível. E o Transformer provou ser tão eficiente que já no ano seguinte, em 2018, a indústria dissecou a arquitetura. Em junho, a OpenAI lançou o GPT. Isso. E o trabalho lá foi puxado pelo Alec Radford, nascido em 1993, tinha 25 anos naquela cena, vivo em 2026, e pelo Ilha Subscover, que a gente já mencionou. O mais loco do GPT é que eles pegaram o Transformer e, tipo, cortaram no meio, né? É, eles usaram só a metade que escreve o chamado decodificador. Ele foi treinado de forma autoregressiva, consumindo 7 mil livros cruz, sem rotulação. O objetivo era só prever a próxima palavra, certo? Isso. Só isso. O GPT original tinha 117 milhões de parâmetros e só tentava adivinhar a palavra seguinte, olhando para o que vinha antes. Aperte o próximo.

### Tela 10 (11:47 a 12:52, 01:05)

Aperte o próximo. Mas a concorrência não parou, né? Em outubro de 2018, uma equipe de engenheiros, o Google, lançou a resposta deles, o famoso Bert. O caminho oposto. O Bert usou a metade que lê do Transformer. O codificador. Em vez de prever o futuro, o treinamento do Bert escondia palavras aleatórias no meio do texto. A máquina cruzava o contexto da esquerda e da direita para deduzir o que estava faltando naquele buraco. Era um modelo maior também, né? Sim, já veio com 340 milhões de parâmetros. Mas a grande sacada tanto do GPT quanto do Bert foi que o programa era tipo achado a partir do texto crudo na internet. Não tinha mais humano rotulando os dados. O que mudou totalmente a escala da coisa. Passamos de 65 milhões de conexões em 2017 para um bilhão e meio em 2019. E 175 bilhões em 2020? É um absurdo. A inteligência artificial virou uma questão de acumular hardware bruto. O tamanho do software passou a editar o hardware que a indústria com NVIDIA precisaria construir. Aperte o próximo.

### Tela 11 (12:52 a 13:40, 00:48)

Aperte o próximo. Se a gente fizer um balanço do arco histórico dessa série inteira, o que a gente vê é um fluxo constante. A gente saiu de mover pedras no hábaco, passou pela lógica de falso e verdadeiro do bully, pela memória do von Neumann, e chegou na litografia dos microprocessadores. A máquina de 2018 ainda é, no fundo, elétrons passando por portas lógicas. E o grande triunfo do Transformers foi esse, né? As peças físicas evoluíram, até conseguir fazer milhões de cálculos massivos de matrizes. E o software, ao tirar a restrição temporal da fila indiana, finalmente se diluiu para usar 100% dessa grade elétrica. Ninguém planejou o pacote completo, mas o encaixe de todas essas peças gerou a ia moderna. Aperte o próximo.

### Tela 12 (13:40 a 14:31, 00:51)

Aperte o próximo. Bom, com a ramificação dos modelos em 2018 e os oito autores originais já arrumando até 2023 para fundar suas próprias empresas, a gente encerra nossa cronologia por aqui. A arquitetura física no nível mais baixo continua sendo a mesma, processando zeros e uns. Mas a lista de instruções não é mais algo escrito linha por linha para um humano. Ela é achada pelos bilhões de botões girados automaticamente durante o treinamento. E eu deixo essa reflexão para quem nos acompanhou até aqui. Se a máquina agora escreve suas próprias regras de entendimento através de uma rede matemática que nem os engenheiros conseguem ler, até que ponto a gente realmente compreende as ferramentas que estamos usando para decifrar o nosso próprio mundo.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `00:00` Atenção
- `00:00` Esse
- `00:05` Máquina
- `00:05` Aprende
- `00:05` Nona
- `00:09` Reinventar
- `00:09` Computador
- `00:09` Zero
- `00:14` Pois
- `00:19` AlexNet
- `00:27` Aproveitando
- `00:55` 1997
- `01:48` Quem
- `02:00` Munique
- `02:09` 1967
- `02:09` SEP-Hoschwriter
- `02:17` LSTM
- `02:47` Imagina-lhe
- `03:00` Eram
- `03:12` Aperte
- `03:16` Google
- `03:20` 1987
- `03:20` William
- `03:20` Sudskever
- `03:29` 1983
- `03:29` Oriel
- `03:29` Vinyls
- `03:39` 1982
- `03:39` Coquelé
- `04:11` Dostoevsky
- `04:19` Frases
- `04:45` Montreal
- `04:51` 1964
- `04:51` Yoshua
- `04:51` Bendio
- `05:01` 1985
- `05:36` Quer
- `05:36` Pensa
- `06:30` Antiga
- `06:30` Deck
- `07:38` Vasvani
- `07:38` Shazer
- `07:38` Parmar
- `07:46` Jones
- `07:46` Gomez
- `07:46` Kaiser
- `07:46` Polo
- `07:46` Sukin
- `07:53` Tirar
- `09:38` Transformer
- `09:54` Elas
- `10:07` Network
- `10:07` Incorporativo
- `10:49` NVIDIA
- `11:05` OpenAI
- `11:08` Alec
- `11:08` Radford
- `11:11` 1993
- `11:15` Ilha
- `11:15` Subscover
- `11:55` Bert
- `13:05` Neumann
- `13:16` Transformers

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_Attention is All You Need.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 12, audio entregou 12. OK
- **Janela temporal (1997 a 2018):** declarada na capa. Fecho cita ano.
- **Anos que o audio falou e nao estao no roteiro:** 1964, 1967, 1982, 1983, 1985, 1987, 1993, 2012, 2014, 2015, 2016, 2019, 2020, 2023, 2026 (conferir com `--confere`)
- **Protagonistas citados no audio:** Alec, AlexNet, Attention, Cada, Como, Duas, Fazer, Google, Need, Neumann, Radford, Transformer, Yoshua
- **Protagonistas do roteiro AUSENTES no audio:** Bengio, Boole, Contar, Fechar, Hochreiter, Ilya, Jurgen, Kyunghyun, Oriol, Quoc, Schmidhuber, Sepp, Shazeer, Sutskever, Vaswani, Vinyals (ou o audio pulou, ou o modelo pequeno escreveu errado)

# Mapa das telas (gerado do audio, 19.2 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 02:09 | - |
| 2 | 02:09 | 01:28 | - |
| 3 | 03:38 | 01:40 | - |
| 4 | 05:18 | 01:54 | **Sim** |
| 5 | 07:12 | 03:11 | - |
| 6 | 10:24 | 01:42 | - |
| 7 | 12:06 | 01:35 | - |
| 8 | 13:42 | 01:11 | **Sim** |
| 9 | 14:53 | 01:13 | - |
| 10 | 16:07 | 01:19 | - |
| 11 | 17:26 | 01:44 | - |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 02:09, 02:09)

A escala, a etapa anterior terminou de um jeito bem instigante, a gente tinha chegado naquela máquina que era capaz de adivinhar o que a pessoa queria, sem a pessoa precisar pedir absolutamente nada, só lendo o rastro digital. Exatamente, lendo aquele comportamento passado. Pois é. E aí ficou no ar a pergunta, e se desce para pedir, tipo, com as suas próprias palavras e a máquina simplesmente responder. É a grande virada, né? Sim. E este é o primeiro episódio da etapa, a máquina que conversa, que é a décima primeira etapa da série do abaco AIA. E, bom, o que a gente vai fazer aqui hoje não é, sabe, acompanhar uma corrida corporativa, a gente não vai falar de quem vendeu mais ou entrar naqueles sermões filosóficos sobre, ah, o que é inteligência. Certo. Sem papo de ficção científica. Exato. O nosso foco hoje é puramente a engenharia da coisa. A gente vai dissecar um desenho de software, sabe? O volume colossal de texto que alimenta esse desenho e a placa física que faz tudo isso rodar. É, hardware e software puros. E a nossa tese principal, o coração dessa discussão toda hoje, é quase, é, chocante de tão simples. O mesmo desenho de software, lá de 2017, que foi treinado só para adivinhar a próxima palavra, ele ficou mil vezes maior em cinco anos. Mil vezes é muita coisa. Bizarro, né? O programa Chado melhora só de ficar maior. E quem decide o tamanho é a placa e o dado, não o programador. O programador só assiste, basicamente. É, por aí. E para cobrir isso, o nosso escopo de tempo vai, assim, exatamente de 2017 a 2022. É um período cronológico que se sobrepõe com o fim da nossa etapa 9 e passa pela etapa 10 inteira. Isso mesmo. Antes da gente mergulhar nos detalhes, um aviso rápido sobre a página de hoje. Ela tem 12 telas. Quem está só ouvindo pode acompanhar a história normalmente, tá? E quem está com a página aberta vira quando ouvir o pedido. Então, para a gente iniciar a nossa linha do tempo, aperte o próximo.

### Tela 2 (02:09 a 03:38, 01:28)

Então, para a gente iniciar a nossa linha do tempo, aperte o próximo. Bom, o nosso marco zero acontece no dia 12 de junho de 2017. Certo. Foi quando o Google publicou um artigo científico bem famoso chamado Attention Is All You Need? Clássico, né? Esse mesmo. Eram 8 autores. Na liderança estava Ashish Vazhwani, nascido em 1986 com 31 anos naquele momento e que no ano de 2026 estaria liderando novos projetos de pesquisa de ponta. Certo. E o título do artigo foca nessa palavra, né? Atenção. E a gente logo imagina que por ser o início dessas máquinas que conversam, eles queriam criar meio que um parceiro de diálogo, né? Então, aí que tá. Lendo a proposta original, o objetivo primário desse modelo, que eles chamaram de Transformer é bom lembrar, era tradução, tradução pura e simples. Só pegar inglês e passar para francês, por exemplo. Basicamente isso. O artigo até falava, sabe, sobre testar essa mesma arquitetura no futuro, para imagens, áudio, vídeo. Ah, entendi. Mas ele não dizia, em nenhum momento, que esse mesmo desenho, se ficasse muito maior, serviria para manter conversas complexas. Não era para isso. Que loucura. Então, a intenção original meio que limitava a visão do que a própria ferramenta podia fazer. O desenho estava ali, pronto para algo colossal, mas a engenharia interna precisava ser entendida primeiro. Então, para entender essa mecânica genial, por trás disso tudo, aperte o próximo.

### Tela 3 (03:38 a 05:18, 01:40)

Então, para entender essa mecânica genial, por trás disso tudo, aperte o próximo. O verdadeiro pulo do gato desse desenho de 2017, sabe qual foi? Qual? O gato do treinamento. Eles configuraram o sistema para tapar a próxima palavra de uma frase e forçar a máquina a adivinhar. Ah, tipo, vamos tentar visualizar isso para quem está ouvindo. É basicamente aquele livro de exercícios da escola, né? Aquele de preencher as lacunas na frase. É, a analogia é perfeita. Só que a diferença brutal aqui é que a resposta correta, o gabarito, já está embutido no próprio texto. Tá. Então se a frase é, o céu é azul. Isso. A máquina esconde o azul, tenta adivunhar e logo depois ele mesmo confere o texto original. Nossa, então o gargalo desaparece, porque não precisa de um professor humano lá supervisionando e corrigindo tudo. Exato. Esse é o aprendizado auto-supervisionado. A máquina treina sem parar, mas tem um detalhe mecânico bem importante aí. Qual? A máquina não lê as palavras inteiras, como a gente. O sistema quebra o texto em pedaços menores. A gente chama isso de tokens. Tá. Tipo umas sílabas, raízes de palavras. Isso, pensa neles como uns blocos de montar, sabe. Lê em pedacinhos, reduz muito a conflexidade matemática. Em vez de decorar o dicionário inteiro, a máquina só calcula a chance lógica de um bloquinho vir depois do outro. Entendi. E essa lógica começou a ser notada. A indústria olhou para essa estrutura, viu que dava pra escalar e começou literalmente a dividir o cérebro original. Vamos entender como isso aconteceu. Aperte o próximo.

### Tela 4 (05:18 a 07:12, 01:54)

Aperte o próximo. O primeiro grande desdobramento surgiu um aninho depois, tá? Em 11 de junho de 2018. Certo. A OpenAI lança o GPT-1. A equipe foi liderada por Alec Radford, nascido em 1993, com 25 anos naquele momento, que em 2026 continuaria inovando dentro dos laboratórios da empresa. E ele não estava sozinho, né? Não, não. Ele trabalhou junto com Ilha Sudskäver, que já teve sua ficha detalhada e relembrada aqui na nossa jornada. Sim. E a decisão técnica da equipe foi bem, assim, inusitada. Eles não usaram a estrutura inteira do Transformer, lá de 2017. Uhum. Respegaram só a metade que foquem em escrever pra frente, não foi? Exatamente. Só a metade geradora. E foram 12 camadas. O modelo todo tinha 117 milhões de peças. Ou parâmetros, como a gente chama. Parâmetros. Vamos dar uma pausa rápida aqui. Explica o que é um parâmetro. É, imagina uma mesa de som daquelas de estúdio gigantesca, sabe? Com milhões de botões giratórios pequenininhos. Certo. Cada parâmetro é um botão desses, que ajusta o peso de uma conexão matemática lá dentro. E eles afinaram esses 117 milhões de botões, fazendo o modelo ler mais de 7 mil livros inéditos. Mais de 7 mil livros. Durante um mês, rodando direto em oito placas de vídeo. Nossa, isso criou uma regra nova, né? A regra de ler primeiro. A máquina devora todo esse texto pra aprender as regras gerais primeiro. E só depois os engenheiros ajustam pra uma tarefa específica. Perfeito. E, só um detalhe curioso, esse número exato de 117 milhões ele só foi revelado no artigo seguinte. Mas, bom, se eles pegaram a metade que escreve, era o cenário perfeito pra alguém explorar outra metade. Aperte o próximo.

### Tela 5 (07:12 a 10:24, 03:11)

Aperte o próximo. Foi certinho o que aconteceu. Só quatro meses depois. Em 11 de outubro de 2018, o Google apresenta o BERT. O famoso BERT. Esse projeto foi liderado por Jacob Devlin. Jacob Devlin formou-se na Universidade de Maryland, trabalhava no Google e continuaria ativo no setor de tecnologia no ano de 2026. Legal. E o foco da equipe dele? O foco foi pegar justamente aqui a outra metade do desenho. Ah, então ele não escrevi o texto contínuo? Não, a lógica era diferente. Ele não ficava adivinhando a próxima palavra lá na ponta da frase. O BERT adivinhava tokens que estavam tapados no meio do texto. Então ele olhava pros dois lados. Exatamente, ele lia olhando pros dois lados ao mesmo tempo. Porque pensa comigo, a palavra manga. Se eu leio só de um lado, a manga. A máquina não vai saber se é a fruta ou se é a manga da camisa, né? Exatamente. Mas lendo pros dois lados, o contexto fica todo resolvido ali, matematicamente. E eles fizeram versões com 110 milhões e 340 milhões de peças. E aí a força bruta do hardware começa a aparecer forte, né? Porque o BERT não rodou em placa de vídeo normal. Não, nem de longe, ele usou 16 TPUs, que são os chips exclusivos do Google. E ficou processando por quatro dias diretos. A corrida pela escala tava oficialmente engatando a marcha. Aperte próximo. A em 14 de fevereiro de 2019, a OpenAI volta pro jogo com GPT2. E aqui a indústria tomou aquele primeiro susto real com a escala. Por causa do tamanho? Sim, os números ficaram absurdos. O modelo passou a ter 1 bilhão e 500 milhões de peças. Pera, de pouco mais de 100 milhões foi pra 1 bilhão e 500 milhões? Num salto só. E pra alimentar tudo isso, eles usaram 8 milhões de páginas da web. Isso dá uns 40 GB de texto limpo. Tá, mas aí eu tenho que fazer a pergunta que não quer calar. Tipo, a mecânica era a mesma, certo? Só de jogar mais texto lá dentro, magicamente ele aprendeu coisas novas? Como é que só acontece? Então, a resposta curta é sim. Ele aprendeu. Sério? A resposta longa envolve como a nossa linguagem funciona. O objetivo lá dentro ainda era só adivinhar a próxima palavra. Mas pra máquina conseguia adivinhar a próxima palavra com precisão num texto sei lá, de física quêntica. Ela é meio que forçada a entender a lógica daquele assunto, né? Exatamente. As regras gramaticais e as regras do mundo real estão embutidas no nosso texto. O resultado prático foi que o GPT2 começou a gerar uns parágrafos que pareciam muito humanos e ele passou a traduzir e resumir coisas sem que ninguém tivesse ensimado isso diretamente pra ele. Caramba! E foi tão real que a própria OpenAI ficou assustada, não foi? Ficaram. Eles ficaram com muito medo do potencial pra usos maliciosos tipo gerar notícia falsa em massa, então eles seguraram o modelo completo. Eles não liberaram de primeira? Não, só foram soltar tudo meses depois lá no dia 5 de novembro de 2019. Sentiram o peso do que estava acontecendo. Aperte o próximo.

### Tela 6 (10:24 a 12:06, 01:42)

Aperte o próximo. E justamente pra tentar entender o que estava acontecendo, em vez de só crescer no escuro, né? Dez autores da OpenAI publicam as leis de escala. E isso foi quando? Em 23 de janeiro de 2020, na liderança estava Jared Kaplan e fechando a lista Dario Amudei. Certo. Jared Kaplan formou-se em Stanford, trabalhava na Johns Hopkins e continuaria ativo na pesquisa em 2026. E Dario Amudei, nascido em 1983, com 37 anos naquele momento, que em 2026 estaria como principal executivo de uma gigante concorrente. Certo. E leis de escala. Parece nome de física teórica, né? Eles falam que o erro da máquina cai numa linha reta, ali numa escala logarítmica quando as coisas crescem juntas no intervalo de sete ordens de grandeza. Mas traduz isso pra gente, qual o significado prático disso lá na engenharia? É gigante. Pensa assim, antes, aumentar um modelo era meio que um chute. Um tiro no escuro. Isso. Você gastava milhões em hardware e nem sabia se a máquina ia ficar tão mais inteligente assim. O que as leis de escala aprovaram foi que, se você aumentar o tamanho da máquina, aumentar o texto e aumentar as placas tudo na mesma proporção, a chance de erro vai cair de um jeito que você consegue prever. Numa linha reta. Ah, então, com essa linha reta, dava pra prever o quão inteligente o modelo ia ficar antes de gastar milhões de dólares treinando. Exatamente isso. A ciência ali virou tipo uma equação financeira super garantida. Nossa. E essa previsão deu muita coragem pra dar um passo colossal logo depois. Aperte o próximo.

### Tela 7 (12:06 a 13:42, 01:35)

Aperte o próximo. Não certeza deu. Em 28 de maio de 2020, 31 autores revelam o GPT-3. Certo. E quem tava na frente dessa vez? O líder ali era Tom Brown. Tom Brown trabalhava na OpenAI e continuaria ativo no desenvolvimento de inteligência artificial em 2026. E o salto do GPT-3, olha, foi impressionante. Os números aqui são ignorantes, né? Totalmente. Estaram para 175 bilhões de peças. 175 bilhões de parâmetros. E o texto. Ele leu 300 bilhões de pedaços de texto. Isso é a web inteira filtrada, páginas recomendadas, coleções de livros, wikipédia, tudo que você imaginar. E aqui a gente tem que falar da máquina física. O hardware por trás disso. Porque foi treinado numas placas chamadas V100, né? Num clúster gigantesco. E no artigo técnico, eles dizem que foi fornecido pela Microsoft. É, e o mais fascinante desse detalhe é que o artigo não agradece à Microsoft. Ele só diz, bem secamente, que foi fornecido por eles. Pois é, uma menção fria. E vale lembrar, esse supercomputador tinha sido anunciado poucos dias antes, em 19 de maio. Ele tinha 285 mil núcleos de processador e 10 mil placas de vídeo interligadas. 10 mil placas rodando tudo ao mesmo tempo. O investimento foi brutal e a surpresa no comportamento dele também foi. A maior surpresa de todas, né? Aperte o próximo.

### Tela 8 (13:42 a 14:53, 01:11)

Aperte o próximo. A surpresa foi o que a gente chama de Fill Shot. Que é aprender com poucos exemplos. Isso. E a loucura é que ninguém programou isso dentro dele. O software, o código em si, não mudou nada. Espera. Para ficar claro, normalmente para a máquina aprender uma tarefa nova, alguém tem que lá e mexer no código, mudar as regras. Sim. O padrão era esse. Mas no GPT-3, você só colocava um exemplo na hora de perguntar. Você escrevia assim, Brasil, Brasília, França, Paris, Japão e ele completava Tóquio. Só porque ele leu aquele contexto na hora, sem precisar regravar nada no banco de dados dele. Sem alterar os pesos originais. Aquele 175 bilhões de botões lá da mesa de som. Isso ficaram congelados, né? Isso. Congelados. Ele usava a lógica embutida neles para resolver o exemplo que você deu ali. Em tempo real, a inteligência emergiu só por causa do tamanho gigantesco do modelo. É impressionante. Mas, claro, esse tamanho todo cobra um preço em hardware que não dá para ignorar. E a indústria logo percebeu que precisava de uma correção de rota, né? Aperte o próximo.

### Tela 9 (14:53 a 16:07, 01:13)

Aperte o próximo. Foi urgente. E essa correção veio em 29 de março de 2022. Quem publicou? A DeepMind publicou o modelo Chinchilla. Faram 22 autores com Jordan Hoffman lá na frente. Ficha do Jordan. Jordan Hoffman trabalhava na DeepMind e continuaria na fronteira da pesquisa técnica em 2026. E o que esse modelo Chinchilla provou que mudou o jogo de novo? Ele provou que só aumentar as peças infinitamente não era o caminho. O Chinchilla tinha apenas 70 bilhões de peças. Bem menos que o GPT-3. Bem menos. Mas sabe quanto ele neu? 1 trilhão e 400 bilhões de tokens. E com isso ele ganhou em todos os testes do modelo golfer que tinha 280 bilhões de peças. Então o modelo menor ganhou do maior porque leu muito mais texto. Exatamente. Regra de ouro que surgiu aqui foi, dobrou o tamanho do modelo, tem que dobrar o texto também. Ah, então eles perceberam que esses gigantes tipo GPT-3 estavam meio que subtreinados, né? Eram cérebros gigantes mas que não tinham lido o suficiente. Isso mesmo. A placa de vídeo voltou a mandar no pedaço. O hardware exigiu muito mais dados se você quisesse um modelo mais eficiente. O hardware sempre dá a palavra final, aperte o próximo.

### Tela 10 (16:07 a 17:26, 01:19)

O hardware sempre dá a palavra final, aperte o próximo. Com essa regra nova, o campo começou a lapidar os modelos ali entre 2021 e 2022. Certo. Surgiu Codex nessa época, né? Slim. Ele pegou aquele GPV-3 gigantesco e foi ajustado com códigos lá do GitHub. Programação pura. Pura. Ele aprendeu a escrever software e isso ajudou ele a pensar de forma muito mais lógica. A sintasse de programação força o modelo a ser mais rígido, né? Com certeza. E junto com isso surgiu a série GPT-3.5. E a equipe modiferência crítica. A diferença é o ajuste para seguir instruções. O modelo parou de ser só aquele motor tentando adivinhar a próxima palavra no vazio. Ele passou a preencher a palavra obedecendo a uma ordem direta, tipo um comando que o humano deu na tela. Exatamente. Foi a lapidação final. O sistema foi domado para conversar de verdade. E o ponto de chegada, o clímax dessa nossa linha do tempo, acontece no dia 30 de novembro de 2022, que é quando surge o famoso chat GPT. E nas palavras exatas da própria OpenAI na época, ele foi ajustado a partir de um modelo da série GPT-3.5. É embalagem daquele trabalho todo de cinco anos. E a nossa linha do tempo para exatamente aqui. Aperte o próximo.

### Tela 11 (17:26 a 19:11, 01:44)

Aperte o próximo. Então, para fazer um balanço dessa loucura toda. O que a gente aprende aqui é que o código não precisou ser reescrito do zero por um gênio a cada mês. Não teve revolução no código base. Não teve. O código encontrou um jeito de melhorar simplesmente ficando maior. O limite não era mais a criatividade do programador. O teto passou a ser a força das placas e a quantidade de dados disponível. E é super curioso se a gente for ver as pessoas por trás disso. Hum, pode falar. Nós mencionamos aqui gente muito brilhante. E quatro dessas pessoas centrais, o Jared Kaplan, o Jacob Devlin, o Tom Brown e o Jordan Hoffman, a gente nem sabe a idade deles. Verdade. Quatro dessas pessoas não têm nem ano de nascimento público. São anônimos lá nos laboratórios mudando a história da tecnologia. Então todos lá construindo e testando. E vale reforçar a nossa história de hoje para em 2022. Exato. Paramos aqui. E a gente deixa uma provocação final para quem acompanhou até agora e que já vai abrir a porta para o que vem por aí. Pensa comigo. Vamos lá. A história da máquina agora depende totalmente de amontoar milhares e milhares de placas de vídeo no mesmo lugar e fazer elas processarem trilhões de palavras sem parar. Alguém tem que plugar isso na tomada, né? Pois é. Quem é que constrai o galpão gigante para abrigar isso tudo? De onde vem a energia colossal para alimentar toda essa máquina? Porque a escala no papel é bonita, mas na vida real ela precisa de tijolo, cabo e usina elétrica. Fica a reflexão. Muito obrigado pela companhia. Até a próxima.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `01:29` Chado
- `02:18` Google
- `02:18` Attention
- `02:27` 1986
- `02:27` Ashish
- `02:27` Vazhwani
- `02:52` Transformer
- `05:26` OpenAI
- `05:26` GPT-1
- `05:29` 1993
- `05:29` Alec
- `05:29` Radford
- `05:42` Ilha
- `05:42` Sudskäver
- `07:17` BERT
- `07:24` Jacob
- `07:24` Devlin
- `07:27` Universidade
- `07:27` Maryland
- `08:27` TPUs
- `08:40` GPT2
- `10:37` Jared
- `10:37` Kaplan
- `10:43` Amudei
- `10:46` Stanford
- `10:46` Johns
- `10:46` Hopkins
- `10:52` 1983
- `10:52` Dario
- `12:09` GPT-3
- `12:17` Brown
- `12:59` V100
- `13:05` Microsoft
- `13:43` Fill
- `13:43` Shot
- `14:10` Brasil
- `14:10` Brasília
- `14:10` França
- `14:10` Paris
- `14:10` Japão
- `15:02` DeepMind
- `15:02` Chinchilla
- `15:04` Jordan
- `15:04` Hoffman
- `16:16` Codex
- `16:19` GPV-3
- `16:19` GitHub
- `16:35` GPT-3.5

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_A Escala.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 12, audio entregou 11. DIVERGE
- **Janela temporal (2017 a 2022):** declarada na capa. Fecho cita ano.
- **Anos que o audio falou e nao estao no roteiro:** 1983, 1986, 1993, 2018, 2019, 2020, 2021, 2026 (conferir com `--confere`)
- **Protagonistas citados no audio:** Ashish, Brown, Chinchilla, Codex, DeepMind, Devlin, GitHub, Google, Jacob, Jared, Jordan, Kaplan, Microsoft, Ninguem, OpenAI, Radford, Stanford, Transformer
- **Protagonistas do roteiro AUSENTES no audio:** Amodei, Anthropic, ChatGPT, Contar, Copilot, Eternal, Fechar, Guardian, Harvard, Hoffmann, Ilya, Nvidia, Sutskever, Vaswani (ou o audio pulou, ou o modelo pequeno escreveu errado)

# Mapa das telas (gerado do audio, 14.4 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 02:54 | - |
| 2 | 02:54 | 01:02 | - |
| 3 | 03:56 | 01:20 | - |
| 4 | 05:17 | 01:05 | - |
| 5 | 06:22 | 01:10 | - |
| 6 | 07:33 | 01:14 | **Sim** |
| 7 | 08:48 | 01:12 | - |
| 8 | 10:01 | 00:45 | - |
| 9 | 10:46 | 01:11 | - |
| 10 | 11:57 | 01:09 | **Sim** |
| 11 | 13:06 | 01:19 | - |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 02:54, 02:54)

A escala. Então, recapitulando o finzinho da nossa etapa anterior, ela terminou com aquela máquina que é adivinha o que a pessoa quer, né? Sem ninguém pedir nada, só lendo o rastro digital. E isso, aquela leitura mais passiva de comportamento. Exato. E aí, a grande pergunta que ficou pairando no ar foi e se desce para pedir as coisas de forma direta, sabe? Com as próprias palavras e a máquina do nada responder. Que é exatamente o pulo do gato que a gente vai ver hoje. Pois é. E para quem nos acompanha, a gente vai cobrir aqui os anos de 2017 a 2022, em ordem cronológica, e vale pontuar que esse período se sobrepõe exatamente com o final da nossa etapa 9 e com a etapa 10 inteira. E é a grande tese por trás de tudo isso, para resumir com as palavras certas. O mesmo desenho de 2017, treinado só para adivinhar a próxima palavra, ficou mil vezes maior em cinco anos. O programa achado melhor só de ficar maior e quem decide o tamanho é a placa e o dado, não o programador. Perfeito. Bom, antes da gente mergulhar, só um lembrete rápido sobre a nossa página de animação, que tem 12 telas. Quem está só ouvindo pode acompanhar o raciocínio normalmente, sem problema nenhum. Mas quem está com a página visual aberta, é só virar a tela quando ouviu o pedido. E lembrando que o nosso foco aqui não é historinha de empresa ou vender sucesso corporativo, tá? O assunto é construção bruta. O desenho do software, o texto e a placa crescendo. Com certeza. Então, próximo. Beleza. A gente volta aos relógios para 12 de junho de 2017. O marco zero dessa nova onda. Total. É quando sai o famoso artigo científico Attention Is All You Need, publicado por uma equipe de 8 autores do Google. O líder ali era o Ashish Vazhwani, que tinha 31 anos na época. O destino do trabalho dele em 2026 seria fundar e liderar sua própria empresa de inteligência artificial. E sabe o que é mais irônico sobre esse artigo hoje em dia? O propósito original deles era extremamente restrito. O desenho que eles propuseram ali, o Transformer, foi feito apenas para traduzir idiomas. Só para tradução. Só. Eles queriam que o sistema lesse uma frase em alemão e cuspisse em inglês de um jeito melhor. Só isso. Caramba. E eu estava reparando num detalhe surpreendente. No fim do paper, eles dizem que querem testar o modelo em imagem áudio-vídeo. Sim, eles listam essas mídias. Mas não tem uma vírgula sequer dizendo que esse mesmo desenho, se ficasse muito maior, serviria para conversar com as pessoas. Nenhuma. A engrenagem, tipo, já estava pronta nas mãos deles. Mas afixa de que aquilo serviria para diálogos complexos ainda não tinha caído para ninguém. É, quase uma miopia genial. Aperte o próximo.

### Tela 2 (02:54 a 03:56, 01:02)

Aperte o próximo. Mas aí surge a dúvida prática. Como é que essa arquitetura aprende de fato? Ao treinamento. É, porque de fora parece mágica, né? Mas é bem parecido com o jogo de adivinhação. É como pegar um livro, tapar a próxima palavra com a mão e forçar a máquina a descobrir o que está escondido ali. Exatamente. E a genialidade dessa mecânica é que, como o próprio texto lido já traz a resposta, o modelo não precisa de um professor humano do lado corrigindo. Ele tenta errar e confere sozinho. Isso, ele ajusta a própria matemática para não errar na próxima. A autonomia é total. Mas peraí, tem um detalhe técnico. A máquina não lê palavras inteiras de uma vez, né? Se tivesse que decorar o dicionário todo, o sistema entraria em colapso. Com certeza, por isso ela não processa palavras soltas. Ela quebra tudo em pedaços. São os famosos tokens. Os tokens. Pois é, às vezes o token é uma palavra inteira, mas muitas vezes é só uma sílaba, um fragmento. A máquina aprende a juntar essas pecinhas de lego para adivinhar qual é o próximo bloco. Fascinante. Aperte o próximo.

### Tela 3 (03:56 a 05:17, 01:20)

Aperte o próximo. Avançando no calendário, a gente chega em 11 de junho de 2018 e surge o GPT-1 da OpenAI. É aí que o jogo começa a escalar. Sim. A pesquisa era do Alec Redford, com 25 anos ali. O destino do trabalho dele em 2026 seria continuar focado em pesquisa de ponta na própria OpenAI. E claro, só para relembrar uma frase, o Ilia Sutscaver também estava nessa equipe. E a figura dele já tem ficha na nossa série. É um time de peso. E a abordagem arquitetônica do GPT-1 foi curiosa. Eles olharam para o desenho original de 2017 e usaram apenas metade dele. Só metade. É, especificamente a parte que escreve para o futuro adivinhando para a frente. Eles empilharam 12 camadas disso e, olha, treinaram a máquina com mais de 7 mil livros inéditos, rodando um mês inteiro em 8 placas de vídeo. Nossa. A lógica deles era que a máquina lê tudo primeiro, entende o idioma e só depois é ajustada para alguma tarefa. E só para ninguém se perder num jargão técnico, quando a gente fala peças e parâmetros, é exatamente a mesma coisa. Bem lembrado. E esse GPT-1, por exemplo, tinha 117 milhões de peças. O número que a OpenAI só revelou mesmo no paper seguinte. Um baita segredo na época. Aperte o próximo.

### Tela 4 (05:17 a 06:22, 01:05)

Aperte o próximo. Só que o Google não ia deixar isso barato, né? Em 11 de outubro de 2018, eles anunciam o projeto BERT. A grande resposta. Projeto liderado pelo Jacob Devlin, que estudou na Universidade de Maryland e trabalhava no Google. E cujo trabalho em 2026 é a sua última notícia pública conhecida. E o pulo do gato do BERT foi olhar para a mesma arquitetura original, mas usar a outra metade do desenho. A metade que foca na leitura. Exato. Em vez de adivilhar o futuro da frase, o BERT apagava palavras tapadas, bem no meio do texto. Ele olhava para os dois lados, o passado e o futuro da frase, para entender o contexto daquele buraco no meio. É um trabalho bem mais denso e, em questão de peças, ele era maior? Bastante. Eles soltaram versões nas escalas de 110 milhões e de 340 milhões de peças. E o hardware aguentou? Foi um treinamento brutal. Na versão maior, eles colocaram 16 TPUs rodando sem parar por quatro dias. Quatro dias fritando placa, aperte o próximo.

### Tela 5 (06:22 a 07:33, 01:10)

Quatro dias fritando placa, aperte o próximo. E a resposta vem rápido. 14 de fevereiro de 2019, a OpenAI dava o troco com o GPT-2. Aí o tamanho assustou de verdade. Pois é. O modelo bateu a marca de 1 bilhão e 500 milhões de peças. E a dieta de dados também, né? Insaciável. Ele devorou 8 milhões de páginas na internet. Isso dá uns 40 GB de texto pulo. E foi exatamente nesse ponto que o espanto genuíno tomou conta dos pesquisadores. Porque o texto que a máquina estava cuspindo parecia escrito por gente de verdade. É, a fluidez era absurda. E não era só gramática. A máquina começou a fazer tarefa sozinhas que ninguém havia ensinado. Ela começou a resumir textos, responder coisas lógicas, puramente por ter lido aquele mar de dados. Isso deu um medo enorme lá dentro, né? Eu lembro do drama. A OpenAI segurou o modelo completo por uma preocupação enorme com usos maliciosos de virar uma máquina de desinformação. Uhum, eles travaram o lançamento. Sim, liberaram as coisas aos poucos e só soltaram tudo no dia 5 de novembro de 2019. Aperte o próximo.

### Tela 6 (07:33 a 08:48, 01:14)

Aperte o próximo. Aí a gente entra num ponto de virada muito louco. Em 23 de janeiro de 2020. O paper das leis de escala. Isso. Um documento com 10 autores da OpenAI. Na linha de frente estava o Jared Kaplan, que estudou na universidade de Johns Hopkins e trabalhava na OpenAI e cujo destino de trabalho em 2026 seria ser um dos fundadores da Antrópique. E fechando o time, o Dario Amodei, com 37 anos na época e que em 2026 estaria liderando Antrópique. O que eles provaram nesse documento foi tipo a grande descoberta matemática da década para a área. Eles mostraram que o erro da máquina cai perfeitamente numa reta de um gráfico de escala logarítmica. Certo. Isso só acontece se o tamanho do modelo, a quantidade de texto e a conta de processamento crescerem juntos na mesma proporção por assustadoras 7 ordens de grandeza. Tá, mas traduzindo para o mundo real, o que isso muda para quem está construindo? Muda o risco financeiro. Pela primeira vez na história, dava para prever matematicamente o quão inteligente o modelo ia ficar antes mesmo de gastar milhões de dólares em hardware. Virou o chute e botou engenharia pesada. Aperte o próximo.

### Tela 7 (08:48 a 10:01, 01:12)

Aperte o próximo. Bom, com a matemática garantindo, o freio foi solto. 28 de maio de 2020. Surge o GPT-3. O gigante. O documento é assinado por 31 autores. Tinha Newton Brown, que estudou no MIT e trabalhava na OpenAI. O destino do trabalho dele em 2026 seria a condução de pesquisas independentes. E os números desse modelo são absurdos para a época. Ele pulou para 175 bilhões de peças. 175 bilhões? Pois é. E para ensinar isso tudo, ele leu 300 bilhões de pedaços de texto. Era internet filtrada, páginas recomendadas, acervos de livros, a wikiped inteira. E para rodar isso, o paper cita que foi treinado nas placas V100. Só que eles não agradecem formalmente a Microsoft, né? Dizem de um jeito bem frio que o cluster foi fornecido pela Microsoft. E cluster é eufemismo, né? A Microsoft tinha anunciado esse super computador dias antes, em 19 de maio de 2020. E a configuração? A absurda. Eram 285 mil núcleos de processador interligados a 10 mil placas de vídeo trabalhando juntas. É por verbélico, quase. Aperte o próximo.

### Tela 8 (10:01 a 10:46, 00:45)

Aperte o próximo. Tá, a máquina ficou gigante. Mas vem cá, o que apareceu de novo de comportamento só pelo fato de ela ter crescido tanto? A grande revelação foi o conceito de FuelShot. E como funciona isso na prática? O modelo começou a aprender a fazer coisas novas na hora. Só com exemplos colocados dentro da própria pergunta que você manda pra ele. Tipo, sem reescrever o código dele? Sem mexer e nada. O interior do modelo não muda em absolutamente nenhuma peça. Ele apenas lê os exemplos que você deu, entende o padrão da lógica e responde. Cara, esse é bizarro. Muito. E o mais chocante, ninguém programou essa habilidade nele. Ninguém escreveu uma linha de código pra ele aprender, por exemplo. Simplesmente emergiu. Emergiu da escala pura. Só do contato do tamanho colossal com os bilhões de textos lidos, aperte o próximo.

### Tela 9 (10:46 a 11:57, 01:11)

Só do contato do tamanho colossal com os bilhões de textos lidos, aperte o próximo. Só que o gigantismo indiscriminado levou um belo choque de realidade em 29 de março de 2022. O projeto Xinchila. Isso. Um trabalho da DeepMind com 22 autores, puxado pelo Jordan Hoffman, que estudou em Harvard e trabalhava na DeepMind. E cujo trabalho em 2026 reflete sua última notícia pública registrada. O Xinchila foi uma correção de rota violenta. O modelo deles parecia pequeno, tinha só 70 bilhões de peças. Muito menor que os 175 bilhões do GPT-3. Muito menor. Mas ele leu estúpidamente mais dados. Eles alimentaram o modelo com 1 trilhão e 400 bilhões de tokens. E o resultado? Ele trouxidou o modelo anterior da própria DeepMind, o golfer, que era gigante e tinha 280 bilhões de peças. E foi aí que cravou a nova lei, né? A lei de ouro a partir dali. Dobrou o modelo, dobra o texto, o pessoal estava crescendo a arquitetura e esquecendo de ler na mesma proporção. A placa de vídeo volta a mandar pesado no software. Tem que alimentar o monstro direito. Aperte o próximo.

### Tela 10 (11:57 a 13:06, 01:09)

Aperte o próximo. E a gente entra nos passos finais, os anos de 2021 e 2022. O fechamento das pontas. A OpenAI lança o Codex, que é basicamente o GPT-3, só que ajustado para ler código de programação direto do GitHub. Isso gerou os assistentes de código e as APIs lá no mês de 2021. E tudo isso, pavimento terreno para a série GPT-3.5. Exato. Eles juntaram o texto e o código do mundo diante do fim de 2021 e o pulo do gato foi ajustar esse monstro especificamente para seguir instruções e bater papo. Que originou o modelo texto da 20.003 lá para o fim de novembro, né? O que preparou o palco para o dia 30 de novembro de 2022. A chegada do chat GPT. E aqui a gente tem que usar as palavras exatas da própria OpenAI. O chat GPT não foi feito do zero. Ele foi ajustado a partir de um modelo da série GPT-3.5. Ou seja, a revolução já estava lá, a inteligência bruta já estava rodando. Isso. A grande sacada foi a interface. Eles pegaram esse raciocínio colossal e botaram numa embalagem que qualquer pessoa consegue usar. Impressionante. Aperte o próximo.

### Tela 11 (13:06 a 14:25, 01:19)

Impressionante. Aperte o próximo. E é aqui em 2022 com GPT-3.5 no ar que a gente faz a nossa parada cronológica. É um marco definitivo. Mas sabe, fazendo um balanço das pessoas que construíram tudo isso, é muito curioso notar que quatro dessas pessoas centrais que mudaram o mundo não têm sequer o ano de nascimento público. O que mostra bem o perfil dessa galera, né? E quando a gente olha para a 2026, vemos que esse grupo se espalhou pelos maiores laboratórios fundando as próprias empresas de ponta. Mudaram o mundo trabalhando focados. Sim. E a grande lição que esse período inteiro deixou provada de um jeito muito impírico é que a escala é quem dita as regras. Não foi um algoritmo mágico. Definitivamente não. Foram arquiteturas relativamente simples, alimentadas por montanhas de dados massivas e super computadores insanos. O tamanho é o que cria a complexidade. Pois é. O software ficou gigantesco. Os dados estouraram para os trilhões. Mas tudo isso, essa orquestra inteira exige uma infraestrutura física, colossal e absurdamente cara de manter. É placa de vídeo e galpão de energia que não acaba mais. Exatamente. O que deixa aquela grande provocação no ar para a nossa próxima exploração. O cérebro digital está pronto. Mas quem constrói o galpão?

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `01:43` Attention
- `01:43` Need
- `01:48` Google
- `01:51` Ashish
- `01:51` Vazhwani
- `02:11` Transformer
- `03:57` GPT-1
- `03:57` OpenAI
- `04:07` Alec
- `04:07` Redford
- `04:17` Ilia
- `04:17` Sutscaver
- `05:20` BERT
- `05:25` Jacob
- `05:25` Devlin
- `05:25` Universidade
- `05:25` Maryland
- `06:15` TPUs
- `06:27` GPT-2
- `07:45` Jared
- `07:45` Kaplan
- `07:45` Johns
- `07:45` Hopkins
- `07:55` Antrópique
- `07:56` Dario
- `07:56` Amodei
- `08:57` GPT-3
- `09:02` Newton
- `09:02` Brown
- `09:32` V100
- `09:36` Microsoft
- `10:08` FuelShot
- `10:59` Xinchila
- `11:01` DeepMind
- `11:01` Jordan
- `11:01` Hoffman
- `11:01` Harvard
- `12:05` Codex
- `12:11` GitHub
- `12:14` APIs
- `12:18` GPT-3.5
- `13:06` Aperte

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_A Escala.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 12, audio entregou 11. DIVERGE
- **Janela temporal (2017 a 2022):** declarada na capa. Fecho cita ano.
- **Anos que o audio falou e nao estao no roteiro:** 2018, 2019, 2020, 2021, 2026 (conferir com `--confere`)
- **Protagonistas citados no audio:** Amodei, Ashish, Brown, Codex, DeepMind, Devlin, GitHub, Google, Harvard, Jacob, Jared, Jordan, Kaplan, Microsoft, Ninguem, OpenAI, Transformer
- **Protagonistas do roteiro AUSENTES no audio:** Anthropic, ChatGPT, Chinchilla, Contar, Copilot, Eternal, Fechar, Guardian, Hoffmann, Ilya, Nvidia, Radford, Stanford, Sutskever, Vaswani (ou o audio pulou, ou o modelo pequeno escreveu errado)

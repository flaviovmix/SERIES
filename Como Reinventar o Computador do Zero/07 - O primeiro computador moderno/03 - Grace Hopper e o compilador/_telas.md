# Mapa das telas (gerado do audio, 16.6 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 01:41 | - |
| 2 | 01:41 | 03:03 | - |
| 3 | 04:44 | 02:08 | - |
| 4 | 06:52 | 01:12 | **Sim** |
| 5 | 08:04 | 02:17 | - |
| 6 | 10:21 | 01:42 | - |
| 7 | 12:03 | 02:32 | **Sim** |
| 8 | 14:35 | 02:01 | - |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 01:41, 01:41)

Grace Hopper e o Compilador. Isso aí. Bom, sejam todos bem-vindos a mais uma análise detalhada das nossas fontes. Eu sou o seu Anfitrião e nós estamos começando hoje o terceiro e último episódio da etapa o primeiro computador moderno. Que no caso é a sétima etapa da nossa série como reivindar o computador do zero. Exatamente. E para a gente se localizar no tempo, este episódio cobre de 1944 a 1959. Mas antes da gente mergulhar no assunto de hoje, vale a pena dar um passo para trás. Com certeza. O nosso episódio anterior terminou ali por volta de 1949, né? O computador moderno já estava totalmente definido naquela época. Sim, o EDESAC já estava funcionando bonitinho em serviço regular. E o mais importante, o programa já morava na memória junto com os números. Aham, um avanço gigantesco. Mas ainda tinha um problema bem sério ali. Pois é, o gargalo. O código ainda era escrito totalmente à mão e em binário. Tudo em zeros e uns na unha. É. Então, a nossa missão hoje é justamente resolver o problema dessa pessoa. A pessoa que escreve esse programa. É, tirar esse peso das costas do programador. Exato. Ah, e um aviso rápido sobre o formato de hoje. Esse episódio tem uma animação de nove telas que acompanha o nosso áudio. Mas, olha, se você não tiver com a página aberta agora, não tem problema nenhum. Isso. Dá para acompanhar apenas pelo áudio super de boa. A mecânica de navegação é bem simples. Quando for a hora de mudar a tela, a gente vai avisar. É só seguir o nosso comando. Então, para a gente começar, de fato, aperte o próximo.

### Tela 2 (01:41 a 04:44, 03:03)

Então, para a gente começar, de fato, aperte o próximo. Bom, a gente precisa entender o tamanho da dor de cabeça que era lidar com o binário naquela época. Era algo terrível, né? Muito. Escrever o programa em binário era muito caro e quase sempre dava errado. Você tinha uma tabela de código de máquina com dezenas de instruções diferentes. Aham. E cada endereço, na memória, era um número exato. E a pessoa precisava acompanhar tudo isso de cabeça. Cara, mas me tira uma dúvida prática. O que acontecia no dia a dia se a pessoa precisasse mudar alguma coisa no código? Tipo, adicionar um comando no meio. Ah, isso era um pesadelo. Se você trocasse uma simples linha de lugar, você era obrigado a recalcular manualmente os endereços de todo o resto do programa. Nossa, tudo de novo? Tudo. Porque você empurrava os comandos para as gavetas seguintes da memória, sabe? E o pior é que um dígito errado no meio de centenas de números não era visível na hora que você liu o papel. Passava batido, né? Passava totalmente. Você descobriu o erro muito depois quando a máquina começava a fazer besteira no meio da conta. Entendi. Então a solução para isso e a nossa personagem principal de hoje entram bem aí. O assunto central é o compilador. Isso, um programa que lê texto escrito por gente, né? Com palavras e produz sozinho o código que a máquina executa. O primeiro deles foi o A0. Isso aconteceu em 1952, lá nos Estados Unidos. E a mente por trás disso é simplesmente brilhante. É, a gente precisa passar a ficha humana obrigatória da criadora dele, a Grace Hopper. Vamos lá. Ela nasceu Grace Brewster Murray em 9 de dezembro de 1906. Nasceu lá em Nova York, nos Estados Unidos. O pai dela, Walter Fletcher Murray, era corretor de seguros. Aham. E a família vinha de uma origem escocesa e holandesa. Ela era a mais velha de três irmãos. E a formação acadêmica dela é muito forte. Muito. Ela estudou no Vassar College e se formou em matemática e física em 1928. Logo depois, ela foi para Yale. Certo. Fez o mestrado em 1930 e o doutorado em matemática em 1934. Inclusive, ela deu aula de matemática em Vassar a partir de 1931. Até a guerra mudar os planos, né? Pois é. Ela entrou na Reserva da Marinha Americana em 1943. E ela precisou pedir uma dispensa especial. Por causa do peso, né? Exato. Ela estava abaixo do peso mínimo exigido. Mas ela entrou, se formou em primeiro lugar na turma de treinamento em 1944. Caramba. É. E foi designada, já como tenente, para o projeto de computação da marinha lá em Harvard. Uma carreira e tanto. Muito longa. Ela morreu em 1 de janeiro de 1992, aos 85 anos, em Arlington, na Virgínia. E foi enterrada com honras militares. Uma história de vida incrível. Bom, para a gente ver o cenário que ela encontrou em Harvard, aperte o próximo.

### Tela 3 (04:44 a 06:52, 02:08)

Bom, para a gente ver o cenário que ela encontrou em Harvard, aperte o próximo. Voltando um pouco no tempo por contexto de 1944. Como era o trabalho dela lá em Harvard, na prática? Então, ela chegou para trabalhar com o Mark I. E vale lembrar que o chefe lá era o Howard Iken. Sim, a gente já falou dele antes. Isso. E programar o Mark I significava, basicamente, escrever toda a sequência de operações numa folha de papel. Tudo no papel, primeiro? Aham. Aí você pegava esse papel, convertia cada operação num código numérico, controlando as posições de memória de cabeça. Meu Deus! E depois furava tudo isso, furinho por furinho, numa fita de papel. Mas, qual era o custo real, se a pessoa furasse um único dígito errado nessa fita toda? O custo era perrível, a máquina não reclamava de nada, sabe? Ela lia o furo errado, somava o número errado e continuava trabalhando. Não tinha nenhum tipo de aviso? Nenhum. Ela apenas entregava um resultado no final, que até parecia plausível, mas estava errado. Achar esse erro significava pegar a fita inteira e conferir buraco por buraco à mão. Dias de trabalho jogados fora. Isso me lembra aquela história super famosa de 1947, já no Mark II. Ah, história da mariposa. Essa mesma. A equipe dela estava trabalhando e a máquina deu problema. Eles foram procurar e encontraram uma mariposa presa num relé. Um inseto de verdade. É, eles tiraram o bicho de lá, colaram a mariposa no caderno de registro e anotaram que era o primeiro bug real encontrado. Essa história é ótima. Mas, a gente precisa fazer uma ressalva histórica bem honesta aqui. Qual? A palavra bug já era usada muito antes na engenharia para descrever qualquer defeito de equipamento. Eles não inventaram a palavra ali. Ah, entendi. É, a graça da história toda é que, dessa vez, o defeito era, literalmente, um inseto, um bug de verdade. Não foi ali que a palavra nasceu. Feita a ressalva. Bom, vamos ver como eles resolveram essa trabalheira toda de furafita. Aperte o próximo.

### Tela 4 (06:52 a 08:04, 01:12)

Aperte o próximo. Pessoal, um aviso sobre essa tela. Tem um botão interativo nela para você acompanhar o nosso raciocínio visualmente. A tela está mostrando uma tabela de instruções de um lado e a memória da máquina do outro. O convite é simples. Escolha uma palavra na tela e veja qual o número sai. E, enquanto você clica aí, olha bem como funciona a estrutura de uma instrução de máquina. Ela é, basicamente, um número dividido em duas partes. Aham, explica melhor. Um pedaço do número diz para a máquina o que fazer, tipo o comando para somar. O outro pedaço diz com quem ela deve fazer essa soma. Que seria o endereço do número na memória. Exatamente. Sabe o que eu acho que é o ponto principal aqui desse episódio? É que essa conversão de uma palavra para o número, ela segue sempre a mesma regra. Sem tirar nem por. Pois é, não exige julgamento humano. Não exige nenhuma criatividade. É só olhar a tabela e trocar. E a gente já viu isso várias vezes na nossa série. Trabalho totalmente mecânico e repetitivo. É exatamente o que a gente vem passando para a máquina desde a época do hábaco. Faz todo sentido. Se a regra é fixa, a máquina faz. Sim, a máquina é perfeita para isso. E para ver como a Grace Hopper aplicou essa lógica, aperte o próximo.

### Tela 5 (08:04 a 10:21, 02:17)

E para ver como a Grace Hopper aplicou essa lógica, aperte o próximo. Então, a ideia dela foi exatamente essa, né? Foi. Ela percebeu que, se a conversão é puramente mecânica, a gente só precisa escrever um programa que faça essa conversão pela gente. E foi assim que nasceu o A0. Exato. Ela terminou o A0 lá em 1952. Na época, ela já estava trabalhando na empresa que construiu o Univec. O programa simplesmente recebia o texto em palavras e devolviu o pródito de máquina pronto. E aqui a gente precisa usar a nossa única analogia permitida para explicar o A0 direito. O compilador funciona como um tradutor de um livro. Boa comparação. Imagina que você contrata um tradutor. Ele pega o texto em inglês, trabalha em cima dele inteiro de uma vez, antes da leitura, e te entrega o livro todo traduzido em português. Tudo pronto de uma vez só. Isso. Ele não é como um intérprete de conferência, sabe? O intérprete vai traduzindo frase por frase enquanto a conversa está acontecendo. O compilador faz o serviço pesado antes. É, e no caso do A0, ele era mais como um montador de bloco, sabe? Ele pegava trechos de código que já estavam prontos e ia colando um no outro mais do que traduzindo frases muito complexas. Entendi. Ele montava o quebra-cabeça. Mas me diz uma coisa. Como que uma ideia tão boa e tão óbvia foi recebida na época? Ah, com muita resistência. A resistência é super documentada na história. Sério? Mas por quê? As pessoas diziam que computador não entende inglês. Falavam que computador era máquina de fazer aritmética e pronto. Não devia ler texto. Mas tinha algum motivo financeiro legítimo por trás dessa resistência, ou era só teimosia de engenheiro? Tinha, tinha sim. Era um fundo técnico bem legítimo. Você tem que lembrar que essas máquinas eram absurdamente caras. Custavam fortunas. E gastar o tempo precioso da máquina só para ficar traduzindo o texto de humano parecia um luxo inaceitável. Claro, a hora da máquina era mais cara que a hora do humano. Exatamente. Esse argumento de que era um desperdício só perdeu a força quando o salário, quando o tempo das pessoas passou a ser mais caro que o tempo de uso da máquina. A balança financeira virou. Virou totalmente. E para a gente entender os benefícios que fizeram todo mundo aceitar o compilador, aperte o próximo.

### Tela 6 (10:21 a 12:03, 01:42)

aperte o próximo. Bom, a gente sabe que colocar um tradutor no meio do caminho mudou tudo. Mudou. E tem três benefícios práticos gigantescos aí. Vamos listar um de cada vez. O primeiro é que o programador agora dá um nome para a posição de memória. O tradutor é quem decide onde essa posição fica fisicamente. Ah, então isso acaba com aquele pesadelo de ter que recalcular os endereços numéricos toda vez que você move uma linha. Isso mesmo. Fim do pesadelo. O segundo benefício é que surge a ideia de biblioteca. Como assim? Rotinas prontas passam a ser chamadas só pelo nome. Você podia pedir para o compilador usar uma rotina de raiz quadrada, por exemplo, sem precisar saber como ela foi escrita originalmente. Você só pede e ele puxa da prateleira. Isso. Ele injeta o código lá. E o terceiro benefício acho que é o mais útil no dia a dia. O tradutor confere o texto inteiro. Se você digitar alguma coisa errada, que não existe na tadela de comandos, ele avisa você antes de rodar o programa na máquina de verdade. Ele barra o erro na porta. Exato. Evitando que a máquina perca tempo e de aqueles resultados errados e silenciosos no final. É a salvação do programador. Mas tudo tem um custo, né? Pois é, a qual foi o preço de colocar esse tradutor no meio do circuito. Sendo bem honesta, o código gerado por um tradutor automático costuma ser um pouquinho pior. Mas lento. É um pouco menos otimizado do que o código escrito à mão por um programador superexperiente. E além disso, a pessoa acaba perdendo aquele contato direto com hardware por dentro. A pessoa fica mais distante da máquina física. Sim, ela lida mais com o texto agora. E para a gente ver para onde essa história de texto foi parar, aperte o próximo.

### Tela 7 (12:03 a 14:35, 02:32)

E para a gente ver para onde essa história de texto foi parar, aperte o próximo. A gente avança agora para o meio dos anos 50. E aí surge uma linguagem chamada FlowMatic. Um marco importante. Com certeza. Foi a primeira linguagem que usava palavras de inglês de negócios. Os comandos pareciam frases estruturadas, pensadas para quem trabalha com folha de pagamento, com finanças. Tirou a computação só da mão dos físicos. Isso. Abriu para a área administrativa. E esse FlowMatic preparou o terreno para o que veio logo depois. Em 1959, um comitê chamado Codaceu se reuniu para criar uma linguagem comum de negócios para os Estados Unidos inteiros. E a Grace Hopper estava lá, né? Tava sim. Ela participou como consultora técnica desse comitê. E o que saiu dali foi o famosíssimo Cobol. Que herdou quase tudo do FlowMatic. E um dado assustador é que o Cobol continua rodando até hoje. Firme e forte. Sim, se você for em um banco hoje, ou olhar sistemas de governo, as operações mais pesadas ainda estão rodando em cima de Cobol. Isso mostra o impacto absurdo do que eles criaram ali. E se a gente for resumir o efeito disso tudo, dá para dizer que a partir desse momento, a torre de abstração nunca mais parou de crescer. Como assim? Torre de abstração. É que cada linguagem nova que inventam se apoia na anterior. Elas vão escondendo cada vez mais a máquina. Forma um monte de camadas de tradução. Mas lá no fundo? Lá no fundo essas camadas descem até chegar no binário original. A fundação de tudo ainda é zeros e uns. E a gente vai colocar isso em prática agora. Aperte o próximo. Chegamos na tela de prática. Então eu vou fazer um convite. Pause o áudio rapidinho. Use o editor de texto que está aí na tela para escrever três linhas usando palavras de comando e depois aperte o botão de traduzir. E eu vou dar uma sugestão extra. Escreva uma linha errada de propósito no meio. Boa ideia. Digite algo que não existe. Só para você ver o tradutor reclamar e apontar o seu erro na hora antes da máquina tentar rodar. Vamos dar um segundinho para você pausar. Bom, depois de ver isso funcionando, a grande lição da tela fica clara. Ninguém apagou o binário. Ele continua vivinho da Silva. Pois é. O binário continua lá embaixo recebendo pulsos elétricos e operando o hardware. A única mudança real é que agora a gente tem um programa fazendo aquele trabalho repetitivo de conversão por nós. E para a gente amarrar essa história toda aperte o próximo.

### Tela 8 (14:35 a 16:36, 02:01)

E para a gente amarrar essa história toda aperte o próximo. Chegamos ao fim da jornada. Fazendo uma recapitulação rápida do nosso arco, a gente começou lá em 1944. A programação era feita em papel e vita, onde um errinho de nada custava sua tarde inteira. Um sofrimento. Aí em 1952 o A0 apareceu e provou que a gente podia usar um programa para montar outro programa. Depois, no meio dos anos 50, o Flowmatic trouxe as palavras do mundo dos negócios. Até que, em 1959, o comitê Kodassil criou o Kobol, que abraçou o mercado e não largou mais por décadas. E com esse resumo, nós fechamos oficialmente a etapa o primeiro computador moderno. Foram três episódios cobrindo muita coisa. A gente viu o computador sair dos projetos de papel para virar uma máquina real de metal. Sim. A gente viu o programa indo morar dentro da memória e por fim hoje o abandono da escrita direta na mão em código binário. O que fecha conta exatamente no ano de 1959. Esse é o onem que a nossa etapa para. E para preparar o terreno para o que vem pela frente, a gente deixa um último pensamento. Apesar de todo esse avanço mental lógico no software, a máquina física ainda era um monstro. Gigantesca, né? Um salão enorme, forrado de válvulas de vidro que esquentavam, gastavam muita energia e queimavam o tempo todo. Era o limite físico batendo na porta. Sim. Mas a boa notícia é que na nossa próxima etapa o cenário muda. Três pessoas no laboratório de telefonia vão mostrar um pedacinho minúsculo de material sólido e esse pedacinho faz exatamente o serviço da válvula. Só que melhor. Muito melhor. Sem filamento, sem vidro e sem gerar aquele calor infernal. É a partir desse dia que a máquina para de crescer e só encole. E é com essa promessa que a gente encerra por hoje. Obrigado por acompanhar e até a próxima etapa.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `00:00` Hopper
- `00:00` Compilador
- `00:08` Anfitrião
- `00:21` 1944
- `00:21` 1959
- `00:35` 1949
- `00:44` EDESAC
- `01:50` Escrever
- `03:10` 1952
- `03:10` Estados
- `03:10` Unidos
- `03:17` Grace
- `03:23` 1906
- `03:23` Brewster
- `03:23` Murray
- `03:28` Nova
- `03:28` York
- `03:30` Walter
- `03:30` Fletcher
- `03:44` 1928
- `03:44` Vassar
- `03:44` College
- `03:50` Yale
- `03:53` 1930
- `03:53` 1934
- `03:58` 1931
- `04:06` 1943
- `04:06` Reserva
- `04:06` Marinha
- `04:06` Americana
- `04:24` Harvard
- `04:32` 1992
- `04:32` Arlington
- `04:32` Virgínia
- `04:55` Mark
- `04:58` Howard
- `04:58` Iken
- `05:20` Deus
- `05:55` 1947
- `08:26` Univec
- `12:10` FlowMatic
- `12:37` Codaceu
- `12:51` Cobol
- `14:20` Silva
- `15:01` Flowmatic
- `15:06` Kodassil
- `15:06` Kobol

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_Grace Hopper E O Compilador.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 9, audio entregou 8. DIVERGE
- **Janela temporal (1944 a 1959):** declarada na capa. Fecho cita ano.
- **Anos do roteiro que o audio nao falou:** 1945
- **Protagonistas citados no audio:** Grace, Hopper

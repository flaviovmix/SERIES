# Mapa das telas (gerado do audio, 12.6 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 01:23 | - |
| 2 | 01:23 | 01:09 | - |
| 3 | 02:33 | 01:14 | - |
| 4 | 03:48 | 01:09 | - |
| 5 | 04:58 | 00:58 | - |
| 6 | 05:56 | 01:06 | **Sim** |
| 7 | 07:03 | 01:00 | - |
| 8 | 08:03 | 01:13 | - |
| 9 | 09:16 | 01:01 | - |
| 10 | 10:17 | 01:16 | - |
| 11 | 11:34 | 01:00 | - |

## As imagens de cada tela

| Tela | O que a tela mostra | De onde vem |
|---|---|---|
| 1 | papel quadriculado, lapis e borracha: onde o programa nascia | `binario-ilustra.jpg` |
| 2 | um cartao perfurado de verdade | `cartao-real.jpg` (dominio publico, Tangopaso) |
| 3 | o dicionario: troca palavra por numero sem entender nada | `assembler-ilustra.jpg` |
| 4 | do papel pra fita, e da fita pra maquina | `traduzir-ilustra.jpg` |
| 5 | o console do UNIVAC | `univac-real.jpg` (CC BY 2.0) |
| 6 | os tres argumentos da resistencia | quadro em HTML |
| 7 | o mesmo calculo na lingua da maquina e em FORTRAN | quadro em HTML |
| 8 | uma frase de COBOL e a exigencia de compatibilidade | quadro em HTML |
| 9 | o que muda quando o programa deixa de ser da maquina | quadro em HTML |
| 10 | a pilha de listagem: o codigo que a maquina gerou | `preco-ilustra.jpg` |
| 11 | o que a etapa fez e o que nao mudou | quadro em HTML |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 01:23, 01:23)

O compilador, sem rodeios, este é o quarto e último episódio da etapa A Máquina Que Liga, que é a sexta etapa da nossa série, como reinventar o computador do zero. E a gente fechou o episódio anterior, lá no ano de 1949. Pois é. Naquela época, a máquina já conseguia guardar o ordem de execução na mesma memória dos números, sabe? Sim, ela já conseguia saltar passos e repetir pedaços de código prontos. Lembram muito que é a lógica de uma lista de ordens numeradas? Exatamente. Só que ficou um problema enorme no ar. O programa ainda era escrito inteirinho na mão, em formato binário. É, a pessoa precisava falar a língua crua da máquina pra conseguir programar. E a nossa pergunta central de hoje é justamente essa. Olha, se traduzir também a uma tarefa que tem regras claras, por que a própria máquina não faz isso? Essa é a virada que muda tudo na história da computação. Com certeza. E só pra situar todo mundo, este episódio cobre de 1949 a 1959. E a gente tem uma regra visual pra hoje. Ásson, a nossa explicação acompanha uma página de animação que tem 11 telas no total. Isso. Quem está só ouvindo áudio pode acompanhar normalmente. Mas quem está com a página aberta aí na tela só deve virar a imagem quando ouvir o nosso pedido específico. Perfeito. Assim, o áudio casa direitinho com o visual. Então, pra gente ver de perto como era o trabalho manual com o código binário, aperte o próximo.

### Tela 2 (01:23 a 02:33, 01:09)

Então, pra gente ver de perto como era o trabalho manual com o código binário, aperte o próximo. Pra entender o tamanho do alívio que o compilador trouxe, a gente precisa lembrar da realidade de escrever em binário. Nossa, assim, era tudo anotado à mão num capé o quadriculado, né? Tudo mesmo. Cada instrução que a máquina ia executar e cada endereço de memória virava um número solto num papel. É um trabalho braçal, bem pesado. E só depois de conferir todas essas colunas, a pessoa ia furar os cartões ou aquelas fitas de papel. E tem o custaltíssimo desse método na prática. Pensa bem, se a pessoa precisasse trocar uma simples ordem de lugar no meio do código, pronto. Exato. Era um pesadelo. Todos os endereços de memória que vinham depois daquela ordem mudavam de posição. Tinha que rescrever tudo. Sem contar que um número errado digitado alí não gerava um aviso, tipo, um erro na tela, sabe? A máquina não falava nada, né? Pois é. A máquina rodava para o programa bonitinho e apenas te entregava um resultado final completamente errado. Caramba. E para achar um erro desse, significava ler linhas e linhas de números cruz no papel. Uma agulha no palheiro de código. Muito difícil. Então, para revelar o primeiro alívio que o mercado encontrou para isso, aperte o próximo.

### Tela 3 (02:33 a 03:48, 01:14)

Então, para revelar o primeiro alívio que o mercado encontrou para isso, aperte o próximo. A primeira solução real para esse problema foi o chamado assembler. Ah, e como ele mudou a rotina? No lugar de usar aquele número longo e ilegível da instrução binária, a pessoa começou a usar uma palavra bem curta, tipo, somar, carregar, guardar. E no lugar do endereço de memória cheio de números, ela usava um nome. Exatamente. Fica muito mais fácil de ler. E a gente pode usar a nossa analogia autorizada do dicionário aqui. O assembler era um programa pequeno que lia essas palavras curtas e trocava tudo pelos números certos. Ele consultava uma lista interna e fazia a troca. Só que era uma palavra de cada vez, né? Ele trocava totalmente as cegas, sem entender absolutamente nada da intenção daquele código. É verdade. Mas a conexão histórica aqui é muito forte. O dicionário foi a primeira vez que a máquina trabalhou para quem estava escrevendo o código. Ela parou de apenas calcular matemática para terceiros e ajudou o programador. Exato. Mas ainda tinha uma limitação bem pesada. Sim, porque uma palavra continuava virando só uma instrução. O trabalho pesado de pensar na máquina passo a passo continuava todinho na cabeça da pessoa. A relação ainda era de um para um. Pois é. Então para mostrar a grande virada de paradigma nisso, aperte o próximo.

### Tela 4 (03:48 a 04:58, 01:09)

Pois é. Então para mostrar a grande virada de paradigma nisso, aperte o próximo. A ideia que vir o jogo de vez é focar na própria ação de traduzir. Como assim? Pensa bem. Traduzir texto de uma língua para outra tem um passo a passo claro. Você precisa ler a entrada, procurar os pedaços numa tabela e escrever o resultado na saída. Ah, e como a máquina faz qualquer coisa que tenha um passo a passo mecânico e lógico, ela mesma poderia traduzir. Essa é a lógica. A máquina ganha a capacidade de traduzir. Então a pessoa escreve na linguagem que é mais confortável para o raciocínio dela e a máquina faz o trabalho braçal de chegar no número binário. E aqui entra a nossa segunda analogia autorizada, a analogia do tradutor. Ele é bem diferente do dicionário simples. Sim, o dicionário era palavra por palavra. O tradutor não. Ele lê a frase inteira. Ele entende a intenção geral do que foi pedido e aí ele escreve o texto equivalente na outra língua. Não é mais uma troca burra. Nossa, o compilador desmonta a lógica humana e monta a lógica da máquina do zero. Exatamente. A máquina toma as rédeas da montagem. Então, para apresentar o primeiro caso prático dessa teoria funcionando, aperte o próximo.

### Tela 5 (04:58 a 05:56, 00:58)

Então, para apresentar o primeiro caso prático dessa teoria funcionando, aperte o próximo. O primeiro grande sistema a fazer isso foi o A0, criado lá no ano de 1952. E como a pessoa interagia com esse A0? Em vez de programar passo a passo, a pessoa escrevia uma lista de chamadas, sabe? Essa lista apontava para rotinas matemáticas que já estavam prontas e testadas numa fita. Ah, como se fossem pedaços de um quebra-cabeça. Isso. O A0 ia lá, juntava tudo naquela ordem que a pessoa pediu e entregava um programa inteiro montadinho. Olha a mudança enorme de paradigma aí. Pela primeira vez, a máquina estava gerando um programa inteiro e não apenas rodando um programa que o humano fez. Sim, é a fundação do software moderno. Existe um episódio extra só sobre a pessoa que atacou esse problema, para quem quiser e fundo, mas seguindo na história, a gente precisa falar sobre a aceitação disso. É, não foi fácil. Então, para falar sobre a recepção da ideia, aperte o próximo.

### Tela 6 (05:56 a 07:03, 01:06)

Então, para falar sobre a recepção da ideia, aperte o próximo. Fica o vestionamento bem natural agora. Se a ideia do tradutor era tão boa, todo mundo aceitou a novidade super rápido? Não mesmo. Rolou uma resistência sincera e muito forte da época. Resistência por quê? A ferramenta não poupava trabalho manual? Poupava, mas o consenso entre os especialistas era de que humanos escreviam programas muito melhores. Tinha um motivo bem prático para isso, na verdade. A questão financeira? Totalmente. Memória de computador e tempo de máquina custavam muito caro. A galera achava que um tradutor automático ia gerar código ineficiente, inchado, sabe? Ah, entendi. E se o programa ficasse pesado, se dignificava gastar mais tempo processando e, claro, perda de dinheiro. Exato. Eles não queriam arriscar o desempenho só pela facilidade de escrever. Mas como foi que os pioneiros convenceram esses séticos todos? A única saída foi botar na mesa e provar na prática que o código gerado pela máquina era rápido, que era bom ou bastante para competir com os veteranos. Mostrar o resultado no ecrua, né? E para mostrar a prova real disso, aperte o próximo.

### Tela 7 (07:03 a 08:03, 01:00)

E para mostrar a prova real disso, aperte o próximo. E quem trouxe essa prova definitiva foi a linguagem FORTRAN, lançada no ano de 1957. E por que ela fez tanto sucesso? O FORTRAN permitia que as pessoas escrevessem fórmulas matemáticas direto no código, exatamente do mesmo jeito que elas já faziam no papel para o cálculo científico. E a relação disso com o que a gente acabou de falar na tela anterior é direta. O FORTRAN nasceu com a obsessão declarada de gerar um código final tão eficiente quanto o código feito à mão. Sim, a meta primária deles era quebrar aquela resistência pesada dos séticos, provando velocidade. E o ganho de tempo na rotina foi brutal, né? Nossa, muito! Quem usava a máquina agora podia focar em conferir apenas a matemática pura da fórmula. Eles pararam de conferir números e endereços de memória. Eles escreviam, tipo, uma única linha de código no lugar de dezenas de instruções binárias. É um salto de abstração maravilhoso. Com certeza! E para levar essa ideia abstrata para outro setor do mercado, aperte o próximo.

### Tela 8 (08:03 a 09:16, 01:13)

E para levar essa ideia abstrata para outro setor do mercado, aperte o próximo. A gente passou bastante tempo vendo matemática pesada, mas agora fazemos a transição do laboratório direto para o escritório corporativo. Isso! E o protagonista dessa fase é o COBOL, que nasceu no ano de 1959. E o foco dele não era cálculo científico, né? Não. O COBOL era focado em quem trabalhava com dados puros, tipo, a administração mesmo. E não com equações complexas de engenharia. A própria linguagem era diferente de ler. Muito diferente. Ela usava frases super parecidas com o inglês falado. O objetivo era que pessoas de negócios conseguissem ler e entender o programa batendo o olho. Então, foi isso que espalhou o computador direto para o setor de folha de pagamento? Isso! Folha de pagamento, controle de estoque e principalmente para dentro dos bancos. Só que o COBOL trouxe uma exigência completamente nova para o ecossistema comercial. O programa escrito em COBOL precisava rodar em máquinas de fabricantes diferentes. O que antes era impossível. Pois é. Então, para explorar o impacto dessa exigência na tecnologia, aperte o próximo.

### Tela 9 (09:16 a 10:17, 01:01)

Então, para explorar o impacto dessa exigência na tecnologia, aperte o próximo. Essa necessidade de padronização traz a maior consequência da época. Antes, todo código binário que você escrevia pertencia apenas a uma máquina específica. Ficava preso no hardware daquela marca, sabe? Exato. Mas agora a solução foi criar um tradutor para cada modelo de máquina. Assim, o mesmo texto escrito em COBOL rodava tranquilamente em qualquer computador que tivesse esse tradutor. É incrível parar para refletir sobre o significado real disso. O programa se descola da parte mecânica da máquina. Sim, ele ganha independência. O software ganha a vida própria, vira um produto independente que pode ser copiado, vendido e que sobrevive muito além da vida útil do equipamento original. A conclusão lógica é muito bonita. Programar deixou de ser um trabalho apenas focado em engenharia e eletrônica de fios e válvulas. Virou pura lógica. Então, para avaliar o que se perdeu no meio desse processo todo, aperte o próximo.

### Tela 10 (10:17 a 11:34, 01:16)

Então, para avaliar o que se perdeu no meio desse processo todo, aperte o próximo. Porque, olha, a gente tem que questionar o preço que a tecnologia cobra por tanta facilidade. O mercado cresceu, mas houve um custo de controle. Sim. O maior problema dessa camada nova entre o humano e o computador é que a pessoa perde a visibilidade. O código binário que está rodando lá no fundo do processador já não é o mesmo texto confortável que a pessoa escreveu na tela. Isso. O programa fica opaco. E quando alguma coisa dá errado no sistema, há muito mais lugares diferentes para investigar. Claro, você não sabe se o erro foi no seu texto ou na tradução da máquina, né? Pois é. E a gente tem que lembrar que o próprio tradutor ou cumpilador também é um programa de computador e, consequentemente, carrega os seus próprios defeitos lógicos de fabricação. Mas se a gente colocar as cartas na mesa, o saldo final foi muito positivo para a humanidade. Ah, sem comparação. Um enorme de pessoas que ganharam a capacidade de programar rapidamente superou com folgas aquela perda do controle absoluto e minucioso da máquina. Existe um episódio extra só sobre o que um tradutor desses faz por dentro para quem quiser ver o processo. O fato é que isso permitiu que o software escalasse para o mundo inteiro. Com certeza absoluta. E para fechar toda essa nossa história, aperte o próximo.

### Tela 11 (11:34 a 12:34, 01:00)

E para fechar toda essa nossa história, aperte o próximo. Chegamos no final de uma longa jornada. Nós amarramos hoje todo o metaca de 13 anos. Pensa que desde 1936 o computador saiu do papel, ligou na tomada real, começou a guardar a própria ordem lógica na memória e agora aprendeu a receber ordens diretamente na nossa língua humana. E o ano exato em que este nosso episódio para é 1959, o software realmente se encontrou. Mas a gente não pode esquecer de olhar para o hardware. E é esse o pensamento final que abre a próxima etapa da série. Apesar de toda a inteligência abstrata de querida, a máquina não mudou fisicamente. Ela ainda era gigante, né? Gigante. Ela continua sendo uma sala inteira lotada de painéis pesados e válvulas de vidro que sugam uma energia tremenda, esquentam de forma absurda e queimam o tempo todo. O computador ficou extremamente esperto no software, mas na vida real ele não ficou menor.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `00:00` Máquina
- `00:00` Liga
- `00:09` 1949
- `00:15` Naquela
- `00:21` Lembram
- `00:54` 1959
- `01:11` Quem
- `01:20` Assim
- `01:39` Cada
- `01:55` Pensa
- `02:57` Fica
- `03:59` Traduzir
- `05:03` 1952
- `07:07` 1957
- `07:07` FORTRAN
- `08:18` COBOL
- `11:45` 1936

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_O Compilador.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 11, audio entregou 11. OK
- **Janela temporal (1949 a 1959):** declarada na capa. Fecho cita ano.
- **Protagonistas citados no audio:** Contar, Fechar

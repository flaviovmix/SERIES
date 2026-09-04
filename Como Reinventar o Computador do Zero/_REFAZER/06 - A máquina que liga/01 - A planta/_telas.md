# Mapa das telas (gerado do audio, 12.9 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 01:34 | - |
| 2 | 01:34 | 01:30 | - |
| 3 | 03:04 | 01:13 | - |
| 4 | 04:18 | 00:52 | - |
| 5 | 05:10 | 00:41 | - |
| 6 | 05:52 | 00:36 | - |
| 7 | 06:28 | 00:56 | - |
| 8 | 07:24 | 00:56 | - |
| 9 | 08:21 | 00:52 | - |
| 10 | 09:14 | 00:59 | - |
| 11 | 10:13 | 01:05 | - |
| 12 | 11:18 | 01:34 | - |

## As imagens de cada tela

Este episodio e o do papel: quase nada aqui existiu como objeto, entao **nao ha foto
de epoca**. As telas sao ilustracao (geradas no Flow) ou quadro em HTML, e por isso
o botao de troca nao aparece em nenhuma delas. O audio nao fala dele.

| Tela | O que a tela mostra | De onde vem |
|---|---|---|
| 1 | a planta tecnica na bancada, entre interruptores e fios | `capa-ilustra.jpg` |
| 2 | os tres circuitos: dois em serie, dois em paralelo, um sozinho | `portas-ilustra.jpg` |
| 3 | oito fios com lampadinhas, umas acesas e outras nao | `bits-ilustra.jpg` |
| 4 | os quatro casos de somar dois bits | quadro em HTML |
| 5 | oito modulos emendados, o vai-um subindo de um pro outro | `somador-ilustra.jpg` |
| 6 | subtrair, multiplicar e dividir como somas arrumadas | quadro em HTML |
| 7 | dois circuitos com as saidas cruzadas segurando um bit | `flipflop-ilustra.jpg` |
| 8 | a prateleira de caixinhas iguais, uma puxada e acesa | `prateleira-ilustra.jpg` |
| 9 | a maquina de fita: a fita, o cabecote e a tabela | `turing-ilustra.jpg` |
| 10 | uma maquina imitando outra: a tabela entra como dado | quadro em HTML |
| 11 | a lista de ordens numeradas com o dedo na da vez | lista em HTML |
| 12 | a fronteira: de um lado o programa, do outro a maquina | quadro em HTML |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 01:34, 01:34)

A planta é, bom, a gente precisa recapitular bem rapidinho o que rolou na etapa anterior do nosso papo, né? Aham, foi quando a eletricidade aprendeu a brincar de lógica matemática de verdade. Exato. Ficou muito claro para a gente que um interruptor fechado significa sim e um aberto significa não. Simples assim. E quando a gente ligou esses mesmos interruptores em série e em paralelo, a gente basicamente fez a álgebra de bullying e ganha a vida física na nossa frente. Pode crer, a matemática ali virou circuito. E hoje a gente avança bastante no tempo, sabe? Sim, a gente cobre um intervalo exato de 1936 a 1948 hoje. E é muito importante avisar com todas as letras que este é um episódio de planta. Como assim planta? A gente está olhando puramente para o desenho no papel, a planta teórica. As ideias todas foram escritas enquanto outras pessoas já suavam para construir máquinas de verdade no mundo físico. O nosso próximo episódio vai ser justamente o canteiro de obras da mesma época. É uma divisão muito necessária para entender a história toda. Com certeza. E um aviso prático agora. A nossa explicação acompanha uma página de animação com 12 telas. Quem está só ouvindo áudio no trânsito ou no fone acompanha tudo normalmente, tá? Não perde nenhuma informação principal. Isso aí. Mas quem estiver com a página aberta só deve virar a tela quando ouvir o meu pedido específico, viu? E fiquem à vontade para mexer nas demonstrações durante a conversa. Então vamos lá. Aperte o próximo para montar a primeira peça.

### Tela 2 (01:34 a 03:04, 01:30)

Aperte o próximo para montar a primeira peça. Bom, a gente começa com as três portas lógicas básicas todas feitas só com aqueles interruptores. A primeira é a porta E. Pense em dois interruptores ligados em sério, um logo depois do outro no mesmo fio. Tá, então a corrente elétrica só consegue passar para o outro lado se os dois fecharem ao mesmo tempo, né? Exatamente. Os dois precisam dar sim. Já a segunda é a porta O. Nesse caso, a montagem dos interruptores em paralelo. O caminho da energia se divide. Entendi. Então a corrente passa se qualquer um deles fechar, um ou o outro. Perfeito. Agora a terceira tem um truque, que é a porta Não. A função dela é inverter completamente o sinal. Para ela inverte. Sim. Quando ela recebe energia elétrica, essa energia empurra o mecanismo que abre o circuito. Ou seja, ela corta a própria corrente, ela desliga a saída quando recebe sinal na entrada. Que loucura! Convido quem está com a tela aberta a abrir e fechar os interruptores agora para ver a lâmpada obedecer ao comando. É bem imediato e olha, tem um conceito que sustenta o nosso episódio inteiro daqui para frente, que é crucial. Absolutamente tudo que a gente vai ver, não importa o tamanho da máquina, é só uma combinação dessas três portas operando juntas. Tudo é só misturar as portas e ou e não. Isso, não tem mágica além disso. Ficou aviso de que existe um episódio extra, só sobremontar portas lógicas na mão para quem quiser e fundo. Aperte o próximo para ver com que número essas portas trabalham.

### Tela 3 (03:04 a 04:18, 01:13)

Aperte o próximo para ver com que número essas portas trabalham. Então, como cada fio do nosso circuito físico só tem dois estados, que é ter corrente ou não ter, aqueles sim e não viram simplesmente os números um e zero. O famoso sistema binário. Aham, em poucas palavras é o binário. Qualquer número existente pode ser escrito só com um e o zero. A grande sacada é que a gente avança casa a casa dobrando o valor, em vez de multiplicar por dez como a gente faz na escola. Ah, e a gente define que um fio isolado é um bit, certo? Isso mesmo, um fio é um bit. Mas, vem cá, como é que números realmente grandes cabem num negócio tão restrito? Parece que ia precisar de infinitos fios. Não precisa, porque o princípio de dobrar resolve tudo. O valor cresce numa velocidade absurda. A primeira casa vale um, a segunda vale dois, a terceira quatro. Depois vem oito, dezesseis, trinta e dois, sessenta e quatro. Nossa, vai escalando muito rápido mesmo. Convido quem acompanha a página acender e apagar os fios da tela para ver o número final mudar de verdade. É a melhor forma de entender o tamanho da coisa mexendo. Com certeza. E tem um extra só sobre contar em base dois para detalhar essa matemática aí. Aperte o próximo para fazer a primeira conta.

### Tela 4 (04:18 a 05:10, 00:52)

Aperte o próximo para fazer a primeira conta. Bom, se a gente for somar dois bit solts, a natureza só nos dá quatro casos possíveis. Zero mais zero, zero mais um, um mais zero e o famoso um mais um. Que seria dois no nosso mundo, né? Sim. E no desenho, a gente descobre que só duas portas lógicas resolvem o problema inteiro. A gente usa uma porta ou exclusivo para dar o resultado imediato daquela casa e coloca uma porta E do lado, só para cuidar do caso do um mais um. Que é o que gera o vai um para a próxima casa, né? Exatamente. Esse pacotinho desenhado é o que a gente chama de meio somador. Mas olhando a peça aqui, a limitação é bem clara. Ele soma maravilhosamente bem, mas não sabe receber o vai um de ninguém que vem de trás. É, ele só se importa com a própria casa dele, ele é meio cego para o resto. Quinta na página, passe pelos quatro casos na tela para conferir as saídas. Aperte o próximo para emendar um no outro.

### Tela 5 (05:10 a 05:52, 00:41)

Aperte o próximo para emendar um no outro. Aí entra a evolução do desenho. Com uma entrada mais no circuito feita aí especificamente para o vai um que chega da casa anterior, a peça vira um somador completo. Ah, agora ela conversa com os vizinhos? Isso. E a maravilha disso é que se a gente emendar oito somadores completos numa fileira longa, ligando a saída de um na entrada do outro, o sistema inteiro permite somar números de oito bits numa tacada só. Convida mexer nas entradas na tela para somar dois números e ver o vai um andando livremente pela fileira inteira. É bem bacana. Aperte o próximo para ver o que mais essa peça faz.

### Tela 6 (05:52 a 06:28, 00:36)

Aperte o próximo para ver o que mais essa peça faz. Tem uma coisa incrível aqui. Subtrair, multiplicar e dividir não precisam de peças novas de hardware. Tudo se resolve com somas bem arrumadas na fila. Sério, não precisa de uma calculadora de divisão separada? Nada. Multiplicar é só somar de forma repetida. Dividir é subtrair repetido. E subtrair é simplesmente somar com o número escrito de outro jeito. Nossa, é muito eficiente. Fica aqui o aviso de que tem um extra só sobre o somador e como a máquina escreve número negativo. Aperte o próximo porque agora falta a peça que lembra...

### Tela 7 (06:28 a 07:24, 00:56)

Aperte o próximo porque agora falta a peça que lembra... Todos os circuitos até agora fazem as contas e entregam o resultado na hora. Mas a novidade do Flip Flop é diferente. Sem usar desenhos complexos, ele tem duas portas onde a saída de uma fica ligada direto na entrada da outra. Peraí. A energia entra numa, sai e entra na outra que joga de volta para a primeira. É um círculo. E essa volta constante faz as portas segurarem um bit de informação parado ali, girando enquanto houver energia na tomada. Fica em loop. Isso fica preso. Um pulso elétrico externo entra e grava informação. Um outro pulso diferente vem e apaga o dado. O mais legal é que essa é a primeira peça de todo o episódio que não faz conta. Ela simplesmente lembra de uma coisa. Quem acompanha a tela sinta-se livre para gravar e apagar o bit com os pulso. Aperte o próximo para juntar vários deles.

### Tela 8 (07:24 a 08:21, 00:56)

Aperte o próximo para juntar vários deles. Se a gente alinhar uma fileira inteira desses Flip Flops lado a lado, a gente forma uma palavra de dados. A melhor analogia aqui é imaginar uma prateleira cheia de caixas numeradas. Tá. Uma prateleira gigante. Sim, e todas as caixas são perfeitamente iguais por fora. O número que fica na frente da caixa é o que a gente chama de endereço. Aí entra um seletor no circuito que recebe o endereço e liga só aquela caixa específica para ler ou gravar o que tem dentro. Convido quem está na tela a escolher um endereço e ver só aquela caixa acender. E um ponto central é que número, letra e ordem viram tudo 0 e 1 guardado ali dentro das caixas. Exatamente. A máquina não sabe a diferença, ela não entende o contexto de nada. Aquele 0 e 1 pode ser um salário ou uma letra de música. Quem sabe é a pessoa ou o programa que lê. Fico o aviso de que existe um extra só sobre como a máquina lembra das coisas. Aperte o próximo para ir a 1936.

### Tela 9 (08:21 a 09:14, 00:52)

Aperte o próximo para ir a 1936. Em 1936, o Alan Turing fez algo absurdo, estritamente no papel. Ele demonstrou que uma máquina muito simples conseguiria fazer qualquer conta matemática que uma pessoa faria com lápis e papel. Qualquer conta mesmo. Sim, qualquer uma, desde que o problema tenha um passo a passo. A ideia dele era uma máquina lendo e escrevendo símbolos numa fita contínua, usando uma tabela de regras para saber o que fazer em cada momento. Entar com a tela aberta, rode a fita aí e veja o cabeçote obedecer a tabela. E vale pontuar que esta é a única tela do nosso episódio com uma fotografia real, mostrando a página do artigo original do Turing. É foto, porque essa máquina de fita nunca foi construída de verdade com metal e fio. Todo o resto do que vimos é desenho de projeto para a fábrica, mas a máquina do Turing ficou na teoria matemática. E revolucionou tudo igual. Aperte o próximo, porque ele mostrou mais uma coisa e a maior de todas.

### Tela 10 (09:14 a 10:13, 00:59)

Aperte o próximo, porque ele mostrou mais uma coisa e a maior de todas. A segunda parte do trabalho dele é impressionante. Ele provou que uma única máquina dessas pode na verdade imitar o comportamento de qualquer outra máquina do mundo. Como é possível? Ela só precisa receber a tabela de regras da outra máquina entregue como dado puro na fita. E isso aqui separa de vez uma calculadora de um computador. A calculadora faz sempre aquilo para que foi construída nos fios. Tá, os fios definem a função da calculadora. Isso, o computador não. O computador faz o que a tabela manda. E o pulo do gato é que a tabela é só mais um dado escrito junto com os números. Que loucura! E lembrando que a planta e o canteiro de obras aconteciam juntos, viu gente? Naquele mesmo ano de 1936, alguém lá em Berlim já começava a montar uma máquina física de relês sem nunca ter lido absolutamente nada disso. Tem um extra só sobre o Turing e a máquina dele, para quem quiser entender melhor. Aperte o próximo para montar a máquina completa.

### Tela 11 (10:13 a 11:18, 01:05)

Aperte o próximo para montar a máquina completa. Vamos montar as partes da máquina universal em voz alta agora. A gente tem o acumulador, que guarda o resultado do cálculo que está sendo feito na hora. E tem o contador, que é a pecinha que diz qual é a próxima ordem. E as ordens em si? Existe um punhado pequeno de ordens com código. Coisas diretas como somar, subtrair, guardar na memória, carregar um dado para o acumulador. Ou pular direto para um outro endereço da partilheira. Para ficar claro na cabeça, imagina que o programa é uma lista longa de ordens numeradas, com um dedo apontando qual é a ordem da vez. O dedo, no caso, é o contador. É uma ótima analogia. E pular para outro endereço significa só mover o dedo mais para baixo ou mais para cima na lista. É isso que cria os laços de repetição e permite que a máquina tome decisões lógicas. Convido andar com o dedo pela lista na tela para visualizar isso rolando. Essa capacidade de pular é o que dá a inteligência dinâmica para o sistema todo. Aviso rápido de que tem um extra só sobre o conjunto de instruções e como montar a máquina completa, tá? Aperte o próximo para dizer o que nasceu aqui.

### Tela 12 (11:18 a 12:53, 01:34)

Aperte o próximo para dizer o que nasceu aqui. O que nasce em toda essa planta que desenhamos hoje é a grande fronteira. A lista de ordens armazenada é o que a gente chama de programa. Já o metal puro, os fios que executam tudo isso, formam a máquina. Nasce aí a divisão clássica entre software e hardware. Juntando nosso caminho inteiro numa frase final, olha só como escala. O interruptor básico vira a porta lógica. A porta combinada vira a somador matemático. O somador e a memória juntos viram uma máquina imensa que lê ordens. E a ordem, por fim, é só mais um dado perdido na memória. É um ciclo brilhante de abstração. Chegamos a 1948 com a planta da casa totalmente completa e desenhada no papel. O próximo episódio volta o relógio para 1936 e entra direto no canteiro de obras para ver as três primeiras máquinas que ligaram de verdade. Máquinas criadas por pessoas que, na maior parte do tempo, nem tinham visto essa planta maravilhosa que a gente explorou hoje. E fica no ar o pensamento mais provocativo disso tudo, sabe? É uma baita ironia pensar que a maior revolução da lógica humana, a sacada de que o software pode ser um dado flexível e totalmente moldável, foi inteirinha resolvida no papel. A matemática resolveu enigma, anos antes, da engenharia física da conta de construir as peças reais para acompanhar. O papel voou enquanto o metal ainda engatinhava. É desplodir a cabeça. Muito obrigado e até a próxima etapa do nosso papo.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `00:36` 1936
- `00:36` 1948
- `06:37` Flip
- `06:37` Flop
- `07:27` Flops
- `08:24` Alan
- `08:24` Turing
- `09:59` Berlim

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_A Planta.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 12, audio entregou 12. OK
- **Janela temporal (1936 a 1948):** declarada na capa. Fecho cita ano.
- **Protagonistas citados no audio:** Fechar, Turing

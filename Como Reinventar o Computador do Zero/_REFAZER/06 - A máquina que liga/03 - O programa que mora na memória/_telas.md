# Mapa das telas (gerado do audio, 14.6 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 03:00 | - |
| 2 | 03:00 | 01:16 | - |
| 3 | 04:16 | 00:54 | - |
| 4 | 05:11 | 00:46 | - |
| 5 | 05:57 | 01:04 | - |
| 6 | 07:02 | 01:12 | - |
| 7 | 08:14 | 00:45 | - |
| 8 | 09:00 | 00:44 | **Sim** |
| 9 | 09:45 | 01:36 | **Sim** |
| 10 | 11:21 | 01:16 | - |
| 11 | 12:38 | 01:59 | - |

## As imagens de cada tela

| Tela | Foto real | Ilustracao |
|---|---|---|
| 1 | `eniac-real.jpg` (o ENIAC na Penn, CC BY-SA 3.0, TexasDex) | - |
| 2 | - | `peca-ilustra.jpg`: duas caixas iguais, uma com numero e outra com ordem |
| 3 | - | `armario-ilustra.jpg`: a receita saindo da parede pro armario |
| 4 | `rascunho-real.jpg` (a capa do First Draft, dominio publico) | - |
| 5 | `vonneumann-real.jpg` (cracha de Los Alamos, Los Alamos Laboratory) | - |
| 6 | - | lista de ordens em HTML, o dedo pulando |
| 7 | - | lista de ordens em HTML, o dedo voltando |
| 8 | - | lista de ordens em HTML, o mesmo trecho chamado de tres lugares |
| 9 | `baby-real.jpg` (replica do Baby, CC BY 4.0, Logg Tandy) | `baby-ilustra.jpg`: o tubo de raios catodicos guardando os bits |
| 10 | `edsac-real.jpg` (EDSAC em Cambridge, CC BY 2.0) | `edsac-ilustra.jpg`: as linhas de atraso de mercurio |
| 11 | - | quadro em HTML |

As telas 9 e 10 tem as duas versoes: e nelas que o botao de troca aparece.

## O que o audio fala em cada tela

### Tela 1 (00:00 a 03:00, 03:00)

O programa que mora na memória. Quando a gente pensa em computação nos dias de hoje, tipo, a imagem que vem na cabeça é sempre uma tela limpa, né? Um teclado ou aquele vidro liso do celular? Sim, é tudo muito leve, quase invisível. Exato. Mas para entender o salto tecnológico que a gente vai dar agora, a gente precisa voltar para uma realidade física bem brutal, lá em 1946. Concertar ou reprogramar uma máquina de calcular naquela época envolvia suor, sabe? Muito suor. Era ferramenta pesada, esforço braçal mesmo. A troca de função da máquina era um trabalho totalmente tátil e bem cansativo, né? Nossa, com certeza. E, bom, para contextualizar, este é o terceiro episódio da etapa A máquina que liga, que faz parte da sexta etapa da nossa série como reinventar o computador do zero. Vamos recapitular de forma direta onde a gente parou no nosso último encontro? É bom lembrar porque a gente falou de máquinas enormes. Verdade. O nosso cenário anterior cobriu o período de 1936 a 1946 e terminou com a apresentação do ENIAC. Máquinas como o Z3, o Mark I e o próprio ENIAC já faziam algo bem notável. Elas já calculavam sozinhas, né? De forma automática. Isso. Mas tipo, elas deixaram o limite prático gigantesco de herança. Os números que iam ser calculados moravam dentro da máquina. Porém, as ordens de como calcular esses números, ou seja, os programas moravam do lado de fora. É, as ordens ficavam em fita de papel perfurado ou naqueles painéis cheios de cabos, sabe? Até em chaves metálicas. O peso físico disso no dia a dia da equipe era gigante. Caramba, e no caso do ENIAC, isso era pior, né? Nossa, muito pior. Trocar de tarefa no ENIAC significava literalmente mudar um monte de cabos grossos de lugar num painel que tipo, cobria paredes inteiras. Eram dias inteiros de trabalho braçal puro, só pulgar e desplugar a conector. Tudo isso só para a máquina fazer uma conta diferente. Exato. Toda aquela velocidade que os circuitos ganhavam no cálculo sumia completamente nesse tempo absurdo de preparação física. Pois é. E é justamente para resolver essa barreira que este nosso mergulho cobre o período exato de 1945 a 1949. O foco da nossa conversa de hoje está numa única peça. Apenas uma. Mas é a peça que muda tudo. É a virada de chave do computador moderno. Com certeza. E antes da gente avançar para ela, eu tenho que dar um aviso rápido sobre as telas. A explicação de hoje acompanha uma página de animação e ela tem 11 telas no total. Mas quem está só no áudio não precisa se preocupar, né? Isso, perfeito. É crucial deixar claro que quem está só escutando no trânsito ou na academia vai acompanhar o conteúdo normalmente, sabe? Não perde nada. Já quem está com a página aberta só deve virar a tela quando ouvir o meu pedido específico aqui no áudio. Tá, recado dado. Bom, feito o aviso, a gente pode encarar o problema dos cabos. Quem estiver na página aperte o próximo

### Tela 2 (03:00 a 04:16, 01:16)

Quem estiver na página aperte o próximo para a gente ver a peça que resolveu essa lentidão. Então, a solução para isso não exigiu inventar um material novo ou um circuito mágico de outro mundo. A saída veio de uma mudança de perspectiva. Tipo uma sacada lógica. Exatamente. A memória da máquina já era construída como uma fileira de posições numeradas. Cada posição dessas guardava um punhado de zeros e uns. Tá, zeros e uns normais. Isso. O grande pulo lógico da equipe foi pensar, olha, nada impede que uma dessas posições guarde uma ordem para a máquina executar em vez de guardar só um número para uma conta. Ah, faz-se total sentido. Porque ambos cabem no mesmíssimo formato. Perfeito, cabem no mesmo formato binário. A mesma caixa serve para as duas coisas. Cara, é como uma prateleira cheia de caixas numeradas e todas iguaizinhas por fora. O que define se o conteúdo é uma ordem ou um número não é a caixa em si. É o momento que a máquina abre a caixa e o que ela está procurando. É exatamente isso. Se ela abre procurando uma ordem, ela trata o conteúdo como ordem. Mas se ela procura um número, trata como número. A estrutura de hardware é a mesma. Ela atende aos dois propósitos perfeitamente. Muito bom. Quem está com a gente na página aperte o próximo para ver o que isso muda no dia a dia.

### Tela 3 (04:16 a 05:11, 00:54)

aperte o próximo para ver o que isso muda no dia a dia. O impacto imediato disso é enorme. Trocar a tarefa da máquina deixa de ser aquele trabalho físico de arrancar cabos pesados, sabe? Mostro alívio para a equipe deve ter sido imenso. Muito. A reprogramação passa-se apenas o ato de carregar um novo conteúdo nessa mesma memória. O tempo de preparo despenca de dias para mero segundos. É uma mudança de paradigma. Para ilustrar bem, antes, tipo, era como uma cozinha onde a receita do prato ficava pregada na parede. Para trocar de prato, a equipe tinha que arrancar a folha da parede. Dava um trabalho gigante toda vez. Sim. Aí, agora, a receita sai da parede e entra no armário, guardada no mesmo lugarzinho junto com os ingredientes. Nossa, ótima comparação. Tudo flui pelo mesmo sistema interno agora. Legal, né? Quem está com a página visual aberta, aperte o próximo para descobrir

### Tela 4 (05:11 a 05:57, 00:46)

aperte o próximo para descobrir onde isso foi escrito pela primeira vez. Essa ideia começou a circular num documento histórico importante. Foi no dia 30 de junho de 1945. Eles soltaram um rascunho chamado First Draft of a Report on the EDVAC. Então era só um rascunho. Era um rascunho, mas ele virou a planta do computador moderno. Ele descrevia uma máquina completinha. Tinha unidade aritmética, unidade de controle, entrada, saída e, claro, a memória. Ah, aquela memória única que a gente acabou de falar. Essa mesma. Uma memória única guardando os números e as ordens misturadas. Era o mapa do que a gente chama de computador até hoje. Caramba. Mas esse documento trouxe uma complicação daquelas, né? Quem está na página aperte o próximo

### Tela 5 (05:57 a 07:02, 01:04)

Quem está na página aperte o próximo para entender o problema jurídico que veio junto com esse rascunho. Pois é, gerou uma disputa de crédito bem chata. O documento circulou com apenas um nome impresso nele, o do John Von Neumann. E ele não estava sozinho nessa, né? De jeito nenhum, o Presbyr Eckert e o John Mousley estavam no projeto muito antes da chegada do Von Neumann. Eles sustentavam que a ideia inteira tinha nascido das reuniões longas do grupo todo lá na Moore School. Porque se imagina a dor de cabeça e deu problema legal, não deu? Deu sim. Como o documento se tornou público muito rápido e rodou de mão em mão, o governo usou isso contra eles. Isso derrubou na justiça a patente que o Eckert e o Mousley tentaram registrar depois. Olha só, é aquela coisa, né? A ideia era de um grupo, mas o nome que ficou na história foi de um só. E isso vai se repetir outras vezes nessa série, com certeza. Aliás, tem um episódio extra só sobre isso. Os bastidores de quem estava naquela sala para quem quiser ir fundo. É uma história cheia de detalhes. Verdade. Mas voltando para a peça em si, quem está visualizando as telas aperte o próximo

### Tela 6 (07:02 a 08:14, 01:12)

quem está visualizando as telas aperte o próximo para ver a primeira coisa que só ficou possível depois da criação dessa memória unificada. A primeira grande consequência lógica disso é o salto condicional. Pensa comigo. Se a ordem agora é apenas um número guardado numa caixa da memória, a máquina consegue se fazer contas matemáticas usando a própria ordem. Ah, usar a matemática na ordem, não sono dado. Isso mesmo. Com isso, a máquina consegue calcular sozinha para onde ela deve ir seguir. É a lógica de decisão. Tipo, se der este resultado, vá para lá e desvi o caminho. Quebra o trilho fixo. Tença numa lista de ordens numeradas, né? E aí você tem um dedo apontando para a ordem da vez. O dedo desce linha por linha. O dedo seria o contador do sistema, né? Exato. Pular, nesse caso, significa mover esse dedo para uma linha diferente, bem longe. E quem decide para qual linha o dedo vai é o resultado da conta que acabou de acontecer. Aliás, quem está com a página aberta, se quiser, pode dar uma mexida rápida no dedo da lista e na tela para ver como ele pula. É bem visual mesmo. E essa liberdade de pular muda o jogo. Com certeza. Quem está na página aperte o próximo para a gente olhar para a segunda consequência.

### Tela 7 (08:14 a 09:00, 00:45)

Quem está na página aperte o próximo para a gente olhar para a segunda consequência. A segunda consequência vem de carona no salto. É o laço. Porque se a máquina pode calcular o endereço da próxima ordem, ela pode muito bem usar essa matemática para pular para trás. A pular de volta para um lugar que já passou. Exatamente. Ela volta a um pedaço do programa que já executou. Nasce a capacidade de repetir a mesma tarefa várias e várias vezes, mudando apenas um númerozinho a cada volta. Nossa, muito brático. E quem está na página consegue ver o dedo voltando na lista de ordens e o número mudando a cada repetição agora. Fica fácil de entender vendo. Isso economiza um tempo enorme na hora de escrever o programa. Verdade. Bom, quem está com a gente visualmente aperte o próximo para ver a terceira consequência dessa memória.

### Tela 8 (09:00 a 09:45, 00:44)

aperte o próximo para ver a terceira consequência dessa memória. A terceira coisa é a subrotina. Isso é puro alívio para quem programa. Imagina um trecho de programa que é muito útil e você usa em várias tarefas diferentes. Em vez de escrever ele do zero toda vez, ele fica guardado num canto da memória. Aí é só chamar quando precisar. Perfeito. Nasce a ideia de uma rotina pronta. Você só chama aquele pedaço isolado e volta para o principal. Gerial. Então temos o salto, o laço e a subrotina. Isso. E essas três coisas juntas, trabalhando na mesma máquina, são exatamente a linha que separa uma calculadora automática de um verdadeiro computador moderno. Demais. E a teoria é linda, mas botar isso para rodar é outra história. Quem está na tela aperte o próximo para conhecer a primeira máquina

### Tela 9 (09:45 a 11:21, 01:36)

Quem está na tela aperte o próximo para conhecer a primeira máquina que conseguiu fazer isso funcionar na prática. O marco histórico dessa prática aconteceu em 21 de junho de 1948. Com uma máquina pequena chamada Manchester Baby. Uma máquina pequena. E ela era usada para o dia a dia mesmo. Não, não. Ela foi criada só para testar agressivamente um tipo novo de memória. Eles queriam validar um tubo de raios catódicos que ficou conhecido como Tubo Williams. Ah, tubo de raios catódicos é tipo aquelas telas de TV antiga, não é? E falando nisso, quem está na página pode clicar no botão no cantinho para trocar a entre a foto da réplica do museu e a ilustração desse tubo por dentro. Mas me diz, cabia muita coisa nesse vidro? Quase nada. O tubo do Manchester Baby guardava apenas 32 palavras de 32 bits cada. Era super apertado. Caramba, bem pouco espaço. E o que eles rodaram nele? Eles rodaram um programa minúsculo de apenas 17 instruções que já estava guardado na própria memória da máquina. Ele tinha que procurar o maior divisor próprio do número 2.062.144. Só 17 instruções? E quanto tempo levou? Levou cerca de 52 minutos. Nossa, 52 minutos. Mas aí a vitória não foi o tempo, né? A vitória foi que pela primeira vez no mundo uma máquina executou um programa que estava morando dentro dela mesma e não numa fita pendurada. Exatamente. Foi a prova de que a ideia do rasconho de 45 funcionava no metal e no vidro. Legal demais. Bom, quem está com a página aperte o próximo para ver a máquina

### Tela 10 (11:21 a 12:38, 01:16)

Bom, quem está com a página aperte o próximo para ver a máquina que transformou esse teste em um serviço de verdade. Porque depois do teste do baby, a evolução continuou. Em 6 de maio de 1949, lá em Cambridge, ligaram o EdSec. E o EdSec guardava os bits de um jeito diferente usando linhas de atraso de mercúrio. Peraí, mercúrio líquido mesmo? Líquido mesmo. A informação virava pulsos acústicos viajando pelo mercúrio um projeto super ingenioso. Mas a grande diferença do EdSec não foi só memória diferente. Foi o uso real que deram para ele. Ele não era só de teste, então? Não. O EdSec entrou em serviço regular, bem rotineiro. Pessoas de outros departamentos da universidade vinham lá cruzar o corredor para usar a máquina nas pesquisas reais deles. Olha só. Então eles usavam muita máquina. Muito. E foi justamente no uso diário do EdSec, que é aquela nossa terceira consequência, a subroutina, apareceu firme na prática. O EdSec ganhou a primeira biblioteca de rutinas prontas da história. Ah, tipo um catálogo de pedaços de código. Isso. O programador sentava lá e podia apenas chamar um pedaço de programa testado em vez de escrever toda aquela matemática do zero de novo. Que economia de trabalho, o absurdo. Bom, quem está navegando com a gente aperte o próximo para a gente dizer

### Tela 11 (12:38 a 14:37, 01:59)

Bom, quem está navegando com a gente aperte o próximo para a gente dizer onde essa história toda para por hoje. Bom, a estrutura estava toda montada. Sim. E para amarrar tudo o que vimos, a partir dessa jornada, a máquina passa a guardar a ordem no mesmo lugarzinho que o número. Ela não precisa mais de dias trocando cabos. Ela troca de tarefa em segundos. Ela salta lógicas, ela repete passos usando o laço e re usa pedaços prontos com a subroutina. A estrutura principal do computador, moderno, como a gente usa hoje, está de pé. E o ano em que a gente encerra a cronologia deste capítulo, exatamente esse, 1949. É, o hardware atingiu um formato excelente. Mas a gente não pode ignorar que ficou um desconforto enorme no ar. Um problema para quem operava, né? Gigante! O computador tem o formato certo agora, só que o programa ainda precisa ser escrito inteiramente na mão. E pior, instrução por instrução, puramente em código binário, numérico e direto. É lidar com zeros e uns puros o dia todo. Para a máquina entender o pedido, o ser humano ainda era obrigado a abandonar o próprio idioma e aprender a falar ou melhor, a escrever na língua nativa e rigorosa da máquina. Isso cansa, gera erro, atrasa tudo. O que deixa a gente com uma provocação bem clara para o nosso próximo passo nessa evolução lógica. Se traduzir coisas no fundo também é apenas uma longa tarefa baseada em regras condicionais e matemática, por que a própria máquina não traduz os programas para nós? Fico o questionamento. Ah, e tem um episódio extra interior, dedicado à pessoa que decidiu atacar exatamente esse problema de escrever na língua nativa da máquina, para quem quiser procurar depois. O desafio agora é a comunicação e não mais os cabos. Um grande abraço a todos que acompanharam essa etapa física e lógica e a gente continua jornada em breve. Até lá!

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `00:22` 1946
- `00:57` 1936
- `01:03` ENIAC
- `01:05` Mark
- `02:15` 1945
- `02:15` 1949
- `05:24` First
- `05:24` Draft
- `05:24` Report
- `05:28` EDVAC
- `06:08` John
- `06:08` Neumann
- `06:11` Presbyr
- `06:11` Eckert
- `06:11` Mousley
- `06:21` Moore
- `06:21` School
- `09:51` 1948
- `09:56` Manchester
- `09:56` Baby
- `10:10` Tubo
- `10:10` Williams
- `11:30` Cambridge
- `11:30` EdSec

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_O Programa Que Mora Na Memoria.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 11, audio entregou 11. OK
- **Janela temporal (1945 a 1949):** declarada na capa. Fecho cita ano.
- **Protagonistas citados no audio:** Usar
- **Protagonistas do roteiro AUSENTES no audio:** Contar, Fechar (ou o audio pulou, ou o modelo pequeno escreveu errado)

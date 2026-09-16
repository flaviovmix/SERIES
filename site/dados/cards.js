/* cards
   O texto dos cards do site/ (D4 do plano do SEIRES): periodo, frase, resumo, imagem e
   credito da foto de cada card. Quais cards existem, em que ordem, pra onde levam e se
   estao no ar NAO mora aqui: vem da arvore MENU do js/menu.js. Quem junta os dois e
   escreve a grade na pagina e o gerador:

     node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js"

   Nenhuma pagina carrega este arquivo. Editou aqui, roda o gerador; editou a grade na
   pagina, perde na proxima geracao (e o --confere acusa antes do deploy).

   Cada entrada e UMA grade, com o nome do marcador que ela tem na pagina:
     pagina   onde a grade mora, relativa ao site/
     tipo     etapas | extras-da-serie | series | episodios | episodios-sem-arte |
              extras | destaque-do-extra | destaque-da-etapa
     serie, etapa, extra   de que galho da MENU saem os cards
     grade    as classes da <div> da grade
     cards    { 'num da MENU': { ...texto } }, ou card (um so), nos tipos de um card

   O texto e HTML de proposito (pode ter <em> e entidade). Caminhos (imagem, audio) sao
   relativos ao site/, escritos legiveis, com espaco e acento: o gerador codifica.
   Credito da foto (decisao 3): 'ilustração', ou 'foto: Autor, Licença' no formato das
   animacoes, com a descricao da foto em `descricao`. Foto real sem credito conhecido fica
   sem `credito`, e o card fica sem lupa ate ter (P10). A origem de cada credito esta em
   plano/levantamento-legendas.md. */

module.exports = {

  /* ---------- Do Ábaco à IA (serie 01) ---------- */

  'computador/etapas': {
    pagina: 'computador.html',
    tipo: 'etapas',
    serie: '01',
    grade: 'grade',
    cards: {
      '01': {
        /* sem credito conhecido (P10): fica sem lupa */
        imagem: 'img/abaco-episodio.webp',
        periodo: `Antiguidade &rarr; séc. XV`,
        frase: `O número, o dedo e o céu.`,
        resumo: `Antes de qualquer máquina, uma invenção: um jeito de <em>mover</em> quantidade fora da cabeça. O ábaco não tem engrenagem e não calcula sozinho, e mesmo assim é dele que vem tudo o que vem depois.`,
      },
      '02': {
        periodo: `100 a.C. &ndash; 1623`,
        frase: `Os instrumentos que seguraram a conta.`,
        resumo: `Entre a Anticítera e a Pascalina passam mil e setecentos anos sem máquina de calcular. No lugar aparecem instrumentos: objetos que não calculam sozinhos, mas encurtam a conta de quem calcula.`,
        contagem: `2 episódios`,
      },
      '03': {
        periodo: `1642 &ndash; 1837`,
        frase: `A mecânica calcula sozinha.`,
        resumo: `A conta sai da mão de quem calcula e entra no metal. Duas linhagens crescem em paralelo e só se encontram no fim: as engrenagens que somam e os furos que mandam.`,
        contagem: `6 episódios`,
      },
      '04': {
        periodo: `1600 &ndash; 1880`,
        frase: `De fenômeno do céu a corrente no fio.`,
        resumo: `A etapa de que a série inteira depende e que quase todo mundo pula: o que é a eletricidade, como se prende num fio, como vira força e como vira sinal.`,
        contagem: `7 episódios`,
      },
      '05': {
        periodo: `1854 &ndash; 1937`,
        frase: `Quando o interruptor virou lógica.`,
        resumo: `Boole mostra que raciocínio é conta, Hollerith mostra que dado é furo que fecha circuito, e Shannon junta as duas pontas: um interruptor é uma proposição lógica.`,
        contagem: `3 episódios`,
      },
      '06': {
        /* sem credito conhecido (P10): fica sem lupa */
        imagem: 'img/etapa-06.webp',
        periodo: `1936 &ndash; 1959`,
        frase: `Do papel à tomada, e da tomada à nossa língua.`,
        resumo: `Primeiro a planta, o computador inteiro desenhado sem ligar nada. Depois o canteiro, com as três primeiras máquinas que funcionaram. Então o programa entra na mesma memória dos números. E no fim a máquina aprende a receber ordem escrita como a gente escreve.`,
      },
      '07': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/01 - O transistor/img/transistor-real.jpg',
        descricao: `Réplica do primeiro transistor`,
        credito: `foto: Mister rf, CC BY-SA 4.0`,
        periodo: `1947 &ndash; 1974`,
        frase: `A mesma máquina, cabendo numa pastilha.`,
        resumo: `A peça que decide o tamanho de tudo troca de material: válvula vira transistor, transistor vira circuito integrado, e no fim o computador inteiro cabe num pedaço de silício do tamanho de uma unha.`,
      },
      '08': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/01 - O computador chega em casa/img/altair-real.jpg',
        descricao: `O Altair 8800 na capa da Popular Electronics de janeiro de 1975`,
        credito: `foto: Maksym Kozlenko, CC BY-SA 4.0`,
        periodo: `1975 &ndash; 1995`,
        frase: `Entra em casa e depois vira rede.`,
        resumo: `O computador deixa de ser equipamento de instituição e vira objeto de casa. Depois deixa de ser objeto sozinho e vira rede.`,
      },
      '09': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/09 - A máquina que aprende/01 - A corrida do processador/img/pentium-die-real.jpg',
        descricao: `A pastilha de um Pentium ao microscópio: três milhões de transistores (este é um de 120 MHz, da mesma família)`,
        credito: `foto: cole8888, CC BY-SA 2.0`,
        periodo: `1993 &ndash; 2017`,
        frase: `Primeiro as peças correm. Depois o programa deixa de ser escrito.`,
        resumo: `A máquina já está em toda casa. O processador corre e bate na parede do calor, a placa de vídeo feita pra jogo vira a peça da era seguinte, uma ideia de 1958 sai da gaveta, e em 2017 o programa passa a ser achado, não escrito.`,
      },
      '10': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/01 - A bolha/img/estrada-real.jpg',
        descricao: `Uma obra grande demais para o tráfego do dia em que foi feita`,
        credito: `foto: Ken Lund, CC BY-SA 2.0`,
        periodo: `1995 &ndash; 2016`,
        frase: `Primeiro virou dinheiro, depois virou gente, no fim virou escolha.`,
        resumo: `A rede abriu pro comércio e o dinheiro chegou antes do uso: a bolha estourou e deixou fibra barata enterrada. Depois veio um jeito de ordenar a web e cobrar por isso, gente demais publicando ao mesmo tempo, e um modelo escolhendo o que cada um vê.`,
      },
      '11': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/11 - A máquina que conversa/01 - A escala/img/datacenter-real.jpg',
        descricao: `Escala é isto: fileiras de máquinas fazendo a mesma conta`,
        credito: `foto: Carl Lender, CC BY 2.0`,
        periodo: `2017 &ndash; 2022`,
        frase: `O mesmo desenho de 2017, mil vezes maior.`,
        resumo: `O Transformer nasceu pra traduzir e, treinado só pra adivinhar a próxima palavra, ficou mil vezes maior em cinco anos. Depois vem o galpão feito pra ele, gente ensinando a máquina a responder, e o dia em que ela chegou na mão de todo mundo.`,
      },
    },
  },

  'computador/extras': {
    pagina: 'computador.html',
    tipo: 'extras-da-serie',
    serie: '01',
    grade: 'grade grade--dupla',
    card: {
      periodo: `avulsos &middot; em qualquer ordem`,
      frase: `O "como funciona", sem a história.`,
      resumo: `Volt, ampère e watt explicados como água num prédio; o ímã por dentro; e a dupla que vem aí: o sistema decimal e o binário. Todo extra termina dizendo onde a própria analogia quebra.`,
    },
  },

  /* as paginas de etapa: um card por episodio. O botao "Abrir a animação" ou o selo
     "em produção" sai da MENU (o episodio tem href ou nao); duracao e telas, do dado */

  'etapa-06/episodios': {
    pagina: 'etapas/etapa-06.html',
    tipo: 'episodios',
    serie: '01',
    etapa: '06',
    grade: 'grade grade--dupla',
    cards: {
      '01': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/06 - A máquina que liga/01 - A planta/img/capa-ilustra.jpg',
        descricao: `A planta na bancada`,
        credito: `reconstituição, não é foto de época`,
        periodo: `1936 &rarr; 1948`,
        frase: `O computador inteiro, sem ligar nada.`,
        resumo: `Porta lógica, somador, memória com endereço, a máquina universal e o conjunto de instruções: cinco passos que vão do interruptor até uma máquina que faz conta e obedece ordem, tudo no papel.`,
        contagem: `13 min &middot; 12 telas`,
      },
      '02': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/06 - A máquina que liga/02 - As primeiras máquinas que ligaram/img/eniac-real.jpg',
        descricao: `O ENIAC, 1946`,
        credito: `foto: TexasDex, CC BY-SA 3.0`,
        periodo: `1936 &rarr; 1946`,
        frase: `O canteiro de obras, na mesma época.`,
        resumo: `Relé contra válvula, e as três primeiras máquinas programáveis que funcionaram de verdade: o Z3 numa sala em Berlim, o Mark I em Harvard e o ENIAC, trinta toneladas, programado a cabo.`,
        contagem: `14 min &middot; 12 telas`,
      },
      '03': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/06 - A máquina que liga/03 - O programa que mora na memória/img/baby-real.jpg',
        descricao: `Réplica do Manchester Baby`,
        credito: `foto: Logg Tandy, CC BY 4.0`,
        periodo: `1945 &rarr; 1949`,
        frase: `A ordem vira só mais um dado.`,
        resumo: `A mesma caixa guardando número ou ordem, o rascunho de 1945 e a briga do nome, o salto, o laço e a sub-rotina, e as duas primeiras máquinas a rodar um programa guardado dentro delas.`,
        contagem: `15 min &middot; 11 telas`,
      },
      '04': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/06 - A máquina que liga/04 - O compilador/img/cartao-real.jpg',
        descricao: `Um cartão perfurado`,
        credito: `foto: Tangopaso, domínio público`,
        periodo: `1949 &rarr; 1959`,
        frase: `A máquina aprende a nossa língua.`,
        resumo: `Escrever em binário na mão, o assembler que troca palavra por número, e a virada: se traduzir é uma tarefa, a máquina traduz. Do A-0 ao FORTRAN e ao COBOL, até o programa deixar de pertencer a uma máquina só.`,
        contagem: `13 min &middot; 11 telas`,
      },
    },
  },

  'etapa-07/episodios': {
    pagina: 'etapas/etapa-07.html',
    tipo: 'episodios',
    serie: '01',
    etapa: '07',
    grade: 'grade grade--dupla',
    cards: {
      '01': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/01 - O transistor/img/transistor-real.jpg',
        descricao: `Réplica do primeiro transistor`,
        credito: `foto: Mister rf, CC BY-SA 4.0`,
        periodo: `1947 &rarr; 1955`,
        frase: `A mesma função, feita de pedra.`,
        resumo: `O que a válvula cobra em calor e manutenção, o semicondutor resolve sem nada se mexendo: dopagem, junção, três camadas e uma delas comandando a corrente. Com modelo tridimensional pra girar e abrir.`,
        contagem: `14 min &middot; 11 telas`,
      },
      '02': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/02 - O circuito integrado/img/ci-1965-real.jpg',
        descricao: `Um circuito integrado de 1965`,
        credito: `foto: Mister rf, CC BY-SA 4.0`,
        periodo: `1958 &rarr; 1965`,
        frase: `Fazer as peças já ligadas.`,
        resumo: `Quarenta mil pontos de solda feitos à mão viraram o limite da máquina. A saída foi parar de ter peças: fazer todas no mesmo pedaço de cristal, com as ligações impressas. É aqui que encolher deixa de custar caro e vira vantagem.`,
        contagem: `17 min &middot; 11 telas`,
      },
      '03': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/03 - O microprocessador/img/4004-real.jpg',
        descricao: `O primeiro microprocessador, na própria placa da calculadora`,
        credito: `foto: MaltaGC, CC BY-SA 4.0`,
        periodo: `1969 &rarr; 1974`,
        frase: `O computador inteiro numa pastilha.`,
        resumo: `Uma encomenda de calculadora vira a pergunta certa: e se um chip só fizesse qualquer trabalho, com a ordem guardada na memória? É a ideia de 1948 cabendo numa unha, e o valor migrando do metal pro programa.`,
        contagem: `15 min &middot; 11 telas`,
      },
    },
  },

  'etapa-08/episodios': {
    pagina: 'etapas/etapa-08.html',
    tipo: 'episodios',
    serie: '01',
    etapa: '08',
    grade: 'grade grade--dupla',
    cards: {
      '01': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/01 - O computador chega em casa/img/altair-real.jpg',
        descricao: `O Altair 8800 na capa da Popular Electronics de janeiro de 1975`,
        credito: `foto: Maksym Kozlenko, CC BY-SA 4.0`,
        periodo: `1975 &rarr; 1990`,
        frase: `Hardware e software, um empurrando o outro.`,
        resumo: `Em 1974 a Intel vende o 8080 e ninguém sabe o que fazer com ele. Este episódio segue, em ordem e com nome, quem pegou a peça: a Xerox que construiu a tela e guardou na gaveta, Roberts e o Altair, Gates e Allen sem a máquina, Wozniak no clube, Bricklin e a planilha, a IBM, a mãe do Gates e o DOS, o Mac que fez a tela caber, e a briga pelo Windows.`,
        contagem: `24 min &middot; 12 telas`,
      },
      '02': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/02 - Conectando tudo - a internet/img/imp-real.jpg',
        descricao: `O painel de um Interface Message Processor, a máquina que só lia etiqueta e empurrava pra frente`,
        credito: `foto: Carlo Nardone, CC BY-SA 2.0`,
        periodo: `1969 &rarr; 1995`,
        frase: `Não venceu por ser a melhor rede.`,
        resumo: `Ligar dois computadores por um fio já se fazia. O difícil era fazer redes diferentes, de donos diferentes, virarem uma rede só sem ninguém no comando. Em ordem e com nome: Licklider paga, Kleinrock, Baran e Davies pensam o pacote, Kline manda o "LO", Tomlinson inventa o e-mail, Cerf e Kahn fazem o envelope, Postel troca a língua de todo mundo num dia, Mockapetris põe o nome no lugar do número, Berners-Lee escreve a teia e dá de graça, Andreessen leva pro PC de casa.`,
        contagem: `18 min &middot; 11 telas`,
      },
      '03': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/03 - O sistema operacional/img/pdp7-real.jpg',
        descricao: `Um PDP-7 como o que estava abandonado num canto da Bell Labs em 1969`,
        credito: `foto: Matiashf, CC BY-SA 3.0`,
        periodo: `1961 &rarr; 1997`,
        frase: `O programa que roda os outros.`,
        resumo: `Os dois episódios anteriores disseram "sistema operacional" sem explicar. É o síndico do prédio: reparte o processador, sabe de quem é cada pedaço da memória, guarda os arquivos e cuida da portaria. Em ordem e com nome: Corbató reparte o tempo, Thompson e Ritchie escrevem o Unix num PDP-7 abandonado e depois o soltam do hardware com a linguagem C, Kildall separa o pedaço que fala com a máquina, a cara chega e cobra de volta o que o DOS jogou fora, a Apple processa e perde, Stallman escreve a liberdade numa licença, Torvalds faz o núcleo aos 21 anos, Cutler refaz o Windows por dentro e Jobs volta com um Unix debaixo do braço.`,
        contagem: `16 min &middot; 12 telas`,
      },
    },
  },

  'etapa-09/episodios': {
    pagina: 'etapas/etapa-09.html',
    tipo: 'episodios',
    serie: '01',
    etapa: '09',
    grade: 'grade grade--dupla',
    cards: {
      '01': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/09 - A máquina que aprende/01 - A corrida do processador/img/pentium-die-real.jpg',
        descricao: `A pastilha de um Pentium ao microscópio: três milhões de transistores (este é um de 120 MHz, da mesma família)`,
        credito: `foto: cole8888, CC BY-SA 2.0`,
        periodo: `1993 &rarr; 2006`,
        frase: `O relógio sobe, bate na parede, e a conta volta pro software.`,
        resumo: `Correr é duas coisas: quantas vezes por segundo o relógio bate e quanto o chip faz em cada batida. Em ordem e com nome: Dham faz o Pentium com dois caixas abertos, Nicely acha o erro dentro do chip e Grove paga a troca, Eden reordena o programa em Haifa, Sanders leva a AMD de cópia a concorrente, Meyer chega primeiro ao giga-hertz, Gelsinger avisa do calor e Dennard explica por que a regra acabou, a AMD estica o x86 pra 64 bits sem quebrar o programa, o Pentium 4 para em 3,8 GHz, Otellini vira a Intel pra dois núcleos, e o chip de notebook vence abaixando o relógio.`,
        contagem: `14 min &middot; 12 telas`,
      },
      '02': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/09 - A máquina que aprende/02 - A placa de vídeo/img/voodoo-real.jpg',
        descricao: `O chip de uma placa 3dfx Voodoo: a peça feita pra jogo`,
        credito: `foto: Dennis Lamczak, CC BY-SA 3.0`,
        periodo: `1996 &rarr; 2007`,
        frase: `A peça feita pra jogo que virou a peça da era seguinte.`,
        resumo: `Por que o processador é ruim em pintar pixel: uma conta por vez, milhões de pontos. A 3dfx pra jogo, a NVIDIA e a primeira placa chamada de GPU, a ATI e a AMD comprando a ATI, milhares de núcleos pequenos fazendo a mesma conta em números diferentes, e o CUDA abrindo a placa pra conta que não é jogo.`,
        contagem: `12 min &middot; 12 telas`,
      },
      '03': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/09 - A máquina que aprende/03 - A máquina que aprende/img/mark1-real.jpg',
        descricao: `O Mark I Perceptron (1960), com a câmera que lhe mostrava letras: os pesos eram botões de verdade`,
        credito: `manual do operador, domínio público`,
        periodo: `1958 &rarr; 2012`,
        frase: `Uma ideia na gaveta desde 1958, esperando o hardware baratear.`,
        resumo: `Rosenblatt e o perceptron, Minsky e Papert e o primeiro inverno, Hinton e o backpropagation, LeCun lendo cheque, o segundo inverno, Fei-Fei Li e o ImageNet, e 2012: uma rede treinada em duas placas de vídeo de jogo derruba o erro pela metade.`,
        contagem: `16 min &middot; 12 telas`,
      },
      '04': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/09 - A máquina que aprende/04 - 2017 - Attention is All You Need/img/p100-real.jpg',
        descricao: `A pastilha de uma Tesla P100 aberta, com as memórias empilhadas ao lado: o Transformer foi treinado em oito delas`,
        credito: `foto: Fritzchens Fritz, CC0`,
        periodo: `2014 &rarr; 2017`,
        frase: `Software com a forma do hardware.`,
        resumo: `O gargalo das redes que leem uma palavra por vez, a atenção, e o Transformer desenhado pra ser paralelo. Da pedra do ábaco ao peso da rede, a máquina ainda é Boole mais Von Neumann mais um programa, só que agora o programa é achado, não escrito.`,
        contagem: `17 min &middot; 12 telas`,
      },
    },
  },

  'etapa-10/episodios': {
    pagina: 'etapas/etapa-10.html',
    tipo: 'episodios',
    serie: '01',
    etapa: '10',
    grade: 'grade grade--dupla',
    cards: {
      '01': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/01 - A bolha/img/estrada-real.jpg',
        descricao: `Uma obra grande demais para o tráfego do dia em que foi feita`,
        credito: `foto: Ken Lund, CC BY-SA 2.0`,
        periodo: `1995 &rarr; 2001`,
        frase: `O dinheiro chegou antes do uso.`,
        resumo: `A bolsa descobre a internet, empresa sem receita vale bilhões, e em março de 2000 o índice despenca. O que sobrou no chão foi fibra ótica enterrada e gente treinada: a bolha pagou a infraestrutura que a década seguinte usou quase de graça.`,
        contagem: `16 min &middot; 12 telas`,
      },
      '02': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/02 - A busca vira negócio/img/pagerank-real.png',
        descricao: `Cada bola é uma página e o tamanho dela é o peso que recebe dos links que apontam pra ela`,
        credito: `diagrama: 345Kai e Stannered, domínio público`,
        periodo: `1998 &rarr; 2004`,
        frase: `Quando o software ordena, alguém decide a ordem.`,
        resumo: `O PageRank ordena a web por quem aponta pra quem, e o anúncio ao lado do resultado paga a conta da rede inteira. É o primeiro algoritmo que decide o que bilhões de pessoas veem, e o leilão que decide quem aparece.`,
        contagem: `14 min &middot; 12 telas`,
      },
      '03': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/03 - As redes sociais/img/grafo-real.png',
        descricao: `Guardar ligação entre pessoas é outro tipo de problema`,
        credito: `diagrama: Martin Grandjean, CC BY-SA 3.0`,
        periodo: `2002 &rarr; 2012`,
        frase: `Gente demais publicando ao mesmo tempo.`,
        resumo: `De Friendster e MySpace ao Facebook, Twitter e YouTube. O feed em ordem de hora funciona enquanto a rede é pequena; quando não é mais, a máquina passa a escolher o que mostrar. O volume de gente virou um problema de computação.`,
        contagem: `22 min &middot; 12 telas`,
      },
      '04': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/04 - O algoritmo de recomendação/img/envelope-real.jpg',
        descricao: `O produto em 2006 chegava pelo correio`,
        credito: `foto: BlueMint, CC BY 2.5`,
        periodo: `2006 &rarr; 2016`,
        frase: `A primeira máquina que aprendeu e tocou todo mundo.`,
        resumo: `O prêmio da Netflix e a conta que descobre gosto sem entender de filme; o feed ordenado por modelo; e o YouTube trocando a recomendação por rede neural em 2016, quatro anos depois da AlexNet. O dado que ela gerou é o combustível do que vem depois.`,
        contagem: `19 min &middot; 10 telas`,
      },
    },
  },

  'etapa-11/episodios': {
    pagina: 'etapas/etapa-11.html',
    tipo: 'episodios',
    serie: '01',
    etapa: '11',
    grade: 'grade grade--dupla',
    cards: {
      '01': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/11 - A máquina que conversa/01 - A escala/img/transformer-real.png',
        descricao: `O desenho de 2017: o codificador, à esquerda, lê; o decodificador, à direita, escreve`,
        credito: `diagrama: Yuening Jia, CC BY-SA 3.0`,
        periodo: `2017 &rarr; 2022`,
        frase: `O mesmo desenho, mil vezes maior.`,
        resumo: `O Transformer nasceu pra traduzir. Treinado só pra adivinhar a próxima palavra, ele foi crescendo: GPT-1, BERT, GPT-2, a reta das leis de escala, o GPT-3 com 175 bilhões, o tamanho certo do Chinchilla, e o GPT-3.5 que aprendeu código. O programa achado melhora só de ficar maior, e quem decide o tamanho é a placa e o dado.`,
        contagem: `12 min &middot; 12 telas`,
      },
      '02': {
        periodo: `2016 &rarr; 2022`,
        frase: `A placa passa a ser desenhada pro Transformer.`,
        resumo: `O Tensor Core, a memória empilhada ao lado do chip, o fio entre as placas, o supercomputador da Microsoft pra OpenAI, a TPU refrigerada a líquido. O problema deixou de ser fazer conta e virou mover número.`,
        contagem: `peça`,
      },
      '03': {
        periodo: `2017 &rarr; 2022`,
        frase: `O que faz a máquina responder não é mais peso, é gente.`,
        resumo: `O modelo que completa texto não responde. Gente escreve exemplos e escolhe entre duas respostas, e uma rede aprende o gosto. Do InstructGPT ao modelo cem vezes menor que sai preferido ao GPT-3.`,
        contagem: `conceito`,
      },
      '04': {
        periodo: `2015 &rarr; 2022`,
        frase: `A máquina que conversa chega na mão de todo mundo.`,
        resumo: `A OpenAI de 2015 a 2022, contada como aposta. O ChatGPT em 30 de novembro, um milhão de contas em cinco dias, o que custa responder, e a pergunta que abre a próxima etapa: quem fabrica a placa que todo mundo passou a querer?`,
        contagem: `figura e balanço`,
      },
    },
  },

  /* os extras: o hub e as paginas dos dois que sao so audio. O selo ("no ar", "pra
     conferir", "em produção") mora aqui porque a MENU nao sabe o que e "pra conferir";
     o gerador para se o selo contradiz a MENU (decisao 6). O botao so existe se o extra
     tem link na MENU. */

  'extras/todos': {
    pagina: 'extras/index.html',
    tipo: 'extras',
    serie: '01',
    grade: 'grade grade--dupla',
    cards: {
      '01': {
        periodo: `analogia: o prédio com caixa d'água`,
        frase: `Eletricidade explicada como água num prédio.`,
        resumo: `A lâmpada diz 9 W, o chuveiro 5.500 W, o carregador 5 V e 2 A, o disjuntor 20 A, a bateria 5.000 mAh e a conta de luz cobra em kWh. Seis medidas na mesma casa e ninguém explica a diferença: aqui todas saem de um prédio com caixa d'água no telhado.`,
        contagem: `27 min &middot; com modelo 3D`,
        selo: 'no ar',
        botao: `Ouvir o extra`,
      },
      '02': {
        periodo: `analogia: as agulhinhas de bússola`,
        frase: `Como os ímãs funcionam por dentro.`,
        resumo: `Por que gruda em ferro e não em alumínio, por que às vezes empurra em vez de atrair, por que quebrar ao meio cria dois ímãs inteiros, e por que segurar um papel na geladeira por dez anos não gasta energia nenhuma. Tudo sai de uma imagem só: o ferro é feito de milhões de agulhinhas de bússola.`,
        contagem: `37 min`,
        selo: 'no ar',
        botao: `Ouvir o extra`,
      },
      '03': {
        periodo: `analogia: os dez dedos`,
        frase: `A base que você já usa sem perceber.`,
        resumo: `Por que contamos de dez em dez, o que o "vai um" realmente faz, e por que a posição do algarismo vale mais que o desenho dele. É a peça que o extra seguinte vira de cabeça pra baixo.`,
        contagem: `13 min &middot; 10 telas`,
        selo: 'pra conferir',
        botao: `Ouvir com as telas`,
      },
      '04': {
        periodo: `analogia: a lâmpada e o interruptor`,
        frase: `A mesma conta, com dois algarismos só.`,
        resumo: `O que acontece quando a base dez vira base dois: contar, somar e fazer o vai-um só com liga e desliga. É o idioma de tudo o que a série monta depois, explicado sem história.`,
        contagem: `29 min &middot; 10 telas`,
        selo: 'pra conferir',
        botao: `Ouvir com as telas`,
      },
      '05': {
        periodo: `analogia: o armário de dezesseis gavetas`,
        frase: `Contar até quinze num desenho só.`,
        resumo: `Por que existe uma base em que A vale dez e F vale quinze, o que o FF6B35 da cor de tela está dizendo, e por que dezesseis é exatamente o tamanho que resume quatro sim-ou-nãos.`,
        contagem: `11 min &middot; 10 telas`,
        selo: 'pra conferir',
        botao: `Ouvir com as telas`,
      },
      '06': {
        periodo: `analogia: o relógio`,
        frase: `A base que você lê no pulso todo dia.`,
        resumo: `Sessenta segundos, sessenta minutos, 360 graus: por que o grupo de sessenta sobreviveu milhares de anos — a divisão sem sobra — e como se conta nele sem inventar sessenta desenhos.`,
        contagem: `24 min &middot; 10 telas`,
        selo: 'pra conferir',
        botao: `Ouvir com as telas`,
      },
      '07': {
        periodo: `analogia: o balanço do parque`,
        frase: `O que o giga da etiqueta conta.`,
        resumo: `A rádio diz 89,1, o roteador 2,4, o processador 3 — e o sobrenome é sempre hertz. Quantas vezes por segundo algo vai e volta, por que grave é lento e agudo é rápido, e por que o giga só mora em coisas minúsculas. Tem tela que toca som de verdade.`,
        contagem: `15 min &middot; 10 telas`,
        selo: 'pra conferir',
        botao: `Ouvir com as telas`,
      },
      '08': {
        periodo: `séc. VII &ndash; XIII`,
        frase: `Como o zero criou o algoritmo.`,
        resumo: `Por que os algarismos romanos são bons de registrar e péssimos de calcular, como o sistema posicional indiano com o zero resolveu isso, e quem trouxe esses algarismos até aqui: Brahmagupta, al-Khwarizmi e Fibonacci. Saiu da etapa 01 e virou extra.`,
        audio: { src: '../Como Reinventar o Computador do Zero/OLD/01 - Contar antes das máquinas/02 - O Zero e os Números/Como o zero criou o algoritmo.mp3', duracao: '22 min' },
        contagem: `22 min &middot; 9 telas`,
        selo: 'no ar',
        botao: `Abrir a animação`,
      },
      '09': {
        periodo: `1958 &rarr; 2000`,
        frase: `Foram dois, e os dois estão certos.`,
        resumo: `Um circuito era feito de peças soltas, e uma máquina grande pedia dezenas de milhares de soldas à mão. Jack Kilby, sozinho no laboratório nas férias coletivas de 1958, provou que dava pra fazer tudo num pedaço só. Robert Noyce, meses depois, mostrou como fabricar aos milhares. Vieram a briga de patente, o acordo, e um Nobel que só um dos dois viveu pra receber.`,
        audio: { src: '../Como Reinventar o Computador do Zero/_EXTRAS/09 - Quem Fez o Primeiro Chip/Como Kilby e Noyce inventaram o chip.m4a', duracao: '16 min' },
        contagem: `16 min &middot; 10 telas`,
        selo: 'pra conferir',
        botao: `Ouvir com as telas`,
      },
      '10': {
        periodo: `1965 &rarr; hoje`,
        frase: `A previsão que virou combinado.`,
        resumo: `Um artigo curto de revista, escrito em 1965 em cima de meia dúzia de pontos num gráfico, virou o calendário de uma indústria inteira. Não é lei da física: cumpriu-se porque todo mundo passou a mirar nela. Inclui a confusão mais comum (ela não fala de velocidade), o ano em que a frequência parou de subir, e onde a curva está hoje.`,
        audio: { src: '../Como Reinventar o Computador do Zero/_EXTRAS/10 - A Lei de Moore/A Lei de Moore não é física.m4a', duracao: '18 min' },
        contagem: `18 min &middot; 10 telas`,
        selo: 'pra conferir',
        botao: `Ouvir com as telas`,
      },
      /* 11 a 18: encomenda de 06/09, saidos do episodio 08-01 (familia "peca e figura",
         com nome e data). Sem audio ainda: card com foto e selo, sem botao. As fotos do
         8080, do Alto e do Apple II vem da pasta do 08-01; a do servidor, do 08-02; as
         outras quatro moram em site/img/. A da Intel e a mesma foto do 4004 (07-03). */
      '11': {
        imagem: 'img/extra-11-intel.jpg',
        descricao: `O primeiro microprocessador, na própria placa da calculadora`,
        credito: `foto: MaltaGC, CC BY-SA 4.0`,
        periodo: `1968 &rarr; hoje`,
        frase: `A empresa que vendia memória e virou a peça que pensa.`,
        resumo: `Fundada em 1968 por dois engenheiros que saíram da Fairchild, vendia chip de memória. Uma encomenda de calculadora japonesa vira o 4004, o primeiro processador num chip; o 8080 vai parar no Altair e o 8088 no IBM PC. Por que o processador ficou com o nome dela, e não do computador.`,
        contagem: `peça e figura`,
        selo: 'em produção',
      },
      '12': {
        /* sem credito conhecido (P10): fica sem lupa */
        imagem: 'img/extra-12-ibm.jpg',
        periodo: `1911 &rarr; 1981`,
        frase: `Do cartão furado ao PC, e como perdeu o padrão que criou.`,
        resumo: `Nasce das tabuladoras de Hollerith, faz o Mark I, domina o mundo com os mainframes System/360 e a frase "ninguém é demitido por comprar IBM". Em 1980 manda doze pessoas pra Boca Raton montar um PC de peças de prateleira em um ano, publica o esquema, e os clones levam o mercado.`,
        contagem: `peça e figura`,
        selo: 'em produção',
      },
      '13': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/01 - O computador chega em casa/img/8080-real.jpg',
        descricao: `O 8080 de 1974, fechado e aberto: a peça pronta, esperando alguém saber o que fazer com ela`,
        credito: `foto: The Science Museum UK, CC BY 4.0`,
        periodo: `1974`,
        frase: `Um processador de oito bits, e tudo que coube nele.`,
        resumo: `O que tem dentro da pastilha: os escaninhos, a unidade que faz a conta, os 64 KB que ele consegue endereçar, os dois milhões de ciclos por segundo. Como ele conversa com a memória e com o teclado, por que o Altair o escolheu, e o que muda dele pro 4004 de antes e pro 8088 de depois.`,
        contagem: `peça`,
        selo: 'em produção',
      },
      '14': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/01 - O computador chega em casa/img/alto-real.jpg',
        descricao: `O Alto: tela em pé, teclado, o teclado de acordes e o mouse de três botões`,
        credito: `foto: The wub, CC BY-SA 4.0`,
        periodo: `1973`,
        frase: `Como a tela coube no hardware, dez anos antes.`,
        resumo: `Kay, Thacker e Lampson constroem, sem microprocessador, a máquina que já tinha janela, ícone e mouse. Cada bit da memória é um ponto da tela, e o próprio processador pinta o tubo por microcódigo porque não existia placa de vídeo. Por que custava 32 mil dólares, e por que a Xerox guardou na gaveta.`,
        contagem: `peça e figura`,
        selo: 'em produção',
      },
      '15': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/01 - O computador chega em casa/img/appleii-real.jpg',
        descricao: `O Apple II de 1977: cor na televisão sem hardware de cor, e um chip fazendo o trabalho de três`,
        credito: `foto: The wub, CC BY-SA 4.0`,
        periodo: `1976 &rarr; 1984`,
        frase: `Wozniak projeta, Jobs vende.`,
        resumo: `Do clube de garagem ao Apple I, e a engenharia do Apple II: cor na televisão sem hardware de cor, um chip fazendo o trabalho de três, o controlador de disquete com oito chips. O VisiCalc que vendeu a máquina, a visita ao PARC em troca de ações, o Lisa que fracassou e o Macintosh que fez a tela caber em 128 KB.`,
        contagem: `peça e figura`,
        selo: 'em produção',
      },
      '16': {
        /* sem credito conhecido (P10): fica sem lupa */
        imagem: 'img/extra-16-microsoft.jpg',
        periodo: `1975 &rarr; 1990`,
        frase: `Software antes de ter o hardware.`,
        resumo: `Gates e Allen escrevem o BASIC do Altair num emulador, sem nunca ter visto a máquina, e fundam a empresa em Albuquerque. A mãe no conselho com o presidente da IBM, o QDOS comprado por 50 mil dólares e licenciado sem exclusividade, o Word e o Excel feitos pro Mac, e o Windows do 1.0 que falhou ao 3.0 que pegou.`,
        contagem: `figura`,
        selo: 'em produção',
      },
      '17': {
        /* sem credito conhecido (P10): fica sem lupa */
        imagem: 'img/extra-17-basic.png',
        periodo: `1964 &rarr; 1977`,
        frase: `A linguagem que ligava junto com o computador.`,
        resumo: `Nasce em 1964 numa faculdade, feita pra aluno que não era de exatas escrever um programa em uma aula. Dez anos depois é o primeiro software vendido pro Altair, e em 1977 já vem gravada dentro do Apple II, do PET e do TRS-80: a máquina ligava e esperava uma linha de BASIC. O que ela tinha de simples, o que tinha de ruim, e por que foi ela que ensinou uma geração a programar.`,
        contagem: `conceito e figura`,
        selo: 'em produção',
      },
      '18': {
        imagem: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/02 - Conectando tudo - a internet/img/primeiro-servidor-real.jpg',
        descricao: `A estação de trabalho que serviu a primeira página da teia, no CERN, com o aviso colado: 'esta máquina é um servidor, não desligue'`,
        credito: `foto: Coolcaesar, CC BY-SA 3.0`,
        periodo: `1989 &rarr; 1993`,
        frase: `Três peças e um presente.`,
        resumo: `Um físico do CERN cansado de não achar documento espalhado em máquina de país diferente. A proposta de 1989 com três peças: um endereço por documento, uma regra simples de pedir e entregar, e texto com ligação apontando pra outro. O NeXT que virou o primeiro servidor, agosto de 1991 no ar, e 30 de abril de 1993, quando o laboratório pôs tudo em domínio público de graça — a decisão que fez a web ganhar de todas as concorrentes.`,
        contagem: `figura`,
        selo: 'em produção',
      },
    },
  },

  'extra-01/destaque': {
    pagina: 'extras/extra-01.html',
    tipo: 'destaque-do-extra',
    serie: '01',
    extra: '01',
    grade: 'grade grade--dupla',
    card: {
      periodo: `analogia única: o prédio com caixa d'água`,
      frase: `Eletricidade explicada como água num prédio.`,
      resumo: `A altura da caixa é o volt, os litros por segundo no cano são o ampère, o cano fino e comprido é o ohm, a mangueira de bico fino que tira o lodo da calçada é o watt, os litros que passaram no mês são o kWh, e o tamanho da caixa é o mAh. Seis medidas, um prédio.`,
      audio: { src: '../Como Reinventar o Computador do Zero/_EXTRAS/01 - Volt Ampere e Watt/Eletricidade explicada como água num prédio.mp3', duracao: '27 min' },
      contagem: `só áudio + modelo abaixo`,
      selo: 'no ar',
    },
  },

  'extra-02/destaque': {
    pagina: 'extras/extra-02.html',
    tipo: 'destaque-do-extra',
    serie: '01',
    extra: '02',
    grade: 'grade grade--dupla',
    card: {
      periodo: `analogia única: as agulhinhas de bússola`,
      frase: `Como os ímãs funcionam por dentro.`,
      resumo: `Por que gruda em ferro e não em alumínio, cobre nem ouro; por que às vezes empurra em vez de atrair; por que quebrar um ímã ao meio não separa os lados e sim cria dois ímãs completos; por que ele perde força ao cair ou esquentar; e por que segurar um papel na geladeira por dez anos não consome energia nenhuma.`,
      audio: { src: '../Como Reinventar o Computador do Zero/_EXTRAS/02 - Por que o Ima Gruda/Como os ímãs funcionam por dentro.mp3', duracao: '37 min' },
      contagem: `só áudio`,
      selo: 'no ar',
    },
  },

  /* ---------- Java Web (serie 02) ---------- */

  'javaweb/etapas': {
    pagina: 'javaweb.html',
    tipo: 'etapas',
    serie: '02',
    grade: 'grade',
    cards: {
      '01': {
        imagem: 'img/serie-java-web.webp',
        credito: 'ilustração',
        periodo: `ainda sem código`,
        frase: `A conversa que justifica as outras treze.`,
        resumo: `Código que funciona e que ninguém entende é uma bomba-relógio: o defeito já existe na entrega e só aparece depois. E como usar a IA de um jeito que ensina em vez de um jeito que só entrega.`,
      },
      '02': {
        periodo: `o ambiente de pé`,
        frase: `VS Code, terminal e o JDK.`,
        resumo: `Por que não abrimos NetBeans nem Eclipse, o que o VS Code é de verdade, e o primeiro programa compilado e rodado na mão. Mais o erro que todo mundo leva na primeira semana: o classpath.`,
        contagem: `3 episódios`,
      },
      '03': {
        periodo: `versionada, com volta no tempo`,
        frase: `Git antes do primeiro programa.`,
        resumo: `Commit, volta no tempo, branch e repositório remoto. Vem agora, e não no fim, porque o <em>.gitignore</em> tem que estar fechado antes do primeiro <em>git add</em>: segredo commitado fica no histórico pra sempre.`,
        contagem: `4 episódios`,
      },
      '04': {
        periodo: `rodando no terminal`,
        frase: `Antes da web, o programa.`,
        resumo: `A lista de tarefas nasce aqui: uma classe, uma lista de objetos e um menu que adiciona, mostra e marca como feita. Some quando o programa fecha, e esse incômodo é de propósito.`,
        contagem: `3 episódios`,
      },
      '05': {
        periodo: `testes que rodam sozinhos`,
        frase: `"Testei aqui e funcionou" não é teste.`,
        resumo: `Entra cedo, com o app ainda simples: o teste que roda sozinho, o que vale testar e o que é desperdício, e o teste escrito antes do conserto pra provar que o bug existia.`,
        contagem: `3 episódios`,
      },
      '06': {
        periodo: `aparece no navegador`,
        frase: `Um servidor é um programa que espera.`,
        resumo: `A mesma lista, agora no navegador, servida por um programa em Java puro: sem Tomcat, sem framework e sem biblioteca. Feio de propósito, porque é assim que se entende o que vem depois.`,
        contagem: `3 episódios`,
      },
      '07': {
        periodo: `tarefa nova pelo formulário`,
        frase: `HTTP escrito à mão.`,
        resumo: `O navegador e o servidor conversam em texto puro, e dá pra ler. Pedido, resposta, cabeçalho, GET e POST de verdade, e o que cada família de status quer dizer.`,
        contagem: `4 episódios`,
      },
      '08': {
        periodo: `roda no Tomcat`,
        frase: `A peça que todo curso mostra cedo demais.`,
        resumo: `O Tomcat é o programa da etapa 6, feito direito. Depois de escrever aquilo na mão, o servlet fica óbvio. Mais o dev-loop: por que o conserto "não aparece".`,
        contagem: `3 episódios`,
      },
      '09': {
        periodo: `a tela sai do código`,
        frase: `Do trauma do JSP ao Thymeleaf.`,
        resumo: `Colar HTML dentro do Java não escala, e na etapa 6 isso já doeu. As três gerações de resposta na ordem em que apareceram, e o começo da conversa sobre duplicação.`,
        contagem: `3 episódios`,
      },
      '10': {
        periodo: `sua lista é sua`,
        frase: `O servidor não lembra de você.`,
        resumo: `HTTP chega sem memória a cada pedido. Cookie, sessão e o que é "estar logado" de verdade, incluindo por que senha não se guarda como senha.`,
        contagem: `4 episódios`,
      },
      '11': {
        periodo: `o mesmo app, agora legível`,
        frase: `MVC é remédio, não etiqueta.`,
        resumo: `Tudo o que foi montado até aqui cabe num arquivo só, e é esse o problema. Dado, decisão e tela separados, com o código do próprio app sendo cortado ao vivo.`,
        contagem: `3 episódios`,
      },
      '12': {
        periodo: `sobrevive ao desligar`,
        frase: `A lista para de sumir.`,
        resumo: `Tabela, SQL na mão e JDBC antes de qualquer ORM. Mais a única falha que a série demonstra funcionando: injeção de SQL no campo de login, e a linha que a impede.`,
        contagem: `5 episódios`,
      },
      '13': {
        periodo: `o mesmo app em Spring Boot`,
        frase: `Agora sim, e sem misticismo.`,
        resumo: `Cada anotação apontando pra peça que a gente montou na mão. O Tomcat vira dependência, o WAR vira JAR que sobe sozinho, e a resposta às vezes deixa de ser página.`,
        contagem: `4 episódios`,
      },
      '14': {
        periodo: `no ar, num endereço de verdade`,
        frase: `Roda na sua máquina não é o fim.`,
        resumo: `Empacotar sem levar segredo junto, subir numa máquina Linux, o cadeado do HTTPS e o que ele não prova. E o que fazer quando quebra às onze da noite.`,
        contagem: `5 episódios`,
      },
    },
  },

  'javaweb-01/episodios': {
    pagina: 'etapas/javaweb-01.html',
    tipo: 'episodios',
    serie: '02',
    etapa: '01',
    grade: 'grade grade--dupla',
    cards: {
      '01': {
        imagem: 'img/serie-java-web.webp',
        credito: 'ilustração',
        periodo: `a tese da série`,
        frase: `O defeito já existe na entrega. Ele só aparece depois.`,
        resumo: `Por que o dia do teste não prova nada, as quatro formas de a bomba estourar, e a hora em que você não consegue nem descrever o defeito pra pedir conserto. Fecha com a régua de três perguntas pra usar antes de aceitar qualquer código pronto.`,
        contagem: `15 min &middot; 8 telas`,
      },
      '02': {
        imagem: '../JAVA WEB/01 - Por que ainda estudar isso/02 - Estudar com a IA do lado/img/tela-01.webp',
        descricao: `boletim impecável, caderno em branco`,
        credito: 'ilustração',
        periodo: `o método da série`,
        frase: `Fornecedor entrega o produto. Professor deixa alguma coisa em você.`,
        resumo: `As três regras que valem pra série inteira: explicação antes do código, digitar em vez de colar, e dizer o que se espera antes de rodar. Mais onde a ferramenta ajuda de verdade e onde ela atrapalha quem ainda está aprendendo.`,
        contagem: `15 min &middot; 8 telas`,
      },
    },
  },

  /* ---------- Hardware (serie 03) ---------- */

  'hardware/etapas': {
    pagina: 'hardware.html',
    tipo: 'etapas',
    serie: '03',
    grade: 'grade',
    cards: {
      '01': {
        imagem: 'img/hardware-etapa-01.webp',
        credito: 'ilustração',
        periodo: `liga a bomba sozinha`,
        frase: `Um chip que lê, decide e age.`,
        resumo: `O que é um microcontrolador e o laço que não para. O LED que diz "estou vivo", a boia que funciona como botão, a bomba que é um relé, o trimpot que mede a água e a decisão que liga tudo sozinha.`,
        /* a etapa ainda nao tem episodio na MENU, so a pagina com o audio dela */
        contagem: `a etapa inteira em áudio &middot; 13 min`,
        botao: `Ouvir a etapa`,
      },
      '02': {
        imagem: 'img/hardware-etapa-02.webp',
        credito: 'ilustração',
        periodo: `sensor de verdade e proteção`,
        frase: `Sai o trimpot, entra o eco.`,
        resumo: `O sensor de ultrassom mede a água pelo eco, um visor mostra o nível, o motor de passo abre o registro de pouquinho, e o controlador aprende a fazer duas coisas ao mesmo tempo sem travar.`,
        contagem: `6 episódios`,
      },
      '03': {
        imagem: 'img/hardware-etapa-03.webp',
        credito: 'ilustração',
        periodo: `tudo numa tela do computador`,
        frase: `O zelador não quer subir no telhado.`,
        resumo: `O controlador conversa com o computador por um fio, uma letra de cada vez, e um painel montado com blocos mostra o nível, acende a luz da bomba e manda comando de volta.`,
        contagem: `3 episódios`,
      },
      '04': {
        imagem: 'img/hardware-etapa-04.webp',
        credito: 'ilustração',
        periodo: `o celular abre a página`,
        frase: `Troca o cérebro, ganha a rede.`,
        resumo: `O ESP32 faz o mesmo que o Arduino e ainda fala WiFi: a caixa d'água vira uma página na rede, com endereço fixo, dois núcleos dividindo o trabalho e um relatório que qualquer programa entende.`,
        contagem: `6 episódios`,
      },
      '05': {
        imagem: 'img/hardware-etapa-05.webp',
        credito: 'ilustração',
        periodo: `do simulador pra fábrica`,
        frase: `Do desenho à placa verde.`,
        resumo: `O circuito sai do simulador e vira desenho de placa: quem liga em quem, onde fica cada peça, por onde passa cada trilha e o arquivo que a fábrica usa pra produzir.`,
        contagem: `4 episódios`,
      },
    },
  },

  /* a pagina da etapa 01, que por enquanto e o audio da etapa inteira e a lista dos
     episodios em producao. O resumo do destaque e o do ar, escolhido pelo dono em
     15/09 (P11): mais concreto que o que estava so aqui */
  'hardware-01/destaque': {
    pagina: 'etapas/hardware-01.html',
    tipo: 'destaque-da-etapa',
    serie: '03',
    etapa: '01',
    grade: 'grade grade--dupla',
    card: {
      periodo: `liga a bomba sozinha`,
      frase: `Um chip que lê, decide e age, num laço que não para.`,
      resumo: `O microcontrolador e o LED que pisca dizendo "estou funcionando". A boia, que só sabe dizer sim ou não, e por que uma entrada solta mente. O relé, que dá a ordem pra bomba sem puxar a corrente dela. O nível virando número de 0 a 1023. O meio termo do PWM. E a decisão com folga entre ligar e desligar, a mesma do termostato da geladeira.`,
      audio: { src: "../HARDWARE/01 - O cérebro e os sentidos/00 - A etapa inteira/A caixa d'água que virou organismo.m4a", duracao: '13 min', ficha: 'Áudio da etapa' },
      contagem: `só áudio`,
      selo: 'no ar',
    },
  },

  'hardware-01/episodios': {
    pagina: 'etapas/hardware-01.html',
    tipo: 'episodios-sem-arte',
    serie: '03',
    etapa: '01',
    grade: 'grade',
    cards: {
      '01': { resumo: `O que é um microcontrolador e o primeiro sinal de vida da caixa d'água: o LED que pisca.` },
      '02': { resumo: `Entrada e saída digital: a entrada que flutua e mente, o resistor que resolve e o relé que dá a ordem.` },
      '03': { resumo: `A entrada analógica: a tensão virando um número de 0 a 1023, e por que justamente 1023.` },
      '04': { resumo: `PWM: liga e desliga tão rápido que o olho vê meio-termo, e o painel mostra o nível pelo brilho.` },
      '05': { resumo: `A decisão que junta tudo, e a folga entre ligar e desligar que impede o liga-desliga sem fim.` },
    },
  },

  /* ---------- Financas: as 6 etapas e os episodios da etapa 01 ---------- */

  /* As etapas ainda nao tem arte (P17 do plano da serie), entao os cards saem sem
     imagem. A serie esta desligada no series.json ate o dono ligar no painel. */
  'financas/etapas': {
    pagina: 'financas.html',
    tipo: 'etapas',
    serie: '07',
    grade: 'grade',
    cards: {
      '01': {
        periodo: `a sobra nasce`,
        frase: `Para onde vai o salário.`,
        resumo: `O que sai antes de cair na conta, cobrado por faixa. O gasto fixo, o variável e o que é certo e não cai todo mês. Para onde as famílias brasileiras gastam de verdade, pelo IBGE. E por que a sobra funciona melhor separada na frente do que esperada no fim.`,
      },
      '02': {
        periodo: `a reserva rende`,
        frase: `Emprestar o dinheiro, e quanto rendeu de verdade.`,
        resumo: `A taxa que puxa as outras, emprestar pro governo e pro banco, e a conta que importa: quanto sobrou depois do imposto, do custo e da inflação.`,
        contagem: `3 episódios`,
      },
      '03': {
        periodo: `virar sócio`,
        frase: `Uma ação é um pedaço de empresa.`,
        resumo: `Ordinária e preferencial, o livro de ofertas, quem está do outro lado da ordem, o preço que dá um degrau quando cai dividendo, e o sobe e desce que vem junto.`,
        contagem: `5 episódios`,
      },
      '04': {
        periodo: `o que o Estado leva`,
        frase: `Toda venda passa pela conta do mês.`,
        resumo: `Preço médio, o limite de isenção que é sobre o quanto se vendeu e não sobre o lucro, e o imposto que o próprio investidor apura e paga.`,
        contagem: `3 episódios`,
      },
      '05': {
        periodo: `medir o normal`,
        frase: `Perto ou longe da média, e quanto.`,
        resumo: `Média, desvio padrão e as bandas: a régua que diz se um número está no lugar de sempre. E por que andar junto não é a mesma coisa que voltar junto.`,
        contagem: `4 episódios`,
      },
      '06': {
        periodo: `trocar entre parecidos`,
        frase: `Dois papéis quase iguais, e a conta honesta.`,
        resumo: `A troca entre duas classes da mesma empresa: a conta da ida e volta, onde o ganho some em tarifa e imposto, o passado que sempre parece fácil, e o par que não volta.`,
        contagem: `6 episódios`,
      },
    },
  },

  'financas-01/episodios': {
    pagina: 'etapas/financas-01.html',
    tipo: 'episodios',
    serie: '07',
    etapa: '01',
    grade: 'grade grade--dupla',
    cards: {
      '01': {
        periodo: `o mês inteiro`,
        frase: `O salário entrou, o mês acabou, e cadê o dinheiro.`,
        resumo: `O bruto não é o que cai na conta, e a cobrança é por faixa. O vocabulário do orçamento pelo Banco Central, incluindo o gasto que é certo e não cai todo mês. Para onde as famílias gastam de verdade, pelo IBGE: moradia na frente, comida em terceiro. E por que a sobra vem antes, e não no que restar.`,
        contagem: `15 min &middot; 12 telas`,
      },
      '02': {
        periodo: `o motor do tempo`,
        frase: `O mesmo motor na dívida e na aplicação.`,
        resumo: `Juros simples e compostos, e por que o tempo é a variável que mais pesa dos dois lados.`,
        contagem: `em produção`,
      },
      '03': {
        periodo: `o preço que anda`,
        frase: `O dinheiro parado encolhe.`,
        resumo: `Inflação e poder de compra: o índice oficial, quem calcula e o que isso faz com a reserva.`,
        contagem: `em produção`,
      },
      '04': {
        periodo: `antes de investir`,
        frase: `A reserva vem antes de qualquer aplicação.`,
        resumo: `Por que dinheiro que pode fazer falta amanhã não vai pra bolsa, e o que é liquidez na prática.`,
        contagem: `em produção`,
      },
    },
  },

  /* ---------- A home: uma card deitado por serie ---------- */

  /* A foto leva pra serie e nao amplia (decisao 9), entao aqui nao ha credito. O rotulo
     ("11 etapas", "Em preparação") e o botao ou selo saem da MENU; o icone e o <symbol>
     do sprite da propria home (ico-<icone>). */
  'home/series': {
    pagina: 'index.html',
    tipo: 'series',
    grade: 'grade grade--series',
    cards: {
      /* as capas das series: as geradas no Flow levam 'ilustração' (prompt guardado em
         <SERIE>/_arquivos/capa-serie/ ou no plano da serie); as quatro sem origem conhecida
         ficam sem credito e sem lupa (P10) */
      '01': {
        imagem: 'img/serie-computador.webp',
        icone: 'abaco',
        resumo: `Como <em>pedras que a gente move</em> viraram <em>máquinas que conversam</em>. Contar, instrumento, engrenagem, eletricidade, lógica, memória, miniaturização, rede e aprendizado: uma peça por episódio.`,
      },
      '02': {
        imagem: 'img/serie-java-web.webp',
        credito: `ilustração`,
        icone: 'codigo',
        resumo: `Pedir pra uma IA ficou fácil; <em>entender o que voltou</em> é que não. Aqui a gente monta uma lista de tarefas do terminal até o ar (ambiente, git, teste, banco, deploy) pra que nada no seu código seja mágica. O princípio serve pra qualquer linguagem.`,
      },
      '03': {
        imagem: 'img/serie-hardware.webp',
        credito: `ilustração`,
        icone: 'chip',
        resumo: `No simulador, sem comprar nada, a gente monta <em>a caixa d'água que se cuida sozinha</em>: sensor de nível, bomba, alarme, painel no computador, WiFi e, no fim, a placa própria. Arduino e ESP32 são o veículo; o princípio vale pra qualquer microcontrolador.`,
      },
      '04': {
        imagem: 'img/serie-lua.webp',
        icone: 'foguete',
        resumo: `A próxima série, no mesmo método: o que foi preciso inventar, uma peça de cada vez, pra tirar uma pessoa do chão, levar ela até outro mundo e trazer de volta viva.`,
      },
      '05': {
        imagem: 'img/serie-corpo.webp',
        icone: 'coracao',
        resumo: `Uma peça por episódio, do mesmo jeito: o osso que sustenta, o músculo que puxa, o sangue que entrega, o nervo que avisa e o miolo que decide o que fazer com tudo isso.`,
      },
      '06': {
        imagem: 'img/serie-evolucao.webp',
        icone: 'dna',
        resumo: `Como uma bolha de gordura no fundo do mar virou tudo que está vivo. Sem salto e sem plano: cada peça nova nasce de uma que já existia e servia pra outra coisa.`,
      },
      '07': {
        imagem: 'img/serie-financas.webp',
        credito: `ilustração`,
        icone: 'abaco',
        resumo: `Do cofrinho à bolsa: o dinheiro do mês, emprestar, virar sócio, o imposto e a média, até <em>trocar entre dois papéis parecidos</em>. Uma peça por episódio, com uma empresa inventada nas telas.`,
      },
    },
  },

};

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
     tipo     etapas | extras-da-serie | series | episodios | extras | destaque-do-extra
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

  /* ---------- A home: uma card deitado por serie ---------- */

  /* A foto leva pra serie e nao amplia (decisao 9), entao aqui nao ha credito. O rotulo
     ("11 etapas", "Em preparação") e o botao ou selo saem da MENU; o icone e o <symbol>
     do sprite da propria home (ico-<icone>). */
  'home/series': {
    pagina: 'index.html',
    tipo: 'series',
    grade: 'grade grade--series',
    cards: {
      '01': {
        imagem: 'img/serie-computador.webp',
        icone: 'abaco',
        resumo: `Como <em>pedras que a gente move</em> viraram <em>máquinas que conversam</em>. Contar, instrumento, engrenagem, eletricidade, lógica, memória, miniaturização, rede e aprendizado: uma peça por episódio.`,
      },
      '02': {
        imagem: 'img/serie-java-web.webp',
        icone: 'codigo',
        resumo: `Pedir pra uma IA ficou fácil; <em>entender o que voltou</em> é que não. Aqui a gente monta uma lista de tarefas do terminal até o ar (ambiente, git, teste, banco, deploy) pra que nada no seu código seja mágica. O princípio serve pra qualquer linguagem.`,
      },
      '03': {
        imagem: 'img/serie-hardware.webp',
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
    },
  },

};

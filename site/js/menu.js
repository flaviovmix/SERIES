/* menu
   Monta a BARRA do topo e o menu de tela cheia com a arvore das series.
   Tudo nasce FECHADO, menos o caminho ate a pagina em que o visitante esta.
   Nome de serie e nome de etapa com episodios nao sao link: eles so abrem e
   fecham. Quem leva pra pagina e a primeira linha da lista de dentro, a linha de
   acesso ("Acessar a série", "Acessar os extras", "Acessar o módulo").

   A pagina NAO escreve barra nenhuma: liga o componente com duas linhas, o
   estilo no <head> e o script no fim do <body>:

     <link rel="stylesheet" href="css/menu.css">
     <script src="js/menu.js"></script>

   Dai saem o hamburguer e o voltar. E o voltar nem precisa ser dito: o destino e
   o PAI da pagina atual nesta arvore (episodio volta pra etapa, etapa volta pra
   serie, extra volta pros extras). Pagina que ainda nao entrou na arvore pode
   trazer um <a class="voltar"> escrito a mao, que o componente adota e reposiciona.

   A arvore mora no array MENU abaixo, com os caminhos relativos a raiz do site/.
   O script descobre sozinho de que pasta a pagina esta sendo servida (pela
   propria URL do menu.js), entao a mesma linha funciona na raiz e em etapas/.

   Aviso: a lista de etapas vive em dois lugares, aqui e nos cards do hub de
   cada serie (computador.html, javaweb.html, hardware.html, extras/index.html). Quando uma
   etapa entra no ar, o href entra aqui e o card sai do "em producao" la. */

(function () {
  'use strict';

  /* ---------- a arvore ---------- */

  /* serie sem href = ainda nao comecou (cai no bloco "o que vem por ai"). Etapa sem href = em producao (vira cinza).
     Episodio com `extras` = os extras que o audio dele promete ("tem um extra sobre isso"),
     na ordem em que sao ditos (14/09): string = o numero de um extra da serie, que ja tem
     nome, link e estado na lista `extras.itens`; { nome } = extra aprovado no plano que
     ainda nao existe no hub (aparece como "em producao"). Episodio com `filmes` = as obras
     que conversam com ele, conferidas por busca (o `_filmes-e-documentarios.md` da etapa):
     titulo, ano, tipo (documentario, ficcao, docudrama...), nota com o que ela distorce, onde
     assistir em texto e, so quando confirmado, o href. Quem mostra e o painel de guias do
     telefone e a tela de fim (tocador.js e telas.js, por window.MenuDasSeries). */
  var MENU = [
    {
      num: '01',
      nome: 'Do Ábaco à IA',
      href: 'computador.html',
      etapas: [
        { num: '01', nome: 'Contar antes das máquinas', href: 'etapas/etapa-01.html',
          episodios: [
            { num: '01', nome: 'O Ábaco', href: '../Como Reinventar o Computador do Zero/01 - Contar antes das máquinas/01 - O Ábaco/animacao.html',
              extras: ['08', '03', '04', '06'] }
          ] },
        { num: '02', nome: 'Séculos sem máquina' },
        { num: '03', nome: 'As engrenagens assumem' },
        { num: '04', nome: 'Domesticando o raio' },
        { num: '05', nome: 'A eletricidade aprende a pensar' },
        { num: '06', nome: 'A máquina que liga', href: 'etapas/etapa-06.html',
          episodios: [
            { num: '01', nome: 'A planta', href: '../Como Reinventar o Computador do Zero/_REFAZER/06 - A máquina que liga/01 - A planta/animacao.html',
              extras: ['05', { nome: 'Portas lógicas na mão' }, { nome: 'O somador e o número negativo' }, { nome: 'Como a máquina lembra: flip-flop e endereço' }, { nome: 'Turing e a máquina universal' }, { nome: 'O conjunto de instruções' }] },
            { num: '02', nome: 'As primeiras máquinas que ligaram', href: '../Como Reinventar o Computador do Zero/_REFAZER/06 - A máquina que liga/02 - As primeiras máquinas que ligaram/animacao.html',
              extras: ['07', '03', { nome: 'O relé' }, { nome: 'A válvula' }, { nome: 'O Z3 e Konrad Zuse' }, { nome: 'A IBM e o Mark I' }, { nome: 'O ENIAC' }, { nome: 'As seis programadoras do ENIAC' }] },
            { num: '03', nome: 'O programa que mora na memória', href: '../Como Reinventar o Computador do Zero/_REFAZER/06 - A máquina que liga/03 - O programa que mora na memória/animacao.html' },
            { num: '04', nome: 'O compilador', href: '../Como Reinventar o Computador do Zero/_REFAZER/06 - A máquina que liga/04 - O compilador/animacao.html',
              extras: ['17'] }
          ] },
        { num: '07', nome: 'O computador encolhe', href: 'etapas/etapa-07.html',
          episodios: [
            { num: '01', nome: 'O transistor', href: '../Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/01 - O transistor/animacao.html',
              extras: [{ nome: 'O silício: como a areia vira peça' }, { nome: 'Quem fez o transistor' }] },
            { num: '02', nome: 'O circuito integrado', href: '../Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/02 - O circuito integrado/animacao.html',
              extras: ['09', '10'] },
            { num: '03', nome: 'O microprocessador', href: '../Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/03 - O microprocessador/animacao.html' }
          ] },
        { num: '08', nome: 'Da sala pro mundo', href: 'etapas/etapa-08.html',
          episodios: [
            { num: '01', nome: 'O computador chega em casa', href: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/01 - O computador chega em casa/animacao.html',
              extras: ['11', '13', '14', '12', '15', '16', '17'] },
            { num: '02', nome: 'Conectando tudo: a internet', href: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/02 - Conectando tudo - a internet/animacao.html',
              extras: ['18'] },
            { num: '03', nome: 'O sistema operacional', href: '../Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/03 - O sistema operacional/animacao.html' }
          ] },
        { num: '09', nome: 'A máquina que aprende', href: 'etapas/etapa-09.html',
          episodios: [
            { num: '01', nome: 'A corrida do processador', href: '../Como Reinventar o Computador do Zero/_REFAZER/09 - A máquina que aprende/01 - A corrida do processador/animacao.html',
              extras: [{ nome: 'O Pentium por dentro' }, { nome: 'A AMD, a empresa que briga em duas frentes' }] },
            { num: '02', nome: 'A placa de vídeo', href: '../Como Reinventar o Computador do Zero/_REFAZER/09 - A máquina que aprende/02 - A placa de vídeo/animacao.html',
              extras: [{ nome: 'A NVIDIA e os núcleos de processamento' }, { nome: 'NVIDIA contra AMD: a corrida das placas de vídeo' }, { nome: 'A AMD, a empresa que briga em duas frentes' }, { nome: 'A história dos videogames' }] },
            { num: '03', nome: 'A máquina que aprende', href: '../Como Reinventar o Computador do Zero/_REFAZER/09 - A máquina que aprende/03 - A máquina que aprende/animacao.html' },
            { num: '04', nome: '2017: Attention is All You Need', href: '../Como Reinventar o Computador do Zero/_REFAZER/09 - A máquina que aprende/04 - 2017 - Attention is All You Need/animacao.html',
              extras: [{ nome: 'O Transformer por dentro: a atenção passo a passo' }] }
          ] },
        { num: '10', nome: 'A rede vira feed', href: 'etapas/etapa-10.html',
          episodios: [
            { num: '01', nome: 'A bolha', href: '../Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/01 - A bolha/animacao.html',
              extras: [{ nome: 'O que é uma bolha, e por que a das ponto com estourou' }, { nome: 'A fibra enterrada na bolha' }],
              filmes: [
                { titulo: 'Code Rush', ano: 2000, tipo: 'documentário', nota: 'O último ano da Netscape, com Andreessen e a equipe falando na época. É filme de dentro da tribo dos engenheiros: a parte financeira quase não aparece.', onde: 'liberado em Creative Commons: YouTube e Internet Archive' },
                { titulo: 'Startup.com', ano: 2001, tipo: 'documentário', nota: 'A govWorks por dentro, com a bolha estourando durante a filmagem. O recorte é a amizade que racha; o negócio às vezes vira pano de fundo.', onde: 'não confirmei no Brasil' },
                { titulo: 'E-Dreams', ano: 2001, tipo: 'documentário', nota: 'O filme sobre a Kozmo.com, que o episódio cita pelo nome. Tese leve: muito clima, pouca análise.', onde: 'não confirmei no Brasil' },
                { titulo: 'Frontline: Dot Con', ano: 2002, tipo: 'documentário de TV', nota: 'O eixo financeiro do episódio: os trilhões que evaporaram e o papel dos bancos e analistas. É reportagem com ponto de vista.', onde: 'a PBS avisa que os direitos de internet expiraram; a transcrição segue no ar' },
                { titulo: 'Nerds 2.0.1', ano: 1998, tipo: 'documentário de TV', nota: 'Três partes da PBS, da Arpanet ao auge da web: para exatamente onde este episódio começa.', onde: 'Internet Archive' },
                { titulo: 'Something Ventured', ano: 2011, tipo: 'documentário', nota: 'A invenção do capital de risco americano: a pré-história financeira da bolha, de onde vinha o dinheiro.', onde: 'não confirmei' }
              ] },
            { num: '02', nome: 'A busca vira negócio', href: '../Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/02 - A busca vira negócio/animacao.html',
              extras: [{ nome: 'O PageRank: ordenar a web por quem aponta pra quem' }, { nome: 'O leilão do anúncio' }],
              filmes: [
                { titulo: 'Google: Behind the Screen', ano: 2006, tipo: 'documentário', nota: 'Feito dentro do período, com o PageRank e o anúncio direcionado como assunto central. Tese do perigo do monopólio; retrata o Google de antes do YouTube, do Android e do Chrome.', onde: 'YouTube (canal da VPRO) e Internet Archive' },
                { titulo: 'Google and the World Brain', ano: 2013, tipo: 'documentário', nota: 'Material lateral: o Google Books, a escala e a ambição de indexar tudo. Tese forte e abertamente anti-Google.', onde: 'não confirmei' }
              ] },
            { num: '03', nome: 'As redes sociais', href: '../Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/03 - As redes sociais/animacao.html',
              extras: [{ nome: 'O feed: cronológico contra ordenado por modelo' }],
              filmes: [
                { titulo: 'A Rede Social', ano: 2010, tipo: 'ficção', nota: 'Drama, não reportagem: o nascimento do Facebook em 2003 e 2004. A cena que dispara o filme é invenção: a namorada que o rejeita não existiu, e é essa moldura que transforma tudo em vingança.', onde: 'HBO Max; aluguel na Apple TV e na Amazon' },
                { titulo: 'Frontline: The Facebook Dilemma', ano: 2018, tipo: 'documentário', nota: 'O contraponto factual: por que crescimento e engajamento viraram a métrica, que é a raiz do feed. A parte 2 cai depois do recorte; a parte 1 rende mais.', onde: 'grátis no site da Frontline e no YouTube da PBS' },
                { titulo: 'Frontline: Generation Like', ano: 2014, tipo: 'documentário', nota: 'O único que trata a curtida como moeda, que casa com o EdgeRank. Ensaio televisivo com tese, recorte só dos EUA.', onde: 'grátis no site da PBS' },
                { titulo: 'Catfish', ano: 2010, tipo: 'documentário contestado', nota: 'Identidade e confiança no Facebook da época. Os diretores admitiram que cenas e capturas de tela foram recriadas depois; há quem diga que é armação inteira.', onde: 'não confirmei' }
              ] },
            { num: '04', nome: 'O algoritmo de recomendação', href: '../Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/04 - O algoritmo de recomendação/animacao.html',
              extras: [{ nome: 'O prêmio da Netflix' }, { nome: '2016: a recomendação do YouTube vira rede neural' }, { nome: 'O que o algoritmo faz com quem assiste' }],
              filmes: [
                { titulo: 'O Dilema das Redes Sociais', ano: 2020, tipo: 'docudrama', nota: 'A obra mais popular sobre o feed ordenado por modelo, com ex-funcionários falando do próprio trabalho. Tem cenas de ficção encenadas: a sala de controle com três algoritmos é dramatização, não descrição de sistema.', onde: 'Netflix, com dublagem e legenda' },
                { titulo: 'The YouTube Effect', ano: 2022, tipo: 'documentário', nota: 'O encaixe mais literal: a virada para tempo assistido e o que ela produziu. Trata do efeito social, não explica o mecanismo.', onde: 'não confirmei no Brasil' },
                { titulo: 'Nada é Privado', ano: 2019, tipo: 'documentário', nota: 'O dado pessoal virou ativo, parente do escândalo da base da Netflix. A tese de que a Cambridge Analytica virou a eleição é contestada, e o filme a sustenta com pouca prova.', onde: 'Netflix' },
                { titulo: 'AlphaGo', ano: 2017, tipo: 'documentário', nota: 'Encaixe lateral: o que uma rede neural profunda passou a conseguir no ano em que o YouTube trocou o motor. Não fala de recomendação, e a DeepMind participou da produção.', onde: 'de graça no YouTube, pela DeepMind' }
              ] }
        ] },
        { num: '11', nome: 'A máquina que conversa', href: 'etapas/etapa-11.html',
          episodios: [
            { num: '01', nome: 'A escala', href: '../Como Reinventar o Computador do Zero/_REFAZER/11 - A máquina que conversa/01 - A escala/animacao.html',
              extras: [{ nome: 'O Transformer por dentro: a atenção passo a passo' }, { nome: 'O token: como a máquina corta o texto' }, { nome: 'As leis de escala e a conta do Chinchilla' }, { nome: 'Codex e Copilot' }],
              filmes: [
                { titulo: 'Ilya: the AI scientist shaping the world', ano: 2023, tipo: 'documentário curto', nota: 'Conversas filmadas com Sutskever entre 2016 e 2019, enquanto o GPT-1 e o GPT-2 eram feitos. Material remontado em 2023, semanas antes da crise do conselho da OpenAI; só a voz dele.', onde: 'site do Guardian e canal do Guardian no YouTube', href: 'https://www.theguardian.com/technology/video/2023/nov/02/ilya-the-ai-scientist-shaping-the-world' },
                { titulo: 'Eternal You', ano: 2024, tipo: 'documentário', nota: 'O único filme que mostra o GPT-3 cru virando produto na mão de gente comum. Tom alarmista, e o criador do serviço contestou a montagem depois de Sundance.', onde: 'Kanopy e Film Movement Plus nos EUA; Brasil: não confirmei' },
                { titulo: 'iHuman', ano: 2019, tipo: 'documentário', nota: 'O longa de onde saiu o curto do Guardian: Sutskever fala da OpenAI dentro da janela. Thriller sobre vigilância; a IA como ameaça, não como engenharia.', onde: 'não confirmei' },
                { titulo: 'The Thinking Game', ano: 2024, tipo: 'documentário', nota: 'A DeepMind por dentro, o laboratório do Gopher e do Chinchilla, no mesmo período. É sobre o AlphaFold, e é produção da própria DeepMind.', onde: 'YouTube, de graça desde novembro de 2025' }
              ] },
            { num: '02', nome: 'O galpão', extras: [{ nome: 'A placa de treinar por dentro' }] },
            { num: '03', nome: 'Ensinar a responder' },
            { num: '04', nome: 'Novembro de 2022' }
        ] }
      ],
      extras: {
        nome: 'Extras',
        href: 'extras/index.html',
        itens: [
            { num: '01', nome: 'Volt, Ampère e Watt', href: 'extras/extra-01.html' },
            { num: '02', nome: 'Por que o Ímã Gruda', href: 'extras/extra-02.html' },
            { num: '03', nome: 'O Sistema Decimal', href: '../Como Reinventar o Computador do Zero/_EXTRAS/03 - O Sistema Decimal/animacao.html' },
            { num: '04', nome: 'O Sistema Binário', href: '../Como Reinventar o Computador do Zero/_EXTRAS/04 - O Sistema Binário/animacao.html' },
            { num: '05', nome: 'O Sistema Hexadecimal', href: '../Como Reinventar o Computador do Zero/_EXTRAS/05 - O Sistema Hexadecimal/animacao.html' },
            { num: '06', nome: 'O Sistema de 60', href: '../Como Reinventar o Computador do Zero/_EXTRAS/06 - O Sistema de 60/animacao.html' },
            { num: '07', nome: 'O Hertz', href: '../Como Reinventar o Computador do Zero/_EXTRAS/07 - O Hertz/animacao.html' },
            { num: '08', nome: 'O Zero e os Números', href: '../Como Reinventar o Computador do Zero/OLD/01 - Contar antes das máquinas/02 - O Zero e os Números/animacao.html' },
            { num: '09', nome: 'Quem Fez o Primeiro Chip', href: '../Como Reinventar o Computador do Zero/_EXTRAS/09 - Quem Fez o Primeiro Chip/animacao.html' },
            { num: '10', nome: 'A Lei de Moore', href: '../Como Reinventar o Computador do Zero/_EXTRAS/10 - A Lei de Moore/animacao.html' },
            { num: '11', nome: 'A Intel' },
            { num: '12', nome: 'A IBM' },
            { num: '13', nome: 'O 8080 da Intel' },
            { num: '14', nome: 'O Alto da Xerox' },
            { num: '15', nome: 'A Apple' },
            { num: '16', nome: 'A Microsoft' },
            { num: '17', nome: 'O BASIC' },
            { num: '18', nome: 'Tim Berners-Lee e a web' }
        ]
      }
    },
    {
      num: '02',
      nome: 'Java Web',
      href: 'javaweb.html',
      etapas: [
        { num: '01', nome: 'Por que ainda estudar isso', href: 'etapas/javaweb-01.html',
          episodios: [
            { num: '01', nome: 'A bomba-relógio', href: '../JAVA WEB/01 - Por que ainda estudar isso/01 - A bomba-relógio/animacao.html' },
            { num: '02', nome: 'Estudar com a IA do lado', href: '../JAVA WEB/01 - Por que ainda estudar isso/02 - Estudar com a IA do lado/animacao.html' }
          ] },
        { num: '02', nome: 'A oficina' },
        { num: '03', nome: 'O histórico do que você escreve' },
        { num: '04', nome: 'A lista existe' },
        { num: '05', nome: 'Provando que funciona' },
        { num: '06', nome: 'A máquina que atende' },
        { num: '07', nome: 'O idioma da web' },
        { num: '08', nome: 'O contêiner e o servlet' },
        { num: '09', nome: 'Quem monta o HTML' },
        { num: '10', nome: 'Cada um com a sua lista' },
        { num: '11', nome: 'Arrumando a bagunça' },
        { num: '12', nome: 'O banco entra' },
        { num: '13', nome: 'O framework assume' },
        { num: '14', nome: 'Pro mundo' }
      ]
    },
    {
      num: '03',
      nome: 'Hardware',
      href: 'hardware.html',
      etapas: [
        { num: '01', nome: 'O cérebro e os sentidos', href: 'etapas/hardware-01.html' },
        { num: '02', nome: 'O controlador fica esperto' },
        { num: '03', nome: 'O painel da portaria' },
        { num: '04', nome: 'A caixa d\'água no WiFi' },
        { num: '05', nome: 'A placa própria' }
      ]
    },
    { num: '04', nome: 'Levando o Homem à Lua' },
    { num: '05', nome: 'Montando o Corpo Humano' },
    { num: '06', nome: 'A Evolução das Espécies' }
  ];

  /* No node (o gera-cards.js, que monta os cards do site a partir desta arvore) o
     arquivo entrega a MENU e para aqui: tudo daqui pra baixo mexe na pagina, e la nao
     existe pagina. No navegador `module` nao existe e o script segue. Por isso a MENU
     mora no topo, antes de qualquer linha que toque o documento (decisao 2 da Etapa 6). */
  if (typeof module === 'object' && module.exports) {
    module.exports = MENU;
    return;
  }

  /* ---------- o tema claro ou escuro ---------- */

  /* escolhido no botao do menu (13/09, pedido dele). Sem escolha vale o do sistema,
     que os tokens.css ja seguem sozinhos. A escolha fica guardada no aparelho e entra
     no <html> como data-theme, que os tokens.css obedecem nos dois sentidos. Aplica
     antes de montar a barra e o menu, pra pagina nao abrir no tema errado */
  var CHAVE_DO_TEMA = 'series-tema';
  var raizDoDocumento = document.documentElement;
  var sistemaEscuro = matchMedia('(prefers-color-scheme: dark)');

  function temaGuardado() {
    try { return localStorage.getItem(CHAVE_DO_TEMA); } catch (erro) { return null; }
  }

  var guardado = temaGuardado();
  if (guardado === 'dark' || guardado === 'light') raizDoDocumento.setAttribute('data-theme', guardado);

  function temaAtual() {
    return raizDoDocumento.getAttribute('data-theme') || (sistemaEscuro.matches ? 'dark' : 'light');
  }

  /* o desenho mostra o tema PRA ONDE o botao leva: a lua no claro, o sol no escuro */
  var ICONE_LUA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>';
  var ICONE_SOL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>';

  function pintaBotaoDoTema(botao) {
    var escuro = temaAtual() === 'dark';
    botao.innerHTML = (escuro ? ICONE_SOL : ICONE_LUA) + '<span>' + (escuro ? 'Tema claro' : 'Tema escuro') + '</span>';
    botao.setAttribute('aria-label', escuro ? 'Mudar pro tema claro' : 'Mudar pro tema escuro');
  }

  function ligaTema() {
    var botao = document.querySelector('.menu__tema');
    pintaBotaoDoTema(botao);
    botao.addEventListener('click', function () {
      var novo = temaAtual() === 'dark' ? 'light' : 'dark';
      raizDoDocumento.setAttribute('data-theme', novo);
      try { localStorage.setItem(CHAVE_DO_TEMA, novo); } catch (erro) { /* aba privada: vale ate fechar a pagina */ }
      pintaBotaoDoTema(botao);
    });
    /* sem escolha guardada, o botao acompanha o sistema quando ele muda */
    sistemaEscuro.addEventListener('change', function () { pintaBotaoDoTema(botao); });
  }

  /* ---------- onde a pagina esta ---------- */

  /* a raiz do site e a pasta acima de js/menu.js, seja ela /site/ no servidor ou uma pasta local */
  var raiz = new URL('../', document.currentScript.src);

  /* o endereco da pagina aberta, ja resolvido e sem codificacao. Comparar endereco
     inteiro em vez de recortar a raiz e o que faz o menu funcionar tambem nas paginas
     que moram FORA de site/, como a animacao de cada episodio: la o recorte devolvia
     um pedaco sem sentido e nenhuma linha se reconhecia como a atual. */
  function caminho(url) {
    var pagina = decodeURI(new URL(url).pathname);
    return pagina.slice(-1) === '/' ? pagina + 'index.html' : pagina;
  }

  var paginaAtual = caminho(location.href);

  function ehAtual(href) {
    return !!href && caminho(new URL(encodeURI(href), raiz).href) === paginaAtual;
  }

  /* ---------- montagem ---------- */

  function texto(valor) {
    return String(valor)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function enderecoAbsoluto(href) {
    return texto(new URL(encodeURI(href), raiz).href);
  }

  function montaNumero(num) {
    return '<span class="menu__num">' + texto(num) + '</span>';
  }

  /* a pagina aberta esta em algum lugar deste galho? E o que decide quem nasce
     aberto: tudo comeca fechado, menos o caminho ate onde o visitante esta */
  function contemAtual(itens) {
    return (itens || []).some(function (item) {
      return ehAtual(item.href) || contemAtual(item.episodios);
    });
  }

  /* uma etapa, um extra ou um episodio */
  function montaItem(item) {
    var miolo = montaNumero(item.num) + '<span>' + texto(item.nome) + '</span>';
    if (!item.href) {
      return '<span class="menu__item menu__item--cinza" title="em produção">' + miolo + '</span>';
    }
    var ativo = ehAtual(item.href);
    return '<a class="menu__item' + (ativo ? ' menu__item--ativo' : '') + '"'
      + (ativo ? ' aria-current="page"' : '')
      + ' href="' + enderecoAbsoluto(item.href) + '">' + miolo + '</a>';
  }

  /* a seta que abre e fecha. E botao de verdade, nao enfeite clicavel: quem usa
     teclado precisa alcancar e acionar, e o leitor de tela precisa do estado */
  function montaSeta(aberto, rotulo) {
    return '<button class="menu__seta" type="button" aria-expanded="' + aberto + '"'
      + ' aria-label="' + texto(rotulo) + '"></button>';
  }

  /* a primeira linha de toda lista, do bloco e do ramo: a porta pra pagina daquilo.
     O nome deixou de ser link, entao o acesso precisa de uma linha so dele */
  function montaAcesso(rotulo, href) {
    var ativo = ehAtual(href);
    return '<a class="menu__item menu__item--acesso' + (ativo ? ' menu__item--ativo' : '') + '"'
      + (ativo ? ' aria-current="page"' : '')
      + ' href="' + enderecoAbsoluto(href) + '">' + texto(rotulo) + '</a>';
  }

  /* um ramo: a etapa e, guardados nela, os episodios. Como no bloco, o nome da
     etapa NAO e link: ele e a seta so abrem e fecham a lista, e quem leva pra
     pagina da etapa e a linha de acesso que encabeca os episodios.
     Etapa sem episodios nao tem lista pra abrir, entao segue sendo link direto. */
  function montaRamo(item) {
    if (!item.episodios || !item.episodios.length) return montaItem(item);
    var aberto = ehAtual(item.href) || contemAtual(item.episodios);
    /* etapa com episodios mas ainda sem pagina propria: fica sem a linha de acesso */
    var acesso = item.href ? montaAcesso('Acessar o módulo', item.href) : '';
    return '<div class="menu__ramo' + (aberto ? '' : ' menu__ramo--fechado') + '">'
      + '<div class="menu__linha">'
      + '<span class="menu__item menu__item--nome">' + montaNumero(item.num)
      + '<span>' + texto(item.nome) + '</span></span>'
      + montaSeta(aberto, (aberto ? 'Esconder' : 'Mostrar') + ' os episódios de ' + item.nome)
      + '</div>'
      + '<div class="menu__itens"><div class="menu__sub">'
      + acesso + item.episodios.map(montaItem).join('') + '</div></div>'
      + '</div>';
  }

  /* um bloco: o nome, que NAO e link e so abre e fecha, o acesso a pagina e a lista */
  function montaBloco(nome, num, href, rotuloAcesso, itens) {
    var aberto = ehAtual(href) || contemAtual(itens);
    return '<div class="menu__bloco' + (aberto ? '' : ' menu__bloco--fechado') + '">'
      + '<div class="menu__cabecalho">'
      + '<span class="menu__titulo">' + (num ? montaNumero(num) : '') + '<span>' + texto(nome) + '</span></span>'
      + montaSeta(aberto, (aberto ? 'Fechar' : 'Abrir') + ' ' + nome)
      + '</div>'
      + '<div class="menu__itens"><div class="menu__lista">'
      + montaAcesso(rotuloAcesso, href) + itens.map(montaRamo).join('')
      + '</div></div>'
      + '</div>';
  }

  function montaSerie(serie) {
    return montaBloco(serie.nome, serie.num, serie.href, 'Acessar a série', serie.etapas);
  }

  /* os extras moram no FIM da grade, depois de todas as series, e nao colados na serie
     deles (14/09, pedido dele: "deixa sempre o extra como ultimo da lista, se aparecer
     outro vai para acima dele") */
  function montaExtras(serie) {
    return montaBloco(serie.extras.nome, null, serie.extras.href, 'Acessar os extras', serie.extras.itens);
  }

  function montaMenu() {
    var comecaram = MENU.filter(function (s) { return s.href; });
    var porVir = MENU.filter(function (s) { return !s.href; });

    /* as que ainda nao comecaram vao pra faixa de baixo, deitadas: sem pagina pra
       abrir, elas so precisam ser anunciadas, e como bloco furariam a grade */
    var rodape = porVir.length
      ? '<div class="menu__rodape"><span class="menu__rodape-titulo">O que vem por aí</span>'
        + porVir.map(montaItem).join('') + '</div>'
      : '';

    /* a primeira linha: a volta pro inicio e, na outra ponta, a troca de tema */
    return '<nav id="menu" class="menu" aria-label="Menu das séries"><div class="menu__dentro">'
      + '<div class="menu__topo">'
      + '<a class="menu__inicio"' + (ehAtual('index.html') ? ' aria-current="page"' : '')
      + ' href="' + enderecoAbsoluto('index.html') + '">Todas as séries</a>'
      + '<button class="menu__tema" type="button"></button>'
      + '</div>'
      + '<div class="menu__grade">' + comecaram.map(montaSerie).join('')
      + comecaram.filter(function (s) { return s.extras; }).map(montaExtras).join('') + '</div>'
      + rodape
      + '</div></nav>';
  }

  /* ---------- a barra do topo ---------- */

  /* o voltar nao e escrito em pagina nenhuma: a arvore ja sabe onde cada uma mora,
     entao o destino e o PAI da pagina aberta. Devolve {href, rotulo} ou nada,
     no caso da home, que e a raiz e nao tem pra onde voltar */
  function achaVolta() {
    var volta = null;

    function olha(itens, pai) {
      (itens || []).forEach(function (item) {
        if (ehAtual(item.href)) volta = pai;
        /* etapa sem pagina propria nao serve de destino: o episodio dela volta pro avo */
        olha(item.episodios, item.href ? { href: item.href, rotulo: 'voltar pra etapa' } : pai);
      });
    }

    MENU.forEach(function (serie) {
      var aSerie = { href: serie.href, rotulo: 'voltar pra série' };
      if (ehAtual(serie.href)) volta = { href: 'index.html', rotulo: 'voltar pras séries' };
      olha(serie.etapas, aSerie);
      if (serie.extras) {
        if (ehAtual(serie.extras.href)) volta = aSerie;
        olha(serie.extras.itens, { href: serie.extras.href, rotulo: 'voltar pros extras' });
      }
    });

    return volta;
  }

  /* o voltar de quem ainda nao esta na arvore, escrito na propria pagina. O href
     ja vem resolvido pelo navegador, e a seta sai do texto porque quem desenha
     a seta agora e o CSS */
  function voltaEscritaNaPagina() {
    var link = document.querySelector('a.voltar');
    return link ? { pronto: link.href, rotulo: link.textContent.replace(/^[\s←]+/, '') } : null;
  }

  /* "voltar pra etapa" = a palavra que fica sempre + o resto, que o telefone
     esconde. Por isso todo rotulo daqui comeca por "voltar" */
  function rotuloDoVoltar(rotulo) {
    var espaco = rotulo.indexOf(' ');
    if (espaco < 0) return texto(rotulo);
    return texto(rotulo.slice(0, espaco))
      + '<span class="voltar__resto">' + texto(rotulo.slice(espaco + 1)) + '</span>';
  }

  /* o canto de sair: o hamburguer e, quando ha pra onde, o voltar */
  function montaCanto() {
    var volta = achaVolta();
    var destino = volta ? { pronto: enderecoAbsoluto(volta.href), rotulo: volta.rotulo }
                        : voltaEscritaNaPagina();
    return '<div class="barra__ir">'
      + '<button class="barra__botao" type="button" aria-controls="menu"'
      + ' aria-expanded="false" aria-label="Abrir o menu"><span></span><span></span><span></span></button>'
      + (destino ? '<a class="voltar" href="' + texto(destino.pronto) + '">' + rotuloDoVoltar(destino.rotulo) + '</a>' : '')
      + '</div>';
  }

  /* onde a barra entra: na animacao ela e o primeiro canto do cabecalho do
     episodio, que ja existe e tem tocador e altura propria; no resto do site ela
     e a faixa fixa do topo, criada aqui. Devolve a faixa, que e de onde o menu desce */
  function poeBarra() {
    var canto = montaCanto();
    var topo = document.querySelector('.topo');
    if (!topo) {
      document.body.insertAdjacentHTML('afterbegin', '<header class="barra">' + canto + '</header>');
      return document.body.firstElementChild;
    }
    /* o voltar escrito a mao ja foi copiado pro canto; o que sobra aqui e a casca */
    var escrito = topo.querySelector('a.voltar');
    if (escrito) {
      var caixa = escrito.parentNode;
      escrito.remove();
      if (caixa !== topo && !caixa.children.length) caixa.remove();
    }
    topo.insertAdjacentHTML('afterbegin', canto);
    return topo;
  }

  /* ---------- comportamento ---------- */

  var barra = poeBarra();
  var botao = barra.querySelector('.barra__botao');

  /* o menu abre embaixo da barra. A .barra do site ja tem altura fixa em CSS e nao
     se mede (medir somaria a borda de baixo a cada volta, e ela cresceria 1px por
     vez); a barra da animacao nao tem altura fixa, entao aqui a medida e a de verdade. */
  function medeBarra() {
    if (barra.classList.contains('barra')) return;
    document.documentElement.style.setProperty('--barra-altura', barra.offsetHeight + 'px');
  }

  medeBarra();
  addEventListener('resize', medeBarra);

  barra.insertAdjacentHTML('afterend', montaMenu());

  var menu = document.getElementById('menu');
  ligaTema();

  function estaAberto() {
    return menu.classList.contains('menu--aberto');
  }

  /* o menu cobre a tela inteira: enquanto ele esta aberto o foco do teclado
     deve estar dentro dele, e ao fechar volta pro botao que abriu */
  function abre(aberto) {
    menu.classList.toggle('menu--aberto', aberto);
    botao.classList.toggle('barra__botao--aberto', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
    botao.setAttribute('aria-label', aberto ? 'Fechar o menu' : 'Abrir o menu');
    document.body.classList.toggle('menu-aberto', aberto);
    if (aberto) {
      menu.scrollTop = 0;
      var primeiro = menu.querySelector('[aria-current], .menu__seta');
      if (primeiro) primeiro.focus({ preventScroll: true });
    } else if (menu.contains(document.activeElement)) {
      botao.focus();
    }
  }

  botao.addEventListener('click', function () { abre(!estaAberto()); });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && estaAberto()) abre(false);
  });

  /* o nome de um bloco tambem abre e fecha: e o alvo grande, e quem le "Java Web"
     e clica espera que algo aconteca. A porta pra pagina e a linha de acesso */
  function nomeDoBloco(caixa) {
    return caixa.querySelector('.menu__titulo span:last-child').textContent;
  }

  function nomeDoRamo(ramo) {
    return ramo.querySelector('.menu__item--nome span:last-child').textContent;
  }

  function alterna(caixa, ehRamo) {
    var classe = ehRamo ? 'menu__ramo--fechado' : 'menu__bloco--fechado';
    var fechado = caixa.classList.toggle(classe);
    var seta = caixa.querySelector('.menu__seta');
    seta.setAttribute('aria-expanded', String(!fechado));
    seta.setAttribute('aria-label', ehRamo
      ? (fechado ? 'Mostrar' : 'Esconder') + ' os episódios de ' + nomeDoRamo(caixa)
      : (fechado ? 'Abrir' : 'Fechar') + ' ' + nomeDoBloco(caixa));
  }

  /* uma escuta so, delegada: as setas nascem com o menu e nunca somem, mas
     amarrar um ouvinte em cada uma seria trabalho a toa */
  menu.addEventListener('click', function (evento) {
    /* a linha inteira abre e fecha, nao so a seta: no telefone o dedo cai em
       qualquer ponto dela, e o cursor de mao ja prometia isso. Vale pro cabecalho
       do bloco e pra linha da etapa; os links de dentro nao passam por aqui */
    var linha = evento.target.closest('.menu__linha');
    var cabecalho = evento.target.closest('.menu__cabecalho');
    if (!linha && !cabecalho) return;

    if (linha) alterna(linha.closest('.menu__ramo'), true);
    else alterna(cabecalho.closest('.menu__bloco'), false);
  });

  /* ---------- os extras do episodio aberto, pra quem quiser mostrar ---------- */

  /* a lista `extras` de um episodio, resolvida: string vira o extra da serie (nome, link
     absoluto e numero); { nome } vira um extra sem link. Lista vazia quando a pagina nao
     e episodio ou ele nao promete extra nenhum */
  function extrasDe(serie, episodio) {
    var daSerie = (serie.extras && serie.extras.itens) || [];
    return (episodio.extras || []).map(function (ref) {
      if (typeof ref !== 'string') return { num: null, nome: ref.nome, href: null };
      var item = daSerie.filter(function (i) { return i.num === ref; })[0];
      if (!item) return null;
      return { num: item.num, nome: item.nome, href: item.href ? new URL(encodeURI(item.href), raiz).href : null };
    }).filter(Boolean);
  }

  /* o episodio da pagina aberta e a serie dele, ou nada (pagina do site, extra) */
  function episodioDaPaginaAtual() {
    var achado = null;
    MENU.forEach(function (serie) {
      (serie.etapas || []).forEach(function (etapa) {
        (etapa.episodios || []).forEach(function (ep) {
          if (ehAtual(ep.href)) achado = { serie: serie, episodio: ep };
        });
      });
    });
    return achado;
  }

  function extrasDaPaginaAtual() {
    var atual = episodioDaPaginaAtual();
    return atual ? extrasDe(atual.serie, atual.episodio) : [];
  }

  /* os filmes vem prontos da arvore: copia, pra quem mostra nao mexer na fonte */
  function filmesDaPaginaAtual() {
    var atual = episodioDaPaginaAtual();
    return atual ? (atual.episodio.filmes || []).map(function (f) { return Object.assign({}, f); }) : [];
  }

  window.MenuDasSeries = {
    /* { num, nome } do episodio aberto, ou null (pagina do site, extra, pagina fora da arvore) */
    episodioDaPagina: function () {
      var atual = episodioDaPaginaAtual();
      return atual ? { num: atual.episodio.num, nome: atual.episodio.nome } : null;
    },
    extrasDaPagina: extrasDaPaginaAtual,
    filmesDaPagina: filmesDaPaginaAtual
  };
})();

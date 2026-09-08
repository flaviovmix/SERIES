/* menu
   Monta o menu de tela cheia com a arvore das series e liga o hamburguer da barra.
   A arvore aparece inteira, em colunas: nada de recolher e expandir.
   Depende de css/menu.css e da barra escrita em cada pagina:

     <header class="barra">
       <button class="barra__botao" type="button" aria-controls="menu" aria-expanded="false" aria-label="Abrir o menu">
         <span></span><span></span><span></span>
       </button>
       <a class="barra__marca" href="index.html">Séries</a>
     </header>

   A arvore mora no array MENU abaixo, com os caminhos relativos a raiz do site/.
   O script descobre sozinho de que pasta a pagina esta sendo servida (pela
   propria URL do menu.js), entao a mesma linha funciona na raiz e em etapas/.

   Aviso: a lista de etapas vive em dois lugares, aqui e nos cards do hub de
   cada serie (computador.html, javaweb.html, extras/index.html). Quando uma
   etapa entra no ar, o href entra aqui e o card sai do "em producao" la. */

(function () {
  'use strict';

  /* ---------- a arvore ---------- */

  /* serie sem href = ainda nao comecou (cai no bloco "o que vem por ai"). Etapa sem href = em producao (vira cinza). */
  var MENU = [
    {
      num: '01',
      nome: 'Como Reinventar o Computador do Zero',
      href: 'computador.html',
      etapas: [
        { num: '01', nome: 'Contar antes das máquinas', href: 'etapas/etapa-01.html' },
        { num: '02', nome: 'Séculos sem máquina' },
        { num: '03', nome: 'As engrenagens assumem' },
        { num: '04', nome: 'Domesticando o raio' },
        { num: '05', nome: 'A eletricidade aprende a pensar' },
        { num: '06', nome: 'A máquina que liga', href: 'etapas/etapa-06.html' },
        { num: '07', nome: 'O computador encolhe', href: 'etapas/etapa-07.html' },
        { num: '08', nome: 'Da sala pro mundo', href: 'etapas/etapa-08.html' },
        { num: '09', nome: 'A máquina que aprende', href: 'etapas/etapa-09.html' },
        { num: '10', nome: 'A rede vira feed', href: 'etapas/etapa-10.html' }
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
        { num: '01', nome: 'Por que ainda estudar isso', href: 'etapas/javaweb-01.html' },
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
    { num: '03', nome: 'Levando o Homem à Lua' },
    { num: '04', nome: 'Montando o Corpo Humano' },
    { num: '05', nome: 'A Evolução das Espécies' }
  ];

  /* ---------- onde a pagina esta ---------- */

  /* a raiz do site e a pasta acima de js/menu.js, seja ela /site/ no servidor ou uma pasta local */
  var raiz = new URL('../', document.currentScript.src);

  /* o caminho da pagina atual relativo a raiz, sem codificacao: 'etapas/etapa-08.html', 'index.html' ou '' */
  var paginaAtual = decodeURI(new URL(location.href).pathname).slice(decodeURI(raiz.pathname).length);
  if (paginaAtual === '') paginaAtual = 'index.html';

  function ehAtual(href) {
    return !!href && href === paginaAtual;
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

  /* uma etapa ou um extra: link quando tem pagina, texto cinza quando ainda esta em producao */
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

  /* o cabecalho de um bloco: o nome, que leva pra pagina do que ele lista */
  function montaTitulo(nome, num, href) {
    var miolo = (num ? montaNumero(num) : '') + '<span>' + texto(nome) + '</span>';
    if (!href) return '<span class="menu__titulo menu__titulo--cinza">' + miolo + '</span>';
    return '<a class="menu__titulo"' + (ehAtual(href) ? ' aria-current="page"' : '')
      + ' href="' + enderecoAbsoluto(href) + '">' + miolo + '</a>';
  }

  function montaBloco(nome, num, href, itens, largo) {
    return '<div class="menu__bloco' + (largo ? ' menu__bloco--largo' : '') + '">'
      + montaTitulo(nome, num, href)
      + '<div class="menu__lista">' + itens.map(montaItem).join('') + '</div>'
      + '</div>';
  }

  /* uma serie vira um bloco com as etapas; os extras, que sao muitos, viram um
     bloco largo ao lado (duas colunas quando a tela deixa) */
  function montaSerie(serie) {
    var blocos = [montaBloco(serie.nome, serie.num, serie.href, serie.etapas, false)];
    if (serie.extras) blocos.push(montaBloco(serie.extras.nome, null, serie.extras.href, serie.extras.itens, true));
    return blocos.join('');
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

    return '<nav id="menu" class="menu" aria-label="Menu das séries"><div class="menu__dentro">'
      + '<a class="menu__inicio"' + (ehAtual('index.html') ? ' aria-current="page"' : '')
      + ' href="' + enderecoAbsoluto('index.html') + '">Todas as séries</a>'
      + '<div class="menu__grade">' + comecaram.map(montaSerie).join('') + '</div>'
      + rodape
      + '</div></nav>';
  }

  /* ---------- comportamento ---------- */

  var barra = document.querySelector('.barra');
  var botao = document.querySelector('.barra__botao');
  if (!barra || !botao) {
    console.warn('menu.js: a pagina nao tem a barra com o botao do menu; nada foi montado.');
    return;
  }

  barra.insertAdjacentHTML('afterend', montaMenu());

  var menu = document.getElementById('menu');

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
      var primeiro = menu.querySelector('[aria-current], a');
      if (primeiro) primeiro.focus({ preventScroll: true });
    } else if (menu.contains(document.activeElement)) {
      botao.focus();
    }
  }

  botao.addEventListener('click', function () { abre(!estaAberto()); });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && estaAberto()) abre(false);
  });
})();

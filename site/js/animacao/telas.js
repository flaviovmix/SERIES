/* telas
   A navegacao entre as telas: Anterior, Proximo, as bolinhas, o contador e as setas
   do teclado. Nao depende de outro script; os outros dependem deste (Animacao.telas).
   Espera no HTML: <main> com uma <section class="step"> por tela e
   <footer class="navegacao"> com .navegacao__anterior, .navegacao__proximo,
   .bolinhas e .contador. As bolinhas, as duas setas grandes dos lados do palco e
   a tela de FIM (depois da ultima) ele cria sozinho, e encolhe a grade de fotos da
   cena quando a tela nao cabe. */

window.Animacao = window.Animacao || {};

(function () {
  const telas = [...document.querySelectorAll('.step')];
  const btnAnterior = document.querySelector('.navegacao__anterior');
  const btnProximo = document.querySelector('.navegacao__proximo');
  const bolinhas = document.querySelector('.bolinhas');
  const contador = document.querySelector('.contador');
  // as setas grandes dos lados do palco, como num carrossel (telas.css so mostra no desktop)
  const setaAntes = criaSeta('antes', 'tela anterior', volta);
  const setaDepois = criaSeta('depois', 'próxima tela', avanca);
  const telaFim = criaFim();
  let noFim = false;
  const ouvintes = [];   // quem quer saber que a tela virou (o modelo da capa, o tocador)
  const ouvintesDoFim = [];   // quem quer saber que o fim abriu (o tocador leva o audio pro fim)
  let atual = 0;
  const RAIO_DAS_BOLINHAS = 3;   // quantas bolinhas de cada lado da atual o telefone mostra
  const PISO_DA_FOTO = 80;       // a grade nao encolhe a foto abaixo disto: menor, melhor rolar

  function criaBolinhas() {
    telas.forEach((_, i) => {
      const b = document.createElement('button');
      b.dataset.tela = i + 1;   // o numero pequeno em cima da bolinha (telas.css)
      b.setAttribute('aria-label', 'ir pra tela ' + (i + 1));
      b.addEventListener('click', () => mostra(i));
      bolinhas.appendChild(b);
    });
  }

  // Anterior e Proximo de novo, so que nos lados do palco, onde o mouse ja esta
  // (pedido 10/09). Moram dentro do <main>, por cima das telas. Desde 11/09 elas SAO
  // a navegacao do desktop (o rodape inteiro saiu, telas.css), entao entram no Tab;
  // no telefone elas nem aparecem, e o rodape segue com os botoes e as bolinhas.
  function criaSeta(lado, rotulo, anda) {
    const b = document.createElement('button');
    b.className = 'seta-palco seta-palco--' + lado;
    b.setAttribute('aria-label', rotulo);
    b.addEventListener('click', anda);
    document.querySelector('main').appendChild(b);
    return b;
  }

  // A tela de FIM (10/09, pedido dele: "pra ficar claro que terminou"). Vem depois
  // da ultima e NAO entra na conta: o audio diz quantas telas o episodio tem, e as
  // bolinhas e o contador seguem esse numero. Leva a foto da capa (toda tela tem
  // imagem), o nome do episodio e duas saidas: ver de novo e voltar pra etapa (o
  // mesmo endereco do voltar que o menu.js poe no topo).
  function criaFim() {
    const capa = document.querySelector('.step--capa img') || document.querySelector('.tocador__capa');
    // o nome: o titulo da capa; nos extras a capa e outra, entao qualquer h1 das
    // telas; e, sem nenhum, o titulo da aba ate o travessao
    const h1 = document.querySelector('.step--capa h1') || document.querySelector('main h1');
    const nome = h1 ? h1.textContent.trim() : document.title.split(' — ')[0].trim();
    const voltar = document.querySelector('a.voltar');
    const fim = document.createElement('section');
    fim.className = 'step step--fim';
    fim.setAttribute('aria-label', 'fim do episódio');
    if (capa) {
      const foto = document.createElement('img');
      foto.className = 'fim__foto reveal';
      foto.src = capa.currentSrc || capa.src;
      foto.alt = '';
      fim.appendChild(foto);
    }
    const selo = document.createElement('div');
    selo.className = 'kicker reveal';
    selo.textContent = 'fim do episódio';
    const titulo = document.createElement('h2');
    titulo.className = 'fim__titulo reveal';
    titulo.textContent = 'Fim';
    fim.append(selo, titulo);
    if (nome) {
      const p = document.createElement('p');
      p.className = 'fim__nome reveal';
      p.textContent = nome;
      fim.appendChild(p);
    }
    // os extras que este episodio promete (14/09): a lista vem do menu.js, que sabe a
    // arvore. E o lugar deles no desktop, onde nao ha o painel de guias do telefone. O
    // que existe e link; o aprovado que ainda nao foi gravado fica cinza e tracejado
    const extras = window.MenuDasSeries ? window.MenuDasSeries.extrasDaPagina() : [];
    if (extras.length) {
      const bloco = document.createElement('div');
      bloco.className = 'fim__extras reveal';
      const rotulo = document.createElement('div');
      rotulo.className = 'fim__extras-rotulo';
      rotulo.textContent = 'extras deste episódio';
      const lista = document.createElement('div');
      lista.className = 'fim__extras-lista';
      extras.forEach((x) => {
        const item = document.createElement(x.href ? 'a' : 'span');
        item.className = 'fim__extra' + (x.href ? '' : ' fim__extra--cinza');
        if (x.href) item.href = x.href; else item.title = 'em produção';
        item.textContent = x.nome;
        lista.appendChild(item);
      });
      bloco.append(rotulo, lista);
      fim.appendChild(bloco);
    }
    // e os filmes que conversam com ele ("pra ver", 14/09): titulo, ano e tipo, a nota
    // com o que a obra distorce e onde assistir (link so quando confirmado). Tambem
    // vem do menu.js. No telefone a mesma lista esta na guia Filmes do painel
    const filmes = window.MenuDasSeries ? window.MenuDasSeries.filmesDaPagina() : [];
    if (filmes.length) {
      const bloco = document.createElement('div');
      bloco.className = 'fim__filmes reveal';
      const rotulo = document.createElement('div');
      rotulo.className = 'fim__extras-rotulo';
      rotulo.textContent = 'pra ver';
      const lista = document.createElement('div');
      lista.className = 'fim__filmes-lista';
      filmes.forEach((f) => {
        const item = document.createElement('div');
        item.className = 'fim__filme';
        const cabeca = document.createElement('div');
        cabeca.className = 'fim__filme-cabeca';
        const titulo = document.createElement('b');
        titulo.textContent = f.titulo;
        const ano = document.createElement('span');
        ano.className = 'fim__filme-ano';
        ano.textContent = f.ano;
        const tipo = document.createElement('span');
        tipo.className = 'fim__filme-tipo';
        tipo.textContent = f.tipo;
        cabeca.append(titulo, ano, tipo);
        const nota = document.createElement('p');
        nota.className = 'fim__filme-nota';
        nota.textContent = f.nota;
        const onde = document.createElement(f.href ? 'a' : 'div');
        onde.className = 'fim__filme-onde';
        if (f.href) { onde.href = f.href; onde.target = '_blank'; onde.rel = 'noopener'; }
        onde.textContent = f.onde;
        item.append(cabeca, nota, onde);
        lista.appendChild(item);
      });
      bloco.append(rotulo, lista);
      fim.appendChild(bloco);
    }
    const acoes = document.createElement('div');
    acoes.className = 'fim__acoes reveal';
    const deNovo = document.createElement('button');
    deNovo.className = 'nav-btn ghost';
    deNovo.textContent = 'ver de novo';
    deNovo.addEventListener('click', () => mostra(0));
    acoes.appendChild(deNovo);
    if (voltar) {
      const a = document.createElement('a');
      a.className = 'nav-btn';
      a.href = voltar.href;
      a.textContent = 'voltar pra etapa';
      acoes.appendChild(a);
    }
    fim.appendChild(acoes);
    document.querySelector('main').appendChild(fim);
    return fim;
  }

  // Proximo e Anterior sabem do fim: da ultima tela o Proximo leva pro fim, e do
  // fim o Anterior volta pra ultima
  function avanca() {
    if (noFim) return;
    if (atual === telas.length - 1) mostraFim();
    else mostra(atual + 1);
  }
  function volta() {
    if (noFim) mostra(atual);
    else mostra(atual - 1);
  }

  // No fim nenhuma bolinha fica acesa e o contador diz "fim". Quem ouve o aoMudar
  // (o tocador, os abacos) nao e avisado: o fim nao tem trecho de audio nem pratica.
  // Quem ouve o aoFim e: o tocador leva o ponteiro pro fim do audio (11/09).
  function mostraFim() {
    noFim = true;
    telas.forEach((t) => t.classList.remove('active'));
    telaFim.classList.add('active');
    [...bolinhas.children].forEach((b) => b.classList.remove('cur'));
    btnAnterior.disabled = false;
    btnProximo.textContent = 'Fim ✦';
    btnProximo.disabled = true;
    setaAntes.disabled = false;
    setaDepois.disabled = true;
    contador.textContent = 'fim';
    ouvintesDoFim.forEach((avisa) => avisa());
  }

  function mostra(i) {
    atual = Math.max(0, Math.min(telas.length - 1, i));
    noFim = false;
    telaFim.classList.remove('active');
    telas.forEach((t, j) => t.classList.toggle('active', j === atual));
    encaixaGrade(telas[atual]);
    // no telefone (telas.css) so uma janela de bolinhas em volta da atual fica visivel
    const inicio = Math.max(0, Math.min(atual - RAIO_DAS_BOLINHAS, telas.length - (2 * RAIO_DAS_BOLINHAS + 1)));
    [...bolinhas.children].forEach((b, j) => {
      b.classList.toggle('cur', j === atual);
      b.classList.toggle('fora', j < inicio || j > inicio + 2 * RAIO_DAS_BOLINHAS);
    });
    const ultima = atual === telas.length - 1;
    btnAnterior.disabled = atual === 0;
    // na ultima o botao ja diz "Fim" e leva pra tela de fim
    btnProximo.textContent = ultima ? 'Fim ✦' : 'Próximo';
    btnProximo.disabled = false;
    setaAntes.disabled = atual === 0;
    setaDepois.disabled = false;
    contador.textContent = (atual + 1) + ' / ' + telas.length;
    ouvintes.forEach((avisa) => avisa(atual));
  }

  // A grade de fotos da cena (3, 4 ou 6, pranchas.css) nasce com um teto de altura
  // tirado da janela, e essa conta supoe titulo, fotos, legendas e nota. Quando a
  // tela tem mais que isso (um paragrafo embaixo, legenda comprida), ela ainda
  // rolaria: aqui a grade encolhe ate a tela caber, MEDINDO em vez de calibrar
  // numero por episodio (10/09: a tela das maquinas de 1977 do 08-01 rolava 30px
  // por causa do paragrafo). Grade de uma coluna so (telefone) fica como esta: la
  // a tela rola de proposito.
  function encaixaGrade(tela) {
    const grades = [...tela.querySelectorAll('.cena')].filter((c) => getComputedStyle(c).display === 'grid');
    grades.forEach((g) => g.style.removeProperty('--alto-grade'));
    const emColunas = grades.filter((g) => getComputedStyle(g).gridTemplateColumns.split(' ').length > 1);
    const fileirasDe = (g) => new Set([...g.children].map((f) => Math.round(f.getBoundingClientRect().top))).size;
    // encolher a foto estreita a coluna e a legenda pode quebrar mais: por isso volta a medir
    for (let volta = 0; volta < 4 && emColunas.length; volta++) {
      const sobra = tela.scrollHeight - tela.clientHeight;
      if (sobra <= 1) return;
      const corte = Math.ceil(sobra / emColunas.reduce((soma, g) => soma + fileirasDe(g), 0)) + 1;
      emColunas.forEach((g) => {
        const foto = g.querySelector('img');
        if (foto) g.style.setProperty('--alto-grade', Math.max(PISO_DA_FOTO, foto.clientHeight - corte) + 'px');
      });
    }
  }

  function ligaEncaixe() {
    let espera;
    addEventListener('resize', () => {
      clearTimeout(espera);
      espera = setTimeout(() => encaixaGrade(telas[atual]), 150);
    });
    // a fonte de leitura chega depois do primeiro desenho e muda a altura das legendas
    if (document.fonts) document.fonts.ready.then(() => encaixaGrade(telas[atual]));
  }

  function ligaTeclado() {
    // o lightbox, quando aberto, segura as setas antes de chegarem aqui (fase de captura)
    document.addEventListener('keydown', (e) => {
      // com o menu cobrindo a tela, as setas sao dele: trocar a tela por tras
      // deixaria o visitante num lugar diferente do que ele deixou
      if (document.body.classList.contains('menu-aberto')) return;
      if (e.key === 'ArrowRight') avanca();
      if (e.key === 'ArrowLeft') volta();
    });
  }

  Animacao.telas = {
    mostra,
    atual: () => atual,
    indiceDe: (el) => telas.indexOf(el.closest('.step')),
    total: telas.length,
    aoMudar: (avisa) => ouvintes.push(avisa),
    fim: mostraFim,
    noFim: () => noFim,
    aoFim: (avisa) => ouvintesDoFim.push(avisa),
  };

  btnAnterior.addEventListener('click', volta);
  btnProximo.addEventListener('click', avanca);
  criaBolinhas();
  ligaTeclado();
  ligaEncaixe();
  mostra(0);
})();

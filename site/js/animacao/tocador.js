/* tocador
   O tocador desenhado do episodio e a sincronia das telas com o audio. O <audio>
   continua sendo o dono do estado: os botoes so mandam nele e a barra le de volta.
   Depende de telas.js e de tocador.css. Espera no HTML um .tocador com um <audio>
   (data-duracao em segundos, que vale ate o metadata chegar), .tocador__play,
   .tocador__salto[data-salto], .tocador__velocidade, .tocador__barra (tabindex=0
   e role=slider), .tocador__cheio, .tocador__marcas, .tocador__atual e
   .tocador__total.

   Uso, no script do episodio:
     Animacao.tocador.monta({ marcadores: [{ segundo: 107, tela: 3 }, ...], atraso: 2 });
   Cada marcador e o instante em que o apresentador pede "aperte o Proximo" e a tela
   (contando de 1) que esse pedido abre. Tocando, a tela vira ao cruzar o marcador
   mais o atraso (o marcador aponta o comeco da fala; a tela vira depois do pedido).
   Arrastando, a tela pula na hora.

   A sincronia vale NOS DOIS SENTIDOS (08/09, pedido do dono): virar a tela na mao
   (Proximo, Anterior, bolinha ou seta) leva o audio pro comeco daquela tela, como
   trocar de capitulo. Tocando, continua tocando dali; parado, so anda o ponteiro.
   Avanco na mao nao e desfeito: a virada so
   acontece quando o alvo muda. */

(function () {
  const raiz = document.querySelector('.tocador');
  if (!raiz) return;
  const audio = raiz.querySelector('audio');
  const btnTocar = raiz.querySelector('.tocador__play');
  const barra = raiz.querySelector('.tocador__barra');
  const cheio = raiz.querySelector('.tocador__cheio');
  const marcas = raiz.querySelector('.tocador__marcas');
  const btnVelocidade = raiz.querySelector('.tocador__velocidade');
  const tempoAtual = raiz.querySelector('.tocador__atual');
  const tempoTotal = raiz.querySelector('.tocador__total');
  const duracaoPrevista = Number(audio.dataset.duracao) || 0;

  /* as marchas, na ordem em que o botao passa por elas. As mesmas do player do
     Nexus, pra quem ouve nos dois lugares nao ter que reaprender o passo */
  const VELOCIDADES = [0.75, 1, 1.25, 1.5, 2];

  let marcadores = [];
  let virandoPeloAudio = false;   // trava: o tocador esta virando a tela agora
  let atraso = 0;
  let alvoAnterior = null;
  let pontosDaBarra = [];   // o que cada marca desenhada marca: o comeco, os marcadores e o fim

  /* o audio e o dono do estado tambem aqui: o botao so mostra o que ele esta
     tocando. "1x" e "1.25x" mudam de largura, entao o botao tem largura minima */
  function poeVelocidade(v) {
    audio.playbackRate = v;
    btnVelocidade.textContent = v + 'x';
    btnVelocidade.setAttribute('aria-label', 'velocidade ' + v + 'x, toque pra trocar');
  }

  function relogio(seg) {
    if (!isFinite(seg)) seg = 0;
    const m = Math.floor(seg / 60);
    return m + ':' + String(Math.floor(seg % 60)).padStart(2, '0');
  }
  function duracao() {
    return isFinite(audio.duration) && audio.duration ? audio.duration : duracaoPrevista;
  }

  // a tela (contando de 0) que o audio esta narrando neste instante
  function telaDoTempo(seg) {
    let tela = 0;
    marcadores.forEach((m) => { if (seg >= m.segundo + atraso) tela = m.tela - 1; });
    return tela;
  }
  // o instante que uma marca abre: passa do atraso de proposito, pra cair logo
  // depois do pedido, ja na tela nova
  function instanteDaMarca(m) { return m.segundo + atraso + 0.5; }

  // as marcas sao desenho (aria-hidden): quem recebe clique e teclado e a barra,
  // que sabe onde cada marca esta. Doze botoes de 14px seriam alvos pequenos
  // demais e ainda se encostariam quando duas telas viram perto uma da outra.
  // Alem de uma por marcador, uma no comeco (a tela 1, que nao tem marcador) e uma
  // no fim (a tela de fim): as duas pontas tambem se veem e se clicam (11/09, ele:
  // "nao tem um risco indicando marcador no comeco e fim")
  function desenhaMarcas() {
    pontosDaBarra = [{ segundo: 0, tela: 1, comeco: true }, ...marcadores, { segundo: duracao(), fim: true }];
    marcas.innerHTML = '';
    pontosDaBarra.forEach((p) => {
      const marca = document.createElement('span');
      marca.className = 'tocador__marca';
      marca.style.left = (p.segundo / duracao() * 100) + '%';
      marca.title = p.fim ? 'fim' : 'tela ' + p.tela;
      marca.setAttribute('aria-hidden', 'true');
      marcas.appendChild(marca);
    });
  }

  function pinta() {
    const d = duracao();
    cheio.style.width = (audio.currentTime / d * 100) + '%';
    tempoAtual.textContent = relogio(audio.currentTime);
    tempoTotal.textContent = relogio(d);
    barra.setAttribute('aria-valuemax', Math.floor(d));
    barra.setAttribute('aria-valuenow', Math.floor(audio.currentTime));
    barra.setAttribute('aria-valuetext', relogio(audio.currentTime) + ' de ' + relogio(d));
    // acesa fica a marca da tela que o audio esta narrando; com o audio no fim, so
    // a do fim (antes a ultima marca ficava acesa depois que o episodio acabava)
    const noFim = audioNoFim();
    const emCena = telaDoTempo(audio.currentTime);
    [...marcas.children].forEach((marca, i) => {
      const p = pontosDaBarra[i];
      marca.classList.toggle('aqui', p.fim ? noFim : !noFim && p.tela - 1 === emCena);
    });
  }

  function vaiPara(seg) {
    audio.currentTime = Math.max(0, Math.min(duracao(), seg));
  }

  // a marca que esta embaixo do clique, se houver: metade da largura dela (14px)
  function marcaSobOClique(clientX, caixa) {
    const centro = (p) => caixa.left + p.segundo / duracao() * caixa.width;
    return pontosDaBarra.find((p) => Math.abs(centro(p) - clientX) <= 7);
  }

  function ligaBarra() {
    barra.addEventListener('click', (e) => {
      const caixa = barra.getBoundingClientRect();
      const marca = marcaSobOClique(e.clientX, caixa);
      // a do fim abre a tela de fim, e ela leva o ponteiro pro fim do audio (aoFim)
      if (marca && marca.fim) { if (!Animacao.telas.noFim()) Animacao.telas.fim(); }
      else if (marca && marca.comeco) vaiPara(0);
      else if (marca) vaiPara(instanteDaMarca(marca));
      else vaiPara(Math.max(0, Math.min(1, (e.clientX - caixa.left) / caixa.width)) * duracao());
    });
    // a barra e um slider pro teclado: setas andam 5s, Home e End vao as pontas.
    // O evento para aqui, senao as setas virariam a tela
    barra.addEventListener('keydown', (e) => {
      const passo = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[e.key];
      if (e.key === 'Home') vaiPara(0);
      else if (e.key === 'End') vaiPara(duracao());
      else if (passo) vaiPara(audio.currentTime + passo);
      else return;
      e.preventDefault();
      e.stopPropagation();
    });
  }

  // o instante do audio em que uma tela (contando de 0) comeca a ser narrada. E o
  // marcador MAIS o atraso: o marcador aponta o pedido "aperte o Proximo", e o conteudo
  // da tela nova comeca depois dele. A tela 0 comeca no zero.
  function segundoDaTela(tela) {
    if (tela <= 0) return 0;
    const m = marcadores.find((x) => x.tela - 1 === tela);
    return m ? m.segundo + atraso : null;
  }

  function viraParaOAlvo() {
    // na tela de fim com o ponteiro no fim, a tela fica: o fim nao tem trecho de
    // audio, e sem isto o pulo pro fim devolvia a ultima tela narrada
    if (Animacao.telas.noFim() && audioNoFim()) return;
    const alvo = telaDoTempo(audio.currentTime);
    alvoAnterior = alvo;
    if (alvo !== Animacao.telas.atual()) {
      virandoPeloAudio = true;
      Animacao.telas.mostra(alvo);
      virandoPeloAudio = false;
    }
  }

  // O outro sentido: virar a tela na mao leva o audio junto, como trocar de capitulo.
  // Se estava tocando, continua tocando do ponto novo; se estava parado, so anda o
  // ponteiro. A trava evita o laco (audio vira tela -> tela mexe no audio -> ...).
  function levaOAudioJunto(tela) {
    if (virandoPeloAudio || !marcadores.length) return;
    const seg = segundoDaTela(tela);
    if (seg === null) return;              // tela sem marcador: nao inventa posicao
    if (Math.abs(audio.currentTime - seg) < 0.5) return;   // ja esta ali
    alvoAnterior = tela;                   // o audio ja esta na tela certa
    vaiPara(seg);
  }

  // o ponteiro ja esta no fim do audio (acabou tocando, ou alguem levou ele la)
  function audioNoFim() {
    return audio.ended || audio.currentTime >= duracao() - 0.5;
  }

  // A tela de fim tambem leva o audio junto (11/09, pedido dele): aberta na mao (o
  // Proximo da ultima tela, a seta, o teclado), ela para o audio e poe o ponteiro no
  // fim, como se o episodio tivesse acabado de tocar. Quando foi o proprio audio que
  // acabou e abriu o fim, o ponteiro ja esta la e nada muda.
  function levaOAudioProFim() {
    if (audioNoFim()) return;
    audio.pause();
    vaiPara(duracao());
  }

  function segueOAudio() {
    audio.addEventListener('timeupdate', () => {
      // so vira na troca de faixa: assim um avanco manual sobrevive ate o proximo
      // marcador, em vez de ser desfeito no proximo timeupdate
      if (telaDoTempo(audio.currentTime) !== alvoAnterior) viraParaOAlvo();
    });
    // arrastar o audio manda na hora: e o jeito de pular pra uma tela pelo som
    audio.addEventListener('seeked', viraParaOAlvo);
    // e o contrario: Proximo, Anterior, as bolinhas e as setas levam o audio junto
    Animacao.telas.aoMudar(levaOAudioJunto);
    // e a tela de fim leva o ponteiro pro fim do audio
    Animacao.telas.aoFim(levaOAudioProFim);
    // o audio acabou: abre a tela de fim (10/09). Se depois da tela narrada ainda
    // sobra uma (a "Pra ver", que e muda), ela vem antes do fim
    audio.addEventListener('ended', () => {
      const telas = Animacao.telas;
      if (telas.atual() < telas.total - 1) telas.mostra(telas.atual() + 1);
      else telas.fim();
    });
  }

  function ligaControles() {
    btnTocar.addEventListener('click', () => { if (audio.paused) audio.play(); else audio.pause(); });
    audio.addEventListener('play', () => {
      btnTocar.textContent = '❚❚';
      btnTocar.classList.add('tocando');
      btnTocar.setAttribute('aria-label', 'pausar');
    });
    audio.addEventListener('pause', () => {
      btnTocar.textContent = '▶';
      btnTocar.classList.remove('tocando');
      btnTocar.setAttribute('aria-label', 'tocar');
    });
    if (btnVelocidade) {
      poeVelocidade(1);
      btnVelocidade.addEventListener('click', () => {
        const i = VELOCIDADES.indexOf(audio.playbackRate);
        poeVelocidade(VELOCIDADES[(i + 1) % VELOCIDADES.length]);
      });
    }
    raiz.querySelectorAll('.tocador__salto[data-salto]').forEach((b) => {
      const salto = Number(b.dataset.salto);
      b.addEventListener('click', () => vaiPara(audio.currentTime + salto));
    });
    audio.addEventListener('timeupdate', pinta);
    audio.addEventListener('seeked', pinta);
    audio.addEventListener('loadedmetadata', () => { desenhaMarcas(); pinta(); });
  }

  function monta(config) {
    marcadores = config.marcadores || [];
    atraso = config.atraso || 0;
    desenhaMarcas();
    pinta();
  }

  // No desktop o tocador vai pra uma faixa logo abaixo da barra de cima, na esquerda
  // (11/09, ele marcou o lugar num print: "eu so quero ele aqui"); no telefone ele
  // volta pro lugar do HTML, embaixo do palco, onde o dedo alcanca. O no MUDA de
  // lugar, nao e clonado: os ouvintes continuam ligados e o audio nao para. A marca
  // de volta e um comentario no lugar de origem. O corte e o mesmo do telas.css e
  // do tocador.css, que acha ele pelo irmao colado (.topo + .tocador).
  function mudaDeLugarPelaLargura() {
    const topo = document.querySelector('.topo');
    if (!topo) return;   // pagina sem a barra da animacao (o menu.js cria outra)
    const lugarDeOrigem = document.createComment('lugar do tocador fora do desktop');
    raiz.before(lugarDeOrigem);
    const desktop = matchMedia('(min-width: 821px)');
    const poeNoLugar = () => {
      // colado depois da barra, nao dentro dela: o tocador.css acha ele por ai
      if (desktop.matches) topo.after(raiz);
      else lugarDeOrigem.after(raiz);
    };
    desktop.addEventListener('change', poeNoLugar);
    poeNoLugar();
  }

  // As GUIAS do painel do telefone (14/09, pedido dele: "coloca em guia como hoje no
  // painel de audio do Nexus"): "Extras" e a lista dos extras que este episodio promete;
  // "Filmes" e a lista das obras que conversam com ele. As duas vem do menu.js (a arvore
  // MENU tem as duas por episodio). As guias e a lista ficam EM CIMA, e o tocador com a
  // paginacao ficam fixos embaixo, seja qual for a guia (14/09, desenho dele por print:
  // "o painel acima do play, que vai ficar sempre fixo"). As duas guias existem em todo
  // episodio; sem item, a guia avisa que nao tem. So no telefone: no desktop nao ha
  // painel (o tocador e a faixa fina embaixo da barra, sem rodape), e as listas moram na
  // tela de fim (telas.js).
  // Devolve { abas, panes } pro recolher levar tudo junto, ou null fora de episodio.
  function ligaAbas() {
    const menu = window.MenuDasSeries;
    // so em pagina que a arvore conhece como episodio: a animacao de um extra e uma
    // pagina fora da arvore nao tem "os extras deste episodio"
    if (!menu || !menu.episodioDaPagina()) return null;
    const extras = menu.extrasDaPagina();
    const filmes = menu.filmesDaPagina();

    // a guia sem item avisa em vez de sumir: as duas existem em todo episodio
    function avisoVazio(texto) {
      const p = document.createElement('p');
      p.className = 'painel-vazio';
      p.textContent = texto;
      return p;
    }

    const abas = document.createElement('div');
    abas.className = 'painel-abas';
    abas.setAttribute('role', 'tablist');
    abas.setAttribute('aria-label', 'este episódio');
    const GUIAS = [
      { id: 'extras', rotulo: 'Extras', conta: extras.length },
      { id: 'filmes', rotulo: 'Filmes', conta: filmes.length },
    ];
    GUIAS.forEach((g) => {
      const guia = document.createElement('button');
      guia.type = 'button';
      guia.className = 'painel-abas__guia';
      guia.setAttribute('role', 'tab');
      guia.dataset.guia = g.id;
      guia.textContent = g.rotulo;
      if (g.conta) {
        const conta = document.createElement('span');
        conta.className = 'painel-abas__conta';
        conta.textContent = g.conta;
        guia.appendChild(conta);
      }
      abas.appendChild(guia);
    });

    // a lista de extras: o que existe e link pra animacao do extra; o aprovado que
    // ainda nao foi gravado fica cinza com o selo, como no menu
    const paneExtras = document.createElement('div');
    paneExtras.className = 'painel-extras';
    paneExtras.setAttribute('role', 'tabpanel');
    const lista = document.createElement('ul');
    lista.className = 'painel-extras__lista';
    extras.forEach((x) => {
      const li = document.createElement('li');
      const item = document.createElement(x.href ? 'a' : 'span');
      item.className = 'painel-extras__item' + (x.href ? '' : ' painel-extras__item--cinza');
      if (x.href) item.href = x.href;
      const num = document.createElement('span');
      num.className = 'painel-extras__num';
      num.textContent = x.num || '';
      const nome = document.createElement('span');
      nome.className = 'painel-extras__nome';
      nome.textContent = x.nome;
      item.append(num, nome);
      if (!x.href) {
        const selo = document.createElement('span');
        selo.className = 'painel-extras__selo';
        selo.textContent = 'em produção';
        item.appendChild(selo);
      }
      li.appendChild(item);
      lista.appendChild(li);
    });
    paneExtras.appendChild(extras.length ? lista : avisoVazio('Este episódio não promete nenhum extra.'));

    // a lista de filmes: titulo, ano e o tipo (documentario, ficcao, docudrama), a nota
    // com o que a obra distorce, e onde assistir. Onde assistir so vira link quando a
    // pesquisa confirmou o endereco; o resto e texto, porque streaming muda toda hora
    const paneFilmes = document.createElement('div');
    paneFilmes.className = 'painel-filmes';
    paneFilmes.setAttribute('role', 'tabpanel');
    const listaFilmes = document.createElement('ul');
    listaFilmes.className = 'painel-filmes__lista';
    filmes.forEach((f) => {
      const li = document.createElement('li');
      li.className = 'painel-filmes__item';
      const cabeca = document.createElement('div');
      cabeca.className = 'painel-filmes__cabeca';
      const titulo = document.createElement('b');
      titulo.className = 'painel-filmes__titulo';
      titulo.textContent = f.titulo;
      const ano = document.createElement('span');
      ano.className = 'painel-filmes__ano';
      ano.textContent = f.ano;
      const tipo = document.createElement('span');
      tipo.className = 'painel-filmes__tipo';
      tipo.textContent = f.tipo;
      cabeca.append(titulo, ano, tipo);
      const nota = document.createElement('p');
      nota.className = 'painel-filmes__nota';
      nota.textContent = f.nota;
      const onde = document.createElement(f.href ? 'a' : 'div');
      onde.className = 'painel-filmes__onde';
      if (f.href) { onde.href = f.href; onde.target = '_blank'; onde.rel = 'noopener'; }
      onde.textContent = f.onde;
      li.append(cabeca, nota, onde);
      listaFilmes.appendChild(li);
    });
    paneFilmes.appendChild(filmes.length ? listaFilmes : avisoVazio('Nenhum filme ou documentário levantado pra este episódio.'));

    // trocar de guia so troca a lista; o tocador e a paginacao ficam onde estao. As
    // listas tem alturas diferentes, entao o palco muda e quem mede a tela (a grade de
    // fotos do telas.js) remede
    const grupos = { extras: [paneExtras], filmes: [paneFilmes] };
    const panes = [paneExtras, paneFilmes];
    function mostraGuia(id) {
      Object.keys(grupos).forEach((g) => grupos[g].forEach((el) => el.classList.toggle('painel-oculto', g !== id)));
      abas.querySelectorAll('.painel-abas__guia').forEach((guia) => {
        const ativa = guia.dataset.guia === id;
        guia.classList.toggle('painel-abas__guia--ativa', ativa);
        guia.setAttribute('aria-selected', String(ativa));
      });
      dispatchEvent(new Event('resize'));
    }
    abas.addEventListener('click', (e) => {
      const guia = e.target.closest('.painel-abas__guia');
      if (guia) mostraGuia(guia.dataset.guia);
    });
    // as guias e as listas em cima do tocador, no lugar do HTML (o telefone); o
    // tocador.css esconde tudo isso no desktop
    raiz.before(abas, ...panes);
    mostraGuia('extras');
    return { abas, panes };
  }

  // No telefone o tocador se recolhe quando o audio comeca (14/09, pedido dele: "ele ai o
  // tempo todo atrapalha"), e a paginacao do rodape vai junto (14/09, "pode colocar a
  // paginacao pra ir junto"): tocando, as telas ja andam sozinhas com o audio. As guias
  // e a lista de extras, quando existem, vao junto tambem. Comeca a mostra, porque antes
  // do play e nele que se aperta; no play tudo desce, sai do fluxo (o palco ganha a
  // altura) e fica uma seta no canto de baixo da tela que traz tudo de volta. Aberto pela
  // seta, a mesma seta (virada pra baixo, logo acima do painel) guarda de novo, e dar
  // play tambem guarda.
  // No desktop nada disso: la o tocador e a faixa fina embaixo da barra e nao ha rodape.
  function ligaRecolher(painel) {
    const telefone = matchMedia('(max-width: 820px)');
    const recolhidos = [painel && painel.abas, raiz, document.querySelector('.navegacao')].concat(painel ? painel.panes : []).filter(Boolean);
    const DESCIDA = 300;   // o mesmo tempo do transition do tocador.css
    let fimDaDescida = null;

    const alca = document.createElement('button');
    alca.type = 'button';
    alca.className = 'tocador-alca';
    alca.hidden = true;
    document.body.appendChild(alca);

    const guardado = () => raiz.classList.contains('recolhe--descendo');

    // guardados, a seta fica no canto de baixo da tela; abertos, logo acima do painel
    // (as guias, se houver; senao o tocador). offsetTop e nao a caixa na tela, porque na
    // subida o transform mentiria a posicao
    function posicionaAlca() {
      const topoDoPainel = painel ? painel.abas : raiz;
      alca.style.bottom = guardado() ? '16px' : (innerHeight - topoDoPainel.offsetTop + 10) + 'px';
    }

    // o palco mudou de altura: quem mede a tela (a grade de fotos do telas.js) remede
    function avisaOPalco() { dispatchEvent(new Event('resize')); }

    function guarda(guardar) {
      clearTimeout(fimDaDescida);
      if (guardar) {
        recolhidos.forEach((el) => el.classList.add('recolhe--descendo'));
        fimDaDescida = setTimeout(() => {
          recolhidos.forEach((el) => el.classList.add('recolhe--guardado'));
          avisaOPalco();
        }, DESCIDA);
      } else {
        recolhidos.forEach((el) => el.classList.remove('recolhe--guardado'));
        void document.body.offsetHeight;   // o navegador precisa ver tudo no lugar, apagado, antes de subir
        recolhidos.forEach((el) => el.classList.remove('recolhe--descendo'));
        avisaOPalco();
      }
      alca.classList.toggle('tocador-alca--aberta', !guardar);
      alca.setAttribute('aria-label', guardar ? 'mostrar o tocador' : 'esconder o tocador');
      alca.setAttribute('aria-expanded', String(!guardar));
      posicionaAlca();
    }

    audio.addEventListener('play', () => {
      if (!telefone.matches) return;
      alca.hidden = false;
      guarda(true);
    });
    alca.addEventListener('click', () => guarda(!guardado()));
    addEventListener('resize', () => { if (!alca.hidden) posicionaAlca(); });
    // virou desktop (telefone deitado, janela esticada): o tocador volta inteiro e a seta sai
    telefone.addEventListener('change', () => {
      if (telefone.matches) return;
      guarda(false);
      alca.hidden = true;
    });
  }

  Animacao.tocador = { monta, telaDoTempo };
  const painel = ligaAbas();   // antes de mudar o tocador de lugar: as guias ficam no lugar do HTML
  mudaDeLugarPelaLargura();
  ligaControles();
  ligaBarra();
  segueOAudio();
  ligaRecolher(painel);
  pinta();
})();

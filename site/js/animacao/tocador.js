/* tocador
   O tocador desenhado do episodio e a sincronia das telas com o audio. O <audio>
   continua sendo o dono do estado: os botoes so mandam nele e a barra le de volta.
   Depende de telas.js e de tocador.css. Espera no HTML um .tocador com um <audio>
   (data-duracao em segundos, que vale ate o metadata chegar), .tocador__play,
   .tocador__salto[data-salto], .tocador__barra (tabindex=0 e role=slider),
   .tocador__cheio, .tocador__marcas, .tocador__atual e .tocador__total.

   Uso, no script do episodio:
     Animacao.tocador.monta({ marcadores: [{ segundo: 107, tela: 3 }, ...], atraso: 2 });
   Cada marcador e o instante em que o apresentador pede "aperte o Proximo" e a tela
   (contando de 1) que esse pedido abre. Tocando, a tela vira ao cruzar o marcador
   mais o atraso (o marcador aponta o comeco da fala; a tela vira depois do pedido).
   Arrastando, a tela pula na hora. Avanco na mao nao e desfeito: a virada so
   acontece quando o alvo muda. */

(function () {
  const raiz = document.querySelector('.tocador');
  if (!raiz) return;
  const audio = raiz.querySelector('audio');
  const btnTocar = raiz.querySelector('.tocador__play');
  const barra = raiz.querySelector('.tocador__barra');
  const cheio = raiz.querySelector('.tocador__cheio');
  const marcas = raiz.querySelector('.tocador__marcas');
  const tempoAtual = raiz.querySelector('.tocador__atual');
  const tempoTotal = raiz.querySelector('.tocador__total');
  const duracaoPrevista = Number(audio.dataset.duracao) || 0;

  let marcadores = [];
  let atraso = 0;
  let alvoAnterior = null;

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
  // demais e ainda se encostariam quando duas telas viram perto uma da outra
  function desenhaMarcas() {
    marcas.innerHTML = '';
    marcadores.forEach((m) => {
      const marca = document.createElement('span');
      marca.className = 'tocador__marca';
      marca.style.left = (m.segundo / duracao() * 100) + '%';
      marca.title = 'tela ' + m.tela;
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
    const emCena = telaDoTempo(audio.currentTime);
    [...marcas.children].forEach((marca, i) => marca.classList.toggle('aqui', marcadores[i].tela - 1 === emCena));
  }

  function vaiPara(seg) {
    audio.currentTime = Math.max(0, Math.min(duracao(), seg));
  }

  // a marca que esta embaixo do clique, se houver: metade da largura dela (14px)
  function marcaSobOClique(clientX, caixa) {
    const centro = (m) => caixa.left + m.segundo / duracao() * caixa.width;
    return marcadores.find((m) => Math.abs(centro(m) - clientX) <= 7);
  }

  function ligaBarra() {
    barra.addEventListener('click', (e) => {
      const caixa = barra.getBoundingClientRect();
      const marca = marcaSobOClique(e.clientX, caixa);
      if (marca) vaiPara(instanteDaMarca(marca));
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

  function viraParaOAlvo() {
    const alvo = telaDoTempo(audio.currentTime);
    alvoAnterior = alvo;
    if (alvo !== Animacao.telas.atual()) Animacao.telas.mostra(alvo);
  }

  function segueOAudio() {
    audio.addEventListener('timeupdate', () => {
      // so vira na troca de faixa: assim um avanco manual sobrevive ate o proximo
      // marcador, em vez de ser desfeito no proximo timeupdate
      if (telaDoTempo(audio.currentTime) !== alvoAnterior) viraParaOAlvo();
    });
    // arrastar o audio manda na hora: e o jeito de pular pra uma tela pelo som
    audio.addEventListener('seeked', viraParaOAlvo);
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

  Animacao.tocador = { monta, telaDoTempo };
  ligaControles();
  ligaBarra();
  segueOAudio();
  pinta();
})();

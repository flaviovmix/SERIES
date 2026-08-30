/* lightbox
   A foto ampliada ou o modelo 3D em tela cheia. Cria o proprio DOM (nenhum episodio
   copia a marcacao), liga todo elemento com data-abre e o passeio pelas fotos da tela.
   Depende de telas.js e de lightbox.css. Espera no HTML: elementos com
   data-abre="foto" (com <img> e data-legenda ou <figcaption>) ou data-abre="modelo3d";
   o modelo vem do <iframe data-src> da capa (modelo-3d.js).

   O passeio gira em loop DENTRO da tela onde a foto foi clicada e nunca pula pra
   cena seguinte: a ordem das cenas e a narrativa do episodio, e quem manda nela e
   o Proximo. */

(function () {
  const lightbox = criaDom();
  const quadro = lightbox.querySelector('.lb-quadro');
  const img = lightbox.querySelector('img');
  const frame = lightbox.querySelector('iframe');
  const legenda = lightbox.querySelector('.lb-legenda');
  const setaAntes = lightbox.querySelector('.lb-seta--antes');
  const setaDepois = lightbox.querySelector('.lb-seta--depois');
  const btnFechar = lightbox.querySelector('.lb-fechar');
  const modelo = document.querySelector('.capa-modelo iframe[data-src]');
  const legendaDoModelo = modelo ? modelo.closest('figure').querySelector('figcaption').textContent : '';

  let galeria = [];      // as fotos da tela em que o lightbox foi aberto, e so elas
  let fotoAtual = -1;
  let gatilho = null;    // quem abriu, pra devolver o foco ao fechar

  function criaDom() {
    const el = document.createElement('div');
    el.className = 'lightbox';
    el.innerHTML =
      '<button class="lb-seta lb-seta--antes" aria-label="foto anterior" hidden>‹</button>' +
      '<button class="lb-seta lb-seta--depois" aria-label="próxima foto" hidden>›</button>' +
      '<div class="lb-quadro" role="dialog" aria-modal="true">' +
      '<button class="lb-fechar" aria-label="fechar">✕</button>' +
      '<img alt="">' +
      '<iframe title="modelo tridimensional"></iframe>' +
      '<div class="lb-legenda"></div>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  function aberta() { return lightbox.classList.contains('aberta'); }

  function setasDoPasseio(ligadas) {
    const cabe = ligadas && galeria.length > 1;   // com uma foto so nao ha o que girar
    setaAntes.hidden = !cabe;
    setaDepois.hidden = !cabe;
  }

  // passo 0 = abrindo (quem anima e a entrada do quadro); -1 e +1 fazem a foto
  // deslizar pro lado certo
  function poeFoto(i, passo) {
    if (!galeria.length) return;
    fotoAtual = (i + galeria.length) % galeria.length;   // da a volta nas duas pontas
    const foto = galeria[fotoAtual];
    const original = foto.querySelector('img');
    img.src = original.src;
    img.alt = original.alt;
    const cap = foto.querySelector('figcaption');
    legenda.textContent = foto.dataset.legenda || (cap ? cap.textContent : '');
    quadro.classList.remove('veio-da-direita', 'veio-da-esquerda');
    if (passo) {
      quadro.offsetWidth;   // reinicia a animacao: sem o reflow ela nao repete
      quadro.classList.add(passo > 0 ? 'veio-da-direita' : 'veio-da-esquerda');
    }
    setasDoPasseio(true);
  }
  function andaFoto(passo) { poeFoto(fotoAtual + passo, passo); }

  function mostraModelo() {
    if (!modelo) return;
    frame.src = modelo.dataset.src;
    frame.title = modelo.title;
    frame.style.display = 'block';
    img.style.display = 'none';
    legenda.textContent = legendaDoModelo;
    setasDoPasseio(false);   // o modelo nao e foto: nao entra no passeio
  }

  function mostraFoto(foto) {
    img.style.display = 'block';
    frame.style.display = 'none';
    const tela = foto.closest('.step');
    galeria = tela ? [...tela.querySelectorAll('[data-abre="foto"]')] : [foto];
    poeFoto(galeria.indexOf(foto), 0);
  }

  function abre(tipo, foto) {
    gatilho = document.activeElement;
    if (tipo === 'modelo3d') mostraModelo(); else mostraFoto(foto);
    lightbox.classList.remove('saindo');
    lightbox.classList.add('aberta');
    btnFechar.focus();
  }

  function fecha() {
    if (lightbox.classList.contains('saindo')) return;   // ja esta saindo
    lightbox.classList.add('saindo');
    let fechado = false;
    const some = () => {
      if (fechado) return;
      fechado = true;
      quadro.removeEventListener('animationend', aoTerminar);
      lightbox.classList.remove('aberta', 'saindo');
      quadro.classList.remove('veio-da-direita', 'veio-da-esquerda');
      frame.removeAttribute('src');   // encerra o loop de render do modelo
      if (gatilho && gatilho.focus) gatilho.focus();
    };
    // o alvo importa: animacao de filho borbulha, e uma foto ainda deslizando
    // fecharia o lightbox no meio do caminho
    function aoTerminar(e) { if (e.target === quadro) some(); }
    quadro.addEventListener('animationend', aoTerminar);
    setTimeout(some, 520);   // rede: se o animationend nao vier, fecha assim mesmo
  }

  function ligaGatilhos() {
    document.querySelectorAll('[data-abre]').forEach((el) => {
      el.addEventListener('click', () => abre(el.dataset.abre, el));
      // figure e div nao recebem Tab sozinhos: viram botao pro teclado
      if (el.tagName !== 'BUTTON') {
        el.tabIndex = 0;
        el.setAttribute('role', 'button');
        el.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          e.preventDefault();
          abre(el.dataset.abre, el);
        });
      }
    });
    setaAntes.addEventListener('click', () => andaFoto(-1));
    setaDepois.addEventListener('click', () => andaFoto(1));
    btnFechar.addEventListener('click', fecha);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) fecha(); });
  }

  function ligaTeclado() {
    // fase de captura: com o lightbox aberto as setas andam pelas fotos, nao pelas
    // telas, e telas.js nem fica sabendo
    document.addEventListener('keydown', (e) => {
      if (!aberta()) return;
      e.stopPropagation();
      if (e.key === 'Escape') fecha();
      if (!setaAntes.hidden && e.key === 'ArrowLeft') andaFoto(-1);
      if (!setaAntes.hidden && e.key === 'ArrowRight') andaFoto(1);
    }, true);
  }

  Animacao.lightbox = { abre, fecha, aberta };
  ligaGatilhos();
  ligaTeclado();
})();

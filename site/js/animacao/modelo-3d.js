/* modelo-3d
   O modelo tridimensional da capa: o iframe so ganha src enquanto a tela dele esta
   em cena (WebGL ligado nas outras telas gastaria bateria sem ninguem ver). Depende
   de telas.js. O lightbox le o mesmo data-src pra abrir o modelo em tela cheia.
   Espera no HTML: <iframe data-src="..."> dentro de .capa-modelo. */

(function () {
  const iframe = document.querySelector('.capa-modelo iframe[data-src]');
  if (!iframe) return;
  const telaDoModelo = Animacao.telas.indiceDe(iframe);

  function liga(ligado) {
    if (ligado && !iframe.src) iframe.src = iframe.dataset.src;
    else if (!ligado && iframe.src) iframe.removeAttribute('src');
  }

  Animacao.telas.aoMudar((tela) => liga(tela === telaDoModelo));
  liga(Animacao.telas.atual() === telaDoModelo);
})();

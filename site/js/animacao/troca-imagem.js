/* troca-imagem
   Liga os botoes "foto real" e "ilustracao" de cada figura .troca. Nao depende de
   outro script. Espera no HTML uma .troca com duas .troca__img (a real primeiro) e
   uma .troca__barra com dois .troca__botao[data-ver="real"|"ilustra"].

   Figura com uma imagem so tem a barra removida: nao existe troca a fazer. */

window.Animacao = window.Animacao || {};

(function () {
  const figuras = [...document.querySelectorAll('.troca')];

  function mostra(figura, ver) {
    figura.dataset.ver = ver;
    figura.querySelectorAll('.troca__botao').forEach((botao) => {
      botao.setAttribute('aria-pressed', String(botao.dataset.ver === ver));
    });
    // O selo do canto acompanha, pra quem olha a imagem sem olhar a barra.
    const selo = figura.querySelector('.selo');
    if (selo) selo.textContent = ver === 'real' ? 'imagem real' : 'ilustração';
    // Marca qual imagem esta em cena: e ela que o lightbox amplia, e e a legenda
    // dela que ele mostra.
    const imagens = figura.querySelectorAll('.troca__img');
    imagens.forEach((img, i) => {
      const emCena = (ver === 'real') === (i === 0);
      img.toggleAttribute('data-em-cena', emCena);
    });
    const credito = figura.querySelector('.troca__credito');
    const aviso = figura.querySelector('.troca__aviso');
    const texto = ver === 'real' ? credito : aviso;
    if (texto) figura.dataset.legenda = texto.textContent.trim();
  }

  figuras.forEach((figura) => {
    const barra = figura.querySelector('.troca__barra');
    const temDuas = figura.querySelectorAll('.troca__img').length > 1;
    if (!temDuas) {
      if (barra) barra.remove();
      return;
    }
    barra.querySelectorAll('.troca__botao').forEach((botao) => {
      botao.addEventListener('click', (evento) => {
        // A figura inteira abre o lightbox (data-abre="foto"); sem parar o clique
        // aqui, trocar de imagem tambem ampliaria a foto.
        evento.stopPropagation();
        mostra(figura, botao.dataset.ver);
      });
    });
    mostra(figura, figura.dataset.ver || 'real');
  });

  Animacao.trocaImagem = { figuras };
})();

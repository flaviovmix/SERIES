/* telas
   A navegacao entre as telas: Anterior, Proximo, as bolinhas, o contador e as setas
   do teclado. Nao depende de outro script; os outros dependem deste (Animacao.telas).
   Espera no HTML: <main> com uma <section class="step"> por tela e
   <footer class="navegacao"> com .navegacao__anterior, .navegacao__proximo,
   .bolinhas e .contador. */

window.Animacao = window.Animacao || {};

(function () {
  const telas = [...document.querySelectorAll('.step')];
  const btnAnterior = document.querySelector('.navegacao__anterior');
  const btnProximo = document.querySelector('.navegacao__proximo');
  const bolinhas = document.querySelector('.bolinhas');
  const contador = document.querySelector('.contador');
  const ouvintes = [];   // quem quer saber que a tela virou (o modelo da capa, o tocador)
  let atual = 0;
  const RAIO_DAS_BOLINHAS = 3;   // quantas bolinhas de cada lado da atual o telefone mostra

  function criaBolinhas() {
    telas.forEach((_, i) => {
      const b = document.createElement('button');
      b.dataset.tela = i + 1;   // o numero pequeno em cima da bolinha (telas.css)
      b.setAttribute('aria-label', 'ir pra tela ' + (i + 1));
      b.addEventListener('click', () => mostra(i));
      bolinhas.appendChild(b);
    });
  }

  function mostra(i) {
    atual = Math.max(0, Math.min(telas.length - 1, i));
    telas.forEach((t, j) => t.classList.toggle('active', j === atual));
    // no telefone (telas.css) so uma janela de bolinhas em volta da atual fica visivel
    const inicio = Math.max(0, Math.min(atual - RAIO_DAS_BOLINHAS, telas.length - (2 * RAIO_DAS_BOLINHAS + 1)));
    [...bolinhas.children].forEach((b, j) => {
      b.classList.toggle('cur', j === atual);
      b.classList.toggle('fora', j < inicio || j > inicio + 2 * RAIO_DAS_BOLINHAS);
    });
    const ultima = atual === telas.length - 1;
    btnAnterior.disabled = atual === 0;
    btnProximo.textContent = ultima ? 'Fim ✦' : 'Próximo →';
    btnProximo.disabled = ultima;
    contador.textContent = (atual + 1) + ' / ' + telas.length;
    ouvintes.forEach((avisa) => avisa(atual));
  }

  function ligaTeclado() {
    // o lightbox, quando aberto, segura as setas antes de chegarem aqui (fase de captura)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') mostra(atual + 1);
      if (e.key === 'ArrowLeft') mostra(atual - 1);
    });
  }

  Animacao.telas = {
    mostra,
    atual: () => atual,
    indiceDe: (el) => telas.indexOf(el.closest('.step')),
    total: telas.length,
    aoMudar: (avisa) => ouvintes.push(avisa),
  };

  btnAnterior.addEventListener('click', () => mostra(atual - 1));
  btnProximo.addEventListener('click', () => mostra(atual + 1));
  criaBolinhas();
  ligaTeclado();
  mostra(0);
})();

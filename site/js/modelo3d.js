// modelo3d
// Trava de rolagem do modelo tridimensional embutido na página.
//
// O modelo mora num iframe e ouve arrasto e roda do mouse pra girar e aproximar.
// Sem trava, quem rola a página e passa por cima dele gira o objeto em vez de
// descer a página, e no celular isso prende a pessoa no meio da tela.
//
// Por isso o modelo nasce travado: uma camada por cima recebe o gesto, a página
// rola normal, e só depois de um toque o modelo passa a valer. Destravado, a
// legenda ganha o botão que trava de novo, pra dar como sair.

(function () {
  const moldura = document.querySelector('.modelo');
  if (!moldura) return;

  const legenda = moldura.querySelector('figcaption');
  const dizToque = window.matchMedia('(hover: none)').matches;

  const trava = document.createElement('button');
  trava.type = 'button';
  trava.className = 'modelo__trava';
  trava.innerHTML = `<span>${dizToque ? 'Toque pra mexer' : 'Clique pra mexer'}</span>`;

  const soltar = document.createElement('button');
  soltar.type = 'button';
  soltar.className = 'modelo__soltar';
  soltar.textContent = dizToque ? 'travar pra rolar' : 'travar';

  function destrava() {
    moldura.classList.add('modelo--solto');
    soltar.hidden = false;
    soltar.focus();
  }

  function trancar() {
    moldura.classList.remove('modelo--solto');
    soltar.hidden = true;
    trava.focus();
  }

  trava.addEventListener('click', destrava);
  soltar.addEventListener('click', trancar);
  soltar.hidden = true;

  moldura.insertBefore(trava, legenda);
  legenda.appendChild(soltar);
})();

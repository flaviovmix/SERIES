/* lampadas (deste extra)
   A fabrica da fileira de lampadas: cinco casas que dobram (16 8 4 2 1), cada uma
   acesa ou apagada, com o valor da casa em cima e o algarismo (0 ou 1) embaixo.
   E o widget proprio do EX-04 — o abaco nao entra aqui: a analogia e o interruptor.
   Depende de binario.css e mora dentro de .painel (animacao/painel.css).

   Uso: Animacao.criaLampadas('idDaRaiz', { travado: true, aoMudar: (total, bits) => ... })
   devolve { set, total, bits, destaca, estado }. O set aceita um numero (5) ou o
   estado por casa ([0,0,1,0,1]). Travado, as lampadas nao respondem ao clique nem
   entram no Tab: e a fileira que a demonstracao move sozinha. */

window.Animacao = window.Animacao || {};

(function () {
  const CASAS = [16, 8, 4, 2, 1];

  function criaLampadas(elId, opts = {}) {
    const raiz = document.getElementById(elId);
    raiz.className = 'lampadas' + (opts.travado ? ' travado' : '');
    const estado = CASAS.map(() => 0);
    const colunas = [];

    function avisa() { if (opts.aoMudar) opts.aoMudar(total(), bits()); }

    function criaLampada(ci) {
      const lampada = document.createElement('button');
      lampada.className = 'lampada';
      lampada.setAttribute('aria-label', 'lâmpada do ' + CASAS[ci]);
      lampada.setAttribute('aria-pressed', 'false');
      const valor = document.createElement('span');
      valor.className = 'valor';
      valor.textContent = CASAS[ci];
      const bulbo = document.createElement('span');
      bulbo.className = 'bulbo';
      const bit = document.createElement('span');
      bit.className = 'bit';
      bit.textContent = '0';
      lampada.append(valor, bulbo, bit);
      if (opts.travado) lampada.disabled = true;
      else lampada.addEventListener('click', () => { estado[ci] = 1 - estado[ci]; pinta(); avisa(); });
      return lampada;
    }

    function total() {
      return estado.reduce((soma, aceso, i) => soma + aceso * CASAS[i], 0);
    }
    function bits() { return estado.join(''); }
    function pinta() {
      colunas.forEach((lampada, ci) => {
        lampada.classList.toggle('on', estado[ci] === 1);
        lampada.setAttribute('aria-pressed', String(estado[ci] === 1));
        lampada.querySelector('.bit').textContent = estado[ci];
      });
    }
    function set(novo) {
      const porCasa = (typeof novo === 'number') ? CASAS.map((v) => Math.floor(novo / v) % 2) : novo;
      porCasa.forEach((aceso, i) => { estado[i] = aceso; });
      pinta();
      avisa();
    }
    function destaca(ci) {
      colunas.forEach((lampada, i) => lampada.classList.toggle('destaque', i === ci));
    }

    CASAS.forEach((valorDaCasa, ci) => {
      const lampada = criaLampada(ci);
      colunas.push(lampada);
      raiz.appendChild(lampada);
    });
    pinta();
    return { set, total, bits, destaca, estado };
  }

  Animacao.criaLampadas = criaLampadas;
})();

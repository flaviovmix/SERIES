/* lampadas (deste extra)
   A fileira de lampadas acesa/apagada, aqui com QUATRO casas (8 4 2 1): e ela que
   mostra por que a base dezesseis existe — quatro sim-ou-naos, um rotulo.
   SEGUNDA COPIA da fabrica do EX-04 (ganhou a opcao `casas`); se vier a terceira,
   a regra do terceiro clone manda extrair pra base em site/js/animacao/.
   Depende de hexa.css e mora dentro de .painel (animacao/painel.css).

   Uso: Animacao.criaLampadas('idDaRaiz', { casas: [8, 4, 2, 1], travado: true,
   aoMudar: (total, bits) => ... }) devolve { set, total, bits, destaca, estado }.
   O set aceita um numero (5) ou o estado por casa ([0,1,0,1]). */

window.Animacao = window.Animacao || {};

(function () {
  function criaLampadas(elId, opts = {}) {
    const CASAS = opts.casas || [16, 8, 4, 2, 1];
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

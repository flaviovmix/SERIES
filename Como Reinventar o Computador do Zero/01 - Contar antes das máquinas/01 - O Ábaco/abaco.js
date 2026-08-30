/* abaco (deste episodio)
   A fabrica de abacos: quatro hastes decimais com nove contas cada, o estado (contas
   no fio por haste), o total e o destaque de uma haste. Cada tela de pratica ou
   demonstracao cria o seu. Depende de abaco.css. Nao depende de outro script.

   Uso: Animacao.criaAbaco('idDaRaiz', { travado: true, aoMudar: (total) => ... })
   devolve { set, total, destaca, estado }. Travado, as contas nao respondem ao
   clique nem entram no Tab: e o abaco que o roteiro move sozinho. */

window.Animacao = window.Animacao || {};

(function () {
  const HASTES = [
    { rotulo: 'MILHAR', valor: 1000 },
    { rotulo: 'CENTENA', valor: 100 },
    { rotulo: 'DEZENA', valor: 10 },
    { rotulo: 'UNIDADE', valor: 1 },
  ];
  const CONTAS_POR_HASTE = 9;

  function criaAbaco(elId, opts = {}) {
    const raiz = document.getElementById(elId);
    raiz.className = 'abaco' + (opts.travado ? ' travado' : '');
    const estado = HASTES.map(() => 0);
    const linhas = [];

    function avisa() { if (opts.aoMudar) opts.aoMudar(total()); }

    // clicar na conta c poe c contas no fio; clicar numa que ja esta no fio tira
    // ela e as de cima
    function aoClicarConta(hi, c) {
      estado[hi] = (c <= estado[hi]) ? c - 1 : c;
      pinta();
      avisa();
    }

    function criaConta(haste, hi, c) {
      const conta = document.createElement('button');
      conta.className = 'conta';
      conta.setAttribute('aria-label', haste.rotulo.toLowerCase() + ' conta ' + c);
      if (opts.travado) conta.disabled = true;
      else conta.addEventListener('click', () => aoClicarConta(hi, c));
      return conta;
    }

    function criaHaste(haste, hi) {
      const linha = document.createElement('div');
      linha.className = 'haste';
      const rotulo = document.createElement('span');
      rotulo.className = 'rotulo';
      rotulo.textContent = haste.rotulo;
      const fio = document.createElement('div');
      fio.className = 'fio';
      for (let c = 1; c <= CONTAS_POR_HASTE; c++) fio.appendChild(criaConta(haste, hi, c));
      const valor = document.createElement('span');
      valor.className = 'valor';
      valor.textContent = '0';
      linha.append(rotulo, fio, valor);
      return linha;
    }

    function total() {
      return estado.reduce((soma, n, i) => soma + n * HASTES[i].valor, 0);
    }
    function pinta() {
      linhas.forEach((linha, hi) => {
        linha.querySelectorAll('.conta').forEach((b, i) => b.classList.toggle('on', i < estado[hi]));
        linha.querySelector('.valor').textContent = estado[hi];
      });
    }
    function set(novo) {
      novo.forEach((n, i) => { estado[i] = n; });
      pinta();
      avisa();
    }
    function destaca(hi) {
      linhas.forEach((l, i) => l.classList.toggle('destaque', i === hi));
    }

    HASTES.forEach((h, hi) => {
      const linha = criaHaste(h, hi);
      linhas.push(linha);
      raiz.appendChild(linha);
    });
    pinta();
    return { set, total, destaca, estado };
  }

  Animacao.criaAbaco = criaAbaco;
})();

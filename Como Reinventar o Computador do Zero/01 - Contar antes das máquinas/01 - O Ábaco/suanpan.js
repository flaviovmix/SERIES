/* suanpan (deste episodio)
   O abaco com barra da tela 8: quatro casas, cada uma com duas contas que valem 5 e
   cinco que valem 1. Nasce travado (so o roteiro move) e o botao "praticar" solta as
   contas pra mao. Depende de suanpan.css e de abaco.css. Nao depende de outro script.

   Uso: Animacao.criaSuanpan('idDaRaiz', { aoMudar: (total) => ... }) devolve
   { set, destaca, libera, total, valores }, no mesmo formato do abaco simples, pra tocaRoteiro
   (episodio.js) servir pros dois. O estado de cada casa e um par [cima, baixo]:
   quantas contas de cada deck estao encostadas na barra. */

window.Animacao = window.Animacao || {};

(function () {
  const CASAS = [
    { rotulo: 'MILHAR', valor: 1000 },
    { rotulo: 'CENTENA', valor: 100 },
    { rotulo: 'DEZENA', valor: 10 },
    { rotulo: 'UNIDADE', valor: 1 },
  ];
  const CONTAS_DE_CINCO = 2;
  const CONTAS_DE_UM = 5;

  function criaSuanpan(elId, opts = {}) {
    const raiz = document.getElementById(elId);
    raiz.className = 'abaco suanpan travado';
    const estado = CASAS.map(() => [0, 0]);
    const linhas = [];

    function valores() { return estado.map(([cima, baixo]) => 5 * cima + baixo); }
    function total() {
      return valores().reduce((soma, v, i) => soma + v * CASAS[i].valor, 0);
    }
    function avisa() { if (opts.aoMudar) opts.aoMudar(total()); }

    // "posto" e a distancia da conta ate a barra, contando de 1: clicar na conta de
    // posto c encosta c contas; se ela ja esta encostada, solta ela e as de tras
    function aoClicar(casa, deck, posto) {
      estado[casa][deck] = (posto <= estado[casa][deck]) ? posto - 1 : posto;
      pinta();
      avisa();
    }

    function criaConta(casa, deck, posto, nomeDoDeck) {
      const conta = document.createElement('button');
      conta.className = 'conta';
      conta.disabled = true;
      conta.setAttribute('aria-label', CASAS[casa].rotulo.toLowerCase() + ', conta ' + nomeDoDeck + ' ' + posto);
      conta.addEventListener('click', () => aoClicar(casa, deck, posto));
      return conta;
    }

    function criaDeck(casa, deck, classe, quantas, nomeDoDeck) {
      const el = document.createElement('div');
      el.className = 'deck ' + classe;
      for (let j = 0; j < quantas; j++) {
        // no deck do 5 a barra fica embaixo: a ultima conta e a de posto 1
        const posto = deck === 0 ? quantas - j : j + 1;
        el.appendChild(criaConta(casa, deck, posto, nomeDoDeck));
      }
      return el;
    }

    function criaCasa(info, casa) {
      const linha = document.createElement('div');
      linha.className = 'haste';
      const rotulo = document.createElement('span');
      rotulo.className = 'rotulo';
      rotulo.textContent = info.rotulo;
      const fio = document.createElement('div');
      fio.className = 'fio';
      const barra = document.createElement('span');
      barra.className = 'barra';
      fio.append(
        criaDeck(casa, 0, 'deck--cinco', CONTAS_DE_CINCO, 'de cinco'),
        barra,
        criaDeck(casa, 1, 'deck--um', CONTAS_DE_UM, 'de um')
      );
      const valor = document.createElement('span');
      valor.className = 'valor';
      valor.textContent = '0';
      linha.append(rotulo, fio, valor);
      return linha;
    }

    // as de cima encostam de baixo pra cima na lista (as mais perto da barra primeiro);
    // as de baixo, de cima pra baixo
    function pintaCasa(linha, [cima, baixo]) {
      linha.querySelectorAll('.deck--cinco .conta').forEach((c, j) => c.classList.toggle('on', j >= CONTAS_DE_CINCO - cima));
      linha.querySelectorAll('.deck--um .conta').forEach((c, j) => c.classList.toggle('on', j < baixo));
      linha.querySelector('.valor').textContent = 5 * cima + baixo;
    }
    function pinta() { linhas.forEach((linha, i) => pintaCasa(linha, estado[i])); }
    function set(novo) {
      novo.forEach(([cima, baixo], i) => { estado[i] = [cima, baixo]; });
      pinta();
      avisa();
    }
    function destaca(i) {
      linhas.forEach((l, j) => l.classList.toggle('destaque', j === i));
    }
    function libera(livre) {
      raiz.classList.toggle('travado', !livre);
      raiz.querySelectorAll('.conta').forEach((c) => { c.disabled = !livre; });
    }

    CASAS.forEach((info, casa) => {
      const linha = criaCasa(info, casa);
      linhas.push(linha);
      raiz.appendChild(linha);
    });
    pinta();
    return { set, destaca, libera, total, valores };
  }

  Animacao.criaSuanpan = criaSuanpan;
})();

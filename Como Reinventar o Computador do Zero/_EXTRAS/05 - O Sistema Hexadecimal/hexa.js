/* hexa (deste extra)
   As demonstracoes e a pratica do EX-05: o contador que passa pelo A, o mapa
   quatro-lampadas-um-rotulo, a leitura do 2A e a pratica no mostrador.
   Sem audio ainda: quando o trio for gravado, o tocador entra no cabecalho e os
   marcadores saem do _telas.md, como nos episodios.
   Depende de telas.js, lampadas.js e da trilha da base (animacao/trilha.js). */

(function () {
  const ALGARISMOS = '0123456789ABCDEF';
  const hexDe = (n) => ALGARISMOS[Math.floor(n / 16)] + ALGARISMOS[n % 16];

  // ---------- o mostrador: algarismos grandes de dezesseis ----------
  // casas: [{ rotulo, vale }]; clicavel = o clique avanca o algarismo (F volta
  // pro 0); semVale esconde a linha de baixo. Devolve { set, total, destaca }.
  function criaMostrador(elId, opts = {}) {
    const raiz = document.getElementById(elId);
    raiz.className = 'mostrador';
    const casas = opts.casas;
    const digitos = casas.map(() => 0);
    const colunas = [];

    function total() { return digitos.reduce((soma, d, i) => soma + d * casas[i].vale, 0); }
    function avisa() { if (opts.aoMudar) opts.aoMudar(total()); }
    function pinta() {
      colunas.forEach((col, i) => {
        col.querySelector('.digito').textContent = ALGARISMOS[digitos[i]];
        const vale = col.querySelector('.vale');
        if (vale) vale.textContent = digitos[i] === 0 ? '—' : 'vale ' + (digitos[i] * casas[i].vale);
      });
    }
    function set(n) {
      casas.forEach((casa, i) => { digitos[i] = Math.floor(n / casa.vale) % 16; });
      pinta();
      avisa();
    }
    function destaca(i) { colunas.forEach((col, j) => col.classList.toggle('destaque', j === i)); }

    casas.forEach((casa, i) => {
      const col = document.createElement(opts.clicavel ? 'button' : 'div');
      col.className = 'casa';
      if (opts.clicavel) {
        col.setAttribute('aria-label', 'algarismo da casa do ' + casa.vale);
        col.addEventListener('click', () => { digitos[i] = (digitos[i] + 1) % 16; pinta(); avisa(); });
      }
      const rotulo = document.createElement('span'); rotulo.className = 'rotulo'; rotulo.textContent = casa.rotulo;
      const digito = document.createElement('span'); digito.className = 'digito'; digito.textContent = '0';
      col.append(rotulo, digito);
      if (!opts.semVale) {
        const vale = document.createElement('span'); vale.className = 'vale'; vale.textContent = '—';
        col.appendChild(vale);
      }
      colunas.push(col);
      raiz.appendChild(col);
    });
    pinta();
    return { set, total, destaca };
  }

  const DUAS_CASAS = [{ rotulo: 'casa do dezesseis', vale: 16 }, { rotulo: 'casa do um', vale: 1 }];

  // ---------- tela 4: o contador que passa pelo A ----------
  const RITMO_DO_CONTADOR = 800;
  const legContagem = document.getElementById('legContagem');
  const btnComecar = document.getElementById('btnContagemComecar');
  const btnPausar = document.getElementById('btnContagemPausar');
  let contagem = 0;
  let relogioContagem = null;

  const mostContagem = criaMostrador('mostradorContagem', {
    casas: DUAS_CASAS,
    aoMudar: (total) => {
      document.getElementById('totalContagem').textContent = total;
      document.getElementById('metaContagem').textContent = 'escrito: ' + hexDe(total);
    },
  });
  mostContagem.set(0);

  function narraOContador(n) {
    const solto = n % 16;
    if (n === 255) return '<b>FF</b>: tudo cheio — dois algarismos contaram até 255';
    if (solto === 0 && n > 0) return 'a casa encheu no F: vai-um — agora <b>' + hexDe(n) + '</b>';
    if (solto === 10) return 'o 9 acabou e a casa NÃO encheu: entra o <b>A</b>, valendo dez';
    if (solto === 15) return '<b>F</b>, quinze: o último algarismo. O próximo não cabe…';
    if (solto > 10) return 'letra é algarismo: <b>' + ALGARISMOS[solto] + '</b> vale ' + solto;
    return 'contando: <b>' + hexDe(n) + '</b>';
  }
  function pintaBotoesDoContador() {
    btnComecar.textContent = contagem === 0 ? 'começar →' : 'continuar →';
    btnComecar.disabled = !!relogioContagem;
    btnPausar.disabled = !relogioContagem;
  }
  function tiqueDoContador() {
    contagem++;
    if (contagem > 255) { pausaContador(); return; }
    mostContagem.set(contagem);
    legContagem.innerHTML = narraOContador(contagem);
    if (contagem === 255) pausaContador();
  }
  function pausaContador() {
    clearInterval(relogioContagem);
    relogioContagem = null;
    pintaBotoesDoContador();
  }
  btnComecar.addEventListener('click', () => {
    if (contagem >= 255) contagem = 0;
    relogioContagem = setInterval(tiqueDoContador, RITMO_DO_CONTADOR);
    pintaBotoesDoContador();
  });
  btnPausar.addEventListener('click', pausaContador);
  document.getElementById('btnContagemLimpar').addEventListener('click', () => {
    pausaContador();
    contagem = 0;
    mostContagem.set(0);
    legContagem.innerHTML = 'Aperte <b>começar</b> e repare no que acontece depois do 9 — e no que só acontece depois do F.';
    pintaBotoesDoContador();
  });
  pintaBotoesDoContador();

  // ---------- tela 6: quatro sim-ou-naos, um rotulo ----------
  const legMapa = document.getElementById('legMapa');
  const digitoMapa = criaMostrador('mostradorMapa', { casas: [{ rotulo: 'o rótulo', vale: 1 }], semVale: true });
  const lampMapa = Animacao.criaLampadas('lampMapa', {
    casas: [8, 4, 2, 1],
    aoMudar: (total, bits) => {
      digitoMapa.set(total);
      legMapa.innerHTML = 'quatro sim-ou-nãos: <b>' + bits + '</b> → um rótulo só: <b>' + ALGARISMOS[total] + '</b>. Clique nas lâmpadas e troque a combinação.';
    },
  });
  lampMapa.set(11);   // 1011 = B, ja de entrada com letra

  // ---------- tela 8: o 2A por dentro (no clique) ----------
  const legLeitura = document.getElementById('legLeitura');
  const btnLeitura = document.getElementById('btnLeitura');
  const mostLeitura = criaMostrador('mostradorLeitura', { casas: DUAS_CASAS });
  mostLeitura.set(42);   // 2A
  const PASSOS_DA_LEITURA = [
    { casa: 0, fala: 'o <b>2</b> na casa do dezesseis: duas gavetas cheias = <b>32</b>' },
    { casa: 1, fala: 'o <b>A</b> na casa do um: dez soltos = <b>10</b>' },
    { casa: -1, fala: '32 + 10 = <b>42</b>. A letra não muda a regra: a casa multiplica, o algarismo conta' },
  ];
  let passoDaLeitura = 0;
  function comecaALeitura() {
    passoDaLeitura = 0;
    mostLeitura.destaca(-1);
    legLeitura.innerHTML = '<b>2A</b> parece senha, mas é um número. Aperte <b>lê</b> e desmonte ele.';
    btnLeitura.textContent = 'lê →';
  }
  btnLeitura.addEventListener('click', () => {
    if (passoDaLeitura >= PASSOS_DA_LEITURA.length) { comecaALeitura(); return; }
    const passo = PASSOS_DA_LEITURA[passoDaLeitura];
    mostLeitura.destaca(passo.casa);
    legLeitura.innerHTML = passo.fala;
    passoDaLeitura++;
    if (passoDaLeitura === PASSOS_DA_LEITURA.length) btnLeitura.textContent = 'de novo ↺';
  });
  comecaALeitura();

  // ---------- tela 9: pratica (26, 42, 240) ----------
  // o 26 e o 42 obrigam o A na casa do um; o 240, o F na casa do dezesseis
  const trilhaHexa = Animacao.criaTrilha({
    trilha: 'trilhaHexa',
    legenda: 'legPratica',
    meta: 'metaPratica',
    desafios: [26, 42, 240],
    pede: (n) => 'Monte o número <b>' + n + '</b> — clique num algarismo pra ele avançar (do F volta pro 0).',
    fim: '<b>Fechou os três!</b>',
  });
  const mostPratica = criaMostrador('mostradorPratica', {
    casas: DUAS_CASAS,
    clicavel: true,
    aoMudar: (total) => {
      document.getElementById('totalPratica').textContent = total;
      trilhaHexa.confere(total);
    },
  });
  document.getElementById('btnPraticaLimpar').addEventListener('click', () => mostPratica.set(0));
})();

/* sessenta (deste extra)
   As demonstracoes e a pratica do EX-06: o relogio que conta acelerado ate a
   cascata do 59:59, a divisao das pedras sem sobra, a leitura do 2:35 e a
   pratica de montar tempos. Sem audio ainda: quando o trio for gravado, o
   tocador entra no cabecalho e os marcadores saem do _telas.md, como nos
   episodios. Depende de telas.js e da trilha da base (animacao/trilha.js). */

(function () {
  const dois = (n) => String(n).padStart(2, '0');
  function formata(s) {
    const h = Math.floor(s / 3600);
    const m = Math.floor(s / 60) % 60;
    const seg = s % 60;
    return h > 0 ? h + ':' + dois(m) + ':' + dois(seg) : m + ':' + dois(seg);
  }

  // ---------- tela 4: deixa o relogio contar (ate a cascata do 59:59) ----------
  const RITMO_DO_RELOGIO = 120;   // acelerado: cada piscada e um segundo
  const relogioContagem = document.getElementById('relogioContagem');
  const legContagem = document.getElementById('legContagem');
  const btnComecar = document.getElementById('btnContagemComecar');
  const btnPausar = document.getElementById('btnContagemPausar');
  let segundos = 0;
  let relogio = null;

  function narraOsSegundos(s) {
    if (s === 3600) return '59:59 + 1: as DUAS casas viraram no mesmo instante — <b>1:00:00</b>. É a cascata';
    if (s % 60 === 0) return 'sessenta segundos encheram: sobe <b>UM minuto</b> — ' + formata(s);
    return 'a casa dos segundos está cheia: <b>59</b>. O próximo não cabe…';
  }
  function pintaOTempo() {
    relogioContagem.textContent = formata(segundos);
    document.getElementById('totalSegundos').textContent = segundos;
  }
  function pintaBotoesDoRelogio() {
    btnComecar.textContent = segundos === 0 ? 'começar →' : 'continuar →';
    btnComecar.disabled = !!relogio;
    btnPausar.disabled = !relogio;
  }
  function tiqueDoRelogio() {
    segundos++;
    pintaOTempo();
    // a legenda so fala nos momentos de virada, senao vira pisca-pisca
    if (segundos % 60 === 0 || segundos % 60 === 59) legContagem.innerHTML = narraOsSegundos(segundos);
    if (segundos >= 3600) pausaORelogio();
  }
  function pausaORelogio() {
    clearInterval(relogio);
    relogio = null;
    pintaBotoesDoRelogio();
  }
  function comecaORelogio() {
    if (segundos >= 3600) segundos = 0;
    relogio = setInterval(tiqueDoRelogio, RITMO_DO_RELOGIO);
    pintaBotoesDoRelogio();
  }
  btnComecar.addEventListener('click', comecaORelogio);
  btnPausar.addEventListener('click', pausaORelogio);
  document.getElementById('btnContagemQuase').addEventListener('click', () => {
    segundos = 3585;   // 59:45, a quinze segundos da cascata
    pintaOTempo();
    legContagem.innerHTML = '<b>59:45</b> — quinze segundos pro estouro. Olhe as duas casas.';
    if (!relogio) comecaORelogio();
  });
  document.getElementById('btnContagemLimpar').addEventListener('click', () => {
    pausaORelogio();
    segundos = 0;
    pintaOTempo();
    legContagem.innerHTML = 'Aperte <b>começar</b> (acelerado: cada piscada é um segundo) e repare no vai-um dos sessenta.';
    pintaBotoesDoRelogio();
  });
  pintaOTempo();
  pintaBotoesDoRelogio();

  // ---------- tela 6: reparta as pedras (a sobra aparece sozinha) ----------
  const areaPedras = document.getElementById('pedras');
  const legPedras = document.getElementById('legPedras');
  let pedras = 60;
  let divisor = 2;

  function reparte() {
    const porGrupo = Math.floor(pedras / divisor);
    const sobra = pedras % divisor;
    areaPedras.innerHTML = '';
    areaPedras.className = 'grupos';
    for (let g = 0; g < divisor; g++) areaPedras.appendChild(fazGrupo(porGrupo, false));
    if (sobra > 0) areaPedras.appendChild(fazGrupo(sobra, true));
    legPedras.innerHTML = pedras + ' ÷ ' + divisor + ' = <b>' + porGrupo + '</b> em cada grupo, ' +
      (sobra > 0 ? '<b>SOBRA ' + sobra + '</b> — briga na feira' : 'sobra 0 — todo mundo igual');
    document.querySelectorAll('[data-divisor]').forEach((b) => b.classList.toggle('cheio', Number(b.dataset.divisor) === divisor));
    document.querySelectorAll('[data-pedras]').forEach((b) => b.classList.toggle('cheio', Number(b.dataset.pedras) === pedras));
  }
  function fazGrupo(quantas, eSobra) {
    const grupo = document.createElement('div');
    grupo.className = 'grupo' + (eSobra ? ' grupo--sobra' : '');
    for (let i = 0; i < quantas; i++) {
      const pedra = document.createElement('span');
      pedra.className = 'pedra';
      grupo.appendChild(pedra);
    }
    return grupo;
  }
  document.querySelectorAll('[data-divisor]').forEach((b) => b.addEventListener('click', () => { divisor = Number(b.dataset.divisor); reparte(); }));
  document.querySelectorAll('[data-pedras]').forEach((b) => b.addEventListener('click', () => { pedras = Number(b.dataset.pedras); reparte(); }));
  reparte();

  // ---------- tela 8: o 2:35 por dentro (no clique) ----------
  const legLeitura = document.getElementById('legLeitura');
  const btnLeitura = document.getElementById('btnLeitura');
  const PASSOS_DA_LEITURA = [
    { parte: 'leMin', fala: 'o <b>2</b> dos minutos: dois grupos de sessenta = <b>120</b> segundos' },
    { parte: 'leSeg', fala: 'mais <b>35</b> segundos soltos' },
    { parte: null, fala: '120 + 35 = <b>155 segundos</b>. O relógio é um número de base sessenta com uma parede no meio' },
  ];
  let passoDaLeitura = 0;
  function destacaParte(id) {
    document.querySelectorAll('#relogioLeitura .parte').forEach((p) => p.classList.toggle('destaque', p.id === id));
  }
  function comecaALeitura() {
    passoDaLeitura = 0;
    destacaParte(null);
    legLeitura.innerHTML = 'Quantos segundos tem <b>2:35</b>? Aperte <b>lê</b> e desmonte o relógio.';
    btnLeitura.textContent = 'lê →';
  }
  btnLeitura.addEventListener('click', () => {
    if (passoDaLeitura >= PASSOS_DA_LEITURA.length) { comecaALeitura(); return; }
    const passo = PASSOS_DA_LEITURA[passoDaLeitura];
    destacaParte(passo.parte);
    legLeitura.innerHTML = passo.fala;
    passoDaLeitura++;
    if (passoDaLeitura === PASSOS_DA_LEITURA.length) btnLeitura.textContent = 'de novo ↺';
  });
  comecaALeitura();

  // ---------- tela 9: pratica (65, 125, 600 segundos) ----------
  // o 65 mostra que 1:05 nao e 105; o 600 deixa a casa dos segundos vazia
  const relogioPratica = document.getElementById('relogioPratica');
  let tempo = 0;

  const trilhaSessenta = Animacao.criaTrilha({
    trilha: 'trilhaSessenta',
    legenda: 'legPratica',
    meta: 'metaPratica',
    desafios: [65, 125, 600],
    rotulo: (n) => n + ' s',
    pede: (n) => 'Monte <b>' + n + ' segundos</b> no relógio, com os botões de minuto e de segundo.',
    fim: '<b>Fechou os três!</b>',
  });
  function pintaAPratica() {
    relogioPratica.textContent = formata(tempo);
    document.getElementById('totalPratica').textContent = tempo;
    trilhaSessenta.confere(tempo);
  }
  document.getElementById('btnMaisMinuto').addEventListener('click', () => { tempo = Math.min(tempo + 60, 5999); pintaAPratica(); });
  document.getElementById('btnMaisSegundo').addEventListener('click', () => { tempo = Math.min(tempo + 1, 5999); pintaAPratica(); });
  document.getElementById('btnPraticaLimpar').addEventListener('click', () => { tempo = 0; pintaAPratica(); });
  relogioPratica.textContent = formata(0);
})();

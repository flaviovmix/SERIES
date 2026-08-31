/* binario (deste extra)
   As demonstracoes e a pratica do EX-04, todas na fileira de lampadas de
   lampadas.js. As demonstracoes sao no clique de proposito (o visitante da o
   passo), nao no relogio — so a contagem da tela 4 anda sozinha.
   Sem audio ainda: quando o trio for gravado, o tocador entra no cabecalho e os
   marcadores saem do _telas.md, como nos episodios. Depende de telas.js e lampadas.js. */

(function () {
  // ---------- a voz do vai-um ----------
  // n acabou de ser alcancado somando 1. Quantas lampadas apagaram juntas nesse
  // empurrao e quantos zeros n tem no fim: 7+1=8 (0111 -> 1000) apaga tres de uma vez.
  function casasQueViraram(n) {
    let zerosNoFim = 0;
    while (n > 0 && n % 2 === 0) { zerosNoFim++; n = Math.floor(n / 2); }
    return zerosNoFim;
  }
  function narraOVaiUm(n) {
    if (n === 1) return 'primeira lâmpada acesa: <b>1</b>. E ela já encheu — lâmpada só conta até um';
    const casas = casasQueViraram(n);
    if (casas === 1) return 'a primeira encheu: apaga e acende a vizinha. É o vai-um — chegou no <b>' + n + '</b>';
    if (casas >= 2) return casas + ' lâmpadas apagaram DE UMA VEZ e uma acendeu: vai-um em cascata. Chegou no <b>' + n + '</b>';
    return 'soma 1 na primeira lâmpada: <b>' + n + '</b>';
  }

  // ---------- tela 4: deixa contar (0 ate 31) ----------
  const RITMO_DA_CONTAGEM = 1300;
  const legContagem = document.getElementById('legContagem');
  const btnComecar = document.getElementById('btnContagemComecar');
  const btnPausar = document.getElementById('btnContagemPausar');
  let contagem = 0;
  let relogioContagem = null;

  const abContagem = Animacao.criaLampadas('lampContagem', {
    travado: true,
    aoMudar: (total, bits) => {
      document.getElementById('totalContagem').textContent = total;
      document.getElementById('metaContagem').textContent = 'lâmpadas: ' + bits;
    },
  });
  abContagem.set(0);

  function pintaBotoesDaContagem() {
    btnComecar.textContent = contagem === 0 ? 'começar →' : 'continuar →';
    btnComecar.disabled = !!relogioContagem;
    btnPausar.disabled = !relogioContagem;
  }
  function tiqueDaContagem() {
    contagem++;
    if (contagem > 31) { pausaContagem(); return; }
    abContagem.set(contagem);
    legContagem.innerHTML = (contagem === 31)
      ? 'tudo aceso: <b>31</b>. A fileira encheu — contar o 32 pediria uma sexta lâmpada'
      : narraOVaiUm(contagem);
    if (contagem === 31) pausaContagem();
  }
  function pausaContagem() {
    clearInterval(relogioContagem);
    relogioContagem = null;
    pintaBotoesDaContagem();
  }
  btnComecar.addEventListener('click', () => {
    if (contagem >= 31) contagem = 0;
    relogioContagem = setInterval(tiqueDaContagem, RITMO_DA_CONTAGEM);
    pintaBotoesDaContagem();
  });
  btnPausar.addEventListener('click', pausaContagem);
  document.getElementById('btnContagemLimpar').addEventListener('click', () => {
    pausaContagem();
    contagem = 0;
    abContagem.set(0);
    legContagem.innerHTML = 'Aperte <b>começar</b> e repare: aqui a casa enche com UMA lâmpada só — o vai-um dispara o tempo todo.';
    pintaBotoesDaContagem();
  });
  pintaBotoesDaContagem();

  // ---------- tela 6: a mesma lampada, outra casa (no clique) ----------
  const abDobra = Animacao.criaLampadas('lampDobra', { travado: true });
  const legDobra = document.getElementById('legDobra');
  const btnDobra = document.getElementById('btnDobra');
  const PASSOS_DA_DOBRA = [
    { vale: 2, casa: 3, fala: 'a MESMA lâmpada, uma casa à esquerda: agora vale <b>2</b>' },
    { vale: 4, casa: 2, fala: 'de novo: <b>4</b>. Cada casa vale o dobro da anterior' },
    { vale: 8, casa: 1, fala: '<b>8</b>. No sistema de dez a casa multiplica por dez; aqui, por dois' },
    { vale: 16, casa: 0, fala: '<b>16</b>. Cinco casas: 16, 8, 4, 2, 1' },
    { vale: 13, casa: -1, fala: 'e um número qualquer? <b>13</b> = 8 + 4 + 1: acendem as casas que SOMAM o valor' },
  ];
  let passoDaDobra = 0;

  function comecaADobra() {
    passoDaDobra = 0;
    abDobra.set(1);
    abDobra.destaca(4);
    legDobra.innerHTML = 'Uma lâmpada acesa na casa do <b>1</b>. Aperte <b>dobra</b> e veja o valor mudar de casa.';
    btnDobra.textContent = 'dobra →';
  }
  btnDobra.addEventListener('click', () => {
    if (passoDaDobra >= PASSOS_DA_DOBRA.length) { comecaADobra(); return; }
    const passo = PASSOS_DA_DOBRA[passoDaDobra];
    abDobra.set(passo.vale);
    abDobra.destaca(passo.casa);
    legDobra.innerHTML = passo.fala;
    passoDaDobra++;
    if (passoDaDobra === PASSOS_DA_DOBRA.length) btnDobra.textContent = 'de novo ↺';
  });
  comecaADobra();

  // ---------- tela 8: somar e empurrar ----------
  const COMECO_DA_SOMA = 5;
  const TETO_DA_SOMA = 31;
  const legSoma = document.getElementById('legSoma');
  const btnSomaUm = document.getElementById('btnSomaUm');
  let soma = COMECO_DA_SOMA;

  const abSoma = Animacao.criaLampadas('lampSoma', {
    travado: true,
    aoMudar: (total, bits) => {
      document.getElementById('totalSoma').textContent = total;
      document.getElementById('metaSoma').textContent = 'lâmpadas: ' + bits;
    },
  });

  function narraASoma(n) {
    const conta = '<b>' + (n - 1) + ' + 1 = ' + n + '</b>';
    const casas = casasQueViraram(n);
    if (casas >= 2) return conta + ': o empurrão derrubou a fileira — ' + casas + ' apagaram e UMA acendeu';
    if (casas === 1) return conta + ': a primeira encheu, apaga e sobe. Vai-um';
    return conta + ': coube na primeira lâmpada, ninguém mais se mexeu';
  }
  function comecaASoma() {
    soma = COMECO_DA_SOMA;
    abSoma.set(soma);
    legSoma.innerHTML = 'Cinco: 4 + 1 acesas. Somar é empurrar <b>UM</b> de cada vez — o vai-um faz o resto. Aperte <b>soma 1</b>.';
    btnSomaUm.disabled = false;
  }
  btnSomaUm.addEventListener('click', () => {
    soma++;
    abSoma.set(soma);
    legSoma.innerHTML = narraASoma(soma) + (soma === TETO_DA_SOMA ? ' — e a fileira encheu' : '');
    if (soma === TETO_DA_SOMA) btnSomaUm.disabled = true;
  });
  document.getElementById('btnSomaRecomecar').addEventListener('click', comecaASoma);
  comecaASoma();

  // ---------- tela 9: pratica (5, 10, 21) ----------
  // Trilha da base (animacao/trilha.js) — extraida na 3a copia em 30/08/2026,
  // pela regra do terceiro clone; ep 01-01 e EX-03 consomem a mesma.
  const trilhaBinaria = Animacao.criaTrilha({
    trilha: 'trilhaBinaria',
    legenda: 'legPratica',
    meta: 'metaPratica',
    desafios: [5, 10, 21],
    pede: (n) => 'Clique nas lâmpadas e monte o número <b>' + n + '</b>.',
    fim: '<b>Fechou os três!</b>',
  });
  const abPratica = Animacao.criaLampadas('lampPratica', {
    aoMudar: (total) => {
      document.getElementById('totalPratica').textContent = total;
      trilhaBinaria.confere(total);
    },
  });
  document.getElementById('btnPraticaLimpar').addEventListener('click', () => abPratica.set(0));
})();

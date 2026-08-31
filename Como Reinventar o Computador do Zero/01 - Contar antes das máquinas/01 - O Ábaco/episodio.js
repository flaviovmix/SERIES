/* episodio: O Abaco
   O que e so deste episodio: os marcadores do audio, o suanpan da tela 10 e as seis telas do abaco
   (estrutura, vai-um, duas praticas e duas demonstracoes). Depende de telas.js,
   tocador.js, abaco.js e suanpan.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py a partir
  // do _telas.md do audio v3 (30/08, 17 telas, 16 pedidos): nao editar a mao.
  const MARCADORES = [
    { segundo: 172, tela: 2 },
    { segundo: 290, tela: 3 },
    { segundo: 394, tela: 4 },
    { segundo: 500, tela: 5 },
    { segundo: 601, tela: 6 },
    { segundo: 740, tela: 7 },
    { segundo: 800, tela: 8 },
    { segundo: 887, tela: 9 },
    { segundo: 955, tela: 10 },
    { segundo: 1056, tela: 11 },
    { segundo: 1116, tela: 12 },
    { segundo: 1205, tela: 13 },
    { segundo: 1241, tela: 14 },
    { segundo: 1318, tela: 15 },
    { segundo: 1386, tela: 16 },
    { segundo: 1420, tela: 17 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });

  // ---------- roteiro cronometrado: o abaco e a legenda andam sozinhos ----------
  // cada passo diz o estado das quatro hastes (e), qual delas destacar (h) e o
  // que a legenda conta (t)
  function tocaRoteiro(abaco, legenda, roteiro, intervalo) {
    let i = 0;
    const anda = () => {
      if (i >= roteiro.length) { abaco.destaca(-1); return; }
      const passo = roteiro[i];
      abaco.set(passo.e);
      abaco.destaca(passo.h);
      legenda.innerHTML = '<b>' + passo.t + '</b>';
      i++;
      setTimeout(anda, intervalo);
    };
    anda();
  }

  // ---------- tela 10: como se le o suanpan (o da foto) ----------
  // cada casa e um par [de cima encostadas, de baixo encostadas]; a de cima vale 5
  const legSuanpan = document.getElementById('legSuanpan');
  const metaSuanpan = document.getElementById('metaSuanpan');
  const btnPraticarSuanpan = document.getElementById('btnSuanpanPraticar');
  const desafiosSuanpan = [79, 105];   // o 105 obriga a dezena vazia e o 5 com uma conta so
  let desafioSuanpan = 0;
  let praticandoSuanpan = false;

  function pintaMetaSuanpan(total) {
    if (!praticandoSuanpan) { metaSuanpan.textContent = ''; metaSuanpan.className = 'meta'; return; }
    if (desafioSuanpan >= desafiosSuanpan.length) {
      metaSuanpan.textContent = '🎉 fechou os dois';
      metaSuanpan.className = 'meta win';
    } else if (total === desafiosSuanpan[desafioSuanpan]) {
      desafioSuanpan++;
      metaSuanpan.textContent = desafioSuanpan < desafiosSuanpan.length ? '✔ agora o ' + desafiosSuanpan[desafioSuanpan] : '🎉 fechou os dois';
      metaSuanpan.className = 'meta win';
    } else {
      metaSuanpan.textContent = 'monte o ' + desafiosSuanpan[desafioSuanpan];
      metaSuanpan.className = 'meta';
    }
  }

  const suanpan = Animacao.criaSuanpan('suanpan', {
    aoMudar: (total) => {
      document.getElementById('totalSuanpan').textContent = total;
      pintaMetaSuanpan(total);
      pintaBotoesDaContagem();   // o rotulo comecar/continuar segue o total
    },
  });

  // praticar: as contas passam a responder a mao, com dois numeros pra montar
  btnPraticarSuanpan.addEventListener('click', () => {
    if (relogioSuanpan) pausa();
    praticandoSuanpan = !praticandoSuanpan;
    suanpan.libera(praticandoSuanpan);
    btnPraticarSuanpan.classList.toggle('cheio', praticandoSuanpan);
    btnPraticarSuanpan.textContent = praticandoSuanpan ? 'parar de praticar' : 'praticar';
    if (praticandoSuanpan) {
      desafioSuanpan = 0;
      suanpan.set([[0, 0], [0, 0], [0, 0], [0, 0]]);
      legSuanpan.innerHTML = 'Sua vez: clique nas contas. Encostada na barra conta, em cima vale <b>5</b>, embaixo vale <b>1</b>.';
    } else {
      legSuanpan.innerHTML = 'Conta encostada na barra conta. Em cima vale <b>5</b>, embaixo vale <b>1</b>. Aperte <b>começar</b> e veja as contas encherem.';
      pintaMetaSuanpan(suanpan.total());
    }
  });
  // virar de lado: o desenho em pe e o da foto; deitado e o mesmo aparelho na posicao do
  // abaco simples, que ele acha mais facil de ler. So muda a classe: estado e contagem ficam
  const btnVirarSuanpan = document.getElementById('btnSuanpanVirar');
  btnVirarSuanpan.addEventListener('click', () => {
    const deitado = document.getElementById('suanpan').classList.toggle('suanpan--deitado');
    btnVirarSuanpan.setAttribute('aria-pressed', String(deitado));
    btnVirarSuanpan.textContent = deitado ? 'pôr em pé' : 'virar de lado';
  });
  document.getElementById('btnSuanpanLimpar').addEventListener('click', () => {
    zeraContagem();
    suanpan.set([[0, 0], [0, 0], [0, 0], [0, 0]]);
    if (!praticandoSuanpan) legSuanpan.innerHTML = 'Conta encostada na barra conta. Em cima vale <b>5</b>, embaixo vale <b>1</b>. Aperte <b>começar</b> e veja as contas encherem.';
  });

  // a contagem: enche as contas uma a uma, a cada 0,9s, ate "pausar". "Continuar"
  // parte de onde parou (inclusive do que a mao montou no praticar) e "voltar"
  // desfaz um passo. Cada casa segura ate 15 (duas de cima e cinco de baixo);
  // quando passa disso, 10 sobe como uma conta de baixo na casa seguinte. E o
  // vai-um do suanpan
  const btnVoltar = document.getElementById('btnSuanpanVoltar');
  const btnPausar = document.getElementById('btnSuanpanPausar');
  const btnContinuar = document.getElementById('btnSuanpanContinuar');
  const NOMES_DAS_CASAS = ['milhar', 'centena', 'dezena', 'unidade'];
  const TETO_DA_CASA = 15;
  const RITMO_DA_CONTAGEM = 900;
  let colunas = [0, 0, 0, 0];   // o valor guardado em cada casa, de 0 a 15
  let passosDados = [];          // as colunas antes de cada tique, pro voltar
  let relogioSuanpan = null;

  function contasDaColuna(v) {
    const cima = v >= 10 ? 2 : v >= 5 ? 1 : 0;
    return [cima, v - 5 * cima];
  }
  function legendaDaContagem(n, u, subiuDe) {
    if (subiuDe >= 0) return n + ': a ' + NOMES_DAS_CASAS[subiuDe] + ' passou de 15, entao 10 (as duas de cima) sobe como <b>uma conta na ' + NOMES_DAS_CASAS[subiuDe - 1] + '</b>';
    if (u === 5) return '5: em vez de cinco de baixo, <b>uma de cima</b>. Ela vale 5';
    if (u === 10) return '10: as <b>duas de cima</b> encostadas, 5 + 5';
    if (u === 15) return '15: 5 + 5 + 5. A casa <b>lotou</b>: a proxima sobe';
    return String(n);
  }
  function pintaBotoesDaContagem() {
    const contando = relogioSuanpan !== null;
    btnPausar.disabled = !contando;
    btnContinuar.disabled = contando;
    btnVoltar.disabled = contando || passosDados.length === 0;
    // em zero nao ha o que continuar: e comecar
    btnContinuar.textContent = suanpan.total() === 0 ? 'começar →' : 'continuar →';
  }
  function mostraColunas(subiuDe) {
    suanpan.set(colunas.map(contasDaColuna));
    suanpan.destaca(subiuDe >= 0 ? subiuDe - 1 : 3);
    legSuanpan.innerHTML = legendaDaContagem(suanpan.total(), colunas[3], subiuDe);
  }
  function tiqueDaContagem() {
    passosDados.push([...colunas]);
    colunas[3] += 1;
    let subiuDe = -1;
    for (let i = 3; i > 0; i--) {
      if (colunas[i] <= TETO_DA_CASA) continue;
      colunas[i] -= 10;
      colunas[i - 1] += 1;
      subiuDe = i;
    }
    mostraColunas(subiuDe);
    if (colunas[0] >= TETO_DA_CASA) pausa();   // acabou o suanpan
  }
  function pausa() {
    clearInterval(relogioSuanpan);
    relogioSuanpan = null;
    suanpan.destaca(-1);
    pintaBotoesDaContagem();
  }
  function continua() {
    if (praticandoSuanpan) {
      // parte do que a mao montou: le as casas do proprio suanpan
      colunas = suanpan.valores();
      passosDados = [];
      btnPraticarSuanpan.click();
    }
    relogioSuanpan = setInterval(tiqueDaContagem, RITMO_DA_CONTAGEM);
    pintaBotoesDaContagem();
  }
  function volta() {
    if (!passosDados.length) return;
    colunas = passosDados.pop();
    mostraColunas(-1);
    suanpan.destaca(-1);
    pintaBotoesDaContagem();
  }
  function zeraContagem() {
    if (relogioSuanpan) pausa();
    colunas = [0, 0, 0, 0];
    passosDados = [];
    pintaBotoesDaContagem();
  }
  btnContinuar.addEventListener('click', continua);
  btnPausar.addEventListener('click', pausa);
  btnVoltar.addEventListener('click', volta);
  pintaBotoesDaContagem();

  // ---------- tela 11: cada haste vale 10x a de baixo ----------
  const abEstrutura = Animacao.criaAbaco('abacoEstrutura', { travado: true });
  abEstrutura.set([0, 0, 0, 1]);
  document.getElementById('btnEstrutura').addEventListener('click', () => {
    tocaRoteiro(abEstrutura, document.getElementById('legEstrutura'), [
      { e: [0, 0, 0, 1], h: 3, t: '1 conta na UNIDADE vale 1' },
      { e: [0, 0, 1, 0], h: 2, t: 'a mesma conta na DEZENA vale 10' },
      { e: [0, 1, 0, 0], h: 1, t: 'na CENTENA vale 100' },
      { e: [1, 0, 0, 0], h: 0, t: 'no MILHAR vale 1000. Mesma pedra, casa diferente' },
      { e: [1, 1, 1, 1], h: -1, t: 'uma em cada casa: 1111. Esse e o valor posicional' },
    ], 1700);
  });

  // ---------- tela 12: o vai-um ----------
  const abVaium = Animacao.criaAbaco('abacoVaium', { travado: true });
  abVaium.set([0, 0, 0, 9]);
  document.getElementById('btnVaium').addEventListener('click', () => {
    tocaRoteiro(abVaium, document.getElementById('legVaium'), [
      { e: [0, 0, 0, 9], h: 3, t: '9 contas na unidade: o fio esta cheio' },
      { e: [0, 0, 0, 9], h: 3, t: 'chega mais 1... e agora? Nao cabe' },
      { e: [0, 0, 0, 0], h: 3, t: 'as 10 unidades saem todas do fio...' },
      { e: [0, 0, 1, 0], h: 2, t: '...e viram UMA conta na dezena. 9 + 1 = 10. Esse e o vai-um' },
    ], 1900);
  });

  // ---------- tela 13: pratica 1 (7, 23, 105) ----------
  // trilha de desafios da base (animacao/trilha.js) — nasceu aqui e foi extraida
  // em 30/08/2026, na terceira copia (EX-03 -> EX-04), pela regra do terceiro clone
  const trilha1 = Animacao.criaTrilha({
    trilha: 'trilha1',
    legenda: 'legPratica1',
    meta: 'metaPratica1',
    desafios: [7, 23, 105],
    pede: (n) => 'Pause o áudio e represente o número <b>' + n + '</b>.',
    fim: '<b>Fechou os tres! Pode voltar o audio.</b>',
  });
  const abPratica1 = Animacao.criaAbaco('abacoPratica1', {
    aoMudar: (total) => {
      document.getElementById('totalPratica1').textContent = total;
      trilha1.confere(total);
    },
  });
  document.getElementById('limpar1').addEventListener('click', () => abPratica1.set([0, 0, 0, 0]));

  // ---------- demonstracao passo a passo (telas 14 e 15) ----------
  // cada passo diz o estado das quatro hastes, qual delas destacar e o que a
  // legenda conta; o contador "passo N de M" sai do proprio roteiro
  function montaDemo(ids, passos) {
    const total = document.getElementById(ids.total);
    const legenda = document.getElementById(ids.legenda);
    const contador = document.getElementById(ids.contador);
    const btnPasso = document.getElementById(ids.passo);
    const abertura = legenda.innerHTML;
    const abaco = Animacao.criaAbaco(ids.abaco, { travado: true, aoMudar: (t) => { total.textContent = t; } });
    let atual = 0;

    function pintaContador() { contador.textContent = 'passo ' + atual + ' de ' + passos.length; }
    function daPasso() {
      if (atual >= passos.length) return;
      const p = passos[atual];
      abaco.set(p.e);
      abaco.destaca(p.h);
      legenda.innerHTML = p.t;
      atual++;
      pintaContador();
      btnPasso.disabled = atual === passos.length;
    }
    function reinicia() {
      atual = 0;
      abaco.set([0, 0, 0, 0]);
      abaco.destaca(-1);
      legenda.innerHTML = abertura;
      pintaContador();
      btnPasso.disabled = false;
    }

    btnPasso.addEventListener('click', daPasso);
    document.getElementById(ids.reinicia).addEventListener('click', reinicia);
    pintaContador();
  }

  // tela 14: 2 x 24, sem transporte
  montaDemo(
    { abaco: 'abacoDemo', total: 'totalDemo', legenda: 'legDemo', contador: 'passoDemo', passo: 'btnPasso', reinicia: 'btnReiniciaDemo' },
    [
      { e: [0, 0, 2, 4], h: -1, t: 'primeiro prato: <b>24</b> no fio (2 dezenas, 4 unidades)' },
      { e: [0, 0, 3, 4], h: 2, t: 'segundo prato, comecando pelas dezenas: +1 dezena...' },
      { e: [0, 0, 4, 4], h: 2, t: '...+1 dezena. As dezenas do segundo 24 entraram: <b>44</b>' },
      { e: [0, 0, 4, 8], h: 3, t: 'agora as 4 unidades: <b>48</b>. Dois pratos de 24, conta fechada' },
    ]
  );

  // tela 15: 3 x 24, onde a haste enche e o vai-um aparece
  montaDemo(
    { abaco: 'abacoDemo3', total: 'totalDemo3', legenda: 'legDemo3', contador: 'passoDemo3', passo: 'btnPasso3', reinicia: 'btnReiniciaDemo3' },
    [
      { e: [0, 0, 2, 4], h: -1, t: 'primeiro prato: <b>24</b> no fio' },
      { e: [0, 0, 4, 8], h: -1, t: 'segundo prato, como na tela anterior: <b>48</b>' },
      { e: [0, 0, 4, 9], h: 3, t: 'terceiro prato, pelas unidades: +1 e a haste chega em <b>9</b>. Está cheia' },
      { e: [0, 0, 5, 0], h: 2, t: 'a próxima unidade não cabe no fio: ela sobe e vira <b>1 dezena</b>. É o vai-um: <b>50</b>' },
      { e: [0, 0, 5, 2], h: 3, t: 'faltavam 2 das 4 unidades do terceiro prato: <b>52</b>' },
      { e: [0, 0, 7, 2], h: 2, t: 'e as 2 dezenas dele: <b>72</b>. Três pratos de 24, com um transporte no meio' },
    ]
  );

  // ---------- tela 16: pratica 2 (72) ----------
  const metaPratica2 = document.getElementById('metaPratica2');
  const abPratica2 = Animacao.criaAbaco('abacoPratica2', {
    aoMudar: (total) => {
      document.getElementById('totalPratica2').textContent = total;
      if (total === 72) {
        metaPratica2.textContent = '🎉 72! conta fechada';
        metaPratica2.className = 'meta win';
        document.getElementById('legPratica2').innerHTML = '<b>Mandou bem. Pode voltar o audio e apertar o Proximo.</b>';
      } else {
        metaPratica2.textContent = 'meta: 72';
        metaPratica2.className = 'meta';
      }
    },
  });
  document.getElementById('limpar2').addEventListener('click', () => abPratica2.set([0, 0, 0, 0]));
})();

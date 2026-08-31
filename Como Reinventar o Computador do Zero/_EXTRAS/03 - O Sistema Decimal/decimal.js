/* decimal (deste extra)
   As demonstracoes e a pratica do EX-03: tudo roda no abaco decimal de abaco.js
   (copiado do ep 01-01; segunda copia, a base ganha uma fabrica se vier a terceira).
   Sem audio ainda: quando o trio for gravado, o tocador entra no cabecalho e os
   marcadores saem do _telas.md, como nos episodios. Depende de telas.js e abaco.js. */

(function () {
  // ---------- roteiro cronometrado: o abaco e a legenda andam sozinhos ----------
  // cada passo diz o estado das quatro hastes (e), qual delas destacar (h) e o
  // que a legenda conta (t). Mesmo desenho do ep 01-01.
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

  // ---------- tela 4: a posicao manda no valor ----------
  const abPosicao = Animacao.criaAbaco('abacoPosicao', { travado: true });
  abPosicao.set([0, 0, 0, 3]);
  document.getElementById('btnPosicao').addEventListener('click', () => {
    tocaRoteiro(abPosicao, document.getElementById('legPosicao'), [
      { e: [0, 0, 0, 3], h: 3, t: '3 contas na UNIDADE: valem 3' },
      { e: [0, 0, 3, 0], h: 2, t: 'as MESMAS 3 contas, uma casa acima: valem 30' },
      { e: [0, 3, 0, 0], h: 1, t: 'mais uma casa: 300' },
      { e: [3, 0, 0, 0], h: 0, t: 'no milhar: 3000. A pedra não mudou, a CASA mudou' },
      { e: [0, 3, 4, 7], h: -1, t: '347 é só isso: 3 centenas, 4 dezenas e 7 unidades' },
    ], 2000);
  });

  // ---------- tela 6: contar sem parar (o vai-um aparece sozinho) ----------
  const RITMO_DA_CONTAGEM = 900;
  const legContagem = document.getElementById('legContagem');
  const btnComecar = document.getElementById('btnContagemComecar');
  const btnPausar = document.getElementById('btnContagemPausar');
  let contagem = 0;
  let relogioContagem = null;

  function digitos(n) {
    return [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
  }
  const abContagem = Animacao.criaAbaco('abacoContagem', {
    travado: true,
    aoMudar: (total) => { document.getElementById('totalContagem').textContent = total; },
  });

  function legendaDaContagem(n) {
    if (n > 0 && n % 1000 === 0) return 'dez centenas encheram: sobe UMA conta pro milhar';
    if (n > 0 && n % 100 === 0) return 'dez dezenas encheram: sobe UMA conta pra centena';
    if (n > 0 && n % 10 === 0) return 'a unidade encheu com 9 e veio mais um: as contas descem e sobe UMA na dezena. É o vai-um';
    if (n % 10 === 9) return 'a unidade está cheia: 9 contas. O próximo não cabe...';
    return 'contando: cada aperto do relógio soma 1 na unidade';
  }
  function pintaBotoesDaContagem() {
    btnComecar.textContent = relogioContagem ? 'continuar →' : (contagem === 0 ? 'começar →' : 'continuar →');
    btnComecar.disabled = !!relogioContagem;
    btnPausar.disabled = !relogioContagem;
  }
  function tiqueDaContagem() {
    contagem++;
    if (contagem > 9999) { pausaContagem(); return; }
    abContagem.set(digitos(contagem));
    legContagem.innerHTML = legendaDaContagem(contagem);
  }
  function pausaContagem() {
    clearInterval(relogioContagem);
    relogioContagem = null;
    pintaBotoesDaContagem();
  }
  btnComecar.addEventListener('click', () => {
    relogioContagem = setInterval(tiqueDaContagem, RITMO_DA_CONTAGEM);
    pintaBotoesDaContagem();
  });
  btnPausar.addEventListener('click', pausaContagem);
  document.getElementById('btnContagemLimpar').addEventListener('click', () => {
    pausaContagem();
    contagem = 0;
    abContagem.set([0, 0, 0, 0]);
    legContagem.innerHTML = 'Aperte <b>começar</b> e deixe contar: repare no que acontece toda vez que uma casa enche.';
    pintaBotoesDaContagem();
  });
  pintaBotoesDaContagem();

  // ---------- tela 8: o zero segura o lugar ----------
  const abZero = Animacao.criaAbaco('abacoZero', { travado: true });
  abZero.set([0, 3, 0, 5]);
  document.getElementById('btnZero').addEventListener('click', () => {
    tocaRoteiro(abZero, document.getElementById('legZero'), [
      { e: [0, 3, 0, 5], h: -1, t: '305: três centenas, dezena NENHUMA, cinco unidades' },
      { e: [0, 0, 3, 5], h: 2, t: 'sem guardar o lugar vazio, virava 35: outra quantia' },
      { e: [0, 3, 0, 5], h: 2, t: 'a haste vazia também é informação. É isso que o algarismo 0 escreve' },
    ], 2400);
  });

  // ---------- tela 9: pratica (47, 90, 305) ----------
  // o 90 obriga a unidade vazia; o 305, a dezena vazia. Trilha da base (animacao/trilha.js).
  const trilhaDecimal = Animacao.criaTrilha({
    trilha: 'trilhaDecimal',
    legenda: 'legPratica',
    meta: 'metaPratica',
    desafios: [47, 90, 305],
    pede: (n) => 'Clique nas contas e represente o número <b>' + n + '</b>.',
    fim: '<b>Fechou os três!</b>',
  });
  const abPratica = Animacao.criaAbaco('abacoPratica', {
    aoMudar: (total) => {
      document.getElementById('totalPratica').textContent = total;
      trilhaDecimal.confere(total);
    },
  });
  document.getElementById('btnPraticaLimpar').addEventListener('click', () => abPratica.set([0, 0, 0, 0]));
})();

/* risco (deste episodio)
   A tela do risco: o jeito mais velho de guardar quantidade, um traco por bicho,
   desenhado de verdade em SVG. Depende de risco.css e dos ids da tela 2 no HTML.
   Nao depende de outro script.

   O assunto da tela e o que muda quando o corte de cinco entra: sem ele voce conta
   um por um, com ele voce le de relance. E o mesmo agrupamento da conta que vale 5
   do suanpan. */

(function () {
  const svg = document.getElementById('riscos');
  const legenda = document.getElementById('legRisco');
  const numero = document.getElementById('riscoNum');
  const meta = document.getElementById('riscoMeta');
  const btnUm = document.getElementById('btnRisco');
  const btnCinco = document.getElementById('btnRisco5');
  const btnCorte = document.getElementById('btnCorte');
  const btnLimpar = document.getElementById('btnRiscoLimpar');

  const LARGURA = 900;        // o viewBox do svg
  const RISCO_MAX = 30;       // o que cabe no viewBox
  const PASSO = 22, GAP_GRUPO = 40, MARGEM = 26, PASSO_SOLTO = 28;
  let riscos = 0;
  let corte = true;

  // tremor deterministico: o risco 7 tem sempre a mesma torta. Sem isso a
  // contagem inteira treme a cada redesenho, e a tela fica nervosa.
  function tremor(a, b) {
    const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return (x - Math.floor(x)) * 2 - 1;
  }

  function xDoRisco(i) {
    if (!corte) return MARGEM + i * PASSO_SOLTO;
    const grupo = Math.floor(i / 5), j = i % 5;
    return MARGEM + grupo * (5 * PASSO + GAP_GRUPO) + j * PASSO;
  }

  function risca(pai, d, classe) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    el.setAttribute('d', d);
    el.setAttribute('class', classe);
    pai.appendChild(el);
    return el;
  }

  // o desenho fica no meio do painel em vez de encostado a esquerda: cresce pros
  // dois lados conforme a conta anda
  function larguraUsada() {
    if (!riscos) return 0;
    let fim = xDoRisco(riscos - 1);
    if (corte && riscos >= 5) {
      const grupos = Math.floor(riscos / 5);
      fim = Math.max(fim, xDoRisco((grupos - 1) * 5 + 4) + 15);
    }
    return fim + MARGEM;
  }

  // o traco novo se desenha, em vez de aparecer pronto
  function anima(el) {
    const comprimento = el.getTotalLength();
    el.style.strokeDasharray = comprimento;
    el.style.strokeDashoffset = comprimento;
    el.getBoundingClientRect();
    el.style.transition = 'stroke-dashoffset .4s var(--ease)';
    el.style.strokeDashoffset = 0;
  }

  function desenhaTraco(palco, i) {
    const x = xDoRisco(i);
    const topo = 34 + tremor(i, 1) * 7;
    const base = 176 + tremor(i, 2) * 9;
    const inclinacao = tremor(i, 3) * 9;
    return risca(palco,
      'M ' + (x - inclinacao).toFixed(1) + ' ' + topo.toFixed(1) +
      ' Q ' + (x + tremor(i, 4) * 6).toFixed(1) + ' 105 ' +
      (x + inclinacao).toFixed(1) + ' ' + base.toFixed(1), 'risco');
  }

  function desenhaCorte(palco, g) {
    const x0 = xDoRisco(g * 5) - 15, x1 = xDoRisco(g * 5 + 4) + 15;
    const y = 104 + tremor(g, 9) * 5;
    return risca(palco,
      'M ' + x0.toFixed(1) + ' ' + (y + tremor(g, 10) * 5).toFixed(1) +
      ' Q ' + ((x0 + x1) / 2).toFixed(1) + ' ' + (y + tremor(g, 11) * 7).toFixed(1) +
      ' ' + x1.toFixed(1) + ' ' + (y + tremor(g, 12) * 5).toFixed(1),
      'risco risco--corte');
  }

  function desenha(animaUltimo) {
    svg.innerHTML = '';
    const palco = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    palco.setAttribute('transform', 'translate(' + ((LARGURA - larguraUsada()) / 2).toFixed(1) + ',0)');
    svg.appendChild(palco);
    for (let i = 0; i < riscos; i++) {
      const el = desenhaTraco(palco, i);
      if (animaUltimo && i === riscos - 1) anima(el);
    }
    if (!corte) return;
    const grupos = Math.floor(riscos / 5);
    for (let g = 0; g < grupos; g++) {
      const el = desenhaCorte(palco, g);
      if (animaUltimo && riscos % 5 === 0 && g === grupos - 1) anima(el);
    }
  }

  function textoDaMeta() {
    if (!riscos) return 'nenhum risco ainda';
    if (!corte) return 'sem grupo · só contando um por um';
    const grupos = Math.floor(riscos / 5), soltos = riscos % 5;
    const partes = Array(grupos).fill('5');
    if (soltos) partes.push(String(soltos));
    return partes.join(' + ') + ' · leitura de relance';
  }

  function textoDaLegenda() {
    if (!riscos) return 'Clique em <b>passou um</b>: cada bicho que sai do curral vira um risco.';
    if (riscos < 5) return 'Um risco por bicho. Não precisa saber contar — precisa só não errar a mão.';
    if (!corte) return 'Sem o corte, saber quantos são exige começar do primeiro risco toda vez.';
    if (riscos % 5 === 0) return 'O quinto <b>fecha o grupo</b>. Agora o total se lê sem contar risco por risco.';
    return 'Grupos fechados de cinco, mais os soltos: a leitura fica rápida.';
  }

  function conta() {
    numero.textContent = riscos;
    meta.textContent = textoDaMeta();
    legenda.innerHTML = textoDaLegenda();
    btnUm.disabled = riscos >= RISCO_MAX;
  }

  function poeRiscos(n, comAnimacao) {
    riscos = Math.max(0, Math.min(RISCO_MAX, n));
    desenha(comAnimacao);
    conta();
  }

  btnUm.addEventListener('click', () => poeRiscos(riscos + 1, true));
  btnCinco.addEventListener('click', () => poeRiscos(riscos + 5, true));
  btnLimpar.addEventListener('click', () => poeRiscos(0, false));
  btnCorte.addEventListener('click', () => {
    corte = !corte;
    btnCorte.textContent = corte ? 'tirar o corte de 5' : 'cortar de 5 em 5';
    btnCorte.classList.toggle('cheio', !corte);
    poeRiscos(riscos, false);
  });
  poeRiscos(0, false);
})();

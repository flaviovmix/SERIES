/* episodio 11.01 A escala: duas praticas.
   1. A reta das leis de escala (tela 7): o ouvinte arrasta o tamanho do modelo e
      ve o erro previsto descer numa reta. A curva e a do paper de janeiro de 2020,
      L(N) = (Nc / N) ^ a, com Nc = 8,8 x 10^13 e a = 0,076 (Kaplan e outros, 2020).
      Nos dois eixos a escala e logaritmica: e por isso que a curva vira reta.
   2. O exemplo dentro da pergunta (tela 9): tres pares seguem uma regra escondida
      e o ouvinte completa o quarto, que e o que o GPT-3 passou a fazer.
   Nao depende de telas.js; so do painel.css da base. */

(function () {
  'use strict';

  /* ---------- 1. a reta ---------- */

  const NC = 8.8e13;
  const ALFA = 0.076;
  const LOG_MIN = 8;    // 100 milhoes de parametros
  const LOG_MAX = 12;   // 1 trilhao
  const PARADAS = [
    { n: 1.17e8, nome: 'GPT-1, 2018' },
    { n: 3.4e8,  nome: 'BERT grande, 2018' },
    { n: 1.5e9,  nome: 'GPT-2, 2019' },
    { n: 1.75e11, nome: 'GPT-3, 2020' },
  ];

  function perda(n) { return Math.pow(NC / n, ALFA); }

  function nomeDoNumero(n) {
    // "1,5 bilhão", "175 bilhões", "1 trilhão": uma casa so abaixo de dez, sem ",0"
    const curto = (v) => (v >= 10 ? String(Math.round(v)) : v.toFixed(1).replace('.', ',').replace(/,0$/, ''));
    if (n >= 1e12) return curto(n / 1e12) + ' trilhão';
    if (n >= 1e9) return curto(n / 1e9) + (n / 1e9 >= 2 ? ' bilhões' : ' bilhão');
    return Math.round(n / 1e6) + ' milhões';
  }

  function montaReta() {
    const miolo = document.getElementById('mioloReta');
    if (!miolo) return;
    const legenda = document.getElementById('legReta');
    const num = document.getElementById('totalReta');
    const meta = document.getElementById('metaReta');
    const botoes = document.getElementById('botoesReta');

    // O desenho usa a largura REAL do painel, uma unidade = um pixel: assim a letra dos
    // eixos fica com 11px no telefone e no desktop (no viewBox fixo de 640 ela encolhia
    // pra 6px no telefone), e o controle deslizante corre exatamente embaixo da reta, do
    // primeiro ao ultimo tamanho. Redesenha quando a largura muda (11/09, print dele).
    miolo.innerHTML =
      '<div class="reta">' +
        '<svg role="img" aria-label="Gráfico: erro previsto contra tamanho do modelo, os dois em escala logarítmica; a curva é uma reta descendo"></svg>' +
        '<input type="range" id="faixaReta" min="0" max="1000" value="0" aria-label="tamanho do modelo">' +
      '</div>';
    const svg = miolo.querySelector('svg');
    const faixa = document.getElementById('faixaReta');
    const RAIO_DO_BOTAO = 10;       // metade do botao redondo do controle deslizante
    const ROTULOS = { 8: '100 mi', 9: '1 bi', 10: '10 bi', 11: '100 bi', 12: '1 tri' };
    let posicao = null;             // as escalas x e y do desenho atual; null antes da 1a medida
    let larguraDesenhada = 0;
    let logAtual = Math.log10(PARADAS[0].n);

    function desenha() {
      const W = Math.round(miolo.clientWidth);
      if (!W || W === larguraDesenhada) return;   // aba escondida mede zero: espera aparecer
      larguraDesenhada = W;
      const H = W < 520 ? 220 : 300;
      const ML = 38, MR = 14, MT = 26, MB = 42;
      const LY_MIN = Math.log10(perda(Math.pow(10, LOG_MAX))) - 0.02;
      const LY_MAX = Math.log10(perda(Math.pow(10, LOG_MIN))) + 0.02;
      const x = (logN) => ML + (logN - LOG_MIN) / (LOG_MAX - LOG_MIN) * (W - ML - MR);
      const y = (l) => MT + (LY_MAX - Math.log10(l)) / (LY_MAX - LY_MIN) * (H - MT - MB);
      posicao = { x, y };

      let partes = '';
      for (let e = LOG_MIN; e <= LOG_MAX; e++) {
        const ancora = e === LOG_MIN ? 'start' : e === LOG_MAX ? 'end' : 'middle';
        partes += `<line class="grade" x1="${x(e)}" y1="${MT}" x2="${x(e)}" y2="${H - MB}"/>` +
                  `<text x="${x(e)}" y="${H - MB + 16}" text-anchor="${ancora}">${ROTULOS[e]}</text>`;
      }
      for (const l of [1.5, 2, 2.5, 3]) {
        if (Math.log10(l) < LY_MIN || Math.log10(l) > LY_MAX) continue;
        partes += `<line class="grade" x1="${ML}" y1="${y(l)}" x2="${W - MR}" y2="${y(l)}"/>` +
                  `<text x="${ML - 6}" y="${y(l) + 4}" text-anchor="end">${String(l).replace('.', ',')}</text>`;
      }
      partes += `<line class="eixo" x1="${ML}" y1="${H - MB}" x2="${W - MR}" y2="${H - MB}"/>` +
                `<line class="eixo" x1="${ML}" y1="${MT}" x2="${ML}" y2="${H - MB}"/>` +
                `<line class="linha" x1="${x(LOG_MIN)}" y1="${y(perda(Math.pow(10, LOG_MIN)))}" x2="${x(LOG_MAX)}" y2="${y(perda(Math.pow(10, LOG_MAX)))}"/>`;
      for (const p of PARADAS) {
        partes += `<circle class="parada" cx="${x(Math.log10(p.n))}" cy="${y(perda(p.n))}" r="4"/>`;
      }
      // os dois titulos dos eixos moram no canto direito: a reta comeca no alto da
      // esquerda, e ali o ponto cobria o titulo
      partes += `<circle class="ponto" r="${W < 520 ? 8 : 9}" cx="${ML}" cy="${MT}"/>` +
                `<text x="${W - MR}" y="${MT - 10}" text-anchor="end">erro previsto (escala log)</text>` +
                `<text x="${W - MR}" y="${H - 4}" text-anchor="end">parâmetros do modelo (escala log)</text>`;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.innerHTML = partes;
      faixa.style.marginLeft = (ML - RAIO_DO_BOTAO) + 'px';
      faixa.style.width = (W - ML - MR + 2 * RAIO_DO_BOTAO) + 'px';
      mostra(logAtual);
    }

    function mostra(logN) {
      logAtual = logN;
      const n = Math.pow(10, logN);
      const l = perda(n);
      if (posicao) {
        const ponto = svg.querySelector('.ponto');
        ponto.setAttribute('cx', posicao.x(logN));
        ponto.setAttribute('cy', posicao.y(l));
      }
      num.textContent = l.toFixed(2).replace('.', ',');
      let perto = null;
      for (const p of PARADAS) {
        if (Math.abs(Math.log10(p.n) - logN) < 0.12) perto = p;
      }
      // duas linhas a direita do numero: o tamanho em cima, o modelo embaixo
      meta.innerHTML = '<span class="reta__tamanho">' + nomeDoNumero(n) + ' de parâmetros</span>' +
        (perto ? '<span class="reta__modelo">' + perto.nome + '</span>' : '');
      legenda.innerHTML = perto
        ? 'Nesse tamanho a reta bate com o <b>' + perto.nome + '</b>. Continue arrastando: ela não para.'
        : 'Arraste. Quanto maior o modelo, <b>menor o erro</b>, e a queda é uma reta nesta escala.';
    }

    const valorDaFaixa = (logN) => Math.round((logN - LOG_MIN) / (LOG_MAX - LOG_MIN) * 1000);
    faixa.addEventListener('input', () => mostra(LOG_MIN + (faixa.value / 1000) * (LOG_MAX - LOG_MIN)));

    for (const p of PARADAS) {
      const b = document.createElement('button');
      b.className = 'btn-mini';
      b.textContent = p.nome.split(',')[0];
      b.addEventListener('click', () => {
        faixa.value = valorDaFaixa(Math.log10(p.n));
        mostra(Math.log10(p.n));
      });
      botoes.appendChild(b);
    }

    faixa.value = valorDaFaixa(logAtual);
    mostra(logAtual);
    desenha();
    if ('ResizeObserver' in window) new ResizeObserver(desenha).observe(miolo);
    else window.addEventListener('resize', desenha);
  }

  /* ---------- 2. o exemplo dentro da pergunta ---------- */

  const REGRAS = [
    { pares: [['gato', 'gatinho'], ['casa', 'casinha'], ['livro', 'livrinho']], alvo: ['pato', 'patinho'] },
    { pares: [['dog', 'cão'], ['house', 'casa'], ['book', 'livro']], alvo: ['water', 'água'] },
    { pares: [['3', '6'], ['10', '20'], ['7', '14']], alvo: ['21', '42'] },
    { pares: [['amor', 'roma'], ['lua', 'aul'], ['sol', 'los']], alvo: ['rato', 'otar'] },
  ];

  function limpaTexto(s) {
    return String(s || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function montaExemplo() {
    const miolo = document.getElementById('mioloExemplo');
    if (!miolo) return;
    const legenda = document.getElementById('legExemplo');
    const num = document.getElementById('totalExemplo');
    const meta = document.getElementById('metaExemplo');
    const btnOutra = document.getElementById('outraRegra');
    const btnMostra = document.getElementById('mostraResposta');
    const btnLimpar = document.getElementById('limparExemplo');

    let atual = 0;
    const feitas = new Set();

    function desenha() {
      const r = REGRAS[atual];
      miolo.innerHTML = '<div class="exemplo">' +
        r.pares.map(([a, b]) => `<div class="par"><span>${a}</span><span class="seta">→</span><span>${b}</span></div>`).join('') +
        `<div class="par alvo" id="parAlvo"><span>${r.alvo[0]}</span><span class="seta">→</span><input id="respostaExemplo" autocomplete="off" aria-label="complete o quarto"></div>` +
        '</div>';
      legenda.innerHTML = 'Três exemplos seguem uma regra que ninguém escreveu. <b>Complete o quarto.</b>';
      meta.textContent = 'regra ' + (atual + 1) + ' de ' + REGRAS.length;
      const campo = document.getElementById('respostaExemplo');
      campo.addEventListener('keydown', (e) => { if (e.key === 'Enter') confere(); });
      campo.addEventListener('input', () => {
        if (limpaTexto(campo.value) === limpaTexto(r.alvo[1])) confere();
      });
      campo.focus({ preventScroll: true });
    }

    function confere() {
      const r = REGRAS[atual];
      const campo = document.getElementById('respostaExemplo');
      const par = document.getElementById('parAlvo');
      const certo = limpaTexto(campo.value) === limpaTexto(r.alvo[1]);
      par.classList.toggle('certo', certo);
      par.classList.toggle('errado', !certo && campo.value.length > 0);
      if (certo) {
        feitas.add(atual);
        num.textContent = feitas.size;
        legenda.innerHTML = '<b>Você inferiu a regra sem ninguém dizer qual era.</b> É isso que o GPT-3 passou a fazer: ler os exemplos e seguir. Ele não muda por dentro; só lê.';
        legenda.classList.add('ok');
        if (feitas.size === REGRAS.length) meta.classList.add('win');
      } else if (campo.value.length) {
        legenda.innerHTML = 'Ainda não. Olhe o que muda de um lado pro outro nos três de cima.';
        legenda.classList.remove('ok');
      }
    }

    btnOutra.addEventListener('click', () => { atual = (atual + 1) % REGRAS.length; legenda.classList.remove('ok'); desenha(); });
    btnMostra.addEventListener('click', () => {
      const campo = document.getElementById('respostaExemplo');
      campo.value = REGRAS[atual].alvo[1];
      legenda.innerHTML = 'A resposta era <b>' + REGRAS[atual].alvo[1] + '</b>. Tente a próxima regra.';
      legenda.classList.remove('ok');
    });
    btnLimpar.addEventListener('click', () => { feitas.clear(); num.textContent = '0'; meta.classList.remove('win'); atual = 0; legenda.classList.remove('ok'); desenha(); });

    num.textContent = '0';
    desenha();
  }

  montaReta();
  montaExemplo();
})();

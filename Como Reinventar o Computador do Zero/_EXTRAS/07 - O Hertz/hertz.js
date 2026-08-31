/* hertz (deste extra)
   As demonstracoes e a pratica do EX-07: o balanco que conta vai-e-vens, a
   escada dos prefixos, os botoes de OUVIR a frequencia (WebAudio, so no clique)
   e a montagem mantissa + prefixo. Sem audio de episodio ainda: quando o trio
   for gravado, o tocador entra no cabecalho e os marcadores saem do _telas.md.
   Depende de telas.js e da trilha da base (animacao/trilha.js). */

(function () {
  const formata = (n) => n.toLocaleString('pt-BR');
  function rotuloDaFrequencia(n) {
    if (n >= 1e9) return (n / 1e9) + ' GHz';
    if (n >= 1e6) return (n / 1e6) + ' MHz';
    if (n >= 1e3) return (n / 1e3) + ' kHz';
    return n + ' Hz';
  }

  // ---------- tela 3: o balanco na tela (conte os vai-e-vens) ----------
  const raizDoBalanco = document.getElementById('balanco');
  raizDoBalanco.className = 'balanco';
  raizDoBalanco.innerHTML = '<div class="pendulo"><div class="corda"></div><div class="bola"></div></div>';
  const pendulo = raizDoBalanco.querySelector('.pendulo');
  const legBalanco = document.getElementById('legBalanco');
  const totalVaiVens = document.getElementById('totalVaiVens');
  const metaBalanco = document.getElementById('metaBalanco');
  let frequencia = 1;
  let vaiVens = 0;
  let segundos = 0;

  pendulo.addEventListener('animationiteration', () => {
    vaiVens++;
    totalVaiVens.textContent = vaiVens;
  });
  setInterval(() => {
    segundos++;
    metaBalanco.textContent = 'ritmo: ' + frequencia + ' Hz · ' + segundos + ' s de contagem';
  }, 1000);

  function zeraOBalanco() {
    vaiVens = 0;
    segundos = 0;
    totalVaiVens.textContent = '0';
    metaBalanco.textContent = 'ritmo: ' + frequencia + ' Hz';
  }
  document.querySelectorAll('[data-freq]').forEach((b) => b.addEventListener('click', () => {
    frequencia = Number(b.dataset.freq);
    pendulo.style.animationDuration = (1 / frequencia) + 's';
    document.querySelectorAll('[data-freq]').forEach((o) => o.classList.toggle('cheio', o === b));
    zeraOBalanco();
    legBalanco.innerHTML = 'agora são <b>' + frequencia + '</b> vai-e-véns por segundo: <b>' + frequencia + ' Hz</b>. Compare o contador com o relógio.';
  }));
  document.getElementById('btnBalancoZerar').addEventListener('click', zeraOBalanco);
  zeraOBalanco();

  // ---------- tela 5: a escada dos prefixos ----------
  const DEGRAUS = [
    { rotulo: 'Hz', mult: 1, fala: '<b>1 Hz</b> = 1 vai-e-vém por segundo', exemplo: 'no dia a dia: a tomada de casa balança a 60 Hz' },
    { rotulo: 'kHz', mult: 1e3, fala: '<b>1 kHz</b> = 1.000 por segundo — quilo é o mil de sempre', exemplo: 'no dia a dia: o teto do ouvido fica perto de 20 kHz' },
    { rotulo: 'MHz', mult: 1e6, fala: '<b>1 MHz</b> = 1.000.000 por segundo — mega é milhão', exemplo: 'no dia a dia: a rádio FM vive por volta de 100 MHz' },
    { rotulo: 'GHz', mult: 1e9, fala: '<b>1 GHz</b> = 1.000.000.000 por segundo — giga é bilhão', exemplo: 'no dia a dia: o wi-fi de casa usa 2,4 GHz' },
  ];
  const legEscada = document.getElementById('legEscada');
  const valorDaEscada = document.getElementById('valorDaEscada');
  const exemploDaEscada = document.getElementById('exemploDaEscada');
  function sobeODegrau(i) {
    const degrau = DEGRAUS[i];
    valorDaEscada.textContent = formata(degrau.mult);
    exemploDaEscada.textContent = degrau.exemplo;
    legEscada.innerHTML = degrau.fala + '. É só tamanho, não é medida nova.';
    document.querySelectorAll('[data-degrau]').forEach((b, j) => b.classList.toggle('cheio', j === i));
  }
  document.querySelectorAll('[data-degrau]').forEach((b, i) => b.addEventListener('click', () => sobeODegrau(i)));
  sobeODegrau(0);

  // ---------- tela 7: ouca a frequencia (WebAudio, so no clique) ----------
  const legSom = document.getElementById('legSom');
  const FALAS_DO_SOM = {
    110: 'grave: o ar indo e voltando <b>110</b> vezes por segundo',
    220: '<b>220 Hz</b>: o dobro do 110 — a mesma nota, uma oitava acima',
    440: '<b>440 Hz</b>: o lá do afinador, o som que orquestra inteira usa pra acertar',
    880: '<b>880 Hz</b>: dobrou de novo, subiu mais uma oitava',
    1760: 'agudo: <b>1.760</b> por segundo — e o ouvido segue até perto de 20.000',
  };
  let contextoDeAudio = null;
  function tocaAFrequencia(hz) {
    try {
      contextoDeAudio = contextoDeAudio || new (window.AudioContext || window.webkitAudioContext)();
      const agora = contextoDeAudio.currentTime;
      const oscilador = contextoDeAudio.createOscillator();
      const ganho = contextoDeAudio.createGain();
      oscilador.type = 'sine';
      oscilador.frequency.value = hz;
      ganho.gain.setValueAtTime(0.0001, agora);
      ganho.gain.exponentialRampToValueAtTime(0.2, agora + 0.03);
      ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.9);
      oscilador.connect(ganho);
      ganho.connect(contextoDeAudio.destination);
      oscilador.start(agora);
      oscilador.stop(agora + 1);
      legSom.innerHTML = FALAS_DO_SOM[hz];
    } catch (e) {
      legSom.innerHTML = 'o navegador segurou o áudio desta página — toque de novo';
    }
  }
  document.querySelectorAll('[data-hz]').forEach((b) => b.addEventListener('click', () => tocaAFrequencia(Number(b.dataset.hz))));

  // ---------- tela 9: pratica (3 kHz, 2 MHz, 5 GHz) ----------
  const trilhaHertz = Animacao.criaTrilha({
    trilha: 'trilhaHertz',
    legenda: 'legPratica',
    meta: 'metaPratica',
    desafios: [3000, 2000000, 5000000000],
    rotulo: rotuloDaFrequencia,
    pede: (n) => 'Monte <b>' + rotuloDaFrequencia(n) + '</b>: clique no algarismo pra ele avançar e escolha o prefixo.',
    fim: '<b>Fechou os três!</b>',
  });
  const algarismo = document.getElementById('freqAlgarismo');
  const totalPratica = document.getElementById('totalPratica');
  let mantissa = 1;
  let multiplicador = 1;

  function pintaAMontagem() {
    algarismo.textContent = mantissa;
    totalPratica.textContent = formata(mantissa * multiplicador) + ' Hz';
    trilhaHertz.confere(mantissa * multiplicador);
  }
  algarismo.addEventListener('click', () => {
    mantissa = mantissa === 9 ? 1 : mantissa + 1;
    pintaAMontagem();
  });
  document.querySelectorAll('[data-mult]').forEach((b) => b.addEventListener('click', () => {
    multiplicador = Number(b.dataset.mult);
    document.querySelectorAll('[data-mult]').forEach((o) => o.classList.toggle('cheio', o === b));
    pintaAMontagem();
  }));
  document.getElementById('btnPraticaLimpar').addEventListener('click', () => {
    mantissa = 1;
    multiplicador = 1;
    document.querySelectorAll('[data-mult]').forEach((o, i) => o.classList.toggle('cheio', i === 0));
    pintaAMontagem();
  });
  pintaAMontagem();
})();

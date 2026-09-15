/* audio
   O player das paginas do site (hub de serie, pagina de etapa, extras), no desenho
   do player do Nexus: a trilha em cima e, embaixo, a marcha no canto esquerdo, os
   saltos com o play no centro e o relogio no canto direito. Pedido de 12/09/2026:
   "usa o play do nexus, nao esse play simples".

   O HTML continua trazendo o <audio controls> dentro de .audio: sem este script
   o player nativo segue tocando. Com ele, o controle nativo some e os botoes
   desenhados mandam no <audio>, que continua dono do estado: os botoes so mandam
   nele e a trilha le de volta. Depende de audio.css.

   Nao e o tocador das animacoes (js/animacao/tocador.js): aquele vira a tela junto
   com o audio e depende do Animacao.telas. Os dois dividem o desenho; se aparecer
   um terceiro player, extrair a parte comum. */

(function () {
  // as mesmas marchas do player do Nexus e do tocador das animacoes
  const VELOCIDADES = [0.75, 1, 1.25, 1.5, 2];

  // a seta dos saltos e a do PodcastTransporte do Nexus, em traco
  const SETA = '<svg class="audio__seta" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M3.4 12a8.6 8.6 0 1 0 8.6-8.6 9.3 9.3 0 0 0-6.44 2.62L3.4 8.2"/>' +
    '<path d="M3.4 3.6v4.6h4.6"/></svg>';
  const ICONE_TOCAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  const ICONE_PAUSAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>';

  // todos os <audio> da pagina: a de extras tem varios, e toca um de cada vez
  const audios = [];

  function relogio(seg) {
    if (!isFinite(seg) || seg < 0) seg = 0;
    const m = Math.floor(seg / 60);
    return m + ':' + String(Math.floor(seg % 60)).padStart(2, '0');
  }

  // o miolo e sempre uma das constantes acima, nunca texto vindo de fora
  function criaBotao(classe, rotulo, miolo) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = classe;
    botao.innerHTML = miolo;
    poeRotulo(botao, rotulo);
    return botao;
  }

  function poeRotulo(botao, rotulo) {
    botao.setAttribute('aria-label', rotulo);
    botao.title = rotulo;
  }

  function monta(caixa) {
    const audio = caixa.querySelector('audio');
    if (!audio) return;
    audios.push(audio);

    const trilha = document.createElement('div');
    trilha.className = 'audio__trilha';
    trilha.tabIndex = 0;
    trilha.setAttribute('role', 'slider');
    trilha.setAttribute('aria-label', 'posição do áudio');
    trilha.setAttribute('aria-valuemin', '0');
    const cheio = document.createElement('span');
    cheio.className = 'audio__cheio';
    trilha.append(cheio);

    const velocidade = criaBotao('audio__velocidade', 'velocidade 1x, toque pra trocar', '1x');
    const voltar = criaBotao('audio__salto', 'voltar 10 segundos', SETA + '<b>10</b>');
    const tocar = criaBotao('audio__play', 'tocar', ICONE_TOCAR);
    const avancar = criaBotao('audio__salto audio__salto--avanca', 'avançar 30 segundos', SETA + '<b>30</b>');

    const transporte = document.createElement('div');
    transporte.className = 'audio__transporte';
    transporte.append(voltar, tocar, avancar);

    // o relogio em duas pecas: no cartao estreito o audio.css empilha as duas, e o
    // "0:00 / 21:49" numa linha so empurrava o play pra fora do centro
    const tempo = document.createElement('span');
    tempo.className = 'audio__tempo';
    const tempoAgora = document.createElement('span');
    const tempoTotal = document.createElement('span');
    tempoTotal.className = 'audio__total';
    tempo.append(tempoAgora, tempoTotal);

    const controles = document.createElement('div');
    controles.className = 'audio__controles';
    controles.append(velocidade, transporte, tempo);

    const player = document.createElement('div');
    player.className = 'audio__player';
    player.append(trilha, controles);

    audio.after(player);
    audio.controls = false;
    caixa.classList.add('audio--desenhado');

    function duracao() {
      return isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
    }

    function pinta() {
      const total = duracao();
      const agora = audio.currentTime;
      cheio.style.width = total ? (agora / total * 100) + '%' : '0%';
      tempoAgora.textContent = relogio(agora);
      tempoTotal.textContent = total ? relogio(total) : '--:--';
      trilha.setAttribute('aria-valuemax', String(Math.floor(total)));
      trilha.setAttribute('aria-valuenow', String(Math.floor(agora)));
      trilha.setAttribute('aria-valuetext', relogio(agora) + (total ? ' de ' + relogio(total) : ''));
    }

    // Com preload="none" a duracao so existe depois que o metadata chega. Um pulo
    // pedido antes disso pede o metadata e e cumprido quando ele vier. O segundo e
    // uma funcao porque a conta (fracao da trilha x duracao) so fecha depois.
    let puloEsperando = null;
    function pulaPara(segundo) {
      const cumpre = () => {
        audio.currentTime = Math.max(0, Math.min(duracao(), segundo()));
        pinta();
      };
      if (duracao()) { cumpre(); return; }
      puloEsperando = cumpre;
      if (audio.preload === 'none') {
        audio.preload = 'metadata';
        audio.load();
      }
    }
    audio.addEventListener('loadedmetadata', () => {
      if (puloEsperando) { puloEsperando(); puloEsperando = null; }
      pinta();
    });

    function ligaTransporte() {
      tocar.addEventListener('click', () => {
        if (audio.paused) audio.play().catch(() => {});   // a falha aparece pelo evento error
        else audio.pause();
      });
      audio.addEventListener('play', () => {
        audios.forEach((outro) => { if (outro !== audio && !outro.paused) outro.pause(); });
        tocar.innerHTML = ICONE_PAUSAR;
        poeRotulo(tocar, 'pausar');
        player.classList.add('tocando');
      });
      audio.addEventListener('pause', () => {
        tocar.innerHTML = ICONE_TOCAR;
        poeRotulo(tocar, 'tocar');
        player.classList.remove('tocando');
      });
      voltar.addEventListener('click', () => pulaPara(() => audio.currentTime - 10));
      avancar.addEventListener('click', () => pulaPara(() => audio.currentTime + 30));
    }

    // o load() do pulo antes do metadata devolve a marcha pro padrao; por isso ela
    // vai nos dois lugares
    function poeVelocidade(v) {
      audio.defaultPlaybackRate = v;
      audio.playbackRate = v;
      velocidade.textContent = v + 'x';
      poeRotulo(velocidade, 'velocidade ' + v + 'x, toque pra trocar');
    }
    function ligaVelocidade() {
      velocidade.addEventListener('click', () => {
        const i = VELOCIDADES.indexOf(audio.playbackRate);
        poeVelocidade(VELOCIDADES[(i + 1) % VELOCIDADES.length]);
      });
    }

    // clicar, arrastar (mouse e dedo) e teclado. As setas andam 5s, Home e End vao
    // as pontas, como no tocador das animacoes
    function ligaTrilha() {
      const fracaoDoPonteiro = (e) => {
        const caixaDaTrilha = trilha.getBoundingClientRect();
        return Math.max(0, Math.min(1, (e.clientX - caixaDaTrilha.left) / caixaDaTrilha.width));
      };
      let arrastando = false;
      trilha.addEventListener('pointerdown', (e) => {
        const fracao = fracaoDoPonteiro(e);
        arrastando = true;
        trilha.setPointerCapture(e.pointerId);
        pulaPara(() => fracao * duracao());
      });
      trilha.addEventListener('pointermove', (e) => {
        if (!arrastando || !duracao()) return;
        audio.currentTime = fracaoDoPonteiro(e) * duracao();
        pinta();
      });
      const solta = () => { arrastando = false; };
      trilha.addEventListener('pointerup', solta);
      trilha.addEventListener('pointercancel', solta);

      trilha.addEventListener('keydown', (e) => {
        const passo = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[e.key];
        if (e.key === 'Home') pulaPara(() => 0);
        else if (e.key === 'End') pulaPara(() => duracao());
        else if (passo) pulaPara(() => audio.currentTime + passo);
        else return;
        e.preventDefault();
      });
    }

    // o aviso mora colado no player, onde a pessoa acabou de tocar
    function avisaErro() {
      if (caixa.querySelector('.audio__erro')) return;
      const aviso = document.createElement('p');
      aviso.className = 'audio__erro';
      aviso.setAttribute('role', 'status');
      aviso.textContent = 'Não deu pra carregar o áudio agora. Tente de novo daqui a pouco.';
      player.after(aviso);
    }

    ligaTransporte();
    ligaVelocidade();
    ligaTrilha();
    audio.addEventListener('timeupdate', pinta);
    audio.addEventListener('durationchange', pinta);
    audio.addEventListener('seeked', pinta);
    audio.addEventListener('error', avisaErro);
    pinta();
  }

  document.querySelectorAll('.audio').forEach(monta);
})();

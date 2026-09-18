/* esticao: a luz esticando da hora em que saiu até hoje (tela 5 do 1.02).
   Um cursor leva a luz do instante em que o universo ficou transparente até agora. A tela
   mostra quantas vezes ela já esticou, a temperatura e o comprimento de onda mais forte,
   e desenha uma onda que alarga junto (fora de escala: a luz estica 1.091 vezes, o desenho
   só 30). Começa na hora em que a luz saiu, que é o estado que o áudio descreve. Nada muda
   sozinho. Números: _pesquisa.md desta pasta. Depende de esticao.css e do painel da base. */

(function () {
  'use strict';

  const Z_ESTRELA = 1089.92;                    // Planck 2018
  const TEMPERATURA_HOJE = 2.72548;             // K, Fixsen 2009
  const FATOR_TOTAL = 1 + Z_ESTRELA;            // 1090,92
  const TEMPERATURA_NA_SAIDA = TEMPERATURA_HOJE * FATOR_TOTAL;   // 2973 K
  const CONSTANTE_DE_WIEN_MM = 2.897771955;     // mm·K, CODATA (NIST)
  const PASSOS = 1000;
  const ONDA = { largura: 600, altura: 120, amplitude: 38, menorComprimento: 10, esticaoDoDesenho: 30 };

  function formata(numero, casas) {
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }

  /* o cursor anda em escala de potência: metade do caminho já é 33 vezes, não 545 */
  function estadoNaPosicao(posicao) {
    const fracao = posicao / PASSOS;
    const fator = Math.pow(FATOR_TOTAL, fracao);
    const temperatura = TEMPERATURA_NA_SAIDA / fator;
    return { fracao, fator, temperatura, pico: CONSTANTE_DE_WIEN_MM / temperatura };
  }

  function fatorEscrito(fator) {
    if (fator < 1.005) return 'ainda não esticou';
    if (fator < 10) return `${formata(fator, 1)} vezes`;
    return `${formata(Math.round(fator), 0)} vezes`;
  }

  function temperaturaEscrita(temperatura) {
    const casas = temperatura < 10 ? 3 : temperatura < 100 ? 1 : 0;
    return `${formata(temperatura, casas)} graus acima do zero absoluto`;
  }

  function picoEscrito(pico) {
    return `${pico.toLocaleString('pt-BR', { maximumSignificantDigits: 3 })} mm`;
  }

  function legendaDoEstado(estado) {
    if (estado.fracao === 0) return 'A luz na hora em que saiu, a uns <b>três mil graus</b>. Arraste até hoje.';
    if (estado.fracao === 1) return 'Hoje: a mesma luz, esticada <b>1.091 vezes</b>, chega fria, como <b>micro-ondas</b>.';
    return 'O universo cresce, e o comprimento de onda da luz cresce junto.';
  }

  /* a onda desenhada: o comprimento dela vai de 10 a 300 pixels, e a cor esfria do
     âmbar pro azul. É ilustração do esticão, não a forma real da luz */
  function caminhoDaOnda(fracao) {
    const comprimento = ONDA.menorComprimento * Math.pow(ONDA.esticaoDoDesenho, fracao);
    const meio = ONDA.altura / 2;
    const pontos = [];
    for (let x = 0; x <= ONDA.largura; x += 2) {
      const y = meio + ONDA.amplitude * Math.sin((2 * Math.PI * x) / comprimento);
      pontos.push(`${x},${y.toFixed(1)}`);
    }
    return `M${pontos.join(' L')}`;
  }

  function corDaOnda(fracao) {
    const matiz = Math.round(32 + (210 - 32) * fracao);
    return `hsl(${matiz} 85% 62%)`;
  }

  function montaMiolo(miolo) {
    miolo.innerHTML = `
      <svg class="esticao__onda" viewBox="0 0 ${ONDA.largura} ${ONDA.altura}" preserveAspectRatio="none" aria-hidden="true">
        <path class="esticao__linha" d=""></path>
      </svg>
      <p class="esticao__aviso">desenho fora de escala: a luz esticou 1.091 vezes; o desenho, só 30</p>
      <input class="esticao__cursor" type="range" min="0" max="${PASSOS}" step="1" value="0"
             aria-label="da hora em que a luz saiu até hoje">
      <div class="esticao__pontas"><span>a luz sai · 00:14 do 1º de janeiro</span><span>hoje</span></div>
      <div class="esticao__leitura">
        <div><b class="esticao__temperatura"></b><span>temperatura</span></div>
        <div><b class="esticao__pico"></b><span>comprimento de onda mais forte</span></div>
      </div>`;
    return {
      cursor: miolo.querySelector('.esticao__cursor'),
      linha: miolo.querySelector('.esticao__linha'),
      temperatura: miolo.querySelector('.esticao__temperatura'),
      pico: miolo.querySelector('.esticao__pico'),
    };
  }

  function ligaLeitura(pecas, total, legenda) {
    const pinta = () => {
      const estado = estadoNaPosicao(Number(pecas.cursor.value));
      pecas.linha.setAttribute('d', caminhoDaOnda(estado.fracao));
      pecas.linha.style.stroke = corDaOnda(estado.fracao);
      pecas.temperatura.textContent = temperaturaEscrita(estado.temperatura);
      pecas.pico.textContent = picoEscrito(estado.pico);
      total.textContent = fatorEscrito(estado.fator);
      legenda.innerHTML = legendaDoEstado(estado);
    };
    pecas.cursor.addEventListener('input', pinta);
    pinta();
    return pinta;
  }

  function ligaBotao(id, pecas, pinta, posicao) {
    const botao = document.getElementById(id);
    if (!botao) return;
    botao.addEventListener('click', () => {
      pecas.cursor.value = String(posicao);
      pinta();
    });
  }

  const miolo = document.getElementById('mioloEsticao');
  if (!miolo) return;
  const pecas = montaMiolo(miolo);
  const pinta = ligaLeitura(pecas, document.getElementById('totalEsticao'), document.getElementById('legEsticao'));
  ligaBotao('esticaoVolta', pecas, pinta, 0);
  ligaBotao('esticaoHoje', pecas, pinta, PASSOS);
})();

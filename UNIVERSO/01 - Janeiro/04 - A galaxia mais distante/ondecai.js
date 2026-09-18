/* ondecai: onde a luz do hidrogênio cai, conforme o z (tela 4 do 1.04).
   Um cursor de z, de 0 a 16. A luz Lyman-alfa sai com 121,6 nm e chega com
   121,6 × (1 + z) nm; a tela marca esse ponto numa faixa de comprimentos de onda com o
   ultravioleta, o que o olho vê, o controle remoto e o que o NIRSpec enxerga. Embaixo,
   separada e marcada como tradução, a idade pelo modelo (ΛCDM com o Planck 2018, a mesma
   conta do _arquivos/scripts/idade-no-desvio.py). Começa em z = 0, a luz como sai, que é
   o estado que o áudio descreve. Nada muda sozinho. Números: _pesquisa.md desta pasta.
   Depende de ondecai.css e do painel da base. */

(function () {
  'use strict';

  const LYMAN_ALFA_NM = 121.6;                  // NASA
  const Z_MAXIMO = 16;
  const PASSOS = 1600;                          // o cursor anda de 0,01 em 0,01
  const FAIXA_NM = { inicio: 100, fim: 5500 };  // o que a faixa desenhada cobre
  const REGIOES = [
    { nome: 'o olho vê', de: 380, ate: 700, classe: 'olho' },             // NASA
    { nome: 'o NIRSpec enxerga', de: 600, ate: 5300, classe: 'nirspec' }, // NASA
  ];
  const CONTROLE_REMOTO_NM = 940;               // NASA
  const ATALHOS = {
    'MoM-z14': 14.44, 'JADES-GS-z14-0': 14.32, 'JADES-GS-z13-0': 13.2,
  };

  /* a idade pelo modelo: t(z) = integral de 0 até 1/(1+z) de da / (a H(a)), em anos.
     ΛCDM plano do Planck 2018 (H0 = 67,66; Ωm = 0,3111) com radiação */
  const H0 = 67.66;
  const OMEGA_M = 0.3111;
  const h = H0 / 100;
  const OMEGA_R = 2.469e-5 / (h * h) * (1 + 0.2271 * 3.046);
  const OMEGA_L = 1 - OMEGA_M - OMEGA_R;
  const ANOS_DE_HUBBLE = 3.0856775814913673e19 / H0 / (365.25 * 24 * 3600);

  function idadeEmAnos(z) {
    const aFinal = 1 / (1 + z);
    const passos = 4000;
    const largura = aFinal / passos;
    let soma = 0;
    for (let i = 0; i < passos; i++) {
      const a = (i + 0.5) * largura;
      soma += largura / (a * Math.sqrt(OMEGA_R / a ** 4 + OMEGA_M / a ** 3 + OMEGA_L));
    }
    return soma * ANOS_DE_HUBBLE;
  }

  /* a faixa é em escala logarítmica: de 100 a 5500 nm, o ultravioleta e o infravermelho
     cabem na mesma linha sem espremer o visível */
  function posicaoNaFaixa(nm) {
    const lo = Math.log(FAIXA_NM.inicio);
    const hi = Math.log(FAIXA_NM.fim);
    const fracao = (Math.log(Math.min(Math.max(nm, FAIXA_NM.inicio), FAIXA_NM.fim)) - lo) / (hi - lo);
    return (fracao * 100).toFixed(2);
  }

  function nomeDaLuz(nm) {
    if (nm < 380) return 'ultravioleta: o olho não vê';
    if (nm <= 700) return 'luz que o olho vê';
    return 'infravermelho: o olho não vê';
  }

  function formata(numero, casas) {
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }

  function montaRegiao(regiao) {
    const esquerda = posicaoNaFaixa(regiao.de);
    const largura = (posicaoNaFaixa(regiao.ate) - esquerda).toFixed(2);
    return `<div class="ondecai__regiao ondecai__regiao--${regiao.classe}" style="left:${esquerda}%;width:${largura}%"><span>${regiao.nome}</span></div>`;
  }

  function montaMiolo(miolo) {
    const botoes = Object.keys(ATALHOS)
      .map((nome) => `<button class="btn-mini" data-z="${ATALHOS[nome]}">${nome}</button>`).join('');
    miolo.innerHTML = `
      <div class="ondecai__faixa">
        ${REGIOES.map(montaRegiao).join('')}
        <div class="ondecai__remoto" style="left:${posicaoNaFaixa(CONTROLE_REMOTO_NM)}%"><span>controle remoto</span></div>
        <div class="ondecai__ponto"><span></span></div>
      </div>
      <div class="ondecai__escala"><span>100 nm</span><span>1.000 nm</span><span>5.000 nm</span></div>
      <input class="ondecai__cursor" type="range" min="0" max="${PASSOS}" step="1" value="0" aria-label="o z da galáxia">
      <div class="ondecai__leitura">
        <div><b class="ondecai__z"></b><span>z (o que se mede)</span></div>
        <div><b class="ondecai__nm"></b><span class="ondecai__luz"></span></div>
      </div>
      <p class="ondecai__traducao">tradução pelo modelo: <b class="ondecai__anos"></b></p>
      <div class="botoes ondecai__atalhos">${botoes}<button class="btn-mini" data-z="16">falso: parecia 16</button><button class="btn-mini" data-z="4.9">falso: era 4,9</button></div>`;
    return {
      cursor: miolo.querySelector('.ondecai__cursor'),
      ponto: miolo.querySelector('.ondecai__ponto'),
      z: miolo.querySelector('.ondecai__z'),
      nm: miolo.querySelector('.ondecai__nm'),
      luz: miolo.querySelector('.ondecai__luz'),
      anos: miolo.querySelector('.ondecai__anos'),
    };
  }

  function anosEscritos(anos) {
    if (anos >= 1e9) return `${formata(anos / 1e9, 2)} bilhões de anos depois do início`;
    return `${formata(Math.round(anos / 1e6), 0)} milhões de anos depois do início`;
  }

  function ligaLeitura(pecas, total, legenda) {
    const pinta = () => {
      const z = Number(pecas.cursor.value) / (PASSOS / Z_MAXIMO);
      const nm = LYMAN_ALFA_NM * (1 + z);
      pecas.ponto.style.left = `${posicaoNaFaixa(nm)}%`;
      pecas.z.textContent = formata(z, 2);
      pecas.nm.textContent = `${formata(Math.round(nm), 0)} nm`;
      pecas.luz.textContent = nomeDaLuz(nm);
      pecas.anos.textContent = z === 0 ? 'a luz aqui perto, sem esticar' : anosEscritos(idadeEmAnos(z));
      total.textContent = `${formata(1 + z, 2)} vezes`;
      legenda.textContent = z === 0
        ? 'A luz do hidrogênio como sai: 121,6 nm, ultravioleta. Arraste o z.'
        : 'Quanto maior o z, mais a luz do hidrogênio chega esticada.';
    };
    pecas.cursor.addEventListener('input', pinta);
    pinta();
    return pinta;
  }

  function ligaAtalhos(miolo, pecas, pinta) {
    miolo.querySelectorAll('[data-z]').forEach((botao) => {
      botao.addEventListener('click', () => {
        pecas.cursor.value = String(Math.round(Number(botao.dataset.z) * (PASSOS / Z_MAXIMO)));
        pinta();
      });
    });
    const volta = document.getElementById('ondecaiVolta');
    if (volta) volta.addEventListener('click', () => { pecas.cursor.value = '0'; pinta(); });
  }

  const miolo = document.getElementById('mioloOndecai');
  if (!miolo) return;
  const pecas = montaMiolo(miolo);
  const pinta = ligaLeitura(pecas, document.getElementById('totalOndecai'), document.getElementById('legOndecai'));
  ligaAtalhos(miolo, pecas, pinta);
})();

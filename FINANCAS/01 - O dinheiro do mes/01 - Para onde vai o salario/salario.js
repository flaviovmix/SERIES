/* Episodio 1.01 Para onde vai o salario: os quatro widgets da pagina.
   1. A regua do bruto ao liquido (tela 3): INSS por faixa e o desconto do IR.
   2. A barra do mes (tela 5): fatias arrastaveis e a sobra que some.
   3. O ano que nao fecha (tela 8): os doze meses e o botao que divide por doze.
   4. A pratica (tela 11): o mesmo mes com a sobra no fim e com a sobra na frente.

   Todo numero de regra vem do _pesquisa.md (INSS e IR de 2026). Os valores de
   exemplo sao inventados e redondos, de proposito, e o estado inicial e o que o
   audio descreve, porque o audio foi gravado antes da pagina.
   So depende do painel.css da base. */

(function () {
  'use strict';

  /* ---------- as regras, com fonte ---------- */

  // Portaria Interministerial MPS/MF 13/2026: aliquota progressiva por faixa.
  const FAIXAS_INSS = [
    { ate: 1621.00, pct: 7.5 },
    { ate: 2902.84, pct: 9 },
    { ate: 4354.27, pct: 12 },
    { ate: 8475.55, pct: 14 },
  ];

  // Tabela mensal do IRPF de 2026 e o desconto da Lei 15.270/2025, que zera a
  // conta ate R$ 5.000 e vai sumindo ate R$ 7.350.
  const IRPF = [
    { ate: 2428.80, pct: 0, deduz: 0 },
    { ate: 2826.65, pct: 7.5, deduz: 182.16 },
    { ate: 3751.05, pct: 15, deduz: 394.16 },
    { ate: 4664.68, pct: 22.5, deduz: 675.49 },
    { ate: Infinity, pct: 27.5, deduz: 908.73 },
  ];

  const SALARIO_EXEMPLO = 3000;

  function reais(v) {
    return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function reaisCurto(v) {
    return 'R$ ' + Math.round(v).toLocaleString('pt-BR');
  }

  function inssPorFaixa(bruto) {
    // devolve, na ordem, quanto cada faixa cobrou e qual a largura dela
    let piso = 0;
    return FAIXAS_INSS.map(function (faixa) {
      const teto = Math.min(bruto, faixa.ate);
      const base = Math.max(0, teto - piso);
      const largura = faixa.ate - piso;
      piso = faixa.ate;
      return { pct: faixa.pct, base: base, largura: largura, valor: base * faixa.pct / 100 };
    });
  }

  function impostoDeRenda(base) {
    const faixa = IRPF.find(function (f) { return base <= f.ate; });
    const devido = Math.max(0, base * faixa.pct / 100 - faixa.deduz);
    // o desconto que zera ate 5 mil e cai ate zerar em 7.350
    let desconto = 0;
    if (base <= 5000) desconto = Math.min(devido, 312.89);
    else if (base < 7350) desconto = Math.max(0, 978.62 - 0.133145 * base);
    return Math.max(0, devido - Math.min(devido, desconto));
  }

  /* ---------- 1. a regua do bruto ao liquido (tela 3) ---------- */

  function montaRegua() {
    const miolo = document.getElementById('mioloRegua');
    if (!miolo) return;
    const total = document.getElementById('totalRegua');
    const meta = document.getElementById('metaRegua');

    miolo.innerHTML =
      '<div class="sal-controle">' +
      '  <span>salário bruto</span>' +
      '  <input type="range" id="reguaSalario" min="1621" max="10000" step="1" value="' + SALARIO_EXEMPLO + '">' +
      '  <b id="reguaValor"></b>' +
      '</div>' +
      '<div class="sal-regua__faixas" id="reguaFaixas"></div>' +
      '<div class="sal-resumo">' +
      '  <div><span>INSS</span><b id="reguaInss"></b></div>' +
      '  <div><span>imposto de renda</span><b id="reguaIr"></b></div>' +
      '  <div><span>líquido</span><b id="reguaLiquido"></b></div>' +
      '</div>';

    const slider = miolo.querySelector('#reguaSalario');
    const valor = miolo.querySelector('#reguaValor');
    const faixas = miolo.querySelector('#reguaFaixas');

    function desenha() {
      const bruto = Number(slider.value);
      const pedacos = inssPorFaixa(bruto);
      const inss = pedacos.reduce(function (s, p) { return s + p.valor; }, 0);
      const ir = impostoDeRenda(bruto - inss);
      const liquido = bruto - inss - ir;

      valor.textContent = reaisCurto(bruto);
      faixas.innerHTML = pedacos.map(function (p) {
        const pct = Math.max(0, Math.min(100, p.base / p.largura * 100));
        return '<div class="sal-regua__faixa">' +
          '<span>' + String(p.pct).replace('.', ',') + '%</span>' +
          '<span class="sal-regua__trilho"><span class="sal-regua__cheio" style="width:' + pct.toFixed(1) + '%"></span></span>' +
          '<span class="sal-regua__valor">' + (p.valor > 0 ? reais(p.valor) : 'nada aqui') + '</span>' +
          '</div>';
      }).join('');

      miolo.querySelector('#reguaInss').textContent = reais(inss);
      miolo.querySelector('#reguaIr').textContent = ir > 0 ? reais(ir) : 'zero';
      miolo.querySelector('#reguaLiquido').textContent = reais(liquido);
      total.textContent = reaisCurto(liquido);
      meta.textContent = ir === 0 && bruto <= 5000
        ? 'o que chega na conta · sem imposto de renda até R$ 5.000'
        : 'o que chega na conta';
    }

    slider.addEventListener('input', desenha);
    const botao = document.getElementById('reguaExemplo');
    if (botao) botao.addEventListener('click', function () { slider.value = SALARIO_EXEMPLO; desenha(); });
    desenha();
  }

  /* ---------- 2. a barra do mes (tela 5) ---------- */

  const LIQUIDO_EXEMPLO = 2800;
  const FATIAS = [
    { id: 'moradia', nome: 'moradia', valor: 1000 },
    { id: 'transporte', nome: 'transporte', valor: 500 },
    { id: 'comida', nome: 'comida', valor: 600 },
    { id: 'resto', nome: 'o resto', valor: 400 },
  ];

  function montaBarra() {
    const miolo = document.getElementById('mioloBarra');
    if (!miolo) return;
    const total = document.getElementById('totalBarra');
    const fatias = FATIAS.map(function (f) { return { id: f.id, nome: f.nome, valor: f.valor }; });

    miolo.innerHTML =
      '<div class="sal-barra" id="barraDesenho"></div>' +
      '<div class="sal-sliders">' +
      fatias.map(function (f) {
        return '<div class="sal-controle">' +
          '<span style="min-width:86px">' + f.nome + '</span>' +
          '<input type="range" data-fatia="' + f.id + '" min="0" max="1600" step="50" value="' + f.valor + '">' +
          '<b data-valor="' + f.id + '"></b></div>';
      }).join('') +
      '</div>';

    const desenho = miolo.querySelector('#barraDesenho');

    function desenha() {
      const gasto = fatias.reduce(function (s, f) { return s + f.valor; }, 0);
      const sobra = LIQUIDO_EXEMPLO - gasto;
      const partes = fatias.map(function (f) {
        const pct = f.valor / LIQUIDO_EXEMPLO * 100;
        return '<div class="sal-barra__parte" style="width:' + pct.toFixed(1) + '%">' +
          (pct > 9 ? f.nome : '') + '</div>';
      });
      if (sobra > 0) {
        partes.push('<div class="sal-barra__parte sal-barra__parte--sobra" style="width:' +
          (sobra / LIQUIDO_EXEMPLO * 100).toFixed(1) + '%">sobra</div>');
      } else {
        partes.push('<div class="sal-barra__parte sal-barra__parte--vazia" style="width:0%"></div>');
      }
      desenho.innerHTML = partes.join('');
      fatias.forEach(function (f) {
        miolo.querySelector('[data-valor="' + f.id + '"]').textContent = reaisCurto(f.valor);
      });
      total.textContent = sobra > 0 ? reaisCurto(sobra) : 'nada';
      const meta = document.getElementById('metaBarra');
      if (meta) {
        meta.textContent = sobra > 0
          ? 'o que sobra no fim, de ' + reaisCurto(LIQUIDO_EXEMPLO)
          : 'o mês estourou em ' + reaisCurto(-sobra);
      }
    }

    miolo.querySelectorAll('input[data-fatia]').forEach(function (input) {
      input.addEventListener('input', function () {
        const alvo = fatias.find(function (f) { return f.id === input.dataset.fatia; });
        alvo.valor = Number(input.value);
        desenha();
      });
    });

    const botao = document.getElementById('barraExemplo');
    if (botao) {
      botao.addEventListener('click', function () {
        FATIAS.forEach(function (padrao, i) {
          fatias[i].valor = padrao.valor;
          miolo.querySelector('[data-fatia="' + padrao.id + '"]').value = padrao.valor;
        });
        desenha();
      });
    }

    desenha();
  }

  /* ---------- 3. o ano que nao fecha (tela 8) ---------- */

  const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const SOBRA_MENSAL = 300;
  // os compromissos sazonais do exemplo, inventados e redondos
  const SAZONAIS = [
    { mes: 0, nome: 'IPVA', valor: 900 },
    { mes: 1, nome: 'matrícula', valor: 600 },
    { mes: 5, nome: 'seguro', valor: 700 },
  ];

  function montaAno() {
    const miolo = document.getElementById('mioloAno');
    if (!miolo) return;
    const total = document.getElementById('totalAno');
    const legenda = document.getElementById('legAno');
    let dividido = false;

    miolo.innerHTML = '<div class="sal-meses" id="anoDesenho"></div>';
    const desenho = miolo.querySelector('#anoDesenho');

    function desenha() {
      const somaSazonal = SAZONAIS.reduce(function (s, c) { return s + c.valor; }, 0);
      const porMes = dividido ? somaSazonal / 12 : 0;
      let vermelhos = 0;

      desenho.innerHTML = MESES.map(function (nome, i) {
        const caiuAqui = dividido ? 0 : SAZONAIS.filter(function (c) { return c.mes === i; })
          .reduce(function (s, c) { return s + c.valor; }, 0);
        const saldo = SOBRA_MENSAL - caiuAqui - porMes;
        if (saldo < 0) vermelhos++;
        const altura = Math.min(100, Math.abs(saldo) / 900 * 100);
        return '<div class="sal-mes" title="' + nome + ': ' + reaisCurto(saldo) + '">' +
          '<div class="sal-mes__col' + (saldo < 0 ? ' sal-mes__col--negativo' : '') + '" style="height:' + altura.toFixed(0) + '%"></div>' +
          '<div class="sal-mes__nome">' + nome + '</div></div>';
      }).join('');

      total.textContent = String(vermelhos);
      const meta = document.getElementById('metaAno');
      if (meta) meta.textContent = vermelhos === 1 ? 'mês no vermelho' : 'meses no vermelho';
      legenda.textContent = dividido
        ? 'Os mesmos gastos, divididos por doze e guardados todo mês. O valor total não mudou, o susto sumiu.'
        : 'O mesmo salário nos doze meses. Os compromissos sazonais caem de uma vez e engolem a sobra.';
    }

    const botaoDivide = document.getElementById('anoDivide');
    if (botaoDivide) {
      botaoDivide.addEventListener('click', function () {
        dividido = !dividido;
        botaoDivide.textContent = dividido ? 'voltar a cair de uma vez' : 'dividir por doze';
        desenha();
      });
    }
    const botaoExemplo = document.getElementById('anoExemplo');
    if (botaoExemplo) {
      botaoExemplo.addEventListener('click', function () {
        dividido = false;
        if (botaoDivide) botaoDivide.textContent = 'dividir por doze';
        desenha();
      });
    }

    desenha();
  }

  /* ---------- 4. a pratica: sobra no fim x sobra na frente (tela 11) ---------- */

  function montaPratica() {
    const miolo = document.getElementById('mioloPratica');
    if (!miolo) return;
    const total = document.getElementById('totalPratica');
    const legenda = document.getElementById('legPratica');
    let naFrente = false;

    miolo.innerHTML = '<div class="sal-meses" id="praticaDesenho"></div>';
    const desenho = miolo.querySelector('#praticaDesenho');

    function desenha() {
      // no fim: o que sobra depende do mes, e mes apertado come a sobra.
      // na frente: separa 300 antes, e o mes se organiza com o resto.
      const guardadoPorMes = MESES.map(function (_, i) {
        if (naFrente) return 300;
        // meses apertados do exemplo: fevereiro, junho e novembro
        return (i === 1 || i === 5 || i === 10) ? 0 : 160;
      });
      const soma = guardadoPorMes.reduce(function (s, v) { return s + v; }, 0);

      desenho.innerHTML = MESES.map(function (nome, i) {
        const altura = guardadoPorMes[i] / 300 * 100;
        return '<div class="sal-mes" title="' + nome + ': ' + reaisCurto(guardadoPorMes[i]) + '">' +
          '<div class="sal-mes__col" style="height:' + altura.toFixed(0) + '%"></div>' +
          '<div class="sal-mes__nome">' + nome + '</div></div>';
      }).join('');

      total.textContent = reaisCurto(soma);
      legenda.textContent = naFrente
        ? 'A sobra sai da conta no começo do mês, e o mês se organiza com o que ficou.'
        : 'A sobra é o que restar no fim. Em mês apertado, não resta.';
    }

    const btFim = document.getElementById('praticaFim');
    const btFrente = document.getElementById('praticaFrente');
    if (btFim) btFim.addEventListener('click', function () {
      naFrente = false; btFim.classList.add('cheio'); if (btFrente) btFrente.classList.remove('cheio'); desenha();
    });
    if (btFrente) btFrente.addEventListener('click', function () {
      naFrente = true; btFrente.classList.add('cheio'); if (btFim) btFim.classList.remove('cheio'); desenha();
    });

    desenha();
  }

  montaRegua();
  montaBarra();
  montaAno();
  montaPratica();
})();

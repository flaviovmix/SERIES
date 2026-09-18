/* curvas: as duas contas lado a lado (tela 4 do 1.02).
   Os mesmos R$ 1.000,00 crescendo em juros simples (reta) e em juros compostos
   (curva), com o vão entre as duas pintado: esse vão é o juro sobre juro.
   O ouvinte mexe na taxa ao mês e no prazo, ou escolhe um dos três pontos de
   partida. Começa no exemplo do Banco Central (5% ao mês, 6 meses), que é o estado
   que o áudio descreve. Nada muda sozinho.
   Os números das partidas vêm do _pesquisa.md (Caderno do BCB, SGS 25477 de julho
   de 2026). A estrutura da tela está no animacao.html; aqui só mora o comportamento,
   e todo texto entra por textContent. Depende de curvas.css e do painel da base. */

(function () {
  'use strict';

  const CAPITAL = 1000;
  const LIMITE_PRA_ESCREVER = 1e12;   // passou de um trilhão, a tela diz "mais de"
  const AREA = { esquerda: 10, direita: 590, topo: 14, base: 226 };

  const PARTIDAS = {
    banco: {
      taxa: 5, meses: 6, mostraTeto: false,
      nota: 'O exemplo do Caderno de Educação Financeira do Banco Central, versão 2026.',
    },
    rotativo: {
      taxa: 15.02, meses: 6, mostraTeto: true,
      anoPublicado: 436.15,   // SGS 22022; a conta com 15,02 arredondado dá 436,14
      nota: 'Taxa média do rotativo do cartão em julho de 2026, segundo o Banco Central. ' +
            'A conta pura passa do dobro antes do quinto mês. Desde 3 de janeiro de 2024, juros e ' +
            'encargos do rotativo e do parcelamento da fatura não podem passar do valor original ' +
            'da dívida: é a linha tracejada.',
    },
    tempo: {
      taxa: 1, meses: 360, mostraTeto: false,
      nota: 'Taxa inventada e redonda, de propósito. A taxa é pequena: o que muda tudo é o tempo.',
    },
  };
  const PARTIDA_INICIAL = 'banco';
  const NOTA_LIVRE = 'Taxa e prazo escolhidos na mão. Os pontos de partida voltam aos exemplos do áudio.';

  /* ---------- as duas contas ---------- */

  function montanteSimples(taxaAoMes, meses) {
    return CAPITAL * (1 + taxaAoMes / 100 * meses);
  }

  function montanteComposto(taxaAoMes, meses) {
    return CAPITAL * Math.pow(1 + taxaAoMes / 100, meses);
  }

  function taxaAoAno(taxaAoMes) {
    return (Math.pow(1 + taxaAoMes / 100, 12) - 1) * 100;
  }

  /* ---------- como os números aparecem ---------- */

  function reais(valor) {
    if (valor >= LIMITE_PRA_ESCREVER) return 'mais de R$ 1 trilhão';
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function porcento(valor) {
    return valor.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '%';
  }

  function prazoPorExtenso(meses) {
    if (meses < 12) return meses === 1 ? '1 mês' : `${meses} meses`;
    const anos = Math.floor(meses / 12);
    const sobra = meses % 12;
    const textoDosAnos = anos === 1 ? '1 ano' : `${anos} anos`;
    if (sobra === 0) return textoDosAnos;
    return `${textoDosAnos} e ${sobra === 1 ? '1 mês' : `${sobra} meses`}`;
  }

  /* ---------- o desenho ---------- */

  function escalaDoGrafico(estado) {
    const maiorValor = Math.max(
      montanteComposto(estado.taxa, estado.meses),
      estado.mostraTeto ? CAPITAL * 2 : 0
    );
    const largura = AREA.direita - AREA.esquerda;
    const altura = AREA.base - AREA.topo;
    return {
      x: (mes) => AREA.esquerda + largura * mes / estado.meses,
      y: (valor) => AREA.base - altura * valor / (maiorValor * 1.04),
    };
  }

  function pontosDa(conta, estado, escala) {
    const pontos = [];
    for (let mes = 0; mes <= estado.meses; mes++) {
      const valor = conta(estado.taxa, mes);
      pontos.push(`${escala.x(mes).toFixed(1)},${escala.y(valor).toFixed(1)}`);
    }
    return pontos;
  }

  function desenhaGrafico(grafico, estado) {
    const escala = escalaDoGrafico(estado);
    const simples = pontosDa(montanteSimples, estado, escala);
    const composto = pontosDa(montanteComposto, estado, escala);
    grafico.simples.setAttribute('points', simples.join(' '));
    grafico.composto.setAttribute('points', composto.join(' '));
    grafico.vao.setAttribute('points', simples.concat(composto.slice().reverse()).join(' '));
    desenhaTeto(grafico, estado, escala);
  }

  function desenhaTeto(grafico, estado, escala) {
    grafico.teto.classList.toggle('curvas__teto--visivel', estado.mostraTeto);
    if (!estado.mostraTeto) return;
    const alturaDoTeto = escala.y(CAPITAL * 2).toFixed(1);
    grafico.tetoLinha.setAttribute('y1', alturaDoTeto);
    grafico.tetoLinha.setAttribute('y2', alturaDoTeto);
    grafico.tetoRotulo.setAttribute('y', (Number(alturaDoTeto) - 6).toFixed(1));
  }

  /* ---------- a leitura em texto ---------- */

  function escreveLeitura(leitura, estado) {
    const simples = montanteSimples(estado.taxa, estado.meses);
    const composto = montanteComposto(estado.taxa, estado.meses);
    leitura.taxa.textContent = porcento(estado.taxa) + ' ao mês';
    leitura.prazo.textContent = prazoPorExtenso(estado.meses);
    leitura.simples.textContent = reais(simples);
    leitura.composto.textContent = reais(composto);
    leitura.total.textContent = reais(composto - simples);
    leitura.ano.textContent = fraseDoAno(estado);
    leitura.nota.textContent = estado.partida ? PARTIDAS[estado.partida].nota : NOTA_LIVRE;
  }

  function fraseDoAno(estado) {
    const publicado = estado.partida && PARTIDAS[estado.partida].anoPublicado;
    const aoAno = publicado ? `${porcento(publicado)} ao ano, o número que o Banco Central publica,`
                            : `${porcento(taxaAoAno(estado.taxa))} ao ano em juros compostos,`;
    return `${porcento(estado.taxa)} ao mês equivalem a ${aoAno} e não a ${porcento(estado.taxa * 12)} (doze vezes a do mês).`;
  }

  /* ---------- os controles ---------- */

  function marcaPartidaAtiva(botoes, partida) {
    botoes.forEach((botao) => {
      const ativo = botao.dataset.partida === partida;
      botao.classList.toggle('cheio', ativo);
      botao.setAttribute('aria-pressed', String(ativo));
    });
  }

  function estadoDaPartida(nome) {
    const partida = PARTIDAS[nome];
    return { taxa: partida.taxa, meses: partida.meses, mostraTeto: partida.mostraTeto, partida: nome };
  }

  function achaPecas(miolo) {
    const pega = (seletor) => miolo.querySelector(seletor);
    const painel = miolo.closest('.painel');
    return {
      botoes: Array.from(painel.querySelectorAll('[data-partida]')),
      controleTaxa: pega('.curvas__taxa'),
      controlePrazo: pega('.curvas__prazo'),
      grafico: {
        simples: pega('.curvas__simples'), composto: pega('.curvas__composto'), vao: pega('.curvas__vao'),
        teto: pega('.curvas__teto'), tetoLinha: pega('.curvas__teto line'), tetoRotulo: pega('.curvas__teto text'),
      },
      leitura: {
        taxa: pega('.curvas__taxa-valor'), prazo: pega('.curvas__prazo-valor'),
        simples: pega('.curvas__valor-simples'), composto: pega('.curvas__valor-composto'),
        ano: pega('.curvas__ano'), nota: pega('.curvas__nota'),
        total: document.getElementById('totalCurvas'),
      },
    };
  }

  function montaCurvas(miolo) {
    const pecas = achaPecas(miolo);
    let estado = estadoDaPartida(PARTIDA_INICIAL);

    function pinta() {
      pecas.controleTaxa.value = String(estado.taxa);
      pecas.controlePrazo.value = String(estado.meses);
      marcaPartidaAtiva(pecas.botoes, estado.partida);
      desenhaGrafico(pecas.grafico, estado);
      escreveLeitura(pecas.leitura, estado);
    }

    function mexeNaMao() {
      const taxa = Number(pecas.controleTaxa.value);
      const meses = Number(pecas.controlePrazo.value);
      estado = { taxa: taxa, meses: meses, mostraTeto: false, partida: null };
      pinta();
    }

    pecas.botoes.forEach((botao) => botao.addEventListener('click', () => {
      estado = estadoDaPartida(botao.dataset.partida);
      pinta();
    }));
    pecas.controleTaxa.addEventListener('input', mexeNaMao);
    pecas.controlePrazo.addEventListener('input', mexeNaMao);
    pinta();
  }

  const miolo = document.getElementById('mioloCurvas');
  if (miolo) montaCurvas(miolo);
})();

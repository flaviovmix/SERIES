/* regua: a régua do ano cósmico (tela 4 do 1.01).
   Uma linha de doze meses, um cursor que o ouvinte arrasta, e a leitura do ponto: a
   data do calendário e quantos anos atrás aquilo é. Começa parado na primeira marca
   (1º de janeiro, 00:00), que é o estado que o áudio descreve. Nada muda sozinho.
   A régua é a de 13,797 bilhões de anos (D11): as mesmas contas do
   _arquivos/scripts/calendario-cosmico.py. Depende de regua.css e do painel da base. */

(function () {
  'use strict';

  const IDADE_EM_ANOS = 13797000000;
  const DIAS_DO_ANO = 365;
  const ANOS_POR_DIA = IDADE_EM_ANOS / DIAS_DO_ANO;   // 37.800.000
  const PASSOS_POR_DIA = 100;                        // o cursor anda de 14 em 14 minutos do calendário
  const MESES = [
    ['janeiro', 31], ['fevereiro', 28], ['março', 31], ['abril', 30], ['maio', 31], ['junho', 30],
    ['julho', 31], ['agosto', 31], ['setembro', 30], ['outubro', 31], ['novembro', 30], ['dezembro', 31],
  ];
  const MESES_CHEIOS = new Set(['janeiro', 'dezembro']);

  /* a única marca deste episódio: o início do big bang quente, na ponta esquerda */
  const MARCAS = [{ dia: 0, nome: 'o início do big bang quente' }];

  function mesEDia(diaDoAno) {
    let restante = Math.min(Math.floor(diaDoAno), DIAS_DO_ANO - 1);
    for (const [nome, dias] of MESES) {
      if (restante < dias) return { mes: nome, dia: restante + 1 };
      restante -= dias;
    }
    return { mes: 'dezembro', dia: 31 };
  }

  function horaEMinuto(diaDoAno) {
    const fracao = diaDoAno - Math.floor(diaDoAno);
    const minutosDoDia = Math.round(fracao * 24 * 60);
    return { hora: Math.floor(minutosDoDia / 60), minuto: minutosDoDia % 60 };
  }

  function doisDigitos(numero) {
    return String(numero).padStart(2, '0');
  }

  function dataDoCalendario(diaDoAno) {
    const { mes, dia } = mesEDia(diaDoAno);
    const { hora, minuto } = horaEMinuto(diaDoAno);
    const diaEscrito = dia === 1 ? '1º' : String(dia);
    return `${diaEscrito} de ${mes}, ${doisDigitos(hora)}:${doisDigitos(minuto)}`;
  }

  function anosAtras(diaDoAno) {
    return Math.round(IDADE_EM_ANOS - diaDoAno * ANOS_POR_DIA);
  }

  function anosPorExtenso(anos) {
    if (anos >= 1e9) return `${(anos / 1e9).toLocaleString('pt-BR', { maximumFractionDigits: 3 })} bilhões de anos atrás`;
    if (anos >= 1e6) return `${(anos / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} milhões de anos atrás`;
    if (anos >= 1) return `${anos.toLocaleString('pt-BR')} anos atrás`;
    return 'agora';
  }

  function montaMeses() {
    return MESES.map(([nome]) => {
      const classe = MESES_CHEIOS.has(nome) ? 'regua__mes regua__mes--cheio' : 'regua__mes';
      return `<div class="${classe}"><span>${nome.slice(0, 3)}</span></div>`;
    }).join('');
  }

  function montaMarcas() {
    return MARCAS.map((marca) => {
      const esquerda = (marca.dia / DIAS_DO_ANO * 100).toFixed(3);
      return `<div class="regua__marca" style="left:${esquerda}%" title="${marca.nome}"></div>`;
    }).join('');
  }

  function montaRegua(miolo) {
    miolo.innerHTML = `
      <div class="regua">
        <div class="regua__meses">${montaMeses()}</div>
        ${montaMarcas()}
        <input class="regua__cursor" type="range" min="0" max="${DIAS_DO_ANO * PASSOS_POR_DIA - 1}" step="1" value="0"
               aria-label="posição na régua do ano cósmico">
      </div>
      <div class="regua__leitura">
        <span>no calendário: <b class="regua__data"></b></span>
        <span>de verdade: <b class="regua__anos"></b></span>
      </div>
      <div class="regua__conversao">
        <div><b>1 dia</b> 37.800.000 anos</div>
        <div><b>1 hora</b> 1.575.000 anos</div>
        <div><b>1 minuto</b> 26.250 anos</div>
        <div><b>1 segundo</b> 437 anos e meio</div>
      </div>`;
    return miolo.querySelector('.regua__cursor');
  }

  function ligaLeitura(cursor, miolo, total) {
    const data = miolo.querySelector('.regua__data');
    const anos = miolo.querySelector('.regua__anos');
    const pinta = () => {
      const diaDoAno = Number(cursor.value) / PASSOS_POR_DIA;
      data.textContent = dataDoCalendario(diaDoAno);
      anos.textContent = anosPorExtenso(anosAtras(diaDoAno));
      total.textContent = dataDoCalendario(diaDoAno);
    };
    cursor.addEventListener('input', pinta);
    pinta();
    return pinta;
  }

  function ligaBotaoDeVolta(botao, cursor, pinta) {
    botao.addEventListener('click', () => {
      cursor.value = '0';
      pinta();
    });
  }

  const miolo = document.getElementById('mioloRegua');
  if (!miolo) return;
  const cursor = montaRegua(miolo);
  const pinta = ligaLeitura(cursor, miolo, document.getElementById('totalRegua'));
  ligaBotaoDeVolta(document.getElementById('reguaVolta'), cursor, pinta);
})();

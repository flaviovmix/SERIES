/* regua: a régua do ano cósmico, o objeto da série Universo (D2 do plano), com lupa.
   Uma linha que mostra um trecho do ano (o ano inteiro, um mês, um dia, uma hora), um
   cursor que o ouvinte arrasta, e a leitura do ponto: a data do calendário, quantos anos
   atrás e quantos anos depois do início. As marcas ficam fixas; a lupa só troca o trecho
   que aparece. Data disputada é faixa, não ponto (D14).
   Tudo o que é do episódio (as marcas, os trechos da lupa, onde começa) vem do bloco
   <script type="application/json" id="configRegua"> da página: este arquivo é igual em
   todo episódio. Nada muda sozinho: o estado inicial é o que o áudio descreve.
   A régua é a de 13,797 bilhões de anos (D11): as mesmas contas do
   _arquivos/scripts/calendario-cosmico.py. Depende de regua.css e do painel da base. */

(function () {
  'use strict';

  const IDADE_EM_ANOS = 13797000000;
  const DIAS_DO_ANO = 365;
  const ANOS_POR_DIA = IDADE_EM_ANOS / DIAS_DO_ANO;   // 37.800.000
  const MESES = [
    ['janeiro', 31], ['fevereiro', 28], ['março', 31], ['abril', 30], ['maio', 31], ['junho', 30],
    ['julho', 31], ['agosto', 31], ['setembro', 30], ['outubro', 31], ['novembro', 30], ['dezembro', 31],
  ];

  /* cada tipo de trecho: quantos dias ele mostra, em quantos passos o cursor anda, e as
     casas da linha (largura relativa e nome). Os meses têm a largura dos dias deles */
  const TIPOS_DE_TRECHO = {
    ano: () => ({
      fim: DIAS_DO_ANO, passos: DIAS_DO_ANO * 100,
      casas: MESES.map(([nome, dias]) => ({ largura: dias, nome: nome.slice(0, 3) })),
    }),
    janeiro: () => ({
      fim: 31, passos: 31 * 24 * 4,
      casas: Array.from({ length: 31 }, (_, i) => ({ largura: 1, nome: (i % 5 === 0) ? String(i + 1) : '' })),
    }),
    dia: () => ({
      fim: 1, passos: 24 * 60,
      casas: Array.from({ length: 12 }, (_, i) => ({ largura: 1, nome: `${String(i * 2).padStart(2, '0')}h` })),
    }),
    hora: () => ({
      fim: 1 / 24, passos: 60 * 10,
      casas: Array.from({ length: 12 }, (_, i) => ({ largura: 1, nome: `:${String(i * 5).padStart(2, '0')}` })),
    }),
  };

  function leConfig() {
    const bloco = document.getElementById('configRegua');
    const config = JSON.parse(bloco.textContent);
    const marcas = config.marcas.map((marca) => ({
      dia: marca.anosDepois / ANOS_POR_DIA,
      ate: marca.anosDepoisAte === undefined ? null : marca.anosDepoisAte / ANOS_POR_DIA,
      nome: marca.nome,
    }));
    const trechos = {};
    for (const [nome, trecho] of Object.entries(config.trechos)) {
      trechos[nome] = { ...TIPOS_DE_TRECHO[nome](), legenda: trecho.legenda };
    }
    return { marcas, trechos, comeca: config.comeca };
  }

  function mesEDia(diaDoAno) {
    let restante = Math.min(Math.floor(diaDoAno), DIAS_DO_ANO - 1);
    for (const [nome, dias] of MESES) {
      if (restante < dias) return { mes: nome, dia: restante + 1 };
      restante -= dias;
    }
    return { mes: 'dezembro', dia: 31 };
  }

  function doisDigitos(numero) {
    return String(numero).padStart(2, '0');
  }

  function relogio(diaDoAno, comSegundos) {
    const segundosDoDia = Math.round((diaDoAno - Math.floor(diaDoAno)) * 86400);
    const hora = Math.floor(segundosDoDia / 3600);
    const minuto = Math.floor((segundosDoDia % 3600) / 60);
    const segundo = segundosDoDia % 60;
    const hhmm = `${doisDigitos(hora)}:${doisDigitos(minuto)}`;
    return comSegundos ? `${hhmm}:${doisDigitos(segundo)}` : hhmm;
  }

  function dataDoCalendario(diaDoAno, comSegundos) {
    const { mes, dia } = mesEDia(diaDoAno);
    const diaEscrito = dia === 1 ? '1º' : String(dia);
    return `${diaEscrito} de ${mes}, ${relogio(diaDoAno, comSegundos)}`;
  }

  function anosEscritos(anos) {
    if (anos >= 1e9) return `${(anos / 1e9).toLocaleString('pt-BR', { maximumFractionDigits: 3 })} bilhões de anos`;
    if (anos >= 1e6) return `${(anos / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} milhões de anos`;
    if (anos >= 1e3) return `${Math.round(anos / 1e3).toLocaleString('pt-BR')} mil anos`;
    return `${Math.round(anos).toLocaleString('pt-BR')} anos`;
  }

  function porcento(dia, trecho) {
    return (Math.min(dia, trecho.fim) / trecho.fim * 100).toFixed(3);
  }

  function montaCasas(trecho) {
    return trecho.casas.map((casa) => `<div class="regua__mes"><span>${casa.nome}</span></div>`).join('');
  }

  /* marca de ponto vira traço; marca de faixa vira faixa, cortada na borda do trecho.
     No trecho do ano inteiro os rótulos somem: ali as marcas de janeiro se encavalam */
  function montaMarca(marca, trecho, comRotulo) {
    const rotulo = comRotulo ? `<span class="regua__rotulo">${marca.nome}</span>` : '';
    const esquerda = porcento(marca.dia, trecho);
    if (marca.ate === null) {
      return `<div class="regua__marca" style="left:${esquerda}%" title="${marca.nome}">${rotulo}</div>`;
    }
    const largura = (porcento(marca.ate, trecho) - esquerda).toFixed(3);
    return `<div class="regua__marca regua__marca--faixa" style="left:${esquerda}%;width:${largura}%" title="${marca.nome}">${rotulo}</div>`;
  }

  function montaEsqueleto(miolo) {
    miolo.innerHTML = `
      <div class="regua regua--lupa">
        <div class="regua__meses"></div>
        <div class="regua__marcas"></div>
        <input class="regua__cursor" type="range" min="0" step="1" value="0"
               aria-label="posição na régua do ano cósmico">
      </div>
      <div class="regua__leitura">
        <span>no calendário: <b class="regua__data"></b></span>
        <span>anos atrás: <b class="regua__anos"></b></span>
        <span>depois do início: <b class="regua__depois"></b></span>
      </div>
      <div class="regua__conversao">
        <div><b>1 dia</b> 37.800.000 anos</div>
        <div><b>1 hora</b> 1.575.000 anos</div>
        <div><b>1 minuto</b> 26.250 anos</div>
        <div><b>1 segundo</b> 437 anos e meio</div>
      </div>`;
  }

  function criaRegua(miolo, config, total, legenda) {
    montaEsqueleto(miolo);
    const cursor = miolo.querySelector('.regua__cursor');
    const casas = miolo.querySelector('.regua__meses');
    const marcas = miolo.querySelector('.regua__marcas');
    const leitura = {
      data: miolo.querySelector('.regua__data'),
      anos: miolo.querySelector('.regua__anos'),
      depois: miolo.querySelector('.regua__depois'),
    };
    let nomeDoTrecho = config.comeca.trecho;

    /* o cursor anda em passos; perto do começo de uma marca (menos de meio passo) ele lê
       a marca exata, senão a primeira luz sairia 378 mil anos em vez de 380 mil */
    function diaDoCursor() {
      const trecho = config.trechos[nomeDoTrecho];
      const tamanhoDoPasso = trecho.fim / trecho.passos;
      const dia = Number(cursor.value) * tamanhoDoPasso;
      const marcaPerto = config.marcas.find((marca) => Math.abs(marca.dia - dia) <= tamanhoDoPasso / 2);
      return marcaPerto ? marcaPerto.dia : dia;
    }

    function pinta() {
      const diaDoAno = diaDoCursor();
      const data = dataDoCalendario(diaDoAno, nomeDoTrecho === 'hora');
      leitura.data.textContent = data;
      leitura.anos.textContent = anosEscritos(IDADE_EM_ANOS - diaDoAno * ANOS_POR_DIA);
      leitura.depois.textContent = diaDoAno === 0 ? 'o início' : anosEscritos(diaDoAno * ANOS_POR_DIA);
      total.textContent = data;
    }

    function mostra(nome, diaDoAno) {
      const trecho = config.trechos[nome];
      nomeDoTrecho = nome;
      casas.style.gridTemplateColumns = trecho.casas.map((casa) => `${casa.largura}fr`).join(' ');
      casas.innerHTML = montaCasas(trecho);
      marcas.innerHTML = config.marcas.map((marca) => montaMarca(marca, trecho, nome !== 'ano')).join('');
      cursor.max = String(trecho.passos);
      const dentro = Math.min(Math.max(diaDoAno, 0), trecho.fim);
      cursor.value = String(Math.round(dentro / trecho.fim * trecho.passos));
      legenda.textContent = trecho.legenda;
      pinta();
    }

    cursor.addEventListener('input', pinta);
    return { mostra, diaDoCursor };
  }

  function ligaBotoes(regua, diaDoComeco, trechoDoComeco) {
    document.querySelectorAll('[data-lupa]').forEach((botao) => {
      botao.addEventListener('click', () => regua.mostra(botao.dataset.lupa, regua.diaDoCursor()));
    });
    const volta = document.getElementById('reguaVolta');
    if (volta) volta.addEventListener('click', () => regua.mostra(trechoDoComeco, diaDoComeco));
  }

  const miolo = document.getElementById('mioloRegua');
  if (!miolo) return;
  const config = leConfig();
  const diaDoComeco = config.marcas[config.comeca.naMarca].dia;
  const regua = criaRegua(miolo, config, document.getElementById('totalRegua'), document.getElementById('legRegua'));
  ligaBotoes(regua, diaDoComeco, config.comeca.trecho);
  regua.mostra(config.comeca.trecho, diaDoComeco);
})();

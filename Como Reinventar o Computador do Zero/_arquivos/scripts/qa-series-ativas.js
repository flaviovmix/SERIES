/* qa-series-ativas
   Prova a decisao 10 da Etapa 6: o estado da serie no site/dados/series.json decide se
   ela aparece no menu (numa pagina do site e numa animacao) e na home.

   Local: com tudo ligado, toda serie aparece. Depois desliga uma serie de teste escrevendo
   no JSON, roda o gerador e confere que ela sumiu dos tres lugares; religa, roda de novo,
   confere que voltou e que o menu.js e a index.html ficaram byte a byte como estavam. Os
   tres arquivos voltam ao que eram no fim, de qualquer jeito, mesmo se o teste quebrar.
   Com "ar": so confere que o site publicado mostra as ligadas e esconde as desligadas.

   uso: node qa-series-ativas.js [ar] */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const PLAYWRIGHT = 'C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright';
const RAIZ = path.resolve(__dirname, '..', '..', '..');
const SITE = path.join(RAIZ, 'site');
const GERADOR = path.join(__dirname, 'gera-cards', 'gera-cards.js');
const ESTADO = path.join(SITE, 'dados', 'series.json');
const ARQUIVOS_QUE_O_TESTE_MEXE = [ESTADO, path.join(SITE, 'js', 'menu.js'), path.join(SITE, 'index.html')];
const SERIE_DE_TESTE = '03';
const HOME = 'site/index.html';
const ANIMACAO = 'Como Reinventar o Computador do Zero/01 - Contar antes das máquinas/01 - O Ábaco/animacao.html';

let falhas = 0;
function anota(ok, texto) {
  if (!ok) falhas++;
  console.log(`${ok ? 'OK ' : 'XX '} ${texto}`);
}

function endereco(relativoARaiz, noAr) {
  if (noAr) return 'https://series.afx.art.br/' + encodeURI(relativoARaiz);
  return 'file:///' + encodeURI(path.join(RAIZ, relativoARaiz).split(path.sep).join('/'));
}

function menuCompleto() {
  delete require.cache[require.resolve(path.join(SITE, 'js', 'menu.js'))];
  return require(path.join(SITE, 'js', 'menu.js'));
}

/* ---------- o que o visitante ve ---------- */

async function nomesNaPagina(navegador, relativoARaiz, noAr) {
  const pagina = await navegador.newPage({ viewport: { width: 1440, height: 900 } });
  await pagina.goto(endereco(relativoARaiz, noAr), { waitUntil: 'load' });
  const nomes = await pagina.evaluate(() => ({
    menu: [...document.querySelectorAll('#menu .menu__titulo span:last-child, #menu .menu__rodape .menu__item span:last-child')].map((el) => el.textContent),
    home: [...document.querySelectorAll('.grade--series .cap h3')].map((el) => el.textContent),
  }));
  await pagina.close();
  return nomes;
}

async function lugaresOndeAparece(navegador, noAr) {
  const home = await nomesNaPagina(navegador, HOME, noAr);
  const animacao = await nomesNaPagina(navegador, ANIMACAO, noAr);
  return { 'home': home.home, 'menu do site': home.menu, 'menu da animação': animacao.menu };
}

async function conferirSeries(navegador, series, rotulo, noAr) {
  const lugares = await lugaresOndeAparece(navegador, noAr);
  for (const serie of series) {
    for (const [lugar, nomes] of Object.entries(lugares)) {
      const aparece = nomes.includes(serie.nome);
      anota(aparece === serie.deveAparecer, `${rotulo}: ${serie.nome} ${serie.deveAparecer ? 'aparece' : 'some'} no ${lugar}`);
    }
  }
}

/* ---------- local: desliga, confere, religa, confere ---------- */

function escreverEstadoDaSerieDeTeste(ativa) {
  const estado = JSON.parse(fs.readFileSync(ESTADO, 'utf8'));
  estado[SERIE_DE_TESTE].ativa = ativa;
  fs.writeFileSync(ESTADO, JSON.stringify(estado, null, 2) + '\n');
  execFileSync(process.execPath, [GERADOR], { stdio: 'pipe' });
}

function seriesEsperadas(serieDeTesteLigada) {
  return menuCompleto().map((serie) => ({ nome: serie.nome, deveAparecer: serie.num !== SERIE_DE_TESTE || serieDeTesteLigada }));
}

async function rodarLocal(navegador) {
  const originais = ARQUIVOS_QUE_O_TESTE_MEXE.map((arquivo) => ({ arquivo, conteudo: fs.readFileSync(arquivo) }));
  try {
    await conferirSeries(navegador, seriesEsperadas(true), 'tudo ligado', false);
    escreverEstadoDaSerieDeTeste(false);
    await conferirSeries(navegador, seriesEsperadas(false), `série ${SERIE_DE_TESTE} desligada`, false);
    escreverEstadoDaSerieDeTeste(true);
    await conferirSeries(navegador, seriesEsperadas(true), `série ${SERIE_DE_TESTE} religada`, false);
    const mudaram = originais.filter(({ arquivo, conteudo }) => !fs.readFileSync(arquivo).equals(conteudo)).map(({ arquivo }) => path.relative(SITE, arquivo));
    anota(!mudaram.length, `religada: series.json, menu.js e index.html iguais aos de antes${mudaram.length ? ' (mudaram: ' + mudaram.join(', ') + ')' : ''}`);
  } finally {
    originais.forEach(({ arquivo, conteudo }) => fs.writeFileSync(arquivo, conteudo));
  }
}

/* ---------- no ar: so confere ---------- */

async function rodarNoAr(navegador) {
  const estado = JSON.parse(fs.readFileSync(ESTADO, 'utf8'));
  const series = menuCompleto().map((serie) => ({ nome: serie.nome, deveAparecer: estado[serie.num].ativa }));
  await conferirSeries(navegador, series, 'no ar', true);
}

async function principal() {
  if (!fs.existsSync(PLAYWRIGHT)) throw new Error('playwright nao encontrado em ' + PLAYWRIGHT);
  const { chromium } = require(PLAYWRIGHT);
  const navegador = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  try {
    if (process.argv[2] === 'ar') await rodarNoAr(navegador);
    else await rodarLocal(navegador);
  } finally {
    await navegador.close();
  }
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
  process.exitCode = falhas ? 1 : 0;
}

principal().catch((erro) => { console.error(erro); process.exitCode = 1; });

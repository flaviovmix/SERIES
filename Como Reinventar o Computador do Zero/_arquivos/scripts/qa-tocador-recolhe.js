// O tocador que se recolhe no telefone: comeca a mostra, some no play e deixa a seta;
// a seta abre (e vira pra baixo, acima dele) e fecha; play com ele aberto guarda de novo.
// No desktop nada recolhe e a seta nao aparece.
const fs = require('fs');
const path = require('path');

const candidatos = ['C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'];
const achado = candidatos.find(c => fs.existsSync(c));
if (!achado) { console.log('playwright nao encontrado'); process.exit(1); }
const { chromium } = require(achado);

// sem argumento testa o local; com "ar" testa series.afx.art.br
const RAIZ = process.argv[2] === 'ar' ? 'https://series.afx.art.br/' : 'file:///C:/src/PROJETOS/SEIRES/';
const PAGINA = RAIZ + encodeURI('Como Reinventar o Computador do Zero/01 - Contar antes das máquinas/01 - O Ábaco/animacao.html');
const saida = process.env.QA_OUT || require("os").tmpdir();   // capturas na pasta temporaria, nunca aqui

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  let falhas = 0;
  const conta = (ok, texto) => { if (!ok) falhas++; console.log(`${ok ? 'OK ' : 'XX '} ${texto}`); };

  const page = await browser.newPage({ viewport: { width: 384, height: 688 }, hasTouch: true });
  const erros = [];
  page.on('pageerror', (e) => erros.push(e.message));
  await page.goto(PAGINA, { waitUntil: 'load' });
  await page.waitForTimeout(800);

  const estado = () => page.evaluate(() => {
    const tocador = document.querySelector('.tocador');
    const alca = document.querySelector('.tocador-alca');
    const rodape = document.querySelector('.navegacao');
    const a = alca.getBoundingClientRect();
    return {
      tocadorVisivel: getComputedStyle(tocador).display !== 'none',
      alcaVisivel: !alca.hidden && getComputedStyle(alca).display !== 'none',
      aberta: alca.classList.contains('tocador-alca--aberta'),
      rodapeVisivel: getComputedStyle(rodape).display !== 'none',
      alcaNoCanto: innerHeight - a.bottom <= 24,
      alcaAcimaDoTocador: getComputedStyle(tocador).display !== 'none' ? a.bottom <= tocador.getBoundingClientRect().top + 1 : null,
      palco: Math.round(document.querySelector('main').getBoundingClientRect().height),
      tocando: !document.querySelector('.tocador audio').paused,
    };
  });

  const inicio = await estado();
  conta(inicio.tocadorVisivel && !inicio.alcaVisivel, `inicio: tocador a mostra, sem seta (palco ${inicio.palco})`);

  await page.click('.tocador__play');
  await page.waitForTimeout(700);
  const guardado = await estado();
  conta(!guardado.tocadorVisivel && !guardado.rodapeVisivel && guardado.alcaVisivel && !guardado.aberta && guardado.alcaNoCanto && guardado.palco > inicio.palco,
    `play: tocador e paginacao sumiram, seta pra cima no canto, palco ${inicio.palco} -> ${guardado.palco}, tocando=${guardado.tocando}`);
  await page.screenshot({ path: path.join(saida, 'tocador-guardado.png') });

  await page.click('.tocador-alca');
  await page.waitForTimeout(500);
  const aberto = await estado();
  conta(aberto.tocadorVisivel && aberto.rodapeVisivel && aberto.aberta && aberto.alcaAcimaDoTocador && aberto.palco === inicio.palco,
    `seta: tocador e paginacao voltaram, seta pra baixo acima do tocador, palco ${aberto.palco}`);
  await page.screenshot({ path: path.join(saida, 'tocador-aberto.png') });

  await page.click('.tocador-alca');
  await page.waitForTimeout(700);
  const fechadoPelaSeta = await estado();
  conta(!fechadoPelaSeta.tocadorVisivel && !fechadoPelaSeta.aberta, 'seta de novo: guardou');

  // aberto pela seta, pausa (fica aberto) e play (guarda)
  await page.click('.tocador-alca');
  await page.waitForTimeout(500);
  await page.click('.tocador__play');   // pausa
  await page.waitForTimeout(700);
  const pausado = await estado();
  conta(pausado.tocadorVisivel && !pausado.tocando, 'pausa com ele aberto: continua aberto');
  await page.click('.tocador__play');   // toca de novo
  await page.waitForTimeout(700);
  const deNovo = await estado();
  conta(!deNovo.tocadorVisivel && deNovo.alcaVisivel, 'play com ele aberto: guardou de novo');
  conta(!erros.length, `sem erro de JS${erros.length ? ': ' + erros.join('|') : ''}`);
  await page.close();

  // desktop: nada recolhe
  const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desk.goto(PAGINA, { waitUntil: 'load' });
  await desk.waitForTimeout(800);
  await desk.click('.tocador__play');
  await desk.waitForTimeout(700);
  const d = await desk.evaluate(() => ({
    tocadorVisivel: getComputedStyle(document.querySelector('.tocador')).display !== 'none' && getComputedStyle(document.querySelector('.tocador')).opacity === '1',
    alca: getComputedStyle(document.querySelector('.tocador-alca')).display,
  }));
  conta(d.tocadorVisivel && d.alca === 'none', `desktop: play nao recolhe (tocador visivel=${d.tocadorVisivel}, seta=${d.alca})`);
  await desk.close();

  await browser.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
})();

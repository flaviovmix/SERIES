// Conferencia NO AR depois do deploy da fase 1 AFX + lote 3: as 17 paginas do site e
// 5 animacoes. Erro de JS, rolagem de lado, fonte/fundo do AFX nas paginas e, nas
// animacoes, a paleta antiga, o tocador abaixo da barra no desktop e a tela de fim.
const fs = require('fs');

const candidatos = ['C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'];
const achado = candidatos.find(c => fs.existsSync(c));
if (!achado) { console.log('playwright nao encontrado'); process.exit(1); }
const { chromium } = require(achado);

const AR = 'https://series.afx.art.br/';
const PAGINAS = [
  'index.html', 'computador.html', 'javaweb.html', 'hardware.html',
  'etapas/etapa-01.html', 'etapas/etapa-06.html', 'etapas/etapa-07.html', 'etapas/etapa-08.html',
  'etapas/etapa-09.html', 'etapas/etapa-10.html', 'etapas/etapa-11.html', 'etapas/javaweb-01.html',
  'etapas/hardware-01.html', 'extras/index.html', 'extras/extra-01.html', 'extras/extra-02.html',
].map((p) => AR + 'site/' + p);
const ANIMACOES = [
  'Como Reinventar o Computador do Zero/01 - Contar antes das máquinas/01 - O Ábaco/animacao.html',
  'Como Reinventar o Computador do Zero/_REFAZER/08 - Da sala pro mundo/02 - Conectando tudo - a internet/animacao.html',
  'Como Reinventar o Computador do Zero/_REFAZER/11 - A máquina que conversa/01 - A escala/animacao.html',
  'JAVA WEB/01 - Por que ainda estudar isso/01 - A bomba-relógio/animacao.html',
  'Como Reinventar o Computador do Zero/_EXTRAS/07 - O Hertz/animacao.html',
].map((p) => AR + encodeURI(p));

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  let falhas = 0;
  const conta = (ok, texto) => { if (!ok) falhas++; console.log(`${ok ? 'OK ' : 'XX '} ${texto}`); };

  for (const url of PAGINAS) {
    for (const t of [{ w: 1920, h: 1080, e: 'dark' }, { w: 384, h: 688, e: 'light' }]) {
      const page = await browser.newPage({ viewport: { width: t.w, height: t.h }, colorScheme: t.e });
      const erros = [];
      page.on('pageerror', (e) => erros.push(e.message));
      const resp = await page.goto(url, { waitUntil: 'load' });
      await page.waitForTimeout(800);
      const r = await page.evaluate(() => ({
        fundo: getComputedStyle(document.body).backgroundColor,
        fonte: getComputedStyle(document.body).fontFamily.split(',')[0],
        rola: document.documentElement.scrollWidth > window.innerWidth,
        cards: document.querySelectorAll('.cap').length,
        borda: document.querySelector('.cap') ? getComputedStyle(document.querySelector('.cap')).borderTopStyle : '-',
      }));
      const fundoEsperado = t.e === 'dark' ? 'rgb(28, 42, 63)' : 'rgb(244, 243, 238)';
      const ok = resp.status() === 200 && !erros.length && !r.rola && r.fundo === fundoEsperado && /Schibsted/.test(r.fonte) && (r.cards === 0 || r.borda === 'dashed');
      conta(ok, `${t.w} ${url.replace(AR, '')} http=${resp.status()} fundo=${r.fundo} fonte=${r.fonte} cards=${r.cards} borda=${r.borda}${r.rola ? ' ROLA' : ''}${erros.length ? ' ERROS=' + erros.join('|') : ''}`);
      await page.close();
    }
  }

  for (const url of ANIMACOES) {
    for (const t of [{ w: 1440, h: 900 }, { w: 384, h: 688 }]) {
      const page = await browser.newPage({ viewport: { width: t.w, height: t.h } });
      const erros = [];
      page.on('pageerror', (e) => erros.push(e.message));
      const resp = await page.goto(url, { waitUntil: 'load' });
      await page.waitForTimeout(1200);
      const r = await page.evaluate(() => {
        const tocador = document.querySelector('.tocador');
        return {
          fundo: getComputedStyle(document.body).backgroundColor,
          tocadorAbaixoDaBarra: !!(tocador && tocador.previousElementSibling && tocador.previousElementSibling.classList.contains('topo')),
          temFim: !!document.querySelector('.step--fim'),
          rola: document.documentElement.scrollWidth > window.innerWidth,
        };
      });
      const nome = decodeURI(url.replace(AR, '')).split('/').slice(-2, -1)[0];
      const lugarCerto = t.w > 820 ? r.tocadorAbaixoDaBarra : !r.tocadorAbaixoDaBarra;
      const ok = resp.status() === 200 && !erros.length && !r.rola && r.fundo === 'rgb(244, 246, 248)' && r.temFim && lugarCerto;
      conta(ok, `${t.w} animacao ${nome}: http=${resp.status()} fundo=${r.fundo} tocadorAbaixoDaBarra=${r.tocadorAbaixoDaBarra} fim=${r.temFim}${r.rola ? ' ROLA' : ''}${erros.length ? ' ERROS=' + erros.join('|') : ''}`);
      await page.close();
    }
  }

  await browser.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
})();

// Confere uma pagina de animacao servida por http:
//   node testa-pagina.js <url> <telas esperadas>
// telas, navegacao ate a ultima, imagens carregadas, estouro horizontal em
// desktop e telefone, e conteudo cortado dentro de cada tela numa janela baixa.
// Como rodar e por que cada checagem existe: LEIA-ME-qa.md nesta pasta.
const { chromium } = require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const [URL, ESPERADAS] = [process.argv[2], Number(process.argv[3])];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const ruins = [];
  page.on('pageerror', (e) => ruins.push('erro: ' + e.message));
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon/i.test(r.url())) ruins.push('HTTP ' + r.status() + ' ' + decodeURIComponent(r.url()).slice(-50)); });

  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(1800);
  let falhas = 0;
  const diz = (ok, t) => { console.log('  ' + (ok ? 'ok  ' : 'FALHOU  ') + t); if (!ok) falhas++; };

  const base = await page.evaluate(() => ({
    telas: document.querySelectorAll('.step').length,
    bolinhas: document.querySelectorAll('.bolinhas > *').length,
    quebradas: [...document.querySelectorAll('img')].filter((i) => i.getAttribute('src') && !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')),
    duracao: (document.querySelector('.tocador__total') || {}).textContent,
    estouro: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  diz(base.telas === ESPERADAS, base.telas + ' telas (esperava ' + ESPERADAS + ')');
  diz(base.bolinhas === ESPERADAS, base.bolinhas + ' bolinhas');
  diz(base.quebradas.length === 0, 'imagens: ' + (base.quebradas.length ? base.quebradas.join(', ') : 'nenhuma quebrada'));
  diz(base.estouro === 0, 'estouro em 1440px: ' + base.estouro + 'px');
  console.log('  duracao no tocador: ' + (base.duracao || '').trim());

  // conteudo cortado dentro de cada tela
  const cortadas = [];
  for (let i = 0; i < base.telas; i++) {
    if (i > 0) { await page.click('.navegacao__proximo'); await page.waitForTimeout(200); }
    const sobra = await page.evaluate((idx) => {
      const s = document.querySelectorAll('.step')[idx];
      return Math.round(s.scrollHeight - s.clientHeight);
    }, i);
    if (sobra > 0) cortadas.push((i + 1) + ':+' + sobra);
  }
  diz(cortadas.length === 0, 'telas cortadas em 1440x900: ' + (cortadas.length ? cortadas.join(' ') : 'nenhuma'));

  const contador = await page.evaluate(() => (document.querySelector('.contador') || {}).textContent);
  diz((contador || '').includes(ESPERADAS + ' / ' + ESPERADAS), 'chegou na ultima tela (' + (contador || '').trim() + ')');

  await page.setViewportSize({ width: 360, height: 740 });
  await page.waitForTimeout(900);
  const estreito = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  diz(estreito === 0, 'estouro em 360px: ' + estreito + 'px');

  await browser.close();
  if (ruins.length) { console.log('  ' + ruins.join('\n  ')); falhas += ruins.length; }
  console.log(falhas ? '\n' + falhas + ' problema(s)' : '\ntudo passou');
  process.exit(falhas ? 1 : 0);
})();

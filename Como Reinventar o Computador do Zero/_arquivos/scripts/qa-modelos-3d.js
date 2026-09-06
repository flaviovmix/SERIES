// Confere os CINCO modelos depois da extracao pra base: a cena monta, o gancho de
// QA responde, as pecas caem dentro da tela e nenhuma fica atras do painel, em
// desktop e no telefone. Playwright (nao patchright): o gancho window.__x nao
// aparece no mundo isolado.
// Como rodar e por que cada checagem existe: LEIA-ME-qa.md nesta pasta.
const { chromium } = require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const B = 'http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/';
const FOLGA_ROTULO = 85;

const MODELOS = [
  ['rele.html', '__rele'],
  ['valvula.html', '__valvula'],
  ['transistor.html', '__transistor'],
  ['circuito-integrado.html', '__circuitoIntegrado'],
  ['microprocessador.html', '__microprocessador'],
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  let falhas = 0;

  for (const [arquivo, gancho] of MODELOS) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const ruins = [];
    page.on('pageerror', (e) => ruins.push(e.message.split('\n')[0]));
    page.on('response', (r) => { if (r.status() >= 400 && !/favicon/i.test(r.url())) ruins.push('HTTP ' + r.status()); });

    console.log('\n== ' + arquivo);
    try {
      await page.goto(B + arquivo, { waitUntil: 'load' });
      await page.waitForFunction((g) => !!window[g], gancho, { timeout: 25000 });

    } catch (e) {
      console.log('  FALHOU  nem carregou: ' + e.message.split('\n')[0]);
      falhas++; await page.close(); continue;
    }
    await page.waitForTimeout(1500);

    for (const [nome, w, h] of [['desktop', 1280, 800], ['telefone', 390, 780]]) {
      await page.setViewportSize({ width: w, height: h });
      await page.waitForTimeout(1200);
      const m = await page.evaluate((g) => window[g].pixels(), gancho);
      const problemas = [];
      for (const [peca, p] of Object.entries(m.pecas)) {
        const folga = peca.startsWith('rotulo:') ? FOLGA_ROTULO : 0;
        if (p.x < -folga || p.x > w + folga || p.y < 0 || p.y > h) { problemas.push(peca + ' fora da tela'); continue; }
        if (p.x > m.hud.left - folga && p.x < m.hud.right + folga && p.y > m.hud.top && p.y < m.hud.bottom) problemas.push(peca + ' atras do painel');
      }
      console.log('  ' + (problemas.length ? 'FALHOU  ' : 'ok  ') + nome + ': ' +
        (problemas.length ? problemas.join(' | ') : Object.keys(m.pecas).length + ' pecas visiveis'));
      if (problemas.length) falhas++;
    }

    if (ruins.length) { console.log('  FALHOU  console: ' + ruins.join(' | ')); falhas += ruins.length; }
    await page.close();
  }

  await browser.close();
  console.log(falhas ? '\n' + falhas + ' problema(s)' : '\ntudo passou nos cinco modelos');
  process.exit(falhas ? 1 : 0);
})();

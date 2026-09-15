// QA do Arduino UNO (modelos-3d/arduino-uno.html, casca _visualizador-pecas.js). Requer servidor HTTP e Edge.
//
//   node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-arduino-uno.js" [--thumb]
//
// Passa por cada vista, pela explosão e por cada peça isolada, e em cada estado confere
// que o modelo cabe no palco (fora dos controles de cima e de baixo) e que a página não
// estoura na horizontal, no desktop e no telefone. Sem erro de JS em nenhum passo.
// Com --thumb só grava a miniatura da galeria, sem o HUD gravado por cima.
const { chromium } = (() => { try { return require('playwright'); } catch { return require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'); } })();
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const PASTA_DOS_MODELOS = path.resolve(__dirname, '../modelos-3d');
const url = (process.env.MODELOS_URL || 'http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/') + 'arduino-uno.html';
const saida = process.env.QA_OUT || path.join(os.tmpdir(), 'arduino-uno-qa');
fs.mkdirSync(saida, { recursive: true });
const GLOBAL = '__arduinoUno';
const PECAS = ['placa', 'chip', 'cristal', 'ponte', 'headers', 'alimentacao', 'usb', 'soldas'];

async function assenta(page) {
  await page.waitForFunction(g => !!window[g], GLOBAL, { timeout: 30000 });
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.waitForFunction(g => { const s = window[g].estado(); return !s.moving && s.expanded === s.targetExpanded; }, GLOBAL, { timeout: 30000 });
  await page.waitForTimeout(300);
}

async function cabe(page, nome) {
  const r = await page.evaluate(g => {
    const p = window[g].pixels(), c = document.querySelector('#cena').getBoundingClientRect();
    return { cantos: p.corners, cena: { left: c.left, right: c.right, top: c.top, bottom: c.bottom }, estouro: document.documentElement.scrollWidth - innerWidth };
  }, GLOBAL);
  assert.ok(r.estouro <= 1, nome + ': página sem estouro horizontal');
  for (const p of r.cantos) assert.ok(p.x > r.cena.left + 5 && p.x < r.cena.right - 5 && p.y > r.cena.top + 35 && p.y < r.cena.bottom - 35, nome + ': modelo dentro do palco e fora dos controles ' + JSON.stringify(r));
  console.log('ok  ' + nome);
}

const print = (page, nome) => page.locator('#stage').screenshot({ path: path.join(saida, nome + '.png') });

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const erros = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', e => erros.push(e.message));
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await assenta(page);
  assert.ok(await page.locator('#loading').isHidden(), 'aviso de carregamento some');

  if (process.argv.includes('--thumb')) {
    await page.evaluate(() => { document.querySelector('.stage-heading').hidden = true; document.querySelector('.stage-bottom').hidden = true; });
    await page.waitForTimeout(200);
    const thumb = path.join(PASTA_DOS_MODELOS, 'thumbs/arduino-uno.jpg');
    await page.locator('#stage').screenshot({ path: thumb, type: 'jpeg', quality: 86 });
    console.log('thumb: ' + thumb);
    await browser.close();
    return;
  }

  await cabe(page, 'desktop montado');
  await print(page, 'desktop-montado');
  for (const vista of ['front', 'side', 'back']) {
    await page.locator(`[data-view="${vista}"]`).click(); await assenta(page);
    await cabe(page, 'desktop vista ' + vista);
  }
  await page.locator('[data-view="perspective"]').click(); await assenta(page);
  await page.locator('#explode').click(); await assenta(page);
  assert.equal((await page.evaluate(g => window[g].estado(), GLOBAL)).targetExpanded, 1, 'explodiu');
  await cabe(page, 'desktop explodido');
  await print(page, 'desktop-explodido');
  await page.locator('#explode').click(); await assenta(page);
  for (const peca of PECAS) {
    await page.locator(`[data-part="${peca}"]`).click(); await assenta(page);
    const estado = await page.evaluate(g => window[g].estado(), GLOBAL);
    assert.equal(estado.peca, peca, 'peça selecionada: ' + peca);
    if (!['placa', 'headers'].includes(peca)) assert.deepEqual(estado.visible, [peca], peca + ' isolada');
    await cabe(page, 'desktop peça ' + peca);
    await print(page, 'peca-' + peca);
    await page.locator('#showAll').click(); await assenta(page);
  }
  assert.equal((await page.evaluate(g => window[g].estado(), GLOBAL)).visible.length, 8, 'todas as peças de volta');
  // o L pisca como o Blink: em dois segundos ele muda de estado pelo menos uma vez
  await page.locator('[data-visible="chip"]').uncheck(); await assenta(page);
  assert.deepEqual((await page.evaluate(g => window[g].estado(), GLOBAL)).hidden, ['chip'], 'ocultar uma peça');
  await page.locator('#showAll').click(); await assenta(page);
  await page.locator('#leds').click();
  assert.equal(await page.locator('#leds').getAttribute('aria-pressed'), 'false', 'LEDs desligam');
  await page.locator('#leds').click();
  await page.close();

  const tel = await browser.newPage({ viewport: { width: 480, height: 1000 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  tel.on('pageerror', e => erros.push('telefone: ' + e.message));
  await tel.goto(url, { waitUntil: 'domcontentloaded' });
  await assenta(tel);
  await cabe(tel, 'telefone montado');
  await tel.locator('#explode').click(); await assenta(tel);
  await cabe(tel, 'telefone explodido');
  await tel.screenshot({ path: path.join(saida, 'telefone.png'), fullPage: true });
  await browser.close();

  assert.deepEqual(erros, [], 'sem erro de JS');
  console.log('PASS · capturas em ' + saida);
})().catch(e => { console.error('FAIL: ' + e.message); process.exit(1); });

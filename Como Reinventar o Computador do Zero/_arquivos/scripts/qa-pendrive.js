// Regressões específicas do pendrive: LED/difusor e toque no palco girado.
// Rodar com o servidor local: node .../_arquivos/scripts/qa-pendrive.js
const { chromium } = (() => { try { return require('playwright'); } catch { return require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'); } })();
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const base = process.env.MODELOS_URL || 'http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/';
const out = process.env.QA_OUT || path.join(os.tmpdir(), 'pendrive-final'); fs.mkdirSync(out, { recursive: true });
async function settle(page) {
  await page.waitForFunction(() => window.__pendrive && !window.__pendrive.estado().moving && window.__pendrive.estado().expanded === window.__pendrive.estado().targetExpanded);
  await page.waitForTimeout(160);
}
const state = page => page.evaluate(() => window.__pendrive.estado());
async function panel(page, open) {
  if ((await page.locator('#mobilePanel').getAttribute('aria-expanded') === 'true') !== open) await page.locator('#mobilePanel').tap();
  await page.waitForFunction(open => document.getElementById('mobilePanel').getAttribute('aria-expanded') === String(open), open);
  await page.waitForTimeout(120);
}
async function shot(page, name) { await page.locator('#stage').screenshot({ path: path.join(out, name + '.png') }); }
function watch(page, errors) {
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
}
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const errors = [];
  try {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } }); watch(desktop, errors);
    await desktop.goto(base + 'pendrive.html', { waitUntil: 'domcontentloaded' }); await settle(desktop);
    await shot(desktop, 'montado');
    const glow = await desktop.evaluate(() => window.__pendrive.detalhes().led); await desktop.waitForTimeout(250);
    assert.notEqual(await desktop.evaluate(() => window.__pendrive.detalhes().led), glow, 'LED pulsa');
    await desktop.locator('#atividade').click(); await desktop.waitForTimeout(100);
    assert.deepEqual(await desktop.evaluate(() => [window.__pendrive.detalhes().led, window.__pendrive.detalhes().diffuser]), [0, 0], 'LED e difusor apagam juntos');
    await desktop.locator('#atividade').click();
    await desktop.locator('[data-view="top"]').click(); await settle(desktop); await shot(desktop, 'cima');
    const roof = await desktop.evaluate(() => window.__pendrive.pixels().parts.tampa); await desktop.mouse.click(roof.x, roof.y); await settle(desktop);
    assert.deepEqual((await state(desktop)).visible, ['tampa'], 'clique na geometria seleciona a carcaça');
    await desktop.locator('#showAll').click(); await settle(desktop);
    await desktop.locator('#explode').click(); await settle(desktop); await shot(desktop, 'aberto');
    for (const [part, view, file] of [['placa', 'top', 'placa-frente'], ['placa', 'bottom', 'placa-verso'], ['flash', 'bottom', 'memoria-contatos'], ['conector', 'back', 'usb-aberto']]) {
      await desktop.locator(`[data-part="${part}"]`).click(); await desktop.locator(`[data-view="${view}"]`).click(); await settle(desktop); await shot(desktop, file);
    }
    const download = desktop.waitForEvent('download'); await desktop.locator('#snapshot').click(); assert.equal((await download).suggestedFilename(), 'pendrive.png');
    await desktop.close(); console.log('PASS desktop: LED/difusor, clique, abertura, versos e PNG');

    const mobile = await browser.newPage({ viewport: { width: 384, height: 686 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }); watch(mobile, errors);
    await mobile.goto(base + 'pendrive.html', { waitUntil: 'domcontentloaded' }); await settle(mobile);
    assert.ok(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'sem estouro horizontal');
    await mobile.screenshot({ path: path.join(out, 'celular.png') });
    for (const part of ['tampa', 'conector']) {
      await mobile.locator('[data-view="top"]').tap(); await settle(mobile);
      const p = await mobile.evaluate(part => window.__pendrive.pixels().parts[part], part); await mobile.touchscreen.tap(p.x, p.y); await settle(mobile);
      assert.deepEqual((await state(mobile)).visible, [part], 'toque seleciona ' + part + ' no palco girado');
      await panel(mobile, true); await mobile.locator('#showAll').tap(); await settle(mobile); await panel(mobile, false);
    }
    const cdp = await mobile.context().newCDPSession(mobile), rect = await mobile.locator('#cena canvas').boundingBox();
    const x = rect.x + rect.width * .50, y = rect.y + rect.height * .43, before = (await state(mobile)).camera;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 0 }] });
    for (let i = 1; i <= 6; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y + i * 10, id: 0 }] }); await mobile.waitForTimeout(20); }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await mobile.waitForTimeout(500);
    assert.ok(Math.hypot(...(await state(mobile)).camera.map((p, i) => p - before[i])) > .1, 'arraste muda a câmera');
    const distance = () => mobile.evaluate(() => { const p = window.__pendrive.pixels(); return Math.hypot(...p.camera.map((x, i) => x - p.target[i])); });
    const distanceBefore = await distance();
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x - 25, y, id: 0 }, { x: x + 25, y, id: 1 }] });
    for (let i = 1; i <= 5; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - 25 - i * 5, y, id: 0 }, { x: x + 25 + i * 5, y, id: 1 }] }); await mobile.waitForTimeout(20); }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await mobile.waitForTimeout(500);
    assert.ok(await distance() < distanceBefore, 'pinça aproxima o modelo');
    await mobile.locator('#reset').tap(); await settle(mobile);
    await panel(mobile, true); await mobile.locator('#explode').tap(); await settle(mobile); await panel(mobile, false);
    await mobile.screenshot({ path: path.join(out, 'celular-aberto.png') });
    await mobile.close(); console.log('PASS celular 384x686: toque nas peças, arraste, pinça, painel e abertura');

    const reduced = await browser.newPage({ viewport: { width: 1024, height: 800 }, reducedMotion: 'reduce' }); watch(reduced, errors);
    await reduced.goto(base + 'pendrive.html'); await settle(reduced);
    assert.equal((await state(reduced)).atividade, false); assert.equal(await reduced.evaluate(() => window.__pendrive.detalhes().led), 0);
    await reduced.locator('#atividade').click(); const steady = await reduced.evaluate(() => window.__pendrive.detalhes().led); await reduced.waitForTimeout(300);
    assert.equal(await reduced.evaluate(() => window.__pendrive.detalhes().led), steady, 'movimento reduzido usa luz constante');
    await reduced.close(); console.log('PASS movimento reduzido');

    // A nova conversão de ponteiro é opcional: a fonte continua usando o cálculo padrão.
    const fonte = await browser.newPage({ viewport: { width: 1280, height: 900 } }); watch(fonte, errors);
    await fonte.goto(base + 'fonte-alimentacao.html'); await fonte.waitForFunction(() => window.__fonteAlimentacao && !window.__fonteAlimentacao.estado().moving);
    await fonte.locator('[data-view="modular"]').click(); await fonte.waitForFunction(() => !window.__fonteAlimentacao.estado().moving);
    const point = await fonte.evaluate(() => window.__fonteAlimentacao.pixels().parts.cabos); await fonte.mouse.click(point.x, point.y);
    await fonte.waitForFunction(() => window.__fonteAlimentacao.estado().isolado);
    assert.equal(await fonte.evaluate(() => window.__fonteAlimentacao.estado().peca), 'cabos'); await fonte.close();
    assert.deepEqual(errors, []); console.log('PASS clique padrão da fonte e ausência de erros. Capturas: ' + out);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });

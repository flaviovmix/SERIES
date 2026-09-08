// Testa o Suanpan Play: duas famílias de contas, representações equivalentes e interação real.
// Consulte LEIA-ME-qa.md. Capturas são gravadas na pasta temporária, sem alterar modelos.
const { chromium } = require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
const models = root + '/Como Reinventar o Computador do Zero/_arquivos/modelos-3d';
const out = process.env.QA_OUT || path.join(require('node:os').tmpdir(), 'suanpan-play-qa');
const base = process.env.MODELOS_URL || 'http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/';
fs.mkdirSync(out, { recursive: true });
let browser;
(async () => {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => { errors.push(error.message); console.log('PAGE ERROR', error.message); });
  page.on('requestfailed', request => { console.log('REQUEST FAILED', request.url(), request.failure()); });
  await page.goto(base + 'suanpan.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.__suanpan);
  await page.waitForTimeout(600);
  await page.screenshot({ path: out + '/desktop.png', fullPage: true });
  const state = () => page.evaluate(() => window.__suanpan.estado());
  const bead = async (row, deck, index) => (await page.evaluate(() => window.__suanpan.pixels())).beads.find(b => b.row === row && b.deck === deck && b.index === index);
  const clickBead = async (row, deck, index) => { const p = await bead(row, deck, index); await page.mouse.click(p.x, p.y); await page.waitForTimeout(400); };
  const button = (row, deck, delta) => page.locator(`[data-row="${row}"][data-deck="${deck}"][data-delta="${delta}"]`);
  const check = (ok, label) => { assert.ok(ok, label); console.log('OK ' + label); };
  if (process.argv.includes('--embed-only')) {
    await page.setViewportSize({ width: 1280, height: 757 });
    await page.addStyleTag({ content: '.app{padding:0!important;max-width:none!important}.topbar,.introduction,.challenge,.scoreboard,.underboard,.bottom-strip,.arena-top,.arena-bottom,.deck-key{display:none!important}.game-layout{display:block}.arena{height:100vh!important;min-height:0!important;border:0;border-radius:0}.play-column{display:block}' });
    await page.waitForTimeout(700);
    await page.locator('#cena').screenshot({ path: out + '/suanpan.jpg', type: 'jpeg', quality: 90 });
    console.log('Miniatura gerada.');
    require('node:child_process').execFileSync(process.execPath, [root + '/Como Reinventar o Computador do Zero/_arquivos/scripts/embute-modelo-3d.js', '--so-monta', models + '/suanpan.html', out + '/suanpan-bundled.html']);
    const bundled = fs.readFileSync(out + '/suanpan-bundled.html', 'utf8');
    for (const [width, height] of [[1000,450],[390,425],[360,425]]) {
      await page.setContent(`<iframe style="border:0;width:${width}px;height:${height}px" title="Suanpan"></iframe>`);
      await page.locator('iframe').evaluate((el, html) => { el.src = 'data:text/html;base64,' + btoa(unescape(encodeURIComponent(html))); }, bundled);
      const frame = page.frames()[1];
      await frame.waitForFunction(() => !!window.__suanpan);
      await page.waitForTimeout(300);
      await page.locator('iframe').screenshot({ path: out + `/embed-${width}.png` });
      const layout = await frame.evaluate(() => ({ x: document.documentElement.scrollWidth - innerWidth, y: document.documentElement.scrollHeight - innerHeight, mode: window.__suanpan.estado().mode }));
      check(layout.x <= 1 && layout.y <= 1, `${width}×${height}: embutido sem cortes ${JSON.stringify(layout)}`);
      if (width < 700) check(layout.mode === 'free', 'modo livre na capa compacta');
    }
    await browser.close(); return;
  }
  check((await page.evaluate(() => window.__suanpan.pixels())).beads.length === 28, 'quatro hastes de duas contas de cinco e cinco de um');
  check((await state()).total === 0, 'contas afastadas da barra representam zero');
  const before = await bead(3, 'five', 0);
  await clickBead(3, 'five', 0);
  check((await state()).total === 5 && (await bead(3, 'five', 0)).x > before.x, 'conta de cinco se move para a direita e soma cinco');
  await clickBead(3, 'one', 1);
  check((await state()).total === 7 && (await state()).xp === 100, 'uma de cinco e duas de um resolvem 7');
  await page.screenshot({ path: out + '/seven.png', fullPage: true });
  await page.locator('#btnNext').click();
  await clickBead(3, 'five', 1); await clickBead(3, 'one', 3);
  check((await state()).total === 14 && (await state()).solved, 'duas de cinco e quatro de um: representação equivalente de 14 aceita');
  await page.locator('#modeFree').click(); await page.locator('#btnLimpar').click();
  await page.waitForTimeout(500);
  let p = await bead(2, 'five', 1);
  await page.mouse.move(p.x, p.y); await page.mouse.down(); await page.mouse.move(p.x + 70, p.y, { steps: 10 }); await page.mouse.up(); await page.waitForTimeout(500);
  check((await state()).total === 100, 'arraste à direita aproxima as duas contas de cinco da dezena');
  p = await bead(2, 'five', 0);
  await page.mouse.move(p.x, p.y); await page.mouse.down(); await page.mouse.move(p.x - 70, p.y, { steps: 10 }); await page.mouse.up(); await page.waitForTimeout(500);
  check((await state()).total === 0, 'arraste à esquerda afasta as contas de cinco');
  p = await bead(3, 'one', 4);
  await page.mouse.move(p.x, p.y); await page.mouse.down(); await page.mouse.move(p.x - 70, p.y, { steps: 10 }); await page.mouse.up(); await page.waitForTimeout(500);
  check((await state()).total === 5, 'cinco contas de um também valem cinco');
  p = await bead(3, 'one', 0);
  await page.mouse.move(p.x, p.y); await page.mouse.down(); await page.mouse.move(p.x + 70, p.y, { steps: 10 }); await page.mouse.up(); await page.waitForTimeout(500);
  check((await state()).total === 0, 'arraste à direita afasta as contas de um');
  await button(3, 'five', 1).focus(); await page.keyboard.press('Enter');
  check((await state()).total === 5, 'teclado controla a família de cinco');
  await button(3, 'one', 1).focus(); await page.keyboard.press('Enter');
  check((await state()).total === 6, 'teclado controla a família de um');
  await page.locator('#btnExemplo').click(); await page.waitForTimeout(2200);
  check((await state()).total === 7, 'demonstração mostra 5 + 2');
  await page.locator('#btnLimpar').click(); await page.waitForTimeout(3100);
  check((await state()).total === 0 && !(await state()).demoRunning, 'zerar cancela a demonstração');
  await page.locator('#btnExemplo').click(); await page.waitForTimeout(5100);
  check((await state()).total === 5 && (await state()).decks[3].five === 1 && (await state()).decks[3].one === 0, 'demonstração termina com troca de cinco de um por uma de cinco');
  await page.locator('#modeChallenge').click();
  check((await state()).decks[3].five === 2 && (await state()).decks[3].one === 4, 'retoma a representação física exata do desafio');
  await page.locator('#btnNext').click();
  for (let round = 2; round < 8; round++) {
    const goal = String((await state()).target).padStart(4, '0').split('').map(Number);
    for (let row = 0; row < 4; row++) {
      for (let i = 0; i < Math.floor(goal[row] / 5); i++) await button(row, 'five', 1).click();
      for (let i = 0; i < goal[row] % 5; i++) await button(row, 'one', 1).click();
    }
    check((await state()).solved && (await state()).xp === (round + 1) * 100, 'desafio ' + (round + 1) + ' concluído');
    if (round < 7) await page.locator('#btnNext').click();
  }
  await page.locator('#modeFree').click(); await page.locator('#btnLimpar').click();
  for (let row = 0; row < 4; row++) {
    for (let i = 0; i < 2; i++) await button(row, 'five', 1).click();
    for (let i = 0; i < 5; i++) await button(row, 'one', 1).click();
  }
  check((await state()).total === 16665, 'valor físico máximo é 16.665, sem perder as contas extras');
  check(await button(3, 'five', 1).isDisabled() && await button(3, 'one', 1).isDisabled(), 'limites de duas e cinco contas respeitados');
  for (const [name, width, height] of [['desktop', 1440, 1000], ['laptop', 1024, 768], ['mobile', 390, 844], ['small-mobile', 360, 780]]) {
    await page.setViewportSize({ width, height }); await page.waitForTimeout(500);
    const layout = await page.evaluate(() => {
      const r = document.querySelector('#cena').getBoundingClientRect();
      const target = document.querySelector('#target');
      return { overflow: document.documentElement.scrollWidth - innerWidth, targetOverflow: target.scrollWidth - target.clientWidth, rect: { x: r.x, y: r.y, right: r.right, bottom: r.bottom }, beads: window.__suanpan.pixels().beads };
    });
    check(layout.overflow <= 1, name + ': sem estouro horizontal');
    check(layout.targetOverflow <= 1, name + ': valor máximo cabe no painel');
    check(layout.beads.every(p => p.x > layout.rect.x && p.x < layout.rect.right && p.y > layout.rect.y && p.y < layout.rect.bottom), name + ': todas as contas visíveis');
    await page.screenshot({ path: out + '/' + name + '-max.png', fullPage: true });
  }
  check(errors.length === 0, 'sem erros JavaScript: ' + errors.join(' | '));
  await browser.close();
})().catch(async error => { if (browser) await browser.close(); console.error(error); process.exit(1); });

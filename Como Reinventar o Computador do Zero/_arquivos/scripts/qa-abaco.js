// Verifica o Ábaco Play por cliques, arraste e teclado em um navegador real.
// Uso e pré-requisitos em LEIA-ME-qa.md. As capturas ficam no diretório temporário.
const { chromium } = require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const assert = require('assert/strict');
const path = require('path');
const root = path.resolve(__dirname, '../../..');
const base = process.env.MODELOS_URL || 'http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/';
const out = process.env.QA_OUT || path.join(require('os').tmpdir(), 'abaco-play-qa');
fs.mkdirSync(out, { recursive: true });
require('child_process').execFileSync(process.execPath, [root + '/Como Reinventar o Computador do Zero/_arquivos/scripts/embute-modelo-3d.js', '--so-monta', root + '/Como Reinventar o Computador do Zero/_arquivos/modelos-3d/abaco.html', out + '/abaco-bundled.html']);
let browser;
(async () => {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  const errors = [];
  page.on('pageerror', error => { errors.push(error.message); console.log('PAGE ERROR', error.message); });
  page.on('requestfailed', request => console.log('REQUEST FAILED', request.url(), request.failure()));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
  await page.goto(base + 'abaco.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: out + '/loading.png', fullPage: true });
  await page.waitForFunction(() => !!window.__abaco, null, { timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: out + '/desktop.png', fullPage: true });
  const state = () => page.evaluate(() => window.__abaco.estado());
  const bead = async (row, index) => (await page.evaluate(() => window.__abaco.pixels())).beads.find(b => b.row === row && b.index === index);
  const check = (ok, message) => { assert.ok(ok, message); console.log('OK ' + message); };
  if (!process.argv.includes('--embed-only')) {
  check((await state()).total === 0, 'começa em zero');
  for (let row = 0; row < 4; row++) {
    const point = await bead(row, row);
    await page.mouse.click(point.x, point.y);
    await page.waitForTimeout(350);
  }
  check((await state()).total === 1234, 'clique nas quatro hastes monta 1.234');
  check((await state()).xp === 100 && (await state()).solved, 'desafio libera próxima fase e 100 XP');
  await page.screenshot({ path: out + '/success.png', fullPage: true });
  await page.getByRole('button', { name: 'Zerar', exact: true }).click();
  for (let row = 0; row < 4; row++) for (let i = 0; i <= row; i++) await page.locator(`[data-row="${row}"][data-delta="1"]`).click();
  check((await state()).xp === 100, 'repetir o objetivo não duplica XP');
  await page.locator('#btnNext').click();
  check((await state()).target === 42 && (await state()).total === 0, 'próximo desafio começa zerado');
  await page.locator('#modeFree').click();
  await page.locator('#btnLimpar').click();
  let point = await bead(2, 4);
  await page.mouse.move(point.x, point.y); await page.mouse.down(); await page.mouse.move(point.x - 75, point.y, { steps: 12 }); await page.mouse.up();
  check((await state()).digits[2] === 5, 'arrastar cinco contas à esquerda soma cinquenta');
  await page.waitForTimeout(650);
  point = await bead(2, 0);
  await page.mouse.move(point.x, point.y); await page.mouse.down(); await page.mouse.move(point.x + 75, point.y, { steps: 12 }); await page.mouse.up();
  check((await state()).digits[2] === 0, 'arrastar de volta à direita zera a haste');
  await page.locator('[data-row="3"][data-delta="1"]').focus(); await page.keyboard.press('Enter');
  check((await state()).total === 1, 'teclado move as contas');
  await page.locator('#btnExemplo').click(); await page.waitForTimeout(650); await page.locator('#btnLimpar').click(); await page.waitForTimeout(2800);
  check((await state()).total === 0 && !(await state()).demoRunning, 'zerar cancela todos os passos do exemplo');
  await page.locator('#btnExemplo').click(); await page.waitForTimeout(3300);
  check((await state()).total === 1234 && (await state()).xp === 100, 'exemplo termina em 1.234 sem ganhar XP');
  await page.locator('#modeChallenge').click();
  check((await state()).total === 0 && (await state()).target === 42, 'voltar do exemplo restaura o desafio pendente');
  for (let round = 1; round < 8; round++) {
    const goal = String((await state()).target).padStart(4, '0').split('').map(Number);
    for (let row = 0; row < 4; row++) for (let i = 0; i < goal[row]; i++) await page.locator(`[data-row="${row}"][data-delta="1"]`).click();
    check((await state()).solved && (await state()).xp === (round + 1) * 100, `desafio ${round + 1} completo`);
    if (round < 7) await page.locator('#btnNext').click();
  }
  check((await state()).completed === 8 && await page.locator('#nextLabel').textContent() === 'Jogar novamente', 'oito desafios terminam em 800 XP');
  check(await page.locator('[data-row="0"][data-delta="1"]').isDisabled(), 'cada haste para em nove contas');
  await page.locator('#btnNext').click();
  check((await state()).xp === 0 && (await state()).total === 0 && (await state()).target === 1234, 'nova partida reinicia a pontuação');
  await page.locator('#btnExemplo').click(); await page.waitForTimeout(3300);
  await page.locator('#btnHelp').click(); check(await page.locator('#helpDialog').isVisible(), 'ajuda abre');
  await page.keyboard.press('Escape'); check(!(await page.locator('#helpDialog').isVisible()), 'Escape fecha a ajuda');
  await page.locator('#btnSound').click(); check(await page.locator('#btnSound').getAttribute('aria-pressed') === 'true', 'som opcional liga');
  await page.locator('#btnSound').click();
  for (const [name, width, height] of [['desktop', 1440, 960], ['laptop', 1024, 768], ['mobile', 390, 844], ['small-mobile', 360, 780], ['landscape', 844, 390]]) {
    await page.setViewportSize({ width, height }); await page.waitForTimeout(550);
    const layout = await page.evaluate(() => {
      const rect = document.querySelector('#cena').getBoundingClientRect();
      return { overflow: document.documentElement.scrollWidth - innerWidth, rect: { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom }, pieces: window.__abaco.pixels() };
    });
    check(layout.overflow <= 1, name + ': sem estouro horizontal');
    check(layout.pieces.beads.every(p => p.x > layout.rect.x && p.x < layout.rect.right && p.y > layout.rect.y && p.y < layout.rect.bottom), name + ': todas as contas dentro do palco');
    await page.screenshot({ path: out + '/' + name + '-played.png', fullPage: true });
  }
  check(errors.length === 0, 'sem erros de JavaScript ou HTTP: ' + errors.join(' | '));
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.locator('#modeChallenge').click();
  for (let row = 0; row < 4; row++) for (let i = 0; i <= row; i++) await page.locator(`[data-row="${row}"][data-delta="1"]`).click();
  await page.waitForTimeout(3200);
  await page.screenshot({ path: out + '/final-desktop.png', fullPage: true });
  }
  const bundled = fs.readFileSync(out + '/abaco-bundled.html', 'utf8');
  for (const [width, height] of [[1000, 450], [390, 425]]) {
    await page.setContent(`<iframe style="border:0;width:${width}px;height:${height}px" title="Ábaco"></iframe>`);
    await page.locator('iframe').evaluate((el, html) => { el.src = 'data:text/html;base64,' + btoa(unescape(encodeURIComponent(html))); }, bundled);
    const frame = await page.locator('iframe').contentFrame();
    await frame.locator('#loading').waitFor({ state: 'hidden' });
    const result = await page.frames()[1].evaluate(() => ({
      mounted: !!window.__abaco,
      overflow: document.documentElement.scrollWidth - innerWidth,
      vertical: document.documentElement.scrollHeight - innerHeight,
      mode: window.__abaco.estado().mode,
    }));
    await page.locator('iframe').screenshot({ path: out + `/embed-${width}.png` });
    check(result.mounted && result.overflow <= 1 && result.vertical <= 1, `${width}×${height}: versão embutida inteira, sem cortes (${JSON.stringify(result)})`);
    if (width === 390) check(result.mode === 'free', 'capa compacta abre no modo livre');
    await page.locator('iframe').screenshot({ path: out + `/embed-${width}.png` });
  }
  await browser.close();
})().catch(async error => { if (browser) await browser.close(); console.error(error); process.exit(1); });

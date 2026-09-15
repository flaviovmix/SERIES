// Interações e enquadramento do estudo da RTX 5090. Requer servidor HTTP e Edge.
const { chromium } = (() => { try { return require('playwright'); } catch { return require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'); } })();
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const url = (process.env.MODELOS_URL || 'http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/') + 'rtx-5090.html';
const output = process.env.QA_OUT || path.join(os.tmpdir(), 'rtx5090-qa');
fs.mkdirSync(output, { recursive: true });
let browser;
const errors = [];
const settle = async target => {
  await target.waitForFunction(() => !!window.__rtx5090, undefined, { timeout: 20000 });
  // A mudança de viewport agenda o ResizeObserver e depois o ajuste de câmera.
  await target.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await target.waitForFunction(() => { const s = window.__rtx5090.estado(); return !s.moving && s.expanded === s.targetExpanded; }, undefined, { timeout: 20000 });
};
const state = target => target.evaluate(() => window.__rtx5090.estado());
async function framed(target, name) {
  const result = await target.evaluate(() => {
    const r = document.querySelector('#cena').getBoundingClientRect();
    return { corners: window.__rtx5090.pixels().corners, bounds: { left: r.left, right: r.right, top: r.top, bottom: r.bottom }, overflow: document.documentElement.scrollWidth - innerWidth };
  });
  assert.ok(result.overflow <= 1, name + ': conteúdo sem estouro horizontal');
  for (const p of result.corners) assert.ok(p.x > result.bounds.left + 5 && p.x < result.bounds.right - 5 && p.y > result.bounds.top + 35 && p.y < result.bounds.bottom - 35, name + ': modelo dentro do palco e fora dos controles ' + JSON.stringify(result));
}
(async () => {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  page.on('pageerror', error => { errors.push(error.message); console.error('Browser:', error.message); });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await settle(page);
  assert.ok(await page.locator('#loading').isHidden());
  assert.ok((await state(page)).meshes > 100, 'Geometria renderizada');
  await framed(page, 'desktop');
  await page.screenshot({ path: path.join(output, 'desktop.png'), fullPage: true });
  if (process.argv.includes('--preview-only')) { console.log('Prévia: ' + output); return; }
  for(const part of ['ports','power','pcie']){
    await page.locator(`[data-part="${part}"]`).click();await settle(page);await framed(page,part+' isolado');
    assert.deepEqual((await state(page)).visible,[part]);
    await page.screenshot({path:path.join(output,'connector-'+part+'.png'),fullPage:true});
  }
  await page.locator('#showAll').click();await settle(page);
  for(const part of ['frame','back','fans'])await page.locator(`[data-visible="${part}"]`).uncheck();
  await settle(page);assert.deepEqual((await state(page)).hidden.sort(),['back','fans','frame']);
  await page.screenshot({path:path.join(output,'hidden-shell.png'),fullPage:true});
  await page.locator('[data-part="power"]').click();await settle(page);
  await page.locator('#isolate').click();await settle(page);
  assert.deepEqual((await state(page)).hidden.sort(),['back','fans','frame'],'Sair do isolamento preserva as peças ocultas');
  for(const part of ['board','cooler','ports','pcie'])await page.locator(`[data-visible="${part}"]`).uncheck();
  await settle(page);assert.ok(await page.locator('[data-visible="power"]').isDisabled(),'Última peça permanece visível');
  await page.locator('#showAll').click();await settle(page);assert.equal((await state(page)).visible.length,8);
  if(process.argv.includes('--connectors-only')){assert.deepEqual(errors,[]);console.log('PASS conectores, ocultação individual, isolamento e restauração.');return;}
  const movingRotor = (await state(page)).rotors[0];
  await page.waitForTimeout(240);
  assert.notEqual((await state(page)).rotors[0], movingRotor, 'Ventoinhas animadas');
  await page.locator('#fans').click();
  const stoppedRotor = (await state(page)).rotors[0];
  await page.waitForTimeout(240);
  assert.equal((await state(page)).rotors[0], stoppedRotor, 'Ventoinhas param');
  for (const view of ['front', 'back', 'ports', 'perspective']) {
    console.log('Verificando vista: ' + view);
    await page.locator(`[data-view="${view}"]`).click(); await settle(page); await framed(page, view);
    await page.screenshot({ path: path.join(output, view + '.png'), fullPage: true });
  }
  await page.locator('[data-part="board"]').click(); await settle(page);
  assert.equal((await state(page)).targetExpanded, 1, 'GPU revela a vista desmontada');
  assert.match(await page.locator('#partText').textContent(), /32 GB/);
  await framed(page, 'explodida');
  await page.screenshot({ path: path.join(output, 'exploded.png'), fullPage: true });
  await page.locator('#isolate').click(); await settle(page); await framed(page, 'GPU isolada');
  assert.equal((await state(page)).isolated, true, 'Componente pode ser visto separado');
  await page.screenshot({ path: path.join(output, 'gpu.png'), fullPage: true });
  await page.locator('[data-view="back"]').click(); await settle(page); await framed(page, 'costas do PCB');
  await page.screenshot({ path: path.join(output, 'gpu-back.png'), fullPage: true });
  await page.locator('#isolate').click(); await settle(page);
  await page.locator('#separation').fill('45'); await settle(page);
  assert.equal((await state(page)).targetExpanded, .45, 'Separação parcial');
  await page.locator('#explode').click(); await settle(page);
  assert.equal((await state(page)).expanded, 0, 'Montagem recupera posições originais');
  await page.locator('#rotate').click();
  const initialCamera = (await state(page)).camera;
  await page.waitForTimeout(350);
  assert.notDeepEqual((await state(page)).camera, initialCamera, 'Giro automático');
  const canvas = page.locator('#cena canvas'), rect = await canvas.boundingBox();
  await page.mouse.move(rect.x + rect.width * .5, rect.y + rect.height * .5);
  await page.mouse.down(); await page.mouse.move(rect.x + rect.width * .6, rect.y + rect.height * .54, { steps: 8 }); await page.mouse.up();
  assert.equal((await state(page)).rotating, false, 'Arrastar interrompe o giro automático');
  await canvas.focus();
  const cameraBeforeKey = (await state(page)).camera;
  await page.keyboard.press('ArrowLeft');
  assert.notDeepEqual((await state(page)).camera, cameraBeforeKey, 'Rotação por teclado');
  await page.keyboard.press('Home'); await settle(page);
  const downloadReady = page.waitForEvent('download'); await page.locator('#snapshot').click();
  const download = await downloadReady; await download.saveAs(path.join(output, 'saved-image.png'));
  assert.ok(fs.statSync(path.join(output, 'saved-image.png')).size > 20000, 'Exportação de imagem');
  await page.locator('#fullscreen').click(); assert.ok(await page.evaluate(() => !!document.fullscreenElement));
  await page.evaluate(() => document.exitFullscreen()); await settle(page);
  await page.locator('[data-part="frame"]').click(); await page.locator('#reset').click(); await settle(page);
  const hideLabels = await page.addStyleTag({ content: '.stage-heading,.stage-bottom{visibility:hidden!important}' });
  await page.locator('.stage').screenshot({ path: path.join(output, 'thumb.jpg'), type: 'jpeg', quality: 88 });
  await hideLabels.evaluate(node => node.remove());
  for (const [width, height] of [[1024, 900], [768, 1024], [390, 844], [360, 780]]) {
    console.log('Verificando largura: ' + width);
    await page.setViewportSize({ width, height }); await settle(page); await framed(page, width + 'px');
    await page.locator('#explode').click(); await settle(page); await framed(page, width + 'px explodida');
    await page.locator('#explode').click(); await settle(page);
    await page.screenshot({ path: path.join(output, 'width-' + width + '.png'), fullPage: true });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal((await state(page)).fans, false);
  await page.reload({ waitUntil: 'domcontentloaded' }); await settle(page);
  assert.equal((await state(page)).fans, false, 'Movimento reduzido começa sem animação');
  await page.locator('#explode').click(); await settle(page);
  assert.equal((await state(page)).expanded, 1);
  // O HTML do iframe testa o mesmo caminho usado pelas animações de episódios.
  for (const [width, height] of [[960, 480], [390, 450]]) {
    await page.setViewportSize({ width: 1100, height: 800 });
    await page.setContent(`<iframe title="Modelo embutido" src="${url}" style="border:0;width:${width}px;height:${height}px"></iframe>`);
    const frame = await (await page.$('iframe')).contentFrame();
    await settle(frame); await framed(frame, `iframe ${width}x${height}`);
    assert.ok(await frame.locator('.inspector').isHidden(), 'Iframe compacto mantém o palco livre');
    await page.locator('iframe').screenshot({ path: path.join(output, `embed-${width}.png`) });
  }
  assert.deepEqual(errors, [], 'Sem erros de JavaScript');
  console.log('PASS: geometria, ventoinhas, quatro vistas, desmontagem, separação, giro, arraste, teclado, PNG, tela cheia, cinco larguras, movimento reduzido e dois iframes.');
  console.log('Capturas: ' + output);
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { await browser?.close(); });

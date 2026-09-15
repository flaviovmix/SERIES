// QA de qualquer modelo montado sobre a casca comum `_visualizador-pecas.js`.
// Não sabe nada do modelo: descobre as vistas, as peças e os botões liga/desliga
// lendo o próprio HTML, e usa o gancho `window.<global>` que a casca sempre expõe.
//
//   node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-visualizador.js" <modelo.html> [--thumb]
//
// Ex.: ... qa-visualizador.js protoboard.html
//      ... qa-visualizador.js arduino-uno.html --thumb
//
// Em cada estado confere o que o teste de estado sozinho não pega: que os oito
// cantos da caixa do modelo caem DENTRO do palco e fora dos controles, no desktop
// e no telefone (lição do predio-da-agua, que passou 27/27 com peça escondida).
// `--thumb` grava a miniatura da galeria sem o HUD por cima.
const { chromium } = (() => { try { return require('playwright'); } catch { return require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'); } })();
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const arquivo = process.argv[2];
if (!arquivo || arquivo.startsWith('--')) {
  console.error('Uso: node qa-visualizador.js <modelo.html> [--thumb]');
  process.exit(1);
}
const slug = path.basename(arquivo, '.html');
const PASTA_DOS_MODELOS = path.resolve(__dirname, '../modelos-3d');
const base = process.env.MODELOS_URL || 'http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/';
const url = base + path.basename(arquivo);
const saida = process.env.QA_OUT || path.join(os.tmpdir(), slug + '-qa');
fs.mkdirSync(saida, { recursive: true });
const soThumb = process.argv.includes('--thumb');

// O nome do gancho global vem do próprio HTML: `window.__xLoadTimer` no script de topo.
async function achaGlobal(page) {
  const nome = await page.evaluate(() => Object.keys(window).find(k => k.startsWith('__') && window[k] && typeof window[k].estado === 'function'));
  assert.ok(nome, 'o modelo expôs o gancho de QA em window.__<modelo>');
  return nome;
}

async function assenta(page, global) {
  await page.waitForFunction(() => Object.keys(window).some(k => k.startsWith('__') && window[k] && typeof window[k].estado === 'function'), undefined, { timeout: 30000 });
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.waitForFunction(g => { const s = window[g].estado(); return !s.moving && s.expanded === s.targetExpanded; }, global, { timeout: 30000 });
  await page.waitForTimeout(320);
}

const estadoDe = (page, global) => page.evaluate(g => window[g].estado(), global);

async function cabe(page, global, nome, falhas) {
  const medida = await page.evaluate(g => {
    const p = window[g].pixels(), c = document.querySelector('#cena').getBoundingClientRect();
    return { cantos: p.corners, cena: { left: c.left, right: c.right, top: c.top, bottom: c.bottom }, estouro: document.documentElement.scrollWidth - innerWidth };
  }, global);
  const fora = medida.cantos.filter(p => !(p.x > medida.cena.left + 5 && p.x < medida.cena.right - 5 && p.y > medida.cena.top + 35 && p.y < medida.cena.bottom - 35));
  if (medida.estouro > 1) falhas.push(`${nome}: página estoura ${medida.estouro}px na horizontal`);
  if (fora.length) falhas.push(`${nome}: ${fora.length} de 8 cantos do modelo fora do palco`);
  console.log((fora.length || medida.estouro > 1 ? 'FALHA  ' : 'ok     ') + nome);
}

const print = (page, nome) => page.locator('#stage').screenshot({ path: path.join(saida, nome + '.png') });

(async () => {
  const navegador = await chromium.launch({ channel: 'msedge', headless: true });
  const erros = [], falhas = [];
  const page = await navegador.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', e => erros.push(e.message));
  page.on('console', m => { if (m.type() === 'error') erros.push('console: ' + m.text()); });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  const global = await (async () => { await page.waitForFunction(() => Object.keys(window).some(k => k.startsWith('__') && window[k] && typeof window[k].estado === 'function'), undefined, { timeout: 30000 }); return achaGlobal(page); })();
  await assenta(page, global);
  assert.ok(await page.locator('#loading').isHidden(), 'o aviso de carregamento sai da frente');

  if (soThumb) {
    await page.evaluate(() => { document.querySelector('.stage-heading').hidden = true; document.querySelector('.stage-bottom').hidden = true; });
    await page.waitForTimeout(220);
    const thumb = path.join(PASTA_DOS_MODELOS, 'thumbs', slug + '.jpg');
    await page.locator('#stage').screenshot({ path: thumb, type: 'jpeg', quality: 86 });
    console.log('thumb: ' + thumb);
    await navegador.close();
    return;
  }

  const vistas = await page.locator('[data-view]').evaluateAll(bs => bs.map(b => b.dataset.view));
  const pecas = await page.locator('[data-part]').evaluateAll(bs => bs.map(b => b.dataset.part));
  const botoes = await page.locator('.viewer-actions button[aria-pressed]').evaluateAll(bs => bs.map(b => b.id).filter(id => id && id !== 'rotate' && id !== 'pan'));
  console.log(`${slug}: ${vistas.length} vistas, ${pecas.length} peças, ${botoes.length} botões liga/desliga`);

  await cabe(page, global, 'desktop montado', falhas);
  await print(page, 'montado');
  for (const vista of vistas) {
    await page.locator(`[data-view="${vista}"]`).click(); await assenta(page, global);
    await cabe(page, global, 'vista ' + vista, falhas);
    await print(page, 'vista-' + vista);
  }
  await page.locator(`[data-view="${vistas[0]}"]`).click(); await assenta(page, global);

  await page.locator('#explode').click(); await assenta(page, global);
  assert.equal((await estadoDe(page, global)).targetExpanded, 1, 'o botão de explorar separa as peças');
  await cabe(page, global, 'explodido', falhas);
  await print(page, 'explodido');
  await page.locator('#explode').click(); await assenta(page, global);
  assert.equal((await estadoDe(page, global)).targetExpanded, 0, 'o mesmo botão monta de volta');

  for (const peca of pecas) {
    await page.locator(`[data-part="${peca}"]`).click(); await assenta(page, global);
    assert.equal((await estadoDe(page, global)).peca, peca, 'a peça selecionada é ' + peca);
    await cabe(page, global, 'peça ' + peca, falhas);
    await print(page, 'peca-' + peca);
    await page.locator('#showAll').click(); await assenta(page, global);
  }
  // conta grupos pela lista de mostrar/ocultar, não pelos botões: um grupo pode responder
  // pelo botão de outro (as duas chapas do dissipador do pente são um botão só)
  const totalDeGrupos = await page.locator('[data-visible]').count();
  assert.equal((await estadoDe(page, global)).visible.length, totalDeGrupos, 'Mostrar todas devolve todas as peças');

  // ocultar peça, e a última nunca pode sumir
  const primeira = await page.locator('[data-visible]').first().getAttribute('data-visible');
  await page.locator(`[data-visible="${primeira}"]`).uncheck(); await assenta(page, global);
  assert.deepEqual((await estadoDe(page, global)).hidden, [primeira], 'ocultar uma peça esconde só ela');
  await page.locator('#showAll').click(); await assenta(page, global);

  for (const botao of botoes) {
    const antes = await page.locator('#' + botao).getAttribute('aria-pressed');
    await page.locator('#' + botao).click(); await assenta(page, global);
    assert.notEqual(await page.locator('#' + botao).getAttribute('aria-pressed'), antes, 'o botão ' + botao + ' alterna');
    await print(page, 'botao-' + botao);
    await cabe(page, global, 'botão ' + botao, falhas);
    await page.locator('#' + botao).click(); await assenta(page, global);
  }
  console.log('draw calls: ' + (await estadoDe(page, global)).meshes);
  await page.close();

  const telefone = await navegador.newPage({ viewport: { width: 480, height: 1000 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  telefone.on('pageerror', e => erros.push('telefone: ' + e.message));
  await telefone.goto(url, { waitUntil: 'domcontentloaded' });
  await assenta(telefone, global);
  await cabe(telefone, global, 'telefone montado', falhas);
  const menuMobile=telefone.locator('#mobilePanel');
  if(await menuMobile.isVisible())await menuMobile.click();
  await telefone.locator('#explode').click(); await assenta(telefone, global);
  if(await menuMobile.isVisible())await menuMobile.click();
  await cabe(telefone, global, 'telefone explodido', falhas);
  await telefone.screenshot({ path: path.join(saida, 'telefone.png'), fullPage: true });
  await navegador.close();

  if (erros.length) falhas.push('erro de JS: ' + erros.join(' | '));
  if (falhas.length) { console.error('\nFAIL\n- ' + falhas.join('\n- ')); process.exit(1); }
  console.log('\nPASS · capturas em ' + saida);
})().catch(e => { console.error('FAIL: ' + e.message); process.exit(1); });

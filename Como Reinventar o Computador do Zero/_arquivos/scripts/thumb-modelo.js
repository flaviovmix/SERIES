// Tira a miniatura de um modelo 3D pro indice: mesma medida das que ja existem
// (1280x757), sem o painel e sem a faixa de titulo, so a maquina no palco.
//
//   node thumb-modelo.js <url do modelo> <arquivo de saida .png> [comandos]
//
// O terceiro argumento e um pedaco de JS rodado antes do print, pra maquina
// aparecer no estado que interessa (camadas abertas, por exemplo).
// Como rodar e por que cada checagem existe: LEIA-ME-qa.md nesta pasta.
const { chromium } = require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const [url, saida, comandos] = process.argv.slice(2);
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 757 } });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(2500);

  // painel e faixa saem: a miniatura e da maquina, nao da interface
  await page.evaluate(() => {
    const hud = document.querySelector('.hud');
    const faixa = document.querySelector('header');
    if (hud) hud.remove();
    if (faixa) faixa.remove();
  });
  if (comandos) await page.evaluate(comandos);

  // O reenquadramento da base ouve o TAMANHO do #cena, nao a saida do painel:
  // sem mudar a janela, a camera continua deslocada pra direita como se o painel
  // ainda estivesse la, e a maquina sai torta na miniatura.
  await page.setViewportSize({ width: 1281, height: 757 });
  await page.waitForTimeout(400);
  await page.setViewportSize({ width: 1280, height: 757 });
  await page.waitForTimeout(1800);

  await page.screenshot({ path: saida });
  await browser.close();
  console.log('miniatura: ' + saida);
})();

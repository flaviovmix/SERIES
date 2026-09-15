// Confere a troca de tema no menu (site e animacao, guardada ao recarregar) e a foto
// em cima no card da home no telefone (e ainda a esquerda no desktop).
const fs = require('fs');
const path = require('path');

const candidatos = ['C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'];
const achado = candidatos.find(c => fs.existsSync(c));
if (!achado) { console.log('playwright nao encontrado'); process.exit(1); }
const { chromium } = require(achado);

// sem argumento testa o local; com "ar" testa series.afx.art.br
const NO_AR = process.argv[2] === 'ar';
const RAIZ = NO_AR ? 'https://series.afx.art.br/' : 'file:///C:/src/PROJETOS/SEIRES/';
const HOME = RAIZ + 'site/index.html';
const ANIMACAO = RAIZ + encodeURI('Como Reinventar o Computador do Zero/01 - Contar antes das máquinas/01 - O Ábaco/animacao.html');
const saida = process.env.QA_OUT || require("os").tmpdir();   // capturas na pasta temporaria, nunca aqui

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  let falhas = 0;
  const conta = (ok, texto) => { if (!ok) falhas++; console.log(`${ok ? 'OK ' : 'XX '} ${texto}`); };

  // o card: foto em cima no telefone, a esquerda no desktop
  for (const t of [{ nome: 'tel384', w: 384, h: 688, emCima: true }, { nome: 'tel360', w: 360, h: 640, emCima: true }, { nome: 'd1920', w: 1920, h: 1080, emCima: false }]) {
    const page = await browser.newPage({ viewport: { width: t.w, height: t.h }, colorScheme: 'dark' });
    await page.goto(HOME, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    const r = await page.evaluate(() => [...document.querySelectorAll('.grade--series .cap')].map((c) => {
      const a = c.querySelector('.cap__arte').getBoundingClientRect();
      const b = c.querySelector('.cap__corpo').getBoundingClientRect();
      return { emCima: a.bottom <= b.top + 1, esquerda: a.right <= b.left + 1, altura: Math.round(a.height) };
    }));
    const rola = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const ok = r.every((x) => (t.emCima ? x.emCima : x.esquerda)) && !rola;
    conta(ok, `card ${t.nome}: ${t.emCima ? 'foto em cima' : 'foto a esquerda'} em ${r.filter((x) => (t.emCima ? x.emCima : x.esquerda)).length}/${r.length}, altura da foto ${r[0].altura}${rola ? ' ROLA' : ''}`);
    if (t.nome === 'tel384') await page.screenshot({ path: path.join(saida, 'tema-card-tel384.png') });
    await page.close();
  }

  // a troca de tema, numa pagina do site e numa animacao
  const context = await browser.newContext({ viewport: { width: 384, height: 688 }, colorScheme: 'dark' });
  for (const alvo of [{ nome: 'site', url: HOME, claro: 'rgb(244, 243, 238)', escuro: 'rgb(28, 42, 63)' },
                      { nome: 'animacao', url: ANIMACAO, claro: 'rgb(244, 246, 248)', escuro: 'rgb(17, 22, 26)' }]) {
    const page = await context.newPage();
    const erros = [];
    page.on('pageerror', (e) => erros.push(e.message));
    await page.goto(alvo.url, { waitUntil: 'load' });
    await page.evaluate(() => localStorage.removeItem('series-tema'));
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(500);
    const fundo = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const texto = () => page.evaluate(() => document.querySelector('.menu__tema').textContent);

    const antes = await fundo();
    await page.click('.barra__botao');
    await page.waitForTimeout(450);
    const rotuloAntes = await texto();
    if (alvo.nome === 'site') await page.screenshot({ path: path.join(saida, 'tema-menu-escuro.png') });
    await page.click('.menu__tema');
    await page.waitForTimeout(300);
    const depois = await fundo();
    const rotuloDepois = await texto();
    if (alvo.nome === 'site') await page.screenshot({ path: path.join(saida, 'tema-menu-claro.png') });
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(400);
    const recarregado = await fundo();
    const guardado = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    const ok = antes === alvo.escuro && rotuloAntes === 'Tema claro' && depois === alvo.claro && rotuloDepois === 'Tema escuro'
      && recarregado === alvo.claro && guardado === 'light' && !erros.length;
    conta(ok, `tema ${alvo.nome}: sistema escuro=${antes} [${rotuloAntes}] -> clique=${depois} [${rotuloDepois}] -> recarregou=${recarregado} data-theme=${guardado}${erros.length ? ' ERROS=' + erros.join('|') : ''}`);
    await page.evaluate(() => localStorage.removeItem('series-tema'));
    await page.close();
  }

  await browser.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
})();

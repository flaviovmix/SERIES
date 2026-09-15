// O menu hamburguer com os Extras sempre no fim da lista, numa pagina do site e numa
// animacao, e os links de dentro dos Extras continuam funcionando
const fs = require('fs');

const candidatos = ['C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'];
const achado = candidatos.find(c => fs.existsSync(c));
if (!achado) { console.log('playwright nao encontrado'); process.exit(1); }
const { chromium } = require(achado);

// sem argumento testa o local; com "ar" testa series.afx.art.br
const RAIZ = process.argv[2] === 'ar' ? 'https://series.afx.art.br/' : 'file:///C:/src/PROJETOS/SEIRES/';
const PAGINAS = [
  { nome: 'home do site', url: RAIZ + 'site/index.html' },
  { nome: 'animacao do Abaco', url: RAIZ + encodeURI('Como Reinventar o Computador do Zero/01 - Contar antes das máquinas/01 - O Ábaco/animacao.html') },
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  let falhas = 0;
  for (const p of PAGINAS) {
    const page = await browser.newPage({ viewport: { width: 384, height: 688 } });
    const erros = [];
    page.on('pageerror', (e) => erros.push(e.message));
    await page.goto(p.url, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    await page.click('.barra__botao');
    await page.waitForTimeout(450);
    const r = await page.evaluate(() => ({
      blocos: [...document.querySelectorAll('.menu__grade > .menu__bloco .menu__titulo span:last-child')].map((s) => s.textContent),
      linksDosExtras: [...document.querySelectorAll('.menu__grade > .menu__bloco:last-child a.menu__item')].length,
    }));
    const ultimo = r.blocos[r.blocos.length - 1];
    const ok = ultimo === 'Extras' && r.blocos.filter((b) => b === 'Extras').length === 1 && r.linksDosExtras > 0 && !erros.length;
    if (!ok) falhas++;
    console.log(`${ok ? 'OK ' : 'XX '} ${p.nome}: ${r.blocos.join(' | ')} (links nos extras: ${r.linksDosExtras})${erros.length ? ' ERROS=' + erros.join('|') : ''}`);
    await page.close();
  }
  await browser.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
})();

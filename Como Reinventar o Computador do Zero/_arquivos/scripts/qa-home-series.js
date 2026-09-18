// A home com a foto sempre em 16:9 (a esquerda no desktop, em cima no telefone), sem
// nada estourando o cartao nem a pagina. Quantos cards cabem por fileira mudou em
// 15/09/2026, quando o dono pediu a home em 90% da tela: 3 de 1366px pra cima, 2 em
// 1024 e 1 no telefone (a grade e auto-fill, entao o numero sai da largura).
// Desde 18/09/2026 os 90% param na tela de 1080: do 1920 pra cima a home fica em 1728px
// (o campo "largura" confere isso no 1920 e no 4K).
const fs = require('fs');
const path = require('path');

const candidatos = ['C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'];
const achado = candidatos.find(c => fs.existsSync(c));
if (!achado) { console.log('playwright nao encontrado'); process.exit(1); }
const { chromium } = require(achado);

// sem argumento testa o local; com "ar" testa series.afx.art.br
const HOME = process.argv[2] === 'ar' ? 'https://series.afx.art.br/site/index.html' : 'file:///C:/src/PROJETOS/SEIRES/site/index.html';
const TAMANHOS = [
  { nome: 'd3840-escuro', w: 3840, h: 2160, e: 'dark', fileira: 3, deitado: true, largura: 1728 },
  { nome: 'd1920-escuro', w: 1920, h: 1080, e: 'dark', fileira: 3, deitado: true, largura: 1728 },
  { nome: 'd1536', w: 1536, h: 864, e: 'light', fileira: 3, deitado: true },
  { nome: 'd1366', w: 1366, h: 768, e: 'light', fileira: 3, deitado: true },
  { nome: 'd1024', w: 1024, h: 768, e: 'light', fileira: 2, deitado: true },
  { nome: 'tel384-escuro', w: 384, h: 688, e: 'dark', fileira: 1, deitado: false },
  { nome: 'tel360', w: 360, h: 640, e: 'light', fileira: 1, deitado: false },
];
const saida = process.env.QA_OUT || require("os").tmpdir();   // capturas na pasta temporaria, nunca aqui

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  let falhas = 0;
  for (const t of TAMANHOS) {
    const page = await browser.newPage({ viewport: { width: t.w, height: t.h }, colorScheme: t.e });
    await page.goto(HOME, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    const r = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.grade--series .cap')];
      const topo = Math.min(...cards.map((c) => Math.round(c.getBoundingClientRect().top)));
      const problemas = [];
      const medidas = cards.map((c, i) => {
        const cb = c.getBoundingClientRect();
        const a = c.querySelector('.cap__arte').getBoundingClientRect();
        const b = c.querySelector('.cap__corpo').getBoundingClientRect();
        c.querySelectorAll('.cap__corpo *').forEach((el) => {
          const e = el.getBoundingClientRect();
          if (e.width && (e.right > cb.right + 1 || e.bottom > cb.bottom + 1)) problemas.push(`card ${i + 1}: ${el.className || el.tagName}`);
        });
        return {
          razao: a.width / a.height, esquerda: a.right <= b.left + 1, emCima: a.bottom <= b.top + 1,
          encostaEsquerda: Math.abs(a.left - cb.left) <= 1.5, encostaTopo: Math.abs(a.top - cb.top) <= 1.5,
          encostaBaixo: Math.abs(a.bottom - cb.bottom) <= 1.5, encostaDireita: Math.abs(a.right - cb.right) <= 1.5,
          card: `${Math.round(cb.width)}x${Math.round(cb.height)}`, foto: `${Math.round(a.width)}x${Math.round(a.height)}`,
        };
      });
      return {
        largura: Math.round(document.querySelector('.wrap--series').getBoundingClientRect().width),
        porFileira: cards.filter((c) => Math.round(c.getBoundingClientRect().top) === topo).length,
        medidas,
        problemas: [...new Set(problemas)],
        rola: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    // no desktop o 16:9 e o minimo (a foto pode ficar mais alta); no telefone e exato
    const razaoOk = r.medidas.every((m) => (t.deitado ? m.razao <= 16 / 9 + 0.03 : Math.abs(m.razao - 16 / 9) < 0.03));
    // a foto encosta na borda do cartao: esquerda, topo e baixo deitada; esquerda, topo e direita em cima
    const encostaOk = r.medidas.every((m) => m.encostaEsquerda && m.encostaTopo && (t.deitado ? m.encostaBaixo : m.encostaDireita));
    const lugarOk = r.medidas.every((m) => (t.deitado ? m.esquerda : m.emCima));
    const larguraOk = !t.largura || r.largura === t.largura;
    const ok = r.porFileira === t.fileira && larguraOk && razaoOk && encostaOk && lugarOk && !r.problemas.length && !r.rola;
    if (!ok) falhas++;
    console.log(`${ok ? 'OK ' : 'XX '} ${t.nome}: largura=${r.largura} porFileira=${r.porFileira} card=${r.medidas[0].card} foto=${r.medidas[0].foto} 16:9=${razaoOk} encosta=${encostaOk} ${t.deitado ? 'esquerda' : 'em cima'}=${lugarOk}` +
      (r.problemas.length ? ' ESTOURA=' + JSON.stringify(r.problemas) : '') + (r.rola ? ' ROLA' : ''));
    if (['d3840-escuro', 'd1920-escuro', 'd1366', 'tel384-escuro'].includes(t.nome)) await page.screenshot({ path: path.join(saida, `home2-${t.nome}.png`) });
    await page.close();
  }
  await browser.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
})();

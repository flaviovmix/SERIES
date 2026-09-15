// Prova que o card-img-fixa.md e autossuficiente: tira o CSS, o sprite e a grade de dentro
// do proprio .md, monta uma pagina SEM os tokens do site e mede no desktop e no telefone.
const fs = require('fs');
const path = require('path');

const candidatos = ['C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'];
const achado = candidatos.find(c => fs.existsSync(c));
if (!achado) { console.log('playwright nao encontrado'); process.exit(1); }
const { chromium } = require(achado);
const saida = process.env.QA_OUT || require("os").tmpdir();   // capturas e o html montado na pasta temporaria

const md = fs.readFileSync('C:/src/.claude/components/card-img-fixa.md', 'utf8');
const blocos = (lingua) => [...md.matchAll(new RegExp('```' + lingua + '\\n([\\s\\S]*?)```', 'g'))].map((m) => m[1]);
const css = blocos('css')[0];                 // o "Codigo completo", sem os tokens
const [sprite, grade] = blocos('html');
// o sprite do .md so traz um icone; o segundo card pede o foguete
const spriteCompleto = sprite.replace('</defs>', '<symbol id="ico-foguete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="6"/></symbol></defs>');
const pagina = `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{margin:0;padding:40px;background:#f4f3ee;font-family:system-ui}</style><style>${css}</style></head>
<body>${spriteCompleto}<div style="max-width:1300px;margin:0 auto">${grade}</div></body></html>`
  .replaceAll('img/serie-java-web.webp', 'file:///C:/src/PROJETOS/SEIRES/site/img/serie-java-web.webp')
  .replaceAll('img/serie-lua.webp', 'file:///C:/src/PROJETOS/SEIRES/site/img/serie-lua.webp');
const arquivo = path.join(saida, 'componente-card-img-fixa.html');
fs.writeFileSync(arquivo, pagina);

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  let falhas = 0;
  for (const t of [{ nome: 'd1920', w: 1920, h: 700, deitado: true }, { nome: 'tel384', w: 384, h: 900, deitado: false }]) {
    const page = await browser.newPage({ viewport: { width: t.w, height: t.h } });
    await page.goto('file:///' + arquivo.replace(/\\/g, '/'), { waitUntil: 'load' });
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => [...document.querySelectorAll('.card-img-fixa')].map((c) => {
      const cb = c.getBoundingClientRect();
      const f = c.querySelector('.card-img-fixa__foto').getBoundingClientRect();
      const corpo = c.querySelector('.card-img-fixa__corpo').getBoundingClientRect();
      const estoura = [...c.querySelectorAll('.card-img-fixa__corpo *')].some((el) => { const b = el.getBoundingClientRect(); return b.width && b.right > cb.right + 1; });
      return {
        borda: getComputedStyle(c).borderTopStyle, fundo: getComputedStyle(c).backgroundColor,
        esquerda: f.right <= corpo.left + 1, emCima: f.bottom <= corpo.top + 1,
        encosta: Math.abs(f.left - cb.left) <= 1.5 && Math.abs(f.top - cb.top) <= 1.5,
        razao: +(f.width / f.height).toFixed(2), foto: `${Math.round(f.width)}x${Math.round(f.height)}`, estoura,
      };
    }));
    const ok = r.length === 2 && r.every((x) => x.borda === 'dashed' && x.fundo === 'rgb(250, 249, 245)' && x.encosta && !x.estoura
      && (t.deitado ? x.esquerda && x.razao <= 1.81 : x.emCima && Math.abs(x.razao - 1.78) < 0.03));
    if (!ok) falhas++;
    console.log(`${ok ? 'OK ' : 'XX '} componente ${t.nome}: ${JSON.stringify(r)}`);
    await page.screenshot({ path: path.join(saida, `componente-card-img-fixa-${t.nome}.png`) });
    await page.close();
  }
  await browser.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
})();

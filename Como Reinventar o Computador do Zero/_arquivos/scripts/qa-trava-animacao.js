// Confere que as animacoes seguem com a paleta antiga e o site pegou a do AFX,
// nos dois temas. Le as variaveis e o fundo pintado de verdade no body.
const fs = require('fs');

const candidatos = ['C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'];
const achado = candidatos.find(c => fs.existsSync(c));
if (!achado) { console.log('playwright nao encontrado'); process.exit(1); }
const { chromium } = require(achado);

const RAIZ = 'file:///C:/src/PROJETOS/SEIRES/';
const CASOS = [
  { nome: 'animacao Abaco', url: RAIZ + 'Como Reinventar o Computador do Zero/01 - Contar antes das máquinas/01 - O Ábaco/animacao.html', claro: 'rgb(244, 246, 248)', escuro: 'rgb(17, 22, 26)' },
  { nome: 'animacao 11.01', url: RAIZ + 'Como Reinventar o Computador do Zero/_REFAZER/11 - A máquina que conversa/01 - A escala/animacao.html', claro: 'rgb(244, 246, 248)', escuro: 'rgb(17, 22, 26)' },
  { nome: 'animacao JAVA WEB 1.1', url: RAIZ + 'JAVA WEB/01 - Por que ainda estudar isso/01 - A bomba-relógio/animacao.html', claro: 'rgb(244, 246, 248)', escuro: 'rgb(17, 22, 26)' },
  { nome: 'site home', url: RAIZ + 'site/index.html', claro: 'rgb(244, 243, 238)', escuro: 'rgb(28, 42, 63)' },
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  let falhas = 0;
  for (const caso of CASOS) {
    for (const esquema of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: esquema });
      await page.goto(encodeURI(caso.url), { waitUntil: 'load' });
      await page.waitForTimeout(300);
      const r = await page.evaluate(() => ({
        fundo: getComputedStyle(document.body).backgroundColor,
        accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
        fonteTexto: getComputedStyle(document.documentElement).getPropertyValue('--fonte-texto').trim().split(',')[0],
      }));
      const esperado = esquema === 'light' ? caso.claro : caso.escuro;
      const ok = r.fundo === esperado;
      if (!ok) falhas++;
      console.log(`${ok ? 'OK ' : 'XX '} ${caso.nome} ${esquema}: fundo=${r.fundo} (esperado ${esperado}) accent=${r.accent} fonte=${r.fonteTexto}`);
      await page.close();
    }
  }
  await browser.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
})();

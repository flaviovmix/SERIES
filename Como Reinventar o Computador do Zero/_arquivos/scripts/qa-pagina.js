// Confere uma pagina de animacao servida por http:
//   node testa-pagina.js <url> <telas esperadas>
// telas, navegacao ate a ultima, imagens carregadas, estouro horizontal em
// desktop e telefone, e conteudo cortado dentro de cada tela numa janela baixa.
//
// Desde 16/09/2026 confere tambem a REGRA DA IMAGEM: toda tela tem imagem, e ela
// fica a vista no telefone. Nasceu de um episodio que subiu com 12 telas e uma
// foto so: este teste dizia "tudo passou", porque media tudo menos isso. A regra
// estava escrita no _molde-roteiro.txt e mesmo assim passou; regra que ninguem
// testa nao segura nada.
// Como rodar e por que cada checagem existe: LEIA-ME-qa.md nesta pasta.
const { chromium } = require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const [URL, ESPERADAS] = [process.argv[2], Number(process.argv[3])];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const ruins = [];
  page.on('pageerror', (e) => ruins.push('erro: ' + e.message));
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon/i.test(r.url())) ruins.push('HTTP ' + r.status() + ' ' + decodeURIComponent(r.url()).slice(-50)); });

  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(1800);
  let falhas = 0;
  const diz = (ok, t) => { console.log('  ' + (ok ? 'ok  ' : 'FALHOU  ') + t); if (!ok) falhas++; };

  const base = await page.evaluate(() => ({
    telas: document.querySelectorAll('main > .step:not(.step--fim)').length,
    bolinhas: document.querySelectorAll('.bolinhas > *').length,
    quebradas: [...document.querySelectorAll('img')].filter((i) => i.getAttribute('src') && !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')),
    duracao: (document.querySelector('.tocador__total') || {}).textContent,
    estouro: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  diz(base.telas === ESPERADAS, base.telas + ' telas (esperava ' + ESPERADAS + ')');
  diz(base.bolinhas === ESPERADAS, base.bolinhas + ' bolinhas');
  diz(base.quebradas.length === 0, 'imagens: ' + (base.quebradas.length ? base.quebradas.join(', ') : 'nenhuma quebrada'));
  diz(base.estouro === 0, 'estouro em 1440px: ' + base.estouro + 'px');
  console.log('  duracao no tocador: ' + (base.duracao || '').trim());

  // conteudo cortado dentro de cada tela, e TODA TELA TEM IMAGEM na mesma passada
  const cortadas = [];
  const semImagem = [];
  for (let i = 0; i < base.telas; i++) {
    if (i > 0) { await page.click('.seta-palco--depois'); await page.waitForTimeout(200); }
    const olhada = await page.evaluate((idx) => {
      const s = document.querySelectorAll('main > .step:not(.step--fim)')[idx];
      const aVista = (el) => el.getClientRects().length > 0;
      return {
        sobra: Math.round(s.scrollHeight - s.clientHeight),
        // foto, ilustracao, diagrama em svg, modelo em canvas — ou o widget
        // interativo, que e o desenho da propria pagina e vale como imagem
        temImagem: [...s.querySelectorAll('img, svg, canvas')].some(aVista),
        temWidget: [...s.querySelectorAll('.painel, .pratica')].some(aVista),
        // tela cujo desenho e feito so com html e css (o aparelho do JAVA WEB
        // 02-01, por exemplo) declara isso na propria section, com
        // data-imagem="desenho". O padrao e REPROVAR: assim ninguem escapa por
        // esquecimento, so por decisao escrita, que da pra revisar depois
        declaraDesenho: s.dataset.imagem === 'desenho',
      };
    }, i);
    if (olhada.sobra > 0) cortadas.push((i + 1) + ':+' + olhada.sobra);
    if (!olhada.temImagem && !olhada.temWidget && !olhada.declaraDesenho) semImagem.push(i + 1);
  }
  diz(cortadas.length === 0, 'telas cortadas em 1440x900: ' + (cortadas.length ? cortadas.join(' ') : 'nenhuma'));
  diz(semImagem.length === 0, 'toda tela tem imagem: ' + (semImagem.length ? 'FALTA na tela ' + semImagem.join(', ') : 'sim, nas ' + base.telas));

  const contador = await page.evaluate(() => (document.querySelector('.contador') || {}).textContent);
  diz((contador || '').includes(ESPERADAS + ' / ' + ESPERADAS), 'chegou na ultima tela (' + (contador || '').trim() + ')');

  await page.setViewportSize({ width: 360, height: 740 });
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(1200);
  const estreito = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  diz(estreito === 0, 'estouro em 360px: ' + estreito + 'px');

  // a imagem tem que estar A VISTA no telefone: fora da dobra conta como tela sem
  // imagem. A navegacao aqui e pela bolinha, e nao pelas setas do palco: no
  // telefone as setas nao aparecem, e no desktop o rodape e que fica invisivel.
  const foraDaDobra = [];
  for (let i = 0; i < base.telas; i++) {
    const fora = await page.evaluate((idx) => {
      const b = document.querySelector(`.bolinhas [data-tela="${idx + 1}"]`);
      if (b) b.click();
      const s = document.querySelectorAll('main > .step:not(.step--fim)')[idx];
      const alvos = [...s.querySelectorAll('img, svg, canvas, .painel')].filter((el) => el.getClientRects().length > 0);
      if (!alvos.length) return false;   // tela sem imagem ja foi acusada no desktop
      const topo = Math.min(...alvos.map((el) => el.getBoundingClientRect().top));
      return topo > window.innerHeight;
    }, i);
    if (fora) foraDaDobra.push(i + 1);
    await page.waitForTimeout(150);
  }
  diz(foraDaDobra.length === 0, 'imagem a vista no telefone: ' + (foraDaDobra.length ? 'FORA da dobra na tela ' + foraDaDobra.join(', ') : 'sim'));

  await browser.close();
  if (ruins.length) { console.log('  ' + ruins.join('\n  ')); falhas += ruins.length; }
  console.log(falhas ? '\n' + falhas + ' problema(s)' : '\ntudo passou');
  process.exit(falhas ? 1 : 0);
})();

// Confere a serie NO AR num navegador de verdade: as quatro paginas novas montam,
// as imagens carregam, o modelo 3D da capa liga e nao sobra estouro horizontal.
// Como rodar e por que cada checagem existe: LEIA-ME-qa.md nesta pasta.
const { chromium } = require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const B = 'https://series.afx.art.br';
const S = B + '/Como%20Reinventar%20o%20Computador%20do%20Zero';

const PAGINAS = [
  ['7.02', S + '/_REFAZER/07%20-%20O%20computador%20encolhe/02%20-%20O%20circuito%20integrado/animacao.html', 11, 'circuito-integrado'],
  ['7.03', S + '/_REFAZER/07%20-%20O%20computador%20encolhe/03%20-%20O%20microprocessador/animacao.html', 11, 'microprocessador'],
  ['EX-09', S + '/_EXTRAS/09%20-%20Quem%20Fez%20o%20Primeiro%20Chip/animacao.html', 10, null],
  ['EX-10', S + '/_EXTRAS/10%20-%20A%20Lei%20de%20Moore/animacao.html', 10, null],
  ['8.01', S + '/_REFAZER/08%20-%20Da%20sala%20pro%20mundo/01%20-%20O%20computador%20chega%20em%20casa/animacao.html', 12, null],
  ['8.02', S + '/_REFAZER/08%20-%20Da%20sala%20pro%20mundo/02%20-%20Conectando%20tudo%20-%20a%20internet/animacao.html', 11, null],
  ['8.03', S + '/_REFAZER/08%20-%20Da%20sala%20pro%20mundo/03%20-%20O%20sistema%20operacional/animacao.html', 12, null],
  ['9.01', S + '/_REFAZER/09%20-%20A%20m%C3%A1quina%20que%20aprende/01%20-%20A%20corrida%20do%20processador/animacao.html', 12, null],
  ['9.02', S + '/_REFAZER/09%20-%20A%20m%C3%A1quina%20que%20aprende/02%20-%20A%20placa%20de%20v%C3%ADdeo/animacao.html', 12, null],
  ['9.03', S + '/_REFAZER/09%20-%20A%20m%C3%A1quina%20que%20aprende/03%20-%20A%20m%C3%A1quina%20que%20aprende/animacao.html', 12, null],
  ['9.04', S + '/_REFAZER/09%20-%20A%20m%C3%A1quina%20que%20aprende/04%20-%202017%20-%20Attention%20is%20All%20You%20Need/animacao.html', 12, null],
  ['10.01', S + '/_REFAZER/10%20-%20A%20rede%20vira%20feed/01%20-%20A%20bolha/animacao.html', 12, null],
  ['10.02', S + '/_REFAZER/10%20-%20A%20rede%20vira%20feed/02%20-%20A%20busca%20vira%20neg%C3%B3cio/animacao.html', 12, null],
  ['10.03', S + '/_REFAZER/10%20-%20A%20rede%20vira%20feed/03%20-%20As%20redes%20sociais/animacao.html', 12, null],
  // o 10.04 tem DEZ telas, nao doze: o audio entregou dez blocos e a pagina segue o audio
  ['10.04', S + '/_REFAZER/10%20-%20A%20rede%20vira%20feed/04%20-%20O%20algoritmo%20de%20recomenda%C3%A7%C3%A3o/animacao.html', 10, null],
  ['11.01', S + '/_REFAZER/11%20-%20A%20m%C3%A1quina%20que%20conversa/01%20-%20A%20escala/animacao.html', 12, null],
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  let falhas = 0;
  const diz = (ok, t) => { console.log('  ' + (ok ? 'ok  ' : 'FALHOU  ') + t); if (!ok) falhas++; };

  for (const [nome, url, telas, modelo] of PAGINAS) {
    console.log('\n===== ' + nome);
    const ruins = [];
    const ouve = (r) => { if (r.status() >= 400 && !/favicon/i.test(r.url())) ruins.push(r.status() + ' ' + decodeURIComponent(r.url()).slice(-45)); };
    page.on('response', ouve);
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(2500);

    const d = await page.evaluate(() => ({
      telas: document.querySelectorAll('main > .step:not(.step--fim)').length,
      quebradas: [...document.querySelectorAll('img')].filter((i) => i.getAttribute('src') && !(i.complete && i.naturalWidth > 0)).length,
      estouro: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      duracao: (document.querySelector('.tocador__total') || {}).textContent,
    }));
    diz(d.telas === telas, d.telas + ' telas');
    diz(d.quebradas === 0, d.quebradas + ' imagem(ns) quebrada(s)');
    diz(d.estouro === 0, 'estouro ' + d.estouro + 'px');
    console.log('  duracao no tocador: ' + (d.duracao || '').trim());

    if (modelo) {
      let montou = false;
      for (let v = 0; v < 10 && !montou; v++) {
        await page.waitForTimeout(1000);
        const q = page.frames().find((f) => f.url().includes('modelos-3d/' + modelo + '.html'));
        if (q) montou = await q.evaluate(() => !!document.querySelector('#cena canvas')).catch(() => false);
      }
      diz(montou, 'modelo 3D da capa montou');
    }
    page.off('response', ouve);
    if (ruins.length) { console.log('  respostas ruins: ' + ruins.join(' | ')); falhas += ruins.length; }
  }

  await browser.close();
  console.log(falhas ? '\n' + falhas + ' problema(s) NO AR' : '\ntudo verde no ar');
  process.exit(falhas ? 1 : 0);
})();

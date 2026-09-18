// Confere o player no desenho do Nexus nas 5 paginas do site que tem audio:
// montou, o nativo sumiu, nada estoura o cartao, e tocar/pular/marcha funcionam.
const fs = require('fs');
const path = require('path');

const candidatos = ['C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'];
const achado = candidatos.find(c => fs.existsSync(c));
if (!achado) { console.log('playwright nao encontrado'); process.exit(1); }
const { chromium } = require(achado);

// sem argumento testa o local; com a URL (ex: https://series.afx.art.br/site/) testa o ar
const BASE = process.argv[2] || 'file:///C:/src/PROJETOS/SEIRES/site/';
const PAGINAS = ['hardware.html', 'etapas/hardware-01.html', 'extras/index.html', 'extras/extra-01.html', 'extras/extra-02.html', 'universo.html'];
const TAMANHOS = [
  { nome: 'tel384-escuro', width: 384, height: 688, esquema: 'dark' },
  { nome: 'tel360', width: 360, height: 640, esquema: 'light' },
  { nome: 'd1024', width: 1024, height: 768, esquema: 'light' },
  { nome: 'd1440-escuro', width: 1440, height: 900, esquema: 'dark' },
];
const saida = process.env.QA_OUT || require("os").tmpdir();   // capturas na pasta temporaria, nunca aqui

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  let falhas = 0;

  for (const t of TAMANHOS) {
    for (const pagina of PAGINAS) {
      const page = await browser.newPage({ viewport: { width: t.width, height: t.height }, colorScheme: t.esquema });
      const erros = [];
      page.on('pageerror', (e) => erros.push(e.message));
      await page.goto(BASE + pagina, { waitUntil: 'load' });
      await page.waitForTimeout(400);

      const r = await page.evaluate(() => {
        const caixas = [...document.querySelectorAll('.audio')];
        return caixas.map((caixa) => {
          const player = caixa.querySelector('.audio__player');
          const audio = caixa.querySelector('audio');
          if (!player) return { montou: false };
          const p = player.getBoundingClientRect();
          const estouros = [...player.querySelectorAll('.audio__velocidade, .audio__salto, .audio__play, .audio__tempo, .audio__trilha')]
            .filter((el) => { const b = el.getBoundingClientRect(); return b.left < p.left - 0.5 || b.right > p.right + 0.5; })
            .map((el) => el.className);
          // o play no centro do cartao (tolerancia de 3px). Na variante em faixa
          // (.audio--faixa, 17/09/2026) o player vira uma linha so no desktop e o play
          // fica na esquerda de proposito: la o centro nao e regra
          const play = player.querySelector('.audio__play').getBoundingClientRect();
          const emFaixa = caixa.classList.contains('audio--faixa') && getComputedStyle(player).flexDirection === 'row';
          const desvio = emFaixa ? 0 : Math.round((play.left + play.width / 2) - (p.left + p.width / 2));
          // nada encavalado na fileira: velocidade | transporte | tempo
          const vel = player.querySelector('.audio__velocidade').getBoundingClientRect();
          const tra = player.querySelector('.audio__transporte').getBoundingClientRect();
          const tem = player.querySelector('.audio__tempo').getBoundingClientRect();
          const encavala = vel.right > tra.left + 0.5 || tra.right > tem.left + 0.5;
          return {
            montou: true,
            nativoVisivel: getComputedStyle(audio).display !== 'none',
            largura: Math.round(p.width),
            estouros,
            desvio,
            encavala,
          };
        });
      });
      const rolaDeLado = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

      const ruins = r.filter((x) => !x.montou || x.nativoVisivel || x.estouros.length || x.encavala || Math.abs(x.desvio) > 3);
      const ok = !ruins.length && !rolaDeLado && !erros.length;
      if (!ok) falhas++;
      console.log(`${ok ? 'OK ' : 'XX '} ${t.nome} ${pagina} players=${r.length} larguras=${r.map((x) => x.largura).join(',')}` +
        (ruins.length ? ' ruins=' + JSON.stringify(ruins) : '') + (rolaDeLado ? ' ROLA-DE-LADO' : '') + (erros.length ? ' ERROS=' + erros.join('|') : ''));

      if (pagina === 'hardware.html' || pagina === 'extras/index.html') {
        const alvo = pagina === 'hardware.html' ? '.head' : '.grade';
        const el = await page.$(alvo);
        if (el) await el.screenshot({ path: path.join(saida, `player-${t.nome}-${pagina.replace(/[\/.]/g, '-')}.png`) });
      }
      await page.close();
    }
  }

  // comportamento: tocar, pular pela trilha, marcha, um de cada vez (pagina de extras)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + 'extras/index.html', { waitUntil: 'load' });
  const players = await page.$$('.audio__player');
  const primeiro = players[0];
  await (await primeiro.$('.audio__play')).click();
  await page.waitForTimeout(2500);
  const tocando1 = await page.evaluate(() => { const a = document.querySelectorAll('.audio audio')[0]; return { paused: a.paused, t: a.currentTime, d: a.duration, erro: a.error && a.error.code }; });
  console.log('tocar no 1o:', JSON.stringify(tocando1));

  const trilha = await primeiro.$('.audio__trilha');
  const caixa = await trilha.boundingBox();
  await page.mouse.click(caixa.x + caixa.width / 2, caixa.y + caixa.height / 2);
  await page.waitForTimeout(800);
  const meio = await page.evaluate(() => { const a = document.querySelectorAll('.audio audio')[0]; return { t: Math.round(a.currentTime), metade: Math.round(a.duration / 2), tempo: document.querySelectorAll('.audio__tempo')[0].textContent }; });
  console.log('clique no meio da trilha:', JSON.stringify(meio));

  await (await primeiro.$('.audio__velocidade')).click();
  const marcha = await page.evaluate(() => ({ rate: document.querySelectorAll('.audio audio')[0].playbackRate, texto: document.querySelectorAll('.audio__velocidade')[0].textContent }));
  console.log('marcha depois de 1 toque:', JSON.stringify(marcha));

  if (players[1]) {
    await (await players[1].$('.audio__play')).click();
    await page.waitForTimeout(1500);
    const umDeCada = await page.evaluate(() => { const as = document.querySelectorAll('.audio audio'); return { primeiroPausado: as[0].paused, segundoTocando: !as[1].paused, borda: document.querySelectorAll('.audio__player')[1].classList.contains('tocando') }; });
    console.log('um de cada vez:', JSON.stringify(umDeCada));
  }

  await browser.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'layout: tudo OK');
})();

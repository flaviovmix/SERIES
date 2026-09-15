/* QA do padrão deitado (ver _padrao-deitado.md). Roda local, não é publicado.
 *
 *   node _qa-deitado.js [url-do-modelo] [--flutua=.numero]
 *
 * Sem url, testa o ábaco em produção. Mede o que o olho não garante: o app girado
 * CABE na janela (foi assim que a regressão de especificidade apareceu), o palco
 * fica largo, o painel lateral abre dentro da arena, o valor flutua fora dele e o
 * desktop continua intacto.
 *
 * ⚠️ Com o app girado, getBoundingClientRect devolve a caixa NA TELA (lados
 * trocados). Medida de layout aqui é sempre offsetLeft/offsetTop/offsetWidth. */
const { chromium } = require('C:/src/PROJETOS/SITE IGREJA/qa/node_modules/playwright');

const args = process.argv.slice(2);
const URL = args.find(a => !a.startsWith('--')) ||
  'https://series.afx.art.br/' + encodeURI('Como Reinventar o Computador do Zero/_arquivos/modelos-3d/abaco.html');
const FLUTUA = (args.find(a => a.startsWith('--flutua=')) || '--flutua=.numero').split('=')[1];
// quanto o painel pode rolar antes de virar reprovação; 40px é o alvo do padrão
const TOLERANCIA = +((args.find(a => a.startsWith('--tolerancia=')) || '--tolerancia=40').split('=')[1]);

// telefones comuns; o do Flávio é o de 480
const TELEFONES = [[480, 1000], [412, 915], [390, 780], [360, 740]];

const medeTelefone = flutua => {
  const app = document.querySelector('.app'), arena = document.querySelector('.arena');
  const cena = document.getElementById('cena'), g = document.querySelector('#arenaMenu');
  const btn = document.querySelector('.arena-menu-btn'), v = document.querySelector('.arena > ' + flutua);
  const ra = app.getBoundingClientRect();
  return {
    girado: getComputedStyle(app).transform.startsWith('matrix'),
    cabeNaJanela: Math.round(ra.width) <= innerWidth + 2 && Math.round(ra.height) <= innerHeight + 2,
    palcoLargo: cena.clientWidth / cena.clientHeight > 1.4,
    palco: cena.clientWidth + 'x' + cena.clientHeight,
    botaoAVista: !!btn.offsetParent,
    // o painel: encostado na direita, do topo à base, sem cobrir a cena inteira
    painelNaDireita: Math.abs((g.offsetLeft + g.offsetWidth) - arena.clientWidth) <= 2,
    painelDoTopoABase: g.offsetTop <= 1 && Math.abs(g.offsetHeight - arena.clientHeight) <= 2,
    painelPct: Math.round(g.offsetWidth / arena.clientWidth * 100),
    sobraNoPainel: g.clientHeight - g.scrollHeight,
    xForaDoPainel: btn.offsetLeft + btn.offsetWidth <= g.offsetLeft + 1,
    // o valor: visível, fora do painel e sem roubar o toque da cena
    valorVisivel: !!v && v.offsetWidth > 0 && v.offsetHeight > 0,
    valorForaDoPainel: !!v && v.offsetLeft + v.offsetWidth <= g.offsetLeft + 1,
    valorSemToque: !!v && getComputedStyle(v).pointerEvents === 'none'
  };
};

(async () => {
  const b = await chromium.launch();
  let falhas = 0;
  const conta = (ok, m) => { if (!ok) falhas++; console.log(`${ok ? 'OK ' : 'FALHOU'} ${m}`); };
  console.log(URL + '\n');

  for (const [w, h] of TELEFONES) {
    const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true });
    const erros = []; p.on('pageerror', e => erros.push(e.message));
    await p.goto(URL, { waitUntil: 'load' });
    await p.waitForTimeout(3000);
    await p.locator('.arena-menu-btn').click();
    await p.waitForTimeout(600);
    const m = await p.evaluate(medeTelefone, FLUTUA);
    conta(m.girado && m.cabeNaJanela, `${w}x${h}: a arte deita e o app cabe na janela`);
    conta(m.palcoLargo, `${w}x${h}: o palco fica largo (${m.palco})`);
    conta(m.painelNaDireita && m.painelDoTopoABase && m.painelPct <= 65,
          `${w}x${h}: painel na direita, do topo à base, com ${m.painelPct}% da arena`);
    conta(m.xForaDoPainel, `${w}x${h}: o X espera na borda do painel`);
    // rolar um pouco e aceitavel (o telefone de 360 rola); rolar muito e projeto errado
    conta(m.sobraNoPainel >= -TOLERANCIA, `${w}x${h}: o painel ${m.sobraNoPainel >= 0 ? 'cabe (sobra ' + m.sobraNoPainel : 'rola pouco (passa ' + -m.sobraNoPainel}px)`);
    conta(m.valorVisivel && m.valorForaDoPainel && m.valorSemToque,
          `${w}x${h}: o valor flutua fora do painel e não rouba o toque ${JSON.stringify({ visivel: m.valorVisivel, fora: m.valorForaDoPainel, semToque: m.valorSemToque })}`);
    conta(erros.length === 0, `${w}x${h}: sem erro de JS${erros.length ? ': ' + erros.join(' / ') : ''}`);
    await p.close();
  }

  // aparelho deitado de verdade: nada gira
  const d = await b.newPage({ viewport: { width: 780, height: 390 }, isMobile: true, hasTouch: true });
  await d.goto(URL, { waitUntil: 'load' }); await d.waitForTimeout(2500);
  conta(await d.evaluate(() => getComputedStyle(document.querySelector('.app')).transform) === 'none',
        'aparelho deitado de verdade: sem giro');
  await d.close();

  // desktop: sem painel, sem giro, com a abertura
  const w = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await w.goto(URL, { waitUntil: 'load' }); await w.waitForTimeout(2500);
  const desk = await w.evaluate(() => ({
    giro: getComputedStyle(document.querySelector('.app')).transform,
    botao: !!document.querySelector('.arena-menu-btn')?.offsetParent,
    // o menu fica vazio (so a linha estatica) e o placar volta pro lugar de sempre
    menuVazio: [...document.querySelector('#arenaMenu').children].every(c => c.id === 'menuLinha' && !c.children.length),
    cartaoNoLayout: !!document.querySelector('.game-layout .challenge')
  }));
  conta(desk.giro === 'none' && !desk.botao && desk.menuVazio && desk.cartaoNoLayout,
        `desktop intacto ${JSON.stringify(desk)}`);
  await w.close();

  await b.close();
  console.log(falhas ? `\n${falhas} FALHA(S)` : '\nTudo verde');
})();

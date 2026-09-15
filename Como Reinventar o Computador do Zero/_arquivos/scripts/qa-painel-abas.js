// As guias do painel do telefone (Extras | Filmes), em cima do tocador, que fica fixo com
// a paginacao seja qual for a guia. As duas guias existem em todo episodio: sem item,
// aviso. Fora de episodio (a animacao de um extra) nao ha guia. E os blocos na tela de fim.
const fs = require('fs');
const path = require('path');

const candidatos = ['C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright'];
const achado = candidatos.find(c => fs.existsSync(c));
if (!achado) { console.log('playwright nao encontrado'); process.exit(1); }
const { chromium } = require(achado);

// sem argumento testa o local; com "ar" testa series.afx.art.br
const NO_AR = process.argv[2] === 'ar';
const RAIZ = NO_AR ? 'https://series.afx.art.br/' : 'file:///C:/src/PROJETOS/SEIRES/';
const ep = (p) => RAIZ + encodeURI(p);
const CASOS = [
  { nome: '7.02 circuito integrado', url: ep('Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/02 - O circuito integrado/animacao.html'), episodio: true, extras: 2, links: 2, filmes: 0 },
  { nome: '11.01 A escala', url: ep('Como Reinventar o Computador do Zero/_REFAZER/11 - A máquina que conversa/01 - A escala/animacao.html'), episodio: true, extras: 4, links: 0, filmes: 4, linksDeFilme: 1 },
  { nome: '10.03 redes sociais', url: ep('Como Reinventar o Computador do Zero/_REFAZER/10 - A rede vira feed/03 - As redes sociais/animacao.html'), episodio: true, extras: 1, links: 0, filmes: 4, linksDeFilme: 0 },
  { nome: '1.01 O Abaco', url: ep('Como Reinventar o Computador do Zero/01 - Contar antes das máquinas/01 - O Ábaco/animacao.html'), episodio: true, extras: 4, links: 4, filmes: 0 },
  { nome: '7.03 microprocessador', url: ep('Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/03 - O microprocessador/animacao.html'), episodio: true, extras: 0, links: 0, filmes: 0 },
  { nome: 'EX-07 O Hertz (extra)', url: ep('Como Reinventar o Computador do Zero/_EXTRAS/07 - O Hertz/animacao.html'), episodio: false, extras: 0, links: 0, filmes: 0 },
];
const saida = process.env.QA_OUT || require("os").tmpdir();   // capturas na pasta temporaria, nunca aqui

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  let falhas = 0;
  const conta = (ok, texto) => { if (!ok) falhas++; console.log(`${ok ? 'OK ' : 'XX '} ${texto}`); };

  for (const caso of CASOS) {
    // telefone: as guias
    const page = await browser.newPage({ viewport: { width: 384, height: 688 }, hasTouch: true });
    const erros = [];
    page.on('pageerror', (e) => erros.push(e.message));
    await page.goto(caso.url, { waitUntil: 'load' });
    await page.waitForTimeout(700);

    const estado = () => page.evaluate(() => {
      const vis = (sel) => { const el = document.querySelector(sel); return !!el && getComputedStyle(el).display !== 'none'; };
      const caixa = (sel) => { const el = document.querySelector(sel); return el ? el.getBoundingClientRect() : null; };
      const abas = document.querySelector('.painel-abas');
      const alca = document.querySelector('.tocador-alca');
      const paneVisivel = ['.painel-extras', '.painel-filmes'].find(vis);
      const tocador = caixa('.tocador');
      const pane = paneVisivel ? caixa(paneVisivel) : null;
      return {
        temAbas: !!abas, abasVisiveis: vis('.painel-abas'),
        guias: abas ? abas.querySelectorAll('.painel-abas__guia').length : 0,
        ativa: abas ? (abas.querySelector('.painel-abas__guia--ativa') || {}).textContent : null,
        tocador: vis('.tocador'), rodape: vis('.navegacao'), paneExtras: vis('.painel-extras'), paneFilmes: vis('.painel-filmes'),
        paneAcimaDoTocador: pane && tocador ? pane.bottom <= tocador.top + 1 : null,
        vazioVisivel: !!paneVisivel && !!document.querySelector(paneVisivel + ' .painel-vazio'),
        itens: document.querySelectorAll('.painel-extras__item').length,
        links: [...document.querySelectorAll('a.painel-extras__item')].map((a) => a.href),
        cinzas: document.querySelectorAll('.painel-extras__item--cinza').length,
        filmes: document.querySelectorAll('.painel-filmes__item').length,
        tiposVazios: [...document.querySelectorAll('.painel-filmes__tipo')].filter((t) => !t.textContent.trim()).length,
        linksDeFilme: document.querySelectorAll('a.painel-filmes__onde').length,
        alcaVisivel: !!alca && !alca.hidden,
        alcaAcimaDasAbas: abas && alca ? alca.getBoundingClientRect().bottom <= abas.getBoundingClientRect().top + 1 : null,
        palco: Math.round(document.querySelector('main').getBoundingClientRect().height),
      };
    });

    const inicio = await estado();
    if (!caso.episodio) {
      conta(!inicio.temAbas && inicio.tocador && inicio.rodape && !erros.length, `${caso.nome} telefone: fora da arvore, sem guias, painel como era`);
    } else {
      // Extras vem ativa, com a lista (ou o aviso) em cima do tocador, que segue a mostra
      const linksOk = inicio.links.length === caso.links && inicio.links.every((h) => /animacao\.html$/.test(h) && (NO_AR || fs.existsSync(decodeURI(h.replace('file:///', '')))));
      conta(inicio.temAbas && inicio.abasVisiveis && inicio.guias === 2 && /^Extras/.test(inicio.ativa) && inicio.tocador && inicio.rodape
        && inicio.paneExtras && !inicio.paneFilmes && inicio.paneAcimaDoTocador && inicio.itens === caso.extras && linksOk && inicio.cinzas === caso.extras - caso.links
        && inicio.vazioVisivel === (caso.extras === 0),
        `${caso.nome} guia Extras: ${inicio.itens} itens, ${inicio.links.length} links, ${inicio.cinzas} em producao${inicio.vazioVisivel ? ', aviso de vazio' : ''}; tocador e paginacao a mostra embaixo (palco ${inicio.palco})`);
      await page.click('.painel-abas__guia[data-guia="filmes"]');
      await page.waitForTimeout(300);
      const aba = await estado();
      conta(/^Filmes/.test(aba.ativa) && aba.tocador && aba.rodape && !aba.paneExtras && aba.paneFilmes && aba.paneAcimaDoTocador
        && aba.filmes === caso.filmes && aba.tiposVazios === 0 && aba.linksDeFilme === (caso.linksDeFilme || 0) && aba.vazioVisivel === (caso.filmes === 0),
        `${caso.nome} guia Filmes: ${aba.filmes} filmes, ${aba.linksDeFilme} com link${aba.vazioVisivel ? ', aviso de vazio' : ''}; tocador e paginacao a mostra embaixo (palco ${aba.palco})`);
      if (caso.nome.startsWith('10.03')) await page.screenshot({ path: path.join(saida, 'painel-abas-filmes.png') });
      if (caso.nome.startsWith('7.03')) await page.screenshot({ path: path.join(saida, 'painel-abas-vazio.png') });
      await page.click('.painel-abas__guia[data-guia="extras"]');
      await page.waitForTimeout(200);
      if (caso.nome.startsWith('1.01')) await page.screenshot({ path: path.join(saida, 'painel-abas-extras.png') });
      // recolhe tudo no play e volta pela seta com a guia lembrada
      await page.click('.tocador__play');
      await page.waitForTimeout(700);
      const guardado = await estado();
      conta(!guardado.abasVisiveis && !guardado.tocador && !guardado.rodape && !guardado.paneExtras && !guardado.paneFilmes && guardado.alcaVisivel,
        `${caso.nome} play: guias, listas, tocador e paginacao sumiram, seta no canto (palco ${guardado.palco})`);
      await page.click('.tocador-alca');
      await page.waitForTimeout(500);
      const aberto = await estado();
      conta(aberto.abasVisiveis && aberto.tocador && aberto.rodape && aberto.paneExtras && aberto.alcaAcimaDasAbas, `${caso.nome} seta: voltou tudo, seta acima das guias`);
      conta(!erros.length, `${caso.nome} sem erro de JS${erros.length ? ': ' + erros.join('|') : ''}`);
    }
    await page.close();

    // desktop: sem guias; extras e filmes na tela de fim
    const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desk.goto(caso.url, { waitUntil: 'load' });
    await desk.waitForTimeout(700);
    await desk.evaluate(() => Animacao.telas.fim());
    await desk.waitForTimeout(600);
    const d = await desk.evaluate(() => {
      const vis = (sel) => { const el = document.querySelector(sel); return !!el && getComputedStyle(el).display !== 'none'; };
      const fim = document.querySelector('.step--fim');
      return {
        abas: vis('.painel-abas'), paneExtras: vis('.painel-extras'), paneFilmes: vis('.painel-filmes'),
        tocador: vis('.tocador'),
        extras: document.querySelectorAll('.fim__extra').length,
        links: document.querySelectorAll('a.fim__extra').length,
        filmes: document.querySelectorAll('.fim__filme').length,
        linksDeFilme: document.querySelectorAll('a.fim__filme-onde').length,
        rolaNoFim: fim ? fim.scrollHeight - fim.clientHeight : -1,
      };
    });
    conta(!d.abas && !d.paneExtras && !d.paneFilmes && d.tocador && d.extras === caso.extras && d.links === caso.links && d.filmes === caso.filmes && d.linksDeFilme === (caso.linksDeFilme || 0),
      `${caso.nome} desktop: sem guias, tocador na faixa; fim com ${d.extras} extras (${d.links} links) e ${d.filmes} filmes (${d.linksDeFilme} com link), rola ${d.rolaNoFim}px`);
    await desk.close();
  }

  await browser.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
})();

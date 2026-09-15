/* qa-cards
   A prova da Etapa 6 (o card vira componente) no navegador, nas paginas que ja tem a
   grade gerada pelo gera-cards.js:
     - arte com foto creditada tem lupa, aria-label e a legenda igual a que o dado gera;
       foto sem credito conhecido nao tem lupa (P10)
     - clicar abre o lightbox com a mesma imagem e a mesma legenda; Esc fecha e o foco
       volta pra arte; a arte recebe Tab e o Enter abre
     - o botao (canto de cima da arte) e a lupa (canto de baixo) respondem ao clique no
       proprio centro, sem nada por cima (regua 2)
     - nada estoura o card nem a pagina, nos tamanhos da regua 1 e no telefone do dono,
       nos dois temas
     - nenhum erro de JS (anotado por addInitScript: o pageerror nao ve tudo)
   E a regua 4: --grava <arquivo> guarda a geometria dos cards ANTES de gerar, e
   --compara <arquivo> confere depois, com 1px de folga.

   uso: node qa-cards.js [ar] [--paginas hardware.html,index.html] [--grava arq | --compara arq]
   Sem "ar" testa o local por file://; sem --paginas, as que ja tem marcador de cards.
   Capturas na pasta temporaria, em cards-qa (QA_OUT muda a pasta). */

const fs = require('fs');
const path = require('path');
const os = require('os');

const PLAYWRIGHT = 'C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright';
const RAIZ = path.resolve(__dirname, '..', '..', '..');
const ENDERECO_NO_AR = 'https://series.afx.art.br/site/';
const SAIDA = path.join(process.env.QA_OUT || os.tmpdir(), 'cards-qa');

const TAMANHOS = [
  { nome: 'd3840', largura: 3840, altura: 2160 },
  { nome: 'd1920', largura: 1920, altura: 1080 },
  { nome: 't768', largura: 768, altura: 1024 },
  { nome: 'tel360', largura: 360, altura: 640 },
  { nome: 'tel384-dono', largura: 384, altura: 686 },
];
const TAMANHOS_DA_GEOMETRIA = ['d1920', 't768', 'tel384-dono'];
const PECAS_DA_GEOMETRIA = ['.cap', '.cap__arte', '.cap h3', '.cap__pe', '.cap__botao', '.cap__selo'];
const FOLGA_DA_GEOMETRIA = 1;

let falhas = 0;
function anota(ok, texto) {
  if (!ok) falhas++;
  console.log(`${ok ? 'OK ' : 'XX '} ${texto}`);
}

/* ---------- o que testar ---------- */

function lerArgumentos(argumentos) {
  const opcoes = { noAr: false, paginas: null, grava: null, compara: null };
  for (let i = 0; i < argumentos.length; i++) {
    if (argumentos[i] === 'ar') opcoes.noAr = true;
    else if (argumentos[i] === '--paginas') opcoes.paginas = argumentos[++i].split(',');
    else if (argumentos[i] === '--grava') opcoes.grava = argumentos[++i];
    else if (argumentos[i] === '--compara') opcoes.compara = argumentos[++i];
  }
  return opcoes;
}

/* o gerador so e carregado quando precisa: a geometria de ANTES e gravada quando ele
   ainda nem tem a pagina no dado */
function gradesComMarcador() {
  return require('./gera-cards/grades.js').gradesComMarcador();
}

function paginasPedidas(opcoes) {
  return opcoes.paginas || [...new Set(gradesComMarcador().map((grade) => grade.pagina))];
}

function legendasEsperadas(nomeDaPagina) {
  const porTitulo = new Map();
  gradesComMarcador()
    .filter((grade) => grade.pagina === nomeDaPagina)
    .forEach((grade) => grade.cards.forEach((card) => porTitulo.set(card.titulo, card.legenda)));
  return porTitulo;
}

function enderecoDaPagina(nomeDaPagina, noAr) {
  if (noAr) return ENDERECO_NO_AR + encodeURI(nomeDaPagina);
  return 'file:///' + encodeURI(path.join(RAIZ, 'site', nomeDaPagina).split(path.sep).join('/'));
}

async function abrirPagina(navegador, url, tamanho, tema) {
  const contexto = await navegador.newContext({ viewport: { width: tamanho.largura, height: tamanho.altura }, colorScheme: tema });
  await contexto.addInitScript(() => {
    window.__erros = [];
    addEventListener('error', (evento) => window.__erros.push(String(evento.message || 'erro')));
    addEventListener('unhandledrejection', (evento) => window.__erros.push('promessa: ' + String(evento.reason)));
  });
  const pagina = await contexto.newPage();
  await pagina.goto(url, { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.waitForTimeout(300);
  return { contexto, pagina };
}

/* ---------- medir (roda dentro da pagina) ---------- */

function medirCardsNaPagina() {
  const dentro = (caixa, de) => caixa.left >= de.left - 1 && caixa.right <= de.right + 1 && caixa.top >= de.top - 1 && caixa.bottom <= de.bottom + 1;
  const respondeNoCentro = (alvo) => {
    if (!alvo) return null;
    alvo.scrollIntoView({ block: 'center', inline: 'center' });
    const caixa = alvo.getBoundingClientRect();
    const achado = document.elementFromPoint(caixa.left + caixa.width / 2, caixa.top + caixa.height / 2);
    return !!achado && alvo.contains(achado);
  };
  const medirCard = (card) => {
    const caixa = card.getBoundingClientRect();
    const arte = card.querySelector('.cap__arte');
    const estouros = [...card.querySelectorAll('.cap__corpo *')]
      .filter((el) => { const r = el.getBoundingClientRect(); return r.width && !dentro(r, caixa); })
      .map((el) => el.className || el.tagName);
    /* card sem arte (os episodios em producao do hardware-01) nao tem o que ampliar */
    const deArte = (ler) => (arte ? ler(arte) : null);
    return {
      titulo: card.querySelector('h3').textContent, abre: deArte((a) => a.dataset.abre || null),
      legenda: deArte((a) => a.dataset.legenda || null), aria: deArte((a) => a.getAttribute('aria-label')), temLupa: !!card.querySelector('.cap__lupa'),
      estouros, botaoResponde: respondeNoCentro(card.querySelector('.cap__botao')), lupaResponde: respondeNoCentro(card.querySelector('.cap__lupa')),
    };
  };
  return {
    rola: document.documentElement.scrollWidth > innerWidth,
    erros: window.__erros || [],
    temLightbox: !!(window.Animacao && window.Animacao.lightbox),
    cards: [...document.querySelectorAll('.cap')].map(medirCard),
  };
}

/* ---------- conferir ---------- */

function problemasDoCard(card, esperadas) {
  const problemas = [];
  if (esperadas.size && !esperadas.has(card.titulo)) problemas.push('card que o dado não conhece');
  if (esperadas.size && esperadas.has(card.titulo) && (esperadas.get(card.titulo) || null) !== card.legenda) {
    problemas.push(`legenda "${card.legenda}" em vez de "${esperadas.get(card.titulo)}"`);
  }
  if (card.abre === 'foto' && (!card.aria || !card.temLupa)) problemas.push('arte que abre sem aria-label ou sem lupa');
  if (card.abre !== 'foto' && card.temLupa) problemas.push('lupa numa arte que não abre');
  if (card.estouros.length) problemas.push('estoura o card: ' + card.estouros.join(', '));
  if (card.botaoResponde === false) problemas.push('botão coberto');
  if (card.lupaResponde === false) problemas.push('lupa coberta');
  return problemas;
}

function conferirMedidas(medidas, esperadas, rotulo) {
  const comLupa = medidas.cards.filter((card) => card.abre === 'foto').length;
  const ruins = medidas.cards.map((card) => ({ card, problemas: problemasDoCard(card, esperadas) })).filter((r) => r.problemas.length);
  ruins.forEach((r) => anota(false, `${rotulo} · ${r.card.titulo}: ${r.problemas.join('; ')}`));
  anota(!medidas.rola, `${rotulo}: ${medidas.cards.length} cards, ${comLupa} com lupa, ${ruins.length} com problema${medidas.rola ? ', ROLA DE LADO' : ''}`);
  if (medidas.erros.length) anota(false, `${rotulo}: erro de JS ${medidas.erros.join(' | ')}`);
  if (comLupa && !medidas.temLightbox) anota(false, `${rotulo}: tem arte que abre e o lightbox.js não carregou`);
}

function lerLightbox(pagina, arte) {
  return pagina.evaluate((el) => {
    const aberto = document.querySelector('.lightbox.aberta');
    const img = aberto && aberto.querySelector('.lb-quadro img');
    const legenda = aberto ? aberto.querySelector('.lb-legenda').textContent : null;
    const mesmaImagem = !!img && img.src === el.querySelector('img').src;
    const mesmaLegenda = legenda === el.dataset.legenda;
    const tabulavel = el.tabIndex === 0 && el.getAttribute('aria-hidden') !== 'true';
    return { ok: mesmaImagem && mesmaLegenda, tabulavel, detalhe: `imagem igual ${mesmaImagem}, legenda "${legenda}"` };
  }, arte);
}

async function fecharEConferirFoco(pagina, arte) {
  await pagina.keyboard.press('Escape');
  await pagina.waitForTimeout(700);
  return pagina.evaluate((el) => !document.querySelector('.lightbox.aberta') && document.activeElement === el, arte);
}

async function conferirLightbox(pagina, rotulo) {
  const artes = await pagina.$$('.cap__arte[data-abre="foto"]');
  for (const [i, arte] of artes.entries()) {
    await arte.scrollIntoViewIfNeeded();
    await arte.click();
    await pagina.waitForTimeout(800);
    const aberto = await lerLightbox(pagina, arte);
    const focoVoltou = await fecharEConferirFoco(pagina, arte);
    await arte.focus();
    await pagina.keyboard.press('Enter');
    await pagina.waitForTimeout(800);
    const abriuNoTeclado = await pagina.evaluate(() => !!document.querySelector('.lightbox.aberta'));
    await fecharEConferirFoco(pagina, arte);
    anota(aberto.ok && focoVoltou && aberto.tabulavel && abriuNoTeclado,
      `${rotulo} arte ${i + 1}: abre certo ${aberto.ok}, Esc devolve o foco ${focoVoltou}, Tab e Enter ${aberto.tabulavel && abriuNoTeclado}${aberto.ok ? '' : ' (' + aberto.detalhe + ')'}`);
  }
}

/* cada tamanho nos dois temas */
const RODADAS = TAMANHOS.flatMap((tamanho) => ['light', 'dark'].map((tema) => ({ tamanho, tema })));

async function conferirRodada(navegador, nomeDaPagina, rodada, opcoes) {
  const { tamanho, tema } = rodada;
  const { contexto, pagina } = await abrirPagina(navegador, enderecoDaPagina(nomeDaPagina, opcoes.noAr), tamanho, tema);
  conferirMedidas(await pagina.evaluate(medirCardsNaPagina), legendasEsperadas(nomeDaPagina), `${nomeDaPagina} ${tamanho.nome} ${tema}`);
  if (tamanho.nome === 'd1920' && tema === 'light') await conferirLightbox(pagina, `${nomeDaPagina} d1920`);
  if (['d1920', 'tel384-dono'].includes(tamanho.nome)) {
    await pagina.screenshot({ path: path.join(SAIDA, `${nomeDaPagina.replace(/\W/g, '-')}-${tamanho.nome}-${tema}.png`), fullPage: true });
  }
  await contexto.close();
}

async function rodarConferencia(navegador, paginas, opcoes) {
  for (const nomeDaPagina of paginas) {
    for (const rodada of RODADAS) await conferirRodada(navegador, nomeDaPagina, rodada, opcoes);
  }
}

/* ---------- a regua 4: geometria antes e depois ---------- */

function geometriaDaPagina(pagina) {
  return pagina.evaluate((seletores) => Object.fromEntries(seletores.map((seletor) => [seletor,
    [...document.querySelectorAll(seletor)].map((el) => {
      const caixa = el.getBoundingClientRect();
      return [caixa.left + scrollX, caixa.top + scrollY, caixa.width, caixa.height].map(Math.round);
    })])), PECAS_DA_GEOMETRIA);
}

function diferencasDaPeca(chave, seletor, antes, depois) {
  if (antes.length !== depois.length) return [`${chave} ${seletor}: ${antes.length} peças viraram ${depois.length}`];
  return antes
    .map((caixa, i) => (caixa.some((n, j) => Math.abs(n - depois[i][j]) > FOLGA_DA_GEOMETRIA) ? `${chave} ${seletor} nº ${i + 1}: [${caixa}] virou [${depois[i]}]` : null))
    .filter(Boolean);
}

function compararGeometria(antes, depois) {
  return Object.keys(antes)
    .filter((chave) => depois[chave])
    .flatMap((chave) => Object.keys(antes[chave]).flatMap((seletor) => diferencasDaPeca(chave, seletor, antes[chave][seletor], depois[chave][seletor] || [])));
}

async function rodarGeometria(navegador, paginas, opcoes) {
  const medidas = {};
  for (const nomeDaPagina of paginas) {
    for (const tamanho of TAMANHOS.filter((t) => TAMANHOS_DA_GEOMETRIA.includes(t.nome))) {
      const { contexto, pagina } = await abrirPagina(navegador, enderecoDaPagina(nomeDaPagina, opcoes.noAr), tamanho, 'light');
      medidas[`${nomeDaPagina} ${tamanho.nome}`] = await geometriaDaPagina(pagina);
      await contexto.close();
    }
  }
  if (opcoes.grava) {
    fs.writeFileSync(opcoes.grava, JSON.stringify(medidas));
    console.log(`geometria gravada: ${Object.keys(medidas).length} medidas em ${opcoes.grava}`);
    return;
  }
  const diferencas = compararGeometria(JSON.parse(fs.readFileSync(opcoes.compara, 'utf8')), medidas);
  diferencas.forEach((diferenca) => anota(false, 'geometria ' + diferenca));
  if (!diferencas.length) anota(true, `geometria igual à gravada (${Object.keys(medidas).length} medidas, folga de ${FOLGA_DA_GEOMETRIA}px)`);
}

async function principal() {
  const opcoes = lerArgumentos(process.argv.slice(2));
  if (!fs.existsSync(PLAYWRIGHT)) throw new Error('playwright nao encontrado em ' + PLAYWRIGHT);
  const { chromium } = require(PLAYWRIGHT);
  fs.mkdirSync(SAIDA, { recursive: true });
  const navegador = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  const paginas = paginasPedidas(opcoes);
  if (opcoes.grava || opcoes.compara) await rodarGeometria(navegador, paginas, opcoes);
  else await rodarConferencia(navegador, paginas, opcoes);
  await navegador.close();
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
  process.exitCode = falhas ? 1 : 0;
}

principal().catch((erro) => { console.error(erro); process.exitCode = 1; });

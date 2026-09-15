/* molde
   O HTML de um card, peca por peca, igual ao que as paginas tinham escrito a mao (o
   capitulo.css nao muda). Recebe a grade ja resolvida pelo grades.js e devolve linhas
   com recuo relativo; quem poe o recuo da pagina e o trecho.js.

   Texto que vem da MENU (nomes) e escapado. Texto que vem do cards.js (periodo, frase,
   resumo, contagem, ficha do audio) e HTML de proposito: pode ter <em> e entidade, e
   quem escreve ali e o dono do site, nunca um visitante. */

const path = require('path');

/* a lupa leva o desenho dentro (decisao 7): pagina nova nao precisa lembrar de sprite */
const LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/></svg>';

function escaparTexto(texto) {
  return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escaparAtributo(texto) {
  return escaparTexto(texto).replace(/"/g, '&quot;');
}

/* caminho da MENU ou do dado (relativo a raiz do site/, legivel, com espaco e acento)
   -> endereco escrito na pagina, que pode morar em etapas/ ou extras/ (decisao 8).
   A raiz falsa "/site" deixa o calculo longe da pasta em que o node foi chamado. */
function enderecoPara(pagina, alvo) {
  if (/^https?:/.test(alvo)) return escaparAtributo(alvo);
  const deOnde = path.posix.join('/site', path.posix.dirname(pagina));
  const praOnde = path.posix.join('/site', alvo);
  return escaparAtributo(encodeURI(path.posix.relative(deOnde, praOnde)));
}

function recuar(linhas, niveis) {
  const recuo = '  '.repeat(niveis);
  return linhas.map((linha) => (linha ? recuo + linha : linha));
}

/* ---------- a arte ---------- */

function numeroDoCard(card, escondido) {
  if (!card.num) return '';
  return `<span class="cap__num"${escondido ? ' aria-hidden="true"' : ''}>${escaparTexto(card.num)}</span>`;
}

function arteQueAmplia(card, imagem) {
  return `<div class="cap__arte cap__arte--arte" data-abre="foto" data-legenda="${escaparAtributo(card.legenda)}" aria-label="${escaparAtributo(card.rotuloDaArte)}">`
    + `${imagem}${numeroDoCard(card, true)}<span class="cap__lupa" aria-hidden="true">${LUPA}</span></div>`;
}

/* quatro jeitos: provisoria (sem imagem), link pra serie (a home, decisao 9), foto com
   lupa (tem credito) e foto parada (sem credito conhecido, P10) */
function arteDoCard(card, pagina) {
  if (!card.imagem) {
    return `<div class="cap__arte" aria-hidden="true">${numeroDoCard(card, false)}<span class="cap__tag">Arte provisória</span></div>`;
  }
  const imagem = `<img class="cap__img" src="${enderecoPara(pagina, card.imagem)}" alt="" loading="lazy">`;
  if (card.linkDaArte) {
    return `<a class="cap__arte cap__arte--arte" href="${enderecoPara(pagina, card.linkDaArte)}" tabindex="-1" aria-hidden="true">${imagem}</a>`;
  }
  if (card.legenda) return arteQueAmplia(card, imagem);
  return `<div class="cap__arte cap__arte--arte" aria-hidden="true">${imagem}${numeroDoCard(card, false)}</div>`;
}

/* ---------- o corpo ---------- */

function audioDoCard(card, pagina) {
  if (!card.audio) return [];
  return [
    '<div class="audio">',
    `  <audio controls preload="none" src="${enderecoPara(pagina, card.audio.src)}">`,
    '    Seu navegador não toca áudio aqui.',
    '  </audio>',
    `  <p class="audio__ficha"><span>${card.audio.ficha}</span><span>${card.audio.duracao}</span></p>`,
    '</div>',
  ];
}

function peDoCard(card, pagina) {
  const dentro = [];
  if (card.contagem) dentro.push(`<span class="cap__eps">${card.contagem}</span>`);
  if (card.selo) dentro.push(`<span class="cap__selo">${escaparTexto(card.selo)}</span>`);
  if (card.botao) {
    dentro.push(`<a class="cap__botao" href="${enderecoPara(pagina, card.botao.href)}" aria-label="${escaparAtributo(card.botao.aria)}">${escaparTexto(card.botao.rotulo)}</a>`);
  }
  return ['<div class="cap__pe">', ...recuar(dentro, 1), '</div>'];
}

/* o card em pe: hubs, paginas de etapa e extras */
function corpoEmPe(card, pagina) {
  return [
    '<div class="cap__corpo">',
    `  <p class="cap__periodo">${card.periodo}</p>`,
    `  <h3>${escaparTexto(card.titulo)}</h3>`,
    `  <p class="cap__frase">${card.frase}</p>`,
    `  <p class="cap__resumo">${card.resumo}</p>`,
    ...recuar(audioDoCard(card, pagina), 1),
    ...recuar(peDoCard(card, pagina), 1),
    '</div>',
  ];
}

/* o card deitado da home: aro com o icone do sprite da propria home, rotulo e nome */
function corpoDeitado(card, pagina) {
  return [
    '<div class="cap__corpo">',
    '  <div class="cap__cabeca">',
    `    <span class="aro" aria-hidden="true"><svg><use href="#ico-${escaparAtributo(card.icone)}"/></svg></span>`,
    `    <p class="cap__verbo">${escaparTexto(card.verbo)}</p>`,
    `    <h3>${escaparTexto(card.titulo)}</h3>`,
    '  </div>',
    `  <p class="cap__resumo">${card.resumo}</p>`,
    ...recuar(peDoCard(card, pagina), 1),
    '</div>',
  ];
}

function artigoDoCard(card, pagina, deitado) {
  const corpo = deitado ? corpoDeitado(card, pagina) : corpoEmPe(card, pagina);
  return ['<article class="cap">', `  ${arteDoCard(card, pagina)}`, ...recuar(corpo, 1), '</article>'];
}

function linhasDaGrade(grade) {
  const deitado = grade.tipo === 'series';
  const artigos = grade.cards.map((card) => [...recuar(artigoDoCard(card, grade.pagina, deitado), 1), '']);
  return [`<div class="${escaparAtributo(grade.classe)}">`, '', ...artigos.flat(), '</div>'];
}

module.exports = { linhasDaGrade };

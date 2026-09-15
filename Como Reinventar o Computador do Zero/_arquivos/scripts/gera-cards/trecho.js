/* trecho
   A grade gerada mora na pagina entre dois marcadores, e so ali:

     <!-- cards: hardware/etapas (gerado por gera-cards.js ...; nao editar a mao) -->
     ...a grade...
     <!-- /cards -->

   O resto da pagina continua escrito a mao. Aqui se acham os marcadores e se troca o
   miolo, com o recuo do marcador e o fim de linha da propria pagina. */

const AVISO = 'gerado por gera-cards.js a partir da MENU e do site/dados/cards.js; nao editar a mao';

function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function padraoDoTrecho(marcador) {
  return new RegExp(`^([ \\t]*)<!-- cards: ${escaparRegex(marcador)} [^\\n]*-->\\r?\\n[\\s\\S]*?^[ \\t]*<!-- /cards -->`, 'm');
}

function marcadoresDaPagina(html) {
  return [...html.matchAll(/<!-- cards: (\S+) /g)].map((achado) => achado[1]);
}

function fimDeLinha(html) {
  return html.includes('\r\n') ? '\r\n' : '\n';
}

/* a pagina com a grade no lugar do miolo do marcador; null se ela nao tem o marcador */
function trocarTrecho(html, marcador, linhas) {
  const achado = html.match(padraoDoTrecho(marcador));
  if (!achado) return null;
  const recuo = achado[1];
  const eol = fimDeLinha(html);
  const miolo = linhas.map((linha) => (linha ? recuo + linha : '')).join(eol);
  const novo = `${recuo}<!-- cards: ${marcador} (${AVISO}) -->${eol}${miolo}${eol}${recuo}<!-- /cards -->`;
  return html.slice(0, achado.index) + novo + html.slice(achado.index + achado[0].length);
}

module.exports = { marcadoresDaPagina, trocarTrecho };

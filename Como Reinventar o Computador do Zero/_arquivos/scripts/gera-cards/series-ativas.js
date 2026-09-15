/* series-ativas
   O estado de cada serie, ligada ou desligada, que mora no site/dados/series.json
   (decisao 10 da Etapa 6) e que o painel local escreve. Daqui saem duas coisas: a lista
   das ligadas, que o grades.js usa pra deixar a desligada fora da home, e o trecho
   marcado no topo do menu.js, que o menu usa pra deixar ela fora da arvore:

     /* series-ativas: gerado por gera-cards.js ...; nao editar a mao *\/
     var SERIES_ATIVAS = ['01', '02', ...];
     /* /series-ativas *\/

   O JSON vem de fora do codigo (o painel), entao e conferido inteiro antes de valer:
   so serie que existe na MENU, toda serie da MENU com estado, e "ativa" so true ou false.
   O que vai pro menu.js e o numero da propria MENU, nunca texto lido do JSON. */

const fs = require('fs');
const path = require('path');

const AVISO = 'gerado por gera-cards.js a partir do site/dados/series.json; nao editar a mao';
const PADRAO_DO_TRECHO = /^([ \t]*)\/\* series-ativas: [^\n]*\*\/\r?\n[\s\S]*?^[ \t]*\/\* \/series-ativas \*\//m;

function arquivoDoEstado(pastaDoSite) {
  return path.join(pastaDoSite, 'dados', 'series.json');
}

function lerJson(arquivo) {
  let estado;
  try {
    estado = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
  } catch (erro) {
    throw new Error(`site/dados/series.json ilegivel: ${erro.message}`);
  }
  if (!estado || typeof estado !== 'object' || Array.isArray(estado)) throw new Error('site/dados/series.json tem que ser um objeto { "01": { "ativa": true }, ... }');
  return estado;
}

/* os numeros das series ligadas, na ordem da MENU */
function lerEstado(pastaDoSite, menu) {
  const estado = lerJson(arquivoDoEstado(pastaDoSite));
  const numeros = menu.map((serie) => serie.num);
  const desconhecidas = Object.keys(estado).filter((num) => !numeros.includes(num));
  const semEstado = numeros.filter((num) => !estado[num] || typeof estado[num] !== 'object');
  const semBooleano = numeros.filter((num) => estado[num] && typeof estado[num].ativa !== 'boolean');
  if (desconhecidas.length) throw new Error(`series.json: serie que nao existe na MENU: ${desconhecidas.join(', ')}`);
  if (semEstado.length) throw new Error(`series.json: serie da MENU sem estado: ${semEstado.join(', ')}`);
  if (semBooleano.length) throw new Error(`series.json: "ativa" tem que ser true ou false em: ${semBooleano.join(', ')}`);
  return numeros.filter((num) => estado[num].ativa);
}

/* o menu.js com a lista das ligadas no trecho marcado; null se ele nao tem o trecho */
function trocarTrechoDoMenu(js, ativas) {
  const achado = js.match(PADRAO_DO_TRECHO);
  if (!achado) return null;
  const recuo = achado[1];
  const eol = js.includes('\r\n') ? '\r\n' : '\n';
  const lista = ativas.map((num) => `'${num}'`).join(', ');
  const novo = `${recuo}/* series-ativas: ${AVISO} */${eol}${recuo}var SERIES_ATIVAS = [${lista}];${eol}${recuo}/* /series-ativas */`;
  return js.slice(0, achado.index) + novo + js.slice(achado.index + achado[0].length);
}

module.exports = { arquivoDoEstado, lerEstado, trocarTrechoDoMenu };

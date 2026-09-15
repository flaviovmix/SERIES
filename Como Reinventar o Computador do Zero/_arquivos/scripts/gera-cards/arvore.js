/* arvore
   Le a arvore MENU do site/js/menu.js (quais series, etapas, episodios e extras existem,
   em que ordem, pra onde levam e se estao no ar) e responde as perguntas que um card
   faz a ela. Texto de card nao mora aqui: e do site/dados/cards.js. */

const path = require('path');

function carregarMenu(pastaDoSite) {
  const arquivo = path.join(pastaDoSite, 'js', 'menu.js');
  delete require.cache[require.resolve(arquivo)];
  const menu = require(arquivo);
  if (!Array.isArray(menu)) throw new Error('o menu.js nao entregou a MENU pro node (decisao 2 da Etapa 6)');
  return menu;
}

function acharPorNumero(lista, num, oQue) {
  const achado = (lista || []).find((item) => item.num === num);
  if (!achado) throw new Error(`${oQue} ${num} nao existe na MENU`);
  return achado;
}

function acharSerie(menu, num) {
  return acharPorNumero(menu, num, 'a serie');
}

function acharEtapa(serie, num) {
  return acharPorNumero(serie.etapas, num, `na serie ${serie.num}, a etapa`);
}

function acharExtra(serie, num) {
  return acharPorNumero(serie.extras && serie.extras.itens, num, `na serie ${serie.num}, o extra`);
}

function contagemDeEpisodios(noAr, total) {
  const palavra = total === 1 ? 'episódio' : 'episódios';
  return noAr === total ? `${total} ${palavra}` : `${noAr} de ${total} ${palavra}`;
}

/* decisao 5 da Etapa 6: pra onde o card de uma etapa leva, com que rotulo e contagem.
   Dois ou mais episodios no ar, a pagina da etapa; um so, direto a animacao dele;
   nenhum, mas a etapa tem pagina (o Hardware 01, so audio), a pagina, com rotulo e
   contagem vindos do dado; nem isso, o selo. */
function acaoDaEtapa(etapa) {
  const total = (etapa.episodios || []).length;
  const noAr = (etapa.episodios || []).filter((episodio) => episodio.href);
  if (noAr.length >= 2) {
    if (!etapa.href) throw new Error(`a etapa ${etapa.num} tem ${noAr.length} episodios no ar e nenhuma pagina (href) na MENU`);
    return { href: etapa.href, rotulo: 'Ver episódios', aria: `Ver os episódios da etapa ${etapa.nome}`, contagem: contagemDeEpisodios(noAr.length, total) };
  }
  if (noAr.length === 1) {
    return { href: noAr[0].href, rotulo: 'Ver episódio', aria: `Ver o episódio da etapa ${etapa.nome}`, contagem: contagemDeEpisodios(1, total) };
  }
  if (etapa.href) return { href: etapa.href, aria: `Abrir a etapa ${etapa.num}, ${etapa.nome}` };
  return { selo: 'em produção' };
}

module.exports = { carregarMenu, acharSerie, acharEtapa, acharExtra, acaoDaEtapa };

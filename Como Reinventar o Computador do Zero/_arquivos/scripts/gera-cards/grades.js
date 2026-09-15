/* grades
   Junta a MENU (o esqueleto: quais cards, ordem, destino, estado) com o site/dados/cards.js
   (o texto) e devolve cada grade de cards pronta pro molde. Moram aqui as regras das
   decisoes 3, 5 e 6 da Etapa 6, e e aqui que o gerador RECUSA dado que contradiz a MENU
   (card sem item, item sem card, selo de "no ar" pra item sem link...) em vez de gerar
   calado. */

const fs = require('fs');
const path = require('path');
const arvore = require('./arvore.js');
const seriesAtivas = require('./series-ativas.js');
const { linhasDaGrade } = require('./molde.js');
const { marcadoresDaPagina } = require('./trecho.js');

const RAIZ = path.resolve(__dirname, '..', '..', '..', '..');
const PASTA_DO_SITE = path.join(RAIZ, 'site');
const ARQUIVO_DOS_DADOS = path.join(PASTA_DO_SITE, 'dados', 'cards.js');

/* true = o selo so vale pra extra que esta no ar (tem link na MENU) */
const SELOS_DO_DADO = { 'no ar': true, 'pra conferir': true, 'em produção': false };

/* ---------- conferencias do dado ---------- */

function exigir(dado, campos, onde) {
  const faltam = campos.filter((campo) => dado[campo] === undefined || dado[campo] === '');
  if (faltam.length) throw new Error(`${onde}: falta ${faltam.join(', ')} no cards.js`);
}

function recusar(dado, campos, onde, porque) {
  const sobram = campos.filter((campo) => dado[campo] !== undefined);
  if (sobram.length) throw new Error(`${onde}: ${sobram.join(', ')} no cards.js, mas ${porque}`);
}

/* o dado de cada item da MENU, na ordem da MENU */
function casarComMenu(itens, cardsDoDado, marcador) {
  const numeros = itens.map((item) => item.num);
  const sobrando = Object.keys(cardsDoDado || {}).filter((num) => !numeros.includes(num));
  const faltando = numeros.filter((num) => !(cardsDoDado || {})[num]);
  if (sobrando.length) throw new Error(`${marcador}: card no cards.js sem item na MENU: ${sobrando.join(', ')}`);
  if (faltando.length) throw new Error(`${marcador}: item da MENU sem card no cards.js: ${faltando.join(', ')}`);
  return itens.map((item) => ({ item, texto: cardsDoDado[item.num] }));
}

/* ---------- pecas comuns ---------- */

function textoDoCard(texto) {
  return { periodo: texto.periodo, frase: texto.frase, resumo: texto.resumo, contagem: texto.contagem };
}

/* decisao 3: o prefixo vem da MENU, a descricao e o credito do dado. Sem credito, a
   foto fica sem lupa (P10) */
function arteDoDado(texto, prefixo, doItem) {
  if (!texto.imagem) return {};
  if (!texto.credito) return { imagem: texto.imagem };
  const legenda = [prefixo, texto.descricao, texto.credito].filter(Boolean).join(' · ');
  const oQueE = /^(ilustração|reconstituição)/.test(texto.credito) ? 'arte' : /^foto/.test(texto.credito) ? 'foto' : 'imagem';
  return { imagem: texto.imagem, legenda, rotuloDaArte: `Ampliar a ${oQueE} ${doItem}` };
}

function audioDoDado(texto, onde) {
  if (!texto.audio) return null;
  exigir(texto.audio, ['src', 'duracao'], `${onde} (audio)`);
  return { src: texto.audio.src, duracao: texto.audio.duracao, ficha: texto.audio.ficha || 'Áudio do extra' };
}

/* decisao 6: o selo do extra mora no dado, e o gerador para se ele contradiz a MENU */
function seloConferido(item, texto, onde) {
  exigir(texto, ['selo'], onde);
  if (!(texto.selo in SELOS_DO_DADO)) throw new Error(`${onde}: selo "${texto.selo}" nao existe (${Object.keys(SELOS_DO_DADO).join(', ')})`);
  if (SELOS_DO_DADO[texto.selo] !== Boolean(item.href)) {
    throw new Error(`${onde}: o cards.js diz "${texto.selo}", mas na MENU ele ${item.href ? 'tem link (esta no ar)' : 'nao tem link (nao esta no ar)'}`);
  }
  return texto.selo;
}

/* ---------- um montador por tipo de grade ---------- */

function peDaEtapa(etapa, texto, onde) {
  const acao = arvore.acaoDaEtapa(etapa);
  recusar(texto, ['selo'], onde, 'o selo da etapa sai da MENU');
  if (acao.selo) {
    exigir(texto, ['contagem'], onde);
    recusar(texto, ['botao'], onde, 'a etapa nao esta no ar');
    return { contagem: texto.contagem, selo: acao.selo };
  }
  if (acao.contagem) recusar(texto, ['contagem', 'botao'], onde, 'a MENU ja diz quantos episodios estao no ar (tira do cards.js)');
  else exigir(texto, ['contagem', 'botao'], onde);
  return { contagem: acao.contagem || texto.contagem, botao: { href: acao.href, rotulo: acao.rotulo || texto.botao, aria: acao.aria } };
}

function cardsDasEtapas(dado, menu, marcador) {
  const serie = arvore.acharSerie(menu, dado.serie);
  return casarComMenu(serie.etapas, dado.cards, marcador).map(({ item: etapa, texto }) => {
    const onde = `${marcador}, etapa ${etapa.num}`;
    exigir(texto, ['periodo', 'frase', 'resumo'], onde);
    return {
      num: etapa.num, titulo: etapa.nome, ...textoDoCard(texto),
      ...arteDoDado(texto, `Etapa ${etapa.num} · ${etapa.nome}`, `da etapa ${etapa.num}, ${etapa.nome}`),
      ...peDaEtapa(etapa, texto, onde),
    };
  });
}

function cardDosExtrasDaSerie(dado, menu, marcador) {
  const serie = arvore.acharSerie(menu, dado.serie);
  if (!serie.extras) throw new Error(`${marcador}: a serie ${serie.num} nao tem extras na MENU`);
  exigir(dado.card, ['periodo', 'frase', 'resumo'], marcador);
  recusar(dado.card, ['contagem', 'botao', 'selo'], marcador, 'a contagem e o destino dos extras saem da MENU');
  return [{
    num: 'EX', titulo: serie.extras.nome, ...textoDoCard(dado.card),
    ...arteDoDado(dado.card, `Extras · ${serie.nome}`, `dos extras de ${serie.nome}`),
    contagem: `${serie.extras.itens.length} extras`,
    botao: { href: serie.extras.href, rotulo: 'Ver extras', aria: 'Ver os extras da série' },
  }];
}

function cardDaSerie(serie, texto, onde) {
  exigir(texto, ['imagem', 'icone', 'resumo'], onde);
  if (!/^[a-z-]+$/.test(texto.icone)) throw new Error(`${onde}: icone "${texto.icone}" fora do formato do sprite da home`);
  const noAr = Boolean(serie.href);
  return {
    titulo: serie.nome, resumo: texto.resumo, icone: texto.icone, imagem: texto.imagem,
    verbo: noAr ? `${(serie.etapas || []).length} etapas` : 'Em preparação',
    linkDaArte: noAr ? serie.href : null,
    ...(noAr ? { botao: { href: serie.href, rotulo: 'Ver a série', aria: `Ver a série ${serie.nome}` } } : { selo: 'em breve' }),
  };
}

/* serie desligada no series.json fica fora da home (decisao 10); o texto dela continua
   no dado, conferido do mesmo jeito, pronto pra quando ela voltar */
function cardsDasSeries(dado, menu, marcador, ativas) {
  return casarComMenu(menu, dado.cards, marcador)
    .map(({ item: serie, texto }) => ({ serie, card: cardDaSerie(serie, texto, `${marcador}, serie ${serie.num}`) }))
    .filter(({ serie }) => ativas.includes(serie.num))
    .map(({ card }) => card);
}

function cardsDosEpisodios(dado, menu, marcador) {
  const etapa = arvore.acharEtapa(arvore.acharSerie(menu, dado.serie), dado.etapa);
  return casarComMenu(etapa.episodios || [], dado.cards, marcador).map(({ item: episodio, texto }) => {
    const onde = `${marcador}, episodio ${episodio.num}`;
    exigir(texto, ['periodo', 'frase', 'resumo', 'contagem'], onde);
    recusar(texto, ['selo', 'botao'], onde, 'o selo e o botao do episodio saem da MENU');
    return {
      num: episodio.num, titulo: episodio.nome, ...textoDoCard(texto),
      ...arteDoDado(texto, `Episódio ${episodio.num} · ${episodio.nome}`, `do episódio ${episodio.num}, ${episodio.nome}`),
      ...acaoDoEpisodio(episodio),
    };
  });
}

/* episodio no ar leva pra animacao; sem link na MENU, o selo */
function acaoDoEpisodio(episodio) {
  return episodio.href
    ? { botao: { href: episodio.href, rotulo: 'Abrir a animação', aria: `Abrir a animação do episódio ${episodio.num}, ${episodio.nome}` } }
    : { selo: 'em produção' };
}

/* os episodios de uma etapa ainda sem animacao, listados sem arte e sem frase (a pagina
   hardware-01): o periodo diz so o numero, e o selo ou o botao saem da MENU */
function cardsDosEpisodiosSemArte(dado, menu, marcador) {
  const etapa = arvore.acharEtapa(arvore.acharSerie(menu, dado.serie), dado.etapa);
  return casarComMenu(etapa.episodios || [], dado.cards, marcador).map(({ item: episodio, texto }) => {
    const onde = `${marcador}, episodio ${episodio.num}`;
    exigir(texto, ['resumo'], onde);
    recusar(texto, ['imagem', 'frase', 'selo', 'botao'], onde, 'o card sem arte so leva o resumo; selo e botao saem da MENU');
    return { num: episodio.num, titulo: episodio.nome, periodo: `episódio ${episodio.num}`, resumo: texto.resumo, semArte: true, ...acaoDoEpisodio(episodio) };
  });
}

/* a pagina de uma etapa que por enquanto e so o audio dela (a hardware-01): o card da
   propria etapa, com o player e sem botao, e o selo conferido com o link da MENU */
function cardDoDestaqueDaEtapa(dado, menu, marcador) {
  const etapa = arvore.acharEtapa(arvore.acharSerie(menu, dado.serie), dado.etapa);
  exigir(dado.card, ['periodo', 'frase', 'resumo', 'contagem', 'audio'], marcador);
  recusar(dado.card, ['botao'], marcador, 'o destaque ja e a pagina da etapa');
  return [{
    num: etapa.num, titulo: etapa.nome, ...textoDoCard(dado.card), audio: audioDoDado(dado.card, marcador),
    ...arteDoDado(dado.card, `Etapa ${etapa.num} · ${etapa.nome}`, `da etapa ${etapa.num}, ${etapa.nome}`),
    selo: seloConferido(etapa, dado.card, marcador),
  }];
}

function botaoDoExtra(item, texto, onde) {
  if (!item.href) {
    recusar(texto, ['botao'], onde, 'o extra nao esta no ar');
    return {};
  }
  exigir(texto, ['botao'], onde);
  const aria = texto.botao === 'Abrir a animação' ? `Abrir a animação do extra ${item.nome}` : `Abrir o extra ${item.nome}`;
  return { botao: { href: item.href, rotulo: texto.botao, aria } };
}

function cardDoExtra(item, texto, onde) {
  exigir(texto, ['periodo', 'frase', 'resumo', 'contagem'], onde);
  return {
    num: item.num, titulo: item.nome, ...textoDoCard(texto), audio: audioDoDado(texto, onde),
    ...arteDoDado(texto, `Extra ${item.num} · ${item.nome}`, `do extra ${item.num}, ${item.nome}`),
    selo: seloConferido(item, texto, onde),
  };
}

function cardsDosExtras(dado, menu, marcador) {
  const serie = arvore.acharSerie(menu, dado.serie);
  const itens = (serie.extras && serie.extras.itens) || [];
  return casarComMenu(itens, dado.cards, marcador).map(({ item, texto }) => {
    const onde = `${marcador}, extra ${item.num}`;
    return { ...cardDoExtra(item, texto, onde), ...botaoDoExtra(item, texto, onde) };
  });
}

/* a pagina de um extra so de audio: o proprio card, com o player, e sem botao */
function cardDoDestaque(dado, menu, marcador) {
  const item = arvore.acharExtra(arvore.acharSerie(menu, dado.serie), dado.extra);
  exigir(dado.card, ['audio'], marcador);
  recusar(dado.card, ['botao'], marcador, 'o destaque ja e a pagina do extra');
  return [cardDoExtra(item, dado.card, marcador)];
}

const MONTADORES = {
  'etapas': cardsDasEtapas,
  'extras-da-serie': cardDosExtrasDaSerie,
  'series': cardsDasSeries,
  'episodios': cardsDosEpisodios,
  'extras': cardsDosExtras,
  'destaque-do-extra': cardDoDestaque,
  'episodios-sem-arte': cardsDosEpisodiosSemArte,
  'destaque-da-etapa': cardDoDestaqueDaEtapa,
};

/* ---------- a entrada ---------- */

function carregarDados() {
  delete require.cache[require.resolve(ARQUIVO_DOS_DADOS)];
  return require(ARQUIVO_DOS_DADOS);
}

function montarGrade(marcador, dado, menu, ativas) {
  const montador = MONTADORES[dado.tipo];
  if (!montador) throw new Error(`${marcador}: tipo "${dado.tipo}" nao existe (${Object.keys(MONTADORES).join(', ')})`);
  if (!fs.existsSync(path.join(PASTA_DO_SITE, dado.pagina || ''))) throw new Error(`${marcador}: a pagina "${dado.pagina}" nao existe no site/`);
  const grade = { marcador, pagina: dado.pagina, tipo: dado.tipo, classe: dado.grade, cards: montador(dado, menu, marcador, ativas) };
  return { ...grade, linhas: linhasDaGrade(grade) };
}

/* tudo o que o gerador escreve: as grades e a lista das series ligadas */
function montarSite() {
  const menu = arvore.carregarMenu(PASTA_DO_SITE);
  const ativas = seriesAtivas.lerEstado(PASTA_DO_SITE, menu);
  const grades = Object.entries(carregarDados()).map(([marcador, dado]) => montarGrade(marcador, dado, menu, ativas));
  return { grades, ativas };
}

function montarTodasAsGrades() {
  return montarSite().grades;
}

/* as grades que ja tem marcador na pagina: e o que o qa-cards.js testa */
function gradesComMarcador() {
  return montarTodasAsGrades().filter((grade) => {
    const html = fs.readFileSync(path.join(PASTA_DO_SITE, grade.pagina), 'utf8');
    return marcadoresDaPagina(html).includes(grade.marcador);
  });
}

module.exports = { PASTA_DO_SITE, montarSite, montarTodasAsGrades, gradesComMarcador };

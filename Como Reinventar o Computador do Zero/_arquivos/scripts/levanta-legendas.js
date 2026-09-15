/* levanta-legendas
   Subetapa 6.1 da Etapa 6 do plano (o card vira componente). Pra cada foto de capa
   de card do site/, procura de onde vem o credito, nesta ordem:
     1. a legenda da mesma imagem numa animacao ("descricao · foto: Autor, Licenca")
     2. o img/CREDITOS.md da pasta dela
     3. o _telas.md do episodio ("`arquivo.jpg` (Licenca, Autor)")
     4. a legenda que o proprio card ja publica (o hardware.html, desde 14/09)
     5. uma pista de que e ilustracao: nome com "-ilustra", prompt do Flow salvo do
        lado, ou um plano que cita o arquivo junto com "Flow" ou "Gemini"
   Nao mexe em pagina nenhuma: so le e escreve a tabela.

   A mesma foto pode estar copiada em duas pastas (a capa do ENIAC do 06-02 tambem
   mora no 06-03), e dois arquivos com o mesmo nome podem ser fotos diferentes (os
   dois datacenter-real.jpg). Por isso a comparacao com as animacoes e pelo
   conteudo (md5), nunca pelo nome.

   uso: node levanta-legendas.js [--json] [arquivo-de-saida]
   Sem arquivo, escreve na tela. --json troca a tabela pelos dados crus. */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RAIZ = path.resolve(__dirname, '..', '..', '..');
const SITE = path.join(RAIZ, 'site');
const PASTAS_IGNORADAS = new Set(['node_modules', 'GRAVAR-TELA']);

/* o pedaco da legenda que e credito: comeca dizendo o que a imagem e, ou traz licenca */
const PARTE_DE_CREDITO = /^(foto|diagrama|desenho|gravura|imagem|captura|mapa|cartaz|ilustra|reconstitui)|dom[ií]nio p[uú]blico|\bCC[ -]?(BY|0)/i;
const CREDITO_DE_ILUSTRACAO = /^(ilustra|reconstitui)/i;

/* ---------- arquivos ---------- */

function listarArquivos(pasta, aceita, achados = []) {
  for (const item of fs.readdirSync(pasta, { withFileTypes: true })) {
    if (item.name.startsWith('.') || PASTAS_IGNORADAS.has(item.name)) continue;
    const caminho = path.join(pasta, item.name);
    if (item.isDirectory()) listarArquivos(caminho, aceita, achados);
    else if (aceita(item.name)) achados.push(caminho);
  }
  return achados;
}

function relativo(caminho) {
  return path.relative(RAIZ, caminho).split(path.sep).join('/');
}

const md5PorCaminho = new Map();
function md5DoArquivo(caminho) {
  if (!md5PorCaminho.has(caminho)) {
    const existe = caminho && fs.existsSync(caminho);
    md5PorCaminho.set(caminho, existe ? crypto.createHash('md5').update(fs.readFileSync(caminho)).digest('hex') : null);
  }
  return md5PorCaminho.get(caminho);
}

/* o src de uma imagem, resolvido pra caminho no disco; data: e endereco quebrado viram null */
function caminhoDoSrc(arquivoHtml, src) {
  if (src.startsWith('data:') || /^https?:/.test(src)) return null;
  try {
    return path.resolve(path.dirname(arquivoHtml), decodeURI(src.split(/[?#]/)[0]));
  } catch (erro) {
    return null;
  }
}

/* ---------- texto ---------- */

function decodificarEntidades(texto) {
  const nomes = { amp: '&', lt: '<', gt: '>', quot: '"', middot: '·', rarr: '→', ndash: '–', mdash: '—', nbsp: ' ' };
  return texto.replace(/&(#\d+|[a-z]+);/gi, (inteiro, nome) =>
    nome[0] === '#' ? String.fromCharCode(Number(nome.slice(1))) : (nomes[nome] ?? inteiro));
}

function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function traduzirLicenca(licenca) {
  return /^public domain$/i.test(licenca) ? 'domínio público' : licenca;
}

/* "Réplica do primeiro transistor · foto: Mister rf, CC BY-SA 4.0" -> descricao e credito.
   O credito e UM pedaco so (autor e licenca vem separados por virgula, nunca por ponto),
   e pode vir no comeco ("ilustração · boletim impecável") ou no fim */
function separarLegenda(legenda) {
  const partes = legenda.split(' · ').map((parte) => parte.trim());
  const posicaoDoCredito = partes.findIndex((parte) => PARTE_DE_CREDITO.test(parte));
  if (posicaoDoCredito < 0) return null;
  const credito = partes[posicaoDoCredito];
  return {
    tipo: CREDITO_DE_ILUSTRACAO.test(credito) ? 'ilustração' : 'real',
    descricao: partes.filter((parte, i) => i !== posicaoDoCredito).join(' · '),
    credito,
  };
}

/* ---------- 0. as fotos dos cards ---------- */

function fotosDosCards() {
  const fotos = new Map();
  const capa = /<div class="cap__arte[^"]*"([^>]*)><img class="cap__img" src="([^"]+)"/g;
  for (const pagina of listarArquivos(SITE, (nome) => nome.endsWith('.html'))) {
    const html = fs.readFileSync(pagina, 'utf8');
    for (const [, atributos, src] of html.matchAll(capa)) {
      const foto = caminhoDoSrc(pagina, src);
      if (!fotos.has(foto)) fotos.set(foto, { foto, capas: [], legendaPublicada: null });
      const registro = fotos.get(foto);
      registro.capas.push(relativo(pagina).replace(/^site\//, ''));
      const publicada = atributos.match(/data-legenda="([^"]*)"/);
      if (publicada) registro.legendaPublicada = decodificarEntidades(publicada[1]);
    }
  }
  return fotos;
}

/* ---------- 1. as legendas das animacoes ---------- */

/* de qual imagem da figura a legenda fala. Com uma imagem so, e ela. Na troca entre foto
   e ilustracao (duas imagens na mesma figura) a legenda com credito de foto e da que tem
   "-real" no nome, a regra de nome da serie. Fora disso nao da pra saber: fica de fora */
function imagemDaLegenda(imagens, legenda) {
  if (imagens.length === 1) return imagens[0];
  const separada = separarLegenda(legenda);
  const reais = imagens.filter((src) => /-real\./.test(src));
  return separada && separada.tipo === 'real' && reais.length === 1 ? reais[0] : null;
}

function figurasComLegenda(animacao) {
  const html = fs.readFileSync(animacao, 'utf8');
  const figuras = [];
  for (const [, atributos, miolo] of html.matchAll(/<figure\b([^>]*)>([\s\S]*?)<\/figure>/g)) {
    const bruta = (atributos.match(/data-legenda="([^"]*)"/) || miolo.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/) || [])[1];
    if (!bruta) continue;
    const legenda = decodificarEntidades(bruta.replace(/<[^>]+>/g, '').trim());
    const src = imagemDaLegenda([...miolo.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]), legenda);
    const imagem = src && caminhoDoSrc(animacao, src);
    if (imagem) figuras.push({ imagem, legenda });
  }
  return figuras;
}

function legendasDasAnimacoes() {
  const porConteudo = new Map();
  const animacoes = listarArquivos(RAIZ, (nome) => nome === 'animacao.html').filter((a) => !a.startsWith(SITE));
  for (const animacao of animacoes) {
    for (const figura of figurasComLegenda(animacao)) {
      const md5 = md5DoArquivo(figura.imagem);
      if (!md5) continue;
      if (!porConteudo.has(md5)) porConteudo.set(md5, []);
      porConteudo.get(md5).push({ legenda: figura.legenda, fonte: relativo(animacao), pasta: path.dirname(animacao) });
    }
  }
  return porConteudo;
}

/* a animacao da pasta da propria foto primeiro; versao velha (_v1, OLD) por ultimo */
function prioridadeDaFonte(legenda, foto) {
  if (foto.startsWith(legenda.pasta + path.sep)) return 0;
  return /(^|\/)(_v\d+|OLD)\//.test(legenda.fonte) ? 2 : 1;
}

function creditosDasAnimacoes(foto, legendas) {
  return (legendas.get(md5DoArquivo(foto)) || [])
    .map((legenda) => ({ ...separarLegenda(legenda.legenda), fonte: legenda.fonte, prioridade: prioridadeDaFonte(legenda, foto) }))
    .filter((achado) => achado.credito)
    .sort((a, b) => a.prioridade - b.prioridade);
}

/* ---------- 2. o CREDITOS.md ---------- */

/* a tabela do CREDITOS.md nao tem sempre as mesmas colunas: acha pelo cabecalho */
function colunasDoCabecalho(linhas) {
  const cabecalho = linhas.find((linha) => linha.startsWith('|') && /autor/i.test(linha) && /licen/i.test(linha));
  if (!cabecalho) return null;
  const celulas = cabecalho.split('|').map((celula) => celula.trim().toLowerCase());
  return { autor: celulas.findIndex((c) => c.startsWith('autor')), licenca: celulas.findIndex((c) => c.startsWith('licen')) };
}

function creditoDoCreditosMd(foto) {
  const arquivo = path.join(path.dirname(foto), 'CREDITOS.md');
  if (!fs.existsSync(arquivo)) return null;
  const linhas = fs.readFileSync(arquivo, 'utf8').split(/\r?\n/);
  const colunas = colunasDoCabecalho(linhas);
  const linha = linhas.find((l) => new RegExp('^\\|\\s*`?' + escaparRegex(path.basename(foto)) + '[`\\s(|]').test(l));
  if (!colunas || !linha) return null;
  const celulas = linha.split('|').map((celula) => celula.trim());
  const autor = celulas[colunas.autor];
  const licenca = celulas[colunas.licenca];
  if (!autor || !licenca) return null;
  return { tipo: 'real', descricao: '', credito: `foto: ${autor}, ${traduzirLicenca(licenca)}`, fonte: relativo(arquivo) };
}

/* ---------- 3. o _telas.md ---------- */

/* "`transistor-real.jpg` (CC BY-SA 4.0, Mister rf)" ou "`baby-real.jpg` (replica do Baby,
   CC BY 4.0, Logg Tandy)": a licenca e o pedaco com cara de licenca e o autor vem logo
   depois dela. A descricao do _telas.md vai sem acento, entao nao entra */
function creditoDoTelasMd(foto) {
  if (path.basename(path.dirname(foto)) !== 'img') return null;
  const arquivo = path.join(path.dirname(path.dirname(foto)), '_telas.md');
  if (!fs.existsSync(arquivo)) return null;
  const achado = fs.readFileSync(arquivo, 'utf8').match(new RegExp('`' + escaparRegex(path.basename(foto)) + '`\\s*\\(([^)]+)\\)'));
  const partes = achado ? achado[1].split(',').map((parte) => parte.trim()) : [];
  const posicaoDaLicenca = partes.findIndex((parte) => /^CC\b|dom[ií]nio p[uú]blico|public domain/i.test(parte));
  const autor = partes[posicaoDaLicenca + 1];
  if (posicaoDaLicenca < 0 || !autor) return null;
  return { tipo: 'real', descricao: '', credito: `foto: ${autor}, ${traduzirLicenca(partes[posicaoDaLicenca])}`, fonte: relativo(arquivo) };
}

/* os recortes que o CREDITOS.md registra ("| transformer-169.png | transformer-real.png |
   ..."): mesmo autor e mesma licenca da foto de onde saíram, e a animacao pode mostrar
   so o recorte. Entao a legenda do recorte vale pra foto inteira */
function recortesDaFoto(foto) {
  const arquivo = path.join(path.dirname(foto), 'CREDITOS.md');
  if (!fs.existsSync(arquivo)) return [];
  const nome = path.basename(foto);
  return fs.readFileSync(arquivo, 'utf8').split(/\r?\n/)
    .map((linha) => linha.split('|').map((celula) => celula.trim()))
    .filter((celulas) => celulas[2] === nome && celulas[1] !== nome && /\.\w+$/.test(celulas[1]))
    .map((celulas) => path.join(path.dirname(foto), celulas[1]));
}

/* ---------- 4. a legenda que o card ja publica ---------- */

/* o comeco dela ("Etapa 01 · Nome") sai da MENU no gerador, entao so o credito interessa */
function creditoDaLegendaPublicada(registro) {
  const separada = registro.legendaPublicada && separarLegenda(registro.legendaPublicada);
  if (!separada) return null;
  return { tipo: separada.tipo, descricao: '', credito: separada.credito, fonte: 'a legenda já publicada no card' };
}

/* ---------- 5. pista de ilustracao ---------- */

function carregarPlanos() {
  return listarArquivos(RAIZ, (nome) => nome.endsWith('.md'))
    .filter((arquivo) => !arquivo.startsWith(SITE))
    .map((arquivo) => ({ arquivo, linhas: fs.readFileSync(arquivo, 'utf8').split(/\r?\n/) }));
}

function pistaDeIlustracao(foto, planos) {
  const nome = path.basename(foto);
  if (/-ilustra\b/.test(nome)) return 'o nome do arquivo (-ilustra)';
  const prompt = path.join(path.dirname(foto), 'flow', 'prompt', nome.replace(/\.[^.]+$/, '.txt'));
  if (fs.existsSync(prompt)) return relativo(prompt);
  const plano = planos.find((p) => p.linhas.some((linha) => linha.includes(nome) && /\bFlow\b|Gemini/.test(linha)));
  return plano ? relativo(plano.arquivo) : null;
}

function creditoPorPista(foto, planos) {
  const pista = pistaDeIlustracao(foto, planos);
  return pista ? { tipo: 'ilustração', descricao: '', credito: 'ilustração', fonte: pista } : null;
}

/* ---------- a tabela ---------- */

function levantarFoto(registro, contexto) {
  const dasAnimacoes = creditosDasAnimacoes(registro.foto, contexto.legendas);
  const dosRecortes = recortesDaFoto(registro.foto)
    .flatMap((recorte) => creditosDasAnimacoes(recorte, contexto.legendas))
    .map((achadoNoRecorte) => ({ ...achadoNoRecorte, fonte: achadoNoRecorte.fonte + ' (legenda do recorte)' }));
  const achado = dasAnimacoes[0] || dosRecortes[0] || creditoDoCreditosMd(registro.foto) || creditoDoTelasMd(registro.foto)
    || creditoDaLegendaPublicada(registro) || creditoPorPista(registro.foto, contexto.planos);
  const semCredito = { tipo: 'sem crédito', descricao: '', credito: '', fonte: '' };
  const creditosDiferentes = new Set(dasAnimacoes.map((a) => a.credito));
  return {
    imagem: relativo(registro.foto),
    capas: registro.capas,
    ...(achado || semCredito),
    divergente: creditosDiferentes.size > 1 ? [...creditosDiferentes] : null,
  };
}

function celula(texto) {
  return String(texto || '').replace(/\|/g, '\\|');
}

function montarTabela(linhas) {
  const topo = [
    '# Levantamento das legendas das capas (Etapa 6, subetapa 6.1)',
    '',
    `Gerado por \`levanta-legendas.js\` em ${new Date().toISOString().slice(0, 10)}. Uma linha por ARQUIVO de imagem; a coluna "capas" diz em que páginas ele é capa de card.`,
    '',
    '| # | imagem | capas | tipo | descrição | crédito | de onde veio |',
    '|---|---|---|---|---|---|---|',
  ];
  const corpo = linhas.map((l, i) => `| ${i + 1} | ${celula(l.imagem)} | ${celula(l.capas.join(', '))} | ${l.tipo} | ${celula(l.descricao)} | ${celula(l.credito)}${l.divergente ? ' ⚠️ divergente: ' + celula(l.divergente.join(' / ')) : ''} | ${celula(l.fonte)} |`);
  return topo.concat(corpo, '', resumo(linhas), '').join('\n');
}

function resumo(linhas) {
  const porTipo = {};
  linhas.forEach((l) => { porTipo[l.tipo] = (porTipo[l.tipo] || 0) + 1; });
  const capas = linhas.reduce((soma, l) => soma + l.capas.length, 0);
  return `${linhas.length} arquivos em ${capas} capas: ` + Object.entries(porTipo).map(([tipo, n]) => `${n} ${tipo}`).join(', ') + '.';
}

function principal() {
  const argumentos = process.argv.slice(2);
  const querJson = argumentos.includes('--json');
  const saida = argumentos.find((a) => a !== '--json');
  const contexto = { legendas: legendasDasAnimacoes(), planos: carregarPlanos() };
  const linhas = [...fotosDosCards().values()].map((registro) => levantarFoto(registro, contexto));
  const texto = querJson ? JSON.stringify(linhas, null, 2) : montarTabela(linhas);
  if (saida) fs.writeFileSync(saida, texto);
  else process.stdout.write(texto + '\n');
  console.error(resumo(linhas));
}

principal();

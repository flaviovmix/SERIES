/* servidor do painel das series
   Liga e desliga series do site sem editar codigo (subetapa 6.10 da Etapa 6 do plano do
   SEIRES). Roda so na maquina do dono. Escreve UM arquivo, o site/dados/series.json, e
   chama o gera-cards.js, que e quem mexe nas paginas. Nao publica nada: no fim mostra o
   que mudou e o comando de subir, pra o dono rodar quando quiser.

   uso (na raiz do SEIRES): node painel/servidor.js     (PAINEL_PORTA troca a porta)

   Seguro por desenho, porque qualquer site aberto no navegador pode tentar falar com uma
   porta local:
     - escuta so 127.0.0.1, e pedido com Host diferente de 127.0.0.1:<porta> ou
       localhost:<porta> volta 403: e o que barra o DNS rebinding
     - gravar exige a Origin do proprio painel e o token criado a cada subida, comparado
       em tempo constante: e o que barra o CSRF
     - corpo ate 4 KB, JSON, so serie que existe na MENU e so true ou false
     - o gerador roda por execFile com caminho fixo, sem shell e sem nada vindo do pedido
     - grava num temporario e renomeia; se o gerador falhar, o JSON volta ao que era
     - so serve os arquivos de uma lista fechada; nenhum caminho sai do pedido
     - sem dependencia de npm: so http, fs, crypto, child_process e path do proprio node */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFile } = require('child_process');

const HOST = '127.0.0.1';
const PORTA = lerPorta(process.env.PAINEL_PORTA);
const RAIZ = path.resolve(__dirname, '..');
const SITE = path.join(RAIZ, 'site');
const ARQUIVO_DO_ESTADO = path.join(SITE, 'dados', 'series.json');
const ARQUIVO_DO_MENU = path.join(SITE, 'js', 'menu.js');
const GERADOR = path.join(RAIZ, 'Como Reinventar o Computador do Zero', '_arquivos', 'scripts', 'gera-cards', 'gera-cards.js');
const SOBE_ARQUIVOS = 'Como Reinventar o Computador do Zero/_arquivos/scripts/sobe-arquivos.sh';
const LIMITE_DO_CORPO = 4 * 1024;
const PRAZO_DO_GERADOR = 60 * 1000;
const TOKEN = crypto.randomBytes(32).toString('hex');
const HOSTS_ACEITOS = [`127.0.0.1:${PORTA}`, `localhost:${PORTA}`];
const ORIGENS_ACEITAS = HOSTS_ACEITOS.map((host) => `http://${host}`);

/* o que a pagina do painel pode pedir, e so isso */
const ARQUIVOS_DA_PAGINA = new Map([
  ['/painel.css', { arquivo: path.join(__dirname, 'painel.css'), tipo: 'text/css; charset=utf-8' }],
  ['/painel.js', { arquivo: path.join(__dirname, 'painel.js'), tipo: 'text/javascript; charset=utf-8' }],
  ['/tokens.css', { arquivo: path.join(SITE, 'css', 'tokens.css'), tipo: 'text/css; charset=utf-8' }],
]);

const CABECALHOS_DE_SEGURANCA = {
  'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cache-Control': 'no-store',
};

/* erro que o proprio pedido causou: vira resposta com status e motivo */
class ErroDoPedido extends Error {
  constructor(status, motivo) {
    super(motivo);
    this.status = status;
  }
}

function lerPorta(texto) {
  if (texto === undefined || texto === '') return 8790;
  const porta = Number(texto);
  if (!Number.isInteger(porta) || porta < 1024 || porta > 65535) throw new Error('PAINEL_PORTA tem que ser um numero de 1024 a 65535');
  return porta;
}

/* ---------- respostas ---------- */

function responder(resposta, status, corpo, tipo = 'application/json; charset=utf-8') {
  resposta.writeHead(status, { ...CABECALHOS_DE_SEGURANCA, 'Content-Type': tipo });
  resposta.end(typeof corpo === 'string' ? corpo : JSON.stringify(corpo));
}

function responderSemConteudo(resposta) {
  resposta.writeHead(204, CABECALHOS_DE_SEGURANCA);
  resposta.end();
}

function recusar(resposta, status, motivo) {
  responder(resposta, status, { ok: false, erro: motivo });
}

function servirPagina(resposta) {
  const html = fs.readFileSync(path.join(__dirname, 'painel.html'), 'utf8').replace('{{TOKEN}}', TOKEN);
  responder(resposta, 200, html, 'text/html; charset=utf-8');
}

function servirArquivo(resposta, arquivoDaPagina) {
  responder(resposta, 200, fs.readFileSync(arquivoDaPagina.arquivo, 'utf8'), arquivoDaPagina.tipo);
}

/* ---------- quem pode falar com o painel ---------- */

function hostAceito(pedido) {
  return HOSTS_ACEITOS.includes(pedido.headers.host);
}

function origemAceita(pedido) {
  return ORIGENS_ACEITAS.includes(pedido.headers.origin);
}

function tokenAceito(pedido) {
  const recebido = Buffer.from(String(pedido.headers['x-token-do-painel'] || ''));
  const esperado = Buffer.from(TOKEN);
  return recebido.length === esperado.length && crypto.timingSafeEqual(recebido, esperado);
}

/* o corpo inteiro, ate 4 KB. Passou disso, recusa, mas continua escoando o que chega pra
   a resposta ainda alcancar quem pediu */
function lerCorpo(pedido) {
  return new Promise((resolve, reject) => {
    if (Number(pedido.headers['content-length']) > LIMITE_DO_CORPO) {
      pedido.resume();
      reject(new ErroDoPedido(413, 'corpo maior que 4 KB'));
      return;
    }
    const pedacos = [];
    let tamanho = 0;
    pedido.on('data', (pedaco) => {
      tamanho += pedaco.length;
      if (tamanho <= LIMITE_DO_CORPO) pedacos.push(pedaco);
    });
    pedido.on('end', () => (tamanho > LIMITE_DO_CORPO ? reject(new ErroDoPedido(413, 'corpo maior que 4 KB')) : resolve(Buffer.concat(pedacos).toString('utf8'))));
    pedido.on('error', reject);
  });
}

/* ---------- as series ---------- */

function lerMenu() {
  delete require.cache[require.resolve(ARQUIVO_DO_MENU)];
  return require(ARQUIVO_DO_MENU);
}

function lerEstadoDasSeries() {
  return JSON.parse(fs.readFileSync(ARQUIVO_DO_ESTADO, 'utf8'));
}

function listarSeries() {
  const estado = lerEstadoDasSeries();
  return lerMenu().map((serie) => ({
    num: serie.num,
    nome: serie.nome,
    temPagina: Boolean(serie.href),
    ativa: Boolean(estado[serie.num] && estado[serie.num].ativa === true),
  }));
}

function lerJsonDoPedido(texto) {
  try {
    return JSON.parse(texto);
  } catch (erro) {
    throw new ErroDoPedido(400, 'o corpo nao e JSON valido');
  }
}

/* { "ativas": { "03": false } }: so serie da MENU e so booleano. Devolve o estado novo
   inteiro, montado a partir da MENU, nunca das chaves que vieram no pedido */
function validarPedido(texto, menu, estadoAtual) {
  const pedido = lerJsonDoPedido(texto);
  const ativas = pedido && pedido.ativas;
  if (!ativas || typeof ativas !== 'object' || Array.isArray(ativas)) throw new ErroDoPedido(400, 'falta o objeto "ativas"');
  const entradas = Object.entries(ativas);
  const numeros = menu.map((serie) => serie.num);
  if (!entradas.length) throw new ErroDoPedido(400, '"ativas" veio vazio');
  const desconhecida = entradas.find(([num]) => !numeros.includes(num));
  if (desconhecida) throw new ErroDoPedido(400, `serie que nao existe na MENU: ${desconhecida[0].slice(0, 20)}`);
  const naoBooleana = entradas.find(([, valor]) => typeof valor !== 'boolean');
  if (naoBooleana) throw new ErroDoPedido(400, `a serie ${naoBooleana[0]} tem que vir true ou false`);
  return montarEstadoNovo(numeros, estadoAtual, ativas);
}

function montarEstadoNovo(numeros, estadoAtual, ativas) {
  const novo = {};
  for (const num of numeros) {
    const veioNoPedido = Object.prototype.hasOwnProperty.call(ativas, num);
    novo[num] = { ativa: veioNoPedido ? ativas[num] : Boolean(estadoAtual[num] && estadoAtual[num].ativa === true) };
  }
  return novo;
}

/* ---------- gravar e gerar ---------- */

/* temporario e renomeia: o JSON nunca fica pela metade */
function gravarEstado(conteudo) {
  const temporario = `${ARQUIVO_DO_ESTADO}.${process.pid}.tmp`;
  fs.writeFileSync(temporario, conteudo);
  fs.renameSync(temporario, ARQUIVO_DO_ESTADO);
}

function rodarGerador() {
  return new Promise((resolve) => {
    execFile(process.execPath, [GERADOR], { cwd: RAIZ, timeout: PRAZO_DO_GERADOR, windowsHide: true }, (erro, saida, saidaDeErro) => {
      resolve({ ok: !erro, saida: `${saida || ''}${saidaDeErro || ''}` });
    });
  });
}

/* os arquivos que o gerador pode escrever: o menu.js e as paginas do site */
function arquivosQueOGeradorEscreve(pasta = SITE) {
  return fs.readdirSync(pasta, { withFileTypes: true }).flatMap((item) => {
    const caminho = path.join(pasta, item.name);
    if (item.isDirectory()) return arquivosQueOGeradorEscreve(caminho);
    return item.name.endsWith('.html') || caminho === ARQUIVO_DO_MENU ? [caminho] : [];
  });
}

function fotografarArquivos() {
  return new Map(arquivosQueOGeradorEscreve().map((arquivo) => [arquivo, crypto.createHash('sha256').update(fs.readFileSync(arquivo)).digest('hex')]));
}

function listarArquivosQueMudaram(antes) {
  return [...fotografarArquivos()]
    .filter(([arquivo, resumo]) => antes.get(arquivo) !== resumo)
    .map(([arquivo]) => path.relative(RAIZ, arquivo).split(path.sep).join('/'));
}

/* o comando vai ser colado num terminal: aspas simples, que o bash nao interpreta ($ e
   crase ficam texto), e a propria aspa simples vira '\'' (achado da revisao de 15/09) */
function entreAspasSimples(texto) {
  return `'${texto.replace(/'/g, "'\\''")}'`;
}

/* css e js antes de html, a regra do sobe-arquivos.sh */
function comandoDeSubir(mudaram) {
  if (!mudaram.length) return '';
  const ordenados = [...mudaram].sort((a, b) => Number(a.endsWith('.html')) - Number(b.endsWith('.html')));
  return `bash ${entreAspasSimples(SOBE_ARQUIVOS)} ${ordenados.map(entreAspasSimples).join(' ')}`;
}

function ultimasLinhas(texto) {
  return texto.trim().split(/\r?\n/).slice(-6).join(' | ');
}

/* grava, gera e, se o gerador recusar, devolve o JSON ao que era e gera de novo. A volta
   tambem e conferida: se o gerador recusar ate o estado antigo, a tela diz isso em vez de
   prometer que tudo voltou */
async function aplicarEstado(estadoNovo) {
  const anterior = fs.readFileSync(ARQUIVO_DO_ESTADO, 'utf8');
  const antes = fotografarArquivos();
  gravarEstado(JSON.stringify(estadoNovo, null, 2) + '\n');
  const geracao = await rodarGerador();
  if (!geracao.ok) {
    gravarEstado(anterior);
    const volta = await rodarGerador();
    const situacao = volta.ok
      ? 'o series.json e as paginas voltaram ao que eram'
      : 'ATENCAO: o series.json voltou, mas o gerador recusou tambem o estado antigo; rode o gera-cards.js no terminal e confira o site';
    throw new ErroDoPedido(500, `o gerador recusou (${situacao}): ${ultimasLinhas(geracao.saida)}`);
  }
  const mudaram = listarArquivosQueMudaram(antes);
  return { ok: true, series: listarSeries(), mudaram, comando: comandoDeSubir(mudaram) };
}

/* ---------- as rotas ---------- */

let gravando = false;

async function salvarSeries(pedido, resposta) {
  if (!origemAceita(pedido) || !tokenAceito(pedido)) return recusar(resposta, 403, 'pedido sem a origem ou sem o token do painel');
  /* a trava so liga com o corpo inteiro na mao: um pedido que manda o corpo devagar nao
     segura o painel (achado da revisao de 15/09) */
  const texto = await lerCorpo(pedido);
  if (gravando) return recusar(resposta, 409, 'ja tem uma gravacao em andamento');
  gravando = true;
  try {
    const estadoNovo = validarPedido(texto, lerMenu(), lerEstadoDasSeries());
    return responder(resposta, 200, await aplicarEstado(estadoNovo));
  } finally {
    gravando = false;
  }
}

async function atender(pedido, resposta) {
  if (!hostAceito(pedido)) return recusar(resposta, 403, 'o painel so atende em 127.0.0.1 e localhost');
  const caminho = new URL(pedido.url, `http://${HOST}`).pathname;
  const ehApi = caminho === '/api/series';
  if (pedido.method === 'GET' && caminho === '/') return servirPagina(resposta);
  /* o navegador pede o icone sozinho; sem conteudo, sem 404 no console */
  if (pedido.method === 'GET' && caminho === '/favicon.ico') return responderSemConteudo(resposta);
  if (pedido.method === 'GET' && ARQUIVOS_DA_PAGINA.has(caminho)) return servirArquivo(resposta, ARQUIVOS_DA_PAGINA.get(caminho));
  if (ehApi && pedido.method === 'GET') return responder(resposta, 200, { ok: true, series: listarSeries() });
  if (ehApi && pedido.method === 'POST') return salvarSeries(pedido, resposta);
  return recusar(resposta, ehApi ? 405 : 404, ehApi ? 'metodo nao aceito' : 'nao existe');
}

function tratarFalha(erro, resposta) {
  /* quem pediu desistiu no meio (fechou a aba, cortou a conexao): nao ha a quem responder,
     e nao e erro do painel pra sujar o terminal */
  if (resposta.headersSent || (erro && erro.code === 'ECONNRESET')) return;
  if (erro instanceof ErroDoPedido) return recusar(resposta, erro.status, erro.message);
  console.error(erro);
  return recusar(resposta, 500, 'erro interno do painel (o detalhe esta no terminal)');
}

function iniciar() {
  const servidor = http.createServer((pedido, resposta) => {
    atender(pedido, resposta).catch((erro) => tratarFalha(erro, resposta));
  });
  servidor.listen(PORTA, HOST, () => console.log(`painel das séries em http://${HOST}:${PORTA}/  (Ctrl+C fecha)`));
}

iniciar();

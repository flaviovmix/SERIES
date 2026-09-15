/* qa-painel-series
   Prova o painel local das series (subetapa 6.10 da Etapa 6). Sobe o painel/servidor.js
   numa porta de teste e confere, direto por HTTP e depois no navegador:
     - a pagina abre com o token e a politica de seguranca
     - recusados: sem token, token errado, Origin estranha, sem Origin, Host estranho
       (no POST e no GET), serie inventada, "__proto__", valor que nao e booleano, JSON
       quebrado, corpo gigante, metodo errado e caminho fora da lista; e nenhuma recusa
       mexe em arquivo
     - o pedido certo passa: desligar a serie 03 muda o series.json, roda o gerador, tira
       a serie do menu.js e da home, e o painel lista os arquivos e o comando de subir;
       religar volta tudo byte a byte
     - a pagina no navegador: 6 chaves com rotulo, a chave responde ao teclado, salvar
       sem mudar nada avisa "Pronto", e nada rola de lado no telefone
     - nada responde num endereco da rede da maquina, so em 127.0.0.1
   O series.json, o menu.js e a index.html voltam ao que eram no fim, de qualquer jeito.

   uso: node qa-painel-series.js */

const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const PLAYWRIGHT = 'C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright';
const RAIZ = path.resolve(__dirname, '..', '..', '..');
const SERVIDOR = path.join(RAIZ, 'painel', 'servidor.js');
const PORTA = 8797;
const ORIGEM = `http://127.0.0.1:${PORTA}`;
const [ESTADO, MENU_JS, HOME] = ['site/dados/series.json', 'site/js/menu.js', 'site/index.html'].map((arquivo) => path.join(RAIZ, arquivo));

let falhas = 0;
function anota(ok, texto) {
  if (!ok) falhas++;
  console.log(`${ok ? 'OK ' : 'XX '} ${texto}`);
}

/* ---------- o painel e os pedidos ---------- */

function subirPainel() {
  return new Promise((resolve, reject) => {
    const painel = spawn(process.execPath, [SERVIDOR], { cwd: RAIZ, env: { ...process.env, PAINEL_PORTA: String(PORTA) }, windowsHide: true });
    const prazo = setTimeout(() => reject(new Error('o painel nao subiu em 10 s')), 10000);
    painel.stdout.on('data', (pedaco) => {
      if (String(pedaco).includes('painel das séries em')) {
        clearTimeout(prazo);
        resolve(painel);
      }
    });
    painel.stderr.on('data', (pedaco) => process.stderr.write(pedaco));
    painel.on('exit', (codigo) => { clearTimeout(prazo); reject(new Error(`o painel saiu com ${codigo}`)); });
  });
}

function pedir({ metodo = 'GET', caminho = '/api/series', endereco = '127.0.0.1', host = `127.0.0.1:${PORTA}`, cabecalhos = {}, corpo = null }) {
  return new Promise((resolve) => {
    const doCorpo = corpo === null ? {} : { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(corpo) };
    const pedido = http.request({ host: endereco, port: PORTA, method: metodo, path: caminho, timeout: 5000, headers: { Host: host, ...cabecalhos, ...doCorpo } }, (resposta) => {
      let texto = '';
      resposta.on('data', (pedaco) => { texto += pedaco; });
      resposta.on('end', () => resolve({ status: resposta.statusCode, texto, cabecalhos: resposta.headers }));
    });
    pedido.on('timeout', () => pedido.destroy(new Error('sem resposta')));
    pedido.on('error', (erro) => resolve({ status: 0, erro: erro.code || erro.message }));
    if (corpo !== null) pedido.write(corpo);
    pedido.end();
  });
}

function linhaDasSeriesAtivas() {
  return (fs.readFileSync(MENU_JS, 'utf8').match(/var SERIES_ATIVAS = \[[^\]]*\];/) || [''])[0];
}

/* ---------- as provas ---------- */

function casosDeRecusa(token) {
  const certo = { Origin: ORIGEM, 'X-Token-Do-Painel': token };
  const corpoCerto = JSON.stringify({ ativas: { '03': true } });
  return [
    { nome: 'sem token', espera: 403, pedido: { metodo: 'POST', cabecalhos: { Origin: ORIGEM }, corpo: corpoCerto } },
    { nome: 'token errado', espera: 403, pedido: { metodo: 'POST', cabecalhos: { Origin: ORIGEM, 'X-Token-Do-Painel': 'f'.repeat(64) }, corpo: corpoCerto } },
    { nome: 'Origin estranha', espera: 403, pedido: { metodo: 'POST', cabecalhos: { ...certo, Origin: 'http://site-qualquer.example' }, corpo: corpoCerto } },
    { nome: 'sem Origin', espera: 403, pedido: { metodo: 'POST', cabecalhos: { 'X-Token-Do-Painel': token }, corpo: corpoCerto } },
    { nome: 'Host estranho no POST (DNS rebinding)', espera: 403, pedido: { metodo: 'POST', host: `site-qualquer.example:${PORTA}`, cabecalhos: certo, corpo: corpoCerto } },
    { nome: 'Host estranho no GET', espera: 403, pedido: { host: `site-qualquer.example:${PORTA}` } },
    { nome: 'série inventada', espera: 400, pedido: { metodo: 'POST', cabecalhos: certo, corpo: JSON.stringify({ ativas: { '99': false } }) } },
    { nome: 'série "__proto__"', espera: 400, pedido: { metodo: 'POST', cabecalhos: certo, corpo: '{"ativas":{"__proto__":false}}' } },
    { nome: 'valor que não é booleano', espera: 400, pedido: { metodo: 'POST', cabecalhos: certo, corpo: JSON.stringify({ ativas: { '03': 'false' } }) } },
    { nome: 'JSON quebrado', espera: 400, pedido: { metodo: 'POST', cabecalhos: certo, corpo: '{"ativas":' } },
    { nome: 'corpo gigante', espera: 413, pedido: { metodo: 'POST', cabecalhos: certo, corpo: JSON.stringify({ ativas: { '03': true }, lixo: 'x'.repeat(10000) }) } },
    { nome: 'método errado', espera: 405, pedido: { metodo: 'DELETE', cabecalhos: certo } },
    { nome: 'caminho fora da lista', espera: 404, pedido: { caminho: '/../site/dados/series.json' } },
  ];
}

async function provarRecusas(token) {
  const antes = [ESTADO, MENU_JS, HOME].map((arquivo) => fs.readFileSync(arquivo));
  for (const caso of casosDeRecusa(token)) {
    const resposta = await pedir(caso.pedido);
    anota(resposta.status === caso.espera, `recusa ${caso.nome}: ${resposta.status} (esperado ${caso.espera})${resposta.texto ? ' ' + resposta.texto : ''}`);
  }
  const intactos = [ESTADO, MENU_JS, HOME].every((arquivo, i) => fs.readFileSync(arquivo).equals(antes[i]));
  anota(intactos, 'nenhuma recusa mexeu no series.json, no menu.js ou na index.html');
}

async function mudarSerie03(token, ativa) {
  const resposta = await pedir({ metodo: 'POST', cabecalhos: { Origin: ORIGEM, 'X-Token-Do-Painel': token }, corpo: JSON.stringify({ ativas: { '03': ativa } }) });
  const dados = resposta.status === 200 ? JSON.parse(resposta.texto) : { mudaram: [], comando: '' };
  return {
    status: resposta.status,
    noJson: JSON.parse(fs.readFileSync(ESTADO, 'utf8'))['03'].ativa,
    noMenu: linhaDasSeriesAtivas().includes("'03'"),
    naHome: fs.readFileSync(HOME, 'utf8').includes('<h3>Hardware</h3>'),
    listou: dados.mudaram.includes('site/js/menu.js') && dados.mudaram.includes('site/index.html') && dados.comando.startsWith("bash '") && dados.comando.includes("'site/js/menu.js'"),
  };
}

async function provarCaminhoCerto(token, originais) {
  const desligou = await mudarSerie03(token, false);
  anota(desligou.status === 200 && desligou.noJson === false && !desligou.noMenu && !desligou.naHome && desligou.listou,
    `desligar a 03 pelo painel: ${desligou.status}, json ${desligou.noJson}, no menu.js ${desligou.noMenu}, na home ${desligou.naHome}, listou arquivos e comando ${desligou.listou}`);
  const religou = await mudarSerie03(token, true);
  const igual = originais.every(({ arquivo, conteudo }) => fs.readFileSync(arquivo).equals(conteudo));
  anota(religou.status === 200 && religou.noJson === true && religou.noMenu && religou.naHome && religou.listou && igual,
    `religar a 03 pelo painel: ${religou.status}, json ${religou.noJson}, no menu.js ${religou.noMenu}, na home ${religou.naHome}, arquivos byte a byte como antes ${igual}`);
}

/* um pedido com token que promete 100 bytes e manda 10 nao pode segurar a trava de
   gravacao: o pedido certo, logo depois, tem que passar */
async function provarCorpoLentoNaoTrava(token) {
  const lento = http.request({
    host: '127.0.0.1', port: PORTA, method: 'POST', path: '/api/series',
    headers: { Host: `127.0.0.1:${PORTA}`, Origin: ORIGEM, 'X-Token-Do-Painel': token, 'Content-Type': 'application/json', 'Content-Length': 100 },
  });
  lento.on('error', () => {});
  lento.write('{"ativas":');
  await new Promise((pronto) => setTimeout(pronto, 300));
  const certo = await pedir({ metodo: 'POST', cabecalhos: { Origin: ORIGEM, 'X-Token-Do-Painel': token }, corpo: JSON.stringify({ ativas: { '03': true } }) });
  lento.destroy();
  anota(certo.status === 200, `um corpo lento de outro pedido não trava o painel: o pedido certo recebeu ${certo.status}`);
}

async function conferirPaginaNoTamanho(navegador, largura, altura) {
  const pagina = await navegador.newPage({ viewport: { width: largura, height: altura } });
  const erros = [];
  pagina.on('console', (mensagem) => { if (mensagem.type() === 'error') erros.push(mensagem.text()); });
  pagina.on('response', (resposta) => { if (resposta.status() >= 400) erros.push(`${resposta.status()} em ${resposta.url()}`); });
  await pagina.goto(`${ORIGEM}/`, { waitUntil: 'load' });
  await pagina.waitForSelector('.serie__chave');
  const primeira = pagina.locator('.serie__chave').first();
  await primeira.focus();
  const antes = await primeira.isChecked();
  await pagina.keyboard.press('Space');
  const teclado = (await primeira.isChecked()) !== antes;
  await pagina.keyboard.press('Space');
  const medida = await pagina.evaluate(() => ({
    chaves: document.querySelectorAll('.serie__chave[role="switch"]').length,
    comRotulo: [...document.querySelectorAll('.serie__chave')].every((chave) => chave.closest('label').textContent.trim().length > 3),
    rola: document.documentElement.scrollWidth > innerWidth,
  }));
  await pagina.click('.series__salvar');
  await pagina.waitForFunction(() => ['ok', 'erro'].includes(document.getElementById('aviso').dataset.tipo), null, { timeout: 60000 });
  const aviso = await pagina.textContent('#aviso');
  await pagina.close();
  anota(medida.chaves === 6 && medida.comRotulo && teclado && !medida.rola && /^Pronto/.test(aviso) && !erros.length,
    `página em ${largura}px: ${medida.chaves} chaves com rótulo ${medida.comRotulo}, teclado ${teclado}, sem rolar de lado ${!medida.rola}, salvar sem mudar nada: "${aviso}"${erros.length ? ', ERROS: ' + erros.join(' | ') : ''}`);
}

async function provarPaginaNoNavegador() {
  const { chromium } = require(PLAYWRIGHT);
  const navegador = await chromium.launch({ channel: 'msedge', timeout: 30000 });
  try {
    await conferirPaginaNoTamanho(navegador, 1280, 800);
    await conferirPaginaNoTamanho(navegador, 384, 686);
  } finally {
    await navegador.close();
  }
}

async function provarSoLocal() {
  const enderecos = Object.values(os.networkInterfaces()).flat().filter((i) => i && i.family === 'IPv4' && !i.internal).map((i) => i.address);
  if (!enderecos.length) anota(true, 'a máquina não tem endereço de rede: nada a testar fora do 127.0.0.1');
  for (const endereco of enderecos) {
    const resposta = await pedir({ endereco, host: `${endereco}:${PORTA}` });
    anota(resposta.status === 0, `nada responde em ${endereco}:${PORTA} (${resposta.erro || resposta.status})`);
  }
}

async function provarTudo(originais) {
  const pagina = await pedir({ caminho: '/' });
  const token = (pagina.texto.match(/name="token-do-painel" content="([0-9a-f]{64})"/) || [])[1];
  const politica = pagina.cabecalhos && pagina.cabecalhos['content-security-policy'] || '';
  anota(pagina.status === 200 && Boolean(token) && politica.includes("default-src 'none'"), `a página abre com o token e a política de segurança (${pagina.status})`);
  if (!token) return;
  await provarRecusas(token);
  await provarCorpoLentoNaoTrava(token);
  await provarCaminhoCerto(token, originais);
  await provarPaginaNoNavegador();
  await provarSoLocal();
}

async function principal() {
  const originais = [ESTADO, MENU_JS, HOME].map((arquivo) => ({ arquivo, conteudo: fs.readFileSync(arquivo) }));
  let painel = null;
  try {
    painel = await subirPainel();
    await provarTudo(originais);
  } finally {
    if (painel) painel.kill();
    originais.forEach(({ arquivo, conteudo }) => fs.writeFileSync(arquivo, conteudo));
  }
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
  process.exitCode = falhas ? 1 : 0;
}

principal().catch((erro) => { console.error(erro); process.exitCode = 1; });

/* qa-gera-cards
   Prova que a D4 do plano do SEIRES (o card nao se escreve a mao) se segura sozinha.
   Roda numa COPIA do site/ e do gerador na pasta temporaria, sem tocar no site de
   verdade, e apaga a copia no fim:
     1. uma etapa nova, posta so na MENU e no cards.js, aparece no hub com lupa, legenda
        e botao derivado depois de rodar o gerador
     2. um card editado a mao na pagina faz o --confere sair com 1
     3. o gerador recusa dado que contradiz a MENU (card sem item, selo "no ar" pra extra
        sem link, contagem no dado pra etapa que ja deriva a contagem) e nao escreve nada
   Sem navegador e sem "ar": e a regra do gerador que esta sendo provada, nao a pagina.

   uso: node qa-gera-cards.js */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const RAIZ = path.resolve(__dirname, '..', '..', '..');
const PASTA_DOS_SCRIPTS = path.relative(RAIZ, __dirname);

const ULTIMA_ETAPA_DO_HARDWARE = "{ num: '05', nome: 'A placa própria' }";
const ETAPA_DE_TESTE = "{ num: '06', nome: 'Etapa de teste', href: 'etapas/hardware-06.html', episodios: [{ num: '01', nome: 'Ep A', href: 'a.html' }, { num: '02', nome: 'Ep B', href: 'b.html' }] }";
const CARD_DE_TESTE = "module.exports['hardware/etapas'].cards['06'] = { imagem: 'img/hardware-etapa-01.webp', descricao: 'uma foto de teste', credito: 'foto: Fulano, CC0', periodo: 'teste', frase: 'teste', resumo: 'teste' };";

const RECUSAS = [
  { nome: 'card sem item na MENU', linha: "module.exports['hardware/etapas'].cards['99'] = { periodo: 'x', frase: 'x', resumo: 'x' };", mensagem: 'sem item na MENU' },
  { nome: 'selo "no ar" pra extra sem link', linha: "module.exports['extras/todos'].cards['11'].selo = 'no ar';", mensagem: 'nao tem link' },
  { nome: 'contagem no dado de etapa que já deriva', linha: "module.exports['computador/etapas'].cards['06'].contagem = '9 episódios';", mensagem: 'a MENU ja diz' },
];

let falhas = 0;
function anota(ok, texto) {
  if (!ok) falhas++;
  console.log(`${ok ? 'OK ' : 'XX '} ${texto}`);
}

/* ---------- a copia ---------- */

function montarCopia() {
  const copia = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-gera-cards-'));
  fs.cpSync(path.join(RAIZ, 'site'), path.join(copia, 'site'), { recursive: true });
  fs.cpSync(path.join(__dirname, 'gera-cards'), path.join(copia, PASTA_DOS_SCRIPTS, 'gera-cards'), { recursive: true });
  return copia;
}

function ler(copia, arquivo) {
  return fs.readFileSync(path.join(copia, arquivo), 'utf8');
}

function escrever(copia, arquivo, texto) {
  fs.writeFileSync(path.join(copia, arquivo), texto);
}

/* o gerador da copia, num processo proprio: caminho fixo, argumento fixo, sem shell */
function rodarGerador(copia, ...argumentos) {
  const gerador = path.join(copia, PASTA_DOS_SCRIPTS, 'gera-cards', 'gera-cards.js');
  try {
    const saida = execFileSync(process.execPath, [gerador, ...argumentos], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { codigo: 0, saida };
  } catch (erro) {
    return { codigo: erro.status, saida: `${erro.stdout || ''}${erro.stderr || ''}` };
  }
}

/* ---------- as provas ---------- */

function provarEtapaNova(copia) {
  const menu = ler(copia, 'site/js/menu.js');
  if (!menu.includes(ULTIMA_ETAPA_DO_HARDWARE)) {
    anota(false, 'etapa nova: a MENU mudou e o teste não achou a última etapa do Hardware pra acrescentar a de teste');
    return;
  }
  escrever(copia, 'site/js/menu.js', menu.replace(ULTIMA_ETAPA_DO_HARDWARE, `${ULTIMA_ETAPA_DO_HARDWARE},\n        ${ETAPA_DE_TESTE}`));
  escrever(copia, 'site/dados/cards.js', `${ler(copia, 'site/dados/cards.js')}\n${CARD_DE_TESTE}\n`);
  const rodada = rodarGerador(copia);
  const hub = ler(copia, 'site/hardware.html');
  const cards = (hub.match(/<article class="cap">/g) || []).length;
  const comLupa = hub.includes('data-legenda="Etapa 06 · Etapa de teste · uma foto de teste · foto: Fulano, CC0"');
  const botao = hub.includes('<span class="cap__eps">2 episódios</span>') && hub.includes('href="etapas/hardware-06.html" aria-label="Ver os episódios da etapa Etapa de teste">Ver episódios');
  anota(rodada.codigo === 0 && cards === 6 && comLupa && botao,
    `etapa nova só na MENU e no cards.js: gerador saiu com ${rodada.codigo}, ${cards} cards no hub, lupa com legenda ${comLupa}, contagem e botão derivados ${botao}`);
}

function provarEdicaoAMao(copia) {
  const pagina = ler(copia, 'site/computador.html');
  escrever(copia, 'site/computador.html', pagina.replace('O número, o dedo e o céu.', 'Editado à mão.'));
  const rodada = rodarGerador(copia, '--confere');
  const apontou = /DIFERENTES[\s\S]*computador\.html/.test(rodada.saida);
  anota(rodada.codigo === 1 && apontou, `card editado à mão: --confere saiu com ${rodada.codigo} e apontou o computador.html ${apontou}`);
  escrever(copia, 'site/computador.html', pagina);
}

function provarRecusa(copia, recusa) {
  const dado = ler(copia, 'site/dados/cards.js');
  const paginaAntes = ler(copia, 'site/computador.html');
  escrever(copia, 'site/dados/cards.js', `${dado}\n${recusa.linha}\n`);
  const rodada = rodarGerador(copia);
  const nadaEscrito = ler(copia, 'site/computador.html') === paginaAntes;
  escrever(copia, 'site/dados/cards.js', dado);
  const mensagemCerta = rodada.saida.includes(recusa.mensagem);
  anota(rodada.codigo === 1 && mensagemCerta && nadaEscrito,
    `recusa ${recusa.nome}: saiu com ${rodada.codigo}, mensagem certa ${mensagemCerta}, nada escrito ${nadaEscrito}`);
}

function principal() {
  const copia = montarCopia();
  try {
    provarEtapaNova(copia);
    provarEdicaoAMao(copia);
    RECUSAS.forEach((recusa) => provarRecusa(copia, recusa));
  } finally {
    fs.rmSync(copia, { recursive: true, force: true });
  }
  console.log(falhas ? `FALHAS: ${falhas}` : 'tudo OK');
  process.exitCode = falhas ? 1 : 0;
}

principal();

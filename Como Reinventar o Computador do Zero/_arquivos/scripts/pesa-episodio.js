// Pesa uma animacao: soma o que a pagina carrega (html, css, js, imagens) e
// compara com o orcamento escrito na Etapa 2 do plano. O audio fica de fora:
// ele e transmitido, nao carregado.
//
//   node pesa-episodio.js "<pasta do episodio>"
//
// Sai com codigo 1 quando algum teto estoura, pra servir de teste.

const fs = require('fs');
const path = require('path');

// o orcamento (Etapa 2, 30/08/2026), em bytes
const TETO = {
  pagina: 300 * 1024,      // html + css + js, tudo somado
  imagem: 400 * 1024,      // a maior imagem sozinha
  imagens: 3 * 1024 * 1024, // todas as imagens do episodio
};

const pasta = process.argv[2];
if (!pasta) {
  console.error('uso: node pesa-episodio.js "<pasta do episodio>"');
  process.exit(2);
}
const html = path.join(pasta, 'animacao.html');
const fonte = fs.readFileSync(html, 'utf8');

// todo src/href/data-src local (nao http, nao data:), resolvido a partir da pasta
function arquivosReferenciados() {
  const achados = new Set();
  const re = /(?:src|href|data-src)="([^"]+)"/g;
  let m;
  while ((m = re.exec(fonte))) {
    const alvo = m[1];
    if (/^(https?:|data:|#)/.test(alvo)) continue;
    achados.add(path.resolve(pasta, decodeURIComponent(alvo)));
  }
  return [...achados];
}

function tamanho(arquivo) {
  try { return fs.statSync(arquivo).size; } catch (e) { return -1; }
}

function kb(bytes) { return (bytes / 1024).toFixed(0) + ' KB'; }

const grupos = { pagina: [html], imagens: [], audio: [], outros: [], faltando: [] };
for (const arquivo of arquivosReferenciados()) {
  const ext = path.extname(arquivo).toLowerCase();
  if (tamanho(arquivo) < 0) grupos.faltando.push(arquivo);
  else if (['.css', '.js'].includes(ext)) grupos.pagina.push(arquivo);
  else if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) grupos.imagens.push(arquivo);
  else if (['.mp3', '.mp4', '.ogg'].includes(ext)) grupos.audio.push(arquivo);
  else grupos.outros.push(arquivo);
}

const soma = (lista) => lista.reduce((s, a) => s + tamanho(a), 0);
const pesoPagina = soma(grupos.pagina);
const pesoImagens = soma(grupos.imagens);
const maior = grupos.imagens.map((a) => ({ a, n: tamanho(a) })).sort((x, y) => y.n - x.n)[0];

console.log('pagina (html+css+js):', kb(pesoPagina), 'em', grupos.pagina.length, 'arquivos', pesoPagina > TETO.pagina ? '  <-- ESTOUROU o teto de ' + kb(TETO.pagina) : '');
console.log('imagens:', kb(pesoImagens), 'em', grupos.imagens.length, 'arquivos', pesoImagens > TETO.imagens ? '  <-- ESTOUROU o teto de ' + kb(TETO.imagens) : '');
if (maior) console.log('maior imagem:', kb(maior.n), path.basename(maior.a), maior.n > TETO.imagem ? '  <-- ESTOUROU o teto de ' + kb(TETO.imagem) : '');
if (grupos.audio.length) console.log('audio (fora do orcamento):', kb(soma(grupos.audio)));
if (grupos.outros.length) console.log('outros:', grupos.outros.map((a) => path.basename(a)).join(', '));
if (grupos.faltando.length) console.log('FALTANDO:', grupos.faltando.join(', '));

const estourou = pesoPagina > TETO.pagina || pesoImagens > TETO.imagens || (maior && maior.n > TETO.imagem) || grupos.faltando.length;
process.exit(estourou ? 1 : 0);

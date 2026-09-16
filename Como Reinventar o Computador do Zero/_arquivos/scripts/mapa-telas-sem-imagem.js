// Varre TODAS as animacoes do SEIRES e diz quais telas estao so de texto.
//
// Triagem estatica, de proposito: le o HTML e olha cada <section class="step">,
// sem abrir browser. Nao pega imagem posta por JS nem visibilidade — pra isso
// existe o qa-pagina.js, que roda de verdade. Serve pra medir o tamanho da
// divida de uma vez, depois que o gate novo achou 5 telas so de texto no
// primeiro episodio testado.
const fs = require('fs');
const path = require('path');

// a raiz do SEIRES sai da posicao deste script (<serie>/_arquivos/scripts/), pra
// ele funcionar em qualquer maquina
const RAIZ = process.argv[2] || path.resolve(__dirname, '..', '..', '..');
const PULAR = ['_arquivos', 'node_modules', '.git', 'plano', 'modelos'];

function acha(dir, achados = []) {
  for (const nome of fs.readdirSync(dir)) {
    if (PULAR.includes(nome)) continue;
    const cheio = path.join(dir, nome);
    let st;
    try { st = fs.statSync(cheio); } catch { continue; }
    if (st.isDirectory()) acha(cheio, achados);
    else if (nome === 'animacao.html') achados.push(cheio);
  }
  return achados;
}

// corta o HTML em telas pelo <section class="step...">
function telasDe(html) {
  const partes = html.split(/<section class="step/).slice(1);
  return partes.map((p) => p.split('</section>')[0]);
}

// o data-imagem="desenho" e a saida pra tela cujo desenho e feito so com html e
// css: sem ele o numero abaixo conta como falta o que e desenho de verdade
const TEM_IMAGEM = /<img\s|<svg\s|<canvas\s|class="[^"]*\bpainel\b|class="[^"]*\bpratica\b|data-imagem="desenho"/;

const arquivos = acha(RAIZ);
let episodiosComFalha = 0;
let telasSemImagem = 0;

for (const arquivo of arquivos) {
  const html = fs.readFileSync(arquivo, 'utf8');
  const telas = telasDe(html);
  if (!telas.length) continue;
  const ruins = [];
  telas.forEach((t, i) => { if (!TEM_IMAGEM.test(t)) ruins.push(i + 1); });
  if (!ruins.length) continue;
  episodiosComFalha++;
  telasSemImagem += ruins.length;
  const curto = arquivo.replace(RAIZ + path.sep, '').replace(path.sep + 'animacao.html', '');
  console.log(`${ruins.length} de ${telas.length} telas sem imagem  ·  ${curto}`);
  console.log(`    telas: ${ruins.join(', ')}`);
}

console.log(`\n${arquivos.length} animacoes varridas`);
console.log(`${episodiosComFalha} episodio(s) com tela so de texto, ${telasSemImagem} tela(s) no total`);

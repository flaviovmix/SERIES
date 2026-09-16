// Confere as plantas de tela dos episodios.
//
// Existe porque a quantidade de telas virou copia duas vezes. Ate 23/08/2026
// todo episodio saia com 8 telas, porque o roteiro era escrito olhando o
// anterior; a _planta.md nasceu pra quebrar isso. Em 16/09 o Flavio olhou o
// acervo e o vicio tinha voltado com outro numero: 13 episodios com 12 telas, e
// tres justificativas terminavam em "o mesmo molde das etapas 8 a 10".
//
// A regra dele: cada episodio tem a quantidade de telas que PRECISA, e a
// justificativa fala do conteudo dele, nunca de outra pagina.
//
// uso: node confere-plantas.js [raiz]
const fs = require('fs');
const path = require('path');

const RAIZ = process.argv[2] || path.resolve(__dirname, '..', '..', '..');
const PULAR = ['_arquivos', 'node_modules', '.git', 'OLD', 'plano', 'modelos'];

// a frase que denuncia comparacao com outro episodio
const COMPARA = [
  /o mesmo molde/i,
  /(igual|iguais) (a|as|ao|aos) (outr|etap|serie|episodi)/i,
  /(como|que nem) (as|os|o|a) (outr|demais|etap)/i,
  /mesm[oa] (numero|quantidade|conta) (de|das|dos)? ?(telas)? ?(das|dos|de) (outr|etap|serie)/i,
  /(padrao|de praxe|de sempre|de costume) (da|das|dos|do) (serie|etap|outr)/i,
];

function acha(dir, achados = []) {
  for (const nome of fs.readdirSync(dir)) {
    if (PULAR.includes(nome)) continue;
    const cheio = path.join(dir, nome);
    let st;
    try { st = fs.statSync(cheio); } catch { continue; }
    if (st.isDirectory()) acha(cheio, achados);
    else if (nome === '_planta.md') achados.push(cheio);
  }
  return achados;
}

const plantas = acha(RAIZ);
let falhas = 0;
const semTotal = [];

for (const arquivo of plantas) {
  const texto = fs.readFileSync(arquivo, 'utf8');
  const curto = arquivo.replace(RAIZ + path.sep, '').replace(path.sep + '_planta.md', '');
  const linha = (texto.split(/\r?\n/).find((l) => /^\*\*Total:/i.test(l)) || '').trim();

  if (!linha) { semTotal.push(curto); continue; }

  const copiada = COMPARA.find((re) => re.test(linha));
  if (copiada) {
    falhas++;
    console.log(`FALHOU  ${curto}`);
    console.log(`        a justificativa se apoia em outro episodio: ${linha.match(copiada)[0]}`);
  }
}

if (semTotal.length) {
  console.log(`\n${semTotal.length} planta(s) sem a linha "**Total: N telas**" (o molde pede):`);
  for (const p of semTotal) console.log(`  ${p}`);
}

console.log(`\n${plantas.length} planta(s) conferida(s)`);
console.log(falhas ? `${falhas} justificativa(s) copiada(s) de outro episodio` : 'nenhuma justificativa se apoia em outro episodio');
process.exit(falhas ? 1 : 0);

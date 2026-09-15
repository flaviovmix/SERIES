/* gera-cards
   Escreve as grades de cards do site/ a partir da MENU (site/js/menu.js) e do
   site/dados/cards.js, so no trecho marcado de cada pagina (D4 do plano do SEIRES).
   O resto da pagina continua escrito a mao.

   uso (na raiz do SEIRES):
     node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js"
         escreve as grades nas paginas
     node ".../gera-cards.js" --confere
         nao escreve nada. Sai com 1 se alguma grade esta diferente do que o dado gera, se
         uma pagina tem marcador sem dado, ou se pagina com arte que amplia nao carrega o
         lightbox. E a condicao de deploy (D4).

   Pagina com card e sem marcador aparece como "pendente": a migracao ainda nao chegou
   nela. Lista, mas nao reprova. As pecas: arvore.js (le a MENU), grades.js (junta com o
   dado e confere), molde.js (o HTML do card) e trecho.js (os marcadores). */

const fs = require('fs');
const path = require('path');
const { PASTA_DO_SITE, montarTodasAsGrades } = require('./grades.js');
const { marcadoresDaPagina, trocarTrecho } = require('./trecho.js');

function listarPaginas(pasta = PASTA_DO_SITE) {
  return fs.readdirSync(pasta, { withFileTypes: true }).flatMap((item) => {
    const caminho = path.join(pasta, item.name);
    if (item.isDirectory()) return listarPaginas(caminho);
    return item.name.endsWith('.html') ? [path.relative(PASTA_DO_SITE, caminho).split(path.sep).join('/')] : [];
  });
}

function gradesPorPagina(grades) {
  const porPagina = new Map();
  grades.forEach((grade) => porPagina.set(grade.pagina, [...(porPagina.get(grade.pagina) || []), grade]));
  return porPagina;
}

/* a pagina como ela fica com as grades do dado, e as grades cujo marcador ela nao tem */
function paginaGerada(html, grades) {
  let resultado = html;
  const semMarcador = [];
  for (const grade of grades) {
    const trocada = trocarTrecho(resultado, grade.marcador, grade.linhas);
    if (trocada === null) semMarcador.push(grade.marcador);
    else resultado = trocada;
  }
  return { html: resultado, semMarcador };
}

function faltaLightbox(html) {
  return html.includes('data-abre="foto"') && !(html.includes('animacao/lightbox.css') && html.includes('animacao/lightbox.js'));
}

function examinarPagina(pagina, grades, querEscrever, relatorio) {
  const arquivo = path.join(PASTA_DO_SITE, pagina);
  const html = fs.readFileSync(arquivo, 'utf8');
  const conhecidos = grades.map((grade) => grade.marcador);
  marcadoresDaPagina(html).filter((m) => !conhecidos.includes(m)).forEach((m) => relatorio.marcadorSemDado.push(`${pagina}: ${m}`));
  const gerada = paginaGerada(html, grades);
  gerada.semMarcador.forEach((m) => relatorio.pendentes.push(`${pagina}: falta o marcador ${m}`));
  if (!conhecidos.length && html.includes('class="cap"')) relatorio.pendentes.push(`${pagina}: cards escritos à mão`);
  if (faltaLightbox(gerada.html)) relatorio.semLightbox.push(pagina);
  if (gerada.html === html) return;
  if (!querEscrever) { relatorio.diferentes.push(pagina); return; }
  fs.writeFileSync(arquivo, gerada.html);
  relatorio.escritas.push(pagina);
}

function examinarSite(grades, querEscrever) {
  const relatorio = { diferentes: [], escritas: [], pendentes: [], marcadorSemDado: [], semLightbox: [] };
  const porPagina = gradesPorPagina(grades);
  for (const pagina of listarPaginas()) examinarPagina(pagina, porPagina.get(pagina) || [], querEscrever, relatorio);
  return relatorio;
}

/* na home nenhuma foto amplia (decisao 9): la falta de credito nao tira lupa de ninguem */
function semLupaPorFaltaDeCredito(grades) {
  return grades.filter((grade) => grade.tipo !== 'series').flatMap((grade) => grade.cards
    .filter((card) => card.imagem && !card.legenda && !card.linkDaArte)
    .map((card) => `${grade.pagina} · ${card.titulo} (${card.imagem})`));
}

function imprimirBloco(titulo, itens) {
  if (itens.length) console.log(`${titulo} (${itens.length}):\n  ${itens.join('\n  ')}`);
}

function imprimir(relatorio, querEscrever, grades) {
  imprimirBloco(querEscrever ? 'escritas' : 'DIFERENTES do que o dado gera', querEscrever ? relatorio.escritas : relatorio.diferentes);
  imprimirBloco('MARCADOR SEM DADO no cards.js', relatorio.marcadorSemDado);
  imprimirBloco('ARTE QUE AMPLIA E A PAGINA NAO CARREGA O LIGHTBOX', relatorio.semLightbox);
  imprimirBloco('pendentes (a migração ainda não chegou)', relatorio.pendentes);
  imprimirBloco('sem lupa por falta de crédito (P10)', semLupaPorFaltaDeCredito(grades));
}

function principal() {
  const querEscrever = !process.argv.includes('--confere');
  let grades;
  try {
    grades = montarTodasAsGrades();
  } catch (erro) {
    console.error(`PAROU, nada foi escrito: ${erro.message}`);
    process.exitCode = 1;
    return;
  }
  const relatorio = examinarSite(grades, querEscrever);
  imprimir(relatorio, querEscrever, grades);
  const reprova = relatorio.marcadorSemDado.length || relatorio.semLightbox.length || relatorio.diferentes.length;
  console.log(reprova ? 'REPROVADO' : querEscrever ? `ok: ${grades.length} grades` : 'confere: as grades estão iguais ao dado');
  process.exitCode = reprova ? 1 : 0;
}

principal();

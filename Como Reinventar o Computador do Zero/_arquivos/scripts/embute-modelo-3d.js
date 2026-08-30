// Embute um modelo 3D da pasta modelos-3d dentro de um animacao.html.
//
// O modelo mora em _arquivos\modelos-3d\<maquina>.html e depende de dois arquivos
// vizinhos (_base-modelo-3d.css e _base-modelo-3d.js). Dentro de um iframe data:
// nao existe pasta vizinha, entao este script primeiro costura tudo num HTML unico
// e so depois converte pra base64 e troca o token no animacao.
//
// Uso: node embute-modelo-3d.js <animacao.html> <TOKEN> <modelos-3d/maquina.html>
// Ex.: node embute-modelo-3d.js animacao-flow.html __MODELO3D__ ../../_arquivos/modelos-3d/garrafa-de-leiden.html
//
// Sem o animacao.html (so os dois ultimos argumentos invertidos) da pra usar o modo
// --so-monta pra escrever o HTML autocontido num arquivo e abrir no navegador:
//   node embute-modelo-3d.js --so-monta <modelo.html> <saida.html>
const fs = require('fs');
const path = require('path');

// Costura o modelo + a base num HTML unico, sem nenhuma referencia relativa.
// O three.js continua vindo do CDN pelo importmap (o modelo precisa de internet).
function montaAutocontido(modeloPath) {
    const dir = path.dirname(modeloPath);
    let html = fs.readFileSync(modeloPath, 'utf8');

    const cssRef = /<link rel="stylesheet" href="\.\/(_base-modelo-3d\.css)">/;
    const achouCss = html.match(cssRef);
    if (!achouCss) throw new Error('Nao achei o <link> da base CSS em ' + modeloPath);
    const css = fs.readFileSync(path.join(dir, achouCss[1]), 'utf8');
    html = html.replace(cssRef, '<style>\n' + css + '\n</style>');

    const jsRef = /import \{([^}]+)\} from '\.\/(_base-modelo-3d\.js)';/;
    const achouJs = html.match(jsRef);
    if (!achouJs) throw new Error('Nao achei o import da base JS em ' + modeloPath);
    // a base exporta pra fora; costurada aqui dentro ela vira codigo local do proprio
    // modulo, entao o "export" tem que sair (senao o navegador reclama de sintaxe)
    const js = fs.readFileSync(path.join(dir, achouJs[2]), 'utf8')
        .replace(/^export \{[^}]*\};?\s*$/m, '')
        .replace(/^export function /gm, 'function ');
    html = html.replace(jsRef, js);

    // sobra de verdade e <link>/import apontando pra base; a mencao no comentario da
    // propria base ("Uso: import ... from './_base-modelo-3d.js'") e so texto e pode ficar
    const sobra = /<link[^>]+_base-modelo-3d\.css|^\s*import.*_base-modelo-3d\.js/m;
    if (sobra.test(html)) {
        throw new Error('Sobrou referencia a base no HTML costurado — o iframe data: vai quebrar');
    }
    return html;
}

const args = process.argv.slice(2);

if (args[0] === '--so-monta') {
    const [, modelo, saida] = args;
    if (!modelo || !saida) throw new Error('Uso: node embute-modelo-3d.js --so-monta <modelo.html> <saida.html>');
    const html = montaAutocontido(path.resolve(modelo));
    fs.writeFileSync(path.resolve(saida), html);
    console.log('OK:', saida, `(${Math.round(html.length / 1024)} KB)`);
    process.exit(0);
}

const [htmlArg, token, modeloArg] = args;
if (!htmlArg || !token || !modeloArg) {
    console.error('Uso: node embute-modelo-3d.js <animacao.html> <TOKEN> <modelo.html>');
    process.exit(1);
}
const HTML = path.resolve(htmlArg);
let pagina = fs.readFileSync(HTML, 'utf8');
const modelo = montaAutocontido(path.resolve(path.dirname(HTML), modeloArg));
const b64 = Buffer.from(modelo, 'utf8').toString('base64');

// primeira vez: o token __ASSIM__ ainda esta la. depois disso ele sumiu (virou o base64
// dentro de uma const), entao rodar de novo tem que trocar o base64 velho pelo novo —
// senao cada mexida no modelo pediria refazer a pagina inteira do zero.
// A const chama-se como o token sem os sublinhados: __MODELO3D_B64__ -> MODELO3D_B64.
const nomeConst = token.replace(/^__|__$/g, '');
const jaEmbutido = new RegExp(`const ${nomeConst} = '[A-Za-z0-9+/=]*';`);
// a checagem do reembute vem primeiro: o nome da const e um pedaco do proprio token,
// entao um includes(token) solto casaria com ela e trocaria o NOME pelo base64.
if (jaEmbutido.test(pagina)) {
    pagina = pagina.replace(jaEmbutido, `const ${nomeConst} = '${b64}';`);
    console.log(`(ja estava embutido em const ${nomeConst} — trocado pela versao nova)`);
} else if (pagina.includes(token)) {
    pagina = pagina.replaceAll(token, b64);
} else {
    throw new Error(`Nao achei ${token} nem um const ${nomeConst} em ${htmlArg}`);
}
fs.writeFileSync(HTML, pagina);
console.log(`${token} <- ${path.basename(modeloArg)} (${Math.round(b64.length / 1024)} KB em base64)`);
console.log('OK:', HTML, `(${Math.round(pagina.length / 1024)} KB no total)`);

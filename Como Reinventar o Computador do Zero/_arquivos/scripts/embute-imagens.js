// Troca tokens __ASSIM__ de um animacao.html por data URIs de imagens locais.
// A pagina fica autocontida (o embed no Nexus nao depende da pasta img/).
//
// Uso: node embute-imagens.js <animacao.html> <TOKEN=caminho/da/imagem.jpg> [...]
// Ex.: node embute-imagens.js animacao.html __IMG_PASCAL__=img/pascal.jpg __IMG_PASCALINA__=img/pascalina.jpg
//
// No HTML, deixar <img src="__IMG_PASCAL__"> e rodar este script UMA vez
// (depois de rodar, o token some do arquivo — rodar de novo da erro de token).
const fs = require('fs');
const path = require('path');

const [htmlArg, ...pares] = process.argv.slice(2);
if (!htmlArg || !pares.length) {
    console.error('Uso: node embute-imagens.js <animacao.html> <TOKEN=imagem.jpg> [...]');
    process.exit(1);
}
const HTML = path.resolve(htmlArg);
const base = path.dirname(HTML);

let html = fs.readFileSync(HTML, 'utf8');
for (const par of pares) {
    const [token, rel] = par.split('=');
    if (!token || !rel) throw new Error(`Par invalido: ${par} (esperado TOKEN=caminho)`);
    if (!html.includes(token)) throw new Error(`Token ${token} nao esta no HTML`);
    const b64 = fs.readFileSync(path.resolve(base, rel)).toString('base64');
    // mime pela extensao: png embutido como image/jpeg quebra em navegador estrito
    const ext = path.extname(rel).toLowerCase();
    const mime = ext === '.png' ? 'image/png'
        : ext === '.gif' ? 'image/gif'
        : ext === '.svg' ? 'image/svg+xml'
        : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    // replaceAll: o mesmo token pode aparecer mais de uma vez (src + data-*).
    // Cuidado: cada ocorrencia carrega uma copia do base64 — pra reusar a mesma
    // imagem em telas diferentes, apontar pro src da primeira por JS.
    const vezes = html.split(token).length - 1;
    html = html.replaceAll(token, `data:${mime};base64,${b64}`);
    console.log(`${token} <- ${rel} (${Math.round(b64.length * 0.75 / 1024)} KB${vezes > 1 ? ' x' + vezes + ' ocorrencias' : ''})`);
}
fs.writeFileSync(HTML, html);
console.log('OK:', HTML, `(${Math.round(html.length / 1024)} KB no total)`);

// Fotografa páginas que já estão no ar, no desktop e no telefone, e avisa se alguma
// rola pro lado. Serve pra conferir o que subiu. As fotos vão pro %TEMP% (esta pasta
// está no git).
// Uso (pelo PowerShell): node foto-do-ar.js "<url>" "<nome da foto>" ["<url>" "<nome>" ...]
const { chromium } = require('C:/Users/ASUS/AppData/Local/notebooklm-lab/node_modules/patchright');
const os = require('os');
const path = require('path');

const TAMANHOS = [
    { nome: 'desktop', width: 1366, height: 900 },
    { nome: 'telefone', width: 390, height: 780 },
];

(async () => {
    const pares = process.argv.slice(2);
    if (!pares.length || pares.length % 2) {
        throw new Error('Uso: node foto-do-ar.js "<url>" "<nome>" ["<url>" "<nome>" ...]');
    }
    const navegador = await chromium.launch({ channel: 'msedge', headless: true });
    try {
        for (let i = 0; i < pares.length; i += 2) {
            const [url, nome] = [pares[i], pares[i + 1]];
            for (const tamanho of TAMANHOS) {
                const pagina = await navegador.newPage({ viewport: { width: tamanho.width, height: tamanho.height } });
                const resposta = await pagina.goto(url, { waitUntil: 'load' });
                const sobra = await pagina.evaluate(() => document.documentElement.scrollWidth - innerWidth);
                const foto = path.join(os.tmpdir(), `${nome}-${tamanho.nome}.png`);
                await pagina.screenshot({ path: foto, fullPage: true });
                console.log(`${nome} ${tamanho.nome}: ${resposta.status()}, ${sobra > 0 ? `rola ${sobra}px pro lado` : 'sem rolagem lateral'} (foto em ${foto})`);
                await pagina.close();
            }
        }
    } finally {
        await navegador.close();
    }
})().catch((erro) => { console.error('Falhou:', erro.message); process.exit(1); });

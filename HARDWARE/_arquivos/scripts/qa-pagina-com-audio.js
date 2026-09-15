// Confere uma página do site das séries que tem áudio (hub da série ou página de etapa):
// se o arquivo que o tocador aponta existe mesmo (local) ou responde (no ar), se a página
// não rola pro lado no desktop e no telefone, e tira uma foto de cada tamanho em %TEMP%.
// Uso (pelo PowerShell):
//   node qa-pagina-com-audio.js "file:///C:/src/PROJETOS/SEIRES/site/etapas/hardware-01.html"
//   node qa-pagina-com-audio.js "https://series.afx.art.br/site/hardware.html"
const { chromium } = require('C:/Users/ASUS/AppData/Local/notebooklm-lab/node_modules/patchright');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { fileURLToPath } = require('url');

// Sem argumento, confere a página local; com uma URL, confere a que está no ar.
const PAGINA = process.argv[2] || 'file:///C:/src/PROJETOS/SEIRES/site/etapas/hardware-01.html';
const NO_AR = PAGINA.startsWith('http');
const TAMANHOS = [
    { nome: 'desktop', width: 1366, height: 900 },
    { nome: 'telefone', width: 390, height: 780 },
];

(async () => {
    const navegador = await chromium.launch({ channel: 'msedge', headless: true });
    try {
        for (const tamanho of TAMANHOS) {
            const pagina = await navegador.newPage({ viewport: { width: tamanho.width, height: tamanho.height } });
            await pagina.goto(PAGINA, { waitUntil: 'load' });

            const audio = await pagina.locator('audio').first().evaluate((el) => el.src);
            // No ar, quem responde é o servidor; local, o arquivo tem que existir no disco.
            const arquivo = NO_AR ? audio : fileURLToPath(audio);
            const existe = NO_AR
                ? (await pagina.request.get(audio, { headers: { Range: 'bytes=0-999' } })).status() < 400
                : fs.existsSync(arquivo);
            const sobra = await pagina.evaluate(() => document.documentElement.scrollWidth - innerWidth);
            // a foto vai pro %TEMP%: esta pasta está no git
            const foto = path.join(os.tmpdir(), `qa-pagina-${path.basename(PAGINA, '.html')}-${tamanho.nome}.png`);
            await pagina.screenshot({ path: foto, fullPage: true });
            console.log(`${tamanho.nome}: foto em ${foto}`);

            console.log(`${tamanho.nome}: ${sobra > 0 ? `rola ${sobra}px pro lado` : 'sem rolagem lateral'}`);
            console.log(`${tamanho.nome}: audio ${existe ? 'aponta pro arquivo certo' : 'NAO ACHOU O ARQUIVO'} (${arquivo})`);
            await pagina.close();
        }
    } finally {
        await navegador.close();
    }
})().catch((erro) => { console.error('Falhou:', erro.message); process.exit(1); });

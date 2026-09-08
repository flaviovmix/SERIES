// Verifica as 256 combinações do ábaco binário, interação, desafios e incorporação em iframe.
// Pré-requisitos em LEIA-ME-qa.md. As capturas ficam na pasta temporária.
const { chromium } = require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
const models = root + '/Como Reinventar o Computador do Zero/_arquivos/modelos-3d';
const out = process.env.QA_OUT || path.join(require('node:os').tmpdir(), 'abaco-binario-qa');
const base = process.env.MODELOS_URL || 'http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/';
fs.mkdirSync(out, { recursive: true });
let browser;
(async () => {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => { errors.push(e.message); console.log('PAGE ERROR', e.message); });
  page.on('requestfailed', r => console.log('REQUEST FAILED', r.url(), r.failure()));
  await page.goto(base + 'abaco-binario.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.__binario);
  await page.waitForTimeout(600);
  await page.screenshot({ path: out + '/desktop.png', fullPage: true });
  const state = () => page.evaluate(() => window.__binario.estado());
  const check = (ok, message) => { assert.ok(ok, message); if (!message.startsWith('conversão correta:') || / = (0|127|128|255)$/.test(message)) console.log('OK ' + message); };
  const clickBead = async row => {const p = (await page.evaluate(() => window.__binario.pixels())).beads.find(p => p.row === row); await page.mouse.click(p.x, p.y); await page.waitForTimeout(350);};
  const setValue = async value => {const bits=value.toString(2).padStart(8,'0').split('').map(Number);for(let row=0;row<8;row++){if((await state()).digits[row]!==bits[row])await page.locator(`[data-row="${row}"]`).click();}};
  check((await page.evaluate(() => window.__binario.pixels())).beads.length === 8, 'uma única conta em cada uma das oito hastes');
  check((await state()).total === 0 && (await state()).binary === '00000000', 'todas à direita: 00000000 = 0');
  await clickBead(7);
  check((await state()).total === 1 && (await state()).xp === 100, 'clique liga o bit 1 e completa o primeiro desafio');
  await page.locator('#modeFree').click(); await page.locator('#btnLimpar').click(); await page.waitForTimeout(400);
  for (const [row, weight] of [[0,128],[1,64],[2,32],[3,16],[4,8],[5,4],[6,2],[7,1]]) {await clickBead(row);check((await state()).total===weight,'peso correto: '+weight);await clickBead(row);}
  for(let value=0;value<256;value++) {await setValue(value);const s=await state();check(s.total===value&&s.binary===value.toString(2).padStart(8,'0')&&s.digits.every(bit=>bit===0||bit===1),'conversão correta: '+s.binary+' = '+value);}
  await page.locator('#btnLimpar').click(); await page.waitForTimeout(400);
  let p=(await page.evaluate(() => window.__binario.pixels())).beads.find(p=>p.row===0);
  await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x-80,p.y,{steps:10});await page.mouse.up();await page.waitForTimeout(400);
  check((await state()).total===128,'arraste à esquerda liga o bit');
  p=(await page.evaluate(() => window.__binario.pixels())).beads.find(p=>p.row===0);
  await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+80,p.y,{steps:10});await page.mouse.up();
  check((await state()).total===0,'arraste à direita desliga o bit');
  await page.locator('[data-row="2"]').focus();await page.keyboard.press('Enter');
  check((await state()).total===32,'teclado alterna o bit');await page.keyboard.press('Enter');
  check((await state()).total===0,'teclado retorna o bit para zero');
  await page.locator('#btnExemplo').click();await page.waitForTimeout(2000);await page.locator('#btnLimpar').click();await page.waitForTimeout(3100);
  check((await state()).total===0&&!(await state()).demoRunning,'zerar cancela todos os passos da demonstração');
  await page.locator('#btnExemplo').click();await page.waitForTimeout(5200);
  check((await state()).total===170&&(await state()).binary==='10101010'&&(await state()).xp===100,'exemplo termina em 10101010 = 170 sem conceder XP');
  await page.screenshot({ path: out + '/binary-170.png', fullPage: true });
  await page.locator('#modeChallenge').click();
  check((await state()).total===1,'desafio preservado ao sair do modo livre');await page.locator('#btnNext').click();
  for(let round=1;round<8;round++){await setValue((await state()).target);check((await state()).solved&&(await state()).xp===(round+1)*100,'desafio '+(round+1)+' concluído');if(round<7)await page.locator('#btnNext').click();}
  await page.locator('#btnLimpar').click();await setValue(255);
  check((await state()).xp===800,'repetir o objetivo não duplica XP');await page.locator('#btnNext').click();
  check((await state()).xp===0&&(await state()).total===0&&(await state()).target===1,'nova partida reinicia o jogo');
  await page.locator('#modeFree').click();await setValue(170);
  for(const [name,width,height] of [['desktop',1440,1000],['laptop',1024,768],['mobile',390,844],['small-mobile',360,780]]){
    await page.setViewportSize({width,height});await page.waitForTimeout(400);
    const layout=await page.evaluate(()=>{const r=document.querySelector('#cena').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth-innerWidth,beads:window.__binario.pixels().beads,rect:{left:r.left,right:r.right,top:r.top,bottom:r.bottom}};});
    check(layout.overflow<=1&&layout.beads.every(p=>p.x>layout.rect.left&&p.x<layout.rect.right&&p.y>layout.rect.top&&p.y<layout.rect.bottom),name+': sem cortes ou contas fora do palco');
    await page.screenshot({path:out+'/'+name+'-170.png',fullPage:true});
  }
  require('node:child_process').execFileSync(process.execPath,[root+'/Como Reinventar o Computador do Zero/_arquivos/scripts/embute-modelo-3d.js','--so-monta',models+'/abaco-binario.html',out+'/binary-bundled.html']);
  const bundled=fs.readFileSync(out+'/binary-bundled.html','utf8');
  const embedPage=await browser.newPage({viewport:{width:1440,height:1000}});
  embedPage.on('pageerror',e=>errors.push(e.message));
  for(const [width,height] of [[1000,450],[390,425]]){
    await embedPage.setContent(`<iframe style="border:0;width:${width}px;height:${height}px"></iframe>`);
    await embedPage.locator('iframe').evaluate((el,html)=>{el.src='data:text/html;base64,'+btoa(unescape(encodeURIComponent(html)));},bundled);
    const frame=embedPage.frames()[1];await frame.waitForFunction(()=>!!window.__binario);await embedPage.waitForTimeout(300);
    const size=await frame.evaluate(()=>({x:document.documentElement.scrollWidth-innerWidth,y:document.documentElement.scrollHeight-innerHeight}));
    await embedPage.locator('iframe').screenshot({path:out+'/embed-'+width+'.png'});
    check(size.x<=1&&size.y<=1,'embutido '+width+'×'+height+': sem cortes '+JSON.stringify(size));
  }
  check(errors.length===0,'sem erros JavaScript');
  await browser.close();
})().catch(async error=>{if(browser)await browser.close();console.error(error);process.exitCode=1;});

const {chromium}=(()=>{try{return require('playwright');}catch{return require('C:/Users/ASUS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');}})();
const assert=require('node:assert/strict'),path=require('node:path'),os=require('node:os'),fs=require('node:fs');
const root=process.env.MODELOS_URL||'http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/';
const output=path.join(os.tmpdir(),'processador-qa');fs.mkdirSync(output,{recursive:true});let browser;
const settle=async page=>{
  await page.waitForFunction(()=>!!window.__processador,undefined,{timeout:20000});
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.waitForFunction(()=>{const s=window.__processador.estado();return !s.moving&&s.expanded===s.targetExpanded;},undefined,{timeout:20000});
  const {corners,rect}=await page.evaluate(()=>window.__processador.pixels());
  for(const p of corners)assert.ok(p.x>rect.left+8&&p.x<rect.right-8&&p.y>rect.top+30&&p.y<rect.bottom-30,'Modelo enquadrado: '+JSON.stringify({p,rect}));
};
(async()=>{browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1080}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(root+'processador.html',{waitUntil:'domcontentloaded'});await settle(page);assert.ok(await page.locator('#loading').isHidden());
await page.screenshot({path:path.join(output,'montado.png'),fullPage:true});
const movingFan=(await page.evaluate(()=>window.__processador.estado())).fanAngle;await page.waitForTimeout(220);assert.notEqual((await page.evaluate(()=>window.__processador.estado())).fanAngle,movingFan,'Ventoinha gira');
await page.locator('#fans').click();const stoppedFan=(await page.evaluate(()=>window.__processador.estado())).fanAngle;await page.waitForTimeout(220);assert.equal((await page.evaluate(()=>window.__processador.estado())).fanAngle,stoppedFan,'Ventoinha para');
for(const part of ['coolerFan','cooler']){await page.locator(`[data-part="${part}"]`).click();await settle(page);assert.deepEqual((await page.evaluate(()=>window.__processador.estado())).visible,[part]);await page.screenshot({path:path.join(output,part+'.png'),fullPage:true});}
await page.locator('#showAll').click();await settle(page);await page.locator('#explode').click();await settle(page);assert.equal((await page.evaluate(()=>window.__processador.estado())).expanded,1);
await page.screenshot({path:path.join(output,'aberto.png'),fullPage:true});await page.locator('[data-part="contacts"]').click();await settle(page);assert.deepEqual((await page.evaluate(()=>window.__processador.estado())).visible,['contacts']);await page.screenshot({path:path.join(output,'contatos.png'),fullPage:true});
await page.locator('[data-part="cores"]').click();await settle(page);await page.locator('#isolate').click();await settle(page);await page.screenshot({path:path.join(output,'nucleos.png'),fullPage:true});
for(const part of ['lid','seal','die','cores','substrate']){
  await page.locator('#showAll').click();await settle(page);
  await page.locator(`[data-part="${part}"]`).click();await settle(page);
  await page.locator('#isolate').click();await settle(page);
  assert.deepEqual((await page.evaluate(()=>window.__processador.estado())).visible,[part]);
  await page.locator('[data-view="back"]').click();await settle(page);
  await page.screenshot({path:path.join(output,part+'-verso.png'),fullPage:true});
}
await page.locator('#showAll').click();await settle(page);await page.locator('#explode').click();await settle(page);
await page.locator('[data-view="back"]').click();await settle(page);
await page.screenshot({path:path.join(output,'montado-verso.png'),fullPage:true});
for(const width of [1024,390,360]){await page.setViewportSize({width,height:Math.max(760,Math.round(width*.76))});await settle(page);assert.ok(await page.locator('body').evaluate(el=>el.scrollWidth<=innerWidth+1));await page.screenshot({path:path.join(output,'verso-'+width+'.png'),fullPage:true});}
await page.setViewportSize({width:1440,height:1080});await page.locator('#showAll').click();await page.locator('#reset').click();await settle(page);await page.locator('.stage').screenshot({path:path.join(output,'thumb.jpg'),type:'jpeg',quality:88});assert.deepEqual(errors,[]);console.log('PASS: processador, cooler, ventoinha, camadas, isolamento, contatos e tres larguras.');console.log('Capturas: '+output);
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();});

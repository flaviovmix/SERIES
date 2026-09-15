# Padrão do modelo 3D deitado no telefone

Decidido com o Flávio em 09/09/2026, no `abaco.html`, e valendo **para todo modelo
que for usado deitado** daqui pra frente. Três peças, nesta ordem de importância:

1. **A arte deita sozinha** quando o telefone está em pé. Ninguém pede pra girar.
2. **Os controles moram num painel lateral** que entra pela direita da arena, e um
   botão só (o hambúrguer) abre e fecha.
3. **O valor que a pessoa está construindo fica flutuando** sobre a arena, fora do
   painel — é o que ela veio ver, e some junto com o painel seria perder o fio.

O modelo de referência é [abaco.html](abaco.html). Copie de lá, não daqui: este
arquivo explica o porquê e avisa das pegadinhas; o código vivo é o de lá.

---

## 1. A arte deita

CSS. Mesma técnica do quebra-cabeça e do ateliê do KIDS (`site/js/atelie/celular.js`):
o app inteiro gira 90°, e o aparelho deitado de verdade solta a media query e tudo
volta ao normal sozinho. **Não** é bloqueio de orientação.

```css
@media(max-width:820px) and (orientation:portrait) and (pointer:coarse){
  html,body{height:100%;overflow:hidden}
  /* svh = altura COM a barra do navegador à vista; com 100vh o pé do app sai da tela */
  .app{position:fixed;top:0;left:0;width:100svh;height:100vw;max-width:none;
       transform-origin:0 0;transform:rotate(90deg) translateY(-100%);
       display:flex;flex-direction:column;overflow:hidden}
  /* deitado sobra pouca altura: fica o que se usa, sai o que é leitura */
  .introduction,.bottom-strip,.underboard{display:none}
  /* o <dialog> mora fora do .app: precisa do mesmo giro pra nascer deitado */
  #helpDialog{top:0;left:0;width:min(520px,100svh);max-height:100vw;margin:0;
              transform-origin:0 0;transform:rotate(90deg) translateY(-100%)}
}
```

JS. **O navegador não converte coordenada de ponteiro através de um `transform`**:
`clientX/clientY` continuam sendo tela. Quem lê o dedo desfaz o giro na mão.

```js
const EM_PE=matchMedia('(max-width:820px) and (orientation:portrait) and (pointer:coarse)');
const deitado=()=>EM_PE.matches;

// o ponto do dedo NO ELEMENTO: girado, o eixo x do elemento corre no y da tela
function pontoLocal(el,e){
  const r=el.getBoundingClientRect();
  return deitado() ? {x:e.clientY-r.top, y:r.right-e.clientX, w:r.height, h:r.width}
                   : {x:e.clientX-r.left, y:e.clientY-r.top,  w:r.width,  h:r.height};
}
// e o caminho de volta, mundo → tela (usado por teste e por rótulo flutuante)
function pixelNaTela(v3){
  const p=v3.clone().project(camera), el=renderer.domElement, r=el.getBoundingClientRect();
  const x=(p.x+1)/2*el.clientWidth, y=(1-p.y)/2*el.clientHeight;
  return deitado() ? {x:r.right-y, y:r.top+x} : {x:r.left+x, y:r.top+y};
}
```

O `OrbitControls` também lê o dedo em tela e arrastaria no eixo trocado. Deitado, a
rotação passa a ser feita na mão; **a pinça de zoom continua com ele**, porque
distância entre dois dedos não muda com o giro.

```js
const esfera=new THREE.Spherical(); let girandoCamera=null;
function giraCamera(dx,dy){ /* setFromVector3 → theta -= dx*.006 → phi clamp → position */ }
function ajustaOrientacao(){controls.enableRotate=!deitado();}
EM_PE.addEventListener('change',ajustaOrientacao); ajustaOrientacao();
```

Quem arrasta peça também precisa do eixo certo: o arrasto horizontal da peça é o
movimento **vertical** da tela quando deitado.

---

## 2. O painel lateral

Um botão só. O hambúrguer no canto de cima da arena traz **tudo** pela direita, do
topo à base: a linha de cima com o que age na cena (Ver exemplo, Zerar) e o selo de
progresso; depois os modos; depois o cartão do desafio sem moldura; e o que a pessoa
manipula (as casas do ábaco) colado na base.

```css
.arena{--gaveta:min(280px,60%)}
.arena-menu{position:absolute;z-index:5;top:0;right:0;bottom:0;width:var(--gaveta);
            overflow-y:auto;display:flex;flex-direction:column;padding:8px;
            border-left:1px solid var(--line);background:#141925f2;
            backdrop-filter:blur(8px);animation:entraDaDireita .22s ease-out}
/* aberto, o X desce e encosta na borda do painel, fora do conteúdo */
.arena-menu-btn{transition:right .22s ease-out,top .22s ease-out}
.arena.menu-aberto .arena-menu-btn{top:26px;right:calc(var(--gaveta) + 2px)}
.arena-menu .digit-controls{margin-top:auto}   /* o manipulável fecha o painel */
```

**Mover, não clonar.** Os ouvintes foram ligados por id; clonar mata o botão. Guarde
de onde cada bloco veio pra devolver intacto quando a tela crescer:

```js
const deOndeVeio=sel=>{const no=document.querySelector(sel);return{no,pai:no.parentNode,depois:no.nextSibling};};
const naLinha=['.utility-buttons','.level-chip'].map(deOndeVeio);
const naGaveta=['.mode-switch','.challenge'].map(deOndeVeio);
function arruma(){
  if(noTelefone.matches){ naLinha.forEach(g=>linha.appendChild(g.no));
                          naGaveta.forEach(g=>gaveta.appendChild(g.no));
                          gaveta.appendChild(casas); arena.appendChild(valor); }
  else { [...naLinha,...naGaveta].forEach(g=>g.pai.insertBefore(g.no,g.depois)); … }
}
noTelefone.addEventListener('change',arruma); arruma();
```

Fecha sozinho quando a pessoa **agiu na cena** (Zerar, Ver exemplo, o botão do
desafio) e quando toca fora. **Não** fecha ao trocar de modo nem ao mexer nas casas:
ali ela costuma dar mais de um toque seguido.

---

## 3. O valor flutuando

Fora do painel, no canto de cima da arena, e **só o número** — sem rótulo, sem "ao
vivo". `pointer-events:none` porque quem manda naquela área é a cena atrás dele.

```css
.arena>.numero{position:absolute;z-index:3;left:16px;top:42px;pointer-events:none;
               padding:4px 14px;border:1px solid var(--line);border-radius:12px;
               background:#1c2130e6;backdrop-filter:blur(6px)}
.arena>.numero .score-label,.arena>.numero .live-label{display:none}
```

---

## Pegadinhas que já custaram caro

1. **Media query não soma especificidade.** `.embedded .app{height:100%}` (duas
   classes) vence o `height:100vw` do bloco deitado (uma). O app virou quadrado,
   maior que o iframe, e a arte abriu gigante e cortada. Toda regra `.embedded X`
   nova tem que ser reconferida contra o bloco deitado — a saída foi
   `body.embedded .app{height:100vw}` **dentro** do bloco deitado.
2. **`flex:0 1 auto` num cartão dentro do painel faz o conteúdo vazar**: encolher a
   caixa não encolhe o texto, e a base do cartão cobriu o que vinha depois. Use
   `flex:0 0 auto` e deixe o painel rolar.
3. **`[hidden]` perde para `display:flex`.** Pra esconder um bloco por JS:
   `.scoreboard[hidden]{display:none}`.
4. **`insertBefore` com o irmão já movido estoura.** Devolvendo dois nós ao mesmo
   pai, use `append` na ordem certa.
5. **A grade do próprio modelo continua valendo.** O binário põe a coluna do jogo
   na **linha 2 de três automáticas** (a 3ª era do cartão). Com o cartão no menu,
   sobrava linha vazia e a arena encolhia pra 215px de 466. No bloco de telefone:
   `.game-layout{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr);gap:0}`
   e `.play-column{grid-column:1;grid-row:1;padding:0}`. **Meça a arena antes e
   depois**; é o sintoma mais fácil de deixar passar.
6. **O bloco novo vai pro FIM da folha.** Media query não soma especificidade: no
   binário o bloco entrou no meio e as media queries seguintes venciam tudo.
7. **Orçamento de altura.** O painel tem a altura da arena: ~324px num telefone de
   390, ~414px num de 480. O do ábaco fecha em 323px. Item novo tem que sair de
   algum lugar; foi por isso que a "Uma ajudinha?" saiu.
8. **Um iframe com menos de 540px de altura acende regras antigas do embutido.** O
   telefone dele (384x686) abre o lightbox com iframe de 535px, e aí
   `@media(max-height:540px)` faz `.embedded .game-layout{display:block}`: num pai
   em bloco a coluna do jogo não tem altura definida e a arena com `flex:1` cai pra
   **zero** — quadro vazio, sem erro nenhum, só no aparelho dele. A emulação nunca
   pegou porque usava 480x1000, 412x915, 390x780 (iframe de 608px ou mais). No bloco
   deitado: `body.embedded .game-layout{display:grid;grid-template-rows:minmax(0,1fr);flex:1;min-height:0}`.
   **Sempre testar em 384x686 também**, e quando a tela ficar em branco num
   aparelho, pedir o print com `?medidas=1` na URL do episódio: o lightbox escreve
   o tamanho do iframe, do app, da arena e do canvas na legenda.
9. **Embutido no lightbox do episódio o modelo não pode rolar**: o iframe tem 84vh,
   que num monitor 1080p com escala 125% dá ~720px. Veja as regras `.embedded` do
   `abaco.html` (app em coluna flex, palco com `min-height` baixo, cartão compacto
   até 900px de altura de iframe).

## Como conferir

`_qa-deitado.js` (nesta pasta, roda local — não é publicado junto):

```
node _qa-deitado.js "https://series.afx.art.br/…/modelos-3d/abaco.html"
node _qa-deitado.js "…/abaco-binario.html" --flutua=.running-sum --tolerancia=80
```

`--flutua` diz qual é o valor que flutua (o binário usa a `.running-sum` que ele já
tinha); `--tolerancia` é quanto o painel pode rolar antes de reprovar — o alvo do
padrão é 40px, e o binário carrega dois controles a mais.

Ele mede o que o olho não garante: o app girado **cabe na janela** (foi assim que a
regressão do item 1 apareceu), o palco fica largo, o painel abre dentro da arena, o
valor flutua fora dele e o desktop continua intacto.

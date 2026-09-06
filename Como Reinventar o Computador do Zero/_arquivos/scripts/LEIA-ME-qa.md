# QA da série — os quatro scripts

Nasceram soltos numa pasta temporária em 06/09/2026 e foram versionados porque a
Etapa 4 do plano pede exatamente isto: *"conferência pós-publicação como script
versionado"*. Antes disso, cada sessão reescrevia a mesma checagem e ela sumia junto
com o scratchpad.

## Antes de rodar

Dois deles precisam do site servido por **http**, não por `file://`: os modelos 3D são
módulos ES e o `import` do `_base-modelo-3d.js` cai no CORS quando a página vem do
disco. Na raiz do repo:

```bash
python -m http.server 8777 --bind 127.0.0.1
```

⚠️ **Playwright, não patchright.** O patchright roda `page.evaluate` num mundo isolado
e o gancho `window.__<maquina>` aparece como `undefined` — parece bug do modelo e não
é. Os scripts já apontam pro Playwright do cache do npx.

## Os scripts

| Script | Pra que serve |
|---|---|
| `qa-pagina.js <url> <telas>` | uma página de animação: número de telas e bolinhas, navegação até a última, imagem quebrada, estouro horizontal em 1440px e 360px, e **conteúdo cortado dentro da tela** numa janela de 1440x900 (que o teste de estouro não pega) |
| `qa-modelos-3d.js` | os cinco modelos de uma vez: a cena monta, o gancho responde, e nenhuma peça cai fora da tela ou **atrás do painel** — em desktop e no telefone |
| `qa-producao.js` | o mesmo, mas contra o site **no ar**, depois do deploy |
| `thumb-modelo.js <url> <saida.png> [comandos]` | a miniatura de um modelo pro índice, sem painel e sem faixa de título |

## Por que a checagem "atrás do painel" existe

Em 23/08 o QA passou 27/27 com metade da máquina invisível: registro, bico e balde
caíam exatamente atrás do HUD e nenhum teste de estado reclamou. Só o screenshot
mostrou. Desde então o modelo expõe `pixels()`, que projeta cada peça pra pixels de
tela, e o teste **reprova** se alguma cair atrás do painel ou fora da borda. Rótulo tem
folga de 85px, porque o sprite é mais largo que a posição central dele.

Desde 06/09 quem monta essa medida é a base (`medidaDeQA` no `_base-modelo-3d.js`): o
modelo só diz **quais** peças medir.

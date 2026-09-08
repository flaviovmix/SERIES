# QA da série

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
| `qa-abaco.js` | Ábaco Play: clique, arraste, teclado, oito desafios, pontuação, cancelamento da demonstração, cinco tamanhos de tela e modelo embutido em dois tamanhos |
| `qa-suanpan.js` | Suanpan Play: famílias de duas e cinco contas, arraste em direções opostas, valores equivalentes, oito desafios e quatro tamanhos de tela; `--embed-only` verifica três tamanhos de iframe |
| `qa-binario.js` | Ábaco Binário Play: oito contas, todas as 256 combinações, leitura binária e decimal, clique, arraste, teclado, oito desafios, quatro tamanhos de tela e dois tamanhos de iframe |
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

## Ábaco Play

Com o servidor local acima rodando, execute `node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-abaco.js"` na raiz do repositório. O teste usa o mesmo Playwright e o Edge dos demais scripts. A conexão com a internet é necessária para as fontes e o Three.js.

O teste joga pelas peças e pelos botões, verifica que cada objetivo concede XP uma só vez, completa as oito fases e reinicia a partida. Confere também se zerar cancela a demonstração, se voltar do modo livre restaura o desafio, se todas as contas permanecem dentro do palco e se o HTML montado por `embute-modelo-3d.js` funciona dentro de um iframe. Na capa compacta, o ábaco abre no modo livre.

As capturas e o HTML montado ficam na pasta temporária do sistema, em `abaco-play-qa`. Use `QA_OUT` para escolher outra pasta e `MODELOS_URL` para mudar a URL da pasta de modelos. O argumento `--embed-only` roda apenas a verificação das versões embutidas. A pontuação pertence à partida atual e é reiniciada ao recarregar a página.

## Suanpan Play

`modelos-3d/suanpan.html` é uma versão separada; `abaco.html` continua sendo o Ábaco Play aprovado. O suanpan usa hastes horizontais, duas contas de cinco à esquerda e cinco de um à direita. Contas próximas à divisória entram na soma. O estado físico permite valores intermediários de 0 a 15 por haste, e os desafios aceitam somas equivalentes. A demonstração mostra 5 + 2 e a troca de cinco contas de um por uma de cinco.

Execute `node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-suanpan.js"` para conferir a mecânica e o jogo, e acrescente `--embed-only` para conferir o HTML montado dentro de iframes. Os pré-requisitos são os mesmos do Ábaco Play. Os resultados ficam em `suanpan-play-qa`, na pasta temporária, ou na pasta indicada por `QA_OUT`.

## Ábaco Binário Play

`modelos-3d/abaco-binario.html` é um terceiro modelo, separado de `abaco.html` e `suanpan.html`. O corpo estreito possui oito hastes com uma conta em cada: esquerda representa 1; direita representa 0. Os pesos escritos no metal são 128, 64, 32, 16, 8, 4, 2 e 1, de cima para baixo. A interface mostra os oito bits e o valor decimal de 0 a 255. A câmera permite rotação completa, e os botões de bits oferecem a mesma operação pelo teclado.

Execute `node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-binario.js"` com o servidor local e os pré-requisitos descritos acima. Além das 256 combinações, o teste verifica a demonstração, sua interrupção, os oito desafios, pontuação sem duplicação e as versões embutidas. Capturas e HTML montado ficam em `abaco-binario-qa`, na pasta temporária. `QA_OUT` e `MODELOS_URL` permitem escolher pasta e URL.

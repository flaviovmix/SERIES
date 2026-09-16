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
| `qa-pagina.js <url> <telas>` | uma página de animação: número de telas e bolinhas, navegação até a última, imagem quebrada, estouro horizontal em 1440px e 360px, **conteúdo cortado dentro da tela** numa janela de 1440x900 (que o teste de estouro não pega) e, desde 16/09/2026, a **regra da imagem**: toda tela tem imagem (foto, ilustração, svg, canvas ou o widget interativo, que é o desenho da própria página) e ela fica **à vista no telefone**, porque imagem fora da dobra conta como tela sem imagem. Essa última nasceu de um episódio que foi ao ar com 12 telas e uma foto só: o teste dizia "tudo passou" porque media tudo menos isso, e a regra, embora escrita no `_molde-roteiro.txt`, não segurava nada sem alguém testando |
| `qa-modelos-3d.js` | os cinco modelos de uma vez: a cena monta, o gancho responde, e nenhuma peça cai fora da tela ou **atrás do painel** — em desktop e no telefone |
| `qa-abaco.js` | Ábaco Play: clique, arraste, teclado, oito desafios, pontuação, cancelamento da demonstração, cinco tamanhos de tela e modelo embutido em dois tamanhos |
| `qa-suanpan.js` | Suanpan Play: famílias de duas e cinco contas, arraste em direções opostas, valores equivalentes, oito desafios e quatro tamanhos de tela; `--embed-only` verifica três tamanhos de iframe |
| `qa-binario.js` | Ábaco Binário Play: oito contas, todas as 256 combinações, leitura binária e decimal, clique, arraste, teclado, oito desafios, quatro tamanhos de tela e dois tamanhos de iframe |
| `qa-rtx5090.js` | RTX 5090: ventoinhas, vistas da câmera, desmontagem e montagem, isolamento de componente, separação parcial, arraste, teclado, PNG, tela cheia, cinco larguras, movimento reduzido e dois tamanhos de iframe |
| `qa-arduino-uno.js` | Arduino UNO: cada vista, explosão, cada peça isolada, ocultar peça, LEDs; em todo estado confere que o modelo cabe no palco no desktop e no telefone; `--thumb` grava a miniatura da galeria sem o HUD |
| `qa-visualizador.js <modelo.html>` | **Qualquer** modelo sobre a casca `_visualizador-pecas.js` (Arduino, Protoboard, Pente de memória, Disco rígido e os próximos): descobre vistas, peças e botões liga/desliga pelo próprio HTML, passa por todos e confere que o modelo cabe no palco em cada estado; `--thumb` grava a miniatura. Modelo novo nessa casca não precisa de script próprio |
| `qa-producao.js` | o mesmo, mas contra o site **no ar**, depois do deploy |
| `thumb-modelo.js <url> <saida.png> [comandos]` | a miniatura de um modelo pro índice, sem painel e sem faixa de título |

## O site e a base das animações (deploy e QA, 12 a 14/09/2026)

Nasceram no scratchpad da sessão do redesenho AFX e foram versionados em 14/09 pelo
mesmo motivo de sempre: o scratchpad some. Detalhe do que cada um cobre no
`plano/_HANDOFF-2026-09-14.md` da série.

**Deploy, nesta ordem:**

| Script | Pra que serve |
|---|---|
| `inventario-site.sh` | md5 de todo html/css/js de `~/serie` no servidor, numa chamada ssh só, contra o local; escreve os diferentes em `/tmp/inventario-serie/diferentes.txt` (`QA_OUT` muda a pasta). Rodar ANTES de subir arquivo compartilhado: acha trabalho de outra sessão que não pode ir junto |
| `gera-cards/gera-cards.js --confere` | os cards de toda página do `site/` iguais ao que a MENU e o `site/dados/cards.js` geram, e o lightbox carregado onde a foto amplia. Reprovou, não sobe (D4). O `sobe-arquivos.sh` roda sozinho quando a lista tem página do `site/` |
| `revisa-diferencas.sh` | baixa do ar (por tar) as cópias dos arquivos diferentes e mostra o diff de cada um |
| `sobe-arquivos.sh <caminhos>` | sobe arquivos (caminhos relativos à raiz do SEIRES) com backup em tgz carimbado, tar por cima do ssh e md5 local x ar no fim. Css e js antes de html |

**QA do site** (todos aceitam `ar` como argumento pra testar o site publicado; sem ele,
o local por `file://`; capturas na pasta temporária, `QA_OUT` muda):

| Script | Pra que serve |
|---|---|
| `qa-painel-abas.js` | o painel do telefone nas animações: guias Extras/Filmes em cima, tocador e paginação fixos embaixo, aviso de vazio, recolher no play e voltar pela seta, e os blocos de extras e filmes na tela de fim; 6 páginas (episódios com e sem listas, e um extra fora da árvore) |
| `qa-tocador-recolhe.js` | só o recolher: some no play, seta, abre, pausa não guarda, desktop não recolhe |
| `qa-menu-extras-ultimo.js` | o menu hambúrguer com "Extras" por último, numa página do site e numa animação |
| `qa-home-series.js` | a home: 2 cards por fileira, foto encostada na borda (16:9 como mínimo), foto em cima no telefone, 6 tamanhos |
| `qa-player-site.js` | o player desenhado das páginas (`audio.js`): 5 páginas × 4 tamanhos, nada estourando, play centrado; tocar, clicar na trilha, marcha, um de cada vez |
| `qa-tema-e-card.js` | a troca de tema no menu (guardada ao recarregar, no site e numa animação) e o card da home no telefone |
| `qa-producao-site.js` | as 16 páginas do site (fundo, fonte e cards do desenho AFX, claro e escuro) e 5 animações (paleta antiga, tocador abaixo da barra, tela de fim) |
| `qa-trava-animacao.js` | as animações seguem com a paleta antiga e o site com a do AFX, nos dois temas |
| `qa-cards.js` | os cards gerados: lupa, legenda igual à do dado, lightbox que abre a mesma foto, Esc devolvendo o foco, Tab e Enter, botão e lupa sem nada por cima, nada estourando, em 5 tamanhos e 2 temas. `--grava` e `--compara` guardam e conferem a geometria antes e depois (régua 4) |
| `qa-gera-cards.js` | a D4 numa cópia do site na pasta temporária: etapa nova só na MENU e no dado aparece no hub com lupa, card editado à mão reprova o `--confere`, e o gerador recusa dado que contradiz a MENU sem escrever nada. Não usa navegador nem `ar` |
| `qa-series-ativas.js` | a decisão 10: desliga uma série no `site/dados/series.json`, roda o gerador e confere que ela some da home, do menu do site e do menu da animação; religa e confere que tudo volta byte a byte. Com `ar`, só confere o que o site publicado mostra |
| `qa-painel-series.js` | o painel local (`painel/servidor.js`): as recusas (sem token, Origin ou Host estranhos, série inventada, valor que não é booleano, corpo gigante), desligar e religar pelo painel, a página no navegador e que nada responde fora do `127.0.0.1`. Os arquivos do site voltam ao que eram no fim |
| `qa-componente-card-img-fixa.js` | monta o componente `card-img-fixa` só com o que está no `.md` da pasta de componentes e mede |

## Os cards do site (Etapa 6, desde 15/09/2026)

Card não se escreve à mão (D4 do plano do SEIRES). A MENU do `site/js/menu.js` diz quais cards existem, em que ordem, pra onde levam e se estão no ar; o `site/dados/cards.js` guarda o texto, a imagem e o crédito da foto; o gerador escreve só o trecho entre `<!-- cards: ... -->` e `<!-- /cards -->` de cada página. Na raiz do SEIRES:

```bash
node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js"            # escreve
node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js" --confere  # só confere
```

Episódio ou etapa nova: entra na MENU e no `cards.js`, roda o gerador, roda o `qa-cards.js`. O gerador para (e não escreve nada) se o dado contradiz a MENU. Foto nova de capa precisa de crédito no `cards.js` pra ganhar lupa; a origem dos créditos que já existem está em `plano/levantamento-legendas.md`, gerada pelo `levanta-legendas.js`. Rotina de deploy com cards: inventário → `--confere` → revisa → sobe → `qa-cards.js ar`. Quando a subetapa 4.1 fechar, o `--confere` passa pro `publicar.sh`.

## Por que a checagem "atrás do painel" existe

Em 23/08 o QA passou 27/27 com metade da máquina invisível: registro, bico e balde
caíam exatamente atrás do HUD e nenhum teste de estado reclamou. Só o screenshot
mostrou. Desde então o modelo expõe `pixels()`, que projeta cada peça pra pixels de
tela, e o teste **reprova** se alguma cair atrás do painel ou fora da borda. Rótulo tem
folga de 85px, porque o sprite é mais largo que a posição central dele.

Desde 06/09 quem monta essa medida é a base (`medidaDeQA` no `_base-modelo-3d.js`): o
modelo só diz **quais** peças medir.

## RTX 5090

O estudo da RTX 5090 usa `rtx-5090.html`, `rtx-5090.css` e `rtx-5090.js` na pasta
dos modelos, junto ao palco comum. Na raiz do repo, com o servidor acima ativo:

```powershell
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-rtx5090.js"
```

As capturas e a miniatura ficam em `rtx5090-qa`, na pasta temporária do sistema.
`QA_OUT` e `MODELOS_URL` permitem alterar pasta e URL; `--preview-only` faz apenas
a conferência inicial do enquadramento e salva a prévia de desktop. O interior
da placa é uma representação simplificada para exploração visual.

## Arduino UNO

`arduino-uno.html` + `arduino-uno.js` são o primeiro modelo em cima da casca comum
`_visualizador-pecas.js` / `_visualizador-pecas.css` (extraída do rtx-5090 em 10/09/2026;
os três modelos anteriores ainda têm a casca própria). Com o servidor acima ativo:

```powershell
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-arduino-uno.js"
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-arduino-uno.js" --thumb
```

O teste passa por cada vista, pela explosão e por cada peça, e em todo estado confere pelo
gancho `window.__arduinoUno.pixels()` que os oito cantos da caixa do modelo caem dentro do
palco, fora dos controles, no desktop e no telefone de 480 px. `--thumb` esconde o HUD e
grava `modelos-3d/thumbs/arduino-uno.jpg` (as thumbs do processador e do 8080 saíram com o
HUD gravado por cima; esta não). As capturas ficam em `arduino-uno-qa`, na pasta temporária
do sistema; `QA_OUT` e `MODELOS_URL` mudam pasta e URL.

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

## Pendrive USB

Execute `node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-pendrive.js"`
com o servidor local. Verifica LED e difusor apagando juntos, luz constante em
movimento reduzido, seleção de peças pelo próprio modelo, abertura, versos e PNG.
No telefone 384×686, usa toques reais, arraste e pinça no palco girado. Também
confere que a fonte continua usando o cálculo padrão de clique do visualizador.
Capturas ficam em `pendrive-final` na pasta temporária; aceita `QA_OUT` e
`MODELOS_URL`. Para vistas, enquadramento e todas as peças, use também
`qa-visualizador.js pendrive.html`; `--thumb` atualiza a miniatura.

## Placa-mãe ATX

Execute `node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-placa-mae.js"`
com o servidor local. Confere vistas, isolamento, clique no socket, abertura,
versos, PNG, tela cheia e redimensionamento. No telefone 384×686, verifica toque
no socket e nas portas, arraste, pinça, painel e abertura. Também cobre movimento
reduzido e erros do navegador. Capturas em `placa-mae-final`, na pasta temporária;
aceita `QA_OUT` e `MODELOS_URL`. O teste geral continua sendo
`qa-visualizador.js placa-mae.html`, com `--thumb` para atualizar a miniatura.

## Gabinete gamer (as peças da galeria, montadas)

Desde 15/09/2026 o `gabinete-gamer.html` não desenha mais as peças por conta própria:
carrega as **carcaças** dos modelos da galeria (placa-mãe, RTX 5090, processador,
cooler, DDR5 em dois slots, fonte, HD, SSD, NVMe e pendrive) de
`modelos-3d/pecas-gamer/*.glb.gz`, e o `_montagem-gamer.js` diz onde cada uma encaixa.
O chassi, o vidro, o painel frontal e as ventoinhas do gabinete continuam
construídos no `gabinete-gamer.js`; `_cabos-gamer.js` monta os chicotes externos.
Na desmontagem cada peça sai inteira: o
clique numa solda ou num conector seleciona a peça toda, não o pedaço.

A carcaça segue a foto de referência que o Flávio mandou em 15/09 (mid-tower preto):
corpo de aço fechado atrás, em cima e na direita; vidro fumê só na esquerda; painel
frontal com duas grades vazadas e três faixas RGB verticais, pontas afiladas e
facetas pretas; tampa da fonte com fita rosa; ventoinhas de anel RGB, inclusive
duas no teto perfurado. O arco-íris é textura de canvas; só os anéis se deslocam
a cada quadro (`arcoIris()`). O brilho é um plano aditivo com máscara
suave (`brilho()`), sem pós-processamento. As ventoinhas da frente ficam **recuadas**
do painel (`z=2.6`, painel em `3.42`): coladas nele, qualquer ângulo que não seja de
lado puro esconde as três. Duas luzes pontuais dentro do gabinete compensam o vidro
escuro e apagam junto com o RGB. O vidro tem opacidade de 26%.

A GPU ocupa o segundo PCIe longo: neste modelo, o painel I/O desce até a altura
do primeiro. Essa montagem evita sobreposição entre as saídas de vídeo e os jacks
da placa-mãe. A traseira tem recortes próprios, abas e espelhos recuados para os
conectores reais das duas peças. ATX, EPS, GPU, SATA e ventoinhas têm cabos com
plugs e presilhas; a bandeja e a tampa inferior têm passagens vazadas. Os chicotes
saem como um conjunto separado na desmontagem, sem esticar.

As carcaças saem dos próprios construtores da galeria, sem alterar nenhum deles:

```bash
node "Como Reinventar o Computador do Zero/_arquivos/scripts/exporta-pecas-gamer.js"
```

Com o servidor local ativo, o script abre cada modelo no Edge, injeta a captura só
no navegador, guarda os grupos externos de cada peça (lista no próprio script)
consolidados por material, e grava `.glb.gz` + `manifest.json` com o sha256 do
construtor de origem. **Mexeu num construtor (placa-mae.js, rtx-5090.js…), roda
de novo**, senão o gabinete mostra a peça velha. Os rotores das ventoinhas ficam em
grupos `fan-rotor-*` pra continuarem girando dentro do gabinete.
Opcionalmente, passe um ou mais IDs para reexportar só as peças alteradas,
por exemplo `exporta-pecas-gamer.js fonte`. Os chanfros usam um segmento no
computador completo e as texturas são limitadas a 1024 px. Os modelos individuais
mantêm a resolução original. O carregador descompacta os GLBs com
`DecompressionStream('gzip')`, disponível no Edge usado na conferência.

Conferência: `qa-visualizador.js gabinete-gamer.html` (5 vistas, 15 seleções, RGB e
ventoinhas, desktop e telefone) e `--thumb` pra miniatura. O gancho
`window.__gabineteGamer.detalhes()` devolve a posição, os limites e a origem de
cada peça carregada, os chicotes e o total de triângulos.

`qa-gabinete-gamer.js` confere os hashes de origem, as 11 peças de hardware e
as 16 entradas de visibilidade. Pausa as hélices e compara as matrizes de todos
os elementos antes/depois da desmontagem: nenhuma camada interna pode se mover.
Também verifica que cada peça sai completamente do volume do gabinete e volta
à posição inicial, isolamento dos cabos, clique na GPU, luzes desligadas, PNG,
tela cheia, desktop 1024 e telefone 384×686 com toque, arraste e pinça. Cobre
movimento reduzido e recuperação após falha no carregamento de um GLB.
Capturas em `%TEMP%/gabinete-gamer-final/`; aceita `QA_OUT` e `MODELOS_URL`.

## Mouse gamer

`mouse-gamer.html` usa o visualizador comum e oito conjuntos: carcaça, botões,
laterais, scroll, placa, sensor, base e cabo. Tampa, colar lateral e base usam
contornos compatíveis, com paredes frontal/traseira e lábios nas juntas.
Difusores planos acompanham as laterais. RGB controla as faixas, o aro e os
emblemas. O scroll começa parado e respeita movimento reduzido.

```bash
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-visualizador.js" mouse-gamer.html
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-mouse-gamer.js"
node "Como Reinventar o Computador do Zero/_arquivos/modelos-3d/_qa-deitado.js" "http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/mouse-gamer.html" --pecas
```

O teste específico confere RGB, início/parada do scroll, seleção pela geometria,
oito isolamentos, vistas, abertura, PNG, tela cheia, desktop 1024, celular 384×686
com toque, arraste e pinça, além de movimento reduzido. Testa também 894 raios
contra a carcaça montada para detectar frestas que exponham o interior e captura
as duas laterais, a frente e a traseira para revisão visual das juntas. Capturas em
`%TEMP%/mouse-gamer-final/`; aceita `QA_OUT` e `MODELOS_URL`.

O novo modo `--pecas` do `_qa-deitado.js` usa os seletores do visualizador comum
e verifica a rotação, largura do palco e posição do painel em cinco telefones,
além de paisagem e desktop. O modo original dos ábacos continua sem essa opção.
Para atualizar a miniatura, execute o primeiro comando com `--thumb`.

## Teclado gamer

`teclado-gamer.html` reúne oito conjuntos: teclas, switches, placa de suporte,
moldura, PCB, base, apoio de pulso e cabo. As 87 posições orientam os recortes e
os mecanismos; teclas ocas têm encaixes em cruz e legendas presas à superfície.
RGB liga/desliga e `Demonstrar teclas` mostra o curso de WASD, espaço, Enter e Esc.

```bash
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-visualizador.js" teclado-gamer.html
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-teclado-gamer.js"
node "Como Reinventar o Computador do Zero/_arquivos/modelos-3d/_qa-deitado.js" "http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/teclado-gamer.html" --pecas
```

O teste específico verifica os tampos/versos das 87 teclas por interseção de
raios, ausência de chapa nos 87 vazados e fechamento das laterais. Confere
animação/retorno das teclas e legendas, RGB, clique/toque na tecla W, oito
isolamentos, vistas, desmontagem, PNG, tela cheia e desktop 1024. No celular
384×686 testa o palco girado, painel, arraste e pinça; verifica movimento
reduzido. Capturas em `%TEMP%/teclado-gamer-final/`, incluindo versos das teclas
e PCB. Aceita `QA_OUT` e `MODELOS_URL`. Para a miniatura, use o QA genérico com
`teclado-gamer.html --thumb`.

## Monitor gamer

`monitor-gamer.html` tem nove conjuntos: moldura, painel, iluminação, chassi,
placas, carcaça traseira, coluna, base e cabos. O painel plano tem proporção
16:9; tela e RGB traseiro possuem controles separados. As seis entradas ficam
fora da área da coluna, com janelas vazadas na tampa. A adaptação ao celular
usa `_visualizador-pecas-mobile.js/css`, extraída do padrão dos periféricos.

```bash
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-visualizador.js" monitor-gamer.html
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-monitor-gamer.js"
node "Como Reinventar o Computador do Zero/_arquivos/modelos-3d/_qa-deitado.js" "http://127.0.0.1:8777/Como%20Reinventar%20o%20Computador%20do%20Zero/_arquivos/modelos-3d/monitor-gamer.html" --pecas
```

O teste específico verifica a proporção do painel, os recortes das seis portas,
a ausência da coluna na frente delas, o fechamento da carcaça e a passagem de
cabos por interseção de raios. Testa tela/RGB, clique/toque no painel, os nove
isolamentos, cinco vistas, montagem, PNG, tela cheia e desktop 1024. No celular
384×686 confere toque, painel lateral, arraste e pinça; testa também movimento
reduzido. Capturas em `%TEMP%/monitor-gamer-final/`, incluindo os versos da placa
e da tampa e a vista lateral das camadas abertas. Aceita `QA_OUT` e `MODELOS_URL`.
Para a miniatura, use o QA genérico com `monitor-gamer.html --thumb`.

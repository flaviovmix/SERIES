## Etapa 2: A base da animação, sem clonar

**Objetivo:** um episódio novo nasce da base, não da cópia do episódio anterior, e o arquivo construído sai por um comando.

Os modelos 3D já fizeram esse caminho: `_base-modelo-3d.css` e `_base-modelo-3d.js` em `_arquivos\modelos-3d\`, e máquina nova herda o painel, o teclado e o embed de graça. As 15 animações de episódio não: cada `animacao.html` é uma cópia da anterior com base64 dentro, e a mesma correção (o `replaceAll` do embutidor, o CSS de celular, a tela 0 do modelo) foi feita ou ficou faltando uma pasta de cada vez. O plano da série já decidiu que boa parte dos publicados vai ser refeita: é a hora de refazer em cima de uma base, não de mais uma cópia.

Tarefas:
- **Levantamento registrado antes da primeira edição**: abrir as 15 animações e listar o que repete (telas com botão Próximo e contador, reveal, pranchas 2x2 com legenda e selo, lightbox, card 3D e tela 0, marcação `data-reusa`, CSS de 360px, setas do teclado) e o que é de cada episódio (as práticas interativas, o conteúdo das telas).
- **Tokens num arquivo só**: a paleta da série, espaçamentos, raios, sombras, cor dos dois selos (`--flag`, `--ok`). Cor de texto já medida em contraste AA.
- **CSS por componente e JS espelhando o CSS**: `telas.css`/`telas.js`, `pranchas.css`, `lightbox.css`/`lightbox.js`, `modelo-3d-embutido.js`, na pasta `_arquivos\base-animacao\`. Quem abre `lightbox.css` vê o lightbox inteiro e só o lightbox. Cabeçalho de 2 linhas em cada arquivo dizendo o que ele é e de que depende na ordem de carga.
- **Fonte e construído, separados de vez** (D* da Etapa 0): o episódio tem uma fonte sem base64 que referencia a base e as imagens por caminho; um script só (`constroi-animacao.js`, juntando `embute-imagens.js` e `embute-modelo-3d.js`) gera a `animacao.html` autocontida que vai pro Nexus. Fonte se edita; construído se gera. Resolver a P4 aqui.
- **Acessibilidade na base**: foco visível em tudo que recebe Tab, os botões alcançáveis pelo teclado (as setas já existem, o Tab também precisa), texto alternativo em toda prancha, enfeite escondido do leitor de tela, `prefers-reduced-motion` com duração ~0 e nunca `animation: none` (o reveal por opacidade ficaria invisível pra sempre).
- **Régua de 4 tamanhos na base** (`3-reguas-de-validacao`): a base é o único lugar onde o 360px precisa ser resolvido; episódio que herda não repete a media query.
- **Orçamento de peso escrito no plano**: o construído carrega toda imagem em base64, e imagem repetida em duas telas já pesa duas vezes se não usar `data-reusa`. Escrever o teto de uma `animacao.html` e da maior imagem, em número, e o script de construir avisa quando estourar.
- **Regra do terceiro clone, aplicada antes do clone**: prática interativa que aparecer pela terceira vez (o "aperte e veja", o quiz de duas opções) vira componente da base.
- **Dívida registrada**: os 15 publicados continuam como estão até serem refeitos; migração não é tarefa desta etapa. Escrever a lista dos que ficaram na cópia antiga.
- A régua de legibilidade (`1-formato-do-plano`, item 10) no diff desta etapa: função com uma responsabilidade, nome que dispensa comentário, HTML semântico.

---

**Pronto quando:** um episódio novo é montado da base sem copiar nada de outro episódio, `node constroi-animacao.js "<pasta>"` gera o construído que abre igual no navegador, mudar o lightbox é edição em um arquivo só, e uma animação da base passa com nota 100 de acessibilidade no Lighthouse com o peso dentro do orçamento escrito.

**Desvios registrados:**

- (30/08/2026) **Não existe mais construído, base64 nem embutidor.** Motivo: na sessão do ábaco de 29-30/08 o dono decidiu que o site substitui as notas do Nexus (D1 no `plano.md`) e a animação é sempre servida. Com isso a tarefa "fonte e construído, separados de vez" e o `constroi-animacao.js` caem: **a fonte é o entregável**, imagem entra por caminho (`img/...`), o modelo 3D entra por `data-src` no iframe (`../../_arquivos/modelos-3d/abaco.html`) e o áudio por `src` relativo. Os `embute-imagens.js` e `embute-modelo-3d.js` ficam em `_arquivos\scripts\` só até o último episódio antigo ser refeito; depois são lixo. A P4 se resolve por consequência (ver `plano.md`).
- (30/08/2026) **A base mora no site, não em `_arquivos\base-animacao\`.** `site/css/animacao/` e `site/js/animacao/`, um arquivo por componente, no padrão que `site/css/` já usa (cabeçalho de 2 linhas: o que é e de que depende). Motivo: a animação é uma página do site e herda `css/tokens.css` e `css/base.css` dele (paleta, tema escuro, foco visível, `prefers-reduced-motion`), em vez de repetir a paleta. Os modelos 3D continuam com a base deles em `_arquivos\modelos-3d\`.
- (30/08/2026) **Executado direto, a pedido do dono** (prompt pronto no resumo da sessão 2026-08-30/0702), com o ábaco como primeiro consumidor. O molde de episódio novo é `_arquivos\_molde-animacao.html`.

**O que ficou (30/08/2026):**

| Base (`site/`) | O que cobre |
|---|---|
| `css/animacao/tokens.css` | `--ease`, `--largura` (teto 1920), `--accent-vivo`, os selos `--ok` e `--flag` (AA medido: 5,4:1 e 5,6:1 sobre `--surface`; versões claras no tema escuro), `--fonte-animacao`, três sombras |
| `css/animacao/telas.css` + `js/animacao/telas.js` | palco, `.step`/`.active`, reveal, títulos, as 4 variantes (capa, cena, ficha, mundo), navegação do rodapé (Anterior/Próximo, bolinhas, contador, setas do teclado); `Animacao.telas` |
| `css/animacao/cabecalho.css` | `.topo`, voltar, `.acoes`, `.btn-cabecalho` |
| `css/animacao/tocador.css` + `js/animacao/tocador.js` | tocador por cima do `<audio>`, barra com marcas, sincronia áudio→tela; `Animacao.tocador.monta({ marcadores: [{ segundo, tela }], atraso })` |
| `css/animacao/modelo-3d.css` + `js/animacao/modelo-3d.js` | iframe da capa com `data-src`, ligado só enquanto a tela dele está em cena |
| `css/animacao/pranchas.css` | `.clicavel`, `.selo`, `.cena`, `.retrato`, `.ficha`, `.mundo` |
| `css/animacao/painel.css` | `.painel`, `.legenda`, `.painel__total`, `.botoes`/`.btn-mini`, `.botoes__sep`, `.trilha`; e a variante `.painel--lado` (30/08 à tarde: legenda em cima, total à esquerda, `.painel__miolo` no centro, botões empilhados à direita, pedida pelo Flávio pro suanpan em pé) |
| `css/animacao/lightbox.css` + `js/animacao/lightbox.js` | cria o próprio DOM, liga todo `[data-abre]`, passeio em loop por tela, três animações, foco devolvido ao fechar |

| Episódio (`01 - O Ábaco/`) | O que cobre |
|---|---|
| `animacao.html` | 14 telas, conteúdo, imagens por caminho (88 KB, era 1,8 MB) |
| `abaco.css` + `abaco.js` | o ábaco desenhado e a fábrica `Animacao.criaAbaco` |
| `risco.css` + `risco.js` | a tela do risco |
| `episodio.js` | os 12 marcadores do áudio e as seis telas do ábaco (roteiros e demos) |

**Levantamento das animações publicadas (30/08/2026, por `grep`, antes da primeira edição):** 17 `animacao.html` (5 fora de `OLD\`, 12 dentro), em duas famílias. A família do ábaco (13 arquivos: os 12 de `OLD\` e o ábaco) repete `.step` com Próximo e contador, bolinhas, `reveal` com atraso escalonado, kicker/h1/h2/lede, cards da ficha, cards do fechamento, setas do teclado e uma media query de ~700px; lightbox só em 2 (ábaco novo e velho), tocador e sincronia só no ábaco novo, `data-reusa` em nenhum. A família da faísca (4 arquivos: faísca e os 3 da etapa 7) usa `.tela`, `.pranchas`/`.prancha`/`.moldura` com `tabindex` e `role=button`, `data-reusa`, lightbox próprio com setas grudadas na foto e media queries de 899/880/1240px. O que é de cada episódio: o conteúdo das telas, as práticas (ábaco, risco, e na faísca a jarra) e os marcadores do áudio. A base nasceu da família do ábaco, que é a que mais se repete; a prancha 2x2 da faísca ainda não está na base (entra quando o primeiro episódio dela for refeito, pela regra do terceiro clone só depois de ver a 2ª cópia real).

**Dívida registrada:** os 16 outros `animacao.html` continuam na cópia antiga até serem refeitos, cada um com CSS e JS dentro e (os de `OLD\`) sem lightbox: piloto 00; 01-02 O Zero; 02-01 Máquinas do Hiato; 03-01 Pascalina; 03-02 Roda de Leibniz; 03-03 Autômatos; 03-04 Caixa de Música; 03-05 Tear de Jacquard; 03-06 Máquina Analítica; 04-06 Telégrafo; 05-02 Hollerith; e, na família da faísca, 04-01 A faísca (3,7 MB), 07-01, 07-02, 07-03; mais o ábaco velho em `OLD\01\01`. Migrar é tarefa da Etapa 5.

**Orçamento de peso (30/08/2026), em número:** página (html + css + js) até **300 KB**; maior imagem até **400 KB**; todas as imagens do episódio até **3 MB**; o mp3 fica fora (é transmitido, não carregado). Quem confere é `_arquivos\scripts\pesa-episodio.js "<pasta>"`, que sai com 1 quando estoura. O ábaco mediu 84 KB de página em 20 arquivos, 1.280 KB em 11 imagens, maior 228 KB (`abaco-real.jpg`). `data-reusa` deixou de existir: imagem repetida em duas telas é o mesmo arquivo pedido duas vezes e o navegador guarda em cache.

**Deltas declarados (régua 3), tudo o mais idêntico (régua 4: caixa e propriedades computadas de todo elemento das 14 telas, iguais em 1920x1080 e 1366x768):**
1. `--ok` de `#1d8a4e` pra `#177a42` (4,4:1 não passava AA em texto pequeno).
2. Sombras dos cards unificadas em três tokens (diferenças de 2px de raio, invisíveis).
3. A animação herda o tema escuro do site (`prefers-color-scheme` e `data-theme`). Nunca foi vista no escuro: **o dono confere**.
4. Acessibilidade: todo card com `data-abre` recebe Tab e abre com Enter/Espaço; o lightbox é `role=dialog`, leva o foco pro fechar e devolve pra quem abriu; as contas do ábaco travado saem do Tab (`disabled`); as 12 marcas da barra viraram desenho (`aria-hidden`) e a barra virou `role=slider` (setas 5s, Home/End), porque 12 botões de 14px eram alvo pequeno demais; no telefone as bolinhas têm área de toque de 24px com a bolinha de 10px dentro, o que deixou o rodapé 19px mais alto só em 390px. Resultado: **Lighthouse acessibilidade 100** (celular e desktop; antes 96).
5. Crédito do card "Soroban" da tela 14 corrigido (a foto era `soroban.jpg`, Kowloonese; a legenda creditava Nicolas1981, da `soroban-2.jpg`). Registro em `img\CREDITOS.md`.
6. `'passo 0 de 4'` cravado saiu: o contador das demos sai do roteiro (dívida 5 da `_planta.md`).

**Validação (30/08/2026):** varredura Playwright das 14 telas em 1920/1600/1440/1366 e 390: sem estouro horizontal, sem rolagem no desktop, nenhuma imagem quebrada, Próximo livre (`elementFromPoint`), modelo da capa ligado só na tela 1, sem erro de JS. Passeio do lightbox: loop dentro da tela, foto única sem setas, teclado, Escape no meio do deslize, modelo 3D fora do passeio e com o canvas carregado, `src` limpo ao fechar. Sincronia: `telaDoTempo` bate nos 12 marcadores (+2s), marcas 3..14, teclado da barra e clique na marca (338,5s). Práticas: 7 riscos = 5 + 2, sem corte 7 paths; 7 cliques = 7; 3 × 24 = 72 em 6 passos com reinício; 72 na prática 2. Peso dentro do teto. Lighthouse: acessibilidade 100/100, boas práticas 96 (favicon 404, P7), performance 65/71 (P8). **Falta a régua 7:** o dono no navegador e no ouvido.

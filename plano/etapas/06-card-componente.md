## Etapa 6: O card vira componente, com a lupa e o painel das séries

**Objetivo:** todo card do `site/` sai de um lugar só (a árvore `MENU` mais um arquivo de texto dos cards), toda capa com foto abre grande com a legenda certa, página nova já nasce assim (D4), e o dono ativa ou desativa uma série num painel local, sem editar código.

**Por que agora:** são 87 cards escritos à mão em 15 páginas. A lupa existe só nos 5 do `hardware.html` (no ar desde 14/09/2026); copiar o markup nas outras 43 capas seria o terceiro clone. E o próprio `menu.js` já avisa no cabeçalho que "a lista de etapas vive em dois lugares, aqui e nos cards do hub".

**Modo:** entrega. Uma subetapa por vez, com o OK do dono entre elas. Deploy só com ordem dele, uma subetapa por deploy.

| # | Subetapa | Estado |
|---|---|---|
| 6.0 | Savepoint e decisões | ✅ 15/09/2026 |
| 6.1 | Levantamento das legendas | ✅ 15/09/2026 |
| 6.2 | O molde e o gerador, provados no `hardware.html` | ✅ 15/09/2026, 🟠 falta o dono no navegador |
| 6.3 | Hubs em pé: `computador.html` e `javaweb.html` | ✅ 15/09/2026, 🟠 falta o dono no navegador |
| 6.4 | A home deitada | ✅ 15/09/2026, 🟠 falta o dono no navegador |
| 6.5 | Páginas de etapa | ✅ 15/09/2026, 🟠 falta o dono no navegador |
| 6.6 | Extras | ✅ 15/09/2026, 🟠 falta o dono no navegador |
| 6.7 | `hardware-01.html` | não iniciada (espera a P11; fora da execução em sequência) |
| 6.8 | A D4 vira hábito | ✅ 15/09/2026 |
| 6.9 | O estado das séries, sem painel ainda | ✅ 15/09/2026, 🟠 falta o dono no navegador |
| 6.10 | O painel local das séries | não iniciada |

---

### Levantamento (14/09/2026, antes de qualquer edição)

**Os tipos de card**

| # | Tipo | Onde (cards) | Arte | Corpo | Pé |
|---|---|---|---|---|---|
| A | Em pé, hub de série | `computador.html` (11 etapas + o card Extras), `javaweb.html` (14), `hardware.html` (5) | foto, ou provisória com a pílula "Arte provisória"; número no canto | período, título, frase, resumo | contagem + botão no canto da arte ("Ver episódios", "Ver episódio", "Ouvir a etapa"), ou selo "em produção" |
| B | Deitado, home | `index.html` (6) | foto sem número | cabeça (aro com ícone, rótulo, título), resumo cortado na 3ª linha | botão "Ver a série", ou selo "em breve" |
| C | Episódio, página de etapa | `etapas/etapa-06` a `11` e `javaweb-01` (24) | foto, ou provisória | período, título, frase, resumo | "13 min · 12 telas" + botão "Abrir a animação", ou selo |
| D | Extra, hub dos extras | `extras/index.html` (18) | provisória (01 a 10) ou foto (11 a 18) | período ("analogia: ..."), título, frase, resumo; nos 08, 09 e 10, o player de áudio dentro | duração + selo ("no ar", "pra conferir", "em produção") + botão (3 rótulos diferentes) |
| E | Destaque de página só de áudio | `extras/extra-01`, `extra-02`, `etapas/hardware-01` (1 cada) | provisória | igual ao D, com player | selo "no ar", sem botão |
| F | Sem arte | `etapas/hardware-01` (5) | nenhuma | "episódio 0N", título, resumo | selo |

Total: 82 com arte (48 com foto, 34 provisórias) e 5 sem arte.

**Diferenças que já são descuido** (viram delta declarado quando o molde normalizar):
- `etapa-11.html`: as 3 artes provisórias estão sem a pílula "Arte provisória".
- Card C: o botão não tem `aria-label`; nos hubs tem.
- Oito rótulos de botão soltos ("Ver episódios", "Ver episódio", "Ouvir a etapa", "Ver extras", "Ver a série", "Abrir a animação", "Ouvir o extra", "Ouvir com as telas").
- Toda arte com foto é `aria-hidden`, menos no `hardware.html`, onde virou botão.
- Fora do card, anotado e não mexido: a seção do `extras/index.html` diz "Oito extras" e "três no ar, sete pra conferir e oito em produção", e a página tem 18.

**Onde mora o dado hoje**

| Dado | Onde |
|---|---|
| número, nome, link, "no ar ou em produção" (tem `href` ou não), episódios e extras | `MENU` do `site/js/menu.js` |
| período, frase, resumo, contagem, duração e telas, selo, rótulo do botão, imagem da capa, ícone da home | só no HTML de cada página |
| crédito da foto | espalhado: no `data-legenda` da figura na animação que usa a mesma foto ("· foto: Autor, Licença"), no `img/CREDITOS.md` (existe em só 9 pastas), no `_telas.md` de alguns episódios |
| crédito das 4 fotos `site/img/extra-11`, `12`, `16`, `17`, das 13 `.webp` de `site/img`, da `tela-01.webp` do JAVA WEB 01-02 e da `capa-ilustra.jpg` do 06-01 | em lugar nenhum (P10); as duas últimas têm cara de ilustração pelo nome, confirmar |

**A `MENU` serve pro esqueleto e não serve pro texto.** Ela diz quais cards existem, em que ordem, pra onde levam e se estão no ar. Ela não tem período, frase, resumo nem imagem. Levar esse texto pra dentro dela engordaria um arquivo que TODA animação carrega (os filmes já moram lá).

**Risco que já existe no ar:** as fotos CC BY dos hubs aparecem no card sem crédito nenhum na página. A lupa com legenda passa a dar o crédito, então esta etapa corrige isso de tabela.

---

### As opções, contra D1, D2 e D3

| Opção | D1 (a fonte é o entregável, sem construído) | D2 (o desenho mora no CSS) | D3 (`MENU` é a fonte das listas) | Busca e página sem JS | Resolve o componente? |
|---|---|---|---|---|---|
| **(a)** `amplia-capa.js` injeta lupa, clique e legenda | ✅ sem construído | ✅ | ❌ a legenda precisa vir de algum lugar: ou atributo no HTML de novo, ou um mapa dentro do JS (terceiro lugar do mesmo dado) | ✅ a lupa some sem JS, o card fica | ❌ o card continua escrito à mão |
| **(b)** gerador que escreve as páginas inteiras | ❌ **fere a D1 no pé da letra**: o `.html` vira construído e editar ele direto se perde na próxima geração | ✅ | ✅ pode ler a `MENU` | ✅ | ✅, mas reescreve 15 páginas inteiras (cabeçalho, lede, seções, aparte, o modelo 3D do extra 01), muito além do card |
| **(c)** JS monta os cards a partir dos dados | ✅ | ✅ | ✅ natural | ❌ página casca sem JS, pior pra busca; e o QA do lab não enxerga erro de JS (memória do patchright) | ✅ |
| **(d)** gerador de TRECHO | ✅ ver abaixo | ✅ | ✅ reforça: a grade sai da mesma árvore do menu | ✅ igual a hoje | ✅ |

**(d), a recomendada.** A página continua escrita à mão. Só a grade de cards fica entre dois marcadores, e um script reescreve só esse trecho:

```html
<!-- cards: computador/etapas (gerado por gera-cards.js, nao editar a mao) -->
  ...os articles...
<!-- /cards -->
```

- `gera-cards.js` lê a `MENU` (quais cards, ordem, link, estado) e o `site/dados/cards.js` (período, frase, resumo, imagem, legenda, rótulos) e escreve o trecho em HTML puro.
- `gera-cards.js --confere` não escreve nada: sai com 1 se algum trecho estiver diferente do que o dado gera, ou se página com foto não carrega `lightbox.css` e `lightbox.js`. **É ele que segura a D4**, e pra não depender de memória o `publicar.sh` (D5, subetapa 4.1) roda ele sozinho antes de copiar pro ar (entra na 6.8). Durante a migração, página que ainda não tem marcador aparece como "pendente", não como falha; quando a 6.7 fechar, a lista de pendentes precisa estar vazia.
- Sobre a D1: o HTML servido é o HTML commitado, legível, sem base64 e sem pasta de construído. O que muda é que a fonte do CARD passa a ser o dado. Isso se escreve na própria D4 como esclarecimento da D1, não como repropor.
- Preço honesto: mexer em card vira "edita o dado e roda o script". Quem editar o trecho à mão perde a edição, e o `--confere` acusa antes do deploy.

---

### Decisões que a 6.0 fecha (default declarado, o dono troca)

1. **Onde mora o texto dos cards:** `site/dados/cards.js` (módulo node, aceita comentário e o `<em>` que os resumos usam). Nenhuma página carrega; não precisa subir.
2. **Como o gerador lê a `MENU`:** hoje ela está dentro do IIFE do `menu.js`, que mexe no DOM logo na primeira linha. Default: pôr a `MENU` no topo do arquivo com uma saída pro node antes de qualquer DOM (`if (typeof module === 'object') { module.exports = MENU; return; }`). Mudança pequena, mas num arquivo que toda página e toda animação carrega. A alternativa (recortar o texto entre `var MENU = [` e `];`) é gambiarra de texto e fica recusada.
3. **Legenda em três partes:** o prefixo vem da `MENU` (`Etapa 01 · O cérebro e os sentidos`, `Extra 13 · O 8080 da Intel`, `Série · Hardware`), a descrição da foto vem do dado (`réplica do primeiro transistor`; na ilustração não tem) e o crédito fecha (`ilustração`, ou `foto: Mister rf, CC BY-SA 4.0`, o formato que as animações já usam). O `hardware.html` no ar já é assim (`Etapa 01 · O cérebro e os sentidos · ilustração`), então a 6.2 reproduz ele sem mudar nada. **Foto real sem crédito conhecido não ganha lupa** até ter crédito, e o `--confere` lista quais são.
4. **Normalizar os descuidos do levantamento** (pílula no etapa-11, `aria-label` nos botões do card C) como delta declarado.
5. **Botão, destino, rótulo e contagem saem da `MENU`; o dado só sobrescreve.** Etapa com um episódio só no ar leva direto pra `animacao.html` com "Ver episódio" e "1 de 4 episódios"; com dois ou mais, leva pra página da etapa com "Ver episódios" e "4 episódios"; sem nenhum, selo "em produção". É a regra do item 4 do checklist de episódio novo, que hoje se aplica à mão. Se o rótulo morasse no dado, quando o 2º episódio subisse o link mudaria e o "Ver episódio" ficaria errado sem o `--confere` pegar. O dado sobrescreve o que não dá pra derivar ("a etapa inteira em áudio · 13 min", "Ouvir com as telas").
6. **Selo fica no dado, e o gerador recusa contradição.** A `MENU` só sabe "tem href ou não"; o "pra conferir" dos extras 03 a 07 não existe nela. Dado dizendo "em produção" pra item que tem href na `MENU` (ou "no ar" pra item sem href) faz o gerador parar com erro, não gerar calado.
7. **A lupa leva o desenho dentro** (`<svg>` inline no card gerado), em vez de depender do sprite `#ico-lupa` no começo de cada página: uma coisa a menos que página nova precisa lembrar.
8. **Caminhos passam por `encodeURI` no gerador.** No dado o caminho vai legível (`../Como Reinventar o Computador do Zero/_REFAZER/07 - O computador encolhe/01 - O transistor/img/transistor-real.jpg`); o HTML sai com `%20` e `%C3%A1`, como hoje. Mesma regra que o `menu.js` já aplica.
9. **Na home a foto amplia ou leva pra série?** Hoje clicar na foto da home não faz nada, e quem clica numa vitrine costuma esperar ir pra série. **Fechada em 15/09/2026: leva pra série.** A foto da home vira link pro mesmo destino do botão (série sem `href` continua sem link), sem lupa e sem legenda; o crédito das fotos da home fica devendo pela P10 onde não houver.
10. **O estado da série mora em `site/dados/series.json`** (`{ "01": { "ativa": true }, ... }`), fora da `MENU`. O painel escreve só JSON, nunca edita código. O `gera-cards.js` leva o estado pra dois lugares: a grade da home e um trecho marcado no topo do `menu.js` (`/* series-ativas: gerado */ ... /* /series-ativas */`), o mesmo mecanismo de marcador da D4. Série desativada some do menu, da home e do "o que vem por aí", e os extras dela somem junto. "Em preparação" continua sendo série sem `href`, e é outra coisa: aparece como "em breve".
11. **O painel é local e não publica.** Roda só na máquina do dono (`node painel/servidor.js`, escutando só `127.0.0.1`), sem dependência de npm. Ele troca o estado e roda o `gera-cards.js`; no fim mostra os arquivos que mudaram e o comando do `sobe-arquivos.sh` pronto pra copiar. Subir continua por ordem do dono (Etapa 4). Painel online, com login, é outro projeto e fica fora: o `plano.md` diz "sem backend, sem banco, sem login".

---

### A migração, página por página

| Sub | Páginas | Cards | Fotos que ganham lupa |
|---|---|---|---|
| 6.2 | `hardware.html` | 5 | 5 (já têm; passam a ser gerados) |
| 6.3 | `computador.html`, `javaweb.html` | 26 | 8 |
| 6.4 | `index.html` | 6 | 0 (decisão 9: a foto leva pra série) |
| 6.5 | `etapas/etapa-06` a `11`, `etapas/javaweb-01` | 24 | 21 |
| 6.6 | `extras/index.html`, `extra-01`, `extra-02` | 20 | 8 |
| 6.7 | `etapas/hardware-01.html` | 6 | 0 |

A ordem: primeiro a página que já tem lupa (prova que o gerador reproduz o que está aprovado), depois o mesmo tipo em mais páginas, e só então as variantes.

### 6.0 Savepoint e decisões

- O dono fecha as 11 decisões acima e o texto da D4.
- Texto proposto da D4, que entra no `plano.md` quando a 6.0 fechar: **o card não se escreve à mão.** Toda grade de cards do `site/` sai do `gera-cards.js`, a partir da árvore `MENU` (quais cards, ordem, link e estado) e do `site/dados/cards.js` (texto, imagem e legenda de cada card); a página só marca onde a grade entra. Capa com foto nasce com a lupa e a legenda (`ilustração`, ou `foto: autor, licença`). Página nova já nasce assim, e `gera-cards.js --confere` verde é condição de deploy. Esclarece a D1: o trecho gerado é HTML puro, commitado e servido como está; não existe pasta de construído.
- **Savepoint antes de gerar qualquer coisa (P12).** O último commit do SEIRES é de 08/09, e 13 das páginas que o gerador vai reescrever já têm mudança sem commit. Sem savepoint, o diff do gerador se mistura com seis dias de trabalho de outras sessões. Commit só por ordem do dono; branch de frente `card-componente` (regra de git do `1-formato-do-plano`, item 7).
- **Pronto quando:** D4 escrita no `plano.md`, commit de savepoint feito, branch criada.
- **✅ Fechada em 15/09/2026.** Savepoint `6c3925b` na `main` (P12 resolvida) e branch `card-componente` criada. Decisões 1 e 2 aceitas pelo dono uma a uma; a conversa da 2 abriu a D5 (publicar a partir do commit, subetapa 4.1), sem mudar a 2. Decisões 3 a 8, 10 e 11 aceitas como default ("sim" à proposta de executar em sequência); **decisão 9: na home a foto leva pra série** (não amplia, sem lupa na home). D4 escrita no `plano.md`.

### 6.1 Levantamento das legendas (sem mexer em página)

- Script `levanta-legendas.js`: pra cada uma das 48 fotos, procura a mesma imagem nas animações e no `CREDITOS.md` e copia a legenda e o crédito. Sai uma tabela: arquivo, tipo (real ou ilustração), legenda, de onde veio o crédito.
- O dono diz quais das 15 imagens sem crédito são ilustração (as 13 `.webp` de `site/img`, a `tela-01.webp` e a `capa-ilustra.jpg`) e de onde vieram as 4 fotos `extra-1x` (P10).
- **Pronto quando:** a tabela tem as 48 linhas, cada uma com legenda ou com "sem crédito" explícito, e ela vira o começo do `site/dados/cards.js`.
- **✅ Fechada em 15/09/2026.** `_arquivos/scripts/levanta-legendas.js` escreve `plano/levantamento-legendas.md`. As 48 capas são **42 arquivos** (seis fotos são capa em duas páginas: a tabela tem uma linha por arquivo, com a coluna das capas), e o resultado é 24 fotos com crédito, 9 ilustrações e 9 sem crédito (P10). A comparação com as animações é por md5, não por nome: foi assim que a `extra-11-intel.jpg` apareceu como a mesma foto do 4004, e que os dois `datacenter-real.jpg` (fotos diferentes) não se misturaram. Três leituras corrigidas na conferência da tabela: a troca foto/ilustração (a legenda com "foto:" vai pra imagem `-real`), o `_telas.md` com a licença no meio, e o recorte do `CREDITOS.md` (o `transformer-169.png` empresta a legenda "diagrama" pro `transformer-real.png`). Desvio: o dono não disse quais eram ilustração (a execução em sequência combinou deixar isso pro fim); as 9 com prova foram aceitas pela prova, as 9 sem prova ficam sem lupa e na lista da P10.

### 6.2 O molde e o gerador, provados no `hardware.html`

- Decisão 2 aplicada no `menu.js`; `site/dados/cards.js` com os 5 cards; `_arquivos/scripts/gera-cards.js` com o `--confere`; os marcadores no `hardware.html`.
- Caminhos no dado são relativos à raiz do `site/` (como na `MENU`); o gerador resolve pra profundidade de cada página (`etapas/`, `extras/`).
- `qa-cards.js` novo e versionado (especificação na seção de QA).
- **Pronto quando:** `node gera-cards.js --confere` verde; `qa-cards.js` verde no `hardware.html`; a medida geométrica dos cards antes e depois é igual (régua 4), fora os deltas declarados; o dono vê no navegador e no telefone.
- **✅ Fechada em 15/09/2026, 🟠 falta o dono no navegador.** A `MENU` subiu pro topo do `menu.js`, com a saída pro node antes de qualquer linha que toque a página (decisão 2). O gerador tem uma entrada, `gera-cards.js`, e três peças (`arvore.js` lê a MENU, `grades.js` junta com o dado e recusa contradição, `molde.js` escreve o HTML do card, `trecho.js` acha e troca os marcadores). Também nasceram o `site/dados/cards.js` com os 5 cards do Hardware e o `qa-cards.js`. **Desvio:** o gerador mora numa pasta própria, `_arquivos/scripts/gera-cards/`, e não num arquivo solto, pela regra 6 do `/codigo-humanizado-e-seguro` (componente com 3 ou mais arquivos ganha pasta); o comando é `node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js"`. **Delta declarado:** a lupa leva o desenho dentro (decisão 7), e o sprite `#ico-lupa` saiu do `hardware.html`. Fora isso o trecho gerado é igual ao escrito à mão. **Provas:** `--confere` verde (14 páginas pendentes, esperado); `qa-cards.js` verde nos 5 tamanhos × 2 temas, com lightbox, Esc devolvendo o foco e Tab+Enter nas 5 artes; geometria igual à gravada antes (1px); `qa-tema-e-card.js`, `qa-menu-extras-ultimo.js` e `qa-player-site.js` verdes com a MENU no topo. A geometria de ANTES das 14 páginas foi gravada numa rodada só, antes de qualquer edição, e serve de régua 4 pras subetapas seguintes.

### 6.3 Hubs em pé: `computador.html` e `javaweb.html`

- Marcadores, dado dos 26 cards, gerar. O `computador.html` tem duas grades (as etapas e o card Extras), cada uma com o próprio marcador; o card Extras sai de `serie.extras` da `MENU`, e a contagem "18 extras" de `extras.itens.length`. Delta: lupa em 8 fotos e a decisão 5 derivando os dois botões diretos (etapas 01 e 11).
- **Pronto quando:** `--confere` e `qa-cards.js` verdes nas 3 páginas de hub; `qa-producao-site.js` segue verde; geometria igual fora a lupa; dono no navegador.
- **✅ Fechada em 15/09/2026, 🟠 falta o dono no navegador.** 26 cards no dado (12 do `computador.html`, com o card Extras, e 14 do `javaweb.html`). Lupa em **6 fotos, não 8**: as capas das etapas 01 e 06 do `computador.html` (`abaco-episodio.webp`, `etapa-06.webp`) não têm crédito conhecido e ficaram sem lupa (P10). Os botões diretos das etapas 01 e 11, o "1 de 4 episódios" e todas as contagens saíram derivados da MENU, iguais aos escritos à mão. **Deltas declarados:** os dois hubs passaram a carregar `lightbox.css` e `lightbox.js` (o `--confere` cobrou; o texto desta subetapa não previa); e saíram os comentários HTML de dentro da grade ("etapa de um episódio só: o card leva direto"), porque a regra agora mora no `arvore.js` (decisão 5). **Provas:** `--confere` verde; `qa-cards.js` verde nos 3 hubs, 5 tamanhos × 2 temas, lightbox com foco e teclado em 11 artes; geometria igual à gravada. O `qa-producao-site.js` só roda contra o ar, então fica pro deploy.

### 6.4 A home deitada

- Decisão 9 fechada: a foto vira link pra série, sem lupa. O ícone do aro segue no sprite da home (é da home, não do card).
- **Pronto quando:** `qa-home-series.js`, `qa-tema-e-card.js` e `qa-cards.js` verdes; a lupa não cobre a foto encostada na borda no deitado nem no telefone; dono no navegador.
- **✅ Fechada em 15/09/2026, 🟠 falta o dono no navegador.** 6 cards no dado, com imagem, ícone e resumo. O rótulo ("11 etapas", "Em preparação"), o botão ou o selo e o destino saem da MENU. **Decisão 9 aplicada:** nas 3 séries no ar a foto virou link pro mesmo destino do botão (`<a class="cap__arte" tabindex="-1" aria-hidden="true">`, fora do Tab e do leitor de tela, porque o botão já leva lá); nas 3 em preparação a foto continua parada. Sem lupa na home, então o item "a lupa não cobre a foto" não se aplica. **Provas:** `--confere` verde; `qa-cards.js` verde (6 cards, 5 tamanhos × 2 temas); `qa-home-series.js` e `qa-tema-e-card.js` verdes; geometria igual à gravada. De brinde, o `--confere` deixou de listar as fotos da home como "sem lupa por falta de crédito", já que na home nenhuma foto amplia.

### 6.5 Páginas de etapa

- 7 páginas. Elas não carregam o lightbox hoje: entram `lightbox.css` e `lightbox.js` no cabeçalho e no fim (parte escrita à mão; o `--confere` cobra). Deltas: `aria-label` nos botões e a pílula no etapa-11.
- **Pronto quando:** `--confere` e `qa-cards.js` verdes nas 7; dono no navegador.
- **✅ Fechada em 15/09/2026, 🟠 falta o dono no navegador.** 24 cards de episódio no dado e 21 fotos com lupa (toda capa de episódio tem crédito). As 7 páginas passaram a carregar `lightbox.css` e `lightbox.js`. **Deltas declarados:** os dois do levantamento (`aria-label` nos botões "Abrir a animação" e a pílula "Arte provisória" nos episódios 02 a 04 do `etapa-11.html`), e o rótulo da lupa agora diz "foto", "arte" ou "imagem" conforme o crédito (diagrama e manual viram "imagem", em vez de "foto"). **Provas:** `--confere` verde; `qa-cards.js` verde nas 7 páginas, 5 tamanhos × 2 temas, lightbox com foco e teclado em 21 artes; geometria igual à gravada (21 medidas).

### 6.6 Extras

- O molde ganha o player dentro do card (08, 09, 10 e o destaque dos extras 01 e 02, que dependem do `audio.js`).
- O dono decide se o texto "Oito extras" da seção se corrige junto (fora do card).
- **Pronto quando:** `--confere`, `qa-cards.js` e `qa-player-site.js` verdes; dono no navegador.
- **✅ Fechada em 15/09/2026, 🟠 falta o dono no navegador.** 18 cards no hub e os destaques dos extras 01 e 02 (tipo `destaque-do-extra`). O molde ganhou o player dentro do card (08, 09, 10 e os dois destaques), e o gerador para se o selo contradiz a MENU (decisão 6). Lupa em 5 fotos; a 12 (IBM), a 16 (Microsoft) e a 17 (BASIC) ficam sem crédito e sem lupa (P10). A `extra-11-intel.jpg` ganhou o crédito do 4004, porque é a mesma foto. O `extras/index.html` passou a carregar o lightbox. **Deltas:** o comentário "11 a 16: encomenda de 06/09" saiu da página e mora no `cards.js`; o endereço do áudio do extra 08 passou a ir inteiro codificado (antes ia meio codificado). **Não mexido, fica pro dono:** a seção do hub ainda diz "Oito extras" e "três no ar, sete pra conferir e oito em produção", e a página tem 18 (texto fora do card). **Provas:** `--confere` verde, com só o `hardware-01.html` pendente (a 6.7); `qa-cards.js` verde nas 3 páginas, lightbox em 5 artes; geometria igual (9 medidas); `qa-player-site.js` verde, com o áudio do extra 08 tocando pelo endereço novo.

### 6.7 `hardware-01.html`

- **Espera o dono** decidir a mudança local sem OK que já está nesse arquivo (P11). Só depois entram o destaque E e os 5 cards sem arte F.

### 6.8 A D4 vira hábito

- `feedback_serie_episodio_novo_checklist`, item 4: sai "o botão do card aponta direto", entra "o episódio entra na `MENU` e no `cards.js`, e roda `gera-cards.js`".
- O `publicar.sh` da 4.1 roda `gera-cards.js --confere` sozinho antes de copiar pro ar, e para se ele sair com 1: a D4 vira ferramenta, não lembrança. (Era o `sobe-arquivos.sh`; mudou com a D5 em 15/09.)
- `LEIA-ME-qa.md`: `gera-cards.js` e `qa-cards.js` na tabela; a rotina de deploy vira commit → merge na `main` por ordem → `publicar.sh` (com o `--confere` dentro) → QA no ar.
- Anotado, não mexido: o `gera-cards.js` mora em `Como Reinventar o Computador do Zero/_arquivos/scripts/`, pasta de uma série só, enquanto o site cobre três. Segue o padrão dos scripts de deploy que já estão lá; mudar de pasta é outra conversa.
- `menu.js`: sai o aviso "a lista vive em dois lugares".
- `.claude/components/card-img-fixa.md`: aponta o molde do gerador como fonte de verdade e ganha a variante em pé.
- **Pronto quando:** numa cópia de teste, uma etapa inventada entra só no dado e aparece no hub com lupa depois de rodar o gerador; e um card editado à mão faz o `--confere` sair com 1.
- **✅ Fechada em 15/09/2026.** O item 4 do checklist de episódio novo (memória) agora diz: o episódio entra na MENU e no `cards.js`, e roda o gerador. O `--confere` entrou no `sobe-arquivos.sh`: se a lista tem página do `site/` e ele reprova, a subida para. O `LEIA-ME-qa.md` ganhou o gerador, o `qa-cards.js`, o `qa-gera-cards.js` e a seção "Os cards do site". Do `menu.js` saiu o aviso "a lista vive em dois lugares". O `card-img-fixa.md` aponta o gerador como fonte do HTML e ganhou a variante em pé com lupa e a foto que leva pra página. **Prova, versionada:** `qa-gera-cards.js`, numa cópia do site na pasta temporária. Nela, uma etapa inventada entra só na MENU e no `cards.js` e aparece no hub com lupa e botão derivado, e um card editado à mão faz o `--confere` sair com 1. Três recusas (card sem item, selo contraditório, contagem que a MENU já deriva) param o gerador sem escrever nada. **Desvio:** a trava foi pro `sobe-arquivos.sh`, que é o deploy de hoje, e não pro `publicar.sh`, que só nasce na 4.1; a 4.1 leva a trava junto. **Achado:** outra sessão mexia no `LEIA-ME-qa.md` ao mesmo tempo (seção "Pendrive USB"), e só os trechos desta subetapa entraram no commit.

### 6.9 O estado das séries, sem painel ainda

- `site/dados/series.json` nasce com as 6 séries ativas: nada muda no ar.
- O `gera-cards.js` escreve o trecho `series-ativas` no topo do `menu.js` e deixa de fora da grade da home a série desativada. O `menu.js` monta a árvore só com as ativas (decisão 10). O `--confere` passa a cobrar também esse trecho.
- A página de uma série desativada continua abrindo por link direto: o site é estático, e bloquear de verdade é regra no nginx do container `serie` (P13).
- **Pronto quando:** numa série de teste, `"ativa": false` escrito à mão no JSON e o gerador rodado fazem ela sumir do menu (no site e numa animação) e da home, e voltar ao contrário; `qa-series-ativas.js` (novo, aceita `ar`) prova os dois sentidos; com todas ativas, o `menu.js` e a home geram iguais aos de hoje (régua 3); dono no navegador.
- **✅ Fechada em 15/09/2026, 🟠 falta o dono no navegador.** O `site/dados/series.json` nasceu com as 6 séries ligadas. O gerador ganhou a peça `series-ativas.js`, que lê e confere o JSON (só série da MENU, toda série com estado, "ativa" só verdadeiro ou falso) e escreve a lista `SERIES_ATIVAS` no trecho marcado do topo do `menu.js`; a home deixa de fora a série desligada. O `menu.js` monta a árvore só com as ligadas, e o voltar continua olhando a árvore inteira, porque a página de uma série desligada ainda abre por link (P13). O `--confere` passou a cobrar esse trecho também. **Provas:** o `qa-series-ativas.js` (novo, aceita `ar`) testa três situações. Com tudo ligado, toda série aparece na home, no menu do site e no menu da animação. Com a série 03 desligada, ela some dos três. Religada, ela volta, e o `series.json`, o `menu.js` e o `index.html` ficam byte a byte iguais aos de antes. Régua 3: com tudo ligado seguem verdes `qa-menu-extras-ultimo.js`, `qa-tema-e-card.js`, `qa-home-series.js`, a geometria da home, `qa-gera-cards.js` e `--confere`.

### 6.10 O painel local das séries

**A pasta** (regra 6 do `/codigo-humanizado-e-seguro`: uma pasta por parte do código, irmãos juntos), na raiz do SEIRES, fora do `site/`, então nunca sobe:

```
painel/
  servidor.js    o servidor local: as duas rotas, a validação e a chamada do gerador
  painel.html    a página: a lista de séries com a chave de cada uma
  painel.css     o desenho, com os tokens do site/css/tokens.css (D2)
  painel.js      a chave, o salvar e o aviso do resultado
  LEIA-ME.md     como abrir, e o que ele NÃO faz (não publica, não bloqueia link)
```

**Humanizado:**
- Função com uma responsabilidade que dá pra nomear e até umas 30 linhas: `lerEstadoDasSeries`, `validarPedido`, `gravarEstado`, `rodarGerador`, `listarArquivosQueMudaram`. Nome em português, como o resto do site.
- HTML semântico: `<main>`, `<form>`, `<fieldset>`; cada série é um `<input type="checkbox" role="switch">` com `<label>` de verdade; salvar é `<button>`; o resultado aparece num `role="status"` junto do botão, não num canto da tela.
- CSS por componente, e o JS com o mesmo mapa do CSS. Teclado e leitor de tela alcançam tudo.

**Seguro** (regra 8, no boundary):
- Escuta só `127.0.0.1`, nunca `0.0.0.0`: ninguém da rede alcança o painel.
- Recusa pedido com `Host` diferente de `127.0.0.1:<porta>` ou `localhost:<porta>`. É o que impede um site qualquer aberto no navegador de falar com o painel por DNS rebinding.
- Toda gravação exige `Origin` igual à do painel e um token aleatório criado cada vez que o servidor sobe (contra CSRF), comparado com `crypto.timingSafeEqual`.
- Entrada validada antes de qualquer coisa: corpo até 4 KB, JSON válido, só id de série que existe na `MENU` (lista fechada) e só `true` ou `false`. O resto volta 400 dizendo o que falhou.
- Nada de shell: o gerador roda por `execFile('node', [caminho fixo])`, sem `exec`, sem string montada e sem argumento vindo do pedido.
- Nome de série entra na tela por `textContent`, nunca por `innerHTML`.
- Grava num arquivo temporário e renomeia, então o JSON nunca fica pela metade; se o gerador falhar, o JSON volta ao que era e a tela diz o erro.
- Menor privilégio: o painel lê a `MENU` e escreve só o `site/dados/series.json`; quem mexe em página é o gerador. Nenhuma chave ssh, nenhum deploy, nenhum segredo no código.
- Sem npm: só o que vem no próprio node (`http`, `fs`, `crypto`, `child_process`). Zero dependência de terceiro pra vigiar.

**Pronto quando:**
- Desativar e reativar uma série pelo painel muda o `series.json`, roda o gerador, e a série some e volta no menu e na home locais; o painel mostra os arquivos que mudaram e o comando de subir.
- `qa-painel-series.js` (novo) prova as recusas: pedido sem token, `Origin` estranha, `Host` estranho, id inventado, valor que não é booleano e corpo gigante voltam recusados; o pedido certo passa; nada responde fora do `127.0.0.1`.
- A régua do `/codigo-humanizado-e-seguro` passou no diff da subetapa (item 10 do `1-formato-do-plano`), e o `/revisao` (security-review + code-review) rodou no `painel/`, com cada achado corrigido ou escrito como `P*`.
- O dono usou no navegador.

---

### QA (`qa-cards.js`, aceita `ar`)

- Playwright do cache do npx, não patchright. Se precisar do patchright, `page.evaluate(fn, undefined, false)` pra ler variável global da página. Erro de JS anotado por `addInitScript` (`window.__erros`), não por `pageerror`.
- Toda `.cap__arte--arte` tem `data-abre="foto"`, `data-legenda` não vazia, `aria-label` e `.cap__lupa`. Legenda de foto real tem "foto:" ou "domínio público"; "ilustração" só onde o dado diz.
- Clique na arte abre `.lightbox.aberta` com a mesma imagem e a mesma legenda; Escape fecha e o foco volta pra arte; Tab chega na arte e Enter abre.
- Régua 2: `elementFromPoint` no centro do botão (canto de cima) e da lupa (canto de baixo) responde o próprio alvo, inclusive no card baixo do telefone.
- Régua 1 (3840, 1920, 768, 360) mais o telefone do dono (384x686), tema claro e escuro, estouro medido elemento por elemento.
- Página com foto que não carrega o `lightbox.js` reprova.
- Antes de cada subetapa, uma rodada grava a geometria dos cards de hoje; depois de gerar, compara (régua 4).

### Deploy (em cada subetapa, só com ordem)

Desde a D5 (15/09), o deploy é o da subetapa 4.1: commit na `card-componente`, merge na `main` por ordem do dono, `ssh server 'bash serie/publicar.sh'` (o `--confere` roda dentro), depois o QA no ar do passo 5. A 4.1 roda antes da 6.2, então os passos 1, 3 e 4 abaixo só valem se ela atrasar. Com o `publicar.sh`, o `site/dados/cards.js` sobe junto com o resto do repo: não custa nada, nenhuma página carrega ele.

1. `bash inventario-site.sh`: comparar com o ar ANTES, porque outras sessões mexem no site.
2. `node gera-cards.js --confere` verde.
3. `bash revisa-diferencas.sh` nos arquivos da subetapa. O `menu.js` (6.2) e o `index.html` (6.4) podem carregar série ainda não publicada: conferir o diff antes de subir inteiros.
4. `bash sobe-arquivos.sh` só com as páginas da subetapa, css e js antes de html. **Nunca o `etapas/hardware-01.html`** até a P11 fechar. O `site/dados/cards.js` não sobe.
5. QA no ar: `node qa-cards.js ar`, `qa-producao-site.js ar`, `qa-tema-e-card.js ar`.

---

**Pronto quando:** as 11 subetapas fechadas; `gera-cards.js --confere` verde com as 15 páginas migradas; as 48 fotos no ar abrem grandes com legenda (ou estão listadas como sem crédito na P10); uma página nova de teste nasce com o card gerado e a lupa, sem copiar markup de outra página; e o dono desativa e reativa uma série pelo painel local, com o `qa-painel-series.js` verde.

**Desvios registrados:**
- (14/09/2026) Entra como Etapa 6 por ordem de chegada e roda antes das 0, 1, 3 e 5, por pedido do dono ("vamos seguir o plano"). Não é subetapa da 2 porque a 2 é a base das animações, e o card é página do site.
- (15/09/2026) Entra o painel das séries (6.9 e 6.10), a pedido do dono ("então já deixa o painel no plano também com o código humanizado e seguro"). Fica no fim porque depende do gerador pronto: o estado da série só vale se quem monta menu e home for o `gera-cards.js`.
- (15/09/2026) **Desvio de método, a pedido do dono ("pode executar todas as etapas?" → "sim"):** da 6.1 à 6.10 executadas em sequência na mesma sessão, sem o OK dele entre elas. Compensação escrita: cada subetapa fecha com QA por script, régua de legibilidade no diff e commit próprio na `card-componente` (sem push), e fica **🟠 "falta o dono no navegador"** até ele validar a lista entregue no fim (régua 7). Fora do pedido: a 6.7 (espera a P11), a 4.1 e qualquer deploy.
- (15/09/2026) Na 6.0, ao alinhar a decisão 2, o dono pediu o deploy igual ao do KIDS: virou a D5 e a subetapa 4.1 da Etapa 4, que roda antes do primeiro deploy desta etapa. A decisão 2 não mudou. Efeito aqui: a 6.8 e a seção Deploy apontam pro `publicar.sh` em vez do `sobe-arquivos.sh`, e o `hardware-01.html` da P11 já está na `main` pelo savepoint, então a P11 fecha na 4.1.

# Prompt: nasce uma série nova no SEIRES

Cole isto no começo de uma sessão, com o bloco **DADOS DA SÉRIE** (seção 11) preenchido
do jeito que der. O que faltar vira pendência com recomendação, não vira invenção minha.

---

## 0. O que você está pedindo

Uma série nova não é "escrever episódios". É montar, nesta ordem, **o plano que decide
o que a série é** e só depois a primeira peça publicável. O plano vem antes do episódio
porque cada episódio herda dele o objeto, a voz, o que não pode ser dito e o formato da
tela. Série que começa pelo episódio piloto sai com 12 telas por imitação e com
decisão nenhuma escrita.

Entregável final da primeira sessão: **o plano da série em `.md` + o HTML gerado dele +
a pasta e o card no site (desligado)**. O piloto é a sessão seguinte, a não ser que eu
diga o contrário.

---

## 1. Contexto fixo do projeto (não perguntar, já é assim)

- **Repositório:** `C:\src\PROJETOS\SEIRES`, dentro do repo `c:\src`. Site estático,
  sem backend e sem banco: o site é arquivo.
- **Endereço:** `series.afx.art.br`. Publica **a partir de um commit da `main`**, nunca
  da pasta de trabalho.
- **Séries que já existem:** *Como Reinventar o Computador do Zero* (1ª, a que guarda a
  base e os scripts), *JAVA WEB* (2ª), *HARDWARE* (3ª), *Finanças* (4ª, em preparação).
  A nova entra como a próxima.
- **A receita operacional de todas hoje:** `HARDWARE/plano/_COMO-FAZER.md` (episódio
  público, página com áudio, subir um pedaço do site, pegadinhas do NotebookLM). Ler
  antes de executar qualquer coisa, e seguir seção por seção.
- **Os moldes** (copiar destes, NUNCA de um episódio pronto):
  `Como Reinventar o Computador do Zero/_arquivos/_molde-planta.md`,
  `_molde-roteiro.txt` e `_molde-animacao.html`.
- **Os scripts de deploy e QA de todas as séries** moram em
  `Como Reinventar o Computador do Zero/_arquivos/scripts/`, explicados no
  `LEIA-ME-qa.md` de lá.
- **Modo de trabalho:** default. Discutir e propor antes de executar, uma etapa por vez,
  esperando OK entre elas. Só entra em execução corrida se eu disser `/produtivo`.

---

## 2. Etapa 0: as perguntas de abertura

Antes de escrever uma linha do plano, me trazer estas perguntas juntas, em uma leva só,
com a **sua recomendação em cada uma**. Perguntar de novo, uma a uma, ao longo da
sessão, é o jeito errado.

1. **A tese em uma frase.** O que essa série afirma que o ouvinte não sabia.
2. **O objeto único que atravessa tudo.** O que é o equivalente da caixa d'água da
   Hardware e do cofrinho da Finanças: uma coisa que melhora de etapa em etapa e nunca
   some. Série sem isso vira coletânea de assuntos soltos.
3. **A fonte.** Pesquisa pública com fonte primária? Estudo meu? Material pago (e aí
   vale a regra dura: nada dele na série)? As três coisas mudam o plano inteiro.
4. **Tem indício proibido?** Material pago, conteúdo privado, dado de cliente, nome de
   empresa real, papel negociado hoje. Se tiver, isso vira a D1 da série, não um
   lembrete no meio do texto.
5. **Quantas etapas e qual o fim.** O plano precisa saber onde a série termina, senão o
   arco não fecha e não dá pra escrever o "Fecha quando" de cada etapa.
6. **O formato de cada episódio.** Animação com telas que viram sozinhas? Tela que se
   mexe (widget)? Modelo 3D? Episódio `00` só de áudio por etapa e um da série inteira?
   Extras?
7. **Nome da série e posição do card na home.** Os dois são meus, não seus. Enquanto eu
   não decidir, viram P1 e P2 com um nome provisório declarado como provisório.
8. **Risco legal ou ético.** Saúde, dinheiro, direito, criança. Se tiver, a série ganha
   uma régua de linguagem escrita no plano (a de Finanças é o modelo: "educação, nunca
   recomendação", com a lista do que não se pode dizer).

**Regra de decisão:** o que eu responder vira **decisão `D*` com data**. O que eu não
responder vira **pendência `P*` com a sua recomendação escrita**, e o plano diz, no
cabeçalho, quais decisões são minhas e quais são proposta sua. Nunca assumir silêncio
como aprovação.

---

## 3. Etapa 1: a pesquisa inicial (só se a série afirma fato do mundo)

Arquivo: `<SERIE>/plano/serie/_pesquisa-inicial.md`. Feito **antes da planta de qualquer
episódio**, por agentes com busca na web, em paralelo, um por eixo do assunto.

Formato, igual ao da Finanças:

- Tabelas por eixo, com as colunas `Assunto | Fato | Fonte | Primária`.
- **Fonte primária lida de verdade.** Se só deu pra ler o trecho do buscador, dizer isso
  dentro da célula. Se a fonte oficial não abriu, dizer qual e por quê.
- Cada fato com **data** (da norma, da página, da publicação).
- Seção **"Não confirmado"**: tudo que não fechou em fonte nenhuma. Isso não entra no
  áudio, entra nesta lista.
- Seção **"Alertas: o que a série não pode dizer"**, em frases no imperativo negativo
  ("NÃO dizer que..."). É esta seção que vira régua do verificador depois.
- Fato que só existe em fonte secundária entra **dito** ("segundo a reportagem de 1989"),
  nunca como fato seco.

Sem esta etapa, a série começa com um erro de conteúdo que só aparece depois de gravado.

---

## 4. Etapa 2: o plano da série (o arquivo principal)

Caminho: `<SERIE>/plano/serie/plano-da-serie.md`. Um arquivo só (série não nasce do molde
de projeto; o plano dela é um documento único). A ordem das seções abaixo é obrigatória
porque **o gerador de HTML lê por ela**.

### 4.1 Cabeçalho de estado

Começa por `# Série: <Nome>` e um bloco **Estado (DD/MM/AAAA)** em linhas soltas, dizendo
sem maquiagem o que existe e o que não existe: o que está no ar, o que tem trio mas não
tem áudio, quantos episódios não têm nada, e **quais decisões são minhas e quais são
proposta sua**. Depois, quatro linhas fixas:

- **Formato:** como cada episódio se faz (trio NotebookLM via `/criar-podcast`,
  `animacao.html` do molde, tela que se mexe, episódios `00` só de áudio).
- **Fonte:** de onde vem o conteúdo, e o que fica fora.
- **Capa:** caminho do `.webp` no `site/img/` e onde moram original e prompt.
- **Artes das N etapas:** caminhos `site/img/<serie>-etapa-NN.webp`, 1200x670.
- **Como fazer cada coisa:** apontar pro `_COMO-FAZER.md` que vale pra ela.

### 4.2 A tese

Dois ou três parágrafos. O que a série afirma, por que o assunto é o mesmo por dentro em
lugares diferentes, e a frase que todo episódio repete no fim ("todo episódio fecha
dizendo **onde aquilo aparece** fora da bancada / fora da tela").

### 4.3 Quem está na bancada

- **Professor:** o Claude, e como ele se comporta (mostra o problema antes da peça,
  mostra a conta antes da regra, não entrega pronto o que eu tenho que montar).
- **Aluno:** eu, e de onde vêm as dúvidas que viram roteiro.
- **O objeto:** o que ele é e **o que ele ganha em cada etapa**, em uma linha por etapa.

### 4.4 Arco da série

Uma **pergunta única** em negrito que atravessa tudo, e em seguida as **"Regras que
seguram tudo"**, numeradas. Cada regra diz se é **herdada** de outra série (com a D de
origem) ou **proposta** (com a P que ela depende). O conjunto mínimo herdado:

1. O mesmo objeto do começo ao fim; etapa que não melhorou o objeto está errada.
2. A tela se mexe (pelo menos uma coisa interativa por episódio), com dado que não muda
   sozinho: semente fixa, o estado inicial é o que o áudio descreve.
3. Todo episódio diz onde aquilo aparece fora da tela.
4. Extras são aprofundamentos autocontidos, cada um dizendo depois de qual ponto vale
   ouvir.
5. O áudio chama os extras pelo nome (D9 da Hardware), sem abrir o assunto ali.
6. Extra diz quem descobriu (D10 da Hardware), com fonte primária antes de gravar.
7. Regra, número e norma saem com data e fonte.

### 4.5 A tabela das etapas

```
| # | Etapa | O que <o objeto> ganha | Eps | Status |
```

Logo abaixo, a legenda `🔴 não iniciado · 🟠 parcial · 🟢 tudo publicado` e a linha
**`**Placar:** N publicados · N pela frente (fora os extras)`**, que o gerador lê.

### 4.6 Uma seção por etapa

Título exatamente `## Etapa N - Nome` (o gerador casa esse formato). Dentro:

- Uma linha em itálico dizendo o que a etapa é.
- A tabela dos episódios: `| Pasta | Episódio | O que cobre | Status |` (e uma coluna
  `Aula` quando a série nasce de um estudo meu). A coluna Pasta vem como `` `01` ``,
  `` `02` ``: é assim que o gerador acha a linha.
- A nota do episódio `00 - A etapa inteira`, quando a série tem.
- **Fecha quando:** o critério objetivo de pronto da etapa.
- **Aparece em:** onde aquilo existe no mundo real.

### 4.7 `## _EXTRAS`

Tabela `| Pasta | Extra | Aprofunda | Ouvir depois de | Status |`, tratada pelo gerador
como etapa fora da linha do tempo. Abaixo dela, quais extras o áudio de cada etapa já
promete, e **quais repetem extra de outra série** (repetido não se faz de novo: se usa o
de lá, e isso vira pendência esperando minha decisão).

### 4.8 `## Ouvir antes, das outras séries`

Episódios já no ar que preparam o terreno. São **links, não cópias**.

### 4.9 `## Regras de produção`

O caminho de fábrica: trio do NotebookLM com a regra dura das telas, áudio antes da
animação, `mapa-de-telas.py` e `marcadores-do-mapa.py`, animação nascendo do
`_molde-animacao.html`, toda tela com imagem 16:9, Flow em modo **Imagem** (vídeo gasta
crédito e é o modo padrão da barra), onde ficam as pastas e as páginas, e o que **não**
entra na página pública.

### 4.10 `## Decisões da série`

`**D1.** (DD/MM/AAAA) **Título curto.** Texto.` Uma por decisão, com data. Decisão é
travada: se a realidade mudar, entra uma **D nova** e a antiga fica registrada como
trocada. Nunca reescrever a antiga.

### 4.11 `## Pendências`

`**P1.** **Título.** O que falta, a sua recomendação e o que trava.` Resolvida vira
`~~P1~~` com a data e o desfecho, e **fica no arquivo**. As que quase toda série tem no
nascimento: nome (P1), posição do card (P2), capa (P3), arte das etapas, e a primeira
decisão de formato que só se resolve tentando.

### 4.12 As três regras duras do arquivo

- **Nenhum status escrito em prosa.** Status mora só na coluna Status, em emoji. O
  gerador lê de lá e escrever à mão cria duas verdades.
- **Sem em-dash.** Nem no plano, nem nos roteiros.
- **Nome de pasta é `"NN - Nome"`**, sem rótulo na frente, e as pastas novas nascem **sem
  acento**.

---

## 5. Etapa 3: gerar o HTML do plano

```bash
python C:\src\PROJETOS\_plano-html\gerar-plano-serie.py "C:\src\PROJETOS\SEIRES\<SERIE>\plano\serie"
```

Sai `plano-visao.html` (índice, placar), `plano-completo.html` (tudo numa página, pra
Ctrl+F), `plano-etapas/etapa-NN.html`, `extras.html`, `regras.html` e a folha de estilo.
Rodar de novo **toda vez** que o `.md` mudar, e conferir que a página não rola pro lado.
O `/gerar-html-do-plano` pelo nome não acha série que mora dentro do SEIRES: chamar o
script pelo caminho.

---

## 6. Etapa 4: o nascimento no site (o que não vem sozinho)

Esta é a etapa que mais esquece peça. Cada item abaixo já falhou uma vez.

1. **A pasta da série** em `SEIRES/<SERIE>/`, com `plano/serie/`, `_arquivos/capa-serie/`
   e a primeira pasta de etapa.
2. **A capa:** gerada no Flow **com o chip em Imagem**, 1200x670, salva como
   `site/img/serie-<nome>.webp`; original e prompt guardados em `_arquivos/capa-serie/`.
3. **O card da home não se escreve à mão.** O episódio ou a série entra na árvore `MENU`
   do `site/js/menu.js` e o texto no `site/dados/cards.js`; depois roda
   `node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js"`
   e o `qa-cards.js`. O `--confere` é trava de deploy: página que não bate com o dado não
   sobe. Foto de capa sem crédito no `cards.js` fica sem lupa.
4. **A entrada no `site/js/menu.js`**, senão o "voltar" não sabe o pai.
5. **O hub** `site/<serie>.html` e a página de etapa `site/etapas/<serie>-NN.html`.
   **O player do `00` da série** entra no `.head` do hub, escrito logo depois do `<h1>`,
   como `<div class="audio audio--faixa">` (17/09/2026, decidido por mim em montagem no
   hub do Universo). No desktop a classe leva o player pra uma faixa fina logo abaixo da
   barra do topo, na coluna da esquerda, com a marcha (1x) abrindo a linha e a ficha
   embaixo, e a chamada sobe pra direita, alinhada pela borda direita. No telefone ele
   fica embaixo do título. As regras moram no `site/css/cabecalho.css` (o lugar) e no
   `site/css/audio.css` (o desenho): o hub só carrega as folhas de sempre e o
   `js/audio.js` depois do `js/menu.js`. Hub cujo áudio ainda não existe **não** sobe com
   o player mudo: ou o arquivo nasce, ou o bloco sai.
   **O card dos Extras fecha a grade das etapas do hub** (17/09/2026, "depois coloca o
   extra"): a série ganha `extras: { nome, href, itens }` na `MENU`, a grade `<serie>/etapas`
   do `cards.js` ganha o campo `extras` (período, frase, resumo e a arte; a contagem e o
   botão saem da `MENU`), e nasce a página `site/extras/<serie>.html` com um card por extra
   (tipo `extras`, selo `em produção` enquanto não tiver link). Páginas de etapa e de extras
   usam a mesma largura do hub (`wrap wrap--vitrine`). A de extras segue a grade de 4
   colunas do hub (`grade`); a de etapa põe os episódios em **3 colunas** (18/09/2026,
   "colocar em 3 colunas todas as páginas que estão nesse nível"). Quem fixa é o
   gerador: a grade de episódios não leva o campo `grade` no `cards.js`, e ele recusa
   quem escrever.
6. ⚠️ **`PASTAS_DO_SITE` no `deploy/publicar.sh` (linha 47).** O publicador sobe só as
   pastas listadas ali. Série nova fora da lista tem as páginas do `site/` publicadas e a
   pasta da série **404 no ar**, e o script imprime PUBLICADO do mesmo jeito. Entrar na
   lista **no mesmo commit** que cria as páginas.
7. **No painel, a série nasce desligada** (`series.afx.art.br/painel/`), e o deploy não
   religa o que foi desligado por lá. Ligar é decisão minha, e é o último passo.
8. **As artes das etapas** (1200x670) quando existirem, com lightbox e legenda
   "Etapa NN · nome · ilustração".

---

## 7. Etapa 5: o piloto (só depois do plano aprovado)

A esteira de um episódio, na ordem, sem pular:

1. **`_pesquisa.md` do episódio**, nos moldes da pesquisa inicial.
2. **`_planta.md`**, copiado do `_molde-planta.md`. Uma linha por tela, tipo
   (`capa · ficha · conteudo · interativa · pratica · fecho`), e **a contagem de telas é
   o resultado da lista, não uma decisão anterior**. ⚠️ A justificativa do número **não
   pode citar outro episódio**, e não se abre a planta de outro episódio pra escrever
   esta: foi assim que todos viraram 8 telas, e depois todos viraram 12. O
   `confere-plantas.js` reprova justificativa que cite outro episódio.
3. **O trio** (`Overview.txt`, `_NotebookLM_<Nome>.txt`, o prompt `<nome-em-kebab>.txt`),
   escrito do `_molde-roteiro.txt`, nunca do episódio anterior. Sem acento, sem em-dash.
   Um bloco `TELA n` por linha da planta. O "aperte o Próximo" no fim de cada tela **não
   é instrução pro ouvinte**: é o marcador que o `mapa-de-telas.py` usa pra cortar o
   áudio. O aviso da página na abertura é uma fala só, quatro frases, um apresentador, e
   o outro não comenta.
4. **O verificador**, com os critérios da série (as D*, os alertas da pesquisa, nenhuma
   analogia não declarada). Reprovou, corrige e reauditar **continuando o mesmo agente**.
5. **Gerar, esperar e baixar** no NotebookLM pelo PowerShell (receita 7 do
   `_COMO-FAZER.md`), fechando o browser do lab antes de cada passo, filtrando pelo
   perfil, nunca matando Chrome ou Edge no atacado.
6. **Mapa de telas** (`mapa-de-telas.py` e `marcadores-do-mapa.py`) em cima do áudio
   pronto, e conferir que o número de telas e de pedidos bate com a planta.
7. **A animação**, nascendo do `_molde-animacao.html`. Dele vêm de graça: setas do palco,
   tela de fim, cena 16:9 com grade de 3/4/6, hover, lightbox, tocador e o layout de
   desktop. Não reescrever nada disso no episódio. Arte própria ao lado do texto usa
   `flex: 0 1 <largura>`, nunca `flex: 1 1 auto`.
8. **As ilustrações.** ⚠️ Não vêm sozinhas e **widget interativo não conta como imagem de
   todas as telas**. Abrir a `_planta.md` na seção de imagens e conferir tela por tela;
   prompts guardados no `ilustracoes.md` do episódio. Tela desenhada só em HTML e CSS
   declara `data-imagem="desenho"` na própria `<section>`: o padrão é reprovar.
9. **QA local:** `qa-pagina.js <url> <telas>` (telas, imagem, imagem à vista no telefone,
   estouro, conteúdo cortado), `qa-player-site.js`, `qa-cards.js`, e o que mais tocar no
   que mudou. ⚠️ **Print de toda tela de widget, no telefone (384x686) e no desktop.** O
   QA mede tela, imagem e estouro; ele não sabe se o widget desenhou.
10. **Subir só com o meu OK** (receita 8: `inventario-site.sh`, `revisa-diferencas.sh`,
    `sobe-arquivos.sh`, nessa ordem, áudio e CSS e JS antes do HTML), e **conferir o que
    subiu**, abrindo a página e seguindo cada link relativo.

---

## 8. O que vale sem eu pedir

- Toda tela tem imagem, e toda imagem de cena é **16:9**.
- Flow no modo **Imagem**; vídeo gasta crédito e é o padrão da barra.
- Componente que aparecer pela **terceira vez** vira peça da base: parar e propor, não
  extrair sozinho.
- Nada do material privado na página pública, nem de leve, nem no jeito de falar.
- Decisão minha vira `D*` com data; proposta sua vira `P*` com recomendação.
- Respostas curtas no chat; o detalhe vai pro arquivo, com link clicável.

## 9. O que você não faz sozinho

Publicar, ligar a série no painel, commitar, apagar qualquer coisa, gerar vídeo no Flow,
inventar decisão minha, mudar o nome ou a posição do card, e replicar um padrão ruim que
achou em outra série só porque é "o padrão".

---

## 10. Saída esperada da primeira sessão

1. `<SERIE>/plano/serie/plano-da-serie.md` completo, com D* e P* separados.
2. `_pesquisa-inicial.md` com fonte primária, "não confirmado" e "alertas".
3. O HTML do plano gerado e conferido.
4. A pasta da série e a capa.
5. Card na home, entrada no `menu.js`, hub e página de etapa, `PASTAS_DO_SITE` atualizado,
   **série desligada no painel**.
6. Uma lista curta no chat: o que ficou pendente e o que trava cada pendência.

---

## 11. DADOS DA SÉRIE (preencher, o que faltar vira pendência)

```
Nome provisório:
Tema em uma frase:
O objeto que atravessa:
Fonte do conteúdo:
Tem material privado envolvido? (sim/não, qual)
Quantas etapas, e onde a série termina:
Formato do episódio (animação / tela que se mexe / modelo 3D / só áudio):
Tem episódio 00 por etapa e da série inteira?
Tem extras?
Posição do card na home:
Risco legal ou ético a tratar:
O que eu já decidi e não quero discutir:
```

# Handoff — série do computador, 06/09/2026, tarde e noite

Documento autossuficiente: dá pra retomar sem ler a sessão anterior. Substitui o
`_HANDOFF-2026-09-06.md` da manhã (que ainda vale pra esteira, QA e deploy).

## Onde a série está

Repo `C:\src\PROJETOS\SEIRES` (branch `main`). Site no ar em **series.afx.art.br**.
⚠️ **Nada desta rodada foi commitado**: a etapa 8 inteira, o hub de extras, o plano e
o `qa-producao.js` estão no working tree. Commit só quando o dono mandar (`/commit`).

**A etapa 8 (Da sala pro mundo) está no ar com os dois episódios**, página
`site/etapas/etapa-08.html` linkada do card 08 do `computador.html`:

| # | Episódio | Áudio | Duração | Telas | Versões descartadas |
|---|---|---|---|---|---|
| 8.01 | O computador chega em casa | Como o computador pessoal chegou em casa | 24:28 | 12 | `_v1` a `_v4` na pasta |
| 8.02 | Conectando tudo: a internet | Da ARPANET ao surgimento da web | 18:07 | 11 | `_v1` na pasta |
| 8.03 | O sistema operacional | A história do síndico dos computadores | 16:26 | 12 | nenhuma: passou de primeira (07/09, madrugada) |

**A etapa 8 está completa.** O 8.03 foi feito nesta mesma sessão depois do `finaliza-sessao`, a pedido do dono ("posso pedir a etapa 9 em outra sessão e tu fez o 8.3?"): trio no molde novo, 10 fotos do Commons, página de 12 telas, gravação única, QA verde local e no ar. O card 03 está na `etapa-08.html`, a home diz "3 episódios". O `qa-producao.js` ganhou a linha do 8.03 (12 telas).

`qa-producao.js` (gabarito do 8.01 corrigido pra 12 telas) dá **tudo verde no ar**.

## A virada de 06/09: como um episódio da trilha principal é escrito daqui em diante

O dono ouviu a primeira gravação do 8.01 e detestou: *"achei que íamos trabalhar em
como construir o computador, e o áudio seguiu pra como vender"*. A regra antiga da
trilha principal ("sem biografia, sem nome de pessoa") **morreu**. O molde agora é o
do `08-01 v5` e do `08-02 v2`:

1. **Construir, não vender.** Preço e venda só entram pra dizer o que permitiram
   construir em seguida.
2. **Pessoas pelo nome, em ordem cronológica estrita**, sem pular pra frente e voltar
   dentro do episódio.
3. **Ficha em voz alta na primeira menção**: nome, ano de nascimento, idade naquela
   cena, vivo em 2026 ou ano da morte. **Uma frase**, e segue. Conferir os "vivos"
   por busca antes de gravar (foi feito pros dois episódios).
4. **Fio hardware ↔ software** dito em cada tela: ou o hardware liberou um software,
   ou um software puxou o hardware.
5. **Pronúncia escrita** de todo nome e sigla estrangeiros no bloco de regras.

Regras de roteiro que nasceram das cinco gravações do 8.01 (v1 vendia; v2 idem, 26
min; v3 sem ficha; v4 emendou as telas 2+3 e 4+5 e passou de 30 min; v5 passou):

- **Aviso de costura** ("ATENCAO ESPECIAL COM AS TELAS N e N+1") em todo par que já
  emendou numa gravação anterior. Funciona: v5 respeitou todos.
- **A tela 1 explica a página sem dizer a frase "aperte o Proximo"** como exemplo: o
  cortador acha a frase e cria corte falso (aconteceu no v3).
- **"Inicie dizendo" é instrução, não fala** (v4 abriu falando "Inicie dizendo").
- **Abertura direta, sem cena inventada** (v4 abriu com "um motor V8").
- **Ficha é uma frase**; senão o episódio dobra de tamanho.
- **DURACAO: cerca de 18 minutos.** Pedir 25 deu 26 e 30.
- **Conferência com o modelo maior antes de acusar o áudio**: o Whisper pequeno
  escreveu 1999 onde o áudio diz 1998 (Postel), "CRN" onde diz CERN, e nunca acerta
  Estridge/Thacker.

## Pasta e página de um episódio, no molde novo

`_REFAZER/08 - Da sala pro mundo/01 - O computador chega em casa/` é o exemplo
completo: trio (`Overview.txt`, `_NotebookLM_<Nome>.txt` com as linhas `FICHA:`, o
prompt `08-01-<nome>.txt`), `animacao.html` com 12 telas (capa + cena/ficha/mundo,
kickers com "ano · pessoa"), `episodio.css` (só o `cena--tres` e o teto da troca,
copiado do 07-02), `episodio.js` (marcadores gerados), `img/` com 16 fotos do Commons
(crédito na legenda), `_telas.md`, `_transcricao.txt`, `_notebook-url.txt`.

Scripts de apoio desta rodada (scratchpad da sessão, recriar se precisar):
`esteira-edge-8-0N.sh` (a esteira oficial rodando os três passos pelo Edge, porque o
Chrome do lab está deslogado), `preenche-8-0N.py` (troca `__AUDIO_SRC__`, `__DUR_S__`,
`__TITULO__`, `__DUR_MMSS__` no tocador pelo m4a baixado), `sobe-8-0N.sh` (tar + scp
+ tar xzf em `~/serie`, sem roteiro/trio/`_vN`). A `animacao.html` pode ser escrita
**antes** do áudio, com os placeholders; só os marcadores esperam o `_telas.md`.

## Hub de extras: 18 cards, 8 em produção

`site/extras/index.html` ganhou os cards 11 a 18, **os primeiros do hub com foto**
(`cap__arte--arte` + `cap__img`), selo "em produção", sem botão: 11 Intel, 12 IBM,
13 O 8080, 14 O Alto da Xerox, 15 Apple, 16 Microsoft, 17 O BASIC, 18 Tim
Berners-Lee. Fotos novas em `site/img/extra-1N-*.jpg|png`; as outras reusam as
pastas dos episódios. `computador.html` diz "18 extras". Registrados no
`plano-da-serie.md` como candidatos 46 a 53. ⚠️ Nenhum é anunciado no ar: os áudios
da etapa 8 foram gravados com "SEM GANCHO DE EXTRA".

Pra levar ao extra do Alto (14): o que saiu do PARC saiu por padrão publicado
(Ethernet, 1980), por livro (Smalltalk-80, 1983) e por gente que mudou de empresa
(Tesler → Apple 1980, Simonyi → Microsoft 1981). Ninguém levou planta.

## O que vem agora

1. ~~8.03 — O sistema operacional~~ **feito e no ar em 07/09** (ver tabela acima).
2. **Etapa 9 — A máquina que aprende (1993–2017), quatro episódios**, espinha
   aprovada e escrita no plano (seção "Etapa 9"): 9.01 A corrida do processador
   (Pentium, AMD, a parede do calor, multinúcleo); 9.02 A placa de vídeo (3dfx,
   NVIDIA, ATI/AMD, CUDA); 9.03 A máquina que aprende (perceptron → AlexNet em duas
   placas de jogo); 9.04 2017: Attention is All You Need. Pasta a criar:
   `_REFAZER/09 - A máquina que aprende/`. Molde da etapa 8.
3. Produzir em **sessão nova**, um episódio por vez: pesquisa → trio pra aprovação →
   esteira pelo Edge → conferência (contagem de telas, anos, fichas, modelo maior nos
   suspeitos) → página → QA local → deploy → `qa-producao.js`.

## Pendências

- Commit de tudo desta rodada (SEIRES) quando o dono mandar.
- O 8.02 v2 ainda não foi ouvido pelo dono com a página aberta (ele ouviu a v1 e o
  8.01 v5 direto no NotebookLM).
- `plano-da-serie.md`: a tabela da espinha e as seções das etapas 8 e 9 estão na
  numeração de 04/09; as seções antigas 6, 7 e 8 ficaram com rótulo "numeração
  antiga". Uma limpeza de verdade do arquivo ainda não foi feita.
- Extras 46 a 53 sem ordem decidida; os seis com gancho no 6.02 continuam sem existir.
- Os NotebookLMs criados hoje (cinco do 8.01, dois do 8.02) têm todos o mesmo nome;
  o dono se confundiu procurando o áudio. Apagar os velhos ou renomear seria bom.
- Outra sessão (src-5e, série JAVA WEB) divide o lab do NotebookLM: combinado avisar
  antes de usar o Edge `profile-edge` e mandar "lab livre" ao terminar.

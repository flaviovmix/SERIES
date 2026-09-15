# 10.04 O algoritmo de recomendação: pesquisa conferida em 07/09/2026

Conferida por agente de pesquisa em fonte primária: papers, blogs oficiais, documentos da
FTC e do processo. Serve pra escrever o trio e pra conferir a transcrição. Não vai pro site.

## ⚠️ Problema de ficha: três das quatro pessoas óbvias não têm nascimento público

| Pessoa | Nascimento | Situação |
|---|---|---|
| Reed Hastings | 08/10/1960 | vivo. ⚠️ Na cena do anúncio (02/10/2006) tinha **45**, não 46: faz aniversário seis dias depois |
| Simon Funk (Brandyn Webb) | ⚠️ **não público, nem o ano** | sem obituário, mas sem prova de vida recente. **Não afirmar vivo nem morto** |
| Yehuda Koren | ⚠️ **não público** | sem obituário; consta ativo no Google |
| Covington, Adams e Sargin (o paper do YouTube) | ⚠️ **nenhum é público** | entram **sem ficha** |

**Solução: trocar a lista de nomeados.** Quem tem ficha pública e cabe no episódio, em
ordem cronológica:

| Pessoa | Nascimento | Cena | Idade | Em 2026 |
|---|---|---|---|---|
| Geoffrey Hinton | 06/12/1947 | jun/2007, o paper da RBM | 59 | vivo (Nobel de Física em 2024) |
| Reed Hastings | 08/10/1960 | 02/10/2006, o anúncio | **45** | vivo |
| Susan Wojcicki | 05/07/1968 | 05/02/2014, assume o YouTube | 45 | ⚠️ morreu em 09/08/2024 |
| Jeff Dean | 23/07/1968 | set/2016 | 48 | vivo |
| Salar Kamangar | 1977 (só o ano) | 2012, a virada do tempo assistido | 34 ou 35 | sem obituário |
| Eli Pariser | 17/12/1980 | mar/2011, o "filter bubble" | 30 | vivo |
| Mark Zuckerberg | 14/05/1984 | set/2011, o feed único | 27 | vivo |

⚠️ **Wojcicki já ganha ficha no 10.02** (na garagem, em 1998). Regra que vale: a ficha é
lida na primeira menção **dentro de cada episódio**, porque quem ouve um episódio solto não
ouviu o outro. Foi o que o 10.01 fez com Andreessen, que já tinha ficha no 8.02.

## O Prêmio Netflix

- Anúncio em **02/10/2006**. Um milhão de dólares, mais 50 mil por ano de prêmio de
  progresso. Sistema da casa: **Cinematch**, com erro de 0,9514. Meta: **10% melhor**, ou
  seja, chegar a 0,8572.
- Base: **100.480.507 notas**, de **480.189 usuários**, sobre **17.770 filmes**, dadas
  entre outubro de 1998 e dezembro de 2005. (O número "500 mil usuários" que circula é
  arredondamento, não erro.)
- Contexto: a Netflix era **DVD pelo correio**, com uns 6 milhões de assinantes. O
  streaming só nasce em janeiro de 2007.
- Vitória submetida em **26/07/2009**, anunciada em 18/09 e paga em 21/09. Equipe
  **BellKor's Pragmatic Chaos** (fusão de BellKor, BigChaos e Pragmatic Theory). Erro final
  **0,8567** = 10,06%.
- ⚠️ **A segunda colocada estava na frente no placar público** (0,8553 contra 0,8554). No
  conjunto oculto **empataram** em 0,8567, e o desempate foi por **ordem de chegada**: o
  The Ensemble enviou **20 minutos depois**. A história dos 20 minutos é verdadeira.

## ⚠️ A Netflix usou ou não usou? (o ponto mais mal contado do episódio)

**Usou uma parte, e não foi a que ganhou o milhão.**

- **Foi pra produção**: os dois algoritmos base do prêmio de progresso de **2007** — a
  **fatoração de matrizes** e a **RBM** (a máquina de Boltzmann restrita do paper de
  Salakhutdinov, Mnih e Hinton, ICML 2007). A Netflix reescreveu os dois pra escala e eles
  ficaram anos no recomendador. Números do post: fatoração sozinha 0,8914; RBM sozinha
  0,8990; as duas misturadas 0,88.
- **Não foi**: o conjunto campeão de **107 algoritmos** do prêmio grande de 2009.
- Post oficial: **"Netflix Recommendations: Beyond the 5 stars (Part 1)"**, blog técnico da
  Netflix, **06/04/2012**, de Xavier Amatriain e Justin Basilico. As três razões, na ordem
  em que eles dão: o ganho não pagava o esforço de engenharia; a escala tinha mudado (os
  algoritmos foram feitos pra 100 milhões de notas e a Netflix já tinha mais de 5 bilhões);
  e o produto tinha mudado de DVD pra streaming, então **prever nota deixou de ser o
  problema, e prever consumo virou o problema**.
- ⚠️ O próprio Amatriain, que é a fonte mais citada da lenda, escreveu depois que **é
  citado errado**: o que não foi usado é só a entrada campeã.

## Fatoração de matrizes (o método que dominou)

- A tabela é usuários por filmes, quase toda vazia: 480 mil linhas, 17.770 colunas, e só
  1,2% das células preenchidas.
- O método aproxima essa tabela pelo produto de **duas tabelas magras**, uma de usuários
  por K números e outra de K números por filmes. A nota prevista é o produto das duas
  linhas. Os K números saem de descida de gradiente **só sobre as notas que existem**.
- Os K números são os **fatores latentes**. Ninguém escolhe o que significam; saem do
  ajuste. O modelo **nunca vê título, gênero, elenco nem sinopse**: só vê quem votou o quê.
- ⚠️ **Não é a SVD clássica**, apesar do apelido: a SVD de verdade exige a matriz completa.
  Por isso o nome virou **Funk SVD**.
- Quem publicou no contexto do prêmio: **Simon Funk**, post de **11/12/2006**, estando em
  3º lugar. Ele abriu o método e o campo inteiro virou pra fatoração. ⚠️ Ele **não
  inventou** fatoração nem fator latente: publicou uma receita simples no meio de uma
  competição de um milhão de dólares.

## O escândalo de privacidade

- Narayanan e Shmatikov, da Universidade do Texas. ⚠️ **Três datas circulam e todas têm
  base**: rascunho no arXiv em **18/10/2006** (16 dias depois do prêmio começar), v2 em
  novembro de 2007, e publicação revisada em **2008**. Dizer "publicado em 2008, com o
  rascunho no ar desde 2006".
- O que mostraram: cruzando com avaliações públicas do IMDb, **8 notas (das quais 2 podem
  estar erradas) identificam 99% dos registros**. Com duas notas e datas, 68%.
- ⚠️ A Netflix não anonimizou: **pseudonimizou**. Tirou o nome e deixou o padrão de
  comportamento, que é a impressão digital.
- Processo **Doe v. Netflix**, ajuizado em 17/12/2009. O segundo prêmio, anunciado em agosto
  de 2009, foi **cancelado em 12/03/2010**, junto com o arquivamento da consulta da FTC.
- ⚠️ **Os 9 milhões de dólares que aparecem na busca são de OUTRO processo** (retenção de
  dados de ex-clientes, 2012). Os termos do acordo do Doe v. Netflix não foram divulgados.

## O feed do Facebook

- News Feed nasce em **05/09/2006**, e ⚠️ **nunca foi puramente cronológico**: já era
  seleção desde o começo.
- **EdgeRank** revelado na f8 de **21/04/2010**: três fatores fixos, afinidade × peso do
  tipo × decaimento no tempo.
- ⚠️ **A troca por aprendizado de máquina de verdade é datada "por volta de 2011", e a
  fonte é única**: uma entrevista de 2013 em que Lars Backstrom diz "cerca de dois anos e
  meio atrás" e menciona até 100 mil pesos. **Não existe anúncio oficial com data.**
- Em **setembro de 2011** o Facebook funde "Top News" e "Most Recent" num fluxo único
  ordenado por relevância: é aí que o usuário **perde a opção** de cronológico.
- ⚠️ Isso é aprendizado de máquina, **não rede neural profunda**. Se a tese for sobre
  máquina que aprende, o Facebook de 2011 conta; se for sobre rede neural, não conta.

## O YouTube

**Antes:** o paper de **RecSys 2010** descreve **coocorrência**: numa janela de 24 horas,
conta quantas vezes dois vídeos foram vistos na mesma sessão e normaliza pela popularidade.
É uma **contagem, não um aprendizado**: sem parâmetro treinado e sem generalizar pro que
nunca coocorreu.

⚠️ **Correção que quase toda fonte popular erra:** o antecessor **imediato** da rede neural
**não era** essa coocorrência de 2010, era **fatoração de matrizes** treinada com rank
loss. O próprio paper de 2016 diz isso. **Isso fecha o arco do episódio melhor**: a mesma
técnica que ganhou o Prêmio Netflix estava rodando no YouTube até a rede neural substituir.

**A virada de objetivo, 2012:** em **10/08/2012** o YouTube anuncia que passa a otimizar
**tempo assistido** em vez de clique, e em outubro isso chega à busca. Quem puxou foi
Cristos Goodrow (sem ficha pública). O diagnóstico oficial: o sistema antigo premiava vídeo
bom em atrair clique, não vídeo que segurava quem assistia.

**O paper de 2016:** "Deep Neural Networks for YouTube Recommendations", Covington, Adams e
Sargin, RecSys, setembro de 2016. **Dois estágios, duas redes:**

1. **Geração de candidatos**: de milhões de vídeos pra centenas. Formulado como
   classificação com um milhão de classes ("qual o próximo vídeo?"), treinado em
   **feedback implícito** (assistiu = exemplo positivo), e servido como busca do vizinho
   mais próximo em dezenas de milissegundos.
2. **Ordenação**: das centenas pras dezenas exibidas, com centenas de características por
   impressão, otimizando **tempo assistido esperado** por regressão logística ponderada.

Escala declarada: mais de 1 bilhão de usuários, ~1 bilhão de parâmetros, centenas de
bilhões de exemplos. Melhor configuração: 1024 → 512 → 256, escolhida **pra caber no
orçamento de CPU**.

Por que a rede resolveu o que a conta não resolvia, nas três razões do próprio paper:
generaliza por embedding (pega cauda longa e vídeo novo, que nunca coocorreram); aceita
sinal heterogêneo no mesmo modelo (busca, região, idioma, aparelho); e a profundidade
compra qualidade de verdade (a perda cai de 41,6% sem camada oculta pra 34,6% com três).

⚠️ **Ordem que as fontes populares fundem: o objetivo mudou em 2012, o motor mudou em 2016.**
Quatro anos separam as duas coisas.

## ⚠️ O que NÃO se pode afirmar

**Não dizer "a primeira rede neural em produção", nem "a primeira em escala de bilhões".**
Contraexemplos documentados e anteriores: a **RBM da Netflix** em produção desde ~2008 (que
é do próprio episódio!); o **reconhecimento de fala do Google com rede neural em 2012**; e
principalmente o **RankBrain, na Busca do Google, no início de 2015**, que o Google chamou
de terceiro sinal de ranqueamento mais importante. Busca do Google é escala de bilhões sem
discussão.

**Também não dizer que o paper de 2016 marca a estreia da rede neural no YouTube**: o
próprio paper diz que iterações iniciais já rodavam antes, imitando fatoração com redes
rasas. O paper **descreve** um sistema em produção; não anuncia lançamento.

✅ **O que se pode afirmar com segurança:** é **uma das primeiras descrições públicas,
feita pelos próprios engenheiros, de recomendação por rede neural profunda rodando em
produção pra mais de um bilhão de pessoas**. E o que sustenta a tese do episódio não é o
pioneirismo técnico: é que **o modelo é treinado no rastro que as pessoas deixaram**
(feedback implícito), não em nota que alguém deu de propósito.

⚠️ **Não afirmar que o YouTube de 2016 rodava em TPU.** O paper não menciona TPU e fala em
orçamento de **CPU**. A TPU v1 existia (implantada em 2015, anunciada em maio de 2016), mas
o paper não a cita. Formulação segura: "o Google já tinha um chip próprio pra rede neural
rodando havia mais de um ano; o paper do YouTube não diz que usava esse chip, diz que
estava contando cada milissegundo de CPU".

## ⚠️ A recomendação "vicia"? Separar afirmação de pesquisa

**É afirmação, não pesquisa:** o famoso "**70% do tempo assistido vem de recomendação**" é
declaração de um executivo do YouTube em janeiro de 2018, sem metodologia publicada e sem
auditoria, e críticos apontam que inclui a reprodução automática. "Filter bubble" e "rabbit
hole" são conceitos jornalísticos, de Eli Pariser (2011) e da cobertura posterior.

**É pesquisa, e aponta ao contrário do senso comum:** estudos grandes (PNAS 2021, Science
Advances 2023, PNAS 2025) mostram que a maioria de quem consome conteúdo extremo **chega
por navegação direta, inscrição no canal e link de fora**, não por recomendação.

⚠️ Mas essa pesquisa é toda **de 2021 pra frente**, e mede o YouTube depois das mudanças de
política de 2019. **Não serve pra afirmar nada sobre o sistema de 2016.**

**Formulação honesta:** o factual é que o sistema passou a otimizar tempo assistido em 2012,
e isso foi decisão declarada. O efeito disso sobre as pessoas é disputado. Não afirmar
causalidade.

## Números que fontes populares repetem errado

| Erro comum | Certo |
|---|---|
| prêmio anunciado em 2007 | 02/10/2006 |
| melhoraram 10% | 10,06%, de 0,9514 pra 0,8567 |
| Funk inventou a fatoração | ele **publicou em aberto** uma receita, em 11/12/2006 |
| Funk SVD é SVD | não é: a SVD clássica exige matriz completa |
| a Netflix anonimizou | **pseudonimizou** |
| o acordo foi de 9 milhões | é de outro processo; este teve termos não divulgados |
| antes de 2016 era coocorrência | o antecessor imediato era **fatoração de matrizes** |
| o paper de 2016 introduziu o tempo assistido | o objetivo mudou em **2012** |
| o YouTube de 2016 rodava em TPU | o paper fala em orçamento de **CPU** |
| foi a primeira rede neural em escala de bilhões | RankBrain (2015) e a fala do Google (2012) vieram antes |
| o feed do Facebook era cronológico | nunca foi puro; o que se perdeu em 2011 foi a **opção** |

## Gravações

(preencher a cada gravação)

## O destino do trabalho de cada um (conferido em 08/09/2026)

A ficha passou a fechar com o que a pessoa foi fazer, em vez da causa da morte. Levantado
por busca, com fonte e data.

| Pessoa | O que a ficha diz | Base |
|---|---|---|
| Reed Hastings | "vivo em 2026, quando saiu do conselho da Netflix" | saiu na assembleia de junho de 2026; está no conselho da Anthropic desde maio de 2025 |
| Geoffrey Hinton | "vivo em 2026, dando aula em Toronto" | professor emérito na Universidade de Toronto; saiu do Google em maio de 2023 |
| Mark Zuckerberg | "vivo em 2026, ainda no comando da mesma empresa" | segue como executivo-chefe da Meta |
| Eli Pariser | "tocando uma organização que constrói praças digitais de bairro" | codiretor da New_ Public |
| Salar Kamangar | ⚠️ **"deixou o YouTube em 2014"** e nada mais | **não confirmei** o que faz hoje |
| Susan Wojcicki | "morreu em 2024, quando já tinha saído do YouTube havia um ano e meio" | renunciou em 16/02/2023, morreu em 09/08/2024 |
| Jeff Dean | "vivo em 2026, quando saiu do Google depois de 27 anos e abriu empresa de pesquisa própria" | saiu em **agosto de 2026** pra fundar a Discovery Loop |

⚠️ **Três armadilhas que a pesquisa pegou:**

1. **Jeff Dean é a mais perigosa.** Qualquer roteiro escrito antes de agosto de 2026 o
   coloca como cientista-chefe do Google DeepMind. Está errado desde 05/08/2026.
2. **Kamangar é campo minado.** Os únicos sites que dizem que ele ainda é executivo do
   YouTube são fazendas de conteúdo repetindo o cargo de 2014. O roteiro proíbe dizer em que
   ele trabalha agora.
3. **Wojcicki tem dois erros simétricos.** "Morreu comandando o YouTube" é falso: tinha
   saído havia um ano e meio. Mas "tinha largado o Google" também é falso: continuou como
   conselheira da Alphabet. A frase da ficha fica no meio, dizendo só o que é seguro.

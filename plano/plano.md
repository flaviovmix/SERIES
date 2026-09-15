# Plano: SEIRES

**Tipo:** site de conteúdo: série de podcast com animação HTML e modelos 3D, publicada como site estático (`site/`), que substituiu as notas do Nexus em 30/08/2026 (D1). Sem backend, sem banco, sem login; a hospedagem é a do servidor `afx.art.br`, decidida na Etapa 4.

Índice do projeto. **É o único arquivo lido em toda sessão**, por isso ele é curto: o detalhe mora em `etapas/`, e só a etapa atual é carregada.

As regras estão nos arquivos `1` a `5` ao lado. Vieram do molde `/projeto-novo-humanizado-seguro` e foram **podadas em 27/08/2026** para o que este projeto usa: saíram as etapas de banco, ambiente de app, servidor, autenticação, painel admin, CRUD, upload, e-mail, endurecimento de app e celular instalável, e o bloco de loja. O molde original continua em `C:\src\.claude\projetos\molde-projeto-novo\`.

---

**Ponto de partida:** a série "Como Reinventar o Computador do Zero" chegou pronta em `../Como Reinventar o Computador do Zero/` (movida de `PODCAST/01 - SÉRIE/` em 27/08/2026): 327 arquivos, 1,7 GB, sendo áudio (27 mp3, vários acima de 50 MB), um `video.mp4` de 382 MB, imagens, roteiros, animações HTML autocontidas (base64 dentro) e 6 modelos 3D em three.js. Quinze episódios já estão no ar, sem repositório, sem backup e sem teste que rode por um comando.

**Dois planos, dois assuntos.** O `plano-da-serie.md` (em `../Como Reinventar o Computador do Zero/plano/`) diz **o que** produzir: as 10 etapas da história, os episódios, as regras de roteiro e a ordem de produção. Este plano aqui diz **em que casa** isso é produzido: repositório, backup, base comum das animações, testes, publicação e operação. Um não repete o outro.

---

## Decisões

Decisões **travadas**. Uma vez escritas, não se repropõe. Se a realidade derrubar uma, a nova entra com data e o motivo da virada, e a antiga fica registrada.

- Nenhuma travada pela tabela da Etapa 0 ainda. As propostas, uma por linha, estão lá: o dono confirma ou troca, e cada uma vira `D*` aqui com a data.
- D1 (30/08/2026, dita pelo dono na sessão do ábaco, antes da Etapa 0): **o site substitui as notas do Nexus.** A animação é sempre servida pelo site (nunca mais `file://` nem anexo em nota). Consequência direta: **não existe mais arquivo construído, base64 nem embutidor**; a fonte é o entregável, imagem entra por caminho e o modelo 3D por `src` no iframe. Derruba duas linhas da tabela da Etapa 0 ("fonte de verdade" e "onde publica"), que precisam ser reescritas quando a etapa rodar.
- D2 (13/09/2026, dita pelo dono por print): **o site segue o desenho do SITE-AFX** (papel, tinta, tracejado, Schibsted Grotesk e IBM Plex Mono, pílulas, aros com ícone de traço), com o tema escuro tirado da "noite" do próprio AFX. Fase 1 = as páginas do `site/`, no ar em 13/09. **As animações ficam com a paleta antiga até a fase 2** (a paleta antiga está repetida no `site/css/animacao/tokens.css`). Os tokens mantiveram os nomes: trocar o desenho é trocar valores.
- D3 (14/09/2026, dita pelo dono por prints): **no telefone, o tocador e a paginação se recolhem quando o áudio começa** e uma seta no canto de baixo traz tudo de volta; **as listas do episódio (extras e filmes) vivem em guias em cima do tocador**, que fica fixo embaixo seja qual for a guia; sem item, a guia avisa. No desktop não há painel: as listas moram na tela de fim. **A fonte das listas é a árvore `MENU` do `site/js/menu.js`** (campos `extras` e `filmes` por episódio), e a tela muda "Pra ver" de 08/09 deixa de existir. Registro completo em `Como Reinventar o Computador do Zero/plano/_HANDOFF-2026-09-14.md`.
- D4 (15/09/2026, fechada pelo dono na 6.0 da Etapa 6): **o card não se escreve à mão.** Toda grade de cards do `site/` sai do `gera-cards.js`, a partir da árvore `MENU` (quais cards, ordem, link e estado) e do `site/dados/cards.js` (texto, imagem e legenda de cada card); a página só marca onde a grade entra. Capa com foto nasce com a lupa e a legenda (`ilustração`, ou `foto: autor, licença`); foto real sem crédito conhecido fica sem lupa até ter crédito. Na home, a foto leva pra série (não amplia). Página nova já nasce assim, e `gera-cards.js --confere` verde é condição de deploy. Esclarece a D1: o trecho gerado é HTML puro, commitado e servido como está; não existe pasta de construído. As 11 decisões de detalhe estão na 6.0 da Etapa 6.
- D5 (15/09/2026, dita pelo dono na 6.0: "igual à forma como trabalhamos no projeto do Kaco"): **o site publica a partir de um commit, não da pasta de trabalho.** O servidor puxa a `main` do repo SEIRES e copia pro `~/serie` (`publicar.sh`, o padrão da skill `publicar-no-servidor`), com backup carimbado antes e md5 depois: só sobe o que foi commitado, e voltar atrás é voltar um commit. A `main` só recebe merge por ordem do dono, e o deploy também. Mídia (mp3, mp4) fica fora do git e sobe à parte, como o `content/` do KIDS. O `sobe-arquivos.sh` vira caminho de mídia e de emergência. Montagem e acerto de contas na subetapa 4.1, que roda antes do primeiro deploy da Etapa 6.

## Pendências

Cada uma diz **em que etapa trava**. Pendência sem etapa dona vira esquecimento.

- ✅ P1 (resolvida em 30/08, a pedido: "commit e deploy"). `.gitignore` com `*.mp3 *.mp4 *.wav *.m4a __pycache__/`; primeiro commit `1d1fe35` com 473 arquivos e zero mídia (provado por `git ls-files`), enviado pra `origin/main`. Os 2 GB de áudio e vídeo continuam só nesta máquina até a Etapa 1 (backup).
- P2. Escrever no `plano-da-serie.md` o que conta como 🟢 (só a nota no ar, ou nota com áudio **e** animação): hoje o ep `01` da etapa 5 está 🟠 na tabela e listado como publicado no acervo, e o placar do texto diz 15 enquanto as tabelas somam 14. **Trava a Etapa 0.**
- P3. O three.js dos modelos 3D vem de CDN: a animação embutida na nota depende de um servidor de terceiro estar no ar. Embutir ou continuar assim é decisão. **Trava a Etapa 4.**
- ~~P4. Em `04 - Domesticando o raio\01 - A faísca` os dois `_animacao-fonte*.html` estão velhos e a fonte de verdade virou o arquivo construído. Decidir qual é a fonte e apagar o outro. **Trava a Etapa 2.**~~ **Resolvida em 30/08/2026 pelo desvio da Etapa 2:** não existe mais construído; a fonte de cada episódio é o próprio `animacao.html`. Nos episódios antigos a fonte de verdade é o `animacao.html` publicado, e os `_animacao-fonte*.html` (faísca e os três da etapa 7) são lixo a apagar **quando cada episódio for refeito na base**, não antes (apagar é do dono).
- ✅ P5 (resolvida em 30/08, a pedido do dono na passada pelo telefone). No telefone as telas de painel eram mais altas que o palco e o topo ficava cortado, inalcançável. Entrou `justify-content: safe center` em `.step` (com `center` antes, pra navegador sem `safe`) e, no bloco de 700px, `flex-start`: no desktop nada muda, no telefone a tela começa no começo e rola. Junto: só 7 bolinhas (a atual e 3 de cada lado) no telefone, via classe `.fora` posta pelo `telas.js`; o iframe do modelo na capa ficou mais alto (460px) e a barra do modelo encolhe quando embutido e baixo (`_base-modelo-3d.css`, `max-height:520px`). A Etapa 3 continua devendo a medição de estouro vertical na rede de testes.
- P6. Setas do lightbox: no ábaco ficaram nas bordas da janela; em 23/08 (ep 04-01) o dono pediu grudadas na foto. A base fixou **bordas da janela** (é o que está no ábaco, visto e não reclamado em 30/08); se a decisão for a outra, muda em `lightbox.css` só. **Trava a Etapa 5** (migração dos antigos).
- P7. O site não tem favicon: toda página (e o Lighthouse) registra um 404 no console, e o "boas práticas" para em 96. **Trava a Etapa 4.**
- P8. Performance do Lighthouse na animação: 65 no celular, 71 no desktop (FCP 4s no celular emulado). O custo é o three.js do modelo da capa por CDN, as fontes do Google e as 11 imagens carregadas de uma vez. Acessibilidade está em 100; a performance fica pra quando a rede de testes existir. **Trava a Etapa 3.**
- P9 (10/09/2026). Fotos de cena que o corte 16:9 estraga: das 130 fotos de cena, 21 são quadradas ou em pé, e umas 8 perdem o assunto no corte do meio (as duas válvulas, o rádio, o Jobs sem o rosto, o Android, os diagramas do transformer e da matriz, a tela do Nexus). Mostrar a foto inteira dentro da moldura 16:9 (com faixa dos lados, como a capa) ou trocar a imagem é decisão do dono. Quase todas estão nos episódios do `_REFAZER`. **Trava a Etapa 5.**
- P10 (14/09/2026; reduzida em 15/09 pelo `levanta-legendas.js`, tabela em `plano/levantamento-legendas.md`). Capas sem crédito nem prova de que são ilustração: `site/img/extra-12-ibm.jpg`, `extra-16-microsoft.jpg` e `extra-17-basic.png` (fotos, origem desconhecida), `abaco-episodio.webp` e `etapa-06.webp` (capas das etapas 01 e 06 no `computador.html`), e `serie-computador`, `serie-lua`, `serie-corpo` e `serie-evolucao.webp` (só na home, que não tem lupa pela decisão 9). As 5 primeiras ficam **sem lupa** até o dono dizer a origem; o `--confere` lista quais são. Achadas pelo script: a `extra-11-intel.jpg` é a mesma foto do 4004 (MaltaGC, CC BY-SA 4.0), e 9 das 15 "com cara de ilustração" têm prova (legenda da animação, prompt ou plano que diz Flow). **Trava o fechamento da Etapa 6.**
- P11 (14/09/2026). `site/etapas/hardware-01.html` tem mudança local sem OK. Subir, descartar ou seguir editando é do dono. **Trava a Etapa 6.**
- ✅ P12 (resolvida em 15/09/2026, por ordem do dono na 6.0). Savepoint `6c3925b` na `main` do SEIRES (373 arquivos, seis dias de várias sessões, zero mídia; `GRAVAR-TELA/` ficou de fora por ser repositório próprio), local, sem envio; branch `card-componente` criada em cima. Era: o último commit ser de 08/09 e o gerador de cards ir reescrever 13 páginas com mudança sem commit. Efeito colateral que a 4.1 trata: o `hardware-01.html` da P11 entrou nesse commit, então está na `main`.
- P13 (15/09/2026). Série desativada pelo painel some do menu e da home, mas as páginas dela seguem abrindo por link direto, porque o site é estático. Bloquear de verdade é uma regra no nginx do container `serie`; fazer ou não é do dono. **Trava a Etapa 6.**
- P14 (15/09/2026, achados de baixa severidade da revisão do painel local na 6.10, não corrigidos ali). (a) O token do painel protege contra site aberto no navegador, mas não contra outro processo ou usuário da mesma máquina: quem conecta em `127.0.0.1` com o Host certo lê o token no `GET /`; o estrago possível é ligar ou desligar série. (b) No Windows, o `renameSync` do `series.json` pode falhar com EPERM ou EBUSY se antivírus ou sincronizador segurar o arquivo, e não há nova tentativa (sobra um `.tmp` em `site/dados`); sem `fsync`, queda de energia pode deixar o arquivo vazio. (c) O `gera-cards.js` grava páginas e `menu.js` direto, sem temporário: morto no meio (o prazo de 60 s do painel), pode deixar um arquivo truncado. (d) A lista "o que mudou" pega qualquer página alterada por outro processo durante a geração. **Trava a Etapa 5** (operação).

---

## Status das etapas

Ao fechar uma etapa, marcar `✅ + data` **aqui e no arquivo dela**. Índice desatualizado é pior que índice nenhum.

| # | Etapa | Status | Última mexida |
|---|---|---|---|
| 0 | Decisões travadas e esqueleto do repo | não iniciada | |
| 1 | Arquivos pesados e backup | não iniciada | |
| 2 | A base da animação, sem clonar | em andamento, executada e ampliada em 08 a 14/09 (tocador, fonte, navegação, tela de fim, cena 16:9; em 12 a 14/09 o lote 3 de layout, o painel do telefone que recolhe no play com as guias Extras/Filmes, e as listas de extras e filmes na tela de fim, tudo no ar); falta a validação do dono (régua 7) | 14/09/2026 |
| 3 | A rede de testes das animações e dos modelos | não iniciada (os `qa-*.js` do site, versionados em 14/09, são o começo dela pelo lado do site) | 14/09/2026 |
| 4 | Publicação | em andamento: atualização e conferência pós-publicação por script versionado desde 14/09 (`inventario-site.sh`, `revisa-diferencas.sh`, `sobe-arquivos.sh`, `qa-*.js ar`); em 15/09 entrou a 4.1 (publicar a partir do commit, D5), não iniciada, que roda antes do primeiro deploy da Etapa 6; falta o README de publicar episódio e reescrever os itens que ainda falam em nota do Nexus | 15/09/2026 |
| 5 | Operação e evolução | não iniciada | |
| 6 | O card vira componente, com a lupa e o painel das séries | em andamento, 10 de 11: 6.0 a 6.6 e 6.8 a 6.10 ✅ 15/09 (as 14 páginas com cards gerados, a D4 com trava no deploy e prova por script, o estado das séries no `series.json` e o painel local; 🟠 falta o dono no navegador); falta só a 6.7, que espera a P11; o dono pediu execução em sequência até a 6.10 (menos a 6.7), com a validação no navegador junta no fim | 15/09/2026 |

Etapa em andamento se escreve com a posição: `em andamento, 2.3 de 4`.

---

## Ondas de evolução (depois da Etapa 5)

Registrar com data e commit, senão daqui a seis meses ninguém sabe por que uma decisão foi tomada.

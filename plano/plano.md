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

---

## Status das etapas

Ao fechar uma etapa, marcar `✅ + data` **aqui e no arquivo dela**. Índice desatualizado é pior que índice nenhum.

| # | Etapa | Status | Última mexida |
|---|---|---|---|
| 0 | Decisões travadas e esqueleto do repo | não iniciada | |
| 1 | Arquivos pesados e backup | não iniciada | |
| 2 | A base da animação, sem clonar | em andamento, executada; falta a validação do dono (régua 7) | 30/08/2026 |
| 3 | A rede de testes das animações e dos modelos | não iniciada | |
| 4 | Publicação | não iniciada | |
| 5 | Operação e evolução | não iniciada | |

Etapa em andamento se escreve com a posição: `em andamento, 2.3 de 4`.

---

## Ondas de evolução (depois da Etapa 5)

Registrar com data e commit, senão daqui a seis meses ninguém sabe por que uma decisão foi tomada.

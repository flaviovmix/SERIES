## Etapa 0: Decisões travadas e esqueleto do repo

**Objetivo:** nenhum episódio novo antes de as decisões estruturais estarem escritas e o repositório existir com o primeiro commit limpo.

As decisões que precisam de resposta **antes** do primeiro commit. Cada linha traz o default proposto em 27/08/2026, lido do que a série já faz; o dono confirma ou troca, e a resposta vira `D*` no `plano.md` com a data.

| Decisão | Default proposto | Por que agora |
|---|---|---|
| Tipo de projeto | site de conteúdo: série de podcast com animação HTML e modelos 3D, sem backend | decide quais etapas existem (já decidiu: este plano é a versão podada) |
| Onde o repo fica e se é público ou privado | `git@github.com:flaviovmix/SEIRES.git`, **privado** | repo público publica na hora tudo que entrar, e o histórico não esquece |
| O que entra no git | texto (plano, roteiros, prompts, `_telas.md`, `_publicado.json`), HTML/CSS/JS (animações, modelos, scripts) e imagem pequena; **áudio e vídeo ficam fora** | o GitHub recusa arquivo acima de 100 MB e o repo inchado fica impossível de clonar. O teto por arquivo se mede aqui, olhando os maiores `png` e `animacao.html` |
| Branch de trabalho e política de merge | `main` sempre no estado que está no ar; trabalho numa branch por frente; merge só por ordem do dono, quando o episódio vai ao ar | evita commit na branch errada no dia 1 |
| Fonte de verdade da animação | o arquivo **fonte** (tokenizado, sem base64) é o que se edita; o construído sai por script e nunca se edita à mão | em `01 - A faísca` aconteceu o contrário e a fonte ficou velha (P4). Trocar depois é refazer o episódio |
| Dependência de terceiro nos modelos 3D | three.js via CDN **hoje**; embutir ou não se decide na Etapa 4 (P3) | nota publicada que depende de CDN cai junto com o CDN |
| Onde publica | notas no Nexus (`nexus.afx.art.br`, page 354), com áudio no bloco de podcast e a animação como anexo | hospedagem e HTTPS são do Nexus, não deste plano |
| Dado pessoal | nenhum: sem usuário, sem formulário, sem comentário. Pessoas que aparecem são figuras históricas, com imagem em domínio público ou CC com crédito em `img\CREDITOS.md` | LGPD não alcança; licença de imagem sim, e crédito faltando é o que derruba conteúdo |
| Teto de custo mensal | R$ 0 além do que já existe (Nexus, domínio); NotebookLM e Google Flow no plano gratuito. Backup externo, se pago, entra aqui com o valor | assinatura que vence derruba o backup em silêncio |
| Método: estudo ou entrega | **entrega**: o dono revisa e valida, o executor executa. Cada etapa pode declarar estudo no começo dela | muda como cada etapa executa (`1-formato-do-plano`, item 8) |
| Regra de nomenclatura | a que a série já usa: pasta `NN - <Nome>` sem palavra-rótulo, episódio numerado pela posição histórica dentro da etapa, prompt `NN-NN-<Nome>.txt`, arquivos de apoio com `_` na frente | escrita aqui pra não desviar depois |
| O que conta como publicado (🟢) | nota no ar **com áudio e animação**; só áudio é 🟠 (P2) | sem a regra o placar do plano da série diverge das tabelas |

Tarefas:
- **Repo, nesta ordem, que importa:** medir os maiores arquivos por tipo, fechar o `.gitignore` (áudio, vídeo, `__pycache__`, `_v1\` se for lixo, e o que mais a decisão acima disser), conferir com `git status` que nada pesado está prestes a entrar, **primeiro commit só com o esqueleto** (plano, texto e código), e enviar pro remoto que já existe. Arquivo que entrou no primeiro commit fica no histórico pra sempre.
- Criar a **branch de trabalho** já, e deixar a `main` no estado publicado desde o começo (regra de git em `1-formato-do-plano`, item 7).
- `README.md` que ensina alguém a produzir um episódio do zero lendo só ele: pré-requisitos (node, python, faster-whisper, Playwright, o lab do NotebookLM em `AppData\Local\notebooklm-lab`), a ordem de produção do `plano-da-serie.md`, e os comandos de cada script em `_arquivos\scripts\`.
- **O README documenta o dev-loop da animação:** o que é editar a fonte, o que é reconstruir (`embute-imagens.js`, `embute-modelo-3d.js`), o que é só F5. "O fix não aparece" quase sempre é o construído que não foi refeito.
- Alerta de vulnerabilidade de dependência: **não se aplica** enquanto não existir `package.json` nem `requirements.txt` no repo. Se um dia entrar, ligar o Dependabot no mesmo commit.
- Estrutura por episódio, que a série já tem: o HTML, as imagens, o roteiro e o mapa de telas do mesmo episódio moram na mesma pasta. Nada de pasta-balde.
- Escrever as respostas da tabela acima como `D1..Dn` no `plano.md`, com a data.

---

**Pronto quando:** alguém que nunca viu o projeto entende como um episódio nasce lendo só o README, as decisões `D*` estão escritas no plano, e o repositório remoto tem o primeiro commit sem nenhum áudio ou vídeo dentro (`git ls-files` prova), com a branch de trabalho criada.

**Desvios registrados:**

- (27/08/2026) Pasta do molde copiada pelo executor para `SEIRES/plano/`, não pelo dono: a pasta do projeto estava vazia (só `.git`, remoto `flaviovmix/SEIRES` já apontado, nenhum commit). Nome preenchido pelo nome da pasta e do repo.
- (27/08/2026) A série "Como Reinventar o Computador do Zero" (1,7 GB) foi movida de `PODCAST/01 - SÉRIE/` para a raiz deste repo a pedido do dono, sem a casca `01 - SÉRIE` (repetiria o pai). Ponteiros ajustados em `.claude/components/modelo-3d.md`, `README.md` e nas memórias; `/PROJETOS/SEIRES/` entrou no `.gitignore` de `C:\src` como os outros repos independentes.
- (27/08/2026) O dono disse "sem backend, sem banco de dados etc" e pediu: "o que não inclui remove e adiciona o que vamos precisar". O plano foi podado de 16 etapas para 6: saíram banco, ambiente, servidor, autenticação, admin, CRUD, upload, e-mail, endurecimento de app, celular instalável e o bloco de loja; entraram backup dos arquivos pesados, base comum das animações, rede de testes por Playwright, publicação no Nexus e operação. As regras `2` a `5` foram podadas junto; a `1` ficou como veio.

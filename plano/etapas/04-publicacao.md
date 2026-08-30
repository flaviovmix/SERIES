## Etapa 4: Publicação

**Objetivo:** um episódio vai ao ar por procedimento escrito e conferido por script, não de memória.

A publicação já aconteceu quinze vezes, e o caminho vive em três lugares: a seção Produção do `plano-da-serie.md`, a memória da sessão que publicou e a cabeça de quem publicou. Cada vez que um pedaço foi esquecido (capa não apagada da coleção, título da pasta no lugar do título do podcast, faixa fora da tabela do acervo) o plano ganhou um aviso em negrito. Esta etapa transforma os avisos em procedimento e em conferência.

Tarefas:
- **Procedimento de publicação escrito no README, passo a passo, copiável**: mapa de telas obrigatório (`mapa-de-telas.py`) e a segunda passada com `--confere`; animação construída pelo script da Etapa 2 e verde na rede da Etapa 3; nota no Nexus (page certa, título = nome que o NotebookLM deu ao áudio, capa via `coverAttachmentId`, bloco de podcast com a faixa, animação como anexo); `_publicado.json` na pasta; linha na tabela "Publicados no acervo" e status na tabela da etapa do `plano-da-serie.md`; visão HTML do plano regerada (`gerar-plano-serie.py`).
- **Conferência pós-publicação como script versionado**, rodando contra a nota real depois de cada subida: a URL da nota responde, o player está lá com a faixa certa, o anexo abre e é a `animacao.html` da versão construída (comparar um hash), a capa carrega, e a nota é pública sem login (a régua dos três papéis virou uma: anônimo).
- **O que é público é público por decisão, não por link escondido**: escrever quais rotas do Nexus a nota usa e conferir que a página pública não expõe nada além do episódio.
- **Créditos de imagem na nota**: toda prancha com selo `imagem real` de licença CC BY ou CC BY-SA precisa do crédito visível na legenda; o script confere que `img\CREDITOS.md` não lista imagem sem crédito na animação.
- **Resolver a P3**: three.js via CDN dentro de um anexo publicado. Medir o custo de embutir (tamanho do construído) contra o risco de o CDN sumir, e travar como `D*`.
- **Refazer um episódio publicado tem procedimento próprio**: o que acontece com a nota antiga (editar no lugar, mantendo a faixa, ou nota nova e a antiga arquivada), onde vai a versão anterior (`OLD\`, `_v1\`) e como a tabela do acervo registra a troca. Sem isso o refazer de boa parte dos publicados, já decidido na série, vira bagunça de faixa.
- Título e descrição da nota como o cartão de link vai mostrar em aplicativo de mensagem, e a capa leve o bastante pra virar miniatura.

---

**Pronto quando:** um episódio é publicado seguindo só o texto do README, a conferência pós-publicação roda verde contra a nota real, o `plano-da-serie.md` e a visão HTML foram atualizados na mesma sessão, e a P3 virou decisão escrita.

**Desvios registrados:**

(nenhum ainda. Aqui entra o que a realidade mudou no plano, com data e motivo,
inclusive desvio de método: "executado direto, a pedido do dono".)

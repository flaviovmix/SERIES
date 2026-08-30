## Etapa 1: Arquivos pesados e backup

**Objetivo:** nada da série existe em um lugar só. O que não vai pro git tem cópia fora desta máquina, e a cópia já foi restaurada uma vez.

Hoje o disco desta máquina é o único lugar onde vivem 1,7 GB de trabalho: os 27 mp3 gerados no NotebookLM (que não se regeneram iguais), o `video.mp4` e o `audio.mp3` da fonte, a transcrição, as ilustrações do Flow e do Commons, as capas, e as animações construídas. O `C:\src` não versiona nada disso, e a memória do projeto registra que já não houve como desfazer uma edição por falta de histórico.

Tarefas:
- **Inventário escrito** por tipo e tamanho: o que é insubstituível (áudio gerado, ilustração aprovada, transcrição com timestamps), o que se refaz por script (animação construída, mapa de telas, thumb de modelo) e o que é lixo em potencial (`_v1\`, `OLD\`, `__pycache__`, capas rejeitadas).
- Regra escrita de **onde mora o que não vai pro git**: um destino fora desta máquina (disco externo, nuvem, ou os dois), com a mesma estrutura de pastas da série, pra um mp3 ser achado pelo caminho e não por busca.
- Backup **automático ou com ritual de cadência escrita** (ex.: toda vez que um episódio vai ao ar, e no mínimo uma vez por mês). Backup que depende de lembrar não é backup.
- **Restauração testada uma vez**, numa pasta limpa: apagar de propósito um episódio inteiro da cópia local e trazer de volta do backup, conferindo tamanho e que o áudio toca.
- **Backup vigiado**: um script que compara a árvore local com o destino e lista o que falta ou divergiu em tamanho. Roda no ritual da Etapa 5.
- Decidir o destino de `OLD\` (12 episódios publicados, 616 MB) e das `_v1\`: histórico que fica no backup, ou lixo que sai. Escrever a decisão; não apagar calado (`4-anti-padroes`, última linha).
- Os arquivos que **vão** pro git entram agora, num commit por tipo (texto, animações, modelos, scripts), com o `.gitignore` da Etapa 0 provando que o pesado ficou de fora.

---

**Pronto quando:** um mp3 apagado de propósito volta do backup pelo caminho, o script de conferência diz "nada faltando" depois disso, `git ls-files` não lista nenhum áudio ou vídeo, e o inventário está escrito com o destino de cada tipo.

**Desvios registrados:**

(nenhum ainda. Aqui entra o que a realidade mudou no plano, com data e motivo,
inclusive desvio de método: "executado direto, a pedido do dono".)

## Etapa 3: A rede de testes das animações e dos modelos

**Objetivo:** um comando só confere todos os episódios e todos os modelos, e falha quando algo quebra.

O teste já existe na série, mas de forma solta: cada episódio foi conferido com Playwright na hora de publicar, e o QA dos modelos passou 27/27 com metade da máquina escondida atrás do painel. Isso é o que `1-formato-do-plano` chama de fila invisível: ninguém repete aquele clique na mudança seguinte, e a base da Etapa 2 vai mudar todos os episódios de uma vez.

Tarefas:
- **Um executor, um comando**: `node testa-serie.js` (ou `python`), em `_arquivos\scripts\`, que percorre toda pasta de episódio com `animacao.html` e todo modelo em `modelos-3d\`. Playwright, não patchright (o patchright roda `page.evaluate` em mundo isolado e o gancho `window.__<maquina>` some), com `channel: 'msedge'`.
- **Por episódio, o que se afirma:**
  - o número de telas da animação é o número de telas do `_telas.md` (o que o áudio realmente pede), nem uma a mais;
  - toda tela que o `_telas.md` marca como interativa tem o botão ou a peça que o áudio manda apertar;
  - console limpo (nenhum erro de JS, nenhuma imagem quebrada, nenhum token `__X__` cru);
  - régua de 4 tamanhos: nenhum estouro horizontal, medido elemento por elemento (`3-reguas-de-validacao`, régua 1);
  - régua de sobreposição: `elementFromPoint` no centro do botão Próximo e do primeiro card devolve o próprio alvo (régua 2);
  - as setas do teclado trocam de tela, inclusive com o ponteiro dentro do modelo embutido;
  - peso do construído dentro do orçamento da Etapa 2.
- **Por modelo 3D, o que se afirma:** o gancho `window.__<maquina>` existe, `pixels()` projeta cada peça pra dentro do palco e fora do painel (a asserção que faltava quando o registro e o balde do Prédio da Água sumiram atrás do HUD), os botões do painel mudam o estado, e o postMessage das setas chega ao pai quando embutido.
- **Relatório por episódio**, com o nome da pasta e o que falhou, pra o dono abrir só o que quebrou.
- **Erro da fila nasce com o teste que o reproduz** (`1-formato-do-plano`, item 4): o "George Richmond" do ep `04-01` teria virado uma linha na conferência de nomes próprios do `_telas.md`. A partir daqui, `erros.md` só fecha com a linha de teste correspondente.
- A rede é **parametrizada**: episódio novo custa zero linhas de teste, porque o executor descobre as pastas sozinho. Se custar mais que isso, a rede não ficou parametrizada e se conserta agora.
- O que fica **fora** do script, escrito: sincronia de áudio com tela (o ouvido do dono), qualidade da ilustração, e gesto no aparelho real. É a régua 7: quem fecha é o dono.

---

**Pronto quando:** o comando roda verde em todos os episódios publicados e em todos os modelos, quebrar de propósito uma tela (apagar o botão Próximo de uma) faz ele falhar apontando a pasta, e a lista do que o script não cobre está escrita nesta etapa.

**Desvios registrados:**

(nenhum ainda. Aqui entra o que a realidade mudou no plano, com data e motivo,
inclusive desvio de método: "executado direto, a pedido do dono".)

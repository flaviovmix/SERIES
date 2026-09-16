# Anti-padrões

Podada do molde em 27/08/2026: saíram as linhas de banco, login, upload e CRUD, e entraram as que a série já pagou pra aprender (estão no `plano-da-serie.md` como avisos em negrito).

| Anti-padrão | Por que não fazer |
|---|---|
| Montar a animação antes de o áudio existir | o NotebookLM é a única peça que ninguém controla; ele pede "Próximo" menos vezes que o roteiro manda, e a animação pronta fica dessincronizada. O `_telas.md` vem primeiro |
| Copiar o roteiro do episódio anterior em vez do `_molde-roteiro.txt` | a REGRA DURA das telas e as regras de 26/08 (janela temporal, ficha humana) só existem no molde; a cópia carrega o hábito velho |
| Copiar a `animacao.html` do episódio anterior | cada correção comum passa a exigir lembrar de todas as cópias. É a Etapa 2 inteira |
| Editar o HTML construído (com base64) em vez da fonte | a fonte fica velha e reconstruir perde trabalho, como aconteceu em `01 - A faísca` |
| QA que só afirma estado, sem projetar pra pixel | 27/27 verdes com metade da máquina atrás do painel. `pixels()` em todo modelo |
| patchright no lugar do Playwright | `page.evaluate` em mundo isolado faz o gancho do modelo parecer `undefined`, e o bug parece do modelo |
| Imagem gerada apresentada como gravura de época | quebra a promessa da série e a confiança do ouvinte. Selo `ilustração` sempre |
| Imagem CC BY ou CC BY-SA sem crédito na legenda | é o único jeito de perder o direito de usar o que já está publicado |
| Palavra-rótulo no nome da pasta (`Etapa 04 - ...`) | o número já diz o que é; o nome no disco tem que ser a linha da tabela do plano |
| Áudio ou vídeo no git | o GitHub recusa acima de 100 MB, e o que entrou uma vez fica no histórico pra sempre |
| Deixar o backup pro fim | 1,7 GB num disco só, com 27 áudios que não se regeneram iguais |
| Etapa fechada só com validação manual | vira fila invisível: ninguém repete aquele clique na mudança seguinte |
| Montar a rede de testes só depois de refazer os episódios | a base nova muda todos de uma vez, e sem a rede a regressão aparece meses depois, longe da mudança que causou |
| Estado "apagado" por opacidade | fundo e texto desbotam juntos. Não existe opacidade que ainda pareça apagada e passe em contraste AA |
| `animation: none` no `prefers-reduced-motion` | o que revela por opacidade fica invisível pra sempre. Duração ~0, nunca `none` |
| Interação principal só no clique | teclado não alcança, e é a falha de acessibilidade mais cara de consertar depois |
| Imagem de conteúdo com megabytes dentro do construído | o anexo pesa o que a soma dos base64 pesa; imagem repetida em duas telas pesa duas vezes sem `data-reusa` |
| Buscar a classe no HTML pra saber se o CSS morreu | seletor criado em tempo de execução pelo JS parece morto na busca e está vivo |
| Deixar a régua de legibilidade pra uma varredura final | retrofitar nome e tamanho de função em código pronto é um plano inteiro, e meses depois ninguém lembra por que o código é daquele jeito |
| Perseguir percentual de cobertura | percentual alto convive com caminho crítico descoberto, e o número vira teste que percorre linha sem afirmar nada |
| Erro da fila fechado sem teste que reproduz | o mesmo erro volta na mudança seguinte, e a fila vira roda-viva |
| Limpar `OLD\`, `_v1\` ou "sobra" sem conferir a origem | apaga a única cópia de um áudio achando que era resíduo |

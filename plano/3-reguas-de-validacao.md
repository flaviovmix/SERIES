# Réguas de validação

Escrever estas sete no plano do projeto, e usar em todo "pronto quando". Podadas do molde em 27/08/2026: a régua dos três papéis (anônimo, comum, administrador) saiu, porque aqui só existe o anônimo, e no lugar dela entrou a régua que a série mais precisa, a do áudio batendo com as telas.

**1. Régua de 4 tamanhos.** 3840×2160, 1920×1080, 768×1024, 360×800. Nenhum estouro horizontal em nenhum. Atenção: se o corpo da página esconde estouro por configuração de overflow, a medida da largura de rolagem **não acusa nada**. Medir elemento por elemento.

**2. Régua de sobreposição.** `elementFromPoint` no centro dos alvos principais (botão Próximo, primeiro card, contador): o que responde tem que ser o próprio alvo. Elemento fixo ou grudado cobrindo conteúdo é o defeito que nenhuma medida de overflow acusa. Nos modelos 3D o alvo é a peça da máquina, e o que cobre é o painel: `pixels()` projeta cada peça e o teste falha se alguma cair atrás dele.

**3. Comportamento idêntico, exceto o delta declarado.** Etapa de organização não muda comportamento. Se mudou algo, ou é o delta que a etapa declarou no começo, ou é regressão. A Etapa 2 (base da animação) é toda ela uma etapa de organização.

**4. Comparação geométrica antes e depois.** Pra mudança grande de CSS ou de estrutura, medir a caixa e as propriedades computadas de todo elemento nas duas versões, na mesma tela. É prova mais forte que olhar imagem. Os jeitos conhecidos de o próprio teste mentir:
- Elemento medido **no meio da animação de entrada** devolve cor misturada com o fundo. Esperar terminar antes de medir, ou congelar a animação por JavaScript.
- Contagem de token cru (`__X__`) ou de inline se faz **no HTML construído, não no DOM**: o que o JS aplica em runtime vira atributo no DOM e dá falso positivo.
- Ferramenta que conta **linha** não conta **ocorrência**: padrão que casa dentro de outro padrão erra a auditoria (foi assim que o embutidor trocava só a primeira imagem).
- `page.evaluate` em mundo isolado (patchright) não enxerga o gancho do modelo: usar Playwright.

**5. Áudio e telas batem.** O número de telas da animação é o número de vezes que o áudio pede "aperte o Próximo" (o `_telas.md` diz), toda instrução de interagir que o áudio dá tem a peça correspondente na tela, e a janela temporal declarada na abertura é a mesma nos três lugares (Overview, roteiro, ficha da primeira tela). Animação montada antes do `_telas.md` existir não passa nesta régua por definição.

**6. Peso e performance.** Orçamento de peso do construído escrito no plano (a `animacao.html` inteira e a maior imagem, em número), imagem repetida declarada uma vez e reusada por `data-reusa`, e o score de performance medido junto com o de acessibilidade, na mesma rodada.

**7. Quem fecha é o dono.** Automação adianta, mas etapa fecha com o dono validando no navegador e no ouvido, recebendo o link, cobrindo o que script nenhum mede: a sincronia do áudio com a tela, a qualidade da ilustração, o gesto no aparelho.

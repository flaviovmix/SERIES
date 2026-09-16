# Como executar o plano

Podado do molde em 27/08/2026 para um projeto de conteúdo, sem servidor. As etapas citadas são as deste plano (0 a 5).

## Abrindo a sessão

Antes de qualquer coisa, ler o `plano.md` e se situar sozinho:

- **Já tem nome e a tabela tem `✅`** = projeto em andamento. Dizer a etapa, a subetapa, a data da última mexida e o próximo "pronto quando", e só então carregar o arquivo daquela etapa.
- **Já tem nome mas nenhum `✅`** = a Etapa 0 ainda não fechou. Abrir a Etapa 0 e continuar dela: as propostas de decisão estão na tabela de lá, esperando o dono confirmar.

Em nenhum dos casos abrir etapa que não é a atual. O `plano-da-serie.md` é outro plano, com outro assunto (o que produzir); ele é carregado quando a tarefa é produzir episódio, não quando é executar uma etapa daqui.

## Em toda etapa

- **Uma etapa por vez**, com confirmação entre elas; fechamento e validação conforme a `1-formato-do-plano`, item 6.
- **Etapa fecha com o comportamento dela dentro da rede de testes** (`1-formato-do-plano`, item 9) **e com o código dela passando pela régua de legibilidade** (item 10). O que ficou de fora, nos dois casos, se escreve como `P*`, nunca se cala.
- **Decisão ambígua no meio do caminho pausa a execução.** A decisão vira `D*` escrita, não escolha silenciosa do executor.
- **Mexida grande começa com levantamento registrado** (o mapa do que existe) antes da primeira edição. A Etapa 2 é o caso típico: abrir as 15 animações antes de extrair a base.
- **Padrão do projeto ganha do gosto de quem escreve.** Mas padrão ruim repetido não é padrão, é dívida: sinalizar em uma frase antes de replicar, nunca propagar calado nem consertar sozinho.
- **Sinalizar refatoração é sempre bem-vindo. Executar precisa de OK.**
- Git conforme a `1-formato-do-plano`, item 7: não commitar sem pedido; savepoint antes de etapa arriscada é bem-vindo.

## O contrato do modo entrega

O plano roda em **entrega** (decisão da Etapa 0): o dono revisa e valida, o executor executa. Sem a lista do que se decide sozinho, o executor cai num de dois extremos, e os dois custam caro: ou pergunta o que o plano já decidiu, e a produção vira ping-pong; ou decide calado o que era do dono, e ele descobre três etapas depois.

**Antes de começar cada etapa, reler as decisões `D*`.**

**Segue sozinho, sem perguntar** (tudo isto o plano já decidiu; perguntar é ruído):

| Segue | Onde já foi decidido |
|---|---|
| Nomenclatura de pasta, episódio, prompt e arquivo de apoio | Etapa 0 |
| Onde o arquivo novo mora: na pasta do episódio, ou na base se é comum | Etapas 0 e 2 |
| Imagem nova entra com selo (`ilustração` ou `imagem real`) e linha em `img\CREDITOS.md` | regras da série, `plano-da-serie.md` |
| Episódio novo aparece na rede de testes sozinho, sem linha nova | Etapa 3 |
| A régua de legibilidade rodando no diff da própria etapa | item 10 |
| Regerar a visão HTML depois de mexer em qualquer plano | Etapa 5 |

**Para e pergunta, sempre** (cada um destes é uma decisão do dono disfarçada de detalhe técnico):

| Para | Por quê |
|---|---|
| Terceiro clone de uma peça repetível (prática interativa, tela, componente) | extrair base é decisão de arquitetura, não de estilo (Etapa 2) |
| Escolha que não está coberta por nenhum `D*` | vira `D*` escrita, com data, não escolha silenciosa |
| Gambiarra: JS como string, seletor frágil, contorno de limitação do Playwright ou do NotebookLM | o dono aceita ou recusa a fragilidade sabendo o preço |
| Apagar ou mover o que está em `OLD\`, `_v1\` ou no backup | não tem desfazer, e "sobra" pode ser a única cópia |
| Mexer em nota já publicada (título, faixa, anexo) ou em episódio já no ar | é contrato publicado: quem já ouviu, linkou ou baixou não aparece no teste |
| "Pronto quando" que não é alcançável do jeito que foi escrito | o critério muda por decisão registrada, nunca por interpretação de quem executa |

**O que nunca é opcional, mesmo com pressa:** a rede de testes verde antes de publicar, a conferência pós-publicação, o crédito das imagens, e o registro do que foi feito no plano na mesma sessão (`1-formato-do-plano`, item 6). "Estamos sem tempo" encurta o método de estudo, nunca estes quatro. Etapa entregue sem eles não está entregue, está devendo.

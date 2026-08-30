# O formato do plano

O formato que todo plano copiado deste molde segue.

### 1. O número da etapa é a prioridade

Etapa numerada, executada na ordem. Ao terminar uma, **não renumerar as outras**. A ordem só muda por decisão explícita, registrada.

### 2. Anatomia de uma etapa (copiar este bloco)

```markdown
### Etapa N: Título curto

**Objetivo:** uma frase. O que passa a ser verdade quando ela fecha.

**Conteúdo de estudo (opcional):** o conceito que esta etapa ensina.
É o que torna um desvio de método recuperável: se o dono pedir "pode
executar", o registro do desvio aponta pra cá, em vez de o aprendizado
evaporar junto com a pressa.

Tarefas:
- item concreto, com o arquivo/tabela/rota quando já se sabe
- item concreto

**Pronto quando:** critério observável, de preferência algo que dá pra
clicar, medir ou rodar. Nunca "está implementado". Etapa que criou
comportamento fecha pelo item 9 (dentro do arnês) e etapa que escreveu
código fecha também pelo item 10 (régua de legibilidade no diff dela).
Com o modo estudo ligado (item 8), inclui o dono explicando com as
próprias palavras o que mudou e por quê.

**Desvios registrados (DD/MM/AAAA):**
- o que a realidade mudou no plano, e por quê
- desvio de MÉTODO também se registra: "executado direto, a pedido do
  dono (frase usada)", com o ponteiro do que vale ler depois
```

O campo **Desvios registrados** é o que faz o plano sobreviver. O plano nunca está certo; o plano mais o que aconteceu está.

**Etapa densa se quebra em subetapas numeradas** (5.1, 5.2, 5.3...), cada uma com o próprio "pronto quando". A Etapa 5 sozinha passa de quinze tarefas, e um critério de fechamento só, pra tudo aquilo, é grande demais pra validar de uma vez: ou vira "está implementado", ou fica aberta por semanas. Com subetapa, o dono fecha de pouco em pouco e a tabela de status mostra a posição exata ("em andamento, 5.3 de 6") sem custar contexto, porque o detalhe continua dentro do arquivo da etapa. Subetapa também respeita a régua 7: o "pronto quando" dela é algo que o dono vê no navegador.

### 3. Decisões e pendências têm código

- `D1, D2, D3...` são decisões **travadas**. Uma vez escritas, não se repropõe. Se mudar, a decisão nova entra com data e o motivo da virada.
- `P1, P2, P3...` são pendências que precisam do dono do projeto. Cada uma diz **em que etapa** ela trava. Pendência sem etapa dona vira esquecimento.

**Escolha de fornecedor não nasce travada, nasce como default declarado.** Gateway de pagamento, provedor de e-mail, emissor de nota fiscal, intermediador de frete: o plano vem com uma sugestão pronta, pra ninguém travar no começo escolhendo entre cinco opções equivalentes. Mas ao chegar na etapa que usa aquele fornecedor, o executor **diz em voz alta que aquilo é o default do plano e que dá pra trocar**, e só vira `D*` depois que o dono confirmar. A diferença importa: decisão de arquitetura (onde mora o upload, idioma do domínio) é irreversível e por isso trava no dia 1; fornecedor é troca de integração, e quem paga a conta escolhe.

```markdown
## Decisões
- D1. (DD/MM/AAAA) ...

## Pendências
- P1. ... **Trava a Etapa N.**
```

### 4. Fila de erros mora em arquivo separado

O plano tem começo e fim. A fila de erros não conclui nunca. Ela mora ao lado do plano, em `erros.md`, pra que o plano não fique preso a um item que só o usuário final fecha. Modelo de entrada:

```markdown
### E<N>: [título curto]
- **Status:** 🔴 reportado | 🟡 em análise | 🔧 corrigido local | 🚀 subido | ✅ validado
- **Data:** DD/MM/AAAA · **Reportado por:** [quem]
- **Descrição / Como reproduzir / Causa / Correção / Teste que reproduz**
```

Só fecha em ✅ quem reportou, vendo funcionar em produção. E **erro corrigido nasce com o teste que o reproduz**: o teste falha antes da correção e passa depois. Sem isso o mesmo erro volta na mudança seguinte e a fila vira roda-viva.

### 5. Régua de validação fixa, escrita no plano

Todo "pronto quando" visual passa pelas réguas de **`3-reguas-de-validacao`** (a lista dos 4 tamanhos mora lá, num lugar só). Nada fecha valendo só no desktop. Em etapa de interface de verdade, também em aparelho real.

### 6. Uma etapa por vez, e quem fecha é o dono

- Confirmação entre etapas. Ao fechar, marcar `✅ + data` **nos dois lugares**: no título dentro do arquivo da etapa e na linha da tabela de status do `plano.md`. São dois lugares porque servem a leituras diferentes (o detalhe e o panorama), e é a tabela que permite qualquer sessão futura saber onde parou sem abrir etapa nenhuma. Índice desatualizado é pior que índice nenhum, então atualizar a linha faz parte de fechar, não é tarefa à parte.
- **Validação automática adianta, mas não fecha etapa.** Quem fecha é o dono validando no navegador (`3-reguas-de-validacao`, régua 7). "Visual pendente" acumulado em várias etapas é fila invisível.
- **Quem executa atualiza o plano na mesma sessão.** Registro retroativo, dias depois, por outra sessão, é o sintoma de que essa regra falhou.

### 7. Regras de git, escritas no plano

| Regra | Por quê |
|---|---|
| Branch de trabalho por frente, nunca direto na principal | a principal fica sempre no estado que está publicado |
| A principal só recebe merge por **ordem explícita** do dono do projeto | merge é publicação. Quem decide publicar é quem responde pelo produto |
| Merge/PR em lote **pequeno**: uma etapa fechada por vez, nunca a frente inteira acumulada | branch por frente + merge só por ordem tende a acumular o PR gigante que ninguém consegue revisar. Etapa fechada é a unidade natural de revisão |
| **Não commitar sem pedido** | o dono revisa antes. Commit automático rouba a chance de dizer "isso não" |
| Savepoint antes de etapa arriscada: commit local, sem enviar | ponto de retorno com tudo verde e validado. Barato de criar, caro de não ter |
| Planos diferentes que mexem no mesmo app **compartilham a branch** | uma branch por plano no mesmo código vira conflito de merge sem ganho nenhum |
| Frente nova só com a anterior commitada | migrations e arquivos pendentes de outra frente conflitam calado com o trabalho novo |
| `.gitignore` fechado **antes do primeiro commit** | artefato de build, `.env`, upload local, pasta de trabalho. Arquivo que entrou uma vez fica no histórico pra sempre |
| Mensagem de commit diz o **porquê**, não o quê | o diff já mostra o quê |
| Segredo commitado por engano: **trocar o segredo**, não apagar a linha | apagar não remove do histórico. Só a troca mata o risco |
| Nunca reescrever histórico já enviado, nem descartar trabalho local, sem conferir antes | operação destrutiva pede confirmação, sempre |

### 8. Método de execução: estudo ou entrega

Decidir na Etapa 0 (vira uma decisão `D*`): **este plano também é estudo, ou é só entrega?**

Com o modo estudo ligado:
- O dono no teclado nos **2-3 primeiros movimentos** de cada etapa, com o executor guiando. O aprendizado está no primeiro movimento, não no 13º. O executor completa o repetitivo com o dono conferindo.
- Cada etapa declara o **Conteúdo de estudo** (anatomia, item 2) e fecha com o dono explicando com as próprias palavras o que mudou e por quê.
- O modo se declara **no início de cada etapa**, não uma vez pro plano inteiro. "Pode executar, estamos sem tempo" vale só pra etapa em que foi dito; a seguinte volta ao método por default, senão o desvio vira permanente calado.
- Desvio registrado (anatomia, item 2) com a leitura pulada virando pendência `P*` com etapa dona, pra dívida de estudo ter cobrança.

Aviso honesto: esse método é o primeiro que a pressa atropela. Por isso ele é **escolha declarada com compensação escrita**, não regra dura.

### 9. Teste não é etapa: é como a etapa fecha

O **arnês de teste** (executor rodando por um comando, perfil de teste, banco de verdade com transação revertida, pasta de trabalho descartável) é **infraestrutura**, da mesma classe que migration e deploy. Ele nasce na **Etapa 2**, com o esqueleto ainda vazio. Não na etapa do primeiro CRUD: montar arnês depois de sete etapas prontas obriga a refazer o caminho de cada uma delas na mão pra descobrir o que já estava quebrado.

A partir dele a regra é sistemática: **toda etapa que cria comportamento verificável por máquina fecha com esse comportamento dentro do arnês**, e o "pronto quando" aponta o comando que roda, não o clique que alguém deu. Etapa fechada só na mão deixa fila invisível, porque ninguém repete aquele clique na mudança seguinte.

O que continua sendo do dono, no navegador (`3-reguas-de-validacao`, régua 7), é o que script nenhum mede: arraste, upload grande com a barra andando, corte de imagem, gesto no aparelho. As duas coisas convivem e nenhuma substitui a outra.

**Cobertura não se persegue por percentual.** Não há número neste plano de propósito: percentual alto convive com caminho crítico descoberto, e perseguir o número produz teste que percorre linha sem afirmar nada. O que se cobra é a lista das etapas fechadas com o comportamento delas no arnês, e o que ficou de fora **escrito** como pendência `P*` com etapa dona. A Etapa 13 lê essa lista antes de abrir pro primeiro usuário.

### 10. Legibilidade se confere na etapa, no código da própria etapa

Par do item 9, e igualmente sistemático: **toda etapa que produziu código fecha passando a régua do `/codigo-humanizado` no que ela produziu**, não no projeto inteiro. O item 9 garante que a etapa funciona; este garante que ela dá pra ler. Nenhum dos dois é etapa própria.

A régua: função com uma responsabilidade e até umas 30 linhas, nome que dispensa comentário, HTML semântico, CSS enxuto por componente, JS espelhando o CSS, pasta que um humano entende sem buscar.

**O escopo é o tamanho do diff da etapa**, e é isso que torna a regra viável: são minutos, com o contexto ainda fresco, feita por quem acabou de escrever e ainda lembra por que escreveu daquele jeito. O que a régua encontrar se conserta ali. Achado que não cabe na etapa vira `P*` com etapa dona, nunca fica calado.

**Varredura de legibilidade no projeto inteiro é sintoma de que esta regra falhou.** Retrofitar nome e tamanho de função em código pronto não é uma tarefa, é um plano inteiro, e sai caro por um motivo que não é técnico: meses depois ninguém lembra mais por que aquele código é daquele jeito, então cada mudança vira arqueologia antes de virar melhoria. A Etapa 13 confere; ela não é o lugar onde a legibilidade é descoberta.

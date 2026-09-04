# Série: JAVA WEB — estudar programação na era dos modelos de linguagem

**Estado:** arco proposto em 04/09/2026 (3ª versão, depois que o Flávio fechou a tese da série). Nenhum episódio gravado ainda.
**Formato:** episódios NotebookLM via `/criar-podcast` (trio `Overview.txt` + `_NotebookLM_` + prompt por episódio), cada um com sua `animacao.html`, no mesmo molde da série *Como Reinventar o Computador do Zero*.
**Fonte:** conhecimento próprio + o código real que o Flávio já mexe (XTtreinamento/Jasap, Nexus, KIDS). Não há vídeo de origem: cada roteiro nasce aqui.
**Capa:** `site/img/serie-java-web.webp` (Flow, projeto `0a1413ec-a180-4346-9d4b-f3f18cdb9643`; original em `_arquivos/capa-java-01.png`). Aprovada em 04/09 mesmo sendo clara enquanto as outras são escuras.

---

## A tese

Escrever código ficou fácil. Pedir pra uma IA e receber uma aplicação inteira funcionando leva minutos, e ela funciona mesmo.

O problema é o que vem depois. **Código que funciona e que você não entende é uma bomba-relógio.** Ela não explode no dia em que foi escrita: explode seis meses depois, quando o comportamento muda, quando o dado cresce, quando alguém de fora encontra a brecha, ou quando você precisa mexer numa linha e descobre que não sabe qual peça vai cair junto. Nessa hora não adianta pedir pra IA consertar: você não sabe nem descrever o que está errado.

Esta série existe pra essa hora. Ela **não é contra usar IA** — é a favor de você saber o que está aceitando. Nós construímos uma aplicação Java web inteira, peça por peça, do jeito difícil, pra que cada coisa que a IA escrever depois passe por alguém que entende.

**O princípio vale pra qualquer linguagem e qualquer banco.** Java é o veículo, não o assunto. Sessão, requisição, transação, índice, migração, deploy: os nomes mudam de stack pra stack, a ideia não muda. Todo episódio fecha dizendo **o que dali transfere** pra Python, pra JavaScript, pro banco que for.

## As três pessoas na oficina

- **Professor:** o Claude. Explica a peça, mostra o problema **antes** da solução, e não entrega código pronto quando o objetivo é o Flávio digitar.
- **Aluno:** o Flávio. Todo episódio termina com uma coisa que **roda na máquina dele**.
- **O programa:** uma **lista de tarefas**. Nasce no terminal na etapa 4 e cresce até estar no ar na 14. Nada de exemplo solto que some no episódio seguinte.

## Arco da série

Uma pergunta única atravessa tudo: **como uma lista de tarefas escrita num papel vira um site que outras pessoas usam, sem que nenhuma linha dela seja mágica pra você?**

**Regras que seguram tudo:**

1. **Nenhum framework antes da dor.** Spring Boot só na etapa 13, quando o ouvinte já sentiu na mão cada problema que ele resolve. Aí ele chega como alívio, não como mágica.
2. **Toda etapa fecha com o app rodando.** Se a etapa não deixou a lista de tarefas melhor do que estava, a etapa está errada.
3. **Todo episódio diz o que transfere.** Uma frase no fim: isso aqui, em Python, chama-se assim.
4. **A jornada é completa.** Ambiente, versionamento, teste, banco, deploy e o que quebra em produção entram na linha principal, não como apêndice.
5. **Extras são aprofundamentos.** Cada extra desce a fundo num assunto que travaria o episódio se fosse explicado no meio dele, e cada um declara em que ponto da série vale a pena ouvir.

---

## As 14 etapas

| # | Etapa | O que a lista de tarefas ganha | Eps | Status |
|---|---|---|---|---|
| 1 | **Por que ainda estudar isso** | (a tese: nada de código ainda) | 2 | 🔴 |
| 2 | **A oficina** | o ambiente de pé | 3 | 🔴 |
| 3 | **O histórico do que você escreve** | versionada, com volta no tempo | 4 | 🔴 |
| 4 | **A lista existe** | rodando no terminal, em memória | 3 | 🔴 |
| 5 | **Provando que funciona** | testes que rodam sozinhos | 3 | 🔴 |
| 6 | **A máquina que atende** | aparece no navegador | 3 | 🔴 |
| 7 | **O idioma da web** | dá pra adicionar tarefa por formulário | 4 | 🔴 |
| 8 | **O contêiner e o servlet** | roda no Tomcat, sem servidor caseiro | 3 | 🔴 |
| 9 | **Quem monta o HTML** | a tela sai de dentro do código Java | 3 | 🔴 |
| 10 | **Cada um com a sua lista** | login: sua lista é sua | 4 | 🔴 |
| 11 | **Arrumando a bagunça** | o mesmo app, agora legível | 3 | 🔴 |
| 12 | **O banco entra** | sobrevive quando o servidor desliga | 5 | 🔴 |
| 13 | **O framework assume** | o mesmo app em Spring Boot | 4 | 🔴 |
| 14 | **Pro mundo** | no ar, num endereço de verdade | 5 | 🔴 |

Status: 🔴 não iniciado · 🟠 parcial · 🟢 tudo publicado
**Placar:** 0 publicados · 49 pela frente (fora os 12 extras).

---

## Etapa 1 — Por que ainda estudar isso

*A etapa que justifica as outras treze.* Sem código: é a conversa que decide se vale a pena fazer o resto do jeito difícil.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **A bomba-relógio** | código que funciona e que ninguém entende. Por que o problema nunca aparece no dia da entrega, e como ele aparece depois: comportamento que muda, dado que cresce, brecha que alguém acha, linha que ninguém sabe mexer. O que se perde ao aceitar sem ler | 🔴 |
| `02` | **Estudar com a IA do lado** | o método desta série. A IA como professor e não como fornecedor: pedir explicação antes de pedir código, digitar em vez de colar, saber dizer o que o programa faz antes de rodar. Onde ela ajuda de verdade (o repetitivo, o erro obscuro, a segunda opinião) e onde ela atrapalha quem está aprendendo | 🔴 |

**Fecha quando:** ele consegue dizer, com as palavras dele, por que vai digitar coisa que a IA escreveria em dois segundos.

## Etapa 2 — A oficina

*Antes de escrever qualquer linha, saber onde a gente escreve.* Por que o Claude nunca abre NetBeans nem Eclipse, o que o VS Code é de verdade (um editor com terminal do lado, não uma IDE), e o primeiro programa compilado e rodado na mão.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Olá mundo sem IDE** | o pedido original do Flávio: VS Code, terminal integrado, `javac Ola.java`, `java Ola`. O que a IDE fazia escondido e por que doer uma vez ensina | 🔴 |
| `02` | **O que o `javac` faz** | fonte → bytecode → JVM. Por que Java roda em qualquer lugar e o que é aquele `.class` que apareceu na pasta | 🔴 |
| `03` | **Classpath e pacotes** | o erro mais comum de quem programa Java na unha (`could not find or load main class`), pasta = pacote, `-cp` | 🔴 |

**Fecha quando:** ele compila e roda um Java pelo terminal do VS Code, sem plugin mágico.
**Transfere:** todo interpretador e todo compilador tem esses três passos, com outros nomes.

## Etapa 3 — O histórico do que você escreve

*Antes de escrever o programa, ter como voltar atrás.* Git entra agora, e não no fim, porque a partir daqui tudo que ele digitar merece histórico — e porque o `.gitignore` tem que estar certo **antes** do primeiro `git add`, não depois.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Salvar não é guardar** | o que o Git resolve que a pasta `projeto-final-v3-agora-vai` não resolve. Repositório, `add`, `commit`, e o que é de fato um commit | 🔴 |
| `02` | **Voltar no tempo** | `log`, `diff`, `checkout`, desfazer sem pânico. O medo de perder trabalho é o que faz gente não experimentar | 🔴 |
| `03` | **O `.gitignore` e o segredo** | o que nunca entra: build, senha, `.env`. Arquivo commitado fica no histórico pra sempre, e segredo vazado só se resolve trocando o segredo | 🔴 |
| `04` | **Branch e o repositório remoto** | trabalhar sem quebrar o que funciona, e mandar pro GitHub. Por que a principal fica no estado publicado | 🔴 |

**Fecha quando:** o projeto dele está no GitHub, com `.gitignore` fechado antes do primeiro commit de código.
**Transfere:** Git é a mesma ferramenta em qualquer linguagem. Esta etapa não é sobre Java.

## Etapa 4 — A lista existe

*Antes da web, o programa.* A lista de tarefas nasce aqui, rodando no terminal, e é essa mesma que vai atravessar a série inteira.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Uma tarefa é um objeto** | classe `Tarefa` com título e feita/não feita; o que é objeto sem falar "paradigma" | 🔴 |
| `02` | **Muitas tarefas** | `List` e `ArrayList`, adicionar, percorrer, imprimir a lista numerada | 🔴 |
| `03` | **O menu no terminal** | `Scanner`, laço, `if/else`: adicionar, listar, marcar como feita. O primeiro programa dele que faz alguma coisa útil | 🔴 |

**Fecha quando:** a lista roda no terminal e ele consegue usar. **Some quando fecha o programa**, e esse incômodo é de propósito: é o gancho da etapa 12.
**Transfere:** objeto, lista e laço existem em tudo. A sintaxe muda, a ideia não.

## Etapa 5 — Provando que funciona

*"Testei aqui e funcionou" não é teste.* Entra cedo, com o app ainda simples, porque testar Java puro é fácil e testar web depois já é tarde pra aprender o conceito.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **O teste é um programa que usa o seu** | JUnit, o primeiro teste que roda sozinho, verde e vermelho | 🔴 |
| `02` | **O que testar e o que não testar** | o caso normal, o caso do limite e o caso do erro. Por que testar getter é desperdício e testar regra é seguro | 🔴 |
| `03` | **O teste que falha primeiro** | escrever o teste antes do conserto, pra provar que o bug existia. A rede de segurança que deixa refatorar sem medo | 🔴 |

**Fecha quando:** ele quebra o código de propósito e o teste acusa antes dele rodar o programa.
**Transfere:** JUnit, pytest, Jest: nomes diferentes, mesmo contrato. E é aqui que se decide se dá pra confiar em código gerado por IA: teste é como você confere sem ler linha por linha.

## Etapa 6 — A máquina que atende

*A mesma lista, agora no navegador.* Um servidor em Java puro, sem Tomcat e sem framework, só pra entender o que um servidor é: um programa que fica esperando.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Cliente e servidor** | quem liga pra quem, o que é uma porta, por que `localhost:8080` | 🔴 |
| `02` | **O ServerSocket na unha** | `accept()`, o programa que trava esperando, e o primeiro texto que aparece no navegador | 🔴 |
| `03` | **A lista virando HTML** | montar `<ul><li>` com as tarefas na mão e mandar pro navegador. Feio de propósito: a etapa 9 conserta | 🔴 |

**Fecha quando:** ele abre `localhost:8080` no navegador e vê as tarefas dele.
**Transfere:** todo servidor de todo mundo é isso embaixo, inclusive os de Node e Python.

## Etapa 7 — O idioma da web

*O navegador e o servidor conversam em texto puro, e dá pra ler.* HTTP inteiro na mão, antes de qualquer biblioteca esconder ele.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **A carta que o navegador manda** | linha de request, método, caminho, cabeçalho, corpo. Espiar de verdade com `curl -v` | 🔴 |
| `02` | **A resposta que o servidor devolve** | status, cabeçalho, `Content-Type`, corpo. Por que o mesmo texto vira página ou vira download | 🔴 |
| `03` | **O formulário que adiciona tarefa** | GET e POST de verdade, o que vai na URL, o que vai no corpo, e ler o parâmetro na mão | 🔴 |
| `04` | **200, 404, 302, 500** | o que cada família de status quer dizer, e o que o 500 diz de você | 🔴 |

**Fecha quando:** ele digita uma tarefa num formulário do navegador e ela entra na lista.
**Transfere:** HTTP é o mesmo protocolo em qualquer stack. Esta etapa é a mais reaproveitável da série.

## Etapa 8 — O contêiner e o servlet

*Chegou a hora de parar de escrever o servidor.* O Tomcat é o programa da etapa 6, feito direito. O servlet é a peça oficial que quase todo curso apresenta **antes** de tudo isso, e é por isso que ninguém entende.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **O que o Tomcat faz por você** | socket, thread, HTTP, ciclo de vida: tudo que a gente fez na mão nas etapas 6 e 7 | 🔴 |
| `02` | **O primeiro Servlet** | `doGet`, `doPost`, `request`, `response`, mapeamento de URL. A mesma lista, agora dentro do contêiner | 🔴 |
| `03` | **JAR, WAR e o dev-loop** | o que é empacotar, e por que "o fix não aparece" quase sempre é o arquivo que não chegou onde o servidor lê | 🔴 |

**Fecha quando:** a lista roda no Tomcat e ele sabe dizer o que precisa de restart e o que é só F5.
**Transfere:** todo mundo tem um contêiner ou um runtime equivalente por baixo.

## Etapa 9 — Quem monta o HTML

*Colar HTML dentro de `out.println` não escala, e ele já sentiu isso na etapa 6.* As três gerações de resposta, na ordem em que doeram.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **JSP: HTML com Java dentro** | como funciona, por que resolveu na época, e por que virou trauma (scriptlet, lógica na tela, arquivo que não abre no navegador) | 🔴 |
| `02` | **Thymeleaf: Java fora do HTML** | o inverso do JSP: o arquivo continua sendo HTML, o dado entra por atributo | 🔴 |
| `03` | **Layout e fragmento** | cabeçalho e rodapé escritos uma vez só; o começo da conversa sobre duplicação | 🔴 |

**Fecha quando:** a tela da lista é um arquivo HTML de verdade, que abre no navegador sozinho.
**Transfere:** Thymeleaf, Jinja, Blade, EJS: todo template server-side resolve o mesmo problema.

## Etapa 10 — Cada um com a sua lista

*HTTP não tem memória: cada pedido chega como se fosse o primeiro.* Aqui a lista deixa de ser uma só e passa a ser a de cada pessoa.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Por que o servidor te esquece** | sem estado, mostrado no app que já existe: dois pedidos, zero lembrança | 🔴 |
| `02` | **O cookie** | o crachá que o navegador guarda e devolve sozinho em todo pedido | 🔴 |
| `03` | **A sessão** | o cookie carrega só o número; quem guarda o resto é o servidor. E o que acontece com ela quando o Tomcat reinicia | 🔴 |
| `04` | **Login de verdade** | o que é "estar logado", por que senha não se guarda como senha (hash), e o erro de login que não entrega informação demais | 🔴 |

**Fecha quando:** duas pessoas entram no mesmo endereço e cada uma vê a lista dela.
**Transfere:** cookie e sessão são do HTTP, não do Java. Muda a biblioteca, não o mecanismo.

## Etapa 11 — Arrumando a bagunça

*Tudo o que foi montado até aqui cabe num arquivo só, e é exatamente esse o problema.* MVC não é regra de etiqueta: é o remédio pra um sintoma que a etapa 10 acabou de produzir.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Três montes: dado, decisão e tela** | model, controller e view, com o código do próprio app sendo cortado ao vivo | 🔴 |
| `02` | **O front controller** | um servlet que atende tudo e distribui, que é o embrião do que o Spring faz na etapa 13 | 🔴 |
| `03` | **Uma URL, uma responsabilidade** | como o projeto fica quando cada rota sabe só o que é dela | 🔴 |

**Fecha quando:** ele acha sozinho onde mexer pra mudar uma tela, sem procurar.
**Transfere:** é o mesmo corte em qualquer framework de qualquer linguagem.

## Etapa 12 — O banco entra

*Desde a etapa 4 a lista some quando o programa fecha.* Agora para de sumir. SQL e JDBC na unha antes de qualquer ORM, e o primeiro ataque que a série mostra funcionando.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Uma tabela é uma lista que fica** | modelar `tarefa` em SQL: coluna, tipo, chave. `INSERT`, `SELECT`, `UPDATE`, `DELETE` no `psql`, antes de encostar em Java | 🔴 |
| `02` | **Conversando com o banco na unha** | JDBC: `Connection`, `Statement`, `ResultSet`, e fechar o que se abre | 🔴 |
| `03` | **PreparedStatement e o ataque** | SQL injection demonstrada no campo de login da etapa 10, e a linha única que a impede | 🔴 |
| `04` | **O DAO** | por que SQL não mora no controller, e como fica a mesma tela com o acesso a dado separado | 🔴 |
| `05` | **Pool de conexões** | abrir conexão é caro; o que o pool faz, e o que acontece quando ele acaba | 🔴 |

**Fecha quando:** ele desliga o servidor, liga de novo e as tarefas continuam lá.
**Transfere:** SQL é praticamente o mesmo em Postgres, MySQL e SQLite. Injeção de SQL é a mesma falha em toda linguagem.

## Etapa 13 — O framework assume

*Agora sim.* Spring Boot apresentado como a soma das peças anteriores, com o que ele esconde dito em voz alta. O app é o mesmo: a lista de tarefas, reescrita.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **O que o Spring resolve** | o mapa: cada anotação apontando pra peça que a gente montou na mão | 🔴 |
| `02` | **Injeção de dependência sem misticismo** | quem cria o objeto, por que não é você, e o que isso tem a ver com o teste da etapa 5 | 🔴 |
| `03` | **O Boot e o servidor embutido** | o Tomcat vira dependência: sai o WAR no servidor, entra o JAR que sobe sozinho | 🔴 |
| `04` | **REST e JSON** | quando a resposta não é página: o mesmo HTTP da etapa 7, com outro `Content-Type` | 🔴 |

**Fecha quando:** a lista roda em Spring Boot e ele sabe apontar, anotação por anotação, o que cada uma substituiu.
**Transfere:** Django, Rails, Laravel e NestJS fazem a mesma troca. Quem entendeu o que foi substituído aprende qualquer um deles rápido.

## Etapa 14 — Pro mundo

*Roda na sua máquina não é o fim.* A etapa que quase toda trilha deixa de fora, e que é onde a bomba-relógio da etapa 1 costuma explodir.

| Pasta | Episódio | O que cobre | Status |
|---|---|---|---|
| `01` | **Empacotar** | build, dependência, o que vai junto e o que fica de fora (senha, sobretudo) | 🔴 |
| `02` | **Subir num servidor de verdade** | uma máquina Linux, uma porta, um serviço que sobe sozinho quando reinicia | 🔴 |
| `03` | **HTTPS e o cadeado** | o que o cadeado prova, o que ele não prova, e o proxy na frente do Java | 🔴 |
| `04` | **Quando quebra** | log, stack trace, o 500 do usuário, e o que dizer pra ele sem entregar o servidor | 🔴 |
| `05` | **Subir de novo sem medo** | o deploy repetível: o mesmo comando toda vez, e como voltar pra versão anterior quando dá errado | 🔴 |

**Fecha quando:** a lista de tarefas dele está no ar, num endereço que outra pessoa consegue abrir, e ele consegue subir uma correção sem consultar anotação.
**Transfere:** empacotar, servir, cifrar e observar é o mesmo problema em qualquer stack.

---

## `_EXTRAS` — os aprofundamentos

Cada extra desce a fundo num assunto que **travaria o episódio** se fosse explicado no meio dele. São autocontidos: nada de citar etapa vizinha, pra circularem soltos (mesma regra dos extras da outra série). A coluna **Ouvir depois de** é só recomendação de ordem, não dependência.

| # | Extra | Aprofunda | Ouvir depois de |
|---|---|---|---|
| 01 | **JVM, JDK e JRE: quem é quem** | três siglas que o iniciante usa como sinônimo | etapa 2 |
| 02 | **O que é uma porta (e por que 8080)** | aparece na etapa 6 e todo mundo aceita sem entender | etapa 6 |
| 03 | **Thread: várias pessoas ao mesmo tempo** | concorrência, o problema mais difícil da série | etapa 6 |
| 04 | **O acento quebrado** | UTF-8, encoding, e o `Ã§` que aparece do nada | etapa 7 |
| 05 | **DNS: o nome vira número** | por que `localhost` funciona e por que o domínio novo demora pra virar | etapa 7 |
| 06 | **Cache do navegador** | a mudança que "não aparece" e não é culpa do servidor | etapa 9 |
| 07 | **Como senha é guardada** | hash, salt, e por que "criptografar a senha" é a frase errada | etapa 10 |
| 08 | **O que é uma API REST** | citada na etapa 13, merece episódio próprio | etapa 13 |
| 09 | **JSON ou HTML** | quem monta a tela: o servidor ou o navegador | etapa 13 |
| 10 | **Índice: por que a consulta fica lenta** | o que o banco faz quando você não olha | etapa 12 |
| 11 | **Maven e Gradle** | o que build tool faz, e por que a série começou sem | etapa 14 |
| 12 | **O que é um log** | e por que ele é a diferença entre consertar e adivinhar | etapa 14 |

---

## Decisões da série

- **D1.** (04/09/2026) **A tese é a bomba-relógio.** A série não é "aprenda Java": é "não entregue pra máquina o que você não entende". Todo episódio serve a isso, e a etapa 1 existe só pra fixar essa régua antes de qualquer linha de código.
- **D2.** (04/09/2026) **Um app só, do começo ao fim.** Uma lista de tarefas nasce na etapa 4 e atravessa a série. Nada de exemplo descartável por episódio.
- **D3.** (04/09/2026) **Nada de framework antes da peça de baixo.** Spring Boot só na etapa 13. O ganho pedagógico da série inteira depende disso.
- **D4.** (04/09/2026) **Professor e aluno.** O Claude explica, o Flávio digita. Etapa que não deixou o app melhor está errada.
- **D5.** (04/09/2026) **Java é o veículo, não o assunto.** Todo episódio fecha dizendo o que transfere pra outra linguagem ou outro banco.
- **D6.** (04/09/2026) **Jornada completa.** Git (etapa 3), teste (etapa 5) e deploy (etapa 14) entram na linha principal, não como apêndice. Git vem antes do primeiro programa porque o `.gitignore` tem que estar fechado antes do primeiro `git add`.
- **D7.** (04/09/2026) **Capa aprovada clara.** Ela destoa das outras quatro, que são escuras, e está assim de propósito.

## Pendências

- **P1.** O código na capa (`_arquivos/capa-java-01.png`) está errado: `system.out.println` com "s" minúsculo e um if/else sem sentido. Trocar a tela do monitor depois, sem refazer a capa. **Trava:** nada; é acabamento.
- **P2.** Falta a página da série no site (`site/javaweb.html`) e a arte de cada etapa. **Trava:** a publicação do primeiro episódio.

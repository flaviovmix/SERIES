# Nota de saúde do projeto (0 a 10)

Ferramenta de diagnóstico. Não é etapa, não tem "pronto quando", e roda quando alguém quiser saber como o projeto está: antes de retomar depois de meses, antes de abrir pro primeiro usuário, ou quando bateu a sensação de que a casa desarrumou.

**Funciona em qualquer projeto**, tenha ele nascido deste molde ou não. Projeto que nunca viu o molde só vai tirar nota baixa em algumas dimensões, e é exatamente essa a informação.

---

## As três regras de quem aplica

1. **Não corrigir durante a análise.** Vale a mesma regra da Etapa 13: cada achado ganha destino decidido junto com o dono (corrigir já, pegar carona numa etapa, ou entrar na fila de erros). Quem corrige calado no meio da varredura perde a medida e não termina nenhuma das duas coisas.
2. **Nota sem evidência não vale.** Toda nota abaixo de 8 aponta arquivo e linha, ou o comando que provou. "Parece frágil" não é achado.
3. **Medir o que está lá, não o que se lembra.** Ler o código, rodar o que der pra rodar. Impressão de sessão antiga é a principal fonte de nota errada.

---

## As 8 dimensões

Cada uma vale de 0 a 10. O que cada nota significa está na régua do fim.

### 1. Segurança
Segredo versionado (senha, token, chave em arquivo do repo ou em migration). Autorização conferida rota a rota, com o padrão sendo negar. Senha com hash forte. Freio de força bruta no login. Upload validado por assinatura do arquivo, não pelo tipo declarado. Dependência com vulnerabilidade aberta.
**Prova rápida:** buscar por senha e chave no histórico do git; bater três papéis (anônimo, comum, admin) contra uma rota administrativa; conferir o alerta de dependência do repo.

### 2. Teste
Existe arnês rodando por um comando. Ele cobre o caminho crítico: autenticação, salvar com validação recusando, excluir. Roda contra banco de verdade. Bug já corrigido deixou teste que o reproduz.
**Prova rápida:** rodar a suíte. Se não roda por um comando, a nota já começa baixa, porque teste que ninguém consegue rodar não protege ninguém.

### 3. Legibilidade
Função com uma responsabilidade e tamanho que cabe na tela. Nome que dispensa comentário. HTML semântico. CSS e JS em arquivo por componente, não dentro do template. Pasta que um humano entende sem buscar.
**Prova rápida:** contar as funções maiores que ~60 linhas e as linhas de estilo e script inline dentro de template.

### 4. Duplicação
Clone do mesmo padrão (controller, modal, store, formulário, mapeador). Decisão repetida em N lugares: mudar o texto de um aviso comum exige lembrar de quantos arquivos?
**Prova rápida:** escolher um aviso ou uma regra que aparece em vários lugares e contar em quantos arquivos ela mora.

### 5. Banco e dados
Migrations versionadas e nunca editadas depois de aplicadas. Banco novo sobe do zero sem passo manual. Índice nas chaves estrangeiras e nas colunas de busca. Regra de exclusão pensada. Enum do código batendo com a restrição do banco.
**Prova rápida:** recriar o banco do zero. Se precisar de passo manual, a dimensão não passa de 5.

### 6. Deploy e operação
Procedimento de subir escrito e testado. Caminho de volta (rollback) que alguém já usou. Backup rodando, guardado fora da máquina, restaurado ao menos uma vez, com alerta quando falha. Monitoramento que avisa antes do usuário avisar.
**Prova rápida:** perguntar quando foi a última restauração de backup testada. "Nunca" é nota 3 ou menos, porque backup nunca testado não é backup.

### 7. Interface
Sem estouro horizontal nos 4 tamanhos. Acessibilidade: rótulo ligado ao campo, foco visível, alcançável por teclado. Estado vazio tratado. Imagem com dimensão declarada. Política de conteúdo (CSP) ligada.
**Prova rápida:** medir uma página pública e uma de painel num medidor de acessibilidade, e abrir as duas no tamanho de celular.

### 8. Registro
O plano (ou o README) reflete o que existe hoje. Decisões escritas com o porquê. Fila de erros viva. README ensina alguém de fora a subir o projeto do zero.
**Prova rápida:** seguir o README numa máquina limpa, ou ao menos ler se ele menciona os passos que a versão atual precisa.

---

## Como fecha a nota final

Média simples das oito, **com um freio**: se qualquer dimensão ficar em 3 ou menos, a nota final não passa de 5, por mais alto que esteja o resto. Projeto com segredo exposto em produção não é um "8 com uma ressalva", e média sozinha esconde exatamente esse tipo de buraco.

| Nota | O que significa |
|---|---|
| 9-10 | saudável. Dá pra crescer sem medo |
| 7-8 | bom, com dívida conhecida e escrita |
| 5-6 | funciona, mas cada mudança custa mais que devia |
| 3-4 | a casa desarrumou. Precisa de etapa dedicada antes de feature nova |
| 0-2 | risco real de perder dado, vazar dado ou não conseguir mudar |

---

## O que entregar

Uma tabela e três linhas de texto. Nada mais:

```markdown
| # | Dimensão | Nota | O que puxou pra baixo (arquivo:linha) |
|---|---|---|---|
| 1 | Segurança | 4 | senha no repo em V3__seed.sql:12 |
...

**Nota final: X/10** (freio aplicado: sim/não, por qual dimensão)

**As três coisas que mais sobem a nota:** ...
**O que NÃO vale mexer agora:** ...
```

A linha do que não vale mexer agora é tão importante quanto as outras. Varredura sem prioridade vira lista de 40 itens que ninguém ataca, e a casa segue desarrumada com um relatório em cima.

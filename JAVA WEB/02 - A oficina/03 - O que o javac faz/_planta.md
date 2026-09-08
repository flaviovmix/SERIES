# Planta de telas — O que o javac faz

**Episódio:** 3º da etapa 2 (A oficina). Retoma o 2.02 (o `Ola.class` apareceu na pasta) e abre esse arquivo: fonte, bytecode e a máquina virtual. Por que Java roda em qualquer lugar.
**Sem ficha humana e sem janela temporal.** O fecho carrega **o que transfere**.

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | o que este episódio faz: abrir o arquivo que o compilador escreveu e entender por que ele não é o programa final |
| 2 | conteudo | as três peças: o fonte (texto que humano lê), o bytecode (instruções pra uma máquina que não existe em metal) e a JVM (a máquina que existe em software e lê o bytecode) |
| 3 | conteudo | por que não compilar direto pro processador: cada chip fala uma língua; compilar pra um é não rodar nos outros. A JVM é a tradução final feita em cada máquina. "Escreva uma vez, rode em qualquer lugar" explicado sem slogan |
| 4 | interativa | o fonte e o bytecode lado a lado (saída do `javap`): o ouvinte toca numa linha do fonte e vê em que instruções ela virou. Cinco linhas de Java, meia dúzia de instruções |
| 5 | conteudo | o que o compilador confere antes de escrever o `.class`: tipos, nomes que existem, sintaxe. Erro de compilação e erro de execução são coisas diferentes, e o compilador é o primeiro leitor que não aceita sem entender |
| 6 | conteudo | JDK, JRE e JVM: o kit inteiro, o que roda, e a máquina. Quem só roda não precisa do compilador; quem escreve instala o kit |
| 7 | fecho | recapitulação + o que transfere (toda linguagem tem um meio do caminho, com outro nome) + gancho pro 2.04 (o erro de classe não encontrada e por que pasta e nome importam) |

**Total: 7 telas.** A 4 é interativa porque "bytecode" é uma palavra que só faz sentido vendo: a saída do `javap` ao lado do fonte mostra que cinco linhas viraram poucas instruções, e que cada uma tem origem. A 5 é separada da 2 porque "o que o compilador confere" é o argumento da série (o compilador como primeiro leitor exigente) e merece tela própria.

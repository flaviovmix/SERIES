# Planta de telas — Classpath e pacotes

**Episódio:** 4º e último da etapa 2 (A oficina). Retoma o 2.03 (o `.class` aberto) e explica o erro mais comum de quem programa Java na unha: "could not find or load main class". Pasta = pacote, a lista onde a JVM procura, e a opção `-cp`. Fecha a etapa: a oficina está de pé.
**Sem ficha humana e sem janela temporal.** O fecho carrega **o que transfere**.

**Desvio registrado (06/09/2026):** a planta original tinha 7 telas, com os pacotes (3) e a prática das quatro combinações (4) separados. O áudio "Como o Java encontra suas classes" (12:49) juntou os dois num bloco só (03:12 a 07:33), sem pedir o Próximo entre eles, e anuncia a parte interativa aos 05:20 dentro desse bloco. Pelo processo da série (o áudio vem antes, a animação serve ao que foi falado), a planta passou a ter **6 telas**: a 3 carrega os pacotes em cima e o seletor das combinações embaixo, na mesma tela. O `_telas.md` gerado do áudio é a fonte dos cortes.

| # | Tipo | O que essa tela carrega | Entra em |
|---|---|---|---|
| 1 | capa | o que este episódio faz: o erro que todo mundo toma uma vez, e o que ele ensina sobre onde as classes moram | 00:00 |
| 2 | conteudo | onde o `java` procura: uma lista de lugares chamada classpath; por padrão, só a pasta atual. Rodar de outra pasta dá o erro. Não é bug, é a JVM dizendo "não achei na lista" | 01:16 |
| 3 | interativa | pacotes: por que existem, a linha `package`, a regra pasta = pacote, o nome completo com o pacote na frente. Logo abaixo, na mesma tela, a árvore de pastas e o comando: o ouvinte escolhe de onde roda e com qual nome, e vê se a JVM acha ou não. Quatro combinações, só uma funciona (o áudio avisa a parte interativa aos 05:20) | 03:12 |
| 4 | conteudo | dizer onde procurar: a opção `-cp`. Separar fonte de compilado: `javac -d` numa pasta de saída e `java -cp` apontando pra ela. Por que separar: a saída pode ser apagada e refeita, e o histórico não guarda ela | 07:33 |
| 5 | conteudo | o que a IDE fazia escondido: montava o classpath sozinha, e por isso o erro só aparece fora dela. E por que a série passou por aqui: quando Maven e Spring entrarem, o classpath continua existindo, montado por eles | 09:26 |
| 6 | fecho | recapitulação + a etapa 2 fecha (a oficina está de pé: editor, terminal, kit, compilar, rodar, pacotes) + o que transfere (todo ambiente tem uma lista de onde procurar) + gancho pra etapa 3 (antes de escrever o programa, ter como voltar atrás) | 10:54 |

**Total: 6 telas.** A 3 é longa (4:21) e tem duas partes de propósito: a regra pasta = pacote em cima e o seletor de combinações embaixo, porque o áudio explica a regra e emenda na prática sem parar. A 5 é separada porque fecha a etapa inteira: as quatro coisas que a IDE escondia (2.02) foram feitas na mão, e esta era a última.

## Etapa 6: Do protótipo ao produto

**Objetivo:** entender o que separa um circuito que funciona na bancada de um produto que funciona no campo, o caminho do protótipo até a escala, e como esse conhecimento vira trabalho.

**Conteúdo de estudo:** o que derruba um microcontrolador (tensão fora do limite, corrente demais no pino e o que chega pelo ar: campo elétrico e campo magnético perto dos fios); as três proteções de hardware (alimentação limitada e contra inversão, potência separada de sinal, pinos protegidos); misturar 3,3 V e 5 V; a fonte, onde se resolvem os problemas mais difíceis; a robustez de firmware (estrutura do código, tempo sem `delay`, média de leituras, watchdog); protótipo, lote piloto e escala; o ESP32 do chip sozinho até a placa própria; casos reais; um projeto de verdade pra ler; e o lado comercial.

**Material:** o arquivo de cada aula está no `PDF/_mapa.md`. Os 10 passos e a aula da indústria vêm em duas versões cada, quase iguais: vale a mais nova.

Tarefas:
- São aulas de leitura e conversa. O exercício, quando existe, aplica a ideia num circuito ou num código das etapas anteriores.

## Aulas (uma aula = um passo)

| # | Aula | Estado |
|---|---|---|
| 25 | **Os 10 passos.** Do 1 ao 3, hardware: um produto não pode travar nem resetar e, se resetar, não pode queimar; o que derruba o microcontrolador; as três proteções (diodo e TVS na alimentação, potência separada de sinal, optoacoplador e zener nos pinos); por que um sensor de 3,3 V não vai em 5 V mesmo que funcione no teste; e a fonte de qualidade. Do 4 ao 7, firmware: estrutura do código (bibliotecas, variáveis, `setup`, `loop`, abas, funções, os dois núcleos do ESP32), tempo sem `delay`, média de leituras analógicas e digitais, e watchdog só quando o projeto já é confiável. Do 8 ao 10, desenvolvimento: protótipo (onde se faz quase todo o firmware), lote piloto (no mínimo 5 peças no campo) e escala. Exercício: apontar no esquemático da aula 22 cada proteção dos passos 1 a 3 | não iniciada |
| 26 | **O ESP32 na indústria.** O caminho do chip sozinho ao módulo, à placa de desenvolvimento, à placa de desenvolvimento encaixada numa placa própria e à placa própria (prototipar na placa pronta e só depois migrar); casos reais com quantas placas foram feitas (medição de corrente, máquina de sorvete, locomotiva, medidor de carga com ultrassom); e a lista do que estudar pra firmware robusto, com redes e Node-RED no fim. Sem exercício | não iniciada |
| 27 | **Um projeto de verdade.** Ler o código completo de um equipamento real com ESP32 (duas tarefas, cada uma presa num núcleo, Ethernet, MQTT, Modbus pela serial, medição de corrente, watchdog e ciclos de liga e desliga) e achar nele o que as etapas 2 a 4 ensinaram. Exercício: desenhar num papel quem chama quem | não iniciada |
| 28 | **Do conhecimento ao trabalho.** Os três caminhos (ensinar, fornecer e fazer) e os assuntos comerciais: os três pilares de um projeto (comercial, financeiro, técnico), o modelo de negócio (mercado, produto, canal, forma de vender), a escada de valor, os canais (grupos, LinkedIn, YouTube) e distribuir tanto quanto criar. Exercício: o dono diz qual caminho faria e com qual projeto | não iniciada |

**Pronto quando:** as aulas 25 a 28 estão `✅` com data e o dono explica, com o esquemático da aula 22 na mão, por que cada proteção está lá.

**Desvios registrados:**

- 11/09/2026: o material extra foi lido e distribuído no cronograma (D6): quatro aulas aqui e o resto como leitura das aulas 10, 13, 16, 19, 20 e 22.

## Etapa 2: O controlador fica esperto

**Objetivo:** escrever programas de Arduino com tipos de dados, laços, bibliotecas e tempo sem `delay`, na placa (com o Wokwi pra testar antes), entendendo por que cada escolha foi feita.

**Conteúdo de estudo:** quanto cabe em cada tipo (`byte`, `int`, `long`, `float`) e o que acontece quando estoura; `while` e `for`; o que uma biblioteca traz pronto e como ela entra no projeto; e por que `delay` trava o programa inteiro, com `millis()` e interrupção no lugar.

**Material:** o arquivo de cada aula e os exemplos prontos estão no `PDF/_mapa.md`. O texto foi lido em 11/09/2026; os slides que são só imagem (código e circuito) se abrem na hora da aula. Peças novas do kit nesta etapa: o display I2C 16x2, o sensor de ultrassom e o motor de passo com o driver (P7).

Tarefas:
- Mesmo formato da Etapa 1: `exercicios/NN.E - nome/` com `sketch.ino` e `LEIA-ME.txt` (e o `diagram.json` e o link, se passou pelo Wokwi).
- O dono tecla; enunciado cru; veredito só quando pedido; explicação depois que ele tentou (D4).

## Aulas (uma aula = um passo)

| # | Aula | Estado |
|---|---|---|
| 6 | **Tipos de dados.** `boolean`, `char`, `byte`, `int`, `unsigned int`, `word`, `long`, `unsigned long`, `float`, `String` e array; converter antes de misturar tipos. Exercício 1: LED no pino 6 variando o brilho de 50 em 50 (0 a 250) a cada 1,5 s com `millis()`, depois de 30 em 30 a cada 0,35 s. Exercício 2: ler o A0 como se fosse um sensor de temperatura de 0 a 50 °C e mostrar em °C, °F e K | não iniciada |
| 7 | **Peça pronta.** Inserção de biblioteca na IDE: achar, baixar, descompactar e colar na pasta `libraries` (ou inserir o zip pela IDE); no Wokwi, a biblioteca entra pelo gerenciador do próprio projeto. A segunda forma só aparece em imagem no material | não iniciada |
| 8 | **Enquanto não encher.** Comando `while`. Exercício 1: escrever no Monitor Serial e no display LCD do kit e medir quanto tempo o display leva, lendo a serial com `while`. Exercício 2: as 3 últimas tensões no Monitor Serial e a média no display. Pergunta da aula: o que é I2C e SPI | não iniciada |
| 9 | **O eco.** Comando `for` e sensor de ultrassom. Exercício 1: média de 3 leituras do ultrassom no Monitor Serial (exemplo `ping`). Exercício 2: ver em gráfico e subir pra 10 leituras | não iniciada |
| 10 | **O motor que conta passos.** Biblioteca AccelStepper e o motor de passo do kit (28BYJ-48 com driver ULN2003). Exercício: 2 voltas no sentido horário e 2 no anti-horário, sem parar, partindo do exemplo de velocidade constante da biblioteca. Leitura extra: a aula de motor de passo do material extra (onde ele aparece, como gira por dentro e o caminho do comando: computador, microcontrolador, driver); o vídeo que vem dentro dela não se lê, só quadros tirados com o ffmpeg | não iniciada |
| 11 | **Duas coisas ao mesmo tempo.** Temporizador sem `delay` e interrupção. Exercício 1: o relé segue o botão da entrada 2 enquanto o LED 13 fica 5 s apagado e pisca 3 vezes a cada 100 ms, as duas coisas juntas (primeiro com `delay`, pra ver o problema). Depois: um exercício que o material manda buscar fora dos slides, os exemplos da biblioteca sem `delay`, a mesma lógica com interrupção, detecção de borda ("Acionou" e "Desacionou" uma vez só) e reset por software pelo botão da entrada 4, explicando o watchdog | não iniciada |

**Pronto quando:** as aulas 6 a 11 estão `✅` com data, cada exercício roda na placa a partir do que está em `exercicios/`, e o dono explica com as próprias palavras por que o temporizador da aula 11 não trava o resto do programa.

**Desvios registrados:**

- 11/09/2026: as aulas 7 a 9 seguem a ordem real do material (biblioteca, `while`, `for`), que não é a da lista do primeiro slide; e cada linha ganhou os exercícios da aula.
- 11/09/2026: numeração nossa (D6): esta etapa vai da aula 6 à 11.
- 11/09/2026: com o kit comprado (D7), os exercícios rodam na placa e o motor da aula 10 é o de verdade (a P2 caiu).

## Etapa 1: O cérebro e os sentidos

**Objetivo:** escrever, rodar e explicar programas de Arduino que leem botão e potenciômetro e comandam LED e relé, montando na placa de verdade (com o Wokwi pra testar antes), entendendo o código e a eletrônica mínima que faz o circuito funcionar.

**Conteúdo de estudo:** o que é um microcontrolador e o ciclo `setup()`/`loop()`; como o programa lê e escreve nos pinos, no digital (0 ou 1) e no analógico (`analogRead` de 0 a 1023, `analogWrite` de 0 a 255 por PWM); a eletrônica mínima pra leitura não mentir e a saída não queimar (resistor, pull-up e pull-down, corrente máxima do pino); e a decisão com `if`/`else` que junta tudo na aula 5. O peso vai no código: cada exercício anda o sketch linha por linha, conceito só o mínimo pra linha fazer sentido.

**Material:** o arquivo de cada aula está no `PDF/_mapa.md`. A resposta do exercício 2 da aula 2 vem pronta no material: só abrir depois que o dono tentar. As peças desta etapa: o Uno com o cabo, a protoboard, os jumpers, os LEDs, os resistores de 470 Ω e 10 kΩ, as teclas, o trimpot e o módulo de relé (P7).

Tarefas:
- Instalar a IDE do Arduino e o driver CH340 na aula 1 (D7).
- Pasta `HARDWARE/exercicios/`, uma subpasta por exercício no padrão `NN.E - nome/` (D6), com o `sketch.ino` e um `LEIA-ME.txt` dizendo que peça vai em que pino; se passou pelo Wokwi, vão junto o `diagram.json` e o link (D7).
- O dono tecla; enunciado cru; veredito só quando pedido; explicação depois que ele tentou (D4).
- Cada aula fecha com o dono explicando com as próprias palavras o que cada linha faz.

## Aulas (uma aula = um passo)

| # | Aula | Estado |
|---|---|---|
| 1 | **O LED que pisca.** O ambiente: baixar a IDE do Arduino (arduino.cc), instalar, abrir, pôr em português (Arquivo > Preferências) e instalar o driver do conversor USB-serial da placa compatível (CH340), com o teste da placa no USB. O Wokwi (`wokwi.com/projects/new/arduino-uno`) fica do lado pra testar antes (D7). As partes da placa: o microcontrolador, a fonte (7 a 15 V), o conversor USB-serial, as entradas analógicas e os pinos digitais, com PWM nos 3, 5, 6, 9, 10 e 11. `setup()`, `loop()` e o exemplo Blink, que o material manda carregar e mostrar funcionando. Exercício 1: o LED do pino 13 acende a cada 4 s e fica 2 s aceso. Exercício 2: `Serial.println` escreve "Arduino" no `setup` e o nome do dono no `loop`, a cada 1 s. As outras peças do kit entram na aula que pedir cada uma | em andamento (10/09/2026) |
| 2 | **Botão e relé.** Entrada e saída digital: protoboard, lei de Ohm, entrada flutuante; a aula monta a tecla com resistor de 10 kΩ de pull-down, depois de pull-up, e depois troca pelo `INPUT_PULLUP` (o resistor interno). Limite da saída: 20 mA recomendado, 40 mA no máximo, 200 mA somando todas. Exercício 1: tecla no pino 2 com `INPUT_PULLUP` acende o LED do 13 (o material pede pra preencher uma tabela que não vem nele). Exercício 2: relé no pino 5 acionado pela tecla do 4, mantendo o 2 ligando o 13. O desenho desse exercício liga lâmpada de tomada no relé: aqui não (D5), o relé liga só coisa de baixa tensão. Conferir no relé do kit com que nível ele liga, porque a resposta pronta conta com isso | não iniciada |
| 3 | **O trimpot vira número.** Entrada analógica: `analogRead` de 0 a 1023 (0 V até a tensão do Aref, 5 V por padrão). Exercício: trimpot de 10 kΩ no A1 e os valores lidos no Monitor Serial | não iniciada |
| 4 | **Meio aceso.** Saída analógica: PWM, ciclo de trabalho (tempo ligado dividido pelo período), `analogWrite` de 0 a 255. Exercício: o A1 controla de 0 a 100% o PWM do pino 9, com um LED nele | não iniciada |
| 5 | **A decisão.** `if`/`else`, operadores de comparação e lógicos. Exercício: um interruptor liga o processo; abaixo de 1 V no A1, alarme de baixa no LED do 13; acima de 4 V, alarme de alta no relé; entre os dois, o LED do 9 acende proporcional ao A1 | não iniciada |

**Pronto quando:** as aulas 1 a 5 estão `✅` com data, os exercícios rodam na placa a partir do que está em `exercicios/` (no Wokwi, só o que ficar sem peça pela P7), e o exercício da aula 5 foi o dono montando o circuito e o código sozinho e explicando o que escreveu.

**Desvios registrados:**

- 10/09/2026: instalar a IDE do Arduino e o driver foi trocado pelo Wokwi (D2), sem instalar nada.
- 11/09/2026: numeração nossa (D6). A apresentação, as peças e o ambiente viraram parte da aula 1, e as cinco aulas desta etapa são as que têm exercício. Os exercícios foram renumerados dentro de cada aula, e o buraco da P1 sumiu.
- 11/09/2026: com o kit comprado (D7), a instalação da IDE e do driver volta pra aula 1, e o Wokwi fica do lado.

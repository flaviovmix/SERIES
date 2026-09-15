## Etapa 3: O painel da portaria

**Objetivo:** ver no computador, numa tela montada no Node-RED, os dados que o Arduino manda pela serial, e mandar comando de volta; primeiro com mensagem nossa, depois com Modbus.

**Conteúdo de estudo:** o que é comunicação serial (um bit de cada vez, com velocidade combinada dos dois lados) e o que muda na paralela (um fio por bit); serial síncrona (com relógio, como o I2C) e assíncrona (como a USB); a tabela ASCII, que transforma letra em número e número em bits; o que é um supervisório; como o Node-RED liga blocos de entrada, tratamento e tela; e o Modbus, uma regra padrão de pedir e ler valores que anda por cima de qualquer meio (RS485, RS232, USB, Ethernet, WiFi).

**Material:** o arquivo de cada aula está no `PDF/_mapa.md`. O código vem pronto: exemplos de serial síncrona, assíncrona e paralela (dois Unos ligados), exemplos de Modbus (lâmpada, servo, chave, sensor de temperatura e a integração deles), a correção do supervisório e o fluxo do Node-RED.

Tarefas:
- Instalar o Node-RED no PC na aula 13 (D7), com os pacotes que a aula lista. Ele fala com a placa de verdade pela porta USB (a P3 caiu com a D7).
- Mesmo formato de exercício das etapas anteriores.

## Aulas (uma aula = um passo)

| # | Aula | Estado |
|---|---|---|
| 12 | **Uma letra de cada vez.** Comunicação serial e paralela (o material liga dois Unos por oito fios, um por bit, com um relógio), síncrona e assíncrona, a tabela ASCII e o caminho da letra "a" em bits, do computador pro Arduino e de volta. Exercício 1: o Monitor Serial manda "a" e o Arduino imprime o que recebeu. Exercício 2: o Arduino responde "b" depois de receber o "a" (com `Serial.available()>0`, e só se for "a"). Exercício 3: o Arduino recebe uma palavra e imprime. Exercício 4: `parseInt()` recebe um número que muda o brilho do LED | não iniciada |
| 13 | **Blocos que conversam.** Node-RED: instalar e conhecer nós, fluxo, debug e paleta; os pacotes do dashboard, da serial, do MQTT e do agregador. Exercício 1: um nó de injeção manda o horário e o debug mostra. Exercício 2: um dashboard onde arrastar uma barra muda o valor num gráfico. Leitura extra: a aula de IoT com ESP32 e Node-RED, que apresenta o MQTT | não iniciada |
| 14 | **O supervisório.** A tela que mostra e manda. Exercício 1: a entrada A0 num mostrador (gauge) e num gráfico. Exercício 2: um botão na tela liga o relé. Exercício 3: um LED na tela mostra a entrada 5. Exercício 4: uma barra na tela muda o brilho do LED. Depois, os mesmos quatro com Modbus (pacote `node-red-contrib-modbus`): o que é o Modbus, o meio físico por onde ele anda, e um pouco das duas formas lado a lado | não iniciada |

**Pronto quando:** as aulas 12 a 14 estão `✅` com data e o supervisório do dono mostra um valor do Arduino mudando na tela e manda um comando que o Arduino obedece, primeiro pela serial pura e depois pelo Modbus.

**Desvios registrados:**

- 11/09/2026: numeração nossa (D6), e as aulas ganharam os exercícios do material, que chegou nesse dia.

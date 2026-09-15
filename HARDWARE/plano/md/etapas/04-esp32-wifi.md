## Etapa 4: A caixa d'água no WiFi

**Objetivo:** programar o ESP32 do kit pra entrar na rede WiFi de casa, servir uma página, guardar configuração que sobrevive ao desligar, mandar dados pro computador em JSON e conversar por Bluetooth com um app de celular; o Wokwi fica pra testar a lógica antes (D7).

**Conteúdo de estudo:** o que o ESP32 tem que o Arduino Uno não tem (WiFi, Bluetooth, dois núcleos, 3,3 V nos pinos); placas de 30 e de 38 pinos e o mapa dos pinos; ponto de acesso (o ESP32 cria a rede) e estação (ele entra numa rede); servidor e cliente; tarefas nos dois núcleos; gravar o programa pelo ar (OTA); a memória que não apaga (EEPROM na flash) e o mapa da flash; arquivos guardados na flash; a página de configuração de rede; JSON indo e voltando; e Bluetooth serial com o App Inventor.

**Material:** o arquivo de cada aula está no `PDF/_mapa.md`. O código vem pronto: um firmware completo com as páginas de configuração (a base das aulas 17 a 19), o exemplo de dois núcleos, o Modbus portado pro ESP32, o de Bluetooth com o projeto do App Inventor, o fluxo do Node-RED e a planilha com o mapa da EEPROM. Uma folha de montagem mostra as entradas e saídas na protoboard, manda tirar um jumper e avisa que os pinos 34, 35, 36 e 39 não têm pull-up.

Tarefas:
- Montar o ESP32 na protoboard pela folha de montagem do material.
- Pôr o suporte do ESP32 na IDE na aula 16 (D7).
- Mesmo formato de exercício das etapas anteriores.

## Aulas (uma aula = um passo)

| # | Aula | Estado |
|---|---|---|
| 15 | **O irmão com WiFi.** O hardware do ESP32: entradas e saídas digitais e analógicas, WiFi, dois núcleos e Bluetooth; placas de 30 e de 38 pinos; o mapa dos pinos (pinout). Exercício 1: achar o pinout das duas placas. Exercício 2: remontar no ESP32 as entradas e saídas do supervisório da aula 14, em pinos que servem (os 34, 35, 36 e 39 não têm pull-up) | não iniciada |
| 16 | **Ponto de acesso, servidor e cliente.** Pôr o ESP32 na IDE (o endereço das placas da Espressif no gerenciador de placas; no Wokwi ele já vem) e explorar os exemplos e as placas disponíveis. Exercício 1: o código Modbus da aula 14 com os pinos do ESP32, rodando com o Node-RED e atualizando a cada 100 ms. Exercício 2: o exemplo `WiFiAccessPoint` (o ESP32 cria a própria rede) acionando o relé. Exercício 3: o exemplo `SimpleWiFiServer` acionando o relé. Exercício 4: o exemplo `WiFiClientBasic` mandando a leitura analógica pro debug do Node-RED. Leitura extra: as duas aulas de automação residencial, que usam o mesmo servidor pra ligar a luz de casa pelo celular | não iniciada |
| 17 | **Dois núcleos, gravar pelo ar e memória que fica.** Dual core: rodar o exemplo de tarefas, mudar prioridade e núcleo e ver se existe paralelismo no mesmo núcleo. OTA: gravar o programa pelo WiFi, sem cabo. EEPROM: o exemplo de escrita, mostrando que a informação sobrevive ao desligar; o mapa da memória flash. Arquivos na flash: preparar a IDE pra mandar arquivos (o plugin ESP32FS na pasta `tools`), mandar um `.txt` e imprimir no Monitor Serial. Webserver: rodar o código pronto, ver que não precisa saber o IP e como apagar a flash inteira, lendo pela lógica e não decorando a sintaxe | não iniciada |
| 18 | **A página de configuração.** O código que deixa trocar o nome da rede (SSID), a senha e o IP fixo sem regravar o programa, guardando tudo na EEPROM (o mapa da EEPROM vem numa planilha) | não iniciada |
| 19 | **Mandar dados pra fora.** JSON pro Node-RED do PC: importar o fluxo pronto e configurar até os dados irem e voltarem pro ESP32, com calma, caçando a causa quando não funcionar. E um GET que grava dados numa planilha do Google Sheets. Leitura extra: a palestra que manda dados de uma placa com ESP32 pro Google Sheets | não iniciada |
| 20 | **Bluetooth e o app do celular.** O exemplo `SerialToSerialBT` com um app de terminal Bluetooth no celular; conhecer o App Inventor (tela de design e blocos); um app simples e depois importar o projeto pronto. Leitura extra: a aula de Alexa com ESP32, que liga um relé por voz (biblioteca Espalexa) | não iniciada |

**Pronto quando:** as aulas 15 a 20 estão `✅` com data e o ESP32 do dono serve uma página que o navegador do PC abre, guarda a configuração da rede, manda um JSON que chega no PC e conversa com o celular por Bluetooth.

**Desvios registrados:**

- 11/09/2026: os nomes das aulas estavam errados, vindos de uma lista antiga. O material real junta dual core, OTA, memória e arquivos numa aula só (17), põe SSID, senha e IP fixo juntos (18) e termina com Bluetooth e App Inventor (20). Numeração nossa (D6).
- 11/09/2026: com o kit comprado (D7), o ESP32 é o de verdade, na rede de casa, e a P4 caiu.

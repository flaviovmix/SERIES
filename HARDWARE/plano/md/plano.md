# Plano: HARDWARE (Arduino e ESP32)

**Tipo:** outro: estudo de Arduino e ESP32 com o kit na bancada e o simulador do lado, do LED que pisca à placa própria. Uma introdução e 28 aulas em 6 etapas, numeradas de 1 a 28 na ordem do nosso cronograma.

**Saída:** ../html

Índice do estudo. **É o único arquivo lido em toda sessão**: o detalhe mora em `etapas/`, e só a etapa atual é carregada. O material de estudo fica em `HARDWARE/PDF/`, fora do git (D3), e o `PDF/_mapa.md` diz qual arquivo é de qual aula (D6). O código de cada exercício fica em `HARDWARE/exercicios/`.

Regerar o HTML: `/gerar-html-do-plano "C:\src\PROJETOS\SEIRES\HARDWARE\plano\md"` (pelo nome só não acha, porque o HARDWARE mora dentro do SEIRES). Abre em `plano/html/index.html`.

**Como fazer cada coisa** (ler material novo, áudio de estudo pro Nexus, NotebookLM, grupo no podcast, e o que nunca vai pra série pública): `HARDWARE/plano/_COMO-FAZER.md`. Este plano guarda o que foi decidido e onde parou; a receita guarda o passo a passo e as pegadinhas.

**As 28 aulas numa linha:** 1 a 5, o Arduino sente e age (LED, botão, relé, trimpot, PWM, decisão) · 6 a 11, o programa fica esperto (tipos, biblioteca, laços, ultrassom, motor de passo, tempo sem `delay`) · 12 a 14, o computador vê tudo (serial, Node-RED, supervisório) · 15 a 20, o ESP32 no WiFi (servidor, dois núcleos, memória, configuração, JSON, Bluetooth) · 21 a 24, a placa própria no KiCad · 25 a 28, do protótipo ao produto.

---

## Decisões

Decisões **travadas**. Uma vez escritas, não se repropõe. Se a realidade derrubar uma, a nova entra com data e o motivo da virada, e a antiga fica registrada.

- D1. (10/09/2026) **Numeração do material (trocada pela D6 em 11/09/2026).** As etapas e as aulas tinham os números do próprio material de estudo. Fica registrada pra explicar os números antigos que aparecerem em anotação de 10/09/2026.
- D2. (10/09/2026) **Simulador em vez de kit físico (trocada pela D7 em 11/09/2026).** O estudo seria todo no Wokwi (wokwi.com), que roda no navegador, não pede login e simula o Arduino Uno e o ESP32; o Tinkercad ficou de fora por não ter ESP32. Pela D2, instalar a IDE e o driver virava "abrir o Wokwi". Fica registrada; quem vale é a D7.
- D3. (10/09/2026) **O material de estudo é pago**: fica em `HARDWARE/PDF/`, fora do git (linha no `.gitignore` do SEIRES), e nada dele entra em página pública. O que é nosso (código dos exercícios, anotação, este plano) entra no git normalmente.
- D4. (10/09/2026) **Uma aula = um passo, no modo estudo.** Enunciado cru, o dono tecla, veredito só quando pedido, explicação linha por linha depois que ele tentou. A aula fecha com o exercício rodando no Wokwi, o código salvo em `exercicios/` e o dono explicando com as próprias palavras o que cada linha faz. Aula sem exercício fecha quando o dono passar os olhos no material.
- D5. (10/09/2026) **Rede elétrica fica fora do estudo.** Um dos desenhos do material liga lâmpadas de 110/220V no relé (aula 2). No simulador isso não existe; se um dia virar kit físico, o relé se confere pelo clique e pelo LED do próprio módulo, sem tomada.
- D6. (11/09/2026) **A numeração é nossa.** As aulas vão de 1 a 28 numa sequência só, na ordem do nosso cronograma, e as etapas levam os nomes da série *Do LED ao ESP32*; a Etapa 0 é a introdução e a Etapa 6 não tem episódio na série. O plano não cita a origem do material: o `PDF/_mapa.md`, fora do git, liga cada aula ao arquivo. A apresentação, as peças e o ambiente viraram parte da aula 1, que é a primeira com a mão no código. O material extra entrou no cronograma como aula própria (Etapa 6) ou como leitura da aula em que ele cabe. Exercício salvo em `exercicios/NN.E - nome/`: NN é a aula e E o exercício dentro dela, que recomeça do 1 a cada aula.
- D7. (11/09/2026) **Kit comprado na bancada, Wokwi do lado.** O dono vai usar as peças de verdade, não só o simulador. A aula fecha com o exercício rodando na placa; o Wokwi entra pra testar antes de montar, pra comparar quando o circuito real não funcionar, ou enquanto a peça não chega. Onde a D4 fala em Wokwi, vale a placa. A instalação volta: a IDE do Arduino e o driver do conversor USB-serial da placa compatível (CH340) na aula 1, o suporte do ESP32 na IDE na aula 16, o Node-RED na aula 13 e o KiCad na aula 21. A D5 continua valendo com o kit: o relé só liga coisa de baixa tensão, e se confere pelo clique e pelo LED do módulo. O exercício fica em `exercicios/NN.E - nome/` com o `sketch.ino` e um `LEIA-ME.txt` dizendo que peça vai em que pino; se passou pelo Wokwi, vão junto o `diagram.json` e o link.

## Pendências

Cada uma diz **em que etapa trava**. Pendência sem etapa dona vira esquecimento.

- P1. **Exercício que faltava na aula 1.** Resolvida em 11/09/2026: o material pulava do primeiro exercício pro terceiro, e com a numeração nossa (D6) a aula 1 tem dois exercícios e o buraco some. Se o vídeo mostrar o que falta, ele entra como terceiro.
- P2. **Motor de passo no simulador.** Resolvida em 11/09/2026: com o kit (D7), a aula 10 roda no 28BYJ-48 com o driver ULN2003 de verdade. O Wokwi fica opcional.
- P3. **Node-RED e o Arduino simulado.** Resolvida em 11/09/2026: com a placa de verdade no USB (D7), o Node-RED lê a porta serial do PC nas aulas 13 e 14.
- P4. **O que o ESP32 simulado não faz.** Resolvida em 11/09/2026: com o ESP32 de verdade na rede de casa (D7), a página, a gravação pelo ar, a memória e o Bluetooth das aulas 16 a 20 rodam nele. O Wokwi fica pra testar a lógica antes.
- P5. **Faltava o material das Etapas 3, 4 e 5.** Resolvida em 11/09/2026: chegou tudo, e texto e figuras foram lidos. Só a aula 21 (instalar o KiCad) não tem material, e não precisa.
- P6. **O que tinha no material extra.** Resolvida em 11/09/2026: lido inteiro e distribuído no cronograma (D6), com quatro aulas próprias na Etapa 6 e o resto como leitura das aulas 10, 13, 16, 19, 20 e 22.
- P7. **Conferir o kit.** Ver o que foi comprado contra a lista das peças do material: Arduino Uno compatível com cabo USB, ESP32 com cabo, display I2C 16x2, motor de passo com driver, sensor de ultrassom, módulo de relé de 2 canais, protoboard, 20 jumpers macho-macho e 20 macho-fêmea, trimpot de 10 kΩ, 2 resistores de 470 Ω, 4 de 10 kΩ, 2 LEDs e 2 teclas (a tabela do material diz ESP8266, mas a foto e as aulas usam o ESP32). O que faltar, a aula que usa a peça faz no Wokwi até a peça chegar. **Trava a Etapa 1.**

---

## Status das etapas

Ao fechar uma aula ou etapa, marcar `✅ + data` **aqui e no arquivo dela**, e regerar o HTML. Índice desatualizado é pior que índice nenhum.

| # | Etapa | Status | Última mexida |
|---|---|---|---|
| 0 | Antes de começar | em andamento, falta conferir o kit e ouvir os dois áudios | 11/09/2026 |
| 1 | O cérebro e os sentidos | em andamento, na aula 1 | 11/09/2026 |
| 2 | O controlador fica esperto | não iniciada | |
| 3 | O painel da portaria | não iniciada | |
| 4 | A caixa d'água no WiFi | não iniciada | |
| 5 | A placa própria | não iniciada | |
| 6 | Do protótipo ao produto | não iniciada | |

Etapa em andamento se escreve com a aula em que parou: `em andamento, na aula 7`.

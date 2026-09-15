## Etapa 5: A placa própria

**Objetivo:** desenhar no KiCad a placa de circuito impresso (PCB) de um circuito do estudo e gerar os arquivos que uma fábrica usa pra produzir a placa.

**Conteúdo de estudo:** esquemático (o desenho de quem liga em quem) x layout da placa (onde cada peça e cada trilha ficam de verdade); footprint (a pegada física de cada componente); o que deixa um circuito robusto (proteger a alimentação, separar potência de sinal, isolar as entradas); placa de duas faces e plano de terra; e os arquivos Gerber, que são o que a fábrica lê.

**Material:** o arquivo de cada aula está no `PDF/_mapa.md`. Vem pronto o projeto inteiro no KiCad, com as bibliotecas das peças (ESP32 DevKitC, optoacoplador PC817, conversor LM2596, indutor de filtro) e o esquemático também em PDF. O KiCad é programa de computador, gratuito; nesta etapa não tem simulador (D7).

Tarefas:
- Instalar o KiCad na aula 21.
- Os arquivos do projeto de PCB ficam em `exercicios/NN.E - nome/`, como os outros.

## Aulas (uma aula = um passo)

| # | Aula | Estado |
|---|---|---|
| 21 | **O KiCad.** Instalar e conhecer o ambiente; abrir o projeto pronto do material pra ver o caminho inteiro (esquemático, placa, 3D). Sem material escrito: é instalação | não iniciada |
| 22 | **Quem liga em quem.** O esquemático do circuito de robustez que o material traz: o ESP32 encaixado na placa, as entradas isoladas por optoacoplador PC817, o relé acionado por transistor com diodo, e a fonte protegida (diodo contra inversão, indutor de filtro e o regulador LM2596). A busca de símbolo e footprint prontos (componentsearchengine.com, snapeda.com) e, quando não acha, fazer o footprint medindo a peça. Leitura extra: a parte de hardware dos 10 passos da aula 25, que explica o porquê de cada proteção | não iniciada |
| 23 | **Onde passa cada trilha.** Levar os footprints pra placa, desenhar o contorno e ver em 3D, organizar como no esquemático (não é obrigatório), definir trilhas e vias, placa de duas faces, plano de terra, conferir todas as conexões e imprimir em papel pra conferir o tamanho real. Modelos 3D das peças no GrabCAD | não iniciada |
| 24 | **O arquivo que vai pra fábrica.** Gerar os Gerber; o plugin do fabricante dentro do KiCad, a conta e o pedido da placa | não iniciada |

**Pronto quando:** as aulas 21 a 24 estão `✅` com data e existe o Gerber de uma placa desenhada pelo dono, que ele explica peça por peça.

**Desvios registrados:**

- 11/09/2026: numeração nossa (D6); o material chegou e as aulas ganharam o conteúdo.

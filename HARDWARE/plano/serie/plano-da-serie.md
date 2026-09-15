# Série: Hardware

**Estado (14/09/2026):** no ar em series.afx.art.br como card 03 da home.
- O `hardware.html` toca o áudio da série inteira ("Como as máquinas tomam decisões").
- O `etapas/hardware-01.html` toca a v1 do áudio da etapa 1.
- A v2 da etapa 1 tem trio aprovado, mas o áudio ainda não foi gerado: o Edge do lab estava sem login.
- Nenhum episódio numerado gravado. Os das etapas 2 a 5 continuam provisórios até a aula acontecer.
- A coluna Aula usa a numeração do plano de estudo (aulas 1 a 28, D6 de lá).

**Formato:** episódios NotebookLM via `/criar-podcast` (trio por episódio), cada um com a sua `animacao.html` no molde das outras séries, um circuito que se mexe na própria página e o circuito completo no Wokwi. A série e cada etapa têm também um episódio só de áudio (D8).
**Fonte:** o estudo do Flávio (plano em `HARDWARE/plano/md/`), feito sobre material pago de Arduino e ESP32. A série usa os assuntos, nunca o material (D1, D7).
**Capa:** `site/img/serie-hardware.webp` (P3 resolvida).
**Artes das 5 etapas:** `site/img/hardware-etapa-01.webp` a `-05.webp` (1200x670), nos cards do `hardware.html`, no lugar de "Arte provisória". No ar desde 14/09/2026. Mesmo estilo da capa (oficina escura, luz âmbar, a caixa d'água em miniatura em todas), geradas no Flow; originais, prompts e comando de regerar em `HARDWARE/_arquivos/capa-etapas/`. Clicar na arte (a lupa fica no canto de baixo) abre a imagem grande no lightbox da base (`site/js/animacao/lightbox.js`, que desde 14/09 também funciona fora das animações), com a legenda "Etapa NN · nome · ilustração".
**Como fazer cada coisa** (episódio público, página com áudio, subir o site): `HARDWARE/plano/_COMO-FAZER.md`.

---

## A tese

Todo aparelho que parece esperto é a mesma coisa por dentro. A máquina de lavar que sabe a hora de parar, o portão que abre sozinho, a bomba que enche a caixa d'água do prédio: em todos eles mora um chip pequeno que **lê sensores, decide e mexe em alguma coisa**, num laço que não para nunca. Esse chip é o microcontrolador, e o Arduino é o jeito mais fácil de pôr a mão num.

A série monta um aparelho desses do zero, peça por peça, no simulador. Quem ouve não precisa comprar nada pra acompanhar: cada episódio termina com o circuito rodando no Wokwi, com o link pra abrir e mexer.

**O princípio vale pra qualquer microcontrolador.** Arduino e ESP32 são o veículo, não o assunto: sensor, atuador, laço, decisão e tempo são os mesmos num Arduino, num ESP32, num controlador de fábrica ou na placa da geladeira. Todo episódio fecha dizendo **onde aquilo aparece** fora da bancada.

## Quem está na bancada

- **Professor:** o Claude. Mostra o problema antes da peça que resolve, e não entrega o circuito pronto quando o objetivo é o Flávio montar.
- **Aluno:** o Flávio. Estuda a aula primeiro, e as dúvidas dele viram o roteiro (D3).
- **O aparelho:** **a caixa d'água que se cuida sozinha**. Nasce na etapa 1 como um LED piscando e termina na etapa 5 com placa própria. Nada de exemplo solto que some no episódio seguinte.

## Arco da série

Uma pergunta única atravessa tudo: **como a caixa d'água de um prédio passa a encher sozinha, avisar quando falta água e contar pro celular como está, sem que nenhuma peça dessa história seja mágica pra você?**

**Regras que seguram tudo:**

1. **O mesmo aparelho do começo ao fim.** Toda etapa deixa a caixa d'água melhor do que estava; etapa que não deixou está errada.
2. **A tela se mexe.** Todo episódio tem pelo menos um circuito interativo na própria página (botão que acende o LED, trimpot que muda o número, PWM mostrando a onda) e o link do circuito completo no Wokwi (D4).
3. **Estudo primeiro, episódio depois.** Cada episódio nasce de uma aula que o Flávio já fechou no plano de estudo (D3).
4. **Todo episódio diz onde aquilo aparece fora da bancada.** Uma frase no fim: isto aqui é o que tem dentro do portão eletrônico, da máquina de lavar, da fábrica.
5. **Nada de tomada.** A bomba é um relé que clica, e o áudio diz em voz alta que ligar carga de verdade na rede elétrica é outro assunto (D6).
6. **Extras são aprofundamentos**, cada um dizendo depois de qual ponto vale ouvir. As outras séries já têm alguns que servem aqui (seção "Ouvir antes, das outras séries").
7. **O áudio chama os extras (D9).** Quando o roteiro passa por um assunto que tem extra, desta série ou das outras, o áudio avisa numa frase que existe um episódio extra sobre aquilo e diz o nome dele.

---

## As 5 etapas

| # | Etapa | O que a caixa d'água ganha | Eps | Status |
|---|---|---|---|---|
| 1 | **O cérebro e os sentidos** | liga a bomba sozinha e acende o alarme | 5 | 🔴 |
| 2 | **O controlador fica esperto** | sensor de nível de verdade, visor, registro motorizado e proteção da bomba | 6 | 🔴 |
| 3 | **O painel da portaria** | uma tela no computador mostra tudo e manda comando | 3 | 🔴 |
| 4 | **A caixa d'água no WiFi** | o celular abre a página da caixa d'água | 6 | 🔴 |
| 5 | **A placa própria** | o circuito sai do simulador e vira desenho de placa pra fábrica | 4 | 🔴 |

Status: 🔴 não iniciado · 🟠 parcial · 🟢 tudo publicado
**Placar:** 0 publicados · 24 pela frente (fora os extras).

---

## Etapa 1 - O cérebro e os sentidos

*O microcontrolador, o laço que não para e os sentidos básicos: sentir um toque, medir uma quantidade e agir.* Nesta etapa o sensor de nível é um trimpot fazendo o papel da boia: girar o botãozinho é a água subindo ou descendo.

| Pasta | Episódio | O que cobre | Aula | Status |
|---|---|---|---|---|
| `01` | **O laço que nunca para** | o que é um microcontrolador (um computador inteiro num chip só: processador, memória e pinos), `setup()` e `loop()`, e o primeiro sinal de vida da caixa d'água: um LED que pisca pra dizer "estou funcionando", como o de todo aparelho ligado. O Monitor Serial, com o controlador contando o que está fazendo | 1 | 🔴 |
| `02` | **A boia e a bomba** | entrada e saída digital. A chave-boia é um contato seco, igual a um botão; por que a entrada solta "flutua" e mente, e como o pull-up resolve (o resistor que já mora dentro do chip). A bomba é um relé: o pino não aguenta motor, só dá a ordem. Por que o LED precisa de resistor, com a lei de Ohm no prédio da água | 2 | 🔴 |
| `03` | **Quanta água tem** | entrada analógica: o trimpot como boia, a tensão virando um número de 0 a 1023, e por que 1023 (dez lâmpadas do binário). O nível aparecendo no Monitor Serial | 3 | 🔴 |
| `04` | **Meio aceso** | a saída analógica que não é analógica: PWM, liga e desliga tão rápido que o olho vê meio-termo. Ciclo de trabalho e `analogWrite` de 0 a 255, com o LED do painel acendendo mais quanto mais cheia a caixa | 4 | 🔴 |
| `05` | **A caixa d'água decide sozinha** | `if`/`else`: abaixo do mínimo liga a bomba e acende o alarme, no máximo desliga, no meio só mostra o nível. E por que a bomba não pode ligar e desligar no mesmo ponto (a histerese, o intervalo que impede o liga-desliga sem fim). A primeira versão do aparelho funcionando inteira | 5 | 🔴 |

*A etapa tem também o episódio `00 - A etapa inteira` (D8), só áudio, escrito em 11/09/2026: conta a etapa numa olhada só e mora na página `site/etapas/hardware-01.html`.*

**Fecha quando:** a versão 1 da caixa d'água roda no Wokwi: girando a boia, a bomba liga e desliga sozinha e o alarme acende na hora certa.
**Aparece em:** termostato de geladeira, boia elétrica de caixa d'água, portão com fim de curso.

## Etapa 2 - O controlador fica esperto

*Sai o trimpot e entra o sensor de verdade. O controlador aprende a guardar número, a repetir, a usar peça pronta e a fazer duas coisas ao mesmo tempo.*

| Pasta | Episódio | O que cobre | Aula | Status |
|---|---|---|---|---|
| `01` | **Quanto cabe numa caixinha** | tipos de dado: o nível em centímetros cabe num `int`, a porcentagem com vírgula pede `float`, e o que acontece quando a conta estoura | 6 | 🔴 |
| `02` | **Peça pronta** | biblioteca: o que ela traz e como entra no projeto, pra o visor e o motor não precisarem ser escritos do zero | 7 | 🔴 |
| `03` | **Enquanto não encher** | `while`: repetir enquanto uma condição vale, e o perigo do laço que trava o aparelho inteiro. Estreia o visor de duas linhas mostrando o nível na casa de máquinas (ele conversa por I2C) | 8 | 🔴 |
| `04` | **O eco que mede a água** | `for` e o sensor de ultrassom: o som que bate na água e volta, o tempo virando distância, e a média de várias medidas pra não confiar num eco só | 9 | 🔴 |
| `05` | **O registro que abre de pouquinho** | motor de passo: girar um número exato de passos, e o registro da saída de água que abre e fecha pela metade | 10 | 🔴 |
| `06` | **Duas coisas ao mesmo tempo** | `millis()` no lugar do `delay`, pra medir o nível sem parar de piscar o LED de vida; o limite de tempo que protege a bomba de rodar a seco; e o botão de emergência que para tudo na hora (interrupção) | 11 | 🔴 |

**Fecha quando:** a versão 2 roda no Wokwi com o sensor de ultrassom, o visor mostrando o nível e a bomba desligando sozinha se passar do tempo.
**Aparece em:** sensor de ré do carro, bomba de piscina com timer, botão de emergência de esteira.

## Etapa 3 - O painel da portaria

*O zelador não quer subir no telhado: quer ver a caixa d'água da portaria.*

| Pasta | Episódio | O que cobre | Aula | Status |
|---|---|---|---|---|
| `01` | **Um fio, uma letra de cada vez** | comunicação serial: os dois lados combinando a velocidade, o controlador mandando "nivel=73" e o computador lendo | 12 | 🔴 |
| `02` | **Blocos que conversam** | Node-RED: montar programa ligando caixinhas (entrada, conta, tela) em vez de escrever linha | 13 | 🔴 |
| `03` | **O painel da portaria** | o supervisório: o nível num mostrador, a bomba numa luz, e um botão na tela que liga a bomba lá em cima | 14 | 🔴 |

**Fecha quando:** o painel mostra o nível mudando e o botão da tela liga a bomba.
**Aparece em:** a sala de controle de qualquer fábrica, estação de tratamento de água, painel de prédio inteligente.

## Etapa 4 - A caixa d'água no WiFi

*Troca o cérebro: o ESP32 faz o mesmo que o Arduino e ainda fala WiFi.*

| Pasta | Episódio | O que cobre | Aula | Status |
|---|---|---|---|---|
| `01` | **O irmão com WiFi** | o que o ESP32 tem a mais (WiFi, Bluetooth, dois núcleos) e o cuidado que ele pede: os pinos trabalham com 3,3 V, não com 5 | 15 | 🔴 |
| `02` | **A caixa d'água vira site** | o ESP32 servindo uma página: o celular na mesma rede abre o endereço e vê o nível | 16 | 🔴 |
| `03` | **Dois cérebros num chip** | um núcleo cuida do WiFi e o outro cuida da bomba, porque a bomba não pode esperar a rede | 17 | 🔴 |
| `04` | **Endereço fixo** | por que o endereço muda quando o roteador reinicia, e como fixar | 18 | 🔴 |
| `05` | **Trocar a senha sem regravar** | o aparelho que pede o nome da rede e a senha na primeira vez que liga, como toda lâmpada inteligente | 18 | 🔴 |
| `06` | **O relatório da caixa d'água** | JSON: o ESP32 mandando o nível pro computador num formato que qualquer programa entende | 19 | 🔴 |

*Remapeada em 11/09/2026: o material junta dual core, gravação pelo ar e memória numa aula (17) antes da configuração da rede (18), por isso "Dois cérebros" veio antes de "Endereço fixo". A aula 20 (Bluetooth e app de celular) ainda não tem episódio.*

**Fecha quando:** o ESP32 simulado serve a página da caixa d'água e manda o relatório em JSON.
**Aparece em:** tomada inteligente, câmera de segurança com app, medidor de energia que manda leitura sozinho.

## Etapa 5 - A placa própria

*O circuito sai do simulador e vira uma placa que dá pra mandar fabricar.*

| Pasta | Episódio | O que cobre | Aula | Status |
|---|---|---|---|---|
| `01` | **Do desenho à placa** | o KiCad e o caminho inteiro: esquemático, placa e o arquivo que vai pra fábrica | 21 | 🔴 |
| `02` | **Quem liga em quem** | o esquemático do controlador da caixa d'água, a pegada física de cada peça, e o que deixa um circuito robusto contra ruído e contra ligação errada | 22 | 🔴 |
| `03` | **Onde passa cada trilha** | o desenho da placa: posicionar as peças e passar as trilhas | 23 | 🔴 |
| `04` | **O arquivo que vai pra fábrica** | os arquivos Gerber, o que cada um diz, e como a placa pronta volta pelo correio | 24 | 🔴 |

**Fecha quando:** existe o Gerber da placa do controlador da caixa d'água.
**Aparece em:** toda placa verde de todo aparelho que você tem em casa.

---

## _EXTRAS - os aprofundamentos

Cada extra desce a fundo num assunto que travaria o episódio se fosse explicado no meio dele. São autocontidos, pra circularem soltos (mesma regra dos extras das outras séries). A coluna **Ouvir depois de** é recomendação de ordem, não dependência.

| Pasta | Extra | Aprofunda | Ouvir depois de | Status |
|---|---|---|---|---|
| `01` | **O que tem dentro do microcontrolador** | processador, memória do programa, memória de trabalho e pinos; por que o programa sobrevive quando a placa desliga e a variável não | etapa 1, ep 01 | 🔴 |
| `02` | **O resistor e as cores** | ler o valor pelas faixas coloridas, e por que o LED do painel pede um resistor e não outro | etapa 1, ep 02 | 🔴 |
| `03` | **O relé por dentro** | um ímã puxando uma chave, e por que ele separa o chip do motor | etapa 1, ep 02 | 🔴 |
| `04` | **O botão que pula** | o contato que treme por um instante e conta dez apertos no lugar de um, e como o programa ignora o tremor | etapa 2, ep 06 | 🔴 |
| `05` | **3,3 V e 5 V** | por que misturar os dois queima a placa, e como dois mundos de tensão conversam sem se machucar | etapa 4, ep 01 | 🔴 |
| `06` | **A história do Arduino** | como e por que a placa nasceu, e o que ela mudou pra quem queria mexer com eletrônica sem ser engenheiro. Extra de família *peça e figura* (com pessoa e data): pede fonte primária antes de gravar | etapa 1, ep 01 | 🔴 |

*Chamados no áudio da etapa 1 (D9, 14/09/2026):* os extras 01 e 06 desta série ("vai ter"), e da outra série *Volt, Ampère e Watt*, *O Sistema Binário* e *O Hertz* ("tem") e *O relé* ("vai ter", em produção lá). ⚠️ O extra 03 daqui (*O relé por dentro*) repete o *O relé* da outra série: proposta de usar o de lá e não fazer outro, esperando o Flávio. Os candidatos das duas séries estão em [`SEIRES/plano/candidatos-a-extra.md`](../../../plano/candidatos-a-extra.md); as pastas continuam nesta tabela. O relé também vai chamar o extra *O Eletroímã* (o `19` de *Do Ábaco à IA*, em produção desde 14/09/2026; ver P6).

## Ouvir antes, das outras séries

Episódios já no ar em series.afx.art.br que preparam o terreno. São links, não cópias.

- **Volt, Ampère e Watt** (extra 01 de *Do Ábaco à IA*): a caixa d'água do prédio como tensão, corrente e resistência. É o mesmo prédio desta série. Antes da etapa 1.
- **O computador encolhe** (etapa 7 de *Do Ábaco à IA*): o transistor e o microprocessador, os avós do microcontrolador. Antes do ep 1.01.
- **O Sistema Binário** (extra 04 de *Do Ábaco à IA*): por que a entrada analógica vai até 1023. Antes do ep 1.03.
- **O Hertz** (extra 07 de *Do Ábaco à IA*): o que quer dizer o PWM ligar e desligar centenas de vezes por segundo. Antes do ep 1.04.

## Regras de produção

- **Mesmo caminho das outras séries:** trio do NotebookLM com a REGRA DURA DAS TELAS, áudio antes da animação, `mapa-de-telas.py` e `marcadores-do-mapa.py`, e a animação nascendo do `_molde-animacao.html` (nunca da cópia de outro episódio). Toda tela tem imagem 16:9. Imagem gerada pelo site do Flow não gasta crédito; o que gasta é vídeo, e o modo padrão do Flow é vídeo, então conferir que o chip da barra está em Imagem antes de gerar.
- **O circuito da tela** é peça da própria página (HTML, SVG e JS), simplificado pra caber na tela e dar pra mexer. O circuito completo mora no Wokwi, num projeto público por episódio, salvo também na pasta do episódio (`sketch.ino`, `diagram.json` e o link). O circuito desenhado pode ser a imagem da tela.
- **Sem ficha humana e sem janela temporal**, como na JAVA WEB: não é série de história. Pessoa só entra quando ajuda, e aí vale a regra da fonte primária antes de gravar.
- **Nada do material pago na página pública (D1):** nem slide, nem exercício, nem texto, nem imagem, nem de onde ele veio.
- **Pastas e páginas:** `HARDWARE/NN - Nome da etapa/NN - Nome do episódio/`, como nas outras séries. No site: `site/hardware.html`, `site/etapas/hardware-NN.html` e a entrada no `site/js/menu.js`.

---

## Decisões da série

- **D1.** (10/09/2026) **A série é nossa.** LED, botão, PWM, relé, ESP32 e placa são assuntos de qualquer estudo de Arduino e entram. Os slides, os exercícios, os textos, as imagens e a origem do material pago não entram, porque o material é pago e o site é público.
- **D2.** (10/09/2026) **Um aparelho só, do começo ao fim: a caixa d'água que se cuida sozinha.** Conversa com o prédio da água do extra de Volt e Ampère da outra série.
- **D3.** (10/09/2026) **Estudo primeiro, episódio depois.** Cada episódio nasce de uma aula fechada no plano de estudo (`HARDWARE/plano/md/`), e as dúvidas do Flávio naquela aula entram no roteiro.
- **D4.** (10/09/2026) **A tela se mexe.** Todo episódio tem pelo menos um circuito interativo na página e o link do circuito completo no Wokwi.
- **D5.** (10/09/2026) **O formato é um meio-termo.** Da JAVA WEB fica o projeto que cresce de etapa em etapa, sem a tese de argumento. Dos extras de *Do Ábaco à IA* fica a tela que se mexe, sem a trilha de história.
- **D7.** (11/09/2026) **Nada do material pago no episódio, nem de leve.** Pedido dele: "refaz sem indícios que é o curso, e o mesmo serve para as aulas e aula de etapa". O episódio público nasce na pasta da série, na voz dela, sem exercício, sem tarefa, sem tabela pra preencher e sem vocabulário de aula ("o material pede", "aula número tal"). O assunto é de domínio público e entra à vontade. O áudio do estudo, que fala em aula e exercício, fica no acervo do Nexus e não vai pro site.
- **D8.** (11/09/2026) **Cada etapa ganha o episódio da etapa inteira**, numerado `00`, só áudio, contando a etapa numa olhada só; os episódios numerados descem em cada peça depois. Ele mora em `HARDWARE/NN - Etapa/00 - A etapa inteira/` e a página da etapa (`site/etapas/hardware-NN.html`) leva o tocador dele. A série também tem o seu, um nível acima: `HARDWARE/00 - A série inteira/`, que toca no alto do `hardware.html`, logo abaixo do texto de abertura.
- **D6.** (10/09/2026) **Nada de tomada.** A bomba é um relé que clica, e o áudio avisa que carga de verdade na rede elétrica pede outro cuidado.
- **D9.** (14/09/2026) **O áudio chama os extras.** Pedido dele: "salva no plano geral da série que eu gosto de indicações de episódios extra na montagem do áudio". Quando o roteiro passa por um assunto que tem extra, desta série ou das outras (o Binário e o Hertz de *Do Ábaco à IA*, por exemplo), o áudio diz numa frase que existe um episódio extra sobre aquilo e o nome dele, sem abrir o assunto ali. Vale pro episódio da etapa inteira, pro da série inteira e pros numerados. Os extras chamados saem da lista de candidatos que o Flávio aprova antes do roteiro.
- **D10.** (14/09/2026) **Extra diz quem descobriu.** Pedido dele: "nos extras eu quero saber quem descobriu". Todo extra conta o mecanismo e também quem descobriu ou inventou, com a ficha em voz alta e fonte primária antes de gravar. Vale nas duas séries (registrado também no plano de *Do Ábaco à IA*).

## Pendências

- ~~**P1.** **Nome da série.**~~ Resolvida em 10/09/2026 como *Do LED ao ESP32* e **trocada por ele em 12/09/2026: a série se chama Hardware**. O nome antigo virou a linha de apoio do card ("do LED que pisca à placa própria"). Trocado no card da home, no `menu.js`, no `hardware.html` e na página da etapa.
- ~~**P2.** **Posição do card no hub.**~~ Resolvida em 10/09/2026: posição 03, e Lua, Corpo e Evolução viraram 04, 05 e 06 (no hub e no `menu.js`).
- ~~**P3.** **Capa da série.**~~ Resolvida em 10/09/2026: gerada no Flow (modo imagem), `site/img/serie-hardware.webp` em 1200x670; original e prompt em `HARDWARE/_arquivos/capa-serie/`.
- **P4.** **Wokwi dentro da página ou só o link.** Conferir se o Wokwi deixa rodar o circuito embutido na página da série; se não deixar, fica o link. Trava: o episódio 1.01.
- **P5.** **O circuito da tela vai pra base?** Ele aparece em todo episódio: no terceiro uso, propor peça da base em `site/js/animacao/` (regra do terceiro clone). Trava: nada por enquanto.
- **P6.** **Chamada do Eletroímã no áudio v2 da etapa 1.** O extra *O Eletroímã* (o `19` de *Do Ábaco à IA*, em produção desde 14/09/2026) entra como chamada na parte do relé do trio v2 (`01 - O cérebro e os sentidos\00 - A etapa inteira\`, linha `CHAMADA DE EXTRA` do `_NotebookLM_`) e no `Overview.txt`, com o verificador de novo. ⚠️ **Trava: gerar o áudio v2 da etapa 1.** Gerado antes, ele sai sem a chamada e regrava. Na sequência combinada, a chamada entra depois do áudio do extra; o estado e as decisões esperando o Flávio estão na seção `_EXTRAS` do plano de *Do Ábaco à IA* e no `_HANDOFF-2026-09-14-eletroima.md` da pasta `plano` de lá.

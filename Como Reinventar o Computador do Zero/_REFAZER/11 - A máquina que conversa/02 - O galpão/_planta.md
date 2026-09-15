# Planta de telas: O galpão (11.02)

**Janela temporal:** de 2015 a 2022, com duas pontas fora: o NVLink anunciado em 2014 (dito como passado na tela 3) e a placa de casa de 2025 (tela 5, pedido dele em 14/09; a decisão de 10/09 manda ignorar o limite de data).
**Protagonistas com ficha humana:** Norm Jouppi (sem ano de nascimento público) · Eyal Waldman (sem ano confirmado) · Kevin Scott (n. 1972, só na Wikipedia). Relembrados sem repetir a ficha: Jensen Huang (9.02) e Ilya Sutskever (9.03).
**Extra aprovado (o áudio diz "tem um extra sobre isso", sem nome):** o 71, A placa de treinar por dentro (tela 10).
**Filmes que o áudio chama:** a reportagem do 60 Minutes sobre o Huang (2024, tela 3) e o Overview da PBS sobre os data centers (2026, tela 10). Os dois são de depois da janela, e o áudio diz isso.
**Fonte de cada fato:** `_pesquisa.md`, na mesma pasta.

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | costura em uma frase: o 11.01 fechou com "quem constrói o galpão que cabe isso?"; o que este resolve (o programa cresceu mil vezes, e a peça teve que mudar pra ele); a analogia anunciada em uma frase; janela 2015–2022 |
| 2 | ficha | 2015 e 18 de maio de 2016, a TPU: o Google já rodava há mais de um ano um chip feito só pra rede neural (busca, Street View, o AlphaGo contra Lee Sedol), e só conta em 2016; ficha do Jouppi (tech lead da TPU desde o começo, antes arquiteto do MIPS em Stanford) |
| 3 | ficha | 5 de abril de 2016, o DGX-1: oito P100 num gabinete, ligadas pelo NVLink (anunciado em 2014, só agora num produto), 3.200 W, "o equivalente a 250 servidores"; até 9 de agosto de 2016 o Huang entrega em mãos o primeiro de produção à OpenAI, com o Sutskever do lado de lá. Filme: 60 Minutes (2024) |
| 4 | conteudo | por que oito placas: a turma de quinta série (a placa, do 9.02) virou uma escola inteira. Cada sala faz a mesma continha ao mesmo tempo, mas agora as salas precisam trocar os resultados, e o problema passa a ser o corredor entre elas |
| 5 | interativa | a memória empilhada: a memória sobe pra junto do chip, porque o gargalo virou levar e trazer número (a primeira foi a Fury X, da AMD, em 2015; a P100 chega com 16 GB). **Prática: "cabe na placa?"**, o ouvinte escolhe o tamanho do modelo e a precisão (16 ou 4 bits) e vê quantas placas de 16 GB ocupa. Fecha com "e na placa de casa?": a RTX 5090 (2025, 32 GB) roda modelo local, só não roda os grandes; até uns 30 bilhões cabe; 70 bilhões em 4 bits já não cabe; o GPT-3 ocupa 350 GB, umas 11 placas; e os modelos de ponta nem chegam nessa conta, porque os pesos não são liberados |
| 6 | ficha | 10 e 17 de maio de 2017, com uma semana de diferença, as duas respostas: a V100 com o Tensor Core, um pedaço do chip que faz de uma vez a continha da rede (multiplica duas tabelinhas de 4 por 4 e soma uma terceira, em 16 bits), e a TPU v2 do Google, 64 chips num pod, ainda resfriada a ar |
| 7 | interativa | 2018, o corredor: em março o NVSwitch deixa 16 V100 conversando ao mesmo tempo (DGX-2) e a V100 dobra pra 32 GB; em maio o Google usa resfriamento a líquido pela primeira vez, na TPU v3. **Prática: dobrar as placas e ver o tempo da conversa entre elas comer o ganho**, com e sem corredor largo |
| 8 | ficha | 11 de março de 2019, a Nvidia anuncia a compra da Mellanox (6,9 bilhões de dólares, fechada em 27 de abril de 2020): o InfiniBand liga um gabinete ao outro; dentro do gabinete as placas conversam pelo NVLink, entre gabinetes pelo InfiniBand. Ficha do Waldman (cofundou a Mellanox em 1999, CEO até a venda, sai no fim de 2020) |
| 9 | ficha | maio de 2020: no dia 14, a A100; no dia 19, a Microsoft anuncia a máquina que montou pra OpenAI, mais de 285 mil núcleos de processador, 10 mil placas e 400 gigabits por servidor, entre as cinco maiores divulgadas. Ficha do Kevin Scott (CTO da Microsoft desde 2017). **Dizer só o que a fonte diz:** o GPT-3 do 11.01 sai nove dias depois, treinado em V100 num cluster da Microsoft; que seja a mesma máquina, as datas sugerem e os textos não dizem. Em outubro de 2021, o corredor em escala: a Nvidia e a Microsoft treinam o Megatron-Turing no Selene, 560 gabinetes ligados por InfiniBand |
| 10 | conteudo | a conta de luz: o treino do GPT-3 gastou 1.287 MWh (Patterson e outros, 2021: umas 10 mil V100 por uns 15 dias, número que a própria Nvidia sugeriu), o consumo de umas 615 casas do Sudeste por um ano; por que a refrigeração virou problema (TPU v2 com 280 W por chip, v3 com 450 W). Filme: Overview da PBS (2026). Gancho: extra 71, A placa de treinar por dentro |
| 11 | ficha | 22 de março de 2022, a H100: a Nvidia dá a uma parte da placa o nome do programa, o Transformer Engine, circuito mais software que mistura contas de 8 e 16 bits pra acelerar o Transformer; 80 GB; o gabinete com oito chega a 10,2 kW (o DGX-1 de 2016 era 3,2 kW); anunciada no mesmo mês do Chinchilla e do InstructGPT, mas só chega a cliente em outubro de 2022, depois de o GPT-3.5 terminar o treino |
| 12 | fecho | as pessoas na ordem e onde estavam em 2026 (Jouppi no Google, apresentando a oitava TPU em agosto; Waldman investidor, janeiro; Scott CTO da Microsoft, junho; Huang CEO da Nvidia, setembro); a lição (o Transformer foi desenhado pra placa; agora a placa leva o nome do Transformer); a pergunta que abre o 11.03: o galpão pronto sabe responder? |

**Total: 12 telas narradas** (11 pedidos de Próximo). Justificativa: oito momentos datados (2015/16 TPU, 2016 DGX-1, 2017, 2018, 2019, 2020, 2022, e a memória de 2015/16) pedem uma tela cada, a analogia e a energia pedem duas, e a capa e o fecho fecham a conta em doze, o mesmo molde das etapas 8 a 10.

## Decidido em 14/09 (ele deixou comigo: "não sei, tu escolhe")

1. **Jonathan Ross fica de fora.** As fontes dele são secundárias, e a ficha da TPU fica só com o Jouppi, que tem página oficial.
2. **O Selene entra numa frase, no fim da tela 9** (outubro de 2021, fonte primária da Microsoft Research): é o corredor em escala dentro da janela. **O supercomputador da Meta e o PaLM na TPU v4 ficam fora:** os dois só foram lidos em resumo de busca, e mais máquinas de mais empresas puxam o episódio pra corrida das empresas, que é da etapa 12.
3. **A frase do Karpathy fica guardada pro 11.04**, onde vira gancho ("dá pra treinar, basicamente, um chatbot", agosto de 2016, post da Nvidia).

## Fora do roteiro, de propósito

- A filha do Waldman morta no ataque de 7 de outubro de 2023: a ficha é do trabalho, e o episódio não é sobre isso.
- A frase escrita na máquina ("To Elon and the OpenAI Team!") e o nome do Musk na entrega: só na Fortune, fonte secundária. O áudio diz "entregou em mãos à OpenAI".
- O tipo de memória da H100 (as fontes brigam entre HBM3 e HBM2e): dizer só 80 GB.
- *A Chip Odyssey* (2025): reserva pra etapa 12, que pergunta quem fabrica a placa.

# A faísca — o que o áudio pede de cada tela

Levantado da transcrição do áudio pronto (`_transcricao.txt`, 27,4 min, gerada por faster-whisper).
**Este arquivo manda na `animacao.html`, não o roteiro.** O áudio já existe: a tela tem que servir ao que foi falado, e não o contrário.

Título que o NotebookLM deu ao episódio: **Do âmbar ao raio de Benjamin Franklin**.

## Mapa das 8 telas

| Tela | Entra em | Dura | Conteúdo | Interação |
|---|---|---|---|---|
| 1 | 00:00 | 2:45 | Abre COM a cena dos 200 monges (antes de qualquer outra coisa), depois retoma Babbage e anuncia a etapa "Domesticando o Raio", 7 partes | — |
| 2 | 02:47 | 2:20 | Ficha: eletricidade estática, 1600 (Gilbert) a 1752 (Franklin); 150 anos de pesquisa sem nenhuma aplicação | — |
| 3 | 05:11 | 4:24 | Tales e o âmbar (600 a.C.), 2000 anos parados, Gilbert separa ímã de âmbar, cunha "elétrico" (elektron), monta o versório | — |
| 4 | 09:36 | 3:46 | Gray (1729): a eletricidade viaja; condutor vs isolante; o menino pendurado em cordas de seda | **Sim** |
| 5 | 13:24 | 4:18 | Garrafa de Leiden (1745-46), von Kleist e Musschenbroek, por que o vidro segura a carga, o balde, e Nollet com os monges | **Sim** |
| 6 | 17:44 | 3:28 | Franklin: os paralelos, Dalibard em maio de 1752, a pipa, o para-raios, positivo e negativo, a morte de Richmann em 1753 | — |
| 7 | 21:14 | 1:40 | Prática (o áudio manda pausar) | **Sim** |
| 8 | 22:56 | 4:26 | Recap das 4 peças, o balde que só despeja, os três "não dá" (telégrafo, motor, circuito), gancho da pilha de Volta e a provocação final | — |

## Ilustração de cada tela

Tudo já baixado/gerado em `img\` (licenças e créditos em [`img\CREDITOS.md`](img/CREDITOS.md)). Onde existia material histórico real, é ele; **as cenas geradas cobrem só o que o áudio conta e não tem gravura de época** (monges, Tales, o choque de Leiden, a barra de Marly), sempre com o selo `reconstituição` no card.

| Tela | Imagem | Origem |
|---|---|---|
| 1 capa | `monges-02.png` (o círculo inteiro no instante do pulo) | gerada no Flow |
| 2 ficha | `gilbert.jpg` + `franklin-pipa.jpg` lado a lado (as duas pontas do período, 1600 e 1752) | Commons, domínio público |
| 3 âmbar e a palavra | `tales-ambar.png`, `ambar.jpg`, `versorio.png` (na ordem da história) | Flow + Commons (âmbar é CC BY-SA, exige crédito) |
| 4 Gray | `menino-eletrico.jpg` (a gravura de época do menino suspenso) | Commons, domínio público |
| 5 garrafa de Leiden | `choque-leiden.png`, `garrafa-leiden.jpg` (o objeto real do museu), `musschenbroek.jpg`, `maquina-de-atrito.jpg` | Flow + Commons (a garrafa é CC BY-SA, exige crédito) |
| 6 Franklin | `marly-dalibard.png`, `franklin-pipa.jpg` e `richmann-morte.jpg` (Marly vem antes da pipa, como no áudio) | Flow + Commons, domínio público |
| 7 prática | fila interativa e a garrafa enchendo (sem foto) | — |
| 8 encerramento | reusa as miniaturas do recap (âmbar, versório, garrafa, pipa) em 2x2 | — |

**Histórias que o áudio conta e que ganharam imagem gerada** (não existia material real): Tales esfregando o âmbar e a palha voando (05:35), o choque que derrubou Musschenbroek e o "nem por todo o reino da França" (15:36-16:06), e a barra de ferro de Dalibard em Marly, maio de 1752, que veio antes da pipa (18:42-19:00). O menino pendurado (tela 4) **já tinha** gravura de época, a do Nollet.

Vale o esquema de **lightbox** dos outros episódios: card clicável que amplia a foto com a legenda.

## O que o áudio manda ter na tela, literalmente

**Tela 4 (Gray).** Dois botões: **fio de metal** e **corda de seda**. O áudio diz "tenta apertar o botão para usar o fio de metal e depois tenta usar a corda de seda" e promete que a carga "passa livremente pelo condutor e para imediatamente quando encontra o isolante". A cena desenhada é a do menino: suspenso na horizontal por cordas de seda presas no teto, tubo de vidro encostado no pé, faíscas saindo das mãos atraindo folhinhas de metal.

**Tela 5 (garrafa de Leiden).** Dois botões: **carregar** e **descarregar**. O áudio pede explicitamente "observe ali como o carregamento exige tempo, mas a descarga é completamente imediata" — então o carregamento tem que ser gradual (gota a gota, como o balde enchendo) e a descarga instantânea. E **a fila de personagens já aparece aqui**, reagindo ao choque: "para ver a fila de personagens reagir a esse choque coletivo". Isso mudou em relação ao roteiro, que só usava a fila na prática.

**Tela 7 (prática).** A especificação que o áudio deu, passo a passo:
1. a fila dos monges está montada esperando;
2. o ouvinte escolhe, **ligação por ligação**, o material que liga as mãos de um monge ao seguinte (botões: fio de metal / corda de seda) — "você precisa preencher as conexões da fila inteira";
3. depois **carrega a garrafa na máquina** e **aciona a descarga**;
4. onde houver seda, o choque para ali e só os monges antes dela pulam;
5. errou: clica de novo no material pra trocar, e carrega/descarrega outra vez;
6. sucesso = a fila inteira pula junta, e aí o áudio volta.

## Descompassos entre o áudio e o roteiro (decidir ao montar)

1. **Abertura em cold open.** O roteiro mandava retomar Babbage primeiro; o áudio abre direto na cena dos monges e só depois retoma. A capa (tela 1) fica no ar durante essa cena, então ela pede uma imagem do círculo de monges, não só o título.
2. **A fila antecipou.** Ela aparece na tela 5 e de novo na 7. Ou a tela 5 tem uma fila simples (só mostra o pulo) e a 7 tem a fila editável, ou é o mesmo componente em dois modos.
3. **Transição da tela 6 pra 7 promete errado.** O áudio fecha a tela 6 com "para ver como eles lidaram com as regras de segurança e os materiais agora, aperte o próximo", mas a tela 7 é a prática, que é sobre material (condutor/isolante) e não sobre segurança. A tela 7 pode absorver isso com um título que fale de material.
4. **A tela 8 ficou longa** (4:26, quase o dobro da média). Como o áudio só pede "próximo" 7 vezes, não dá pra quebrar em duas: a tela 8 precisa aguentar 4 minutos e meio no ar, então vale ter conteúdo que evolua sozinho (o recap das 4 peças aparecendo em sequência).

## Erros do áudio (conferidos ouvindo o trecho, não só pela transcrição)

| Onde | O áudio diz | O certo é | Gravidade |
|---|---|---|---|
| 20:28 | "George Richmond" | **Georg Richmann** | Erro real. O roteiro estava certo; o NotebookLM anglicizou o nome |
| 06:36 | "De Magnet" | **De Magnete** | Pequeno, quase imperceptível na fala |

Nada mais divergiu: datas, nomes de Gilbert, Gray, Kleist, Musschenbroek, Nollet, Dalibard e Franklin, e a física da garrafa (dois condutores separados por um isolante) estão corretos. Erros como "Bebed" (Babbage) e "filme etálico" (fio metálico) na `_transcricao.txt` são falha do transcritor automático, não do áudio.

**Decisão pendente:** regravar por causa do "George Richmond" ou deixar passar. Regravar custa uma rodada nova no NotebookLM e muda o áudio inteiro (inclusive o título que ele deu).

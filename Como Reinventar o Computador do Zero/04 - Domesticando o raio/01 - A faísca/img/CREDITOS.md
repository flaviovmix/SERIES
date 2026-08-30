# Créditos das imagens — A faísca

Regra: **domínio público e CC0 não precisam de crédito** (mas não custa citar a fonte); **CC BY e CC BY-SA precisam do crédito na legendinha**, junto com o nome da licença.

| Arquivo | O que é | Fonte | Licença | Crédito obrigatório? |
|---|---|---|---|---|
| `ambar.jpg` | âmbar báltico com insetos dentro | Wikimedia Commons, *Insects in baltic amber* | CC BY-SA 3.0 | **Sim** — "foto: Brocken Inaglory, CC BY-SA 3.0" |
| `gilbert.jpg` | retrato de William Gilbert | Commons, *William Gilbert (physicist)* | Domínio público | Não |
| `versorio.png` | diagrama do versório, a agulha detectora | Commons, *Gilberts versorium needle electroscope* (Silvanus P. Thompson) | Domínio público | Não |
| `menino-eletrico.jpg` | o menino suspenso em cordas de seda, gravura de época | Commons / Wellcome, *Nollet, The Electric Boy* | Domínio público | Não |
| `maquina-de-atrito.jpg` | a máquina eletrostática de atrito | Commons, *Hawksbee's Electrical Machine by Jean-Antoine Nollet* | Domínio público | Não |
| `garrafa-leiden.jpg` | garrafa de Leiden real, do Musée d'histoire des sciences | Commons, *Leyden jar MHS 1188* | CC BY-SA 3.0 fr | **Sim** — "foto: Rama, CC BY-SA 3.0 fr" |
| `musschenbroek.jpg` | retrato de Pieter van Musschenbroek | Commons / Rijksmuseum | CC0 | Não |
| `franklin-pipa.jpg` | Franklin e a pipa na tempestade | Commons, litografia Currier & Ives | Domínio público | Não |
| `richmann-morte.jpg` | a morte de Richmann em 1753, gravura | Commons, *Richmanns Tod 1753* | Domínio público | Não |
| `monges-01.png` | a fila de monges do Nollet, plano fechado | **Gerada** no Google Flow (Nano Banana 2), 16:9 | — | Não, mas não apresentar como gravura de época |
| `monges-02.png` | a fila de monges, círculo inteiro e o pulo | **Gerada** no Google Flow (Nano Banana 2), 16:9 | — | idem |
| `tales-ambar.png` | Tales esfregando o âmbar, 600 a.C., com a palha voando | **Gerada** no Google Flow, 16:9 | — | idem |
| `choque-leiden.png` | Musschenbroek jogado pra trás pelo choque, 1746 | **Gerada** no Google Flow, 16:9 | — | idem |
| `marly-dalibard.png` | a barra de ferro de Marly tirando faísca da tempestade, maio de 1752 | **Gerada** no Google Flow, 16:9 | — | idem |

Baixadas com `_arquivos\scripts\baixa-wikimedia.sh` (busca com `busca-wikimedia.sh`). O Commons rate-limita a API: baixar em lote pede pausa entre os itens.

⚠️ Cinco imagens são **geradas**, não históricas: as duas dos monges, o Tales, o choque de Leiden e a barra de Marly. Todas cobrem cenas que o áudio conta e que **não têm gravura de época no Commons**. Todas levam o selo `ilustração` (âmbar) na legenda do card, e o `data-cred` diz "não é gravura de época"; as de acervo levam o selo `imagem real` (verde). Todo card tem um dos dois — nenhum fica sem. A regra da série continua: material real primeiro, gerado só onde falta.

Versões reduzidas (~1100px, jpg) ficam em `web\` — é delas que o `animacao.html` sai, e o build está em `_arquivos\scripts` + `build-faisca.sh`. Os originais em png ficam nesta pasta.

# 9.04 2017: Attention is All You Need: pesquisa conferida em 07/09/2026

Fichas e datas conferidas por busca (agente de pesquisa, Wikipedia + Wikidata P569) antes
de escrever o trio. Serve pra conferência da transcrição. Não vai pro site.

## Fichas (idade na cena do roteiro)

| Pessoa | Nascimento | Cena | Idade | Situação em 2026 |
|---|---|---|---|---|
| Sepp Hochreiter | 14/02/1967 | 1997, LSTM | 30 | vivo |
| Jürgen Schmidhuber | 17/01/1963 | 1997 | 34 | vivo |
| Ilya Sutskever | 08/12/1986 (Wikidata) | set/2014, seq2seq | 27 | vivo |
| Oriol Vinyals | 1983 (só o ano) | set/2014 | 31 | vivo |
| Quoc Le | 1982 (só o ano) | set/2014 | 32 | vivo |
| Kyunghyun Cho | 1985 (só o ano) | set/2014, atenção | 29 | vivo |
| Yoshua Bengio | 05/03/1964 | set/2014 | 50 | vivo |
| Alec Radford | abril de 1993 | 11/06/2018, GPT | 25 | vivo |

Sem ficha (ano não público ou divergente entre fontes): os oito autores do Transformer,
nomeados em conjunto na tela 6 sem ficha (Vaswani 1986 vs 1985; Shazeer 1976 vs "1975 ou
1976"; Parmar, Uszkoreit e Polosukhin sem ano; Jones 1984 e Kaiser 1981 só ano; Gomez
"1996 ou 1997"). Sem nome: Dzmitry Bahdanau (atenção), Norman Jouppi (TPU), Jacob Devlin
(BERT). Todos sem notícia de morte.

## Datas e números do roteiro

- LSTM: Hochreiter & Schmidhuber, Neural Computation, 1997 (tese de mestrado de 1991).
- seq2seq: Sutskever, Vinyals & Le, arXiv 10/09/2014, NIPS 2014; vetor de tamanho fixo.
- Atenção: Bahdanau, Cho & Bengio, arXiv 01/09/2014, ICLR maio de 2015 (o arXiv da
  atenção saiu 9 dias ANTES do do seq2seq; a ordem do roteiro segue as conferências).
- GNMT em produção 27/09/2016 (chinês→inglês); 15/11/2016 oito línguas (PT entre elas);
  8+8 camadas LSTM + atenção; ~6 dias em 96 GPUs K80 (EN→FR); inferência em TPU.
- TPU v1: uso interno desde 2015; anunciada no Google I/O em 18/05/2016; array sistólico
  256×256 de multiplicadores de 8 bits; tech lead Norm Jouppi (ex-DEC).
- Transformer: arXiv 12/06/2017; NIPS 2017; Google Brain/Research (+ U. Toronto, Gomez);
  base 65 M parâmetros (Wikipedia diz 100 M, errado), big 213 M; uma máquina com 8 P100:
  base 12 h, big 3,5 dias; BLEU 28,4 EN-DE, 41,8 EN-FR; seno/cosseno posicional; 8 cabeças.
- GPT-1: 11/06/2018, Radford, Narasimhan, Salimans, Sutskever; decoder 12 camadas, 117 M,
  BookCorpus (~7 mil livros). BERT: arXiv 11/10/2018, Devlin et al.; encoder-only; base
  110 M, large 340 M. GPT-2: 14/02/2019, 1,5 B. GPT-3: 28/05/2020, 175 B.
- Saída dos oito do Google: Llion Jones foi o último (ago/2023 → Sakana AI); Shazeer
  voltou em ago/2024 e saiu de novo em 2026; frase segura: "até 2023 todos tinham saído".

## Gravações

**v1 (07/09, 10:46, "A revolução do Transformer e da Atenção", em `_v1/`)**: descartada.
Estrutura quase certa (11 pedidos, um "aperte próximo" sem o "o"), mas: 11 minutos
(cortou metade do conteúdo); fichas com "naquela cena"/"na cena" e sem "em 2026",
Schmidhuber pela metade; "William Sutskever"; os oito autores ditos duas vezes cada (leu a
pronúncia entre parênteses como repetição); "genial" ×2 e "genialidade"; "a pergunta de um
milhão de dólares"; Boole como "bully"; abriu com o título traduzido e o aviso das telas
antes da retomada; pulou o balanço da tela 12, inventou pergunta final e fechou com "até o
próximo mergulho". Reforço escrito no par antes da v2.

**v2 (07/09, 16:50, "Como o Transformer matou a fila")**: quase certa. 11 pedidos (dois
sem o "o"), 12 telas, 8 fichas no formato com "vivo em 2026", os oito ditos uma vez cada
com "todos vivos, estagiário de 20 anos, saíram até 2023", todas as telas na ordem,
balanço nome por nome, balanço da etapa e a última frase da série sem promessa. Um erro de
fato: "o autor principal do BERT não tem nome público" (12:04; falso: só o ano de
nascimento não é público). Boole saiu "bully" de novo. Vai pra v3 depois da v3 do 9.02;
a v2 é a reserva.

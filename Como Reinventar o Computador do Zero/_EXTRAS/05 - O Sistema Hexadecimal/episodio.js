/* episodio: O Sistema Hexadecimal (extra 05)
   O que e so deste extra alem do hexa.js: os marcadores do audio.
   Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
   instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
   A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py a partir
   do _telas.md do audio "Por que o hexadecimal usa letras" (31/08, 10 telas,
   9 pedidos; o pedido da virada 5->6 saiu "aperte proximo" sem o "o" e a linha
   dele na tabela foi conferida na transcricao): nao editar a mao. Depende de
   tocador.js e carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 122, tela: 2 },
    { segundo: 209, tela: 3 },
    { segundo: 273, tela: 4 },
    { segundo: 326, tela: 5 },
    { segundo: 379, tela: 6 },
    { segundo: 431, tela: 7 },
    { segundo: 481, tela: 8 },
    { segundo: 530, tela: 9 },
    { segundo: 561, tela: 10 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

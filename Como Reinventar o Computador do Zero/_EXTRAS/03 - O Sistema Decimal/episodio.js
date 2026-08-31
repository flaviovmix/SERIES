/* episodio: O Sistema Decimal (extra 03)
   O que e so deste extra alem do decimal.js: os marcadores do audio.
   Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
   instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
   A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py a partir
   do _telas.md do audio "Por que contamos de dez em dez" (31/08, 10 telas,
   9 pedidos): nao editar a mao. Depende de tocador.js e carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 152, tela: 2 },
    { segundo: 246, tela: 3 },
    { segundo: 337, tela: 4 },
    { segundo: 397, tela: 5 },
    { segundo: 454, tela: 6 },
    { segundo: 528, tela: 7 },
    { segundo: 590, tela: 8 },
    { segundo: 636, tela: 9 },
    { segundo: 681, tela: 10 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

/* episodio: O Hertz (extra 07)
   O que e so deste extra alem do hertz.js: os marcadores do audio.
   Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
   instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
   A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py a partir
   do _telas.md do audio "O que o Hertz realmente mede" (31/08, 10 telas,
   9 pedidos): nao editar a mao. Depende de tocador.js e carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 168, tela: 2 },
    { segundo: 287, tela: 3 },
    { segundo: 357, tela: 4 },
    { segundo: 427, tela: 5 },
    { segundo: 526, tela: 6 },
    { segundo: 597, tela: 7 },
    { segundo: 675, tela: 8 },
    { segundo: 734, tela: 9 },
    { segundo: 781, tela: 10 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

/* extra 10: A Lei de Moore nao e fisica
   O que e so deste extra: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 140, tela: 2 },
    { segundo: 263, tela: 3 },
    { segundo: 375, tela: 4 },
    { segundo: 472, tela: 5 },
    { segundo: 592, tela: 6 },
    { segundo: 701, tela: 7 },
    { segundo: 817, tela: 8 },
    { segundo: 926, tela: 9 },
    { segundo: 1016, tela: 10 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

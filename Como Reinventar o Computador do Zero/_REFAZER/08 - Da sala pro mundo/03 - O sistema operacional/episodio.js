/* episodio: O sistema operacional
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 161, tela: 2 },
    { segundo: 312, tela: 3 },
    { segundo: 399, tela: 4 },
    { segundo: 464, tela: 5 },
    { segundo: 533, tela: 6 },
    { segundo: 592, tela: 7 },
    { segundo: 662, tela: 8 },
    { segundo: 739, tela: 9 },
    { segundo: 807, tela: 10 },
    { segundo: 873, tela: 11 },
    { segundo: 922, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

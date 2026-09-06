/* episodio: O chip que encolheu o computador
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 102, tela: 2 },
    { segundo: 202, tela: 3 },
    { segundo: 308, tela: 4 },
    { segundo: 380, tela: 5 },
    { segundo: 448, tela: 6 },
    { segundo: 532, tela: 7 },
    { segundo: 602, tela: 8 },
    { segundo: 675, tela: 9 },
    { segundo: 751, tela: 10 },
    { segundo: 819, tela: 11 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

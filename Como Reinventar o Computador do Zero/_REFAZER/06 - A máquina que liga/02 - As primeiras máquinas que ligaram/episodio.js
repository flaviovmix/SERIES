/* episodio: As primeiras maquinas que ligaram
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 115, tela: 2 },
    { segundo: 186, tela: 3 },
    { segundo: 262, tela: 4 },
    { segundo: 383, tela: 5 },
    { segundo: 452, tela: 6 },
    { segundo: 538, tela: 7 },
    { segundo: 598, tela: 8 },
    { segundo: 657, tela: 9 },
    { segundo: 698, tela: 10 },
    { segundo: 751, tela: 11 },
    { segundo: 803, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

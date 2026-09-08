/* episodio: Como os computadores deixaram de ser ilhas
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 149, tela: 2 },
    { segundo: 251, tela: 3 },
    { segundo: 405, tela: 4 },
    { segundo: 493, tela: 5 },
    { segundo: 567, tela: 6 },
    { segundo: 672, tela: 7 },
    { segundo: 734, tela: 8 },
    { segundo: 809, tela: 9 },
    { segundo: 905, tela: 10 },
    { segundo: 981, tela: 11 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

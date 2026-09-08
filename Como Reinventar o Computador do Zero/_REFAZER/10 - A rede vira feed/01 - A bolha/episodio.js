/* episodio: A bolha
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 141, tela: 2 },
    { segundo: 261, tela: 3 },
    { segundo: 360, tela: 4 },
    { segundo: 432, tela: 5 },
    { segundo: 503, tela: 6 },
    { segundo: 580, tela: 7 },
    { segundo: 641, tela: 8 },
    { segundo: 694, tela: 9 },
    { segundo: 764, tela: 10 },
    { segundo: 846, tela: 11 },
    { segundo: 888, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

/* episodio: O fim da tirania dos numeros
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 137, tela: 2 },
    { segundo: 275, tela: 3 },
    { segundo: 382, tela: 4 },
    { segundo: 454, tela: 5 },
    { segundo: 522, tela: 6 },
    { segundo: 584, tela: 7 },
    { segundo: 667, tela: 8 },
    { segundo: 742, tela: 9 },
    { segundo: 837, tela: 10 },
    { segundo: 910, tela: 11 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

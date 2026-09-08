/* episodio: A máquina que aprende
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 100, tela: 2 },
    { segundo: 203, tela: 3 },
    { segundo: 276, tela: 4 },
    { segundo: 370, tela: 5 },
    { segundo: 442, tela: 6 },
    { segundo: 513, tela: 7 },
    { segundo: 579, tela: 8 },
    { segundo: 655, tela: 9 },
    { segundo: 726, tela: 10 },
    { segundo: 792, tela: 11 },
    { segundo: 850, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

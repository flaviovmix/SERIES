/* episodio: Como o transistor encolheu o computador
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 110, tela: 2 },
    { segundo: 204, tela: 3 },
    { segundo: 279, tela: 4 },
    { segundo: 348, tela: 5 },
    { segundo: 414, tela: 6 },
    { segundo: 494, tela: 7 },
    { segundo: 547, tela: 8 },
    { segundo: 608, tela: 9 },
    { segundo: 665, tela: 10 },
    { segundo: 715, tela: 11 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

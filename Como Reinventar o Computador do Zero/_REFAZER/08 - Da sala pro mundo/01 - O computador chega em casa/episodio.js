/* episodio: O computador chega em casa
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 169, tela: 2 },
    { segundo: 441, tela: 3 },
    { segundo: 543, tela: 4 },
    { segundo: 684, tela: 5 },
    { segundo: 782, tela: 6 },
    { segundo: 873, tela: 7 },
    { segundo: 968, tela: 8 },
    { segundo: 1059, tela: 9 },
    { segundo: 1184, tela: 10 },
    { segundo: 1284, tela: 11 },
    { segundo: 1369, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

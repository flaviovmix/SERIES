/* extra 09: Como Kilby e Noyce inventaram o chip
   O que e so deste extra: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 95, tela: 2 },
    { segundo: 214, tela: 3 },
    { segundo: 328, tela: 4 },
    { segundo: 415, tela: 5 },
    { segundo: 507, tela: 6 },
    { segundo: 601, tela: 7 },
    { segundo: 677, tela: 8 },
    { segundo: 766, tela: 9 },
    { segundo: 870, tela: 10 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

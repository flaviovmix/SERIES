/* episodio: As redes sociais
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 99, tela: 2 },
    { segundo: 187, tela: 3 },
    { segundo: 310, tela: 4 },
    { segundo: 418, tela: 5 },
    { segundo: 493, tela: 6 },
    { segundo: 607, tela: 7 },
    { segundo: 724, tela: 8 },
    { segundo: 880, tela: 9 },
    { segundo: 1014, tela: 10 },
    { segundo: 1120, tela: 11 },
    { segundo: 1217, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

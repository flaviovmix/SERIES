/* episodio: A placa de vídeo
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 113, tela: 2 },
    { segundo: 196, tela: 3 },
    { segundo: 266, tela: 4 },
    { segundo: 328, tela: 5 },
    { segundo: 384, tela: 6 },
    { segundo: 446, tela: 7 },
    { segundo: 498, tela: 8 },
    { segundo: 547, tela: 9 },
    { segundo: 597, tela: 10 },
    { segundo: 635, tela: 11 },
    { segundo: 673, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

/* episodio: 2017 - Attention is All You Need
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 122, tela: 2 },
    { segundo: 201, tela: 3 },
    { segundo: 270, tela: 4 },
    { segundo: 352, tela: 5 },
    { segundo: 437, tela: 6 },
    { segundo: 543, tela: 7 },
    { segundo: 617, tela: 8 },
    { segundo: 688, tela: 9 },
    { segundo: 772, tela: 10 },
    { segundo: 842, tela: 11 },
    { segundo: 937, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

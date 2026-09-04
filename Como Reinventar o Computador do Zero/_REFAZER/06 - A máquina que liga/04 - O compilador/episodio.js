/* episodio: A máquina que aprendeu a traduzir código
   O que e so deste episodio: os marcadores do audio. Depende de telas.js e
   tocador.js, e por isso carrega por ultimo. */

(function () {
  // ---------- a tela segue o audio ----------
  // Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
  // instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
  // A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py: nao
  // editar a mao.
  const MARCADORES = [
    { segundo: 83, tela: 2 },
    { segundo: 153, tela: 3 },
    { segundo: 228, tela: 4 },
    { segundo: 298, tela: 5 },
    { segundo: 356, tela: 6 },
    { segundo: 423, tela: 7 },
    { segundo: 483, tela: 8 },
    { segundo: 556, tela: 9 },
    { segundo: 617, tela: 10 },
    { segundo: 694, tela: 11 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

/* episodio: O algoritmo de recomendacao
   ⚠️ DEZ telas, nao doze: o audio entregou dez blocos e a pagina serve ao audio.
   Depende de telas.js e tocador.js, e por isso carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 206, tela: 2 },
    { segundo: 308, tela: 3 },
    { segundo: 380, tela: 4 },
    { segundo: 530, tela: 5 },
    { segundo: 620, tela: 6 },
    { segundo: 703, tela: 7 },
    { segundo: 799, tela: 8 },
    { segundo: 891, tela: 9 },
    { segundo: 1023, tela: 10 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

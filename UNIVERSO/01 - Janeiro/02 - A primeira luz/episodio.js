/* episodio: A primeira luz (1.02)
   Os marcadores do audio: o segundo em que o apresentador diz "Proxima pagina" e a
   tela (contando de 1) que esse marcador abre. Lidos do _telas.md pelo
   marcadores-do-mapa.py, nunca digitados. Depende de telas.js e tocador.js, e por
   isso carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 67, tela: 2 },
    { segundo: 160, tela: 3 },
    { segundo: 291, tela: 4 },
    { segundo: 390, tela: 5 },
    { segundo: 473, tela: 6 },
    { segundo: 563, tela: 7 },
    { segundo: 643, tela: 8 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

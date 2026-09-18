/* episodio: O primeiro instante e o que ninguem sabe (1.01)
   Os marcadores do audio: o segundo em que o apresentador diz "Proxima pagina" e a
   tela (contando de 1) que esse marcador abre. Lidos do _telas.md pelo
   marcadores-do-mapa.py, nunca digitados. Depende de telas.js e tocador.js, e por
   isso carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 94, tela: 2 },
    { segundo: 304, tela: 3 },
    { segundo: 415, tela: 4 },
    { segundo: 476, tela: 5 },
    { segundo: 594, tela: 6 },
    { segundo: 669, tela: 7 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

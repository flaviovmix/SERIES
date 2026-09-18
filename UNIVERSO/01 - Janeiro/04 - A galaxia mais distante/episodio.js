/* episodio: A galaxia mais distante (1.04)
   Os marcadores do audio: o segundo em que o apresentador diz "Proxima pagina" e a
   tela (contando de 1) que esse marcador abre. Lidos do _telas.md pelo
   marcadores-do-mapa.py, nunca digitados. Depende de telas.js e tocador.js, e por
   isso carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 97, tela: 2 },
    { segundo: 194, tela: 3 },
    { segundo: 287, tela: 4 },
    { segundo: 369, tela: 5 },
    { segundo: 472, tela: 6 },
    { segundo: 547, tela: 7 },
    { segundo: 619, tela: 8 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

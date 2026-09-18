/* episodio: A Via Lactea comeca (1.05)
   Os marcadores do audio: o segundo em que o apresentador diz "Proxima pagina" e a
   tela (contando de 1) que esse marcador abre. Lidos do _telas.md pelo
   marcadores-do-mapa.py, nunca digitados. Depende de telas.js e tocador.js, e por
   isso carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 63, tela: 2 },
    { segundo: 161, tela: 3 },
    { segundo: 258, tela: 4 },
    { segundo: 344, tela: 5 },
    { segundo: 408, tela: 6 },
    { segundo: 476, tela: 7 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

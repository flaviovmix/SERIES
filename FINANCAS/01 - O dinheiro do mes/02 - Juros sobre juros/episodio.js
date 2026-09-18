/* episodio: Juros sobre juros (1.02)
   Os marcadores do audio: o segundo em que o apresentador diz "Proxima pagina"
   e a tela (contando de 1) que esse marcador abre. Lidos do _telas.md pelo
   marcadores-do-mapa.py, nunca digitados. Depende de telas.js e tocador.js, e por
   isso carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 82, tela: 2 },
    { segundo: 150, tela: 3 },
    { segundo: 288, tela: 4 },
    { segundo: 387, tela: 5 },
    { segundo: 489, tela: 6 },
    { segundo: 611, tela: 7 },
    { segundo: 720, tela: 8 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

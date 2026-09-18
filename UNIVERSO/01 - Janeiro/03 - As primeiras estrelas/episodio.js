/* episodio: As primeiras estrelas (1.03)
   Os marcadores do audio: o segundo em que o apresentador diz "Proxima pagina" e a
   tela (contando de 1) que esse marcador abre. Lidos do _telas.md pelo
   marcadores-do-mapa.py, nunca digitados. Depende de telas.js e tocador.js, e por
   isso carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 79, tela: 2 },
    { segundo: 177, tela: 3 },
    { segundo: 240, tela: 4 },
    { segundo: 299, tela: 5 },
    { segundo: 346, tela: 6 },
    { segundo: 442, tela: 7 },
    { segundo: 502, tela: 8 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

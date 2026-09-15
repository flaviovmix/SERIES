/* episodio: A escala (11.01)
   Os marcadores do audio: o segundo em que o apresentador pede "aperte o Proximo"
   e a tela (contando de 1) que esse pedido abre. Lidos do _telas.md pelo
   marcadores-do-mapa.py, nunca digitados. Depende de telas.js e tocador.js, e por
   isso carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 98, tela: 2 },
    { segundo: 163, tela: 3 },
    { segundo: 203, tela: 4 },
    { segundo: 280, tela: 5 },
    { segundo: 325, tela: 6 },
    { segundo: 362, tela: 7 },
    { segundo: 438, tela: 8 },
    { segundo: 510, tela: 9 },
    { segundo: 538, tela: 10 },
    { segundo: 591, tela: 11 },
    { segundo: 644, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

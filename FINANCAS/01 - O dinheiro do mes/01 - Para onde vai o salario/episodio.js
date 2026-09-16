/* episodio: Para onde vai o salario (1.01)
   Os marcadores do audio: o segundo em que o apresentador pede "aperte o Proximo"
   e a tela (contando de 1) que esse pedido abre. Lidos do _telas.md pelo
   marcadores-do-mapa.py, nunca digitados. Depende de telas.js e tocador.js, e por
   isso carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 71, tela: 2 },
    { segundo: 153, tela: 3 },
    { segundo: 234, tela: 4 },
    { segundo: 296, tela: 5 },
    { segundo: 349, tela: 6 },
    { segundo: 422, tela: 7 },
    { segundo: 497, tela: 8 },
    { segundo: 551, tela: 9 },
    { segundo: 655, tela: 10 },
    { segundo: 734, tela: 11 },
    { segundo: 825, tela: 12 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

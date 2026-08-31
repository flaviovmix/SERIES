/* episodio: O Sistema Binario (extra 04)
   O que e so deste extra alem do binario.js: os marcadores do audio.
   Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
   instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
   A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py a partir
   do _telas.md do audio "Como contar qualquer numero apenas com lampadas"
   (31/08, 10 telas, 9 pedidos): nao editar a mao. Depende de tocador.js e
   carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 146, tela: 2 },
    { segundo: 298, tela: 3 },
    { segundo: 452, tela: 4 },
    { segundo: 618, tela: 5 },
    { segundo: 772, tela: 6 },
    { segundo: 959, tela: 7 },
    { segundo: 1107, tela: 8 },
    { segundo: 1296, tela: 9 },
    { segundo: 1413, tela: 10 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

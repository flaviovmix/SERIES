/* episodio: O Sistema de 60 (extra 06)
   O que e so deste extra alem do sessenta.js: os marcadores do audio.
   Os marcadores vieram da transcricao (_telas.md, coluna "entra em"): cada um e o
   instante em que o apresentador pede "aperte o Proximo", e a tela que ele abre.
   A lista abaixo e escrita por _arquivos\scripts\marcadores-do-mapa.py a partir
   do _telas.md do audio "Por que a hora tem sessenta minutos" (31/08, 10 telas,
   9 pedidos): nao editar a mao. Depende de tocador.js e carrega por ultimo. */

(function () {
  const MARCADORES = [
    { segundo: 160, tela: 2 },
    { segundo: 330, tela: 3 },
    { segundo: 443, tela: 4 },
    { segundo: 569, tela: 5 },
    { segundo: 720, tela: 6 },
    { segundo: 827, tela: 7 },
    { segundo: 954, tela: 8 },
    { segundo: 1070, tela: 9 },
    { segundo: 1174, tela: 10 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

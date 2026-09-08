/* episódio 2.1 · A primeira tela
   O que é só deste episódio: os marcadores do áudio. As telas não têm peça que responda à mão além do próprio modelo embutido (que é HTML e CSS vivos dentro dos iframes). Depende de telas.js e tocador.js, e por isso carrega por último. */

(function () {
  // ---------- a tela segue o áudio ----------
  // Cada marcador é o instante em que o apresentador pede "aperte o Proximo" e a
  // tela (contando de 1) que esse pedido abre. A lista sai do _telas.md, que saiu do
  // áudio, escrita por _arquivos\scripts\marcadores-do-mapa.py: não editar a mão.
  const MARCADORES = [
    { segundo: 229, tela: 2 },
    { segundo: 466, tela: 3 },
    { segundo: 617, tela: 4 },
    { segundo: 878, tela: 5 },
    { segundo: 1028, tela: 6 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });
})();

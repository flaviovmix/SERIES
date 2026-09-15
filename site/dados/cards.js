/* cards
   O texto dos cards do site/ (D4 do plano do SEIRES): periodo, frase, resumo, imagem e
   credito da foto de cada card. Quais cards existem, em que ordem, pra onde levam e se
   estao no ar NAO mora aqui: vem da arvore MENU do js/menu.js. Quem junta os dois e
   escreve a grade na pagina e o gerador:

     node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js"

   Nenhuma pagina carrega este arquivo. Editou aqui, roda o gerador; editou a grade na
   pagina, perde na proxima geracao (e o --confere acusa antes do deploy).

   Cada entrada e UMA grade, com o nome do marcador que ela tem na pagina:
     pagina   onde a grade mora, relativa ao site/
     tipo     etapas | extras-da-serie | series | episodios | extras | destaque-do-extra
     serie, etapa, extra   de que galho da MENU saem os cards
     grade    as classes da <div> da grade
     cards    { 'num da MENU': { ...texto } }, ou card (um so), nos tipos de um card

   O texto e HTML de proposito (pode ter <em> e entidade). Caminhos (imagem, audio) sao
   relativos ao site/, escritos legiveis, com espaco e acento: o gerador codifica.
   Credito da foto (decisao 3): 'ilustração', ou 'foto: Autor, Licença' no formato das
   animacoes, com a descricao da foto em `descricao`. Foto real sem credito conhecido fica
   sem `credito`, e o card fica sem lupa ate ter (P10). A origem de cada credito esta em
   plano/levantamento-legendas.md. */

module.exports = {

  /* ---------- Hardware (serie 03) ---------- */

  'hardware/etapas': {
    pagina: 'hardware.html',
    tipo: 'etapas',
    serie: '03',
    grade: 'grade',
    cards: {
      '01': {
        imagem: 'img/hardware-etapa-01.webp',
        credito: 'ilustração',
        periodo: `liga a bomba sozinha`,
        frase: `Um chip que lê, decide e age.`,
        resumo: `O que é um microcontrolador e o laço que não para. O LED que diz "estou vivo", a boia que funciona como botão, a bomba que é um relé, o trimpot que mede a água e a decisão que liga tudo sozinha.`,
        /* a etapa ainda nao tem episodio na MENU, so a pagina com o audio dela */
        contagem: `a etapa inteira em áudio &middot; 13 min`,
        botao: `Ouvir a etapa`,
      },
      '02': {
        imagem: 'img/hardware-etapa-02.webp',
        credito: 'ilustração',
        periodo: `sensor de verdade e proteção`,
        frase: `Sai o trimpot, entra o eco.`,
        resumo: `O sensor de ultrassom mede a água pelo eco, um visor mostra o nível, o motor de passo abre o registro de pouquinho, e o controlador aprende a fazer duas coisas ao mesmo tempo sem travar.`,
        contagem: `6 episódios`,
      },
      '03': {
        imagem: 'img/hardware-etapa-03.webp',
        credito: 'ilustração',
        periodo: `tudo numa tela do computador`,
        frase: `O zelador não quer subir no telhado.`,
        resumo: `O controlador conversa com o computador por um fio, uma letra de cada vez, e um painel montado com blocos mostra o nível, acende a luz da bomba e manda comando de volta.`,
        contagem: `3 episódios`,
      },
      '04': {
        imagem: 'img/hardware-etapa-04.webp',
        credito: 'ilustração',
        periodo: `o celular abre a página`,
        frase: `Troca o cérebro, ganha a rede.`,
        resumo: `O ESP32 faz o mesmo que o Arduino e ainda fala WiFi: a caixa d'água vira uma página na rede, com endereço fixo, dois núcleos dividindo o trabalho e um relatório que qualquer programa entende.`,
        contagem: `6 episódios`,
      },
      '05': {
        imagem: 'img/hardware-etapa-05.webp',
        credito: 'ilustração',
        periodo: `do simulador pra fábrica`,
        frase: `Do desenho à placa verde.`,
        resumo: `O circuito sai do simulador e vira desenho de placa: quem liga em quem, onde fica cada peça, por onde passa cada trilha e o arquivo que a fábrica usa pra produzir.`,
        contagem: `4 episódios`,
      },
    },
  },

};

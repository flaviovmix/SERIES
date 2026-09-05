/* episódio 1.1 · A bomba-relógio
   O que é só deste episódio: os marcadores do áudio, os quatro pavios da tela 4 e a régua de três perguntas da tela 6. Depende de telas.js e tocador.js, e por isso carrega por último. */

(function () {
  // ---------- a tela segue o áudio ----------
  // Cada marcador é o instante em que o apresentador pede "aperte o Proximo" e a
  // tela (contando de 1) que esse pedido abre. A lista sai do _telas.md, que saiu do
  // áudio, escrita por _arquivos\scripts\marcadores-do-mapa.py: não editar a mão.
  const MARCADORES = [
    { segundo: 155, tela: 2 },
    { segundo: 235, tela: 3 },
    { segundo: 334, tela: 4 },
    { segundo: 462, tela: 5 },
    { segundo: 578, tela: 6 },
    { segundo: 685, tela: 7 },
    { segundo: 780, tela: 8 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });

  // ---------- tela 4: os quatro pavios ----------
  // Cada pavio é uma forma de a bomba estourar. O texto só aparece quando o ouvinte
  // acende, porque a tela existe pra ele acompanhar o áudio um caso de cada vez.
  // A foto entra em cinza e ganha cor quando o pavio acende: acender é o gesto da
  // tela, e a cor é o retorno dele.
  const PAVIOS = [
    {
      nome: 'pavio 1',
      titulo: 'O comportamento muda',
      texto: 'A regra de negócio virou outra e ninguém sabe onde ela mora no código. A manutenção vira tentativa e erro, e cada tentativa pode quebrar uma coisa que estava certa.',
      foto: 'img/pavio-1.webp',
      alt: 'Um painel de parede com dezenas de interruptores iguais e sem etiqueta, e uma mão parada na frente sem saber qual acionar',
    },
    {
      nome: 'pavio 2',
      titulo: 'O dado cresce',
      texto: 'Rápido com trinta registros, lento com trinta mil, travado com trezentos mil. Não deu erro: só ficou devagar. E devagar demais é quebrado, pra quem está usando.',
      foto: 'img/pavio-2.webp',
      alt: 'Uma pilha pequena e arrumada de papel ao lado de uma torre enorme do mesmo papel, tortas e prestes a escorregar',
    },
    {
      nome: 'pavio 3',
      titulo: 'Alguém acha a brecha',
      texto: 'O único com outra pessoa do lado de lá, procurando falha de propósito. Um campo que aceita o que não devia, uma senha guardada errado. Quem achar não vai avisar.',
      foto: 'img/pavio-3.webp',
      alt: 'Uma porta pesada e fechada vista de dentro de um cômodo escuro, com uma fresta de correspondência aberta deixando entrar uma lâmina de luz',
    },
    {
      nome: 'pavio 4',
      titulo: 'A área proibida',
      texto: 'O mais comum de todos. Ninguém sabe mexer naquela linha, então o time contorna em vez de arrumar. Cada contorno é mais código em volta do que já ninguém entende.',
      foto: 'img/pavio-4.webp',
      alt: 'Um pedaço de parede de escritório isolado com plástico e fita, e as mesas empurradas em volta fazendo um desvio pelo meio da sala',
    },
  ];

  const caixaPavios = document.getElementById('pavios');
  const totalPavios = document.getElementById('totalPavios');
  const metaPavios = document.getElementById('metaPavios');
  const legPavios = document.getElementById('legPavios');
  const ABERTURA_PAVIOS = legPavios.innerHTML;

  function contaPavios() {
    const acesos = caixaPavios.querySelectorAll('.pavio.aceso').length;
    totalPavios.textContent = acesos;
    metaPavios.textContent = 'acesos: ' + acesos + ' de ' + PAVIOS.length;
    if (acesos === PAVIOS.length) {
      metaPavios.className = 'meta win';
      legPavios.innerHTML = '<b>Os quatro acesos. Nenhum deles é erro de digitação: o código roda.</b>';
      legPavios.className = 'legenda ok';
    } else {
      metaPavios.className = 'meta';
      legPavios.innerHTML = ABERTURA_PAVIOS;
      legPavios.className = 'legenda';
    }
  }

  PAVIOS.forEach((p) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'pavio';
    botao.setAttribute('aria-pressed', 'false');
    botao.innerHTML =
      '<img class="pavio__foto" src="' + p.foto + '" alt="' + p.alt + '">' +
      '<div class="pavio__topo"><span class="pavio__fio"></span><span class="pavio__chama">🔥</span></div>' +
      '<div class="pavio__nome">' + p.nome + '</div>' +
      '<div class="pavio__titulo">' + p.titulo + '</div>' +
      '<p class="pavio__texto">' + p.texto + '</p>';
    botao.addEventListener('click', () => {
      const aceso = botao.classList.toggle('aceso');
      botao.setAttribute('aria-pressed', String(aceso));
      contaPavios();
    });
    caixaPavios.appendChild(botao);
  });

  document.getElementById('apagarPavios').addEventListener('click', () => {
    caixaPavios.querySelectorAll('.pavio').forEach((b) => {
      b.classList.remove('aceso');
      b.setAttribute('aria-pressed', 'false');
    });
    contaPavios();
  });
  contaPavios();

  // ---------- tela 6: a régua de três perguntas ----------
  // A resposta fica escondida de propósito: o convite do áudio é pausar e responder
  // com as próprias palavras ANTES de abrir. Abrir é conferir, não é ler.
  const PERGUNTAS = [
    {
      texto: 'O que esse pedaço faz?',
      resposta: 'Uma frase, em português, sem ler o código em voz alta. Aqui: pega o texto do campo de busca e procura esse texto no banco.',
    },
    {
      texto: 'O que acontece se o dado vier errado?',
      resposta: 'Campo vazio, texto gigante, número negativo, acento, aspas no meio. Cada um desses tem que ter uma resposta, nem que seja "recusa e avisa".',
    },
    {
      texto: 'Onde isso quebra?',
      resposta: 'Que situação faz esse pedaço parar de funcionar. Muitos registros, banco fora do ar, duas pessoas buscando ao mesmo tempo.',
    },
  ];

  const caixaPerguntas = document.getElementById('perguntas');
  const totalRegua = document.getElementById('totalRegua');
  const metaRegua = document.getElementById('metaRegua');
  const legRegua = document.getElementById('legRegua');
  const ABERTURA_REGUA = legRegua.innerHTML;

  function contaRegua() {
    const abertas = caixaPerguntas.querySelectorAll('.pergunta.aberta').length;
    totalRegua.textContent = abertas;
    metaRegua.textContent = 'respondidas: ' + abertas + ' de ' + PERGUNTAS.length;
    if (abertas === PERGUNTAS.length) {
      metaRegua.className = 'meta win';
      legRegua.innerHTML = '<b>Respondeu as três? Então o código é seu. Falhou em uma, ele ainda não é: pergunte de novo até a resposta existir.</b>';
      legRegua.className = 'legenda ok';
    } else {
      metaRegua.className = 'meta';
      legRegua.innerHTML = ABERTURA_REGUA;
      legRegua.className = 'legenda';
    }
  }

  PERGUNTAS.forEach((p, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'pergunta';
    botao.setAttribute('aria-expanded', 'false');
    botao.innerHTML =
      '<div class="pergunta__num">pergunta ' + (i + 1) + '</div>' +
      '<div class="pergunta__texto">' + p.texto + '</div>' +
      '<div class="pergunta__abre">tocar pra conferir</div>' +
      '<p class="pergunta__resposta">' + p.resposta + '</p>';
    botao.addEventListener('click', () => {
      const aberta = botao.classList.toggle('aberta');
      botao.setAttribute('aria-expanded', String(aberta));
      botao.querySelector('.pergunta__abre').textContent = aberta ? 'conferida' : 'tocar pra conferir';
      contaRegua();
    });
    caixaPerguntas.appendChild(botao);
  });

  document.getElementById('fecharRegua').addEventListener('click', () => {
    caixaPerguntas.querySelectorAll('.pergunta').forEach((b) => {
      b.classList.remove('aberta');
      b.setAttribute('aria-expanded', 'false');
      b.querySelector('.pergunta__abre').textContent = 'tocar pra conferir';
    });
    contaRegua();
  });
  contaRegua();
})();

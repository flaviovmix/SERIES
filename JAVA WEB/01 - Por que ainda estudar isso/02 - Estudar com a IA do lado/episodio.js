/* episódio 1.2 · Estudar com a IA do lado
   O que é só deste episódio: os marcadores do áudio, a chave de modo da tela 4 e as quatro peças do pedido da tela 7. Depende de telas.js e tocador.js, e por isso carrega por último. */

(function () {
  // ---------- a tela segue o áudio ----------
  // Cada marcador é o instante em que o apresentador pede "aperte o Proximo" e a
  // tela (contando de 1) que esse pedido abre. A lista sai do _telas.md, que saiu do
  // áudio, escrita por _arquivos\scripts\marcadores-do-mapa.py: não editar a mão.
  const MARCADORES = [
    { segundo: 125, tela: 2 },
    { segundo: 295, tela: 3 },
    { segundo: 418, tela: 4 },
    { segundo: 494, tela: 5 },
    { segundo: 585, tela: 6 },
    { segundo: 688, tela: 7 },
    { segundo: 768, tela: 8 },
  ];
  Animacao.tocador.monta({ marcadores: MARCADORES, atraso: 2 });

  // ---------- tela 4: o mesmo pedido, dois modos ----------
  // A tela mostra um de cada vez de propósito: o ponto do episódio é que os dois
  // saem da mesma caixa de texto, e ver os dois lado a lado esconde isso.
  const MODOS = [
    {
      nome: 'modo fornecedor',
      rotulo: 'o pedido',
      fala: 'Faz uma tela de login pra mim.',
      volta: 'Volta uma tela de login pronta, que funciona. Você cola e segue. <b>É uma pergunta fechada</b>: a resposta acaba nela mesma, e você não faz ideia de como o sistema lembra de você.',
    },
    {
      nome: 'modo professor',
      rotulo: 'o mesmo pedido, de outro jeito',
      fala: 'Explica como uma tela de login funciona por dentro, o que o sistema precisa guardar pra lembrar de mim, quais são os jeitos comuns de fazer isso e onde cada um costuma dar problema. Depois disso eu escrevo a minha. Não me mostre o código ainda.',
      volta: 'Volta uma explicação, e a tela quem escreve é você. <b>É uma pergunta aberta</b>: a sua próxima dúvida nasce dentro da resposta.',
    },
  ];

  const caixaChave = document.getElementById('chaveModo');
  const caixaPedido = document.getElementById('pedido');
  const modoAtual = document.getElementById('modoAtual');
  const metaModo = document.getElementById('metaModo');
  let escolhido = 0;

  function mostraModo(i) {
    escolhido = i;
    const m = MODOS[i];
    caixaPedido.innerHTML =
      '<div class="pedido__rotulo">' + m.rotulo + '</div>' +
      '<p class="pedido__fala">' + m.fala + '</p>' +
      '<p class="pedido__volta">' + m.volta + '</p>';
    modoAtual.textContent = i + 1;
    metaModo.textContent = m.nome;
    metaModo.className = i === 1 ? 'meta win' : 'meta';
    [...caixaChave.children].forEach((b, j) => b.classList.toggle('cheio', j === i));
  }

  MODOS.forEach((m, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn-mini';
    botao.textContent = m.nome;
    botao.addEventListener('click', () => mostraModo(i));
    caixaChave.appendChild(botao);
  });
  mostraModo(0);

  // ---------- tela 7: as quatro peças do pedido professor ----------
  // Marcar é do ouvinte, não do programa: ele reescreve o pedido dele na tela e
  // usa a lista pra conferir o que já pôs. Por isso não há resposta certa aqui.
  const PECAS = [
    'Declarei o que eu já entendi até agora.',
    'Perguntei como isso costuma ser feito, e por quê.',
    'Pedi os jeitos comuns e onde cada um dá problema.',
    'Avisei que o código quem escreve sou eu, depois.',
  ];

  const caixaPecas = document.getElementById('pecas');
  const totalPecas = document.getElementById('totalPecas');
  const metaPecas = document.getElementById('metaPecas');
  const legPecas = document.getElementById('legPecas');
  const ABERTURA_PECAS = legPecas.innerHTML;

  function contaPecas() {
    const postas = caixaPecas.querySelectorAll('.peca.posta').length;
    totalPecas.textContent = postas;
    metaPecas.textContent = 'peças no seu pedido: ' + postas + ' de ' + PECAS.length;
    if (postas === PECAS.length) {
      metaPecas.className = 'meta win';
      legPecas.innerHTML = '<b>As quatro no lugar. Agora a pergunta de ouro: a resposta que isso puxa é pra colar ou pra estudar?</b>';
      legPecas.className = 'legenda ok';
    } else {
      metaPecas.className = 'meta';
      legPecas.innerHTML = ABERTURA_PECAS;
      legPecas.className = 'legenda';
    }
  }

  PECAS.forEach((texto) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'peca';
    botao.setAttribute('aria-pressed', 'false');
    botao.innerHTML = '<span class="peca__marca" aria-hidden="true">✓</span><span class="peca__texto">' + texto + '</span>';
    botao.addEventListener('click', () => {
      const posta = botao.classList.toggle('posta');
      botao.setAttribute('aria-pressed', String(posta));
      contaPecas();
    });
    caixaPecas.appendChild(botao);
  });

  document.getElementById('limparPecas').addEventListener('click', () => {
    caixaPecas.querySelectorAll('.peca').forEach((b) => {
      b.classList.remove('posta');
      b.setAttribute('aria-pressed', 'false');
    });
    contaPecas();
  });
  contaPecas();
})();

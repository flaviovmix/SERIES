/* painel
   A lista de series com a chave de cada uma, o salvar e o aviso do resultado. Fala so com
   o servidor.js do lado (127.0.0.1): le as series, manda o estado novo com o token que o
   servidor pos na pagina, e mostra o que mudou e o comando de subir. Todo texto que vem do
   servidor entra por textContent, nunca por innerHTML. */

(function () {
  'use strict';

  const TOKEN = document.querySelector('meta[name="token-do-painel"]').content;
  const formulario = document.getElementById('series');
  const lista = formulario.querySelector('.series__lista');
  const carregando = document.getElementById('carregando');
  const botaoSalvar = formulario.querySelector('.series__salvar');
  const aviso = document.getElementById('aviso');
  const resultado = document.getElementById('resultado');

  function avisar(texto, tipo) {
    aviso.textContent = texto;
    aviso.dataset.tipo = tipo;
  }

  /* ---------- a lista ---------- */

  function criarChave(serie) {
    const rotulo = document.createElement('label');
    rotulo.className = 'serie';
    const chave = document.createElement('input');
    chave.type = 'checkbox';
    chave.className = 'serie__chave';
    chave.setAttribute('role', 'switch');
    chave.value = serie.num;
    chave.checked = serie.ativa;
    const nome = document.createElement('span');
    nome.className = 'serie__nome';
    nome.textContent = `${serie.num} · ${serie.nome}`;
    const situacao = document.createElement('span');
    situacao.className = 'serie__situacao';
    situacao.textContent = serie.temPagina ? 'tem página' : 'em preparação';
    rotulo.append(chave, nome, situacao);
    return rotulo;
  }

  function mostrarSeries(series) {
    lista.querySelectorAll('.serie').forEach((serie) => serie.remove());
    carregando.hidden = true;
    series.forEach((serie) => lista.append(criarChave(serie)));
  }

  function estadoDasChaves() {
    const ativas = {};
    lista.querySelectorAll('.serie__chave').forEach((chave) => { ativas[chave.value] = chave.checked; });
    return { ativas };
  }

  /* ---------- a conversa com o servidor ---------- */

  async function pedir(metodo, corpo) {
    /* endereco relativo de proposito: na maquina do dono a pagina abre em "/", e no
       servidor ela abre em "/painel/" — o mesmo codigo serve os dois */
    const resposta = await fetch('api/series', {
      method: metodo,
      headers: corpo ? { 'Content-Type': 'application/json', 'X-Token-Do-Painel': TOKEN } : {},
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
    const dados = await resposta.json().catch(() => ({ ok: false, erro: `resposta ${resposta.status} sem JSON` }));
    if (!dados.ok) throw new Error(dados.erro || `resposta ${resposta.status}`);
    return dados;
  }

  function mostrarResultado(dados) {
    const itens = dados.mudaram.map((arquivo) => {
      const item = document.createElement('li');
      item.textContent = arquivo;
      return item;
    });
    document.getElementById('arquivos').replaceChildren(...itens);
    document.getElementById('comando').textContent = dados.comando || 'nada mudou: não há o que subir';
    resultado.hidden = false;
  }

  async function salvar(evento) {
    evento.preventDefault();
    botaoSalvar.disabled = true;
    avisar('Gravando e rodando o gerador...', 'andando');
    try {
      const dados = await pedir('POST', estadoDasChaves());
      mostrarSeries(dados.series);
      mostrarResultado(dados);
      avisar(dados.mudaram.length ? `Pronto: ${dados.mudaram.length} arquivo(s) mudaram.` : 'Pronto: nada mudou.', 'ok');
    } catch (erro) {
      avisar(`Não gravou: ${erro.message}`, 'erro');
      /* as chaves voltam a mostrar o que ficou gravado, nao o que foi tentado */
      await carregar();
    } finally {
      botaoSalvar.disabled = false;
    }
  }

  async function carregar() {
    try {
      mostrarSeries((await pedir('GET')).series);
    } catch (erro) {
      carregando.textContent = `Não deu pra ler as séries: ${erro.message}`;
    }
  }

  formulario.addEventListener('submit', salvar);
  carregar();
})();

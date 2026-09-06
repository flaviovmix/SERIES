/* portas
   Liga as chaves dos tres circuitos da tela 2: quem decide se a lampada acende e a
   regra da porta (E, OU, NAO). Nao depende de outro script; o desenho vem pronto no
   HTML e este arquivo so troca classe. */

(function () {
  const REGRAS = {
    e: (chaves) => chaves[0] && chaves[1],
    ou: (chaves) => chaves[0] || chaves[1],
    nao: (chaves) => !chaves[0],
  };

  // Quais fios ficam vivos em cada porta. No E e no NAO a corrente e uma so; no OU
  // cada ramo acende sozinho, entao o fio do ramo segue a chave dele.
  function fiosVivos(tipo, chaves, acesa) {
    if (tipo === 'ou') {
      return {
        'ramo-a': chaves[0],
        'ramo-b': chaves[1],
        tronco: acesa,
      };
    }
    return { tronco: acesa };
  }

  document.querySelectorAll('.porta').forEach((porta) => {
    const tipo = porta.dataset.porta;
    const chaves = [...porta.querySelectorAll('.porta__chave')];
    const estado = porta.querySelector('.porta__estado');
    const ligadas = chaves.map(() => false);

    function atualiza() {
      const acesa = REGRAS[tipo](ligadas);
      porta.classList.toggle('is-acesa', acesa);
      estado.textContent = acesa ? 'lâmpada acesa' : 'lâmpada apagada';

      const vivos = fiosVivos(tipo, ligadas, acesa);
      porta.querySelectorAll('.fio').forEach((fio) => {
        const grupo = fio.dataset.fio || 'tronco';
        fio.classList.toggle('is-vivo', !!vivos[grupo]);
      });
    }

    chaves.forEach((chave, i) => {
      const mexe = () => {
        ligadas[i] = !ligadas[i];
        chave.classList.toggle('is-fechada', ligadas[i]);
        chave.setAttribute('aria-pressed', String(ligadas[i]));
        atualiza();
      };
      chave.setAttribute('role', 'button');
      chave.setAttribute('tabindex', '0');
      chave.setAttribute('aria-pressed', 'false');
      chave.addEventListener('click', mexe);
      chave.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        mexe();
      });
    });

    atualiza();
  });
})();

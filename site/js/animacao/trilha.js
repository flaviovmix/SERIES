/* trilha (da base)
   A trilha de desafios de qualquer pratica: os alvos em fila (feito, atual, por
   fazer), a legenda que pede o proximo numero e a meta que comemora. Nasceu no
   ep 01-01, foi clonada no EX-03 e extraida pra ca na terceira copia (EX-04),
   pela regra do terceiro clone. Depende de animacao/painel.css (.trilha/.alvo).

   Uso: Animacao.criaTrilha({ trilha, legenda, meta, desafios, pede, fim, rotulo })
   — trilha/legenda/meta sao ids; pede(n) devolve o HTML que pede o desafio n;
   fim e o HTML de tudo feito; rotulo(n) formata o numero no alvo e na meta
   (opcional — serve pra alvo tipo "2:05"). Devolve { confere }: a pratica chama
   confere(total) a cada mudanca e a trilha avanca sozinha quando bater. */

window.Animacao = window.Animacao || {};

(function () {
  function criaTrilha(opts) {
    const trilha = document.getElementById(opts.trilha);
    const legenda = document.getElementById(opts.legenda);
    const meta = document.getElementById(opts.meta);
    const desafios = opts.desafios;
    const rotulo = opts.rotulo || String;
    let atual = 0;

    desafios.forEach((n) => {
      const alvo = document.createElement('span');
      alvo.className = 'alvo';
      alvo.textContent = rotulo(n);
      trilha.appendChild(alvo);
    });

    function pinta() {
      [...trilha.children].forEach((alvo, i) => {
        alvo.classList.toggle('feito', i < atual);
        alvo.classList.toggle('atual', i === atual);
      });
      if (atual < desafios.length) {
        legenda.innerHTML = opts.pede(desafios[atual]);
        meta.textContent = 'meta: ' + rotulo(desafios[atual]);
        meta.className = 'meta';
      } else {
        legenda.innerHTML = opts.fim;
        meta.textContent = '🎉 completo';
        meta.className = 'meta win';
      }
    }

    // a pratica chama a cada mudanca; avanca quando o total bater com o desafio
    function confere(total) {
      if (atual >= desafios.length || total !== desafios[atual]) return false;
      atual++;
      pinta();
      if (atual < desafios.length) {
        meta.textContent = '✔ agora o ' + rotulo(desafios[atual]);
        meta.className = 'meta win';
      }
      return true;
    }

    pinta();
    return { confere };
  }

  Animacao.criaTrilha = criaTrilha;
})();

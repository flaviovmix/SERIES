/* lightbox
   A foto ampliada ou o modelo 3D em tela cheia. Cria o proprio DOM (nenhum episodio
   copia a marcacao), liga todo elemento com data-abre e o passeio pelas fotos da tela.
   Depende de lightbox.css. O telas.js e opcional: sem ele (o hub de uma serie, como o
   hardware.html desde 14/09/2026) cada foto abre sozinha, sem passeio. Espera no HTML: elementos com
   data-abre="foto" (com <img> e data-legenda ou <figcaption>) ou data-abre="modelo3d";
   o modelo vem do <iframe data-src> da capa (modelo-3d.js) ou do proprio botao,
   que pode declarar data-modelo (e data-modelo-legenda) — e o caso da capa que
   mostra uma foto e guarda o modelo so pra tela cheia.

   O passeio gira em loop DENTRO da tela onde a foto foi clicada e nunca pula pra
   cena seguinte: a ordem das cenas e a narrativa do episodio, e quem manda nela e
   o Proximo. */

(function () {
  const lightbox = criaDom();
  const quadro = lightbox.querySelector('.lb-quadro');
  const img = lightbox.querySelector('img');
  const frame = lightbox.querySelector('iframe');
  const legenda = lightbox.querySelector('.lb-legenda');
  const setaAntes = lightbox.querySelector('.lb-seta--antes');
  const setaDepois = lightbox.querySelector('.lb-seta--depois');
  const btnFechar = lightbox.querySelector('.lb-fechar');
  const recado = lightbox.querySelector('.lb-recado');
  const btnTentar = lightbox.querySelector('.lb-tentar');
  const modeloDaCapa = document.querySelector('.capa-modelo iframe[data-src]');

  /* de onde sai o modelo desta abertura: quem clicou manda, e a capa e o fallback
     das paginas que exibem o modelo embutido */
  function modeloDe(alvo) {
    if (alvo && alvo.dataset.modelo) {
      return {
        src: alvo.dataset.modelo,
        titulo: alvo.dataset.modeloTitulo || 'modelo tridimensional',
        legenda: alvo.dataset.modeloLegenda || ''
      };
    }
    if (!modeloDaCapa) return null;
    return {
      src: modeloDaCapa.dataset.src,
      titulo: modeloDaCapa.title,
      legenda: modeloDaCapa.closest('figure').querySelector('figcaption').textContent
    };
  }

  let galeria = [];      // as fotos da tela em que o lightbox foi aberto, e so elas
  let fotoAtual = -1;
  let gatilho = null;    // quem abriu, pra devolver o foco ao fechar

  function criaDom() {
    const el = document.createElement('div');
    el.className = 'lightbox';
    el.innerHTML =
      '<button class="lb-seta lb-seta--antes" aria-label="foto anterior" hidden>‹</button>' +
      '<button class="lb-seta lb-seta--depois" aria-label="próxima foto" hidden>›</button>' +
      '<div class="lb-quadro" role="dialog" aria-modal="true">' +
      '<button class="lb-fechar" aria-label="fechar">✕</button>' +
      '<img alt="">' +
      '<iframe title="modelo tridimensional"></iframe>' +
      '<div class="lb-recado" hidden>O modelo não abriu — a conexão pode ter falhado. '+ '<button type="button" class="lb-tentar">tentar de novo</button></div>' +
      '<div class="lb-legenda"></div>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  function aberta() { return lightbox.classList.contains('aberta'); }

  function setasDoPasseio(ligadas) {
    const cabe = ligadas && galeria.length > 1;   // com uma foto so nao ha o que girar
    setaAntes.hidden = !cabe;
    setaDepois.hidden = !cabe;
  }

  // passo 0 = abrindo (quem anima e a entrada do quadro); -1 e +1 fazem a foto
  // deslizar pro lado certo
  function poeFoto(i, passo) {
    if (!galeria.length) return;
    fotoAtual = (i + galeria.length) % galeria.length;   // da a volta nas duas pontas
    const foto = galeria[fotoAtual];
    // Numa figura com duas versoes (troca-imagem), a que esta em cena leva o
    // data-em-cena; nas outras figuras existe uma imagem so.
    const original = foto.querySelector('img[data-em-cena]') || foto.querySelector('img');
    img.src = original.src;
    img.alt = original.alt;
    decideGiro(original);
    const cap = foto.querySelector('figcaption');
    legenda.textContent = foto.dataset.legenda || (cap ? cap.textContent : '');
    quadro.classList.remove('veio-da-direita', 'veio-da-esquerda');
    if (passo) {
      quadro.offsetWidth;   // reinicia a animacao: sem o reflow ela nao repete
      quadro.classList.add(passo > 0 ? 'veio-da-direita' : 'veio-da-esquerda');
    }
    setasDoPasseio(true);
  }
  function andaFoto(passo) { poeFoto(fotoAtual + passo, passo); }

  /* Foto larga no telefone em pé abre deitada (pedido dele, 09/09): quem gira é o
     CSS, aqui só se diz se a foto é mais larga que alta. Mede a imagem da página,
     que já está carregada; se ainda não estiver, espera o load dela. */
  function decideGiro(original) {
    const larga = (el) => el.naturalWidth > el.naturalHeight * 1.15;
    if (original.complete && original.naturalWidth) {
      lightbox.classList.toggle('lb--deitar', larga(original));
    } else {
      lightbox.classList.remove('lb--deitar');
      original.addEventListener('load', () => lightbox.classList.toggle('lb--deitar', larga(original)), { once: true });
    }
  }

  /* O modelo mora num iframe: se ele nao chega (conexao ruim), o quadro ficaria
     vazio pra sempre. Nove segundos sem o `load` do iframe e a gente conta o que
     houve e oferece tentar de novo — em vez de deixar a pessoa esperando. */
  let vigia = null;
  let modeloNoAr = null;
  function esperaOModelo() {
    clearTimeout(vigia);
    recado.hidden = true;
    vigia = setTimeout(() => { recado.hidden = false; }, 9000);
  }
  frame.addEventListener('load', () => {
    if (!frame.src || frame.src === 'about:blank') return;   // o passo do meio do "tentar de novo"
    clearTimeout(vigia);
    // ⚠️ rede falhando também dispara `load` (o navegador desenha a página de
    // erro dele): quem diz se deu certo é achar o modelo lá dentro.
    let veio = false;
    try { veio = !!frame.contentDocument?.querySelector('.app'); } catch (e) { veio = true; }
    recado.hidden = veio;
    if (location.search.includes('medidas=1')) setTimeout(escreveMedidas, 1500);
  });

  /* Medir no aparelho, não calibrar (?medidas=1): o que o iframe e o modelo lá
     dentro estão vendo, escrito na legenda pra tirar print. */
  function escreveMedidas() {
    try {
      const w = frame.contentWindow, d = frame.contentDocument;
      const r = (el) => { if (!el) return 'nao ha'; const b = el.getBoundingClientRect(); return `${Math.round(b.left)},${Math.round(b.top)} ${Math.round(b.width)}x${Math.round(b.height)}`; };
      const app = d.querySelector('.app'), arena = d.querySelector('.arena'), cv = d.querySelector('#cena canvas');
      const fi = frame.getBoundingClientRect();
      legenda.textContent =
        `pai ${innerWidth}x${innerHeight} | iframe ${Math.round(fi.width)}x${Math.round(fi.height)} em ${Math.round(fi.left)},${Math.round(fi.top)}` +
        ` | dentro ${w.innerWidth}x${w.innerHeight} | app ${r(app)} | arena ${r(arena)} | canvas ${r(cv)}` +
        ` | embedded ${d.body.classList.contains('embedded')} | deitado ${w.matchMedia('(max-width:820px) and (orientation:portrait) and (pointer:coarse)').matches}` +
        ` | transform ${app ? getComputedStyle(app).transform.slice(0, 40) : '-'} | ${navigator.userAgent.match(/Chrome\/[\d.]+|Safari[^ ]*/)?.[0] || ''}`;
    } catch (e) { legenda.textContent = 'medidas: ' + e.message; }
  }
  btnTentar.addEventListener('click', () => {
    if (!modeloNoAr) return;
    esperaOModelo();
    frame.src = 'about:blank';
    // o about:blank tambem dispara load: recarrega no quadro seguinte
    requestAnimationFrame(() => { frame.src = modeloNoAr; esperaOModelo(); });
  });

  function mostraModelo(alvo) {
    const modelo = modeloDe(alvo);
    if (!modelo) return;
    modeloNoAr = modelo.src;
    esperaOModelo();
    frame.src = modelo.src;
    frame.title = modelo.titulo;
    frame.style.display = 'block';
    img.style.display = 'none';
    legenda.textContent = modelo.legenda;
    setasDoPasseio(false);   // o modelo nao e foto: nao entra no passeio
    lightbox.classList.remove('lb--deitar');   // o modelo deita sozinho lá dentro
  }

  function mostraFoto(foto) {
    clearTimeout(vigia);
    recado.hidden = true;
    img.style.display = 'block';
    frame.style.display = 'none';
    const tela = foto.closest('.step');
    galeria = tela ? [...tela.querySelectorAll('[data-abre="foto"]')] : [foto];
    poeFoto(galeria.indexOf(foto), 0);
  }

  function abre(tipo, alvo) {
    gatilho = document.activeElement;
    if (tipo === 'modelo3d') mostraModelo(alvo); else mostraFoto(alvo);
    lightbox.classList.remove('saindo');
    lightbox.classList.add('aberta');
    btnFechar.focus();
  }

  function fecha() {
    if (lightbox.classList.contains('saindo')) return;   // ja esta saindo
    clearTimeout(vigia);
    recado.hidden = true;
    lightbox.classList.add('saindo');
    let fechado = false;
    const some = () => {
      if (fechado) return;
      fechado = true;
      quadro.removeEventListener('animationend', aoTerminar);
      lightbox.classList.remove('aberta', 'saindo');
      quadro.classList.remove('veio-da-direita', 'veio-da-esquerda');
      frame.removeAttribute('src');   // encerra o loop de render do modelo
      if (gatilho && gatilho.focus) gatilho.focus();
    };
    // o alvo importa: animacao de filho borbulha, e uma foto ainda deslizando
    // fecharia o lightbox no meio do caminho
    function aoTerminar(e) { if (e.target === quadro) some(); }
    quadro.addEventListener('animationend', aoTerminar);
    setTimeout(some, 520);   // rede: se o animationend nao vier, fecha assim mesmo
  }

  function ligaGatilhos() {
    document.querySelectorAll('[data-abre]').forEach((el) => {
      el.addEventListener('click', () => abre(el.dataset.abre, el));
      // figure e div nao recebem Tab sozinhos: viram botao pro teclado
      if (el.tagName !== 'BUTTON') {
        el.tabIndex = 0;
        el.setAttribute('role', 'button');
        el.addEventListener('keydown', (e) => {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          e.preventDefault();
          abre(el.dataset.abre, el);
        });
      }
    });
    setaAntes.addEventListener('click', () => andaFoto(-1));
    setaDepois.addEventListener('click', () => andaFoto(1));
    btnFechar.addEventListener('click', fecha);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) fecha(); });
  }

  function ligaTeclado() {
    // fase de captura: com o lightbox aberto as setas andam pelas fotos, nao pelas
    // telas, e telas.js nem fica sabendo
    document.addEventListener('keydown', (e) => {
      if (!aberta()) return;
      e.stopPropagation();
      if (e.key === 'Escape') fecha();
      if (!setaAntes.hidden && e.key === 'ArrowLeft') andaFoto(-1);
      if (!setaAntes.hidden && e.key === 'ArrowRight') andaFoto(1);
    }, true);
  }

  // fora das animacoes (o hub de uma serie) nao existe telas.js pra criar o Animacao
  window.Animacao = window.Animacao || {};
  Animacao.lightbox = { abre, fecha, aberta };
  ligaGatilhos();
  ligaTeclado();
})();

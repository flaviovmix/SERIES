# Recorta cada gravura desta pasta numa faixa 1200x670 (a proporcao dos cards do site) e
# salva em webp no site/img. Gravura em traco fino comprime mal: cinza, um desfoque leve
# (0,7) e qualidade 62 levam de ~350 KB pra ~120 KB sem perder o desenho no tamanho do card.
# O "t" diz onde a faixa fica na altura: 0 = no topo, 1 = no pe.
# Uso: python recorta.py   (escreve em ../../../site/img)
import os
from PIL import Image, ImageFilter

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.normpath(os.path.join(AQUI, '..', '..', '..', 'site', 'img'))
LARGURA, ALTURA = 1200, 670

# (gravura desta pasta, nome no site/img, t)
CORTES = [
    ('001-creation-of-light.jpg', 'biblia-historias-etapa-01', 0.10),
    ('011-abraham-goes-to-canaan.jpg', 'biblia-historias-etapa-02', 0.60),
    ('044-israelites-cross-jordan.jpg', 'biblia-historias-etapa-03', 0.30),
    ('131-daniel-lions-den.jpg', 'biblia-historias-etapa-04', 0.40),
    ('jesus-healing-the-sick.jpg', 'biblia-historias-etapa-05', 0.40),
    ('paul-addresses-the-crowd.jpg', 'biblia-historias-etapa-06', 0.15),
    ('123-baruch-writes.jpg', 'biblia-historias-extras', 0.36),
    ('001-creation-of-light.jpg', 'biblia-historias-01-ep-01', 0.75),
    ('003-adam-and-eve-driven-out.jpg', 'biblia-historias-01-ep-02', 0.75),
    ('008-dove-from-the-ark.jpg', 'biblia-historias-01-ep-03', 0.02),
    ('010-tower-of-babel.jpg', 'biblia-historias-01-ep-04', 0.10),
]


def faixa(img, t):
    w, h = img.size
    alto = round(w * ALTURA / LARGURA)
    topo = round(t * (h - alto))
    return img.crop((0, topo, w, topo + alto)).resize((LARGURA, ALTURA), Image.LANCZOS)


def main():
    for gravura, nome, t in CORTES:
        img = Image.open(os.path.join(AQUI, gravura)).convert('L')
        destino = os.path.join(SAIDA, nome + '.webp')
        faixa(img, t).filter(ImageFilter.GaussianBlur(0.7)).save(destino, 'WEBP', quality=62, method=6)
        print('%s %dKB' % (nome, os.path.getsize(destino) // 1024))


main()

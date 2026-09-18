# Recorta a capa da serie (site/img/serie-biblia-historias.webp, 1200x670) do mapa de Ortelius
# desta pasta: 86% da largura, centrado, pegando o mapa e as duas colunas de medalhoes.
# O desfoque leve (0,6) e a qualidade 66 seguram o arquivo perto dos 160 KB da capa do Universo.
# Uso: python recorta-capa.py
import os
from PIL import Image, ImageFilter

AQUI = os.path.dirname(os.path.abspath(__file__))
ORIGINAL = os.path.join(AQUI, 'ortelius-abrahami-peregrinatio-1590.jpg')
DESTINO = os.path.normpath(os.path.join(AQUI, '..', '..', '..', 'site', 'img', 'serie-biblia-historias.webp'))
LARGURA, ALTURA = 1200, 670
FRACAO_DA_LARGURA = 0.86


def main():
    img = Image.open(ORIGINAL).convert('RGB')
    w, h = img.size
    corte_w = int(w * FRACAO_DA_LARGURA)
    corte_h = int(corte_w * ALTURA / LARGURA)
    x, y = (w - corte_w) // 2, (h - corte_h) // 2
    capa = img.crop((x, y, x + corte_w, y + corte_h)).resize((LARGURA, ALTURA), Image.LANCZOS)
    capa.filter(ImageFilter.GaussianBlur(0.6)).save(DESTINO, 'WEBP', quality=66, method=6)
    print('%s %dKB' % (DESTINO, os.path.getsize(DESTINO) // 1024))


main()

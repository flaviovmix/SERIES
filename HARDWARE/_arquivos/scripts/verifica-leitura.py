# Segunda passada do inventário do material: o que o texto sozinho não mostra.
# 1) formatos das imagens dentro dos PPTX (EMF/WMF não abrem como foto);
# 2) as figuras de um slide extraídas pra olhar com o Read (slide que é só imagem);
# 3) os arquivos parecidos: quanto do texto de dois arquivos bate.
# Uso:
#   python verifica-leitura.py formatos
#   python verifica-leitura.py slide "<caminho do .pptx>" <numero do slide>
#   python verifica-leitura.py parecidos "<nome.txt>" "<outro.txt>"   (dentro de PDF\_texto\<pasta>)
# ⚠️ Rodar depois do inventario-curso.py. Tudo que ele escreve fica em HARDWARE\PDF\_texto\,
# fora do git, porque é conteúdo do material pago (D3).
import difflib
import re
import sys
import zipfile
from pathlib import Path

ORIGEM = Path(r'C:\src\PROJETOS\SEIRES\HARDWARE\PDF')
TEXTO = ORIGEM / '_texto'


def formatos_das_imagens():
    total = {}
    for pptx in sorted(ORIGEM.rglob('*.pptx')):
        with zipfile.ZipFile(pptx) as pacote:
            for nome in pacote.namelist():
                if nome.startswith('ppt/media/'):
                    ext = Path(nome).suffix.lower()
                    total[ext] = total.get(ext, 0) + 1
                    if ext in ('.emf', '.wmf', '.tif', '.tiff', '.mp4'):
                        print(f'  {pptx.name}: {nome} ({ext}, não abre como foto)')
    print('  ' + ', '.join(f'{n} {e}' for e, n in sorted(total.items(), key=lambda x: -x[1])))


def extrai_imagens_do_slide(pptx, numero_slide):
    destino = TEXTO / 'figuras-de-slide'
    destino.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(pptx) as pacote:
        rels = pacote.read('ppt/_rels/presentation.xml.rels').decode('utf8')
        alvo = {i: t for i, t in re.findall(r'Id="([^"]+)"[^>]*Target="([^"]+)"', rels)}
        ids = re.findall(r'<p:sldId\b[^>]*r:id="([^"]+)"', pacote.read('ppt/presentation.xml').decode('utf8'))
        slide = 'ppt/' + alvo[ids[numero_slide - 1]]
        pasta, nome = slide.rsplit('/', 1)
        rels_slide = pacote.read(f'{pasta}/_rels/{nome}.rels').decode('utf8')
        for alvo_img in re.findall(r'Target="\.\./media/([^"]+)"', rels_slide):
            arquivo = destino / f'{pptx.stem}-slide{numero_slide}-{alvo_img}'
            arquivo.write_bytes(pacote.read(f'ppt/media/{alvo_img}'))
            print(f'  {arquivo}')


def parecidos(a, b):
    achados = {p.name: p for p in TEXTO.rglob('*.txt')}
    palavras_a = achados[a].read_text(encoding='utf8').split()
    palavras_b = achados[b].read_text(encoding='utf8').split()
    # descarta o marcador "=== slide N" do PPTX pra comparar só o conteúdo
    limpa = lambda ps: [p.lower() for p in ps if p not in ('===', 'slide') and not p.startswith('(')]
    razao = difflib.SequenceMatcher(None, limpa(palavras_a), limpa(palavras_b), autojunk=False).ratio()
    print(f'  {a}  x  {b}: {razao:.0%} igual')


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    comando = sys.argv[1] if len(sys.argv) > 1 else ''
    if comando == 'formatos':
        formatos_das_imagens()
    elif comando == 'slide' and len(sys.argv) == 4:
        extrai_imagens_do_slide(Path(sys.argv[2]), int(sys.argv[3]))
    elif comando == 'parecidos' and len(sys.argv) == 4:
        parecidos(sys.argv[2], sys.argv[3])
    else:
        print(__doc__ or 'Uso: ver o comentário no topo do arquivo')
        sys.exit(1)

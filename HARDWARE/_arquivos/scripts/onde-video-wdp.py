# Diz em quais PPTX do curso estão o vídeo (.mp4) e as imagens .wdp (JPEG XR, que não abre
# como foto aqui), e se cada .wdp tem uma cópia em PNG/JPEG ao lado (o PowerPoint costuma
# guardar as duas: a .wdp é a versão com efeito, a outra é a de reserva).
# Uso: python onde-video-wdp.py
import re
import sys
import zipfile
from pathlib import Path

ORIGEM = Path(r'C:\src\PROJETOS\SEIRES\HARDWARE\PDF')

sys.stdout.reconfigure(encoding='utf-8')
for pptx in sorted(ORIGEM.rglob('*.pptx')):
    with zipfile.ZipFile(pptx) as pacote:
        nomes = pacote.namelist()
        videos = [n for n in nomes if n.lower().endswith('.mp4')]
        wdps = [n for n in nomes if n.lower().endswith('.wdp')]
        if not videos and not wdps:
            continue
        # a .wdp entra no slide por um <a14:imgLayer r:embed>, junto do <a:blip r:embed> da reserva
        slides_com_wdp = set()
        for nome in nomes:
            if re.fullmatch(r'ppt/slides/_rels/slide\d+\.xml\.rels', nome):
                if '.wdp' in pacote.read(nome).decode('utf8'):
                    slides_com_wdp.add(int(re.search(r'slide(\d+)', nome).group(1)))
        for video in videos:
            tamanho = pacote.getinfo(video).file_size // 1024
            print(f'{pptx.parent.name} / {pptx.name}: vídeo {video} ({tamanho} KB)')
        if wdps:
            print(f'{pptx.parent.name} / {pptx.name}: {len(wdps)} .wdp nos slides (arquivo) {sorted(slides_com_wdp)}')

# Inventário do material de estudo do hardware: diz o que dá pra ler e como.
# PPTX: texto de cada slide na ordem da apresentação, notas do instrutor e quantas imagens.
# PDF: páginas e texto (pdftotext). ZIP: lista do que tem dentro. JPG: só o tamanho.
# Uso: python inventario-curso.py
# Saída: um .txt por arquivo em HARDWARE\PDF\_texto\<pasta>\ + resumo no terminal.
# ⚠️ A saída fica DENTRO de HARDWARE\PDF\, que está fora do git: o texto é do material pago (D3).
import html
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ORIGEM = Path(r'C:\src\PROJETOS\SEIRES\HARDWARE\PDF')
DESTINO = ORIGEM / '_texto'
POPPLER = Path(r'C:\Users\ASUS\AppData\Local\Microsoft\WinGet\Packages'
               r'\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\Library\bin')
# página ou slide com menos palavras que isso é tratado como "só imagem"
POUCO_TEXTO = 5


def ferramenta(nome):
    return shutil.which(nome) or str(POPPLER / f'{nome}.exe')


def atributos(tag):
    return dict(re.findall(r'([\w:]+)="([^"]*)"', tag))


def relacoes(pacote, caminho_rels):
    if caminho_rels not in pacote.namelist():
        return []
    texto = pacote.read(caminho_rels).decode('utf8')
    return [atributos(tag) for tag in re.findall(r'<Relationship\b[^>]*>', texto)]


def texto_do_xml(xml):
    # um parágrafo (<a:p>) por linha, juntando os pedaços (<a:t>) de dentro dele
    linhas = []
    for paragrafo in xml.split('</a:p>'):
        pedacos = re.findall(r'<a:t>([^<]*)</a:t>', paragrafo)
        linha = html.unescape(''.join(pedacos)).strip()
        if linha:
            linhas.append(linha)
    return linhas


def slides_em_ordem(pacote):
    # a ordem real mora no presentation.xml (sldIdLst -> r:id -> rels), não no número do arquivo
    alvo = {r['Id']: r['Target'] for r in relacoes(pacote, 'ppt/_rels/presentation.xml.rels')}
    apresentacao = pacote.read('ppt/presentation.xml').decode('utf8')
    ordem = []
    for tag in re.findall(r'<p:sldId\b[^>]*>', apresentacao):
        destino = alvo[atributos(tag)['r:id']]
        ordem.append(destino.lstrip('/') if destino.startswith('/') else 'ppt/' + destino)
    return ordem


def le_pptx(arquivo, saida):
    with zipfile.ZipFile(arquivo) as pacote:
        slides = slides_em_ordem(pacote)
        midias = [n for n in pacote.namelist() if n.startswith('ppt/media/')]
        so_imagem, palavras, blocos = [], 0, []
        for numero, slide in enumerate(slides, 1):
            pasta, nome = slide.rsplit('/', 1)
            rels = relacoes(pacote, f'{pasta}/_rels/{nome}.rels')
            imagens = sum(1 for r in rels if r.get('Type', '').endswith('/image'))
            linhas = texto_do_xml(pacote.read(slide).decode('utf8'))
            notas = []
            for r in rels:
                if r.get('Type', '').endswith('/notesSlide'):
                    caminho = str(Path(pasta, r['Target'])).replace('\\', '/')
                    caminho = re.sub(r'[^/]+/\.\./', '', caminho)
                    if caminho in pacote.namelist():
                        # a última linha das notas costuma ser só o número do slide
                        notas = [l for l in texto_do_xml(pacote.read(caminho).decode('utf8')) if not l.isdigit()]
            contagem = sum(len(l.split()) for l in linhas)
            palavras += contagem + sum(len(l.split()) for l in notas)
            if contagem < POUCO_TEXTO:
                so_imagem.append(numero)
            bloco = [f'=== slide {numero} ({imagens} imagem(ns)) ===', *linhas]
            if notas:
                bloco += ['[notas do instrutor]', *notas]
            blocos.append('\n'.join(bloco))
        saida.write_text('\n\n'.join(blocos) + '\n', encoding='utf8')
        return f'{len(slides)} slides, {palavras} palavras, {len(midias)} mídias, ' \
               f'{len(so_imagem)} slide(s) quase sem texto {resume(so_imagem)}'


def le_pdf(arquivo, saida):
    info = subprocess.run([ferramenta('pdfinfo'), str(arquivo)], capture_output=True, text=True,
                          encoding='utf8', errors='replace').stdout
    paginas = re.search(r'^Pages:\s+(\d+)', info, re.M)
    subprocess.run([ferramenta('pdftotext'), '-layout', '-enc', 'UTF-8', str(arquivo), str(saida)], check=True)
    texto = saida.read_text(encoding='utf8', errors='replace')
    por_pagina = texto.split('\f')
    so_imagem = [n for n, p in enumerate(por_pagina, 1) if len(p.split()) < POUCO_TEXTO and n <= int(paginas.group(1))]
    return f'{paginas.group(1)} páginas, {len(texto.split())} palavras, ' \
           f'{len(so_imagem)} página(s) quase sem texto {resume(so_imagem)}'


def nome_legivel(info):
    # zip sem a marca de UTF-8 vem decodificado como cp437: tenta desfazer
    if info.flag_bits & 0x800:
        return info.filename
    try:
        return info.filename.encode('cp437').decode('utf8')
    except UnicodeError:
        return info.filename


def le_zip(arquivo, saida):
    with zipfile.ZipFile(arquivo) as pacote:
        itens = [i for i in pacote.infolist() if not i.is_dir()]
        linhas = [f'{i.file_size:>10}  {nome_legivel(i)}' for i in itens]
    saida.write_text('\n'.join(linhas) + '\n', encoding='utf8')
    extensoes = {}
    for i in itens:
        ext = Path(i.filename).suffix.lower() or '(sem extensão)'
        extensoes[ext] = extensoes.get(ext, 0) + 1
    tipos = ', '.join(f'{n} {e}' for e, n in sorted(extensoes.items(), key=lambda x: -x[1]))
    return f'{len(itens)} arquivos ({tipos})'


def resume(numeros):
    if not numeros:
        return ''
    if len(numeros) > 12:
        return f'[{", ".join(map(str, numeros[:12]))}...]'
    return f'[{", ".join(map(str, numeros))}]'


LEITORES = {'.pptx': le_pptx, '.pdf': le_pdf, '.zip': le_zip}

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    for arquivo in sorted(ORIGEM.rglob('*')):
        if not arquivo.is_file() or DESTINO in arquivo.parents:
            continue
        modulo = arquivo.relative_to(ORIGEM).parts[0]
        leitor = LEITORES.get(arquivo.suffix.lower())
        rotulo = f'{modulo} / {arquivo.name}'
        if not leitor:
            print(f'{rotulo}: {arquivo.stat().st_size // 1024} KB (sem leitor, abrir à parte)')
            continue
        pasta = DESTINO / modulo
        pasta.mkdir(parents=True, exist_ok=True)
        try:
            print(f'{rotulo}: {leitor(arquivo, pasta / (arquivo.stem + ".txt"))}')
        except Exception as erro:  # um arquivo quebrado não pode esconder os outros
            print(f'{rotulo}: FALHOU ({type(erro).__name__}: {erro})')

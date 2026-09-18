# Corta do audio v2 do piloto os trechos que o NotebookLM improvisou fora da regua da serie
# (18/09/2026). O bruto fica em "_arquivos/audio/piloto-v2-bruto/"; o cortado vai pra pasta
# do episodio com o mesmo nome, que e o que o site toca.
#
# Cada corte cai numa pausa entre frases (tempos medidos palavra a palavra com o modelo
# medium, pelo palavras.py da sessao) e cada pedaco que fica ganha 15 ms de fade nas
# pontas, pra emenda nao estalar. Uso: python corta-piloto.py
import os
import subprocess

FFMPEG = r"C:\Users\ASUS\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
AQUI = os.path.dirname(os.path.abspath(__file__))
EPISODIO = os.path.normpath(os.path.join(AQUI, '..', '..', '00 - A serie inteira'))
NOME = 'Toda a Bíblia do Gênesis ao Apocalipse.m4a'
BRUTO = os.path.join(AQUI, 'piloto-v2-bruto', NOME)
SAIDA = os.path.join(EPISODIO, NOME)
FADE = 0.015

# (inicio, fim) em segundos de cada trecho que SAI, e por que
CORTES = [
    (250.66, 257.04, 'o pessoal que compilava os textos: afirmacao sobre a composicao, fora do roteiro'),
    (275.84, 279.38, 'situacao muito louca: tom'),
    (290.52, 293.22, 'tipo um fantasma no mapa, pois e: analogia nao declarada'),
    (473.86, 482.76, 'onde essa travessia rolou: da o evento como fato (D3)'),
    (579.50, 580.82, 'pela Assiria, com A: o apresentador leu a instrucao em voz alta'),
    (626.44, 629.08, 'geografia muito louca: tom'),
    (705.20, 706.80, 'usa o caminho real: a estrada nao foi pesquisada'),
    (760.36, 762.12, 'ele muda o nome pra Paulo: o texto diz Saulo, que tambem se chama Paulo'),
    (849.62, None, 'a reflexao do fim, com milhares de anos e o mapa na mente: moral e data'),
]


def pedacos_que_ficam():
    inicio = 0.0
    for de, ate, _ in CORTES:
        yield inicio, de
        if ate is None:
            return
        inicio = ate
    yield inicio, None


def filtro():
    """Um atrim por pedaco que fica, com fade nas pontas; o ultimo sai com fade mais longo,
    porque e o fim do audio."""
    pedacos = list(pedacos_que_ficam())
    partes, rotulos = [], []
    for n, (de, ate) in enumerate(pedacos):
        saida = 0.25 if n == len(pedacos) - 1 else FADE
        fade = 'afade=t=in:d=%.3f,afade=t=out:st=%.3f:d=%.3f' % (FADE, ate - de - saida, saida)
        partes.append('[0:a]atrim=start=%.3f:end=%.3f,asetpts=PTS-STARTPTS,%s[p%d]' % (de, ate, fade, n))
        rotulos.append('[p%d]' % n)
    return ';'.join(partes) + ';' + ''.join(rotulos) + 'concat=n=%d:v=0:a=1[out]' % len(rotulos)


def main():
    cmd = [FFMPEG, '-nostdin', '-loglevel', 'error', '-y', '-i', BRUTO,
           '-filter_complex', filtro(), '-map', '[out]', '-c:a', 'aac', '-b:a', '192k', SAIDA]
    subprocess.run(cmd, check=True)
    tirado = sum((ate or 875.35) - de for de, ate, _ in CORTES)
    print('salvo: %s (tirados %.1f s em %d cortes)' % (SAIDA, tirado, len(CORTES)))


main()

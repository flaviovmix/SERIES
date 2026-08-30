# Le a tabela do _telas.md de um episodio e reescreve a lista MARCADORES do
# episodio.js: um marcador por "aperte o Proximo", com o segundo em que a fala
# comeca e a tela (contando de 1) que ela abre. Assim os marcadores nunca sao
# digitados: saem do arquivo que saiu do audio.
#
#   python marcadores-do-mapa.py "<pasta do episodio>"
#
# Espera no episodio.js um bloco entre "const MARCADORES = [" e "];".

import io
import os
import re
import sys

if len(sys.argv) < 2:
    sys.exit('uso: python marcadores-do-mapa.py "<pasta do episodio>"')
pasta = sys.argv[1].rstrip('\\/')
mapa = os.path.join(pasta, '_telas.md')
js = os.path.join(pasta, 'episodio.js')

def segundos(mmss):
    m, s = mmss.split(':')
    return int(m) * 60 + int(s)

linhas = io.open(mapa, encoding='utf-8').read().split('\n')
telas = []
for l in linhas:
    m = re.match(r'^\| (\d+) \| (\d+:\d+) \| (\d+:\d+) \|', l)
    if m:
        telas.append((int(m.group(1)), segundos(m.group(2))))
if len(telas) < 2:
    sys.exit('tabela nao encontrada em ' + mapa)

# a tela 1 comeca em zero e nao tem marcador; da 2 em diante, "entra em" e o
# instante do pedido que abre a tela
marcadores = [(seg, tela) for tela, seg in telas if tela >= 2]
corpo = '\n'.join('    { segundo: %d, tela: %d },' % (seg, tela) for seg, tela in marcadores)

fonte = io.open(js, encoding='utf-8').read()
novo, n = re.subn(r'const MARCADORES = \[\n.*?\n  \];', 'const MARCADORES = [\n' + corpo + '\n  ];', fonte, flags=re.S)
if n != 1:
    sys.exit('bloco MARCADORES nao encontrado em ' + js)
io.open(js, 'w', encoding='utf-8', newline='\n').write(novo)
print('%d marcadores escritos em %s (telas %d..%d)' % (len(marcadores), os.path.basename(js), marcadores[0][1], marcadores[-1][1]))
for seg, tela in marcadores:
    print('  %02d:%02d -> tela %d' % (seg // 60, seg % 60, tela))

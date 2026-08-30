# Planta de telas — Montando o computador completo

**Janela temporal:** de 1936 a 1945
**Protagonistas com ficha humana:** nenhum (episódio de bancada: o personagem é a máquina inteira)

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | retomada do ep 04 (1936: uma máquina que lê códigos da fita faz o trabalho de todas) + o que este episódio faz (fechar a etapa) + janela 1936 a 1945 declarada |
| 2 | ficha | o conjunto de instruções: o que é; sem inventor (inspirado no Intel 8080 e num artigo de Raúl Rojas sobre computadores universais, de passagem); motivação: não reabrir a máquina a cada programa |
| 3 | conteudo | as peças novas: acumulador (unidade de aritmética + célula, soma ou subtrai sobre o que já tem); a memória como fita de células de 4 bits com endereço de 4 bits; o contador que aponta a próxima célula |
| 4 | conteudo | os cinco códigos: ADD 1100, SUB 1101, SAVE 0010, LIMP 0011, MPR 1010; o que cada um faz e por que só cinco bastam |
| 5 | conteudo | como a máquina lê um código: o relógio, a célula da vez, o funil de E/OU/NÃO que descobre qual código é (dois 1 na frente = ADD ou SUB; um OU nos dois últimos separa); o que acontece depois em cada um; MPR só salta se o acumulador está em zero |
| 6 | interativa | passo a passo de um ADD: contador aponta, código é lido, a célula seguinte vira endereço, o valor vai pro acumulador |
| 7 | conteudo | códigos compostos: LOAD = LIMP + ADD; GOTO = LIMP + MPR; o programa que conta de 12 até 0 (LOAD, SUB 1, SAVE, MPR, GOTO); hardware é o circuito, software é o código |
| 8 | pratica | escrever o programa de 5 menos 2 e guardar (LOAD 5, SUB 2, SAVE) e dizer o que cada célula tem |
| 9 | fecho | a máquina é equivalente à de Turing (menos a fita infinita), portanto universal + o que ainda não existe (nenhuma foi ligada) + para em 1945 + gancho pra etapa 7 |

**Total: 9 telas.** É a montagem final e cada peça nova pede uma tela (3, 4, 5) antes de virar programa (7). A interativa (6) fica entre a decodificação e os programas porque é o momento em que o ouvinte precisa ver o ciclo inteiro uma vez. A prática (8) é escrever, não rodar, porque escrever programa é o que a etapa inteira prometeu.

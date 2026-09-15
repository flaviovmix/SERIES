# Planta de telas — Entrar na máquina de longe

**Episódio:** 2º da etapa 14 (Pro mundo), depois do panorama que abre a etapa. A primeira peça do mapa: antes de empacotar ou subir qualquer arquivo, saber entrar na máquina que vai receber.
**Áudio gravado em 09/09/2026:** `Entrar na máquina de longe.m4a`, 13,8 min, 7/7 telas detectadas e 6 pedidos de "Próximo". O NotebookLM não devolveu título próprio (o downloader capturou o rótulo "Não lidos" da interface), então o arquivo leva o nome do episódio.
**Sem ficha humana e sem janela temporal.** O fecho carrega **o que transfere**.
**Sem número de episódio e sem número de etapa no áudio:** o que já foi visto se retoma como "nos capítulos anteriores". Gravado fora da ordem da série (09/09/2026), e o ouvinte não pode perceber isso.

| # | Tipo | O que essa tela carrega |
|---|---|---|
| 1 | capa | até aqui tudo rodou na máquina dele; a etapa que abre agora tira o app dali. O que este episódio faz: entrar na máquina de destino, que é o passo antes de qualquer coisa |
| 2 | conteudo | o que é um servidor: computador comum, sem monitor nem teclado, ligado o tempo todo, com endereço na internet. A diferença que importa é que **não tem tela**: tudo lá é texto. Por que não basta "mandar o arquivo" (alguém tem que instalar, abrir porta, ligar o serviço, e isso é comando digitado lá dentro) |
| 3 | conteudo | o que o SSH faz: um terminal seu cujos comandos executam na outra máquina. Secure Shell, o shell dos capítulos anteriores só que cifrado. O que viaja é texto (comando e resposta). Cliente e servidor, a porta, e o endereço em duas partes (quem você é lá + qual máquina). A pergunta da primeira conexão e o que ela quer dizer |
| 4 | conteudo | chave em vez de senha, e **por quê**: a porta é pública e existem programas testando senha o dia inteiro, sem ninguém te perseguir. O par de chaves: a pública é instalada no servidor, a privada nunca sai da sua máquina. Como se prova sem entregar o segredo. Cuidado prático: quem tem o arquivo entra |
| 5 | interativa | dentro da máquina. O prompt mudou de nome; as três perguntas de sempre (quem eu sou, onde eu estou, o que tem aqui) e onde as coisas moram em Linux (sua pasta, a de configuração, a do site, a dos logs). Sair e voltar pro seu prompt. O ouvinte toca em cada comando e vê a resposta |
| 6 | conteudo | o que não fazer. Máquina de verdade não tem desfazer e o comando de apagar não pergunta. O root, e por que o hábito é entrar como usuário comum e pedir poder pontual. O comando colado sem entender rodado como root: a tese da série no lugar mais caro, explodindo em segundos em vez de seis meses. Saber em qual das duas janelas você está antes do enter |
| 7 | fecho | recapitulação + o que transfere (SSH não é de Java: é como se entra em qualquer máquina Linux, e é a mesma chave que já levou o código pro repositório remoto) + gancho pro próximo (agora que dá pra entrar, o que exatamente se leva, e o que não pode ir junto) |

**Total: 7 telas.** A 3 e a 4 são separadas porque "o que o SSH é" e "como você prova que é você" são duas perguntas, e juntar as duas é o que faz a chave virar um ritual decorado. A 5 é interativa porque estar dentro da máquina é o que a pessoa nunca viu: ler sobre `pwd` não substitui ver a resposta. A 6 tem tela própria porque é o único ponto da série em que um comando errado quebra coisa de outras pessoas, e diluir isso no fecho seria perder o episódio.

## Candidatos a extra levantados neste roteiro

Levantados aqui pro dono escolher (nenhum decidido):

1. **A porta 22 e o que é uma porta** — já existe como EX-02 previsto ("O que é uma porta (e por que 8080)"); este episódio só encosta.
2. **O par de chaves por dentro** — o que é chave pública e privada de verdade, por que a pública pode ser pública, e onde mais isso aparece (o cadeado do navegador, a assinatura de um commit).
3. **A máquina apanha sozinha** — o que os varredores de senha fazem numa máquina nova, o que aparece no log de tentativa de login, e o mínimo que se faz num servidor recém-criado (fail2ban, porta, desligar senha, desligar root).
4. **A sessão que morre quando a janela fecha** — `screen` e `tmux`, e por que o processo que você deixou rodando some quando a internet cai.
5. **`scp`, `rsync` e o `sftp`** — as três formas de levar arquivo pela mesma conexão, e por que o `rsync` é o que se usa quando o pacote é grande.
6. **O arquivo `~/.ssh/config`** — apelido de servidor, chave por máquina, e por que ninguém digita o endereço inteiro duas vezes.
7. **Permissão em Linux (`chmod`, dono e grupo)** — o "permission denied" que todo mundo encontra na primeira semana, e por que a chave privada com permissão aberta é recusada.
8. **O usuário do serviço** — por que a aplicação não roda como root nem como você, e o que um usuário sem shell resolve.

## Filmes e documentários

Nenhum. Episódio técnico sem trilha histórica; a regra das obras vale pra série do computador.

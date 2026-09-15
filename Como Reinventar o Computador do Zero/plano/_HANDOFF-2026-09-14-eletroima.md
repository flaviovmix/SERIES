# Handoff 14/09/2026: extra O Eletroímã (EX-19) e a lista única de candidatos

Sequência que atravessa duas séries do SEIRES. Ela nasceu no áudio da etapa 1 do **Hardware** (a parte do relé), e o extra mora em **Do Ábaco à IA** (pasta `Como Reinventar o Computador do Zero\_EXTRAS\`). Regra da sequência: **uma etapa por vez, esperando o OK do Flávio entre elas.**

## Prompt pra abrir a próxima sessão

```
/inicia-sessao Sequência em andamento, não é tarefa do zero. Ler C:\src\PROJETOS\SEIRES\Como Reinventar o Computador do Zero\plano\_HANDOFF-2026-09-14-eletroima.md inteiro e seguir de onde parou: etapa 1 do plano, esperando as decisões do Flávio da tabela "Decisões esperando o Flávio".
```

## Onde parou

Etapa 1, no ponto de aprovação. A pesquisa de quem descobriu o eletroímã está feita, e a analogia e os candidatos a extra foram levados pro Flávio. **Ele ainda não respondeu nenhuma das decisões abaixo.** A conversa desviou pra organização dos candidatos, que foi feita e aprovada (seção "A lista única de candidatos").

O estado vivo também está nos planos: a linha `19` e o parágrafo "O Eletroímã" na seção `_EXTRAS` do plano de Do Ábaco à IA, e a P6 do plano da série Hardware (a chamada do Eletroímã trava a geração do áudio v2 da etapa 1). Quando o handoff e o plano divergirem, vale o plano.

## Decisões esperando o Flávio

| # | Decisão | Proposta levada | Status |
|---|---|---|---|
| 1 | Analogia única do EX-19 | **A**, as agulhinhas de bússola (ver seção "A analogia") | 🟠 |
| 2 | Quais candidatos que o Eletroímã levantou viram extra (93 a 96 da lista) | nenhuma recomendação; ele escolhe | 🟠 |
| 3 | O extra 03 do Hardware, *O relé por dentro*, repete o candidato 18, *O relé*, de Do Ábaco à IA | usar o 18 e não fazer outro | 🟠 |
| 4 | Chamada de extra no áudio: **com nome** (D9 do plano do Hardware) ou **"genérico, sem nome"** (linha "Regra que vale pra todos" na seção `_EXTRAS` do plano de Do Ábaco à IA) | igualar com nome, porque a D9 é o pedido mais recente dele; corrigir a linha de lá | 🟠 |
| 5 | Um `_pesquisa.md` na pasta de cada extra (fontes, fichas, analogia aprovada, candidatos que ele levantou) | foi proposto junto com a lista única; ele aprovou a lista e não disse nada sobre este | 🟠 |

## O plano da sequência

1. **Extra O Eletroímã** em Do Ábaco à IA, como EX-19. ⏳ Em andamento: pesquisa feita, esperando as decisões 1 e 2 pra escrever o roteiro.
2. **Consertar o NotebookLM no Edge.** O disparo do áudio da etapa 1 falhou na sessão anterior (ver seção "Etapa 2").
3. **Gerar o áudio do extra**, com o agente `podcast-verificador` antes.
4. **Trio da etapa 1 do Hardware:** acrescentar a chamada "tem um extra: O Eletroímã" na parte do relé (e no `Overview.txt`), verificar de novo e gerar o áudio. O trio está em `C:\src\PROJETOS\SEIRES\HARDWARE\01 - O cérebro e os sentidos\00 - A etapa inteira\` (trio e m4a antigos em `_v1\`). Hoje a parte do relé chama *O relé* ("ainda vai sair, na serie Do Abaco a IA"), linha `CHAMADA DE EXTRA` do `_NotebookLM_O Cerebro e os Sentidos.txt`.
5. **O Flávio ouve os dois.**
6. **Deploy só com OK dele:** página `site/etapas/hardware-01.html` + áudio da etapa 1 (+ o extra, se ele quiser). Ver seção "Deploy".

## O formato do EX-19 (proposto, sem confirmação dele)

- Pasta `_EXTRAS\19 - O Eletroima\`, prompt `EX-19-O Eletroima.txt`. Os números 11 a 18 estão reservados pros oito extras da etapa 8.
- **Só áudio**, com o trio do EX-02 como molde: `_EXTRAS\02 - Por que o Ima Gruda\` (`_NotebookLM_Por que o Ima Gruda.txt`, `EX-02-Por que o Ima Gruda.txt`, `Overview.txt`). ⚠️ O roteiro do 02 tem blocos `TELA n` (8 telas), mas no site ele é só áudio. Decidir se o 19 escreve por tela ou em partes.
- **REGRA DURA nº 1 (sem pessoa, sem data) NÃO vale mais** pros extras novos (D10, memória `feedback_serie_extra_diz_quem_descobriu`): o extra conta o mecanismo **e** quem descobriu, com a ficha em voz alta e fonte primária antes de gravar.
- **REGRA DURA nº 2 continua:** não citar série, etapa, episódio vizinho nem outro extra. Nada de "como a gente viu".
- **Uma analogia só** declarada no roteiro, mais uma parte final "onde a analogia quebra".
- **Não repetir a trilha** (memória `feedback_serie_trilha_conta_historia_extra_leva_mecanismo`): o ep 04.03 *A agulha que se mexeu* conta a história; o extra desce no mecanismo e usa as pessoas pra dizer quem achou cada pedaço dele.
- O `_arquivos\_molde-roteiro.txt` também pede **levantar filme e documentário** do assunto. Isso **não foi feito** pro Eletroímã.
- O bloco de linguagem proibida, sem acento e sem travessão, é literal (copiar do molde).

## A analogia (as duas opções, como foram levadas)

**A (recomendada): as agulhinhas de bússola**, a mesma imagem do EX-02, continuada. O EX-02 deixou o eletroímã de fora de propósito (REGRA DURA nº 3 dele: "ima feito passando eletricidade num fio fica de fora"), então o 19 fecha esse buraco, e quem ouvir os dois reconhece a imagem sem um citar o outro. Pareamento proposto:
- o fio com corrente é **a mão que vira as agulhinhas**;
- cada volta do fio é **mais uma mão**;
- **ferro doce**: as agulhinhas se bagunçam quando a mão sai, e o eletroímã solta a carga;
- **aço**: as agulhinhas ficam viradas, e ele vira ímã permanente (é o achado do Arago);
- **todas já viradas**: a força para de crescer (saturação).
- Onde quebra: a escrever no roteiro (não existe mão nem agulha; as agulhinhas se organizam em "bairros", como o EX-02 já diz; o fio esquenta).

**B: o capinzal e o vento.** Imagem nova, mais visual, mas é o mesmo mecanismo com outra figura.

## Quem descobriu: pesquisa de 14/09

Ørsted (1820, a agulha que vira perto do fio) e Ampère (a bobina) já estão na trilha, no 04.03. Os achados que explicam o **mecanismo** do eletroímã:

- **Arago, 1820.** Comunicou o achado do Ørsted à Academia de Ciências de Paris em 4 de setembro de 1820 e repetiu a experiência em 11 de setembro. Publicou *Expériences relatives à l'aimantation du fer et de l'acier par l'action du courant voltaïque*, Annales de chimie et de physique, vol. 15, p. 93-102. O que ele viu: um fio fino de cobre ligado à pilha atrai limalha de ferro em volta dele inteiro, e a limalha cai quando a corrente para. Com o Ampère, enrolou o fio em hélice com uma agulha de aço dentro, embrulhada em papel, e a agulha saiu imantada. Conclusão dele: o fio dá ao **ferro doce só uma imantação momentânea**, e **pedaços de aço às vezes ficam imantados de vez**. Fonte primária lida: a tradução comentada do artigo, na SciELO.
- **Davy, 1820.** Achou a mesma coisa sozinho, na Inglaterra: carta lida na Royal Society em 16 de novembro de 1820, publicada no Annals of Philosophy em agosto de 1821. Aparece de passagem, sem ficha.
- **Sturgeon, 1825.** Ferradura de ferro doce **envernizada** (o verniz isola, porque o fio era nu), **18 voltas** de fio de cobre sem isolamento, uma única célula de pilha. Pesava **7 onças (uns 200 g)** e segurava **9 libras (uns 4 kg)**, cerca de 20 vezes o próprio peso. Ganhou a grande medalha de prata da Society of Arts em 1825 e 30 guinéus; a descrição saiu nas *Transactions of the Society ... for the Encouragement of Arts*, vol. 43, prancha 3, 1825. Motivo, pelo relato dele (via Dew-Hughes): não tinha dinheiro pra muitas células de pilha, então resolveu aumentar o campo em vez da corrente.
- **Joseph Henry, 1831.** Artigo *On the Application of the Principle of the Galvanic Multiplier to Electro-Magnetic Apparatus, and Also to the Development of Great Magnetic Power in Soft Iron, with a Small Galvanic Element*, American Journal of Science (o "Silliman's Journal"), vol. XIX, janeiro de 1831, p. 400-408. **Fio isolado** (com seda; não existia fio isolado à venda), muitas voltas coladas e em camadas. O ímã de Albany: ferradura de ferro doce com **21 libras (9,5 kg)**, 540 pés de fio de campainha em **9 bobinas de 60 pés**. Com uma bobina levantou 7 lb; com duas, 145 a 200 lb; com as nove, **650 lb (295 kg)**; com uma pilha maior, **750 lb (340 kg)**. Frase dele: pesa 21 libras e levanta mais de 35 vezes o próprio peso, "provavelmente o ímã mais poderoso já construído". Depois, o **ímã de Yale**, pronto em abril de 1831, pro Benjamin Silliman: núcleo de 59,5 lb (27 kg), segurou **2.063 lb (936 kg)**, recorde na época. O 04.03 diz "chegaram a uma tonelada", o que bate. Achado do mesmo artigo: bobinas em paralelo pra pilha de um par só (o 04.03 já conta que a bobina precisa combinar com a pilha).
- **Gerrit Moll** (Utrecht) melhorou o ímã do Sturgeon em 1830 (até 38 kg), com pilhas grandes; o Henry insistiu na pilha pequena. Fica de passagem ou fora.

### Fichas (rascunho, pra conferir antes de gravar)

Regras da ficha (memórias `feedback_serie_ficha_destino_do_trabalho` e `feedback_serie_ficha_so_ano_da_morte`): onde nasceu com o nome do lugar **na época e hoje**; família e ofício do pai; onde estudou; o **destino do trabalho**; da morte, **só o ano**, sem causa.

- **François Arago:** nasceu em 26/02/1786 em Estagel, vila perto de Perpignan, no departamento dos Pirineus Orientais, França. Pai tesoureiro da Casa da Moeda (Wikipédia, A CONFIRMAR), mais velho de seis irmãos. Entrou na Escola Politécnica de Paris no fim de 1803. Diretor do Observatório de Paris a partir de 1830 (Wikipédia); ministro na revolução de 1848, ajudou a abolir a escravidão nas colônias francesas. Morreu em 1853, em Paris. Destino do trabalho em 1853: A CONFIRMAR se ainda dirigia o Observatório.
- **William Sturgeon:** nasceu em 22/05/1783 em Whittington, Lancashire, Inglaterra (chalé que existe até hoje, Croft House, com placa azul). Pai John, sapateiro com fama de caçador ilegal de salmão; mãe morreu quando ele tinha 10 anos. Aprendiz de sapateiro aos 13. Milícia de Westmorland em 1802, Artilharia Real de 1804 a 1820, sem ir à guerra; no quartel aprendeu sozinho a ler e escrever, matemática, línguas e ciência natural. Sem escola: autodidata. Professor no seminário militar da Companhia das Índias Orientais, em Addiscombe, desde o fim de 1824. Depois: motor elétrico rotativo (1832), fundou a revista *Annals of Electricity* (1836), dirigiu a Royal Victoria Gallery em Manchester (1840-1842). Morreu em 1850, em Prestwich, perto de Manchester. Destino do trabalho: pobre, dando palestra de vila em vila, com pensão de 50 libras desde 1849; tinha acabado de publicar a obra reunida, *Scientific Researches* (1850). Nunca foi aceito pela elite científica e não patenteou o eletroímã.
- **Joseph Henry:** nasceu em 17/12/1797 em Albany, Nova York, Estados Unidos (há indício da família de que foi em 1799). Pais pobres; o pai, William, trabalhava por dia nos barcos do rio Hudson e morreu em 1811. Aos 7 anos foi morar com a avó em Galway, Nova York. Aos 13, aprendiz de relojoeiro e prateiro; quase virou ator. Entrou na Albany Academy em 1819, sem pagar, sustentando-se com aulas particulares; virou professor de matemática e filosofia natural lá em 1826. Princeton (College of New Jersey) de 1832 a 1846. Primeiro secretário do Smithsonian, escolhido em 1846. Morreu em 1878, **ainda secretário do Smithsonian** (confirmado). A unidade de indutância, o henry, leva o nome dele.

### Dúvidas a fechar antes de gravar

- As *Transactions* de 1825 (vol. 43) **não foram lidas direto**; os números do Sturgeon vêm de quem cita (Britannica, Linda Hall, Dew-Hughes).
- O Dew-Hughes diz que o primeiro núcleo de ferro é de **1823** (com Francis Watkins, 16 voltas, 9 lb, 20 vezes o peso) e que a exibição premiada é de 1825. O 04.03 diz 1825 e 18 voltas.
- Henry: nascimento em 1797 (Smithsonian) ou 1799. A página do Smithsonian deu 403 no WebFetch; os dados da ficha dele vieram da Wikipédia e do Famous Scientists.
- Arago: ofício do pai e destino do trabalho em 1853.

### Fontes

- Arago 1820, tradução comentada (SciELO): https://www.scielo.br/j/rbef/a/w6CgmXh3r95PLRTcMTZQm8b/?format=html&lang=pt
- Referência do artigo do Arago (site Ampère, CNRS): http://www.ampere.cnrs.fr/ice/ice_page_detail.php?lang=fr&type=role&bdd=koyre_ampere&table=ampere_text&bookId=4&typeofbookDes=Textessci&pageOrder=1&facsimile=off&search=no
- Ímã de Albany, com o texto do Henry (Joseph Henry Project, Princeton): https://commons.princeton.edu/josephhenry/albany-electromagnet/
- Ímã de Yale: https://commons.princeton.edu/josephhenry/joseph-henry/yale-electromagnet/
- Dew-Hughes, *William Sturgeon: Father of the Electric Motor* (PDF): https://lahs.archaeologyuk.org/Contrebis/27_11_Dew-Hughes.pdf
- Britannica, Sturgeon: https://www.britannica.com/biography/William-Sturgeon
- Linda Hall, Sturgeon: https://www.lindahall.org/about/news/scientist-of-the-day/william-sturgeon/
- Smithsonian, vida do Henry: https://siarchives.si.edu/history/featured-topics/henry/joseph-henrys-life
- Wikipédia, Henry: https://en.wikipedia.org/wiki/Joseph_Henry
- Famous Scientists, Henry (pai e Galway): https://www.famousscientists.org/joseph-henry-2/
- Wikipédia, Arago: https://en.wikipedia.org/wiki/François_Arago
- Britannica 1911, Davy e Arago: https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Electromagnetism
- Gerrit Moll (Wikipédia): https://en.wikipedia.org/wiki/Gerrit_Moll

### O que o ep 04.03 já conta (não repetir como cena)

Pasta `04 - Domesticando o raio\03 - A agulha que se mexeu\`, tela 6 do `_NotebookLM_A Agulha Que Se Mexeu.txt`: 1825, Sturgeon "professor sem formacao formal, ex-soldado e ex-sapateiro"; ferradura envernizada, 18 voltas, 200 g levantando 4 kg, vinte vezes o peso; o ferro no meio multiplica; o ímã comum está sempre ligado e o eletroímã só enquanto passa corrente; força sob comando a distância; o Henry com fio isolado com seda, centenas de voltas, centenas de quilos até uma tonelada, e a bobina que combina com a pilha. Analogias autorizadas lá: círculos de água em volta da pedra no lago e voltas como empurrões somados. O áudio é "Como a eletricidade ganhou músculos".

## Candidatos levantados pelo Eletroímã (decisão 2)

Já estão na lista única, de 93 a 96, como "levantado em 14/09, esperando o Flávio escolher":

| # | Extra | Tipo |
|---|---|---|
| 93 | Joseph Henry e a autoindução (a unidade henry) | figura |
| 94 | O motor elétrico do Sturgeon (1832) | peça e figura |
| 95 | A campainha e o alto-falante: o eletroímã que vibra | peça |
| 96 | O eletroímã gigante: ferro-velho e ressonância magnética | peça |

O próprio Eletroímã é o 92 ("em produção, vai ser o EX-19").

## A lista única de candidatos (feita e aprovada em 14/09)

Pedido dele: "extra levantar mais coisa não me incomoda, desde que esteja bem organizado". O que foi feito, com o "sim" dele:

- **Arquivo novo** `C:\src\PROJETOS\SEIRES\plano\candidatos-a-extra.md`, com 96 candidatos de todas as séries e colunas `# · Extra · Tipo · Série · Nasceu de · Situação`. Os 85 da seção `_EXTRAS` do plano de Do Ábaco à IA foram copiados por script, sem redigitar e com o mesmo número; a coluna antiga "Gancho na etapa" virou "Nasceu de". Do 86 ao 91 estão os extras planejados do Hardware; do 92 ao 96, o Eletroímã e os que ele levantou. Os oito da etapa 8 (46 a 53) ganharam na Situação o número EX reservado no hub (46=EX-11, 49=EX-12, 47=EX-13, 48=EX-14, 50=EX-15, 51=EX-16, 52=EX-17, 53=EX-18, conferido em `site/extras/index.html`).
- **Regras escritas no topo do arquivo:** levantar é livre desde que entre ali; o **# nunca muda** (é citado em plano e handoff); **número EX só quando vira pasta** (o candidato 18 é *O relé*, o EX-18 é o Tim Berners-Lee); "Nasceu de" do 1 ao 45 segue a espinha de 7 etapas de 03/09; **as pastas continuam no plano de cada série** (a lista é a fila, não o acervo).
- **Plano de Do Ábaco à IA:** a tabela de candidatos saiu da seção `_EXTRAS` e virou um parágrafo apontando pro arquivo; a regra "Os extras possíveis se levantam JUNTO com o roteiro" e a linha "Regra que vale pra todos" agora apontam pro arquivo novo.
- **Plano do Hardware:** a tabela `_EXTRAS` (pastas 01 a 06) **ficou**, porque é tabela de pastas reservadas; ela também entrou na lista (86 a 91), e a nota da linha 148 aponta pro arquivo novo.
- **Gerador** `PROJETOS\_plano-html\gerar-plano-serie.py`: **não foi mexido.** Ele lê as linhas com pasta entre crases (`` `01` ``) como episódios e o resto como texto. Testado só lendo, sem gravar HTML: os dois planos continuam sendo lidos (Do Ábaco: 12 etapas e 10 pastas de extra; Hardware: 5 etapas e 6 pastas). Na próxima vez que o HTML for gerado, a tabela de candidatos some do `extras.html`, a não ser que o gerador aprenda a ler o arquivo novo (ideia não aprovada).
- Memória `feedback_serie_levantar_extras_no_roteiro` atualizada com o endereço novo e com "extra também levanta extra".

## Etapa 2: o NotebookLM no Edge

- ⚠️ **Receita nova (14/09, outra sessão):** `C:\src\PROJETOS\SEIRES\HARDWARE\plano\_COMO-FAZER.md`. A receita 7 (gerar, esperar e baixar) e a pegadinha "Criar novo" da seção 9 mandam **usar o outro perfil, o Chrome (`profile`)**, enquanto o Edge estiver deslogado (`passo-erro.png` mostra "Escolha uma conta"). Logar de novo (`node login.js`) pede a senha dele. Ler a receita antes de mexer.
- Falha da sessão anterior: `cria-episodio.js` rodado pelo PowerShell com `LAB_CANAL=msedge` e `LAB_PERFIL=profile-edge` deu **timeout esperando o botão "Criar novo"**. Suspeita: login perdido no perfil do Edge. Primeiro passo: ver a tela (foto que o script tira) e, se for sessão, rodar o `login.js`.
- Scripts do lab em `%LOCALAPPDATA%\notebooklm-lab`. Script do lab que fala por CDP roda **pelo PowerShell** (o Bash não alcança 127.0.0.1:9222).
- Pegadinhas já pagas (memória `project_hardware_arduino_esp32`): se o `cria-episodio.js` morrer esperando o textarea com as fontes girando, criar notebook novo com título novo (esperar no mesmo não resolve); o NotebookLM entrega `.m4a`, e o `publica-episodio.sh` só aceita `.mp3` (converter com ffmpeg). O `podcast-publicador` é serial: nunca dois em paralelo.

## Deploy (etapa 6, só com OK dele)

- **Jeito oficial desde 14/09:** receita 8 do `HARDWARE\plano\_COMO-FAZER.md` (`inventario-site.sh`, `revisa-diferencas.sh`, `sobe-arquivos.sh` com os caminhos relativos à raiz do SEIRES, depois os `qa-*.js` apontando pro ar). O tar manual abaixo é o plano B.
- `site/etapas/hardware-01.html` está com **título e resumo novos só no local**; o `src` e a duração do áudio ainda apontam pro áudio antigo, que foi pro `_v1\`. Trocar quando o áudio novo existir.
- Caminho: empacotar com o `tar` do PowerShell (mantém os acentos dos nomes), `scp` do `.tgz` pro servidor afx e `tar xzf` dentro de `~/serie`. No Bash, o `-f` do tar não pode ter `C:` no caminho (vira host remoto; usar `/c/...`). Depois, **conferir o que subiu** no ar (página 200, áudio 206).
- Site no ar: `https://series.afx.art.br/site/etapas/hardware-01.html`.

## Estado dos arquivos

Nada desta sequência foi commitado. O SEIRES é repo próprio (`git@github.com:flaviovmix/SERIES.git`); commit só a pedido.

- Novo: `SEIRES\plano\candidatos-a-extra.md`; este handoff.
- Mudados nesta sessão: `Como Reinventar o Computador do Zero\plano\plano-da-serie.md` (seção `_EXTRAS` e a regra de levantar extras) e `HARDWARE\plano\serie\plano-da-serie.md` (linha 148).
- Da sessão anterior, ainda locais: o trio novo da etapa 1 do Hardware, `site/etapas/hardware-01.html`, D9 e D10 nos planos.
- Scripts desta sessão no scratchpad (`move-candidatos.py`, `testa-gerador.py`): descartáveis, já rodaram.

## Ler antes de escrever o roteiro

- Este handoff inteiro.
- Os dois `plano-da-serie.md`: seção `_EXTRAS` e "Regras da série" do de Do Ábaco à IA; D9 e D10 do Hardware.
- `C:\src\PROJETOS\SEIRES\plano\candidatos-a-extra.md`.
- `Como Reinventar o Computador do Zero\_arquivos\_molde-roteiro.txt`.
- O trio do EX-02 (Por que o Ímã Gruda) como molde de extra.
- Skill `documentacao:criar-podcast` e o agente `.claude/agents/podcast-verificador.md` (ele reprova travessão, acento na linha "Inicie dizendo", duração cravada e analogia não declarada).
- Memórias `feedback_serie_*`: ficha (destino do trabalho, só o ano da morte), extra diz quem descobriu, trilha conta história e extra leva mecanismo, levantar extras, áudio chama os extras, filmes do assunto.

# Como fazer: o estudo de hardware e a série Hardware

Este arquivo existe pra qualquer sessão repetir o que foi feito entre 10 e 14/09/2026 sem depender de conversa nenhuma. Leia ele primeiro e depois o plano da vez. O estado vivo mora nos dois planos (seção 2); a seção 10 é só a foto do dia 14/09.

---

## 1. Duas trilhas que nunca se misturam

| | Estudo (privado) | Série Hardware (pública) |
|---|---|---|
| O que é | O Flávio estudando Arduino e ESP32 com um material pago | Episódios nossos em series.afx.art.br |
| Fonte | `HARDWARE\PDF\` (material pago, fora do git) | Assunto de domínio público e o que ele já estudou |
| Plano | `HARDWARE\plano\md\plano.md` + `etapas\` | `HARDWARE\plano\serie\plano-da-serie.md` |
| Áudio | Trio em `C:\src\PODCAST\<Nome>\`, publicado no acervo do Nexus | Trio em `HARDWARE\NN - Etapa\NN - Episódio\`, publicado no site |
| Pode falar em | aula, exercício, material | nada disso (D7 da série) |

**Regra que não se negocia:** nenhum texto, exercício, imagem, sequência de aula ou nome do material pago vai pra série. Até o jeito de falar denuncia ("o material pede", "aula número tal", "preencha a tabela"). O plano de estudo também não cita a origem do material (D6 do plano de estudo): quem liga cada aula ao arquivo é o `HARDWARE\PDF\_mapa.md`, que fica fora do git. Memória: `feedback_serie_sem_indicio_do_material`.

---

## 2. Onde mora cada coisa

- **Material pago:** `C:\src\PROJETOS\SEIRES\HARDWARE\PDF\` (`MODULO 1` a `MODULO 5` e `MODULO BONUS`). O texto extraído fica em `PDF\_texto\` e o mapa aula → arquivo em `PDF\_mapa.md`. A pasta `HARDWARE/PDF/` está no `.gitignore` do SEIRES.
- **Plano de estudo:** `HARDWARE\plano\md\` (aulas 1 a 28, etapas 0 a 6, decisões D1 a D7, pendências P1 a P7). Regerar o HTML com `python C:\src\PROJETOS\_plano-html\gerar-plano.py "C:\src\PROJETOS\SEIRES\HARDWARE\plano\md"`. O `/gerar-html-do-plano` pelo nome não acha, porque o HARDWARE mora dentro do SEIRES.
- **Plano da série:** `HARDWARE\plano\serie\plano-da-serie.md` (decisões D1 a D10, regras do arco, P4 e P5 abertas). Regerar com `python C:\src\PROJETOS\_plano-html\gerar-plano-serie.py "C:\src\PROJETOS\SEIRES\HARDWARE\plano\serie"`.
- **Episódios públicos:** `HARDWARE\00 - A série inteira\` e `HARDWARE\NN - <Etapa>\00 - A etapa inteira\` (D8). Os episódios numerados `01`, `02`... descem em cada peça depois.
- **Site:** pasta `SEIRES\site\`.
  - `hardware.html` é o hub da série e `etapas\hardware-NN.html` a página de cada etapa.
  - `index.html` tem o card 03, e `js\menu.js` a entrada Hardware.
  - O player é o par `css\audio.css` + `js\audio.js`.
- **Servidor:** alias ssh `server`.
  - O site mora em `~/serie` (container nginx `serie`), atrás de um Caddy que manda `Cache-Control: no-cache` pra HTML, CSS e JS.
  - Endereço: `https://series.afx.art.br/site/...`. O áudio dos episódios fica em `~/serie/HARDWARE/...`.
- **Áudios de estudo publicados:**
  - `C:\src\PODCAST\Arduino e ESP32 A Introducao\` é a faixa 58.
  - `C:\src\PODCAST\Arduino e ESP32 Etapa 1 O Cerebro e os Sentidos\` é a faixa 59.
  - As duas estão no grupo "Hardware" (id 2) do podcast do Nexus.
  - As pastas antigas `Arduino e ESP32 O Mapa do Curso` e `Arduino Primeira Aula O LED que Pisca` citam o curso: ficam só no NotebookLM, nunca publicar.
- **Lab do NotebookLM:** `%LOCALAPPDATA%\notebooklm-lab\`, fora do git.
- **Scripts desta trilha:**
  - No lab: `espera-curto.js`, `para-mp3.js`, `cria-grupo.js`, `roda-cria-grupo.sh`, `completa-audio.js` e `acha-notebook.js`.
  - Em `HARDWARE\_arquivos\scripts\`: `inventario-curso.py`, `verifica-leitura.py`, `onde-video-wdp.py`, `qa-pagina-com-audio.js` e `foto-do-ar.js`.
  - ⚠️ **Deploy e QA do site inteiro (todas as séries):** scripts versionados em `SEIRES\Como Reinventar o Computador do Zero\_arquivos\scripts\` (`inventario-site.sh`, `revisa-diferencas.sh`, `sobe-arquivos.sh`, `qa-player-site.js` e os outros `qa-*.js`), explicados no `LEIA-ME-qa.md` de lá e na memória `reference_serie_site_scripts_deploy_qa`. É por eles que se sobe (receita 8). Os dois `.js` desta pasta só complementam: um confere se o arquivo de áudio existe ou responde, o outro tira foto.

---

## 3. Receita: chegou material novo

1. Rodar `python C:\src\PROJETOS\SEIRES\HARDWARE\_arquivos\scripts\inventario-curso.py`. Ele cria um `.txt` por arquivo em `PDF\_texto\` e imprime o resumo: páginas ou slides, palavras, e quais slides quase não têm texto.
2. **Slide que é só imagem:** rodar `python ...\verifica-leitura.py slide "<caminho do .pptx>" <N>` e abrir as figuras com o Read. **Página de PDF que é só imagem:** `pdftoppm -png -r 70 -f N -l N "<pdf>" "<saída>"` (Poppler instalado) e abrir o PNG.
3. `python ...\verifica-leitura.py formatos` mostra vídeo e imagem que não abrem como foto, e `onde-video-wdp.py` diz em que PPTX estão. Arquivos quase iguais: `python ...\verifica-leitura.py parecidos "a.txt" "b.txt"`. Idênticos: `md5sum`.
4. A máquina não tem PowerPoint, LibreOffice nem KiCad. PPTX é zip: o texto está no XML, na ordem do `presentation.xml`, e as figuras em `ppt/media`. `.kicad_sch` e `.kicad_pcb` são texto. De vídeo, o `ffmpeg` tira quadros.
5. Atualizar o `PDF\_mapa.md` e o plano de estudo (receita 4).

---

## 4. Receita: mexer no plano de estudo

- **Numeração nossa (D6):** aulas de 1 a 28 numa sequência só, na ordem do nosso cronograma. Os exercícios recomeçam do 1 em cada aula e ficam em `exercicios\NN.E - nome\` (NN = aula, E = exercício).
- O plano não cita curso, empresa, instrutor, plataforma nem "módulo". As etapas levam os nomes da série.
- **Kit na bancada, Wokwi do lado (D7):** a aula fecha com o exercício rodando na placa. O Wokwi serve pra testar antes ou pra fazer enquanto a peça não chega.
- Rede elétrica fora (D5): o relé só liga baixa tensão.
- **Decisão é travada:** se a realidade mudar, entra uma D nova com data e a antiga fica registrada como trocada.
- Depois de mexer, regerar o HTML e conferir que a página não rola pro lado.

---

## 5. Receita: áudio de estudo (privado, vai pro Nexus)

1. **Trio:** escrito pelo perfil `podcast-fonte-externa` da base `criar-podcast`, em `C:\src\PODCAST\<Nome>\`.
   - Arquivos: `Overview.txt`, `_NotebookLM_<Nome>.txt` e o prompt `<nome-em-kebab>.txt`.
   - Sem nota no Nexus, o episódio é neutro, sem imagem.
   - Usa a numeração nossa (nunca "1.5"). O prompt proíbe a palavra "curso": o verificador já pegou até "fim de curso".
2. **Verificador:** o agente `podcast-verificador` não aparece na lista de tipos.
   - Chamar um `general-purpose` mandando ler `C:\src\.claude\agents\podcast-verificador.md`, somando os critérios da vez: nada da origem do material, fidelidade ao `PDF\_texto\`, ampliação marcada com "como complemento" e nenhuma resposta de exercício.
   - Pra reauditar, continuar o MESMO agente com SendMessage: a segunda passada leva um minuto.
   - O hook `pair-update` reclama quando o roteiro muda sem o prompt: mexer nos dois juntos.
3. **Gerar, esperar e baixar:** receita 7.
4. **Converter:** `node %LOCALAPPDATA%\notebooklm-lab\para-mp3.js "<pasta>"`. O `publica-episodio.sh` e o `mint-and-publish.js` só aceitam `.mp3`, e o NotebookLM entrega `.m4a`.
5. **Publicar:** chamar o agente `podcast-publicador` em background, com a pasta e a URL. Ele pula a espera e o download quando o `.mp3` já está na pasta. Um publicador de cada vez, nunca dois juntos.
6. **Pôr no grupo:** `bash %LOCALAPPDATA%\notebooklm-lab\roda-cria-grupo.sh "Hardware" "58,59,<id novo>"`. Dá pra repetir sem medo: ele reaproveita o grupo e pula a faixa que já está dentro.

---

## 6. Receita: episódio público da série

1. **Trio na pasta da série**, na voz dela.
   - A caixa d'água atravessa o áudio, sem exercício, sem "material" e sem cara de aula (D7).
   - Episódio da etapa inteira e da série inteira é só áudio (D8): o roteiro não pede pra apertar nada nem manda olhar tela. "Tela" e "página" como assunto podem, e as etapas 3 e 4 precisam.
   - O áudio chama os extras pelo nome (D9), e extra diz quem descobriu (D10).
   - Nome do prompt pelo caminho: `NN-NN-<Nome>.txt`, ou `00-<Nome>.txt` na série inteira. Linha "Inicie dizendo" com prefixo usa separador: `Hardware - A Serie Inteira`.
2. **Verificador** com os critérios da série: D1 a D10, correção técnica e só as analogias declaradas. Mesma reauditoria da receita 5.
3. **Gerar, esperar e baixar:** receita 7. O `.m4a` fica na pasta do episódio, e o site toca `.m4a` direto.
4. **Página:**
   - O bloco `<div class="audio"><audio controls preload="none" src="..."></audio><p class="audio__ficha">...</p></div>` vai no `.head`, logo DEPOIS do `<h1>` (memória `feedback_serie_audio_abaixo_do_titulo`).
   - Carregar `css/audio.css` no head e `js/audio.js` depois do `menu.js`.
   - O `src` é relativo, com espaço como `%20` e acento literal, igual às páginas que já estão no ar.
   - Duração: `ffprobe -v error -show_entries format=duration -of csv=p=0 "<m4a>"` pelo PowerShell, arredondando pro minuto.
5. **Conferir local:** `node C:\src\PROJETOS\SEIRES\HARDWARE\_arquivos\scripts\qa-pagina-com-audio.js "file:///C:/src/PROJETOS/SEIRES/site/<página>"`. Ele diz se o arquivo de áudio existe e se a página rola pro lado em 1366 e em 390.
6. **Conferir o player:** `node "C:\src\PROJETOS\SEIRES\Como Reinventar o Computador do Zero\_arquivos\scripts\qa-player-site.js"` testa o player desenhado nas páginas com áudio, em quatro tamanhos e nos dois temas. Página nova com áudio entra na lista `PAGINAS` dele.
7. **Subir** só com ordem dele (receita 8), e rodar os dois QAs de novo apontando pro ar.

---

## 7. Receita: gerar, esperar e baixar no NotebookLM

Tudo pelo **PowerShell**: nome acentuado passado pelo Bash do Git se perde, e numa sessão o Bash não alcançou a porta 9222.

1. **Antes de cada passo, fechar o browser do lab que sobrou**, filtrando pelo perfil. Nunca matar Chrome ou Edge no atacado, porque ele usa os dois.
   ```powershell
   Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -like '*notebooklm-lab\profile*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
   Remove-Item "$env:LOCALAPPDATA\notebooklm-lab\profile\Singleton*" -Force -ErrorAction SilentlyContinue
   ```
   No Edge, trocar pra `msedge.exe` e `profile-edge`.
2. **Gerar:** `Set-Location "$env:LOCALAPPDATA\notebooklm-lab"; node cria-episodio.js "<pasta do trio>"`.
   - Sem variável ele roda no Chrome. Pro Edge, antes: `$env:LAB_CANAL='msedge'; $env:LAB_PERFIL='profile-edge'`.
   - O script deixa o browser aberto no fim e imprime a URL com `notebook.google.com`, que funciona igual.
3. **Esperar**, em background: `$env:LAB_CANAL='chrome'; $env:LAB_PERFIL='profile'; node espera-curto.js "<url>" 10`. Ele abre, olha e fecha a cada 4 minutos, e sai quando fica pronto.
4. **Baixar:** `node baixa-episodio.js "<url>" "<pasta>"`, que já tem o conserto do título "Não lidos".
   - O `baixa-episodio-cdp.js` só serve quando o Chrome da porta 9222 está aberto por outra sessão, e ele NÃO tem esse conserto.
   - Se o título vier "Não lidos": pegar o nome real na `tela-estudio.png` do lab, renomear o `.m4a` e o `.txt` e corrigir a linha `Titulo:` da ficha.

---

## 8. Receita: subir um pedaço do site

Os scripts ficam em `SEIRES\Como Reinventar o Computador do Zero\_arquivos\scripts\` e rodam pelo Bash. É o jeito oficial desde 14/09/2026, pra todas as séries.

1. **Ver o que difere do ar:** `bash inventario-site.sh`, que compara o md5 de todo html, css e js de `~/serie` com o local.
2. **Olhar as diferenças:** `bash revisa-diferencas.sh`. Pode haver mudança local de outra sessão ainda sem OK dele. `site/index.html` e `site/js/menu.js` são os que mais pegam: nunca subir inteiro sem ver o diff. Se tiver coisa alheia, remendar a cópia do ar só com o que é seu.
3. **Subir só o que é seu:**
   ```bash
   bash sobe-arquivos.sh "HARDWARE/<pasta>/<áudio>.m4a" "site/etapas/hardware-NN.html"
   ```
   Os caminhos são relativos à raiz do SEIRES. Ele faz backup carimbado do que já está no ar (`~/serie-backup-<carimbo>.tgz`), manda por tar em cima do ssh (aguenta espaço, acento e apóstrofo) e confere o md5 local contra o ar. Ordem: áudio, css e js antes do html, pra página no ar nunca apontar pra arquivo que ainda não chegou.
4. **Conferir no ar:**
   - `node qa-player-site.js https://series.afx.art.br/site/` (e os outros `qa-*.js` com `ar` que tocarem no que subiu).
   - `node C:\src\PROJETOS\SEIRES\HARDWARE\_arquivos\scripts\qa-pagina-com-audio.js "<url https da página>"` confirma que o arquivo de áudio responde.

**Se os scripts faltarem**, o jeito manual que funcionou em 11 e 12/09:
- Empacotar pelo PowerShell (`Set-Location C:\src\PROJETOS\SEIRES; tar -czf "$env:TEMP\pedaco.tgz" "<caminhos>"`), porque o `tar` do Windows guarda os acentos.
- Mandar com `scp "/c/Users/ASUS/AppData/Local/Temp/pedaco.tgz" server:'~/pedaco.tgz'`. O caminho tem que começar com `/c/`; com `C:`, vira nome de host.
- Extrair com `ssh server 'cd ~/serie && tar xzf ~/pedaco.tgz && rm ~/pedaco.tgz'`, depois de copiar pra `.bak-AAAAMMDD` o que for sobrescrito.

---

## 9. Pegadinhas: o sinal e a saída

- **`cria-episodio.js` morre em `locator.waitFor` do textarea:** as fontes `.txt` travaram processando. A `passo-5-opcoes-audio.png` mostra as fontes girando e os cartões do Estúdio cinza.
  - Esperar no mesmo notebook não resolve. Copiar o trio pra outra pasta com o prompt renomeado (o título do notebook sai do nome do prompt) e criar de novo.
  - Outra saída: `node completa-audio.js "<pasta>" "<url>"`, que insiste no clique.
  - `node acha-notebook.js "<título>"` acha a URL pelo título.
- **`cria-episodio.js` morre procurando "Criar novo":** o perfil caiu do login, e a `passo-erro.png` mostra "Escolha uma conta". O Edge caiu em 11/09 e caiu de novo em 14/09: foi assim que morreu o disparo do áudio v2 da etapa 1. Usar o outro perfil; logar de novo (`node login.js`) pede a senha dele.
- **O áudio saiu com 1 fonte só** (o Overview travou): é aceitável, porque o roteiro é a fonte principal.
- **`baixa-episodio-cdp.js` dá ECONNREFUSED:** o Chrome da 9222 fechou. Se o perfil estiver livre, usar o `baixa-episodio.js`.
- **A ferramenta Glob não acha arquivo dentro de `SEIRES\HARDWARE\`:** listar com `ls` pelo Bash.
- **`ffprobe` com caminho acentuado pelo Bash dá "No such file":** rodar pelo PowerShell.
- **Texto extraído do material:** a saída do `inventario-curso.py` TEM que ficar em `PDF\_texto\`, fora do git.
- **Nexus de produção sem senha:** `mint-and-publish.js` e `cria-grupo.js` rodam num container descartável dentro do servidor e leem o `app.env` montado read-only. Nada de senha no chat nem no script.

---

## 10. Estado em 14/09/2026 e o que ficou em aberto

- **Estudo:** a aula 1 (O LED que pisca) está em andamento desde 10/09. A P7 (conferir o kit contra a lista de peças) está aberta.
- **Série no ar:**
  - Card 03 da home.
  - `hardware.html` com o áudio da série inteira ("Como as máquinas tomam decisões", 13:36) abaixo do título.
  - `etapas/hardware-01.html` com o áudio da etapa 1.
- **Áudio da etapa 1 sendo refeito (14/09):** ele achou a v1 ("A caixa d'água que virou organismo") história demais e pediu uma visão geral direta.
  - A v1 está guardada em `01 - O cérebro e os sentidos\00 - A etapa inteira\_v1\`.
  - O trio v2 tem 6 chamadas de extras (D9) e foi aprovado pelo verificador.
  - ⚠️ **O áudio v2 AINDA NÃO EXISTE.** O disparo pelo Edge morreu em 14/09 esperando o botão "Criar novo", porque o login caiu.
  - Gerar pelo Chrome (receita 7), trocar `src` e duração na página, ele ouvir, e só então subir.
  - ⚠️ Antes de gerar: a P6 do plano da série manda acrescentar a chamada do extra *O Eletroímã* na parte do relé. Gerado sem ela, regrava.
- **Em aberto na série:**
  - P4: Wokwi embutido na página ou só o link.
  - O extra 03 (O relé por dentro) repete o "O relé" de *Do Ábaco à IA*.
  - O "Por que o Ímã Gruda" não serve pro relé, porque deixa o eletroímã de fora de propósito.
- **Pergunta sem resposta dele:** corrigir `publica-episodio.sh` e `mint-and-publish.js` pra aceitar `.m4a`. Hoje a saída é converter com `para-mp3.js`.
- **Notebook órfão, sem áudio, que dá pra apagar:** `704539e0-ace0-41ca-8bd4-b631cfc11574`.

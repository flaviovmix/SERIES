# Handoff 16/09/2026: o painel das séries passa a morar no servidor

Escrito pela sessão do plano de Finanças, que não executa nada disto. É pra uma sessão própria, na branch `card-componente` do SEIRES, depois que a etapa 6 subir.

## O que o dono decidiu (16/09/2026, em duas frases)

1. "Eu quero que o painel esteja no servidor, mas ativar ou desativar vai ser apenas tornar o painel visível ou não." Ou seja: o painel que liga e desliga série (subetapa 6.10) deixa de ser só local e passa a rodar no servidor; ele aceita porque tudo o que o painel faz é mostrar ou esconder uma série.
2. "1 - validado": ele olhou a etapa 6 no navegador em 16/09/2026 e validou. O 🟠 "falta o dono no navegador" das subetapas 6.9 e 6.10 e da linha da etapa 6 no `plano.md` pode virar ✅ com essa data.

Isso muda duas coisas escritas: a **decisão 11 da etapa 6** ("o painel é local e não publica; painel online, com login, é outro projeto") e a frase do `plano.md` "sem backend, sem banco, sem login". As duas precisam de texto novo, com a data.

## O que já existe (15/09/2026, sem commit)

- `painel/` na raiz do SEIRES: `servidor.js`, `painel.html`, `painel.css`, `painel.js`, `LEIA-ME.md`. Abre com `node painel/servidor.js` em `http://127.0.0.1:8790/`. Escuta só `127.0.0.1`, recusa `Host` estranho, exige `Origin` igual e um token por subida (CSRF), sem npm.
- O estado mora em `site/dados/series.json` (`{ "01": { "ativa": true }, ... }`). O painel grava só esse JSON e roda o `gera-cards.js` (`Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/`), que reescreve a lista `SERIES_ATIVAS` no topo do `site/js/menu.js` e a grade da home. Série desligada some do menu, da home e do "o que vem por aí", e os extras dela somem junto.
- Prova: `qa-painel-series.js` (verde em 15/09). Achados de baixa severidade em aberto: P14 do `plano.md` (token legível por outro processo da mesma máquina, `renameSync` sem nova tentativa no Windows, gerador grava sem temporário).
- Página de série desligada continua abrindo por link direto (P13 do `plano.md`): bloquear é regra no nginx do container `serie`.

## O que falta, na ordem

1. ~~Validar a etapa 6 no navegador~~ feito em 16/09/2026 (item 2 acima). Falta a **ordem de subir** e as 5 fotos sem crédito (P10 do `plano.md`).
2. **Subetapa 4.1: publicar a partir do commit (D5).** O servidor puxa a `main` do repo e copia pro `~/serie` (`publicar.sh`, padrão da skill `publicar-no-servidor`). Sem isso o servidor tem só as páginas prontas, e o painel precisa do `gera-cards.js`, da `MENU` e do `series.json` lá. A 4.1 já estava planejada pra rodar antes do primeiro deploy da etapa 6.
3. **Um container pro painel ao lado do `serie`.** Modelo: o par `acoes` + `acoes-atualiza` do painel de ações (nginx:alpine servindo `ro`, e um `node:24-alpine` com `--user 1001:1001`, `--restart unless-stopped`, na rede `web`). O container do painel roda o `servidor.js` com a pasta do site montada com escrita, e o nginx do `serie` continua servindo só leitura. Decidir o endereço (por exemplo `series.afx.art.br/painel/`) e como o nginx encaminha pro container.
4. **Uma porta com chave.** O `servidor.js` hoje recusa tudo que não vem de `127.0.0.1`; dentro do container ele passa a receber do nginx, então a checagem de `Host` e `Origin` precisa aceitar o endereço público. Na frente, senha do nginx (`auth_basic`, o mais simples) ou login próprio. **Sem senha, qualquer pessoa que achar o endereço liga e desliga série. Esconder o endereço não protege.** Pedir a decisão do dono: senha do nginx ou login.
5. **O que "desligar" faz no servidor.** Manter como está (a página some do menu, mas abre por link direto) ou fechar a P13 com a regra no nginx que devolve 404 pra série desligada. Decisão do dono.
6. **Atualizar os textos:** decisão 11 da etapa 6 (`plano/etapas/06-card-componente.md`), a frase "sem backend, sem banco, sem login" do `plano/plano.md`, o `painel/LEIA-ME.md` ("não atende ninguém de fora desta máquina" deixa de valer) e regerar o HTML do plano.

## Cuidados

- Git sempre com `git -C C:\src\PROJETOS\SEIRES`, comandos simples e separados. Nada de commit, merge ou deploy sem ordem do dono (D5: a `main` só recebe merge por ordem dele, e o deploy também).
- `site/_exemplos-card/` não é desta frente: é engano de outra sessão e o `--confere` reprova por causa dela. Apagar só com OK do dono.
- O plano de Finanças (`FINANCAS/plano/serie/plano-da-serie.md`) é de outra sessão. Não mexer.

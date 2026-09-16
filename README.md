# SEIRES

Séries de podcast com animação HTML e modelos 3D, publicadas como **site estático** em
[series.afx.art.br](https://series.afx.art.br). Não tem backend nem banco: o site é
arquivo, e a única porta com chave é o painel que liga e desliga série.

## A raiz

| Pasta | O que é |
|---|---|
| `site/` | O site: páginas, CSS por componente, JS por componente, e a base das animações em `css/animacao` e `js/animacao` |
| `Como Reinventar o Computador do Zero/` | A 1ª série. Roteiros, imagens, animações e os modelos 3D em `_arquivos/modelos-3d/` |
| `JAVA WEB/` | A 2ª série |
| `HARDWARE/` | A 3ª série |
| `painel/` | O painel que liga e desliga série, sem editar código |
| `deploy/` | Só o que sobe pra produção: publicar, rollback, o container do painel, a senha |
| `plano/` | O plano do projeto: os `.md` em `md/`, o HTML gerado em `html/` |
| `modelos/` | Mockups e modelos de tela. Os descartados ficam, como registro |

`GRAVAR-TELA/` é repositório próprio, aninhado aqui. A 4ª série (Finanças) está em
preparação e ainda fora do git.

## Publicar

O site vai ao ar **a partir de um commit da `main`**, nunca da pasta de trabalho:

```bash
ssh servidor 'bash ~/serie-deploy/publicar.sh'             # publica
ssh servidor 'bash ~/serie-deploy/publicar.sh --rollback'  # volta
```

Mídia (mp3, mp4) fica fora do git e sobe à parte. Receita completa, e o porquê de cada
passo, em [deploy/LEIA-ME.md](deploy/LEIA-ME.md).

## Ligar e desligar uma série

Pelo painel, em `series.afx.art.br/painel/`, com senha. A mudança vale na hora, sem
deploy: a série some do menu, da home e do "o que vem por aí". Desligar **tira do
caminho, não tranca a porta**: quem tiver o link direto continua abrindo.

O mesmo painel roda aqui na máquina com `node painel/servidor.js`. Detalhe em
[painel/LEIA-ME.md](painel/LEIA-ME.md).

## Card não se escreve à mão

Toda grade de cards sai do gerador, a partir da árvore `MENU` do `site/js/menu.js` e do
texto em `site/dados/cards.js`:

```bash
node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js"
node "Como Reinventar o Computador do Zero/_arquivos/scripts/gera-cards/gera-cards.js" --confere
```

O `--confere` é trava de deploy: página que não bate com o dado não sobe.

## Provas

Os `qa-*.js` rodam com Playwright e aceitam o argumento `ar` pra testar o site publicado
em vez do local:

```bash
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-cards.js" ar
```

⚠️ **Eles deviam morar numa pasta `qa/` na raiz**, junto com o gerador, e hoje moram
dentro da pasta de conteúdo da 1ª série. É dívida conhecida: mover muda o caminho que os
próprios scripts calculam pra achar a raiz, e o `deploy/publicar.sh` e o container do
painel montam essa pasta pelo caminho atual. Fica pra uma etapa própria.

## O plano

[plano/html/index.html](plano/html/index.html) abre o plano gerado: etapas com status,
decisões `D*` e pendências `P*`. Nada ali se escreve à mão, tudo sai dos `.md` de
`plano/md/`:

```bash
python C:\src\PROJETOS\_plano-html\gerar-plano.py "C:\src\PROJETOS\SEIRES\plano\md"
```

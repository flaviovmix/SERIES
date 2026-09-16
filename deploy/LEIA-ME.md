# Deploy do site das séries

Tudo que põe o site no ar mora aqui. O que mede e confere (os `qa-*.js`) mora em
`Como Reinventar o Computador do Zero/_arquivos/scripts/`: deploy é o que sobe, QA é o
que mede.

| Arquivo | O que faz |
|---|---|
| `publicar.sh` | Põe no ar o commit da `main`. É o caminho normal desde 16/09/2026 (D5). |
| `painel-no-servidor.sh` | Cria ou recria o container do painel das séries na VM. |

## Publicar

```bash
ssh servidor 'bash ~/serie-deploy/publicar.sh'
```

A porta de entrada `~/serie-deploy/publicar.sh` no servidor tem 5 linhas: puxa a `main` no
clone `~/serie-src` e chama o `deploy/publicar.sh` versionado. São dois arquivos de
propósito, porque o bash lê o script conforme executa e um script que se atualiza no meio
da própria execução roda linhas trocadas.

Ordem, e o motivo de cada passo:

| Passo | Por quê |
|---|---|
| confere a branch | o clone publica a branch em que ele está, e faz isso calado |
| `gera-cards.js --confere` em container | a trava da D4: card não se escreve à mão. A VM não tem node |
| backup do que vai ser sobrescrito | só os arquivos versionados das pastas do site (~7 MB), não a pasta inteira (1,2 GB de mp3 e mp4 que o deploy nem toca) |
| guarda o `series.json` do servidor | quem manda em ligado/desligado é o painel, não o commit |
| copia por cima, sem apagar | mp3, mp4 e o `index.html` da raiz só existem no servidor |
| confere arquivo por arquivo | o commit chegou inteiro, antes de o painel opinar |
| devolve o estado do painel e regera | o menu e a home voltam a combinar com o que está ligado |
| confere 200 no endereço público | pega 502 e página quebrada antes de você |

**O que sobe:** só as pastas de `PASTAS_DO_SITE` (`site/`, e as três séries), menos o que
é material de origem. A regra em uma frase: de `_arquivos` só sai `modelos-3d`; `plano` e
`PDF` nunca saem. Quem decide é a função `ehDoSite`, e a mesma lista guarda o backup,
copia e confere — não existe uma regra do que sobe e outra do que é conferido.

**Rollback:**

```bash
ssh servidor 'bash ~/serie-deploy/publicar.sh --rollback'
```

Volta o backup mais novo por cima. Desfaz todo arquivo que o deploy **mudou**; não apaga
arquivo que ele criou do zero (esse não estava no backup).

**Mídia** (mp3, mp4) está fora do git pelo `.gitignore` e continua subindo pelo
`sobe-arquivos.sh`, que deixou de ser o caminho normal e virou o de mídia e de emergência.

## O painel no servidor

```bash
ssh servidor 'bash ~/serie-src/deploy/painel-no-servidor.sh'
```

Roda de novo depois de mudar o código do painel (o container lê o clone, então precisa de
`git pull` no `~/serie-src` antes — o `publicar.sh` já faz isso).

A montagem, em uma figura: o container vê **uma raiz só**, `/raiz`, feita de três pedaços.

```
/raiz                           = ~/serie                    (o site publicado, com escrita)
/raiz/painel                    = ~/serie-src/painel          (só leitura)
/raiz/.../_arquivos/scripts     = ~/serie-src/.../scripts     (só leitura)
```

O gerador descobre a raiz do projeto contando pastas a partir de onde ele mesmo está. Se
rodasse de dentro do clone, escreveria as páginas no clone, não na pasta que o nginx
serve. Emprestado pra dentro de `~/serie`, ele acha tudo onde espera, sem uma linha de
código sabendo que está num container. E o código fica só-leitura: o painel não consegue
alterar o próprio programa.

**Quem protege.** Dentro do container o painel escuta `0.0.0.0`, senão o Caddy não
alcança, e ele não tem porta publicada: só a rede interna do docker. Na frente, o Caddy
pede senha em `series.afx.art.br/painel/`. Sem senha, qualquer um que achasse o endereço
ligaria e desligaria série; esconder o endereço não protege.

O bloco do Caddy fica em `~/caddy/Caddyfile`, dentro de `series.afx.art.br`. ⚠️ O
Caddyfile é bind-mount de **arquivo**: `sed -i` troca o inode e o container continua lendo
o arquivo velho, com o reload respondendo "config is unchanged". Editar com `tee` ou `>>`,
validar e recarregar.

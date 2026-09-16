# Painel das séries

Liga e desliga uma série do site sem editar código. Série desligada some do menu (nas
páginas do site e nas animações), da home e do "o que vem por aí", e os extras dela somem
junto.

Ele roda em dois lugares, com o **mesmo código**. Quem decide onde são três variáveis de
ambiente, e a tarja de cima da página diz qual dos dois você está olhando.

| Onde | Como abre | O que um clique faz |
|---|---|---|
| Na sua máquina | `node painel/servidor.js` → `http://127.0.0.1:8790/` | muda os arquivos daqui. Pro ar, só com deploy |
| No servidor | `https://series.afx.art.br/painel/`, com senha | **vale na hora** pra quem abrir o site |

## Abrir aqui

Na raiz do SEIRES:

```bash
node painel/servidor.js
```

Pra outra porta: `PAINEL_PORTA=8800 node painel/servidor.js`. Ctrl+C fecha.

## O que ele faz

1. Mostra as séries da MENU (`site/js/menu.js`), com uma chave pra cada uma.
2. **Salvar e gerar** grava o `site/dados/series.json` e roda o `gera-cards.js`, que
   reescreve a lista do topo do `menu.js` e a grade da home.
3. Mostra os arquivos que mudaram e, na máquina do dono, o comando de subir.

## O que ele NÃO faz

- **Não tranca a porta.** Desligar tira a série do caminho: ela some do menu e da home.
  A página dela continua abrindo por link direto, porque o site é estático. Bloquear de
  verdade exigiria o painel recarregar o proxy, e isso é privilégio demais pra um botão
  que só mostra e esconde (P13, decidida em 16/09/2026).
- **Não edita texto.** O texto dos cards mora no `site/dados/cards.js`.
- **Não publica página nenhuma.** Página nova vai ao ar por `deploy/publicar.sh`.

## Por que dá pra deixar ligado

- Na sua máquina ele escuta só `127.0.0.1`: ninguém da rede alcança.
- No servidor ele escuta dentro do container, **sem porta publicada**: só a rede interna
  do docker chega nele, e na frente o Caddy pede senha. Sem senha, qualquer um que achasse
  o endereço ligaria e desligaria série; esconder o endereço não protege.
- Pedido com `Host` que não seja um dos endereços conhecidos volta recusado. É o que
  impede um site qualquer aberto no navegador de falar com o painel trocando o DNS
  (DNS rebinding).
- Gravar exige a `Origin` do próprio painel e um token novo a cada vez que ele sobe
  (proteção contra CSRF), comparado em tempo constante.
- O pedido é conferido antes de qualquer coisa: até 4 KB, JSON, só série que existe na
  MENU e só `true` ou `false`.
- O gerador roda com caminho fixo, sem shell e sem nada vindo do pedido.
- O JSON é gravado num temporário e renomeado, então nunca fica pela metade. Se o gerador
  recusar, o JSON volta ao que era.
- No servidor, o código do painel e o do gerador estão montados **só-leitura**: o painel
  não consegue alterar o próprio programa.
- Sem npm: só o que vem no próprio node.

## As três variáveis

| Variável | Vazia (o padrão) | No servidor |
|---|---|---|
| `PAINEL_ESCUTA` | `127.0.0.1` | `0.0.0.0`, senão o Caddy não alcança |
| `PAINEL_PORTA` | `8790` | `8790` |
| `PAINEL_ENDERECO` | vazio: só a máquina local | `series.afx.art.br` |

## A prova

```bash
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-painel-series.js"
```

Sobe o painel numa porta de teste e confere as recusas (sem token, token errado, Origin
estranha, Host estranho, série inventada, valor que não é booleano, JSON quebrado, corpo
gigante), o caminho certo (desligar e religar a série 03), a página no navegador, e que
nada responde fora do `127.0.0.1`. Os arquivos do site voltam ao que eram no fim.

⚠️ O caminho certo só passa se o `gera-cards.js` estiver verde nesta máquina. Enquanto
existir uma pasta de página fora do padrão em `site/` (como a `site/_exemplos-card/` de
16/09/2026), o gerador reprova, o painel devolve erro e o teste acusa 5 falhas — todas
essa mesma causa. No servidor isso não acontece: lá só existe o que foi commitado.

## No servidor

Criar ou recriar o container, e a figura da montagem: `deploy/LEIA-ME.md`.

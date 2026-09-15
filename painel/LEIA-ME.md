# Painel das séries

Liga e desliga uma série do site sem editar código (subetapa 6.10 da Etapa 6 do plano do SEIRES). Série desligada some do menu (nas páginas do site e nas animações), da home e do "o que vem por aí", e os extras dela somem junto.

## Abrir

Na raiz do SEIRES:

```bash
node painel/servidor.js
```

Depois abrir `http://127.0.0.1:8790/` no navegador. Pra outra porta: `PAINEL_PORTA=8800 node painel/servidor.js`. Ctrl+C no terminal fecha.

## O que ele faz

1. Mostra as séries da MENU (`site/js/menu.js`), com uma chave pra cada uma.
2. **Salvar e gerar** grava o `site/dados/series.json` e roda o `gera-cards.js`. O gerador reescreve a lista do topo do `menu.js` e a grade da home.
3. Mostra os arquivos que mudaram e o comando do `sobe-arquivos.sh` pronto pra copiar.

## O que ele NÃO faz

- **Não publica.** Subir pro ar continua sendo por ordem sua (Etapa 4 do plano).
- **Não bloqueia link.** A página de uma série desligada continua abrindo por link direto: o site é estático, e bloquear de verdade é uma regra no nginx do container `serie` (pendência P13).
- **Não edita texto.** O texto dos cards mora no `site/dados/cards.js`.
- **Não atende ninguém de fora desta máquina.**

## Por que dá pra deixar aberto

- Escuta só em `127.0.0.1`: ninguém da rede alcança.
- Pedido com `Host` que não seja `127.0.0.1:<porta>` ou `localhost:<porta>` volta recusado. É o que impede um site qualquer aberto no navegador de falar com o painel trocando o DNS (DNS rebinding).
- Gravar exige a `Origin` do próprio painel e um token novo a cada vez que o servidor sobe (proteção contra CSRF).
- O pedido é conferido antes de qualquer coisa: até 4 KB, JSON, só série que existe na MENU e só `true` ou `false`.
- O gerador roda com caminho fixo, sem shell e sem nada vindo do pedido.
- O JSON é gravado num arquivo temporário e renomeado, então nunca fica pela metade. Se o gerador recusar, o JSON volta ao que era.
- Sem npm: só o que vem no próprio node.

## A prova

```bash
node "Como Reinventar o Computador do Zero/_arquivos/scripts/qa-painel-series.js"
```

Sobe o painel numa porta de teste e confere as recusas (sem token, token errado, Origin estranha, Host estranho, série inventada, valor que não é booleano, JSON quebrado, corpo gigante), o caminho certo (desligar e religar a série 03), a página no navegador, e que nada responde fora do `127.0.0.1`. Os arquivos do site voltam ao que eram no fim.

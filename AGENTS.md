# Continuidade do projeto

A memória de trabalho escolhida pelo usuário fica em `C:\src\.codex\memoria`.
Ao iniciar ou retomar trabalho neste repositório, leia `README.md` e
`preferencias.md` nessa pasta, e o registro `projetos/seires.md` quando o pedido
envolver os modelos 3D ou a recuperação de contexto do projeto.

Consulte esses registros antes de pedir ao usuário que reconte a sessão anterior.
Confira o estado atual no código e no Git; a memória é uma referência datada.
Se a memória central não estiver acessível, informe a limitação e recupere o
contexto pelos registros disponíveis no projeto.

Depois de alterar os modelos, atualize `C:\src\.codex\memoria\projetos\seires.md`
com o que mudou, decisões do usuário, verificações realizadas e pendências reais.
Diferencie trabalho confirmado no histórico, informações dadas pelo usuário e
inferências. O arquivo `plano/memoria-modelos-3d.md` é uma referência para esse
registro central; mantenha o conteúdo detalhado em um só lugar.

Não atribua a autoria de cada arquivo pelo coautor do commit: um commit pode
reunir trabalho de diferentes ferramentas e sessões.

# Episódio novo da série

Vale para qualquer sessão que for criar ou refazer um episódio de "Como Reinventar
o Computador do Zero" (animação e modelo 3D). Escrito em 10/09/2026, atualizado em
11/09/2026.

1. A animação nasce de `Como Reinventar o Computador do Zero/_arquivos/_molde-animacao.html`,
   nunca da cópia de outro episódio. O molde carrega a base do site
   (`site/css/animacao/` e `site/js/animacao/`), que já traz as setas do palco, a
   tela de fim (que leva o áudio pro fim), as fotos da cena em 16:9 com grade de 3,
   4 e 6, o hover dos cartões, o lightbox e o tocador. No desktop (desde 11/09/2026)
   o tocador fica numa faixa compacta logo abaixo da barra de cima, na esquerda, o
   rodapé some, e capa e ficha põem a imagem na esquerda e o texto na direita, com
   a sobra de largura dividida por igual; no telefone ficam o rodapé e o tocador
   embaixo. Não reescrever isso no episódio.
2. Registrar o episódio na árvore de `site/js/menu.js`: sem isso o "voltar" não
   sabe o pai.
3. Arte própria do episódio ao lado do texto (como o "@" do 08-02) não estica:
   `flex: 0 1 <largura da arte>`, nunca `flex: 1 1 auto`, senão a sobra de largura
   não se divide e a arte fica longe do texto no desktop.
4. No hub da série, etapa com um episódio só no ar leva direto pra animação: o botão
   do card aponta pro `animacao.html` e diz "Ver episódio". Quando o segundo episódio
   subir, o botão volta pra página da etapa.
5. Toda tela tem imagem (foto real primeiro; reconstituição só se não existir foto,
   marcada como ilustração) e toda imagem de cena é 16:9. Gerar imagem pelo site do
   Flow não gasta crédito (informado pelo usuário em 10/09/2026); o que gasta é vídeo,
   que é o modo padrão da barra, então conferir que está em Imagem. Regras completas no
   `_arquivos/_molde-roteiro.txt`.
6. Modelo 3D: no telefone em pé a arte deita e os controles vão para um painel
   lateral. Isso não vem da base; em 10/09/2026 só `abaco.html` e
   `abaco-binario.html` tinham. Aplicar `_arquivos/modelos-3d/_padrao-deitado.md` e
   conferir com `_arquivos/modelos-3d/_qa-deitado.js`. Modelos que não usam o
   `_base-modelo-3d` precisam de adaptação.
7. Componente de um episódio que aparecer pela terceira vez vira peça da base.
8. Conferir no telefone (384x686) e no desktop antes de publicar; publicar só com o
   OK do usuário e conferir o que subiu.

O que mudou na base e por quê: `plano/etapas/02-base-da-animacao.md`.

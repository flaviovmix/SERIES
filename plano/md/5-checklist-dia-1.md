# Checklist do dia 1

Marcar tudo isto **antes do próximo episódio**. É a lista do que não fica mais barato depois. Podada do molde em 27/08/2026 para um projeto de conteúdo sem servidor.

- [ ] Decisões `D*` escritas no `plano.md`, a partir da tabela da Etapa 0: o que entra no git, fonte de verdade da animação, onde publica, dado pessoal e licença de imagem, teto de custo, método, nomenclatura, o que conta como 🟢
- [ ] Modo de execução decidido: estudo ou entrega (`1-formato-do-plano`, item 8)
- [ ] Repo local com o `.gitignore` fechado **antes** do primeiro `git add` (áudio, vídeo, `__pycache__`), `git ls-files` sem nenhum mp3 ou mp4, remoto privado com o primeiro commit
- [ ] README que ensina a produzir um episódio do zero, com os pré-requisitos e os comandos dos scripts
- [ ] Dev-loop da animação documentado no README (editar a fonte, reconstruir, ou só F5)
- [ ] Branch de trabalho criada e as regras de git escritas no plano (quem manda na `main`, quando commitar, savepoint)
- [ ] Regra de nomenclatura escrita (a que a série já usa)
- [ ] **Backup dos arquivos pesados com destino fora desta máquina, restaurado uma vez** (Etapa 1)
- [ ] Inventário do que é insubstituível, do que se refaz por script e do que é lixo em potencial (Etapa 1)
- [ ] Base da animação: tokens num arquivo, CSS por componente, JS espelhando o CSS, fonte separada do construído (Etapa 2)
- [ ] Orçamento de peso do construído escrito no plano (a régua 6 mede contra ele)
- [ ] Acessibilidade na base: foco visível, teclado, texto alternativo, `prefers-reduced-motion` sem `animation: none`
- [ ] **Rede de testes por um comando**, descobrindo as pastas sozinha: telas = `_telas.md`, console limpo, 4 tamanhos, sobreposição, `pixels()` nos modelos (Etapa 3)
- [ ] Procedimento de publicação escrito e conferência pós-publicação como script (Etapa 4)
- [ ] Fila de erros criada (`erros.md`), mesmo vazia
- [ ] Combinado escrito de que etapa fecha com o comportamento dela na rede (item 9) e com o código dela na régua de legibilidade (item 10)
- [ ] Visão HTML dos dois planos regerada depois de qualquer mexida (`gerar-plano.py` aqui, `gerar-plano-serie.py` na série)

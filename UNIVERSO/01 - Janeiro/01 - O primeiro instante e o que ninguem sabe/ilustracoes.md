# Ilustrações do episódio 1.01 · O primeiro instante e o que ninguém sabe

Geradas no Flow (modo imagem, não gasta crédito), projeto `7543972f-546b-4127-879e-83882fdd48dd`,
em 17/09/2026. Este arquivo **não sobe pro NotebookLM**: prompt em inglês dentro de fonte
vaza no áudio.

**Mundo visual da série Universo:** reconstituição com cara de foto, fundo escuro, luz âmbar
quente e sombra azul fria. É o mesmo mundo das artes de etapa (`_arquivos/capa-etapas/`) e dos
extras (`_arquivos/capa-extras/`, a mesa dos aprofundamentos).

**Regras duras, que valem pra todas:**
1. **Nenhuma imagem tem texto, letra ou número.**
2. **Nenhuma pessoa real gerada.** Gente real entra só por foto de acervo com crédito.
3. **O começo do universo não é explosão num ponto** (alerta da pesquisa): nenhuma imagem
   pode mostrar um clarão saindo de um centro.

A tela 4 não entra aqui: nela a régua do ano cósmico, desenhada pela própria página, **é** a
imagem (`data-imagem="desenho"`). As telas 1, 2 e 5 usam imagens que já existem: a arte do card
do episódio (tela 1) e três fotos reais baixadas do Wikimedia Commons (telas 2 e 5), com o
crédito na legenda.

⚠️ **Em 18/09/2026 o Flow bateu no limite de uso** ("Você chegou ao limite de uso. Tente de
novo mais tarde", sem cobrança) e as três gerações abaixo falharam. O que entrou no lugar,
e pode ficar ou ser trocado quando o limite voltar:
- **tela 3:** foto real, o Campo Ultraprofundo do Hubble de 2014 (`img/hudf-2014.jpg`,
  NASA/ESA, domínio público), que a regra da série até prefere à ilustração.
- **tela 6:** a arte da mesa dos aprofundamentos (`_arquivos/capa-extras/ex-capa-01.png`),
  que já tem o caderno aberto em branco. Repete a arte do card dos extras no hub.
- **tela 7:** a capa da série (`_arquivos/capa-serie/capa-serie-01.png`), o quintal sob a
  Via Láctea: a luz das estrelas também é do passado. Repete a capa do card da home.

Os três prompts abaixo continuam valendo pra regerar (`gera-ilustracoes-episodio.sh 03 06 07`
no scratchpad da sessão, ou `flow-capa.js` na mão, salvando em `img/tela-NN-01.png`).

---

## IMAGEM 03 · tela 3 (não foi uma explosão num ponto)
**Mostra:** galáxias se afastando umas das outras, sem centro nenhum.

Cinematic scientific reconstruction of deep space filled with dozens of galaxies of many shapes, spirals and ellipticals, spread evenly across the whole frame with no cluster and no center, each one slightly separated from its neighbors by faint dark gaps, as if the space between them were quietly growing everywhere at once. No bright point, no burst, no rays, no explosion. Deep dark tones with warm amber galaxy cores and cool blue spiral arms, photorealistic, high detail, wide composition. No text, no letters, no numbers, no logos, no borders, no people, no spacecraft.

## IMAGEM 06 · tela 6 (o que ninguém sabe)
**Mostra:** a primeira página em branco: o que veio antes ninguém escreveu.

Cinematic photograph of a dark wooden desk at night under a single warm lamp: an old hardcover notebook lying open on its very first page, completely blank, cream paper, a wooden pencil resting beside it untouched. Behind the desk, a window showing a clear starry night sky. Deep dark tones with warm amber lamp light and cool blue shadows, photorealistic, shallow depth of field, high detail, wide composition. No text, no letters, no numbers, no writing, no logos, no borders, no people.

## IMAGEM 07 · tela 7 (encerramento: a luz que chega é do passado)
**Mostra:** a luz da manhã entrando pela janela: saiu do Sol uns oito minutos antes.

Cinematic photograph of early morning sunlight streaming through a window onto a dark wooden desk, long warm beams of light crossing the room with fine dust floating in them, the same old notebook and pencil from before now lit by the sun, a brass telescope on its stand catching the light. Warm amber sunlight against cool blue shadows in the corners, photorealistic, shallow depth of field, high detail, wide composition. No text, no letters, no numbers, no logos, no borders, no people.

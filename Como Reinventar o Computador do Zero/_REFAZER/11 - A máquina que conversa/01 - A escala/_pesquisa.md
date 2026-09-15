# Pesquisa: 11.01 A escala (2017 a 2022)

Conferência em fonte primária dos fatos, fichas e filmes do episódio. Feita em 10/09/2026.
Legenda: **Confirmado** (bate com a fonte), **Corrigido** (o que eu tinha escrito estava errado ou impreciso), **Não confirmei** (não achei fonte que sustente).
Regra: paper no arXiv, post oficial ou página oficial = primária. Wikipedia e imprensa = secundária, e está marcado quando foi o que sobrou.

Observação de método: o site openai.com bloqueia o leitor automático (403), então os posts da OpenAI foram baixados com `curl` direto e o texto foi conferido no HTML. Os PDFs do arXiv foram convertidos com `pdftotext`. Os trechos entre aspas abaixo são cópia literal do que estava no arquivo baixado.

---

## Parte 1: fatos da linha do tempo

### 1. *Attention Is All You Need* (Transformer)

**Confirmado, com um ajuste de nome.**

- arXiv 1706.03762. Histórico de versões: v1 em **12 de junho de 2017** (segunda-feira), v2 19/06, v3 20/06, v4 30/06, v5 **6 de dezembro de 2017**, v6 24/07/2023, v7 02/08/2023.
  https://arxiv.org/abs/1706.03762
- Oito autores, ordem no paper: Ashish Vaswani (Google Brain), Noam Shazeer (Google Brain), Niki Parmar (Google Research), Jakob Uszkoreit (Google Research), Llion Jones (Google Research), Aidan N. Gomez (University of Toronto, com nota "Work performed while at Google Brain"), Lukasz Kaiser (Google Brain), Illia Polosukhin (nota "Work performed while at Google Research", e-mail pessoal no paper). Nota de rodapé do paper: "Equal contribution. Listing order is random."
- Conferência: o rodapé da primeira página diz literalmente "31st Conference on Neural Information Processing Systems (NIPS 2017), Long Beach, CA, USA." A página oficial dos anais confirma: Advances in Neural Information Processing Systems 30 (NIPS 2017).
  https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html
  **Ajuste:** em 2017 a conferência ainda se chamava **NIPS**, o nome NeurIPS só veio em 2018. O mês (dezembro) não aparece nas páginas que abri; o que dá pra dizer com fonte é "NIPS 2017, Long Beach" e que a v5 do arXiv é de 6 de dezembro de 2017.
- Abstract: tradução automática WMT 2014 inglês-alemão (28,4 BLEU) e inglês-francês (41,8 BLEU, "after training for 3.5 days on eight GPUs"). O abstract já diz que serve pra outra coisa: "We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data."
- A frase do fim do paper sobre outras tarefas (seção Conclusion), literal:
  > "We are excited about the future of attention-based models and plan to apply them to other tasks. We plan to extend the Transformer to problems involving input and output modalities other than text and to investigate local, restricted attention mechanisms to efficiently handle large inputs and outputs such as images, audio and video."
  https://ar5iv.labs.arxiv.org/html/1706.03762 (render HTML do arXiv) e https://arxiv.org/pdf/1706.03762

### 2. GPT-1

**Corrigido em parte.** Os números estão certos, mas dois deles não estão no paper: vêm do post do blog e do paper do GPT-2.

- Paper: "Improving Language Understanding by Generative Pre-Training", Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever, todos OpenAI.
  https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf
- Post do blog "Improving language understanding with unsupervised learning": **11 de junho de 2018** (confirmado no cabeçalho da página).
  https://openai.com/index/language-unsupervised/
- Arquitetura (paper): "12-layer decoder-only transformer with masked self-attention heads (768 dimensional states and 12 attention heads)". Treino: "We train for 100 epochs on minibatches of 64 randomly sampled, contiguous sequences of 512 tokens."
- **117 milhões de parâmetros: o paper do GPT-1 NÃO traz esse número.** Ele vem do paper do GPT-2 (Tabela 2: 117M, 12 camadas, d=768) com a frase "The smallest model is equivalent to the original GPT". O post de fevereiro de 2019 também fala em "117M version".
  https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf
- BooksCorpus (paper): "It contains over 7,000 unique unpublished books". Melhor dizer "mais de 7.000" do que "cerca de 7.000".
- **GPUs e duração: o paper não diz.** Quem diz é o post do blog: "Our approach requires an expensive pre-training step—1 month on 8 GPUs." e "We're currently using commodity hardware (a single 8 GPU machine) and a training dataset of only a few thousand books (~5GB of text)." A conta de computação do post é literalmente: "8 P600 GPU's * 30 days * 12 TFLOPS/GPU * 0.33 utilization = .96 pfs-days". Ou seja, o modelo de GPU que a OpenAI escreveu é **"P600"** e a duração é **30 dias**. (Nota minha: 12 TFLOPS não é o número de um Quadro P600; parece o de um P100. Mas o texto oficial diz P600, então cito assim e não corrijo por conta própria.)

### 3. BERT

**Confirmado.**

- arXiv 1810.04805, v1 em **11 de outubro de 2018** (quinta-feira), v2 em 24 de maio de 2019. Autores: Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova, afiliação "Google AI Language".
  https://arxiv.org/abs/1810.04805
- Tamanhos (seção 3): "BERTBASE (L=12, H=768, A=12, Total Parameters=110M) and BERTLARGE (L=24, H=1024, A=16, Total Parameters=340M)".
- Hardware (apêndice A.2), literal: "Training of BERTBASE was performed on 4 Cloud TPUs in Pod configuration (16 TPU chips total). Training of BERTLARGE was performed on 16 Cloud TPUs (64 TPU chips total). Each pre-training took 4 days to complete."
- "Nos dois sentidos": o abstract diz "BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers". O objetivo é o masked language model.
  https://ar5iv.labs.arxiv.org/html/1810.04805

### 4. GPT-2

**Confirmado.**

- Post "Better language models and their implications": **14 de fevereiro de 2019**. 1,5 bilhão de parâmetros, "trained on a dataset of 8 million web pages", "40GB of Internet text". O paper diz "slightly over 8 million documents for a total of 40 GB of text", vindos de 45 milhões de links do Reddit.
  https://openai.com/index/better-language-models/
- Frase do post sobre não liberar (literal, primeiro parágrafo):
  > "Due to our concerns about malicious applications of the technology, we are not releasing the trained model. As an experiment in responsible disclosure, we are instead releasing a much smaller model for researchers to experiment with, as well as a technical paper."
  (a segunda frase termina num link; o trecho "a much smaller" está confirmado literal e o resto reaparece mais abaixo no mesmo post como "much smaller version of GPT‑2 along with sampling code"). Mais adiante: "We are not releasing the dataset, training code, or GPT‑2 model weights."
- Staged release: o próprio post traz o "GPT‑2 Interim Update, May 2019" com o 345M; o 774M saiu em **20 de agosto de 2019** (post "GPT-2: 6-month follow-up"); o 1,5B saiu em **5 de novembro de 2019**, post "GPT-2: 1.5B release": "As the final model release of GPT‑2's staged release, we're releasing the largest version (1.5B parameters) of GPT‑2 along with code and model weights to facilitate detection of outputs of GPT‑2 models."
  https://openai.com/index/gpt-2-6-month-follow-up/ e https://openai.com/index/gpt-2-1-5b-release/

### 5. Leis de escala

**Confirmado.**

- arXiv 2001.08361, v1 em **23 de janeiro de 2020** (quinta-feira, 03:59 UTC), única versão. Comentário: "19 pages, 15 figures".
- Autores exatamente na ordem que eu tinha: Jared Kaplan, Sam McCandlish, Tom Henighan, Tom B. Brown, Benjamin Chess, Rewon Child, Scott Gray, Alec Radford, Jeffrey Wu, Dario Amodei.
- Tese (abstract): "The loss scales as a power-law with model size, dataset size, and the amount of compute used for training, with some trends spanning more than seven orders of magnitude." e "Larger models are significantly more sample-efficient, such that optimally compute-efficient training involves training very large models on a relatively modest amount of data and stopping significantly before convergence."
  https://arxiv.org/abs/2001.08361

### 6. GPT-3

**Confirmado, com uma correção sobre o agradecimento à Microsoft.**

- arXiv 2005.14165, v1 em **28 de maio de 2020** (quinta-feira); v2 01/06, v3 05/06, v4 22/07/2020. **31 autores**, contados um a um: Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, Arvind Neelakantan, Pranav Shyam, Girish Sastry, Amanda Askell, Sandhini Agarwal, Ariel Herbert-Voss, Gretchen Krueger, Tom Henighan, Rewon Child, Aditya Ramesh, Daniel M. Ziegler, Jeffrey Wu, Clemens Winter, Christopher Hesse, Mark Chen, Eric Sigler, Mateusz Litwin, Scott Gray, Benjamin Chess, Jack Clark, Christopher Berner, Sam McCandlish, Alec Radford, Ilya Sutskever, Dario Amodei.
  https://arxiv.org/abs/2005.14165
- 175 bilhões de parâmetros (Tabela D.1 dá 174.600M).
- Hardware, seção 2.3, literal: "All models were trained on V100 GPU's on part of a high-bandwidth cluster provided by Microsoft."
- **Correção:** a seção Acknowledgements **não agradece a Microsoft pelo nome**. Ela agradece pessoas da OpenAI e termina com "we would like to thank the entire OpenAI infrastructure and supercomputing teams for making it possible to train models at this scale." A única menção à Microsoft é a frase da seção 2.3 acima (e uma referência bibliográfica ao Project Turing). Então no roteiro: "o paper diz que o cluster foi fornecido pela Microsoft", não "o paper agradece a Microsoft".
- Dados (Tabela 2.2): Common Crawl (filtered) 410 bilhões de tokens, peso 60%; WebText2 19 bilhões, 22%; Books1 12 bilhões, 8%; Books2 55 bilhões, 8%; Wikipedia 3 bilhões, 3%. "All models were trained for a total of 300 billion tokens."
- Computação (Tabela D.1, linha GPT-3 175B): 3,64E+03 petaflop/s-dias = **3,14E+23 flops**, 300 bilhões de tokens.
- Few-shot (seção 2.1), literal: "Few-shot (FS) is the term we will use in this work to refer to the setting where the model is given a few demonstrations of the task at inference time as conditioning, but no weight updates are allowed."
  https://ar5iv.labs.arxiv.org/html/2005.14165 e https://arxiv.org/pdf/2005.14165

### 7. Supercomputador Microsoft/OpenAI

**Confirmado.**

- Post oficial: "Microsoft announces new supercomputer, lays out vision for future AI work", **19 de maio de 2020**, anunciado na conferência Build pelo CTO Kevin Scott.
  https://blogs.microsoft.com/ai/openai-azure-supercomputer/ (o mesmo texto vive hoje em https://news.microsoft.com/source/features/ai/openai-azure-supercomputer/)
- Frase literal: "The supercomputer developed for OpenAI is a single system with more than 285,000 CPU cores, 10,000 GPUs and 400 gigabits per second of network connectivity for each GPU server. Compared with other machines listed on the TOP500 supercomputers in the world, it ranks in the top five, Microsoft says."
- Nuance: o post diz "one of the top five **publicly disclosed** supercomputers in the world". Vale manter o "publicamente divulgados".
- Bônus: fala do Sam Altman no post: "If we could design our dream system, what would it look like?" ... "And then Microsoft was able to build it."

### 8. Chinchilla

**Confirmado, com uma nuance na "regra dos 20 tokens".**

- arXiv 2203.15556, v1 em **29 de março de 2022** (terça-feira). 22 autores, todos DeepMind, Jordan Hoffmann primeiro (depois Sebastian Borgeaud, Arthur Mensch, ... Oriol Vinyals, Laurent Sifre).
  https://arxiv.org/abs/2203.15556
- Tabela 1 do paper: Gopher 280 bilhões de parâmetros, 300 bilhões de tokens; GPT-3 175B, 300B; Jurassic 178B, 300B; **Chinchilla 70 bilhões, 1,4 trilhão de tokens**. Seção 4: "we test this hypothesis by training a model on the larger end of this range—70B parameters—for 1.4T tokens". Abstract: "Chinchilla uniformly and significantly outperforms Gopher (280B), GPT-3 (175B), Jurassic-1 (178B), and Megatron-Turing NLG (530B)"; MMLU 67,5%.
- Regra (abstract, literal): "for every doubling of model size the number of training tokens should also be doubled".
- **"Cerca de 20 tokens por parâmetro" não é frase do paper.** É uma leitura da Tabela 3 (Approach 1): 1 bilhão de parâmetros pede 20,2 bilhões de tokens; 10 bilhões pedem 205,1 bilhões; 67 bilhões pedem 1,5 trilhão; 175 bilhões pedem 3,7 trilhões; 280 bilhões pedem 5,9 trilhões; 1 trilhão pede 21,2 trilhões. A razão fica em torno de 20. No texto o paper chega a dizer que um modelo de 175B "should be trained ... on over 4.2 trillion tokens" (outra das três abordagens, dá uns 24 por parâmetro). No roteiro dá pra dizer "a tabela do paper dá, grosso modo, 20 tokens por parâmetro", mas não "o paper diz que a regra é 20".
  https://arxiv.org/pdf/2203.15556

### 9. Codex e Copilot

**Confirmado.**

- GitHub Copilot em prévia técnica: **29 de junho de 2021**, post de Nat Friedman (então CEO do GitHub): "Today, we are launching a technical preview of GitHub Copilot, a new AI pair programmer that helps you write better code." e "GitHub Copilot is powered by OpenAI Codex, a new AI system created by OpenAI."
  https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/
- Paper do Codex "Evaluating Large Language Models Trained on Code", arXiv 2107.03374, v1 em **7 de julho de 2021** (quarta-feira), v2 14/07. Primeiro autor Mark Chen (lista enorme: Jerry Tworek, Heewoo Jun, ... Jared Kaplan, ... Greg Brockman, ... Alec Radford, ... Mira Murati, ... Dario Amodei, Sam McCandlish, Ilya Sutskever, Wojciech Zaremba). HumanEval: 28,8% contra 0% do GPT-3.
  https://arxiv.org/abs/2107.03374
- API do Codex em beta privado: post "OpenAI Codex", **10 de agosto de 2021**: "OpenAI Codex is a descendant of GPT‑3; its training data contains both natural language and billions of lines of source code from publicly available sources, including code in public GitHub repositories." e "Codex is the model that powers GitHub Copilot, which we built and launched in partnership with GitHub a month ago." e "We're now making OpenAI Codex available in private beta via our API".
  https://openai.com/index/openai-codex/
- "GPT-3 ajustado em código do GitHub": bate com o post ("descendant of GPT-3", código de repositórios públicos do GitHub).

### 10. GPT-3.5

**Confirmado o post do ChatGPT; a página "Model index" só por fonte secundária.**

- Post "Introducing ChatGPT", **30 de novembro de 2022**, frases literais: "ChatGPT is fine-tuned from a model in the GPT‑3.5 series, which finished training in early 2022." e "ChatGPT and GPT‑3.5 were trained on an Azure AI supercomputing infrastructure."
  https://openai.com/index/chatgpt/
- Página "Model index for researchers" (platform.openai.com/docs/model-index-for-researchers): **saiu do ar** e os snapshots do Wayback só carregam o esqueleto em JavaScript, então não consegui ler a primária. O texto sobrevive citado, com a URL, numa resposta do Microsoft Learn Q&A de 30/01/2023: "GPT-3.5 series is a series of models that was trained on a blend of text and code from before Q4 2021. The following models are in the GPT-3.5 series: code-davinci-002 is a base model, so good for pure code-completion tasks; text-davinci-002 is an InstructGPT model based on code-davinci-002; text-davinci-003 is an improvement on text-davinci-002".
  https://learn.microsoft.com/en-us/answers/a/1168588 (secundária, citando https://platform.openai.com/docs/model-index-for-researchers/models-referred-to-as-gpt-3-5)
  O `gpt-3.5-turbo` entrou nessa lista depois (ele nasce no post "Introducing ChatGPT and Whisper APIs"; a página hoje só mostra "Updated: April 24, 2024", a data original do post eu **não confirmei** em fonte). https://openai.com/index/introducing-chatgpt-and-whisper-apis/
- text-davinci-003 em **28 de novembro de 2022**: não há post no blog da OpenAI; a data está no tuíte de Jan Leike (então líder de alinhamento na OpenAI) de 28/11/2022 ("Check out OpenAI's new text-davinci-003! Same underlying model as text-davinci-002 but more aligned.") e em matéria do The Decoder de 29/11/2022. Fonte secundária, mas de gente da OpenAI.
  https://x.com/janleike/status/1597355354433916928 e https://the-decoder.com/openais-latest-gpt-3-model-generates-better-and-longer-texts/

### 11. InstructGPT

**Confirmado.**

- arXiv 2203.02155, v1 em **4 de março de 2022** (sexta-feira). 20 autores, Long Ouyang primeiro (Jeff Wu, Xu Jiang, ... John Schulman, ... Paul Christiano, Jan Leike, Ryan Lowe).
  https://arxiv.org/abs/2203.02155
- Post "Aligning language models to follow instructions": **27 de janeiro de 2022**.
  https://openai.com/index/instruction-following/

---

## Parte 2: fichas das pessoas

Regra: só o que tem fonte pública. "Não confirmei" quer dizer que não achei, não que não exista.

### 1. Alec Radford

- **Nascimento:** abril de 1993, região de Dallas–Fort Worth, Texas (só Wikipedia, secundária; sem primária).
- **Família:** não confirmei.
- **Estudo:** Olin College of Engineering (Massachusetts). Largou em agosto de 2014 sem se formar, pra tocar a startup indico que cofundou ainda na faculdade. Sem mestrado nem doutorado. (Wikipedia, secundária.)
  https://en.wikipedia.org/wiki/Alec_Radford
- **Mais conhecido por:** primeiro autor do GPT-1 (2018) e do GPT-2 (2019); coautor das leis de escala e do GPT-3; DCGAN, CLIP, Whisper.
- **Destino do trabalho:** OpenAI de 2016 a dezembro de 2024; saiu pra fazer pesquisa independente (The Information, 19/12/2024: "Senior OpenAI Researcher Radford Departs"). Conselheiro do Thinking Machines Lab (de Mira Murati) desde março de 2025 (TechCrunch, 08/04/2025). Em **abril de 2026** assinou, com Nick Levine e David Duvenaud, o "talkie", modelo de 13B treinado só com texto de antes de 1931 (página oficial do projeto, assinada "Nick Levine, David Duvenaud, Alec Radford, April 2026"). Empregador formal em 2026: não confirmei (segue como independente/conselheiro).
  https://www.theinformation.com/briefings/senior-openai-researcher-radford-departs · https://techcrunch.com/2025/04/08/mira-muratis-ai-startup-gains-prominent-ex-openai-advisers/ · https://talkie-lm.com/introducing-talkie

### 2. Jacob Devlin

- **Nascimento / família:** não confirmei.
- **Estudo:** mestrado em ciência da computação na University of Maryland (2009), orientado por Bonnie Dorr (bio oficial do seminário de NLP de Stanford, 17/01/2019). Graduação: não confirmei. (Uma página obscura fala em doutorado na UPenn; a bio de Stanford não menciona doutorado, então não confirmei.)
  https://nlp.stanford.edu/seminar/details/jdevlin.shtml
- **Carreira:** BBN Technologies; Microsoft Research 2014 a 2017 (Principal Research Scientist, levou o Microsoft Translator da tradução estatística pra neural); Google (Staff Research Scientist em 2019).
- **Mais conhecido por:** primeiro autor do BERT (outubro de 2018).
- **Destino do trabalho:** saiu do Google pra OpenAI em janeiro de 2023, depois de reclamar internamente que o Bard estava sendo treinado com dados do ShareGPT; **voltou pro Google em junho de 2023** (The Information, 23/06/2023, "AI Boomerang: Google's Internal Critic Returns From Rival OpenAI"; resumo no Techmeme). 2025/2026: **não confirmei** (não achei fonte datada).
  https://www.theinformation.com/articles/ai-boomerang-googles-internal-critic-returns-from-rival-openai · https://www.techmeme.com/230623/p19

### 3. Jared Kaplan

- **Nascimento / família:** não confirmei (a Wikipedia não traz ano nem cidade).
- **Estudo:** bacharelado em física e matemática em Stanford; doutorado em física em Harvard (2009), tese "Aspects of Holography", orientador Nima Arkani-Hamed (Wikipedia; a Hertz Foundation confirma Stanford, Harvard e o título da tese).
  https://www.hertzfoundation.org/people/jared-kaplan/ · https://en.wikipedia.org/wiki/Jared_Kaplan
- **Carreira:** 15 anos como físico teórico (gravidade quântica, altas energias); professor associado de física na Johns Hopkins desde 2012; consultor/pesquisador na OpenAI a partir de 2019 (primeiro autor das leis de escala, coautor do GPT-3 e do Codex); cofundador da Anthropic em 2021.
- **Destino do trabalho:** Anthropic, título oficial "Co-Founder and Chief Science Officer" (página de liderança da Anthropic, consultada em 10/09/2026). A Wikipedia acrescenta "Responsible Scaling Officer" desde outubro de 2024.
  https://www.anthropic.com/company/leadership

### 4. Dario Amodei

- **Nascimento:** 1983, San Francisco (Wikipedia e perfil de Alex Kantrowitz, 29/07/2025).
- **Família:** pai Riccardo Amodei, italiano de Massa Marittima (Toscana), artesão de couro ("a trained leathersmith"), morreu em 2006 depois de longa doença rara (a Wikipedia diz hepatite C); mãe Elena Engel, judia americana nascida em Chicago, gerente de projetos de reformas e obras de bibliotecas em Berkeley e San Francisco. Irmã: Daniela Amodei, presidente da Anthropic.
  https://kantrowitz.medium.com/the-making-of-anthropic-ceo-dario-amodei-449777529dd6 · https://en.wikipedia.org/wiki/Dario_Amodei
- **Estudo:** começou na Caltech, transferiu pra Stanford (bacharel em física); doutorado em biofísica em Princeton (2011, Hertz Fellow); pós-doutorado na Stanford School of Medicine. (Site pessoal confirma o doutorado em biofísica em Princeton e o pós-doc em Stanford.)
  https://darioamodei.com/
- **Carreira:** Baidu (2014 a 2015), Google Brain, OpenAI (2016 a 2020, VP of Research; tocou GPT-2 e GPT-3; último autor das leis de escala e do GPT-3), cofundador e CEO da Anthropic desde 2021.
- **Destino do trabalho:** CEO da Anthropic ("Co-Founder and Chief Executive Officer", página de liderança em 10/09/2026; Fortune 25/08/2026 sobre o IPO).
  https://www.anthropic.com/company/leadership · https://fortune.com/2026/08/25/anthropic-ipo-could-create-millionaires-but-company-worried-about-money-over-mission-ai-firm-ceo-dario-amodei/

### 5. Tom Brown (Tom B. Brown)

- **Nascimento:** não confirmei o ano (o perfil da Forbes, atualizado em 10/03/2026, dá "39 anos", o que aponta pra 1986/87, mas não há data). Local e família: não confirmei.
- **Estudo:** MIT, ciência da computação e ciência cognitiva (perfil Forbes, secundária).
  https://www.forbes.com/profile/tom-brown/
- **Carreira:** cofundou a Grouper (2011); entrou na OpenAI por volta de 2016; passou um ano no Google Brain e voltou; Research Engineering Lead do GPT-3 e primeiro autor do paper (2020); cofundador da Anthropic em 2021.
- **Destino do trabalho:** Anthropic, "Co-Founder and Chief Compute Officer" (página de liderança, 10/09/2026). Em setembro de 2026 falou no G20 Innovation Summit (Reuters via TradingView).
  https://www.anthropic.com/company/leadership

### 6. Jordan Hoffmann

- **Nascimento / família:** não confirmei.
- **Estudo:** física e matemática na Johns Hopkins (graduação; fontes secundárias); doutorado em matemática aplicada em Harvard (2014 a 2019), confirmado no site pessoal.
  https://jhoffmann.org/
- **Carreira:** Research Scientist na DeepMind em Londres a partir de 2020 (primeiro autor do Chinchilla, março de 2022); Inflection AI em 2022; **Microsoft AI**, à frente do novo hub de Londres (Paddington), anunciado em 8 de abril de 2024 (TechCrunch).
  https://techcrunch.com/2024/04/08/microsoft-ai-gets-a-new-london-hub-headed-up-by-former-inflection-and-deepmind-scientist-jordan-hoffmann/
- **Destino do trabalho:** o site pessoal (sem data) diz "At Microsoft AI"; a fonte datada mais recente é abril de 2024. 2025/2026: **não confirmei**.

### 7. Ashish Vaswani

- **Nascimento:** 1986, Índia (Wikipedia; cidade não confirmei). Família: não confirmei.
- **Estudo:** B.Tech em ciência da computação no **Birla Institute of Technology, Mesra** (2002); doutorado na University of Southern California (2014), orientadores David Chiang e Liang Huang, tese "Smaller, Faster, and Accurate Models for Statistical Machine Translation". (Wikipedia, secundária. Atenção: é BIT Mesra, não BITS Pilani.)
  https://en.wikipedia.org/wiki/Ashish_Vaswani
- **Carreira:** Google Brain, julho de 2016 a novembro de 2021 (Staff Research Scientist; Transformer em 2017); cofundou a Adept AI; cofundou a Essential AI com Niki Parmar em dezembro de 2022 e foi CEO.
- **Destino do trabalho:** em **junho de 2026** ele e a equipe da Essential AI foram "acqui-hired" pela **Nvidia**, pra trabalhar nos modelos abertos Nemotron (Wikipedia citando Axios de 23/06/2026; newsletter Ground Level AI de 20/06/2026). Anúncio oficial da Nvidia: não confirmei.
  https://www.axios.com/2026/06/23/ai-lab-agi-google-deepmind-departures · https://www.groundlevel-ai.com/p/nvidia-quietly-acquihires-essential

### 8. Ilya Sutskever (só o destino)

- Cofundador e **CEO da Safe Superintelligence Inc. (SSI)**, empresa que fundou em junho de 2024; virou CEO em julho de 2025 quando Daniel Gross saiu pra Meta (TechCrunch, 03/07/2025). Título "Cofounder and CEO of Safe Superintelligence Inc." no comunicado oficial da Nvidia de **27/07/2026** (parceria de longo prazo, Nvidia investiu na SSI e a computação cresce "an order of magnitude").
  https://nvidianews.nvidia.com/news/ilya-sutskevers-safe-superintelligence-inc-and-nvidia-announce-long-term-strategic-partnership · https://techcrunch.com/2025/07/03/ilya-sutskever-will-lead-safe-superintelligence-following-his-ceos-exit/

### 9. Sam Altman (só o destino)

- **CEO da OpenAI** em 2026: Time, 26/08/2026 ("CEO Sam Altman had just returned from Washington..."); Bloomberg 03/09/2026; CNBC 03/09/2026 (lançamento do modelo Astra).
  https://time.com/article/2026/08/26/openai-sam-altman-interview/ · https://www.bloomberg.com/news/articles/2026-09-03/sam-altman-says-openai-has-fumbled-at-communicating-ai-benefits

### 10. Greg Brockman (só o destino)

- **Cofundador e presidente da OpenAI** em 2026 (Fortune, 25/07/2026: "cofounder and president of OpenAI"; Time, 26/08/2026: "co-founder and president Greg Brockman, who has assumed responsibility for nearly all product and business operations"; CNBC 10/07/2026 sobre a consolidação depois da saída de Fidji Simo).
  https://fortune.com/2026/07/25/openai-president-greg-brockman-interview-challenges-pressure-high-stakes-ai-startup-hugging-face-regulation/ · https://www.cnbc.com/2026/07/10/openai-power-consolidates-under-co-founder-greg-brockman-ahead-of-ipo.html

### 11. Mira Murati (só o destino)

- **Cofundadora e CEO do Thinking Machines Lab** (fundado em fevereiro de 2025) em 2026 (TechCrunch, 04/06/2026: "As CEO of her own company, Thinking Machines Lab...").
  https://techcrunch.com/2026/06/04/mira-murati-steps-back-into-the-spotlight-carefully/

### 12. John Schulman (só o destino)

- Saiu da OpenAI em agosto de 2024 pra Anthropic; em fevereiro de 2025 foi pro Thinking Machines Lab como **chief scientist**. Em 28/07/2026 seguia lá: "John Schulman still on as chief scientist" (OfficeChai, na saída da cofundadora Lilian Weng; secundária).
  https://officechai.com/ai/thinking-machines-cofounder-lillian-weng-quits-in-fourth-co-founder-exit/

---

## Parte 3: filmes e documentários

Só o que confirmei existir. Ordem: do mais colado no episódio pro mais tangente.

### 1. Eternal You (2024) · DOCUMENTÁRIO

- Direção: Hans Block e Moritz Riesewieck. 87 min. Alemanha/EUA. Estreia em Sundance, 20/01/2024. Distribuição: Film Movement (EUA), Farbfilm (Alemanha).
  https://en.wikipedia.org/wiki/Eternal_You · https://www.imdb.com/title/tt30320493/
- **Por que conversa:** é o único filme que mostra o GPT-3 "cru" virando produto na mão de gente comum. Acompanha o Project December, de Jason Rohrer, que usava o GPT-3 pra simular mortos (o caso de Joshua Barbeau e a ex-noiva Jessica, que o San Francisco Chronicle contou em 2021).
- **Viés / distorção:** tom alarmista, "capitalismo da morte"; o próprio Rohrer contestou a montagem depois de Sundance, dizendo que o filme "dobrou a verdade" pra parecer mais chocante (Decrypt). Bom pra mostrar que o modelo de 2020 já produzia conversa que mexia com gente, ruim se for lido como retrato neutro.
  https://decrypt.co/214163/ai-developer-refutes-eternal-you-documentary-calls-depiction-of-his-chatbot-misleading
- **Onde assistir:** o agregador JustWatch lista Kanopy (grátis com biblioteca) e Film Movement Plus, com aluguel na Amazon/Apple TV nos EUA. Não confirmei disponibilidade no Brasil.

### 2. Ilya: the AI scientist shaping the world (2023) · DOCUMENTÁRIO CURTO

- Guardian Documentaries, publicado em 02/11/2023. Direção: Tonje Hessen Schei. Duração 11:46.
  https://www.theguardian.com/technology/video/2023/nov/02/ilya-the-ai-scientist-shaping-the-world
- **Por que conversa:** são as conversas filmadas com Ilya Sutskever **entre 2016 e 2019**, ou seja, exatamente enquanto GPT-1 e GPT-2 estavam sendo feitos. Ele fala de AGI e de "prever a próxima palavra" antes de o mundo saber o que era isso.
- **Viés / distorção:** material de 2016-19 remontado em 2023, na esteira do ChatGPT e semanas antes da crise do conselho da OpenAI; sem contraditório, só a voz dele.
- **Onde assistir:** no site do Guardian (link acima) e no canal do Guardian no YouTube.

### 3. iHuman (2019) · DOCUMENTÁRIO

- Direção: Tonje Hessen Schei. Noruega. 99 min (IMDb/Letterboxd; a Wikipedia não traz a duração). Estreia no IDFA (Amsterdã), 23/11/2019.
  https://en.wikipedia.org/wiki/IHuman_(film) · https://www.imdb.com/title/tt11279794/
- **Por que conversa:** é o longa de onde saiu o curto do Guardian; Ilya Sutskever aparece falando da OpenAI no meio da janela do episódio. Também tem Jürgen Schmidhuber, Max Tegmark, Stuart Russell.
- **Viés / distorção:** thriller político sobre vigilância (Palantir, Cambridge Analytica); a IA é filmada como ameaça, não como engenharia. Não explica Transformer nem escala.
- **Onde assistir:** não confirmei.

### 4. The AI Doc: Or How I Became an Apocaloptimist (2026) · DOCUMENTÁRIO

- Direção: Daniel Roher e Charlie Tyrell. 104 min. Estreia em Sundance, 27/01/2026; cinemas (Focus Features) em 27/03/2026; a chegada à Netflix (EUA) em 15/09/2026 só vi em fonte secundária (What's on Netflix).
  https://en.wikipedia.org/wiki/The_AI_Doc:_Or_How_I_Became_an_Apocaloptimist · https://www.imdb.com/title/tt39150120/
- **Por que conversa:** primeiro grande documentário da era pós-ChatGPT, com 26 entrevistados que são os personagens da etapa: Ilya Sutskever, Sam Altman, Dario Amodei, Demis Hassabis, Yoshua Bengio, além de críticas como Timnit Gebru e Emily Bender.
- **Viés / distorção:** narrado pela lente pessoal do diretor (à espera do primeiro filho), balança medo e esperança ("apocaloptimismo"); é sobre o que a IA vai fazer com a gente, não sobre como ela foi construída.
- **Onde assistir:** cinemas (março de 2026) e Netflix EUA a partir de setembro de 2026 (secundária). Brasil: não confirmei.

### 5. Artificial (2026) · FICÇÃO

- Direção: Luca Guadagnino; roteiro: Simon Rich. 140 min (Wikipedia). Andrew Garfield é Sam Altman, Yura Borisov é Ilya Sutskever, Monica Barbaro é Mira Murati, Cooper Hoffman é Greg Brockman, Ike Barinholtz é Elon Musk, Mark Rylance é Geoffrey Hinton. Estreia mundial no New York Film Festival em **05/10/2026**; distribuidora Neon, cinemas nos EUA em 25/12/2026 com expansão em janeiro (a Amazon MGM largou o filme em junho de 2026).
  https://en.wikipedia.org/wiki/Artificial_(2026_film) · https://www.thewrap.com/culture-lifestyle/culture/artificial-sam-altman-andrew-garfield-movie-premiere-nyff-2026/
- **Por que conversa:** os mesmos personagens do episódio (Altman, Ilya, Murati, Brockman), com a história da OpenAI como pano de fundo.
- **Viés / distorção:** é comédia dramática sobre a demissão e recontratação de Altman em **novembro de 2023**, fora da janela 2017-2022; dramatização, não registro. Ainda não lançado na data desta pesquisa, então ninguém sabe o que ele acerta.
- **Onde assistir:** não confirmei (só a data de cinema).

### 6. The Thinking Game (2024) · DOCUMENTÁRIO

- Direção: Greg Kohs. 83 min. Estreia no Tribeca, 07/06/2024; lançado de graça no YouTube em 26/11/2025.
  https://en.wikipedia.org/wiki/The_Thinking_Game
- **Por que conversa:** é a DeepMind por dentro (Demis Hassabis), o laboratório do Gopher e do Chinchilla, no mesmo período (cinco anos até o CASP14 de 2020).
- **Viés / distorção:** é sobre o AlphaFold, não sobre modelos de linguagem; e foi produzido e distribuído pela própria Google DeepMind, então é institucional.
- **Onde assistir:** YouTube (lançamento global em 26/11/2025).

### O que procurei e NÃO existe (ou não confirmei)

- Nenhum documentário sobre o paper *Attention Is All You Need* ou sobre os oito autores.
- Nenhum filme sobre GPT-2, GPT-3, as leis de escala, o supercomputador da Microsoft ou o Chinchilla.
- Nenhum longa documental sobre a OpenAI de 2017 a 2022; o que existe de "OpenAI no cinema" é o *Artificial*, que é ficção e é sobre 2023.
- *AlphaGo* (2017, Greg Kohs) existe, mas é sobre a partida de 2016 contra Lee Sedol: fora da janela e sobre aprendizado por reforço, não linguagem. Deixei fora.
- *The Real! ChatGPT: Creator or Terminator?* (2024) aparece no IMDb com nota 3,6; não confirmei direção nem distribuição, deixei fora.

---

## Erros que eu tinha escrito

1. Fato 1: em 2017 a conferência se chamava **NIPS**, não NeurIPS (renomeada em 2018).
2. Fato 2: "117 milhões de parâmetros" **não está no paper do GPT-1**; vem da Tabela 2 do paper do GPT-2 ("equivalent to the original GPT").
3. Fato 2: "8 GPUs por cerca de 1 mês" **não está no paper**, está no post do blog ("1 month on 8 GPUs"); e a conta do post diz "8 P600 GPU's * 30 days".
4. Fato 2: BooksCorpus tem "**mais de** 7.000" livros, não "cerca de".
5. Fato 6: o paper do GPT-3 **não agradece a Microsoft** nos Acknowledgements; a menção é na seção 2.3 ("cluster provided by Microsoft").
6. Fato 7: o post da Microsoft fala em "top five **publicly disclosed** supercomputers"; vale o "divulgados publicamente".
7. Fato 8: "cerca de 20 tokens por parâmetro" **não é frase do paper do Chinchilla**; é o que sai da Tabela 3.
8. Fato 10: a página "Model index for researchers" saiu do ar e só existe citada; o `gpt-3.5-turbo` entrou nela depois de março de 2023 (data do post não confirmada).

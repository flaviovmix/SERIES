# Pesquisa: 11.02 O galpão (2014 a 2022, com a placa de casa de 2025)

Conferência em fonte primária dos fatos, fichas e filmes do episódio. Feita em 14/09/2026.
Legenda: **Confirmado** (bate com a fonte), **Corrigido** (o que a espinha dizia estava errado ou impreciso), **Não confirmei** (não achei fonte que sustente).
Regra: press release, paper, post oficial, datasheet ou página oficial = primária. Wikipedia, imprensa e agregador = secundária, e está marcado quando foi o que sobrou.

Observação de método: os press releases da Nvidia (nvidianews.nvidia.com) foram baixados com `curl` e o texto conferido no HTML. O blog antigo da Nvidia (`blogs.nvidia.com/blog/2016/...`) hoje redireciona pra uma página de categoria, então os posts de 2016 foram lidos na cópia do Internet Archive, baixada com `curl`. Os PDFs (Patterson e outros, datasheet da V100, datasheet da H100, datasheet da DGX H100, fact sheet da EPE) foram convertidos com `pdftotext`. O site openai.com não foi aberto (bloqueia o leitor automático). Axios e GeekWire devolveram 403. Os trechos entre aspas são cópia literal do que estava no arquivo lido; onde a fonte tinha travessão longo, troquei por "(...)".

---

## Parte 1: fatos da linha do tempo

### 1. DGX-1 e NVLink

**Confirmado, com dois ajustes: o NVLink é anunciado em 2014, e o dia da entrega não está escrito.**

- **Anúncio do DGX-1:** 5 de abril de 2016, na GTC (San José). Release "NVIDIA Launches World's First Deep Learning Supercomputer": "the world's first deep learning supercomputer"; oito Tesla P100 com 16 GB cada; ligação "NVLink Hybrid Cube Mesh"; consumo **3.200 W**; "the equivalent throughput of 250 x86 servers"; disponibilidade: "General availability for the NVIDIA DGX-1 deep learning system in the United States is in June, and in other regions beginning in the third quarter".
  https://nvidianews.nvidia.com/news/nvidia-launches-world-s-first-deep-learning-supercomputer
- Post do blog da Nvidia no mesmo dia: "unveiled the world's first deep-learning supercomputer in a box (...) The NVIDIA DGX-1, with 170 teraflops of half precision performance". A P100 é "the first to be based on the company's 11th generation Pascal architecture".
  https://blogs.nvidia.com/blog/2016/04/05/2016-gpu-technology-conference/ (lido no Internet Archive)
- **Preço de US$ 129.000: não está no release.** Aparece na Fortune de 15/08/2016 e na HPCwire de 05/04/2016 (secundárias, mas do dia).
  https://fortune.com/2016/08/15/elon-musk-artificial-intelligence-openai-nvidia-supercomputer/ · https://www.hpcwire.com/2016/04/05/nvidia-monster-pascal-gpu-card-gtc16/
- **NVLink anunciado em 25 de março de 2014**, release "NVIDIA Launches World's First High-Speed GPU Interconnect": deixa GPU e CPU "share data five to 12 times faster than they can today", "co-developed with IBM", e entra na arquitetura Pascal "expected to be introduced in 2016".
  https://nvidianews.nvidia.com/news/nvidia-launches-world-s-first-high-speed-gpu-interconnect-helping-pave-the-way-to-exascale-computing
- NVLink na P100 (release de 05/04/2016): "160GB/sec bi-directional interconnect bandwidth", contra "31.5GB/sec" do PCIe x16 Gen3, e "up to eight Tesla P100 GPUs can be interconnected with NVLink".
  https://nvidianews.nvidia.com/news/nvidia-delivers-massive-performance-leap-for-deep-learning-hpc-applications-with-nvidia-tesla-p100-accelerators
- **Primeira geração:** nenhum release da P100 usa a expressão, mas o release da V100 (10/05/2017) fala em "up to 2x the throughput of the prior generation NVLink", o que põe a da P100 como a geração anterior.
- **"Oito placas falando entre si":** confirmado que as oito se ligam por NVLink. Se cada placa fala direto com todas as outras sete: **não confirmei** (a Nvidia chama a malha de "Hybrid Cube Mesh"; não li diagrama oficial).
- **A entrega à OpenAI.** Post do blog da Nvidia "NVIDIA CEO Delivers World's First AI Supercomputer in a Box to OpenAI", assinado por Jim McHugh, **15 de agosto de 2016** (segunda-feira):
  > "That's why NVIDIA CEO Jen-Hsun Huang last week hand-delivered the world's first AI supercomputer in a box (...) our NVIDIA DGX-1 (...) to OpenAI in San Francisco."
  - "OpenAI's researchers will put the first production DGX-1 (...) to work on artificial intelligence's toughest problems."
  - Huang: "I thought it was incredibly appropriate that the world's first supercomputer dedicated to artificial intelligence would go to the laboratory that was dedicated to open artificial intelligence."
  - "Building DGX-1 took 3,000 people working for three years, Huang explained."
  - Ilya Sutskever: "The DGX-1 is a huge advance (...) It will allow us to explore problems that were completely unexplored before, and it will allow us to achieve levels of performance that weren't achievable."
  - Greg Brockman, então CTO: "Artificial intelligence has the potential to be the most positive technology that humans ever create".
  - Andrej Karpathy: "you can train, basically, a chatbot, but you can do it in a way that the computer learns how language works and how people interact". (Gancho possível pro 11.04.)
  - Legenda da foto: "Huang and the team at OpenAI signed the first DGX-1 AI supercomputer in a box to be delivered."
  https://blogs.nvidia.com/blog/2016/08/15/first-ai-supercomputer-openai-elon-musk-deep-learning/ (lido no Internet Archive)
- **Dia exato: não confirmei.** "Last week" num post de 15/08 aponta pra semana de 8 a 12 de agosto. O tuíte do Elon Musk agradecendo ("Would like to thank @nvidia and Jensen for donating the first DGX-1 AI supercomputer to @OpenAI in support of democratizing AI technology") tem o id 763096729134575617; decodificado, dá **9 de agosto de 2016, 19:36 UTC**. Então a entrega foi **em 9 de agosto de 2016 ou antes**.
  https://x.com/elonmusk/status/763096729134575617
- **Quem recebeu e o que foi escrito.** O post da Nvidia não nomeia o Musk. A Fortune (Jonathan Vanian, 15/08/2016, secundária) diz: "A photo accompanying the press announcement shows both Huang and Musk looking at the supercomputer, which Huang signed." E a frase escrita na máquina, literal na Fortune:
  > "To Elon and the OpenAI Team!" (...) "To the future of computing and humanity. I present you the world's first DGX-1!"
  https://fortune.com/2016/08/15/elon-musk-artificial-intelligence-openai-nvidia-supercomputer/

### 2. P100 e a memória empilhada (HBM2)

**Corrigido em parte: a P100 não foi a primeira placa com HBM.**

- Release da P100, 05/04/2016: "16GB of CoWoS HBM2 stacked memory"; "Chip on Wafer on Substrate (CoWoS) with HBM2, provides a 3x boost in memory bandwidth performance, or 720GB/sec, compared to the Maxwell architecture"; o desenho junta "processor and data into a single package"; "15.3 billion transistors built on 16 nanometer FinFET". O único "primeiro" do release é outro: "the first accelerator to deliver more than 5 and 10 teraflops of double-precision and single-precision performance".
  https://nvidianews.nvidia.com/news/nvidia-delivers-massive-performance-leap-for-deep-learning-hpc-applications-with-nvidia-tesla-p100-accelerators
- **A primeira placa com HBM foi da AMD.** Release de 16/06/2015: a Radeon R9 Fury X, chip "Fiji", é "the world's first HBM-powered graphics card", à venda "starting June 24th" (2015). A memória é "High-Bandwidth Memory (HBM) integrated on-chip delivering 60% more memory bandwidth over GDDR5", em "94 percent less PCB surface area", e o HBM foi "pioneered by a consortium led by AMD". Os 4 GB de HBM de primeira geração só vi em fonte secundária (título do review da PC Perspective).
  https://ir.amd.com/news-events/press-releases/detail/619/amd-ushers-in-a-new-era-of-pc-gaming-with-radeontm-r9-and-r7-300-series-graphics-line-up-including-worlds-first-graphics-family-with-revolutionary-hbm-technology · https://pcper.com/2015/06/the-amd-radeon-r9-fury-x-4gb-review-fiji-finally-tested/
- "Primeira GPU com HBM2" para a P100: só secundária (Wccftech); a Nvidia não escreve isso. "Primeira placa da Nvidia com HBM": não achei Nvidia anterior com HBM, mas também não achei a frase em primária. **Não confirmei.**
  https://wccftech.com/nvidia-pascal-tesla-p100-gp100-gpu/
- **Por que a memória subiu pra perto do chip:** os dois releases (AMD 2015, Nvidia 2016) vendem a mesma coisa, a banda de memória (quantos dados por segundo vão e voltam), não a conta; e o release do NVLink de 2014 chama o PCIe de gargalo. "O gargalo virou mover número" é leitura nossa desses três textos, não frase de nenhum deles.

### 3. V100 (2017)

**Confirmado, com um ajuste no que o Tensor Core faz.**

- Release de **10 de maio de 2017** (GTC), "NVIDIA Launches Revolutionary Volta GPU Platform": "Equipped with 640 Tensor Cores, V100 delivers 120 teraflops of deep learning performance"; Tensor Cores "designed to speed AI workloads"; "900 GB/sec HBM2 DRAM"; NVLink com "up to 2x the throughput of the prior generation NVLink". O release não diz a capacidade de memória.
  https://nvidianews.nvidia.com/news/nvidia-launches-revolutionary-volta-gpu-platform-fueling-next-era-of-ai-and-high-performance-computing
- **O que o Tensor Core faz** (blog técnico da Nvidia, 17/10/2017, Jeremy Appleyard e Scott Yokim): "Each Tensor Core provides a 4x4x4 matrix processing array that performs the operation D = A * B + C, where A, B, C, and D are 4×4 matrices", com as entradas em meia precisão (16 bits).
  https://developer.nvidia.com/blog/programming-tensor-cores-cuda-9/
  Em linguagem simples: um pedaço do chip que, de uma vez, multiplica duas tabelinhas de 4 por 4 e soma uma terceira, com números de 16 bits. A rede neural é feita de milhões dessas contas, então a placa ganha por fazer esse bloquinho em série.
- **Memória:** o datasheet da V100 (jan/2020) traz "GPU Memory 32 GB /16 GB HBM2" e diz "V100 is now available in a 32GB configuration that doubles the memory of the standard 16GB offering". Os **16 GB no lançamento** também estão em HotHardware e PC Gamer (secundárias, maio de 2017).
  https://images.nvidia.com/content/technologies/volta/pdf/volta-v100-datasheet-update-us-1165301-r5.pdf
- **32 GB em 27 de março de 2018** (GTC), release "NVIDIA Boosts World's Leading Deep Learning Computing Platform": "a 2x memory boost to NVIDIA Tesla V100" e "The Tesla V100 32GB GPU is immediately available across the complete NVIDIA DGX system portfolio". No mesmo anúncio: NVSwitch, "which enables up to 16 Tesla V100 GPUs to simultaneously communicate at a record speed of 2.4 terabytes per second" (DGX-2).
  https://nvidianews.nvidia.com/news/nvidia-boosts-worlds-leading-deep-learning-computing-platform-bringing-10x-performance-gain-in-six-months
- **Consumo:** datasheet, "Max Power Consumption": **250 W** (PCIe) e **300 W** (SXM2, a versão NVLink). No treino do GPT-3, a OpenAI mediu **330 W por V100** contando memória, rede, ventoinha e processador (Patterson e outros, item 9).

### 4. TPU do Google

**Confirmado, com um ajuste: só a v3 é resfriada a líquido.**

- Post de **18 de maio de 2016**, assinado por Norm Jouppi ("Google Fellow"), "Google supercharges machine learning tasks with TPU custom chip":
  > "We've been running TPUs inside our data centers for more than a year, and have found them to deliver an order of magnitude better-optimized performance per watt for machine learning."
  Já rodavam RankBrain (busca), Street View e o AlphaGo nas partidas contra Lee Sedol.
  https://cloud.google.com/blog/products/ai-machine-learning/google-supercharges-machine-learning-tasks-with-custom-chip
- Post retrospectivo do Google Cloud (TPU, 10 anos): projeto começa em 2013/2014; TPU v1 em produção interna em 2015; TPU v2 em 2017 como "training supercomputer"; TPU v3 em 2018 com resfriamento a líquido. (Data do post não li.)
  https://cloud.google.com/blog/transform/ai-specialized-chips-tpu-history-gen-ai
- **TPU v2:** anunciada no Google I/O, **17 de maio de 2017**, post de Jeff Dean e Urs Hölzle: "Each of these new TPU devices delivers up to 180 teraflops of floating-point performance" e "A TPU pod contains 64 second-generation TPUs and provides up to 11.5 petaflops". Cloud TPU em alfa e 1.000 Cloud TPUs de graça pra pesquisadores (TensorFlow Research Cloud).
  https://cloud.google.com/blog/topics/inside-google-cloud/google-cloud-offer-tpus-machine-learning
- **Abriu pra fora:** Cloud TPU em beta em **12 de fevereiro de 2018** (John Barrus e Zak Stone): "Cloud TPUs are available in limited quantities today and usage is billed by the second at the rate of $6.50 USD / Cloud TPU / hour"; cada placa com "four custom ASICs", "up to 180 teraflops" e "64 GB of high-bandwidth memory".
  https://cloud.google.com/blog/products/gcp/cloud-tpu-machine-learning-accelerators-now-available-in-beta/
- **TPU v3 e o líquido:** Google I/O, **8 de maio de 2018**. Frase de Sundar Pichai no keynote, citada pela HPCwire (09/05/2018, secundária): "These chips are so powerful that for the first time, we have to introduce liquid cooling in our data centers"; pods "8x more powerful", "well over 100 petaflops". Primária posterior, Google Cloud, 29/04/2025 (Madhusudan Iyengar e Amber Huffman):
  > "Google first used liquid cooling in TPU v3 that was deployed in 2018."
  > "This allowed us to double chip density and quadruple the size of our liquid-cooled TPU v3 supercomputer compared to the air-cooled TPU v2 generation."
  https://www.hpcwire.com/2018/05/09/google-o-2018-ai-everywhere-tpu-3-0-delivers-100-petaflops-requires-liquid-cooling/ · https://cloud.google.com/blog/topics/systems/enabling-1-mw-it-racks-and-liquid-cooling-at-ocp-emea-summit
- **Ajuste:** a espinha dizia "TPU v2 e v3 (2017 a 2018) e o refrigerador a líquido". A v2 era **a ar**; o líquido começa na **v3, em 2018**.
- Consumo por chip (Patterson e outros, Tabela 4): TPU v2 com TDP de 280 W, TPU v3 com 450 W.

### 5. Mellanox e InfiniBand

**Confirmado.**

- **Anúncio: 11 de março de 2019.** "NVIDIA would acquire Mellanox for $125 per share in cash, representing a total enterprise value of approximately $6.9 billion". E: "Mellanox pioneered the InfiniBand interconnect technology, which along with its high-speed Ethernet products is now used in over half of the world's fastest supercomputers".
  https://nvidianews.nvidia.com/news/nvidia-to-acquire-mellanox-for-6-9-billion
- **Fechamento: 27 de abril de 2020**, "transaction value of $7 billion". Eyal Waldman, "founder and CEO": "This is a powerful, complementary combination of cultures, technology and ambitions".
  https://nvidianews.nvidia.com/news/nvidia-completes-acquisition-of-mellanox-creating-major-force-driving-next-gen-data-centers
- **O que o InfiniBand faz entre gabinetes**, visto nas fichas técnicas (a divisão abaixo é leitura minha de três fontes, não frase de uma só):
  - DGX A100 (release 14/05/2020): dentro do gabinete, "Six NVIDIA NVSwitch interconnect fabrics with third-generation NVIDIA NVLink"; pra fora, "Nine Mellanox ConnectX-6 HDR 200Gb per second network interfaces".
    https://nvidianews.nvidia.com/news/nvidia-ships-worlds-most-advanced-ai-system-nvidia-dgx-a100-to-fight-covid-19-third-generation-dgx-packs-record-5-petaflops-of-ai-performance
  - Selene, o supercomputador da Nvidia que treinou o Megatron-Turing NLG (Microsoft Research, outubro de 2021): "560 DGX A100 servers networked with HDR InfiniBand in a full fat tree configuration".
    https://www.microsoft.com/en-us/research/blog/using-deepspeed-and-megatron-to-train-megatron-turing-nlg-530b-the-worlds-largest-and-most-powerful-generative-language-model/
  - DGX H100 (guia oficial): "8 x NVIDIA ConnectX-7 Single Port InfiniBand Cards", "Up to 400Gbps".
    https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html
  Em linguagem simples: dentro do gabinete as placas conversam pelo NVLink; de um gabinete pro outro, pelo InfiniBand.

### 6. O supercomputador da Microsoft pra OpenAI

**Confirmado nos números; corrigido na ligação com o GPT-3.**

- Post da Microsoft, **19 de maio de 2020**, Jennifer Langston, anunciado na conferência Build pelo CTO Kevin Scott (o endereço antigo `blogs.microsoft.com/ai/openai-azure-supercomputer/` redireciona pro novo): "more than 285,000 CPU cores, 10,000 GPUs and 400 gigabits per second of network connectivity for each GPU server", e "top five" entre os "publicly disclosed" (frase literal conferida no 11.01).
  https://news.microsoft.com/source/features/innovation/openai-azure-supercomputer/
- **O post não diz o modelo da placa e não cita o GPT-3.**
- Paper do GPT-3, seção 2.3: "All models were trained on V100 GPU's on part of a high-bandwidth cluster provided by Microsoft." (conferido no 11.01)
  https://arxiv.org/abs/2005.14165
- Patterson e outros (2021), apêndice: "NVIDIA's press release about GPT-3 suggests OpenAI used 10,000 V100 GPUs for GPT-3." e, na conta, "we used NVIDIA's suggestion of 10,000 GPUs".
  https://arxiv.org/abs/2104.10350
- **Ajuste:** "o GPT-3 foi treinado nele" não está escrito em nenhuma primária que li. Com fonte dá pra dizer: o GPT-3 foi treinado em V100 num cluster da Microsoft (paper), e a Microsoft anunciou nove dias antes do paper uma máquina de 10 mil placas pra OpenAI (post). Que sejam a mesma máquina é o que as datas sugerem, não o que os textos dizem.
- Posição real na lista TOP500: não procurei (a Microsoft não diz qual; o post fala só em "top five" dos divulgados).

### 7. A100 (maio de 2020)

**Confirmado. Entra de leve, como a placa do galpão de 2020 a 2022.**

- Release de **14 de maio de 2020**, "NVIDIA's New Ampere Data Center GPU in Full Production": particiona "a single A100 GPU (...) into as many as seven separate GPUs"; "new TF32 for AI"; "Third-generation NVIDIA NVLink"; "up to 20x".
  https://nvidianews.nvidia.com/news/nvidias-new-ampere-data-center-gpu-in-full-production
- DGX A100 (mesmo dia): "NVIDIA DGX A100 systems start at $199,000"; "320GB in total GPU memory" (oito placas, 40 GB cada); "The first order going to the U.S. Department of Energy's (DOE) Argonne National Laboratory".
- A100 de 80 GB: anunciada em **16 de novembro de 2020** (SC20), HBM2e, "doubles the A100 40GB GPU's high-bandwidth memory to 80GB" (URL do release abaixo; texto lido só no resumo da busca).
  https://nvidianews.nvidia.com/news/nvidia-doubles-down-announces-a100-80gb-gpu-supercharging-worlds-most-powerful-gpu-for-ai-supercomputing
- Onde entra: é a placa do Selene (Megatron-Turing NLG, 2021) e do RSC da Meta (2022), ver Parte 4.

### 8. H100 (março de 2022)

**Confirmado o anúncio; corrigidos o "primeira" e o "camada por camada"; memória com fontes em conflito.**

- Release de **22 de março de 2022**, "NVIDIA Announces Hopper Architecture":
  - "Named for Grace Hopper, a pioneering U.S. computer scientist".
  - "packed with 80 billion transistors", "TSMC 4N process".
  - > "New Transformer Engine (...) The H100 accelerator's Transformer Engine is built to speed up these networks as much as 6x versus the previous generation without losing accuracy."
  - Os "primeiros" que a Nvidia reivindica: "the first GPU to support PCIe Gen5", "the first to utilize HBM3", "the world's first accelerator with confidential computing capabilities". **Nenhum deles é sobre o Transformer Engine.**
  - DGX H100: "32 petaflops of AI performance at new FP8 precision".
  - "NVIDIA H100 will be available starting in the third quarter."
  https://nvidianews.nvidia.com/news/nvidia-announces-hopper-architecture-the-next-generation-of-accelerated-computing
- **O Transformer Engine é software mais circuito**, não só uma peça:
  - Datasheet da H100: "The Transformer Engine uses software and Hopper Tensor Core technology designed to accelerate training for models built from the world's most important AI model building block, the transformer. Hopper Tensor Cores can apply mixed FP8 and FP16 precisions".
    https://www.megware.com/fileadmin/user_upload/LandingPage%20NVIDIA/nvidia-h100-datasheet.pdf (datasheet oficial hospedado por revendedor)
  - Repositório oficial: "Transformer Engine (TE) is a library for accelerating Transformer models on NVIDIA GPUs, including using 8-bit floating point (FP8) precision on Hopper, Ada, and Blackwell GPUs".
    https://github.com/NVIDIA/TransformerEngine
- **Como ele escolhe 8 ou 16 bits:** a documentação diz que o fator de escala é escolhido "based on the maximums of absolute values seen in some number of previous iterations" (a escala atrasada), **por tensor**, e que "All FP8-safe operations have their inputs cast to FP8"; o que não é seguro fica em precisão maior.
  https://archive.docs.nvidia.com/deeplearning/transformer-engine-releases/release-1.13/user-guide/examples/fp8_primer.html
  "Troca entre 8 e 16 bits **camada por camada**": **não confirmei** em primária. O resumo da busca atribui ao post da Nvidia de 22/03/2022 ("H100 Transformer Engine Supercharges AI Training") a frase "switches automatically between 16-bit and 8-bit precision", mas não consegui abrir o post (o endereço antigo do blog não abre).
- **Memória da H100: fontes em conflito.** O release de 2022 diz "the first to utilize HBM3". O datasheet da Nvidia diz só "80GB". A Lenovo Press (fabricante de servidor, secundária) lista a H100 de 80 GB PCIe com "80 GB HBM2e" e a H100 NVL de 94 GB com "HBM3". O release da H200 (13/11/2023, lido no resumo da busca) chama a H200 de "the first GPU to offer HBM3e". **Não confirmei o tipo na versão SXM.** Recomendação: no roteiro, dizer só **80 GB**.
  https://lenovopress.lenovo.com/lp1732-thinksystem-nvidia-h100-pcie-gen5-gpu · https://nvidianews.nvidia.com/news/nvidia-supercharges-hopper-the-worlds-leading-ai-computing-platform
- **Consumo:** até 700 W na versão SXM (página oficial da H100, "Up to 700W"); 350 W na PCIe (Lenovo).
  https://www.nvidia.com/en-us/data-center/h100/
- **Quando começou a ser entregue de fato:** release de **20 de setembro de 2022**, "NVIDIA Hopper in Full Production": "global tech partners planning in October to roll out the first wave of products"; "H100-powered systems from the world's leading computer makers are expected to ship in the coming weeks"; nuvens (AWS, Google, Azure, Oracle) "starting next year" (2023); a DGX H100 só passa a aceitar pedido. Que a DGX H100 foi entregue no primeiro trimestre de 2023: só HPCwire (secundária).
  https://nvidianews.nvidia.com/news/nvidia-hopper-in-full-production · https://www.hpcwire.com/2022/09/20/nvidias-hopper-gpus-enter-full-production-dgxs-delayed-until-q1/
- **Ajuste:** a espinha dizia "a primeira placa com uma peça feita pra um tipo de programa". A Nvidia não reivindica isso, e a V100 de 2017 já trazia o Tensor Core "designed to speed AI workloads". Com fonte dá pra dizer: **a Nvidia deu a uma parte da H100 o nome do Transformer**, e ela mistura contas de 8 e 16 bits.
- Nota de cronologia (leitura minha de duas datas com fonte): o post do ChatGPT diz que o GPT-3.5 "finished training in early 2022" (11.01), antes de a H100 chegar a cliente (outubro de 2022). O "mesmo mês" do Chinchilla e do InstructGPT vale pro **anúncio**, não pro uso.

### 9. Energia

**Confirmado.**

- Patterson, Gonzalez, Le, Liang, Munguia, Rothchild, So, Texier e Dean, "Carbon Emissions and Large Neural Network Training", arXiv 2104.10350 (v1 em 21/04/2021). Tabela 4, coluna GPT-3: processador V100; TDP 300 W; potência medida por acelerador 330 W; **10.000 chips**; **14,8 dias**; 3,14E+23 operações; **1.287 MWh**; **552,1 tCO2e**; PUE 1,10; data center da Microsoft; "When model ran: 2020". No texto: "Its estimated carbon emissions due to training are 552 tCO2e and its energy consumption is 1287 MWh."
  https://arxiv.org/abs/2104.10350 · https://arxiv.org/pdf/2104.10350
- Ressalva do próprio paper: "OpenAI measured V100 performance, V100 power, total FLOPS, and PUE for GPT-3"; o número de placas e os dias são estimativa ("it doesn't actually matter whether it takes 2 weeks on 10,000 GPUs or 20 weeks on 1,000 GPUs").
- Conta de conferência (minha): 10.000 × 330 W = 3,3 MW; × 14,8 dias × 24 h ≈ 1.172 MWh; × PUE 1,10 ≈ 1.289 MWh. Bate. "Megawatts por semanas" está certo.
- **Comparação honesta:**
  - EUA: EIA, "In 2022, the average annual amount of electricity sold to (purchased by) a U.S. residential electric-utility customer was 10,791 kilowatthours (kWh)". 1.287.000 ÷ 10.791 ≈ **119 casas americanas por um ano**.
    https://www.eia.gov/tools/faqs/faq.php?id=97&t=3
  - Brasil: EPE, Fact Sheet do Anuário Estatístico de Energia Elétrica 2022 (ano-base 2021), consumo médio residencial por região: Norte 182,8; Nordeste 130,6; **Sudeste 174,5**; Sul 185,0; Centro-Oeste 191,2 kWh/mês. Média nacional: não achei na folha. Conta minha com o Sudeste: 174,5 × 12 = 2.094 kWh por ano, então 1.287 MWh ≈ **615 casas do Sudeste por um ano**.
    https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-160/topico-168/Fact%20Sheet%20-%20Anu%C3%A1rio%20Estat%C3%ADstico%20de%20Energia%20El%C3%A9trica%202022.pdf
- **Consumo de um gabinete:** DGX-1 (2016) 3.200 W; DGX H100 (2022) "System power ~10.2kW max" (datasheet da Nvidia). DGX-2 (2018) com 10 kW: só secundária (HotHardware).
  https://openzeka.com/en/wp-content/uploads/2022/04/ai-for-enterprise-dgx-h100-datasheet-nvidia-a4-2146027-r3-web.pdf (datasheet oficial hospedado por revendedor)
- **Por que a refrigeração virou problema** (Google Cloud, 29/04/2025): "The dramatic increase in chip power consumption (...) from 100W chips to accelerators exceeding 1000W (...) has made advanced thermal management essential. Packing more powerful chips into racks also creates significant challenges for cooling density."

### 10. RTX 5090 e a conta da placa de casa

**Confirmado, com uma nuance nos bits e um erro sobre os pesos.**

- Página oficial da RTX 5090: "32 GB GDDR7", potência "575" W.
  https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/
- Release da série 50 (CES, janeiro de 2025): US$ 1.999, à venda a partir de **30 de janeiro de 2025**, "92 billion transistors", e o suporte a FP4 "enabling generative AI models to run locally in a smaller memory footprint".
  https://nvidianews.nvidia.com/news/nvidia-blackwell-geforce-rtx-50-series-opens-new-world-of-ai-computer-graphics
- **A conta.** 16 bits = 2 bytes; 4 bits = meio byte. Em 16 bits, 32 GB guardam uns 16 bilhões de parâmetros; em 4 bits, na conta pura, 64 bilhões. Só que o arquivo de verdade pesa mais que meio byte por parâmetro (tamanhos da biblioteca do Ollama, distribuidor, secundária):
  - Llama 3.3 70B: 4 bits (q4_K_M) **43 GB**; 8 bits 75 GB; 16 bits 141 GB. Então **70 bilhões em 4 bits passa de 32 GB**: conta pura 35 GB, arquivo real 43 GB. Confirmado.
  - Mas o mesmo 70B comprimido em 3 bits (q3_K_S) tem 31 GB e em 2 bits (q2_K) 26 GB: o arquivo cabe.
  - Qwen2.5 32B em 4 bits: **20 GB** (cabe); Qwen2.5 72B em 4 bits: 47 GB (não cabe).
  https://ollama.com/library/llama3.3/tags · https://ollama.com/library/qwen2.5/tags
  - "Até uns 30 bilhões" é seguro, com folga. Rodar também gasta memória com a conversa em andamento; quanto, não confirmei.
- GPT-3: 175 bilhões × 2 bytes = 350 GB; 350 ÷ 32 = 10,9, ou seja, **11 placas só pra guardar os números**. Aritmética confirmada.
- **Erro na espinha: "os de ponta (GPT, Claude) (...) os pesos não são liberados".** A OpenAI publicou **gpt-oss-120b e gpt-oss-20b** com pesos abertos (licença Apache 2.0) em **5 de agosto de 2025**, os primeiros desde o GPT-2; o 20b tem 21 bilhões de parâmetros e já vem em 4 bits (MXFP4); do 120b a OpenAI diz que roda "on a single 80 GB GPU". Fontes lidas: Hugging Face e Simon Willison, 05/08/2025 (secundárias); a página oficial da OpenAI não foi aberta. Ajuste pro roteiro: "os modelos de ponta da OpenAI não têm os pesos liberados; em 2025 ela liberou dois menores". Sobre o Claude: não pesquisei.
  https://huggingface.co/blog/welcome-openai-gpt-oss · https://simonwillison.net/2025/Aug/5/gpt-oss/ · https://openai.com/index/introducing-gpt-oss/

### 11. Jensen Huang (só o destino)

- **CEO da Nvidia** em 2026: Fortune, 01/09/2026, "the CEO of the world's most valuable company, Nvidia".
  https://fortune.com/2026/09/01/nvidia-ceo-jensen-huang-ai-will-create-hundreds-of-thousands-of-jobs-skilled-trade-workers-data-centers/

---

## Parte 2: fichas das pessoas

Regra: só o que tem fonte pública. "Não confirmei" quer dizer que não achei, não que não exista.

### 1. Norm Jouppi (Norman P. Jouppi)

- **Nascimento / família:** não confirmei (nem a Wikipedia nem a página do Google trazem).
- **Estudo:** mestrado em engenharia elétrica na Northwestern (1980); doutorado em engenharia elétrica em Stanford (1984). (Página oficial do Google, primária.)
  https://techsysinfra.google/aboutus/tsi-leaders/norm-jouppi/
- **Carreira:** em Stanford, "one of the principal architects and designers of the MIPS microprocessor" (página do Google); Digital Equipment Corporation (Western Research Lab) a partir de 1984; Compaq e HP, onde dirigiu laboratórios na HP Labs até 2011; Google a partir de 2013 (Wikipedia, secundária). Prêmios: Eckert–Mauchly (2015) e IEEE Seymour Cray (2024), segundo a Wikipedia.
  https://en.wikipedia.org/wiki/Norman_Jouppi
- **Papel na TPU:** "the tech lead for Google Tensor Processing Units (TPUs)" (página do Google); "since their inception in 2013" (Wikipedia). Assinou o post que revelou a TPU em 18/05/2016.
- **Destino do trabalho:** segue no Google, título "VP, Engineering Fellow" (página oficial, sem data). Em **25 de agosto de 2026** apresentou a oitava geração de TPU no Hot Chips (ChipLog, prévia de 20/08/2026; Tae Kim, relato da palestra; secundárias). Frase dele no relato: "In the past, we've come out with one chip a year...but now we're introducing two chips a year."
  https://www.chiplog.io/p/hot-chips-2026-preview-3d-dram-rubin · https://taekim.substack.com/p/hot-chips-google-8th-generation-tpu

### 2. Eyal Waldman

- **Nascimento:** Jerusalém (Wikipedia, secundária). **Ano: não confirmei** (a Wikipedia só o põe na categoria de nascidos em 1960, sem data no texto).
- **Família:** pai economista, mãe doutora (química, segundo a Wikipedia); tem um irmão gêmeo não idêntico. A filha, Danielle Waldman, foi morta no ataque de 7 de outubro de 2023, no festival de música perto de Re'im. Ele contou à NPR (TPR, 23/01/2026): "She was an amazing girl. She was an American. She was born in California."
  https://en.wikipedia.org/wiki/Eyal_Waldman · https://www.tpr.org/2026-01-23/an-israeli-tech-investor-reflects-on-the-war-in-gaza
- **Estudo:** Technion (começou em engenharia química e trocou pra ciência da computação); mestrado em engenharia elétrica (Wikipedia).
- **Carreira:** Intel (1989 a 1993); cofundador da Galileo Technology; **cofundou a Mellanox em 1999** e foi o CEO até a venda pra Nvidia (release da Nvidia de 2020: "founder and CEO"). Prêmio Israel em 2024 (Wikipedia).
- **Saída:** **divergência.** A Wikipedia diz que saiu da Nvidia em abril de 2020; a Calcalist de **04/11/2020** diz que ele "told the company's employees that he will leave his position (...) in a week". Fico com a Calcalist, que é datada e do momento.
  https://www.calcalistech.com/ctech/articles/0,7340,L-3868752,00.html
- **Destino do trabalho:** investidor. NPR/TPR, **23/01/2026**: "A major Israeli tech investor", procurando investimentos na Arábia Saudita, Emirados, Síria e Líbano. Calcalist, 16/04/2025: "active investor".
  https://www.tpr.org/2026-01-23/an-israeli-tech-investor-reflects-on-the-war-in-gaza · https://www.calcalistech.com/ctechnews/article/re8b44w9j

### 3. Kevin Scott

- **Nascimento:** 1972, Gladys, Virgínia, zona rural (Wikipedia, secundária). Família: não confirmei.
- **Estudo:** bacharelado em ciência da computação na Lynchburg College; mestrado na Wake Forest; largou o doutorado na University of Virginia em 2003 (Wikipedia).
  https://en.wikipedia.org/wiki/Kevin_Scott_(computer_scientist)
- **Carreira:** Google (2003 a 2007, busca e anúncios); AdMob (2007 a 2010); LinkedIn (2011 a 2017, vice-presidente sênior de engenharia); **CTO da Microsoft desde janeiro de 2017**, nomeado por Satya Nadella (Wikipedia).
- **Papel no galpão:** anunciou o supercomputador pra OpenAI no Build de 19/05/2020 (post da Microsoft, item 6). Frase dele no post: "This is about being able to do a hundred exciting things in natural language processing at once and a hundred exciting things in computer vision".
- **Destino do trabalho:** segue **CTO da Microsoft**. Post do blog da própria Microsoft (Command Line) de **02/06/2026**, sobre a palestra dele em San Francisco em 01/06/2026, com o título "Microsoft CTO". Página de autor da Microsoft: "Executive Vice President and Chief Technology Officer" (sem data).
  https://commandline.microsoft.com/kevin-scott-build-2026-lectures-on-tap/ · https://blogs.microsoft.com/blog/author/kscott/

### 4. Jensen Huang (só o destino)

- CEO da Nvidia, Fortune 01/09/2026 (item 11 da Parte 1). Ficha completa no 9.02.

---

## Parte 3: filmes e documentários

Só o que confirmei existir. Ordem: do mais colado no episódio pro mais tangente.

### 1. Overview, temporada 3, episódio 4: "We Saw What AI Data Centers Don't Want You to See" (2026) · SÉRIE DOCUMENTAL DE TV

- PBS, publicado em **30/05/2026**, 21 min 44 s.
  https://www.pbs.org/video/we-saw-what-ai-data-centers-dont-want-you-to-see-n1ewcf/
- **Por que conversa:** é o galpão por fora. Filma com drone térmico o Stargate em Abilene, Texas (geradores a diesel e turbinas a gás) e o Colossus da xAI; é a tela da energia vista de cima.
- **Viés / distorção:** é de 2025/2026, bem depois da janela, e tem tom de denúncia ambiental; os números de emissão são estimativas do programa. Não explica placa nem rede.
- **Onde assistir:** pbs.org e app da PBS (EUA). Brasil: não confirmei (vídeo da PBS pode ter trava de região).

### 2. 60 Minutes: a reportagem sobre Jensen Huang e a Nvidia (2024) · REPORTAGEM DE TV

- CBS, correspondente Bill Whitaker, exibida em **28/04/2024**; versão atualizada reexibida em 29/12/2024 (secundária). Duração: não confirmei.
  https://www.cbsnews.com/news/nvidia-ai-focus-under-jensen-huang-60-minutes/
- **Por que conversa:** conta a virada da placa de videogame pra placa de IA, com o Huang falando: "in a San Jose Denny's, where he and two friends (...) dreamed up a whole new way of processing video game graphics".
- **Viés / distorção:** perfil de empresário no auge do valor da Nvidia; o chip mostrado é o Blackwell (2024), fora da janela; quase nada de galpão.
- **Onde assistir:** site da CBS News (texto e vídeo). Brasil: não confirmei.

### 3. A Chip Odyssey (造山者, 2025) · DOCUMENTÁRIO

- Direção: Hsiao Chu-chen. Estreia em Taiwan em **13/06/2025** (Taiwan News, 16/04/2025; Focus Taiwan, 12/06/2025; Digitimes). Duração: não confirmei.
  https://www.taiwannews.com.tw/news/6086815 · https://focustaiwan.tw/culture/202506120019
- **Por que conversa:** a história da indústria de chips de Taiwan, que fabrica as placas do galpão. **Serve melhor pra etapa 12** ("quem fabrica a placa que todo mundo passou a querer?").
- **Viés / distorção:** tom de epopeia nacional; a participação do Jensen Huang só vi num resumo de busca, não confirmei.
- **Onde assistir:** a página da TaiwanPlus deu 404. Brasil: não confirmei.

### O que procurei e NÃO serve (ou não existe)

- **Não existe** documentário sobre o DGX-1, o NVLink, a V100, a TPU, a Mellanox ou o InfiniBand, o supercomputador da Microsoft ou a H100. Também não achei longa documental sobre a Nvidia ou o Jensen Huang: só reportagens e entrevistas de TV (60 Minutes, CNBC).
- *Ghost in the Machine* (2026, Valerie Veatch, 110 min, Sundance 26/01/2026; Independent Lens, PBS no outono de 2026): ensaio crítico sobre a IA como marketing e a ligação da estatística com a eugenia, passando por semicondutores e William Shockley. Não é sobre o galpão. Fora do 11.02.
  https://en.wikipedia.org/wiki/Ghost_in_the_Machine_(2026_film) · https://www.sundance.org/blogs/2026-sundance-film-festival-ghost-in-the-machine/
- *In the Age of AI* (Frontline, PBS, 05/11/2019, 1 h 54 min): a própria página diz que é sobre emprego, vigilância e a disputa com a China; não mostra placa nem data center. Fora.
  https://www.pbs.org/wgbh/frontline/documentary/in-the-age-of-ai/

---

## Parte 4: buracos (candidatos, sem inventar)

1. **Jonathan Ross.** Começou a TPU como projeto de 20% no Google e desenhou partes da primeira geração (bios de palestra, secundárias: All About Circuits, Kisaco); fundou a Groq. Em **24/12/2025** a Groq anunciou licença não exclusiva pra Nvidia, e "Jonathan Ross, Groq's Founder, Sunny Madra, Groq's President, and other members of the Groq team will join Nvidia" (release da Groq). Candidato a dividir a ficha da TPU com o Jouppi, e amarra com a Nvidia.
   https://groq.com/newsroom/groq-and-nvidia-enter-non-exclusive-inference-technology-licensing-agreement-to-accelerate-ai-inference-at-global-scale · https://www.allaboutcircuits.com/podcast/ep-42-groq-ceo-ex-googler-jonathan-ross-petaflop-ai-chip-first-ever-tpu
2. **NVSwitch e DGX-2 (27/03/2018).** É o degrau entre "oito placas no gabinete" e "o corredor": 16 V100 conversando a 2,4 TB/s (release no item 3). Serve pra tela 8.
3. **Selene e o Megatron-Turing NLG 530B (outubro de 2021).** 560 DGX A100 com HDR InfiniBand: o InfiniBand em ação dentro da janela (item 5).
4. **Research SuperCluster da Meta (24/01/2022).** 760 DGX A100, 6.080 placas, com plano de 16.000 até meados de 2022 (post da Meta; texto lido só no resumo da busca).
   https://ai.meta.com/blog/ai-rsc/
5. **PaLM (abril de 2022).** 540 bilhões de parâmetros treinados em 6.144 TPU v4, em dois pods (arXiv 2204.02311; lido só no resumo da busca). Mostra a TPU v4, que a espinha não tem; não conferi a TPU v4.
   https://arxiv.org/abs/2204.02311
6. **Andrej Karpathy na entrega do DGX-1** ("train, basically, a chatbot", agosto de 2016): gancho pronto pro 11.04, com fonte no post da Nvidia (item 1). Ficha dele não conferida.

---

## Ajustes (o plano dizia X, a fonte diz Y)

1. **NVLink:** o plano dizia "NVLink (2016)"; a fonte diz que foi anunciado em **25/03/2014** e só chegou em produto em 2016, na P100 e no DGX-1.
2. **Entrega do DGX-1:** o plano dizia "agosto de 2016"; está certo, mas o dia não está escrito em lugar nenhum: o post da Nvidia de 15/08 diz "last week" e o tuíte do Musk é de **09/08/2016**, então a entrega foi nesse dia ou antes. A Nvidia chama a máquina de "the first production DGX-1"; o nome do Musk e a frase escrita na máquina só aparecem na Fortune.
3. **Memória empilhada:** a espinha tratava a P100 como a estreia do HBM; a primeira placa com HBM foi a **AMD Radeon R9 Fury X (junho de 2015)**. A Nvidia não diz que a P100 foi a primeira com HBM2.
4. **Tensor Core:** o plano dizia "a multiplicação de matriz numa instrução"; a fonte diz que cada Tensor Core faz **D = A × B + C com matrizes de 4 por 4, em 16 bits**, um bloquinho repetido milhões de vezes.
5. **TPU e o líquido:** o plano dizia "TPU v2 e v3 e o refrigerador a líquido"; a v2 era **a ar**, o líquido começa na **v3 (2018)**.
6. **Supercomputador da Microsoft:** o plano ligava a máquina ao GPT-3; o post **não diz a placa nem cita o GPT-3**. O paper do GPT-3 diz "V100 (...) cluster provided by Microsoft", e os "10 mil V100" do GPT-3 são "NVIDIA's suggestion", como escreve o Patterson.
7. **H100 "a primeira placa com uma peça feita pra um tipo de programa":** a Nvidia não diz isso, e a V100 já tinha o Tensor Core pra IA em 2017. O **Transformer Engine é software mais Tensor Core**, e "camada por camada" não confirmei: a documentação fala em escala **por tensor**.
8. **H100, memória:** o release de 2022 diz HBM3; a ficha da Lenovo diz **80 GB HBM2e** pra H100 PCIe; o datasheet da Nvidia só diz 80 GB. Dizer só "80 GB".
9. **H100, quando chegou:** anunciada em março de 2022, mas os servidores só começam a sair em **outubro de 2022** e as nuvens em **2023**. O "mesmo mês do Chinchilla e do InstructGPT" vale pro anúncio, não pro uso.
10. **RTX 5090 e o 70B:** o plano dizia "um de 70 bilhões comprimido já passa de 32 GB"; em **4 bits** sim (arquivo de 43 GB), mas comprimido em 2 ou 3 bits o arquivo cabe (26 e 31 GB). Dizer "comprimido em 4 bits".
11. **Pesos fechados:** o plano dizia que os de ponta (GPT, Claude) não liberam pesos, "então não há o que baixar"; a OpenAI **liberou gpt-oss-120b e gpt-oss-20b em 05/08/2025**. Dizer "os modelos de ponta" e não "o GPT".
12. **Eyal Waldman, saída:** a Wikipedia diz abril de 2020; a Calcalist de 04/11/2020 diz que ele sairia "in a week". Ficar com novembro de 2020.

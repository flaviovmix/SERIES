# Mapa das telas (gerado do audio, 12.2 min)

O audio ja existe: a `animacao.html` tem que servir ao que foi falado, nao o contrario.
Cada tela abaixo termina num "aperte o proximo" do audio.

| Tela | Entra em | Dura | Tem instrucao de interagir? |
|---|---|---|---|
| 1 | 00:00 | 02:33 | **Sim** |
| 2 | 02:33 | 01:48 | **Sim** |
| 3 | 04:21 | 01:40 | - |
| 4 | 06:01 | 01:30 | - |
| 5 | 07:32 | 01:29 | - |
| 6 | 09:01 | 01:25 | **Sim** |
| 7 | 10:27 | 01:47 | - |

## O que o audio fala em cada tela

### Tela 1 (00:00 a 02:33, 02:33)

Olá, mundo sem ideia! Bom, imagina a seguinte situação de trabalho. É fim de sexta-feira, o prazo de entrega do projeto está quase terminando, e a pessoa clica no famoso botão verde de play. E de repente absolutamente nada acontece. Pois é, nada! Não tem um aviso, não tem janela de erro apontando linha de código, o sistema simplesmente cruza os braços, sabe? E quem só sabe apertar o botão verde, tipo... Percebe que está sentado numa bomba relógio nesse momento. Exatamente. A pessoa não faz ideia de como consertar algo que quebrou fora do código em si. A reação natural é tentar reinstalar o programa inteiro, né? Perder horas tentando achar uma solução mágica na internet. Tudo porque a fundação de como a linguagem funciona ficou totalmente mascarada por aquele botão verde. E é justamente por isso que a gente está aqui. Com certeza! Na nossa etapa anterior, a tela inicial da aplicação já ficou de pé. Ela foi feita em HTML e CSS. E o navegador já exibe o resultado visual certinho. Mas a missão de hoje entra num terreno diferente. Entra mesmo. O nosso foco agora é ir para o terminal e escrever, compilar e rodar o primeiro programa Java na mão. Tudo dentro do editor VS Code, né? Totalmente sem ideia. Isso. E aliás, vale lembrar que esse foi o pedido exato de um aluno. Foi o pedido que deu origem a toda esta série. É um retorno à fundação. Eu gosto de usar a analogia do carro com câmbio automático para isso. A expectativa é aquele conforto, né? O carro troca a marcha sozinho e ninguém precisa ver a embreagem. Uhum, tudo prático. Só que, na nossa jornada, a gente vai dirigir um carro de câmbio manual apenas uma vez. O objetivo é sentir cada troca de marcha para entender como o processo funciona lá no fundo. Enxergar a mecânica da coisa. Exato. E eu quero deixar esse limite bem claro aqui. Ninguém precisa dirigir carro manual para sempre. A ideia não é sofrer, mas sim enxergar o processo para depois voltar para o automático com muito mais clareza. Perfeito. E antes de entrar nos passos, eu preciso dar um aviso rápido sobre como consumir esse nosso encontro. Claro, pode falar. Quem não estiver com a página da animação aberta pode acompanhar pelo áudio sem problema nenhum. A conversa funciona igual. Mas para quem está com a página aberta, tem uma mecânica. Isso. A animação tem 7 telas e quem está assistindo só deve avançar de tela quando a gente pedir por aqui. Ah, eu também já deixo avisado que lá na tela do artigo de código, a pessoa vai poder tocar em cada linha para entender a função dela na prática. Bem interativo. Então, para a gente desarmar essa bomba relógio, aperte o próximo.

### Tela 2 (02:33 a 04:21, 01:48)

Então, para a gente desarmar essa bomba relógio, aperte o próximo. Bom, a nossa segunda tela foca direto no que a IDE esconde. E acho que primeiro a gente precisa definir o que é uma ideia de um jeito bem simples. É um programa grande, né? É, um programa robusto que reúne o editor, o compilador e o executor. Tudo empacotado numa janela única. A gente tem nomes super conhecidos no mercado. NetBeans, Eclipse, IntelliJ. Sim. E é bom me forçar que a série não é contra as Ideas. Imagina, a gente não tem absolutamente nada contra quem usa essas ferramentas. Elas resolvem problemas gigantes. Mas a questão central aqui é que a IDE faz 4 coisas fundamentais totalmente escondidos do usuário. E a primeira é que ela acha o kit do Java instalado no computador. Ela cria essa ponte à sozinha. Exato. É uma coisa que a ferramenta compila o código automaticamente, toda vez que o arquivo é salvo. Sabe quando a pessoa digita algo errado e a linha fica sublinhada em vermelho quase na mesma hora? Sim. Aquilo já é o compilador agindo e escondido. A terceira função é que a IDE monta o caminho de pastas onde as classes ficam guardadas. Tudo sem ninguém precisar pedir ou configurar na mão. E a quarta ação, que é a mais famosa, é que ela roda o programa inteiro com um único clique no botão verde. O que nos leva de volta ao problema que a gente citou no começo. Pois é. Quem sempre usou o botão verde, tipo, nunca viu essas quatro etapas acontecerem. Aí quando uma falha, a pessoa simplesmente não sabe por onde começar. É bem isso. Funciona muito bem todo dia, até o dia em que para. E a gente está tratando isso como um problema de ambiente de trabalho. Não é um problema de código. Por isso, o nosso combinado de hoje é fazer esses quatro passos na mão, mas apenas desta vez. Entender as ingrenagens antes de voltar para o automático. Então para montar esse ambiente do zero, aperte o próximo.

### Tela 3 (04:21 a 06:01, 01:40)

Então para montar esse ambiente do zero, aperte o próximo. Chegamos na oficina de verdade. Essa tela apresenta as três peças reais que formam o nosso ambiente de trabalho. E a primeira peça é o VS Code. Só que aqui a gente precisa esclarecer uma confusão bem comum. O VS Code não é uma ideia. Não é. Ele é só um editor de texto com um terminal acoplado do lado. Ele não sabe compilar e não sabe rodar Java de forma nativa. E o material destaca que isso é muito positivo para essa etapa. Sim, porque garante que qualquer ação só vai acontecer se houver um comando direto de quem está usando. Ele não toma decisão sozinho. O que nos leva para a segunda peça, que é o JDK. A sigla significa kit de desenvolvimento Java, certo? Isso mesmo. É um kit literal e dentro deles estão o compilador, que se chama Java, o executor, chamado Java, e a biblioteca padrão com todos os códigos prontos. Peraí. Sem o JDK, o VS Code seria tipo som bloco de notas? Exatamente. A impligência mora toda no kit. E a terceira peça da oficina foca em conectar o terminal com esse kit. O terminal precisa achar o JDK. Porque ao digitar Java que o terminal procure esse nome numa lista interna de pastas do sistema, né? Exato. E tem um teste definitivo para provar que a oficina está montada. Que é digitar o comando Java com a opção version. Se o terminal devolver o número da versão, tudo está no lugar. Mas e se o terminal responder comando não encontrado? Aí o processo para ali mesmo. Nada mais vai funcionar se o computador não souber onde o kit está escondido. Com a oficina validada, a gente pode seguir. Então aperte o próximo.

### Tela 4 (06:01 a 07:32, 01:30)

Então aperte o próximo. Agora a gente entra na tela do arquivo. Para quem está com a animação aberta, lembre de tocar em cada linha do arquivo que está na tela. Para descobrir o que cada linha faz e o que quebra se ela for apagada, sabe? E o nome desse arquivo é ola.java. Aqui a gente tem a primeira regra dura da linguagem. O nome do arquivo precisa ser exatamente igual ao nome da classe que está dentro dele. Sim, inclusive respeitando a letra maiúscula arrisca. Se o arquivo chama ola com o maiúsculo, a classe precisa chamar ola com o maiúsculo. Qualquer mínima diferença e o compilador já começa a reclamar. O código na tela tem apenas cinco linhas. E a gente pode descrever elas de um jeito muito simples. A primeira linha declara uma classe chamada ola. Até porque todo o programa Java obrigatoriamente mora dentro de uma classe. Isso. A segunda linha declara o método men, o famoso men. Ele é a porta de entrada. Sem o men, o Java simplesmente se recusa a iniciar. Ele não acha o ponto de partida. A terceira linha é a que realmente executa a ação de imprimir um texto na tela. E as linhas 4 e 5. Elas só fecham o método e a classe, né? Sempre na ordem inversa em que as portas foram abertas. A régua de apretos usado aqui é clara. O objetivo é olhar para essas cinco linhas e saber o motivo de cada um existir. Exato. Se uma linha não tem o motivo claro na sua cabeça, ela não deveria estar no arquivo. Sem copiar e colar sem sentido, aperte o próximo.

### Tela 5 (07:32 a 09:01, 01:29)

Sem copiar e colar sem sentido, aperte o próximo. Bom, agora a gente vai para o terminal executar o primeiro passo de ação real. A gente vai compilar. O comando é Java C acompanhado do nome do arquivo completo com a extensão ponto Java. E aí acontece uma coisa curiosa. O terminal reage de um jeito que assusta quem não está acostumado. Ele fica em silêncio por um segundo, né? E de repente um arquivo novo chamado olá ponto class surge ali na pasta. Esse silêncio do terminal é na verdade a confirmação visual de que a operação deu certo. Mas me conta, o que rolou naquele um segundo? O compilador assumiu o controle. Ele leu o arquilo de texto, validou se as instruções faziam sentido lógico e traduziu tudo para um formato que a máquina consegue entender. Só que no dia a dia esqueceu um fechamento de bloco ou errar uma letra é super normal. E aí entram os erros de sintasse. Com certeza. E a mensagem de erro do compilador entrega sempre três dados preciosos. O arquivo, o número da linha e o que faltou. A instrução do material ela é primeiro número da linha apontada. E só depois leu que o compilador esperava encontrar lá. A mensagem parece uma bronca, mas é um guia perfeito de como arrumar o problema. E tem uma regra de ouro sensacional antes de compilar. A pessoa deve prever o resultado em voz alta antes de apertar a tecla. Esperando que nenhum erro apareça e que o arquivo class seja criado. Se tiver mensagem de erro é sinal de que a compreensão sobre o código estava incompleta. Aperte o próximo.

### Tela 6 (09:01 a 10:27, 01:25)

Aperte o próximo. Agora sim, a gente vai rodar o programa de verdade usando o comando Java. Só que aqui tem uma pegadinha forte que derruba a maioria dos iniciantes. Sim, o comando Java pede apenas o nome da classe sem nenhuma extensão. O certo é digitar apenas Javaola. Se botar o ponto class ou o ponto Java, quebra tudo. O executor vai sozinho procurar o arquivo class correspondente lá na pasta. E quando o comando funciona, o momento é de vitória. O texto Olá Mundo finalmente aparece em preço na tela do terminal. É a primeira vez que o computador obedece uma instrução completa da pessoa sem precisar do botão verde mágico. É, mas a gente precisa falar sobre o erro mais famoso que rola no terminal nessa hora. Aquela mensagem dizendo que a classe principal não foi encontrada. Essa mesma. Ela ocorre quando se tenta rodar o comando na pasta errada ou com o nome incorreto. A gente não vai se aprofundar na solução técnica agora. Não. Esse erro tem um motivo lógico muito específico que vai ser o foco exclusivo de um episódio futuro sobre class path. Hoje o objetivo é só reconhecer a existência do erro e não se apavorar. E a grande lição dessas duas últimas telas é entender a separação de papéis. Compilar e rodar são ações de dois programas totalmente separados. O Java e o Java. E o botão verde da IDE apenas mascarava essas duas ações em um clique rápido. Aperte o próximo.

### Tela 7 (10:27 a 12:14, 01:47)

Aperte o próximo. Chegando no fim do nosso encontro, a gente pode revisar os pontos principais. A IDE encobria quatro coisas pesadas. Localizar o kit, compilar salvando, definir os caminhos e executar. Vimos também que a oficina de verdade usa um editor simples, o JDK e o terminal bem configurado. E o código inicial tem cinco linhas com justificativas claríssimas. A gente compila com Java e roda com Java sempre sem a extensão no final. E aprendemos que qualquer erro de sintaxe se resolve olhando primeiro para a linha que o terminal apontou. Agora, o que a gente tira disso e leva para a vida em outras linguagens? Todo o compilador e interpretador do mundo usa passos semelhantes sob nomes diferentes. Sim, em C, por exemplo, o compilador é o GCC, que gera um executável direto. Em Python, o passo de compulação é invisível e o próprio comando faz as duas tarefas de uma vez. Do JavaScript, o node assume o papel de executor da mesma forma. Quem entende essa engrenagem toda consegue ler os erros de ambiente de qualquer tecnologia, porque o erro sempre avisa em qual passo o processo quebrou. Você sai do escuro e passa a controlar a esteira. Só que a gente encerra com um mistério muito bom para a nossa próxima análise da oficina. O mistério do arquivo Class, que surgiu do nada depois do silêncio do terminal. Pois é. O que exatamente existe dentro dele? Porque ele não é o produto final pronto para o sistema operacional executar direto. E de que maneira esse arquivo específico é o grande responsável pela promessa de que o Java roda em qualquer máquina do planeta? Esse é o segredo que a gente vai desvendar. Pense em sobre essas perguntas. Até a nossa próxima conversa. Fiquem de olho e até a próxima.

## Segunda passada: conferir no audio

Nomes e datas que o modelo pequeno pode ter inventado. Rodar:

```
python mapa-de-telas.py "<pasta>" --confere <mm:ss>,<mm:ss>
```

- `00:55` HTML
- `01:05` Java
- `01:12` Code
- `02:57` Eclipse
- `02:57` IntelliJ
- `03:00` Ideas
- `09:17` Javaola
- `09:30` Mundo
- `11:18` Python
- `11:24` JavaScript
- `11:45` Class

## Conferencia contra o roteiro

Roteiro: `_NotebookLM_Ola Mundo Sem IDE.txt`. Divergencia aqui nao e erro automatico: o NotebookLM resume,
troca a ordem e as vezes diz o ano por extenso. Cada linha abaixo e pra ouvir e decidir.

- **Telas:** roteiro pedia 7, audio entregou 7. OK
- **Janela temporal:** o roteiro nao declara "cobre de X a Y". Regra de 26/08 nao cumprida no texto.
- **Protagonistas citados no audio:** Code, Java, Primeira, Quem

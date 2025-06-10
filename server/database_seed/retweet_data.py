"""
Arquivo contendo os dados dos retweets (respostas) para o seed do banco de dados.
Cada retweet é uma resposta a um tweet original, criando uma conversação.
"""

# Lista de retweets (respostas) para os tweets existentes
RETWEETS_DATA = [
    # Respostas ao tweet de Harry sobre as Maldições Imperdoáveis
    {
        "parent_nickname": "TheChosenOne",  # Tweet original de Harry
        "parent_text_snippet": "Falando por experiência, há momentos em que a linha entre o certo e o necessário",
        "nickname": "DracoM",
        "text": "Típico Potter, sempre se achando especial por suas 'experiências'. Talvez você precise aprender que no mundo real as escolhas são mais difíceis que em Hogwarts.",
    },
    {
        "parent_nickname": "TheChosenOne",
        "parent_text_snippet": "Falando por experiência, há momentos em que a linha entre o certo e o necessário",
        "nickname": "ProfMcGonagall",
        "text": "Sr. Potter, essa é uma reflexão madura. No entanto, lembre-se que Dumbledore sempre ensinou que nossos valores são testados não quando é fácil, mas quando é extremamente difícil mantê-los.",
    },
    {
        "parent_nickname": "TheChosenOne",
        "parent_text_snippet": "Falando por experiência, há momentos em que a linha entre o certo e o necessário",
        "nickname": "LunaL",
        "text": "Harry, você já considerou que talvez as Maldições Imperdoáveis sejam tão proibidas porque atraem Wrackspurts Obscuros? Eles se alimentam de magia negativa, sabe...",
    },
    # Respostas ao tweet de Hermione sobre a lei
    {
        "parent_nickname": "HermioneG",
        "parent_text_snippet": "A lei é clara sobre as Maldições Imperdoáveis por uma razão",
        "nickname": "ProfSnape",
        "text": "Sempre a sabe-tudo, não é mesmo, Srta. Granger? A teoria é bem diferente da prática. Alguns aurores usaram Imperdoáveis na Primeira Guerra. Isso os torna maus? Talvez a vida não seja tão preto no branco.",
    },
    {
        "parent_nickname": "HermioneG",
        "parent_text_snippet": "A lei é clara sobre as Maldições Imperdoáveis por uma razão",
        "nickname": "CedricD",
        "text": "Concordo totalmente, Hermione. Se começarmos a justificar exceções, onde traçamos o limite? A integridade é tudo.",
    },
    {
        "parent_nickname": "HermioneG",
        "parent_text_snippet": "A lei é clara sobre as Maldições Imperdoáveis por uma razão",
        "nickname": "ProfKettleburn",
        "text": "Ah, Srta. Granger! Já enfrentei um Rabo-Córneo Húngaro descontrolado sem usar magia negra. Se consegui lidar com um dragão furioso usando só magia convencional, certamente podemos enfrentar bruxos das trevas da mesma forma!",
    },
    # Respostas ao tweet de Ron
    {
        "parent_nickname": "RonW",
        "parent_text_snippet": "Se for para salvar quem você ama, acho que qualquer coisa vale",
        "nickname": "ProfFlitwick",
        "text": "Sr. Weasley, a intenção é nobre, mas lembre-se: mesmo um simples feitiço de levitação pode ser poderoso quando usado com precisão e inteligência. Não subestime a magia 'comum'.",
    },
    {
        "parent_nickname": "RonW",
        "parent_text_snippet": "Se for para salvar quem você ama, acho que qualquer coisa vale",
        "nickname": "TonksN",
        "text": "É um pensamento perigoso, Ron. Acredite, muitos aurores começaram assim e se perderam no caminho. Eu entendo o sentimento, mas é uma ladeira escorregadia.",
    },
    {
        "parent_nickname": "RonW",
        "parent_text_snippet": "Se for para salvar quem você ama, acho que qualquer coisa vale",
        "nickname": "ChoC",
        "text": "Weasley, perdemos pessoas queridas na guerra. Mas não podemos nos tornar aquilo que combatemos, por mais doloroso que seja.",
    },
    # Respostas ao tweet de Draco
    {
        "parent_nickname": "DracoM",
        "parent_text_snippet": "Poder é poder. Os fracos se preocupam com 'ética'",
        "nickname": "ProfLupin",
        "text": "Sr. Malfoy, essa mentalidade já levou muitos bruxos talentosos a um caminho sem volta. A força real está em resistir à tentação do poder fácil. Pense nisso.",
    },
    {
        "parent_nickname": "DracoM",
        "parent_text_snippet": "Poder é poder. Os fracos se preocupam com 'ética'",
        "nickname": "HermioneG",
        "text": "Clássico Malfoy. Sempre confundindo crueldade com força. Saiba que resistir à tentação de usar magia negra exige mais coragem do que ceder a ela.",
    },
    {
        "parent_nickname": "DracoM",
        "parent_text_snippet": "Poder é poder. Os fracos se preocupam com 'ética'",
        "nickname": "ProfSprout",
        "text": "Sr. Malfoy! Na natureza, as plantas mais resistentes não são as que atacam, mas as que se adaptam. Talvez haja uma lição aí sobre verdadeira força?",
    },
    # Respostas ao tweet de Pansy
    {
        "parent_nickname": "PansyP",
        "parent_text_snippet": "Draco tem razão. Às vezes, você precisa mostrar quem manda",
        "nickname": "ProfTrelawney",
        "text": "Minha querida, vejo uma aura perturbada ao seu redor! Aqueles que abraçam as trevas frequentemente encontram destinos... ah, terríveis! Os presságios são claros!",
    },
    {
        "parent_nickname": "PansyP",
        "parent_text_snippet": "Draco tem razão. Às vezes, você precisa mostrar quem manda",
        "nickname": "TheChosenOne",
        "text": "Parkinson, falar é fácil quando você nunca enfrentou Voldemort ou viu o que as Maldições realmente fazem. Acredite, não há glória nisso.",
    },
    {
        "parent_nickname": "PansyP",
        "parent_text_snippet": "Draco tem razão. Às vezes, você precisa mostrar quem manda",
        "nickname": "LunaL",
        "text": "Você sabia que os Heliopatas do Ministério foram criados justamente por pessoas com esse tipo de pensamento? É fascinante como a magia negra atrai criaturas do fogo eterno.",
    },
    # Respostas ao tweet de Cedric
    {
        "parent_nickname": "CedricD",
        "parent_text_snippet": "Acho que nunca há justificativa para tamanha crueldade",
        "nickname": "ProfSnape",
        "text": "Nobre Diggory, sempre o exemplo de virtude. A vida raramente nos apresenta escolhas claras. Quando estiver frente a frente com as trevas, veremos se seus princípios permanecerão intactos.",
    },
    {
        "parent_nickname": "CedricD",
        "parent_text_snippet": "Acho que nunca há justificativa para tamanha crueldade",
        "nickname": "RonW",
        "text": "Fácil falar isso quando você é bom em tudo, Diggory. Nem todos têm tantas opções ou habilidades para se defender.",
    },
    {
        "parent_nickname": "CedricD",
        "parent_text_snippet": "Acho que nunca há justificativa para tamanha crueldade",
        "nickname": "ProfSlughorn",
        "text": "Excelente ponto de vista, Sr. Diggory! Você me lembra muito um jovem que conheci anos atrás... antes de tomar certas... escolhas infelizes. Mantenha essa integridade!",
    },
    # Respostas ao tweet de McGonagall
    {
        "parent_nickname": "ProfMcGonagall",
        "parent_text_snippet": "Como professora de Transfiguração, devo dizer que há sempre alternativas",
        "nickname": "TheChosenOne",
        "text": "Professora, respeito muito sua opinião, mas quando enfrentei Voldemort, os feitiços comuns pareciam insuficientes. Como nos preparamos para enfrentar inimigos que não têm escrúpulos?",
    },
    {
        "parent_nickname": "ProfMcGonagall",
        "parent_text_snippet": "Como professora de Transfiguração, devo dizer que há sempre alternativas",
        "nickname": "DracoM",
        "text": "Fácil dizer isso protegida dentro dos muros de Hogwarts, professora. O mundo lá fora não espera enquanto praticamos transfiguração.",
    },
    {
        "parent_nickname": "ProfMcGonagall",
        "parent_text_snippet": "Como professora de Transfiguração, devo dizer que há sempre alternativas",
        "nickname": "HermioneG",
        "text": "Professora McGonagall, a senhora poderia nos dar exemplos de transfigurações defensivas que seriam eficazes contra as Artes das Trevas? Acho que seria um conhecimento valioso.",
    },
    # Respostas ao tweet de Snape
    {
        "parent_nickname": "ProfSnape",
        "parent_text_snippet": "Arrogância típica da juventude achar que sabe tudo sobre as Artes das Trevas",
        "nickname": "LunaL",
        "text": "Professor Snape, o senhor já considerou que talvez as Artes das Trevas sejam apenas incompreendidas, assim como os Bufadores de Chifre Enrugado?",
    },
    {
        "parent_nickname": "ProfSnape",
        "parent_text_snippet": "Arrogância típica da juventude achar que sabe tudo sobre as Artes das Trevas",
        "nickname": "TonksN",
        "text": "Com todo respeito, professor, alguns de nós enfrentamos bruxos das trevas diariamente como Aurores. Nossa experiência prática também conta.",
    },
    {
        "parent_nickname": "ProfSnape",
        "parent_text_snippet": "Arrogância típica da juventude achar que sabe tudo sobre as Artes das Trevas",
        "nickname": "ProfLupin",
        "text": "Severus, concordo que a experiência é valiosa, mas também devemos lembrar que nosso papel como educadores é guiar os jovens para longe das trevas, não intimidá-los com elas.",
    },
    # Mais algumas respostas aos tweets dos alunos
    {
        "parent_nickname": "TonksN",
        "parent_text_snippet": "Como Auror, já vi coisas terríveis",
        "nickname": "ProfMcGonagall",
        "text": "Srta. Tonks, sua experiência como Auror é valiosa para esta discussão. Talvez pudéssemos organizar uma palestra para os alunos do sétimo ano sobre alternativas eficazes às Artes das Trevas em situações reais?",
    },
    {
        "parent_nickname": "TonksN",
        "parent_text_snippet": "Como Auror, já vi coisas terríveis",
        "nickname": "CedricD",
        "text": "Tonks, você acha que o treinamento de Aurores deveria incluir mais discussões éticas sobre esses dilemas?",
    },
    {
        "parent_nickname": "LunaL",
        "parent_text_snippet": "As Narguilés devem detestar Maldições Imperdoáveis",
        "nickname": "ProfTrelawney",
        "text": "Srta. Lovegood, seu Olho Interior é notável! Poucos percebem a conexão entre criaturas etéreas e a energia negativa das maldições. Talvez devêssemos discutir isso em uma aula especial...",
    },
    {
        "parent_nickname": "LunaL",
        "parent_text_snippet": "As Narguilés devem detestar Maldições Imperdoáveis",
        "nickname": "PansyP",
        "text": "Lovegood, você é completamente maluca. Estamos falando de guerra e sobrevivência, não de suas criaturas imaginárias!",
    },
    # Respostas ao segundo tweet de Harry
    {
        "parent_nickname": "TheChosenOne",
        "parent_text_snippet": "Mas e quando o inimigo não joga limpo, Hermione?",
        "nickname": "ProfFlitwick",
        "text": "Sr. Potter, em duelos profissionais, a criatividade frequentemente supera a força bruta. Um feitiço simples usado de forma inovadora pode superar até mesmo a magia mais obscura.",
    },
    {
        "parent_nickname": "TheChosenOne",
        "parent_text_snippet": "Mas e quando o inimigo não joga limpo, Hermione?",
        "nickname": "ProfKettleburn",
        "text": "Potter! Já enfrentei um Nundu sem usar uma única maldição! Perdi três dedos e parte da minha orelha esquerda no processo, mas o ponto é: há sempre métodos alternativos!",
    },
    {
        "parent_nickname": "TheChosenOne",
        "parent_text_snippet": "Mas e quando o inimigo não joga limpo, Hermione?",
        "nickname": "ChoC",
        "text": "Harry, entendo sua preocupação, mas também me preocupo com o que usar essas maldições faria com você. Não quero ver você se transformar em algo que não é.",
    },
    # Mais respostas para completar a conversa
    {
        "parent_nickname": "HermioneG",
        "parent_text_snippet": "Mas se nos rebaixarmos ao nível deles, Harry",
        "nickname": "ProfSprout",
        "text": "Muito bem colocado, Srta. Granger! Na Herbologia, aprendemos que mesmo as plantas mais venenosas têm contrapartes que as neutralizam. O mesmo vale para a magia.",
    },
    {
        "parent_nickname": "HermioneG",
        "parent_text_snippet": "Mas se nos rebaixarmos ao nível deles, Harry",
        "nickname": "DracoM",
        "text": "É por isso que vocês, Grifinórios, perderiam uma guerra real. Estão mais preocupados com aparências morais do que com resultados.",
    },
    {
        "parent_nickname": "DracoM",
        "parent_text_snippet": "Sentimentalismo barato, Granger",
        "nickname": "ProfSnape",
        "text": "Sr. Malfoy, embora entenda seu ponto, devo adverti-lo que subestimar o poder da escolha moral é um erro que muitos bruxos das trevas cometeram... para seu próprio prejuízo.",
    },
    {
        "parent_nickname": "DracoM",
        "parent_text_snippet": "Sentimentalismo barato, Granger",
        "nickname": "CedricD",
        "text": "Malfoy, essa mentalidade é exatamente o que divide nossa comunidade. No final, todos somos bruxos, e nossas escolhas definem quem somos, não nosso poder.",
    },
]

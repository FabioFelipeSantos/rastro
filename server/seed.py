import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "twitter_api.settings")
django.setup()

from django.utils import timezone

from twitter.models import User, Tweet, Bio, Avatar

USER_PASSWORD = "aA.*12*.Aa"


def create_users_and_profiles():
    """
    Cria usuários de Harry Potter, suas biografias e avatares.
    Garante no mínimo 2 usuários de cada casa de Hogwarts.
    """
    print("Criando usuários e perfis")
    users_data = [
        # Gryffindor - Alunos
        {
            "first_name": "Harry",
            "last_name": "Potter",
            "nickname": "TheChosenOne",
            "email": "harry.potter@hogwarts.com",
            "bio": {
                "text": "O garoto sobrevivente.",
                "city": "Grifinória",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": False,
        },
        {
            "first_name": "Hermione",
            "last_name": "Granger",
            "nickname": "HermioneG",
            "email": "hermione.granger@hogwarts.com",
            "bio": {
                "text": "A maior e melhor bruxa da sua idade.",
                "city": "Grifinória",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": False,
        },
        {
            "first_name": "Ron",
            "last_name": "Weasley",
            "nickname": "RonW",
            "email": "ron.weasley@hogwarts.com",
            "bio": {
                "text": "Rei do time de quadribol.",
                "city": "Grifinória",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": False,
        },
        # Gryffindor - Professores
        {
            "first_name": "Minerva",
            "last_name": "McGonagall",
            "nickname": "ProfMcGonagall",
            "email": "minerva.mcgonagall@hogwarts.com",
            "bio": {
                "text": "Diretora da Casa Grifinória e Professora de Transfiguração.",
                "city": "Grifinória",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": True,
        },
        {
            "first_name": "Remus",
            "last_name": "Lupin",
            "nickname": "ProfLupin",
            "email": "remus.lupin@hogwarts.com",
            "bio": {
                "text": "Professor de Defesa Contra as Artes das Trevas.",
                "city": "Grifinória",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": True,
        },
        # Slytherin - Alunos
        {
            "first_name": "Draco",
            "last_name": "Malfoy",
            "nickname": "DracoM",
            "email": "draco.malfoy@hogwarts.com",
            "bio": {
                "text": "Meu pai saberá disso. Espere e verá!",
                "city": "Grifinória",
                "state": "Sonserina",
                "country": "Harry Potter",
            },
            "is_professor": False,
        },
        {
            "first_name": "Pansy",
            "last_name": "Parkinson",
            "nickname": "PansyP",
            "email": "pansy.parkinson@hogwarts.com",
            "bio": {
                "text": "Sou o orgulho da Sonserina.",
                "city": "Grifinória",
                "state": "Sonserina",
                "country": "Harry Potter",
            },
            "is_professor": False,
        },
        # Slytherin - Professores
        {
            "first_name": "Severus",
            "last_name": "Snape",
            "nickname": "ProfSnape",
            "email": "severus.snape@hogwarts.com",
            "bio": {
                "text": "Diretor da Casa Sonserina e Mestre de Poções.",
                "city": "Sonserina",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": True,
        },
        {
            "first_name": "Horace",
            "last_name": "Slughorn",
            "nickname": "ProfSlughorn",
            "email": "horace.slughorn@hogwarts.com",
            "bio": {
                "text": "Professor de Poções e colecionador de alunos talentosos.",
                "city": "Sonserina",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": True,
        },
        # Hufflepuff - Alunos
        {
            "first_name": "Cedric",
            "last_name": "Diggory",
            "nickname": "CedricD",
            "email": "cedric.diggory@hogwarts.com",
            "bio": {
                "text": "O campeão de Hogwarts.",
                "city": "Lufa-Lufa",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": False,
        },
        {
            "first_name": "Nymphadora",
            "last_name": "Tonks",
            "nickname": "TonksN",
            "email": "nymphadora.tonks@hogwarts.com",
            "bio": {
                "text": "Metamorphmagus. Não me chame de Nymphadora!",
                "city": "Lufa-Lufa",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": False,
        },
        # Hufflepuff - Professores
        {
            "first_name": "Pomona",
            "last_name": "Sprout",
            "nickname": "ProfSprout",
            "email": "pomona.sprout@hogwarts.com",
            "bio": {
                "text": "Diretora da Casa Lufa-Lufa e Professora de Herbologia.",
                "city": "Lufa-Lufa",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": True,
        },
        {
            "first_name": "Silvanus",
            "last_name": "Kettleburn",
            "nickname": "ProfKettleburn",
            "email": "silvanus.kettleburn@hogwarts.com",
            "bio": {
                "text": "Professor de Trato das Criaturas Mágicas antes de Hagrid.",
                "city": "Lufa-Lufa",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": True,
        },
        # Ravenclaw - Alunos
        {
            "first_name": "Luna",
            "last_name": "Lovegood",
            "nickname": "LunaL",
            "email": "luna.lovegood@hogwarts.com",
            "bio": {
                "text": "Mantenha-os estranhos. Wrackspurts são reais.",
                "city": "Corvinal",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": False,
        },
        {
            "first_name": "Cho",
            "last_name": "Chang",
            "nickname": "ChoC",
            "email": "cho.chang@hogwarts.com",
            "bio": {
                "text": "Vitória para Ravenclaw.",
                "city": "Corvinal",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": False,
        },
        # Ravenclaw - Professores
        {
            "first_name": "Filius",
            "last_name": "Flitwick",
            "nickname": "ProfFlitwick",
            "email": "filius.flitwick@hogwarts.com",
            "bio": {
                "text": "Diretor da Casa Corvinal e Professor de Feitiços.",
                "city": "Corvinal",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": True,
        },
        {
            "first_name": "Sybill",
            "last_name": "Trelawney",
            "nickname": "ProfTrelawney",
            "email": "sybill.trelawney@hogwarts.com",
            "bio": {
                "text": "Professora de Adivinhação. O Olho Interior vê tudo.",
                "city": "Corvinal",
                "state": "Hogwarts",
                "country": "Harry Potter",
            },
            "is_professor": True,
        },
    ]

    created_users = {}

    for data in users_data:
        try:
            user, created = User.objects.get_or_create(
                first_name=data["first_name"],
                last_name=data["last_name"],
                nickname=data["nickname"],
                email=data["email"],
            )
            if created:
                user.set_password(USER_PASSWORD)
                user.save()
                print(f"Usuário {user.nickname} criado com sucesso.")

                bio, bio_created = Bio.objects.get_or_create(
                    user=user,
                    text=data["bio"]["text"],
                    city=data["bio"]["city"],
                    state=data["bio"]["state"],
                    country=data["bio"]["country"],
                )

                if bio_created:
                    print(f"Biografia para {user.nickname} criada com sucesso.")

                avatar, avatar_created = Avatar.objects.get_or_create(bio=bio)

                if avatar_created:
                    print(f"Avatar para {user.nickname} criado com sucesso.")

            user.house = data["bio"]["city"]
            user.is_professor = data.get("is_professor", False)
            created_users[user.nickname] = user
        except Exception as e:
            print(f"Erro ao criar usuário {data['nickname']}: {e}")
            try:
                user = (
                    User.objects.get(nickname=data["nickname"])
                    if User.objects.filter(nickname=data["nickname"]).exists()
                    else User.objects.get(email=data["email"])
                )
                user.house = data["bio"]["city"]
                user.is_professor = data.get("is_professor", False)
                created_users[user.nickname] = user
                print(f"Usuário {user.nickname} já existia e foi carregado.")
            except User.DoesNotExist:
                print(
                    f"Usuário {data['nickname']} não encontrado após erro. Verifique os dados."
                )

    return created_users


def establish_following_relationships(users_dict):
    """
    Estabelece relacionamentos de seguidores entre os usuários criados.
    1. Todos os usuários seguem o usuário 'TheChosenOne'
    2. Alunos da mesma casa se seguem mutuamente
    3. Alunos de Grifinória e Lufa-Lufa se seguem mutuamente
    4. Alunos de Sonserina e Corvinal se seguem mutuamente
    5. Professores seguem apenas TheChosenOne e alunos de sua própria casa
    """
    print("Estabelecendo relacionamentos de seguidores")
    users_list = list(users_dict.values())

    # 1. Todos seguem o TheChosenOne
    the_chosen_one = users_dict.get("TheChosenOne")
    if the_chosen_one:
        print("Fase 1: Todos seguem o TheChosenOne")
        for user in users_list:
            if user != the_chosen_one:
                user.following.add(the_chosen_one)
                print(f"{user.nickname} agora segue {the_chosen_one.nickname}.")

    # Mapear usuários por casa e tipo (professor ou aluno)
    houses = {}
    professors = {}

    for user in users_list:
        house = user.house
        if house not in houses:
            houses[house] = []
            professors[house] = []

        if user.is_professor:
            professors[house].append(user)
        else:
            houses[house].append(user)

    # 2. Alunos da mesma casa se seguem mutuamente
    print("Fase 2: Alunos da mesma casa se seguem mutuamente")
    for house, users in houses.items():
        for i, user in enumerate(users):
            for j in range(i + 1, len(users)):
                other_user = users[j]
                if user != other_user and other_user not in user.following.all():
                    user.following.add(other_user)
                    print(f"{user.nickname} agora segue {other_user.nickname}.")
                if other_user != user and user not in other_user.following.all():
                    other_user.following.add(user)
                    print(f"{other_user.nickname} agora segue {user.nickname}.")

    # 3. Alunos de Grifinória e Lufa-Lufa se seguem mutuamente
    print("Fase 3: Alunos de Grifinória e Lufa-Lufa se seguem mutuamente")
    gryffindor_users = houses.get("Grifinória", [])
    hufflepuff_users = houses.get("Lufa-Lufa", [])

    for gryffindor_user in gryffindor_users:
        for hufflepuff_user in hufflepuff_users:
            if hufflepuff_user not in gryffindor_user.following.all():
                gryffindor_user.following.add(hufflepuff_user)
                print(
                    f"{gryffindor_user.nickname} agora segue {hufflepuff_user.nickname}."
                )
            if gryffindor_user not in hufflepuff_user.following.all():
                hufflepuff_user.following.add(gryffindor_user)
                print(
                    f"{hufflepuff_user.nickname} agora segue {gryffindor_user.nickname}."
                )

    # 4. Alunos de Sonserina e Corvinal se seguem mutuamente
    print("Fase 4: Alunos de Sonserina e Corvinal se seguem mutuamente")
    slytherin_users = houses.get("Sonserina", [])
    ravenclaw_users = houses.get("Corvinal", [])

    for slytherin_user in slytherin_users:
        for ravenclaw_user in ravenclaw_users:
            if ravenclaw_user not in slytherin_user.following.all():
                slytherin_user.following.add(ravenclaw_user)
                print(
                    f"{slytherin_user.nickname} agora segue {ravenclaw_user.nickname}."
                )
            if slytherin_user not in ravenclaw_user.following.all():
                ravenclaw_user.following.add(slytherin_user)
                print(
                    f"{ravenclaw_user.nickname} agora segue {slytherin_user.nickname}."
                )

    # 5. Professores seguem apenas os alunos de sua própria casa
    print("Fase 5: Professores seguem os alunos de sua própria casa")
    for house in houses:
        house_students = houses.get(house, [])
        house_professors = professors.get(house, [])

        for professor in house_professors:
            for student in house_students:
                if student not in professor.following.all():
                    professor.following.add(student)
                    print(
                        f"Professor {professor.nickname} agora segue {student.nickname}."
                    )

    print("Relacionamentos de seguidores estabelecidos com sucesso.")


def create_discussion_tweets(users_dict):
    """
    Cria uma sequência de tweets para uma discussão sobre
    "A Ética de Usar Maldições Imperdoáveis, Mesmo em Situações Extremas."
    Cada usuário criado faz pelo menos um tweet.
    """
    if not users_dict:
        print("Nenhum usuário encontrado para criar tweets.")
        return

    tweets_data = [
        {
            "nickname": "TheChosenOne",
            "text": "Falando por experiência, há momentos em que a linha entre o certo e o necessário fica turva. Mas usar uma Imperdoável? É um peso para a alma.",
        },
        {
            "nickname": "HermioneG",
            "text": "A lei é clara sobre as Maldições Imperdoáveis por uma razão. Seu uso corrompe, independentemente da justificação. Devemos sempre buscar alternativas.",
        },
        {
            "nickname": "RonW",
            "text": "Se for para salvar quem você ama, acho que qualquer coisa vale. Mas não é uma decisão fácil, né? Assustador só de pensar.",
        },
        {
            "nickname": "DracoM",
            "text": "Poder é poder. Os fracos se preocupam com 'ética' quando a sobrevivência está em jogo. Alguns fins justificam os meios.",
        },
        {
            "nickname": "PansyP",
            "text": "Draco tem razão. Às vezes, você precisa mostrar quem manda. E se uma Imperdoável faz o trabalho...",
        },
        {
            "nickname": "CedricD",
            "text": "Acho que nunca há justificativa para tamanha crueldade. Lutar com honra é o que importa, mesmo contra o mal.",
        },
        {
            "nickname": "TonksN",
            "text": "Como Auror, já vi coisas terríveis. Usar uma Imperdoável é cruzar uma linha da qual talvez não haja volta. Mas entendo a pressão em campo.",
        },
        {
            "nickname": "LunaL",
            "text": "As Narguilés devem detestar Maldições Imperdoáveis. Elas obscurecem a aura. Prefiro um Expelliarmus bem colocado.",
        },
        {
            "nickname": "ChoC",
            "text": "É uma discussão horrível. Perder alguém ou usar uma magia tão sombria... Espero nunca ter que fazer essa escolha.",
        },
        # Tweets dos professores
        {
            "nickname": "ProfMcGonagall",
            "text": "Como professora de Transfiguração, devo dizer que há sempre alternativas às Maldições Imperdoáveis. A magia é vasta e cheia de possibilidades.",
        },
        {
            "nickname": "ProfLupin",
            "text": "Como professor de DCAT, ensino a vocês se defenderem contra as artes das trevas, não a usá-las. Existem limites que não devemos cruzar.",
        },
        {
            "nickname": "ProfSnape",
            "text": "Arrogância típica da juventude achar que sabe tudo sobre as Artes das Trevas. Vocês não têm ideia do que essas maldições realmente fazem.",
        },
        {
            "nickname": "ProfSlughorn",
            "text": "Oh, queridos! Essa discussão me lembra um aluno brilhante que tive... ele também tinha perguntas sobre magia poderosa. Um talento desperdiçado.",
        },
        {
            "nickname": "ProfSprout",
            "text": "Minhas plantas podem ser perigosas, mas nunca são cruéis. A natureza tem uma sabedoria que poderíamos aprender antes de recorrer à violência.",
        },
        {
            "nickname": "ProfKettleburn",
            "text": "Perdi vários membros estudando criaturas perigosas, mas nunca precisei de uma Imperdoável. Há sempre um caminho mais honrado.",
        },
        {
            "nickname": "ProfFlitwick",
            "text": "Um simples Wingardium Leviosa bem executado pode ser tão eficaz quanto uma maldição, sem danificar sua alma. É tudo sobre técnica e criatividade!",
        },
        {
            "nickname": "ProfTrelawney",
            "text": "Prevejo... prevejo consequências terríveis para aqueles que brincam com as Maldições Imperdoáveis. O destino sempre cobra seu preço!",
        },
        {
            "nickname": "TheChosenOne",
            "text": "Mas e quando o inimigo não joga limpo, Hermione? Voldemort não hesitaria. Às vezes, lutar fogo com fogo parece a única opção.",
        },
        {
            "nickname": "HermioneG",
            "text": "Mas se nos rebaixarmos ao nível deles, Harry, o que nos diferencia? A resistência moral também é uma forma de poder.",
        },
        {
            "nickname": "DracoM",
            "text": "Sentimentalismo barato, Granger. No mundo real, são os fortes que sobrevivem, não os 'moralmente superiores'.",
        },
    ]

    for tweet_data in tweets_data:
        user = users_dict.get(tweet_data["nickname"])
        if user:
            try:
                tweet = Tweet.objects.create(
                    user=user,
                    text=tweet_data["text"],
                )
                print(f"Tweet de {user.nickname}: '{tweet.text[:30]}...' criado.")
            except Exception as e:
                print(f"Erro ao criar tweet para {user.nickname}: {e}")
        else:
            print(f"Usuário {tweet_data['nickname']} não encontrado para criar tweet.")
    print("Tweets da discussão criados.")


def populate_database():
    """
    Função principal para executar todas as etapas de população.
    """
    from django.contrib.auth import get_user_model

    User = get_user_model()

    print("Iniciando a população do banco de dados...")
    print("Limpando dados antigos...")
    Tweet.objects.all().delete()
    Avatar.objects.all().delete()
    Bio.objects.all().delete()
    User.objects.filter(is_superuser=False).delete()

    created_users_map = create_users_and_profiles()
    if created_users_map:
        establish_following_relationships(created_users_map)
        create_discussion_tweets(created_users_map)
        print("População do banco de dados concluída com sucesso!")
    else:
        print("Criação de usuários falhou. Abortando o restante da população.")


if __name__ == "__main__":
    populate_database()

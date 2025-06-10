"""
Arquivo principal para população do banco de dados.
Importa os dados dos arquivos específicos e cria registros no banco de dados.
"""

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "twitter_api.settings")
django.setup()

from django.db import transaction

from twitter.models import User, Tweet, Bio, Avatar, TweetAssociation

from database_seed.user_data import USERS_DATA, USER_PASSWORD
from database_seed.tweet_data import TWEETS_DATA
from database_seed.retweet_data import RETWEETS_DATA


def create_users_and_profiles():
    """
    Cria usuários de Harry Potter, suas biografias e avatares.
    Garante no mínimo 2 usuários de cada casa de Hogwarts.
    """
    print("Criando usuários e perfis")

    created_users = {}

    for data in USERS_DATA:
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

    the_chosen_one = users_dict.get("TheChosenOne")
    if the_chosen_one:
        print("Fase 1: Todos seguem o TheChosenOne")
        for user in users_list:
            if user != the_chosen_one:
                user.following.add(the_chosen_one)
                print(f"{user.nickname} agora segue {the_chosen_one.nickname}.")

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

    created_tweets = {}

    for tweet_data in TWEETS_DATA:
        user = users_dict.get(tweet_data["nickname"])
        if user:
            try:
                tweet = Tweet.objects.create(
                    user=user,
                    text=tweet_data["text"],
                )
                created_tweets[f"{user.nickname}_{tweet.text[:30]}"] = tweet
                print(f"Tweet de {user.nickname}: '{tweet.text[:30]}...' criado.")
            except Exception as e:
                print(f"Erro ao criar tweet para {user.nickname}: {e}")
        else:
            print(f"Usuário {tweet_data['nickname']} não encontrado para criar tweet.")

    print("Tweets da discussão criados.")

    return created_tweets


def create_retweets(users_dict, tweets_dict):
    """
    Cria retweets (respostas) entre os tweets existentes,
    estabelecendo uma conversa coerente entre os personagens.
    """
    print("Criando retweets (respostas) para os tweets existentes")

    for retweet_data in RETWEETS_DATA:
        parent_nickname = retweet_data["parent_nickname"]
        parent_text_snippet = retweet_data["parent_text_snippet"]
        responder_nickname = retweet_data["nickname"]
        response_text = retweet_data["text"]

        parent_tweet = None
        for key, tweet in tweets_dict.items():
            if parent_nickname in key and parent_text_snippet in tweet.text:
                parent_tweet = tweet
                break

        if not parent_tweet:
            print(
                f"Tweet original de {parent_nickname} contendo '{parent_text_snippet}' não encontrado."
            )
            continue

        responder = users_dict.get(responder_nickname)
        if not responder:
            print(f"Usuário {responder_nickname} não encontrado para criar resposta.")
            continue

        try:
            response_tweet = Tweet.objects.create(user=responder, text=response_text)

            TweetAssociation.objects.create(
                parent_tweet=parent_tweet,
                associated_tweet=response_tweet,
                association_type="retweet",
            )

            print(
                f"Retweet criado: {responder_nickname} respondeu ao tweet de {parent_nickname}"
            )

        except Exception as e:
            print(f"Erro ao criar retweet: {e}")

    print("Retweets criados com sucesso.")


@transaction.atomic
def populate_database():
    """
    Função principal para executar todas as etapas de população.
    """
    from django.contrib.auth import get_user_model

    User = get_user_model()

    print("Iniciando a população do banco de dados...")
    print("Limpando dados antigos...")
    TweetAssociation.objects.all().delete()
    Tweet.objects.all().delete()
    Avatar.objects.all().delete()
    Bio.objects.all().delete()
    User.objects.filter(is_superuser=False).delete()

    created_users_map = create_users_and_profiles()
    if created_users_map:
        establish_following_relationships(created_users_map)
        created_tweets_map = create_discussion_tweets(created_users_map)

        if created_tweets_map:
            create_retweets(created_users_map, created_tweets_map)

        print("População do banco de dados concluída com sucesso!")
    else:
        print("Criação de usuários falhou. Abortando o restante da população.")


if __name__ == "__main__":
    populate_database()

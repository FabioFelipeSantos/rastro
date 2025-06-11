"""
Arquivo contendo os dados dos usuários para o seed do banco de dados.
"""

USER_PASSWORD = "aA.*12*.Aa"

USERS_DATA = [
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/hp.png",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/hermione.jpg",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/ron.png",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/minerva.jpg",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/remus.webp",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/draco.jpg",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/pansy.jpg",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/snape.webp",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/horace.jpg",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/cedric.jpg",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/nymphadora.webp",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/pomona.webp",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/silvanus.webp",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/luna.jpg",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/cho.jpg",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/filius.jpg",
            },
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
            "avatar": {
                "file_path": "https://tweetclone.s3.sa-east-1.amazonaws.com/default_avatares/sybill.jpg",
            },
        },
        "is_professor": True,
    },
]

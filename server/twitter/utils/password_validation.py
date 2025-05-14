import re


def password_validation(password: str) -> dict[str, bool | str | None]:
    """
    Faz a validação de senha e retorna os erros na senha, se houver

    Args:
        password (str): Senha para ser validada
    Returns:
        dict ([str, bool | str | None]): Um dicionário contendo "is_valid" boolean para definir a validade da senha e "message" (str ou None), com a mensagem de erro se houver.
    """
    confirmation = {"is_valid": True, "message": None}

    errors = []

    if len(password) < 6 or len(password) > 25:
        err = ["(Tamanho)", "A senha deve ter entre 6 e 25 caracteres."]
        errors.append(": ".join(err))

    # Verificar se possui maiúscula
    if not re.search(r"[A-Z]", password):
        err = ["(Maiúscula)", "A senha deve conter pelo menos uma letra maiúscula."]
        errors.append(": ".join(err))

    # Verificar se possui minúscula
    if not re.search(r"[a-z]", password):
        err = ["(Minúscula)", "A senha deve conter pelo menos uma letra minúscula."]
        errors.append(": ".join(err))

    # Verificar se possui dígito
    if not re.search(r"\d", password):
        err = ["(Número)", "A senha deve conter pelo menos um número."]
        errors.append(": ".join(err))

    # Verificar se possui símbolo
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        err = ["(Símbolo)", "A senha deve conter pelo menos um caractere especial."]
        errors.append(": ".join(err))

    if len(errors) > 0:
        confirmation["is_valid"] = False

        if len(errors) == 1:
            confirmation["message"] = errors[0]
        else:
            confirmation["message"] = "; ".join(errors)

    return confirmation

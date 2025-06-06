type ValidationType = {
  isValid: boolean;
  message: string;
};

export const nicknameValidation = (nickname: string): ValidationType => {
  const validation: ValidationType = { isValid: true, message: "" };

  const nicknamePattern = /^_{0,4}[a-zA-Z0-9]+(?:_{1,4}[a-zA-Z0-9]+)*_{0,4}$/;

  if (!nicknamePattern.test(nickname)) {
    validation.isValid = false;
    validation.message =
      "Seu nickname não é válido. Use somente letras (maiúsculas), números e no máximo 4 underlines (no início, meio ou fim do nickname)";
  }

  return validation;
};

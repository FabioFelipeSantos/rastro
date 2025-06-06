type Validation = {
  isValid: boolean;
  message: string[];
};

export function passwordValidation(password: string): Validation {
  const validation: Validation = { isValid: true, message: [] };

  const patternOneUpper = /([A-Z])+/;
  const patternOneLower = /([a-z])+/;
  const patternOneDigit = /([0-9])+/;
  const patternOneSymbol = /([!@#$%^&*+\-/(),.?":{}|<>])+/;
  const patternThreeOrMoreOfSame = /^(?=.*(.).*\1.*\1).+$/;

  if (password.length < 6 || password.length > 25) {
    validation.message.push("A senha precisa ter entre 6 e 25 caracteres");
  }

  if (!patternOneUpper.test(password)) {
    validation.message.push("A senha precisa ter pelo menos uma letra maiúscula");
  }

  if (!patternOneLower.test(password)) {
    validation.message.push("A senha precisa ter pelo menos uma letra minúscula");
  }

  if (!patternOneDigit.test(password)) {
    validation.message.push("A senha precisa ter pelo menos um dígito");
  }

  if (!patternOneSymbol.test(password)) {
    validation.message.push("A senha precisa ter pelo menos um símbolo");
  }

  if (patternThreeOrMoreOfSame.test(password)) {
    validation.message.push("A senha não pode ter mais de 2 caracteres iguais");
  }

  // Verifica sequências
  for (let i = 0; i < password.length - 3; i++) {
    let isValid: boolean = true;

    if (
      password.charCodeAt(i + 1) - password.charCodeAt(i) === 1 &&
      password.charCodeAt(i + 2) - password.charCodeAt(i + 1) === 1
    ) {
      isValid = false;
    }

    // Sequências decrescentes
    if (
      password.charCodeAt(i + 1) - password.charCodeAt(i) === -1 &&
      password.charCodeAt(i + 2) - password.charCodeAt(i + 1) === -1
    ) {
      isValid = false;
    }

    if (!isValid) {
      validation.message.push("A senha não pode ter três ou mais caracteres em sequência");
    }
  }

  if (validation.message.length > 0) {
    validation.isValid = false;
  }

  return validation;
}

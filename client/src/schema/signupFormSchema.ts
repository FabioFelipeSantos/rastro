import { z } from "zod/v4";

import { passwordValidation } from "../utils/passwordValidation";
import { nicknameValidation } from "../utils/nicknameValidation";

export const signupFormSchema = z
  .object({
    first_name: z
      .string()
      .min(1, "O primeiro nome é obrigatório")
      .max(25, "O nickname deve ter no máximo 25 caracteres"),
    last_name: z.string().max(25, "O nickname deve ter no máximo 25 caracteres"),
    nickname: z
      .string()
      .min(3, "O nickname deve ter pelo menos 3 caracteres")
      .max(25, "O nickname deve ter no máximo 25 caracteres")
      .check(({ issues, value }) => {
        const validation = nicknameValidation(value);

        if (!validation.isValid) {
          issues.push({
            code: "custom",
            input: value,
            message: validation.message,
          });
        }
      }),
    email: z.email("O email não é válido"),
    password: z.string().check(({ issues, value }) => {
      const validation = passwordValidation(value);

      if (!validation.isValid) {
        issues.push({
          code: "custom",
          input: value,
          message: validation.message.join("; "),
        });
      }
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
  });

export type SignupFormSchema = z.infer<typeof signupFormSchema>;

export const defaultValues: SignupFormSchema = {
  first_name: "",
  last_name: "",
  nickname: "",
  email: "",
  password: "",
  password_confirmation: "",
};

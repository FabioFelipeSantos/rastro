import { z } from "zod/v4";

export const loginFormSchema = z.object({
  nickname_or_email: z.string().min(1, "O nickname ou email é obrigatório").or(z.email("O email não é válido")),
  password: z.string().min(1, "O password é obrigatório"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const defaultValues: LoginFormSchema = {
  nickname_or_email: "",
  password: "",
};

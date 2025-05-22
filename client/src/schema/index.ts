import { z } from "zod";

import { passwordValidation } from "../../utils/passwordValidation";

export const schema = z.object({
  username_or_email: z.string().min(1, "O nickname ou email é obrigatório").or(z.string().email("O email não é válido")),
  password: z.string().superRefine((value, ctx) => {
    const validation = passwordValidation(value);

    if (!validation.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { validationMessages: validation.message },
        path: ["password"],
        message: validation.message.join("; "),
      });
    }
  }),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  username_or_email: "",
  password: "",
};

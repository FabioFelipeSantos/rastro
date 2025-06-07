import { z } from "zod/v4";
import { nicknameValidation } from "../utils/nicknameValidation";
import { passwordValidation } from "../utils/passwordValidation";

export const editProfileSchema = z
  .object({
    bio: z.string().optional(),
    first_name: z.string().max(25, "O nickname deve ter no máximo 25 caracteres").optional(),
    last_name: z.string().max(25, "O nickname deve ter no máximo 25 caracteres").optional(),
    nickname: z.string().max(25, "O nickname deve ter no máximo 25 caracteres").optional(),
    email: z.string().email("O email não é válido").optional(),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
    avatar: z
      .file()
      .max(5 * 1024 * 1024)
      .mime(["image/jpeg", "image/png"])
      .optional(),
  })
  .check((ctx) => {
    if (ctx.value.nickname) {
      const validation = nicknameValidation(ctx.value.nickname);

      if (!validation.isValid) {
        ctx.issues.push({
          code: "custom",
          input: ctx.value.nickname,
          message: validation.message,
        });
      }
    }

    if (ctx.value.password) {
      if (!ctx.value.password_confirmation) {
        ctx.issues.push({
          code: "custom",
          input: ctx.value.password_confirmation,
          message: "Se a senha for alterada, então a confirmação deve ser enviada",
        });
      } else {
        const validation = passwordValidation(ctx.value.password);

        if (!validation.isValid) {
          ctx.issues.push({
            code: "custom",
            input: ctx.value.password,
            message: validation.message.join("; "),
          });
        } else {
          if (ctx.value.password !== ctx.value.password_confirmation) {
            ctx.issues.push({
              code: "custom",
              input: [ctx.value.password, ctx.value.password_confirmation],
              message: "As nova senha e sua confirmação devem ser iguais",
            });
          }
        }
      }
    }
  });

export type EditProfileSchema = z.infer<typeof editProfileSchema>;

import type { ZodError, ZodType } from "zod/v4";
import type { FieldError, FieldErrors, FieldValues } from "react-hook-form";

const zodToHookFormErrors = (zodError: ZodError): FieldErrors => {
  const errors: FieldErrors = {};

  for (const issue of zodError.issues) {
    const path = issue.path.join(".") || "root";
    errors[path] = {
      type: issue.code,
      message: issue.message,
    } as FieldError;
  }

  return errors;
};

export const customZodResolver = (schema: ZodType) => {
  return async (values: FieldValues): Promise<{ values: FieldValues; errors: FieldErrors }> => {
    try {
      const result = await schema.safeParseAsync(values);

      if (result.success) {
        return {
          values: result.data as FieldValues,
          errors: {},
        };
      } else {
        return {
          values: {},
          errors: zodToHookFormErrors(result.error),
        };
      }
    } catch (error) {
      console.log("Erro no resolver: ", error);
      return {
        values: {},
        errors: {
          root: {
            type: "unknown",
            message: "Um erro desconhecido aconteceu durante a validação",
          } as FieldError,
        },
      };
    }
  };
};

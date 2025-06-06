import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type SerializedError } from "@reduxjs/toolkit";

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T | null;
}

type MutationTrigger<R, TArg> = (arg: TArg) => {
  unwrap: () => Promise<R>;
};

export async function executeMutation<TData, TArg>(
  mutation: MutationTrigger<ApiResponse<TData>, TArg>,
  arg: TArg,
  allowNull = false,
): Promise<TData> {
  try {
    const result = await mutation(arg).unwrap();
    if (
      typeof result !== "object" ||
      result === null ||
      typeof result.status !== "number" ||
      typeof result.message !== "string" ||
      !("data" in result)
    ) {
      throw new Error("Formato de resposta inválido da API.");
    }

    if (result.status < 200 || result.status >= 300) {
      throw new Error(`Erro da API ${result.status}: ${result.message}`);
    }

    if (result.data === null && !allowNull) {
      throw new Error("Dados nulos não permitidos pela API nesta requisição.");
    }

    return result.data as TData;
  } catch (error) {
    if (error instanceof Error) {
      const isTryBlockError =
        error.message === "Formato de resposta inválido da API." ||
        error.message.startsWith("Erro da API ") ||
        error.message === "Dados nulos não permitidos pela API nesta requisição.";
      if (isTryBlockError) {
        throw error;
      }
    }

    if (typeof error === "object" && error !== null) {
      if (
        "status" in error &&
        (typeof (error as FetchBaseQueryError).status === "number" ||
          typeof (error as FetchBaseQueryError).status === "string") &&
        "data" in error
      ) {
        const fetchError = error as FetchBaseQueryError;
        const errorData = fetchError.data;
        let specificMessage = "Erro na comunicação com a API";
        console.log(errorData);

        if (typeof errorData === "string") {
          specificMessage = errorData;
        } else if (typeof errorData === "object" && errorData !== null) {
          const dataObj = errorData as Record<string, unknown>;
          if (typeof dataObj.message === "string") {
            specificMessage = dataObj.message;
          } else {
            try {
              specificMessage = JSON.stringify(errorData);
            } catch {
              // Mantém a mensagem padrão se JSON.stringify falhar
            }
          }
        }
        throw new Error(specificMessage);
      }

      if ("message" in error && typeof (error as SerializedError).message === "string") {
        throw new Error((error as SerializedError).message || "Erro desconhecido durante a mutation.");
      }
    }

    if (error instanceof Error) {
      throw new Error(`Erro inesperado na mutation: ${error.message}`);
    }

    throw new Error("Ocorreu um erro desconhecido na mutation.");
  }
}

export function executeQuery<TData>(
  queryResult: {
    data?: ApiResponse<TData>;
    error?: FetchBaseQueryError | SerializedError;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  },
  allowNull = false,
): TData {
  if (queryResult.isError || queryResult.error) {
    const error = queryResult.error;
    if (error) {
      if (
        "status" in error &&
        (typeof (error as FetchBaseQueryError).status === "number" ||
          typeof (error as FetchBaseQueryError).status === "string") &&
        "data" in error
      ) {
        const fetchError = error as FetchBaseQueryError;
        const errorData = fetchError.data;
        let specificMessage = "Erro na query";
        if (typeof errorData === "string") {
          specificMessage = errorData;
        } else if (typeof errorData === "object" && errorData !== null) {
          const dataObj = errorData as Record<string, unknown>;
          if (typeof dataObj.message === "string") {
            specificMessage = dataObj.message;
          } else {
            try {
              specificMessage = JSON.stringify(errorData);
            } catch {
              /* Mantém a mensagem padrão */
            }
          }
        }
        throw new Error(`Erro ${fetchError.status}: ${specificMessage}`);
      } else if ("message" in error && typeof (error as SerializedError).message === "string") {
        throw new Error((error as SerializedError).message || "Erro desconhecido na query.");
      } else if (error instanceof Error) {
        throw new Error(`Erro inesperado na query: ${error.message}`);
      }
    }
    throw new Error("Erro desconhecido ao executar a query (isError true).");
  }

  if (!queryResult.isSuccess || !queryResult.data) {
    throw new Error("Query não foi bem sucedida ou não retornou dados válidos.");
  }

  const response = queryResult.data;

  if (
    typeof response !== "object" ||
    response === null ||
    typeof response.status !== "number" ||
    typeof response.message !== "string" ||
    !("data" in response)
  ) {
    throw new Error("Formato de resposta inválido da API na query.");
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Erro na resposta da query: ${response.status} - ${response.message}`);
  }

  if (response.data === null && !allowNull) {
    throw new Error("Dados nulos não permitidos pela API nesta query.");
  }

  return response.data as TData;
}

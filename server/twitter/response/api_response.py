import traceback

from typing import Any, Dict, Optional
from rest_framework.response import Response
from functools import wraps
from rest_framework.exceptions import APIException


class ApiResponse(Response):
    """
    Resposta padronizada para a API que funciona tanto com sucessos quanto com erros
    """

    def __init__(
        self,
        data: Any = None,
        message: str = None,
        status_code: int = 200,
        exception: Exception = None,
        **kwargs,
    ):
        # Define a mensagem padrão de acordo com o código de status
        if message is None:
            message = self._get_default_message(status_code, exception)

        # Formata a resposta
        api_response_data = {"status": status_code, "message": message, "data": data}

        # Adiciona detalhes extras para erros quando disponíveis
        if status_code >= 400 and exception:
            error_details = self._get_error_details(exception)
            if error_details:
                api_response_data["data"] = api_response_data.get("data", {})
                if isinstance(api_response_data["data"], dict):
                    api_response_data["data"]["error_details"] = error_details
                else:
                    api_response_data["data"] = {
                        "error_details": error_details,
                        "original_data": api_response_data["data"],
                    }

        # Chama o construtor da classe pai
        super().__init__(data=api_response_data, status=status_code, **kwargs)

    def _get_default_message(
        self, status_code: int, exception: Exception = None
    ) -> str:
        """
        Obtém uma mensagem padrão baseada no código de status
        """
        if status_code < 300:
            return "Rota terminada com sucesso"

        # Mensagens para erros comuns
        status_messages = {
            400: "Dados inválidos ou malformados",
            401: "Autenticação necessária",
            403: "Permissão negada",
            404: "Recurso não encontrado",
            405: "Método não permitido",
            408: "Tempo de requisição esgotado",
            409: "Conflito de dados",
            429: "Muitas requisições",
            500: "Erro interno do servidor",
        }

        # Usa a mensagem do próprio erro se disponível
        if exception and hasattr(exception, "detail"):
            return str(exception.detail)
        if exception and str(exception):
            return str(exception)

        # Retorna mensagem padrão com base no código de status
        return status_messages.get(status_code, f"Erro com código {status_code}")

    def _get_error_details(self, exception: Exception) -> Optional[Dict]:
        """
        Extrai detalhes úteis da exceção
        """
        details = {}

        # Extrai detalhes de validação de DRF ValidationError
        if hasattr(exception, "detail") and isinstance(exception.detail, dict):
            details["validation_errors"] = exception.detail

        # Em ambiente de desenvolvimento, inclui o traceback
        if hasattr(exception, "__traceback__") and __debug__:
            tb_lines = traceback.format_exception(
                type(exception), exception, exception.__traceback__
            )
            details["traceback"] = tb_lines

        # Inclui o tipo de exceção
        if exception:
            details["exception_type"] = exception.__class__.__name__

        return details


def standard_response(view_func):
    """
    Decorator que padroniza o formato de resposta para views do DRF,
    tanto para sucessos quanto para erros
    """

    @wraps(view_func)
    def wrapped_view(*args, **kwargs):
        try:
            # Tenta executar a view normalmente
            response = view_func(*args, **kwargs)

            # Se já for um ApiResponse, retorna diretamente
            if isinstance(response, ApiResponse):
                return response

            # Se for uma Response do DRF, converte para ApiResponse
            if isinstance(response, Response):
                return ApiResponse(data=response.data, status_code=response.status_code)

            # Retorna outros tipos de resposta sem modificar
            return response

        except Exception as e:
            # Captura exceções e retorna como ApiResponse
            if isinstance(e, APIException):
                # Exceções da API do DRF já têm código de status
                return ApiResponse(
                    data=getattr(e, "detail", None),
                    status_code=e.status_code,
                    exception=e,
                )
            else:
                # Outras exceções são tratadas como erro 500
                return ApiResponse(
                    data=None,
                    status_code=500,
                    exception=e,
                )

    return wrapped_view

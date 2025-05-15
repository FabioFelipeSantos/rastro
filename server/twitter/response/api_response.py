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
        if message is None:
            message = self._get_default_message(status_code, exception)

        api_response_data = {"status": status_code, "message": message, "data": data}

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

        super().__init__(data=api_response_data, status=status_code, **kwargs)

    def _get_default_message(
        self, status_code: int, exception: Exception = None
    ) -> str:
        """
        Obtém uma mensagem padrão baseada no código de status
        """
        if status_code < 300:
            return "Rota terminada com sucesso"

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

        if exception and hasattr(exception, "detail"):
            return str(exception.detail)
        if exception and str(exception):
            return str(exception)

        return status_messages.get(status_code, f"Erro com código {status_code}")

    def _get_error_details(self, exception: Exception) -> Optional[Dict]:
        """
        Extrai detalhes úteis da exceção
        """
        details = {}

        if hasattr(exception, "detail") and isinstance(exception.detail, dict):
            details["validation_errors"] = exception.detail

        # if hasattr(exception, "__traceback__") and __debug__:
        #     tb_lines = traceback.format_exception(
        #         type(exception), exception, exception.__traceback__
        #     )
        #     details["traceback"] = tb_lines

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
            response = view_func(*args, **kwargs)

            if isinstance(response, ApiResponse):
                return response

            if isinstance(response, Response):
                return ApiResponse(data=response.data, status_code=response.status_code)

            return response

        except Exception as e:
            if isinstance(e, APIException):
                return ApiResponse(
                    data=getattr(e, "detail", None),
                    status_code=e.status_code,
                    exception=e,
                )
            else:
                return ApiResponse(
                    data=None,
                    status_code=500,
                    exception=e,
                )

    return wrapped_view

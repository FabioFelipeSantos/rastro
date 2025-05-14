from rest_framework.views import exception_handler
from .api_response import ApiResponse


def custom_exception_handler(exc, context):
    """
    Manipulador personalizado de exceções que formata todas as exceções no padrão da API
    """
    response = exception_handler(exc, context)

    if response is None:
        return ApiResponse(
            data=None,
            message=str(exc) if str(exc) else "Erro interno no servidor",
            status_code=500,
            exception=exc,
        )

    return ApiResponse(
        data=getattr(response, "data", None),
        status_code=response.status_code,
        exception=exc,
    )

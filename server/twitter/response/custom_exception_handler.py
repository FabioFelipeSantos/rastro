from rest_framework.views import exception_handler
from .api_response import ApiResponse
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    try:
        response = exception_handler(exc, context)

        if response is None:
            logger.error(f"Erro não tratado: {exc}")
            import traceback

            logger.error(traceback.format_exc())

            return ApiResponse(
                data={"error_type": str(type(exc).__name__)},
                message="Erro interno no servidor",
                status_code=500,
            )

        response_data = response.data if hasattr(response, "data") else None

        error_data = {
            "detail": str(exc) if hasattr(exc, "__str__") else "Erro na requisição",
        }

        if isinstance(response_data, dict):
            error_data.update(response_data)

        return ApiResponse(
            data=error_data,
            status_code=response.status_code,
            message="Erro na requisição",
        )
    except Exception as e:
        logger.critical(f"Erro no manipulador de exceções: {e}")
        import traceback

        logger.critical(traceback.format_exc())

        return ApiResponse(
            data=None, message="Erro ao processar requisição", status_code=500
        )

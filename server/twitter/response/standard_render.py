from rest_framework.renderers import JSONRenderer
from .safe_json_encoder import SafeJSONEncoder


class StandardJSONRenderer(JSONRenderer):
    encoder_class = SafeJSONEncoder

    def render(self, data, accepted_media_type=None, renderer_context=None):
        """Renderiza dados em formato padronizado e seguro"""
        renderer_context = renderer_context or {}
        response = renderer_context.get("response")

        status_code = getattr(response, "status_code", 200) if response else 200

        if isinstance(data, dict) and all(
            k in data for k in ["status", "message", "data"]
        ):
            response_data = data
        else:
            message = self._get_default_message(status_code)

            response_data = {"status": status_code, "message": message, "data": data}

        try:
            return super().render(response_data, accepted_media_type, renderer_context)
        except ValueError as e:
            if "Circular reference detected" in str(e):
                import traceback

                fallback = {
                    "status": status_code,
                    "message": "Erro ao processar resposta",
                    "data": {
                        "error": "Referência circular detectada",
                        "original_type": str(type(data)),
                    },
                }
                return super().render(fallback, accepted_media_type, renderer_context)
            else:
                raise

    def _get_default_message(self, status_code):
        """Retorna mensagem padrão baseada no código de status"""
        if status_code < 300:
            return "Operação realizada com sucesso"

        status_messages = {
            400: "Requisição inválida",
            401: "Autenticação necessária",
            403: "Permissão negada",
            404: "Recurso não encontrado",
            500: "Erro interno do servidor",
        }

        return status_messages.get(status_code, f"Erro com código {status_code}")

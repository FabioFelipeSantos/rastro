import logging
from rest_framework.renderers import JSONRenderer
from rest_framework.utils import json
from rest_framework import status

from rest_framework.utils.encoders import JSONEncoder

logger = logging.getLogger(__name__)


class CircularReferenceEncoder(JSONEncoder):
    """
    JSONEncoder que previne referências circulares
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.visited_objects = {}
        self.path_stack = []

    def default(self, obj):
        obj_id = id(obj)
        obj_type = obj.__class__.__name__

        current_path = ".".join(self.path_stack)

        if obj_id in self.visited_objects:
            first_path = self.visited_objects[obj_id]
            logger.warning(
                f"Referência circular detectada: {obj_type} em {current_path}, "
                f"primeira ocorrência em {first_path}"
            )
            return f"[Ref circular: {obj_type}]"

        self.visited_objects[obj_id] = current_path

        try:
            if hasattr(obj, "__dict__"):
                # Salvar estado anterior
                old_visited = dict(self.visited_objects)
                old_stack = list(self.path_stack)

                result = {}
                for key, value in obj.__dict__.items():
                    if key.startswith("_"):
                        continue

                    self.path_stack.append(key)
                    try:
                        result[key] = super().default(value)
                    except TypeError:
                        result[key] = str(value)
                    finally:
                        self.path_stack.pop()

                self.visited_objects = old_visited
                self.path_stack = old_stack

                return result

            return super().default(obj)

        except TypeError:
            return str(obj)

        finally:
            if obj_id in self.visited_objects:
                del self.visited_objects[obj_id]


class StandardJSONRenderer(JSONRenderer):
    """
    Renderizador que padroniza o formato de resposta JSON para toda a API
    """

    def render(self, data, accepted_media_type=None, renderer_context=None):
        if data is None:
            data = {}

        response = renderer_context.get("response") if renderer_context else None

        status_code = response.status_code if response else 200

        if (
            isinstance(data, dict)
            and "status" in data
            and "message" in data
            and "data" in data
        ):
            response_data = data
        else:
            message = self._get_default_message(status_code)
            response_data = {"status": status_code, "message": message, "data": data}

        return super().render(response_data, accepted_media_type, renderer_context)

    def _get_default_message(self, status_code):
        """Retorna mensagem padrão com base no código de status"""
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

        return status_messages.get(status_code, f"Erro com código {status_code}")

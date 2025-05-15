from rest_framework.utils.encoders import JSONEncoder
import logging

logger = logging.getLogger(__name__)


class SafeJSONEncoder(JSONEncoder):
    """
    Encoder JSON ultra seguro que previne referências circulares em qualquer contexto
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._seen_objects = set()

    def encode(self, obj):
        """Limpa o estado antes de cada codificação"""
        self._seen_objects = set()
        try:
            return super().encode(obj)
        except Exception as e:
            logger.error(f"Erro ao codificar JSON: {e}")
            return '{"error": "Erro ao serializar resposta", "message": "Um erro ocorreu durante a serialização"}'

    def default(self, obj):
        """Método que lida com todos os tipos não nativamente serializáveis"""
        obj_id = id(obj)

        if obj_id in self._seen_objects:
            return f"[Referência circular para {type(obj).__name__}]"

        self._seen_objects.add(obj_id)

        try:
            if hasattr(obj, "to_dict") and callable(obj.to_dict):
                return obj.to_dict()

            if hasattr(obj, "data"):
                return {"data": obj.data}

            if hasattr(obj, "__dict__"):
                safe_dict = {}
                for key, value in obj.__dict__.items():
                    if not key.startswith("_"):
                        safe_dict[key] = value
                return safe_dict

            if hasattr(obj, "__iter__") and not isinstance(obj, (str, bytes, dict)):
                return list(obj)

            return super().default(obj)

        except Exception as e:
            return str(obj)

        finally:
            self._seen_objects.discard(obj_id)

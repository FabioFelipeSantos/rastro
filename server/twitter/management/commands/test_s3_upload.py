# management/commands/test_avatar_upload.py
from django.core.management.base import BaseCommand
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import datetime


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write("=== Teste de Upload Avatar S3 ===")

        # Simula o caminho do avatar
        user_id = "test-user-123"
        nickname = "testuser"
        folder_path = f"media/users/{user_id}_{nickname}/avatars"

        # Cria um arquivo de teste
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        content = ContentFile(b"Fake image content")
        filename = f"{folder_path}/avatar_{timestamp}.jpg"

        self.stdout.write(f"\nTentando salvar em: {filename}")

        try:
            # Salva o arquivo
            path = default_storage.save(filename, content)
            self.stdout.write(self.style.SUCCESS(f"✓ Arquivo salvo em: {path}"))

            # Gera URL
            url = default_storage.url(path)
            self.stdout.write(f"✓ URL gerada: {url}")

            # Verifica existência
            exists = default_storage.exists(path)
            self.stdout.write(f"✓ Arquivo existe: {exists}")

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"✗ Erro: {str(e)}"))
            import traceback

            traceback.print_exc()

from django.core.management.base import BaseCommand
from django.conf import settings
import sys
import os


class Command(BaseCommand):
    help = "Popula o banco de dados com dados de teste (usuários Harry Potter)"

    def handle(self, *args, **options):
        self.stdout.write(
            self.style.SUCCESS("Iniciando o processo de seed do banco de dados...")
        )

        database_seed_path = os.path.join(settings.BASE_DIR, "database_seed")
        if not os.path.exists(database_seed_path):
            self.stdout.write(
                self.style.ERROR(
                    f"Diretório database_seed não encontrado em {database_seed_path}"
                )
            )
            return

        seed_path = os.path.join(database_seed_path, "seed.py")
        if not os.path.exists(seed_path):
            self.stdout.write(
                self.style.ERROR(f"Arquivo seed.py não encontrado em {seed_path}")
            )
            return

        sys.path.insert(0, settings.BASE_DIR)

        try:
            from database_seed.seed import populate_database

            populate_database()

            self.stdout.write(self.style.SUCCESS("Seed concluído com sucesso!"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Erro ao executar o seed: {str(e)}"))
            import traceback

            self.stdout.write(self.style.ERROR(traceback.format_exc()))
        finally:
            if settings.BASE_DIR in sys.path:
                sys.path.remove(settings.BASE_DIR)

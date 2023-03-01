from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

ADMIN_ID = "admin"
ADMIN_PASSWORD = "admin"

UserModel = get_user_model()

class Command(BaseCommand):
    help = "Initialisation du projet pour un environnement local"

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING(self.help))

        self.stdout.write(self.style.MIGRATE_HEADING("Création d'un super utilisateur..."))
        UserModel.objects.create_superuser(ADMIN_ID, "admin@example.com", ADMIN_PASSWORD)

        self.stdout.write(self.style.SUCCESS("Initialisation terminée !"))

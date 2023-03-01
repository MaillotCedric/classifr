from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from app.models import Categorie, Modele, DetailsModele

ADMIN_ID = "admin"
ADMIN_PASSWORD = "admin"

CATEGORIES = ["tulipe", "rose", "tournesol", "pizza", "gateau"]
MODELES = [
    {
        "nom": "monet",
        "url": "models/monet.h5",
        "accuracy": 80.6,
        "recall": 82.0
    },
    {
        "nom": "dali",
        "url": "models/dali.h5",
        "accuracy": 88.5,
        "recall": 87.3
    }
]

UserModel = get_user_model()

class Command(BaseCommand):
    help = "Initialisation du projet pour un environnement local"

    def handle(self, *args, **options):
        categories_bdd = {}
        modeles_bdd = {}

        self.stdout.write(self.style.MIGRATE_HEADING(self.help))

        self.stdout.write(self.style.WARNING("Suppression du jeu de données existant..."))
        UserModel.objects.all().delete()
        DetailsModele.objects.all().delete()
        Modele.objects.all().delete()
        Categorie.objects.all().delete()

        self.stdout.write(self.style.MIGRATE_HEADING("Création d'un nouveau jeu de données..."))
        self.stdout.write(self.style.MIGRATE_HEADING("Catégories..."))
        for categorie in CATEGORIES:
            categorie_cree = Categorie.objects.create(nom=categorie)

            categories_bdd[categorie] = categorie_cree

        self.stdout.write(self.style.MIGRATE_HEADING("Modèles..."))
        for modele in MODELES:
            modele_cree = Modele.objects.create(nom=modele["nom"],
                                                url=modele["url"],
                                                accuracy=modele["accuracy"],
                                                recall=modele["recall"])

            modeles_bdd[modele["nom"]] = modele_cree

        self.stdout.write(self.style.MIGRATE_HEADING("Détails modèle..."))
        DetailsModele.objects.create(modele=modeles_bdd["monet"],
                                     categorie=categories_bdd["tulipe"])
        DetailsModele.objects.create(modele=modeles_bdd["monet"],
                                     categorie=categories_bdd["rose"])
        DetailsModele.objects.create(modele=modeles_bdd["monet"],
                                     categorie=categories_bdd["tournesol"])
        
        DetailsModele.objects.create(modele=modeles_bdd["dali"],
                                     categorie=categories_bdd["tulipe"])
        DetailsModele.objects.create(modele=modeles_bdd["dali"],
                                     categorie=categories_bdd["rose"])
        DetailsModele.objects.create(modele=modeles_bdd["dali"],
                                     categorie=categories_bdd["tournesol"])
        DetailsModele.objects.create(modele=modeles_bdd["dali"],
                                     categorie=categories_bdd["pizza"])
        DetailsModele.objects.create(modele=modeles_bdd["dali"],
                                     categorie=categories_bdd["gateau"])

        self.stdout.write(self.style.MIGRATE_HEADING("Création d'un super utilisateur..."))
        UserModel.objects.create_superuser(ADMIN_ID, "admin@example.com", ADMIN_PASSWORD)

        self.stdout.write(self.style.SUCCESS("Initialisation terminée !"))

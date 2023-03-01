from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from app.models import Categorie, Modele, DetailsModele, Image, Prediction, Resultat

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
IMAGES = [
    {
        "nom": "tulipe_1",
        "url": "data/tulipe_1.jpeg",
        "categorie": "tulipe",
        "active": True
    },
    {
        "nom": "rose_1",
        "url": "data/rose_1.jpeg",
        "categorie": "rose",
        "active": True
    },
    {
        "nom": "tournesol_1",
        "url": "data/tournesol_1.jpeg",
        "categorie": "tournesol",
        "active": True
    },
    {
        "nom": "pizza_1",
        "url": "data/pizza_1.jpeg",
        "categorie": "pizza",
        "active": False
    },
    {
        "nom": "gateau_1",
        "url": "data/gateau_1.jpeg",
        "categorie": "gateau",
        "active": False
    }
]

UserModel = get_user_model()

class Command(BaseCommand):
    help = "Initialisation du projet pour un environnement local"

    def handle(self, *args, **options):
        categories_bdd = {}
        modeles_bdd = {}
        images_bdd = {}

        self.stdout.write(self.style.MIGRATE_HEADING(self.help))

        self.stdout.write(self.style.WARNING("Suppression du jeu de données existant..."))
        UserModel.objects.all().delete()
        DetailsModele.objects.all().delete()
        Modele.objects.all().delete()
        Categorie.objects.all().delete()
        Image.objects.all().delete()
        Prediction.objects.all().delete()
        Resultat.objects.all().delete()

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
        for modele in modeles_bdd:
            for categorie in ["tulipe", "rose", "tournesol"]:
                DetailsModele.objects.create(modele=modeles_bdd[modele],
                                     categorie=categories_bdd[categorie])

        DetailsModele.objects.create(modele=modeles_bdd["dali"],
                                     categorie=categories_bdd["pizza"])
        DetailsModele.objects.create(modele=modeles_bdd["dali"],
                                     categorie=categories_bdd["gateau"])
        
        self.stdout.write(self.style.MIGRATE_HEADING("Images..."))
        for image in IMAGES:
            image_cree = Image.objects.create(nom=image["nom"],
                                              url=image["url"],
                                              categorie=categories_bdd[image["categorie"]],
                                              active=image["active"])
            
            images_bdd[image["nom"]] = image_cree

        self.stdout.write(self.style.MIGRATE_HEADING("Prédictions..."))
        prediction_monet_1 = Prediction.objects.create(modele=modeles_bdd["monet"],
                                  image=images_bdd["gateau_1"])
        prediction_dali_1 = Prediction.objects.create(modele=modeles_bdd["dali"],
                                  image=images_bdd["pizza_1"])
        
        self.stdout.write(self.style.MIGRATE_HEADING("Résultats..."))
        Resultat.objects.create(score=10.3,
                                categorie=categories_bdd["tulipe"],
                                prediction=prediction_monet_1)
        Resultat.objects.create(score=8.5,
                                categorie=categories_bdd["rose"],
                                prediction=prediction_monet_1)
        Resultat.objects.create(score=1.2,
                                categorie=categories_bdd["tournesol"],
                                prediction=prediction_monet_1)
        
        Resultat.objects.create(score=10.2,
                                categorie=categories_bdd["tulipe"],
                                prediction=prediction_dali_1)
        Resultat.objects.create(score=8.3,
                                categorie=categories_bdd["rose"],
                                prediction=prediction_dali_1)
        Resultat.objects.create(score=1.6,
                                categorie=categories_bdd["tournesol"],
                                prediction=prediction_dali_1)
        Resultat.objects.create(score=98.8,
                                categorie=categories_bdd["pizza"],
                                prediction=prediction_dali_1)
        Resultat.objects.create(score=9.8,
                                categorie=categories_bdd["gateau"],
                                prediction=prediction_dali_1)

        self.stdout.write(self.style.MIGRATE_HEADING("Création d'un super utilisateur..."))
        UserModel.objects.create_superuser(ADMIN_ID, "admin@example.com", ADMIN_PASSWORD)

        self.stdout.write(self.style.SUCCESS("Initialisation terminée !"))

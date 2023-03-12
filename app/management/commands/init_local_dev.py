from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from app.models import Categorie, Modele, DetailsModele, Image, Prediction, Resultat

ADMIN_ID = "admin"
ADMIN_PASSWORD = "admin"

CATEGORIES = ["tulipe", "rose", "tournesol", "pizza", "gateau"]
MODELES = [
    {
        "nom": "monet",
        "chemin": "../models/monet.h5",
        "accuracy": 80.6,
        "recall": 82.0
    },
    {
        "nom": "dali",
        "chemin": "../models/dali.h5",
        "accuracy": 88.5,
        "recall": 87.3
    }
]
IMAGES = [
    {
        "nom": "tulipe_1",
        "chemin": "../data/images/tulipe_1.jpg",
        "categorie": "tulipe",
        "active": True
    },
    {
        "nom": "rose_1",
        "chemin": "../data/images/rose_1.jpg",
        "categorie": "rose",
        "active": True
    },
    {
        "nom": "tournesol_1",
        "chemin": "../data/images/tournesol_1.jpg",
        "categorie": "tournesol",
        "active": True
    },
    {
        "nom": "pizza_1",
        "chemin": "../data/images/pizza_1.jpg",
        "categorie": "pizza",
        "active": False
    },
    {
        "nom": "gateau_1",
        "chemin": "../data/images/gateau_1.jpg",
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
        Categorie.objects.create(nom="inconnue")

        for categorie in CATEGORIES:
            categorie_cree = Categorie.objects.create(nom=categorie)

            categories_bdd[categorie] = categorie_cree

        self.stdout.write(self.style.MIGRATE_HEADING("Modèles..."))
        for modele in MODELES:
            modele_cree = Modele.objects.create(nom=modele["nom"],
                                                chemin=modele["chemin"],
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
                                              chemin=image["chemin"],
                                              categorie=categories_bdd[image["categorie"]],
                                              active=image["active"])
            
            images_bdd[image["nom"]] = image_cree

        self.stdout.write(self.style.MIGRATE_HEADING("Prédictions..."))
        prediction_monet_1 = Prediction.objects.create(modele=modeles_bdd["monet"],
                                  image=images_bdd["gateau_1"])
        prediction_dali_1 = Prediction.objects.create(modele=modeles_bdd["dali"],
                                  image=images_bdd["pizza_1"])
        
        self.stdout.write(self.style.MIGRATE_HEADING("Résultats..."))
        scores_prediction_monet_1 = [10.3, 8.5, 1.2]
        scores_prediction_dali_1 = [10.2, 8.3, 1.6]
        categories_predictions = ["tulipe", "rose", "tournesol"]

        for index in range(3):
            Resultat.objects.create(score=scores_prediction_monet_1[index],
                                categorie=categories_bdd[categories_predictions[index]],
                                prediction=prediction_monet_1)
        for index in range(3):
            Resultat.objects.create(score=scores_prediction_dali_1[index],
                                categorie=categories_bdd[categories_predictions[index]],
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

from django.db import models, transaction

from django.conf import settings

from rest_framework.exceptions import APIException

from app.toolbox import save_image, predict_image, formated_path

import tensorflow as tf

import os

class Modele(models.Model):
    nom = models.CharField(max_length=255)
    chemin = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    accuracy = models.DecimalField(max_digits=3, decimal_places=1)
    recall = models.DecimalField(max_digits=3, decimal_places=1)

    class Meta:
        managed = True

    def __str__(self):
        return self.nom
    
    @transaction.atomic
    def predict(self, request, pk):
        # TODO : renommer l'image si il existe une image avec le même nom
        message_erreur = "Une erreur est survenue"
        donnees = request.data
        modele_utilise = Modele.objects.get(pk=pk)
        nom_modele = modele_utilise.nom
        model_dir = settings.MODELS_ROOT
        images_dir = settings.DATA_IMAGES_ROOT
        model_path = os.path.join(model_dir, f"{nom_modele}.h5")
        image = donnees["image"]
        image_name = donnees["nom_image"]
        image_path = os.path.join(images_dir, image)
        image_shape = (224, 224)

        try:
            print("prediction...")

            modele = tf.keras.models.load_model(model_path)
            save_image(image_base_64=donnees["data_image"], saved_image_path=images_dir, image_name=image)
            resultats = predict_image(model=modele, image_path=image_path, shape=image_shape)
            print(resultats)

            print("enregistrement en bdd...")

            print("enregistrement de l'image...")
            # créer l'image en bdd
            categorie_inconnue = Categorie.objects.get(pk=1)
            image_cree = Image.objects.create(nom=image_name,
                                        chemin=formated_path(image_path),
                                        categorie=categorie_inconnue)
            print("enregistrement de la prédiction...")
            # créer la prédiction en bdd
            prediction_cree = Prediction.objects.create(modele=modele_utilise,
                                                        image=image_cree)
            print("enregistrement des résultats...")
            # créer les résultats en bdd
            for resultat in resultats:
                categorie_utilisee = Categorie.objects.get(nom=resultat["categorie"])

                Resultat.objects.create(score=resultat["confidence"],
                                        categorie=categorie_utilisee,
                                        prediction=prediction_cree)
        except:
            raise APIException(detail=message_erreur)

class Categorie(models.Model):
    nom = models.CharField(max_length=255)

    class Meta:
        managed = True

    def __str__(self):
        return self.nom

class DetailsModele(models.Model):
    modele = models.ForeignKey("app.Modele", on_delete=models.CASCADE, related_name="details_modele")
    categorie = models.ForeignKey("app.Categorie", on_delete=models.CASCADE, related_name="details_modele")

    class Meta:
        managed = True
        unique_together = [["modele", "categorie"]]

class Image(models.Model):
    nom = models.CharField(max_length=255)
    chemin = models.CharField(max_length=255)
    categorie = models.ForeignKey("app.Categorie", on_delete=models.CASCADE, related_name="images")
    active = models.BooleanField(default=False)

    class Meta:
        managed = True

    def __str__(self):
        return self.nom

class Prediction(models.Model):
    correct = models.BooleanField(blank=True, null=True)
    commentaire = models.CharField(max_length=510, blank=True, null=True)
    modele = models.ForeignKey("app.Modele", on_delete=models.CASCADE, related_name="predictions")
    image = models.ForeignKey("app.Image", on_delete=models.CASCADE, related_name="predictions")

    class Meta:
        managed = True

    def __str__(self):
        return f"{self.modele.nom}/{self.image.nom}"

class Resultat(models.Model):
    score = models.DecimalField(max_digits=3, decimal_places=1)
    categorie = models.ForeignKey("app.Categorie", on_delete=models.CASCADE, related_name="resultats")
    prediction = models.ForeignKey("app.Prediction", on_delete=models.CASCADE, related_name="resultats")

    class Meta:
        managed = True
        unique_together = [["categorie", "prediction"]]

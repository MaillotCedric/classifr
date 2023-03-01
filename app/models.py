from django.db import models

class Modele(models.Model):
    nom = models.CharField(max_length=255)
    url = models.URLField()
    date_created = models.DateTimeField(auto_now_add=True)
    accuracy = models.DecimalField(max_digits=3, decimal_places=1)
    recall = models.DecimalField(max_digits=3, decimal_places=1)

    class Meta:
        managed = True

    def __str__(self):
        return self.nom

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
    url = models.URLField()
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

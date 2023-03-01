from django.db import models

class Modele(models.Model):
    nom = models.CharField(max_length=255)
    url = models.URLField()
    date_created = models.DateTimeField(auto_now_add=True)
    accuracy = models.DecimalField(max_digits=3, decimal_places=1)
    recall = models.DecimalField(max_digits=3, decimal_places=1)

    def __str__(self):
        return self.nom

class Categorie(models.Model):
    nom = models.CharField(max_length=255)

    def __str__(self):
        return self.nom

class DetailsModele(models.Model):
    modele = models.ForeignKey("app.Modele", on_delete=models.CASCADE, related_name="details_modele")
    categorie = models.ForeignKey("app.Categorie", on_delete=models.CASCADE, related_name="details_modele")

    class Meta:
        unique_together = [["modele", "categorie"]]

    def __str__(self):
        return self.modele

class Image(models.Model):
    nom = models.CharField(max_length=255)
    url = models.URLField()
    categorie = models.ForeignKey("app.Categorie", on_delete=models.CASCADE, related_name="images")
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.nom

class Prediction(models.Model):
    correct = models.BooleanField(blank=True, null=True)
    commentaire = models.CharField(max_length=510, blank=True, null=True)
    modele = models.ForeignKey("app.Modele", on_delete=models.CASCADE, related_name="predictions")
    image = models.ForeignKey("app.Image", on_delete=models.CASCADE, related_name="predictions")

    def __str__(self):
        return self.nom

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

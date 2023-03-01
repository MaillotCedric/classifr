from django.contrib import admin
from app.models import Modele, Categorie, DetailsModele, Image, Prediction

class ModeleAdmin(admin.ModelAdmin):
    list_display = ("nom", "url", "date_created", "accuracy", "recall")

class CategorieAdmin(admin.ModelAdmin):
    list_display = ("id", "nom")

class DetailsModeleAdmin(admin.ModelAdmin):
    list_display = ("modele", "categorie")

class ImageAdmin(admin.ModelAdmin):
    list_display = ("nom", "url", "categorie", "active")

class PredictionAdmin(admin.ModelAdmin):
    list_display = ("correct", "commentaire", "modele", "image")

admin.site.register(Modele, ModeleAdmin)
admin.site.register(Categorie, CategorieAdmin)
admin.site.register(DetailsModele, DetailsModeleAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(Prediction, PredictionAdmin)

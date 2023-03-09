from django.contrib import admin
from app.models import Modele, Categorie, DetailsModele, Image, Prediction, Resultat
from users.models import CustomUser

class ModeleAdmin(admin.ModelAdmin):
    list_display = ("nom", "chemin", "date_created", "accuracy", "recall")

class CategorieAdmin(admin.ModelAdmin):
    list_display = ("id", "nom")

class DetailsModeleAdmin(admin.ModelAdmin):
    list_display = ("modele", "categorie")

class ImageAdmin(admin.ModelAdmin):
    list_display = ("nom", "chemin", "categorie", "active")

class PredictionAdmin(admin.ModelAdmin):
    list_display = ("correct", "commentaire", "modele", "image")

class ResultatAdmin(admin.ModelAdmin):
    list_display = ("score", "categorie", "prediction")

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("username", "is_superuser")

admin.site.register(Modele, ModeleAdmin)
admin.site.register(Categorie, CategorieAdmin)
admin.site.register(DetailsModele, DetailsModeleAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(Prediction, PredictionAdmin)
admin.site.register(Resultat, ResultatAdmin)
admin.site.register(CustomUser,CustomUserAdmin) 
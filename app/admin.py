from django.contrib import admin
from app.models import Modele, Categorie, DetailsModele

class ModeleAdmin(admin.ModelAdmin):
    list_display = ("nom", "url", "date_created", "accuracy", "recall")

class CategorieAdmin(admin.ModelAdmin):
    list_display = ("id", "nom")

class DetailsModeleAdmin(admin.ModelAdmin):
    list_display = ("modele", "categorie")

admin.site.register(Modele, ModeleAdmin)
admin.site.register(Categorie, CategorieAdmin)
admin.site.register(DetailsModele, DetailsModeleAdmin)

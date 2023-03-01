from django.contrib import admin
from app.models import Modele, Categorie

class ModeleAdmin(admin.ModelAdmin):
    list_display = ("nom", "url", "date_created", "accuracy", "recall")

class CategorieAdmin(admin.ModelAdmin):
    list_display = ("id", "nom")

admin.site.register(Modele, ModeleAdmin)
admin.site.register(Categorie, CategorieAdmin)

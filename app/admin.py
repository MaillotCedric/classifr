from django.contrib import admin
from app.models import Modele

class ModeleAdmin(admin.ModelAdmin):
    list_display = ("nom", "url", "date_created", "accuracy", "recall")

admin.site.register(Modele, ModeleAdmin)

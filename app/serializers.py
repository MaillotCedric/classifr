from rest_framework.serializers import ModelSerializer,SerializerMethodField

from app.models import Image, Categorie

class CategorieListSerializer(ModelSerializer):
    class Meta:
        model = Categorie
        fields = ["nom"]

class ImageListSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = ["id", "nom", "chemin", "categorie"]

class ImageDetailsSerializer(ModelSerializer):
    categorie = SerializerMethodField()

    class Meta:
        model = Image
        fields = ["id", "nom", "chemin", "categorie"]
    
    def get_categorie(self, instance):
        queryset = instance.categorie
        serializer = CategorieListSerializer(queryset)

        return serializer.data

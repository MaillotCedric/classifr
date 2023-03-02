from rest_framework.serializers import ModelSerializer,SerializerMethodField

from app.models import Image, Categorie, Prediction, Resultat

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

class ResultatListSerializer(ModelSerializer):
    categorie = SerializerMethodField()

    class Meta:
        model = Resultat
        fields = ["prediction", "score", "categorie"]
    
    def get_categorie(self, instance):
        queryset = instance.categorie
        serializer = CategorieListSerializer(queryset)

        return serializer.data

class PredictionListSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Prediction
        fields = ["id", "modele", "image"]
    
    def get_image(self, instance):
        queryset = instance.image
        serializer = ImageListSerializer(queryset)
        
        return serializer.data

class PredictionDetailsSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Prediction
        fields = ["id", "modele", "image"]
    
    def get_image(self, instance):
        queryset = instance.image
        serializer = ImageDetailsSerializer(queryset)
        
        return serializer.data

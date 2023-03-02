from django.shortcuts import render

from rest_framework.viewsets import ReadOnlyModelViewSet

from app.models import Image

from app.serializers import ImageListSerializer, ImageDetailsSerializer

# Create your views here.

class MultipleSerializerMixin:
    details_serializer_class = None

    def get_serializer_class(self):
        if self.action == "retrieve" and self.details_serializer_class is not None:
            return self.details_serializer_class
        
        return super().get_serializer_class()

class ImageAPIViewSet(MultipleSerializerMixin, ReadOnlyModelViewSet):
    serializer_class = ImageListSerializer
    details_serializer_class = ImageDetailsSerializer

    def get_queryset(self):
        queryset = Image.objects.filter(active=True)
        categorie_id = self.request.GET.get("categorie_id")

        if categorie_id is not None:
            queryset = queryset.filter(categorie_id=categorie_id)
        
        return queryset

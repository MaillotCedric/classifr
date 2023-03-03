from django.urls import path
from . import views

urlpatterns = [
    path("images/", views.index_images, name="images"),
    path("predictions/", views.index_predictions, name="predictions"),
    path("modeles/", views.index_modeles, name="modeles")
]

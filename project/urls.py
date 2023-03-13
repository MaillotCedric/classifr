"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from rest_framework import routers

from app.views import ImageAPIViewSet, PredictionAPIViewSet, ResultatAPIViewSet, ModeleAPIViewSet, DetailsModeleAPIViewSet, CategorieAPIViewSet

from project import settings

from users.views import add_user, login_user, logout_user, home

router = routers.SimpleRouter()

router.register("categorie", CategorieAPIViewSet, basename="categorie")
router.register("image", ImageAPIViewSet, basename="image")
router.register("prediction", PredictionAPIViewSet, basename="prediction")
router.register("resultat", ResultatAPIViewSet, basename="resultat")
router.register("modele", ModeleAPIViewSet, basename="modele")
router.register("details-modele", DetailsModeleAPIViewSet, basename="details-modele")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(router.urls)),
    path("", include("app.urls")),
    path('compte/ajouter/', add_user, name="add-user"),
    path('', login_user, name="login"),
    path('compte/déconnexion/', logout_user, name="logout"),
] + static("data/images", document_root= settings.DATA_IMAGES_ROOT)

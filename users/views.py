from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib import messages
from users.models import CustomUser
from django.contrib.auth.forms import UserCreationForm
from app.views import *

class CustomAddUserForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = UserCreationForm.Meta.fields

def add_user(request):
    context = {}

    if request.method == "POST":
        form = CustomAddUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Nouvel utilisateur créé")
            return redirect('images')
        else:
            context["errors"] = form.errors
    
    form = CustomAddUserForm()
    context["form"] = form

    return render(request, "users/add-user.html", context={"form": form})


def login_user(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('images') 
            # return render(request, '../templates/images.html')
            # return redirect('home')     
     

        else:
            messages.error(request, 'Erreur, veuillez réessayez ...')
            return redirect('login')     
    
    else:
        return render(request, 'users/login.html', {})
        # return render(request, 'users/login.html', {})


def logout_user(request):
    logout(request)
    messages.warning(request, "Vous êtes déconnecté!!!")
    return redirect('login')

def home(request):
    return render(request, '../templates/home.html')
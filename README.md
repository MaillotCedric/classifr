# octo-classifr

brief 2b, le retour

## Installation

- Branch checkout :

  `git checkout <existing_branch>` ou `git checkout -b <new_branch>`

- Installer un environnement virtuel :

  - Windows :

    `py -m venv .env`
  
  - Linux ou Mac OS :
  
    `python3 -m venv .env` ou `python -m venv .env`
  
- Lancer l'environnement virtuel :

  - Windows :

    `.env\Scripts\activate`
  
  - Linux ou Mac OS :
  
    `source .env/bin/activate`
  
- Installer les différents packages (Django, ...) :

  `pip install -r requirements.txt`
  
- Installer le package permettant la connexion à une base de données PostgreSQL

  - Windows :
  
    `pip install psycopg2`
  
  - Linux ou Mac OS :
  
    `pip install psycopg2-binary`

- Créer la base de données sur PostgreSQL :

  - Paramètres de configuration :
  
    - Name : classifr
    - User : postgres
    - Password : 0000
  
- Effectuer les premières migrations :

  - supprimer les anciennes migrations :

    `app/migrations/<fichier_migration>.py`
  
  puis
  
  - Windows :

    `py manage.py migrate`

    `py manage.py makemigrations`

    `py manage.py migrate`
  
  - Linux ou Mac OS :

    `python3 manage.py migrate` ou `python manage.py migrate`

    `python3 manage.py makemigrations` ou `python manage.py makemigrations`

    `python3 manage.py migrate` ou `python manage.py migrate`

- Créer un jeu de données :

  - Windows :

    `py manage.py init_local_dev`

  - Linux ou Mac OS :

    `python3 manage.py init_local_dev` ou `python manage.py init_local_dev`

## Créer les dossiers spécifiques au projet

- Datasets :

  `data/`

- Modèles :

  `models/`

## Lancer le serveur Django

- Vérifier que l'environnement virtuel est lancé et que vous êtes bien dans le dossier `src` :

  - Windows :
  
    `py manage.py runserver`

  - Linux ou Mac OS :
  
    `python3 manage.py runserver` ou `python manage.py runserver`

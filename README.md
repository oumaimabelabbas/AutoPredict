# AutoPredict

**AutoPredict** est un projet de prédiction du prix des voitures d’occasion au Maroc.  
Le projet couvre tout le cycle : collecte des données, modélisation machine learning et deep learning, déploiement via API REST et interface web full-stack.

## Technologies utilisées
- **Data & ML** : Python, Pandas, Selenium, BeautifulSoup, scikit-learn, TensorFlow  
- **Backend** : FastAPI, Node.js, Express, MongoDB  
- **Frontend** : HTML, CSS, JavaScript  
- **Sécurité** : JWT pour l’authentification  

## Structure des branches
- **master** : interface web et déploiement (Node.js + MongoDB + frontend)  
- **ml_pipeline** : notebooks Jupyter contenant toutes les étapes ML :
  - Scraping et nettoyage des données
  - Préparation du dataset
  - Entraînement et comparaison de modèles (Linear, Polynomial, Decision Tree, Random Forest, SVR, ANN)
  - Tests et validation des modèles

## Fonctionnalités principales
- Scraping des données et préparation du dataset CSV  
- Entraînement et évaluation de modèles de régression et réseaux neuronaux  
- Déploiement du modèle via une API REST avec FastAPI  
- Interface web full-stack pour accéder aux prédictions  
- Authentification JWT, sauvegarde et historique des prédictions  

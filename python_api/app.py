from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import numpy as np

app = FastAPI()

# ===== CORS pour autoriser le frontend =====
origins = [
    "http://127.0.0.1:8000",
    "http://localhost:8000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ===== LOAD =====
model = joblib.load("model_rf.pkl")
scaler = joblib.load("scaler.pkl")
features = joblib.load("features.pkl")
marque_te = joblib.load("marque_te.pkl")
modele_te = joblib.load("modele_te.pkl")
global_mean = joblib.load("global_mean.pkl")

num_cols = [
    'Kilométrage',
    'Age_vehicule',
    'Nombre de portes',
    'Puissance fiscale',
    'Marque_te',
    'Modèle_te'
]

@app.post("/predict")
def predict(data: dict):
    required_fields = ['Ville', 'Marque', 'Modèle', 'Kilométrage', 'Age_vehicule',
                       'Nombre de portes','Puissance fiscale', 'Boite de vitesses',
                       'Type de carburant','Origine','Première main']
    
    for field in required_fields:
        if field not in data or data[field] in [None, "", " "]:
            return {"error": "Erreur, tous les champs sont obligatoires"}

    # Target Encoding
    data['Marque_te'] = marque_te.get(data['Marque'], global_mean)
    data['Modèle_te'] = modele_te.get(data['Modèle'], global_mean)

    data.pop('Marque')
    data.pop('Modèle')

    df = pd.DataFrame([data])

    # One Hot
    df = pd.get_dummies(df)
    df = df.reindex(columns=features, fill_value=0)

    # Scaling
    df[num_cols] = scaler.transform(df[num_cols])

    # Predict
    log_price = model.predict(df)[0]
    price = np.expm1(log_price)

    return {"prix": round(price, 2)}

# AutoPredict
AutoPredict is a used car price prediction project for the Moroccan market.  
The project covers the complete pipeline: data collection, machine learning and deep learning modeling, deployment through a REST API, and integration into a web application.

## Technologies Used

**Data & ML:** Python, Pandas, Selenium, BeautifulSoup, scikit-learn, TensorFlow  
**Backend:** FastAPI, Node.js, Express, MongoDB  
**Frontend:** HTML, CSS, JavaScript  
**Security:** JWT authentication  

## Branch Structure

**master:** Web interface and deployment (Node.js + MongoDB + frontend)  
**ml_pipeline:** Jupyter notebooks containing all ML stages:

- Data scraping and cleaning  
- Dataset preparation  
- Training and comparison of models (Linear Regression, Polynomial Regression, Decision Tree, Random Forest, SVR, ANN)  
- Model testing and validation  

## Key Features

- Data collection and CSV dataset preparation  
- Training and evaluation of regression models and neural networks  
- Model deployment via REST API using FastAPI  
- Full-stack web interface for accessing predictions  
- JWT authentication, prediction storage, and history tracking

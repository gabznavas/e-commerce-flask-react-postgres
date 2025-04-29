import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DEBUG = bool(int(os.getenv("DEBUG")))
    FLASK_ENV = os.getenv("FLASK_ENV")
    HTTP_PORT = int(os.getenv("HTTP_PORT"))
    SECRET_KEY_JWT = os.getenv("SECRET_KEY_JWT")
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = bool(int(os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", "0")))
    UI_URL = os.getenv("UI_URL")

class DevelopmentConfig(Config):
    DEBUG = True
    FLASK_ENV = 'development'

class ProductionConfig(Config):
    DEBUG = False
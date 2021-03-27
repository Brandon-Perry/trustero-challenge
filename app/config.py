import os

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO=True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    
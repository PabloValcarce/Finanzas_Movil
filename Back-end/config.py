import os
from urllib.parse import quote

class Config:
    # Extraer valores de las variables de entorno
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')  # Clave secreta predeterminada
    DB_USER = os.getenv('DB_USER', 'postgres')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'mel')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '5432')
    DB_NAME = os.getenv('DB_NAME', 'Gestor')

    # Asegurarse de escapar caracteres especiales
    DB_USER = quote(DB_USER)  # Escapar el nombre de usuario
    DB_PASSWORD = quote(DB_PASSWORD)  # Escapar la contraseña

    # Configurar la URI de la base de datos
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    # Desactivar el seguimiento de modificaciones para SQLAlchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False

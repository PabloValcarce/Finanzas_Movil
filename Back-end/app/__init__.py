from flask import Flask
from flask_cors import CORS
from app.models import db
from config import Config
from dotenv import load_dotenv
import os

load_dotenv()  # Cargar variables de entorno desde el archivo .env

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app,origins="*")  # Habilitar CORS para toda la aplicación

    # Registrar rutas
    from app.routes.main_routes import main
    from app.routes.auth_routes import auth
    from app.routes.transaction_routes import transactions
    from app.routes.category_routes import category_routes
    from app.routes.month_summary import month_summary_routes
    from app.routes.budgets_routes import budgets_routes
    
    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(transactions, url_prefix='/api')
    app.register_blueprint(category_routes, url_prefix='/api')
    app.register_blueprint(month_summary_routes, url_prefix='/api')
    app.register_blueprint(budgets_routes, url_prefix='/api')

    return app
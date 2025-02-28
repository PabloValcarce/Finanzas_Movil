from app import create_app, db
from app.models import User, Categoria, Transaction
from datetime import datetime, timedelta, timezone
from werkzeug.security import generate_password_hash

def initialize_db():
    print("Inicializando la base de datos...")

    # Crear contexto de aplicación
    app = create_app()  # Asegúrate de que tienes una función create_app() en tu app
    with app.app_context():
        db.create_all()

        # Verificar si el usuario ya existe
        user = User.query.filter_by(email="pvalca99@gmail.com").first()
        if not user:
            hashed_password = generate_password_hash("valderia4")  # Hashear la contraseña antes de guardarla
            user = User(name="Pablo", email="pvalca99@gmail.com", password=hashed_password)
            db.session.add(user)
            db.session.commit()

        # Crear categorías por defecto
        categories = [
            {"nombre": "Alimentación", "icono": "utensils"},  # 🍽️
            {"nombre": "Transporte", "icono": "bus"},  # 🚌
            {"nombre": "Entretenimiento", "icono": "film"},  # 🎬
            {"nombre": "Salud", "icono": "heartbeat"},  # ❤️‍🩹
            {"nombre": "Educación", "icono": "book"},  # 📚
            {"nombre": "Compras", "icono": "shopping-cart"},  # 🛒
            {"nombre": "Servicios", "icono": "cogs"},  # ⚙️
            {"nombre": "Viajes", "icono": "plane"},  # ✈️
        ]


        for cat in categories:
            categoria = Categoria.query.filter_by(nombre=cat["nombre"], user_id=None).first()
            if not categoria:
                categoria = Categoria(nombre=cat["nombre"], icono=cat["icono"], user_id=None) 
                db.session.add(categoria)

        db.session.commit()

        # Crear transacciones de ejemplo
        transacciones = [
            {"description": "Cena en restaurante", "amount": 50, "categoria": "Alimentación"},
            {"description": "Suscripción Netflix", "amount": 15, "categoria": "Entretenimiento", "is_subscription": True},
            {"description": "Gasolina", "amount": 40, "categoria": "Transporte"},
            {"description": "Consulta médica", "amount": 80, "categoria": "Salud"},
        ]

        for trans in transacciones:
            categoria = Categoria.query.filter_by(nombre=trans["categoria"], user_id=user.id).first()
            transaction = Transaction(
                description=trans["description"],
                amount=trans["amount"],
                user_id=user.id,
                categoria_id=categoria.id if categoria else None,
                is_subscription=trans.get("is_subscription", False),
                next_payment_date=datetime.now(timezone.utc) + timedelta(days=30) if trans.get("is_subscription") else None
            )
            db.session.add(transaction)

        db.session.commit()

        print("Base de datos inicializada correctamente.")

if __name__ == "__main__":
    initialize_db()

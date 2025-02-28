from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone, timedelta

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    refresh_token = db.Column(db.String(500), nullable=True)

    transactions = db.relationship('Transaction', back_populates='user', lazy=True)
    categorias = db.relationship('Categoria', back_populates='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'refresh_token': self.refresh_token
        }

class Categoria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    icono = db.Column(db.String(50), nullable=True)

    user = db.relationship('User', back_populates='categorias')
    transactions = db.relationship('Transaction', back_populates='categoria', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'user_id': self.user_id
        }

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categoria.id'), nullable=True)
    date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # Campos para suscripciones
    is_subscription = db.Column(db.Boolean, default=False, nullable=False)  # Indica si es una suscripción
    next_payment_date = db.Column(db.DateTime, nullable=True)  # Próxima fecha de cobro automático

    user = db.relationship('User', back_populates='transactions')
    categoria = db.relationship('Categoria', back_populates='transactions')

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'amount': self.amount,
            'user_id': self.user_id,
            'categoria_id': self.categoria_id,
            'date': self.date.isoformat() if self.date else None,
            'is_subscription': self.is_subscription,
            'next_payment_date': self.next_payment_date.isoformat() if self.next_payment_date else None,
            'categoria': self.categoria.to_dict() if self.categoria else None
        }

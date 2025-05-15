from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    refresh_token = db.Column(db.String(500), nullable=True)

    transactions = db.relationship('Transaction', back_populates='user', lazy=True)
    categories = db.relationship('Category', back_populates='user', lazy=True)
    budgets = db.relationship('Budget', back_populates='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'refresh_token': self.refresh_token
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(50), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    user = db.relationship('User', back_populates='categories')
    transactions = db.relationship('Transaction', back_populates='category', lazy=True)
    budgets = db.relationship('Budget', back_populates='category', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'icon': self.icon,
            'user_id': self.user_id
        }

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)
    date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    is_subscription = db.Column(db.Boolean, default=False, nullable=False)
    next_payment_date = db.Column(db.DateTime, nullable=True)

    user = db.relationship('User', back_populates='transactions')
    category = db.relationship('Category', back_populates='transactions')

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'amount': self.amount,
            'user_id': self.user_id,
            'category_id': self.category_id,
            'date': self.date.isoformat() if self.date else None,
            'is_subscription': self.is_subscription,
            'next_payment_date': self.next_payment_date.isoformat() if self.next_payment_date else None,
            'category': self.category.to_dict() if self.category else None
        }

class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)

    user = db.relationship('User', back_populates='budgets')
    category = db.relationship('Category', back_populates='budgets')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'user_id': self.user_id,
            'category_id': self.category_id,
            'category': self.category.to_dict() if self.category else None
        }

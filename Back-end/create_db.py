from app import create_app, db
from app.models import User, Category, Transaction
from datetime import datetime, timedelta, timezone
from werkzeug.security import generate_password_hash

def initialize_db():
    print("Initializing the database...")

    app = create_app()
    with app.app_context():
        db.create_all()

        # Check if user already exists
        user = User.query.filter_by(email="pvalca99@gmail.com").first()
        if not user:
            hashed_password = generate_password_hash("valderia4")
            user = User(name="Pablo", email="pvalca99@gmail.com", password=hashed_password)
            db.session.add(user)
            db.session.commit()

        # Default global categories (no user assigned)
        categories = [
            {"name": "Food", "icon": "utensils"},
            {"name": "Transport", "icon": "bus"},
            {"name": "Entertainment", "icon": "film"},
            {"name": "Health", "icon": "heartbeat"},
            {"name": "Education", "icon": "book"},
            {"name": "Shopping", "icon": "shopping-cart"},
            {"name": "Services", "icon": "cogs"},
            {"name": "Travel", "icon": "plane"},
        ]

        category_dict = {}
        for cat in categories:
            category = Category.query.filter_by(name=cat["name"], user_id=None).first()
            if not category:
                category = Category(name=cat["name"], icon=cat["icon"], user_id=None)
                db.session.add(category)
                db.session.commit()

            category_dict[cat["name"]] = category.id

        # Example transactions
        transactions = [
            {"description": "Dinner at restaurant", "amount": 50, "category": "Food"},
            {"description": "Netflix Subscription", "amount": 15, "category": "Entertainment", "is_subscription": True},
            {"description": "Gasoline", "amount": 40, "category": "Transport"},
            {"description": "Medical consultation", "amount": 80, "category": "Health"},
        ]

        for trans in transactions:
            category_id = category_dict.get(trans["category"])

            if category_id is None:
                print(f"⚠️ Warning: Category '{trans['category']}' not found. Skipping transaction.")
                continue

            transaction = Transaction(
                description=trans["description"],
                amount=trans["amount"],
                user_id=user.id,
                category_id=category_id,
                is_subscription=trans.get("is_subscription", False),
                next_payment_date=datetime.now(timezone.utc) + timedelta(days=30) if trans.get("is_subscription") else None
            )
            db.session.add(transaction)

        db.session.commit()
        print("✅ Database initialized successfully.")

if __name__ == "__main__":
    initialize_db()

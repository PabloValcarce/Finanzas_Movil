from datetime import datetime, timezone, timedelta
from app import db
from app.models import Transaction

def process_subscriptions():
    """Generates new transactions for active subscriptions whose next payment date has passed."""
    today = datetime.now(timezone.utc)

    # Find subscriptions where the next payment date is today or in the past
    subscriptions = Transaction.query.filter(
        Transaction.is_subscription == True,
        Transaction.next_payment_date <= today
    ).all()

    for sub in subscriptions:
        # Create a new transaction with the same data
        new_transaction = Transaction(
            description=sub.description,
            amount=sub.amount,
            user_id=sub.user_id,
            category_id=sub.category_id,
            date=today,
            is_subscription=True,
            next_payment_date=today + timedelta(days=30)
        )

        db.session.add(new_transaction)

        # Update the original transaction's next payment date
        sub.next_payment_date = today + timedelta(days=30)

    db.session.commit()
    print(f"✅ Subscriptions processed: {len(subscriptions)} new transactions created.")

if __name__ == "__main__":
    process_subscriptions()

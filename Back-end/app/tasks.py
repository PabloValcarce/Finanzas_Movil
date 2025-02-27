from datetime import datetime, timezone, timedelta
from app import db
from app.models import Transaction

def process_subscriptions():
    """Genera nuevas transacciones para suscripciones activas cuyo pago ya venció."""
    today = datetime.now(timezone.utc)

    # Buscar suscripciones cuya fecha de pago es hoy o ya pasó
    subscriptions = Transaction.query.filter(
        Transaction.is_subscription == True,
        Transaction.next_payment_date <= today
    ).all()

    for sub in subscriptions:
        # Crear una nueva transacción con los mismos datos
        new_transaction = Transaction(
            description=sub.description,
            amount=sub.amount,
            user_id=sub.user_id,
            categoria_id=sub.categoria_id,
            date=today,  # Fecha actual
            is_subscription=True,
            next_payment_date=today + timedelta(days=30)  # Próximo cobro en un mes
        )

        db.session.add(new_transaction)

        # Actualizar la fecha de próximo pago en la transacción original
        sub.next_payment_date = today + timedelta(days=30)

    db.session.commit()
    print(f"✅ Suscripciones procesadas: {len(subscriptions)} nuevas transacciones creadas.")

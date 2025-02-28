from flask import Blueprint, request, jsonify
from app.models import db, Transaction, Categoria
from app.middleware import token_required

transactions = Blueprint('transactions', __name__)

from datetime import datetime, timedelta

from datetime import datetime, timedelta, timezone

@transactions.route('/transactions', methods=['GET', 'POST'])
@token_required
def handle_transactions(current_user):
    if request.method == 'GET':
        transactions = Transaction.query.filter_by(user_id=current_user.id).order_by(Transaction.date.desc()).all()
        return jsonify([{
            'id': transaction.id,
            'description': transaction.description,
            'amount': transaction.amount,
            'date': transaction.date.isoformat() if transaction.date else None,
            'categoria': transaction.categoria.nombre if transaction.categoria else None,
            'is_subscription': transaction.is_subscription,
            'next_payment_date': transaction.next_payment_date.isoformat() if transaction.next_payment_date else None
        } for transaction in transactions])

    if request.method == 'POST':
        data = request.get_json()

        if not data.get('description') or not data.get('amount'):
            return jsonify({'message': 'Description and amount are required'}), 400

        categoria_id = data.get('categoria_id')  # Obtener la categoría desde la solicitud
        is_subscription = data.get('is_subscription', False)  # Si no se pasa, se asume que no es suscripción

        # Buscar la categoría en las categorías (predeterminadas o del usuario)
        categoria = Categoria.query.get(categoria_id)

        if not categoria:
            return jsonify({'message': 'Category not found'}), 404
        
        categoria_nombre = categoria.nombre  # Obtener el nombre de la categoría (ya sea predeterminada o personalizada)

        # Calcular la próxima fecha de pago si es una suscripción
        next_payment_date = None
        if is_subscription:
            today = datetime.now(timezone.utc)  # Obtener la fecha y hora actual en UTC
            next_payment_date = today + timedelta(days=30)  # Sumar 30 días para el próximo pago

        # Crear la nueva transacción
        new_transaction = Transaction(
            description=data['description'],
            amount=data['amount'],
            user_id=current_user.id,
            categoria_id=categoria.id,  # Relación con la categoría
            is_subscription=is_subscription,  # Establecer si es una suscripción
            next_payment_date=next_payment_date  # Asignar la próxima fecha de pago
        )

        db.session.add(new_transaction)
        db.session.commit()

        return jsonify({
            'id': new_transaction.id,
            'description': new_transaction.description,
            'amount': new_transaction.amount,
            'user_id': new_transaction.user_id,
            'date': new_transaction.date.isoformat() if new_transaction.date else None,
            'categoria': categoria_nombre,
            'is_subscription': new_transaction.is_subscription,
            'next_payment_date': new_transaction.next_payment_date.isoformat() if new_transaction.next_payment_date else None
        }), 201


@transactions.route('/transactions/<int:id>', methods=['PUT'])
@token_required
def update_transaction(current_user, id):
    data = request.get_json()
    transaction = Transaction.query.get(id)

    if not transaction or transaction.user_id != current_user.id:
        return jsonify({'message': 'Transaction not found or not authorized'}), 404

    # Actualizar la transacción
    transaction.description = data['description']
    transaction.amount = data['amount']
    
    # Si se proporciona una categoría nueva, actualizarla
    if 'categoria_id' in data:
        categoria = Categoria.query.get(data['categoria_id'])
        if categoria:
            transaction.categoria = categoria
    
    # Si se proporciona el estado de suscripción, actualizarlo
    if 'is_subscription' in data:
        transaction.is_subscription = data['is_subscription']
        
    # Si se proporciona la próxima fecha de pago, actualizarla
    if 'next_payment_date' in data:
        transaction.next_payment_date = data['next_payment_date']
    
    db.session.commit()

    return jsonify({
        'id': transaction.id,
        'description': transaction.description,
        'amount': transaction.amount,
        'user_id': transaction.user_id,
        'date': transaction.date.isoformat() if transaction.date else None,
        'categoria': transaction.categoria.nombre if transaction.categoria else None,
        'is_subscription': transaction.is_subscription,  # Devolver el estado de suscripción
        'next_payment_date': transaction.next_payment_date.isoformat() if transaction.next_payment_date else None  # Devolver la próxima fecha de pago
    })


@transactions.route('/transactions/<int:id>', methods=['DELETE'])
@token_required
def delete_transaction(current_user, id):
    transaction = Transaction.query.get(id)
    
    if not transaction or transaction.user_id != current_user.id:
        return jsonify({'message': 'Transaction not found or not authorized'}), 404
    
    db.session.delete(transaction)
    db.session.commit()

    return jsonify({'message': 'Transaction deleted'})

@transactions.route('/subscriptions', methods=['GET'])
@token_required
def get_monthly_subscription_total(current_user):
    # Obtener la fecha actual y el inicio del mes
    now = datetime.now(timezone.utc)
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    # Filtrar transacciones que sean suscripción y estén dentro del mes actual
    total = db.session.query(db.func.sum(Transaction.amount)).filter(
        Transaction.user_id == current_user.id,
        Transaction.is_subscription == True,
        Transaction.date >= start_of_month
    ).scalar() or 0  # Si no hay transacciones, retorna 0

    return jsonify({'total_subscription_expense': total})

from flask import Blueprint, request, jsonify
from app.models import db, Transaction, Category, Budget
from app.middleware import token_required
from datetime import datetime, timedelta, timezone

transactions = Blueprint('transactions', __name__)


@transactions.route('/transactions', methods=['GET', 'POST'])
@token_required
def handle_transactions(current_user):
    if request.method == 'GET':
        transactions = Transaction.query.filter_by(user_id=current_user.id).order_by(Transaction.date.desc()).all()
        return jsonify([{
            'id': t.id,
            'description': t.description,
            'amount': t.amount,
            'date': t.date.isoformat() if t.date else None,
            'category': t.category.name if t.category else None,
            'is_subscription': t.is_subscription,
            'next_payment_date': t.next_payment_date.isoformat() if t.next_payment_date else None
        } for t in transactions])

    if request.method == 'POST':
        data = request.get_json()
        force = request.args.get('force') == 'true'

        if not data.get('description') or data.get('amount') is None:
            return jsonify({'message': 'Description and amount are required'}), 400

        amount = float(data['amount'])
        category_id = data.get('category_id')
        is_subscription = data.get('is_subscription', False)
        now = datetime.now(timezone.utc)

        category = Category.query.get(category_id) if category_id else None
        if category_id and not category:
            return jsonify({'message': 'Category not found'}), 400

        if amount < 0 and not force:
            # Buscar presupuestos generales y específicos activos
            budgets = Budget.query.filter(
                Budget.user_id == current_user.id,
                Budget.start_date <= now,
                Budget.end_date >= now,
                ((Budget.category_id == category_id) | (Budget.category_id == None))
            ).all()

            warnings = []
            exceeds_any = False

            for budget in budgets:
                remaining = budget.amount - abs(amount)

                warnings.append({
                    'budget_name': budget.name,
                    'category_name': budget.category.name if budget.category else None,
                    'amount': budget.amount,
                    'remaining': remaining,
                    'exceeds': remaining < 0
                })

                if remaining < 0:
                    exceeds_any = True

            if warnings:
                return jsonify({
                    'warnings': warnings,
                    'exceeds_any_budget': exceeds_any
                }), 200

        # Crear la transacción si no hay advertencias o si se fuerza
        transaction = Transaction(
            description=data['description'],
            amount=amount,
            user_id=current_user.id,
            category_id=category.id if category else None,
            is_subscription=is_subscription,
            next_payment_date=now + timedelta(days=30) if is_subscription else None
        )

        db.session.add(transaction)

        # ✅ OPCIONAL: si quieres restar el presupuesto cuando se fuerza
        if amount < 0 and force:
            budgets = Budget.query.filter(
                Budget.user_id == current_user.id,
                Budget.start_date <= now,
                Budget.end_date >= now,
                ((Budget.category_id == category_id) | (Budget.category_id == None))
            ).all()
            for budget in budgets:
                budget.amount -= abs(amount)

        db.session.commit()

        return jsonify({
            'id': transaction.id,
            'description': transaction.description,
            'amount': transaction.amount,
            'date': transaction.date.isoformat() if transaction.date else None,
            'category': category.name if category else None,
            'is_subscription': transaction.is_subscription,
            'next_payment_date': transaction.next_payment_date.isoformat() if transaction.next_payment_date else None
        }), 201



@transactions.route('/transactions/<int:id>', methods=['PUT'])
@token_required
def update_transaction(current_user, id):
    data = request.get_json()
    transaction = Transaction.query.get(id)

    if not transaction or transaction.user_id != current_user.id:
        return jsonify({'message': 'Transaction not found or not authorized'}), 404

    transaction.description = data.get('description', transaction.description)
    transaction.amount = data.get('amount', transaction.amount)

    if 'category_id' in data:
        category = Category.query.get(data['category_id'])
        if category:
            transaction.category = category

    if 'is_subscription' in data:
        transaction.is_subscription = data['is_subscription']

    if 'next_payment_date' in data:
        try:
            transaction.next_payment_date = datetime.fromisoformat(data['next_payment_date'])
        except ValueError:
            return jsonify({'message': 'Invalid date format for next_payment_date'}), 400

    db.session.commit()

    return jsonify({
        'id': transaction.id,
        'description': transaction.description,
        'amount': transaction.amount,
        'user_id': transaction.user_id,
        'date': transaction.date.isoformat() if transaction.date else None,
        'category': transaction.category.name if transaction.category else None,
        'is_subscription': transaction.is_subscription,
        'next_payment_date': transaction.next_payment_date.isoformat() if transaction.next_payment_date else None
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
    now = datetime.now(timezone.utc)
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    total = db.session.query(db.func.sum(Transaction.amount)).filter(
        Transaction.user_id == current_user.id,
        Transaction.is_subscription == True,
        Transaction.date >= start_of_month
    ).scalar() or 0

    return jsonify({'total_subscription_expense': total})


@transactions.route('/transactions/recent', methods=['GET'])
@token_required
def get_recent_transactions(current_user):
    now = datetime.now(timezone.utc)
    thirty_days_ago = now - timedelta(days=30)

    recent_transactions = Transaction.query.filter(
        Transaction.user_id == current_user.id,
        Transaction.date >= thirty_days_ago
    ).order_by(Transaction.date.desc()).all()

    return jsonify([{
        'id': t.id,
        'description': t.description,
        'amount': t.amount,
        'date': t.date.isoformat() if t.date else None,
        'category': t.category.name if t.category else None,
        'is_subscription': t.is_subscription,
        'next_payment_date': t.next_payment_date.isoformat() if t.next_payment_date else None
    } for t in recent_transactions]), 200

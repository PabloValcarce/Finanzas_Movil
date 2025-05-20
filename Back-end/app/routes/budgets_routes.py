from flask import Blueprint, request, jsonify
from app.models import db, Budget, Category, Transaction
from app.middleware import token_required
from datetime import datetime, timezone

budgets_routes = Blueprint('budgets', __name__)

# Helper para parsear fechas ISO
def parse_date(date_str):
    try:
        return datetime.fromisoformat(date_str).astimezone(timezone.utc)
    except Exception:
        return None

@budgets_routes.route('/budgets', methods=['GET', 'POST'])
@token_required
def handle_budgets(current_user):
    if request.method == 'GET':
        budgets = Budget.query.filter_by(user_id=current_user.id).all()
        return jsonify([b.to_dict() for b in budgets])

    if request.method == 'POST':
        data = request.get_json()

        name = data.get('name')
        amount = data.get('amount')
        start_date_str = data.get('start_date')
        end_date_str = data.get('end_date')
        category_id = data.get('category_id')

        if not name or amount is None or not start_date_str or not end_date_str:
            return jsonify({'message': 'Name, amount, start_date and end_date are required'}), 400

        start_date = parse_date(start_date_str)
        end_date = parse_date(end_date_str)

        if not start_date or not end_date:
            return jsonify({'message': 'Invalid date format'}), 400

        category = Category.query.get(category_id) if category_id else None

        new_budget = Budget(
            name=name,
            amount=amount,
            start_date=start_date,
            end_date=end_date,
            user_id=current_user.id,
            category=category
        )

        db.session.add(new_budget)
        db.session.commit()

        return jsonify(new_budget.to_dict()), 201

@budgets_routes.route('/budgets/<int:id>', methods=['PUT'])
@token_required
def update_budget(current_user, id):
    data = request.get_json()
    budget = Budget.query.get(id)

    if not budget or budget.user_id != current_user.id:
        return jsonify({'message': 'Budget not found or not authorized'}), 400

    budget.name = data.get('name', budget.name)
    budget.amount = data.get('amount', budget.amount)

    start_date_str = data.get('start_date')
    end_date_str = data.get('end_date')

    if start_date_str:
        budget.start_date = parse_date(start_date_str)
    if end_date_str:
        budget.end_date = parse_date(end_date_str)

    category_id = data.get('category_id')
    if category_id:
        category = Category.query.get(category_id)
        if category:
            budget.category = category

    db.session.commit()

    return jsonify(budget.to_dict())

@budgets_routes.route('/budgets/<int:id>', methods=['DELETE'])
@token_required
def delete_budget(current_user, id):
    budget = Budget.query.get(id)

    if not budget or budget.user_id != current_user.id:
        return jsonify({'message': 'Budget not found or not authorized'}), 400

    db.session.delete(budget)
    db.session.commit()
    return jsonify({'message': 'Budget deleted'})

@budgets_routes.route('/budgets/<int:id>/progress', methods=['GET'])
@token_required
def budget_progress(current_user, id):
    budget = Budget.query.get(id)

    if not budget or budget.user_id != current_user.id:
        return jsonify({'message': 'Budget not found or not authorized'}), 400

    query = Transaction.query.filter(
        Transaction.user_id == current_user.id,
        Transaction.date >= budget.start_date,
        Transaction.date <= budget.end_date
    )

    if budget.category:
        query = query.filter(Transaction.category_id == budget.category_id)

    total_spent = sum(t.amount for t in query.all())
    remaining = budget.amount - total_spent

    return jsonify({
        'budget_id': budget.id,
        'name': budget.name,
        'total_budget': budget.amount,
        'total_spent': total_spent,
        'remaining': remaining,
        'start_date': budget.start_date.isoformat(),
        'end_date': budget.end_date.isoformat()
    })

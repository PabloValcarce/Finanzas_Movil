from flask import Blueprint, request, jsonify
from app.models import db, Budget, Category, Transaction
from app.middleware import token_required
from datetime import datetime, timezone

budgets_routes = Blueprint('budgets', __name__)

def parse_date(date_str):
    try:
        return datetime.fromisoformat(date_str).astimezone(timezone.utc)
    except Exception:
        return None

def get_transactions_for_budget(user_id, budget):
    query = Transaction.query.filter(
        Transaction.user_id == user_id,
        Transaction.date >= budget.start_date,
        Transaction.date <= budget.end_date
    )
    if budget.category_id:
        query = query.filter(Transaction.category_id == budget.category_id)
    return query.all()

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
        start_date = parse_date(data.get('start_date'))
        end_date = parse_date(data.get('end_date'))
        category_id = data.get('category_id')

        if not name or amount is None or not start_date or not end_date:
            return jsonify({'message': 'Name, amount, start_date and end_date are required'}), 400

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

    if 'start_date' in data:
        budget.start_date = parse_date(data['start_date'])
    if 'end_date' in data:
        budget.end_date = parse_date(data['end_date'])

    if 'category_id' in data:
        category = Category.query.get(data['category_id'])
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

    transactions = get_transactions_for_budget(current_user.id, budget)
    total_spent = -sum(t.amount for t in transactions if t.amount < 0)
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

@budgets_routes.route('/budget/status', methods=['GET'])
@token_required
def get_budget_status(current_user):
    now = datetime.now(timezone.utc)

    budgets = Budget.query.filter(
        Budget.user_id == current_user.id,
        Budget.start_date <= now,
        Budget.end_date >= now
    ).all()

    if not budgets:
        return jsonify([])

    transactions = Transaction.query.filter(
        Transaction.user_id == current_user.id,
        Transaction.date >= min(b.start_date for b in budgets),
        Transaction.date <= max(b.end_date for b in budgets)
    ).all()

    result = []
    for budget in budgets:
        applicable_tx = [
            t for t in transactions
            if (budget.category_id is None or t.category_id == budget.category_id)
            and budget.start_date <= t.date <= budget.end_date
        ]
        total_spent = -sum(t.amount for t in applicable_tx if t.amount < 0)
        remaining = budget.amount - total_spent

        result.append({
            'id': budget.id,
            'name': budget.name,
            'category_id': budget.category_id,
            'start_date': budget.start_date.isoformat(),
            'end_date': budget.end_date.isoformat(),
            'total_budget': budget.amount,
            'used': total_spent,
            'remaining': remaining
        })

    return jsonify(result)

import traceback
from flask import Blueprint, jsonify
from sqlalchemy import func, asc
from app.models import Transaction, Category
from app import db

month_summary_routes = Blueprint('month_summary', __name__)

@month_summary_routes.route('/month-summary/<int:user_id>', methods=['GET'])
def month_summary(user_id):
    try:
        # Group transactions by month, ordered from January to December
        monthly_expenses = (
            db.session.query(
                func.to_char(Transaction.date, 'YYYY-MM').label('month'),
                func.sum(Transaction.amount).label('total_spent'),
                func.count(Transaction.id).label('transaction_count')
            )
            .filter(Transaction.user_id == user_id)
            .group_by('month')
            .order_by(asc(func.to_date(func.to_char(Transaction.date, 'YYYY-MM'), 'YYYY-MM')))
            .all()
        )

        result = []

        for month, total_spent, transaction_count in monthly_expenses:
            # Get the category with the highest spending for the month
            top_spending_category = (
                db.session.query(
                    Category.name, func.sum(Transaction.amount).label('category_spent')
                )
                .join(Transaction, Transaction.category_id == Category.id)
                .filter(Transaction.user_id == user_id)
                .filter(func.to_char(Transaction.date, 'YYYY-MM') == month)
                .filter(Transaction.amount < 0)
                .group_by(Category.id)
                .order_by(func.sum(Transaction.amount).asc())
                .first()
            )

            # Find active subscriptions in that month
            subscriptions = (
                db.session.query(Transaction.description)
                .filter(
                    Transaction.user_id == user_id,
                    Transaction.is_subscription == True,
                    func.to_char(Transaction.date, 'YYYY-MM') == month
                )
                .all()
            )
            subscription_list = [s[0] for s in subscriptions] if subscriptions else []

            result.append({
                "month": month,
                "total_spent": total_spent,
                "transaction_count": transaction_count,
                "top_category": top_spending_category[0] if top_spending_category else "No category",
                "top_category_spent": top_spending_category[1] if top_spending_category else 0,
                "subscriptions": subscription_list
            })

        return jsonify({'summary': result}), 200

    except Exception as e:
        print(f"❌ Error in month_summary: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

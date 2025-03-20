import traceback
from flask import Blueprint, jsonify
from sqlalchemy import func, asc
from app.models import Transaction, Categoria
from app import db

month_summary_routes = Blueprint('month_summary', __name__)

@month_summary_routes.route('/month-summary/<int:user_id>', methods=['GET'])
def month_summary(user_id):
    try:
        # Agrupar transacciones por mes, ordenando de enero a diciembre
        gastos_por_mes = (
            db.session.query(
                func.to_char(Transaction.date, 'YYYY-MM').label('mes'),
                func.sum(Transaction.amount).label('total_gastos'),
                func.count(Transaction.id).label('num_transacciones')
            )
            .filter(Transaction.user_id == user_id)
            .group_by('mes')
            .order_by(asc(func.to_date(func.to_char(Transaction.date, 'YYYY-MM'), 'YYYY-MM')))  # Orden cronológico
            .all()
        )

        resultado = []

        for mes, total_gastos, num_transacciones in gastos_por_mes:
            # Obtener la categoría con mayor gasto en el mes
            categoria_mayor_gasto = (
                db.session.query(
                    Categoria.nombre, func.sum(Transaction.amount).label('gasto_categoria')
                )
                .join(Transaction, Transaction.categoria_id == Categoria.id)
                .filter(Transaction.user_id == user_id)
                .filter(func.to_char(Transaction.date, 'YYYY-MM') == mes)
                .filter(Transaction.amount < 0)  # Filtrar solo los gastos (amount negativo)
                .group_by(Categoria.id)
                .order_by(func.sum(Transaction.amount).asc())
                .first()
            )

            # Buscar suscripciones activas ese mes
            suscripciones = (
                db.session.query(Transaction.description)
                .filter(
                    Transaction.user_id == user_id,
                    Transaction.is_subscription == True,
                    func.to_char(Transaction.date, 'YYYY-MM') == mes
                )
                .all()
            )
            suscripciones_list = [s[0] for s in suscripciones] if suscripciones else []
            
            # Agregar los datos al resultado
            resultado.append({
                "month": mes,
                "total_spent": total_gastos,
                "num_transactions": num_transacciones,
                "top_category": categoria_mayor_gasto[0] if categoria_mayor_gasto else "Sin categoría",
                "top_category_spent": categoria_mayor_gasto[1] if categoria_mayor_gasto else 0,
                "subscriptions": suscripciones_list
            })

        return jsonify({'summary': resultado}), 200
    
    except Exception as e:
        print(f"❌ Error en month_summary: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

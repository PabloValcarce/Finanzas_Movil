import traceback
from flask import Blueprint, jsonify, request
from app.models import Categoria
from app import db

category_routes = Blueprint('categories', __name__)

# Ruta 1: Obtener solo las categorías por defecto (user_id es NULL)
@category_routes.route('/get-categorias-default', methods=['GET'])
def get_categorias_default():
    try:
        categorias_por_defecto = Categoria.query.filter_by(user_id=None).all()  # user_id == NULL
        categorias_formateadas = [{'id': cat.id, 'nombre': cat.nombre, 'icono': cat.icono} for cat in categorias_por_defecto]
        
        return jsonify({'categorias': categorias_formateadas}), 200
    except Exception as e:
        print(f"❌ Error en get_categorias_default: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

# Ruta 2: Obtener categorías por defecto + personalizadas del usuario
@category_routes.route('/get-categorias-combinadas/<int:user_id>', methods=['GET'])
def get_categorias_combinadas(user_id):
    try:
        categorias_por_defecto = Categoria.query.filter_by(user_id=None).all()  # categorías por defecto
        categorias_personalizadas = Categoria.query.filter_by(user_id=user_id).all()  # categorías personalizadas por user_id

        categorias_formateadas = [
            {'id': cat.id, 'nombre': cat.nombre, 'icono': cat.icono} for cat in categorias_por_defecto + categorias_personalizadas
        ]
        
        return jsonify({'categorias': categorias_formateadas}), 200
    except Exception as e:
        print(f"❌ Error en get_categorias_combinadas: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

# Ruta 3: Obtener solo las categorías personalizadas del usuario
@category_routes.route('/get-categorias-personalizadas/<int:user_id>', methods=['GET'])
def get_categorias_personalizadas(user_id):
    try:
        categorias_personalizadas = Categoria.query.filter_by(user_id=user_id).all()  # categorías personalizadas por user_id
        categorias_formateadas = [{'id': cat.id, 'nombre': cat.nombre, 'icono': cat.icono} for cat in categorias_personalizadas]
        
        return jsonify({'categorias': categorias_formateadas}), 200
    except Exception as e:
        print(f"❌ Error en get_categorias_personalizadas: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

# Ruta 4: Añadir una categoría personalizada (si no tiene user_id, es por defecto)
@category_routes.route('/add-categoria-personalizada', methods=['POST'])
def add_categoria_personalizada():
    try:
        data = request.get_json()
        
        if not data.get('nombre'):
            return jsonify({'message': 'El nombre de la categoría es requerido'}), 400
        
        user_id = data.get('user_id', None)  # Si no se proporciona user_id, será NULL (por defecto)
        icono = data.get('icono', None)  # El icono puede ser opcional

        nueva_categoria = Categoria(
            nombre=data['nombre'],
            user_id=user_id,
            icono=icono
        )
        
        db.session.add(nueva_categoria)
        db.session.commit()
        
        return jsonify({
            'id': nueva_categoria.id,
            'nombre': nueva_categoria.nombre,
            'user_id': nueva_categoria.user_id,
            'icono': nueva_categoria.icono
        }), 201  
    except Exception as e:
        print(f"❌ Error en add_categoria_personalizada: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500
    
# Ruta 5: Eliminar una categoría personalizada (solo si tiene user_id)
@category_routes.route('/eliminar-categoria-personalizada', methods=['POST'])
def eliminar_categoria_personalizada():
    try:
        data = request.get_json()
        
        categoria_id = data.get('categoria_id')
        user_id = data.get('user_id')
        
        if not categoria_id or not user_id:
            return jsonify({'message': 'El ID de la categoría y el user_id son requeridos'}), 400
        
        categoria = Categoria.query.filter_by(id=categoria_id, user_id=user_id).first()

        if not categoria:
            return jsonify({'message': 'Categoría no encontrada o no es personalizada'}), 404

        db.session.delete(categoria)
        db.session.commit()

        return jsonify({'message': 'Categoría eliminada con éxito'}), 200
        
    except Exception as e:
        print(f"❌ Error en eliminar_categoria_personalizada: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

import traceback
from flask import Blueprint, jsonify, request
from app.models import Category
from app import db

category_routes = Blueprint('categories', __name__)

# Route 1: Get only default categories (user_id is NULL)
@category_routes.route('/get-default-categories', methods=['GET'])
def get_default_categories():
    try:
        default_categories = Category.query.filter_by(user_id=None).all()
        formatted_categories = [{'id': cat.id, 'name': cat.name, 'icon': cat.icon} for cat in default_categories]
        return jsonify({'categories': formatted_categories}), 200
    except Exception as e:
        print(f"❌ Error in get_default_categories: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

# Route 2: Get default + custom categories for a user
@category_routes.route('/get-combined-categories/<int:user_id>', methods=['GET'])
def get_combined_categories(user_id):
    try:
        default_categories = Category.query.filter_by(user_id=None).all()
        custom_categories = Category.query.filter_by(user_id=user_id).all()

        formatted_categories = [
            {'id': cat.id, 'name': cat.name, 'icon': cat.icon}
            for cat in default_categories + custom_categories
        ]
        return jsonify({'categories': formatted_categories}), 200
    except Exception as e:
        print(f"❌ Error in get_combined_categories: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

# Route 3: Get only custom categories for a user
@category_routes.route('/get-custom-categories/<int:user_id>', methods=['GET'])
def get_custom_categories(user_id):
    try:
        custom_categories = Category.query.filter_by(user_id=user_id).all()
        formatted_categories = [{'id': cat.id, 'name': cat.name, 'icon': cat.icon} for cat in custom_categories]
        return jsonify({'categories': formatted_categories}), 200
    except Exception as e:
        print(f"❌ Error in get_custom_categories: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

# Route 4: Add a custom category
@category_routes.route('/add-custom-category', methods=['POST'])
def add_custom_category():
    try:
        data = request.get_json()

        if not data.get('name'):
            return jsonify({'message': 'Category name is required'}), 400

        user_id = data.get('user_id', None)
        icon = data.get('icon', None)

        new_category = Category(
            name=data['name'],
            user_id=user_id,
            icon=icon
        )

        db.session.add(new_category)
        db.session.commit()

        return jsonify({
            'id': new_category.id,
            'name': new_category.name,
            'user_id': new_category.user_id,
            'icon': new_category.icon
        }), 201
    except Exception as e:
        print(f"❌ Error in add_custom_category: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

# Route 5: Delete a custom category (only if it has user_id)
@category_routes.route('/delete-custom-category', methods=['POST'])
def delete_custom_category():
    try:
        data = request.get_json()

        category_id = data.get('category_id')
        user_id = data.get('user_id')

        if not category_id or not user_id:
            return jsonify({'message': 'Category ID and user_id are required'}), 400

        category = Category.query.filter_by(id=category_id, user_id=user_id).first()

        if not category:
            return jsonify({'message': 'Category not found or not custom'}), 404

        db.session.delete(category)
        db.session.commit()

        return jsonify({'message': 'Category deleted successfully'}), 200

    except Exception as e:
        print(f"❌ Error in delete_custom_category: {str(e)}")
        traceback.print_exc()
        return jsonify({'message': f'Error: {str(e)}'}), 500

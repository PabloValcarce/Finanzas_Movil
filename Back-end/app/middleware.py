import jwt
from functools import wraps
from flask import request, jsonify
from app.models import User
import os

# Tu clave secreta para firmar los JWTs
SECRET_KEY = os.getenv('SECRET_KEY')

# Decorador para proteger las rutas que requieren autenticación
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None

        # Buscamos el token en la cabecera de la solicitud
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  # "Bearer <token>"

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # Decodificamos el token
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({'message': 'User not found!'}), 404
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated_function

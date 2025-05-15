from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import db, User
import jwt
import os
import datetime

auth = Blueprint('auth', __name__)

# Ruta de registro (registro de un nuevo usuario)
@auth.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        # Validar si el usuario ya existe
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            print(f"Error: El usuario con el correo {data['email']} ya existe.")
            return jsonify({"message": "User already exists!"}), 400

        # Hashear la contraseña
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

        # Crear nuevo usuario
        new_user = User(name=data['name'], email=data['email'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        # Generar el token de acceso (access token) y el refresh token
        SECRET_KEY = os.getenv('SECRET_KEY')

        # Access token válido por 1 hora
        access_token = jwt.encode({
            'user_id': new_user.id,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        # Refresh token válido por 7 días
        refresh_token = jwt.encode({
            'user_id': new_user.id,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7)
        }, SECRET_KEY, algorithm='HS256')

        # Almacenar el refresh token en la base de datos
        new_user.refresh_token = refresh_token
        db.session.commit()

        return jsonify({
            "message": "User registered successfully!",
            "access_token": access_token,
            "refresh_token": refresh_token
        })

    except Exception as e:
        print(f"Error en el registro de usuario: {str(e)}")
        return jsonify({"message": "An error occurred during registration."}), 500


# Ruta de login (inicio de sesión de un usuario existente)
@auth.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()

        if not user or not check_password_hash(user.password, data['password']):
            print(f"Error: Fallo en el inicio de sesión para el usuario {data['email']}.")
            return jsonify({"message": "Login failed!"}), 401

        SECRET_KEY = os.getenv('SECRET_KEY')

        # Generar el token de acceso (access token)
        access_token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        # Generar el refresh token (más largo, por ejemplo 7 días)
        refresh_token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7)
        }, SECRET_KEY, algorithm='HS256')

        # Almacenar el refresh token en la base de datos
        user.refresh_token = refresh_token
        db.session.commit()

        return jsonify({
            "access_token": access_token,
            "refresh_token": refresh_token
        })

    except Exception as e:
        print(f"Error en el login del usuario {data.get('email', 'desconocido')}: {str(e)}")
        return jsonify({"message": "An error occurred during login."}), 500


# Ruta de refresh token (obtener un nuevo access token usando el refresh token)
@auth.route('/refresh-token', methods=['POST'])
def refresh_token():
    try:
        data = request.get_json()
        refresh_token = data.get('refresh_token')

        if not refresh_token:
            print("Error: El refresh token está ausente.")
            return jsonify({"message": "Refresh token is missing!"}), 400

        try:
            SECRET_KEY = os.getenv('SECRET_KEY', 'tu_clave_secreta_predeterminada')
            decoded_token = jwt.decode(refresh_token, SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token.get('user_id')

            if not user_id:
                print("Error: El refresh token no contiene un ID de usuario válido.")
                return jsonify({"message": "Invalid refresh token!"}), 401

            user = User.query.filter_by(id=user_id).first()
            if not user or user.refresh_token != refresh_token:
                print(f"Error: Refresh token inválido para el usuario con ID {user_id}.")
                return jsonify({"message": "Invalid refresh token!"}), 401

            # Generar un nuevo access token
            access_token = jwt.encode({
                'user_id': user_id,
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
            }, SECRET_KEY, algorithm='HS256')

            # Opcional: generar también un nuevo refresh token (si así lo deseas)
            new_refresh_token = jwt.encode({
                'user_id': user_id,
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7)
            }, SECRET_KEY, algorithm='HS256')

            # Actualizar el refresh token en la base de datos
            user.refresh_token = new_refresh_token
            db.session.commit()

            return jsonify({
                "access_token": access_token,
                "refresh_token": new_refresh_token
            })

        except jwt.ExpiredSignatureError:
            print("Error: El refresh token ha expirado.")
            return jsonify({"message": "Refresh token has expired!"}), 401
        except jwt.InvalidTokenError as e:
            print(f"Error: Refresh token inválido: {str(e)}")
            return jsonify({"message": "Invalid refresh token!"}), 401

    except Exception as e:
        print(f"Error al procesar el refresh token: {str(e)}")
        return jsonify({"message": "An error occurred during refresh token processing."}), 500

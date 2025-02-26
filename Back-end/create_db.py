from app import create_app
from app.models import db, Categoria

app = create_app()

def insert_default_categories():
    categories = ['Comida', 'Transporte', 'Ocio', 'Inversion', 'Renta', 'Salud', 'Otros']
    
    for category_name in categories:
        if not Categoria.query.filter_by(nombre=category_name).first():
            categoria = Categoria(nombre=category_name, user_id=None)  
            db.session.add(categoria)
    
    db.session.commit()

with app.app_context():
    db.create_all()

    insert_default_categories()

print("Database initialized, default categories and transactions inserted!")

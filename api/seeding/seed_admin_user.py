# app/seeding/seed_fake_users.py
from faker import Faker
from models import User
import bcrypt
from db import db

def seed_admin_user():
    user = User(
        name="admin",
        email="admin@admin.com",
        password=bcrypt.hashpw(b"123", bcrypt.gensalt()).decode("utf-8")
    )

    user_found = User.query.filter_by(email=user.email).first()
    if not user_found:
        try:
            db.session.add(user)
            print(f"* Usuário admin adicionado.")
            db.session.commit()
        except Exception as ex:
            print("* Erro ao adicionar usuários:", ex)
            db.session.rollback()

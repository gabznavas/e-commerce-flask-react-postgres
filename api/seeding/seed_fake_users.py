# app/seeding/seed_fake_users.py
from faker import Faker
from models import User
import bcrypt
from db import db

def seed_fake_users():
    fake = Faker()

    users_count = 37
    try:
        for _ in range(users_count):
            user = User(
                name=fake.name(),
                email=fake.email(),
                password=bcrypt.hashpw("123".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            )
            db.session.add(user)
            print(f"Usuário {user} adicionado.")
        db.session.commit()
        print("Usuários adicionados com sucesso.")
    except Exception as ex:
        print("Erro ao adicionar usuários:", ex)
        db.session.rollback()

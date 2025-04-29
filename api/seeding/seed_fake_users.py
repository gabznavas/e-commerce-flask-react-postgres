# app/seeding/seed_fake_users.py
from faker import Faker
from models import User
import bcrypt
from db import db

def seed_fake_users():
    fake = Faker()

    try:
        for _ in range(10):  # Criação de 10 usuários fictícios
            user = User(
                name=fake.name(),
                email=fake.email(),
                password=bcrypt.hashpw("123".encode("utf-8"), bcrypt.gensalt())
            )
            db.session.add(user)
        db.session.commit()
        print("Usuários adicionados com sucesso.")
    except Exception as ex:
        print("Erro ao adicionar usuários:", ex)
        db.session.rollback()

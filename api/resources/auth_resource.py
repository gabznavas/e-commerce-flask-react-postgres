import bcrypt
from flask_restful import Resource, reqparse
from sqlalchemy import func

from config import Config
import jwt

from models import User

class AuthResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email", type=str, required=True, help="E-mail is required")
    parser.add_argument("password", type=str, required=True, help="Password is required")


    def post(self):
        data = self.parser.parse_args()

        user = User.query.filter(func.lower(User.email) == data["email"].lower()).first()
        if not user:
            return {"message": "E-mail ou senha invalidos."}, 400

        password_equals = bcrypt.checkpw(data.get("password").encode("utf-8"), user.password)
        if not password_equals:
            return {"message": "E-mail ou senha invalidos."}, 400
        token_jwt = jwt.encode({"sub": user.email}, Config.SECRET_KEY_JWT, algorithm="HS256")

        return {"message": "Logado com sucesso!", "token": token_jwt}, 200



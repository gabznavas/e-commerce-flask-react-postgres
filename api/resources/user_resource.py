import bcrypt
from flask import request
from flask_restful import Resource, reqparse
from sqlalchemy.exc import SQLAlchemyError

from middlewares.jwt_middleware import jwt_required
from models import User

from db import db

def entity_to_response(user: User) -> dict:
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
    }

parser_user = reqparse.RequestParser()
parser_user.add_argument("name", type=str, required=True, help="Name is required")
parser_user.add_argument("email", type=str, required=True, help="E-mail is required")
parser_user.add_argument("password", type=str, required=True, help="Password is required")
parser_user.add_argument("passwordConfirmation", type=str, required=True, help="Password confirmation is required")

class UserCreateResource(Resource):
    method_decorators = [jwt_required]

    def post(self):
        data = parser_user.parse_args()

        if data["password"] != data["passwordConfirmation"]:
            return {"message": "Senha deve ser igual a confirmação de senha", }, 400

        user_by_email = User.query.filter_by(email=data["email"].strip()).first()
        if user_by_email:
            return {"message": "Já existe um usuário com esse e-mail!", }, 400

        try:
            new_user = User(
                name=data["name"].strip(),
                email=data["email"].strip(),
                password=bcrypt.hashpw(data["password"].strip().encode("utf-8"), bcrypt.gensalt()),
            )
            db.session.add(new_user)
            db.session.commit()
            return {"message": "Usuário criado.", "user": entity_to_response(new_user) }, 201
        except SQLAlchemyError as e:
            print(e)
            db.session.rollback()
            return {"message": "Erro no servidor, tente novamente mais tarde.", }, 500

class UserListAllResource(Resource):
    method_decorators = [jwt_required]

    pagination_parser = reqparse.RequestParser()
    pagination_parser.add_argument("page", type=int, default=1, location="args")
    pagination_parser.add_argument("limit", type=int, default=10, location="args")
    pagination_parser.add_argument("q", type=str, default='', location="args")


    def get(self):
        args = self.pagination_parser.parse_args()
        page = args["page"]
        limit = args["limit"]
        search_query = args["q"]

        query = User.query
        if query:
            search = f"%{search_query}%"
            query = query.filter(
                db.or_(
                    User.name.ilike(search),
                    User.email.ilike(search),
                )
            )

        pagination = query.paginate(page=page, per_page=limit, error_out=False)
        users_data: list[dict] = [entity_to_response(user) for user in pagination.items]

        return {
            "page": page,
            "limit": limit,
            "total": pagination.total,
            "pages": pagination.pages,
            "users": users_data
        }, 200

class FindUserByIdResource(Resource):
    method_decorators = [jwt_required]

    def get(self, user_id: int):
        user = User.query.filter_by(id=user_id).first()
        if user:
            return {
                "user": entity_to_response(user)
            }
        return {"message": "Usuário não encontrado.", }, 404


class UpdateUserByIdResource(Resource):
    method_decorators = [jwt_required]

    def put(self, user_id: int):
        data = parser_user.parse_args()

        if data["password"] != data["passwordConfirmation"]:
            return {"message": "Senha deve ser igual a confirmação de senha", }, 400

        user_by_email = User.query.filter_by(email=data["email"].strip()).first()
        if user_by_email and user_by_email.id != user_id:
            return {"message": "Já existe um usuário com esse e-mail!", }, 400

        user: User = User.query.filter_by(id=user_id).first()
        if user is None:
            return {"message": "Usuário não encontrado", }, 200

        try:
            user.name = data["name"].strip()
            user.email = data["email"].strip()
            user.password = bcrypt.hashpw(data["password"].strip().encode("utf-8"), bcrypt.gensalt())
            db.session.commit()
            return None, 204
        except SQLAlchemyError as e:
            print(e)
            db.session.rollback()
            return {"message": "Erro no servidor, tente novamente mais tarde.", }, 500

class DeleteUserByIdResource(Resource):
    method_decorators = [jwt_required]

    def delete(self, user_id: int):
        if request.user.id == user_id:
            return {"message": "Você não pode ser auto deletar.", }, 400

        user_count = User.query.count()
        if user_count == 1:
            return {"message": "Não pode deletar o último usuário.", }, 400

        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {"message": "Usuário não encontrado.", }, 404

        db.session.delete(user)
        db.session.commit()

        return None, 204
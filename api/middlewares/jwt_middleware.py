from functools import wraps

import jwt
from flask import request

from config import Config

from models import User

def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return {"message": "missing token"}, 401

        try:
            token = auth_header.split(" ")[1]
            decoded = jwt.decode(token, Config.SECRET_KEY_JWT, algorithms=["HS256"])
            user  = User.query.filter_by(email=decoded["sub"]).first()
            request.token = token
            request.user = user
        except Exception as e:
            print(e)
            return {"message": f"invalid token"}, 401

        return f(*args, **kwargs)
    return decorated
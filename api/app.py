from flask import Flask
from flask_restful import Api
from flask_cors import CORS
import os
from db import db

from config import Config, DevelopmentConfig, ProductionConfig
from resources.auth_resource import AuthResource
from resources.user_resource import UserCreateResource, UserListAllResource, FindUserByIdResource, \
    DeleteUserByIdResource, UpdateUserByIdResource

# start api instance
app = Flask(__name__)
api = Api(app)

# .env
config = None
if Config.FLASK_ENV == 'development':
    config = DevelopmentConfig
else:
    config = ProductionConfig
app.config.from_object(config)

# init db and create table
db.init_app(app)
with app.app_context():
    db.create_all()


# resources
api.add_resource(UserCreateResource, "/api/user")
api.add_resource(UserListAllResource, "/api/user")
api.add_resource(FindUserByIdResource, "/api/user/<int:user_id>")
api.add_resource(DeleteUserByIdResource, "/api/user/<int:user_id>")
api.add_resource(UpdateUserByIdResource, "/api/user/<int:user_id>")
api.add_resource(AuthResource, "/api/auth/login")

# active the cors
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}})

if __name__ == '__main__':
    app.run(debug=config.DEBUG, port=config.HTTP_PORT)
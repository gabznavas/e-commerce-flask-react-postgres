from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from db import db


from config import Config, DevelopmentConfig, ProductionConfig, FLASK_ENV
from resources.auth_resource import AuthResource
from resources.user_resource import UserCreateResource, UserListAllResource, FindUserByIdResource, \
    DeleteUserByIdResource, UpdateUserByIdResource
from seeding.seed_admin_user import seed_admin_user
from seeding.seed_fake_users import seed_fake_users

# start api instance
app = Flask(__name__)
api = Api(app)

# .env
config = None
if Config.FLASK_ENV == FLASK_ENV.DEVELOPMENT:
    config = DevelopmentConfig
else:
    config = ProductionConfig
app.config.from_object(config)

# init db and create table
db.init_app(app)

# init db
with app.app_context():
    db.create_all()  # Cria as tabelas
    seed_admin_user()

    # fake data to devs
    if Config.FLASK_ENV == FLASK_ENV.DEVELOPMENT:
        seed_fake_users()

# resources
api.add_resource(UserCreateResource, "/api/user")
api.add_resource(UserListAllResource, "/api/user")
api.add_resource(FindUserByIdResource, "/api/user/<int:user_id>")
api.add_resource(DeleteUserByIdResource, "/api/user/<int:user_id>")
api.add_resource(UpdateUserByIdResource, "/api/user/<int:user_id>")
api.add_resource(AuthResource, "/api/auth/login")

# active the cors
CORS(app, resources={r"/*": {"origins": [config.UI_URL]}})

if __name__ == '__main__':
    app.run(debug=config.DEBUG, port=config.HTTP_PORT)
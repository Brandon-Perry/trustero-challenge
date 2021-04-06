import os
from flask import Flask, request, redirect, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from .config import Config
from .seeds import seed_commands
from .models import db

from .api.task_routes import task_routes
from .api.list_routes import list_routes
from .api.comment_routes import comment_routes

#app intialization
app = Flask(__name__)

#app config
app.config.from_object(Config)
app.cli.add_command(seed_commands)


#DB initialization
db.init_app(app)
Migrate(app, db)

#Blueprints
app.register_blueprint(task_routes, url_prefix='/api/tasks')
app.register_blueprint(list_routes, url_prefix='/api/lists')
app.register_blueprint(comment_routes, url_prefix='/api/comments')

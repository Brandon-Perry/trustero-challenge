import os
from flask import Flask, request, redirect, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from .config import Config
from .seeds import seed_commands
from .models import db

#app intialization
app = Flask(__name__)

#app config
app.config.from_object(Config)
app.cli.add_command(seed_commands)


#DB initialization
db.init_app(app)
Migrate(app, db)

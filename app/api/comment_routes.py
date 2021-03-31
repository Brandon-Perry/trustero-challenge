from flask import Blueprint
from ..models import db, Comment

comment_routes = Blueprint('comments', __name__)

#get a comment according to its id

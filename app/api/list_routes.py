from flask import Blueprint
from ..models import db, List

list_routes = Blueprint('lists',__name__)


#Get all lists
@list_routes.route('/')
def get_lists():
    all_lists = List.query.all()
    return {'lists': [task_list.to_dict() for task_list in all_lists]}

#Get single list
@list_routes.route('/<id>')
def get_list(id):
    single_list = List.query.get(id)
    return {'list':single_list.to_dict()}

#create list
@list_routes.route('/', methods=['POST'])
def create_list():
    new_list = List()
    new_list.name = request.get_json().get('name')
    db.session.add(new_list)

#edit list
@list_routes.route('/<id>', methods=['PUT'])
def edit_list():
    edit_list = List.query.get(id)
    edit_list.name = request.get_json().get('name')
    db.session.commit()

#Destroy list
@list_routes.route('<id>', methods=['DELETE'])
def delete_list():
    the_list = List.query.get(id)
    db.session.delete(the_list)
    db.session.commit()
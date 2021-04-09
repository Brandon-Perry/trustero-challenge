from flask import Blueprint, jsonify, request
from ..models import db, List

list_routes = Blueprint('lists',__name__)


#Get all lists - works
@list_routes.route('/')
def get_lists():
    all_lists = List.query.all()
    
    data = [task_list.to_dict() for task_list in all_lists]
    
    return jsonify(data)

#Get single list - works
@list_routes.route('/<id>')
def get_list(id):
    single_list = List.query.get(id)
    data = single_list.to_dict()
    return jsonify(data)

#create list - works
@list_routes.route('/', methods=['POST'])
def create_list():
    new_list = List()
    new_list.name = request.get_json().get('name')
    db.session.add(new_list)
    db.session.commit()

    data = new_list.to_dict()
    return jsonify(data)

#edit list - works
@list_routes.route('/<id>', methods=['PUT'])
def edit_list(id):
    
    edit_list = List.query.get(id)
    
    edit_list.name = request.get_json().get('name')
    db.session.commit()

    data = edit_list.to_dict()
    return jsonify(data)

#Destroy list - works but needs confirmation
@list_routes.route('<id>', methods=['DELETE'])
def delete_list(id):
    the_list = List.query.get(id)
    db.session.delete(the_list)
    db.session.commit()

    return jsonify('success')
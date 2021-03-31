from flask import Blueprint

from ..models import Task, db 

task_routes = Blueprint('tasks', __name__)

#Get all tasks
@task_routes.route('/')
def get_tasks:
    tasks = Task.query.all()
    return {'tasks': [task.to_dict() for task in tasks]}

#Get single tasks by id
@task_routes.route('/<id>')
def get_task(id):
    task = Task.query.get(id)
    return {'task':task.to_dict()}

#Create task
@task_routes.route('/', methods=['POST'])
def create_task():
    new_task = Task()

    new_task.title = request.get_json().get('title')
    new_task.description = request.get_json().get('description')
    new_task.list_id = request.get_json().get('description')
    db.session.add(new_task)
    db.session.commit()

#Edit task
@task_routes.route('/<id>', methods=['PUT'])
def edit_task(id):
    task = Task.query.get(id)
    task.title = request.get_json().get('title')
    task.description = request.get_json().get('description')
    task.list_id = request.get_json().get('description')
    db.session.commit()

#Delete task
@task_routes.route('<id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
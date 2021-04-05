from flask import Blueprint, jsonify, request

from ..models import Task, db 

task_routes = Blueprint('tasks', __name__)
#Get all tasks - works
@task_routes.route('/')
def get_tasks():
    tasks = Task.query.all()
    data = [task.to_dict() for task in tasks]
    data = unpack_comments_from_task_list(data)
   
    return jsonify(data)

#Get single tasks by id - works
@task_routes.route('/<id>')
def get_task(id):
    task = Task.query.get(id)
    data = task.to_dict()
    data = unpack_comments_from_task(data)

    return jsonify(data)


#Create task - works
@task_routes.route('/', methods=['POST'])
def create_task():
    new_task = Task()

    new_task.title = request.get_json().get('title')
    new_task.description = request.get_json().get('description')
    if (request.get_json().get('list_id') != None):
        new_task.list_id = request.get_json().get('list_id')
     
    db.session.add(new_task)
    db.session.commit()

    data = new_task.to_dict()
    data = unpack_comments_from_task(data)
    return jsonify(data)


#Edit task - works
@task_routes.route('/<id>', methods=['PUT'])
def edit_task(id):
    task = Task.query.get(id)
    task.title = request.get_json().get('title')
    task.description = request.get_json().get('description')
    task.list_id = request.get_json().get('list_id')

    db.session.commit()

    data = task.to_dict()
    data = unpack_comments_from_task(data)
    return jsonify(data)

#Delete task - succeeds in deleting, need to add some success indicator
@task_routes.route('/<id>', methods=['DELETE'])
def delete_task(id):
    
    print('------')
    print(id)
    task = Task.query.get(int(id))
    print(task)
    db.session.delete(task)
    print('got past delete')
    db.session.commit()
    print('got past commit')
    print('------')

    return jsonify('success')


def unpack_comments_from_task_list(taskList):
    for task in taskList:
        task['comments'] = [comment.to_dict() for comment in task['comments']]

    return taskList

def unpack_comments_from_task(task):
    task['comments'] = [comment.to_dict() for comment in task['comments']]
    return task

from flask import Blueprint, jsonify, request
from ..models import db, Comment, Task

comment_routes = Blueprint('comments', __name__)

#get a comment according to its id
@comment_routes.route('/<id>')
def get_comment(id):
    comment = Comment.query.get(id)
    data = comment.to_dict()
    return jsonify(data)

@comment_routes.route('/task/<task_id>', methods=['POST'])
def create_comment(task_id):
    new_comment = Comment()
    new_comment.comment_text = request.get_json().get('comment_text')
    new_comment.task_id = task_id

    parent_task = Task.query.get(task_id)
    db.session.commit()
    parent_task.comments.append(new_comment)
    db.session.commit()
    
    data = new_comment.to_dict()
    return jsonify(data)

@comment_routes.route('/<id>', methods=['PUT'])
def edit_comment(id):
    comment = Comment.query.get(id)
    comment.comment_text = request.get_json().get('comment_text')
    db.session.commit()

    data = comment.to_dict()
    return jsonify(data)

@comment_routes.route('/<id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
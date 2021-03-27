from .db import db
from sqlalchemy.schema import Table
from sqlalchemy.orm import relationship

class Comment(db.Model):

    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)
    comment_text = db.Column(db.String(500), nullable=False)

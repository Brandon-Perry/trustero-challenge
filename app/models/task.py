from .db import db
from sqlalchemy.schema import Table
from sqlalchemy.orm import relationship

class Task(db.Model):

    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    status = db.Column(db.Boolean, default=False, nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'))

    comments = db.relationship('Comment', backref='tasks', lazy=True)


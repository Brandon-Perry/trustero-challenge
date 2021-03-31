from .db import db
from sqlalchemy.schema import Table
from sqlalchemy.orm import relationship


class List(db.Model):

    __tablename__ = 'lists'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(50), nullable=False)

    db.relationship('Task', backref='lists', lazy=True)

    def to_dict(self):
        return {
            'name':self.name,
        }
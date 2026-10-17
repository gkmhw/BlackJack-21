from EPA2026 import db

class Ranking(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String, nullable=False)
    saldo = db.Column(db.Integer, nullable=False)
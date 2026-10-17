from EPA2026 import app, db
from flask import render_template, url_for, request
from .models import Ranking





@app.route("/")
def home():
    return render_template("inicio.html")

@app.route("/regras")
def regras():
    return render_template("regras.html")

@app.route("/blackjack")
def blackjack():
    return render_template("index.html")

@app.route('/rank')
def rank():
    return render_template('ranking.html')

@app.route("/regranking", methods=['GET', 'POST'])
def gravar_pontos():

    if request.method == 'POST':
        dados = request.json

        namae = dados['nome']
        #print(namae)

        tensuu = dados['pontos']
        #print(tensuu)
  
        reg = Ranking.query.filter(Ranking.nome==namae).first()

        #print(reg)
        if not reg:

            registro = Ranking(
                nome = namae,
                saldo = tensuu
            )

            db.session.add(registro)
            db.session.commit()

            return 'ok'
        elif reg.nome == namae:

            if reg.saldo < tensuu:
                
                reg.saldo = tensuu
                db.session.commit()

                return 'nome existe saldo registrado por ser maior'
            
            else:
                return 'nome existe mas saldo não é maior'   
                 
        else:

            return 'comportamento estranho'

    if request.method == 'GET':
        dados = Ranking.query.order_by(Ranking.saldo.desc()).all()

        datums = {}
        idx = 0
        for d in dados:
            idx += 1
            datums[f'{idx}'] = [d.nome, d.saldo]


        return datums
    


@app.route('/zuardb', methods=['DELETE', 'POST'])
def limpar_db():
    if request.method == 'DELETE':

        deleted_objects = Ranking.__table__.delete().where(Ranking.id.in_([3]))
        db.session.execute(deleted_objects)
        db.session.commit()

    if request.method == 'POST':
        dados = request.json

        registro = Ranking(
            nome = dados['nome'],
            saldo = dados['pontos']
        )

        db.session.add(registro)
        db.session.commit()
    
    return 'ok'

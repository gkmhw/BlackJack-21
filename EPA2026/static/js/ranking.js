

export class Ranking {
    constructor(){
        this.nome = '';
        this.pontos_mesa = '';
        this.pontos_player = '';
        this.saldo = '';
        this.pontuacao = [];
    }

    salvar_json(){
        this.pontuacao = {nome: this.nome,
            pontos: this.saldo}
    }

    async gravarPontos(){
        try {
            await fetch('/regranking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.pontuacao)
            });
        }
        catch(err) {
            console.log(err);
            
        }
        return window.location.href = "http://localhost:5000/rank";
    }


    async chamarInput(pontos_mesa, pontos_player) {

        this.saldo = pontos_player - pontos_mesa;

        if(this.saldo < 0){
            return window.location.href = "http://localhost:5000/rank";
        }
        else if (this.saldo > 0){
            this.pontos_player = pontos_player;
            this.pontos_mesa = pontos_mesa;
            //this.nome = nome;
            
        }
        else {
            return window.location.href = "http://localhost:5000/rank";
        }
        
        let conteudo = document.getElementById("body").innerHTML;
        let body = document.getElementById("body");
        //let overlay = '<div class="overlay" style="background-color: rgba(0, 0, 0, 0);"></div>';


            
        await new Promise(resolve => {
            
            body.innerHTML = conteudo + `<div class="overlay" id="overlay" style="background-color: rgba(0, 0, 0, 0.5);">
                                            <div class="quadro">
                                                <input type="text" placeholder="Digite seu nome" id="input">
                                                <button onclick="" id="btsalvar">Salvar</button>
                                            </div>
                                        </div>`;

            let botao_salvar = document.getElementById("btsalvar");

            botao_salvar.addEventListener('click', (e) => {
                resolve();
                window.location.href = "http://localhost:5000/rank";
            })

        })

        this.nome = document.getElementById("input").value;

        this.fecharInput();

        this.salvar_json();

        await this.gravarPontos();
    };

    async fecharInput() {
        let overlay = document.getElementById("overlay")
        let body = document.getElementById("body");

        if(overlay) {
            body.removeChild(overlay);
        };
        
    };




}
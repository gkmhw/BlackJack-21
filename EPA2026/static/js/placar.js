

export class Placar {
    constructor() {
        this.pontosplayer = document.getElementById("placar_player");
        this.pontosmesa = document.getElementById("placar_mesa");
        this.alerta = document.getElementById('alerta');
        this.contagemplayer = 0;
        this.contagemmesa = 0;
        this.empate = 0;
    }

    async marcarponto(vencedor, msg) {
        if(vencedor === "player") {
            this.contagemplayer += 1;
            document.getElementById("placar_player").innerText = this.contagemplayer;
            await this.caixa_de_alerta(msg)
        }
        else if(vencedor === "mesa") {
            this.contagemmesa += 1;
            document.getElementById("placar_mesa").innerText = this.contagemmesa;
            await this.caixa_de_alerta(msg)
        }
        else if(vencedor === "empate") {
            this.empate += 1;
            await this.caixa_de_alerta(msg)
        }
    }

    async caixa_de_alerta(msg){

        alerta.textContent = msg;
        
        await setTimeout(() => {
            alerta.textContent = "";
        }, 2000);

}
}
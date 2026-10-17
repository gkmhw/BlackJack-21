//

class ExibirRanking {
    constructor(){
        this.tabela = document.getElementById("ranking")
        this.dados = ''
    }
    exibirRank(){
        let rank = document.getElementById("ranking");

        //console.log(this.dados)
        for(let d in this.dados){
            let row = document.createElement('tr');

            let pos = document.createElement('td');
            pos.innerText = d;

            

            let nm = document.createElement('td');
            nm.innerText = this.dados[d][0];

            let pt = document.createElement('td');
            pt.innerText = this.dados[d][1];
            
            row.appendChild(pos);
            row.appendChild(nm);
            row.appendChild(pt);

            

            rank.appendChild(row);
        }


    }
    async puxarDados(){
        try{
            let dados = await fetch('/regranking', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let dt = await dados.json();

            this.dados = dt;

            //console.log(this.dados)

            this.exibirRank();

            
        }
        catch(err){
            console.log('erro');
            
            console.log(err);
            
        }
        
        
    }
}

let ranking = new ExibirRanking();

ranking.puxarDados();

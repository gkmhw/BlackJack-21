import { Baralho } from "./EPA2026/static/js/criar_baralho.js";
import { Placar } from "./placar.js";
import { Ranking } from "./ranking.js";

const button_restart = document.getElementById('button_restart');
const alerta = document.getElementById('alerta');
const contagem = document.getElementById("contagem-player");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


let player = 'player';
let mesa = 'mesa';

let baralho = new Baralho();
baralho.embaralhar_cartas();


let placar = new Placar();

let ranking = new Ranking();

let six =0;
let seven =0;
let player_parou = false;
let mesa_parou = false;
let fim_de_jogo = false;

////////DOCUMENTAÇÃO/////////
//
//  use baralho.puxar_carta(quem está puxando... player ou mesa)
//  ex: baralho.puxar_carta(player) ---> player puxa uma carta
// 
//
//  sempre que criar um novo baralho, embaralhe
//
//  let baralho = new Baralho();
//  baralho.embaralhar_cartas();
//
//
//  a contagem de cartas do player e da mesa já vem imbutida
//
//  baralho.pontos_player;
//  baralho.pontos_mesa;
//
//
///////////////////////////



// function verificar__carta_as(player_or_mesa){ // analisar se as vai valer 1 ou 11
//     let arry = player_or_mesa.filter((r) => r.nome == "AS");
//     if(arry.length >= 2){
//         for(let i =1; i < arry.length; i++){
//             player_or_mesa[i].peso = 1;
//         }
//     }
// }


// function pontos_mesa(){
//     verificar__carta_as(mesa);
//     return mesa.reduce((ac, res) =>  ac + res.peso, 0);
// }



// function pontos_player(){ //ir na funcao analisar_player();
//     verificar__carta_as(player);
//     return player.reduce((ac, res) =>  ac + res.peso, 0);
// }





async function analisar_mesa() { // olhar o evento de click button_stop la embaixo para entender a função

    while (baralho.pontos_mesa < 17) { // enquanto pontos da mesa for menor que 17 ela vai dando mais cartas
        await baralho.puxar_carta(mesa);
        await sleep(1000);
        //ele vai adicionando cartas pra mesa ate pontos for < 17.  Se mesa  > 21, entao player ganha
    }
    console.log("chegou em analsar m,esa");
    
    await verificar_se_alguem_ganhou_ou_perdeu_ou_empate(); // aqui é quando nenhum dos dois ultrapassou 21, entao ele vai checar os 2 e ver qual é que tem o maior ponto

}


 async function verificar_se_alguem_ganhou_ou_perdeu_ou_empate() {

    if(baralho.pontos_mesa > 21 && baralho.pontos_player > 21){
        fim_de_jogo = true;
        await placar.marcarponto("empate", "empate! os dois passaram 21");
        remover_cartas();
    }else if (baralho.pontos_player == baralho.pontos_mesa) {
        fim_de_jogo = true;
        await placar.marcarponto("empate", "empate");
        remover_cartas();
    }else if (baralho.pontos_mesa > 21) {
        fim_de_jogo = true;
        await placar.marcarponto(player, "player ganhou! mesa passou 21");
        remover_cartas();
        //se enquanto ele tiver recebendo cartas o total de cartas dele for maior que 21 a mesa perde e o player ganha.
    }else if (baralho.pontos_player > baralho.pontos_mesa && baralho.pontos_player <= 21) {
        fim_de_jogo = true;
        await placar.marcarponto(player, "player ganhou!");
        remover_cartas();
    }
    else if (baralho.pontos_mesa > baralho.pontos_player && baralho.pontos_mesa <= 21) {
        fim_de_jogo = true;
        await placar.marcarponto(mesa, "mesa ganhou!");
        remover_cartas();
    }else if (baralho.pontos_player > 21) {
        fim_de_jogo = true;
        await placar.marcarponto(mesa, "mesa ganhou! player passou 21");
        remover_cartas();
        //se enquanto ele tiver recebendo cartas o total de cartas dele for maior que 21 a mesa perde e o player ganha.
    }
    //await sleep(1000);



}


function checagem(){
     if(six == 6 && seven == 7){
const todosOsElementos = document.querySelectorAll('body *');


todosOsElementos.forEach(elemento => {

    if (elemento.children.length === 0 && elemento.textContent.trim() !== "") {
        elemento.textContent = '67';
    }
});
}
}

async function distribuir_as_duas_primeiras_cartas() {//aqui estou verificando as duas primeiras cartas distribuidas
    //laço de repetição (2 vez)
    for (let i = 0; i <= 1; i++) {
        await baralho.puxar_carta(player);
        contagem_player();
        await sleep(1000);
        await baralho.puxar_carta(mesa);
        await sleep(1000);

    }
    //alternarBotoes(false);
    console.log(`mesa: ${JSON.stringify(mesa)} ||| pontos ${baralho.pontos_mesa}`);
    console.log(`player: ${JSON.stringify(player)} ||| pontos ${baralho.pontos_player}`)

}


// deixei async para permitir o uso do sleep();


 async function mostrar_cartas_mesa() {
    const div = document.getElementById('mesa[1]');
   const img_mesa = div.querySelector('img');
    img_mesa.src = `${baralho.deck_da_mesa[1].image}`;

 }



async function remover_cartas(){


    //baralho.reset();
    //contagem_player();
    
// let iPlayer = 0;
//     while (document.getElementById(`player[${iPlayer}]`)) {
//         const carta = document.getElementById(`player[${iPlayer}]`);
//         if (carta) carta.remove();
//         iPlayer++;
//         await sleep(500);
//     }

//     let iMesa = 0;
//     while (document.getElementById(`mesa[${iMesa}]`)) {
//         const carta = document.getElementById(`mesa[${iMesa}]`);
//         if (carta) carta.remove();
//         iMesa++;
//         await sleep(500);
//     }


    console.log("chegou no reset");
    
   baralho.reset();
    await contagem_player();
    await distribuir_as_duas_primeiras_cartas();


} 

async function contagem_player() {
   contagem.textContent  = `Contagem: ${baralho.pontos_player}`
}

// function alternarBotoes(desabilitar) {
//     baralho.button_get.disabled = desabilitar;
//     baralho.button_stop.disabled = desabilitar;
// }


baralho.button_get.addEventListener('click', async (e) => {
    six +=1;

        await baralho.puxar_carta(player);
        contagem_player();

        console.log(`player: ${JSON.stringify(player)} ||| pontos ${baralho.pontos_player}`);
        console.log(six)
        console.log(seven)
        checagem()
    })

baralho.button_stop.addEventListener('click', async (e) => {
    seven+=1;
    console.log(six)
    console.log(seven)
     
    //alternarBotoes(true);
    mostrar_cartas_mesa();
    await sleep(500);
    await analisar_mesa();
    //alternarBotoes(false);
checagem()
    

})




button_restart.addEventListener('click', (e) => {
    ranking.chamarInput(placar.contagemmesa, placar.contagemplayer);
})

async function start() {
    distribuir_as_duas_primeiras_cartas();
    contagem_player();
}


start();






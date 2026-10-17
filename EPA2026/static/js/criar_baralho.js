
import { get_card } from "./logica_jogo.js";
import { stop_card } from "./logica_jogo.js";


export class Baralho {

    constructor() {
        this.camflask = "static/cartas_png/";
        this.cards = ['COPAS', 'OUROS', 'ESPADAS', 'PAUS'];
        this.naipes = [
            { nome: "AS", PESO: 1 },
            { nome: "DOIS", PESO: 2 },
            { nome: "TRES", PESO: 3 },
            { nome: "QUATRO", PESO: 4 },
            { nome: "CINCO", PESO: 5 },
            { nome: "SEIS", PESO: 6 },
            { nome: "SETE", PESO: 7 },
            { nome: "OITO", PESO: 8 },
            { nome: "NOVE", PESO: 9 },
            { nome: "DEZ", PESO: 10 },
            { nome: "J", PESO: 10 },
            { nome: "Q", PESO: 10 },
            { nome: "K", PESO: 10 },
        ];
        this.deck = [];

        this.mesa_id = 0;
        this.player_id = 0;


        this.elemento_mesa = document.getElementById('cartas_mesa');
        this.elemento_player = document.getElementById('cartas_player');
        this.deck_do_player = [];
        this.deck_da_mesa = [];
        this.pontos_player = 0;
        this.pontos_mesa = 0;

        this.button_stop = document.getElementById('button_stop');
        this.button_get = document.getElementById('button_get');

        
    }

    alternar_botoes(check){
       if(check){
           this.button_get.removeEventListener('click', get_card);
           this.button_stop.removeEventListener('click', stop_card);
           this.button_get.style.cursor = "not-allowed";
           this.button_stop.style.cursor = "not-allowed";
       }else{
           this.button_get.addEventListener('click', get_card);
           this.button_stop.addEventListener('click', stop_card);
           this.button_get.style.cursor = "pointer";
           this.button_stop.style.cursor = "pointer";
       }

    }

    

    cards_blackjack() {


        for (let card of this.cards) {
            for (let naip of this.naipes) {
                this.deck.push({
                    nome: naip.nome,
                    peso: naip.PESO,
                    tipo: card,
                    image: `${this.camflask}${naip.nome}_DE_${card}.png`
                })
            }
        }

    }

    embaralhar_cartas() {
        this.cards_blackjack();


        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);

            let save_card = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = save_card;
        }
        console.log(this.deck);
    }

    //   embaralhar_correto(){ //serve para nunca acabar cartas do deck

    //     for(let i = this.deck.length- 1; i > 0;i-- ){
    //         let j = Math.floor( Math.random() * i);

    //         let save_card = this.deck[i];
    //         this.deck[i] = this.deck[j];
    //         this.deck[j] = save_card;
    //     }
    //    console.log(this.deck);

    //   }

    adicionar_elementos(ser) {

        const new_div = document.createElement("div");
        new_div.className = "carta";
        //console.log(this.deck);


        const img = document.createElement("img");
        console.log(this.deck);

        let card_game = this.deck.pop(); //pega a ultima carta e remove
        //this.deck.push(card_game);
        //this.embaralhar_correto();
        console.log(card_game);

        
        const urlImagem =  `${this.camflask}${card_game.nome}_DE_${card_game.tipo}.png`;

        img.src = urlImagem;
        img.style = "width: 80px;";


        if (ser === 'player') { //--> verificar se é jogador. se for adiciona id na img como "player" e se for mesa ele coloca id na img como "mesa"
            this.deck_do_player.push({ // estou pegando as cartas e jogando pra array tanto do player e da mesa(no else );
                nome: card_game.nome,
                peso: card_game.peso,
                tipo: card_game.tipo,
                image: card_game.image
            })

            new_div.appendChild(img);
            this.elemento_player.appendChild(new_div);
            new_div.id = `player[${this.player_id++}]`;

            this.pontos_player += card_game.peso;

        }
        else if (ser === 'mesa') {
            this.deck_da_mesa.push({
                nome: card_game.nome,
                peso: card_game.peso,
                tipo: card_game.tipo,
                image: card_game.image
            })

            new_div.appendChild(img);
            this.elemento_mesa.appendChild(new_div);
            new_div.id = `mesa[${this.mesa_id++}]`;

            if (this.mesa_id == 2) {
                const divv = document.getElementById('mesa[1]');
                const img2 = divv.querySelector('img');
                img2.src = `${this.camflask}carta_virada.png`;
            }

            this.pontos_mesa += card_game.peso;
        };
    };

    async puxar_carta(ser) {
        if (this.pontos_player > 21 && ser === 'player') {
            console.log("bloqueado");

            this.button_get.disabled = true;

            return false
        }
        if (this.pontos_mesa > 21 && ser === 'mesa') {
            console.log("bloqueado");

            return false
        }

        if (ser === 'mesa') {
            this.adicionar_elementos(ser);
            //console.log("che");

        }
        else if (this.pontos_player <= 21 && ser === 'player') {
            this.adicionar_elementos(ser);
        }


    };


    reset() {
        this.elemento_mesa.innerHTML = "";
        this.elemento_player.innerHTML = "";
        delete this.deck;
        this.deck = [];
        this.embaralhar_cartas();


        this.pontos_player = 0;
        this.pontos_mesa = 0;
        this.mesa_id = 0;
        this.player_id = 0;

        if (this.deck_do_player) this.deck_do_player.length = 0;
        if (this.deck_da_mesa) this.deck_da_mesa.length = 0;

    }

};


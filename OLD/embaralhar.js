import { cards_blackjack } from "./criando_baralho.js"; // importando o arquivo creating_cards aonde eu adicionei todos os cards



//aqui estou usando o algoritmo de fisher yates para embaralhamento de cartas
export function embaralhar_cartas(){

let cards = cards_blackjack();
    
  for(let i =cards.length- 1; i > 0;i-- ){
    let j = Math.floor( Math.random() * i);

    let save_card = cards[i];
    cards[i] = cards[j];
    cards[j] = save_card;
  } 

  return cards;

}





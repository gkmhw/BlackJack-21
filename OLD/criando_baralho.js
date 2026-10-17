export function cards_blackjack(){

    const cards =['COPAS', 'OUROS', 'ESPADAS', 'PAUS']
    
    const naipes = [
    {nome: "AS",PESO:11},
    {nome: "DOIS",PESO:2},
    {nome: "TRES",PESO:3},
    {nome: "QUATRO",PESO:4},
    {nome: "CINCO",PESO:5},
    {nome: "SEIS",PESO:6},
    {nome: "SETE",PESO:7},
    {nome: "OITO",PESO:8},
    {nome: "NOVE",PESO:9},
    {nome: "DEZ",PESO:10},
    {nome: "J",PESO:10},
    {nome: "Q",PESO:10},
    {nome: "K",PESO:10},
];


let deck = [];

for(let card of cards){
    for(let naip of naipes){
        deck.push({
            nome: naip.nome,
            peso: naip.PESO,
            tipo: card,
            image: `cartas_png/${naip.nome}_DE_${card}.png`
        })
        
    }
}

return deck

}





const allCards = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"
];
const gameCards = [];

function distribuirCartas(){
    let quantidade = prompt("Dgite um valor par entre 4 e 14 para começarmos!");
    while(quantidade%2 !== 0 || quantidade < 4 || quantidade > 14){
        if(quantidade%2 !== 0){
            quantidade = prompt("Eu disse par!");
        }
        if(quantidade < 4 || quantidade > 14){
            quantidade = prompt("Entre 4 e 14!")
        }    
    }

    allCards.sort(shuffler);
    for(let i = 0; i<quantidade/2; i++){
        gameCards[i] = allCards[i];
        gameCards[(quantidade/2)+i] = allCards[i];
    }
    gameCards.sort(shuffler);
    for(let i = 0; i< quantidade; i++){
        
        const conteudo = document.querySelector('.game');
        conteudo.innerHTML += `
        <div class="card" onclick= "cartaSelecionada(this)">
        <img class="front-face remove" src="content/${gameCards[i]}"/>
        <img class="back-face" src="content/front.png"/>
        </div>`;
    }
    
}
function shuffler(){
    return Math.random() - 0.5; 
}
function cartaSelecionada(element){
    element.classList.toggle("flip");
    element.querySelector(".front-face").classList.toggle("remove");
    element.querySelector(".back-face").classList.toggle("remove");
}
distribuirCartas();
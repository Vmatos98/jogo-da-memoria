
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
let firstCard, secondCard;
let lockgame = false;
let count = 0, point = 0;
let amount;
function distribuirCartas(){
    amount = prompt("Dgite um valor par entre 4 e 14 para começarmos!");
    while(amount%2 !== 0 || amount < 4 || amount > 14){
        if(amount%2 !== 0){
            amount = prompt("Eu disse par!");
        }
        if(amount < 4 || amount > 14){
            amount = prompt("Entre 4 e 14!")
        }    
    }

    allCards.sort(shuffler); //embaralha as cartas antes iniciar
    for(let i = 0; i<amount/2; i++){
        gameCards.push(allCards[i]);
        gameCards.push(allCards[i]);
    }
    gameCards.sort(shuffler); //embaralha as cartas do jogo
    for(let i = 0; i< amount; i++){
        
        const content = document.querySelector('.game');
        content.innerHTML += `
        <div class="card" onclick= "selectedCard(this)" data-card="${gameCards[i]}">
        <img class="front-face remove" src="content/${gameCards[i]}"/>
        <img class="back-face" src="content/front.png"/>
        </div>`;
    }
    
}
function shuffler(){
    return Math.random() - 0.5; 
}

function selectedCard(element){
    if(lockgame){ // caso o jogo esteja travado 
        return false; //reorna
    }
    element.classList.add("flip");
    element.querySelector(".front-face").classList.remove("remove");
    element.querySelector(".back-face").classList.add("remove");
    count++;
    count = parseInt(count);
    console.log(count);
    if(!firstCard){
        firstCard = element;
        return false;
    }
    secondCard = element;
    lockgame = true; // ao girar a segunda carta trava o jogo
    checkMatch();
}
function checkMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card){
        firstCard.removeAttribute("onclick");
        secondCard.removeAttribute("onclick");
        lockgame = false;
        firstCard = null;
        secondCard = null;
        point++;
        point= parseInt(point);
        console.log(point);
        
    }
    else{
        setTimeout(resetCard, 1000);
    }
    if(point === amount/2){
       const endGame = prompt(`Você ganhou em ${count} rodadas\n Deseja jogar novamente? (S/N)`);
       if(endGame === "s"||endGame === "S"){
        location.reload();
       }else{return false;}
    }
    
}
function resetCard(){
    firstCard.classList.remove("flip");
    firstCard.querySelector(".front-face").classList.add("remove");
    firstCard.querySelector(".back-face").classList.remove("remove");
    secondCard.classList.remove("flip");
    secondCard.querySelector(".front-face").classList.add("remove");
    secondCard.querySelector(".back-face").classList.remove("remove");
    lockgame = false;
    firstCard = null;
    secondCard = null;
}
function resetGame(){
    
}
distribuirCartas();
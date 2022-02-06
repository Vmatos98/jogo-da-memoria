
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
let hour =0, minute =0, second =0;
setInterval(timer,1000);
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
        <div class="card" data-identifier="card" onclick= "selectedCard(this)" data-card="${gameCards[i]}">
        <img class="front-face remove" data-identifier="front-face" src="./content/${gameCards[i]}"/>
        <img class="back-face" data-identifier="back-face" src="./content/front.png"/>
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
    
    
    if(!firstCard){
        firstCard = element;
        count++;
        count = parseInt(count);
        console.log(`contagem: ${count}`);
        return false;
    }
    if(element!== firstCard){
        secondCard = element;
        lockgame = true; // ao girar a segunda carta trava o jogo
        count++;
        count = parseInt(count);
        console.log(`contagem: ${count}`);
        checkMatch();
    }
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
        document.querySelector(".point span").innerText=point;
    }
    else{
        setTimeout(resetCard, 1000);
    }
    if(point === amount/2){
        setTimeout(endGame, 400);
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
function endGame(){
    const endGame = prompt(`Você ganhou em ${count} jogadas e com o tempo de: ${minute} minutos e ${second} segundos\n\n Deseja jogar novamente? (S/N)`);
    if(endGame === "s"||endGame === "S"){
     location.reload();
    }else{return false;} 
}
function timer(){
    if(point === amount/2){ return false;}
    second++;
    if(second>59){
        minute++;
        second = 0;
    }
    let aux = document.querySelector(".second");
    if(second < 10){
        aux.innerText= `0${second}`;
    }else{aux.innerText= second;}
    aux = document.querySelector(".minute");
    if(minute < 10){
        aux.innerText= `0${minute}`;
    }else{aux.innerText= minute;}
  
}
distribuirCartas();

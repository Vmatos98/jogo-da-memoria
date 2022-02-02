distribuirCartas();

function distribuirCartas(){
   
    let quantidade = prompt("Dgite um valor par entre 4 e 14 paracomeçarmos!");
    while(quantidade%2 !== 0 || quantidade < 4 || quantidade > 14){
        if(quantidade%2 !== 0){
            quantidade = prompt("Eu disse par!");
        }
        if(quantidade < 4 || quantidade > 14){
            quantidade = prompt("Entre 4 e 14!")
        }    
    }


    for(let i = 0; i< quantidade; i++){
        const conteudo = document.querySelector('.game');
        conteudo.innerHTML += `
        <div class="card ">
            <div class="front-face face">
                <img src="/content/front.png" alt="">
            </div>
            <div class="back-face face">
                Verso
            </div>
        </div>`;
    }
    
}
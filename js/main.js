let memoryGameBlock = document.querySelector(".memory-game-blocks");
let gameBlock = document.querySelectorAll(".memory-game-blocks .game-block");
let startEnd = document.querySelector(".start-End");
let start = document.querySelector(".screen.start");
let startImages = document.querySelector(".screen.start button.play-images");
let startWords = document.querySelector(".screen.start button.play-words");
let endBtn = document.querySelector(".screen.end button");
let end = document.querySelector(".screen.end");
let masseag = document.querySelector(".screen.end .masseag");
let imgs = document.querySelectorAll(".back img");
let words = document.querySelectorAll(".back span");


startImages.onclick = ()=> {
    words.forEach(word => word.remove())
    Select_Bluck()
    random()
    attempts()
    startEnd.style.display = "none";
    start.style.display = "none";
}
startWords.onclick = ()=> {
    imgs.forEach(img => img.remove())
    Select_Bluck()
    random()
    attempts()
    startEnd.style.display = "none";
    start.style.display = "none";
}
endBtn.onclick = ()=> {
    startEnd.style.display = "none";
    endBtn.parentElement.style.display = "none";
    gameBlock.forEach(e=> {
        e.classList.remove("rotate180")
        e.classList.remove("on")
    })
    yourScore = 0;
    NumAtt = 6;
    Select_Bluck()
    random()
    attempts()
    score()
    noClicking()
}

let firstBluck;
let yourScore = 0;
let NumAtt = 6 ;
let duration = 500;

function Select_Bluck(){
    gameBlock.forEach((block, i)=>{
        block.onclick = ()=>{
            if (!block.classList.contains("on")) {
                if (firstBluck === undefined) {
                    block.classList.add("rotate180");
                    block.classList.add("on");
                    firstBluck = i
                } else {
                    chick_Blick_True_Or_No(block)
                }
            }
        }
    })
}

function chick_Blick_True_Or_No(block){
    if (gameBlock[firstBluck].innerHTML === block.innerHTML) {
        block.classList.add("rotate180");
        block.classList.add("on");
        yourScore ++
        score()
        endGame()
        let right =  document.getElementById("rightSound");
        right.play()
        firstBluck = undefined;
    } else {
        block.classList.add("rotate180");
        gameBlock[firstBluck].classList.remove("on");
        NumAtt -- 
        attempts()
        endGame()
        setTimeout(() => {
            let wrong = document.getElementById("wrongSound");
            wrong.play()
            block.classList.remove("rotate180");
            gameBlock[firstBluck].classList.remove("rotate180");
            firstBluck = undefined;
        }, duration);
    }
    noClicking()
}

function random(){

    let blocks = Array.from(gameBlock);
    let orderRange = Array.from(Array(blocks.length).keys());
    let randomBlock = shuffle(orderRange)
    gameBlock.forEach((block, index)=>{
        block.style.order = randomBlock[index] ;
    })
    
}

function shuffle(array){
    let current = array.length
    , temp 
    , random ;
    while (current !== 0) {
        random = Math.floor(Math.random() * current);
        current --
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array
}

function noClicking(){
    if (NumAtt !== 0) {
        memoryGameBlock.classList.add("no-clicking")
        setTimeout(() => memoryGameBlock.classList.remove("no-clicking"), duration);
    }
}

function score(){
    let score = document.querySelector(".score span");
    score.innerHTML = yourScore;
}

function attempts(){
    let attempts = document.querySelector(".attempts span");
    attempts.innerHTML = NumAtt;
}

function endGame(){
    if((gameBlock.length / 2) === yourScore){
        startEnd.style.display = "flex";
        end.style.display = "flex";
        end.style.backgroundColor = "green";
        masseag.innerHTML = `Excellent Full Score : ${(gameBlock.length / 2)} / ${yourScore}`;
        let winSound = document.getElementById("winSound");
        winSound.play()
    }else if (NumAtt === 0) {
        startEnd.style.display = "flex";
        end.style.display = "flex";
        end.style.backgroundColor = "#a30606";
        masseag.innerHTML = `Your Score : ${(gameBlock.length / 2)} / ${yourScore}`;
        let failSound = document.getElementById("failSound");
        failSound.play()
    }
}
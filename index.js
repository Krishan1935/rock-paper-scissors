// moves
const rocks = document.querySelector("[data-rock]");
const paper = document.querySelector("[data-paper]");
const scissors = document.querySelector("[data-scissor]");

// mover???
const userMoveDisplay = document.querySelector("[data-userMove]");
const compMoveDisplay = document.querySelector("[data-computerMove]");

// who won??
const whowon = document.querySelector("[data-whowon]");

// score
const userWinsDisplay = document.querySelector("[data-userWins]");
const userLosesDisplay = document.querySelector("[data-userLoses]");
const userTiesDisplay = document.querySelector("[data-userTies]");
const compWinsDisplay = document.querySelector("[data-computerWins]");
const compLosesDisplay = document.querySelector("[data-computerLoses]");
const compTiesDisplay = document.querySelector("[data-computerTies]");
if(JSON.parse(localStorage.getItem("scores")) != null){
    userWinsDisplay.innerText = JSON.parse(localStorage.getItem("scores"))[0].wins;
    userLosesDisplay.innerText = JSON.parse(localStorage.getItem("scores"))[0].loses;
    userTiesDisplay.innerText = JSON.parse(localStorage.getItem("scores"))[0].ties;

    compWinsDisplay.innerText = JSON.parse(localStorage.getItem("scores"))[1].wins;
    compLosesDisplay.innerText = JSON.parse(localStorage.getItem("scores"))[1].loses;
    compTiesDisplay.innerText = JSON.parse(localStorage.getItem("scores"))[1].ties;
}

// reset score btn
const resetBtn = document.querySelector("[data-resetScore]");

// user move
let userMove = '';
let compMove = '';

// check which move selected by user
rocks.addEventListener("click",()=>{
    userMove = 'rock';

    userMoveDisplay.classList.add("animate-spin");
    compMoveDisplay.classList.add("animate-spin");
    whowon.innerText = 'V/S'
    displayMove(userMove);
    generateComputerMove()
    setTimeout(() => {
        userScore();
    }, 1300);
})  
paper.addEventListener("click",()=>{
    userMove = 'paper';

    userMoveDisplay.classList.add("animate-spin");
    compMoveDisplay.classList.add("animate-spin");
    whowon.innerText = 'V/S'
    displayMove(userMove);
    generateComputerMove()
    setTimeout(() => {
        userScore();
    }, 1300);
})
scissors.addEventListener("click",()=>{
    userMove = 'scissor';

    userMoveDisplay.classList.add("animate-spin");
    compMoveDisplay.classList.add("animate-spin");
    whowon.innerText = 'V/S';
    displayMove(userMove);
    generateComputerMove()
    setTimeout(() => {
        userScore();
    }, 1300);
})

    // display moves of user and computer
function displayMove(move){
    // set user move
    setTimeout(() => {
        userMoveDisplay.src = `images/${move}.jpg`;
        userMoveDisplay.classList.remove("animate-spin");

        compMoveDisplay.src = `images/${compMove}.jpg`;
        compMoveDisplay.classList.remove("animate-spin");
    }, 1300);
}

    // generate computer move
function generateComputerMove(){

    let num = Math.floor(Math.random()*10)/10
    // console.log(num)
    if(num<=0.3){
        // console.log('rock')
        compMove = 'rock';
    } else if(num<=0.6){
        // console.log('paper')
        compMove = 'paper';
    } else{
        // console.log('scissors')
        compMove = 'scissor';
    }
}


// show score
function userScore(){
    // console.log(usermove)
    // console.log(compmove)
    
    if(JSON.parse(localStorage.getItem("scores")) == null){
        let scoresArr = [
            userstats = {
                wins : 0,
                loses : 0,
                ties : 0,
            },
            compstats = {
                wins : 0,
                loses : 0,
                ties : 0,
            }
        ];
        
        localStorage.setItem("scores",JSON.stringify(scoresArr));
    } ;

    let scores = JSON.parse(localStorage.getItem("scores"));
    if(((userMove === 'rock' && compMove === 'scissor')||(userMove === 'paper'&&compMove === 'rock')||(userMove === 'scissor'&&compMove === 'paper'))){
        scores[0].wins++;
        scores[1].loses++;
        whowon.innerText = 'You Won!!'

        localStorage.setItem("scores",JSON.stringify(scores));
    }
    else if(((compMove === 'rock'&&userMove === 'scissor')||(compMove === 'paper'&&userMove === 'rock')||(compMove === 'scissor'&&userMove === 'paper'))){
        scores[0].loses ++;
        scores[1].wins++;

        whowon.innerText = 'You Lost..'

        localStorage.setItem("scores",JSON.stringify(scores));
    } else if(((compMove === userMove))){
        scores[0].ties++;
        scores[1].ties++;

        whowon.innerText = 'Its a tie!'
        localStorage.setItem("scores",JSON.stringify(scores));
    }

    userWinsDisplay.innerText = scores[0].wins;
    userLosesDisplay.innerText = scores[0].loses;
    userTiesDisplay.innerText = scores[0].ties;

    compWinsDisplay.innerText = scores[1].wins;
    compLosesDisplay.innerText = scores[1].loses;
    compTiesDisplay.innerText = scores[1].ties;
}

resetBtn.addEventListener("click",resetScore)

// reset score
function resetScore(){
    const score = JSON.parse(localStorage.getItem("scores"));

    score[0].wins = 0;
    score[0].loses = 0;
    score[0].ties = 0;

    score[1].wins = 0;
    score[1].loses = 0;
    score[1].ties = 0;
    userWinsDisplay.innerText = score[0].wins;
    userLosesDisplay.innerText = score[0].loses;
    userTiesDisplay.innerText = score[0].ties;

    compWinsDisplay.innerText = score[1].wins;
    compLosesDisplay.innerText = score[1].loses;
    compTiesDisplay.innerText = score[1].ties;

    localStorage.setItem("scores",JSON.stringify(score));
}
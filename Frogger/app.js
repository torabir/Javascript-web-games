const timeLeftDisplay = document.querySelector("#timeLeft")
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#startPauseButton");
const squares = document.querySelectorAll(".grid div")
const logsLeft = document.querySelectorAll(".logLeft")
const logsRight = document.querySelectorAll(".logRight")
const carsLeft = document.querySelectorAll(".carLeft")
const carsRight = document.querySelectorAll(".carRight")

let currentIndex = 76
let timerID 
let timer
let gameOver = false; 
let currentTime = 7
let score = 0

const width = 9

function moveFrog(e){

    squares[currentIndex].classList.remove("frog")

    switch(e.key){
        case "ArrowLeft": 
            console.log("move left")
            if(currentIndex % width !== 0) currentIndex -= 1
            break
        case "ArrowRight": 
            console.log("move right")
            if(currentIndex % width < width - 1) currentIndex += 1
            break
        case "ArrowUp": 
            console.log("move up")
            if(currentIndex - width >= 0) currentIndex -= width
            break
        case "ArrowDown": 
            console.log("move down")
            if(currentIndex + width <  width * width) currentIndex += width
            break
    }
    squares[currentIndex].classList.add("frog")
}

function autoMoveElements(){
    time();
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}

function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains("l1"):
            logLeft.classList.remove("l1");
            logLeft.classList.add("l2");
            break;
        case logLeft.classList.contains("l2"):
            logLeft.classList.remove("l2");
            logLeft.classList.add("l3");
            break;  
        case logLeft.classList.contains("l3"):
            logLeft.classList.remove("l3");
            logLeft.classList.add("l4");
            break;  
        case logLeft.classList.contains("l4"):
            logLeft.classList.remove("l4");
            logLeft.classList.add("l5");
            break;  
        case logLeft.classList.contains("l5"):
            logLeft.classList.remove("l5");
            logLeft.classList.add("l1");
            break;  
    }
}

function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains("l1"):
            logRight.classList.remove("l1");
            logRight.classList.add("l5");
            break;
        case logRight.classList.contains("l2"):
            logRight.classList.remove("l2");
            logRight.classList.add("l1");
            break;  
        case logRight.classList.contains("l3"):
            logRight.classList.remove("l3");
            logRight.classList.add("l2");
            break;  
        case logRight.classList.contains("l4"):
            logRight.classList.remove("l4");
            logRight.classList.add("l3");
            break;  
        case logRight.classList.contains("l5"):
            logRight.classList.remove("l5");
            logRight.classList.add("l4");
            break;  
    }
}

function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains("c1"):
            carLeft.classList.remove("c1");
            carLeft.classList.add("c2");
            break;
        case carLeft.classList.contains("c2"):
            carLeft.classList.remove("c2");
            carLeft.classList.add("c3");
            break;  
        case carLeft.classList.contains("c3"):
            carLeft.classList.remove("c3");
            carLeft.classList.add("c1");
            break;  
    }
}

function moveCarRight(carRight){
    switch(true){
        case carRight.classList.contains("c1"):
            carRight.classList.remove("c1");
            carRight.classList.add("c3");
            break;
        case carRight.classList.contains("c2"):
            carRight.classList.remove("c2");
            carRight.classList.add("c1");
            break;  
        case carRight.classList.contains("c3"):
            carRight.classList.remove("c3");
            carRight.classList.add("c2");
            break;  
    }
}

function lose(){
    if (
        squares[currentIndex].classList.contains("c1") ||
        squares[currentIndex].classList.contains("l4") ||
        squares[currentIndex].classList.contains("l5") ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = "'You lose! Froggy Froggins has failed.'"
        clearInterval(timerID)
        clearInterval(timer)
        squares[currentIndex].classList.remove("frog")
        document.removeEventListener("keyup", moveFrog)
        gameOver = true
        console.log(score)
    }
}

function win() {
    if (squares[currentIndex].classList.contains("endingBlock")) {
        clearInterval(timerID);
        clearInterval(timer);
        document.removeEventListener("keyup", moveFrog);
        gameOver = true;

        if (score < 2) {
            score++;
        }

        let nextGame = document.querySelector("#nextGameButton");

        // Sjekker om 'Next'-knappen allerede eksisterer
        if (!nextGame) {
            nextGame = document.createElement("button");
            nextGame.setAttribute("id", "nextGameButton");
            const body = document.querySelector('body');
            body.appendChild(nextGame);
        }

        // Oppdaterer knappen basert på score
        if (score === 1) {
            resultDisplay.textContent = "'You win! Froggy Froggins restored peace to the realm.'";
            nextGame.innerText = "Teleport to level 2";
            nextGame.removeEventListener('click', resetGame); // Fjern resetGame hvis den tidligere var satt
            nextGame.addEventListener('click', () => {
                level2();
                nextGame.remove(); // Fjern knappen etter at den er trykket
            });
        } else if (score === 2) {
            resultDisplay.textContent = "'You win! Froggy Froggins got away.'";
            nextGame.innerText = "Teleport back home";
            nextGame.removeEventListener('click', level2); // Fjern level2 for å unngå overlap
            nextGame.addEventListener('click', () => {
                resetGame();
                nextGame.remove(); // Fjern knappen etter at den er trykket
            });
        }
        console.log(score);
    }
}

function checkWinLose() {
    win()
    lose()
    console.log(score)
}

function time() {
    currentTime --;
    timeLeftDisplay.textContent = currentTime
}

function resetGame() {
    currentIndex = 76
    currentTime = 7
    score = 0
    gameOver = false
    timeLeftDisplay.textContent = currentTime
    resultDisplay.textContent = "'Froggy Froggins was revived.' Game reset ..."
    squares.forEach(square => square.classList.remove('frog')); // Fjerne frosken fra alle ruter
    squares[currentIndex].classList.add('frog'); // Legge til frosken til startposisjon
    let nextGame = document.querySelector("#nextGameButton");
    if (nextGame) {
        nextGame.remove();
        resultDisplay.textContent = "You were teleported back home and spent the rest of your days in peace."
        timeLeftDisplay.textContent = ""
    }
    
}

function level2(){
    currentIndex = 76
    currentTime = 6
    gameOver = false
    timeLeftDisplay.textContent = currentTime
    resultDisplay.textContent = "'Froggy Froggins was teleported to another dimention! HURRY TO THE PORTAL!!"
    squares.forEach(square => square.classList.remove('frog')); // Fjerne frosken fra alle ruter
    squares[currentIndex].classList.add('frog'); // Legge til frosken til startposisjon
    timerID = setInterval(autoMoveElements, 1000)
    timer = setInterval(checkWinLose, 50)
    document.addEventListener("keyup", moveFrog)
}


startPauseButton.addEventListener("click", () => {
    if(gameOver){
        resetGame()
    }
    if (timerID) {
        clearInterval(timerID)
        clearInterval(timer)
        document.removeEventListener("keyup", moveFrog)
        timerID = null
        timer = null
    } else {
        timerID = setInterval(autoMoveElements, 1000)
        timer = setInterval(checkWinLose, 50)
        document.addEventListener("keyup", moveFrog)
        resultDisplay.textContent = "'Hurry!! Get to the other soide!!!' (muttered with an Irish accent in the voice of a crossbreed between a frog and a hobbit)"
    }
})
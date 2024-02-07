const grid = document.querySelector(".grid")
const score = document.querySelector("#score")
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const ballDiameter = 20
const boardHeigth = 300

let xDirection = 2
let yDirection = 2

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballPosition = ballStart

let timerId
let scoreCount = 0


//Create block 
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//All my blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

//Draw all my blocks 
function addBlocks(){
    for(let i=0; i<blocks.length; i++){
        const block = document.createElement("div");
        block.classList.add("block")
        block.style.left = blocks[i].bottomLeft[0] + "px"
        block.style.bottom = blocks[i].bottomLeft[1] + "px"
        grid.appendChild(block) 
    }
} 

addBlocks()

// add user
const user = document.createElement("div")
user.classList.add("user")
drawUser()
grid.appendChild(user)

//draw user
function drawUser(){
    user.style.left = currentPosition[0] + "px"
    user.style.bottom = currentPosition[1] + "px"
}

//Draw ball
function drawBall(){
    ball.style.left = ballPosition[0] + "px"
    ball.style.bottom = ballPosition[1] + "px"
}

//move user: 

function moveUser(e){
    switch(e.key){
        case "ArrowLeft":
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case "ArrowRight":
            if(currentPosition[0] < boardWidth-blockWidth){
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener("keydown", moveUser)

//add ball
const ball = document.createElement("div")
ball.classList.add("ball")
drawBall()
grid.appendChild(ball)

//Move ball
function moveBall(){
    ballPosition[0] += xDirection
    ballPosition[1] += yDirection
    drawBall()
    checkForColisions()
}

timerId = setInterval(moveBall, 30)

//check for collisions
function checkForColisions(){
    //check for block collisions
    for(let i=0; i<blocks.length; i++){
        if(
        (ballPosition[0] > blocks[i].bottomLeft[0] && ballPosition[0] < blocks[i].bottomRight[0]) &&
        ((ballPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballPosition[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll(".block"))
            allBlocks[i].classList.remove("block")
            blocks.splice(i, 1)
            changeDirection()
            scoreCount++;
            score.innerHTML = scoreCount
        }

        //check for win: 
        if(blocks.length === 0){
            score.innerHTML = "You win!!!"
            clearInterval(timerId)
            document.removeEventListener("keydown", moveUser)
        }
    }

    //Check for wall collisions
    if(
        ballPosition[0] >= (boardWidth-ballDiameter) || 
        ballPosition[1] >= (boardHeigth - ballDiameter) ||
        ballPosition[0] <= 0 
        ){
        changeDirection()
    }

    //Check for user colision: 
    if(
        (ballPosition[0] > currentPosition[0] && ballPosition[0] < currentPosition[0] + blockWidth) &&
        (ballPosition[1] > currentPosition[1] && ballPosition[1] < currentPosition[1] + blockHeight)
    ){
        changeDirection()
    }


    //check for game over
    if(ballPosition[1] <= 0){
        clearInterval(timerId)
        score.innerHTML = "You lose! Final score: " + scoreCount 
        document.removeEventListener("keydown", moveUser)
    }
}

function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2){
        xDirection = 2
    }
}

// Finjustering: endre på if-setningene
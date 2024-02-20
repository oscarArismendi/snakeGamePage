// import { sleep } from "../js/utils" 

//html elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
//global variables
let gridSize = 20;
let direction = "right";
let lastMove = direction;
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;

let snake = [{
    x:10,
    y:10
}];

let food = generateFood();

function draw() { //draw the map, the snake and the food
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
}

function drawSnake() {
    snake.forEach((segment) =>{
        const snakeElement = createGameElement("div","snake");
        setPosition(snakeElement,segment);
        board.appendChild(snakeElement);
    });
}

function createGameElement(tag,className){// create snake and food
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element,position){  //set position for each element
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    if(gameStarted){
        const foodElement = createGameElement("div","food")
        setPosition(foodElement,food);
        board.appendChild(foodElement);
    }
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) +1;
    let y = Math.floor(Math.random() * gridSize) +1;
    for(segment of snake){
        if(segment.x === x || segment.y === y){
            let n = snake.length
            x = snake[n-1].x;
            y = snake[n-1].y;
            console.log("have to change the food");
            break;
        }
    }
    console.log(x,y);
    return {x,y};
}

function move() {
    const head = {...snake[0]};//ensure that we create a new object and the snake doesn't modify
    switch(direction) {
        case "right":
            lastMove = "right";
            head.x++;
            if(head.x > gridSize){head.x = 1;}
            break;
        case "left":
            lastMove = "left";
            head.x--;
            if(head.x < 1){head.x = 20;}
            break;
        case "up":
            lastMove = "up";
            head.y--;
            if(head.y < 1){head.y = 20;}
            break;
        case "down":
            lastMove = "down";
            head.y++;
            if(head.y > gridSize){head.y = 1;}
            break;
    }

    snake.unshift(head);//add the new head of the snake to the beginning of the array
    if(head.x === food.x && head.y === food.y){
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval);// clear past inveterval
        gameInterval = setInterval(() =>{
            move();
            checkCollision();
            draw();
        },gameSpeedDelay);
    } else{
        snake.pop();//remove the tail of the snake from the end of the array
    }
}

function startGame() {
    gameStarted = true;//keeo track of a running game
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(() =>{
        move();
        checkCollision();
        draw();
    },gameSpeedDelay);
}

function handleKeyPress(event) {
    if((!gameStarted && event.code === "space") ||
    (!gameStarted && event.key === " ")){
        startGame();
    } else{
        switch (event.key){
            case "ArrowUp":
            case "w":
            case "W":
                if(lastMove === "down" && snake.length > 1){break;}
                direction = "up";
                break;
            case "ArrowDown":
            case "s":
            case "S":
                if(lastMove === "up" && snake.length > 1){break;}
                direction = "down";
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                if(lastMove === "right" && snake.length > 1){break;}
                direction = "left";
                break;
            case "ArrowRight":
            case "d":
            case "D":
                if(lastMove === "left" && snake.length > 1){break;}
                direction = "right";
                break;
        }
    }
}

document.addEventListener("keydown",handleKeyPress)

function increaseSpeed() {
    if(gameSpeedDelay > 150){
        gameSpeedDelay -= 5;
    } else if(gameSpeedDelay > 100){
        gameSpeedDelay -= 3;
    } else if(gameSpeedDelay > 50){
        gameSpeedDelay -= 2;
    } else if(gameSpeedDelay > 25){
        gameSpeedDelay -= 1;
    }
}

function checkCollision() {
    const head = snake[0];
    
    for(let i=1;i < snake.length;i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            resetGame();
        }
    }
}

function resetGame() {
    updateHighScore();
    setTimeout(()=>{
        stopGame();
        setTimeout(() => {
            snake = [{x: 10, y: 10}];
            food = generateFood();
            direction = "right";
            gameSpeedDelay = 200;
            updateScore();
        },3100)
    },0);
    
    
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3,"0");
}

function stopGame() {
    clearInterval(gameInterval);
    setTimeout(() =>{
        blinkSnake()
        setTimeout(() =>{
            console.log("pass blink")
            board.innerHTML = "";
            gameStarted = false;
            instructionText.style.display = "block";
            logo.style.display = "block";
        },3000);
    },0);
    
    
}

function updateHighScore() {
    const currentScore = snake.length -1;
    if(currentScore > highScore){
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3,"0");
    }
    highScoreText.style.display = "block";
}

function blinkSnake() {
    setTimeout(() =>{
        board.innerHTML = "";
        console.log(direction);
        setTimeout(() =>{
            drawSnake()
            // console.log("2");
            setTimeout(() =>{
                board.innerHTML = "";
                // console.log("3");
                setTimeout(() =>{
                    drawSnake();
                    // console.log("4");
                    setTimeout(() =>{
                        board.innerHTML = "";
                        // console.log("5");
                        setTimeout(() =>{
                            drawSnake();
                            console.log("6");
                        },500);
                    },500);
                },500);
            },500);
        },500);
    },0);
}
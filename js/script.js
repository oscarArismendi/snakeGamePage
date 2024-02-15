//html elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");

//global variables
let gridSize = 20;
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

let snake = [{
    x:10,
    y:10
}];

let food = generateFood();

function draw() { //draw the map, the snake and the food
    board.innerHTML = "";
    drawSnake();
    drawFood();
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
    const foodElement = createGameElement("div","food")
    setPosition(foodElement,food);
    board.appendChild(foodElement);
}

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) +1;
    const y = Math.floor(Math.random() * gridSize) +1;
    return {x,y};
}

function move() {
    const head = {...snake[0]};//ensure that we create a new object and the snake doesn't modify
    switch(direction) {
        case "right":
            head.x++;
            break;
        case "left":
            head.x--;
            break;
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
    }

    snake.unshift(head);//add the new head of the snake to the beginning of the array
    if(head.x === food.x && head.y === food.y){
        food = generateFood();
        // increaseSpeed();
        clearInterval(gameInterval);// clear past inveterval
        gameInterval = setInterval(() =>{
            move();
            // checkCollision();
            draw();
        },gameSpeedDelay);
    } else{
        snake.pop();//remove the tail of the snake from the end of the array
    }
}

function startGame() {
    gameStart = true;//keeo track of a running game
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(() =>{
        move();
        // checkCollision();
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
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

document.addEventListener("keydown",handleKeyPress)

function increaseSpeed() {
    console.log(gameSpeedDelay)
}
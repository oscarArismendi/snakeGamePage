//html elements
const board = document.getElementById("game-board");

//global variables
let gridSize = 20;

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

//50
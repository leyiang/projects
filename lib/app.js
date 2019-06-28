let snake;
let rez = 20;
let food;

function setup() {
    createCanvas(400, 400);
    snake = new Snake();
    snake.init();

    frameRate(10);
    foodLocation();
}

function foodLocation() {
    let w = floor(width/rez);
    let h = floor(height/rez);
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);
}

function draw() {
    scale(rez);
    background(240);
    snake.show();
    snake.update();

    if( snake.eat(food) ) {
        foodLocation();
    }

    if( snake.endGame() ) {
        background(200, 0, 0);
        noLoop();

    }

    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);
}

function keyPressed() {
    if(keyCode == RIGHT_ARROW) {
        snake.setDir(1, 0);
    } else if (keyCode == LEFT_ARROW) {
        snake.setDir(-1, 0);
    } else if (keyCode == UP_ARROW) {
        snake.setDir(0, -1);
    } else if (keyCode == DOWN_ARROW) {
        snake.setDir(0, 1);        
    }
}
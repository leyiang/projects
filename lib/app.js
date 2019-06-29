let snake;
let food;
let rez = 20;
let pause = false;
let difficulty = 10;

function setup() {
    createCanvas(600, 600);

    food = new Food();
    food.randomLocation();

    snake = new Snake(rez);
    frameRate(difficulty);
}

function draw() {
    scale(20);
    background(240);

    // Snake part
    snake.show();

    // Food part
    food.show();

    // Check event
    if( snake.eat(food.obj) ) {
        snake.grow();
        food.randomLocation();
    }

    if( pause ) {
        background(0, 0, 0, 80);
    }

    if( snake.hitsEdges(rez) ) {
        background(200, 0, 0);
        noLoop();
    }

    // Update snake
    snake.update();

    if( snake.endGame(rez) ) {
        background(200, 0, 0);
        noLoop();
    }

}

function keyPressed() {
    switch(keyCode) {
        case LEFT_ARROW:
            if(snake.xdir == 1 && snake.body.length != 1){
                break;
            }
            snake.setDir(-1, 0);
        break;

        case RIGHT_ARROW:
            if(snake.xdir == -1 && snake.body.length != 1){
                break;
            }
            snake.setDir(1, 0);
        break;
        
        case UP_ARROW:
            if(snake.ydir == 1 && snake.body.length != 1){
                break;
            }
            snake.setDir(0, -1);
        break;
        
        case DOWN_ARROW:
            if(snake.ydir == -1 && snake.body.length != 1){
                break;
            }
            snake.setDir(0, 1);
        break;

        case 32:
            pauseGame();
        break;
    }
}

function pauseGame() {
    if(pause) {
        loop();
        pause = false;
    } else {
        noLoop();
        pause = true;
    }
}
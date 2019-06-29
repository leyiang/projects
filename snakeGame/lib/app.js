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
    init();

    
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
        document.getElementsByClassName("score")[0].innerHTML = snake.body.length; 
        food.randomLocation();
    }

    if( pause ) {
        background(0, 0, 0, 80);
    }

    if( snake.hitsEdges(rez) ) {
        background(200, 0, 0, 100);
        noLoop();
    }

    // Update snake
    snake.update();

    if( snake.endGame(rez) ) {
        background(200, 0, 0, 100);
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

function changeDifficulty() {
    var diffValue = document.getElementsByClassName("difficulty")[0].value;
    setCookie("difficulty", diffValue, 1);

    location.reload();
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function init() {
    
    let res = parseInt( getCookie("difficulty") );
    difficulty = isNaN(res) ? 10 : res;
    document.getElementsByClassName("difficulty")[0].value = difficulty;
    document.getElementsByClassName("level")[0].innerHTML = difficulty;

    document.getElementsByClassName("score")[0].innerHTML = snake.body.length; 
}
let bird;

function setup() {
    createCanvas(400, 600);
    bird = new Bird();
}

function draw() {
    background(230);
    bird.show();
    bird.update();

    console.log(bird.velocity);
}

function keyPressed() {
    if( keyCode == 32) {
        bird.up();
    }
}
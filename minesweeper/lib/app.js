// essential configuration
let cellSize = 60;
let canvasSize = 600;
let cellPerRow = Math.floor( canvasSize / cellSize );

// instances
let grid;

function setup() {
    createCanvas(canvasSize, canvasSize);
    grid = new Grid(cellSize, canvasSize, cellPerRow);

}

function draw() {
    background(230);

    grid.show();
    
    if( grid.over ) {
        background(200, 0, 0, 100);
        noLoop();
    }
}

function mousePressed() {
    grid.isCellClicked( mouseX, mouseY );


}
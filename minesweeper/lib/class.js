function create2DArray(rows, cols) {
    let arr = new Array(rows);
    for( let i = 0; i < rows; i ++ ) {
        arr[i] = new Array(cols);
    }

    return arr;
}

class Grid {
    constructor(cellSize, canvasSize, cellPerRow) {
        this.cellSize = cellSize;
        this.canvasSize = canvasSize;
        this.cellPerRow = cellPerRow;
        this.maxIterate = 10;
        this.already = 0;
        this.over = false;
        
        // Create all the cells
        this.cells = create2DArray(cellPerRow, cellPerRow);

        // initial all the cells
        for( let i = 0; i < cellPerRow; i++ ) {
            for ( let j = 0; j < cellPerRow; j++ ) {
                //                      x, y cellSize
                this.cells[i][j] = new Cell( i, j, cellSize );
            }
        }

        for( let i = 0; i < cellPerRow; i++ ) {
            for ( let j = 0; j < cellPerRow; j++ ) {
                if(!this.cells[i][j].mine)
                    this.cells[i][j].countNeighor(i, j, this.cells);
            }
        }


    }

    // show function
    show() {
        noFill();
        for( let i = 0; i < cellPerRow; i++ ) {
            for ( let j = 0; j < cellPerRow; j++ ) {
                this.cells[i][j].show();
            }
        }
    }

    // cellClicked function
    isCellClicked(x, y) {
        for( let i = 0; i < cellPerRow; i++ ) {
            for ( let j = 0; j < cellPerRow; j++ ) {
                let res = this.cells[i][j].isClicked(x, y);
                if(res) {
                    if( this.cells[i][j].mine ) {
                        this.over = true;

                    } else {
                        this.chainReaction(i, j);
                    }
                    return res;
                }
            }
        }
    }

    // chainReaction
    chainReaction(i, j) {

        if( i-1 >= 0 && i-1 < this.cells.length ) {
            if(!this.cells[i-1][j].mine) {
                this.cells[i-1][j].revealed = true;
            }
        }
        if( i+1 >= 0 && i+1 < this.cells.length ) {
            if(!this.cells[i+1][j].mine) {
                this.cells[i+1][j].revealed = true;
            }
        }
        if( j-1 >= 0 && j-1 < this.cells.length ) {
            if( !this.cells[i][j-1].mine ) {
                this.cells[i][j-1].revealed = true; 
            }
        }
        if( j+1 >= 0 && j+1 < this.cells.length ) {
            if( !this.cells[i][j+1].mine ) {
                this.cells[i][j+1].revealed = true;     
            }
        }        
    }

}

class Cell {
    constructor( x, y, cellSize ) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;

        // functional variables
        this.mine = random(1) < .5 ? true : false;
        this.revealed = false;
        if(!this.mine) this.neighorMineNumber = 0;
        
    }

    show() {
        // basic show
        let realX = this.x * this.cellSize;
        let realY = this.y * this.cellSize;
        let halfSize = this.cellSize / 2;

        noFill();
        rect(realX, realY, this.cellSize, this.cellSize);

        // functional show
        if( this.revealed ) {
            // lighter background indicates this is opened
            fill(240);
            rect(realX, realY, this.cellSize, this.cellSize);

            if( this.mine ) {
                fill(0, 0, 0, 20);
                ellipse(realX + halfSize, realY + halfSize, halfSize, halfSize);
            } else {
                textSize(20);
                textAlign(CENTER, CENTER);
                fill(0);
                text( this.neighorMineNumber, realX+halfSize, realY+halfSize);
            }
        }
    }

    isClicked(x, y) {
        let realX = this.x * this.cellSize;
        let realY = this.y * this.cellSize;

        if ( x >= realX && x <= realX + this.cellSize &&
             y >= realY && y <= realY + this.cellSize) {

            this.revealed = true;
            return true;
        }
    }

    countNeighor(i, j, cells) {
        for( let x = i-1; x <= i+1; x++ ) {
            for( let y = j-1; y <= j+1; y++) {
                if( x >= 0 && x < cells.length &&
                    y >= 0 && y < cells.length)
                this.neighorMineNumber += Number( cells[x][y].mine );
            }
        }
    }
}
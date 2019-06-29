class Snake {
    constructor() {

        // Create snake body
        this.body = [];
        this.body[0] = createVector(10, 10);

        // Snake's direction attr
        this.xdir = 0;
        this.ydir = 0;
    }

    show() {
        noStroke();
        fill(96, 169, 166);
        for (let i = 0; i < this.body.length; i++) {
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }
    }

    update() {
        let head = this.body[this.body.length - 1].copy();
        this.body.shift();
        head.x += this.xdir;
        head.y += this.ydir;

        this.body.push( head );
    }

    setDir(x, y) {
        this.xdir = x;
        this.ydir = y;
    }

    eat(food) {
        let head = this.body[this.body.length - 1].copy();
        return head.x == food.x && head.y == food.y;
    }

    grow() {
        let head = this.body[this.body.length - 1].copy();
        this.body.push(head);
    }

    hitsEdges(rez) {
        let head = this.body[this.body.length - 1].copy();

        if( head.x == -1 || head.y == -1 || head.x == width/rez  || head.y == height/rez) {
            return true;
        }
        return false;
    }  

    endGame() {
        let head = this.body[this.body.length - 1].copy();

        for(let i = 0; i < this.body.length - 1; i++) {
            if( head.x == this.body[i].x && head.y == this.body[i].y) {
                return true;
            }
        }
        return false;
    }  

}

class Food {
    constructor(rez) {
        this.obj = createVector(0, 0);
        this.rez = rez;
    }

    randomLocation() {
        let w = width / rez;
        let h = height / rez;

        this.obj.x = floor( random(w) );
        this.obj.y = floor( random(h) );
    }

    show() {
        fill(200, 0, 0);
        rect(this.obj.x, this.obj.y, 1, 1);
    }
}
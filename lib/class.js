class Snake {
    constructor() {
        this.len = 1;
        this.body = [];
        this.body[0] = createVector(0, 0);

        this.xdir = 1;
        this.ydir = 0;

        this.width = 1;
        this.height = 1;
    }

    update() {
        let head = this.body[this.body.length-1].copy();
        this.body.shift();
        head.x += this.xdir;
        head.y += this.ydir;
        this.body.push(head);
        // this.body[0].x += this.xdir;
        // this.body[0].y += this.ydir;
    }

    show() {
        for(let i = 0; i < this.body.length; i++) {
            noStroke();
            fill(96, 169, 166);
            rect(this.body[i].x, this.body[i].y, this.width, this.height);
        }
        
    }

    setDir(x, y) {
        this.xdir = x;
        this.ydir = y;
    }

    grow() {
        let head = this.body[this.body.length-1].copy();
        this.len++;
        this.body.push(head);
    }

    eat(pos) {
        // let x = this.body[0].x;
        // let y = this.body[0].y;
        let head = this.body[this.body.length-1].copy();

        if(head.x == pos.x && head.y == pos.y) {
            this.grow();
            return true;
        }
        return false;
    }
}
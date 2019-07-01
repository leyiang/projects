class Bird {
    constructor() {
        this.x = 64;
        this.y = height/2;
        this.r = 32;

        this.gravity = .8;
        this.velocity = 0;
    }

    show() {
        noStroke();
        fill(100);
        ellipse(this.x, this.y, this.r, this.r);
    }

    update() {

        console.log("Updating... " + this.gravity +" ");
        this.velocity += this.gravity;
        this.y += this.velocity;

        if(this.y >= height) {
            this.velocity = 0;
            this.gravity = 0;
        } else {
            this.gravity = .8;
        }


    }

    up() {
        this.velocity += -15;
    }
}
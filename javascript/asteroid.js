function Asteroid(x, y) {
    if (  (typeof x !== 'undefined') && (typeof y !== 'undefined')  ) {
        this.pos = createVector(x, y);
    } else {
        this.pos = createVector(random(-(world_Width / 2), world_Width / 2), -world_Height / 2);
    }

    this.health = 100;

    this.vel = createVector(0, 1);

    this.scale = floor(random(100, 100 * 2));

    this.update = function () {
        this.pos.add(this.vel);
    };

    this.totaledges = floor(random(5, 15));
    this.offset = [];
    for (var i = 0; i < this.totaledges; i++) {
        this.offset[i] = random(-this.scale * 0.1, this.scale * 0.1); //        this.offset[i] = random(-this.scale * 0.1, this.scale * 0.3);

    }

    this.takeDamage = function (damage) {
        this.scale -= damage;
        if (this.scale < 10) {
            return true;
        } else {
            return false;
        }
    };


    this.render = function () {
        push();
        translate(this.pos.x, this.pos.y);
        {
            // first ship


            fill(0);

            stroke(255);
            beginShape();
            for (var i = 0; i < this.totaledges; i++) {
                var angle = map(i, 0, this.totaledges, 0, TWO_PI);
                var a = this.offset[i] + this.scale / 2;
                var x = a * cos(angle);
                var y = a * sin(angle);
                vertex(x, y);
            }
            endShape(CLOSE);

            // stroke("red");
            // noFill();
            // ellipse(0, 0, this.scale, this.scale);
        } // first ship
        pop();
    };

    this.edges = function () {
        if (this.pos.y > world_Height / 2) {
            return true;
        } else {
            return false;
        }
    };
}


/*

this.edges = function() {
};

*/
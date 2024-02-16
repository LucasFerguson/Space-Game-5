function HealthPack() {
    this.name = "Health";

    this.pos = createVector(0, 0);
    this.pos = createVector(random(-(world_Width / 2), world_Width / 2), -world_Height / 2);
    this.vel = createVector(0, 1);
    this.acc = createVector(0, 0);

    this.scale = 15;

    this.heal = 100;

    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    };

    this.render = function () {
        push();
        fill(50, 50, 255);
        ellipse(this.pos.x, this.pos.y, this.scale, this.scale);
        pop();
    };

    this.edges = function() {

        if (this.pos.x > world_Width / 2 ) {
            return true;
        } else if (this.pos.x < -(world_Width / 2 )) {
            return false;
        }

        if (this.pos.y > world_Height / 2 ) {
            return true;
        } else if (this.pos.y < -(world_Height / 2 )) {
            return false;
        }

    };
}

function DoubleHealth() {
    this.name = "DoubleHealth";

    this.pos = createVector(0, 0);
    this.pos = createVector(random(-(world_Width / 2), world_Width / 2), -world_Height / 2);
    this.vel = createVector(0, 1);
    this.acc = createVector(0, 0);

    this.scale = 12;

    this.heal = 2;

    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    };

    this.render = function () {
        push();
        stroke(0, 255, 0);
        fill(0, 0, 255);
        strokeWeight(3);
        ellipse(this.pos.x, this.pos.y, this.scale, this.scale);
        pop();
    };

    this.edges = function() {

        if (this.pos.x > world_Width / 2 ) {
            return true;
        } else if (this.pos.x < -(world_Width / 2 )) {
            return false;
        }

        if (this.pos.y > world_Height / 2 ) {
            return true;
        } else if (this.pos.y < -(world_Height / 2 )) {
            return false;
        }

    };
}
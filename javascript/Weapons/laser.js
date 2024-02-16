function Laser(shipPos, vel) {
    this.name = "Laser";
    this.time = 0;

    this.pos = createVector(shipPos.x, shipPos.y);
    this.vel = vel;

    this.scale = 10;

    this.damage = 10;

    this.update = function () {
        this.time++;
        this.pos.add(this.vel);
    };

    this.render = function (fill) {
        push();
        translate(this.pos.x, this.pos.y);
        {
            stroke(fill);
            strokeWeight(5);
            //point(0, 0);

            line(0, 0, -this.vel.x * 2, -this.vel.y * 2);
        }
        pop();
    };

    this.hits = function (object) {
        if (this.time > 10) {
            var d = dist(this.pos.x, this.pos.y, object.pos.x, object.pos.y);
            if (d < object.scale / 2 + this.scale) {
                explosions.push(new explosion(this.pos, this.vel, 5));
                return true;
            } else {
                return false;
            }
        }

    };

    this.edges = function () {
        if (this.pos.y < -(world_Height / 2) || this.pos.y > (world_Height / 2)) {
            return true;
        } else {
            return false;
        }
    }

}

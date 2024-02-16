function Beam(shipPos) {
    this.name = "Beam";
    this.time = 0;

    this.pos = createVector(shipPos.x, shipPos.y);

    this.vel = 0;

    this.damage = 20;

    this.lifeSpan = 5;

    this.update = function () {
        this.time++;
        this.lifeSpan--;
    };

    this.render = function (fill) {
        push();
        //translate(this.pos.x, this.pos.y);
        {
            stroke(fill);
            strokeWeight(5);
            line(shipPos.x, shipPos.y, this.pos.x, -(world_Height / 2));
            //point(this.pos.x, this.pos.y);
        }
        pop();
    };

    this.hits = function (asteroid) {

        this.pos.y = shipPos.y;

        var hit = false;

        while (this.pos.y > -(world_Height / 2)) {
            this.pos.y -= 1;
            var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
            if (d < asteroid.scale / 2 + 10) {
                hit = true;
                // explosions.push(new explosion(this.pos, this.vel, 5));
                break;
            } else {
                hit = false;
            }
        }

        return hit;

        this.pos.y = shipPos.y;


    };


    this.edges = function () {
        //if (this.lifeSpan < 0) {
        return true;
        //}
    }

}


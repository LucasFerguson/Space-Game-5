function EnemyBasic() {
    this.pos = createVector(0, 0);
    this.pos = createVector(random(-(world_Width / 2), world_Width / 2), -world_Height / 2);
    this.vel = createVector(0, 1);
    this.acc = createVector(0, 0);

    this.scale = 15;

    this.rechargeLasor = 0;

    this.health = 100;
    this.maxHealth = 100;


    this.update = function () {

        this.vel.add(this.acc);
        this.pos.add(this.vel);
    };


    this.lasorFire = function (target) {

        if (this.rechargeLasor > 100 ) {
            enemielasers.push(new Laser(this.pos, createVector(0, 4)     ));
            this.rechargeLasor = 0;
        }
        this.rechargeLasor++;
        //console.log(fire);
    };


    this.render = function () {
        push();
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.scale, this.scale);
        //text("x " + this.pos.x + "  y " + this.pos.y, this.pos.x, this.pos.y);
        text("health " + this.health, this.pos.x - 10, this.pos.y + 20);
        
        stroke(255, 0, 0);
        line(this.pos.x, this.pos.y - 20, this.pos.x + this.maxHealth, this.pos.y- 20);
        stroke(0, 255, 0);
        line(this.pos.x, this.pos.y - 20, this.pos.x + this.health, this.pos.y- 20);
        pop();
    };

    // this.hits = function (asteroid) {
    //     var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    //     if (d < (asteroid.scale) / 2) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    this.takeDamage = function (damage) {
        this.health -= damage;
        if (this.health <= 0) {
            explosions.push(new explosion(this.pos, this.vel, 5));
            return true;
        } else {
            return false;
        }
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
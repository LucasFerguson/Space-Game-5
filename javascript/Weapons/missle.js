function Missle(shipPos, shipVel, targetA) {
    this.name = "Missle";
    this.time = 0;

    this.pos = createVector(shipPos.x, shipPos.y);

    this.vel = createVector(0, 0);
    this.vel = createVector(shipVel.x, shipVel.y);

    this.acc = createVector(0, 0);

    this.scale = 10;

    this.damage = 100;

    this.update = function () {
        this.time++;
        //this.pos.x = lerp(-this.pos.x, asteroids[0].pos.x, -0.05);
        //this.pos.y = lerp(-this.pos.y, asteroids[0].pos.y + 35, -0.05);
        if (targetA == "enemy") {
            if (enemies.length > 0) {
                var shortest = 0;
                var newD;
                var shortestD;
                for (var n = 0; n < enemies.length; n++) {
                    newD = dist(this.pos.x, this.pos.y, enemies[n].pos.x, enemies[n].pos.y)
                    shortestD = dist(this.pos.x, this.pos.y, enemies[shortest].pos.x, enemies[shortest].pos.y)

                    if (newD < shortestD) {
                        shortest = n;
                    }
                }

                for (var n = 0; n < enemies.length; n++) {
                    newD = dist(this.pos.x, this.pos.y, enemies[n].pos.x, enemies[n].pos.y)
                    shortestD = dist(this.pos.x, this.pos.y, enemies[shortest].pos.x, enemies[shortest].pos.y)

                    if (newD < shortestD) {
                        shortest = n;
                    }
                }

                var target = createVector(enemies[shortest].pos.x, enemies[shortest].pos.y);
            } else {
                var target = createVector(0, 0);
            }

        } else if (targetA == "player") {
            var target = createVector(player.pos.x, player.pos.y);
        } else {
            var target = createVector(0, 0);
        }

        target.sub(this.pos);
        target.setMag(0.1);
        this.acc = target;

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.vel.mult(0.99);
    };

    this.render = function (fill) {
        push();
        translate(this.pos.x, this.pos.y);
        {
            stroke(fill);
            strokeWeight(6);
            //point(0, 0);

            //line(0, 0, this.vel.x * 4, this.vel.y * 4);
            line(0, 0, -this.vel.x * 2, -this.vel.y * 2);

        }
        pop();
    };

    this.hits = function (asteroid) {
        if (this.time > 20) {

            var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
            if (d < asteroid.scale / 2 + 10) {
                explosions.push(new explosion(this.pos, this.vel, 10));

                let da = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y);
                // map(value, start1, stop1, start2, stop2, [withinBounds])
                let v = map(da, 1000, 0, 0, 0.04)

                // let news = explosionSound;
                
                if (v < 0) {
                    v = 0;
                }

                explosionSound.setVolume(v);
                explosionSound.play();
                return true;
            } else {
                return false;
            }
        }
    };


    this.edges = function () {
        if (this.pos.y < -(world_Height / 2)) {
            return true;
        } else {
            return false;
        }
    }

}


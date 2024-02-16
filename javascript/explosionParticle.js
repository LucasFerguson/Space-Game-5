//explosion particle
function particle(pos, vel) {
    this.time = 0;

    this.pos = createVector(pos.x, pos.y);

    this.vel = vel;

    this.scale = 10;

    this.update = function () {
        this.time++;

        this.scale -= 0.1;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    this.render = function () {
        push();
        translate(this.pos.x, this.pos.y);
        {
            stroke("red");
            strokeWeight(this.scale);
            point(0, 0);

            //line(0, 0, this.vel.x * 4, this.vel.y * 4);
            //line(0, 0, -this.vel.x * 2, -this.vel.y * 2);

        }
        pop();
    }

}

function explosion(pos, vel, numberOfParticles) {
    this.particles = [];

    for (var i = 0; i < numberOfParticles; i++) {
        var vecR = p5.Vector.fromAngle(radians(random(0, 360)));
        vel.mult(random(0.2,0.4));
        vecR.add(vel);
        this.particles[i] = new particle(pos, vecR);
    }

    this.update = function () {
        for (var i = 0; this.particles.length > i; i++) {
            this.particles[i].update();
            this.particles[i].render();

            if ( this.particles[i].time > 100 ) {
                this.particles.splice(i, 1);
            }
        }

    }


    // this.render = function () {

    // }

}
function Player2D() {
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.acc = createVector(99, 99);

    this.maxVel = 5;

    this.lives = 1;
    this.health = 500;
    this.startHealth = 500;
    this.maxHealth = 800;

    this.invulnerable = true;
    this.invulnerableTime = 0;

    this.width = 20;
    this.height = 20;

    this.scale = 20;

    this.lasers = [];
    this.rechargeLasor = 0;
    this.rechargeMissle = 0;
    this.rechargeBeam = 0;


    this.keybindingMode = 1;
    this.keybindings = [
        {
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            shoot: 16
        }, {
            up: 87,
            down: 83,
            left: 65,
            right: 68,
            shoot: 71,
            shoot2: 72,
            shoot3: 74
        }
    ];

    this.update = function () {
        //this.pos.x = lerp(-this.pos.x, asteroids[0].pos.x, -0.05);
        //this.pos.y = lerp(-this.pos.y, asteroids[0].pos.y + 35, -0.05);
        if (this.invulnerable) {
            this.invulnerableTime++;
        }

        if (this.invulnerableTime >= 200) {
            this.invulnerable = false;
            this.invulnerableTime = 0;
        }

        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }

        // this.health += 1009909099999;

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        if (Math.abs(this.vel.x) > 0.1 || Math.abs(this.vel.y) > 0.1) {
            this.vel.mult(0.99);
        } else {
            this.vel.mult(0);
        }

        if (this.vel.x > this.maxVel) {
            this.vel.x = this.maxVel;
        }

        if (this.vel.x < -this.maxVel) {
            this.vel.x = -this.maxVel;
        }

        if (this.vel.y > this.maxVel) {
            this.vel.y = this.maxVel;
        }

        if (this.vel.y < -this.maxVel) {
            this.vel.y = -this.maxVel;
        }

    };


    this.lasorFire = function () {
        if (!keyIsDown(this.keybindings[this.keybindingMode].shoot)) {
            this.rechargeLasor += 50;
        }

        if (this.rechargeLasor > 7 && keyIsDown(this.keybindings[this.keybindingMode].shoot)) {
            this.lasers.push(new Laser(this.pos, createVector(0, -8)));
            this.rechargeLasor = 0;
            lasorSound.play();
        }
        this.rechargeLasor++;
        //console.log(fire);
    };

    this.missleFire = function () {
        if (!keyIsDown(this.keybindings[this.keybindingMode].shoot2)) {
            this.rechargeMissle += 50;
        }

        if (this.rechargeMissle > 25 && keyIsDown(this.keybindings[this.keybindingMode].shoot2)) {
            this.lasers.push(new Missle(createVector(this.pos.x, this.pos.y), this.vel, "enemy"));
            this.rechargeMissle = 0;
            // lasorSound.play();
        }
        this.rechargeMissle++;
        //console.log(fire);
    };

    this.beamFire = function () {
        if (!keyIsDown(this.keybindings[this.keybindingMode].shoot3)) {
            this.rechargeBeam += 10000;
        }

        if (this.rechargeBeam > 10 && keyIsDown(this.keybindings[this.keybindingMode].shoot3)) {
            this.lasers.push(new Beam(createVector(this.pos.x, this.pos.y)));
            this.rechargeBeam = 0;
            lasorSound.play();
        }
        this.rechargeBeam++;
        //console.log(fire);
    };


    this.render = function () {
        push();
        // noFill();
        stroke(100, 100, 255);
        fill(0, 0, 255);

        // strokeWeight(4);
        if (this.invulnerable) {
            stroke(255, 255, 255);
            fill(255, 255, 255, this.invulnerableTime);
            ellipse(this.pos.x, this.pos.y, this.width, this.height);
        } else {
            ellipse(this.pos.x, this.pos.y, this.width, this.height);
        }

        stroke(20, 20, 255);
        fill(20, 20, 255);
        // text("x " + this.pos.x + "  y " + this.pos.y, this.pos.x, this.pos.y - 30);

        text("Health " + this.health, this.pos.x, this.pos.y - 30);

        stroke(50, 50, 50);
        line(this.pos.x, this.pos.y - 20, this.pos.x + (this.maxHealth / 2), this.pos.y - 20);
        stroke(0, 255, 0);

        // var healthRows = this.health / 200;

        // for (var i = 1; i <= healthRows; i++) {
        //     line(this.pos.x, (this.pos.y - 20) + (i * 2), this.pos.x + 200, (this.pos.y - 20) + (i * 2));
        // }

        // line(this.pos.x, (this.pos.y - 20) + healthRows * 2, ((200 * healthRows) - this.health) + this.pos.x , (this.pos.y - 20) + healthRows * 2);

        line(this.pos.x, (this.pos.y - 20), this.pos.x + (this.health / 2), (this.pos.y - 20));

        pop();
    };

    this.hits = function (asteroid) {

        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < (asteroid.scale / 2) + (this.scale / 2)) {
            let v2 = asteroid.pos.copy();
            let v1 = this.pos.copy();

            let v3 = p5.Vector.sub(v1, v2);

            v3.setMag(1);

            this.vel.add(v3);

            return true;
        } else {
            return false;
        }



        // if (this.health <= 0) {
        //     return true;
        // } else {
        //     return false;
        // }

    };

    this.takeDamage = function (damage) {

        if (!this.invulnerable) {

            if (damage == "1/2") {
                this.health -= Math.round(this.health / 2) + 1;

            } else {
                this.health -= damage;
            }

            if (this.health <= 0) {
                this.invulnerable = true;
                return true;
            } else {
                return false;
            }
        }



    }

    this.movementControls = function () {

        if (keyIsDown(this.keybindings[this.keybindingMode].left)) {
            this.acc.x = -0.5;
        }
        if (keyIsDown(this.keybindings[this.keybindingMode].right)) {
            this.acc.x = 0.5;
        }
        if (!keyIsDown(this.keybindings[this.keybindingMode].right) && !keyIsDown(this.keybindings[this.keybindingMode].left)) {
            this.acc.x = 0;
        }

        if (keyIsDown(this.keybindings[this.keybindingMode].up)) {
            this.acc.y = -0.5;
        }
        if (keyIsDown(this.keybindings[this.keybindingMode].down)) {
            this.acc.y = 0.5;
        }
        if (!keyIsDown(this.keybindings[this.keybindingMode].up) && !keyIsDown(this.keybindings[this.keybindingMode].down)) {
            this.acc.y = 0;
        }
    };

    this.edges = function () {

        if (this.pos.x > world_Width / 2) {
            this.vel.x = -5;
        } else if (this.pos.x < -(world_Width / 2)) {
            this.vel.x = 5;
        }

        if (this.pos.y > world_Height / 2) {
            this.vel.y = -5;
        } else if (this.pos.y < -(world_Height / 2)) {
            this.vel.y = 5;
        }

    };




}
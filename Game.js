function runMainGame() {

    background(0, 0, 0);
    translate(width / 2, height / 2);

    //translate(-player.pos.x, -player.pos.y);

    mywindow.x = player.pos.x;
    mywindow.y = player.pos.y;

    translate(-mywindow.x, -mywindow.y);
    //menu.render();

    DrawGrid();
    DrawStarField();

    if (player.lives == 0) {
        gameManager.run("GameOver")
    }

    //player2.movementControls();
    //player2.render();

    // console.log(Math.round(frameCount/ 100));
    if (genRateM >= 800) {
        powerUps.push(new HealthPack());
        powerUps.push(new HealthPack());
        powerUps.push(new DoubleHealth());
        genRateM = 0;
    }
    genRateM++;
    var genRateBSub = Math.round(frameCount * (1 / 100)  );
    if (genRateBSub > 410) {genRateBSub = 410}
    if (genRateB >= 500 - genRateBSub ) {
        enemies.push(new EnemyMissle());
        genRateB = 0;
    }
    genRateB++;

    if (genRateA >= 120) {
        enemies.push(new EnemyBasic());
        asteroids.push(new Asteroid());
        asteroids.push(new Asteroid());
        genRateA = 0;
    }
    genRateA++;

    for (var i = powerUps.length - 1; i >= 0; i--) {
        powerUps[i].update();
        powerUps[i].render();

        var destroyPower = false;
        if (player.hits(powerUps[i])) {
            if (powerUps[i].name == "Health") {
                player.health += powerUps[i].heal;
                score += 10;
            }

            if (powerUps[i].name == "DoubleHealth") {
                player.health *= powerUps[i].heal;
                score += 10;
            }
            destroyPower = true
        }

        if (powerUps[i].edges() || destroyPower) {
            powerUps.splice(i, 1);
        }
    }

    for (var i = player.lasers.length - 1; i >= 0; i--) {
        var destroy = false;
        player.lasers[i].update();
        player.lasers[i].render("blue");

        for (var j = asteroids.length - 1; j >= 0; j--) {
            if (player.lasers[i].hits(asteroids[j])) {
                //var newAsteroids = asteroids[j].breakup();
                //asteroids = asteroids.concat(newAsteroids);
                //score += 100;

                //asteroids.splice(j, 1);
                if (asteroids[j].takeDamage(10)) {
                    asteroids.splice(j, 1);
                }
                score += 10;

                destroy = true;
                //break;
            }
        }

        for (var j = enemies.length - 1; j >= 0; j--) {
            if (player.lasers[i].hits(enemies[j])) {


                if (enemies[j].takeDamage(player.lasers[i].damage)) {
                    enemies.splice(j, 1);
                    score += 100;
                }

                score += 20;

                destroy = true;
                //break;
            }
        }

        if (destroy || player.lasers[i].edges()) {
            player.lasers.splice(i, 1);
        }
    }


    for (var i = 0; i < asteroids.length; i++) {

        asteroids[i].update();
        asteroids[i].render();

        if (asteroids[i].edges()) {
            asteroids.splice(i, 1);
        }

        if (player.hits(asteroids[i])) {
            if (!player.invulnerable) {

                score += 10;
                asteroids[i].takeDamage(10);

                if (player.takeDamage(20, asteroids[i].pos)) {
                    reset();
                }
                break;
            }
        }

    }

    for (var a = enemies.length - 1; a >= 0; a--) {
        enemies[a].update();
        enemies[a].render();

        enemies[a].lasorFire();

        var enemieDestroy = false;
        if (player.hits(enemies[a])) {
            score += 10;
            if (player.takeDamage(10)) {
                reset();
            }

            if (enemies[a].takeDamage(10)) {
                enemieDestroy = true;
            }
        }

        if (enemies[a].edges() || enemieDestroy) {
            enemies.splice(a, 1);
        }

    }

    // enemielasers updateing //
    var destroylaser = false;

    for (var b = enemielasers.length - 1; b >= 0; b--) {
        enemielasers[b].update();

        if (enemielasers[b].name == "Missle") {
            enemielasers[b].render("red");
        } else {
            enemielasers[b].render("red");
        }

        destroylaser = false;

        if (enemielasers[b].hits(player)) { // if (player.hits(enemielasers[b])) {
            destroylaser = true;
            if (player.takeDamage(enemielasers[b].damage )) {
                reset();
                break;
            }
        }

        for (var j = enemies.length - 1; j >= 0; j--) {
            if (enemielasers[b].hits(enemies[j])) {

                if (enemies[j].takeDamage(10)) {
                    enemies.splice(j, 1);
                }

                destroylaser = true;
                break;
            }
        }

        for (var j = asteroids.length - 1; j >= 0; j--) {
            if (enemielasers[b].hits(asteroids[j])) {

                if (asteroids[j].takeDamage(10)) {
                    asteroids.splice(j, 1);
                }

                destroylaser = true;
                //break;
            }
        }

        if (enemielasers[b].edges()) {
            destroylaser = true;
        }

        if (destroylaser) {
            enemielasers.splice(b, 1);
        }
    }

    for (var b = explosions.length - 1; b >= 0; b--) {
        explosions[b].update();
        if (this.explosions[b].particles.length < 1) {
            this.explosions.splice(b, 1);
        }
    }

    player.movementControls();
    player.update();
    player.edges();
    player.render();

    player.lasorFire();
    player.missleFire();
    player.beamFire();


    menu.render();
}

var resettime = 0;
function reset() {
    resettime++;

    player.pos = createVector(0, 0);
    player.health = player.startHealth;
    player.lives -= 1;
    //asteroids = [];
    enemielasers = [];
    console.log("you got hit");

    genStar();

    //genAsteroidField();
}


function DrawGrid() {
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    for (var i = -world_Height / 2; i <= world_Height / 2; i += 500) {
        line(-world_Width / 2, i, world_Width / 2, i);
    }
    for (var i = -world_Width / 2; i <= world_Width / 2; i += 500) {
        line(i, -world_Height / 2, i, world_Height / 2);
    }
    pop();
}





function genAsteroidField() {
    for (var i = 0; i < 40; i++) {
        var x = random(-world_Width / 2, world_Width / 2);
        var y = random(-world_Height / 2, world_Height / 2);
        asteroids.push(new Asteroid(x, y));
    }

}

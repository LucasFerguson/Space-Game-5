
function Star(pos, size) {

    //this.constructor = function () {

    this.pos = createVector(0, 0);
    this.pos = pos;

    this.apos = this.pos.copy();


    this.scale = createVector(size, size);
    this.move = map(size, 1, 4, 1, 0.90);
    // map(value, start1, stop1, start2, stop2, [withinBounds])


    this.update = function () {
        this.pos.x = this.apos.x + (mywindow.x * this.move);
        this.pos.y = this.apos.y + (mywindow.y * this.move);

    }

    this.render = function () {
        if (Math.abs(this.pos.x) < world_Width / 2 && Math.abs(this.pos.y) < world_Height / 2) {
            push();
            fill(255);
            noStroke();
            ellipse(this.pos.x, this.pos.y, this.scale.x / 10, this.scale.y / 10);
            pop();
        }
    }

}

function DrawStarField(scroll) {
    if (scroll) {
        push();
        fill(255);
        noStroke();
        for (var i = 0; i < starField.length; i++) {
            starField[i].update();
            starField[i].apos.y += starField[i].scale.x;
            // starField[i].apos.y += 1;

            ellipse(starField[i].pos.x, starField[i].pos.y, starField[i].scale.x, starField[i].scale.y);

            if (Math.abs(starField[i].apos.y) > windowHeight / 2) {
                starField[i].apos.y = -windowHeight / 2;

                // starField[i].render();
            }

        }
        pop();


    } else {


        push();
        fill(255);
        noStroke();
        for (var i = 0; i < starField.length; i++) {
            starField[i].update();

            if (Math.abs(starField[i].pos.x) < world_Width / 2
                &&
                Math.abs(starField[i].pos.y) < world_Height / 2) {

                ellipse(starField[i].pos.x, starField[i].pos.y, starField[i].scale.x, starField[i].scale.y);
                // starField[i].render();
            }
        }
        pop();
    }
}

function genStar() {
    for (var i = 0; i < 100; i++) {
        var x = random(-world_Width / 4, world_Width / 4);
        var y = random(-world_Height / 4, world_Height / 4);
        // if (i < 700) {
        //     var size = random(10, 40);
        // } else {
        //     var size = random(50, 80);
        // }
        var size = random(1, 4);
        starField[i] = new Star(createVector(x, y), size);
    }
}
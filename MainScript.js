/**
 * MainScript.js
 * 
 * 
 * Tasks
 *  - Adding Game options
 *  - Add Levels
 *  - Add Boss for levels.

Versions:
0.0.8 added sounds
0.0.9 changed game colors to make color blind friendly
0.1.0 Final version for gamebIITes game jam
 
 */

var gameManager;
var gameVersion = "0.1.0  -  Final version for gamebIITes!";
var author = "Lucas Ferguson"

var world_Width;
var world_Height;

var mywindow;
var menu;
var player;
var highScores = [];

var starField = [];
var asteroids = [];
var enemies = [];
var enemielasers = [];
var explosions = [];
var powerUps = [];

var genRateB = 0;
var genRateM = 0;
var genRateA = 0;

var button;
var nameInput;
var submitButton;

var score = 0;


var lasorSound;
var explosionSound;

function preload() {
    // Laser_Shoot1.wav
    // Laser_Shoot2.wav
    // Laser_Shoot3.mp3
    // Laser_Shoot4.mp3
    lasorSound = loadSound("Assets/Sounds/Weapons/Laser_Shoot4.mp3");
    lasorSound.setVolume(0.01);

    // explosionSound1.mp3
    // explosionSound2.mp3
    // explosionSound3.mp3
    explosionSound = loadSound("Assets/Sounds/Explosion/explosionSound3.mp3");
    // explosionSound.setVolume(0.01);
}

function setup() {
    //createCanvas(400, 400);
    createCanvas(windowWidth, windowHeight);
    background(255, 0, 200);

    world_Width = 2000;
    world_Height = 2000;

    mywindow = createVector(0, 0)

    gameManager = new GameManager();

    menu = new menu();
    button = new Button(0, -120, 200, 50);

    nameInput = createInput('');
    nameInput.position(windowWidth / 2 - 100, windowHeight / 2 + 100);
    nameInput.size(200, 20);
    nameInput.hide();

    submitButton = createButton('Submit Score');
    submitButton.position(windowWidth / 2 - 50, windowHeight / 2 + 140);
    submitButton.mousePressed(submitToHighScore);
    submitButton.size(100, 20);
    submitButton.hide();

    player = new Player2D();
    player.keybindingMode = 1;
    player.health = 500;

    powerUps.push(new HealthPack());

    DrawGrid();
    genStar();
    genAsteroidField();
    firebaseSetup();
    frameRate(60);
}


function draw() {

    gameManager.update();

    // gameManager.run("Menu");
    // gameManager.run("Game");

    // gameManager.run("GameOver");
    // gameManager.run("Game");

    // if (gameManager == 1) {
    //     runGame();
    // }
}

class GameManager {
    constructor() {
        this.gameRunning = false;
        this.running = "Menu";
    }

    update() {
        if (this.running == "Game") {
            runMainGame();
        }
        if (this.running == "Menu") {
            runGameMenu();
        }
        if (this.running == "GameOver") {
            runGameOver();
        }
    }

    run(scene) {
        player.lives = 3;
        player.health = 100;
        this.running = scene;
        genStar();
    }


}

function runGameOver() {
    // background(0, 0, 0);
    // translate(width / 2, height / 2);
    // translate(-mywindow.x, -mywindow.y);

    background(0, 0, 0);
    translate(width / 2, height / 2);
    translate(-mywindow.x, -mywindow.y);

    DrawStarField(true);

    push();
    stroke(255, 0, 0);
    fill(255, 0, 0);
    textSize(90);
    textAlign(CENTER);

    text("G A M E O V E R ", 0, -200);

    // if (button.mouseON(mousePos.x, mousePos.y) ) {
    //     fill(255, 255, 255, 100);
    // }


    stroke(255);
    fill(255);
    textSize(50);
    text("Submit your score", 0, -120);
    stroke(0, 255, 0);
    fill(0, 255, 0);
    text("Score : " + score, 0, -50);

    stroke(255);
    fill(255);
    textSize(20);
    text(nametext, 0, 90); // "Name"


    submitButton.position(windowWidth / 2 - 50, windowHeight / 2 + 140);
    nameInput.position(windowWidth / 2 - 100, windowHeight / 2 + 100);

    nameInput.show();
    submitButton.show();

    pop();
}

var nametext = "Enter your Initials";

function submitToHighScore() {
    let firePush = true;
    if (nameInput.value() == "" || nameInput.value() == " ") {
        nametext = "Enter your Initials";
        firePush = false;
    }
    if (nameInput.value().length > 3) {
        firePush = false;
    }

    if (firePush) {
        // send the data to firebase!

        let highScores = database.ref("HighScores");

        // Make an object with data in it
        var data = {
            name: nameInput.value(),
            score: score
        };
        console.log("saving data");
        console.log(data);

        // let firekey = highScores.push(data, finished);
        // console.log("Firebase generated key: " + firekey.key);

        let genkey = highScores.push(data);
        console.log("Firebase generated key: " + genkey.key);

        nameInput.hide();
        submitButton.hide();
        window.location.reload()
        // gameManager.run("Menu");
    }

}

var database;
function firebaseSetup() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBc57Ss4JhTZfOZ8qDdFEp8PlZPvBgTu0U",
        authDomain: "space-game-high-scores.firebaseapp.com",
        databaseURL: "https://space-game-high-scores.firebaseio.com",
        projectId: "space-game-high-scores",
        storageBucket: "space-game-high-scores.appspot.com",
        messagingSenderId: "451957803024",
        appId: "1:451957803024:web:1ca81ca456492998"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();

    var ref = database.ref("HighScores");
    ref.on("value", gotData, errData);


    // highScores.sort((a, b) => (a.score > b.score) ? 1 : -1);



}



function gotData(data) {
    console.log("Loading");

    // highScores = [];
    var scores = data.val();
    var keys = Object.keys(scores);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var name = scores[k].name;
        var score = scores[k].score;
        highScores.push({
            key: k,
            name: name,
            score: score
        });
    }

    highScores.sort((a, b) => (a.score > b.score) ? 1 : -1);
    highScores.reverse();
    console.log(highScores);
}

function errData() {
    console.log("errData");
}





function runGameMenu() {
    background(0, 0, 0);
    translate(width / 2, height / 2);
    translate(-mywindow.x, -mywindow.y);

    DrawStarField(true);

    mousePos = createVector(mouseX - width / 2, mouseY - height / 2)

    if (button.mouseON(mousePos.x, mousePos.y) && mouseIsPressed) {
        gameManager.run("Game");
    }

    push();
    stroke(255);
    fill(255);
    textSize(100);
    textAlign(CENTER);

    text("S P A C E", 0, -200);
    textSize(20);

    text("Use WASD and hold down keys G H J to fire", 0, -170);

    if (button.mouseON(mousePos.x, mousePos.y)) {
        fill(255, 255, 255, 100);
    }

    textSize(50);
    text("P L A Y", 0, -100);


    translate(0, 50);
    stroke(255);
    fill(255);
    textSize(100);
    textSize(30);

    text("High Scores", 0, -60);

    let col1 = -50;
    let col2 = 50;
    let rowH = 22;

    textSize(25);
    textAlign(RIGHT);
    text("Name", col1, -30);
    textAlign(LEFT);
    text("Scores", col2, -30);

    textSize(20);
    if (highScores[0]) {
        var numh = 10;
        if (highScores.length < 10) {
            numh = highScores.length;
        }

        for (var i = 0; i < numh; i++) {
            textAlign(RIGHT);
            text(highScores[i].name, col1, rowH * i);
            textAlign(LEFT);
            text(highScores[i].score, col2, rowH * i);

        }
    }
    translate(0, -50);

    textAlign(CENTER);
    textSize(20);
    text("Created By " + author, 0, (windowHeight / 2) - 60);
    text("Version : " + gameVersion, 0, (windowHeight / 2) - 30);

    // text("Updated: 5/20/2019", 0, (windowHeight/2)-20);
    // text("Lucas Ferguson", 0, (windowHeight/2)-20);

    pop();
}





class Button {
    constructor(x, y, width, height) {

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        //x variable
        this.left = this.x - (this.width / 2);
        this.right = this.x + (this.width / 2);

        //y variable
        this.top = this.y - (this.height / 2);
        this.bottom = this.y + (this.height / 2);

        this.topLeft = { x: this.left, y: this.top };
        this.topRight = { x: this.right, y: this.top };
        this.bottomLeft = { x: this.left, y: this.bottom };
        this.bottomRight = { x: this.right, y: this.bottom };
    }

    render(mx, my) {
        push();
        stroke(0);
        if (this.mouseON(mx, my)) {
            fill(255, 255, 255, 100);
        } else {
            fill(0);
        }
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);

        // fill(0);
        // textSize(25);
        // textAlign(CENTER);
        // text(this.cost + " +" + this.returnGen, this.x, this.y + 20);

        // line(this.left, 0, this.left, height);
        // line(this.right, 0, this.right, height);
        // line(0, this.top, width, this.top);
        // line(0, this.bottom, width, this.bottom);

        // line(mouseX, mouseY, wthis.topLeft.x, this.topLeft.y);
        // line(mouseX, mouseY, this.topRight.x, this.topRight.y);
        // line(mouseX, mouseY, this.bottomLeft.x, this.bottomLeft.y);
        // line(mouseX, mouseY, this.bottomRight.x, this.bottomRight.y);

        pop();
    }

    mouseON(mx, my) {
        var xcol = false;
        var ycol = false;

        if (mx > this.left && mx < this.right) {
            xcol = true;
        } else {
            return false;
        }

        if (my > this.top && my < this.bottom) {
            ycol = true;
        } else {
            return false;
        }

        if (xcol && ycol) {
            return true;
        }
    }
}




function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    genStar();
}

/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />

/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/background.ts" />
/// <reference path="objects/mine.ts" />
/// <reference path="objects/snake.ts" />
/// <reference path="objects/tank.ts" />
/// <reference path="objects/infobar.ts" />
/// <reference path="objects/healthbar.ts" />
/// <reference path="objects/star.ts" />
/// <reference path="objects/ration.ts" />
/// <reference path="objects/bullet.ts" />
/// <reference path="objects/shell.ts" />

var stats: Stats = new Stats();
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;

//game objects
var snake: objects.Snake;
var mines: objects.Mine[] = [];
var background: objects.Background;
var tank: objects.Tank;
var info: objects.InfoBar;
var scoreText: createjs.Text;
var healthBar: objects.HealthBar[] = [];
var difficultyStar: objects.Star[] = [];
var ration: objects.Ration;
var bullet: objects.Bullet;
var shell: objects.Shell;

//game variables
var difficulty: number = 1;
var score: number = 0;
var ticks = 0;
var health = 3;

// asset manifest - array of asset objects
var manifest = [
    { id: "mine", src: "assets/images/mine.png" },
    { id: "background", src: "assets/images/background.png" },
    { id: "tank", src: "assets/images/tank.png" },
    { id: "info", src: "assets/images/infoBar.png" },
    { id: "star", src: "assets/images/star.png" },
    { id: "snake", src: "assets/images/snake.png" },
    { id: "life", src: "assets/images/life.png" },
    { id: "ration", src: "assets/images/ration.png" },
    { id: "bullet", src: "assets/images/bullet.png" },
    { id: "shell", src: "assets/images/shell.png" },
    { id: "backgroundMusic", src: "assets/audio/backgroundMusic.ogg" },
    { id: "difficulty", src: "assets/audio/difficultyUp.ogg" },
    { id: "explosion", src: "assets/audio/Explosion.wav" }
];

// Game Objects 
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
}


function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    setupStats();

    main();
}

//ultilites methods/////////////////////////////////////////////////////////////////////////
function setupStats() {
    stats.setMode(0);
    document.body.appendChild(stats.domElement);
}

//calculate the distance between two points
function distance(p1: createjs.Point, p2: createjs.Point): number {

    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y),2)));
}

function checkCollision(collider: objects.GameObject) {
    var p1: createjs.Point = new createjs.Point();
    var p2: createjs.Point = new createjs.Point();

    p1.x = snake.x;
    p1.y = snake.y;
    p2.x = collider.x;
    p2.y = collider.y;

    if (distance(p1, p2) < ((snake.width * .5) + (collider.width * .5))) {
        if (!collider.isColliding) {
            createjs.Sound.play(collider.soundString);
            collider.isColliding = true;    
            collider.y = 800;

            if (collider.soundString == "explosion") {
                health--;
                stage.removeChild(healthBar[health]);
                if (health == 0) {
                    //game over
                }
            } else if (collider.soundString == "difficulty" && health != 3) {
                stage.addChild(healthBar[health]);
                health++;
            }
        }
    } else {
        collider.isColliding = false;
    }
}

function gameLoop() {

    stats.begin();

    if (ticks % 6 == 0) {
        score += 1;
        if (score == 500) {
            stage.addChild(difficultyStar[1]);
            difficulty = 2;
            createjs.Sound.play("difficulty");
        }
        if (score == 1000) {
            stage.addChild(difficultyStar[2]);
            difficulty = 3;
            createjs.Sound.play("difficulty");
        }
        if (score == 1500) {
            //you win
        }

        scoreText.text = "" + score;

        if (score % 250 == 0) {
            ration.reset();
        }
    }

    if (ticks % 90 == 0 && difficulty > 1) {
        bullet.reset(snake.y, tank.y);
    }

    if (ticks == 180 && difficulty > 2) {
        shell.reset(tank.y, tank.rotation);
    }

    stage.update(); // Refreshes our stage
    snake.update();
    tank.update(snake.getY());
    background.update();

    for (var index = 10; index > 0; index--) {
        mines[index].update();
        checkCollision(mines[index]);
    }

    ration.update();
    checkCollision(ration);

    bullet.update();
    checkCollision(bullet);

    shell.update();
    checkCollision(shell);

    if (ticks == 180) {
        ticks = 0;
    }

    ticks++;

    stats.end();   
}

// Our Game Kicks off in here
function main() {
    background = new objects.Background();
    stage.addChild(background);

    for (var index = 10; index > 0; index--) {
        mines[index] = new objects.Mine();
        stage.addChild(mines[index]);
    }

    ration = new objects.Ration();
    stage.addChild(ration);

    tank = new objects.Tank();
    stage.addChild(tank);

    snake = new objects.Snake();
    stage.addChild(snake);

    info = new objects.InfoBar();
    stage.addChild(info);

    bullet = new objects.Bullet();
    stage.addChild(bullet);

    shell = new objects.Shell();
    stage.addChild(shell);

    for (var index2 = 0; index2 < health; index2++) {
        healthBar[index2] = new objects.HealthBar(index2);
        stage.addChild(healthBar[index2]);
    }

    for (var index3 = 0; index3 < 3; index3++) {
        difficultyStar[index3] = new objects.Star(index3);
    }

    stage.addChild(difficultyStar[0]);

    scoreText = new createjs.Text("0", "20px Comic Sans MS", "#ffffff");
    scoreText.x = 355;
    scoreText.y = 475;
    scoreText.textAlign = "right";
    scoreText.textBaseline = "alphabetic";
    stage.addChild(scoreText);

    createjs.Sound.play("backgroundMusic", { loop: -1 });
}
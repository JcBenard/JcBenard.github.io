/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />

/// <reference path="constants.ts" />
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
/// <reference path="objects/button.ts" />
/// <reference path="objects/label.ts" />

//game variables
var stats: Stats = new Stats();
var canvas;
var stage: createjs.Stage;
var game: createjs.Container;
var assetLoader: createjs.LoadQueue;

//game objects
var snake: objects.Snake;
var mines: objects.Mine[] = [];
var scoreText: objects.Label;
var background: objects.Background;
var tank: objects.Tank;
var info: objects.InfoBar;
var healthBar: objects.HealthBar[] = [];
var difficultyStar: objects.Star[] = [];
var ration: objects.Ration;
var bullet: objects.Bullet;
var shell: objects.Shell;

//game variables
var difficulty: number = 1;
var score: number = 0;
var ticks = 0;
var health = constants.PLAYER_HEALTH;

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
            collider.y = constants.SCREEN_HEIGHT;

            if (collider.name == "mine" || collider.name == "bullet" || collider.name == "shell") {
                health--;
                game.removeChild(healthBar[health]);
            } else if (collider.name == "ration" && health != 3) {
                game.addChild(healthBar[health]);
                health++;
            }
        }
    } else {
        collider.isColliding = false;
    }
}

function gameLoop() {

    stats.begin();

    if (health < 1) {
        createjs.Sound.stop();
        game.removeAllChildren();
        stage.removeAllChildren();
    }

    if (ticks % 6 == 0) {
        score += 1;
        if (score == 350) {
            stage.addChild(difficultyStar[1]);
            difficulty = 2;
            createjs.Sound.play("difficulty");
        }
        if (score == 700) {
            stage.addChild(difficultyStar[2]);
            difficulty = 3;
            createjs.Sound.play("difficulty");
        }
        if (score == 1050) {
            //you win
        }

        scoreText.update();

        if (score % 175 == 0) {
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
    if (health > 0) {
        for (var index = constants.MINE_NUM; index > 0; index--) {
            mines[index].update();
            checkCollision(mines[index]);
        }

        ration.update();
        checkCollision(ration);

        bullet.update();
        checkCollision(bullet);

        shell.update();
        checkCollision(shell);
    }
    if (ticks == 180) {
        ticks = 0;
    }

    ticks++;

    stats.end();   
}

// Our Game Kicks off in here
function main() {

    game = new createjs.Container();

    background = new objects.Background();
    game.addChild(background);

    for (var index = constants.MINE_NUM; index > 0; index--) {
        mines[index] = new objects.Mine();
        game.addChild(mines[index]);
    }

    ration = new objects.Ration();
    game.addChild(ration);

    tank = new objects.Tank();
    game.addChild(tank);

    snake = new objects.Snake();
    game.addChild(snake);

    info = new objects.InfoBar();
    game.addChild(info);

    bullet = new objects.Bullet();
    game.addChild(bullet);

    shell = new objects.Shell();
    game.addChild(shell);

    for (var index2 = 0; index2 < health; index2++) {
        healthBar[index2] = new objects.HealthBar(index2);
        game.addChild(healthBar[index2]);
    }

    for (var index3 = 0; index3 < 3; index3++) {
        difficultyStar[index3] = new objects.Star(index3);
    }

    game.addChild(difficultyStar[0]);

    scoreText = new objects.Label("0", 355, 475);
    game.addChild(scoreText);

    stage.addChild(game);

    createjs.Sound.play("backgroundMusic", { loop: -1 });
}
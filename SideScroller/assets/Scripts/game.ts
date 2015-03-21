/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/stats/stats.d.ts" />

/// <reference path="constants.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/gameBackground.ts" />
/// <reference path="objects/mine.ts" />
/// <reference path="objects/antiTank.ts" />
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
/// <reference path="objects/snakedeath.ts" />
/// <reference path="objects/explosion.ts" />
/// <reference path="objects/transitionbackground.ts" />

/// <reference path="states/win.ts" />
/// <reference path="states/gameOver.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/instructions.ts" />
/// <reference path="states/menu.ts" />

//game variables
var stats: Stats = new Stats();
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;

//game objects
var gameOver: states.GameOver;
var play: states.Play;
var instructions: states.Instructions;
var menu: states.Menu;
var win: states.Win;

//game states
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;

//game stats
var finalScore: number = 0;
var finalDifficulty: number = 1;
var finalAvaterY: number = 0;
var finalHealth: number = 0;

// asset manifest - array of asset objects
var manifest = [
    { id: "mine", src: "assets/images/mine.png" },
    { id: "gameBackground", src: "assets/images/background.png" },
    { id: "tank", src: "assets/images/tank.png" },
    { id: "info", src: "assets/images/infoBar.png" },
    { id: "star", src: "assets/images/star.png" },
    { id: "snake", src: "assets/images/snake.png" },
    { id: "life", src: "assets/images/life.png" },
    { id: "ration", src: "assets/images/ration.png" },
    { id: "bullet", src: "assets/images/bullet.png" },
    { id: "shell", src: "assets/images/shell.png" },
    { id: "antiTank", src: "assets/images/antiTank.png" },
    { id: "explosionSprite", src: "assets/images/explosion.png" },
    { id: "menuBackground", src: "assets/images/startBackground.png" },
    { id: "startButton", src: "assets/images/startButton.png" },
    { id: "restartButton", src: "assets/images/restartButton.png" },
    { id: "instructionsButton", src: "assets/images/instructionsButton.png" },
    { id: "overBackground", src: "assets/images/overBackground.png" },
    { id: "instructionsBackground", src: "assets/images/instructionBackground.png" },
    { id: "winBackground", src: "assets/images/winBackground.png" },
    { id: "backgroundMusic", src: "assets/audio/backgroundMusic.ogg" },
    { id: "difficulty", src: "assets/audio/difficultyUp.ogg" },
    { id: "gameOver", src: "assets/audio/gameOver.ogg" },
    { id: "win", src: "assets/audio/win.mp3" },
    { id: "explosion", src: "assets/audio/Explosion.wav" }
];

// Game Objects 
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
}

//runs on start
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    //set up the fps tracker
    setupStats();

    //set the current state to menu then run the change state function
    currentState = constants.MENU_STATE;
    changeState(currentState);
}

//ultilites methods/////////////////////////////////////////////////////////////////////////
function setupStats() {
    stats.setMode(0);
    document.body.appendChild(stats.domElement);
}

//main game loop
function gameLoop() {

    //start tracking fps for this frame
    stats.begin();   

    //if the stateChange boolean is set to true run the change state function
    if (stateChanged) {
        changeState(currentState);
    }

    //run the update function of the current state
    currentStateFunction.update();
    stage.update();

    //stop tracking the fps for this frame
    stats.end();   
}

//this function runs when a state is changed and runs the corresponding functions in the objects
function changeState(state: number) {

    switch (state) {
        case constants.MENU_STATE://if its menu state
            stateChanged = false;//set the boolean to chage states back to false
            menu = new states.Menu();//create the menu object
            currentStateFunction = menu;//change the variable for stage updates 
            break;
        case constants.INSTRUCTIONS_STATE://if its instructions state
            stateChanged = false;
            instructions = new states.Instructions();
            currentStateFunction = instructions;
            break;
        case constants.PLAY_STATE://if its play state
            stateChanged = false;
            play = new states.Play();
            currentStateFunction = play;         
            break;
        case constants.GAME_OVER_STATE://if its game over state
            stateChanged = false;
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;            
            break;
        case constants.WIN_STATE://if its the win state
            stateChanged = false;
            win = new states.Win();
            currentStateFunction = win;
            break;
    }  
}
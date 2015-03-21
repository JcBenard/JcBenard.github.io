/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/gameBackground.ts" />
/// <reference path="../objects/bullet.ts" />
/// <reference path="../objects/healthbar.ts" />
/// <reference path="../objects/infobar.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/mine.ts" />
/// <reference path="../objects/antiTank.ts" />
/// <reference path="../objects/ration.ts" />
/// <reference path="../objects/shell.ts" />
/// <reference path="../objects/snake.ts" />
/// <reference path="../objects/star.ts" />
/// <reference path="../objects/tank.ts" />
var states;
(function (states) {
    var Play = (function () {
        //constructor///////////////////////////////////////////////////////////////////////
        function Play() {
            this.mines = [];
            this.healthBar = [];
            this.difficultyStar = [];
            this.antiTank = [];
            this.difficulty = 1;
            this.score = 0;
            this.ticks = 0;
            this.health = constants.PLAYER_HEALTH;
            this.game = new createjs.Container();
            this.game.alpha = 0;
            //create and add the background to the game
            this.background = new objects.GameBackground();
            this.game.addChild(this.background);
            for (var index = constants.MINE_NUM; index > 0; index--) {
                this.mines[index] = new objects.Mine();
                this.game.addChild(this.mines[index]);
                this.antiTank[index] = new objects.AntiTank(index);
            }
            //create and add the ration to the game
            this.ration = new objects.Ration();
            this.game.addChild(this.ration);
            //create and add the tank to the game
            this.tank = new objects.Tank();
            this.game.addChild(this.tank);
            //create and add th player to the game
            this.snake = new objects.Snake();
            this.game.addChild(this.snake);
            //create and add the bullet to the game
            this.bullet = new objects.Bullet();
            this.game.addChild(this.bullet);
            //create and add the tank shell to the game
            this.shell = new objects.Shell();
            this.game.addChild(this.shell);
            //create and add the bottom info bar to the game
            this.info = new objects.InfoBar();
            this.game.addChild(this.info);
            for (var index2 = 0; index2 < this.health; index2++) {
                this.healthBar[index2] = new objects.HealthBar(index2);
                this.game.addChild(this.healthBar[index2]);
            }
            for (var index3 = 0; index3 < 3; index3++) {
                this.difficultyStar[index3] = new objects.Star(index3);
            }
            //add the first start to the game
            this.game.addChild(this.difficultyStar[0]);
            //create and add the score field to the game
            this.scoreText = new objects.Label("0", 355, 475);
            this.game.addChild(this.scoreText);
            //add all the elements to the stage
            stage.addChild(this.game);
            //start the background music
            createjs.Sound.play("backgroundMusic", { loop: -1 });
        } //end of constructor
        //public methods//////////////////////////////////////////////////////////////////////////////////
        //calculate the distance between two points
        Play.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        };
        //check if two elements collided
        Play.prototype.checkCollision = function (collider) {
            //make points using the player charater and the selected element
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = this.snake.x;
            p1.y = this.snake.y;
            p2.x = collider.x;
            p2.y = collider.y;
            //check if the elements have collided using the distance method and if they are
            if (this.distance(p1, p2) < ((this.snake.width * .5) + (collider.width * .5))) {
                //if they aren't already colliding
                if (!collider.isColliding) {
                    createjs.Sound.play(collider.soundString); //play the sound that would be made on collision
                    collider.isColliding = true; //set this varriables to true so they don't trigger collision again
                    collider.y = constants.SCREEN_HEIGHT; //move the element off the stage
                    //if the element that collided was harmful
                    if (collider.name == "mine" || collider.name == "bullet" || collider.name == "shell") {
                        this.health--; //remove 1 health from the players health variable
                        this.game.removeChild(this.healthBar[this.health]); //remove one of the parts of the players health bar from the game
                    }
                    else if (collider.name == "ration" && this.health != 3) {
                        this.game.addChild(this.healthBar[this.health]); //give the player a part of the health bar
                        this.health++; //add 1 to the player's health variable
                    }
                }
            }
            else {
                collider.isColliding = false; //set the variable to false so they can collide again
            }
        }; //end of collider
        //updates the game based on the elements
        Play.prototype.update = function () {
            if (this.game.alpha != 1) {
                this.game.alpha += .01;
            }
            if (this.game.alpha >= 1) {
                //if the player has no life left
                if (this.health < 1) {
                    //stop all the sounds, remove everything from the game and stage then set the state to game over
                    createjs.Sound.stop();
                    this.game.removeAllChildren();
                    stage.removeAllChildren();
                    finalScore = this.score;
                    finalDifficulty = this.difficulty;
                    finalAvaterY = this.snake.y;
                    currentState = constants.GAME_OVER_STATE;
                    stateChanged = true;
                }
                //if the ticker is divisible by 6
                if (this.ticks % 6 == 0) {
                    this.score += 1; //increase the score by 1
                    if (this.score == 350) {
                        stage.addChild(this.difficultyStar[1]); //add one of the level stars to the game
                        this.difficulty = 2;
                        createjs.Sound.play("difficulty");
                    }
                    if (this.score == 700) {
                        stage.addChild(this.difficultyStar[2]); //add one of the level starts to the game
                        this.difficulty = 3;
                        createjs.Sound.play("difficulty");
                    }
                    if (this.score == 100) {
                        for (var index = constants.MINE_NUM; index > 0; index--) {
                            this.game.addChildAt(this.antiTank[index], (index + 3));
                        }
                    }
                    this.scoreText.update(this.score); //update the score in the game
                    if (this.score % 175 == 0) {
                        this.ration.reset(); //reset the ration so it will appear on the game
                    }
                }
                //if 90 frams have passed and the difficulty is greater then 1
                if (this.ticks % 90 == 0 && this.difficulty > 1) {
                    this.bullet.reset(this.snake.y, this.tank.y); //shoot a bullet
                }
                //if 180 frams have passed and the difficulty is greater then 2
                if (this.ticks == 180 && this.difficulty > 2) {
                    this.shell.reset(this.tank.y, this.tank.rotation); //fire 1 shell 
                }
                if (this.score > 100) {
                    for (var index = constants.MINE_NUM; index > 0; index--) {
                        this.antiTank[index].update();
                    }
                    if (this.antiTank[1].x <= this.tank.x) {
                        //stop all the sounds, remove everything from the game and stage then set the state to game over
                        createjs.Sound.stop();
                        this.game.removeAllChildren();
                        stage.removeAllChildren();
                        finalScore = this.score;
                        finalDifficulty = this.difficulty;
                        finalAvaterY = this.snake.y;
                        finalHealth = this.health;
                        currentState = constants.WIN_STATE;
                        stateChanged = true;
                    }
                }
                //update and check collision for the moving elements
                this.snake.update();
                this.tank.update(this.snake.y);
                this.background.update();
                if (this.health > 0) {
                    for (var index = constants.MINE_NUM; index > 0; index--) {
                        this.mines[index].update();
                        this.checkCollision(this.mines[index]);
                    }
                    this.ration.update();
                    this.checkCollision(this.ration);
                    this.bullet.update();
                    this.checkCollision(this.bullet);
                    this.shell.update();
                    this.checkCollision(this.shell);
                }
                //if the ticker reaches 180 set it to 0
                if (this.ticks == 180) {
                    this.ticks = 0;
                }
                //increment the ticker
                this.ticks++;
            }
        }; //end of update
        return Play;
    })();
    states.Play = Play; //end of play
})(states || (states = {}));
//# sourceMappingURL=play.js.map
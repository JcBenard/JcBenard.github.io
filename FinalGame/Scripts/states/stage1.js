/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/stagebackground.ts" />
/// <reference path="../objects/stagewalls.ts" />
/// <reference path="../objects/healthbar.ts" />
/// <reference path="../objects/infobar.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/snake.ts" />
/// <reference path="../objects/items.ts" />
/// <reference path="../objects/bullet.ts" />
/// <reference path="../objects/guard.ts" />
/// <reference path="../objects/ration.ts" />
/// <reference path="../objects/worldcontainer.ts" />
/// <reference path="../objects/backgroundobjects.ts" />
/// <reference path="../objects/wallshapes.ts" />
/// <reference path="../managers/collision.ts" />
/// <reference path="../objects/guardloschecker.ts" />
/// <reference path="../objects/ammobox.ts" />
/// <reference path="../objects/weaponicon.ts" />
var states;
(function (states) {
    var Stage1 = (function () {
        //constructor///////////////////////////////////////////////////////////////////////
        function Stage1() {
            this.guards = [];
            this.tanks = [];
            this.verticalBoxes = [];
            this.horizontalBoxes = [];
            this.wallCollisionShapes = [];
            this.healthBar = [];
            //location varaibles for obejcts
            this.tankX = [-140, 38, 759, 940, -40, -40, 460, 460, 960, 960];
            this.tankY = [-161, -161, -100, -100, -865, -685, -865, -685, -865, -685];
            this.vBoxesX = [-200, 260, 760, 1260];
            this.vBoxesY = [-821, -821, -821, -821];
            this.hBoxesX = [-120, 640];
            this.hBoxesY = [-380, -460];
            this.guardX = [680, 1180, 275, -220, -120, -85, 195, 900, 1190, 480, 545, 550];
            this.guardY = [-155, 135, -335, -35, -455, -535, -855, -545, -860, -930, -930, -495];
            this.guardDirection = ["Down", "Up", "Down", "Up", "Right", "Up", "Down", "Up", "Down", "Left", "Right", "Right"];
            this.wallX = [605, 390, -320, -320, 1465, -320];
            this.wallY = [-320, -320, -1070, -1070, -1070, 190];
            this.wallWidth = [920, 225, 55, 1835, 40, 1835];
            this.wallHeight = [105, 395, 1290, 80, 1290, 17];
            //set the player health to max
            playerHealth = constants.PLAYER_HEALTH;
            //create a game container to store all elements
            this.game = new createjs.Container();
            //create a world container to hold all background elements
            this.world = new objects.WorldContainer();
            //create and add the background to the game
            this.background = new objects.StageBackground("1");
            this.world.addChild(this.background);
            //create and add the walls to the game
            this.walls = new objects.StageWalls("1");
            this.world.addChild(this.walls);
            for (var index = 0; index < this.tankX.length; index++) {
                this.tanks[index] = new objects.BackgroundObjects(this.tankX[index], this.tankY[index], "stationTank");
                this.world.addChild(this.tanks[index]);
            }
            for (var index = 0; index < this.vBoxesX.length; index++) {
                this.verticalBoxes[index] = new objects.BackgroundObjects(this.vBoxesX[index], this.vBoxesY[index], "boxesV");
                this.world.addChild(this.verticalBoxes[index]);
            }
            for (var index = 0; index < this.hBoxesX.length; index++) {
                this.horizontalBoxes[index] = new objects.BackgroundObjects(this.hBoxesX[index], this.hBoxesY[index], "boxesH");
                this.world.addChild(this.horizontalBoxes[index]);
            }
            for (var index = 0; index < this.guardX.length; index++) {
                this.guards[index] = new objects.Guard(this.guardX[index], this.guardY[index], this.guardDirection[index], this.world);
                this.world.addChild(this.guards[index]);
            }
            for (var index = 0; index < this.wallX.length; index++) {
                this.wallCollisionShapes[index] = new objects.WallShapes(this.wallX[index], this.wallY[index], this.wallHeight[index], this.wallWidth[index]);
                this.world.addChild(this.wallCollisionShapes[index]);
            }
            //create and add a door collider
            this.doorCollision = new objects.WallShapes(-70, -1045, 60, 80);
            this.doorCollision.name = "door";
            this.world.addChild(this.doorCollision);
            //create and add a ration to the game
            this.ration = new objects.Ration(0);
            this.world.addChild(this.ration);
            //create and add a ammo box to the game
            this.ammoBox = new objects.AmmoBox(0);
            this.world.addChild(this.ammoBox);
            //create and add th player to the game
            this.snake = new objects.Snake(constants.SCRREN_CENTER_WIDTH, 400);
            this.game.addChild(this.snake);
            //create and add the info bar to the bottom of the screen
            this.info = new objects.InfoBar();
            this.game.addChild(this.info);
            //create and add a ration to the game
            this.weaponIcon = new objects.WeaponIcon("pistol");
            this.ammoText = new objects.Label(ammo + "", 480, 470);
            //create and add the stationary pistol to the game
            this.pistol = new objects.Items("pistol", 1390, -945);
            this.world.addChild(this.pistol);
            //create a bullet objects that is used if the player uses the pistol
            this.bullet = new objects.Bullet();
            this.game.addChild(this.bullet);
            for (var index2 = 0; index2 < constants.PLAYER_HEALTH; index2++) {
                this.healthBar[index2] = new objects.HealthBar(index2);
                this.game.addChild(this.healthBar[index2]);
            }
            //add all the elements in the world container to the lowest level of the game container
            this.game.addChildAt(this.world, 0);
            //add the game container to the stage
            stage.addChild(this.game);
            //add event listeners for the keys
            window.addEventListener("keydown", this.keyPressed, true);
            window.addEventListener("keyup", this.keyRelease, true);
            //create the collision manager
            this.collision = new managers.Collision();
            //start the background music
            createjs.Sound.play("main", { loop: -1 });
        } //end of constructor
        //public methods//////////////////////////////////////////////////////////////////////////////////
        //updates the game based on the elements
        Stage1.prototype.update = function () {
            //if the flag to use a weapon is true
            if (useProjectile == true) {
                switch (currentWeapon) {
                    case ("pistol"):
                        if (ammo > 0) {
                            this.bullet.reset(this.snake, direction);
                            ammo--;
                        } //end of if
                        break;
                    case ("punch"):
                        for (var index = 0; index < this.guards.length; index++) {
                            this.collision.playerObjectsCollision(this.snake, this.guards[index], this.ration, this.ammoBox, this.game, this.healthBar);
                        }
                        break;
                }
                //set the use weapon flag to false;
                useProjectile = false;
            } //end of if
            //if the player has the pistol out set the pistol icon and show the ammo on the info bar 
            if (currentWeapon == "pistol") {
                this.game.addChild(this.weaponIcon);
                this.game.addChild(this.ammoText);
                this.ammoText.update(ammo);
            }
            else {
                this.game.removeChild(this.weaponIcon);
                this.game.removeChild(this.ammoText);
            } //end of if
            //call the function to update the player, the bullet and the world
            this.snake.update();
            this.bullet.update();
            this.world.update();
            this.ration.update();
            this.ammoBox.update();
            for (var index = 0; index < this.tanks.length; index++) {
                this.collision.backgroundObjectsCollision(this.snake, this.world, this.tanks[index]);
                this.collision.backgroundObjectsCollision(this.bullet, this.world, this.tanks[index]);
            }
            for (var index = 0; index < this.verticalBoxes.length; index++) {
                this.collision.backgroundObjectsCollision(this.snake, this.world, this.verticalBoxes[index]);
                this.collision.backgroundObjectsCollision(this.bullet, this.world, this.verticalBoxes[index]);
            }
            for (var index = 0; index < this.horizontalBoxes.length; index++) {
                this.collision.backgroundObjectsCollision(this.snake, this.world, this.horizontalBoxes[index]);
                this.collision.backgroundObjectsCollision(this.bullet, this.world, this.horizontalBoxes[index]);
            }
            for (var index = 0; index < this.guards.length; index++) {
                this.guards[index].update(this.snake, this.world);
                this.collision.playerObjectsCollision(this.bullet, this.guards[index], this.ration, this.ammoBox, this.game, this.healthBar);
                for (var index2 = 0; index2 < this.guards[index].losCheckers.length; index2++) {
                    for (var index3 = 0; index3 < this.horizontalBoxes.length; index3++) {
                        if (this.collision.losCollisionObjects(this.guards[index].losCheckers[index2], this.horizontalBoxes[index3], this.guards[index], this.world)) {
                            this.guards[index].losCheckers[index2].remove = true;
                        }
                    }
                    for (var index3 = 0; index3 < this.wallCollisionShapes.length; index3++) {
                        if (this.collision.losCollisionWalls(this.guards[index].losCheckers[index2], this.wallCollisionShapes[index3], this.guards[index], this.world)) {
                            this.guards[index].losCheckers[index2].remove = true;
                        }
                    }
                    if (this.collision.losCollisionPlayer(this.guards[index].losCheckers[index2], this.snake, this.guards[index])) {
                        deathX = this.snake.x;
                        deathY = this.snake.y;
                        createjs.Sound.stop(); //stop the background music
                        this.game.removeAllChildren(); //remove everything from the stage
                        window.removeEventListener("keydown", this.keyPressed, true); //disable the eventlsitners
                        window.removeEventListener("keyup", this.keyRelease, true);
                        stage.removeChild(this.game); //remove the game contaner from the game just in case
                        lastState = constants.STAGE1_STATE; //set the last state to the current state
                        currentState = constants.GAME_OVER_SPOTTED_STATE; //set the current state to the game over state
                        stateChanged = true; //set the state change varaible to true so the game object changes the stage
                    } //end of if                    
                }
            }
            for (var index = 0; index < this.wallCollisionShapes.length; index++) {
                this.collision.wallObjectsCollision(this.snake, this.world, this.wallCollisionShapes[index]);
                this.collision.wallObjectsCollision(this.bullet, this.world, this.wallCollisionShapes[index]);
            }
            //if the player collides with the door move to the next level
            if (this.collision.wallObjectsCollision(this.snake, this.world, this.doorCollision)) {
                createjs.Sound.stop();
                this.world.removeAllChildren();
                this.game.removeAllChildren();
                window.removeEventListener("keydown", this.keyPressed, true);
                window.removeEventListener("keyup", this.keyRelease, true);
                stage.removeChild(this.game);
                currentState = constants.STAGE1BOSS_STATE;
                stateChanged = true;
            } //end of if
            //check collision for snake and the stationary pickups
            this.collision.objectsCollision(this.pistol, this.snake, null, null);
            this.collision.objectsCollision(this.ration, this.snake, this.game, this.healthBar);
            this.collision.objectsCollision(this.ammoBox, this.snake, null, null);
            //check collision for snake and the outer walls          
            this.collision.wallCollision(this.world, this.snake, this.walls);
        }; //end of update
        //if the player presses a key
        Stage1.prototype.keyPressed = function (event) {
            //check what key is pressed then if its a movement key change the direction movement amount, the animation and the direction varriables
            if (dx == 0 && dy == 0) {
                switch (event.keyCode) {
                    case constants.KEYCODE_A:
                        dx = 2;
                        animation = "runLeft" + haveGun;
                        direction = "Left";
                        break;
                    case constants.KEYCODE_D:
                        dx = -2;
                        animation = "runRight" + haveGun;
                        direction = "Right";
                        break;
                    case constants.KEYCODE_W:
                        dy = 2;
                        animation = "runUp" + haveGun;
                        direction = "Up";
                        break;
                    case constants.KEYCODE_S:
                        dy = -2;
                        animation = "runDown" + haveGun;
                        direction = "Down";
                        break;
                    case constants.KEYCODE_SPACE:
                        if (currentWeapon == "punch") {
                            animation = "punch" + direction;
                        }
                        else {
                            animation = "idle" + direction + haveGun;
                            useProjectile = true;
                        } //end of if
                        useProjectile = true;
                        break;
                    case constants.KEYCODE_E:
                        if (haveWeapon[0] == true) {
                            if (currentWeapon == "punch") {
                                currentWeapon = "pistol";
                                haveGun = "Gun";
                            }
                            else {
                                currentWeapon = "punch";
                                haveGun = "";
                            } //end of if
                        } //end of if
                        break;
                }
            } //end of if
        }; //end of keypressed method
        //when the player resleases a key
        Stage1.prototype.keyRelease = function (evnt) {
            switch (evnt.keyCode) {
                case constants.KEYCODE_A:
                    dx = 0;
                    animation = "idleLeft" + haveGun;
                    break;
                case constants.KEYCODE_D:
                    dx = 0;
                    animation = "idleRight" + haveGun;
                    break;
                case constants.KEYCODE_W:
                    dy = 0;
                    animation = "idleUp" + haveGun;
                    break;
                case constants.KEYCODE_S:
                    dy = 0;
                    animation = "idleDown" + haveGun;
                    break;
                case constants.KEYCODE_SPACE:
                    if (dx == 0 && dy == 0) {
                        animation = "idle" + direction + haveGun;
                    } //end of if
                    break;
            }
        }; //end of keyrelease
        return Stage1;
    })();
    states.Stage1 = Stage1; //end of play
})(states || (states = {})); //end of class
//# sourceMappingURL=stage1.js.map
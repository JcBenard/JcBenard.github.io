/*
Slot Machine
Jean-Claude Benard
Febuary 20th 2015
this class create and runs a functional slot machine
*/
// Game Objects
var canvas;
var stage;
var game;
var reelContainer = [];

var background;
var spinButton;
var resetButton;
var bet1Button;
var bet5Button;
var bet10Button;
var resetBetButton;
var reelImgs = [];

var creditsText;
var betText;
var winningsText;
var jackpotText;

//game variables
var playerBet = 1;
var playerCredits = 500;
var lastWinnings = 0;
var jackpot = 1000;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;
var turn = 0;
var spinResult;
var allowedToBet = true;
var blink1;
var blink2;

//reset all the counters to 0
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

//the initalization of the game
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    //call the main function to added everything to the canvas
    main();
}

//start of the game
function main() {
    //instantiate the game container
    game = new createjs.Container();

    //get the slots ui
    createUi();

    //add the containers to the stage
    stage.addChild(game);
    for (var i = 0; i < 3; i++) {
        reelContainer[i] = new createjs.Container();
        stage.addChild(reelContainer[i]);
    }
}

//runs 60 times in a second to update the game based on what has occured
function gameLoop() {
    stage.update();

    //see if the player is over betting
    if (playerBet > playerCredits && allowedToBet == true) {
        spinButton.removeEventListener("click", spinReels);
        spinButton.alpha = 1.0;
        allowedToBet = false;
    } else if (playerBet < playerCredits && allowedToBet == false) {
        spinButton.addEventListener("click", spinReels);
        allowedToBet = true;
    }
}

//create the game's ui and make it functional
function createUi() {
    //instantate the background
    background = new createjs.Bitmap("assets/images/background-slot.png");
    game.addChild(background);

    //instatite the spin button
    spinButton = new createjs.Bitmap("assets/images/spin.png");
    spinButton.x = 456;
    spinButton.y = 537;
    game.addChild(spinButton);

    //add action listeners for the posible events
    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", function () {
        buttonOver("spinButton");
    });
    spinButton.addEventListener("mouseout", function () {
        buttonOut("spinButton");
    });

    //instatite the reset button
    resetButton = new createjs.Bitmap("assets/images/reset.png");
    resetButton.x = 61;
    resetButton.y = 537;
    game.addChild(resetButton);

    //add action listeners for the posible events
    resetButton.addEventListener("click", resetGame);
    resetButton.addEventListener("mouseover", function () {
        buttonOver("resetButton");
    });
    resetButton.addEventListener("mouseout", function () {
        buttonOut("resetButton");
    });

    //instatite the bet 1 button
    bet1Button = new createjs.Bitmap("assets/images/bet1.png");
    bet1Button.x = 148;
    bet1Button.y = 537;
    game.addChild(bet1Button);

    //add action listeners for the posible events
    bet1Button.addEventListener("click", function () {
        betting(1);
    });
    bet1Button.addEventListener("mouseover", function () {
        buttonOver("bet1Button");
    });
    bet1Button.addEventListener("mouseout", function () {
        buttonOut("bet1Button");
    });

    //instatite the bet 5 button
    bet5Button = new createjs.Bitmap("assets/images/bet5.png");
    bet5Button.x = 222;
    bet5Button.y = 537;
    game.addChild(bet5Button);

    //add action listeners for the posible events
    bet5Button.addEventListener("click", function () {
        betting(5);
    });
    bet5Button.addEventListener("mouseover", function () {
        buttonOver("bet5Button");
    });
    bet5Button.addEventListener("mouseout", function () {
        buttonOut("bet5Button");
    });

    //instatite the bet 10 button
    bet10Button = new createjs.Bitmap("assets/images/bet10.png");
    348, 537;
    bet10Button.x = 293;
    bet10Button.y = 537;
    game.addChild(bet10Button);

    //add action listeners for the posible events
    bet10Button.addEventListener("click", function () {
        betting(10);
    });
    bet10Button.addEventListener("mouseover", function () {
        buttonOver("bet10Button");
    });
    bet10Button.addEventListener("mouseout", function () {
        buttonOut("bet10Button");
    });

    //instatite the reset bet button
    resetBetButton = new createjs.Bitmap("assets/images/resetBet.png");
    resetBetButton.x = 366;
    resetBetButton.y = 537;
    game.addChild(resetBetButton);

    //add action listeners for the posible events
    resetBetButton.addEventListener("click", function () {
        betting(null);
    });
    resetBetButton.addEventListener("mouseover", function () {
        buttonOver("resetBetButton");
    });
    resetBetButton.addEventListener("mouseout", function () {
        buttonOut("resetBetButton");
    });

    //instatite the players total credits
    creditsText = new createjs.Text(playerCredits.toString(), "40px Comic Sans MS", "#000000");
    creditsText.x = 219;
    creditsText.y = 179;
    creditsText.textAlign = "right";
    creditsText.textBaseline = "alphabetic";
    game.addChild(creditsText);

    //instatite the players bet
    betText = new createjs.Text(playerBet.toString(), "40px Comic Sans MS", "#000000");
    betText.x = 325;
    betText.y = 179;
    betText.textAlign = "right";
    betText.textBaseline = "alphabetic";
    game.addChild(betText);

    //instatite the players last winnings amount
    winningsText = new createjs.Text(lastWinnings.toString(), "40px Comic Sans MS", "#000000");
    winningsText.x = 466;
    winningsText.y = 179;
    winningsText.textAlign = "right";
    winningsText.textBaseline = "alphabetic";
    game.addChild(winningsText);

    //instatite the jackpot amount
    jackpotText = new createjs.Text(jackpot.toString(), "40px Comic Sans MS", "#000000");
    jackpotText.x = 279;
    jackpotText.y = 109;
    jackpotText.textAlign = "center";
    jackpotText.textBaseline = "alphabetic";
    game.addChild(jackpotText);
}

//when the user stops hovering over the buttons
function buttonOut(button) {
    switch (button) {
        case "spinButton":
            spinButton.alpha = 1.0;
            break;
        case "resetButton":
            resetButton.alpha = 1.0;
            break;
        case "bet1Button":
            bet1Button.alpha = 1.0;
            break;
        case "bet5Button":
            bet5Button.alpha = 1.0;
            break;
        case "bet10Button":
            bet10Button.alpha = 1.0;
            break;
        case "resetBetButton":
            resetBetButton.alpha = 1.0;
            break;
    }
}

//when the user is hovering over a button
function buttonOver(button) {
    switch (button) {
        case "spinButton":
            if (allowedToBet == true)
                spinButton.alpha = 0.8;
            break;
        case "resetButton":
            resetButton.alpha = 0.8;
            break;
        case "bet1Button":
            bet1Button.alpha = 0.8;
            break;
        case "bet5Button":
            bet5Button.alpha = 0.8;
            break;
        case "bet10Button":
            bet10Button.alpha = 0.8;
            break;
        case "resetBetButton":
            resetBetButton.alpha = 0.8;
            break;
    }
}

//if the player changes their bet amount
function betting(amount) {
    //if they chose to reset the amount
    if (amount == null) {
        playerBet = 1;
        betText.text = "" + playerBet;
    } else {
        playerBet += amount;
        betText.text = "" + playerBet;
    }
}

//if they selected the reset button
function resetGame() {
    //set all values to there base
    playerBet = 1;
    playerCredits = 500;
    lastWinnings = 0;
    jackpot = 1000;

    //clear the game then remake the ui
    game.removeAllChildren();
    createUi();
}

//the main function to spin the reels, display the results and change the number totals
function spinReels() {
    clearInterval(blink1); //makes the objects stop blinking after the player won the jackpot
    clearInterval(blink2);
    spinResult = Reels(); //call the reels function to get the reel spins
    determineWinnings(); //call this function to find how much the player won and update the board acordingly

    for (var index = 0; index < 3; index++) {
        reelContainer[index].removeAllChildren();
        reelImgs[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelImgs[index].x = 148 + (95 * index);
        reelImgs[index].y = 333;

        reelContainer[index].addChild(reelImgs[index]);
    }
}

//this function determins the reels through random number generation
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

//if the player won find out how much they won and add it to there credits, if they lost remove the amount they bet from there credits
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            lastWinnings = playerBet * 10;
        } else if (bananas == 3) {
            lastWinnings = playerBet * 20;
        } else if (oranges == 3) {
            lastWinnings = playerBet * 30;
        } else if (cherries == 3) {
            lastWinnings = playerBet * 40;
        } else if (bars == 3) {
            lastWinnings = playerBet * 50;
        } else if (bells == 3) {
            lastWinnings = playerBet * 75;
        } else if (sevens == 3) {
            lastWinnings = playerBet * 100;
        } else if (grapes == 2) {
            lastWinnings = playerBet * 2;
        } else if (bananas == 2) {
            lastWinnings = playerBet * 2;
        } else if (oranges == 2) {
            lastWinnings = playerBet * 3;
        } else if (cherries == 2) {
            lastWinnings = playerBet * 4;
        } else if (bars == 2) {
            lastWinnings = playerBet * 5;
        } else if (bells == 2) {
            lastWinnings = playerBet * 10;
        } else if (sevens == 2) {
            lastWinnings = playerBet * 20;
        } else if (sevens == 1) {
            lastWinnings = playerBet * 5;
        } else {
            lastWinnings = playerBet * 1;
        }

        //add how much the player won then update the board acordingly
        playerCredits += lastWinnings;

        creditsText.text = "" + playerCredits;

        winningsText.text = "" + lastWinnings;

        checkJackPot(); //run this function to see if they won the jackpot
        resetFruitTally(); //call the function to reset the counters
    } else {
        //remove how much the player lost then update the board
        playerCredits -= playerBet;

        creditsText.text = "" + playerCredits;

        jackpot += Math.round(playerBet * .5); //add to the jackpot half of what the player betted
        jackpotText.text = "" + jackpot;

        //if the player has no money left
        if (playerCredits == 0) {
            playerLose(); //call the player lost function
        }

        //call the function to reset the counters
        resetFruitTally();
    }
}

//checks if a number is within a given range
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

//if the player has total ran out of money
function playerLose() {
    alert("It seems your all out of money. Please Leave.");
    window.open('', '_parent', '');
    window.close();
}

//see if the player won the jackpot
function checkJackPot() {
    // compare two random values
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);

    //if the random numbers are the same add the jackpot amount to there total and set the jackpot to default
    if (jackPotTry == jackPotWin) {
        playerCredits += jackpot;
        jackPotShow();
        jackpot = 1000;
    }
}

//does some grahpical things to show the player won the jackpot
function jackPotShow() {
    //the object will blink until the player acts
    blink1 = setInterval(function () {
        spinButton.alpha = 0.8;
        resetButton.alpha = 0.8;
        bet1Button.alpha = 0.8;
        bet5Button.alpha = 0.8;
        bet10Button.alpha = 0.8;
        resetBetButton.alpha = 0.8;
        betText.text = "";
        creditsText.text = "";
        jackpotText.text = "";
        winningsText.text = "";
    }, 500);

    blink2 = setInterval(function () {
        spinButton.alpha = 1.0;
        resetButton.alpha = 1.0;
        bet1Button.alpha = 1.0;
        bet5Button.alpha = 1.0;
        bet10Button.alpha = 1.0;
        resetBetButton.alpha = 1.0;
        betText.text = "" + playerBet;
        creditsText.text = "" + playerCredits;
        jackpotText.text = "" + jackpot;
        winningsText.text = "" + lastWinnings;
    }, 1000);
}
//# sourceMappingURL=game.js.map

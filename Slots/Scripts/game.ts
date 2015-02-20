/*
Slot Machine
Jean-Claude Benard
Febuary 20th 2015
this class create and runs a functional slot machine
*/

// Game Objects 
var canvas;
var stage: createjs.Stage;
var game: createjs.Container;
var reelContainer: createjs.Container[] = []; 

var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var bet1Button: createjs.Bitmap;
var bet5Button: createjs.Bitmap;
var bet10Button: createjs.Bitmap;
var resetBetButton: createjs.Bitmap;
var reelImgs: createjs.Bitmap[] = []; 

var creditsText: createjs.Text;
var betText: createjs.Text;
var winningsText: createjs.Text;
var jackpotText: createjs.Text;

//game variables
var playerBet: number = 1;
var playerCredits: number = 500;
var lastWinnings: number = 0;
var jackpot: number = 1000;
var grapes: number = 0;
var bananas: number = 0;
var oranges: number = 0;
var cherries: number = 0;
var bars: number = 0;
var bells: number = 0;
var sevens: number = 0;
var blanks: number = 0;
var turn: number = 0;
var spinResult;
var allowedToBet: boolean = true
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
    }//if the player changes thier bet so it's not over betting
    else if (playerBet < playerCredits && allowedToBet == false) {
        spinButton.addEventListener("click", spinReels);
        allowedToBet = true;
    }
}

//create the game's ui and make it functional
function createUi(): void {

    //instantate the background
    background = new createjs.Bitmap("assets/images/background-slot.png");
    game.addChild(background);

    //instatite the spin button
    spinButton = new createjs.Bitmap("assets/images/spin.png");
    spinButton.x = 456 // set it to the x coord i got
    spinButton.y = 537 // set it to the y coord i got
    game.addChild(spinButton);

    //add action listeners for the posible events
    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", function () { buttonOver("spinButton"); });
    spinButton.addEventListener("mouseout", function () { buttonOut("spinButton"); });

    //instatite the reset button
    resetButton = new createjs.Bitmap("assets/images/reset.png");
    resetButton.x = 61 // set it to the x coord i got
    resetButton.y = 537 // set it to the y coord i got
    game.addChild(resetButton);

    //add action listeners for the posible events
    resetButton.addEventListener("click", resetGame);
    resetButton.addEventListener("mouseover", function () { buttonOver("resetButton"); });
    resetButton.addEventListener("mouseout", function () { buttonOut("resetButton"); });

    //instatite the bet 1 button
    bet1Button = new createjs.Bitmap("assets/images/bet1.png");
    bet1Button.x = 148 // set it to the x coord i got
    bet1Button.y = 537 // set it to the y coord i got
    game.addChild(bet1Button);

    //add action listeners for the posible events
    bet1Button.addEventListener("click", function () { betting(1); });
    bet1Button.addEventListener("mouseover", function () { buttonOver("bet1Button"); });
    bet1Button.addEventListener("mouseout", function () { buttonOut("bet1Button"); });

    //instatite the bet 5 button
    bet5Button = new createjs.Bitmap("assets/images/bet5.png");
    bet5Button.x = 222 // set it to the x coord i got
    bet5Button.y = 537 // set it to the y coord i got
    game.addChild(bet5Button);

    //add action listeners for the posible events
    bet5Button.addEventListener("click", function () { betting(5); });
    bet5Button.addEventListener("mouseover", function () { buttonOver("bet5Button"); });
    bet5Button.addEventListener("mouseout", function () { buttonOut("bet5Button"); });

    //instatite the bet 10 button
    bet10Button = new createjs.Bitmap("assets/images/bet10.png"); 348, 537
    bet10Button.x = 293 // set it to the x coord i got
    bet10Button.y = 537 // set it to the y coord i got
    game.addChild(bet10Button);

    //add action listeners for the posible events
    bet10Button.addEventListener("click", function () { betting(10); });
    bet10Button.addEventListener("mouseover", function () { buttonOver("bet10Button"); });
    bet10Button.addEventListener("mouseout", function () { buttonOut("bet10Button"); });

    //instatite the reset bet button
    resetBetButton = new createjs.Bitmap("assets/images/resetBet.png");
    resetBetButton.x = 366 // set it to the x coord i got
    resetBetButton.y = 537 // set it to the y coord i got
    game.addChild(resetBetButton);

    //add action listeners for the posible events
    resetBetButton.addEventListener("click", function () { betting(null); });
    resetBetButton.addEventListener("mouseover", function () { buttonOver("resetBetButton"); });
    resetBetButton.addEventListener("mouseout", function () { buttonOut("resetBetButton"); });

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
function buttonOut(button: string) {
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
function buttonOver(button: string) {

    switch (button) {
        case "spinButton":
            if (allowedToBet == true)//only show the alpha if the player can bet
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
function betting(amount: number) {

    //if they chose to reset the amount
    if (amount == null) {
        playerBet = 1;
        betText.text = "" + playerBet;
    } else {//if they chose to increase the bet add the amount they chose
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
    clearInterval(blink1);//makes the objects stop blinking after the player won the jackpot
    clearInterval(blink2);
    spinResult = Reels();//call the reels function to get the reel spins
    determineWinnings();//call this function to find how much the player won and update the board acordingly

    //loop through the reel container and update the images for all the reels
    for (var index = 0; index < 3; index++) {
        reelContainer[index].removeAllChildren();
        reelImgs[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelImgs[index].x = 148 + (95 * index);
        reelImgs[index].y = 333;
        
        reelContainer[index].addChild(reelImgs[index]);
    }
}

//this function determins the reels through random number generation
function Reels(): String[]{
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    //loop through 3 times, once for each reel
    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {//determins what the reel should be based on what number was chosen at random from outCome using the checkRange function
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "seven";
                sevens++;
                break;

        }
    }
    return betLine;//sends the betline array to whoever calls the function
}

//if the player won find out how much they won and add it to there credits, if they lost remove the amount they bet from there credits
function determineWinnings(): void {
    if (blanks == 0) {//if they didn't get any blanks find out how much they won based on the tally numbers
        if (grapes == 3) {
            lastWinnings = playerBet * 10;
        }
        else if (bananas == 3) {
            lastWinnings = playerBet * 20;
        }
        else if (oranges == 3) {
            lastWinnings = playerBet * 30;
        }
        else if (cherries == 3) {
            lastWinnings = playerBet * 40;
        }
        else if (bars == 3) {
            lastWinnings = playerBet * 50;
        }
        else if (bells == 3) {
            lastWinnings = playerBet * 75;
        }
        else if (sevens == 3) {
            lastWinnings = playerBet * 100;
        }
        else if (grapes == 2) {
            lastWinnings = playerBet * 2;
        }
        else if (bananas == 2) {
            lastWinnings = playerBet * 2;
        }
        else if (oranges == 2) {
            lastWinnings = playerBet * 3;
        }
        else if (cherries == 2) {
            lastWinnings = playerBet * 4;
        }
        else if (bars == 2) {
            lastWinnings = playerBet * 5;
        }
        else if (bells == 2) {
            lastWinnings = playerBet * 10;
        }
        else if (sevens == 2) {
            lastWinnings = playerBet * 20;
        }
        else if (sevens == 1) {
            lastWinnings = playerBet * 5;
        }
        else {
            lastWinnings = playerBet * 1;
        }

        //add how much the player won then update the board acordingly
        playerCredits += lastWinnings;

        creditsText.text = "" + playerCredits;

        winningsText.text = "" + lastWinnings;

        checkJackPot(); //run this function to see if they won the jackpot
        resetFruitTally(); //call the function to reset the counters
    }
    else {//if the player lost

        //remove how much the player lost then update the board
        playerCredits -= playerBet;

        creditsText.text = "" + playerCredits;

        jackpot += Math.round(playerBet * .5);//add to the jackpot half of what the player betted  
        jackpotText.text = "" + jackpot;

        //if the player has no money left
        if (playerCredits == 0) {
            playerLose();//call the player lost function
        }

        //call the function to reset the counters
        resetFruitTally();
    }
}

//checks if a number is within a given range
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

//if the player has total ran out of money
function playerLose(): void{
    alert("It seems your all out of money. Please Leave.");
    window.open('', '_parent', '');
    window.close();
}


//see if the player won the jackpot
function checkJackPot(): void {
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
function jackPotShow(): void {

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

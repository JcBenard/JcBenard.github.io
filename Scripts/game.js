/// <reference path="lib/impress.js" />
var sub;//Stores the players current subweapon

function init() {//run on page loading
    console.log("Game Started");
    impress().init();

    //set up the background images for the slides
    for (i = 1; i <= 38; i++) {
        document.getElementById(i).style.backgroundImage = "url('../assets/images/" + i + ".png')";
    }
}

//change the subwepon when they get a new one
function subweapon(sub) {
    this.sub = sub;

    //change all the subweapon images on the slides
    var subImgs = document.getElementsByTagName("img")

    for (x = 0; x <= subImgs.length; x++) {
        subImgs[x].src = "/assets/images/" + this.sub + ".png"
    }
}

//see if the player has a required subweapon
function subCheck(subNeeded, goodOutcome,badOutcome, bossName) {
    if (sub == subNeeded) {
        document.getElementById(bossName).href = "#/" + goodOutcome;
    } else {
        document.getElementById(bossName).href = "#/" + badOutcome;
    }
}

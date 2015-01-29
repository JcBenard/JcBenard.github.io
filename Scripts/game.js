/// <reference path="lib/impress.js" />

function init() {
    console.log("Game Started");
    impress().init();

    for (i = 1; i <= 38; i++) {
        document.getElementById(i).style.backgroundImage = "url('../assets/images/" + i + ".png')";
    }
}

var sub;
function subweapon(sub) {
    this.sub = sub;
    document.getElementsByClassName(slide).style.backgroundImage = "url('../assets/images/sub.png')";
}

function subCheck(subNeeded, goodOutcome,badOutcome, bossName) {
    if (sub == subNeeded) {
        document.getElementById(bossName).href = "#/" + goodOutcome;
    } else {
        document.getElementById(bossName).href = "#/" + badOutcome;
    }
}

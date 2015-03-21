/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/gameBackground.ts" />
/// <reference path="../objects/bullet.ts" />
/// <reference path="../objects/healthbar.ts" />
/// <reference path="../objects/infobar.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/mine.ts" />
/// <reference path="../objects/ration.ts" />
/// <reference path="../objects/shell.ts" />
/// <reference path="../objects/snake.ts" />
/// <reference path="../objects/star.ts" />
/// <reference path="../objects/tank.ts" />
var states;
(function (states) {
    var Start = (function () {
        function Start() {
            this.game = new createjs.Container();
            this.background = new objects.GameBackground();
            this.game.addChild(this.background);
            stage.addChild(this.game);
        }
        Start.prototype.update = function () {
            this.background.update();
        };
        return Start;
    })();
    states.Start = Start;
})(states || (states = {}));
//# sourceMappingURL=start.js.map
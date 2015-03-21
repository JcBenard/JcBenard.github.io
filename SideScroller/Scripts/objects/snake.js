var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Snake = (function (_super) {
        __extends(Snake, _super);
        //constructor////////////////////////////////////////////////////////////////////////////////
        function Snake() {
            _super.call(this, new createjs.SpriteSheet({
                images: [assetLoader.getResult("snake")],
                frames: { width: 39, height: 70 },
                animations: {
                    run: {
                        frames: [0, 1, 2, 1],
                        speed: 0.12
                    }
                }
            }), "run");
            //instanced variables///////////////////////////////////////////////////////////////////////
            this._dx = 3;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.x = 225;
            this.y = constants.SCRREN_CENTER_HEIGHT;
        }
        //public methods/////////////////////////////////////////////////////////////////////////////
        Snake.prototype.update = function () {
            //move the player charater based on the mouse at a slowed rate
            if (this.y < 400) {
                if (this.y > stage.mouseY + 10) {
                    this.y -= this._dx;
                }
                else if (this.y < stage.mouseY - 10) {
                    this.y += this._dx;
                }
            }
            else {
                this.y = 399;
            }
        };
        return Snake;
    })(createjs.Sprite);
    objects.Snake = Snake;
})(objects || (objects = {}));
//# sourceMappingURL=snake.js.map
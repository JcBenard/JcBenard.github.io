var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var GameBackground = (function (_super) {
        __extends(GameBackground, _super);
        //constructor////////////////////////////////////////////////////////////////////////////////
        function GameBackground() {
            _super.call(this, assetLoader.getResult("gameBackground"));
            //private instanced variables
            this._dx = 4;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this._reset();
        }
        //public methods/////////////////////////////////////////////////////////////////////////////
        GameBackground.prototype.update = function () {
            //move the background to the left
            this.x -= this._dx;
            //see if the background is at it's end then reset it
            this._checkBounds();
        };
        //private methods//////////////////////////////////////////////////////////////////////////
        GameBackground.prototype._reset = function () {
            this.x = 0;
            this.y = 0;
        };
        GameBackground.prototype._checkBounds = function () {
            //if the background's x point is less then - screen width reset it
            if (this.x < -constants.SCREEN_WIDTH) {
                this._reset();
            }
        };
        return GameBackground;
    })(createjs.Bitmap);
    objects.GameBackground = GameBackground;
})(objects || (objects = {}));
//# sourceMappingURL=gameBackground.js.map
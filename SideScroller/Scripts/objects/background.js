var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Background = (function (_super) {
        __extends(Background, _super);
        //constructor////////////////////////////////////////////////////////////////////////////////
        function Background() {
            _super.call(this, assetLoader.getResult("background"));
            //private instanced variables
            this._dx = 3;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            //set the island to start at a random x and an out of bounds y
            this._reset();
        }
        //public methods/////////////////////////////////////////////////////////////////////////////
        Background.prototype.update = function () {
            this.x -= this._dx;
            this._checkBounds();
        };
        Background.prototype._reset = function () {
            this.x = 0;
            this.y = 0;
        };
        Background.prototype._checkBounds = function () {
            if (this.x < -640) {
                this._reset();
            }
        };
        return Background;
    })(createjs.Bitmap);
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map
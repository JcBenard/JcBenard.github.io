var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Ocean = (function (_super) {
        __extends(Ocean, _super);
        //constructor////////////////////////////////////////////////////////////////////////////////
        function Ocean() {
            _super.call(this, assetLoader.getResult("ocean"));
            //private instanced variables
            this._dy = 5;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            //set the island to start at a random x and an out of bounds y
            this._reset();
        }
        //public methods/////////////////////////////////////////////////////////////////////////////
        Ocean.prototype.update = function () {
            this.y += this._dy;
            this._checkBounds();
        };
        Ocean.prototype._reset = function () {
            this.x = 0;
            this.y = 960;
        };
        Ocean.prototype._checkBounds = function () {
            if (this.y >= 0) {
                this._reset();
            }
        };
        return Ocean;
    })(createjs.Bitmap);
    objects.Ocean = Ocean;
})(objects || (objects = {}));
//# sourceMappingURL=ocean.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Island = (function (_super) {
        __extends(Island, _super);
        //constructor////////////////////////////////////////////////////////////////////////////////
        function Island() {
            _super.call(this, assetLoader.getResult("island"));
            //private instanced variables
            this._dy = 5;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            //set the island to start at a random x and an out of bounds y
            this._reset();
        }
        //public methods/////////////////////////////////////////////////////////////////////////////
        Island.prototype.update = function () {
            this.y += this._dy;
            this._checkBounds();
        };
        Island.prototype._reset = function () {
            this.x = Math.floor(Math.random() * 640);
            this.y = -this.height;
        };
        Island.prototype._checkBounds = function () {
            if (this.y > (480 + this.height)) {
                this._reset();
            }
        };
        return Island;
    })(createjs.Bitmap);
    objects.Island = Island;
})(objects || (objects = {}));
//# sourceMappingURL=island.js.map
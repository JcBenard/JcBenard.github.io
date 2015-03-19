var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        //constructor////////////////////////////////////////////////////////////////////////////////
        function Cloud() {
            _super.call(this, assetLoader.getResult("cloud"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            //set the island to start at a random x and an out of bounds y
            this._reset();
        }
        //public methods/////////////////////////////////////////////////////////////////////////////
        Cloud.prototype.update = function () {
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        };
        Cloud.prototype._reset = function () {
            this.x = Math.floor(Math.random() * 640);
            this.y = -this.height;
            this._dy = Math.floor((Math.random() * 5) + 5);
            this._dx = Math.floor((Math.random() * 4) - 2);
        };
        Cloud.prototype._checkBounds = function () {
            if (this.y > (480 + this.height)) {
                this._reset();
            }
        };
        return Cloud;
    })(createjs.Bitmap);
    objects.Cloud = Cloud;
})(objects || (objects = {}));
//# sourceMappingURL=cloud.js.map
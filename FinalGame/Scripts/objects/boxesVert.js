var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var BoxesVert = (function (_super) {
        __extends(BoxesVert, _super);
        //constructor////////////////////////////////////////////////////////////////////////////////
        function BoxesVert(xLocation, yLocation) {
            _super.call(this, managers.Assets.loader.getResult("boxesV"));
            //instanced variables///////////////////////////////////////////////////////////////////////
            this._dx = 0;
            this._dy = 0;
            this.numbe = 0;
            this._counter = 0;
            this.diffX = 0;
            this.diffY = 0;
            this.height = this.getBounds().height;
            this.width = this.getBounds().width;
            this.x = xLocation;
            this.y = yLocation;
            this.collisionBox = new createjs.Shape();
            this.collisionBox.graphics.drawRect(0, 0, this.width - 40, this.height - 40);
            this.boxHeight = this.height - 40;
            this.boxWidth = this.width - 20;
        }
        //public methods/////////////////////////////////////////////////////////////////////////////
        BoxesVert.prototype.update = function (player, world) {
            var pt = this.globalToLocal(player.x, player.y);
            if (pt.x >= this.collisionBox.x + this.boxWidth || pt.x + player.width <= this.collisionBox.x || pt.y >= this.collisionBox.y + this.boxHeight || pt.y + player.height <= this.collisionBox.y) {
                this.worldX = world.x;
                this.worldY = world.y;
            }
            else {
                world.x = this.worldX;
                world.y = this.worldY;
            }
        };
        return BoxesVert;
    })(createjs.Bitmap);
    objects.BoxesVert = BoxesVert;
})(objects || (objects = {}));
//# sourceMappingURL=boxesvert.js.map
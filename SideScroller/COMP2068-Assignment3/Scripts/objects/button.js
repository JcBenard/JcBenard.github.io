var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(stringPath, x, y) {
            _super.call(this, stringPath);
            this.x;
            this.y;
            this.x = this.x;
            this.y = this.y;
            //this.addEventListener("mouseover", this._buttonOver);
            //this.addEventListener("mouseout", this._buttonOut);
        }
        return Button;
    })(createjs.Bitmap);
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map
module objects {

    export class Background extends createjs.Bitmap {
        //public instanced variables
        public width;
        public height;

        //private instanced variables
        private _dx = 3;

        //constructor////////////////////////////////////////////////////////////////////////////////
        constructor() {

            super(assetLoader.getResult("background"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            //set the island to start at a random x and an out of bounds y
            this._reset();

        }

        //public methods/////////////////////////////////////////////////////////////////////////////
        public update() {
            this.x -= this._dx;

            this._checkBounds();
        }

        private _reset() {
            this.x = 0;
            this.y = 0;
        }

        private _checkBounds() {
            if (this.x < -640) {
                this._reset();
            }
        }
    }
}  
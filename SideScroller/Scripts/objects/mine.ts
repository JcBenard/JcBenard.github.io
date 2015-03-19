module objects {

    export class Mine extends GameObject {

        //constructor////////////////////////////////////////////////////////////////////////////////
        constructor() {

            super("mine");

            this._dx = 3;
            this.soundString = "explosion";

            //set the island to start at a random x and an out of bounds y
            this._reset();
        }

        //public methods/////////////////////////////////////////////////////////////////////////////
        public update() {
            this.x -= this._dx;

            this._checkBounds();
        }

        private _reset() {
            this.x = 640 + Math.floor(Math.random() * 640);
            this.y = Math.floor(Math.random() * 440);           
        }

        private _checkBounds() {
            if (this.x <= 0) {
                this._reset();
            }
        }
    }
}    
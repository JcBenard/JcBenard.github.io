module objects {

    export class Snake extends createjs.Sprite {

        private _dx: number = 3;
        public width: number;
        public height: number;

        //constructor////////////////////////////////////////////////////////////////////////////////
        constructor() {

            super(
                new createjs.SpriteSheet({
                images: [assetLoader.getResult("snake")],
                frames: { width: 39, height: 70 },
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                animations: {
                    run: {
                        frames: [0, 1, 2, 1],
                        speed: 0.12
                    }
                }
                }),"run");

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.x = 225;

            
            
        }

        //public methods/////////////////////////////////////////////////////////////////////////////
        public update() {
            if (this.y < 400) {
                if (this.y > stage.mouseY + 10) {
                    this.y -= this._dx;
                } else if (this.y < stage.mouseY - 10) {
                    this.y += this._dx;
                }
            } else {
                this.y = 399;
            }
        }

        public getY() {
            return this.y;
        }
    }
}  
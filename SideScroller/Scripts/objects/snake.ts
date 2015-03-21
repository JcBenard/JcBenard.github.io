module objects {

    export class Snake extends createjs.Sprite {

        //instanced variables///////////////////////////////////////////////////////////////////////
        private _dx: number = 3;
        public width: number;
        public height: number;

        //constructor////////////////////////////////////////////////////////////////////////////////
        constructor() {

            super(
                new createjs.SpriteSheet({
                images: [assetLoader.getResult("snake")],
                frames: { width: 39, height: 70 },

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
            this.y = constants.SCRREN_CENTER_HEIGHT;       
        }

        //public methods/////////////////////////////////////////////////////////////////////////////
        public update() {
            //move the player charater based on the mouse at a slowed rate
            if (this.y < 400) {
                if (this.y > stage.mouseY + 10) {
                    this.y -= this._dx;
                } else if (this.y < stage.mouseY - 10) {
                    this.y += this._dx;
                }
            } else {//make the player unable to move beyon the screen
                this.y = 399;
            }
        }
    }
}  
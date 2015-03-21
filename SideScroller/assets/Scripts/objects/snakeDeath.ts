module objects {

    export class SnakeDeath extends createjs.Sprite {

        //instanced variables///////////////////////////////////////////////////////////////////////
        public width: number;
        public height: number;

        //constructor////////////////////////////////////////////////////////////////////////////////
        constructor() {

            super(
                new createjs.SpriteSheet({
                    images: [assetLoader.getResult("snake")],
                    frames: { width: 40, height: 70 },

                    animations: {
                        die: {
                            frames: [0, 3, 4, 5, 6, 7],
                            speed: 0.025
                        }
                    }
                }), "die");

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.x = 225;
            this.y = finalAvaterY;
        }
    }
}  
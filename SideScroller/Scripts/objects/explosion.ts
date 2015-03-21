module objects {

    export class Explosion extends createjs.Sprite {

        public width: number;
        public height: number;

        //constructor////////////////////////////////////////////////////////////////////////////////
        constructor() {

            //create the explosion animation
            super(
                new createjs.SpriteSheet({
                    images: [assetLoader.getResult("explosionSprite")],
                    frames: { width: 40, height: 40 },

                    animations: {
                        explosion: {
                            frames: [0, 1, 2, 3],
                            speed: 0.04
                        }
                    }
                }), "explosion");

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            //place it in a random y pos near the tank
            this.x = Math.floor((Math.random() * 100) + 20); 
            this.y = Math.floor(Math.random() * constants.SCREEN_HEIGHT);
        }
    }
}   
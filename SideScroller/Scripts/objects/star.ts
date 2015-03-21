module objects {

    export class Star extends createjs.Bitmap {

        //constructor////////////////////////////////////////////////////////////////////////////////
        constructor(starNumber: number) {

            super(assetLoader.getResult("star"));

            this.x = 136 + (25 * starNumber);
            this.y = 462;
        }
    }
}   
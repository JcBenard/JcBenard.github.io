module objects {

    export class InfoBar extends createjs.Bitmap {

        //constructor////////////////////////////////////////////////////////////////////////////////
        constructor() {

            super(assetLoader.getResult("info"));

            this.y = 440;
        }

        //public methods/////////////////////////////////////////////////////////////////////////////
        public update(score: number) {

        }

        private _reset() {

        }
    }
}   
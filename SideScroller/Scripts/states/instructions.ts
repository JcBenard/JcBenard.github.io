/// <reference path="../constants.ts" />
/// <reference path="../objects/button.ts" />

module states {
    export class Instructions {

        //public instanced varaibles///////////////////////////////////////////////////////////
        public game: createjs.Container;
        public background: createjs.Bitmap;
        public startButton: objects.Button;
        public instructionsButton: objects.Button;

        //constructor////////////////////////////////////////////////////////////////////////
        constructor() {
            this.game = new createjs.Container();

            //create and add the background to the game
            this.background = new createjs.Bitmap(assetLoader.getResult("instructionsBackground"));
            this.game.addChild(this.background);

            //create and add the start button to the game
            this.startButton = new objects.Button("startButton", constants.SCRREN_CENTER_WIDTH, 440);
            this.game.addChild(this.startButton);
            //create a listner for on click for the start button
            this.startButton.on("click", this.startButtonClicked, this);

            stage.addChild(this.game);

        }

        //public methods///////////////////////////////////////////////////////////////
        //update function here just because the game runs an update based on the states
        public update() {

        }
        
        //private methods////////////////////////////////////////////////////////////
        //if they click the start button
        private startButtonClicked() {
            //clear the game then change the state to play
            this.game.removeAllChildren();
            stage.removeChild(this.game);
            currentState = constants.PLAY_STATE;
            stateChanged = true;
        }
    }
} 
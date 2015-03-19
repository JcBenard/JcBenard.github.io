module objects {

    export class Shell extends GameObject {

        //constructor////////////////////////////////////////////////////////////////////////////////
        constructor() {

            super("shell");

            this._dx = 4;
            this._dy = 0;
            this.soundString = "explosion";
            this.name = "shell";
            this.x = 800;
            this.y = 800;
        }

        //public methods/////////////////////////////////////////////////////////////////////////////
        public update() {
            this.x += this._dx;
            this.y += this._dy;

            if (this.y >= 440) {
                this.y = constants.SCREEN_HEIGHT;
            }
        }

        public reset(tankY: number, tankRot: number) {

            this.x = 100 ;
            this.y = tank.y + tankRot;
            this._dy = tankRot / 10;

            this.rotation = tankRot;
        }
    }
}  
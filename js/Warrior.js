const ROUNDSPEED_DECAY_MULT = 0.97;
const DRIVE_POWER = 0.05;
const REVERSE_POWER = 0.02;
const TURN_RATE = 0.01;
const MIN_TURN_SPEED = 0.05;

function warriorClass() {
    this.x = 0;
    this.y = 0;

    this.moveWarriorWest = false;
    this.moveWarriorNorth = false;
    this.moveWarriorEast = false;
    this.moveWarriorSouth = false;

    this.setupControls = function (north, east, south, west) {
        this.northKey = north;
        this.southKey = south;
        this.westKey = west;
        this.eastKey = east;
    }

    this.move = function () {
        if (Math.abs(this.speed) > MIN_TURN_SPEED) {
            if (this.moveWest) this.moveWarriorWest();
            if (this.moveEast) this.moveWarriorEast();
        }

        if (this.moveNorth) this.moveWarriorNorth();
        if (this.moveSouth) this.moveWarriorSouth();

        var nextX = this.x + Math.cos(this.angle) * this.speed;
        var nextY = this.y + Math.sin(this.angle) * this.speed;
        var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);

        switch (drivingIntoTileType) {
            case TRACK_ROAD:
                this.x = nextX;
                this.y = nextY;
                break;
            case TRACK_GOAL:
                document.getElementById("debugText").innerHTML =
                    this.myName + " hit the goal line";
                this.reset();
                break;
            case TRACK_WALL:
            default:
                this.speed = 0;
        }

        this.speed *= ROUNDSPEED_DECAY_MULT;
    }
    this.init = function (whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.reset();
    }

    this.reset = function () {
        this.speed = 0;
        this.angle = -0.5 * Math.PI;

        if (this.homeX == undefined) {
            for (var i = 0; i < trackGrid.length; i++) {
                if (trackGrid[i] == TRACK_PLAYER) {
                    var tileRow = Math.floor(i / TRACK_COLUMNS);
                    var tileCol = i % TRACK_COLUMNS;
                    this.homeX = tileCol * TRACK_WIDTH + 0.5 * TRACK_WIDTH;
                    this.homeY = tileRow * TRACK_HEIGHT + 0.5 * TRACK_HEIGHT;
                    trackGrid[i] = TRACK_ROAD;
                    break;
                }
            }
        }

        this.x = this.homeX;
        this.y = this.homeY;
    }

    this.draw = function () {
        drawImageCenteredAtCoordWithRotation(this.myBitmap,
            this.x, this.y, this.angle);
    }

    this.moveWarriorWest = function () {
        this.angle -= TURN_RATE * Math.PI;
    }

    this.moveWarriorNorth = function () {
        this.speed += DRIVE_POWER;
    }

    this.moveWarriorEast = function () {
        this.angle += TURN_RATE * Math.PI;
    }

    this.moveWarriorSouth = function () {
        this.speed -= REVERSE_POWER;
    }

} // end of class definition
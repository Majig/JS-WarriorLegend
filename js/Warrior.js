const PLAYER_MOVE_SPEED = 1.0;

function warriorClass() {
    this.x = 0;
    this.y = 0;

    this.moveNorth = false;
    this.moveEast = false;
    this.moveSouth = false;
    this.moveWest = false;

    this.setupControls = function (north, east, south, west) {
        this.northKey = north;
        this.eastKey = east;
        this.southKey = south;
        this.westKey = west;
    }

    this.move = function () {
        var nextX = this.x;
        var nextY = this.y;

        if (this.moveNorth) {
            nextY -= PLAYER_MOVE_SPEED;
        }
        
        if (this.moveEast) {
            nextX += PLAYER_MOVE_SPEED;
        }

        if (this.moveSouth) {
            nextY += PLAYER_MOVE_SPEED;
        }

        if (this.moveWest) {
            nextX -= PLAYER_MOVE_SPEED;
        }

        var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
        var walkIntoTileType = TILE_WALL;   // assume warrior is walking into a wall

        if (walkIntoTileIndex != undefined) {
            walkIntoTileType = roomGrid[walkIntoTileIndex]; // corrects assumption if needed
        }

        switch (walkIntoTileType) {
            case TILE_GROUND:
                this.x = nextX;
                this.y = nextY;
                break;
            case TILE_GOAL:
                document.getElementById("debugText").innerHTML = this.myName + " won";
                this.reset();
                break;
            case TILE_KEY:
                this.keysHeld++;
                document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                roomGrid[walkIntoTileIndex] = TILE_GROUND;
                break;
            case TILE_DOOR:
                if (this.keysHeld > 0) {
                    this.keysHeld--;
                    document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
                    roomGrid[walkIntoTileIndex] = TILE_GROUND;
                }
                break;
            case TILE_WALL:
            default:
                this.speed = 0;
                break;
        }
    }

    this.init = function (whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.reset();
    }

    this.reset = function () {
        this.speed = 0;
        this.keysHeld = 0;

        if (this.homeX == undefined) {
            for (var i = 0; i < roomGrid.length; i++) {
                if (roomGrid[i] == TILE_PLAYER) {
                    var tileRow = Math.floor(i / ROOM_COLUMNS);
                    var tileCol = i % ROOM_COLUMNS;
                    this.homeX = tileCol * TILE_WIDTH + 0.5 * TILE_WIDTH;
                    this.homeY = tileRow * TILE_HEIGHT + 0.5 * TILE_HEIGHT;
                    roomGrid[i] = TILE_GROUND;
                    break;
                }
            }
        }

        this.x = this.homeX;
        this.y = this.homeY;
    }

    this.draw = function () {
        drawImageCenteredAtCoordWithRotation(this.myBitmap,
            this.x, this.y, 0.0);
    }

} // end of class definition
const ROOM_COLUMNS = 16;
const ROOM_ROWS = 12;

var roomGrid =
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
        1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
        1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1,
        1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
        1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


const TILE_WIDTH = 50;
const TILE_HEIGHT = 50;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;

function tileTypeHasTransparency(checkTileType) {
    return (checkTileType == TILE_GOAL ||
        checkTileType == TILE_KEY ||
        checkTileType == TILE_DOOR);
}

function drawRoom() {
    var tileIndex = 0;
    var tileLeftEdgeX = 0;
    var tileTopEdgeY = 0;
    for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
        tileLeftEdgeX = 0;

        for (var eachColumn = 0; eachColumn < ROOM_COLUMNS; eachColumn++) {
            var tileTypeHere = roomGrid[tileIndex];
            if (tileTypeHasTransparency(tileTypeHere)) {
                canvasContext.drawImage(tilePics[TILE_GROUND], tileLeftEdgeX, tileTopEdgeY);
            }
            canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);

            tileIndex++;
            tileLeftEdgeX += TILE_WIDTH;;
        }   // end of column scan

        tileTopEdgeY += TILE_HEIGHT;
    }   // end of row scan
}


function getTileIndexAtPixelCoord(pixelX, pixelY) {
    var tileCol = Math.floor(pixelX / TILE_WIDTH);
    var tileRow = Math.floor(pixelY / TILE_HEIGHT);

    if (tileCol < 0 || tileCol >= ROOM_COLUMNS ||
        tileRow < 0 || tileRow >= ROOM_ROWS) {
        document.getElementById("debugText").innerHTML = "out of bounds:" + 
            pixelX + "," + pixelY;
        return undefined; // enable error handling
    }

    var tileIndex = roomTileToIndex(tileCol, tileRow);
    return tileIndex;
}

function roomTileToIndex(x, y) {
    return (x + ROOM_COLUMNS * y);
}
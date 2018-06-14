var tilePics = [];

var warriorPic = document.createElement("img");

var worldPicWall = document.createElement("img");
var worldPicGround = document.createElement("img");
var worldPicGoal = document.createElement("img");
var worldPicKey = document.createElement("img");
var worldPicDoor = document.createElement("img");

var picsToLoad = 0;

function loadImages () {
    beginLoadingImage(warriorPic, "warrior.png");

    loadImageForRoomCode(TILE_GROUND, "world_ground.png");
    loadImageForRoomCode(TILE_WALL, "world_wall.png");
    loadImageForRoomCode(TILE_GOAL, "world_goal.png");
    loadImageForRoomCode(TILE_KEY, "world_key.png");
    loadImageForRoomCode(TILE_DOOR, "world_door.png");
}

function beginLoadingImage(imgVar, fileName) {
    picsToLoad++;
    imgVar.onload = countLoadedImageAndLaunchIfReady();
    imgVar.src = "images/" + fileName;
}

function countLoadedImageAndLaunchIfReady() {
    picsToLoad--;

    if (picsToLoad == 0) {
        startGameAfterLoading();
    }
}

function loadImageForRoomCode(roomCode, fileName) {
    tilePics[roomCode] = document.createElement("img");
    beginLoadingImage(tilePics[roomCode], fileName);
}
var trackPics = [];

var playerPic = document.createElement("img");

var trackPickWall = document.createElement("img");
var trackPickRoad = document.createElement("img");
var trackPickGoal = document.createElement("img");
var trackPickTree = document.createElement("img");
var trackPickFlag = document.createElement("img");

var picsToLoad = 0;

function loadImages () {
    beginLoadingImage(playerPic, "player1.png");

    loadImageForTrackCode(TRACK_ROAD, "track_road.png");
    loadImageForTrackCode(TRACK_WALL, "track_wall.png");
    loadImageForTrackCode(TRACK_GOAL, "track_goal.png");
    loadImageForTrackCode(TRACK_TREE, "track_treeWall.png");
    loadImageForTrackCode(TRACK_FLAG, "track_flagWall.png");
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

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}
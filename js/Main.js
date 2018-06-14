var canvas;
var canvasContext;

const FPS = 30;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BACKGROUND_COLOR = "black";

var gameOver = false;
var playerName = "Warrior";

var warrior = new warriorClass();

window.onload = function () {
    canvas = document.getElementById("game");
    canvasContext = canvas.getContext("2d");

    loadImages();

    canvasContext.textAlign = "center";

    initInput();
    warrior.init(warriorPic, playerName);
}

function startGameAfterLoading() {
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, FPS);
}

function moveEverything() {
    if (gameOver) {
        return;
    }

    warrior.move();
}

function drawEverything() {
    if (gameOver) {
        // todo halt game and add function
    } else {
        drawRoom();
        warrior.draw();
    }
}
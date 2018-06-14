const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

const W_KEY = 87;
const A_KEY = 65;
const S_KEY = 83;
const D_KEY = 68;

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    warrior.setupControls(W_KEY, D_KEY, S_KEY, A_KEY);
}

function keyPressed(e) {
    // document.getElementById("debugText").innerHTML = "KeyCode pushed: " + e.keyCode;
    setKeyHoldState(e.keyCode, warrior, true);
    e.preventDefault();
}

function keyReleased(e) {
    // document.getElementById("debugText").innerHTML = "KeyCode released: " + e.keyCode;
    setKeyHoldState(e.keyCode, warrior, false);
    e.preventDefault();
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
    if (thisKey == thisPlayer.northKey) {
        thisPlayer.moveNorth = setTo;
    }
    if (thisKey == thisPlayer.eastKey) {
        thisPlayer.moveEast = setTo;
    }
    if (thisKey == thisPlayer.southKey) {
        thisPlayer.moveSouth = setTo;
    }
    if (thisKey == thisPlayer.westKey) {
        thisPlayer.moveWest = setTo;
    }
}

// test-function for click-listener
function mouseClicked(e) {
    console.log("click noticed");
}

// returns calculateMousePos.x and calculateMousePos.y values
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    // account for the marings, canvas position on page, scroll amount, etc.
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}
function drawImageCenteredAtCoordWithRotation(image, x, y, angle) {
    canvasContext.save(); // allows to undo movement and rotate spin
    canvasContext.translate(x, y); // sets the point where graphic will go
    canvasContext.rotate(angle);    // sets the rotation
    canvasContext.drawImage(image, -image.width / 2, -image.height / 2);  // center, draw
    canvasContext.restore(); // undo the translation movement and rotation since save()
}

function colorRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}
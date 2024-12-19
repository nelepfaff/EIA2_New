"use strict";
function random(min, max) {
    return Math.random() * (max - min) + min;
}
function randomColor() {
    const r = Math.floor(random(0, 255));
    const g = Math.floor(random(0, 255));
    const b = Math.floor(random(0, 255));
    return `rgb(${r},${g},${b})`;
}
function createGradient(crc2, width, height) {
    const gradient = crc2.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, randomColor());
    gradient.addColorStop(0.5, randomColor());
    gradient.addColorStop(1, randomColor());
    return gradient;
}
function drawRandomShapes(crc2, width, height) {
    const shapes = Math.floor(random(5, 15));
    for (let i = 0; i < shapes; i++) {
        crc2.save();
        // Random transformation
        crc2.translate(random(0, width), random(0, height));
        crc2.rotate(random(0, Math.PI * 2));
        crc2.scale(random(0.5, 1.5), random(0.5, 1.5));
        // Random shape type
        const shapeType = Math.floor(random(0, 3));
        switch (shapeType) {
            case 0: // Circle
                crc2.beginPath();
                crc2.arc(0, 0, random(20, 100), 0, Math.PI * 2);
                crc2.fillStyle = randomColor();
                crc2.fill();
                break;
            case 1: // Rectangle
                crc2.fillStyle = createGradient(crc2, width, height);
                crc2.fillRect(-50, -50, random(50, 200), random(50, 200));
                break;
            case 2: // Line
                crc2.strokeStyle = randomColor();
                crc2.lineWidth = random(1, 5);
                crc2.beginPath();
                crc2.moveTo(-50, -50);
                crc2.lineTo(random(50, 200), random(50, 200));
                crc2.stroke();
                break;
        }
        crc2.restore();
    }
}
function drawPattern(crc2, width, height) {
    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d");
    if (patternCtx) {
        patternCanvas.width = 40;
        patternCanvas.height = 40;
        patternCtx.fillStyle = "#faf";
        patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        patternCtx.strokeStyle = "#333";
        patternCtx.beginPath();
        patternCtx.moveTo(0, 20);
        patternCtx.lineTo(20, 0);
        patternCtx.lineTo(40, 20);
        patternCtx.lineTo(20, 40);
        patternCtx.closePath();
        patternCtx.stroke();
        const pattern = crc2.createPattern(patternCanvas, "repeat");
        crc2.fillStyle = pattern;
        crc2.fillRect(0, height / 2, width, height / 2);
    }
}
function drawScene() {
    const canvas = document.getElementById("artCanvas");
    const crc2 = canvas.getContext("2d");
    if (!crc2)
        return;
    // Set canvas dimensions
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    const { width, height } = canvas;
    // Background
    crc2.fillStyle = randomColor();
    crc2.fillRect(0, 0, width, height);
    // Save and restore state for transformations
    crc2.save();
    drawRandomShapes(crc2, width, height);
    crc2.restore();
    // Add a pattern
    drawPattern(crc2, width, height);
    // Add random text
    crc2.fillStyle = randomColor();
    crc2.font = `${Math.floor(random(20, 50))}px Arial`;
    crc2.fillText("Generative Art", random(50, width - 200), random(50, height - 50));
}
document.addEventListener("DOMContentLoaded", drawScene);
//# sourceMappingURL=canva.js.map
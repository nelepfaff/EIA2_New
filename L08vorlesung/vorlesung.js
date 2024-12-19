"use strict";
window.addEventListener("load", draw);
function draw() {
    // Select the canvas element from the HTML
    const canvas = document.getElementById("myCanvas");
    // Get the 2D rendering context
    const crc2 = canvas.getContext("2d");
    if (crc2) {
        // Create a linear gradient
        const gradient = crc2.createLinearGradient(0, 0, 0, 100);
        // Add color stops to the gradient
        gradient.addColorStop(0, "black"); // Start with black
        gradient.addColorStop(0.5, "red"); // Transition to red at 50%
        gradient.addColorStop(1, "gold"); // End with gold
        // Set the gradient as the fill style
        crc2.fillStyle = gradient;
        // Draw a rectangle filled with the gradient
        crc2.fillRect(0, 0, 200, 100);
    }
}
//# sourceMappingURL=vorlesung.js.map
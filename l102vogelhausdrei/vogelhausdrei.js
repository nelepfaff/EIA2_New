"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    const crc2 = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    let background;
    const objects = [];
    const numSnowflakes = 50;
    const numBirds = 15;
    // *** Superklasse ***
    class MovingObject {
        x;
        y;
        speedX;
        speedY;
        constructor(x, y, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.speedX = speedX;
            this.speedY = speedY;
        }
        move() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width)
                this.x = 0;
            if (this.x < 0)
                this.x = canvas.width;
            if (this.y > canvas.height)
                this.y = 0;
            if (this.y < 0)
                this.y = canvas.height;
        }
    }
    // *** Subklassen ***
    class Snowflake extends MovingObject {
        size;
        constructor() {
            super(Math.random() * canvas.width, Math.random() * canvas.height, 0, Math.random() * 1.5 + 0.5);
            this.size = Math.random() * 3 + 2;
        }
        draw() {
            crc2.beginPath();
            crc2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            crc2.fillStyle = "white";
            crc2.fill();
        }
    }
    class Bird extends MovingObject {
        size;
        color;
        constructor() {
            super(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3 - 1.5, Math.random() * 2 - 1);
            this.size = Math.random() * 10 + 10;
            this.color = Bird.getRandomColor();
        }
        static getRandomColor() {
            const colors = ["red", "blue", "yellow", "green", "orange"];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        draw() {
            crc2.save();
            crc2.translate(this.x, this.y);
            // Körper
            crc2.fillStyle = this.color;
            crc2.beginPath();
            crc2.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            crc2.fill();
            // Flügel
            crc2.beginPath();
            crc2.moveTo(-this.size / 2, 0);
            crc2.lineTo(-this.size, -this.size / 2);
            crc2.lineTo(-this.size / 2, this.size / 2);
            crc2.closePath();
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.restore();
        }
    }
    // *** Initialisierung ***
    function init() {
        drawBackground();
        background = crc2.getImageData(0, 0, canvas.width, canvas.height);
        // Objekte hinzufügen
        for (let i = 0; i < numSnowflakes; i++) {
            objects.push(new Snowflake());
        }
        for (let i = 0; i < numBirds; i++) {
            objects.push(new Bird());
        }
        animate();
    }
    // Hintergrund zeichnen
    function drawBackground() {
        const gradient = crc2.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#87CEEB");
        gradient.addColorStop(1, "#FFFFFF");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        // Sonne
        crc2.beginPath();
        crc2.arc(100, 100, 50, 0, Math.PI * 2);
        crc2.fillStyle = "#FFD700";
        crc2.fill();
        // Wolken
        drawCloud(200, 150, 1.5);
        drawCloud(400, 100, 1.2);
        drawCloud(600, 120, 1.8);
        // Berge
        drawMountain(100, canvas.height, 300, 200);
        drawMountain(400, canvas.height, 250, 300);
        drawMountain(700, canvas.height, 400, 300);
        // Bäume
        drawTree(200, canvas.height - 150, 150);
        drawTree(500, canvas.height - 100, 200);
    }
    function drawCloud(x, y, scale) {
        crc2.save();
        crc2.translate(x, y);
        crc2.scale(scale, scale);
        crc2.beginPath();
        crc2.arc(0, 0, 30, 0, Math.PI * 2);
        crc2.arc(-40, 0, 25, 0, Math.PI * 2);
        crc2.arc(40, 0, 25, 0, Math.PI * 2);
        crc2.fillStyle = "white";
        crc2.fill();
        crc2.restore();
    }
    function drawMountain(x, y, width, height) {
        crc2.beginPath();
        crc2.moveTo(x, y);
        crc2.lineTo(x + width / 2, y - height);
        crc2.lineTo(x + width, y);
        crc2.closePath();
        crc2.fillStyle = "#A9A9A9";
        crc2.fill();
    }
    function drawTree(x, y, height) {
        crc2.save();
        crc2.translate(x, y);
        crc2.fillStyle = "#8B4513";
        crc2.fillRect(-10, 0, 20, height);
        crc2.beginPath();
        crc2.moveTo(-40, 0);
        crc2.lineTo(0, -height);
        crc2.lineTo(40, 0);
        crc2.closePath();
        crc2.fillStyle = "green";
        crc2.fill();
        crc2.restore();
    }
    // *** Animation ***
    function animate() {
        crc2.putImageData(background, 0, 0);
        objects.forEach((object) => {
            object.move();
            object.draw();
        });
        requestAnimationFrame(animate);
    }
    // Start
    init();
});
//# sourceMappingURL=vogelhausdrei.js.map
let canvas: HTMLCanvasElement;
let crc2: CanvasRenderingContext2D;

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("canvas")!;
    crc2 = canvas.getContext("2d")!;

    // Setze Canvas-Größe
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;


    // Szene zeichnen
    drawScene();

});



    // *** Zeichenfunktionen ***

    // Hintergrund mit Himmel
    function drawBackground() {
        const gradient = crc2.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#87CEEB"); // Himmelblau
        gradient.addColorStop(1, "#FFFFFF"); // Schneeweiß
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Sonne
    function drawSun(x: number, y: number, radius: number) {
        crc2.beginPath();
        crc2.arc(x, y, radius, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fillStyle = "#FFD700"; // Gelb
        crc2.fill();
    }

    // Wolken
    function drawCloud(x: number, y: number, scale: number) {
        crc2.save();
        crc2.translate(x, y);
        crc2.scale(scale, scale);

        crc2.beginPath();
        crc2.arc(0, 0, 30, 0, Math.PI * 2); // Mittlere Kugel
        crc2.arc(-40, 0, 25, 0, Math.PI * 2); // Linke Kugel
        crc2.arc(40, 0, 25, 0, Math.PI * 2);

        crc2.fillStyle = "white";
        crc2.fill();
        crc2.restore();
    }

    // Berge
    function drawMountain(x: number, y: number, width: number, height: number) {
        crc2.beginPath();
        crc2.moveTo(x, y);
        crc2.lineTo(x + width / 2, y - height);
        crc2.lineTo(x + width, y);
        crc2.closePath();
        crc2.fillStyle = "#A9A9A9"; // Grau
        crc2.fill();
    }

    // Baum
    function drawTree(x: number, y: number, treeHeight: number) {
        crc2.save();
        crc2.translate(x, y);

        // Stamm
        crc2.fillStyle = "#8B4513";
        crc2.fillRect(-10, 0, 20, treeHeight);

        // Blätter
        crc2.beginPath();
        crc2.moveTo(-50, 0);
        crc2.lineTo(0, -treeHeight);
        crc2.lineTo(50, 0);
        crc2.closePath();
        crc2.fillStyle = "green";
        crc2.fill();

        crc2.restore();
    }

    // Schneemann
    function drawSnowman(x: number, y: number) {
        crc2.save();
        crc2.translate(x, y);

        // Körper
        crc2.fillStyle = "white";
        crc2.beginPath();
        crc2.arc(0, 40, 30, 0, Math.PI * 2); // Unterkörper
        crc2.arc(0, 0, 20, 0, Math.PI * 2); // Oberkörper
        crc2.arc(0, -30, 10, 0, Math.PI * 2); // Kopf
        crc2.fill();

        // Augen
        crc2.fillStyle = "black";
        crc2.beginPath();
        crc2.arc(-5, -35, 2, 0, Math.PI * 2); // Linkes Auge
        crc2.arc(5, -35, 2, 0, Math.PI * 2); // Rechtes Auge
        crc2.fill();

        // Nase
        crc2.fillStyle = "orange";
        crc2.beginPath();
        crc2.moveTo(0, -30);
        crc2.lineTo(10, -28);
        crc2.lineTo(0, -32);
        crc2.closePath();
        crc2.fill();

        crc2.restore();
    }

    // Vogelhäuschen
    function drawBirdhouse(x: number, y: number) {
        crc2.save();
        crc2.translate(x, y);

        // Häuschen
        crc2.fillStyle = "#8B4513";
        crc2.fillRect(-15, 0, 30, 40);

        // Eingang
        crc2.fillStyle = "black";
        crc2.beginPath();
        crc2.arc(0, 20, 5, 0, Math.PI * 2);
        crc2.fill();

        // Dach
        crc2.fillStyle = "#A0522D";
        crc2.beginPath();
        crc2.moveTo(-20, 0);
        crc2.lineTo(0, -20);
        crc2.lineTo(20, 0);
        crc2.closePath();
        crc2.fill();

        crc2.restore();
    }

    // Vogel
    function drawBird(x: number, y: number, size: number, color: string) {
        crc2.save();
        crc2.translate(x, y);

        // Körper
        crc2.fillStyle = color;
        crc2.beginPath();
        crc2.ellipse(0, 0, size, size / 2, 0, 0, Math.PI * 2);
        crc2.fill();

        // Flügel
        crc2.beginPath();
        crc2.moveTo(-size / 2, 0);
        crc2.lineTo(-size, -size / 2);
        crc2.lineTo(-size / 2, size / 2);
        crc2.closePath();
        crc2.fillStyle = color;
        crc2.fill();

        // Kopf
        crc2.beginPath();
        crc2.arc(size, -size / 3, size / 3, 0, Math.PI * 2);
        crc2.fill();

        // Schnabel
        crc2.fillStyle = "orange";
        crc2.beginPath();
        crc2.moveTo(size + size / 3, -size / 3);
        crc2.lineTo(size + size / 2, -size / 3);
        crc2.lineTo(size + size / 3, -size / 4);
        crc2.closePath();
        crc2.fill();

        crc2.restore();
    }

    // Schneeflocke
    function drawSnowflake(x: number, y: number) {
        crc2.beginPath();
        crc2.arc(x, y, 2, 0, Math.PI * 2);
        crc2.fillStyle = "white";
        crc2.fill();
    }

    // *** Szene erstellen ***
    function drawScene() {
        // Hintergrund
        drawBackground();

        // Sonne
        drawSun(100, 100, 50);

        // Berge
        drawMountain(150, canvas.height, 300, 200);
        drawMountain(450, canvas.height, 400, 250);

        // Bäume mit Vogelhaus
        drawTree(200, canvas.height - 150, 150);
        drawBirdhouse(200, canvas.height - 280);

        // Schneemann unten
        drawSnowman(400, canvas.height - 80);

        // Vögel
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height / 2 + canvas.height / 2;
            const size = Math.random() * 10 + 5;
            const colors = ["red", "blue", "yellow", "green"];
            const color = colors[Math.floor(Math.random() * colors.length)];
            drawBird(x, y, size, color);
        }

        // Wolken
        for (let i = 0; i < 3; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height / 3;
            drawCloud(x, y, Math.random() + 0.5);
        }

        // Schneeflocken
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            drawSnowflake(x, y);
        }
    }

``


document.addEventListener("DOMContentLoaded", () => {
    const canvas: HTMLCanvasElement = document.querySelector("canvas")!;
    const crc2: CanvasRenderingContext2D = canvas.getContext("2d")!;

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;

    let background: ImageData;
    const birds: Bird[] = [];
    const snowflakes: Snowflake[] = [];
    const numBirds = 10;
    const numSnowflakes = 50;

    // *** Klassen ***

    class Snowflake {
        x: number;
        y: number;
        size: number;
        speed: number;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 2 + 1;
        }

        update(): void {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            this.draw();
        }

       draw(): void {
            crc2.beginPath();
            crc2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            crc2.fillStyle = "white";
            crc2.fill();
        }
    }

    class Bird {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        color: string;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 2 - 1;
            this.color = this.getRandomColor();
        }

        update(): void {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;

            this.draw();
        }

        draw(): void {
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

        private getRandomColor(): string {
            const colors = ["red", "blue", "yellow", "green", "orange"];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }

    // *** Initialisierung ***
    function init(): void {
        drawBackground();
        background = crc2.getImageData(0, 0, canvas.width, canvas.height);

        // Schneeflocken
        for (let i = 0; i < numSnowflakes; i++) {
            snowflakes.push(new Snowflake());
        }

        // Vögel
        for (let i = 0; i < numBirds; i++) {
            birds.push(new Bird());
        }

        animate();
    }

    // Hintergrund zeichnen
    function drawBackground(): void {
        // Himmel
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

        // Schneemann
        drawSnowman(300, canvas.height - 80);

        // Vogelhaus
        crc2.fillStyle = "#8B4513";
        crc2.fillRect(canvas.width / 2 - 50, canvas.height - 200, 100, 150);

        // Dach des Vogelhauses
        crc2.fillStyle = "#A0522D";
        crc2.beginPath();
        crc2.moveTo(canvas.width / 2 - 60, canvas.height - 200);
        crc2.lineTo(canvas.width / 2, canvas.height - 250);
        crc2.lineTo(canvas.width / 2 + 60, canvas.height - 200);
        crc2.closePath();
        crc2.fill();
    }

    // *** Wolke zeichnen ***
    function drawCloud(x: number, y: number, scale: number): void {
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

    // *** Berg zeichnen ***
    function drawMountain(x: number, y: number, width: number, height: number): void {
        crc2.beginPath();
        crc2.moveTo(x, y);
        crc2.lineTo(x + width / 2, y - height);
        crc2.lineTo(x + width, y);
        crc2.closePath();
        crc2.fillStyle = "#A9A9A9";
        crc2.fill();
    }

    // *** Baum zeichnen ***
    function drawTree(x: number, y: number, height: number): void {
        crc2.save();
        crc2.translate(x, y);

        // Stamm
        crc2.fillStyle = "#8B4513";
        crc2.fillRect(-10, 0, 20, height);

        // Blätter
        crc2.beginPath();
        crc2.moveTo(-40, 0);
        crc2.lineTo(0, -height);
        crc2.lineTo(40, 0);
        crc2.closePath();
        crc2.fillStyle = "green";
        crc2.fill();

        crc2.restore();
    }

    // *** Schneemann zeichnen ***
    function drawSnowman(x: number, y: number): void {
        crc2.save();
        crc2.translate(x, y);

        // Unterkörper
        crc2.fillStyle = "white";
        crc2.beginPath();
        crc2.arc(0, 40, 30, 0, Math.PI * 2);
        crc2.fill();

        // Oberkörper
        crc2.beginPath();
        crc2.arc(0, 10, 20, 0, Math.PI * 2);
        crc2.fill();

        // Kopf
        crc2.beginPath();
        crc2.arc(0, -20, 10, 0, Math.PI * 2);
        crc2.fill();

        // Augen
        crc2.fillStyle = "black";
        crc2.beginPath();
        crc2.arc(-3, -22, 2, 0, Math.PI * 2);
        crc2.arc(3, -22, 2, 0, Math.PI * 2);
        crc2.fill();

        // Nase
        crc2.fillStyle = "orange";
        crc2.beginPath();
        crc2.moveTo(0, -20);
        crc2.lineTo(8, -18);
        crc2.lineTo(0, -18);
        crc2.closePath();
        crc2.fill();

        crc2.restore();
    }

    // *** Animation ***
    function animate(): void {
        crc2.putImageData(background, 0, 0); // Hintergrund wiederherstellen

        // Objekte aktualisieren
        snowflakes.forEach((snowflake) => snowflake.update());
        birds.forEach((bird) => bird.update());

        requestAnimationFrame(animate);
    }

    // *** Start ***
    init();
});
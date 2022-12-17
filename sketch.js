let width;
let audio;
let img;
let frame = 0;
let height = 600;
let initialPlay = true;
let snowflakes = [];

const SNOW_THRESHOLD = 50;

function preload() {
    img = loadImage('static/hands.png');
}


function setup() {
    width = document.getElementById('canvasbox').offsetWidth;
    audio = document.getElementById("song");
    audio.currentTime = 41;
    createCanvas(width, height);

    // prevent keyboard from scrolling
    window.addEventListener("keydown", function(e) {
        if(["Space", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    systems = [];
}

function draw() {
    background("#bedfea");
    imageMode(CENTER);
    image(img, width / 2, height / 2 - 100);
    let t = frameCount / 60; // update time

    if (snowflakes.length > SNOW_THRESHOLD) {
        snowflakes.push(new Snowflake());
    } else if (snowflakes.length === 0) {
        textAlign(CENTER);
        textSize(32);
        text("初恋", width / 2, height / 4);
    }

    for (let flake of snowflakes) {
        flake.update(t);
        flake.display();
    }
}

class Snowflake {
    constructor() {
        this.posX = 0;
        this.posY = random(600, 0);
        this.initialangle = random(0, 2 * PI);
        this.size = random(2, 18);

        this.radius = sqrt(random(pow(width / 2, 2)));
    }

    update(time) {
        let w = 0.3; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        this.posY += pow(this.size, 0.5);

        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    }

    display = function () {
        ellipse(this.posX, this.posY, this.size);
    };
}

function mousePressed() {
    for (let i = 0; i < random(250); i++) {
        snowflakes.push(new Snowflake());
    }

    if (initialPlay) {
        audio.play();
        initialPlay = !initialPlay;
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        for (let i = 0; i < random(50); i++) {
            snowflakes.pop();
            console.log(snowflakes.length);
        }
    } else if (keyCode === RIGHT_ARROW) {
        for (let i = 0; i < random(250); i++) {
            snowflakes.push(new Snowflake());
        }
    } else if (keyCode === 32) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
}

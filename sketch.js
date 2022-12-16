let width;
let audio;
let img;
let frame = 0;
let height = 600;
let snowflakes = [];

function preload() {
    img = loadImage('static/hands.png');
}


function setup() {
    width = document.getElementById('canvasbox').offsetWidth;
    audio = document.getElementById("song");
    createCanvas(width, height);

    systems = [];
}

function draw() {
    background(51);
    background(0);
    imageMode(CENTER);
    image(img, width / 2, height / 2 - 100);
    let t = frameCount / 60; // update time

    if (snowflakes.length > 0) {
        snowflakes.push(new snowflake());
    } else {
        textAlign(CENTER);
        textSize(32);
        text("初恋", width / 2, height / 4);
    }
    
    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(); // draw snowflake
    }
}

function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(600, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function (time) {
        // x position follows a circle
        let w = 0.3; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += pow(this.size, 0.5);

        // delete snowflake if past end of screen
        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function () {
        ellipse(this.posX, this.posY, this.size);
    };
}

// function mousePressed() {
//     this.p = new ParticleSystem(createVector(mouseX, mouseY));
//     systems.push(p);
//     if (audio.paused) {
//         audio.play();
//     }
// }

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        for (let i = 0; i < random(50); i++) {
            snowflakes.pop();
            console.log(snowflakes.length);
        }
    } else if (keyCode === RIGHT_ARROW) {
        for (let i = 0; i < random(250); i++) {
            snowflakes.push(new snowflake()); 
        }
    } else if (keyCode === 32) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
}

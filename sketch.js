let systems;
let width;
let audio;
let frame = 0;
let height = 600;


function setup() {
    width = document.getElementById('canvasbox').offsetWidth;
    audio = document.getElementById("song");
    createCanvas(width, height);
    systems = [];
}

function draw() {
    // if (frame === 250 && systems.length > 0) {
    //     systems.pop();
    //     frame = 0;
    // }
    background(51);
    background(0);
    for (i = 0; i < systems.length; i++) {
        systems[i].run();
        systems[i].addParticle();
    }
    if (systems.length == 0) {
        // default loading screen
        fill(255);
        textAlign(CENTER);
        textSize(32);
        text("初恋", width / 2, height / 2);
    }
    frame += 1;
}

function getRandomPos() {
    const x = Math.floor(Math.random() * (width - 10 + 1) + 10);
    const y = Math.floor(Math.random() * (height - 10 + 1) + 10);
    return { x, y }
}

function mousePressed() {
    this.p = new ParticleSystem(createVector(mouseX, mouseY));
    systems.push(p);
    if (audio.paused) {
        audio.play();
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        console.log(systems.pop());
    } else if (keyCode === RIGHT_ARROW) {
        const { x, y } = getRandomPos();
        this.p = new ParticleSystem(createVector(x, y));
        systems.push(p);
        console.log(`Added particle at {${x}, ${y}}`);
    }
}

// A simple Particle class
let Particle = function (position) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.position = position.copy();
    this.lifespan = 220;
};

Particle.prototype.run = function () {
    this.update();
    this.display();
};

// Method to update position
Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function () {
    stroke(200, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
    if (this.lifespan < 0) {
        return true;
    } else {
        return false;
    }
};

let ParticleSystem = function (position) {
    this.lifespan = 1000;
    this.origin = position.copy();
    this.particles = [];
};

ParticleSystem.prototype.isDead = function () {
    return this.lifespan < 0;
}

ParticleSystem.prototype.addParticle = function () {
    p = new Particle(this.origin);
    this.particles.push(p);
};

ParticleSystem.prototype.run = function () {
    this.lifespan -= 2;
    for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }

};

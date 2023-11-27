startbtn.addEventListener('click', start);
resetbtn.addEventListener('click', reset);
stopbtn.addEventListener("click", animationStop);

let globalID;
let running = false;

let sun = new Celestialb("Sun", 100, new Vector(0, 0), new Vector(1, 1), "#FF0000", "#000000");
let earth = new Celestialb("Earth", 10, new Vector(-10, 30), new Vector(-1, 1), "#0000FF", "#000000");

let celestialbs = [sun, earth];

function initialisation(){
    canvas.appendChild(sun.svgobject);
    canvas.appendChild(earth.svgobject);
}

function simulation_step(){
    Celestialb.gravitational_effect(celestialbs);
    for (const celestialbody of celestialbs) {
        celestialbody.move();
    }    
}

function reset(){
    
}

//--------------------------------------------------

function update() {
    simulation_step();
    globalID = requestAnimationFrame(update);
}

function start(){
    initialisation();
    animationStart();
}

function animationStart() {
    if (!running) {
        globalID = requestAnimationFrame(update);
        running = true;
    }
}

function animationStop() {
    if (running) {
        cancelAnimationFrame(globalID);
        running = false;
    }
}
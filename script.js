startbtn.addEventListener('click', start);
resetbtn.addEventListener('click', reset);
stopbtn.addEventListener("click", animationStop);

let globalID;
let running = false;

let sun = new Celestialb("Sun", 500, new Vector(0, 0), new Vector(1, 1), "#FF0000", "#000000");
let earth = new Celestialb("Earth", 100, new Vector(-40, 35), new Vector(-1, 1), "#0000FF", "#000000");
let moon = new Celestialb("Moon", 10, new Vector(-30, 50), new Vector(-1, 1), "#00FF00", "#000000");

let latest_celestial_startpoz = [][Vector];
let celestialbs = [sun, earth, moon];

function initialisation(){
    canvas.appendChild(sun.svgobject);
    canvas.appendChild(earth.svgobject);
    canvas.appendChild(moon.svgobject);
    for (let i = 0; i < celestialbs.length; i++) {
        latest_celestial_startpoz.push(celestialbs[i].name);
        latest_celestial_startpoz[i][0] = celestialbs[i].p;
        latest_celestial_startpoz[i][1] = celestialbs[i].v;
    }
    console.log(latest_celestial_startpoz);
}

function simulation_step(){
    Celestialb.gravitational_effect(celestialbs);
    for (const celestialbody of celestialbs) {
        celestialbody.move();
    }
    //console.log(sun, earth);
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
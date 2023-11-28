startbtn.addEventListener('click', start);
resetbtn.addEventListener('click', reset);
stopbtn.addEventListener("click", animationStop);
canvas.addEventListener("mousedown", place_planet, false);

let globalID;
let running = false;

let milkyway = new Galaxy("Milkyway");
let sun = new Celestialb("Sun", 500, new Vector(0, 0), new Vector(1, 1), "#FF0000", "#000000", milkyway);
let earth = new Celestialb("Earth", 150, new Vector(-100, 30), new Vector(-1, 1), "#0000FF", "#000000", milkyway);
let moon = new Celestialb("Moon", 50, new Vector(-120, -45), new Vector(-1, -1), "#0000FF", "#000000", milkyway);

function initialisation(){
    canvas.appendChild(sun.svgobject);
    canvas.appendChild(earth.svgobject);
    canvas.appendChild(moon.svgobject);
}

function simulation_step(){
    Celestialb.gravitational_effect(milkyway.celestialbs);
    for (const celestialbody of milkyway.celestialbs) {
        celestialbody.move();
    }
}

function reset(){
    for (let i = 0; i < milkyway.celestialbs.length; i++) {
        milkyway.celestialbs[i].svgobject.setAttribute('cx', milkyway.celestialbs[i].starting_positions[0].x);
        milkyway.celestialbs[i].svgobject.setAttribute('cy', milkyway.celestialbs[i].starting_positions[0].y);
        milkyway.celestialbs[i].p.x = milkyway.celestialbs[i].starting_positions[0].x;
        milkyway.celestialbs[i].p.y = milkyway.celestialbs[i].starting_positions[0].y;
        milkyway.celestialbs[i].v.x = milkyway.celestialbs[i].starting_positions[1].x;
        milkyway.celestialbs[i].v.y = milkyway.celestialbs[i].starting_positions[1].y;
    }
}

function place_planet(evt) {
    let cursorpt = cursorPoint(evt);
    let p = new Vector(cursorpt.x, cursorpt.y);
    px.value = p.x;
    py.value = p.y;
    let v = new Vector(parseFloat(vx.value), parseFloat(vy.value));
    let tiny_planet = new Celestialb(planetname.value, parseFloat(mass.value), p, v, celestialb_incolor.value, celestialb_outcolor.value, milkyway);
    canvas.appendChild(tiny_planet.svgobject);
}
    
function cursorPoint(evt) {
    let pt = canvas.createSVGPoint();
    pt.x = evt.clientX; 
    pt.y = evt.clientY;    
    return pt.matrixTransform(canvas.getScreenCTM().inverse());
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
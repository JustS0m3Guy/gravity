startbtn.addEventListener('click', start);
resetbtn.addEventListener('click', reset);
stopbtn.addEventListener("click", animationStop);
masspointbtn.addEventListener("click", centerOfMassReset);
canvas.addEventListener("mousedown", placePlanet, false);
planetbtn.addEventListener("click", placePlanet);

let globalID;
let running = false;

let milkyway = new Galaxy("Milkyway");

function initialisation(){

}

function simulationStep(){
    Celestialb.gravitationalEffect(milkyway.celestialbs);
    for (const celestialbody of milkyway.celestialbs) {
        celestialbody.move();
    }
}

function reset(){
    for (const celestialbody of milkyway.celestialbs) {
        celestialbody.resetPoz();
    }
}

function centerOfMassReset() {
    let s = milkyway.centerofmass();
    console.log(s);
    milkyway.offset(Vector.reverse(s));

}

function placePlanet(evt) {
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
    simulationStep();
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
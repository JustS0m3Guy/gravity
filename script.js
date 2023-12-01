stopbtn.addEventListener("click", animationStop);
startbtn.addEventListener('click', start);
resetbtn.addEventListener('click', reset);
deletebtn.addEventListener("click", deletePlanets);
masspointbtn.addEventListener("click", centerOfMassReset);
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
    //centerOfMassReset();
}

function reset(){
    for (const celestialbody of milkyway.celestialbs) {
        celestialbody.setPoz();
        celestialbody.svgArrowUpdate();
    }
}

function deletePlanets(){
    canvas.innerHTML = "";
    milkyway.celestialbs = [];
}

function centerOfMassReset() {
    let s = milkyway.centerofmass();
    milkyway.offset(Vector.reverse(s));

}

canvas.addEventListener("mousedown", implementPlanetPoz, false);
canvas.addEventListener("mouseup", implementPanetSpeed, false);

let globalClickCount = 0;

let from = new Vector(0,0);
let to = new Vector(0,0);

function implementPlanetPoz(evt){
    let cursorpt = cursorPoint(evt);
    from = new Vector(cursorpt.x, cursorpt.y);
    px.value = from.x;
    py.value = from.y;
}
function implementPanetSpeed(evt){
    let cursorpt = cursorPoint(evt);
    to = new Vector(cursorpt.x, cursorpt.y);
    let v = Vector.subtract(to, from);
    v.devide(100);
    vx.value = v.x;
    vy.value = v.y;
}
function placePlanet() {
    let p = new Vector(parseFloat(px.value), parseFloat(py.value));
    let v = new Vector(parseFloat(vx.value), parseFloat(vy.value));
    let tiny_planet = new Celestialb(planetname.value, parseFloat(mass.value), p, v, celestialb_incolor.value, celestialb_outcolor.value, milkyway);
    canvas.appendChild(tiny_planet.svgobject);
    canvas.appendChild(tiny_planet.svgarrow);
    if(running){
        tiny_planet.svgarrow.classList.toggle('invisible');
    }
}
function cursorPoint(evt) {
    let pt = canvas.createSVGPoint();
    pt.x = evt.clientX; 
    pt.y = evt.clientY;    
    return pt.matrixTransform(canvas.getScreenCTM().inverse());
}

//------------------------------

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
        milkyway.arrowVisibilityToggle();
    }
}

function animationStop() {
    if (running) {
        cancelAnimationFrame(globalID);
        running = false;
        milkyway.arrowsUpdate();
        milkyway.arrowVisibilityToggle();
    }
}
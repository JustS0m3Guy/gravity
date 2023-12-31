stopbtn.addEventListener("click", animationStop);
startbtn.addEventListener('click', start);

let globalID;
let running = false;
let milkyway = new Galaxy("Milkyway");
/** /
let m1 = new Celestialb("m1", 100, new Vector(-97.000436, 24.308753), new Vector(0.4662036850, 0.4323657300), "#0000FF", "#0000FF", milkyway);
let m2 = new Celestialb("m2", 100, new Vector(0, 0), new Vector(-0.93240737, -0.86473146), "#00FF00", "#00FF00", milkyway);
let m3 = new Celestialb("m3", 100, new Vector(97.000436, -24.308753), new Vector(0.4662036850, 0.4323657300), "#FF0000", "#FF0000", milkyway);
canvas.appendChild(m1.svgobject);
canvas.appendChild(m1.svgarrow);
canvas.appendChild(m2.svgobject);
canvas.appendChild(m2.svgarrow);
canvas.appendChild(m3.svgobject);
canvas.appendChild(m3.svgarrow);
let m4 = new Celestialb("m4", 100, new Vector(-40, -10), new Vector(0, 0), "#FFFFFF", "#FFFFFF", milkyway);
canvas.appendChild(m4.svgobject);
canvas.appendChild(m4.svgarrow);
/**/
/**/
let sun = new Celestialb("Sun", 50000, new Vector(0, 0), new Vector(0, 0), "#FFEA00", "#FFEA00", milkyway);
let earth = new Celestialb("Earth", 50, new Vector(-1000, 0), new Vector(0, 7.5), "#5BCEFA", "#5BCEFA", milkyway);
let moon = new Celestialb("Moon", 1, new Vector(-1030, 0), new Vector(0, 8.75), "#444444", "#444444", milkyway);
canvas.appendChild(sun.svgobject);
canvas.appendChild(sun.svgarrow);
canvas.appendChild(earth.svgobject);
canvas.appendChild(earth.svgarrow);
canvas.appendChild(moon.svgobject);
canvas.appendChild(moon.svgarrow);
/**/
/** /
let sun = new Celestialb("Sun", 50, new Vector(0, 100), new Vector(0, -10), "#FFEA00", "#FFEA00", milkyway);
let earth = new Celestialb("Earth", 50, new Vector(0, -100), new Vector(0, 10), "#5BCEFA", "#5BCEFA", milkyway);
canvas.appendChild(sun.svgobject);
canvas.appendChild(sun.svgarrow);
canvas.appendChild(earth.svgobject);
canvas.appendChild(earth.svgarrow);
/**/

function initialisation(){

}

function simulationStep(){
    milkyway.colideInteraction();
    milkyway.gravitationalInteraction();
    milkyway.move();
    //centerOfGravityReset();
}

resetbtn.addEventListener('click', reset);

function reset(){
    milkyway.reset();
}

deletebtn.addEventListener("click", deleteAllPlanets);

function deleteAllPlanets(){
    milkyway.inactiveCelestialbs = [];
    milkyway.celestialbs = [];
    canvas.value = "";
}

masspointbtn.addEventListener("click", centerOfGravityReset);

function centerOfGravityReset() {
    let s = milkyway.centerOfGravityReset();
    milkyway.offset(Vector.reverse(s));
}

canvas.addEventListener("wheel", zoom);

function zoom(e){
    const zoomc = 1.1;
    if (e.deltaY < 0){
        canvas.setAttribute('viewBox', `${canvas.viewBox.animVal.x/zoomc} ${canvas.viewBox.animVal.y/zoomc} ${canvas.viewBox.animVal.width/zoomc} ${canvas.viewBox.animVal.height/zoomc}`);
    } else if (e.deltaY > 0){
        canvas.setAttribute('viewBox', `${canvas.viewBox.animVal.x*zoomc} ${canvas.viewBox.animVal.y*zoomc} ${canvas.viewBox.animVal.width*zoomc} ${canvas.viewBox.animVal.height*zoomc}`);
    }
}

canvas.addEventListener("mousedown", implementPlanetPoz, false);
canvas.addEventListener("mouseup", implementPanetSpeed, false);
planetbtn.addEventListener("click", placePlanet);

let nameNum = 4;
let massDeviation = 0.5;

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
    let tiny_planet = new Celestialb(planetname.value + nameNum, parseFloat(mass.value), p, v, celestialb_incolor.value, celestialb_outcolor.value, milkyway, true);
    if(running){
        tiny_planet.svgarrow.classList.toggle('invisible');
    }
    nameNum++;
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
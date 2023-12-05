stopbtn.addEventListener("click", animationStop);
startbtn.addEventListener('click', start);

let globalID;
let running = false;
let milkyway = new Galaxy("Milkyway");
/** /
let m1 = new Celestialb("m1", 100, new Vector(-97.000436, 24.308753), new Vector(0.4662036850, 0.4323657300), "#5BCEFA", "#5BCEFA", milkyway);
let m2 = new Celestialb("m2", 100, new Vector(0, 0), new Vector(-0.93240737, -0.86473146), "#F5A9B8", "#F5A9B8", milkyway);
let m3 = new Celestialb("m3", 100, new Vector(97.000436, -24.308753), new Vector(0.4662036850, 0.4323657300), "#FFFFFF", "#FFFFFF", milkyway);
canvas.appendChild(m1.svgobject);
canvas.appendChild(m1.svgarrow);
canvas.appendChild(m2.svgobject);
canvas.appendChild(m2.svgarrow);
canvas.appendChild(m3.svgobject);
canvas.appendChild(m3.svgarrow);
/**/
/** /
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
function initialisation(){

}

function simulationStep(){
    Celestialb.gravitationalEffect(milkyway.celestialbs);
    for (const celestialbody of milkyway.celestialbs) {
        celestialbody.move();
    }
    centerOfMassReset();
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


resetbtn.addEventListener('click', reset);

function reset(){
    for (const celestialbody of milkyway.celestialbs) {
        celestialbody.setPoz();
        celestialbody.svgArrowUpdate();
    }
}

deletebtn.addEventListener("click", deleteAllPlanets);

function deleteAllPlanets(){
    canvas.innerHTML = "";
    milkyway.celestialbs = [];
}

masspointbtn.addEventListener("click", centerOfMassReset);

function centerOfMassReset() {
    let s = milkyway.centerofmass();
    milkyway.offset(Vector.reverse(s));

}

canvas.addEventListener("mousedown", implementPlanetPoz, false);
canvas.addEventListener("mouseup", implementPanetSpeed, false);
planetbtn.addEventListener("click", placePlanet);

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
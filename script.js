circl.setAttribute('fill', 'teal');
startbtn.addEventListener('click', start);
resetbtn.addEventListener('click', reset);
stopbtn.addEventListener("click", animationStop);

let globalID;
let running = false;
let dxphi;
let dr;
let p;
let u;

function reset(){
    dphi = parseFloat(sx.value);
    dr = parseFloat(sy.value);
    circl.cx.baseVal.value=dr;
    circl.cy.baseVal.value=dphi;
}

function update() {
    // begin frame
    p.phi+=dphi;
    p.r+=dr;
    u = Vector.addition(p.to_cartesian(), new Vector(350, 150));

    circl.cx.baseVal.value=u.x;
    circl.cy.baseVal.value=u.y;

    // end frame
    globalID = requestAnimationFrame(update);
}

function start(){
    p = new PolarVector(0, 0);
    dphi = parseFloat(vx.value);
    dr = parseFloat(vy.value);
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
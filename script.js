circl.setAttribute('fill', 'teal');
startbutton.addEventListener('click', start);
resetbutton.addEventListener('click', reset);

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function reset(){
    let x = parseFloat(sx.value);
    let y = parseFloat(sy.value);
    circl.cx.baseVal.value=x;
    circl.cy.baseVal.value=y;
}

async function start(){
    let x = parseFloat(vx.value);
    let y = parseFloat(vy.value);

    for (let i = 0; i < 100; i++) {
        circl.cx.baseVal.value+=x;
        circl.cy.baseVal.value+=y;
        await sleep(100);
    }
}


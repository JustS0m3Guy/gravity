circl.setAtribute('fill', 'red');
startbutton.addEventListener('click', start);

function start(){
    for (let i = 0; i < 200; i++) {
        circl.cx.baseVal.value+=1;
    }
}
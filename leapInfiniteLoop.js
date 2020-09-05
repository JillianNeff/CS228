let controllerOptions = {};
let x = (window.innerWidth/2);
let y = (window.innerHeight/2);
let randomX = 0;
let randomY = 0;
Leap.loop(controllerOptions, function(frame){
    clear();
    randomX = Math.floor(Math.random()*3) - 1;
    randomY = Math.floor(Math.random()*3) - 1;
    circle(x+randomX,y+randomY,50);
}
);
let controllerOptions = {};
let i = 0;
let x = (window.innerWidth/2);
let y = (window.innerHeight/2);
let randomValue = 0;
Leap.loop(controllerOptions, function(frame){
    randomValue = Math.floor(Math.random()*3) - 1;
    circle(x+randomValue,y,50);
    console.log(i);
    i++;
}
);
let controllerOptions = {};
let x = (window.innerWidth/2);
let y = (window.innerHeight/2);
let randomX = 0;
let randomY = 0;
Leap.loop(controllerOptions, function(frame){
    HandleFrame(frame);
    // clear();
    // randomX = Math.floor(Math.random()*3) - 1;
    // randomY = Math.floor(Math.random()*3) - 1;
    // circle(x+randomX,y+randomY,50);
}
);
function HandleFrame(frame){
    if (frame.hands.length == 1){
        let hand = frame.hands[0];
        let fingers = hand.fingers;
        //console.log(fingers);
        for(let f = 0; f < fingers.length; f++){
            if(fingers[f].type == 1) {
                console.log(fingers[f]);
            }
        }
    }
}

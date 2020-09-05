let controllerOptions = {};
let x = (window.innerWidth/2);
let y = (window.innerHeight/2);
let z = 0;
let rawXMin = 1000;
let rawYMin = 1000;
let rawXMax = -1000;
let rawYMax = -1000;
Leap.loop(controllerOptions, function(frame){
    HandleFrame(frame);
    clear();
    // let randomX = Math.floor(Math.random()*3) - 1;
    // let randomY = Math.floor(Math.random()*3) - 1;
    x = ((x - rawXMin)* (window.innerWidth)) / (rawXMax - rawXMin) //scaling x value
    circle(x,window.innerHeight - y,50);
}
);
function HandleFrame(frame){
    if (frame.hands.length == 1){
        let hand = frame.hands[0];
        HandleHand(hand);
    }
}

function HandleHand(hand){
    let fingers = hand.fingers;
    for(let f = 0; f < fingers.length; f++){
        HandleFinger(fingers[f]);
    }
}

function HandleFinger(finger){
    if(finger.type == 1) {
        HandleFingerTip(finger.tipPosition)
        console.log(finger.tipPosition);
    }
}

function HandleFingerTip(tipPosition){
    x = tipPosition[0];
    y = tipPosition[1];
    z = tipPosition[2];

    if(x < rawXMin){
        rawXMin = x;
    }
    if(x>rawXMax){
        rawXMax = x;
    }
    if(y < rawYMin){
        rawYMin = y;
    }
    if(y > rawYMax){
        rawYMax = y;
    }
    console.log(rawYMin, rawYMax, rawXMax, rawXMin);
}

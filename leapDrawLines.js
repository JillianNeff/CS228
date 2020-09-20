let controllerOptions = {};
let x = (window.innerWidth/2);
let y = (window.innerHeight/2);
let z = 0;
let rawXMin = 1000;
let rawYMin = 1000;
let rawXMax = -1000;
let rawYMax = -1000;
Leap.loop(controllerOptions, function(frame){
        clear();
        HandleFrame(frame);
        // let randomX = Math.floor(Math.random()*3) - 1;
        // let randomY = Math.floor(Math.random()*3) - 1;

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
    for(let b =3 ; b >= 0 ; b--){
        for( let f = 0; f < 5; f++){
            HandleBone(fingers[f].bones[b], 4-b);
        }
    }
}

function HandleFinger(finger) {
    //console.log(finger);
    for (bone in finger.bones) {
        HandleBone(finger.bones[bone] , 4-finger.bones[bone].type );
    }
}

function HandleBone(bone, distance){
    console.log(bone);
    xb = bone.prevJoint[0];
    yb = bone.prevJoint[1];
    [xb,yb] = TransformCoordinates(xb,yb);

    xt = bone.nextJoint[0];
    yt = bone.nextJoint[1];
    [xt,yt] = TransformCoordinates(xt,yt);


    //circle(x,window.innerHeight - y,50);
    strokeWeight(3 * distance);
    stroke(255 *(distance/6));
    line(xb,yb,xt,yt);

}

function TransformCoordinates(x,y) {
    if (x < rawXMin) {
        rawXMin = x;
    }
    if (x > rawXMax) {
        rawXMax = x;
    }
    if (y < rawYMin) {
        rawYMin = y;
    }
    if (y > rawYMax) {
        rawYMax = y;
    }

    x = ((x - rawXMin)* window.innerWidth) / (rawXMax - rawXMin); //scaling x value
    y = window.innerHeight - (((y - rawYMin)* window.innerHeight) /(rawYMax-rawYMin)); //scaling y value
    return [x,y];
}
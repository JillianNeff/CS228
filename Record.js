let controllerOptions = {};
let x = (window.innerWidth/2);
let y = (window.innerHeight/2);
let z = 0;
let rawXMin = 1000;
let rawYMin = 1000;
let rawXMax = -1000;
let rawYMax = -1000;
let previousNumHands = 0;
let currentNumHands = 0;
var oneFrameOfData = nj.zeros([5,4,6]);

Leap.loop(controllerOptions, function(frame){
    currentNumHands = frame.hands.length;
    clear();
    RecordData();
    HandleFrame(frame);
    previousNumHands = currentNumHands;
    console.log(oneFrameOfData.toString());
    }
);
function HandleFrame(frame){
    if (frame.hands.length >= 1){
        let hand = frame.hands[0];
        HandleHand(hand,frame.hands.length);
    }
}

function HandleHand(hand){
    let fingers = hand.fingers;
    for(let b =3 ; b >= 0 ; b--){
        for( let f = 0; f < 5; f++){
            HandleBone(fingers[f].bones[b], b, f);
        }
    }
}

// function HandleFinger(finger) {
//     //console.log(finger);
//     for (bone in finger.bones) {
//         HandleBone(finger.bones[bone] , 4-finger.bones[bone].type);
//     }
// }

function HandleBone(bone, boneIndex, fingerIndex){
    //console.log(bone);
    xb = bone.prevJoint[0];
    yb = bone.prevJoint[1];
    zb = bone.prevJoint[2];
    [xb,yb] = TransformCoordinates(xb,yb);

    xt = bone.nextJoint[0];
    yt = bone.nextJoint[1];
    zt = bone.nextJoint[2];
    [xt,yt] = TransformCoordinates(xt,yt);

    let sum = xb + xt + yb + yt + zb + zt;
    oneFrameOfData.set(fingerIndex, boneIndex, 1, xb);
    oneFrameOfData.set(fingerIndex, boneIndex, 2, yb);
    oneFrameOfData.set(fingerIndex, boneIndex, 3, zb);
    oneFrameOfData.set(fingerIndex, boneIndex, 4, xt);
    oneFrameOfData.set(fingerIndex, boneIndex, 5, yt);
    oneFrameOfData.set(fingerIndex, boneIndex, 6, zt);

    //circle(x,window.innerHeight - y,50);
    let distance = 4-boneIndex;
    strokeWeight(3 * distance);
    if(currentNumHands > 1) {
        if(distance == 1)
            stroke('rgb(95,6,6)');
        else if (distance == 2)
            stroke('rgb(143,9,9)');
        else if(distance == 3)
            stroke('rgb(190,13,13)');
        else if(distance == 4)
            stroke('rgb(238,16,16)');
    }
    else {
        if (distance == 1)
            stroke('rgb(12,38,12)');
        else if (distance == 2)
            stroke('rgb(25,76,25)');
        else if (distance == 3)
            stroke('rgb(38,114,38)');
        else if (distance == 4)
            stroke('rgb(63,191,63)');
    }
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

function RecordData() {
    if(previousNumHands == 2 && currentNumHands == 1)
        background(0);
    else
        background(255);
}
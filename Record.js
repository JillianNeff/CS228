nj.config.printThreshold = 1000;
let controllerOptions = {};
let x = (window.innerWidth/2);
let y = (window.innerHeight/2);
let z = 0;
let previousNumHands = 0;
let currentNumHands = 0;
let numSamples = 100;
let currentSample = 0;
let framesOfData = nj.zeros([5,4,6,numSamples]);



Leap.loop(controllerOptions, function(frame){
    currentNumHands = frame.hands.length;
    clear();
    RecordData();
    HandleFrame(frame);
    previousNumHands = currentNumHands;
    }
);
function HandleFrame(frame){
    if (frame.hands.length >= 1){
        let hand = frame.hands[0];
        let InteractionBox = frame.interactionBox;
        HandleHand(hand,frame.hands.length, InteractionBox);
    }
}

function HandleHand(hand, numHands, InteractionBox){
    let fingers = hand.fingers;
    for(let b =3 ; b >= 0 ; b--){
        for( let f = 0; f < 5; f++){
            HandleBone(fingers[f].bones[b], b, f, InteractionBox);
        }
    }
}

// function HandleFinger(finger) {
//     //console.log(finger);
//     for (bone in finger.bones) {
//         HandleBone(finger.bones[bone] , 4-finger.bones[bone].type);
//     }
// }

function HandleBone(bone, boneIndex, fingerIndex, InteractionBox){
    //console.log(bone);
    let normalizedPrevJoint = InteractionBox.normalizePoint(bone.prevJoint, true);
    xb = normalizedPrevJoint[0];
    yb = normalizedPrevJoint[1];
    zb = normalizedPrevJoint[2];

    let normalizedNextJoint = InteractionBox.normalizePoint(bone.nextJoint, true);

    xt = normalizedNextJoint[0];
    yt = normalizedNextJoint[1];
    zt = normalizedNextJoint[2];

    let sum = xb + xt + yb + yt + zb + zt;
    framesOfData.set(fingerIndex, boneIndex, 0, currentSample, xb);
    framesOfData.set(fingerIndex, boneIndex, 1, currentSample, yb);
    framesOfData.set(fingerIndex, boneIndex, 2, currentSample, zb);
    framesOfData.set(fingerIndex, boneIndex, 3, currentSample, xt);
    framesOfData.set(fingerIndex, boneIndex, 4, currentSample, yt);
    framesOfData.set(fingerIndex, boneIndex, 5, currentSample, zt);

    let canvasPrevX = window.innerWidth * normalizedPrevJoint[0];
    let canvasPrevY = window.innerHeight * (1 - normalizedPrevJoint[1]);
    let canvasNextX = window.innerWidth * normalizedNextJoint[0];
    let canvasNextY = window.innerHeight * (1- normalizedNextJoint[1]);

    //circle(x,window.innerHeight - y,50);
    let distance = 4-boneIndex;
    strokeWeight(5 * distance);
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
    line(canvasPrevX,canvasPrevY,canvasNextX,canvasNextY);

}


function RecordData() {
    if(currentNumHands == 2)
        currentSample++;
    if(currentSample == numSamples)
        currentSample = 0;
    if(previousNumHands == 2 && currentNumHands == 1) {
        background(0);
        console.log(framesOfData.toString());
    }
    else
        background(255);
}
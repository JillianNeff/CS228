let controllerOptions = {};
let x = (window.innerWidth/2);
let y = (window.innerHeight/2);
let z = 0;
let previousNumHands = 0;
let currentNumHands = 0;
var oneFrameOfData = nj.zeros([5,4,6]);

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
    xb = bone.prevJoint[0];
    yb = bone.prevJoint[1];
    zb = bone.prevJoint[2];
    let normalizedPrevJoint = InteractionBox.normalizePoint(bone.prevJoint, true);
    let canvasPrevX = window.innerWidth * normalizedPrevJoint[0];
    let canvasPrevY = window.innerHeight * (1 - normalizedPrevJoint[1]);
    console.log(canvasPrevX, canvasPrevY);
    //console.log(window.innerWidth, window.innerHeight);

    xt = bone.nextJoint[0];
    yt = bone.nextJoint[1];
    zt = bone.nextJoint[2];
    let normalizedNextJoint = InteractionBox.normalizePoint(bone.nextJoint, true);
    let canvasNextX = window.innerWidth * normalizedNextJoint[0];
    let canvasNextY = window.innerHeight * (1- normalizedNextJoint[1]);
    console.log(canvasNextX, canvasNextY);

    let sum = xb + xt + yb + yt + zb + zt;
    oneFrameOfData.set(fingerIndex, boneIndex, 0, xb);
    oneFrameOfData.set(fingerIndex, boneIndex, 1, yb);
    oneFrameOfData.set(fingerIndex, boneIndex, 2, zb);
    oneFrameOfData.set(fingerIndex, boneIndex, 3, xt);
    oneFrameOfData.set(fingerIndex, boneIndex, 4, yt);
    oneFrameOfData.set(fingerIndex, boneIndex, 5, zt);

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


function RecordData() {
    if(previousNumHands == 2 && currentNumHands == 1) {
        background(0);
        console.log(oneFrameOfData.toString());
    }
    else
        background(255);
}
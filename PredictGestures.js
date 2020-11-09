let trainingCompleted = false;
const knnClassifier = ml5.KNNClassifier();
let controllerOptions = {};
let previousNumHands = 0;
let currentNumHands = 0;
let oneFrameOfData = nj.zeros([5,4,6]);
let numPredictions = 0;
let meanAccuracy = 0;
let d = 9;
let programState = 0;
let digitToShow = 0;
//let predictedClassLabels = nj.zeros([train0.shape[3]]);


Leap.loop(controllerOptions, function(frame){
    clear();
    DetermineState(frame);
    if (programState == 0) {
        HandleState0(frame);
    }
    else if (programState == 1) {
        HandleState1(frame);
    }
    else if(programState == 2) {
        HandleState2(frame);
    }
    currentNumHands = frame.hands.length;
    previousNumHands = currentNumHands;
    //console.log(framesOfData);
});

function SignIn(){
    let username = document.getElementById('username').value;
    let list = document.getElementById('users');
    if (IsNewUser(username, list)) {
        CreateNewUser(username, list);
        CreateSignInItem(username, list);
    }
    else {
        let ID = String(username) + "_signins";
        let listItem = document.getElementById(ID);
        listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
    }
    console.log(list);
    console.log(list.innerHTML);
    return false;
}

function IsNewUser(username, list){
    let users = list.children;
    let usernameFound = false;
    for (let i=0; i< users.length; ++i){
        if (username == users[i].innerHTML)
            usernameFound = true
    }
    return usernameFound == false;
}

function CreateNewUser(username, list){
    let item = document.createElement('li');
    item.innerHTML = String(username);
    item.id = String(username) + "_name";
    list.appendChild(item);
}

function CreateSignInItem(username, list){
    let item = document.createElement('li');
    item.innerHTML = 1;
    item.id = String(username) + "_signins";
    list.appendChild(item);
}

function DetermineState(frame) {
    if (frame.hands.length == 0)
        programState = 0;
    else if( HandIsUncentered())
        programState = 1;
    else
        programState = 2;
}

function HandIsUncentered(){
    return HandIsTooFarToTheLeft() || HandIsTooFarToTheRight() || HandIsTooHigh() || HandIsTooLow() ||
        HandIsTooFarForward() || HandIsTooFarBack();
}

function HandIsTooFarToTheLeft(){
    let xValues = oneFrameOfData.slice([],[],[0,6,3]);
    let currentMean = xValues.mean();
    if(currentMean < 0.25 )
        return true;
    else
        return false;
}

function HandIsTooFarToTheRight(){
    let xValues = oneFrameOfData.slice([],[],[0,6,3]);
    let currentMean = xValues.mean();
    if(currentMean > 0.75 )
        return true;
    else
        return false;
}

function HandIsTooLow(){
    let yValues = oneFrameOfData.slice([],[],[1,6,3]);
    let currentMean = yValues.mean();
    if(currentMean < 0.25 )
        return true;
    else
        return false;
}

function HandIsTooHigh(){
    let yValues = oneFrameOfData.slice([],[],[1,6,3]);
    let currentMean = yValues.mean();
    if(currentMean > 0.75 )
        return true;
    else
        return false;
}

function HandIsTooFarForward(){
    let zValues = oneFrameOfData.slice([],[],[2,6,3]);
    let currentMean = zValues.mean();
    if(currentMean < 0.25 )
        return true;
    else
        return false;
}

function HandIsTooFarBack(){
    let zValues = oneFrameOfData.slice([],[],[2,6,3]);
    let currentMean = zValues.mean();
    if(currentMean > 0.75 )
        return true;
    else
        return false;
}

function HandleState0(frame){
    TrainKNNIfNotDoneYet();
    DrawImageToHelpUserPutTheirHandOverTheDevice();
}

function HandleState1(frame){
    HandleFrame(frame);
    if( HandIsTooFarToTheLeft() ){
        DrawArrowRight();
    }
    else if( HandIsTooFarToTheRight() ){
        DrawArrowLeft();
    }
    else if( HandIsTooLow()){
        DrawArrowUp();
    }
    else if( HandIsTooHigh()){
        DrawArrowDown();
    }
    else if( HandIsTooFarForward()){
        DrawArrowBack();
    }
    else if( HandIsTooFarBack()){
        DrawArrowForward();
    }
    //Test();
}

// Called when a hand is centered over the device
function HandleState2(frame){
    HandleFrame(frame);
    DrawLowerRightPanel();
    //Test();
}
function DrawArrowRight(){
    image(imgRight, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

function DrawArrowLeft(){
    image(imgLeft, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

function DrawArrowUp(){
    image(imgUp, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

function DrawArrowDown(){
    image(imgDown, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

function DrawArrowForward(){
    image(imgForwards, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

function DrawArrowBack(){
    image(imgBackwards, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

function TrainKNNIfNotDoneYet(){
    //if(!trainingCompleted)
        // Train();
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(img, 0, 0, window.innerWidth/2, window.innerHeight/2)
}

function DrawLowerRightPanel(){
    if(digitToShow == 0) {
        image(img0, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
    }
    else {
        image(img2, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
    }
}

/*function Train(){
    for(let i = 0; i < train0.shape[3]; i++){
        let features = train0.pick(null,null,null,i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 0);

        /!*features = train0Bongard.pick(null,null,null,i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 0);*!/

        features = train1.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 1);

        features = train1Bongard.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 1);

        features = train1Allison.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 1);

        features = train2.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 2);

        features = train3.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 3);

        features = train4.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 4);

        features = train4Bongard.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 4);

        features = train4Kiely.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 4);

        features = train5.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 5);

        features = train6.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 6);

        features = train7.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 7);

        features = train7Fisher.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 7);

        features = train7Bongard.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 7);

        features = train7Laquerre.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 7);

        features = train8.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 8);

        features = train8Bongard.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 8);

        features = train9.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 9);

        features = train9Bongard.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 9);

        features = train9Goldman.pick(null, null, null, i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 9);
    }
    trainingCompleted = true;
}

function Test(){
    //for( let i = 0; i < test.shape[3]; i++){
        //let features = test.pick(null,null,null,i);
        CenterData();
        let features = oneFrameOfData.reshape(120);
        let predictedLabel = knnClassifier.classify(features.tolist(), GotResults);
    //}
}*/

function GotResults(err, result){
    //predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    //console.log(parseInt(result.label))
    ++numPredictions;
    meanAccuracy = ((numPredictions - 1) * meanAccuracy + (parseInt(result.label) == d)) / numPredictions;
    console.log((result.label));
}

function HandleFrame(frame){
    if (frame.hands.length >= 1){
        let hand = frame.hands[0];
        let InteractionBox = frame.interactionBox;
        //Test();
        //console.log(framesOfData.toString());
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

function HandleBone(bone, boneIndex, fingerIndex, InteractionBox) {
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
    oneFrameOfData.set(fingerIndex, boneIndex, 0, xb);
    oneFrameOfData.set(fingerIndex, boneIndex, 1, yb);
    oneFrameOfData.set(fingerIndex, boneIndex, 2, zb);
    oneFrameOfData.set(fingerIndex, boneIndex, 3, xt);
    oneFrameOfData.set(fingerIndex, boneIndex, 4, yt);
    oneFrameOfData.set(fingerIndex, boneIndex, 5, zt);

    let canvasPrevX = window.innerWidth/2 * normalizedPrevJoint[0];
    let canvasPrevY = window.innerHeight/2 * (1 - normalizedPrevJoint[1]);
    let canvasNextX = window.innerWidth/2 * normalizedNextJoint[0];
    let canvasNextY = window.innerHeight/2 * (1 - normalizedNextJoint[1]);

    //circle(x,window.innerHeight - y,50);
    let distance = 4 - boneIndex;
    strokeWeight(5 * distance);
    /*if (currentNumHands > 1) {
        if (distance == 1)
            stroke('rgb(95,6,6)');
        else if (distance == 2)
            stroke('rgb(143,9,9)');
        else if (distance == 3)
            stroke('rgb(190,13,13)');
        else if (distance == 4)
            stroke('rgb(238,16,16)');
    } else {
        if (distance == 1)
            stroke('rgb(12,38,12)');
        else if (distance == 2)
            stroke('rgb(25,76,25)');
        else if (distance == 3)
            stroke('rgb(38,114,38)');
        else if (distance == 4)
            stroke('rgb(63,191,63)');
    }*/
    stroke(255 *(distance/6));
    line(canvasPrevX, canvasPrevY, canvasNextX, canvasNextY);
}

function CenterData(){
    CenterXData();
    CenterYData();
    CenterZData();
}

function CenterXData(){
    let xValues = oneFrameOfData.slice([],[],[0,6,3]);
    let currentMean = xValues.mean();
    let horizontalShift = 0.5 - currentMean;
    for( let r = 0; r < oneFrameOfData.shape[0]; ++r){
        for (let c = 0; c < oneFrameOfData.shape[1]; ++c){
            let currentX = oneFrameOfData.get(r, c, 0);
            let shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(r, c, 0, shiftedX);

            currentX = oneFrameOfData.get(r, c, 3);
            shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(r, c, 3, shiftedX);
        }
    }
    currentMean = xValues.mean();
}

function CenterYData(){
    let yValues = oneFrameOfData.slice([],[],[1,6,3]);
    let currentMean = yValues.mean();
    let verticalShift = 0.5 - currentMean;
    for( let r = 0; r < oneFrameOfData.shape[0]; ++r){
        for (let c = 0; c < oneFrameOfData.shape[1]; ++c){
            let currentY = oneFrameOfData.get(r, c, 1);
            let shiftedY = currentY + verticalShift;
            oneFrameOfData.set(r, c, 1, shiftedY);

            currentY = oneFrameOfData.get(r, c, 4);
            shiftedY = currentY + verticalShift;
            oneFrameOfData.set(r, c, 4, shiftedY);
        }
    }
    currentMean = yValues.mean();
}

function CenterZData(){
    let zValues = oneFrameOfData.slice([],[],[2,6,3]);
    let currentMean = zValues.mean();
    let verticalShift = 0.5 - currentMean;
    for( let r = 0; r < oneFrameOfData.shape[0]; ++r){
        for (let c = 0; c < oneFrameOfData.shape[1]; ++c){
            let currentZ = oneFrameOfData.get(r, c, 2);
            let shiftedZ = currentZ + verticalShift;
            oneFrameOfData.set(r, c, 2, shiftedZ);

            currentZ = oneFrameOfData.get(r, c, 5);
            shiftedZ = currentZ + verticalShift;
            oneFrameOfData.set(r, c, 5, shiftedZ);
        }
    }
    currentMean = zValues.mean();
}


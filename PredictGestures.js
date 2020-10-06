let trainingCompleted = false;
const knnClassifier = ml5.KNNClassifier();
let testingSampleIndex = 0;
//let predictedClassLabels = nj.zeros([train0.shape[3]]);


function draw(){
    clear();
    if(!trainingCompleted)
        Train();
    Test();
}

function Train(){
    for(let i = 0; i < train0.shape[3]; i++){
        let features = train0.pick(null,null,null,i);
        features = features.reshape(120);
        knnClassifier.addExample(features.tolist(), 0);

        let features1 = train2.pick(null, null, null, i);
        features1 = features1.reshape(120);
        knnClassifier.addExample(features1.tolist(), 2);
    }
    trainingCompleted = true;
}

function Test(){
    for( let i = 0; i < test.shape[3]; i++){
        let features = test.pick(null,null,null,i);
        features = features.reshape(120);
        let predictedLabel = knnClassifier.classify(features.tolist(), GotResults);
    }
}

function GotResults(err, result){
    //predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    console.log(testingSampleIndex, parseInt(result.label));
    testingSampleIndex++;
    if(testingSampleIndex >= train0.shape[3]){
        testingSampleIndex = 0;
    }
}



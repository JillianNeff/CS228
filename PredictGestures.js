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
        console.log(features.toString());
        knnClassifier.addExample(features.tolist(), 0);
    }
    trainingCompleted = true;
}

function Test(){
    for( let i = 0; i < test.shape[3]; i++){
        let features = test.pick(null,null,null,i);
        features = features.reshape(120, 1);
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



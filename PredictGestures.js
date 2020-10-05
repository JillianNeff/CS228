let trainingCompleted = false;
const knnClassifier = ml5.KNNClassifier();
let testingSampleIndex = 1;


function draw(){
    clear();
    if(!trainingCompleted)
        Train();
    Test();
}

function Train(){
    for(let t = 0; t < train0.shape[3]; t++){
        let features = train0.pick(null,null,null,t);
        features = features.reshape(120);
        console.log(features);
        knnClassifier.addExample(features, 0);
    }
    trainingCompleted = true;
}

function Test(){

}


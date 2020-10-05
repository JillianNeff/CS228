
oneFrameOfData = nj.array([[[ 0.50518, 0.21151, 0.83047, 0.50518, 0.21151, 0.83047],
    [ 0.50518, 0.21151, 0.83047, 0.58672, 0.29737, 0.58727],
    [ 0.58672, 0.29737, 0.58727, 0.56117, 0.32655, 0.38636],
    [ 0.56117, 0.32655, 0.38636, 0.56326, 0.35518, 0.24952]],
    [[ 0.46589, 0.29256, 0.85846, 0.50642, 0.44755, 0.48346],
        [ 0.50642, 0.44755, 0.48346, 0.52559, 0.54949, 0.27641],
        [ 0.52559, 0.54949, 0.27641, 0.53847, 0.56868, 0.13202],
        [ 0.53847, 0.56868, 0.13202, 0.54742, 0.55777, 0.02912]],
    [[ 0.41919, 0.30031,  0.8494, 0.42078, 0.44636, 0.48759],
        [ 0.42078, 0.44636, 0.48759, 0.38893, 0.53453, 0.23068],
        [ 0.38893, 0.53453, 0.23068, 0.38599,  0.5337, 0.05544],
        [ 0.38599,  0.5337, 0.05544, 0.39288, 0.50507,       0]],
    [[  0.3724, 0.29559, 0.83804, 0.33748, 0.42228, 0.51348],
        [ 0.33748, 0.42228, 0.51348, 0.28714, 0.49345, 0.27558],
        [ 0.28714, 0.49345, 0.27558,  0.2797, 0.48343, 0.10596],
        [  0.2797, 0.48343, 0.10596,  0.2887,  0.4489, 0.00578]],
    [[ 0.32949, 0.26381, 0.81642, 0.26566, 0.38224, 0.53026],
        [ 0.26566, 0.38224, 0.53026, 0.20908, 0.43997, 0.35434],
        [ 0.20908, 0.43997, 0.35434, 0.20131, 0.43833, 0.23443],
        [ 0.20131, 0.43833, 0.23443, 0.21295, 0.41319, 0.13776]]]);

anotherFrameOfData = nj.array([[[0.65424,0.453, 1,0.65424,0.453, 1],
    [0.65424,0.453, 1,0.47951,0.50447,0.95065],
    [0.47951,0.50447,0.95065,0.38932,0.53759,0.81734],
    [0.38932,0.53759,0.81734,0.33217,0.55957,0.71786]],
    [[0.68935,0.53405, 1,0.54434,0.69044,0.74978],
        [0.54434,0.69044,0.74978,0.47672,0.78289,0.57058],
        [0.47672,0.78289,0.57058,0.43469,0.81327,0.4528],
        [0.43469,0.81327,0.4528,0.40427,0.82136,0.36432]],
    [[0.72692,0.54695,0.98917,0.61985,0.69867,0.69763],
        [0.61985,0.69867,0.69763,0.5715,0.7998,0.47306],
        [0.5715,0.7998,0.47306,0.53284,0.83234,0.32417],
        [0.53284,0.83234,0.32417,0.50345,0.83813,0.22302]],
    [[0.76494,0.54801,0.94821,0.70079,0.684,0.66245],
        [0.70079,0.684,0.66245,0.6642,0.77405,0.44622],
        [0.6642,0.77405,0.44622,0.6306,0.8067,0.2992],
        [0.6306,0.8067,0.2992,0.60317,0.81521,0.19784]],
    [[0.79903,0.52306,0.89673,0.77063,0.65308,0.62436],
        [0.77063,0.65308,0.62436,0.76372,0.71879,0.44211],
        [0.76372,0.71879,0.44211,0.74943,0.74125,0.3337],
        [0.74943,0.74125,0.3337,0.73008,0.75053,0.23698]]])

let frameIndex = 0;
let frameFlipped = 0;

function draw(){
    clear();
    if(frameIndex == 100) {
        frameIndex = 0;
        if (frameFlipped == 0)
            frameFlipped = 1;
        else
            frameFlipped = 0;
    }
    console.log(frameFlipped);
    for(let fingerIndex = 0; fingerIndex < oneFrameOfData.shape[0]; fingerIndex++){
        for(let boneIndex=0; boneIndex < oneFrameOfData.shape[1]; boneIndex++){
            if(frameFlipped % 2 != 0) {
                xStart = window.innerWidth * oneFrameOfData.get(fingerIndex, boneIndex, 0);
                yStart = window.innerHeight * (1 - oneFrameOfData.get(fingerIndex, boneIndex, 1));
                zStart = oneFrameOfData.get(fingerIndex, boneIndex, 2);
                xEnd = window.innerWidth * oneFrameOfData.get(fingerIndex, boneIndex, 3);
                yEnd = window.innerHeight * (1 - oneFrameOfData.get(fingerIndex, boneIndex, 4));
                zEnd = oneFrameOfData.get(fingerIndex, boneIndex, 5);
            }
            else if(frameFlipped %2 == 0) {
                xStart = window.innerWidth * anotherFrameOfData.get(fingerIndex, boneIndex, 0);
                yStart = window.innerHeight * (1 - anotherFrameOfData.get(fingerIndex, boneIndex, 1));
                zStart = anotherFrameOfData.get(fingerIndex, boneIndex, 2);
                xEnd = window.innerWidth * anotherFrameOfData.get(fingerIndex, boneIndex, 3);
                yEnd = window.innerHeight * (1 - anotherFrameOfData.get(fingerIndex, boneIndex, 4));
                zEnd = anotherFrameOfData.get(fingerIndex, boneIndex, 5);
            }
            line(xStart, yStart, xEnd, yEnd);
        }
    }
    frameIndex++;
}
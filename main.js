vid = "";
status_ = "Waiting to Start"
cocossd = "";
startDetecting = false;
function preload(){
    vid = createVideo("video.mp4");
}

obj = [];

function setup(){
    canvas = createCanvas(640, 360);
    vid.hide();
    canvas.position(380, 230);
    //vid.loop()
    vid.position(380, 230);
    cocossd = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded(){
    console.log("Model Loaded");
    vid.loop();
}

function draw(){
    image(vid, 0, 0, 600, 400);

    if(status_ = "Started"){
        startDetecting = true
        status_ = "Detecting Video Components"
    }
    document.getElementById("status").innerText = status_
    if(startDetecting){
        cocossd.detect(vid, detected);
        document.getElementById("objnum").innerText = obj.length + " objects detected"
        for(var i = 0; i < obj.length; i++){
            result = obj[i];
            noFill();
            stroke(random(0, 255), random(0, 255), random(0, 255));
            strokeWeight(4);
            rect(result.x, result.y, result.width, result.height);
            stroke(255, 255, 255)
            strokeWeight(0.5);
            text(result.label + ", " + Math.floor(result.confidence * 100) + "%", result.x + 10, result.y + 15);
        }
    }
}

function start(){
    vid.loop();
    status_ = "Started"
}

function detected(error, results){
    if(error){
        console.log(error);
        console.warn(error)
    } else {
        console.error(results);
        obj = results
    }
}

/* Multi
   Line
   Comment */

// Comment
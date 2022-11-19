m1= "";
m2= "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristscore = 0;
song_1_Status="";
song_2_Status="";
noseX="";
noseY="";

function setup() {
    canvas = createCanvas(600,500)
    canvas.position(560,150);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function preload()
{
    m1 = loadSound("music.mp3");
    m2 = loadSound("music2.mp3");
}



function modelLoaded(){
    console.log('PoseNet Is Intialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    m_1_Status=song1.isPlaying();
    m_2_Status=song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    
    if(m_1_Status == false){
        m1.play();
        document.getElementById("song_name").innerHTML="Music.mp3";
    }

}

    if(rightWristScore > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(m_2_Status == false){
            m2.play();
            document.getElementById("song_name").innerHTML="Music2.mp3";
        }
    }


}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristscore = results[0].pose.keypoints[9].score;
        console.log("leftWristscore =" + leftWristscore);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY"+ rightWristY);
    

        noseX=results[0].pose.nose.x-130;
        noseY=results[0].pose.nose.y-170;
        console.log("noseX= "+ noseX);
        console.log("noseY= "+ noseY);
    }
}
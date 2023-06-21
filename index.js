var buttonColours=["green","red","yellow","blue"];
var gamePattern=[];
var level = 0;
var start=false;
var lastIdx=-1;
var userClickedPattern=[];


function nextSequence(){
    userClickedPattern=[];
    lastIdx=-1;
    var randomNumber=Math.floor(Math.random()*4);//0 to 3 included both
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level "+level);}


$(document).keypress(function(){
    if(!start){
    $("h1").text("Level 0");
    nextSequence();
    start=true;}
})


$(".btn").click(function(){
    lastIdx++;
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    console.log(gamePattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(lastIdx);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(lastIdx){
    if (gamePattern.length>0&&gamePattern[lastIdx] === userClickedPattern[lastIdx]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        //wrong voice
        var audio =new Audio('sounds/wrong.mp3');
        audio.play();
        //background red flash
       $("body").addClass("game-over");
       setTimeout(function(){
        $("body").removeClass("game-over");
       },100);
        //gamePattern=[],userClickedPattern=[]
       gamePattern=[];
       userClickedPattern=[];
       $("h1").text("Game Over, Press a key to restart");
       start=false;
       level=0;
        //change heading
    }
}
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var currentLevel = 0;
var log = "success";

//gamePattern.push(nextSequence());
$(document).on("keypress", function(){
    if(log == "wrong"){
        log = "success"
        start = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        currentLevel = 0;
    }
    if(!start){
        start = true;
        console.log(nextSequence());
    }
})

$(document).on("click", function(event){
    if(start && log == "success"){
        playsound(event.target.id);
        animatePress(event.target.id);
        userClickedPattern.push(event.target.id);
        checkAnswer();
        if(currentLevel == level){
            setTimeout(function(){
                nextSequence();
            }, 700)
            currentLevel = 0;
            userClickedPattern = [];
        }
    }
})    

function checkAnswer(){
    if(currentLevel < level){
        if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
            currentLevel++;
        else{
            log = "wrong";
            playsound("wrong");
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 500)
        }
    }
}

function animatePress(key){     //the animate after pressing
    $("#" + key).addClass("pressed");
    setTimeout(function(){
        $("#" + key).removeClass("pressed");
    }, 100);
}

function playsound(key){
    var audio = new Audio("./sounds/" + key + ".mp3");
    audio.play();
}

function nextSequence(){ //generate one pattern randomly
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //animate when pattern generate
    $("#" + gamePattern[level]).animate({opacity: 0.2}, {duration: 0.1}).animate({opacity: 0.8});
    level++;
    $("h1").text("level " + level);
}

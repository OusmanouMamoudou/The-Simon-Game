
var userClickedPattern = [];

var gamePattern =[];

var buttonColor =["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

$("body").on("keydown", function(event){
    if(started == false){
            nextSequence();
            started = true;

    } 
    
});





// Evenlistner For The Click

    $(".btn").on("click", function(){
        if(started == true){ var userChosenColour = $(this).attr("id");
            userClickedPattern.push(userChosenColour);
            var source = "sounds/"+userChosenColour+".mp3";
            playSound(source);
            animatePress(userChosenColour);
            var lastAnwser = userClickedPattern.length-1;
            checkAnswer(lastAnwser);}
        else{
                alert("Please Press Any Key From Your Keyboard To get Started");
        }
    });



// Next Sequence
function nextSequence() {
    userClickedPattern = [];
    
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var source = "sounds/"+randomChosenColor+".mp3";
    animatePress(randomChosenColor);
    playSound(source);
    level++;
    
    
}

//
function playSound(source){
    var audio = new Audio(source);
    audio.play();
}

//
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Succes");

        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();  
            },1000)
        }
        
    } else {
        playSound("sounds/wrong.mp3");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
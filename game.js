// alert("hello")
var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
// nextSequence(buttonColours);

var userClickedPattern = [];
var level = 0;
var started = false;

// when the game starts
$(Document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level); // here the level turns 0 then nextSequence() is called so level turn 1
        nextSequence();
        started = true;
    }
});


//affter user clicks 
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
} else {
    console.log("wrong");

   playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);
    
    $("#level-title").text("Game Over, Press Any Key to Restart");

    $(document).keydown(function(){
        startOver();
    })
}
}
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    
    // random colour gets chosen in this
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern= [];
    started = false;
}
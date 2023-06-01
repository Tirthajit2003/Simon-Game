var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var level=0;
var started=false;

$(document).on("keydown",function(){
    if (started===false) 
    {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=true;
    }
});

$(".btn").on("click",function(){
    var userChosenColour=$(this);
    playSound(this.id);
    animatePress(this.id);
    userClickedPattern.push(userChosenColour[0].id);
    checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){

  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



function playSound(name){
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log(userClickedPattern);
        console.log(gamePattern);
        if (userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    { 
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
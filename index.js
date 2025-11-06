var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).on("keydown touchstart", function(event) {
  
  if (!started) {
   
    if (event.type === "touchstart") {
      event.preventDefault();
    }
    nextSequence();
    started = true;
  }
});

function nextSequence() {
   userClickedPattern=[];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor);

  $("#" + chosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(chosenColor);
}
function playSound(color) {
  var sound = new Audio("./sounds/" + color + ".mp3");
  sound.play();
}
$(".btn").on("click touchstart", function(event) {
 
  if (event.type === "touchstart") {
    event.preventDefault();
  }

  var userColor = $(this).attr("id");
  userClickedPattern.push(userColor);
 
  playSound(userColor);
  $(this).addClass("pressed");
  setTimeout(function(){ $("#"+userColor).removeClass("pressed");}, 100);
  checkAnswer(userClickedPattern.length-1);
});
$(document).keypress(function(event) {
  var keyMap = { w: "blue", a: "green", s: "red", d: "yellow" };
  var userColor = keyMap[event.key];

  if (userColor) {
    userClickedPattern.push(userColor);
    playSound(userColor);
    $("#" + userColor).addClass("pressed");
    setTimeout(function() {
      $("#" + userColor).removeClass("pressed");
    }, 100);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel)
{
 
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){nextSequence();},1000)
    }
  }
 else{
  playSound("wrong");
  $("h1").text("Game Over Press Any Key to Restart");
  $("body").addClass("game-over");

  setTimeout(function(){$("body").removeClass("game-over");},1000);
  startOver();
 }

}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $("h1").text=("Press A Key To Play");
}

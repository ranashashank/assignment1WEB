var buttonColours = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var gamePattern = [];

var level = 0;
var started = false;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});




$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length - 1);

});





function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {

      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over ,Press Any Key To Restart");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

     startOver();

  }

}
function nextSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 1000);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

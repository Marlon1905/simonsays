$(".randomChosenColour").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);



var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false; 
var level = 0; 

$("#rule-title").click(function () {
    $("#rules").removeClass("visibility")
}
)


$(document).keypress(function() {
    if (!started) {
        $("#level-title").slideUp("fast")
        $("#level").text("Level " + level);
        $("#rules").addClass("visibility")
        nextSequence();
        started = true;
    }

});



$(".btn").click(function (){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); 

})



function checkAnswer (currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
    }  else {
        var sound1 = new Audio("sounds/wrong.mp3");
        sound1.play();
        $("body").addClass("game-over")

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        $("#level").slideUp("fast");

        $("#level-title").text("Game over, press any key to restart").slideDown("slow");
        startOver();
    }

}


function nextSequence() {

    userClickedPattern = [];

    level++; 


    $("#level").slideDown("fast");


    $("#level").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   

    playSound(randomChosenColour)

};

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")}, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


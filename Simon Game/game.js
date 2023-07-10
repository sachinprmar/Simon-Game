//TO-DO

//Required Two Arrays That Contains System Generated Colors and UserSelectedColors Respictively
//Random Color to be selected by system
//When User Selected Correct Answer New Random Color Generated Else Game Over (Restart)
//After Each Use User Input it have to match with gamePattern (System Generate d Color)

var buttonColours = ["red", "blue", "green", "yellow"];


var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var i = 0;
var started = false;


    
$(document).on("keypress" , function(event){

        if(!started){
                nextSequence();
            }
        
});


$(".btn").on("click" ,function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkSequence(userClickedPattern.length-1); //Will Check with gamePattern Color length-1 for 0 indexing
})


function checkSequence(currLevel){
        if(userClickedPattern[currLevel] === gamePattern[currLevel]){
            
            if(userClickedPattern.length === gamePattern.length){ //If it is last element of array
                setTimeout(() => {
                nextSequence();
                }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function nextSequence(){
    userClickedPattern = []; //User Input will store from starting
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColours[randomNumber];
    gamePattern.push(randomColor);

    $("h1").text("Level "+(++level));
    $("." + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
   
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(colorName){
    $("#"+colorName).addClass("pressed");

    setTimeout(() => {
        $("#"+colorName).removeClass("pressed");
    }, 100);
}


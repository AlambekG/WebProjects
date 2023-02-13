let buttonColors = ["red", "blue", "yellow", "green"]
let gamePattern = []
let userPattern = []
let level = 0
let i = 0

function playSound(src){
    let audio = new Audio ("sounds/" + src + ".mp3");
    audio.play()
}
function nextSequence(){
    level ++;
    $("h1").text("Level " + level)
    let randomColor = buttonColors[Math.round(Math.random() * 3)]
    $('#' + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomColor)
    playSound(randomColor)
}
function animatePress(src){
    $("#" + src).addClass("pressed")
    setTimeout(()=>{$("#" + src).removeClass("pressed")}, 100)
}
function gameRestart(){
    level = 0
    while(gamePattern.length > 0) gamePattern.pop()
    while(userPattern.length > 0) userPattern.pop()
    i = 0
}
function check(ind){
    if(gamePattern[i] != userPattern[i]){
        $("h1").text("Game Over, Press Any Key to Restart")
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(()=> $("body").removeClass("game-over"), 300)
        gameRestart();
        return false;
    }
    else{
        setTimeout(()=>{
        if(i >= gamePattern.length){
            userPattern = [];
            i = 0;
            nextSequence();
        } 
        }, 1000);
        return true;
    }
}
$(".btn").click(function(){
    if(level > 0){
        userPattern.push(this.id)
        playSound(this.id)
        animatePress(this.id)
        check(i)
        i ++;
    }
})
$(document).keypress(()=>{
    if(level == 0){
        nextSequence();
    }
})

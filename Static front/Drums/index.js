const play = (url) => {
    let audio = new Audio(url);
    audio.play()
}
const check = (char) => {
    switch (char){
        case 'w' :
            play("sounds/tom-1.mp3");
            break;
        case 'a' : 
            play("sounds/tom-2.mp3");
            break; 
        case 's' :
            play("sounds/tom-3.mp3");
            break;
        case 'd' :
            play("sounds/tom-4.mp3");
            break;
        case 'j' :
            play("sounds/snare.mp3");
            break;
        case 'k' :
            play("sounds/kick-bass.mp3");
            break;
        case 'l' : 
            play("sounds/crash.mp3");
            break;
        default : 
            console.log(this);
            break;
    }
}
for(let i = 0;i < document.querySelectorAll(".drum").length;i ++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function (){
        debugger;
        check(this.innerHTML)
    })
}
document.addEventListener("keydown", (e) => {
    check(e.key)
})

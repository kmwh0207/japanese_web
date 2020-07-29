window.addEventListener('load',function(){
    let elements = document.getElementsByClassName("cuma");
    let count=0;
    for(let element of elements){
        element.addEventListener("animationend",function(){
            element.classList.add("none");
            element.classList.remove("opacityAlternate");
        },false);
    }
    setInterval(function(){
        elements[count].classList.remove("none");
        elements[count].classList.add("opacityAlternate");
        count = (count+1)%elements.length;
        
    },1000);
    var img = document.getElementById("background");
    document.body.style.width = img.width.toString() + "px"
    document.body.style.height = img.height.toString() + "px"
    setTimeout(() => {
        document.getElementById('audio_play').play();
    }, 2000);
});
function stop(){
    document.getElementById('audio_play').pause();
}
window.addEventListener('load',function(){
    let elements = document.getElementsByClassName("cuma");
    let count=0;
    for(let element of elements){
        element.addEventListener("animationend",function(){
            element.classList.add("none");
            element.classList.remove("opacityReserve");
        },false);
    }
    setInterval(function(){
        elements[count].classList.remove("none");
        elements[count].classList.add("opacityReserve");
        count = (count+1)%elements.length;
        console.log(count);
    },1000);
});

var mode=0;
let selected_id = -1;
let _x100;
let _y100;
let _x,_y;
let timer;
let sensivility=10;
let total_page=10;
let is_correct=0;
let eventFunctions;
let count=0;
let playing;
let imgList=["img/game/number/1.png","img/game/number/2.png","img/game/number/3.png","img/game/number/4.png","img/game/number/5.png","img/game/number/6.png","img/game/number/7.png","img/game/number/8.png","img/game/number/9.png","img/game/number/10.png"]

let names=['','','','','','','','','','']

let eventList = [function(){},function(){},function(){},function(){}];
let correctNum=[0,0,0,0,0,0,0,0,0,0];

window.addEventListener('load',function(){
    playgame();
    eventFunctions=new Add_exp(names);
    Array.from(document.getElementsByClassName("item")).forEach(function(e){e.addEventListener('touchend',function(){
        count++;
        event.preventDefault();
        
        e.style.backgroundImage=`url('${e.style.backgroundImage.slice(5, -6) + "_.png"}')`;
        console.log(`${e.style.backgroundImage.slice(5, -6)}`);
        
        e.classList.add("opacity");/*정답 맞출경우*/
        clearTimeout(playing);
        playing=setTimeout(() => {
            e.classList.remove("opacity");
            playgame();
        }, 2000);})});
});

function playgame(){
    let num1=Math.floor(Math.random()*5)+1;
    let num2=Math.floor(Math.random()*5)+1;
    document.getElementsByClassName("item")[0].style.backgroundImage=`url('${imgList[num1]}')`;
    document.getElementsByClassName("item")[1].style.backgroundImage=`url('${imgList[num2]}')`;
    let correct=num1+num2;
    document.getElementsByClassName("item")[2].style.backgroundImage=`url('${imgList[correct]}')`;
}
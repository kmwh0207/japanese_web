
var mode=0;
let selected_id = -1;
let eventFunctions;
let count=0;
let playing;
let imgList=["img/game/number/1.png","img/game/number/2.png","img/game/number/3.png","img/game/number/4.png","img/game/number/5.png","img/game/number/6.png","img/game/number/7.png","img/game/number/8.png","img/game/number/9.png","img/game/number/10.png"]
let order=[[1,1,2],[1,2,3],[1,3,4],[2,3,5],[3,3,6],[3,4,7],[3,5,8],[4,5,9],[4,6,10]];
let names=['','','','','','','','','','']

let eventList = [function(){},function(){},function(){},function(){}];
let correctNum=[0,0,0,0,0,0,0,0,0,0];
let soundList=['1+1=2','1+2=3','1+3=4','2+3=5','3+3=6','3+4=7','3+5=8','4+5=9','4+6=10'];
window.addEventListener('load',function(){
    playgame();
    eventFunctions=new Add_exp(names);
    /* Array.from(document.getElementsByClassName("item")).forEach(function(e){e.addEventListener('touchend',function(){
        count++;
        event.preventDefault();
        
        e.style.backgroundImage=`url('${e.style.backgroundImage.slice(5, -6) + "_.png"}')`;
        console.log(`${e.style.backgroundImage.slice(5, -6)}`);
        
        e.classList.add("opacity");
        clearTimeout(playing);
        playing=setTimeout(() => {
            e.classList.remove("opacity");
            playgame();
        }, 2000);})}
    ); */
    document.body.addEventListener("touchstart",function(){
        music("img/game/add/"+soundList[selected_id]+".mp3");
        let elem=document.getElementsByClassName("item")[count];
        elem.classList.add("opacity");
        elem.style.backgroundImage=`url('${elem.style.backgroundImage.slice(5, -6) + "_.png"}')`;
        setTimeout(() => {
            count++;
            elem=document.getElementsByClassName("item")[count];
            elem.style.backgroundImage=`url('${elem.style.backgroundImage.slice(5, -6) + "_.png"}')`;
            elem.classList.add("opacity");
        }, 1800);
        setTimeout(() => {
            count++;
            elem=document.getElementsByClassName("item")[count];
            elem.style.backgroundImage=`url('${elem.style.backgroundImage.slice(5, -6) + "_.png"}')`;
            elem.classList.add("opacity");
        }, 2500);
        setTimeout(() => {
            playgame();
        }, 5000);
    })
});

function playgame(){
    Array.from(document.getElementsByClassName("item")).forEach(function(i){i.classList.remove("opacity");})
    count=0;
    selected_id=Math.floor(Math.random()*9);
    document.getElementsByClassName("item")[0].style.backgroundImage=`url('${imgList[order[selected_id][0]-1]}')`;
    document.getElementsByClassName("item")[1].style.backgroundImage=`url('${imgList[order[selected_id][1]-1]}')`;
    document.getElementsByClassName("item")[2].style.backgroundImage=`url('${imgList[order[selected_id][2]-1]}')`;
}
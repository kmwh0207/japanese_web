var mode=0;
let selected_id = -1;
let _x100;
let _y100;
let _x,_y;
let sensivility=10;
let eventFunction;

let imgList1 = ["img/game/body/단어박스(눈).png","img/game/body/단어박스(코).png","img/game/body/단어박스(머리).png","img/game/body/단어박스(입).png","img/game/body/단어박스(귀).png"];
let imgList2 = ["img/game/body/바디파트_2_단어박스(어깨).png","img/game/body/바디파트_2_단어박스(발가락).png","img/game/body/바디파트_2_단어박스(무릎).png","img/game/body/바디파트_2_단어박스(손).png","img/game/body/바디파트_2_단어박스(배).png"];

let eventList_none=[function(){},function(){},function(){},function(){},function(){}];
let eventList = [
    ["eye","nose","head","mouth","ear"],
    ["shoulder","toes","knee","hand","stomach"]
];


let textOrder=[[2,1,4,0,3],[0,4,3,2,1]];
let setLocation=[[[18,24],[11,47],[77,19],[76,38],[76,62]],[[27,22],[26,43],[71,26],[69,47],[69,67]]];

window.addEventListener('load',function(){
    nextpage(0);
    eventFunction=new Add_exp(eventList);
});

function addTouchEvent(id){
    let elements = document.getElementById(id).children;
    console.log(elements[0].offsetWidth);
    for(let element of elements){
        element.addEventListener("touchstart",handleStart,false);
        element.addEventListener("touchmove",handleMove,false);
        element.addEventListener("touchend",handleEnd,false);
    }
}

function handleStart(event){
    this.style.width=this.offsetWidth+"px";
    this.style.height=this.offsetHeight+"px";
    this.style.position="fixed";
    selected_id = this.dataset.num;
    console.log('selected_id: ', selected_id);
}
function handleMove(event){
    _x = event.changedTouches[0].pageX, _y = event.changedTouches[0].pageY;
    this.style.left=_x- parseInt(this.offsetWidth/2)+"px";
    this.style.top=_y-parseInt(this.offsetHeight/2)+"px";
    _x100=_x/document.body.offsetWidth*100;
    _y100=_y/document.body.offsetHeight*100;
    let elemnum=textOrder[mode][selected_id];
    console.log(_x100+" "+_y100);
    console.log(setLocation[mode][elemnum][0]+" "+setLocation[mode][elemnum][1]);
    if(setLocation[mode][elemnum][0]-sensivility<=_x100 && setLocation[mode][elemnum][0]+sensivility>=_x100){
        if(setLocation[mode][elemnum][1]-sensivility<=_y100 && setLocation[mode][elemnum][1]+sensivility>=_y100){
            this.classList.add("rotateBoth");
            this.removeEventListener("touchmove",handleMove,false);
            this.style.left=setLocation[mode][elemnum][0]/100*document.body.offsetWidth- parseInt(this.offsetWidth/2)+"px";
            this.style.top=setLocation[mode][elemnum][1]/100*document.body.offsetHeight-parseInt(this.offsetHeight/2)+"px";
            eventFunction.addExp(mode,selected_id);
            music("img/game/correct.mp3");
        }
    } 
}

function handleEnd(event){
    this.classList.remove("rotateBoth");
    selected_id = -1;
}

function nextpage(change){
    if(change>0) {
        mode = mode == 0? 1:0;
    }
    let elem = document.getElementsByClassName("item");
    for(let i of elem){
        i.removeAttribute('style');
        i.innerHTML="";
    }
    let elem2 = document.getElementsByClassName("pointer"); 
    Array.prototype.forEach.call(elem2,function(i){i.classList.add("none"); console.log(i)});
    addTouchEvent("container5");
    if(mode == 0){
        document.getElementById("background").setAttribute("src","img/game/body/여자반신-뒷배경.png");
        document.getElementById("background").classList.add('opacity');
        document.getElementsByClassName("man_img")[0].setAttribute("src","img/game/body/여자반신_애니_1.png");
        document.getElementsByClassName("man_img")[1].setAttribute("src","img/game/body/여자반신_애니_2.png");
        new Add_img("container5",imgList1,"fadeIn",eventList_none).apply();
        let elem2 = document.getElementsByClassName("pointer1"); 
        Array.prototype.forEach.call(elem2,function(i){i.classList.remove("none")});
    }else{
        document.getElementById("background").setAttribute("src","img/game/body/여자전신-뒷배경.png");
        document.getElementById("background").classList.add('opacity');
        document.getElementsByClassName("man_img")[0].setAttribute("src","img/game/body/여자전신_애니_1.png");
        document.getElementsByClassName("man_img")[1].setAttribute("src","img/game/body/여자전신_애니_2.png");
        new Add_img("container5",imgList2,"fadeIn",eventList_none).apply();
        let elem2 = document.getElementsByClassName("pointer2"); 
        Array.prototype.forEach.call(elem2,function(i){i.classList.remove("none")});
    }
}

window.addEventListener('load',function(){
    let elements = document.getElementsByClassName("man_img");
    let count=1;
    /* for(let element of elements){
        element.addEventListener("animationend",function(){
            element.classList.add("none");
            element.classList.remove("opacityAlternate");
        },false);
    } */
    setInterval(function(){
        elements[count].classList.remove("none");
        count = (count+1)%elements.length;
        elements[count].classList.add("none");
        console.log(count);
    },3200);
});
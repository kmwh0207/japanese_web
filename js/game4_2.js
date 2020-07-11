var mode=0;
let selected_id = -1;
let _x100;
let _y100;
let _x,_y;
let sensivility=10;

let imgList1 = ["img/game/clothing/clothing_play_1(옷1).png",
"img/game/clothing/clothing_play_1(옷2).png",
"img/game/clothing/clothing_play_1(옷3).png",
"img/game/clothing/clothing_play_1(옷4).png"];
let imgList2 = ["img/game/clothing/clothing_play2(모자).png",
"img/game/clothing/clothing_play2(양말).png",
"img/game/clothing/clothing_play2(운동화).png",
"img/game/clothing/clothing_play2(장갑).png",];

let eventList = [function(){},function(){},function(){},function(){},function(){}];
let textOrder=[[2,1,0,3],[3,1,2,0]];
let setLocation=[[[24,45],[36,44],[50,40],[62,43]],[[30,30],[44,30],[57,30],[68,30]]];

window.addEventListener('load',function(){
    nextpage(0);
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
    console.log(_x100+" "+_y100);
    let elemnum=textOrder[mode][selected_id];
    /* console.log(_x100+" "+_y100); */
    /* console.log(actionLocation[elemnum][0]+" "+actionLocation[elemnum][1]) */
    if(setLocation[mode][elemnum][0]-sensivility<=_x100 && setLocation[mode][elemnum][0]+sensivility>=_x100){
        if(setLocation[mode][elemnum][1]-sensivility<=_y100 && setLocation[mode][elemnum][1]+sensivility>=_y100){
            this.classList.add("rotateBoth");
            this.removeEventListener("touchmove",handleMove,false);
            this.style.left=setLocation[mode][elemnum][0]/100*document.body.offsetWidth- parseInt(this.offsetWidth/2)+"px";
            console.log('setLocation[mode][elemnum][0]: ', setLocation[mode][elemnum][0]);
            this.style.top=setLocation[mode][elemnum][1]/100*document.body.offsetHeight-parseInt(this.offsetHeight/2)+"px";
            console.log('setLocation[mode][elemnum][1]: ', setLocation[mode][elemnum][1]);
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
    addTouchEvent("container4");
    document.getElementById("background").classList.remove('opacity');
    if(mode == 0){
        document.getElementById("background").setAttribute("src","img/game/clothing/clothing_play1.png");
        document.getElementById("background").classList.add('opacity');
        new Add_img("container4",imgList1,"fadeIn",eventList).apply();
    }else{
        document.getElementById("background").setAttribute("src","img/game/clothing/clothing_play2.png");
        document.getElementById("background").classList.add('opacity');
        new Add_img("container4",imgList2,"fadeIn",eventList).apply();
    }
}


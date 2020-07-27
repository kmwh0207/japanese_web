

var mode = 0;
let selected_id = 0;
let total=10;
let fruit_num=0;
let imgList=["img/game/refrigerator/1.png","img/game/refrigerator/2.png","img/game/refrigerator/3.png","img/game/refrigerator/4.png","img/game/refrigerator/5.png","img/game/refrigerator/6.png","img/game/refrigerator/7.png","img/game/refrigerator/8.png","img/game/refrigerator/9.png","img/game/refrigerator/10.png","img/game/refrigerator/11.png","img/game/refrigerator/12.png"];
window.addEventListener('load', function () {
    nextpage(0);
});

function nextpage(change) {
    addTouchEvent('container10');
    total=Math.floor(Math.random()*10)+1;
    console.log('total: ', total);
    
    if (change > 0) {
        mode = mode == 0 ? 1 : 0;
        /* let elements = document.getElementsByClassName("color");
        for(let element of elements){
            element.classList.add("hidden");
        } */
    }
    let elem = document.getElementsByClassName("item");
    for (let i of elem) {
        i.innerHTML = "";
    }
    if (mode == 0) {
    } else {
    }
    for(let i=0; i<total; i++){
        console.log('appl');
        document.getElementsByClassName('item')[i].style.backgroundImage="url("+imgList[fruit_num]+")";
    }
}

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
    if(selected_id==correctNum[mode]){
        if(setLocation[mode][0]-sensivility<=_x100 && setLocation[mode][0]+sensivility>=_x100){
            if(setLocation[mode][1]-sensivility<=_y100 && setLocation[mode][1]+sensivility>=_y100){
                this.classList.add("rotateBoth");
                this.removeEventListener("touchmove",handleMove,false);
                this.style.left=setLocation[mode][0]/100*document.body.offsetWidth- parseInt(this.offsetWidth/2)+"px";
                console.log('setLocation[mode][0]: ', setLocation[mode][0]);
                this.style.top=setLocation[mode][1]/100*document.body.offsetHeight-parseInt(this.offsetHeight/2)+"px";
                console.log('setLocation[mode][1]: ', setLocation[mode][1]);
                eventFunctions.addExp_(mode);
                is_correct=1;
            }
        } 
    }else{
        
    }
}
function handleEnd(event){
    this.classList.remove("rotateBoth");
    selected_id = -1;
    is_correct==0? nextpage(0):null;
    is_correct=0;
}

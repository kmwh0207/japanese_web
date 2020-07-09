var mode=0;
let selected_id = 0;
let _x100;
let _y100;
let _x,_y;

let imgList1 = ["img/game/color2/orange.png",
"img/game/color2/green.png",
"img/game/color2/red.png",
"img/game/color2/blue.png",
"img/game/color2/pink.png"];

let eventList1 = [function(){},function(){},function(){},function(){},function(){}];

let imgList2 = ["img/game/color2/yellow.png",
"img/game/color2/purple.png",
"img/game/color2/black.png",
"img/game/color2/white.png",
"img/game/color2/brown.png"];

let eventList2 = [function(){},function(){},function(){},function(){},function(){}];

let colorlist1 = ["orange","green","red"];
let colorlist1_ = ["blue","pink"];
let colorlist2 = ["yellow","purple","black"];
let colorlist2_ = ["white","brown"];

let actionLocation = [[[23,11],[31,23]],[[49,11],[58,23]],[[70,11],[82,23]],[[36,33],[44,46]],[[61,33],[71,46]],];

window.addEventListener('load',function(){
    nextpage(0);
    addTouchEvent("container5");
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
    /*console.log(Math.floor(_x/document.body.offsetWidth*100)+" "+Math.floor(_y/document.body.offsetHeight*100));*/
    _x100=_x/document.body.offsetWidth*100;
    _y100=_y/document.body.offsetHeight*100;
    if(actionLocation[selected_id][0][0]<=_x100 && actionLocation[selected_id][1][0]>=_x100){
        if(actionLocation[selected_id][0][1]<=_y100 && actionLocation[selected_id][1][1]>=_y100){
            this.classList.add("rotateRight");
            document.getElementsByClassName("item")[selected_id].classList.remove("hidden");
        }
    }
}
function handleEnd(event){
    this.classList.remove("rotateRight");
    this.style.position="";
    nextpage(0);
}

function nextpage(change){
    if(change>0) {
        mode = mode == 0? 1:0;
        let elements = document.getElementsByClassName("color");
        for(let element of elements){
            element.classList.add("hidden");
        }
    }
    let elem = document.getElementsByClassName("item");
    for(let i of elem){
        i.innerHTML="";
    }
    if(mode == 0){
        document.getElementById("background").setAttribute("src","img/game/color2/color_play1.png");
        new Add_img("container5",imgList1,"fadeIn",eventList1).apply();
        new Add_color("container3",colorlist1).apply();
        new Add_color("container2",colorlist1_).apply();
    }else{
        document.getElementById("background").setAttribute("src","img/game/color2/color_play2.png");
        new Add_img("container5",imgList2,"fadeIn",eventList2).apply();
        new Add_color("container3",colorlist2).apply();
        new Add_color("container2",colorlist2_).apply();
    }
}


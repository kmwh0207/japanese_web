var mode=0;

let imgList = ["img/game/color/red.png",
"img/game/color/green.png",
"img/game/color/blue.png",
"img/game/color/orange.png",
"img/game/color/purple.png"];

let eventList = [function(){play_anim(this,"balloon")},function(){play_anim(this,"balloon")},function(){play_anim(this,"balloon")},function(){play_anim(this,"balloon")},function(){play_anim(this,"balloon")},
];

let imgList_balloon = ["img/game/color/redb.png",
"img/game/color/greenb.png",
"img/game/color/blueb.png",
"img/game/color/orangeb.png",
"img/game/color/purpleb.png"];

let eventList_balloon = [function(){},function(){},function(){},function(){},function(){}];

let imgList2 = ["img/game/color/yellow.png",
"img/game/color/pink.png",
"img/game/color/white.png",
"img/game/color/black.png",
"img/game/color/brown.png"];

let eventList2 = [function(){play_anim(this,"balloon")},function(){play_anim(this,"balloon")},function(){play_anim(this,"balloon")},function(){play_anim(this,"balloon")},function(){play_anim(this,"balloon")},
];

let imgList_balloon2 = ["img/game/color/yellowb.png",
"img/game/color/pinkb.png",
"img/game/color/whiteb.png",
"img/game/color/blackb.png",
"img/game/color/brownb.png"
];

let eventList_balloon2 = [function(){},function(){},function(){},function(){},function(){}];

window.addEventListener('load',function(){
    nextpage();
});

function play_anim(elem,name) {
    let _id = elem.parentNode.dataset.num;
    let element= document.getElementById(name).getElementsByTagName("div")[_id];
    element.classList.remove("none");
    console.log('_id: ', _id);
    let _x = Math.floor(Math.random() * document.getElementById("background").width) + "px";
    element.style.left = _x;
    element.classList.add("moveUp");
    element.addEventListener('animationend', onTransitionEnd, false);
    function onTransitionEnd() {
        element.classList.add("none");
        element.classList.remove("moveUp");
    }
}

function nextpage(){
    let elem = document.getElementsByClassName("item");
    for(let i of elem){
        i.innerHTML="";
    }
    if(mode == 0){
        let img_run = new Add_img("container5",imgList,"fadeIn",eventList);
        img_run.apply();
        img_run = new Add_img("balloon",imgList_balloon,"",eventList_balloon);
        img_run.apply();
        mode=1;
    }else{
        let img_run = new Add_img("container5",imgList2,"fadeIn",eventList2);
        img_run.apply();
        img_run = new Add_img("balloon",imgList_balloon2,"",eventList_balloon2);
        img_run.apply();
        mode=0;
    }
}


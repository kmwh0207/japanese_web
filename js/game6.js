var mode = 0;
let selected_id = 0;

let imgList = ['','','',"img/game/transport/transpotation_learn_1(비행기).png",'',"img/game/transport/transpotation_learn_1(트럭).png",'','',"img/game/transport/transpotation_learn_1(지하철).png",'','',"img/game/transport/transpotation_learn_1(오토바이).png","img/game/transport/transpotation_learn_1(택시).png",'',''];
let imgList_ = ['','','','img/game/transport/transpotation_2_play(헬리콥터).png','',"img/game/transport/transpotation_2_play(자전거).png",'','img/game/transport/transpotation_2_play(구급차).png',"",'img/game/transport/transpotation_2_play(소방차).png','img/game/transport/transpotation_2_play(배).png',"","",'',''];

let eventList = [
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "ひこうき   airplane";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "トラック   truck";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "ちかてつ 　subway ";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "オートバイ motocycle";
    },
    function () {
        document.getElementById("content").innerHTML = "タクシー   taxi";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    }
];
let eventList_ = [
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "ヘリコプター     helicopter";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "じてんしゃ       bicycle  ";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "きゅうきゅうしゃ ambulance";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "しょうぼうしゃ   fire truck  ";
    },
    function () {
        document.getElementById("content").innerHTML = "ふね             ship";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    },
    function () {
        document.getElementById("content").innerHTML = "";
    }
];

window.addEventListener('load', function () {
    nextpage(0);
});

function addTouchEvent(id){
    let elements = document.getElementById(id).children;
    for(let element of elements){
        element.addEventListener("touchstart",handleStart,false);
        element.addEventListener("touchmove",handleMove,false);
        element.addEventListener("touchend",handleEnd,false);
    }
}
function handleStart(event){
    selected_id = this.dataset.num;
}
function handleMove(event){
    
}
function handleEnd(event){
    selected_id = -1;
}

function nextpage(change) {
    if (change > 0) {
        mode = mode == 0 ? 1 : 0;
        /* let elements = document.getElementsByClassName("color");
        for(let element of elements){
            element.classList.add("hidden");
        } */
    }
    addTouchEvent("container5");
    let elem = document.getElementsByClassName("item");
    for (let i of elem) {
        i.innerHTML = "";
    }
    if (mode == 0) {
        document.getElementById("background").setAttribute("src","img/game/transport/transpotation_learn_1(background).png");
        new Add_img("container5", imgList, "opacity", eventList).apply();
    } else {
        document.getElementById("background").setAttribute("src","img/game/transport/transpotation_learn_2(background).png");
        new Add_img("container5", imgList_, "opacity", eventList_).apply();
    }
}

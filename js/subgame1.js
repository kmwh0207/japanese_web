
var mode = 0;
let selected_id = 0;
let imgList=["img/game/number/1.png","img/game/number/2.png","img/game/number/3.png","img/game/number/4.png","img/game/number/5.png","img/game/number/6.png","img/game/number/7.png","img/game/number/8.png","img/game/number/9.png","img/game/number/10.png"]
let imgList1 = ["img/game/number/1.png", "img/game/number/2.png"];

let eventList1 = [
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "1";
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "2";
    }
];

let imgList2 = ["img/game/number/3.png","img/game/number/4.png","img/game/number/5.png"];

let eventList2 = [
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "3";
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "4";
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "5";
    }
];


let imgList1_ = ["img/game/number/6.png","img/game/number/7.png"];

let eventList1_ = [
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "6";
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "7";
    }
];

let imgList2_ = ["img/game/number/8.png","img/game/number/9.png","img/game/number/10.png"];

let eventList2_ = [
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "8";
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "9";
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "10";
    }
];


window.addEventListener('load', function () {
    nextpage(0);
});

function pageChange(num){
    mode=num;
    nextpage(num);
}

function nextpage(mode) {
    let elem = document.getElementsByClassName("item");
    for (let i of elem) {
        i.innerHTML = "";
    }
    document.getElementById("container_final").classList.add("none");
    document.getElementsByClassName("item_")[0].classList.remove("opacity");
    if (mode == 0) {
        new Add_img("container2", imgList1, "opacity", eventList1).apply();
        new Add_img("container3", imgList2, "opacity", eventList2).apply();
    } else if(mode == 1) {
        new Add_img("container2", imgList1_, "opacity", eventList1).apply();
        new Add_img("container3", imgList2_, "opacity", eventList2).apply();
    }else{
        document.getElementById("container_final").classList.remove("none");
        playgame();
    }
}

function playgame(){
    let num=Math.floor(Math.random()*9)+1;
    document.getElementsByClassName("item_")[0].style.backgroundImage=`url('${imgList[num]}')`;
    let correct=Math.floor(Math.random()*3);
    document.getElementsByClassName("item_")[correct+1].style.backgroundImage=`url('${imgList[num].slice(0, -4) + "_.png"}')`;
    console.log('correct+1: ', correct+1);
    console.log('imgList[num].slice(0, -4) + "_.png": ', imgList[num].slice(0, -4) + "_.png");
    document.getElementsByClassName("item_")[Math.abs(correct+1)%3+1].style.backgroundImage=`url('${imgList[(Math.abs(num-3)==num)||(Math.abs(num-3)==0)?Math.abs(num-4):Math.abs(num-3)].slice(0, -4) + "_.png"}')`;
    document.getElementsByClassName("item_")[Math.abs(correct+2)%3+1].style.backgroundImage=`url('${imgList[(Math.abs(num-5)==num)||(Math.abs(num-5)==0)?Math.abs(num-1):Math.abs(num-5)].slice(0, -4) + "_.png"}')`;
    document.getElementsByClassName("item_")[correct+1].addEventListener('touchend',function(){
        document.getElementsByClassName("item_")[0].style.backgroundImage=`url('${imgList[num].slice(0, -4) + "_.png"}')`;
        document.getElementsByClassName("item_")[0].classList.add("opacity");/*정답 맞출경우*/

        setTimeout(() => {
            document.getElementsByClassName("item_")[0].classList.remove("opacity");
            playgame();
        }, 2000);
    })
}

var mode = 0;
let selected_id = 0;
let imgList=["img/game/number/1.png","img/game/number/2.png","img/game/number/3.png","img/game/number/4.png","img/game/number/5.png","img/game/number/6.png","img/game/number/7.png","img/game/number/8.png","img/game/number/9.png","img/game/number/10.png"]
let imgList1 = ["img/game/number/1.png", "img/game/number/2.png"];
let soundList=['1.mp3','2.mp3','3.mp3','4.mp3','5.mp3','6.mp3','7.mp3','8.mp3','9.mp3','10.mp3'];
let eventList1 = [
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "1";
        music("img/game/number/"+soundList[0]);
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "2";
        music("img/game/number/"+soundList[1]);
    }
];

let imgList2 = ["img/game/number/3.png","img/game/number/4.png","img/game/number/5.png"];

let eventList2 = [
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "3";
        music("img/game/number/"+soundList[2]);
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "4";
        music("img/game/number/"+soundList[3]);
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "5";
        music("img/game/number/"+soundList[4]);
    }
];


let imgList1_ = ["img/game/number/6.png","img/game/number/7.png"];

let eventList1_ = [
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "6";
        music("img/game/number/"+soundList[5]);
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "7";
        music("img/game/number/"+soundList[6]);
    }
];

let imgList2_ = ["img/game/number/8.png","img/game/number/9.png","img/game/number/10.png"];

let eventList2_ = [
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "8";
        music("img/game/number/"+soundList[7]);
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "9";
        music("img/game/number/"+soundList[8]);
    },
    function () {
        this.src = this.src.slice(0, -4) + "_.png";
        document.getElementById("content").innerHTML = "10";
        music("img/game/number/"+soundList[9]);
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
    let num1=(Math.abs(num-3))+1;
    console.log('num1: ', num1);
    let num2=(Math.abs(num-6))+1;
    console.log('num2: ', num2);
    document.getElementsByClassName("item_")[Math.abs(correct+1)%3+1].style.backgroundImage=`url('${imgList[num1!=num?num1:Math.abs(num-3)].slice(0, -4) + "_.png"}')`;
    document.getElementsByClassName("item_")[Math.abs(correct+2)%3+1].style.backgroundImage=`url('${imgList[num2!=num?num2:Math.abs(num-6)].slice(0, -4) + "_.png"}')`;
    document.getElementsByClassName("item_")[correct+1].addEventListener('touchend',function(){
        document.getElementsByClassName("item_")[0].style.backgroundImage=`url('${imgList[num].slice(0, -4) + "_.png"}')`;
        document.getElementsByClassName("item_")[0].classList.add("opacity");/*정답 맞출경우*/

        setTimeout(() => {
            document.getElementsByClassName("item_")[0].classList.remove("opacity");
            playgame();
        }, 2000);
        this.removeEventListener("touchend",arguments.callee);
    })
}
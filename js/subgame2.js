

var mode = 0;
let selected_id = 0;

let imgList = ["img/game/number/1.png", "img/game/number/2.png"];
let imgList2=['img/game/draw/1.png','img/game/draw/2.png','img/game/draw/3.png'];

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

function nextpage(change) {
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
        new Add_img("container2", imgList1, "opacity", eventList1).apply();
        new Add_img("container3", imgList2, "opacity", eventList2).apply();
    } else {
        new Add_img("container2", imgList1_, "opacity", eventList1).apply();
        new Add_img("container3", imgList2_, "opacity", eventList2).apply();
    }
}

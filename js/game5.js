var mode=0;
let selected_id = 0;

let textList=[['','','','','',''],['','','','','','']];
let imgList1 = ["img/game/drink/コーヒー.png", 
"img/game/drink/ホットチョコレート.png",
"img/game/drink/ぎゅうにゅう.png",
"img/game/drink/とうにゅう.png",
"", 
"img/game/drink/おちゃ.png"];
let imgList2 = ["img/game/drink/りんごジュス.png",
"img/game/drink/レモネード.png",
"img/game/drink/アイスティー.png",
"img/game/drink/みず.png",
"",
"img/game/drink/オレンジジュース.png"];

window.addEventListener('load',function(){
    nextpage(0);
});
let eventList1 = [
    function () {
        document.getElementById("content").innerHTML = "コーヒー           coffee  ";
        music("img/game/drink/배우기1_1코히(커피).mp3");
    },function () {
        document.getElementById("content").innerHTML = "ホットチョコレート hot chocolate";
        music("img/game/drink/.mp3");
    },function () {
        document.getElementById("content").innerHTML = "ぎゅうにゅう       milk";
        music("img/game/drink/.mp3");
    },function () {
        document.getElementById("content").innerHTML = "とうにゅう         soybean milk";
        music("img/game/drink/.mp3");
    },function () {
        document.getElementById("content").innerHTML = "";
    },function () {
        document.getElementById("content").innerHTML = "おちゃ             tea";
        music("img/game/drink/.mp3");
    }
];
let eventList2 = [
    function () {
        document.getElementById("content").innerHTML = "りんごジュス       apple juice";
        music("img/game/drink/.mp3");
    },function () {
        document.getElementById("content").innerHTML = "レモネード         lemonade";
        music("img/game/drink/.mp3");
    },function () {
        document.getElementById("content").innerHTML = "アイスティー       icetea";
        music("img/game/drink/.mp3");
    },function () {
        document.getElementById("content").innerHTML = "みず               water";
        music("img/game/drink/.mp3");
    },function () {
        document.getElementById("content").innerHTML = "";
    },function () {
        document.getElementById("content").innerHTML = "オレンジジュース   orangejuice";
        music("img/game/drink/.mp3");
    },
];

function addTouchEvent(id){
    let elements = document.getElementById(id).children;
    for(let i=0; i<elements.length; i++){
        elements[i].addEventListener("touchstart",function(){
            selected_id = this.dataset.num;
            document.getElementById("content").innerHTML=textList[mode][i];
            document.getElementsByClassName("item")[selected_id].classList.remove("hidden");
        },false);
    }
}

function nextpage(change){
    if(change>0) {
        mode = mode == 0? 1:0;
        let elements = document.getElementsByClassName("item");
        for(let element of elements){
            element.classList.add("hidden");
        }
    }
    let elem = document.getElementsByClassName("item");
    for(let i of elem){
        i.innerHTML="";
    }
    addTouchEvent("container6",0,textList);
    if(mode == 0){
        document.getElementById("background").setAttribute("src","img/game/drink/drinks_learn_1(background).png");
        //document.getElementById("bt").setAttribute("src","img/game/clothing/bt.png")
        new Add_img("container6",imgList1,"fadeIn",eventList1).apply();
    }else{
        document.getElementById("background").setAttribute("src","img/game/drink/drinks_learn_2(background).png");
        //document.getElementById("bt").setAttribute("src","img/game/clothing/bt2.png")
        new Add_img("container6",imgList2,"fadeIn",eventList2).apply();
    }
}


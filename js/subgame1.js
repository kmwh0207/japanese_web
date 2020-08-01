
var mode = 0;
let selected_id = 0;
let count=0;
let imgList=["img/game/number/1.png","img/game/number/2.png","img/game/number/3.png","img/game/number/4.png","img/game/number/5.png","img/game/number/6.png","img/game/number/7.png","img/game/number/8.png","img/game/number/9.png","img/game/number/10.png"];
let soundList=['1.mp3','2.mp3','3.mp3','4.mp3','5.mp3','6.mp3','7.mp3','8.mp3','9.mp3','10.mp3'];

window.addEventListener('load', function () {
    nextpage(0);
    document.getElementById("numimg").addEventListener("touchend",function(i){
        this.src = this.src.slice(0, -4) + "_.png";
        count++;
        document.getElementById("content").innerHTML = selected_id;
        music("img/game/number/"+soundList[selected_id]);
        if(count>=5) return;
        setTimeout(() => {
            selected_id++;
            document.getElementById("numimg").src=imgList[selected_id];
        }, 1500);
    });
});

function pageChange(num){
    mode=num;
    nextpage(num);
}

function nextpage(mode) {
    Array.from(document.getElementsByClassName("button")).forEach(function(){
      
    });//버튼누르면 색변하게 수정중
    this.src=this.src.substring(0,-4)+"_.png";
    let elem = document.getElementsByClassName("item");
    count=0;
    for (let i of elem) {
        i.innerHTML = "";
    }
    document.getElementById("container_final").classList.add("none");
    document.getElementsByClassName("item_")[0].classList.remove("opacity");
    document.getElementById("number").classList.remove("remove");

    if (mode == 0) {
        selected_id=0;
        document.getElementById("numimg").src=imgList[selected_id];
    } else if(mode == 1) {
        selected_id=5;
        document.getElementById("numimg").src=imgList[selected_id];
    }else{
        document.getElementById("container_final").classList.remove("none");
        document.getElementById("number").classList.add("none");
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
        music("img/game/number/"+soundList[num]);
        setTimeout(() => {
            document.getElementsByClassName("item_")[0].classList.remove("opacity");
            playgame();
        }, 2000);
        this.removeEventListener("touchend",arguments.callee);
    })
}
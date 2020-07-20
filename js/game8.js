var mode=0;
let selected_id = 0;

let textList=[];

window.addEventListener('load',function(){
    nextpage(0);
});

function addTouchEvent(id,num,list){
    let elements = document.getElementById(id).children;
    for(let i=0; i<elements.length; i++){
        elements[i].addEventListener("touchend",()=>{

        },false);
    }
}

function nextpage(change){
    if(change>0) {
        mode = mode == 0? 1:0;
    }
    let elem = document.getElementsByClassName("item");
    for(let i of elem){
        i.innerHTML="";
    }
    addTouchEvent("container10",0,textList);
    if(mode == 0){
        document.getElementById("background").setAttribute("src","img/game/body/body_part1(background) (1).png");
        document.getElementById("bt").setAttribute("src","img/game/body/more_button.png")
        //new Add_img("container3",imgList1,"fadeIn",eventList1).apply();
    }else{
        document.getElementById("background").setAttribute("src","img/game/body/body_part1(background) (2).png");
        document.getElementById("bt").setAttribute("src","img/game/body/less_button.png")
        //new Add_img("container3",imgList2,"fadeIn",eventList2).apply();
    }
}


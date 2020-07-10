var mode=0;

window.addEventListener('load',function(){
    nextpage(0);
});

function nextpage(change){
    if(change>0) {
        mode = mode == 0? 1:0;
    }
    let elem = document.getElementsByClassName("item");
    for(let i of elem){
        i.removeAttribute('style');
        i.innerHTML="";
    }
    if(mode == 0){
        
    }else{
        document.getElementById("background").src="img/game/family/family1.png";
        document.getElementById("background").classList.add('opacity');
    }
}


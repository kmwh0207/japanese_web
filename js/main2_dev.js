let imgList = ["img/mainmenu/1.color_eicon.png",
"img/mainmenu/2.fruit_eicon.png",
"img/mainmenu/3.family_eicon.png",
"img/mainmenu/4.clothing_eicon.png",
"img/mainmenu/5.drinks_eicon.png",
"img/mainmenu/6.transpotation_eicon.png",
"img/mainmenu/7.food_eicon.png",
"img/mainmenu/8.body_parts_eicon.png"]

var movepage = function(page){
    document.getElementById("choice").style.display="block";
    new Promise(function(resolve,reject){
        document.getElementById("choice").classList.add("fadeIn");
        document.getElementById("choice").addEventListener("touchend",function(e){
            e.preventDefault();
            console.log("touch");
            if(e.changedTouches[0].pageX < document.getElementById("background").width/2){
                resolve(1);
            }else{
                resolve(2);
            }
        })
    }).then(function(result){
        document.getElementById("frame").setAttribute("src",page+"/?id="+result);
        document.getElementById("frame").style.zIndex=500;
    });
}

let eventList = [function(){movepage("game1.html")},
function(){movepage("game2.html")},
function(){movepage("game3.html")},
function(){movepage("game4.html")},
function(){movepage("game5.html")},
function(){movepage("game6.html")},
function(){movepage("game7.html")},
function(){movepage("game8.html")},]

window.addEventListener('load',function(){
    let img_run = new Add_img("container",imgList,"fadeIn",eventList);
    img_run.apply();
});

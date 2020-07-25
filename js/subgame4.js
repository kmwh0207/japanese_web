var mode=0;
var arrowCount=0;
let selected_id=-1;
var total_page=5;
var arrow_location;
var balloon_size;
let eventFunctions;
let score=0;

let namelist=[['こんばんは(저녁인사)','いただきます(잘 먹겠습니다.)','こんにちは(점심인사)','おかえりなさい(어서오세요.)','どうぞ(하세요.)','かわいい(귀엽다.)','やすい(쉽다.)','また、あした(내일보자)','はじめまして(처음뵙겠습니다.)','おめでとうございます(생일 축하합니다.)'],['ただいま(다녀왔어요)','からい(맵다)','じゃ、また(그럼,또)','おはよう(아침인사)','さようなら(안녕히계세요.)','むずかしい(어렵다)','おやすみ(잘 자)','はじめまして。(처음뵙겠습니다.)','ごめんね(미안해)','いってきます(다녀오겠습니다.)'],['ねる(자다)','おきる(일어나다)','あう(만나다)','たべる(먹다)','のむ(마시다)','のる(타다)','いく(가다)','べんきょうする(공부하다)','およぐ(수영하다)','くる(오다)'],['みる(보다)','あそぶ(놀다)','うたをうたう(노래하다)','まつ(기다리다)','かえる(되돌아가다)','きく(듣다)','かく(쓰다)','およぐ(수영하다)','あつい(덥다)','さむい(춥다)'],['たかい(비싸다)','やすい(싸다)','あたらしい(새롭다)','ふるい(오래되다)','おおい(많다)','すくない(적다)','わるい(나쁘다)','いい(좋다)','ちかい(가깝다)','とおい(멀다)']];
var names=[];
let colorname=[['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var balloon_location=[];
let imgList = [
    [
        "img/game/balloon/풍선1/보물찾기1-풍선1(저녁인사).png",
        "img/game/balloon/풍선1/보물찾기1-풍선2(잘 먹겠습니다.).png",
        "img/game/balloon/풍선1/보물찾기1-풍선3(점심인사).png",
        "img/game/balloon/풍선1/보물찾기1-풍선4(어서오세요).png",
        "img/game/balloon/풍선1/보물찾기1-풍선5(하세요).png",
        "img/game/balloon/풍선1/보물찾기1-풍선6(귀엽다).png",
        "img/game/balloon/풍선1/보물찾기1-풍선7(쉽다).png",
        "img/game/balloon/풍선1/보물찾기1-풍선8(내일보자).png",
        "img/game/balloon/풍선1/보물찾기1-풍선9(처음뵙겠습니다.).png",
        "img/game/balloon/풍선1/보물찾기1-풍선10(생일축하합니다.).png"
    ],
    [
        "img/game/balloon/풍선2/보물찾기_풍선2_1.png",
        "img/game/balloon/풍선2/보물찾기_풍선2_2.png",
        "img/game/balloon/풍선2/보물찾기_풍선2_3.png",
        "img/game/balloon/풍선2/보물찾기_풍선2_4.png",
        "img/game/balloon/풍선2/보물찾기_풍선2_5.png",
        "img/game/balloon/풍선2/보물찾기_풍선2_6.png",
        "img/game/balloon/풍선2/보물찾기_풍선2_7.png",
        "img/game/balloon/풍선2/보물찾기_풍선2_8.png",
        "img/game/balloon/풍선2/보물찾기_풍선2_9.png",
        "img/game/balloon/풍선2/보물찾기_풍선2_10.png"
    ],
    [
        "img/game/balloon/풍선3/3_1.png",
        "img/game/balloon/풍선3/3_2.png",
        "img/game/balloon/풍선3/3_3.png",
        "img/game/balloon/풍선3/3_4.png",
        "img/game/balloon/풍선3/3_5.png",
        "img/game/balloon/풍선3/3_6.png",
        "img/game/balloon/풍선3/3_7.png",
        "img/game/balloon/풍선3/3_8.png",
        "img/game/balloon/풍선3/3_9.png",
        "img/game/balloon/풍선3/3_10.png"
    ],
    [
        "img/game/balloon/풍선4/4_1.png",
        "img/game/balloon/풍선4/4_2.png",
        "img/game/balloon/풍선4/4_3.png",
        "img/game/balloon/풍선4/4_4.png",
        "img/game/balloon/풍선4/4_5.png",
        "img/game/balloon/풍선4/4_6.png",
        "img/game/balloon/풍선4/4_7.png",
        "img/game/balloon/풍선4/4_8.png",
        "img/game/balloon/풍선4/4_9.png",
        "img/game/balloon/풍선4/4_10.png"
    ],
    [
        "img/game/balloon/풍선5/5_1.png",
        "img/game/balloon/풍선5/5_2.png",
        "img/game/balloon/풍선5/5_3.png",
        "img/game/balloon/풍선5/5_4.png",
        "img/game/balloon/풍선5/5_5.png",
        "img/game/balloon/풍선5/5_6.png",
        "img/game/balloon/풍선5/5_7.png",
        "img/game/balloon/풍선5/5_8.png",
        "img/game/balloon/풍선5/5_9.png",
        "img/game/balloon/풍선5/5_10.png"
    ]
];

let eventList = [
    [
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {}
    ],
    [
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {}
    ],
    [
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {}
    ],
    [
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {}
    ],
    [
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {},
        function () {}
    ]
];
var heatAnim=["img/game/balloon/사본 -풍선터짐애니_1.png","img/game/balloon/사본 -풍선터짐애니_2.png","img/game/balloon/사본 -풍선터짐애니_3.png","img/game/balloon/사본 -풍선터짐애니_4.png","img/game/balloon/사본 -풍선터짐애니_5.png","img/game/balloon/사본 -풍선터짐애니_6.png","img/game/balloon/사본 -풍선터짐애니_7.png","img/game/balloon/사본 -풍선터짐애니_8.png",""];
function heatAnimation(balloon){
    balloon.children[0].classList.add('fadeOut');
    let i=0;
    balloon.style.backgroundSize="100%";
    balloon.style.backgroundRepeat="no-repeat";
    let timer = setInterval(function(){
        balloon.style.backgroundImage=`url("${heatAnim[i]}")`;
        i++;
        if(i>=heatAnim.length) clearTimeout(timer);
    },150);
}

window.addEventListener('load',function(){
    nextpage(undefined,0);
    let arrow=document.getElementById("arrow");
    document.body.addEventListener("touchend",function(){
        document.getElementById('arrow_div').style.animationPlayState="paused";
        arrow.classList.add("arrow_anim");
        /* arrow.setAttribute("style","");
        arrow.style.left=arrow.getBoundingClientRect().left;
        arrow.style.top=arrow.getBoundingClientRect().top;
        arrow.style.width=arrow.offsetWidth+"px";
        arrow.style.height=arrow.offsetHeight+"px";
        arrow.style.position='fixed'; */
        arrow_location=arrow.getBoundingClientRect().left+(arrow.offsetWidth/2);
        balloon_location.forEach(function(value,index){
            console.log('value+balloon_size: ', value, value+balloon_size);
            console.log('arrow_location: ', arrow_location);
            console.log('arrow_location<(value+balloon_size) && arrow_location>(value) : ', arrow_location<(value+balloon_size) && arrow_location>(value) );
            if(arrow_location<(value+balloon_size) && arrow_location>(value) ){
                let balloon = document.getElementsByClassName('item')[index];
                heatAnimation(balloon);
                eventFunctions.addExp_(index); //성공했을때
                score= score+20;
            }
        });
        arrowCount++;
        if(arrowCount>=5){
            document.getElementById("result").classList.remove("none");
            if(score !=0){
                document.getElementById("score").src=`img/game/balloon/${score}.png`;
                document.getElementById("star").src=`img/game/balloon/별(${score}점).png`;
            }else{
                document.getElementById("content").innerHTML="0점 다음 기회에!"
            }
        }
    },true);
    arrow.addEventListener("animationend",function(){
        arrow.classList.remove("arrow_anim");
        document.getElementById('arrow_div').style.animationPlayState="running";
        /* arrow.setAttribute("style","position:relative; height:100%; left:-50%; margin-left: auto; margin-right: auto;"); */
    },true);
});



function nextpage(event,num){
    score=0;
    arrowCount=0;
    document.getElementById("result").classList.add("none");
    new Promise(function(resolve,reject){
        if(num == 0){
            this.mode = 0;
        }else{
            event.preventDefault();
            let elem = document.getElementsByClassName("item");
            for(let i of elem){
                i.innerHTML="";
            }
            if(num == 1){
                this.mode= (this.mode+1)%this.total_page;
            }else{
                this.mode= Math.abs((this.mode-1)%this.total_page);
            }
        }
        let random_num=Math.floor(Math.random()*6);
        let img_run = new Add_img("container5",imgList[this.mode].slice(random_num,random_num+5),"no",eventList[this.mode].slice(random_num,random_num+5));
        img_run.apply();
        this.balloon_location=[];
        this.names=[];
        names=namelist[this.mode].slice(random_num,random_num+5);
        eventFunctions=new Add_exp(names);
        Array.prototype.forEach.call(document.getElementsByClassName('item'),function(ball){
            this.balloon_location.push(ball.getBoundingClientRect().left);
        });
        resolve();
    }).then(function(resolve){
        balloon_size=document.getElementsByClassName('item')[0].offsetWidth;
    });
}


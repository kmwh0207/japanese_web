window.addEventListener('load', function () {
    document.getElementsByTagName("iframe")[0].addEventListener("load", function (i) {
        console.log(this);
        let link = this.src.split("/").pop();
        //let link = new RegExp(this.src.split("/").pop());
        if (link.match('_2.') || link.match('subgame')) {
            let cuma = document.createElement("img");
            cuma.setAttribute('style', "position:absolute; z-index:2000; bottom:0; right:15%; width:20%;");
            cuma.classList.add("cuma_show");
            document.body.appendChild(cuma);
        }
    });
});


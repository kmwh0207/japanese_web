window.onload = function(){
    var img = document.getElementById("background");
    document.body.style.width=img.width.toString()+"px"
    document.body.style.height=img.height.toString()+"px"
}
/*document.body.style.width=window.innerWidth.toString()+"px"
document.body.style.height=window.innerHeight.toString()+"px"*/

class apply_img {
    constructor(id, img_list) {
        this._id = id;
        this.img_list;
    }
    apply() {
        let elements = document.getElementById("container").childNodes;
        for (const i of elements) {
            i.
            console.log(i);
        }
        console.log("apply img");
    }
}

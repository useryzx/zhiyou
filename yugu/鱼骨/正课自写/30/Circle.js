function Circle(center, r) {
    this.div = document.createElement("div");
    this.div.style.position = "absolute";
    this.div.style.left = center.x - r + "px";
    this.div.style.top = center.y - r + "px";
    this.div.style.width = 2 * r + "px";
    this.div.style.height = 2 * r + "px";
    this.div.style.borderRadius = "50%";
    this.div.style.border = "solid 1px black";
    this.draw = function(){
        document.body.appendChild(this.div);
    }
}
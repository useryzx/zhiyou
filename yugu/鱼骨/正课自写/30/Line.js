function Line(p1, p2) {
    this.div = document.createElement("div");
    this.div.style.position = "absolute";
    this.div.style.left = p1.x + "px";
    this.div.style.top = p1.y + "px";
    this.div.style.border = "solid 1px black";
    this.div.style.height = 0 + "px";
    this.div.style.width = p1.distanceToPoint(p2) + "px";
    this.div.style.transform = "rotate(" + p1.atanToPoint(p2) + "deg)";
    this.div.style.transformOrigin = "0 0 0";
    this.show = function () {
        document.body.appendChild(this.div)
    }
}
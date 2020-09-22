function Bubble(x, y, i,number) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.color = colors[i];
    this.type = i;
    this.number=number;
    this.block = 0;

    this.draw = function(){
        drawBall(this.x, this.y, this.r, this.type);
    }
    this.move = function () {
        this.y -= 1;
    }
}
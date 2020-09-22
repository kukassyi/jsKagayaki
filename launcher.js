Launcher.prototype = {
    draw: function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);

         ctx.beginPath();
        // //パスの開始座標を指定する
        ctx.moveTo(this.x+this.w/2, this.y);
        // //座標を指定してラインを引いていく
        ctx.lineTo(100*(Math.cos(this.launch * Math.PI/180)) + this.x + this.w/2, 
            -100*(Math.sin(this.launch * Math.PI/180)) + this.y);
     
        ctx.strokeStyle = "yellow" ;
        ctx.lineWidth = 1 ;
         // //現在のパスを輪郭表示する
        ctx.closePath();
        ctx.stroke();

    }
}

function Launcher() {
    this.w = 10;
    this.h = 40;
    this.x = (WIDTH - this.w) / 2;
    this.y = HEIGHT - 40;
    this.color = 'yellow'
    this.keyL = false;
    this.keyR = false;
    this.launch = 90;
}
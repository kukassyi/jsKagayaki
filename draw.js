
function drawBall(x, y, r, type) {
    switch(type){
        case 0:
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(x, y, r-10, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(x, y, r-15, 0, Math.PI * 2, false);
            ctx.fill();
            break;
        case 1:
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.fill();
            break;
        case 2:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(x, y, r-10, 0, Math.PI * 2, false);
            ctx.fill();
            break;
        case 3:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fillStyle = "red";
            ctx.beginPath();    
            ctx.ellipse(x, y, r, r-10, Math.PI, 0, 2 * Math.PI);
            ctx.fill();
            break;
        default:
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.fill();
            break;
    }
}

function draw() {
    // fill background
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    Launcher.draw(ctx);

    bubbles.forEach(function (bubble) {
        bubble.draw();
    });
    // draw balls
    ball.draw(ctx);
    if (isNaN(timer)) {
        ctx.fillText('GAME OVER', 220, 250);
    }

}
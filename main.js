function init() {
    ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "20pt Arial";

    // initialize event listener
    window.addEventListener('keydown', function (e) {
        toggleKey(e.keyCode, true);
    }, true);
    window.addEventListener('keyup', function (e) {
        toggleKey(e.keyCode, false);
    }, true);

    // initialize players
    Launcher = new Launcher();

    //ボールを用意
    for (let i = 0; i < 10000; i++) {
        balls.push(new Ball(Math.floor(Math.random() * 4)));
    }
    ball = balls[0];
    balls.shift();

    //lancherの横幅
    Launcher.w = Math.max(20, Launcher.w - 10);
    //ボールの速度
    ball.speed = Math.min(20, ball.speed + 1);

    if (isNaN(timer)) {
        addbubble = setInterval(addBubble, 2000);
        timer = setInterval(mainLoop, 15);

    }
}

function addBubble() {
    //全体をy軸方向に40ずらす
    bubbles.forEach(e => e.y = e.y + 40);
    //新規でBubbleを追加
    bubbles.push(new Bubble(Math.floor(Math.random() * 500) + 20, 20, Math.floor(Math.random() * 4), ++bubbleNumber));
}

function mainLoop() {

    //表示処理
    draw();

    //次のballを表示
    drawBall(Launcher.x + 50, Launcher.y, balls[0].r, balls[0].type);
    drawBall(Launcher.x + 100, Launcher.y, balls[1].r, balls[1].type);
    drawBall(Launcher.x + 150, Launcher.y, balls[2].r, balls[2].type);

    //スコア表示
    ctx.fillStyle = 'rgb(0,255,0)';
    ctx.fillText(('00000' + score).slice(-5), 520, 600);

    var nx = ball.x + ball.dx;
    var ny = ball.y - ball.dy;

    // hit the wall?
    if (ny < ball.r && ball.dy < 0) {
        //ball.changeDir(ball.dir * -1);
        bubbleNumber++;
        bubbles.push(new Bubble(ball.x, ball.y + ball.r, ball.type, bubbleNumber));
        //ボールを止める
        ball = new Ball(0);
        stopLaunch = false
        return;
    } else if (nx < ball.r || nx + ball.r > WIDTH) {
        ball.changeDir(Math.PI - ball.dir);
    }

    ball.move();

    //hit the bubble?
    bubbles.some(function (bubble, i) {
        if ((Math.pow((bubble.x - ball.x), 2) + Math.pow((bubble.y - ball.y + ball.r / 2), 2)
            < Math.pow((bubble.r + ball.r), 2))) {
            hitindex = i;
            if (ball.type === bubble.type) {
                bubbles.push(new Bubble(ball.x, ball.y, ball.type, bubble.number));
            } else {
                bubbles.push(new Bubble(ball.x, ball.y, ball.type, ++bubbleNumber));
            }
            //ボールを止める
            ball = new Ball(0);
            stopLaunch = false
            return true;
        }
        return false;
    });

    //近接する同タイプのbubbleを同じbubbleNumberにする
    let newBubbles = bubbles;
    for (let f of bubbles) {
        for (let s of newBubbles) {
            if ((Math.pow((f.x - s.x), 2) + Math.pow((f.y - s.y), 2) <=
                Math.pow((f.r + s.r), 2)) &&
                f.type === s.type &&
                f.number != s.number) {
                bubbles.forEach(function (r) {
                    if (r.number == s.number) {
                        r.number = f.number;
                    }
                });
            }
        }
    }

    //bubble削除処理　削除するべきbubbleナンバーを設定
    let contacts = new Map();
    let creardata = [];
    for (let bubble of bubbles) {
        if (contacts.has(bubble.number)) {
            let num = contacts.get(bubble.number) + 1;
            contacts.set(bubble.number, num);
            if (num > 3) {
                creardata.push(bubble.number);
            }
        } else {
            contacts.set(bubble.number, 1);
        }
    }
    //削除実施
    let oldBubblesLength = 0;
    oldBubblesLength = bubbles.length;

    bubbles = bubbles.filter(n =>
        !creardata.some(s =>
            s === n.number)
    );
    let newBubblesLength = 0;
    newBubblesLength = bubbles.length;
    //スコア換算
    score = score + oldBubblesLength - newBubblesLength;
    //5以上消したならボーナス
    if (oldBubblesLength - newBubblesLength > 4) {
        score = score + 10;
    }


    //bubbleの塊ごとにblock番号を設定し、それぞれ上壁に移動させる
    //一旦、ブロック番号を0クリアする
    bubbles.forEach(s => s.block = 0);
    let blocknum = 1;
    for (let f of bubbles) {
        if (f.block == 0) {
            bubbleBlock(f, blocknum);
            blocknum++;
        }
    }

    //上壁に接しているブロックは動かさないので9999を設定
    for (let f of bubbles) {
        if (f.y - f.r <= 0) {
            bubbles.filter(g => g.block === f.block).forEach(e => e.block = 9999);
        }
    }

    //上への移動処理
    for (let f of bubbles) {
        if (f.block != 9999) {
            f.move();
        }
    }

    if (bubbles.some(s => s.y > 500)) {
        clearInterval(timer);
        clearInterval(addbubble);
        timer = NaN;
        draw();
        return;
    }
}

//再起処理でbubbleの塊にblock番号を付ける
function bubbleBlock(localBubble, blocknum) {
    let innerBubbles = bubbles;
    let f = localBubble;
    localBubble.block = blocknum;
    for (let s of innerBubbles) {
        if (s.block == 0 &&
            (Math.pow((f.x - s.x), 2) + Math.pow((f.y - s.y), 2) <=
                Math.pow((f.r + s.r), 2))) {
            s.block = blocknum;
            bubbleBlock(s, blocknum);
        }
    }
    return;
}


function toggleKey(code, flag) {
    switch (code) {
        case 37:
            Launcher.keyL = flag;
            if (Launcher.launch < 160) {
                Launcher.launch++;
            }
            break;
        case 38:
            Launcher.launch = 90;
            break;
        case 39:
            Launcher.keyR = flag;
            if (Launcher.launch > 20) {
                Launcher.launch--;
            }
            break;
        case 32:
            if (!stopLaunch) {
                //ボールの取り出し
                ball = balls[0];
                balls.shift();
                ball.x = Launcher.x + Launcher.w / 2;
                ball.y = Launcher.y - ball.r;
                ball.changeDir(Launcher.launch * Math.PI / 180);
                stopLaunch = true;
            }
            break;
    }
}


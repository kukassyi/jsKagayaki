
    function Ball(type) {
        this.x = 0;
        this.y = HEIGHT + this.r;    // out of the area
        this.dx = 0;
        this.dy = 0;
        this.r = 20;
        this.dir = 0;
        this.speed = 10;
        this.type=type;

        this.move = function () {
            this.x += this.dx;
            this.y += this.dy;
        }

        this.changeDir = function (dir) {
            this.dir = dir;
            this.dx = this.speed * Math.cos(dir);
            this.dy = - this.speed * Math.sin(dir);
        }

        this.draw = function (ctx) {
            drawBall(this.x, this.y, this.r, this.type);
        }
    }


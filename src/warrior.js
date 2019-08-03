export default class Warrior {
    constructor(gameWidth, gameHeight) {     
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.img = new Image()
        this.width = 150;
        this.height = 200;
        this.position = {
            x: gameWidth / 4,
            y: gameHeight / 4
        }  
        this.maxSpeed = 2; 
        this.speed_x = 0;
        this.speed_y = 0;
        this.walkValue = 1;
        this.alternate = () => {
            if(this.walkValue === 1){
                return this.walkValue = 2;
            }else if (this.walkValue === 2){
                return this.walkValue = 1;
            }
        };
    }

    onload() {
        this.img.src = '../assets/StopDown.png';
    }

    moveLeft() {
        this.speed_x = -this.maxSpeed;
        this.img.src = '../assets/Left' + this.alternate() + '.png';
    };

    moveRight() {
        this.speed_x = this.maxSpeed;
        this.img.src = '../assets/Right' + this.alternate() + '.png';
    };

    moveUp() {
        this.speed_y = -this.maxSpeed;
        this.img.src = '../assets/Upward' + this.alternate() + '.png';
    };

    moveDown() {
        this.speed_y = this.maxSpeed;
        this.img.src = '../assets/Downward' + this.alternate() + '.png';
    };

    stop(key) {
        if (key === 37) this.img.src = '../assets/StopLeft.png';
        if (key === 39) this.img.src = '../assets/StopRight.png';
        if (key === 38) this.img.src = '../assets/StopUp.png';
        if (key === 40) this.img.src = '../assets/StopDown.png';
        if(this.speed_x !== 0) this.speed_x = 0;
        if(this.speed_y !== 0) this.speed_y = 0;
    }

    draw(ctx) {
        
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        this.position.x += this.speed_x * deltaTime/4;
        this.position.y += this.speed_y * deltaTime/4;

        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > this.gameWidth) 
        this.position.x = this.gameWidth - this.width; 

        if(this.position.y < 0) this.position.y = 0;
        if(this.position.y + this.height > this.gameHeight) 
        this.position.y = this.gameHeight - this.height; 
    }
}
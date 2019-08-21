
export default class Warrior {
    constructor(game) { 
        
        this.gameWidth = game.canvasWidth;
        this.gameHeight = game.canvasHeight;        
        this.img = new Image();    
        this.game = game;
        this.type = 'warrior';
        this.width = 200;
        this.height = 200;
        this.position = {
            x: game.leader_init[0],
            y: game.leader_init[1]
        }  
        this.maxSpeed = 2; 
        this.speed_x = 0;
        this.speed_y = 0;
        this.boundary_clearance = 25;
        this.wall_offset = {
            x: 8,
            y: 8
        }
        this.direction = new String();
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
        this.direction = 'down';
    }

    moveLeft() {
        this.speed_x = -this.maxSpeed;
        this.img.src = '../assets/Left' + this.alternate() + '.png';
        this.direction = 'left';
    };

    moveRight() {
        this.speed_x = this.maxSpeed;
        this.img.src = '../assets/Right' + this.alternate() + '.png';
        this.direction = 'right';
    };

    moveUp() {
        this.speed_y = -this.maxSpeed;
        this.img.src = '../assets/Upward' + this.alternate() + '.png';
        this.direction = 'up';
    };

    moveDown() {
        this.speed_y = this.maxSpeed;
        this.img.src = '../assets/Downward' + this.alternate() + '.png';
        this.direction = 'down';
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

        if(this.position.x < this.boundary_clearance) this.position.x = this.boundary_clearance;
        if(this.position.x + this.width + this.boundary_clearance > this.gameWidth) 
        this.position.x = this.gameWidth - this.width - this.boundary_clearance; 

        if(this.position.y < 0) this.position.y = 0;
        if(this.position.y + this.height > this.gameHeight) 
        this.position.y = this.gameHeight - this.height; 
    }
}
import {
    CanvasCornerApproachAndExit, 
    CanvasLeftRightApproachAndExit, 
    CanvasTopBottomApproachAndExit
} from '../helpers/functions/tank_functions.js'
export default class Tank {
    constructor (game) {
        this.img1 = new Image();
        this.img2 = new Image();
        this.gameWidth = game.canvasWidth;
        this.gameHeight = game.canvasHeight; 
        this.game = game;
        this.type = 'tank';        
        this.width = 500;
        this.height = 500;
        this.travel = 0;
        this.speed  = 1;
        this.count = 0;
        this.canvas_limit = false;
        this.path_base = 500;
        this.exceed_limit_attempt = 4;
        this.position = {
            x: game.tank_init[0],
            y: game.tank_init[1]
        };  
        //Randomnizes direction in dx & dy components
        this.vector = {
            dx: 6500,
            dy: -6000
        };
        this.angle = () =>
            this.vector.dx < 0 && this.vector.dy >= 0 ? Math.atan(this.vector.dy / this.vector.dx) - Math.PI / 2
            : this.vector.dx > 0 && this.vector.dy <= 0 ? Math.atan(this.vector.dy / this.vector.dx) + Math.PI / 2
            : this.vector.dx < 0 && this.vector.dy <= 0 ? Math.atan(this.vector.dy / this.vector.dx) - Math.PI / 2
            : Math.atan(this.vector.dy / this.vector.dx) + Math.PI / 2;
        this.range = () => 
            Math.sqrt (Math.pow(this.vector.dx, 2) + Math.pow(this.vector.dy, 2));
        
    }

    
    draw(ctx) {   
        this.img1.src = 'assets/Tank/tank_body.png';
        ctx.save();
        ctx.translate(this.position.x, this.position.y); 
        ctx.rotate(this.angle());
        ctx.drawImage(this.img1, this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore();
        this.img2.src = 'assets/Tank/tank_cannon.png';
        ctx.save();
        ctx.translate(this.position.x, this.position.y); 
        ctx.rotate(this.angle());
        ctx.drawImage(this.img2, this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }

    update(deltaTime) {
        this.travel += this.speed * deltaTime / 2;
        if(this.travel >= this.range())
        { 
            if (this.canvas_limit) this.count++;  
            //if (this.count === this.exceed_limit_attempt) this.canvas_limit = false;
            if (this.count === this.exceed_limit_attempt + 1) this.count = 0;
            this.travel = 0;
            this.vector = {
                dx: Math.round(Math.random()) * 2 - 1 > 0 
                    ? Math.round(Math.random() * 12) * 100 + this.path_base
                    : -Math.round(Math.random() * 12) * 100 - this.path_base,
                dy: Math.round(Math.random()) * 2 - 1 > 0 
                    ? Math.round(Math.random() * 12) * 100 + this.path_base
                    : -Math.round(Math.random() * 12) * 100 - this.path_base
            };
        }else{            
            if (this.position.x <= this.width / 2 && this.position.y <= this.height / 2) 
            CanvasCornerApproachAndExit(this, 0, 1, 1, this.width / 2, this.height / 2, deltaTime);

            else if(this.position.x <= this.width / 2 && this.position.y >= this.gameHeight - this.height / 2)
            CanvasCornerApproachAndExit(this, Math.PI, 1, -1, this.width / 2, this.gameHeight - this.height / 2, deltaTime);

            else if(this.position.y <= this.height / 2 && this.position.x >= this.gameWidth - this.width / 2)
            CanvasCornerApproachAndExit(this, 0, -1, 1,this.gameWidth - this.width / 2, this.height / 2, deltaTime);

            else if(this.position.y >= this.gameHeight - this.height / 2 && this.position.x >= this.gameWidth - this.width / 2)
            CanvasCornerApproachAndExit(this, Math.PI, -1, -1, this.gameWidth - this.width / 2, this.gameHeight - this.height / 2, deltaTime);

            else if(this.position.x <= this.width / 2 && this.count < this.exceed_limit_attempt) 
            CanvasLeftRightApproachAndExit (this, this.width / 2, deltaTime);
            
            else if(this.position.x >= this.gameWidth - this.width / 2 && this.count < this.exceed_limit_attempt) 
            CanvasLeftRightApproachAndExit (this, this.gameWidth - this.width / 2, deltaTime);

            else if(this.position.y <= this.height / 2 && this.count < this.exceed_limit_attempt) 
            CanvasTopBottomApproachAndExit (this, this.height / 2, deltaTime);
            
            else if(this.position.y >= this.gameHeight - this.width / 2 && this.count < this.exceed_limit_attempt) 
            CanvasTopBottomApproachAndExit (this, this.gameHeight - this.width / 2, deltaTime);
                
            else{                
                this.position.x -= Math.cos(this.angle() + Math.PI / 2) * this.speed * deltaTime / 5;
                this.position.y -= Math.sin(this.angle() + Math.PI / 2) * this.speed * deltaTime / 5;
                if (this.count === this.exceed_limit_attempt) {
                    this.count = 0; 
                }             
            };
        }
    }
}
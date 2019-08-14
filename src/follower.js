export default class Follower {
    constructor(warrior, x_pos, y_pos, index, canvas) {
        this.img = new Image();
        this.canvas = canvas   
        this.id = index;
        this.width = 70;
        this.height = 95;
        this.maxSpeed = 2; 
        this.speed_x = 0;
        this.walkValue = 1;
        this.wall_clearance = 110;
        this.position_correction = {
            x: 0,
            y: 0
        };
        this.alternate = () => {
            if(this.walkValue === 1){
                return this.walkValue = 2;
            }else if (this.walkValue === 2){
                return this.walkValue = 1;
            }
        };
        this.position = {x: x_pos, y: y_pos};
        this.warrior = warrior;
        this.dist_x = () => this.warrior.position.x + this.warrior.width/2 - this.position.x;
        this.dist_y = () => this.warrior.position.y + this.warrior.height/2 - this.position.y;
        this.self_space = Math.sqrt(Math.pow(this.width/2,2) + Math.pow(this.height/2,2)); //follower's radius
        this.warrior_space = Math.sqrt(Math.pow(this.warrior.width/2,2) + Math.pow(this.warrior.height/2,2)); //warrior's radius
        this.DISTANCE = () => Math.sqrt(Math.pow(this.dist_x(),2) + Math.pow(this.dist_y(),2));
        this.angle = () => this.dist_x() <= 0 ? Math.PI - Math.asin((this.dist_y())/this.DISTANCE()) : Math.asin((this.dist_y())/this.DISTANCE());
             
    }
    draw(ctx) {
        this.position.x > 0 && this.position.y > 0 ?
            this.speed_x !== 0 && this.speed_y !== 0 
            ? 
            this.img.src = '../assets/Right' + this.alternate() + '.png'
            :
            this.img.src = '../assets/StopRight.png'            
        : this.img.src = '';
        ctx.save();
        ctx.translate(this.position.x, this.position.y); 
        ctx.rotate(this.angle());
        ctx.drawImage(this.img, this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore();
    }

    update(deltaTime) {
        //FOLLOWING ZONE
        if (this.DISTANCE() > this.warrior_space + 150) {
            this.speed_y = this.maxSpeed;
            this.speed_x = this.maxSpeed;

            if(this.position.y >= this.wall_clearance && this.position.y <= this.warrior.gameHeight - this.wall_clearance) {
                this.position.x += Math.cos(this.angle()) * this.speed_x * deltaTime/10 + this.position_correction.x;
            }else{
                if(this.position.y < this.wall_clearance) this.position.y = this.wall_clearance;
                if(this.position.y > this.warrior.gameHeight - this.wall_clearance) this.position.y = this.warrior.gameHeight - this.wall_clearance;
                this.position.x += Math.cos(this.angle()) * this.speed_x * deltaTime/10 + this.position_correction.x;
            }

            if(this.position.x >= this.wall_clearance && this.position.x <= this.warrior.gameWidth - this.wall_clearance) {
                this.position.y += Math.sin(this.angle()) * this.speed_y * deltaTime/10 + this.position_correction.y;
            }else{
                if(this.position.x < this.wall_clearance) this.position.x = this.wall_clearance;
                if(this.position.x > this.warrior.gameWidth - this.wall_clearance) this.position.x = this.warrior.gameWidth - this.wall_clearance;
                this.position.y += Math.sin(this.angle()) * this.speed_y * deltaTime/10 + this.position_correction.y;
            }
            
            
        }
        //BACK OFF ZONE
        else if (this.DISTANCE() <= this.self_space + 100) {
            this.speed_y = this.maxSpeed;
            this.speed_x = this.maxSpeed;
            switch(this.warrior.direction){

                case 'up':  
                    this.warrior.position.x + this.warrior.width/2 - this.position.x >= 0 
                    ? 
                    this.position.x - this.wall_clearance >= 0 
                        ? 
                        this.position.x -= this.speed_x * deltaTime/5 
                        : 
                        this.position.x += this.speed_x * deltaTime/5
                    : 
                    this.position.x + this.width + this.wall_clearance <= this.warrior.gameWidth 
                        ? 
                        this.position.x += this.speed_x * deltaTime/5
                        :
                        this.position.x -= this.speed_x * deltaTime/5
                break;
                
                case 'down':
                    this.warrior.position.x + this.warrior.width/2 - this.position.x >= 0 
                    ? 
                    this.position.x - this.wall_clearance >= 0 
                        ? 
                        this.position.x -= this.speed_x * deltaTime/5 
                        : 
                        this.position.x += this.speed_x * deltaTime/5
                    : 
                    this.position.x + this.width + this.wall_clearance <= this.warrior.gameWidth 
                        ? 
                        this.position.x += this.speed_x * deltaTime/5
                        :
                        this.position.x -= this.speed_x * deltaTime/5
                break;

                case 'right':
                    this.warrior.position.y + this.warrior.height/2 - this.position.y >=0
                    ? 
                    this.position.y - this.wall_clearance >= 0
                        ?
                        this.position.y -= this.speed_y * deltaTime/5 
                        :
                        this.position.y += this.speed_y * deltaTime/5
                    : 
                    this.position.y + this.height + this.wall_clearance <= this.warrior.gameHeight
                        ?
                        this.position.y += this.speed_y * deltaTime/5
                        :
                        this.position.y -= this.speed_y * deltaTime/5
                break;

                case 'left':
                    this.warrior.position.y + this.warrior.height/2 - this.position.y >=0
                    ? 
                    this.position.y - this.wall_clearance >= 0
                        ?
                        this.position.y -= this.speed_y * deltaTime/5 
                        :
                        this.position.y += this.speed_y * deltaTime/5
                    : 
                    this.position.y + this.height + this.wall_clearance <= this.warrior.gameHeight
                        ?
                        this.position.y += this.speed_y * deltaTime/5
                        :
                        this.position.y -= this.speed_y * deltaTime/5
                break;
            }
        }
        //STANDBY ZONE
        else{

            this.speed_y = 0;
            this.speed_x = 0;

            if(this.position.y >= this.wall_clearance && this.position.y <= this.warrior.gameHeight - this.wall_clearance) {
                this.position.y += this.position_correction.y;
            }else{
                if(this.position.y < this.wall_clearance) this.position.y = this.wall_clearance;
                if(this.position.y > this.warrior.gameHeight - this.wall_clearance) this.position.y = this.warrior.gameHeight - this.wall_clearance;
                this.position.x += this.position_correction.x;
            }

            if(this.position.x >= this.wall_clearance && this.position.x <= this.warrior.gameWidth - this.wall_clearance) {
                this.position.x += this.position_correction.x;
            }else{
                if(this.position.x < this.wall_clearance) this.position.x = this.wall_clearance;
                if(this.position.x > this.warrior.gameWidth - this.wall_clearance) this.position.x = this.warrior.gameWidth - this.wall_clearance;
                this.position.y += this.position_correction.y;
            }
        }
    }
}
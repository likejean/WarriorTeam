export default class Follower {
    constructor(warrior, x_pos, y_pos, index) {
        this.img = new Image();
        this.id = index;
        this.width = 75;
        this.height = 100;
        this.maxSpeed = 2; 
        this.speed_x = 0;
        this.walkValue = 1;
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
        this.self_space = Math.sqrt(Math.pow(this.width/2,2) + Math.pow(this.height/2,2));
        this.warrior_space = Math.sqrt(Math.pow(this.warrior.width/2,2) + Math.pow(this.warrior.height/2,2));
        this.DISTANCE = () => Math.sqrt(Math.pow(this.dist_x(),2) + Math.pow(this.dist_y(),2));
        this.angle = (status) => {
            switch (status) {
                case 'approach':
                return this.dist_x() < 0 ? Math.PI - Math.asin((this.dist_y())/this.DISTANCE()) : Math.asin((this.dist_y())/this.DISTANCE());
                
                case 'yield':
                return this.dist_x() < 0 ? Math.PI/2 - Math.asin((this.dist_y())/this.DISTANCE()) : Math.asin((this.dist_y())/this.DISTANCE());

            }
             
        }

    }

    draw(ctx) {

        this.speed_x !== 0 || this.speed_y !== 0 
        ? 
        this.img.src = '../assets/Right' + this.alternate() + '.png'
        :
        this.img.src = '../assets/StopRight.png';
        ctx.save();
        ctx.translate(this.position.x, this.position.y); 
        ctx.rotate(this.angle('approach'));
        ctx.drawImage(this.img, this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore(); 
        
    }

    update(deltaTime) {
        if (this.DISTANCE() > this.warrior_space + 50) {
            this.speed_y = this.maxSpeed;
            this.speed_x = this.maxSpeed;
            this.position.x += Math.cos(this.angle('approach')) * this.speed_x * deltaTime/10;
            this.position.y += Math.sin(this.angle('approach')) * this.speed_y * deltaTime/10;
        }
        else if (this.DISTANCE() <= this.self_space + 50) {
            this.speed_y = this.maxSpeed;
            this.speed_x = this.maxSpeed;
            
            switch(this.warrior.direction){
                case 'up':  
                    this.warrior.position.x + this.warrior.width/2 - this.position.x >= 0 
                    ? 
                    this.position.x -= this.speed_x * deltaTime/5 
                    : 
                    this.position.x += this.speed_x * deltaTime/5;
                    break;
                case 'down':
                    this.warrior.position.x + this.warrior.width/2 - this.position.x >=0
                    ? 
                    this.position.x -= this.speed_x * deltaTime/5 
                    : 
                    this.position.x += this.speed_x * deltaTime/5
                    break;
                case 'right':
                    this.warrior.position.y + this.warrior.height/2 - this.position.y >=0
                    ? 
                    this.position.y -= this.speed_y * deltaTime/5 
                    : 
                    this.position.y += this.speed_y * deltaTime/5
                case 'left':
                    this.warrior.position.y + this.warrior.height/2 - this.position.y >=0
                    ? 
                    this.position.y -= this.speed_y * deltaTime/5 
                    : 
                    this.position.y += this.speed_y * deltaTime/5
            }

           


            // this.warrior.direction === 'up' || this.warrior.direction === 'down'
            // ? 
                
            
            // this.warrior.direction === 'up' || this.warrior.direction === 'down'
            // ?
            
            // this.warrior.direction === 'down' 

            // ? 
            // this.position.x -= this.speed_x * deltaTime/10            
            // : this.warrior.direction === 'right' 
            // ? 

            // this.position.y += this.speed_y * deltaTime/10
            
            // : this.position.y -= this.speed_y * deltaTime/10;
        }
        else{
            this.speed_y = 0;
            this.speed_x = 0;
        }
    }
}
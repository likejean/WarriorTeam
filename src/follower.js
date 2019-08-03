export default class Follower {
    constructor(warrior) {
        this.img = new Image();
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
        this.position = {x: 550, y: 550};
        this.warrior = warrior;
        this.dist_x = () => this.warrior.position.x + this.warrior.width/2 - this.position.x;
        this.dist_y = () => this.warrior.position.y + this.warrior.height/2 - this.position.y;
        this.self_space = Math.sqrt(Math.pow(this.width/2,2) + Math.pow(this.height/2,2));
        this.warrior_space = Math.sqrt(Math.pow(this.warrior.width/2,2) + Math.pow(this.warrior.height/2,2));
        this.DISTANCE = () => Math.sqrt(Math.pow(this.dist_x(),2) + Math.pow(this.dist_y(),2));
        this.angle = () => 
            this.dist_y() > 0 && this.dist_x() < 0 || this.dist_y() < 0 && this.dist_x() < 0 
            ?
            Math.PI - Math.asin((this.dist_y())/this.DISTANCE())
            :
            Math.asin((this.dist_y())/this.DISTANCE());
    }

    draw(ctx) {

        this.speed_x !== 0 || this.speed_y !== 0 
        ? 
        this.img.src = '../assets/Right' + this.alternate() + '.png'
        :
        this.img.src = '../assets/StopRight.png';
        ctx.save();
        ctx.translate(this.position.x, this.position.y); 
        ctx.rotate(this.angle());
        ctx.drawImage(this.img, this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore(); 
        
    }

    update(deltaTime) {
        this.angle();
        if (this.DISTANCE() > this.warrior_space) {
            this.speed_y = this.maxSpeed;
            this.speed_x = this.maxSpeed;
            this.position.x += Math.cos(this.angle()) * this.speed_x * deltaTime/10;
            this.position.y += Math.sin(this.angle()) * this.speed_y * deltaTime/10;
        }else{
            this.speed_y = 0;
            this.speed_x = 0;
        }
    }
}
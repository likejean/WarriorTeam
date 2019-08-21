import { FollowZone, BackOffZone, StandByZone, FollowerApproach } from './helpers/functions/follower_functions.js';

export default class Follower {
    constructor(warrior, walls, x_pos, y_pos, index, canvas) {
        this.type = 'follower';        
        this.action = '';
        this.img = new Image();
        this.canvas = canvas;  
        this.walls = walls; 
        this.id = index;
        this.width = 100;
        this.height = 100;
        this.maxSpeed = 2; 
        this.speed_x = 0;
        this.walkValue = 1;
        this.boundary_clearance = 110;
        this.wall_offset ={
            x: 3,
            y: 3
        }
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
        this.dist_x = (pos,w) => pos + w/2 - this.position.x;
        this.dist_y = (pos,h) => pos + h/2 - this.position.y;
        this.self_space = Math.sqrt(Math.pow(this.width/2,2) + Math.pow(this.height/2,2)); //follower's radius
        this.warrior_space = Math.sqrt(Math.pow(this.warrior.width/2,2) + Math.pow(this.warrior.height/2,2)); //warrior's radius
        this.DISTANCE = () => Math.sqrt(Math.pow(this.dist_x(this.warrior.position.x,this.warrior.width),2) + Math.pow(this.dist_y(this.warrior.position.y,this.warrior.height),2));
        this.angle = () => this.dist_x(this.warrior.position.x,this.warrior.width) <= 0 ? Math.PI - Math.asin((this.dist_y(this.warrior.position.y,this.warrior.height))/this.DISTANCE()) : Math.asin((this.dist_y(this.warrior.position.y,this.warrior.height))/this.DISTANCE());
             
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
        this.DISTANCE() > this.warrior_space + 250 
        ? 
        FollowZone(this, deltaTime)
        : 
        this.DISTANCE() <= this.self_space + 100 ? BackOffZone(this, deltaTime)
        : 
        StandByZone(this);
    }
}
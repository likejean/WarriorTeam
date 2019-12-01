import { DamageZone } from '../helpers/functions/casualty_function.js';
export default class CannonBall {
    constructor (position, ammunition, followers) {
        this.img = new Image();
        this.position = {
            x: position[0],
            y: position[1]
        }
        this.start = position;
        this.ammunition = ammunition;
        this.followers = followers;
        this.width = 50;
        this.height = 50;
        this.speed  = 1;
        this.range = 1000;
        this.direction = Math.round(Math.random()*3);
        this.travel = 0;
    }
    draw(ctx) {
        this.img.src = 'assets/Weapons/cannonball.png';
        if (this.direction == 0) ctx.drawImage(this.img, this.position.x - 35, this.position.y + 60, this.width, this.height);
        if (this.direction == 1) ctx.drawImage(this.img, this.position.x + 185, this.position.y + 60, this.width, this.height);
        if (this.direction == 2) ctx.drawImage(this.img, this.position.x + 75, this.position.y - 40, this.width, this.height);
        if (this.direction == 3) ctx.drawImage(this.img, this.position.x + 75, this.position.y + 160, this.width, this.height);        
    }

    update(deltaTime) {        
        this.travel += this.speed * deltaTime;
        if (this.travel >= this.range) { 
            DamageZone(this.followers, this.position);
            this.ammunition--;           
            if (this.direction == 0 || this.direction == 1) this.position.x = this.start[0];
            if (this.direction == 2 || this.direction == 3) this.position.y = this.start[1];
            this.travel = 0;
            this.direction = Math.round(Math.random()*3);
        }else{
            if (this.direction == 0) this.position.x -= this.speed * deltaTime;
            if (this.direction == 1) this.position.x += this.speed * deltaTime;
            if (this.direction == 2) this.position.y -= this.speed * deltaTime;
            if (this.direction == 3) this.position.y += this.speed * deltaTime;          
        }
    }
}
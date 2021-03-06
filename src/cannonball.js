import { WoundAndKillZone, DamageAndDestroyZone } from '../helpers/functions/casualty_function.js';
export default class CannonBall {
    constructor (position, ammunition, followers, tank) {
        this.img = new Image();
        this.position = {
            x: position[0],
            y: position[1]
        }
        this.start = position;
        this.ammunition = ammunition;
        this.followers = followers;
        this.tank = tank;
        this.width = 50;
        this.height = 50;
        this.speed  = 1;
        this.range = 1000;
        this.direction = 0;
        this.travel = 0;
    }
    draw(ctx) {
        this.img.src = 'assets/Weapons/cannonball.png';
        if (this.direction == 0) ctx.drawImage(this.img, this.position.x - 35, this.position.y + 60, this.width, this.height);
        if (this.direction == 1) ctx.drawImage(this.img, this.position.x + 185, this.position.y + 60, this.width, this.height);
        if (this.direction == 2) ctx.drawImage(this.img, this.position.x + 75, this.position.y - 40, this.width, this.height);
        if (this.direction == 3) ctx.drawImage(this.img, this.position.x + 75, this.position.y + 160, this.width, this.height);     
        
        if(this.travel > this.range - 50){
            for (let i = 1; i <= 3; i++) {
                setTimeout(() => {
                    this.img.src = 'assets/Weapons/Explosion' + i + '.png';
                    if (this.direction == 0) ctx.drawImage(this.img, this.position.x - 100, this.position.y - 50, 250, 250);
                    if (this.direction == 1) ctx.drawImage(this.img, this.position.x + 100, this.position.y - 50, 250, 250);
                    if (this.direction == 2) ctx.drawImage(this.img, this.position.x, this.position.y - 150, 250, 250);
                    if (this.direction == 3) ctx.drawImage(this.img, this.position.x, this.position.y, 250, 250);
                }, i * 25);
            }
        }               
    }

    update(deltaTime) {        
        this.travel += this.speed * deltaTime;
        if (this.travel >= this.range) { 
            WoundAndKillZone(this.followers, this.position);
            DamageAndDestroyZone(this.tank, this.position);
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
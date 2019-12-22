import { WarriorCollision } from '../helpers/functions/warrior_functions.js';
import { FollowerCollision } from '../helpers/functions/follower_functions.js';
import CannonBall from './cannonball.js';
export default class Cannon {
    constructor (game, size, position) {
        this.img = new Image();
        this.position = {
            x: position[0],
            y: position[1]
        }
        this.game = game;
        this.width = size.x;
        this.height = size.y;
        this.direction = 0;
        this.crushed = false;
        this.life = 10;
        this.ammunition = 1000;
        this.cannonball = new CannonBall(position, this.ammunition, this.game.followers); 
    }

    
    draw(ctx) {                
        this.img.src = 'assets/Weapons/cannon.png';
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
        this.cannonball.ammunition > 0 ? this.cannonball.draw(ctx) : null;
        
    }

    update(deltaTime) {
        this.cannonball.ammunition > 0 ? this.cannonball.update(deltaTime/5) : null;
        WarriorCollision(this);
        FollowerCollision(this, deltaTime);
    }
}
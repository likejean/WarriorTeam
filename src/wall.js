  
import { WarriorCollision } from '../helpers/functions/warrior_functions.js';
import { FollowerCollision } from '../helpers/functions/follower_functions.js';
import { TankCollision } from '../helpers/functions/tank_functions.js';
export default class Wall {
    constructor(game, id, position, size) {
        this.position = position;
        this.type = 'wall';
        this.id = id;
        this.game = game;
        this.img = new Image();
        this.width = size.x;
        this.height = size.y;
        this.crushed = false;       
    }

    draw(ctx) {
        if(!this.crushed) {
            this.img.src = 'assets/Walls/Wall.png';
            ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
        }else{
            this.img.src = 'assets/Walls/Ruin.png';
            ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
        }
    }

    update(deltaTime) {
        if(!this.crushed) {
            WarriorCollision(this);
            FollowerCollision(this, deltaTime);
            TankCollision(this);
        }else return        
    }
}
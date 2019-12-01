  
import { WarriorCollision } from '../helpers/functions/warrior_functions.js';
import { FollowerCollision } from '../helpers/functions/follower_functions.js';

export default class Wall {
    constructor(game, position, size) {
        this.position = position;
        this.game = game;
        this.img = new Image();
        this.width = size.x;
        this.height = size.y;       
    }

    draw(ctx) {
        this.img.src = 'assets/Walls/Wall.png';
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);

    }

    update(deltaTime) {
        WarriorCollision(this);
        FollowerCollision(this, deltaTime);
    }
}
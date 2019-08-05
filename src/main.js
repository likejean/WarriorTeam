import Warrior from './warrior.js';
import InputHandler from './input.js';
import Follower from './follower.js';

export default class Game {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.followers = new Array();
    }

    start() {
        this.warrior = new Warrior(this);

        [[200, 200], [600, 600], [100, 800]].map((follower, idx) => 
        this.followers.push(new Follower(this.warrior, follower[0], follower[1], idx + 1)));

        console.log(this.followers);
        new InputHandler(this.warrior);
    }

    draw(ctx) {
        
        this.warrior.draw(ctx);   
        this.followers.forEach(elem => elem.draw(ctx)); 
    }

    update(deltaTime) {
        this.warrior.update(deltaTime);
        this.followers.forEach(elem => elem.update(deltaTime));
    }
}
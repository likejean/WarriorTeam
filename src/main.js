import Warrior from './warrior.js';
import InputHandler from './input.js';
import Follower from './follower.js';
import TeamGeometry from './team_geometry.js';
import Tulip from './helpers/tulip.js';
import {Leader, Followers, bushSize} from './helpers/init/index.js';
import Boundaries from './helpers/boundaries.js';

export default class Game {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.leader_init = Leader;
        this.bushSize = bushSize;
        this.followers_init = Followers;
        this.followers = new Array();
    }

    start(canvas) {
        
        this.warrior = new Warrior(this);
        this.followers_init.map((follower, idx) => this.followers.push(new Follower(this.warrior, follower[0], follower[1], idx + 1, canvas)));
        this.geometry = new TeamGeometry(this.followers);
        new InputHandler(this.warrior);
        this.tulips = this.followers.map(follower => new Tulip(follower));
        this.gameObjects = [this.warrior, ...this.followers, ...Boundaries(this)];
         
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx));
        
    }

    update(deltaTime) {
        this.warrior.update(deltaTime);
        this.followers.forEach((follower, idx) => {
            follower.update(deltaTime); 
            this.geometry.update(); 
            this.tulips[idx].update()}
        );
    }
}
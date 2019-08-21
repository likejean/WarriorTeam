import Warrior from './warrior.js';
import InputHandler from './input.js';
import Follower from './follower.js';
import TeamGeometry from './team_geometry.js';
import Tulip from './helpers/tulip.js';
import * as Init from './helpers/init/index.js';
import Boundaries from './helpers/boundaries.js';
import BuildMap from './game_levels.js';


export default class Game {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.leader_init = Init.Leader;
        this.bushSize = Init.bushSize;
        this.followers_init = Init.Followers;
        this.map = Init.Map;
        this.followers = new Array();
        this.cellSize = 50;
    }

    start(canvas) {
        this.warrior = new Warrior(this);
        this.walls = new BuildMap(this);
        this.followers_init.map((follower, idx) => this.followers.push(new Follower(this.warrior, this.walls, follower[0], follower[1], idx + 1, canvas)));
        this.geometry = new TeamGeometry(this.followers);
        new InputHandler(this.warrior);
        this.bushes = Boundaries(this);
        this.tulips = this.followers.map(follower => new Tulip(follower));
        this.gameObjects = [this.warrior, ...this.followers, ...this.bushes, ...this.walls];
        this.gameSubjects = [this.geometry, ...this.tulips, ...this.walls];
        
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx));
        
    }

    update(deltaTime) {
        this.warrior.update(deltaTime);
        this.followers.forEach(follower => follower.update(deltaTime));
        this.gameSubjects.forEach(subj => subj.update());
    }
}
import Warrior from './warrior.js';
import InputHandler from './input.js';
import Follower from './follower.js';
import TeamGeometry from './team_geometry.js';
import Tulip from '../helpers/tulip.js';
import * as Init from '../helpers/init/index.js';
import Boundaries from '../helpers/boundaries.js';
import BuildMap from './game_levels.js';
import Tank from './tank.js';
import { Statistics, Update } from '../helpers/statistics.js';
//import A_STAR_Algorithm from '../helpers/Astar_algorithm/algorithm.js';


export default class Game {
    constructor(canvasWidth, canvasHeight, cellSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gameGridCellSize = cellSize;
        this.leader_init = Init.Leader;        
        this.cannons_init = Init.Cannons;
        this.bushSize = Init.bushSize;
        this.tank_init = Init.Tanks;
        this.cannonSize = Init.cannonSize;
        this.followers_init = Init.Followers;
        this.gridSize = Init.GridSize;
        this.map = Init.Map;
        this.followers = [];
    }

    start(canvas) {       
        
        this.warrior = new Warrior(this);
        this.tank = new Tank(this);
        this.obstacles = new BuildMap(this);
        console.log(this.obstacles)
        
        //this.algorithm = new A_STAR_Algorithm(this);
        this.followers_init.map((follower, idx) => this.followers.push(new Follower(this, follower[0], follower[1], idx + 1, canvas)));        
        this.geometry = new TeamGeometry(this.followers);
        new InputHandler(this.warrior);
        this.bushes = Boundaries(this);
        this.tulips = this.followers.map(follower => new Tulip(follower));
        this.gameObjects = [...this.obstacles, this.warrior, this.tank, ...this.followers, ...this.bushes];
        this.gameSubjects = [this.geometry, ...this.tulips, ...this.obstacles, this.tank];        
        //this.algorithm.start();
        Statistics(this.followers);        
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx));
    }

    update(deltaTime) {        
        this.warrior.update(deltaTime);
        this.obstacles = [...this.obstacles].filter(obstacle => obstacle.crushed === false);
        this.followers.forEach(follower => follower.update(deltaTime));
        this.followers = [...this.followers].filter(follower => follower.health !== 0);        
        Update(this.followers);       
        this.gameSubjects.forEach(subj => subj.update(deltaTime));
    }
}
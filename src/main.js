import Warrior from './warrior.js';
import InputHandler from './input.js';
import Follower from './follower.js';
import TeamGeometry from './team_geometry.js';

export default class Game {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.followers = new Array();
    }

    start() {
        this.warrior = new Warrior(this);
        [[200, 300], [600, 1600], [150, 544], [450, 500],[200, 500],[150, 1300], [900, 400], [150, 844], [450, 50],[250, 500],
        [500, 1800], [350, 670], [150, 504], [150, 1500],[105, 1590],[750, 400], [500, 1950], [111, 244], [450, 500],[240, 500],
        [1500, 1800], [350, 1670], [1500, 504], [1150, 1500],[1105, 1590],[1750, 1400], [1500, 1950], [1121, 1244], [1150, 500],[1240, 1500]].map((follower, idx) => 
        this.followers.push(new Follower(this.warrior, follower[0], follower[1], idx + 1)));
        this.geometry = new TeamGeometry(this.followers);
        new InputHandler(this.warrior);

    }

    draw(ctx) {
        this.warrior.draw(ctx);   
        this.followers.forEach(elem => elem.draw(ctx)); 
    }

    update(deltaTime) {
        // this.geometry.update();
        this.warrior.update(deltaTime);
        this.followers.forEach(elem => elem.update(deltaTime, this.geometry.update()));
       
    }
}
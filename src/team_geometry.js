export default class TeamGeometry {
    constructor(followers) {
        this.followers = followers; 
        this.DISTANCE = (deltaX, deltaY) => Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));       
        this.ANGLE = (deltaX, deltaY) => deltaX <= 0 ? Math.PI - Math.asin(deltaY/this.DISTANCE(deltaX, deltaY)) : Math.asin(deltaY/this.DISTANCE(deltaX, deltaY));
        this.MATRIX = Array(this.followers.length).fill().map((item, index) => [index + 1, false]);
    }

    update() {
        this.MATRIX.forEach(item => {if(item[1] === true) item[1] = false;});
        this.collisions = [].concat(...this.followers.map( 
            (v, i) => this.followers.slice(i + 1).map(
            (w) => {            
                
                let dist = this.DISTANCE(
                (v.position.x + v.width/2) - (w.position.x + w.width/2), 
                (v.position.y + v.height/2) - (w.position.y + w.height/2));
                
                let ang = this.ANGLE(
                (v.position.x + v.width/2) - (w.position.x + w.width/2), 
                (v.position.y + v.height/2) - (w.position.y + w.height/2));
                if (dist <= 35) {
                    this.MATRIX[this.MATRIX.findIndex(x => x[0] === v.id)][1] = true;
                    this.MATRIX[this.MATRIX.findIndex(x => x[0] === w.id)][1] = true;                 
                    this.followers.findIndex(follower => {
                        if (follower.id === v.id) {
                            follower.position_correction.x = 15*Math.cos(ang);
                            follower.position_correction.y = 15*Math.sin(ang);
                        }
                        if (follower.id === w.id) {
                            follower.position_correction.x = -25*Math.cos(ang);
                            follower.position_correction.y = -25*Math.sin(ang);
                        }
                    });
                }else {
                   
                    this.followers.findIndex(follower => {
                        if (follower.id === v.id && this.MATRIX[v.id - 1][1] === false || follower.id === w.id && this.MATRIX[w.id - 1][1] === false) {
                            follower.position_correction.x = 0;
                            follower.position_correction.y = 0;
                        }
                    });
                }
            }
        )));
    }
    
}
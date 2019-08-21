import { DetectFollowerApproach } from './approach_detection.js';

/////////FOLLOW ZONE////////////////

export const FollowZone = (object, deltaTime) => {
    
    object.action = 'follow';
    object.speed_y = object.maxSpeed;
    object.speed_x = object.maxSpeed;
    if(object.position.y >= object.boundary_clearance && object.position.y <= object.warrior.gameHeight - object.boundary_clearance) {
        object.position.x += Math.cos(object.angle()) * object.speed_x * deltaTime/10 + object.position_correction.x;
    }else{
        if(object.position.y < object.boundary_clearance) object.position.y = object.boundary_clearance;
        if(object.position.y > object.warrior.gameHeight - object.boundary_clearance) object.position.y = object.warrior.gameHeight - object.boundary_clearance;
        object.position.x += Math.cos(object.angle()) * object.speed_x * deltaTime/10 + object.position_correction.x;
    }

    if(object.position.x >= object.boundary_clearance && object.position.x <= object.warrior.gameWidth - object.boundary_clearance) {
        object.position.y += Math.sin(object.angle()) * object.speed_y * deltaTime/10 + object.position_correction.y;
    }else{
        if(object.position.x < object.boundary_clearance) object.position.x = object.boundary_clearance;
        if(object.position.x > object.warrior.gameWidth - object.boundary_clearance) object.position.x = object.warrior.gameWidth - object.boundary_clearance;
        object.position.y += Math.sin(object.angle()) * object.speed_y * deltaTime/10 + object.position_correction.y;
    }
}

////////////BACK OFF ZONE//////////////////////
export const BackOffZone = (object, deltaTime) => {
    object.action = 'backoff';
    object.speed_y = object.maxSpeed;
    object.speed_x = object.maxSpeed;
    switch(object.warrior.direction){

    case 'up':  
        object.warrior.position.x + object.warrior.width/2 - object.position.x >= 0 
        ? 
        object.position.x - object.boundary_clearance >= 0 
            ? 
            object.position.x -= object.speed_x * deltaTime/5 
            : 
            object.position.x += object.speed_x * deltaTime/5
        : 
        object.position.x + object.width + object.boundary_clearance <= object.warrior.gameWidth 
            ? 
            object.position.x += object.speed_x * deltaTime/5
            :
            object.position.x -= object.speed_x * deltaTime/5
    break;
    
    case 'down':
        object.warrior.position.x + object.warrior.width/2 - object.position.x >= 0 
        ? 
        object.position.x - object.boundary_clearance >= 0 
            ? 
            object.position.x -= object.speed_x * deltaTime/5 
            : 
            object.position.x += object.speed_x * deltaTime/5
        : 
        object.position.x + object.width + object.boundary_clearance <= object.warrior.gameWidth 
            ? 
            object.position.x += object.speed_x * deltaTime/5
            :
            object.position.x -= object.speed_x * deltaTime/5
    break;

    case 'right':
        object.warrior.position.y + object.warrior.height/2 - object.position.y >=0
        ? 
        object.position.y - object.boundary_clearance >= 0
            ?
            object.position.y -= object.speed_y * deltaTime/5 
            :
            object.position.y += object.speed_y * deltaTime/5
        : 
        object.position.y + object.height + object.boundary_clearance <= object.warrior.gameHeight
            ?
            object.position.y += object.speed_y * deltaTime/5
            :
            object.position.y -= object.speed_y * deltaTime/5
    break;

    case 'left':
        object.warrior.position.y + object.warrior.height/2 - object.position.y >=0
        ? 
        object.position.y - object.boundary_clearance >= 0
            ?
            object.position.y -= object.speed_y * deltaTime/5 
            :
            object.position.y += object.speed_y * deltaTime/5
        : 
        object.position.y + object.height + object.boundary_clearance <= object.warrior.gameHeight
            ?
            object.position.y += object.speed_y * deltaTime/5
            :
            object.position.y -= object.speed_y * deltaTime/5
    break;
    }
}

/////////////STANDBYZONE////////////////////////
export const StandByZone = object => {
    object.action = 'standby';
    object.speed_y = 0;
    object.speed_x = 0;
    if(object.position.y >= object.boundary_clearance && object.position.y <= object.warrior.gameHeight - object.boundary_clearance) {
        object.position.y += object.position_correction.y;
    }else{
        if(object.position.y < object.boundary_clearance) object.position.y = object.boundary_clearance;
        if(object.position.y > object.warrior.gameHeight - object.boundary_clearance) object.position.y = object.warrior.gameHeight - object.boundary_clearance;
        object.position.x += object.position_correction.x;
    }

    if(object.position.x >= object.boundary_clearance && object.position.x <= object.warrior.gameWidth - object.boundary_clearance) {
        object.position.x += object.position_correction.x;
    }else{
        if(object.position.x < object.boundary_clearance) object.position.x = object.boundary_clearance;
        if(object.position.x > object.warrior.gameWidth - object.boundary_clearance) object.position.x = object.warrior.gameWidth - object.boundary_clearance;
        object.position.y += object.position_correction.y;
    }

}

///////////////WALL COLLISSIONS///////////////

export const FollowerApproach = object => 
   
    object.game.followers.forEach(follower => 
        DetectFollowerApproach(follower, object)[0] && 
            DetectFollowerApproach(follower, object)[1] === 'up' 
            ?
            // HandleFollowerCollisionVertically(object.position.y, 1, object.height)
            follower.position.y = object.position.y + object.height + 50
            :
            DetectFollowerApproach(follower, object)[0] && 
            DetectFollowerApproach(follower, object)[1] === 'down' 
            ? 
            // HandleFollowerCollisionVertically(object.position.y, -1, object.height)
            follower.position.y = object.position.y - follower.height + 50
            :
            DetectFollowerApproach(follower, object)[0] && 
            DetectFollowerApproach(follower, object)[1] === 'left' 
            ?
            // HandleFollowerCollisionHorizontally(object.position.x, 1, object.width)
            follower.position.x = object.position.x + object.width + 50
            :
            DetectFollowerApproach(follower, object)[0] && 
            DetectFollowerApproach(follower, object)[1] === 'right'
            ?
            // HandleFollowerCollisionHorizontally(object.position.x, -1, object.width)
            follower.position.x = object.position.x - follower.width + 50
            :
        null
        
    );

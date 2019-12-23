
export const WoundAndKillZone = (followers, position) => {
    [...followers].forEach(follower => {
        let dx = position.x - follower.position.x, 
            dy = position.y - follower.position.y,
            DISTANCE = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));        
        if (DISTANCE < 200) {
            follower.health --;   
        }else if (DISTANCE < 100) {
            follower.health -= 2;  
        }
    }); 
}

export const DamageAndDestroyZone = (tank, position) => {
    let dx = position.x - tank.position.x, 
        dy = position.y - tank.position.y,
        DISTANCE = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));        
    if (DISTANCE < 200) {
        tank.health--;   
    }else if (DISTANCE < 100) {
        tank.health -= 2;  
    }
}
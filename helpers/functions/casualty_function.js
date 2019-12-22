export const DamageZone = (followers, position) => {
    [...followers].forEach(follower => {
        let DISTANCE = Math.sqrt(Math.pow(position.x - follower.position.x,2) + Math.pow(position.y - follower.position.y,2));
        if (DISTANCE < 200) {
            follower.health --;   
        }else if (DISTANCE < 100) {
            follower.health -= 2;  
        }
    }); 
}
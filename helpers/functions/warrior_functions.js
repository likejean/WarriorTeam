import  { DetectWarriorApproach } from './approach_detection.js';

export const WarriorApproach = object => 
     DetectWarriorApproach(object.game.warrior, object)[0] && 
     DetectWarriorApproach(object.game.warrior, object)[1] === 'up' &&  
    object.game.warrior.direction === 'up'
    ? 
    object.game.warrior.position.y = object.position.y + object.height - object.game.warrior.wall_offset.y
    :
     DetectWarriorApproach(object.game.warrior, object)[0] && 
     DetectWarriorApproach(object.game.warrior, object)[1] === 'down' &&  
    object.game.warrior.direction === 'down'
    ? 
    object.game.warrior.position.y = object.position.y - object.game.warrior.height + object.game.warrior.wall_offset.y
    :
     DetectWarriorApproach(object.game.warrior, object)[0] && 
     DetectWarriorApproach(object.game.warrior, object)[1] === 'left' &&  
    object.game.warrior.direction === 'left'
    ? 
    object.game.warrior.position.x = object.position.x + object.width - object.game.warrior.wall_offset.x
    :
     DetectWarriorApproach(object.game.warrior, object)[0] && 
     DetectWarriorApproach(object.game.warrior, object)[1] === 'right' &&  
    object.game.warrior.direction === 'right'
    ?
    object.game.warrior.position.x = object.position.x - object.game.warrior.width + object.game.warrior.wall_offset.x
    :
    null;

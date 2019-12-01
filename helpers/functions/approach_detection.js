export const DetectWarriorApproach = (mobileObject, staticObject) => {
    let topOfMobObj = mobileObject.position.y;
    let bottomOfMobObj =  mobileObject.position.y + mobileObject.height;
    let leftSideOfMobObj = mobileObject.position.x;
    let rightSideOfMobObj = mobileObject.position.x + mobileObject.width;
    let topOfStaticObj = staticObject.position.y;
    let bottomOfStaticObj = staticObject.position.y + staticObject.height;
    let leftSideOfStaticObj = staticObject.position.x;
    let rightSideOfStaticObj = staticObject.position.x + staticObject.width;
    
    return  topOfMobObj <= bottomOfStaticObj &&
            topOfMobObj > topOfStaticObj &&
            rightSideOfMobObj - mobileObject.wall_offset.y > leftSideOfStaticObj && 
            leftSideOfMobObj + mobileObject.wall_offset.y < rightSideOfStaticObj &&
            mobileObject.direction === "up" ? [true,'up']
        : 
            bottomOfMobObj >= topOfStaticObj &&
            bottomOfMobObj < bottomOfStaticObj &&
            rightSideOfMobObj - mobileObject.wall_offset.y > leftSideOfStaticObj && 
            leftSideOfMobObj + mobileObject.wall_offset.y < rightSideOfStaticObj &&
            mobileObject.direction === "down" ? [true,'down']
        :
            leftSideOfMobObj <= rightSideOfStaticObj &&
            leftSideOfMobObj > leftSideOfStaticObj && 
            bottomOfMobObj - mobileObject.wall_offset.x > topOfStaticObj &&        
            topOfMobObj + mobileObject.wall_offset.x < bottomOfStaticObj &&
            mobileObject.direction === "left" ? [true,'left']
        :
            rightSideOfMobObj >= leftSideOfStaticObj &&
            rightSideOfMobObj < rightSideOfStaticObj &&
            bottomOfMobObj - mobileObject.wall_offset.x > topOfStaticObj &&         
            topOfMobObj + mobileObject.wall_offset.x < bottomOfStaticObj &&
            mobileObject.direction === "right" ? [true,'right']
        :   
    [false, ''] 
     
}

export const DetectFollowerApproach = (mobileObject, staticObject) => {
    
    //MOBILE OBJECT VARIABLES
    let YcenterOfMobObj = mobileObject.position.y;
    let bottomOfMobObj =  YcenterOfMobObj + mobileObject.height;
    let topOfMobObj =  YcenterOfMobObj - mobileObject.height;
    let XcenterOfMobObj = mobileObject.position.x;
    let rightSideOfMobObj = XcenterOfMobObj + mobileObject.width;
    let leftSideOfMobObj = XcenterOfMobObj - mobileObject.width;

    //STATIC OBJECT VARIABLES
    let topOfStaticObj = staticObject.position.y;
    let bottomOfStaticObj = staticObject.position.y + staticObject.height;
    let YcenterOfStaticObj = staticObject.position.y + staticObject.height/2;
    let leftSideOfStaticObj = staticObject.position.x;
    let rightSideOfStaticObj = staticObject.position.x + staticObject.width;
    let XcenterOfStaticObj = staticObject.position.x + staticObject.width/2;

    //OTHER SUPPLEMENTARY VARIABLES
    let mobileObjectRadius = mobileObject.height >= mobileObject.width ? mobileObject.height/2 : mobileObject.width/2;
    let staticObjectRadius = staticObject.height >= staticObject.width ? staticObject.height/2 : staticObject.width/2;
    let minDist = mobileObjectRadius + staticObjectRadius;

return  YcenterOfMobObj - YcenterOfStaticObj <= minDist &&
        bottomOfStaticObj - topOfMobObj < staticObject.height &&
        XcenterOfMobObj >= leftSideOfStaticObj - 15 && 
        XcenterOfMobObj <= rightSideOfStaticObj + 15 ? [true,'up']
    : 
        YcenterOfStaticObj - YcenterOfMobObj <= minDist &&
        bottomOfMobObj - topOfStaticObj < staticObject.height &&
        XcenterOfMobObj >= leftSideOfStaticObj - 15 && 
        XcenterOfMobObj <= rightSideOfStaticObj + 15 ? [true,'down']
    :
        XcenterOfMobObj - XcenterOfStaticObj <= minDist &&
        rightSideOfStaticObj - leftSideOfMobObj < staticObject.width && 
        YcenterOfMobObj >= topOfStaticObj - 15 && 
        YcenterOfMobObj <= bottomOfStaticObj + 15 ? [true,'left']
    :
        XcenterOfStaticObj - XcenterOfMobObj <= minDist &&
        rightSideOfMobObj - leftSideOfStaticObj < staticObject.width &&
        YcenterOfMobObj >= topOfStaticObj - 15 && 
        YcenterOfMobObj <= bottomOfStaticObj + 15 ? [true,'right']
    :   [false, '']
}

// If a tank unit get trapped in the corner of the Canvas
export const CanvasCornerApproachAndExit = (unit, angle, dx_sign, dy_sign, pos_x_limit, pos_y_limit, deltaTime) => {
    if (unit.angle() === angle) {
        unit.position.y = pos_y_limit;
        unit.vector.dy = dy_sign * 1000;
        unit.vector.dx = dx_sign * 1000;
        unit.position.x -= Math.cos(unit.angle() + Math.PI / 2) * unit.speed * deltaTime / 5;
    }else{
        unit.position.x = pos_x_limit;
        unit.vector.dy = dy_sign * 1000;
        unit.vector.dx = dx_sign * 1000;
        unit.position.y -= Math.sin(unit.angle() + Math.PI / 2) * unit.speed * deltaTime / 5;
    }        
}

//If a tank unit reaches either Left or Right side of the canvas...
export const CanvasLeftRightApproachAndExit = (unit, limit, deltaTime) => {
    unit.canvas_limit = true;
    unit.vector.dx = 0;
    unit.position.x = limit;                    
    unit.position.y -= Math.sin(unit.angle() + Math.PI / 2) * unit.speed * deltaTime / 5;
}

//If a tank unit reaches either Top or Bottom side of the canvas...
export const CanvasTopBottomApproachAndExit = (unit, limit, deltaTime) => {
    unit.canvas_limit = true;
    unit.vector.dy = 0;
    unit.position.y = limit;                    
    unit.position.x -= Math.sin(unit.angle() + Math.PI / 2) * unit.speed * deltaTime / 5;
}
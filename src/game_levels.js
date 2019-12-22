import Wall from './wall.js';
import Cannon from './cannon.js';
export default function BuildMap(game) {
    let walls = [];
    let idx = 0;
    let wall_size = {x: game.gameGridCellSize, y: game.gameGridCellSize};
    let cannon_size = {x: game.cannonSize.side1, y: game.cannonSize.side2};
    game.map.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            if (col === 1) {                
                let position = {
                    x: wall_size.x * colIdx,
                    y: wall_size.y * rowIdx
                };
                walls.push(new Wall(game, idx++, position, wall_size))
            }
        });
    });
    game.cannons_init.forEach(cannon => walls.push(new Cannon(game, cannon_size, cannon)));
    return walls;
}
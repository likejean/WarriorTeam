import Wall from './wall.js';

export default function BuildMap(game) {
    let walls = [];
    let wall_size = {x: game.gameGridCellSize, y: game.gameGridCellSize};
    game.map.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            if (col === 1) {                
                let position = {
                    x: wall_size.x * colIdx,
                    y: wall_size.y * rowIdx
                };
                walls.push(new Wall(game, position, wall_size))
            }
        });
    });
    return walls;
}
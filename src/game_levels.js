import Wall from './wall.js';

export default function BuildMap(game) {
    let walls = [], wall_size = {x: 150, y: 150};
    game.map.forEach((row, rowIdx) => {
        row.forEach((wall, wallIdx) => {
            if (wall === 1) {                
                let position = {
                    x: wall_size.x * wallIdx,
                    y: wall_size.y * rowIdx
                };
                walls.push(new Wall(game, position, wall_size))
            }
        });
    });
    return walls;
}
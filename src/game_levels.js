import Wall from './wall.js';

export default function BuildMap(game, map) {
    let walls = [];
    map.forEach((row, rowIdx) => {
        row.forEach((wall, wallIdx) => {
            if (wall === 1) {
                let position = {
                    x: 100 * wallIdx,
                    y: 100 * rowIdx
                };
                walls.push(new Wall(game, position))
            }
        });
    });
    return walls;
}
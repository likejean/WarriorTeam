import Bush from '../bush.js';

export default function Boundaries (game) {
    let bushes = [], i = 0, position = {x:0, y: 0}, direction = '', size = game.bushSize;   
   
    
    while (position.x < game.canvasWidth + size.side1) {
        position.x = i * size.side1;
        position.y = 0;
        direction = 'Top';
        bushes.push(new Bush (size.side1, size.side2, position, direction));
        i++;
    }

    while (position.x > 0) {
        position.x = i * size.side1;
        position.y = game.canvasHeight - size.side2;
        direction = 'Bottom';
        bushes.push(new Bush (size.side1, size.side2, position, direction));
        i--;
    }

    i = 0;

    while (position.y < game.canvasHeight + size.side1) {
        position.x = 0;
        position.y = i * size.side1;
        direction = 'Left';
        bushes.push(new Bush (size.side2, size.side1, position, direction));
        i++;
    }

    while (position.y > 0) {
        position.x = game.canvasWidth - size.side2;
        position.y = i * size.side1;
        direction = 'Right';
        bushes.push(new Bush (size.side2, size.side1, position, direction));
        i--;
    }
    return bushes;
}
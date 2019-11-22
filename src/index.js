import Game from './main.js';
import { GridSize } from '../helpers/init/index.js';

let canvas = document.getElementById('battleField');
let button = document.getElementById('btn');
let ctx = canvas.getContext('2d');

const GAME_GRID_CELL = 100;
const GAME_WIDTH = GAME_GRID_CELL * GridSize.columns;
const GAME_HEIGHT = GAME_GRID_CELL * GridSize.rows;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
button.style.width = GAME_WIDTH + 'px';


ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT, GAME_GRID_CELL);


game.start(canvas, ctx);

let lastTime = 0;
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.draw(ctx);
    game.update(deltaTime);
    
    setTimeout(() => requestAnimationFrame(gameLoop), 100);
}

requestAnimationFrame(gameLoop);


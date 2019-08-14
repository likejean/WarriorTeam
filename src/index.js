import Game from './main.js';

let canvas = document.getElementById('battleField');
let button = document.getElementById('btn');
let ctx = canvas.getContext('2d');



const GAME_WIDTH = 2000;
const GAME_HEIGHT = 2000;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
button.style.width = GAME_WIDTH + 'px';


ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.start(canvas);


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


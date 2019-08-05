import Game from './main.js';


let canvas = document.getElementById('battleField');
let ctx = canvas.getContext('2d');



const GAME_WIDTH = 1000;
const GAME_HEIGHT = 1000;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.start();


let lastTime = 0;
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    game.draw(ctx);
    game.update(deltaTime);
    
    setTimeout(() => requestAnimationFrame(gameLoop), 80);
}

requestAnimationFrame(gameLoop);


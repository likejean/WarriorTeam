import Warrior from './warrior.js';
import InputHandler from './input.js';
import Follower from './follower.js';

let canvas = document.getElementById('battleField');
let ctx = canvas.getContext('2d');



const GAME_WIDTH = 1000;
const GAME_HEIGHT = 1000;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let warrior = new Warrior(GAME_WIDTH, GAME_HEIGHT);
let follower = new Follower(warrior);

new InputHandler(warrior);


warrior.draw(ctx);

let lastTime = 0;
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    warrior.update(deltaTime);
    warrior.draw(ctx);
    follower.update(deltaTime);
    follower.draw(ctx);
    
    setTimeout(() => requestAnimationFrame(gameLoop), 80);
}

requestAnimationFrame(gameLoop);


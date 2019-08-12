export default class InputHandler {
    constructor(warrior) {
        var keys = [];
        window.addEventListener('load', () => warrior.onload());
        document.addEventListener('keydown', e => keys[e.keyCode] = true);
        setInterval(() => {
            if(keys[37]) warrior.moveLeft();    
            if(keys[39]) warrior.moveRight();
            if(keys[38]) warrior.moveUp();
            if(keys[40]) warrior.moveDown(); 
        }, 200);
        document.addEventListener('keyup', e => {
            delete keys[e.keyCode];
            e.keyCode === 37 ? warrior.stop(37)
            : e.keyCode === 39 ? warrior.stop(39)
            : e.keyCode === 38 ? warrior.stop(38)
            : e.keyCode === 40 ? warrior.stop(40)
            : warrior.stop();
        });

    }
}
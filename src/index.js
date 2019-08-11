import Game from './main.js';


let canvas = document.getElementById('battleField');

let ctx = canvas.getContext('2d');

startRecording();

function startRecording() {

    if (navigator.mediaDevices) {
            var constraints = { audio: false, video: true };
            var chunks = [];
        }
        
        navigator.mediaDevices.getUserMedia(constraints)
        .then(() => {
             // here we will store our recorded media chunks (Blobs)
            const stream = canvas.captureStream(); // grab our canvas MediaStream
            const rec = new MediaRecorder(stream); // init the recorder
            
           

            rec.ondataavailable = e => chunks.push(e.data);
            rec.onstop = () => {
                exportVid(new Blob(chunks, {type: 'video/webm'}));
            
            };
            rec.start();
            setTimeout(() => rec.stop(), 50000); // stop recording in 3s
        })
        .catch(function(err) {
            console.log('The following error occurred: ' + err);
    });
}

function exportVid(blob) {
    const vid = document.createElement('video');
    vid.style.width = '50%x';
    vid.style.height = '50%x';
    vid.src = URL.createObjectURL(blob);    
    vid.controls = true;
    document.body.appendChild(vid);
    const a = document.createElement('a');
    a.download = 'animation.mp4';
    a.href = vid.src;
    a.textContent = 'download the video';
    document.body.appendChild(a);
}
  


const GAME_WIDTH = 2000;
const GAME_HEIGHT = 2000;

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
    
    setTimeout(() => requestAnimationFrame(gameLoop), 100);
}

requestAnimationFrame(gameLoop);


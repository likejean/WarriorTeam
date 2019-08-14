export default class Bush {
    constructor (game) {
        this.img = new Image();
        this.position = {
            x: game.bushes_init[0],
            y: game.bushes_init[1]
        }
        this.width = 200;
        this.height = 75;
    }

    draw(ctx) {
        this.img.src = '../assets/Bushes/TopBush.png';    
        // console.log(this.img) 
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);

    }

    update() {

    }
}
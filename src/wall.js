export default class Wall {
    constructor(game, position) {
        this.position = position;
        this.img = new Image();
        this.width = 100;
        this.height = 100;
        this.game = game;
    }

    update() {

    }

    draw(ctx) {
        this.img.src = '../assets/Walls/Wall.png';
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);

    }
}
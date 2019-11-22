export default class Bush {
    constructor (size1, size2, position, direction) {
        this.img = new Image();
        this.position = {
            x: position.x,
            y: position.y
        }
        this.width = size1;
        this.height = size2;
        this.direction = direction;
    }
    draw(ctx) {
        this.img.src = 'assets/Bushes/' + this.direction + 'Bush.png';
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
}
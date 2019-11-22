
export function Spot (i, j, cellSize, cols, rows, matrix) {
    this.i = i;
    this.j = j;
    this.cell_size = cellSize;
    this.cols = cols;
    this.rows = rows;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.splinePoint = [];
    this.img = new Image();
    this.matrix = matrix;
    this.center = {
        x: this.i * this.cell_size + this.cell_size/2,
        y: this.j * this.cell_size + this.cell_size/2
    };
    this.wall = this.matrix[this.j][this.i] === 0 ? false : true;
    
    this.previous = undefined;

    this.show = (ctx, color) => { 
               
        this.wall ? ctx.fillStyle = '#000000' : ctx.fillStyle = color;
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = '#191716';
        ctx.rect(this.i * this.cell_size, this.j * this.cell_size, this.cell_size - 2, this.cell_size - 2); 
        ctx.stroke();
        ctx.fillRect(this.i * this.cell_size, this.j * this.cell_size, this.cell_size - 2, this.cell_size - 2);   
       
    }

    this.path = (ctx, points) => {
        ctx.moveTo(points[0], points[1]);  // optionally move to first point
        ctx.lineWidth = "15";
        ctx.strokeStyle = '#203AE9';
        this.splinePoint = ctx.curve(points, 0.4, 20, false); 
        ctx.stroke();   // rasterize path
    }
    
    this.addNeighbors = (grid) => {
        let neighbors = [];
        //Sides
        if(this.i < this.cols - 1) neighbors.push(grid[this.i + 1][this.j]);
        if(this.i > 0) neighbors.push(grid[this.i - 1][this.j]);
        if(this.j < this.rows - 1) neighbors.push(grid[this.i][this.j + 1]);
        if(this.j > 0) neighbors.push(grid[this.i][this.j - 1]);
        //Diagonals
        if(this.i > 0 && this.j > 0) neighbors.push(grid[this.i - 1][this.j - 1]);
        if(this.i < this.cols - 1 && this.j > 0) neighbors.push(grid[this.i + 1][this.j - 1]);
        if(this.i > 0 && this.j < this.rows - 1) neighbors.push(grid[this.i - 1][this.j + 1]);
        if(this.i < this.cols - 1 && this.j < this.rows - 1) neighbors.push(grid[this.i + 1][this.j + 1]);
        return neighbors;
    }
}
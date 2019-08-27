import { GridSize } from '../init/index.js';
import { Spot } from './spot.js';

export default class A_STAR_Algorithm {
    constructor(game) {
        this.cols = GridSize.columns;
        this.rows = GridSize.rows;
        this.matrix = game.map;
        this.cellSize = game.gameGridCellSize;        
        this.grid = [...Array(this.cols)].fill().map((_,i) => Array(this.rows).fill().map((_,j) => new Spot(i, j, this.cellSize, this.cols, this.rows, this.matrix)));
        this.openSet = new Array();
        this.closedSet = new Array();
        this.follower = this.grid[game.followers[0].i][game.followers[0].j];
        this.warrior = this.grid[this.cols - 1][this.rows - 1];
        this.best = 0;
        this.removeFromArray = (set, element) => {
            for (var i = set.length - 1; i >= 0; i--) {
                if (set[i] == element) {
                    set.splice(i, 1);
                }
            }
        };  //mutating openSet array using splice()
        this.heuristic = (a, b) => Math.abs(a.i - b.i) + Math.abs(a.j - b.j); 
        // this.heuristic = (a, b) => Math.sqrt(Math.pow(a.i - b.i,2) + Math.pow(a.j - b.j,2));
        
    }

    start() {
        this.follower.wall = false;
        this.warrior.wall = false;
        this.openSet.push(this.follower);
       
    }

    draw(ctx) {
        
        if (this.openSet.length > 0) {
            //Search for the cell that has the lowest f value...
            let minF = this.openSet[0].f;
            this.openSet.forEach((_, idx) => {
                if (this.openSet.length > this.best){
                        if (this.openSet[idx].f < this.openSet[this.best].f)  this.best = idx; 
                    }
                else{
                    if (this.openSet[idx + 1].f < minF){
                        minF = this.openSet[idx + 1].f;
                        this.best = idx; 
                    }
                }
            });
            //If it finds a cell with the lowest f value, set that as a current cell..
            let current = this.openSet[this.best];
            if (current === this.warrior) {
                console.log('DONE!');
                return;         
            };
            var path = [], coors = [], curve = [];            
            var temp = current;
            path.push(temp);
            while(temp.previous) {
                coors.push(temp.previous.center.x);
                coors.push(temp.previous.center.y);
                path.push(temp.previous);
                curve.push(...temp.splinePoint);
                temp = temp.previous;
            }   
            this.removeFromArray(this.openSet, current);
            this.closedSet.push(current);
            let neighbors = current.addNeighbors(this.grid);
            neighbors.forEach(item => {
                let neighbor = item;
                if (!this.closedSet.includes(neighbor) && !neighbor.wall) {
                    let tempG = current.g + 1;
                    let newPath = false;
                    if (this.openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                            newPath = true;
                        }
                    }else{
                        neighbor.g = tempG;
                        newPath = true;
                        this.openSet.push(neighbor);
                    }
                    if (newPath) {
                        neighbor.h = this.heuristic(neighbor, this.warrior);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.previous = current;
                    }
                }
            });
        } else {
            console.log('No solution!!')
            // return;
        }
        this.openSet.length > 0 ? console.log('solution') : console.log('no solution');
        this.closedSet.forEach(item => item.show(ctx, '#F51545')); 
        this.grid.forEach(col => col.forEach(row => row.addNeighbors(this.grid)));
        //Pat - blue
        path.forEach(item => item.path(ctx, coors,'#211DCA')); 

    }
}


import {Cell} from './cell'

class PresentationalGrid{
    node: HTMLElement
    grid: Cell[][] = []

    constructor(grid: number[][]){
        this.node = document.getElementById("grid")
        let gridCellSizes = ""
        for (let i = 0; i < grid.length; i++){
            gridCellSizes += "70px "
        }
        this.node.style.gridTemplateColumns = gridCellSizes
        this.node.style.gridTemplateRows = gridCellSizes
        
        for (let i = 0; i < grid.length; i++){
            let t_arr: Cell[] = []
            for (let j = 0; j < grid[i].length; j++){
                let val = grid[i][j]
                let newCell = new Cell()
                newCell.create(this.node)
                newCell.setValue(val)
                t_arr.push(newCell)  
            }
            this.grid.push(t_arr)
            t_arr = []
        }
    }

    redraw(grid: number[][]){
        for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid[i].length; j++){
                let val = grid[i][j]
                this.grid[i][j].setValue(val)   
            }
        }
    }

}

export {PresentationalGrid}
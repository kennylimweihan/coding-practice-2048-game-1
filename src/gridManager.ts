import {PresentationalGrid} from './presentational/PresentationalGrid'

interface coordinate {
    i: number,
    j: number
}

class gridManager {
    prevGrid: number[][]
    grid: number[][]
    emptyCells : coordinate[]
    gridIsChanged : boolean
    gameStatus : string
    gameOverHandler : (status:string) => void
    presGrid : PresentationalGrid

    constructor(grid: number[][], gameOverFunc: (status:string) => void){
        this.grid = grid
        this.gameOverHandler = gameOverFunc
        this.emptyCells = []
        this.prevGrid = []
        this.presGrid = new PresentationalGrid(this.grid)

        this.gameStatus = 'ongoing'

        this.gridIsChanged = true
        this.nextState()
        this.gridIsChanged = true
        this.nextState()
    }

    nextState(): void{
        if(!this._arrayIsSame(this.prevGrid, this.grid)){
            this.gridIsChanged = true
        }

        //check for empty cells or 2048
        loop:
            for(let i = 0; i < this.grid[0].length; i++){
                for(let j = 0; j < this.grid.length; j++){
                    if(this.grid[i][j] == 0){
                        this.emptyCells.push({i: i, j: j})
                    }
                    else if (this.grid[i][j] == 2048){
                        this.gameStatus = 'win'
                        break loop
                    }
                }
            }
        if(!this.gridIsChanged && this.emptyCells.length == 0){
            if(this._isDeadGrid()){
                this.gameStatus = 'lose'
            }
        }
        //check win lose state
        if(this.gameStatus == 'win' || this.gameStatus == 'lose'){
            this.gameOverHandler(this.gameStatus)
            this.presGrid.redraw(this.grid)
            return
        }

        if (this.gridIsChanged){ //add a new cell if grid is changed
            let targetCoor: coordinate = this.emptyCells[Math.floor(Math.random() * this.emptyCells.length)]
            this.grid[targetCoor.i][targetCoor.j] = 2;
            this.gridIsChanged = false
        }

        this.emptyCells = []
        this.presGrid.redraw(this.grid)
    }

    moveRight(): void {
        this._storeGridScreenshot()
        this._mergeRightAll()
        this.nextState()
    }

    moveUp(): void {
        this._storeGridScreenshot()
        this._clockwiseRotate()
        this._mergeRightAll()
        this._antiClockwiseRotate()
        this.nextState()
    }

    moveDown(): void {
        this._storeGridScreenshot()
        this._antiClockwiseRotate()
        this._mergeRightAll()
        this._clockwiseRotate()
        this.nextState()
    }

    moveLeft(): void {
        this._storeGridScreenshot()
        this._clockwiseRotate()
        this._clockwiseRotate()
        this._mergeRightAll()
        this._antiClockwiseRotate()
        this._antiClockwiseRotate()
        this.nextState()
    }

    _mergeRightAll() : void {
        for(let i = 0; i < this.grid.length; i++){
            this.grid[i] = this._mergeRight(this.grid[i])
        }
    }

    _mergeRight(row: number[]): number[] {
        let occupiedCells = row.filter((el)=>{return el != 0})
        for (let i = occupiedCells.length - 1; i > 0; i--){
            if (occupiedCells[i] == occupiedCells[i-1]){
                occupiedCells[i-1] *= 2
                occupiedCells[i] = 0
                i--
            }
        }
        occupiedCells = occupiedCells.filter((el)=>{return el != 0})
        let zeroesArray : number[] = Array.apply(null, new Array(row.length - occupiedCells.length)).map(()=> 0);
        return zeroesArray.concat(occupiedCells)
    } 

    _clockwiseRotate(): void {
        let n = this.grid.length

        for(let i = 0; i < Math.floor(n/2); i++){
            for(let j = i; j < n - 1 - i; j++){
                let k = this.grid[i][j]
                this.grid[i][j] = this.grid[n - 1 - j][i]
                this.grid[n - 1 - j][i] = this.grid[n - 1 - i][n - 1 - j]
                this.grid[n - 1 - i][n - 1 - j] = this.grid[j][n - 1 - i]
                this.grid[j][n - 1 - i] = k
            }
        }
    }

    _antiClockwiseRotate(): void {
        let n = this.grid.length

        for(let i = 0; i < Math.floor(n/2); i++){
            for(let j = i; j < n - 1 - i; j++){
                let k = this.grid[i][j]
                this.grid[i][j] = this.grid[j][n - 1 - i]
                this.grid[j][n - 1 - i] = this.grid[n - 1 - i][n - 1 - j]
                this.grid[n - 1 - i][n - 1 - j] = this.grid[n - 1 - j][i]
                this.grid[n - 1 - j][i] = k
            }
        }
    }

    _storeGridScreenshot(){
        if (this.prevGrid.length == 0){ //first time initialisation
            let row : number[] = []
            for(let i = 0; i < this.grid.length; i++){
                for(let j = 0; j < this.grid[0].length; j++){
                    row.push(this.grid[i][j])
                }
                this.prevGrid.push(row)
                row = []
            }
        }
        else{
            for(let i = 0; i < this.grid.length; i++){
                for(let j = 0; j < this.grid[0].length; j++){
                    this.prevGrid[i][j] = this.grid[i][j]
                }
            }
        }
    }

    _arrayIsSame(arr1: number[][], arr2: number[][]): boolean {
        for(let i = 0; i < arr1.length; i++){
            for(let j = 0; j < arr1[i].length; j++){
                if(arr1[i][j] != arr2[i][j]){
                    return false
                }
            }
        }
        return true
    }

    _isDeadGrid(): boolean {
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length - 1; j++){
                if (this.grid[i][j] == this.grid[i][j+1]){
                    return false
                }
            }
        }
        this._clockwiseRotate()
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length - 1; j++){
                if (this.grid[i][j] == this.grid[i][j+1]){
                    this._antiClockwiseRotate()
                    return false
                }
            }
        }
        this._antiClockwiseRotate()
        return true
    }
}

export {gridManager}

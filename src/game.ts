import {KeyboardManager} from './keyboardManager'
import {gridManager} from './gridManager'

class Game {
    gridSize: number
    keyMan: KeyboardManager
    gridMan: gridManager

    constructor(gridSize: number){
        this.init(gridSize)
    }

    init(gridSize: number) : void {
        let gridMould: number[][] = []
        let rowMould: number[] = []

        for(let i = 0; i < gridSize; i++){
            for(let j = 0; j < gridSize; j++){
                rowMould.push(0)
            }
            gridMould.push(rowMould)
            rowMould = [] //important!!
        }

        this.gridMan = new gridManager(
            gridMould,
            (status: string)=>{this.endGameHandler(status)})

        this.keyMan = new KeyboardManager(
            () => {this.gridMan.moveDown()},
            () => {this.gridMan.moveUp()},
            () => {this.gridMan.moveLeft()},
            () => {this.gridMan.moveRight()}
        )

    }

    endGameHandler(status:string): void {
        this.keyMan.timer.timerIsEnd = true //this is ugly, i know 😥, didnt do proper planning..
        let message : string = ""
        if (status == 'lose'){
            message = "Oops it is Game Over right there.<br>Try again by refreshing the page 😉"
        }else if (status == 'win'){
            message = "You WON!<br>Congratulations.🎉🎊🎉🎊"
        }
        document.getElementById("message").innerHTML = message
    }

}

export {Game}
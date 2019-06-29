import {Timer} from './presentational/timer'

class KeyboardManager {
    timer: Timer

    downKeyCallback: () => void
    upKeyCallback: () => void
    leftKeyCallback: () => void
    rightKeyCallback: () => void

    constructor(downFunc: () => void, upFunc: () => void, leftFunc: () => void, rightFunc: () => void){
        this.downKeyCallback = downFunc
        this.upKeyCallback = upFunc
        this.leftKeyCallback = leftFunc
        this.rightKeyCallback = rightFunc
        document.addEventListener('keydown', (ev) => {this.keyDownHandler(ev)}, false)
    }

    keyDownHandler(event: KeyboardEvent) : void { 
        if(!this.timer){ //starts timer the first time the player starts playing
            this.timer = new Timer()
        }
        if(event.keyCode == 39) { //rightArrowKey
            this.rightKeyCallback()
        }
        else if(event.keyCode == 37) { //leftArrowKey
            this.leftKeyCallback()
        }
        else if(event.keyCode == 40) { //downKeyArrow
            this.downKeyCallback()
        }
        else if(event.keyCode == 38) { //upKeyArrow
            this.upKeyCallback()
        }
    }
    
}

export {KeyboardManager}
import {pickColor} from './color'

class Cell {
    value: number
    node: HTMLElement

    create(parent: HTMLElement) : void {
        this.node = document.createElement("div")
        this.node.className = "cell"
        parent.append(this.node)
    }

    setValue(val: number) : void{
        this.value = val
        this.render()
    }

    render() : void {
        if(this.value != 0){
            // let stringLen = String(this.value).length
            this.node.style.fontSize = String(30) + "px"
            this.node.innerHTML = String(this.value)
        }
        else{
            this.node.innerHTML = ""
        }
        this.node.style.backgroundColor = pickColor(this.value)
    }
}

export {Cell}
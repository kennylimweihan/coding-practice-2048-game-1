class Timer {
    lapsedTime : number
    node : HTMLElement
    timerIsEnd : boolean

    constructor(){
        this.lapsedTime = 0
        this.node = document.getElementById("timer")
        this.renderTimer(this.lapsedTime)
        this.tickTimer()
        this.timerIsEnd = false
    }

    renderTimer(lapseSec: number) : void{
        let sec = lapseSec % 60
        let t = (lapseSec - sec) / 60
        let min = t % 60
        t = (t - min)/60
        let hr = t % 24

        let strSec = String(sec)
        let strMin = String(min)
        let strHr = String(hr)

        if(strSec.length < 2){
            strSec = '0' + strSec
        }
        if(strMin.length < 2){
            strMin = '0' + strMin
        }
        if(strHr.length < 2){
            strHr = '0' + strHr
        }
        
        this.node.innerHTML = strHr + ' : ' + strMin + ' : ' + strSec
    }

    tickTimer(): void {
        setTimeout(()=>{
            if(!this.timerIsEnd){
                this.tickTimer()
                this.lapsedTime++
                this.renderTimer(this.lapsedTime)
            }else{
                this.node.style.fontWeight = "bold"
                this.node.style.fontSize = "1.7em"
            }
        }, 1000)
    }

}

export {Timer}
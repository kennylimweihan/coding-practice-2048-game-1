function pickColor(num: number) : string{
    switch(num){
        case 0:
            return "rgb(255, 234, 230)"
        case 2:
            return "rgb(255,172,154)"
        case 4:
            return "rgb(255, 223, 154)"
        case 8:
            return "rgb(237, 255, 154)"
        case 16:
            return "rgb(186, 255, 154)"
        case 32:
            return "rgb(154, 255, 172)"
        case 64:
            return "rgb(255, 89, 52)"
        case 128:
            return "rgb(255, 191, 52)"
        case 256:
            return "rgb(218, 255, 52)"
        case 512:
            return "rgb(116, 255, 52)"
        case 1024:
            return "rgb(52, 255, 89)"
        case 2048:
            return "rgb(52, 255, 191)"
    }
}

export {pickColor}
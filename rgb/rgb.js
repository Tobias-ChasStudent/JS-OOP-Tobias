function Color(r, g, b) {
    this.rgb = function () {
        return `rgb(${r},${g},${b})`
    }
    this.toHex = function () {
        let hexR = r.toString(16)
        let hexG = g.toString(16)
        let hexB = b.toString(16)
        
        if (hexR.length == 1) {
            hexR = `0${hexR}`
        }
        if (hexG.length == 1) {
            hexG = `0${hexG}`
        }
        if (hexB.length == 1) {
            hexB = `0${hexB}`
        }

        return `#${hexR}${hexG}${hexB}`
    }
    this.rgba = function (a) {
        return `rgb(${r},${g},${b},${a})`
    }
}
const red = new Color(255, 0, 0)

console.log(red.rgb());

console.log(red.toHex());

console.log(red.rgba(32));
class Calculator {
    constructor(obj) {
        let { data, options } = obj
        this.data = data
        this.testInput = options.testInput
        this.outputElem = options.outputElem
        this.submitBtn = options.submitBtn
        this.testInputValue = null

        this._init()
    }

    _init() {
        this.testInput.addEventListener('change', (e) => { this._onClickHandler(e) })

    }

    renderOutput()  {
        this.outputElem.innerHTML = `<div>${this.testInputValue}</div>`
    }

    _onClickHandler (e) {
        this.testInputValue = this.testInput.value
        this.renderOutput()
        console.log("this.data : ", this.data )
    }
}
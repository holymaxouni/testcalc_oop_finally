class Calculator {
    constructor({windowObject, coeffs,  size, brands, type, quantity, section, output, click}) {
        this.coeffs = coeffs
        this.data = windowObject
        this.windowCountKey = null
        this.windowTypeKey = null
        this.windowTypeKey1 = "default"
        this.windowTypeKey2 = null
        this.windowTypeKey3 = null
        this.widthKey = null
        this.heightKey = null
        this.inputWidth = size.inputWidth
        this.inputHeight = size.inputHeight
        this.kbe = brands.kbe
        this.rehau = brands.rehau
        this.montblanc = brands.montblanc
        this.brand = brands.brand
        this.typeProfile = type.typeProfile
        this.typeProfileValue = type.typeProfileValue
        this.notification = type.notification
        this.oneWindow = quantity.oneWindow
        this.twoWindows = quantity.twoWindows
        this.threeWindows = quantity.threeWindows
        this.oneTypeSelector = section.oneTypeSelector
        this.twoTypeFirst = section.twoTypeFirst
        this.twoTypeSecond = section.twoTypeSecond
        this.firstArrayOption = section.twoTypeFirst.querySelectorAll('option')
        this.secondArrayOption = section.twoTypeSecond.querySelectorAll('option')
        this.selectPowerFirst = section.selectPowerFirst
        this.selectPowerSecond = section.selectPowerSecond
        this.mostPowerSelect = section.mostPowerSelect
        this.result = output.result
        this.totalResult = output.totalResult
        this.k = output.k
        this.b = output.b
        this.totalCoeff = output.totalCoeff
        this.outputValue = output.outputValue
        this.outputMoscowValue = output.outputMoscowValue
        this.checkWidth = output.checkWidth
        this.checkHeight = output.checkHeight
        this._initialValue()
        this._listenersStorage()
    }

    _listenersStorage() {
        this.inputWidth.addEventListener('change', (e) => {
            if (typeof e.target.value !== "string") {
                return
            }
            let eCheck = Math.round(e.target.value / 100) * 100
            this.widthKey = String(eCheck)
            this.getCoeff()
            this.getPrice()
        })
        this.inputHeight.addEventListener('change', (b) => {
            if (typeof b.target.value !== "string") {
                return
            }
            let bCheck = Math.round(b.target.value / 100) * 100
            if (this.windowCountKey === 'one' && b.target.value >= 1000 && b.target.value <= 1099) {
                bCheck = 1000
            }
            this.heightKey = String(bCheck)
            this.getCoeff()
            this.getPrice()
        })
        this.kbe.addEventListener('click', () => {
            this.k = String(this.kbe.dataset.coeff)
        })
        this.rehau.addEventListener('click', () => {
            this.k = String(this.rehau.dataset.coeff)
        })
        this.montblanc.addEventListener('click', () => {
            this.k = String(this.montblanc.dataset.coeff)
        })
        this.typeProfile.addEventListener('change', (e) => {
            this.typeProfileValue = String(e.target.value)
            this.getPrice()
            this.getCoeff()

        })
        //___Количество секций___//
        this.oneWindow.addEventListener('click', () => {
            this.windowCountKey = this.oneWindow.dataset.count

        })
        this.twoWindows.addEventListener('click', () => {
            this.windowCountKey = this.twoWindows.dataset.count

        })
        this.threeWindows.addEventListener('click', () => {
            this.windowCountKey = this.threeWindows.dataset.count

        })

        //___Тип секций___//
        this.oneTypeSelector.addEventListener('change', (e) => {
            this.windowTypeKey1 = e.target.value
            this.getCoeff()
            this.getPrice()

        })
        this.twoTypeFirst.addEventListener('change', (e) => {
            this.windowTypeKey2 = e.target.value

            if (this.firstArrayOption[1].value === this.windowTypeKey2) {
                this.secondArrayOption[1].disabled = true
                this.secondArrayOption[0].selected = true
                this.secondArrayOption[0].removeAttribute("disabled")
                this.secondArrayOption[2].removeAttribute("disabled")
                this.selectPowerFirst =
                    this.firstArrayOption[1].dataset.power

            }
            if (this.firstArrayOption[0].value === this.windowTypeKey2) {
                this.selectPowerFirst =
                    this.firstArrayOption[0].dataset.power
                for (let i = 0; i < this.secondArrayOption.length; i++) {
                    this.secondArrayOption[i].removeAttribute("disabled")
                }
                this.secondArrayOption[1].removeAttribute("disabled")
                this.secondArrayOption[2].removeAttribute("disabled")
            }
            if (this.firstArrayOption[2].value === this.windowTypeKey2) {
                this.selectPowerFirst =
                    this.firstArrayOption[2].dataset.power
                this.secondArrayOption[0].disabled = true
                this.secondArrayOption[1].selected = true
                this.secondArrayOption[2].disabled = true
                this.secondArrayOption[1].removeAttribute("disabled")
            }
            this.getCoeff()
            this.getPrice()

        })
        this.twoTypeSecond.addEventListener('change', (e) => {
            this.windowTypeKey3 = e.target.value

            if (this.secondArrayOption[1].value === this.windowTypeKey3) {
                this.firstArrayOption[1].disabled = true
                this.firstArrayOption[0].selected = true
                this.firstArrayOption[0].removeAttribute("disabled")
                this.firstArrayOption[2].removeAttribute("disabled")
                this.selectPowerSecond =
                    this.secondArrayOption[1].dataset.power

            }
            if (this.secondArrayOption[0].value === this.windowTypeKey3) {
                this.selectPowerSecond =
                    this.secondArrayOption[0].dataset.power
                for (let i = 0; i < this.firstArrayOption.length; i++) {
                    this.firstArrayOption[i].removeAttribute("disabled")
                }
                this.firstArrayOption[1].removeAttribute("disabled")
                this.firstArrayOption[2].removeAttribute("disabled")
            }
            if (this.secondArrayOption[2].value === this.windowTypeKey3) {
                this.selectPowerSecond =
                    this.secondArrayOption[2].dataset.power
                this.firstArrayOption[0].disabled = true
                this.firstArrayOption[1].selected = true
                this.firstArrayOption[2].disabled = true
                this.firstArrayOption[1].removeAttribute("disabled")
            }
            this.getCoeff()
            this.getPrice()


        })
        document.querySelector('.brand').addEventListener("click", (evt) => {
            let target = evt.target
            if (target.tagName !== "BUTTON") {
                return
            }
            this.getCoeff()
            this.getPrice()
        })
        document.querySelector('.count-windows').addEventListener('click', (evt) => {
            let target = evt.target
            if (target.tagName !== "BUTTON") {
                return
            }
            this.getCoeff()
            this.getPrice()
        })
    }

    _initialValue() {
        this.windowCountKey = null
        this.windowTypeKey = null
        this.windowTypeKey1 = "default"
        this.windowTypeKey2 = null
        this.windowTypeKey3 = null
        this.widthKey = null
        this.heightKey = null
        this.brand = null
        this.typeProfileValue = "1"
        this.selectPowerFirst = 1
        this.selectPowerSecond = 1
        this.mostPowerSelect = 1
        this.result = 0
        this.totalResult = 0
        this.k = 0
        this.b = 0
        this.totalCoeff = 0
        this.checkWidth = 0
        this.checkHeight = 0

    }

    getCoeff() {
        console.log(this.coeffs)
        console.log(this.k)
        console.log(this.typeProfileValue)
        //toDo:исправить ошибку
        this.b = this.coeffs[this.k][this.typeProfileValue]
        this.totalCoeff = this.b * this.k
        if (this.result > 0) {
            this.renderResult()
        }
        // return this.totalCoeff
    }

    getPrice() {
        if (this.windowCountKey === 'one') {
            this.windowTypeKey = this.windowTypeKey1
            this.checkWidth = Number(this.widthKey)
            this.checkHeight = Number(this.heightKey)
            if (this.checkWidth < 800) {
                this.inputWidth.value = '800'
                this.checkWidth = 800
                this.widthKey = String(this.checkWidth)

            }
            if (this.checkWidth > 1200) {
                this.notification.style.color = "#f26c4f"

            }
            if (this.checkHeight < 1000) {
                this.inputHeight.value = '1000'
                this.checkHeight = 1000
                this.heightKey = String(this.checkHeight)
            }
            if (this.checkHeight > 1500) {
                this.notification.style.color = "#f26c4f"
            }
        }

        if (this.windowCountKey === 'two') {
            this.mostPowerSelect = Math.max(this.selectPowerFirst,
                this.selectPowerSecond)
            this.windowTypeKey = this.mostPowerSelect
            this.checkWidth = Number(this.widthKey)
            this.checkHeight = Number(this.heightKey)
            if (this.checkWidth < 1100) {
                this.inputWidth.value = '1100'
                this.checkWidth = 1100
                this.widthKey = String(this.checkWidth)

            }
            if (this.checkWidth > 1600) {
                this.notification.style.color = "#f26c4f"

            }
            if (this.checkHeight < 1100) {
                this.inputHeight.value = '1100'
                this.checkHeight = 1100
                this.heightKey = String(this.checkHeight)
            }
            if (this.checkHeight > 1600) {
                this.notification.style.color = "#f26c4f"
            }
        }
        if (this.windowCountKey === 'three') {
            this.windowTypeKey = "default"
            this.checkWidth = Number(this.widthKey)
            this.checkHeight = Number(this.heightKey)
            if (this.checkWidth < 1700) {
                this.inputWidth.value = '1700'
                this.checkWidth = 1700
                this.widthKey = String(this.checkWidth)

            }
            if (this.checkWidth > 2200) {
                this.notification.style.color = "#f26c4f"

            }
            if (this.checkHeight < 1500) {
                this.inputHeight.value = '1500'
                this.checkHeight = 1500
                this.heightKey = String(this.checkHeight)
            }
            if (this.checkHeight > 1800) {
                this.notification.style.color = "#f26c4f"
            }
        }
       //toDo:Поменять эту хуйню на нормальный валидатор(с)Ромчег
        if(this.windowCountKey != null &&
            this.windowTypeKey != null &&
        this.widthKey != null &&
        this.heightKey != null ){
            this.result = this.data[this.windowCountKey][this.windowTypeKey]
                [this.widthKey][this.heightKey]
        }



        if (this.totalCoeff > 0) {
            this.renderResult()
        }
        // return this.result
    }

    renderResult() {
        this.totalResult = Math.round(this.totalCoeff * this.result)
        this.outputValue.textContent = this.totalResult + ' руб'
        this.outputMoscowValue.textContent = Math.round(this.totalResult * 1.7) + ' руб'
        if (isNaN(this.totalResult) || this.result === undefined) {
            this.outputValue.textContent = '0 руб'
            this.outputMoscowValue.textContent = '0 руб'
        }
        if (this.windowCountKey === 'one' && this.checkWidth > 1200 ||
            this.windowCountKey === 'one' && this.checkHeight > 1500) {
            this.outputValue.textContent = '0 руб'
            this.outputMoscowValue.textContent = '0 руб'
        }
        if (this.windowCountKey === 'two' && this.checkWidth > 1600 ||
            this.windowCountKey === 'two' && this.checkHeight > 1600) {
            this.outputValue.textContent = '0 руб'
            this.outputMoscowValue.textContent = '0 руб'
        }
        if (this.windowCountKey === 'three' && this.checkWidth > 2200 ||
            this.windowCountKey === 'three' && this.checkHeight > 1800) {
            this.outputValue.textContent = '0 руб'
            this.outputMoscowValue.textContent = '0 руб'
        }
        if (this.outputValue.textContent !== '0 руб') {
            this.notification.style.color = "white"
        }

    }

}
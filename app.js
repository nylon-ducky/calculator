class Calculator {
    constructor(histTextElement, currentTextElement) {
        this.histTextElement = histTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }
    clear() {
        this.current = "";
        this.hist = "";
        this.operation = undefined;
    }
    delete() {
        this.current = this.current.toString().slice(0, -1);
    }
    append(number) {
        if (number === "." && this.current.includes(".")) return;
        this.current = this.current.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.current === "") return;
        if (this.hist !== "") {
            this.compute()
        }
        this.operation = operation;
        this.hist = this.current;
        this.current = "";
    }
    compute() {
        let computation
        const prev = parseFloat(this.hist);
        const crnt = parseFloat(this.current);
        if (isNaN(prev) || isNaN(crnt)) return;
        switch (this.operation) {
            case "+":
                computation = prev + crnt;
                break
            case "-":
                computation = prev - crnt;
                break
            case "*":
                computation = prev * crnt;
                break
            case "/":
                computation = prev / crnt;
                break
            default:
                return
        }
        this.current = computation;
        this.operation = undefined;
        this.hist = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.getDisplayNumber(this.current);
        if (this.operation != null) {
            this.histTextElement.innerText = this.getDisplayNumber(this.hist) + this.operation;
        }else{
            this.histTextElement.innerText = "";
        }
    }
}

let numberButtons = document.querySelectorAll("[data-number]");
let operatorButtons = document.querySelectorAll("[data-operator]");
let deleteButton = document.querySelector("[data-del]");
let equalsButton = document.querySelector("[data-equals]");
let clearButton = document.querySelector("[data-clear]");
let histTextElement = document.querySelector("[data-hist]");
let currentTextElement = document.querySelector("[data-current]");

let calculator = new Calculator(histTextElement, currentTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.append(button.innerText)
        calculator.updateDisplay()
    })
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
});

clearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
});

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
});
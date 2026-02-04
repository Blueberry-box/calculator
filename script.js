let num1 = [];
let num2 = [];
let operator = [];
let calcResult = "_";


const result = document.querySelector(".result");
const buttonequals = document.querySelector(".buttonequals");
const btnnum = document.querySelectorAll(".btnnum");
const displayequation = document.querySelector(".displayequation");
const btnops = document.querySelectorAll(".btnops");
const buttonclear = document.querySelector(".buttonclear");
const buttonbackspace = document.querySelector(".buttonbackspace");
const body = document.querySelector("body");

body.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "0": document.querySelector(".button0").click();
        break;
        case "1": document.querySelector(".button1").click();
        break;
        case "2": document.querySelector(".button2").click();
        break;
        case "3": document.querySelector(".button3").click();
        break;
        case "4": document.querySelector(".button4").click();
        break;
        case "5": document.querySelector(".button5").click();
        break;
        case "6": document.querySelector(".button6").click();
        break;
        case "7": document.querySelector(".button7").click();
        break;
        case "8": document.querySelector(".button8").click();
        break;
        case "9": document.querySelector(".button9").click();
        break;

        case "+": document.querySelector(".buttonadd").click();
        break;
        case "-": document.querySelector(".buttonsubtract").click();
        break;
        case "*": document.querySelector(".buttonmultiply").click();
        break;
        case "/": document.querySelector(".buttondivide").click();
        break;

        case "Backspace": document.querySelector(".buttonbackspace").click();
        break;
        case ".": document.querySelector(".buttondot").click();
        break;
        case "Enter": document.querySelector(".buttonequals").click();
        break;
    }
})


function reset () {
    num1 = [];
    num2 = [];
    operator = [];
}


function alreadyHasDot (array) {
    return array.includes(".");
}


function hasNumber (array) {
    if ((array.length === 0) || (array.length === 1 && alreadyHasDot(array))) {
        return false;
    } else {
        return true;
    }
}


btnnum.forEach(button => button.addEventListener("click", (event) => {
    let number = button.innerText;
    if (calcResult === "Error. Can't divide by 0") {
        calcResult = "_";
        reset();
    }
    if (num1.length === 0 && num2.length === 0 && operator.length === 0) {
        result.innerText = "_";
    }

    if (operator.length === 0) {
        if (number === "." && alreadyHasDot(num1)) {
        } else {
            num1.push(number);
            displayequation.innerText = num1.join("");
        }

    } else if (operator[0] !== "=") {
        if (number === "." && alreadyHasDot(num2)) {
        } else {
            num2.push(number);
            displayequation.innerText = num1.join("") + " "+ operator[0] + " " + num2.join("");
        }

    } else {
        reset();
        num1.push(number);
        displayequation.innerText = num1.join("0");
        result.innerText = "_";
    }
}))


function operate () {
    let firstnum = +num1.join("");
    let secondnum = +num2.join("");

    if (operator[0] === "+") {
        calcResult = firstnum + secondnum;
    } else if (operator[0] === "-") {
        calcResult = firstnum - secondnum;
    } else if (operator[0] === "x") {
        calcResult = firstnum * secondnum;
    } else if (operator[0] === "/") {
        if (secondnum === 0) {
            calcResult = "Error. Can't divide by 0";
            reset();
        } else {
            calcResult = firstnum / secondnum;
        }
    }

    if (calcResult !== "Error. Can't divide by 0") {
        displayequation.innerText = num1.join("") + " "+ operator[0] + " " + num2.join("") + " =";
        result.innerText = calcResult;
        reset();
        num1[0] = calcResult;
    } else {
        displayequation.innerText = "*";
        result.innerText = calcResult;
        reset();
    } 
}


btnops.forEach(button => button.addEventListener("click", (event) => {
    
    if (num1.length > 0 && num2.length > 0 && hasNumber(num1) && hasNumber(num2)) {
        operate();
        let op = button.innerText;
        operator[0] = op;
    } else if (num1.length > 0 && num2.length === 0 && button.innerText !== "=" && hasNumber(num1)){
        let op = button.innerText;
        operator[0] = op;
        displayequation.innerText = num1.join("") + " "+ operator[0];
    }
}));


buttonclear.addEventListener("click", (event) => {
    reset();
    result.innerText = "_";
    displayequation.innerText = "0";
});


buttonbackspace.addEventListener("click", (event) => {
    if (num1.length > 0 && operator.length > 0 && num2.length > 0) {
        num2.pop();
        displayequation.innerText = num1.join("") + " "+ operator[0] + " " + num2.join("");
    } else if (num1.length > 0 && operator.length === 0 && num2.length === 0) {
        if (num1.length === 1) {
            displayequation.innerText = 0;
        } else {
            num1.pop();
            displayequation.innerText = num1.join("");
        }
    }
});
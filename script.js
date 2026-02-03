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
    console.log(number);
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
    }
}));


buttonclear.addEventListener("click", (event) => {
    reset();
    result.innerText = "_";
    displayequation.innerText = "0";
});
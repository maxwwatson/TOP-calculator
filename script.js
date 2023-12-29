// calculator operations globals
let numClicked;
let numA = '';
let numB = '';
let operator = '';
let sum = '';
let display = `${numA} ${operator} ${numB}`;

// **** setup all event listeners  ****
// numbers
const numBtns = document.getElementsByClassName("num");
console.log(numBtns[0].textContent);
for(let i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener('click', () => {
        numClicked = numBtns[i].textContent;
        if(numA == '') numA = numClicked;
        else if(operator == '') numA += numClicked;
        else numB += numClicked;
        console.log(numClicked);
        populateDisplay();
    });
}
// backspace
// negative or positive 
// clear
// all clear 
// divide multiply minus plus 

// Step 1: Add, subtract, multiple, divide functions. Also add other ones
// *** See here all functions for the Keys ***
function add(a, b){
    return(a + b);
} // +

function subtract(a, b) {
    return (a - b);
}// -

function multiply(a, b){
    return (a * b);
}// *

function divide(a, b){
    return (a / b);
}// /

function power(a, b){
    return (a ** b);
}// **

function equals() { // break and butter. update sum, clear display, preparing for new operations
    sum = operate(operator, numA, numB);
    clearDisplay();
    populateDisplay();
}

function clearDisplay() { // for 'C', and when req to call
    numA = '', numB = '', operator = '';
}

function clearDisplayAll() { // for 'AC', and when req to clear entire display
    numA = '', numB = '', operator = '', sum = '';
}

// *** End all functions for the keys ***

// SOLUTION for multiple nums before equals:
// store it in an array, pass (operation, ...args) into operate,
// for loop to iterate through it, then send output
function operate(operation, a, b){
    let output = 0;
    // find out what the operation is, call correct function
    switch(operation){
        case '+':
            output = add(a,b);
            break;
        case '-':
            output = subtract(a,b);
            break;
        case '/':
            output = divide(a,b);
            break;
        case '*':
            output = multiply(a,b);
            break;
        case '**':
            output = power(a,b);
            break;
        default:
            output = 0;
            break;
    } // now have the output
    //populateDisplay(output);
    return output;
}

// take in the output of a,b with operator used, and display it
let displayPara = document.querySelector('#displayPara');
let displaySum = document.querySelector('#displaySum');
function populateDisplay(){
    displaySum.textContent = sum;
    display = `${numA} ${operator} ${numB}`;
    displayPara.textContent = display;
}

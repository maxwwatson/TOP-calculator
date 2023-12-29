// calculator operations globals
let numClicked;
let numA = '0';
let numB = '';
let operator = '';
let operator2 = '';
let sum = '';
let display = `${numA} ${operator} ${numB}`;

let displayPara = document.querySelector('#displayPara');
let displaySum = document.querySelector('#displaySum');

// **** setup all event listeners  ****
// numbers
const numBtns = document.getElementsByClassName("num");
console.log(numBtns[0].textContent);
for(let i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener('click', () => {
        numClicked = numBtns[i].textContent;
        //if(alreadyDecimal) { } // do nothing
        if(numA == '' || numA == '0') numA = numClicked;
        else if(operator == '') numA += numClicked;
        else numB += numClicked;
        populateDisplay();
    });
}
const backspaceBtn = document.querySelector('.backspace');
const clearBtn = document.querySelector('.clear');
const allClearBtn = document.querySelector('.allClear');
const negativeBtn = document.querySelector('.negative');
const equalsBtn = document.querySelector('.equals');

backspaceBtn.addEventListener('click', () => {
    if(numB == '') numA = numA.slice(0,-1);
    else numB = numB.slice(0,-1);
    populateDisplay();
});
clearBtn.addEventListener('click', () => {
    clearDisplay();
});
allClearBtn.addEventListener('click', () => {
    clearDisplayAll(); 
});
negativeBtn.addEventListener('click', () => {
    if(numB == '') {numA = numA * (-1);}
    else {numB = numB * (-1);}
    console.log(`NumA ${numA} numB ${numB}`)
    populateDisplay();
});

equalsBtn.addEventListener('click', equals);
// operators 
const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const multiplyBtn = document.querySelector('.multiply');
const divideBtn  = document.querySelector('.divide');

plusBtn.addEventListener('click', () => {
    if(sum != '' && (numA == '' || numA == '0')) {
        numA = sum;
        sum = 0;
    }
    if(operator != '') {
        extraOperator();
        operator = '+';
        populateDisplay();
    }
    else {
        operator = '+';
        populateDisplay();
    }

});

minusBtn.addEventListener('click', () => {
    if(sum != '' && (numA == '' || numA == '0')) {
        numA = sum;
        sum = 0;
    }
    if(operator != '') {
        extraOperator();
        operator = '-';
        populateDisplay();
    }
    else {
        operator = '-';
        populateDisplay();
    }
})

multiplyBtn.addEventListener('click', () => {
    if(sum != '' && (numA == '' || numA == '0')) {
        numA = sum;
        sum = 0;
    }
    if(operator != '') {
        extraOperator();
        operator = '*';
        populateDisplay();
    }
    else {
        operator = '*';
        populateDisplay();
    }
})

divideBtn.addEventListener('click', () => {
    if(sum != '' && (numA == '' || numA == '0')) {
        numA = sum;
        sum = 0;
    }
    if(operator != '') {
        extraOperator();
        operator = '/';
        populateDisplay();
    }
    else {
        operator = '/';
        populateDisplay();  
    }

})

populateDisplay();
// Step 1: Add, subtract, multiple, divide functions. Also add other ones
// *** See here all functions for the Keys ***
function add(a, b){
    return(parseFloat(a) + parseFloat(b));
} // +

function subtract(a, b) {
    return (parseFloat(a) - parseFloat(b));
}// -

function multiply(a, b){
    return (parseFloat(a) * parseFloat(b));
}// *

function divide(a, b){
    if(b == '0') {
        clearDisplayAll();
        alert("How dare you! You cannot divide by zero!");
        return 0;
    }
    return (parseFloat(a) / parseFloat(b));
}// /

function power(a, b){
    return (parseFloat(a) ** parseFloat(b));
}// **

function equals(operator2) { // bread and butter. update sum, clear display, preparing for new operations
    if(sum != '' &&
       numA != '' &&
       numB != '') {
        sum = 0;
    }
    if(operator2 == 2) {
        numA = operate(operator, numA, numB);
        numB = '', operator = '';
    }
    else {
        sum = sum + operate(operator, numA, numB);
        if(sum % 1 != 0) {
            sum = parseFloat(sum).toFixed(5);
        }

        clearDisplay();
    }

}

function clearDisplay() { // for 'C', and when req to call
    numA = '0', numB = '', operator = '';
    populateDisplay();
}

function clearDisplayAll() { // for 'AC', and when req to clear entire display
    numA = '0', numB = '', operator = '', sum = '';
    populateDisplay();
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
    return output.toFixed(5);
}

// take in the output of a,b with operator used, and display it

function populateDisplay(){
    if(numA[numA.length-1] == '.' && alreadyDecimal(numA)) {
        numA = numA.slice(0,-1);
    }
    if(numB[numB.length-1] == '.' && alreadyDecimal(numB)) {
        numB = numB.slice(0,-1);
    }
    displaySum.textContent = sum;
    display = `${numA} ${operator} ${numB}`;
    displayPara.textContent = display;
}

// to allow stringing of multiple numbers and operations
function extraOperator() {
    equals(2); // call equals with a second operator
}

function alreadyDecimal(num) {
    // if still on numA
    let arr = [];
    let found = '';
    arr = num.split('');
    found = arr.reduce((initialStr, currentChar) => {
        if(currentChar == '.'){ return initialStr += '.';}
        return '';
    },'');
    console.log(found);
    return (found == '..');
}
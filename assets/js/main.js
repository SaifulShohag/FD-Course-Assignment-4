const displayInputs = document.querySelector('.display .inputs');
const displayResults = document.querySelector('.display .results');
let answer;
let operator;
let operatorPosition;
let dotAdded = false;

const addition = (a, b) => a + b;
const substraction = (a, b) => a - b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;

function restart() {
    displayInputs.textContent = '';
    displayResults.textContent = '';
    answer = undefined;
    operator = undefined;
    operatorPosition = undefined;
}

function inputCharacter(chr) {
    if(displayInputs.textContent.length < 32) {
        displayInputs.textContent += chr;
    } else alert("Sorry, you've reached the input limit.");
}

function deleteCharacter() {
    answer = undefined;
    displayResults.textContent = '';
    displayInputs.textContent = displayInputs.textContent.slice(0, -1);
    if(displayInputs.textContent.length === operatorPosition) {
        operator = undefined;
        operatorPosition = undefined;
        if(displayInputs.textContent.indexOf('.') !== -1) {
            dotAdded = true;
        }
    }
}
function inputDot(opr) {
    if(displayInputs.textContent.slice(-1) === '.' || dotAdded) {
        alert('Invalid input!');
    } else {
        dotAdded = true;
        inputCharacter(opr);
    }
}

function inputOperator(opr) {
    dotAdded = false;
    if(((displayInputs.textContent.length === 0 && opr !== '-') || displayInputs.textContent === '-')
    && answer === undefined || displayInputs.textContent.slice(-1) === '.') {
        alert('Invalid input!');
    } else if(displayInputs.textContent.length !== 0 && operator !== undefined && answer === undefined) {
        alert("Sorry, You can't enter more than 2 values and 1 operator.")
    } else if(answer !== undefined) {
        displayInputs.textContent = answer.toString();
        operator = opr;
        operatorPosition = displayInputs.textContent.length;
        inputCharacter(opr);
        answer = undefined;
        displayResults.textContent = '';
    } else {
        if(displayInputs.textContent.length !== 0) {
            operator = opr;
            operatorPosition = displayInputs.textContent.length;
        }
        inputCharacter(opr);
    }
}

function parseArithmetic() {
    let parser;
    let valueIsNegative = false;
    if(displayInputs.textContent[0] === '-') {
        parser = displayInputs.textContent.slice(1);
        valueIsNegative = true;
    } else parser = displayInputs.textContent;

    parser = parser.split(operator);
    let val1 = parseFloat(parser[0]);
    let val2 = parseFloat(parser[1]);
    return {'val1': valueIsNegative ? -1 * val1 : val1, 'val2': val2};
}

function implementOperation(a, b) {
    switch (operator) {
        case '+':
            return addition(a, b);
        case '-':
            return substraction(a, b);
        case '*':
            return multiplication(a, b);
        case '/':
            return division(a, b);
      }
}

function getResults() {
    dotAdded = false;
    if(displayInputs.textContent.length === 0 || displayInputs.textContent.length === (operatorPosition+1) ||
    (displayInputs.textContent.length === 1 && displayInputs.textContent[0] === '-')) {
        alert("Please enter a valid arithmetic!")
    } else {
        let values = parseArithmetic();
        if(isNaN(values.val2)) answer = values.val1;
        else answer = implementOperation(values.val1, values.val2);
        displayResults.textContent = answer.toString().length > 15 ? answer.toExponential(7) : answer;
    }
}


// "25+325*2/7".split(/\+|\-|\*|\//)
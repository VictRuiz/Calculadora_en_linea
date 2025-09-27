let currentInput = '';
let firstNumber = null;
let operator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const type = button.dataset.type;
    const value = button.textContent;

    if (type === 'number') {
      inputNumber(value);
    } else if (type === 'operator') {
      chooseOperator(value);
    } else if (type === 'equals') {
      evaluate();
    } else if (type === 'clear') {
      clearCalculator();
    }
  });
});

function inputNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) {
    display.textContent = number;
    shouldResetScreen = false;
  } else {
    display.textContent += number;
  }
  currentInput = display.textContent;
}

function chooseOperator(op) {
  if (operator !== null && !shouldResetScreen) {
    evaluate();
  }
  firstNumber = display.textContent;
  operator = op;
  shouldResetScreen = true;
}

function evaluate() {
  if (operator === null || shouldResetScreen) return;
  const secondNumber = display.textContent;

  if (operator === '/' && parseFloat(secondNumber) === 0) {
    display.textContent = "¿Dividir por 0? 🤡";
    clearState();
    return;
  }

  function operate(operator, a, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  switch (operator) {
    case '+':
      return numA + numB;
    case '-':
      return numA - numB;
    case '*':
      return numA * numB;
    case '/':
      return numA / numB;
    default:
      return null;
  }
}

  const result = operate(operator, firstNumber, secondNumber);
  display.textContent = roundResult(result);
  currentInput = display.textContent;
  operator = null;
}

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

function clearCalculator() {
  display.textContent = '0';
  clearState();
}

function clearState() {
  currentInput = '';
  firstNumber = null;
  operator = null;
  shouldResetScreen = false;
}
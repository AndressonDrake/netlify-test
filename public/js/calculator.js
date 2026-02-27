// public/js/calculator.js
let currentInput = '';
let previousInput = '';
let operation = null;

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += currentInput === '' ? '0.' : '.';
        updateDisplay();
    }
}

function appendOperator(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        calculate();
    }
    
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operation === null) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    previousInput = '';
    operation = null;
    updateDisplay();
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('calcDisplay');
    display.textContent = currentInput || '0';
}

// Discount Calculator
function calculateDiscount() {
    const amount = parseFloat(document.getElementById('shoppingAmount').value) || 0;
    const discountRate = parseFloat(document.getElementById('discountRate').value) || 0;
    
    const discountAmount = (amount * discountRate) / 100;
    const totalPayment = amount - discountAmount;
    
    document.getElementById('originalAmount').textContent = formatCurrency(amount);
    document.getElementById('discountPercentage').textContent = discountRate;
    document.getElementById('discountAmount').textContent = formatCurrency(discountAmount);
    document.getElementById('totalPayment').textContent = formatCurrency(totalPayment);
}

function formatCurrency(value) {
    return 'Rp ' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Initialize discount calculator on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('shoppingAmount')) {
        calculateDiscount();
    }
});
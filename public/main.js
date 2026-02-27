// public/js/main.js
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// public/js/contact.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert(data.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});

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

// public/js/auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert('Login successful!');
                    window.location.href = '/';
                } else {
                    alert(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
    
    // Handle Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                country: document.getElementById('country').value,
                password: password
            };
            
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert('Registration successful! Please login.');
                    window.location.href = '/login';
                } else {
                    alert(data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});
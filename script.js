// Game state
let isMultiplication = true;
let selectedTable = 0;
let score = 0;
let currentAnswer = 0;
let canAnswer = true;

// DOM elements
const startScreen = document.getElementById('startScreen');
const tableSelectionScreen = document.getElementById('tableSelectionScreen');
const gameScreen = document.getElementById('gameScreen');
const number1 = document.getElementById('number1');
const number2 = document.getElementById('number2');
const operator = document.getElementById('operator');
const answerInput = document.getElementById('answer');
const feedback = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const multiplyBtn = document.getElementById('multiplyBtn');
const divideBtn = document.getElementById('divideBtn');
const multiplicationModeBtn = document.getElementById('multiplicationMode');
const divisionModeBtn = document.getElementById('divisionMode');
const backToStart = document.getElementById('backToStart');
const backToTables = document.getElementById('backToTables');
const tableButtons = document.querySelectorAll('.table-btn');

// Event listeners
multiplicationModeBtn.addEventListener('click', () => showTableSelection(true));
divisionModeBtn.addEventListener('click', () => showTableSelection(true));
backToStart.addEventListener('click', returnToStart);
backToTables.addEventListener('click', returnToTables);
multiplyBtn.addEventListener('click', () => switchMode(true));
divideBtn.addEventListener('click', () => switchMode(false));
answerInput.addEventListener('input', checkAnswer);

tableButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedTable = parseInt(button.dataset.table);
        startGame();
    });
});

// Show table selection screen
function showTableSelection(multiply) {
    isMultiplication = multiply;
    startScreen.style.display = 'none';
    tableSelectionScreen.style.display = 'block';
}

// Return to start screen
function returnToStart() {
    score = 0;
    scoreElement.textContent = score;
    tableSelectionScreen.style.display = 'none';
    startScreen.style.display = 'block';
}

// Return to table selection
function returnToTables() {
    score = 0;
    scoreElement.textContent = score;
    gameScreen.style.display = 'none';
    tableSelectionScreen.style.display = 'block';
}

// Start the game with selected table
function startGame() {
    tableSelectionScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    multiplyBtn.classList.toggle('active', isMultiplication);
    divideBtn.classList.toggle('active', !isMultiplication);
    operator.textContent = isMultiplication ? '×' : '÷';
    generateNewProblem();
}

// Switch between multiplication and division
function switchMode(multiply) {
    isMultiplication = multiply;
    multiplyBtn.classList.toggle('active', multiply);
    divideBtn.classList.toggle('active', !multiply);
    operator.textContent = multiply ? '×' : '÷';
    generateNewProblem();
}

// Generate a new problem
function generateNewProblem() {
    answerInput.value = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    canAnswer = true;

    if (isMultiplication) {
        const num1 = selectedTable;
        const num2 = Math.floor(Math.random() * 10) + 1;
        number1.textContent = num1;
        number2.textContent = num2;
        currentAnswer = num1 * num2;
    } else {
        const num2 = selectedTable;
        const answer = Math.floor(Math.random() * 10) + 1;
        const num1 = num2 * answer;
        number1.textContent = num1;
        number2.textContent = num2;
        currentAnswer = answer;
    }

    answerInput.focus();
}

// Check the answer
function checkAnswer() {
    if (!canAnswer) return;

    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) return;

    if (userAnswer === currentAnswer) {
        score++;
        scoreElement.textContent = score;
        
        if (score >= 10) {
            feedback.textContent = '🎉 Gefeliciteerd! Je hebt 10 sommen goed! 🎉';
            feedback.className = 'feedback correct';
            score = 0;
            scoreElement.textContent = score;
            canAnswer = false;
            setTimeout(() => {
                gameScreen.style.display = 'none';
                tableSelectionScreen.style.display = 'block';
            }, 3000);
        } else {
            feedback.textContent = '✨ Goed gedaan! ✨';
            feedback.className = 'feedback correct';
            canAnswer = false;
            setTimeout(generateNewProblem, 2000);
        }
    } else if (answerInput.value.length >= currentAnswer.toString().length) {
        feedback.textContent = '❌ Probeer het nog eens! ❌';
        feedback.className = 'feedback incorrect';
        canAnswer = false;
        setTimeout(generateNewProblem, 2000);
    }
}

// Start the game
generateNewProblem(); 
// Game state
let isMultiplication = true;
let score = 0;
let currentAnswer = 0;
let canAnswer = true;

// DOM elements
const modeSelection = document.getElementById('modeSelection');
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
const backButton = document.getElementById('backButton');

// Event listeners
multiplicationModeBtn.addEventListener('click', () => startGame(true));
divisionModeBtn.addEventListener('click', () => startGame(false));
multiplyBtn.addEventListener('click', () => switchMode(true));
divideBtn.addEventListener('click', () => switchMode(false));
answerInput.addEventListener('input', checkAnswer);
backButton.addEventListener('click', returnToModeSelection);

// Return to mode selection screen
function returnToModeSelection() {
    score = 0;
    scoreElement.textContent = score;
    gameScreen.style.display = 'none';
    modeSelection.style.display = 'block';
}

// Start the game with selected mode
function startGame(multiply) {
    isMultiplication = multiply;
    modeSelection.style.display = 'none';
    gameScreen.style.display = 'block';
    multiplyBtn.classList.toggle('active', multiply);
    divideBtn.classList.toggle('active', !multiply);
    operator.textContent = multiply ? '×' : '÷';
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
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        number1.textContent = num1;
        number2.textContent = num2;
        currentAnswer = num1 * num2;
    } else {
        const num2 = Math.floor(Math.random() * 10) + 1;
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
                modeSelection.style.display = 'block';
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
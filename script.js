function getSelectedQuestionTypes() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.getAll('questionType');
}

function getQuestionCount() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('questionCount')) || 10;
}

function backToIntro() {
    if (confirm("Are you sure you want to go back to the intro page?")) {
        window.location.href = "intro.html";
    }
}


let currentScore = 0;
let currentQuestionIndex = 0;
const questionCount = getQuestionCount();
const selectedQuestionTypes = getSelectedQuestionTypes();

const typeChart = {
    "Normal": {
        "Strong Against": [],
        "Weak Against": ["Rock", "Ghost", "Steel"],
        "Resistant To": ["Ghost"],
        "Vulnerable To": ["Fighting"],
        "icon": "normal.svg"
    },
    "Fighting": {
        "Strong Against": ["Normal", "Rock", "Steel", "Ice", "Dark"],
        "Weak Against": ["Flying", "Poison", "Psychic", "Bug", "Ghost", "Fairy"],
        "Resistant To": ["Rock", "Bug", "Dark"],
        "Vulnerable To": ["Flying", "Psychic", "Fairy"],
        "icon": "fighting.svg"
    },
    "Flying": {
        "Strong Against": ["Fighting", "Bug", "Grass"],
        "Weak Against": ["Rock", "Steel", "Electric"],
        "Resistant To": ["Fighting", "Ground", "Bug", "Grass"],
        "Vulnerable To": ["Rock", "Electric", "Ice"],
        "icon": "flying.svg"
    },
    "Poison": {
        "Strong Against": ["Grass", "Fairy"],
        "Weak Against": ["Poison", "Ground", "Rock", "Ghost", "Steel"],
        "Resistant To": ["Fighting", "Poison", "Grass", "Fairy"],
        "Vulnerable To": ["Ground", "Psychic"],
        "icon": "poison.svg"
    },
    "Ground": {
        "Strong Against": ["Poison", "Rock", "Steel", "Fire", "Electric"],
        "Weak Against": ["Flying", "Bug", "Grass"],
        "Resistant To": ["Poison", "Rock", "Electric"],
        "Vulnerable To": ["Water", "Grass", "Ice"],
        "icon": "ground.svg"
    },
    "Rock": {
        "Strong Against": ["Flying", "Bug", "Fire", "Ice"],
        "Weak Against": ["Fighting", "Ground", "Steel"],
        "Resistant To": ["Normal", "Flying", "Poison", "Fire"],
        "Vulnerable To": ["Fighting", "Ground", "Steel", "Water", "Grass"],
        "icon": "rock.svg"
    },
    "Bug": {
        "Strong Against": ["Grass", "Psychic", "Dark"],
        "Weak Against": ["Fighting", "Flying", "Poison", "Ghost", "Steel", "Fire", "Fairy"],
        "Resistant To": ["Fighting", "Ground", "Grass"],
        "Vulnerable To": ["Flying", "Rock", "Fire"],
        "icon": "bug.svg"
    },
    "Ghost": {
        "Strong Against": ["Ghost", "Psychic"],
        "Weak Against": ["Normal", "Dark"],
        "Resistant To": ["Normal", "Fighting", "Poison", "Bug"],
        "Vulnerable To": ["Ghost", "Dark"],
        "icon": "ghost.svg"
    },
    "Steel": {
        "Strong Against": ["Rock", "Ice", "Fairy"],
        "Weak Against": ["Steel", "Fire", "Water", "Electric"],
        "Resistant To": ["Normal", "Flying", "Poison", "Rock", "Bug", "Steel", "Grass", "Psychic", "Ice", "Dragon", "Fairy"],
        "Vulnerable To": ["Fighting", "Ground", "Fire"],
        "icon": "steel.svg"
    },
    "Fire": {
        "Strong Against": ["Bug", "Steel", "Grass", "Ice"],
        "Weak Against": ["Rock", "Fire", "Water", "Dragon"],
        "Resistant To": ["Bug", "Steel", "Fire", "Grass", "Ice"],
        "Vulnerable To": ["Ground", "Rock", "Water"],
        "icon": "fire.svg"
    },
    "Water": {
        "Strong Against": ["Ground", "Rock", "Fire"],
        "Weak Against": ["Water", "Grass", "Dragon"],
        "Resistant To": ["Steel", "Fire", "Water", "Ice"],
        "Vulnerable To": ["Grass", "Electric"],
        "icon": "water.svg"
    },
    "Grass": {
        "Strong Against": ["Ground", "Rock", "Water"],
        "Weak Against": ["Flying", "Poison", "Bug", "Steel", "Fire", "Grass", "Dragon"],
        "Resistant To": ["Ground", "Water", "Grass", "Electric"],
        "Vulnerable To": ["Flying", "Poison", "Bug", "Fire", "Ice"],
        "icon": "grass.svg"
    },
    "Electric": {
        "Strong Against": ["Flying", "Water"],
        "Weak Against": ["Ground", "Grass", "Electric", "Dragon"],
        "Resistant To": ["Flying", "Steel", "Electric"],
        "Vulnerable To": ["Ground"],
        "icon": "electric.svg"
    },
    "Psychic": {
        "Strong Against": ["Fighting", "Poison"],
        "Weak Against": ["Steel", "Psychic", "Dark"],
        "Resistant To": ["Fighting", "Psychic"],
        "Vulnerable To": ["Bug", "Ghost", "Dark"],
        "icon": "psychic.svg"
    },
    "Ice": {
        "Strong Against": ["Flying", "Ground", "Grass", "Dragon"],
        "Weak Against": ["Steel", "Fire", "Water", "Ice"],
        "Resistant To": ["Ice"],
        "Vulnerable To": ["Fighting", "Rock", "Steel", "Fire"],
        "icon": "ice.svg"
    },
    "Dragon": {
        "Strong Against": ["Dragon"],
        "Weak Against": ["Steel", "Fairy"],
        "Resistant To": ["Fire", "Water", "Grass", "Electric"],
        "Vulnerable To": ["Ice", "Dragon", "Fairy"],
        "icon": "dragon.svg"
    },
    "Dark": {
        "Strong Against": ["Ghost", "Psychic"],
        "Weak Against": ["Fighting", "Dark", "Fairy"],
        "Resistant To": ["Ghost", "Psychic", "Dark"],
        "Vulnerable To": ["Fighting", "Bug", "Fairy"],
        "icon": "dark.svg"
    },
    "Fairy": {
        "Strong Against": ["Fighting", "Dragon", "Dark"],
        "Weak Against": ["Poison", "Steel", "Fire"],
        "Resistant To": ["Fighting", "Bug", "Dragon", "Dark"],
        "Vulnerable To": ["Poison", "Steel"],
        "icon": "fairy.svg"
    }
};

const questions = generateQuestions().slice(0, questionCount);

function generateQuestions() {
    let questions = [];
    const typeCategories = selectedQuestionTypes.length ? selectedQuestionTypes : ["Strong Against", "Weak Against", "Resistant To", "Vulnerable To"];

    Object.keys(typeChart).forEach(type => {
        shuffleArray(typeCategories);
        typeCategories.forEach(category => {
            if (typeChart[type][category].length > 0) {
                questions.push({
                    question: `What is ${type} type ${category.toLowerCase()}?`,
                    answers: typeChart[type][category],
                    type: type
                });
            }
        });
    });

    shuffleArray(questions);
    return questions;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const questionContainer = document.getElementById('question');
    const totalQuestions = questions.length;
    const questionProgress = document.getElementById('questionProgress'); // Element to display question progress

    // Update question and progress display
    questionContainer.innerHTML = `<img src="icons/${typeChart[question.type].icon}" alt="${question.type} type icon" class="${question.type.toLowerCase()}" style="width: 30px;"> ${question.question} <span id="resultIcon"></span>`;
    questionProgress.innerHTML = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`; // Displaying the current question number

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';
    Object.keys(typeChart).forEach(type => {
        answersContainer.innerHTML += `
            <label class="answer">
                <input type="checkbox" name="answer" value="${type}">
                <img src="icons/${typeChart[type].icon}" class="${type.toLowerCase()}" style="width: 30px;">
                ${type}
            </label>
        `;
    });
    document.getElementById('submit').style.display = 'block';
}


function checkAnswers() {
    const correctAnswers = new Set(questions[currentQuestionIndex].answers);
    const inputs = document.querySelectorAll('input[name="answer"]');
    let userAnswers = new Set();

    inputs.forEach(input => {
        const parentLabel = input.parentElement;
        if (input.checked) {
            userAnswers.add(input.value);
            if (correctAnswers.has(input.value)) {
                parentLabel.classList.add('correct');
            } else {
                parentLabel.classList.add('incorrect');
            }
        } else {
            if (correctAnswers.has(input.value)) {
                parentLabel.classList.add('missed');
            }
        }
        input.disabled = true; 
    });

    if (isSameSet(userAnswers, correctAnswers)) {
        currentScore++;
        document.getElementById('resultIcon').innerHTML = '✅'; 
    } else {
        document.getElementById('resultIcon').innerHTML = '❌';
    }

    document.getElementById('submit').style.display = 'none'; 
    document.getElementById('next').style.display = 'block';
}

function isSameSet(set1, set2) {
    if (set1.size !== set2.size) return false;
    for (let item of set1) {
        if (!set2.has(item)) return false;
    }
    return true;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        resetAnswers();
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function resetAnswers() {
    const labels = document.querySelectorAll('.answer');
    labels.forEach(label => {
        label.classList.remove('correct', 'incorrect');
    });
    document.getElementById('next').style.display = 'none';
}

function finishQuiz() {
    document.getElementById('quiz-container').innerHTML = `Quiz completed! Your score: ${currentScore} out of ${questions.length}`;
}

window.onload = function() {
    displayQuestion();
    document.getElementById('submit').onclick = checkAnswers;
    document.getElementById('next').onclick = nextQuestion;
}

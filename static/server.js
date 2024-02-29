const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/runcode', (req, res) => {
    const { code, language } = req.body;
    let output = '';

    let command = '';
    let args = [];

    if (language === "python") {
        command = 'python';
        args = ['-c', code];
    } else if (language === "java") {
        command = 'java';
        args = ['-cp', 'YourClasspath', 'YourMainClass'];
    } else if (language === "cpp") {
        command = 'g++';
        args = ['-o', 'output', '-x', 'c++', '-'];
    }

    const childProcess = spawn(command, args);
    childProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    childProcess.stderr.on('data', (data) => {
        output += data.toString();
    });

    childProcess.on('close', (code) => {
        res.json({ output });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// script.js
document.addEventListener("DOMContentLoaded", function() {
    const questionContainer = document.getElementById("questionContainer");
    const pagination = document.getElementById("pagination");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const submitButton = document.getElementById("submitButton");
    const resultDiv = document.getElementById("result");
    const congratulationsDiv = document.getElementById("congratulations");
    
    let currentQuestionIndex = 0;

    function showQuestion(index) {
        const question = questions[index];
        const optionsHtml = question.options.map(option => `<input type="radio" name="answer" value="${option}">${option}<br>`).join('');
        const questionHtml = `
            <div class="question">
                <p>${question.text}</p>
                ${optionsHtml}
            </div>
        `;
        questionContainer.innerHTML = questionHtml;
    }

    function updateButtons() {
        if (currentQuestionIndex === 0) {
            prevButton.style.display = "none";
        } else {
            prevButton.style.display = "block";
        }

        if (currentQuestionIndex === questions.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "block";
        } else {
            nextButton.style.display = "block";
            submitButton.style.display = "none";
        }
    }

    function calculateScore() {
        let score = 0;
        const selectedOption = document.querySelector("input[name='answer']:checked");
        if (selectedOption && selectedOption.value === questions[currentQuestionIndex].answer) {
            score++;
        }
        return score;
    }

    function showResult() {
        const score = calculateScore();
        resultDiv.textContent = `Congratulations! Your score: ${score}`;
        congratulationsDiv.style.display = "block";
        setTimeout(function() {
            window.location.href = '/';
        }, 3000); // Redirect after 3 seconds
    }

    function initializeQuiz() {
        showQuestion(currentQuestionIndex);
        updateButtons();
    }

    prevButton.addEventListener("click", function() {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateButtons();
    });

    nextButton.addEventListener("click", function() {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateButtons();
    });

    submitButton.addEventListener("click", function() {
        const score = calculateScore();
        resultDiv.textContent = `Congratulations! Your score: ${score}`;
        resultDiv.style.display = "block";
        showResult();
    });

    initializeQuiz();
});

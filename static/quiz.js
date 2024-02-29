document.addEventListener('DOMContentLoaded', function () {
    fetch('/get-questions')
        .then(response => response.json())
        .then(questions => {
            const quizQuestions = document.getElementById('quizQuestions');

            questions.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.innerHTML = `
                    <p>${index + 1}. ${question.question_text}</p>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" name="q${index}" value="1" required>
                        <label class="form-check-label">${question.option1}</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" name="q${index}" value="2" required>
                        <label class="form-check-label">${question.option2}</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" name="q${index}" value="3" required>
                        <label class="form-check-label">${question.option3}</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input" name="q${index}" value="4" required>
                        <label class="form-check-label">${question.option4}</label>
                    </div>
                    <hr>
                `;
                quizQuestions.appendChild(questionDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function submitQuiz() {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);

    const userAnswers = [];
    formData.forEach((value, key) => {
        userAnswers.push({ question: key, answer: value });
    });

    fetch('/submit-quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: userAnswers }),
    })
    .then(response => response.json())
    .then(result => {
        const quizResultDiv = document.getElementById('quizResult');
        const userScoreSpan = document.getElementById('userScore');

        if (result.success) {
            quizResultDiv.style.display = 'block';
            userScoreSpan.textContent = result.marks;
        } else {
            alert('Failed to submit quiz.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

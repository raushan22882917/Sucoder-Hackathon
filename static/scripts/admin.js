function addQuestion() {
    const questionText = document.getElementById('questionText').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const correctOption = document.getElementById('correctOption').value;

    const data = {
        questionText: questionText,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        correctOption: correctOption
    };

    fetch('/add-question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Question added successfully!');
        } else {
            alert('Failed to add question.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

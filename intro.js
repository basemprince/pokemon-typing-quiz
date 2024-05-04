document.getElementById('intro-form').onsubmit = function(event) {
    event.preventDefault();
    const questionCount = document.getElementById('questionCount').value;

    const selectedTypes = [...document.querySelectorAll('input[name="questionType"]:checked')].map(cb => cb.value);
    const selectedTypesQuery = selectedTypes.map(type => `questionType=${encodeURIComponent(type)}`).join('&');

    window.location.href = `quiz.html?questionCount=${questionCount}&${selectedTypesQuery}`;
};

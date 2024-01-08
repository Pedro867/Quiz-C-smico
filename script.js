const questionContainer = document.querySelector(".question");
const answerContainer = document.querySelector(".answer");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const contentStart = document.querySelector(".start");
const btnStart = document.querySelector(".start button");

import questions from "./qs.js";

let currentQuestion = 0;
let correctQuestions = 0;

loadQuestion();
start ();

btnStart.onclick = () => {
    content.style.display = "flex";
    contentStart.style.display = "none";

    currentQuestion = 0;
    correctQuestions = 0;
    loadQuestion();
};

function start (){
    content.style.display = "none";
    contentStart.style.display = "flex";
}

btnRestart.onclick = () => {
    content.style.display = "flex";
    contentFinish.style.display = "none";

    currentQuestion = 0;
    correctQuestions = 0;
    loadQuestion();
};

function nextQuestion(e) {
    if (e.target.getAttribute("data-correct") === "true") {
        correctQuestions++;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finish();
    }
}

function finish() {
    textFinish.innerHTML = `Você acertou ${correctQuestions} de ${questions.length}`;
    content.style.display = "none";
    contentFinish.style.display = "flex";
}

function loadQuestion() {
    spnQtd.innerHTML = `${currentQuestion + 1}/${questions.length}`;
    const currentQuestionItem = questions[currentQuestion];
    answerContainer.innerHTML = "";
    questionContainer.innerHTML = currentQuestionItem.question;

    currentQuestionItem.answers.forEach((answer) => {
        const div = document.createElement("div");

        div.innerHTML = `
        <button class="answer" data-correct="${answer.correct}">
            ${answer.option}
        </button>
        `;

        answerContainer.appendChild(div);
    });
}

document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
});

import { questions } from "./questions.js";
// -------------------------
let nameInput;
let startBtn;
let question;
let answer;
let container = document.querySelector(".container");
let name = "";
let result = 0;
// -----------------------------
function generateStartPage() {
  container.innerHTML = `
    <form>
      <p class="start-title">Welcome to the web dev quiz!</p>
      <input type="text" id="name-input" />
      <button class="start-btn">Start Quiz</button>
    </form>`;
  nameInput = document.querySelector("#name-input");
  startBtn = document.querySelector(".start-btn");
}

function generateResultspage() {
  container.innerHTML = `
    <div class="result-continer">
      <div>
        <div>Player Name:</div>
        <p>${name}</p>
      </div>
      <div class="result-element"> Result: ${result} / ${questions.length}</div>
      <div>Percentage: ${result / questions.length * 100} %</div>
      <button class="play-again-btn">play again</button>
    </div>`;
  name = "";
  result = 0;
  document.querySelector(".play-again-btn").addEventListener("click", start);
}

function play(index) {
  question = questions[index];
  let choicesHTML = "";
  question.choices.forEach((choice) => {
    choicesHTML += `
        <div>
          <input type="radio" name="answer" id="${choice}" value="${choice}"/>
          <label for="${choice}"><span>${choice}</span></label>
        </div>`;
  });
  container.innerHTML = `
        <input readonly type="text" id="question" value="${question.question}" />
        ${choicesHTML}
        <button class="submit-answer-btn" data-question-index="${index}">submit answer</button>`;

  document.querySelector(".submit-answer-btn").addEventListener("click", () => {
    answer = document.querySelector(`input:checked`).value.replaceAll("\n", "");
    if (answer === question.choices[question.answerIndex].replace("<\r", "<"))
      result++;
    else {
    }

    if (index !== questions.length - 1) play(index + 1);
    else generateResultspage();
  });
}

function start() {
  generateStartPage();

  startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    name = nameInput.value.trim();
    if (!name) {
      alert("invalid name");
      return;
    }
    play(0);
  });
}

start();
